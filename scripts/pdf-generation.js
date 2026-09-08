'use strict';

/*
 * Generates datasheet PDFs as part of the normal Metalsmith build, instead of via the
 * separate `npm run pdf-generation` gulp task.
 *
 * The old gulpfile (scripts/pdf-generation/pdf-generation-gulpfile.js) read the datasheet
 * Markdown straight off disk and then had to reimplement, with regular expressions, most of
 * what the real Handlebars helpers already do for the website (imageOverlay, box, since,
 * note, ...). This version instead hooks into the Metalsmith pipeline itself and reuses the
 * fully-rendered Markdown that Metalsmith already produces for the website, so none of that
 * duplication is necessary.
 *
 * This module exports two plugins that get installed around the existing `inPlace`
 * (Handlebars) step in scripts/metalsmith.js:
 *
 *   preRender  - installed immediately BEFORE `inPlace`. For every file matching the
 *                configured patterns, clones the file and flags the clone with
 *                `pdf-generation: true`. `inPlace` then renders the clone right alongside
 *                the real page, so helpers/conditionals that key off `pdf-generation` (e.g.
 *                `{{#unless pdf-generation}}...{{/unless}}`, used to hide the web-only
 *                "Download PDF" button) render correctly for the PDF version without any
 *                PDF-specific post-processing.
 *
 *   postRender - installed immediately AFTER `inPlace`. Pulls the fully-rendered Markdown
 *                back out of each clone, removes the clone from `files` (so it never reaches
 *                markdown()/layouts()/permalinks() and doesn't turn into a stray page on the
 *                website), and - if the rendered Markdown changed since the last build and
 *                wkhtmltopdf is installed - regenerates that datasheet's PDF.
 *
 * A hash of each file's rendered Markdown is kept in hashes.json so unchanged datasheets
 * are skipped on the next build. If wkhtmltopdf isn't installed, PDF generation is skipped
 * entirely (the website build itself is unaffected either way).
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFileSync, spawnSync } = require('child_process');
const minimatch = require('minimatch');
const less = require('less');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const marked = require('marked');

// Marks the flag set on a cloned file's metadata, and checked by content authors via
// {{#unless pdf-generation}}...{{/unless}} to hide web-only sections from the PDF.
const PDF_FLAG_KEY = 'pdf-generation';

// The clone always ends in .md so it's picked up by inPlace's `**/*.md` pattern exactly like
// a normal page. postRender() deletes every file with this suffix before markdown() runs.
const CLONE_SUFFIX = '.pdf-source.md';

const SITE_BASE_URL = 'https://docs.particle.io';

let wkhtmltopdfAvailable = null;

function isWkhtmltopdfAvailable() {
  if (wkhtmltopdfAvailable === null) {
    const result = spawnSync('wkhtmltopdf', ['--version']);
    wkhtmltopdfAvailable = !result.error && result.status === 0;
    if (!wkhtmltopdfAvailable) {
      console.log('pdf-generation: wkhtmltopdf is not installed on this machine, skipping datasheet PDF generation');
    }
  }
  return wkhtmltopdfAvailable;
}

function matchesPatterns(file, patterns) {
  return patterns.some(pattern => minimatch(file, pattern));
}

function cloneKeyFor(file) {
  return file.slice(0, -'.md'.length) + CLONE_SUFFIX;
}

function originalKeyFor(cloneKey) {
  return cloneKey.slice(0, -CLONE_SUFFIX.length) + '.md';
}

/*
 * Install just before `.use(inPlace(...))` in scripts/metalsmith.js.
 */
function preRender(options) {
  const patterns = options.patterns || [];

  return function(files, metalsmith, done) {
    if (!isWkhtmltopdfAvailable()) {
      return done();
    }

    Object.keys(files).forEach(function(file) {
      if (!file.endsWith('.md') || !matchesPatterns(file, patterns)) {
        return;
      }

      // Shallow copy so the clone renders with its own `pdf-generation` flag without
      // disturbing the original file object, which still needs to render normally for
      // the website in this same inPlace pass.
      const source = files[file];
      const clone = Object.assign({}, source);
      clone.contents = Buffer.from(source.contents);
      clone[PDF_FLAG_KEY] = true;
      files[cloneKeyFor(file)] = clone;
    });

    done();
  };
}

/*
 * Install just after `.use(inPlace(...))` in scripts/metalsmith.js.
 */
function postRender(options) {
  const patterns = options.patterns || [];

  return function(files, metalsmith, done) {
    const candidates = [];

    Object.keys(files).forEach(function(file) {
      if (!file.endsWith(CLONE_SUFFIX)) {
        return;
      }

      const originalKey = originalKeyFor(file);
      const clone = files[file];

      // Always remove the clone - it must never reach markdown()/layouts()/permalinks(),
      // whether or not it ends up being used to generate a PDF below.
      delete files[file];

      if (matchesPatterns(originalKey, patterns)) {
        candidates.push({
          originalKey: originalKey,
          contents: clone.contents.toString('utf8')
        });
      }
    });

    if (candidates.length === 0 || !isWkhtmltopdfAvailable()) {
      return done();
    }

    generatePdfs(candidates, files, options).then(() => done(), done);
  };
}

async function generatePdfs(candidates, files, options) {
  const hashesFile = options.hashesFile;
  const distribDir = options.distribDir;
  const distribAssetPrefix = options.distribAssetPrefix;
  const coversDir = options.coversDir;
  const stylesEntry = options.stylesEntry;
  const xslFile = options.xslFile;
  const assetsFileUrl = 'file://' + options.assetsDir;

  const existingHashes = loadHashes(hashesFile);
  const newHashes = {};
  const css = await compileCss(stylesEntry);
  const coversDirExists = fs.existsSync(coversDir);

  fs.mkdirSync(distribDir, { recursive: true });
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-pdf-generation-'));

  let generated = 0;
  let unchanged = 0;
  let failed = 0;

  try {
    for (const candidate of candidates) {
      const basename = path.basename(candidate.originalKey, '.md');
      const hash = crypto.createHash('md5').update(hashBasis(candidate.contents)).digest('hex');
      const pdfPath = path.join(distribDir, basename + '.pdf');
      const assetKey = distribAssetPrefix + '/' + basename + '.pdf';

      if (existingHashes[candidate.originalKey] === hash && fs.existsSync(pdfPath)) {
        newHashes[candidate.originalKey] = hash;
        unchanged++;
        continue;
      }

      try {
        const html = markdownToPdfHtml(candidate.contents, css, assetsFileUrl);
        const htmlPath = path.join(tmpDir, basename + '.html');
        fs.writeFileSync(htmlPath, html);

        const coverPath = path.join(coversDir, basename + '.html');
        const hasCover = fs.existsSync(coverPath);
        if (!hasCover && coversDirExists) {
          console.warn('pdf-generation: no cover found for ' + basename + ' datasheet (' + coverPath + ')');
        }

        const args = ['--enable-local-file-access', '--dpi', '300'];
        if (hasCover) {
          args.push('cover', coverPath);
        }
        args.push('toc', '--xsl-style-sheet', xslFile);
        args.push(htmlPath, pdfPath);

        console.log('pdf-generation: generating ' + basename + '.pdf');
        execFileSync('wkhtmltopdf', args, { stdio: ['ignore', 'ignore', 'inherit'] });

        files[assetKey] = {
          contents: fs.readFileSync(pdfPath),
          mode: '0644',
          stats: fs.statSync(pdfPath)
        };

        newHashes[candidate.originalKey] = hash;
        generated++;
      }
      catch (err) {
        // Leave the hash out so this datasheet is retried on the next build.
        failed++;
        console.error('pdf-generation: failed to generate ' + basename + '.pdf: ' + err.message);
      }
    }
  }
  finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  saveHashes(hashesFile, newHashes);

  console.log('pdf-generation: ' + generated + ' generated, ' + unchanged + ' unchanged, ' + failed + ' failed');
}

/*
 * The {{collapse}} helper (used for expandable "Show pin details" sections) bakes a fresh
 * crypto.randomBytes id into its output every time it renders, even when nothing about the
 * page actually changed. Normalize those out before hashing so such pages don't look
 * "changed" - and get their PDF needlessly regenerated - on every single build.
 *
 * These are matched by their literal surrounding markup rather than a bare [0-9a-f]+ scan,
 * because collapse.js embeds the id right after literal text ("...id=\"id...") that can
 * itself end in a hex digit ('d'), which would otherwise make an unanchored hex-run match
 * swallow part of that literal text instead of the id.
 */
function hashBasis(contents) {
  return contents
    .replace(/id="s[0-9a-f]+"/g, 'id="s"')
    .replace(/id="ir[0-9a-f]+"/g, 'id="ir"')
    .replace(/id="id[0-9a-f]+"/g, 'id="id"')
    .replace(/id=" [0-9a-f]+"/g, 'id=""')
    .replace(/for="[0-9a-f]+"/g, 'for=""')
    .replace(/collapseToggle\('[0-9a-f]+'\)/g, "collapseToggle('')");
}

/*
 * Turns the fully Handlebars-rendered datasheet Markdown into a standalone HTML document
 * ready for wkhtmltopdf.
 */
function markdownToPdfHtml(rawMarkdown, css, assetsFileUrl) {
  let md = rawMarkdown;

  // Point references to /assets/... (images, mostly) at the real assets directory on disk
  // so wkhtmltopdf, run with --enable-local-file-access, can embed them directly - no need
  // to copy the assets directory anywhere first.
  md = md.replace(/\/assets\//g, assetsFileUrl + '/');

  // Remaining in-site links (other reference pages, etc.) won't exist next to the generated
  // PDF, so point them at the live website instead.
  md = md.replace(/\]\(\//g, '](' + SITE_BASE_URL + '/');

  // The {{collapse}} helper wraps optional/expandable content (e.g. "Show pin details") in a
  // div that's hidden by default and only revealed by front-end JS that isn't loaded here.
  // There's no interactivity in a PDF, so just show that content unconditionally.
  md = md.replace(/(<div[^>]*\bclass="[^"]*collapseIndent[^"]*"[^>]*)\s+style="display:\s*none"/g, '$1');

  let html = marked(md);

  // Catch any remaining relative "./..." hrefs the same way.
  html = html.replace(/href="\./g, 'href="' + SITE_BASE_URL);

  return '<!DOCTYPE html><html><head><meta charset="utf-8">'
    + '<style>' + css + '</style></head><body>' + html + '</body></html>';
}

function compileCss(entryFile) {
  const source = fs.readFileSync(entryFile, 'utf8');
  return less.render(source, { filename: entryFile }).then(function(output) {
    return postcss([autoprefixer({ overrideBrowserslist: ['Safari >= 6'] })])
      .process(output.css, { from: undefined })
      .then(result => result.css);
  });
}

function loadHashes(hashesFile) {
  try {
    return JSON.parse(fs.readFileSync(hashesFile, 'utf8'));
  }
  catch (e) {
    return {};
  }
}

function saveHashes(hashesFile, hashes) {
  const sorted = {};
  Object.keys(hashes).sort().forEach(function(key) {
    sorted[key] = hashes[key];
  });
  fs.writeFileSync(hashesFile, JSON.stringify(sorted, null, 2) + '\n');
}

module.exports = {
  preRender: preRender,
  postRender: postRender
};
