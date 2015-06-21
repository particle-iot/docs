var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var metalsmith = require('./metalsmith.js');

metalsmith().build(function(err, files) {
  if (err) { throw err; }
});
