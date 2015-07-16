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
var watch = require('metalsmith-watch');
var autotoc = require('metalsmith-autotoc');
var lunr = require('metalsmith-lunr');
var lunr_ = require('lunr');
var fileMetadata = require('metalsmith-filemetadata');
var msIf = require('metalsmith-if');
var precompile = require('./precompile');


var environment;



exports.metalsmith = function() {

  var _removeEmptyTokens = function removeEmptyTokens(token) {
    if (token.length > 0) {return token};
  }
  var metalsmith = Metalsmith(__dirname)
    .concurrency(100)
    .source("../src")
    .destination("../build")
    .use(less({
      pattern: "**/less/style.less",
      useDynamicSourceMap: true
    }))
    .use(ignore([
      '**/less/*.less',
      'content/languages/**/*'
    ]))
    .use(cleanCSS({
      files: '**/*.css'
    }))
    .use(partial({
      directory: '../templates/partials',
      engine: 'handlebars'
    }))
    .use(fileMetadata([
      {pattern: "content/**/*.md", metadata: {"lunr": true}}
    ]))
    .use(precompile({
      directory: '../templates/precompile',
      dest: 'assets/js/precompiled.js',
      knownHelpers: {
        'each': true,
        'if': true
      }
    }))
    .use(moveUp(['content/**/*']))
    .use(paths())
    .use(helpers({
      directory: '../templates/helpers'
    }))
    .use(collections({
      guide: {
        pattern: 'guide/:section/*.md',
        sortBy: 'order'
      },
      reference: {
        pattern: 'reference/*md',
        sortBy: 'order'
      },
      datasheet: {
        pattern: 'datasheets/*.md',
        sortBy: 'order'
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
    .use(autotoc({
      selector: 'h2, h3',
      pattern: '**/**/*.md'
    }))
    .use(lunr({
      indexPath: 'search-index.json',
      fields: {
        contents: 1,
        title: 10
      },
      pipelineFunctions: [
        _removeEmptyTokens
      ]
    }))
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
      '/datasheets': '/datasheets/photon-datasheet',
      '/guide/getting-started': '/guide/getting-started/intro',
      '/guide/how-to-build-a-product': '/guide/how-to-build-a-product/intro/',
      '/guide/tools-and-features': '/guide/tools-and-features/intro'
    }))
    .use(msIf(
      environment !== 'development',
      compress({overwrite: true})
    ));

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
  environment = 'development';
  exports.metalsmith().use(serve())
    .use(define({
      development: true
    }))
    .use(watch({
      paths: {
        "${source}/content/**/*.md": true,
        "${source}/assets/less/*.less": "assets/less/*.less",
        "../templates/reference.hbs": "content/reference/*.md",
        "../templates/guide.hbs": "content/guide/**/*.md",
        "../templates/datasheet.hbs": "content/datasheets/*.md",
        "${source}/assets/js/*.js" : true
      },
      livereload: true
    }))
    .build(function(err, files) {
      if (err) {
        console.error(err, err.stack);
      }
      if (callback) {
        callback(err, files);
      }
    });

};
