var assert = require("assert");
var should = require("should");
var server = require('../scripts/metalsmith.js').server;
var crawler = require('../scripts/crawler.js');

describe('Tests', function(){
  it('should run', function(){
    should(true).ok;
  });
});

describe('Server', function() {
  it('should run without error', function(done){
    this.timeout(5000);
    server(function(err, files) {
      should.not.exist(err);
      done();
    });
  });
});
