var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var serve = require('metalsmith-serve');
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
var path = require('path');
var partial = require('metalsmith-partial');
var helpers = require('metalsmith-register-helpers');
var redirect = require('metalsmith-redirect');
var copy = require('metalsmith-copy');
var fork = require('./fork');
var inPlace = require('metalsmith-in-place');
var watch = require('metalsmith-simplewatch');

exports.metalsmith = function() {
  var metalsmith = Metalsmith(__dirname)
    .source("../src")
    .destination("../build")
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
    .use(partial({
      directory: '../templates/partials',
      engine: 'handlebars'
    }))
    .use(moveUp(['content/**/*']))
    .use(paths())
    // .use(collections({
    //   guide: {
    //     pattern: '**/guide/**/*.md',
    //     sortBy: 'order'
    //   },
    //   datasheets: {
    //     pattern: '**/datasheets/**/*.md',
    //     sortBy: 'order'
    //   },
    //   reference: {
    //     pattern: '**/reference/**/*.md',
    //     sortBy: 'order'
    //   }
    // }))
    .use(helpers({
      directory: '../templates/helpers'
    }))
    .use(collections({
      guide: {
        pattern: 'guide/:section/*.md'
      }
    }))
    .use(fork({
      key: 'devices',
      redirectTemplate: './templates/redirector.jade'
    }))
    .use(inPlace({
      engine: 'jade',
      pattern: '**/*.jade'
    }))
    .use(copy({
      pattern: '**/*.jade',
      extension: '.html',
      move: true
    }))
    .use(inPlace({
      engine: 'handlebars',
      pattern: '**/*.md'
    }))
    .use(markdown())
    .use(templates({
      engine: 'handlebars',
      directory: '../templates'
    }))
    .use(permalinks({
      relative: false
    }))
    .use(redirect({
      '/start': '/',
      '/guide': '/',
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

  watch({
    buildFn: exports.metalsmith().build,
    buildPath: path.resolve(__dirname, '../build/'),
    srcPath: path.resolve(__dirname, '../src/'),
    port: 8080
  });

  exports.metalsmith()
    .use(define({
      development: true
    }))
};
