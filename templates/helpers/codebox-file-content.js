var fs = require('fs');
var path = require('path');

/*
Usage (from templates/partials/codebox.hbs only):

{{codebox-file-content content=content}}

Normally the {{> codebox}} partial leaves its <code> element empty and relies on client-side
JS (see src/assets/js/collapse.js) to fetch `content` (a site-root-relative path, e.g.
"/assets/files/tether-mhat.cpp") and inject it. That fetch never runs when a page is rendered
for PDF generation (see scripts/pdf-generation.js) - there's no browser, no JS bundle, and no
live site to fetch from - so the codebox would otherwise come out empty in the PDF.

This helper instead reads the same file directly off disk at render time and returns its
contents as plain text, which codebox.hbs uses in place of the empty AJAX-driven <code>
element specifically when rendering for PDF (pdf-generation: true). It returns a plain string,
not a SafeString, so Handlebars HTML-escapes it - exactly what's needed to place raw source
inside a <pre><code> block safely.
*/

// __dirname is templates/helpers; /assets/... paths passed to codebox are relative to src/.
var srcDir = path.join(__dirname, '..', '..', 'src');

module.exports = function(context) {
  var content = context.hash.content;
  if (!content) {
    return '';
  }

  try {
    return fs.readFileSync(path.join(srcDir, content), 'utf8');
  }
  catch (e) {
    console.warn('codebox-file-content: could not read ' + content + ': ' + e.message);
    return '';
  }
};
