var Crawler = require("simplecrawler");

module.exports = function(callback) {
  var crawler = new Crawler("http://localhost");
  crawler.initialPort = 8080;
  crawler.maxDepth = 1;

  if(callback) {
    callback(crawler);
  }

  return crawler;
}
