var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

exports.metalsmith = function() {
  var metalsmith = Metalsmith(__dirname)
    .source("../src")
    .destination("../build")
    .use(markdown())
    .use(templates('handlebars'));

  return metalsmith;
}

exports.build = function(callback) {
  exports.metalsmith().build(function(err, files) {
    if (err) { throw err; }
    if (callback) {
      callback(err, files);
    }
  });
}

exports.server = function(callback) {
  exports.metalsmith().use(serve())
    .use(watch({
      livereload: true
    }))
    .build(function(err, files) {
      console.log(err);
      if (callback) {
        callback(err, files);
      }
    });
}
