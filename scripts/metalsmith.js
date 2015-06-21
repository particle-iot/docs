var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var moveUp = require('metalsmith-move-up');
var less = require('metalsmith-less');
var ignore = require('metalsmith-ignore');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');

exports.metalsmith = function() {
  var metalsmith = Metalsmith(__dirname)
    .source("../src")
    .destination("../build")
    .use(collections())
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
    .use(moveUp('content/**/*'))
    .use(permalinks({
      relative: false
    }));

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
