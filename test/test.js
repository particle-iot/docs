var should = require("should");
var metalsmith = require('../scripts/metalsmith');
var Crawler = require('crawler');
var url = require('url');
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');

var CHECK_HASH_LINKS = false;
var devices = ['photon', 'electron', 'core'];
var isPullRequest = process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false';

function shouldCrawl(qurl) {
  if (qurl.indexOf('#') === 0 ||
    qurl.indexOf('mailto:') === 0 ||
    qurl.indexOf('http://localhost:35729') === 0) {
    return false;
  }
  return true;
}

var server;
describe('Crawler', function() {
  before(function(done) {
    this.timeout(60000);
    console.log('Building...');
    server = metalsmith.test(done);
  });

  after(function(done) {
    this.timeout(60000);
    server.shutdown(function(err) {
      console.log('Compressing...');
      metalsmith.compress(done);
    });
  });

  it('should complete without error', function(done) {
    this.timeout(500000);
    var errors = 0;
    var host = 'http://localhost:8080/';
    var c = new Crawler({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36',
        maxConnections: 10,
        agent: false,
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
          console.log(chalk.yellow('WARN: ' + msg));
          return;
        }
        console.error(chalk.red('ERROR: ' + msg));
        errors++;
        return;
      }

      if ($ && result && !isExternal) {
        var parsedUrl = url.parse(toUrl);
        if (parsedUrl.pathname.slice(-1) !== '/') {
          parsedUrl.pathname += '/';
          toUrl = url.format(parsedUrl);
        }

        if (CHECK_HASH_LINKS) {
          // is this the redirector page? follow device tree from here
          // this might make the crawl take ALOT longer
          if ($('#device-redirector').length === 1) {
            // determine if fromUrl was device specific
            var selectDevice;
            var parsedFromUrl = url.parse(fromUrl);
            var devicePath = _.intersection(parsedFromUrl.pathname.split('/'), devices);
            if (devicePath.length > 0) {
              selectDevice = devicePath[0];
            }

            $('ul.devices').find('a').each(function(index, a) {
              // if we come from a device-specific page, only choose that device link forward
              if (selectDevice && $(a).attr('id') !== (selectDevice + '-link')) {
                return;
              }

              var toQueueUrl = $(a).attr('href');

              // include hash used to access redirector
              var absolutePath = url.resolve(toUrl, toQueueUrl) + (parsedUrl.hash || '');
              // preserve original fromUrl and content
              c.queue([{
                uri: absolutePath,
                callback: crawlCallback.bind(null, fromUrl, absolutePath, content)
              }]);
            });
            return;
          }

          if (parsedUrl.hash) {
            if ($(parsedUrl.hash).length === 0) {
              console.error(chalk.red(util.format('ERROR: 404 (missing hash) ON %s CONTENT %s LINKS TO %s', fromUrl, content, toUrl)));
              errors++;
            }
            // only check the hash here
            // let the non-hash version crawl the rest of the tree
            return;
          }
        }

        $('a').each(function(index, a) {
          var toQueueUrl = $(a).attr('href');
          var linkContent = $(a).text();
          if (!toQueueUrl) return;

          if (CHECK_HASH_LINKS) {
            if (toQueueUrl.indexOf('#') === 0 && toQueueUrl.length > 1) {
              if ($(toQueueUrl).length === 0) {
                console.error(chalk.red(util.format('ERROR: 404 relative link ON %s CONTENT %s LINKS TO %s', toUrl, linkContent, toQueueUrl)));
                errors++;
              }
            }
          }

          if (!shouldCrawl(toQueueUrl)) {
            return;
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
