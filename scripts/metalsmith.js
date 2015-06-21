var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var moveUp = require('metalsmith-move-up');
var less = require('metalsmith-less');
var ignore = require('metalsmith-ignore');

exports.metalsmith = function() {
  var metalsmith = Metalsmith(__dirname)
    .source("../src")
    .destination("../build")
    .use(markdown())
    .use(ignore([
      '**/less/*.less'
    ]))
    .use(less({
      pattern: "**/style.less",
      useDynamicSourceMap: true
    }))
    .use(templates({
      engine: 'handlebars',
      directory: '../templates'
    }))
    .use(moveUp('content/**/*'));

  return metalsmith;
};

exports.build = function(callback) {
  exports.metalsmith().build(function(err, files) {
    if (err) { throw err; }
    if (callback) {
      callback(err, files);
    }
  });
};

exports.server = function(callback) {
  exports.metalsmith().use(serve())
    .use(watch({
      paths: {
        "${source}/**/*": true,
        "../templates/**/*": "**/*.md",
      },
      livereload: true
    }))
    .build(function(err, files) {
      if (callback) {
        callback(err, files);
      }
    });
};
