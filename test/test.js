var should = require("should");
var metalsmith = require('../scripts/metalsmith.js');
var Crawler = require('crawler');
var url = require('url');

describe('Tests', function(){
  it('should run', function(){
    should(true).ok();
  });
});

describe('Build', function() {
  it('should run without error', function(done){
    this.timeout(30000);
    metalsmith.build(function(err, files) {
      done(err);
    });
  });
});

describe('Server', function() {
  it('should run without error', function(done){
    this.timeout(30000);
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
    this.timeout(120000);
    var errors = 0;
    var host = 'http://localhost:8080/';
    var c = new Crawler({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36',
        maxConnections: 10,
        skipDuplicates: true,
        onDrain: function() {
          if (errors > 0) {
            return done(new Error('There are ' + errors + ' broken link(s)'));
          }
          return done();
        }
    });
    function crawlCallback(fromUrl, toUrl, content, error, result, $) {
      // allow 429 for now
      if (error || (result.statusCode !== 200 && result.statusCode !== 429)) {
        console.error('%s ON %s CONTENT %s LINKS TO %s', error || result.statusCode, fromUrl, content, toUrl);
        errors++;
        return;
      }
      var isRelative = toUrl.indexOf('http') === -1;
      var isLocalhost = toUrl.indexOf('localhost') > 0;
      if ($ && result && (isRelative || isLocalhost)) {
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
