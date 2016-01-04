var should = require("should");
var metalsmith = require('../scripts/metalsmith.js');
var Crawler = require('crawler');
var url = require('url');
var util = require('util');

var isPullRequest = process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false';

describe('Tests', function(){
  it('should run', function(){
    should(true).ok();
  });
});

describe('Build', function() {
  it('should run without error', function(done){
    this.timeout(60000);
    metalsmith.build(function(err, files) {
      done(err);
    });
  });
});

describe('Server', function() {
  it('should run without error', function(done){
    this.timeout(60000);
    metalsmith.server(function(err, files) {
      done(err);
    });
  });
});

function shouldCrawl(qurl) {
  if (qurl.indexOf('#') === 0 ||
    qurl.indexOf('mailto:') === 0 ||
    qurl.indexOf('http://localhost:35729') === 0) {
    return false;
  }
  return true;
}

describe('Crawler', function() {
  it('should complete without error', function(done) {
    this.timeout(500000);
    var errors = 0;
    var host = 'http://localhost:8080/';
    var c = new Crawler({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36',
        maxConnections: 10,
        skipDuplicates: true,
        timeout: 3000,
        onDrain: function() {
          if (errors > 0) {
            return done(new Error('There are ' + errors + ' broken link(s)'));
          }
          return done();
        }
    });
    function crawlCallback(fromUrl, toUrl, content, error, result, $) {
      var isRelative = toUrl.indexOf('http') === -1;
      var isLocalhost = toUrl.indexOf('localhost') > 0;
      var isExternal = !(isRelative || isLocalhost);

      // allow 429 for now
      var statusCode = result && result.statusCode;
      if (error || (statusCode !== 200 && statusCode !== 429)) {
        var msg = util.format('%s ON %s CONTENT %s LINKS TO %s', error || statusCode, fromUrl, content, toUrl);

        var timedOut = error && (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT');
        var isGithubEditLink = isExternal && toUrl.indexOf('https://github.com/spark/docs/tree/master/src/content') === 0;
        if ((isExternal && Math.floor(statusCode / 100) === 5) ||
            (isExternal && timedOut) ||
            (isPullRequest && isGithubEditLink && statusCode === 404)) {
          // allow 5XX status codes on external links
          console.log('WARN: ' + msg);
          return;
        }
        console.error('ERROR: ' + msg);
        errors++;
        return;
      }

      if ($ && result && !isExternal) {
        $('a').each(function(index, a) {
          var toQueueUrl = $(a).attr('href');
          var linkContent = $(a).text();
          if (!toQueueUrl) return;

          if (!shouldCrawl(toQueueUrl)) {
            return;
          }

          var parsedUrl = url.parse(toUrl);
          if (parsedUrl.pathname.slice(-1) !== '/') {
            parsedUrl.pathname += '/';
            toUrl = url.format(parsedUrl);
          }
          var absolutePath = url.resolve(toUrl, toQueueUrl);
          //console.log(toUrl, toQueueUrl, absolutePath);
          c.queue([{
            uri: absolutePath,
            callback: crawlCallback.bind(null, toUrl, absolutePath, linkContent)
          }]);
        });
        $('img').each(function (index, img) {
          var toQueueUrl = $(img).attr('src');
          if (!toQueueUrl) return;

          if (!shouldCrawl(toQueueUrl)) {
            return;
          }

          toQueueUrl = url.resolve(toUrl, toQueueUrl);
          c.queue([{
            uri: toQueueUrl,
            callback: crawlCallback.bind(null, toUrl, toQueueUrl, 'image')
          }]);
        });
      }
    }
    c.queue([{ uri: host, callback: crawlCallback.bind(null, '', host, 'initial page') }]);
  });
});
