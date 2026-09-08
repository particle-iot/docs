# How datasheet PDFs are generated

PDF versions of the datasheets and technical advisory notices are generated as part of the
normal site build (`npm run build`, `npm start`) by `scripts/pdf-generation.js`, which is wired
into `scripts/metalsmith.js`. There's no separate `npm run pdf-generation` step anymore.

**Make sure you've done the following first:**
- Install all the **dependencies** with `npm install`
- Install **wkhtmltopdf** tool (0.12.4+) for your system from https://wkhtmltopdf.org/downloads.html.
  If it isn't installed, PDF generation is silently skipped and the rest of the site still builds
  normally.
- Have **[Montserrat](https://github.com/JulietaUla/Montserrat) and [Fira Mono](https://github.com/mozilla/Fira) fonts** installed in your system (alternative links on Font Squirrel: [Montserrat](https://www.fontsquirrel.com/fonts/montserrat), [Fira Mono](https://www.fontsquirrel.com/fonts/fira-mono); on Google Fonts: [Montserrat](https://fonts.google.com/specimen/Montserrat), [Fira Mono](https://fonts.google.com/specimen/Fira+Mono))

## How it fits into the Metalsmith build

Which files are candidates for PDF generation is configured in `scripts/metalsmith.js`
(`pdfGenerationOptions.patterns`). Right now that's:

- `src/content/reference/datasheets/**/*.md`
- `src/content/reference/technical-advisory-notices/*.md`

Two small plugins from `scripts/pdf-generation.js` are installed immediately around the existing
`inPlace` (Handlebars) step:

1. **preRender** (just before `inPlace`) clones each matching file and sets `pdf-generation: true`
   on the clone's metadata. When `inPlace` runs immediately afterwards, the clone is rendered
   through the exact same Handlebars helpers and partials as the real page - including
   `{{#unless pdf-generation}}...{{/unless}}`, which datasheet content uses to hide web-only
   sections (like the "Download PDF" button) from the PDF.
2. **postRender** (just after `inPlace`) pulls the fully-rendered Markdown back out of each clone,
   deletes the clone from the pipeline (so it never turns into a page on the website), and, if
   that Markdown has changed since the last build, regenerates the datasheet's PDF with
   `wkhtmltopdf`.

Because generation happens from the same processed Markdown Metalsmith already produces for the
website, none of the old gulp task's regex-based reimplementations of `imageOverlay`, `box`,
`since`, `note`, etc. are needed - they're just real Handlebars helpers now.

## Change detection

An MD5 hash of each file's fully-rendered Markdown is kept in `hashes.json`. If a datasheet's
rendered Markdown hasn't changed and its PDF already exists, generation is skipped. The hash is
of the *rendered* Markdown, not the source file on disk, so a PDF is also regenerated when
something upstream of Handlebars changes its output (e.g. shared blurbs, device feature flags).

## Datasheets

All content for datasheets is in Markdown files in `src/content/reference/datasheets/`. Those
Markdown files are shared for both the web version and the PDF.

Mark sections for the web version only **using `{{#unless pdf-generation}}`**:

```
{{#unless pdf-generation}}
Only web content!
{{/unless}} {{!-- pdf-generation --}}
```

## Page Breaks

To add a page break, just add a line with `---` (Markdown's syntax for `<hr>`).

## Cover Pages

For each datasheet Markdown file, an HTML cover page with the same base name in
`src/content/reference/datasheets/covers/` is used, if present. If that directory (or a specific
cover file) doesn't exist, the datasheet is generated without a cover page.

## Table of Contents

The table of contents is generated automatically by `wkhtmltopdf` from the page's headers. To
customize it, edit `toc.xsl` in this directory.

## Changing Page Styles

The stylesheet for the PDF pages is `styles/datasheets.less` in this directory (compiled with
`less` + `autoprefixer` and inlined into each generated PDF's HTML).

## Output

Generated PDFs are written to `src/assets/pdfs/datasheets/<name>.pdf`, named after the datasheet's
Markdown filename (not its full path), matching the URLs already hard-coded via `downloadButton`
in datasheet content.
