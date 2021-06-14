/*
 * Generate the documentation website using the Metalsmith generator.
 *
 * Metalsmith reads all files in the source directory and passes an object of files through a set of plugins.
 * Each key in the files object is a path and the value is an object with many properties.
 * The contents properties has the contents of the file as a Buffer.
 * The frontmatter (stuff between --- at the top of the file) is added as additional properties.
 * When all the plugins are done running, the files object is written to the destination directory.
 * That's it!
 */
'use strict';
 
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var serve = require('metalsmith-serve');
var moveUp = require('metalsmith-move-up');
var less = require('metalsmith-less');
var ignore = require('metalsmith-ignore');
var permalinks = require('metalsmith-permalinks');
var cleanCSS = require('metalsmith-clean-css');
var compress = require('metalsmith-gzip');
var paths = require('metalsmith-paths');
var partials = require('metalsmith-register-partials');
var helpers = require('metalsmith-register-helpers');
var deviceFeatureFlags = require('./device_feature_flags');
var planLimits = require('./planLimits');
var redirects = require('./redirects');
var copy = require('metalsmith-copy');
var fork = require('./fork');
var fixLinks = require('./fixLinks');
var inPlace = require('metalsmith-in-place');
var watch = require('metalsmith-watch');
var autotoc = require('metalsmith-autotoc');
var fileMetadata = require('metalsmith-filemetadata');
var msIf = require('metalsmith-if');
var canonical = require('metalsmith-canonical');
var precompile = require('./precompile');
var apidoc = require('./apidoc');
var insertFragment = require('./insert_fragment');
var javascriptDocsPreprocess = require('./javascript_docs_preprocess');
var git = require('git-rev');
var path = require('path');
var fs = require('fs');
var sitemap = require('./sitemap.js');
var buildZip = require('./buildZip.js');
var carriersUpdate = require('./carriers-update/carriers-update.js');
var trackerSchema = require('./tracker-schema.js');
var refCards = require('./refcards.js');
var libraries = require('./libraries.js');
var deviceRestoreInfo = require('./device-restore-info.js');
const navMenuGenerator = require('./nav_menu_generator.js').metalsmith;
const systemVersion = require('./system-version.js');
 
var handlebars = require('handlebars');
var prettify = require('prettify');
prettify.register(handlebars);
  
//disable autolinking
function noop() { }
noop.exec = noop;
var marked = require('marked');
marked.InlineLexer.rules.gfm.url = noop;

var environment;

var gitBranch;

var generateSearch = process.env.SEARCH_INDEX !== '0';

var noScripts = false; 

var dnsTable = JSON.parse(fs.readFileSync(path.join(__dirname, '../config', 'dnsTable.json')));

