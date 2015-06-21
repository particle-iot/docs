var assert = require("assert");
var should = require("should");
var metalsmith = require('../scripts/metalsmith.js');
var Crawler = require("simplecrawler");
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var crawler = new Crawler("localhost");
var googleBody = "";
var responses = [];

describe('Tests', function(){
  it('should run', function(){
    should(true).ok();
  });
});

describe('Build', function() {
  it('should run without error', function(done){
    metalsmith.build(function(err, files) {
      should.not.exist(err);
      done();
    });
  });
});

describe('Server', function() {
  it('should run without error', function(done){
    this.timeout(5000);
    metalsmith.server(function(err, files) {
      should.not.exist(err);
      done();
    });
  });
});

describe('Crawler', function() {
  crawler.initialPort = 8080;

  it('should complete without error', function(done) {
    crawler.start();
    crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
      responses.push(responseBuffer);
    });
    crawler.on("complete", function(queueItem){
      done();
    });
  });

  it('should have a queue', function() {
    crawler.queue.should.be.an.Object();
  });

  it('should succeed', function() {
    crawler.queue[0].status.should.not.equal("failed");
  });
});

describe('Docs', function() {
  it('should exist', function() {
    crawler.queue[0].status.should.not.equal("notfound");
  });
});

describe('Internal links', function() {
  it('should all succeed', function(done) {
    var badLinks = [];
    crawler.queue.getWithStatus("failed").forEach(function(queueItem) {
      badLinks.push(queueItem.url);
    });
    var message = badLinks.join("\r\n");
    if (message.length !== 0) {
      var e = new Error("Bad internal links or assets:\r\n" + message);
      done(e);
    } else {
      done();
    }
  });

  it('should all return 200 OK', function(done) {
    var badLinks = [];
    crawler.queue.getWithStatus("notfound").forEach(function(queueItem) {
      badLinks.push(queueItem.url);
    });
    var message = badLinks.join("\r\n");
    if (message.length !== 0) {
      var e = new Error("Bad internal links or assets:\r\n" + message);
      done(e);
    } else {
      done();
    }
  });
});

describe('Request', function() {
  it('should retrieve google.com', function(done) {
    request('http://www.google.com', function(error, response, body) {
      should.not.exist(error);
      response.statusCode.should.equal(200);
      googleBody = body;
      done();
    });
  });

  it('should retrieve links from the crawler', function(done) {
    request(crawler.queue.get(0).url, function(error, response, body) {
      should.not.exist(error);
      response.statusCode.should.equal(200);
      done();
    });
  });
});

describe('Cheerio', function() {
  it('should parse Google', function(done) {
    var $ = cheerio.load(googleBody);
    var content = $('body').html();
    content.should.be.a.String();
    content.should.not.equal("");
    done();
  });

  it('should find links on Google', function(done) {
    var $ = cheerio.load(googleBody);
    var links = [];
    $('a').each(function() {
      links.push($(this).attr('href'));
    });
    links.should.be.an.Array();
    links.should.not.be.empty();
    done();
  });
});

describe('External links', function() {
  var externalLinks = [];

  it('should exist', function(done) {
    responses.forEach(function(element, index, array){
      var $ = cheerio.load(element.toString('utf8'));
      $('a').each(function() {
        var link = $(this).attr('href');
        if (link.indexOf('http') != -1) {
          externalLinks.push(link);
        }
      });
    });
    externalLinks.should.be.an.Array();
    externalLinks.should.not.be.empty();
    done();
  });

  it('should return 200 OK', function(done) {
    var badLinks = [];

    async.each(externalLinks, function(link, callback) {
      request(link, function(error, response, body) {
        if (error || response.statusCode != 200) {
          badLinks.push(link);
        }
        callback();
      });
    }, function(err) {
      var message = badLinks.join("\r\n");
      if (message.length !== 0) {
        var e = new Error("Bad links:\r\n" + message);
        done(e);
      } else {
        done();
      }
    });
  });
});
