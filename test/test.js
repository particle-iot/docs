var assert = require("assert");
var should = require("should");
var metalsmith = require('../scripts/metalsmith.js');
var crawler = require('../scripts/crawler.js');

describe('Tests', function(){
  it('should run', function(){
    should(true).ok;
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

describe('Build', function() {
  it('should run without error', function(done){
    metalsmith.build(function(err, files) {
      should.not.exist(err);
      done();
    });
  });
});
