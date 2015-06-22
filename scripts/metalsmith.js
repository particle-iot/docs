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
var blc = require('metalsmith-broken-link-checker');
var cleanCSS = require('metalsmith-clean-css');
var define = require('metalsmith-define');
var compress = require('metalsmith-gzip');
var paths = require('metalsmith-paths');
var partial = require('metalsmith-partial');
var redirect = require('metalsmith-redirect');

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
    .use(cleanCSS({
      files: '**/*.css'
    }))
    .use(templates({
      engine: 'handlebars',
      directory: '../templates'
    }))
    .use(partial({
      directory: '../templates/partials',
      engine: 'handlebars'
    }))
    .use(moveUp(['content/**/*']))
    .use(paths())
    .use(permalinks({
      relative: false
    }))
    .use(redirect({
      '/start': '/',
      '/guide/photon/': '/guide/photon/start',
      '/guide/core/': '/guide/core/start',
      '/reference': '/reference/firmware',
      '/datasheets': '/datasheets/photon-datasheet'
    }))
    .use(compress());
    //.use(blc());

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
    .use(define({
      development: true
    }))
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
