var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

var metalsmith = Metalsmith(__dirname)
  .use(markdown())
  .use(templates('handlebars'))
  .use(serve())
  .use(watch({
    livereload: true
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
