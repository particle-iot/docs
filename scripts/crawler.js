var server = require('./metalsmith.js').server;
var Crawler = require("simplecrawler");

var runCrawler = function() {
  Crawler.crawl("http://localhost:8080/test.html")
    .on("fetchcomplete", function(queueItem){
      console.log("Fetch completed");
      console.log(queueItem);
    })
}

server(runCrawler);
