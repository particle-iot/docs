var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var metalsmith = require('./metalsmith.js');

metalsmith().use(serve())
  .use(watch({
    livereload: true
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