exports.metalsmith = function () {
  function removeEmptyTokens(token) {
    if (token.length > 0) {
      return token;
    }
  };
  var metalsmith = Metalsmith(__dirname)
    .concurrency(100)
    .source('../src')
    .destination('../build')
    // Convert assets/less/style.less to assets/css/style.css
    // Put new styles in a .less file in assets/less and include it in style.less
    .use(less({
      pattern: '**/less/style.less',
      useDynamicSourceMap: true
    }))
    // Don't copy the styless partials to the build folder
    // Add other patterns of files that should not be copied
    .use(ignore([
      '**/less/*.less',
      'content/languages/**/*',
      'assets/images/**/*.ai'
    ]))
    .use(msIf(
      environment === 'development',
      buildZip({
        dirs: [
          '../src/assets/files/app-notes/',
          '../src/assets/files/projects/',
        ],
        tmpDir: '../tmp'
    })))
    .use(msIf(
      environment === 'development',
      trackerSchema({
        dir: '../src/assets/files/tracker/',
        officialSchema: 'tracker-edge.json',        
        defaultSchema: 'default-schema.json',
        fragments: [
          'engine-schema',
          'test-schema'
        ]
    })))
    .use(msIf(
      environment === 'development',
      systemVersion({
      })))
    // Minify CSS
    .use(cleanCSS({
      files: '**/*.css'
    }))
    // Auto-generate documentation from the API using comments formatted in the apidoc format
    .use(
      apidoc({
        destFile: 'content/reference/device-cloud/api.md',
        apis: [
          {
            src: '../api-service/',
            config: '../api-service/',
            includeFilters: ['.*[vV]iews[^.]*\\.js$', 'lib/AccessTokenController.js']
          },
          {
            src: '../api-service-libraries/',
            config: '../api-service/',
            includeFilters: ['.*Controller\\.js$']
          },
        ]
      })
    )
    .use(deviceRestoreInfo({
      sourceDir: '../src',
      outputFile: '../src/assets/files/deviceRestore.json',
    }))
    // Auto-generate documentation for the Javascript client library
    .use(insertFragment({
      destFile: 'content/reference/SDKs/javascript.md',
      srcFile: '../particle-api-js/docs/api.md',
      fragment: 'GENERATED_JAVASCRIPT_DOCS',
      preprocess: javascriptDocsPreprocess,
    }))
    // Make all files in this directory available to any Handlebar template
    // Use partials like this: {{> arrows}}
    .use(partials({
      directory: '../templates/partials'
    }))
    // Add properties to files that match the pattern
    .use(fileMetadata([
      { pattern: 'content/**/*.md', metadata: { 
          assets: '/assets', 
          branch: gitBranch, 
          noIndex: (gitBranch == 'staging' || gitBranch == 'prerelease'), 
          noScripts: noScripts,
          srcLocal: path.join(__dirname, '../src') } }
    ]))
    // Inject the dnsTable into introduction.md so it can be used by the dnsTable helper
    .use(fileMetadata([
      { pattern: 'content/tutorials/device-cloud/introduction.md', metadata: { dnsTable: dnsTable } }
    ]))
    .use(msIf(
      environment === 'development',
      fileMetadata([
        { pattern: 'content/**/*.md', metadata: { development: true } },
        { pattern: '**/*.hbs', metadata: { development: true } }
      ])
    ))
    // Handlebar templates for use in the front-end JS code
    .use(precompile({
      directory: '../templates/precompile',
      dest: 'assets/js/precompiled.js',
      knownHelpers: {
        'each': true,
        'if': true
      }
    }))
    // Move files like contents/reference/firmware.md to reference/firmware.md
    .use(moveUp(['content/**/*']))
    // Add a path key to each file, with sub-keys base, dir, ext, name
    .use(paths())
    // Handlebar helpers to use in any Handlebar template
    // Use helpers like this: {{ reset-button }}
    // Note that the last parameter to the helper will be a context object with the file metadata in context.data.root
    .use(helpers({
      directory: '../templates/helpers'
    }))
    .use(planLimits({
      config: '../config/planLimits.json'
    }))
    .use(refCards({
      contentDir: '../src/content',
      sources: [
        'reference/device-os/firmware.md'
      ],
      outputDir: 'cards',
      cardMapping: '../config/card_mapping.json',
      redirects: '../config/redirects.json'
    }))
    .use(libraries({
      sourceDir: '../src/assets/files/libraries',
      searchIndex: '../build/assets/files/librarySearch.json',
      redirects: '../config/redirects.json'
    }))
    .use(navMenuGenerator({      
      contentDir: '../src/content',
    }))
    // Duplicate files that have the devices frontmatter set and make one copy for each device
    // The original file will be replaced by a redirect link
    .use(fork({
      key: 'devices',
      redirectTemplate: '../templates/redirector.html.hbs'
    }))
    // Fix previous / next links when a page doesn't exist for a specific device
    .use(fixLinks({
      key: 'devices'
    }))
    // For files that have the devices key set, add a bunch of properties like has-wifi, has-cellular
    // Use them in Handlebar templates like this:
    // {{#if has-wifi}}Connect to Wi-Fi{{/if}}
    .use(deviceFeatureFlags({
      config: '../config/device_features.json'
    }))
    .use(sitemap({
      config: '../config/sitemap.json',
      output: '../build/sitemap.xml',
      baseUrl: 'https://docs.particle.io/'
    }))
    // Create HTML pages with meta http-equiv='refresh' redirects
    .use(redirects({
      config: '../config/redirects.json'
    }))
    .use(canonical({
      hostname: 'https://docs.particle.io',
      pattern: '**/*.md',
      omitExtensions: ['.md'],
      omitTrailingSlashes: false
    }))
    .use(msIf(
      environment === 'development',
      function(files, metalsmith, done) {
      carriersUpdate.doUpdate(__dirname);
      done();
    }))
    // Replace the {{handlebar}} markers inside Markdown files before they are rendered into HTML and
    // any other files with a .hbs extension in the src folder
    .use(inPlace({
      engine: 'handlebars',
      pattern: ['**/*.md', '**/*.hbs']
    }))
    // Remove the .hbs extension from generated files that contained handlebar markers
    .use(copy({
      pattern: '**/*.hbs',
      transform: function removeLastExtension(file) {
        return path.join(path.dirname(file), path.basename(file, path.extname(file)));
      },
      move: true
    }))
    // THIS IS IT!
    // Render the main docs files into HTML
    .use(markdown())
    // Add a toc key for each file based on the HTML header elements in the file
    .use(autotoc({
      selector: 'h2, h3',
      pattern: '**/**/*.md'
    }))
    // For files that have a template frontmatter key, look for that template file in the configured directory and
    // render that template using the Metalsmith file with all its keys as context
    .use(layouts({
      engine: 'handlebars',
      directory: '../templates/layouts'
    }))
    // Rename files so that about.html is converted into about/index.html
    .use(permalinks({
      relative: false
    }));

  return metalsmith;
};

