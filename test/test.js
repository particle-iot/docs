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
    this.timeout(20000);
    metalsmith.build(function(err, files) {
      done(err);
    });
  });
});

describe('Server', function() {
  it('should run without error', function(done){
    this.timeout(20000);
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
    var host = 'http://localhost:8080';
    var c = new Crawler({
        maxConnections : 10,
        skipDuplicates: true,
        onDrain: function() {
          if (errors > 0) {
            return done(new Error('There are ' + errors + ' broken link(s)'));
          }
          return done();
        }
    });
    function crawlCallback(fromUrl, toUrl, content, error, result, $) {
      if (error || result.statusCode !== 200) {
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

          toQueueUrl = url.resolve(toUrl, toQueueUrl);
          c.queue([{
            uri: toQueueUrl,
            callback: crawlCallback.bind(null, toUrl, toQueueUrl, linkContent)
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
