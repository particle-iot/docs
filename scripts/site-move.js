//Site Updater Script

// Examples:
// node scripts/site-move.js -s '/tutorials/device-os/led' -d '/reference/device-os/led'
// node scripts/site-move.js -s '/datasheets/discontinued/particle-shields' -d '/datasheets/accessories/legacy-accessories'

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
var jsdiff = require('diff');

var argv = require('yargs') // eslint-disable-line
  .usage('Usage: $0 -s [url] -d [url]')
  .alias('s', 'source')
  .nargs('s', 1)
  .describe('s', 'source url')
  .alias('d', 'dest')
  .nargs('d', 1)
  .describe('d', 'destination url')
  .alias('x', 'execute')
  .describe('x', 'execute the change (save changes to file system)')
  .demandOption(['s', 'd']).argv;

var contentDir = path.join(__dirname, '../src/content');

var configDir = path.join(__dirname, '../config');

var sourceMd;
var sourceLayout;

var destMd;
var destLayout;

var layouts = {
  community: 'community.hbs',
  workshops: 'workshops.hbs',
  datasheets: 'datasheet.hbs',
  quickstart: 'quickstart.hbs',
  reference: 'reference.hbs',
  support: 'support.hbs',
  tutorials: 'tutorials.hbs'
};

sourceMd = urlToMdPath(argv.s);
if (sourceMd == '' || !fs.existsSync(path.join(contentDir, sourceMd))) {
  console.log(chalk.red('Error!') + ' source file does not exist ' + sourceMd);
  process.exit(1);
}

destMd = urlToMdPath(argv.d);
if (destMd == '' || fs.existsSync(path.join(contentDir, destMd))) {
  console.log(chalk.red('Error!') + ' Destination already exists ' + destMd);
  process.exit(1);
}

preflight1();

function preflight1() {
  sourceLayout = getLayout(sourceMd);
  if (sourceLayout == '') {
    console.log(
      chalk.red('Error!') +
        " Path does not specify a known layout, can't be moved"
    );
    done();
    return;
  }

  destLayout = getLayout(destMd);
  if (destLayout == '') {
    console.log(
      chalk.red('Error!') +
        " Path does not specify a known layout, can't be moved"
    );
    done();
    return;
  }

  if (path.dirname(sourceMd) != path.dirname(destMd)) {
    console.log('- moving file between directories');
  }
  if (path.basename(sourceMd) != path.basename(destMd)) {
    console.log('- renaming file');
  }

  if (sourceLayout != destLayout) {
    console.log(
      '- will change layout from ' + sourceLayout + ' to ' + destLayout
    );
    checkLayout({
      sourceMd: sourceMd,
      sourceLayout: sourceLayout,
      destLayout: destLayout
    });
  }

  checkRedirects({
    fromUrl: mdPathToUrl(sourceMd),
    toUrl: mdPathToUrl(destMd)
  });

  checkContent({ fromUrl: mdPathToUrl(sourceMd), toUrl: mdPathToUrl(destMd) });

  if (argv.x) {
    var srcPath = path.join(contentDir, sourceMd);
    var dstPath = path.join(contentDir, destMd);
    console.log('- ' + chalk.cyan('Renamed: ') + srcPath + ' to ' + dstPath);
    fs.renameSync(srcPath, dstPath);
  }
}

function checkLayout(options) {
  var mdPath = path.join(contentDir, options.sourceMd);
  var textData = fs.readFileSync(mdPath, 'utf8');

  var replacementData = textData.replace(
    /layout *: *[^\n]+/,
    'layout: ' + options.destLayout
  );

  console.log(jsdiff.createPatch(mdPath, textData, replacementData, '', ''));

  if (argv.x) {
    console.log('- ' + chalk.cyan('Updated: ') + mdPath);
    fs.writeFileSync(mdPath, replacementData);
  }
}

function checkRedirects(options) {
  // sourceMd (string) -
  // destMd (string) -

  var redirectsPath = path.join(configDir, 'redirects.json');

  var textData = fs.readFileSync(redirectsPath, 'utf8');

  var jsonData = JSON.parse(textData);

  for (var key in jsonData) {
    if (jsonData[key] == options.fromUrl) {
      console.log(
        '- ' +
          key +
          ' was redirected to ' +
          options.fromUrl +
          ' changing to ' +
          options.toUrl
      );
      jsonData[key] = options.toUrl;
    }
  }

  jsonData[options.fromUrl] = options.toUrl;
  console.log('- redirecting ' + options.fromUrl + ' to ' + options.toUrl);

  var newFile = JSON.stringify(jsonData, Object.keys(jsonData).sort(), 4);

  console.log(jsdiff.createPatch('redirects.json', textData, newFile, '', ''));

  if (argv.x) {
    console.log('- ' + chalk.cyan('Updated: ') + redirectsPath);
    fs.writeFileSync(redirectsPath, newFile);
  }
}

function checkContent(options) {
  checkContentDir(options, contentDir);
}

function checkContentDir(options, dir) {
  var files = fs.readdirSync(dir, 'utf8');
  for (var ii = 0; ii < files.length; ii++) {
    var file = files[ii];
    var dirAndFile = path.join(dir, file);

    if (file.endsWith('.md')) {
      checkContentFile(options, dirAndFile);
    } else {
      var stat = fs.statSync(dirAndFile);
      if (stat.isDirectory()) {
        checkContentDir(options, dirAndFile);
      }
    }
  }
}

function checkContentFile(options, mdPath) {
  var md = fs.readFileSync(mdPath, 'utf8');
  var orig = new String(md);

  var start = 0;

  var updated = false;

  while (true) {
    var possible = md.indexOf('](', start);
    if (possible < 0) {
      break;
    }
    var end = md.indexOf(')', possible + 2);
    if (end >= 0) {
      var href = md.substring(possible + 2, end);

      if (href.startsWith(options.fromUrl)) {
        console.log('fixing link ' + href);
        md =
          md.substring(0, possible + 2) +
          options.toUrl +
          md.substring(possible + 2 + options.fromUrl.length);
        updated = true;
        start = end + (options.toUrl.length - options.fromUrl.length);
      } else {
        start = end + 1;
      }
    } else {
      start = possible + 2;
    }
  }

  if (updated) {
    console.log(jsdiff.createPatch(mdPath, orig, md, '', ''));

    if (argv.x) {
      console.log('- ' + chalk.cyan('Updated: ') + mdPath);
      fs.writeFileSync(mdPath, md);
    }
  }
}

function urlToMdPath(url) {
  if (url.startsWith('/')) {
    if (url.endsWith('/')) {
      // Remove trailing slash
      url = url.substring(0, url.length - 1);
    }
    return url.substring(1) + '.md';
  } else {
    return '';
  }
}

function mdPathToUrl(mdPath) {
  return '/' + mdPath.replace('.md', '');
}

function getLayout(mdPath) {
  var part = parseToSlash(mdPath);
  if (part === '') {
    // No directory = landing page
    return 'landing.hbs';
  } else {
    return layouts[part];
  }
}

function parseToSlash(str) {
  var index = str.indexOf('/');
  if (index > 0) {
    return str.substring(0, index);
  } else {
    return '';
  }
}