exports.compress = function (callback) {
  Metalsmith(__dirname)
    .clean(false)
    .concurrency(100)
    .source('../build')
    .destination('../build')
    .build(callback);
};

exports.build = function (callback) {
  git.branch(function (str) {
    gitBranch = process.env.TRAVIS_BRANCH || str;
    exports.metalsmith()
      .build(function (err, files) {
        if (err) {
          throw err;
        }
        if (callback) {
          callback(err, files);
        }
      });
  });
};

exports.test = function (callback) {
  var server = serve({ cache: 300, port: 8081 });
  git.branch(function (str) {
    gitBranch = process.env.TRAVIS_BRANCH || str;
    generateSearch = true;
    exports.metalsmith()
      .use(server)
      .build(function (err, files) {
        if (err) {
          console.error(err, err.stack);
        }
        if (callback) {
          callback(err, files);
        }
      });
  });
  return server;
};

exports.server = function (callback) {
  environment = 'development';
  git.branch(function (str) {
    gitBranch = process.env.TRAVIS_BRANCH || str;
    exports.metalsmith().use(serve({ port: 8080 }))
      .use(watch({
        paths: {
          '${source}/content/**/*.md': true,
          '${source}/assets/less/*.less': 'assets/less/*.less',
          '../templates/layouts/reference.hbs': 'content/reference/*.md',
          '../templates/layouts/datasheet.hbs': 'content/datasheets/**/*.md',
          '../templates/layouts/quickstart.hbs': 'content/quickstart/*.md',
          '../templates/layouts/community.hbs': 'content/community/*.md',
          '../templates/layouts/workshops.hbs': 'content/workshops/**/*.md',
          '../templates/layouts/landing.hbs': 'content/*.md',
          '../templates/layouts/main.hbs': 'content/index.md',
          '../templates/helpers/**/*.hbs': 'content/**/*.md',
          '../templates/partials/**/*.hbs': 'content/**/*.md',
          '${source}/assets/js/*.js*': true,
          '${source}/assets/files/**/*': true,
          '${source}/assets/images/**/*': true,
          '../config/device_features.json': 'content/**/*.md',
          '../api-service/src/**/*.js': 'content/reference/device-cloud/api.md',
          '../config/redirects.json': '**/*'
        },
        livereload: true
      }))
      .build(function (err, files) {
        if (err) {
          console.error(err, err.stack);
        }
        if (callback) {
          callback(err, files);
        }
      });
  });
};
