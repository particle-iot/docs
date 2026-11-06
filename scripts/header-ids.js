/**
 * Metalsmith plugin that gives every matching header (h2, h3 by default) an id attribute.
 *
 * This replaces the deprecated metalsmith-autotoc plugin, keeping the same id behavior:
 * - If the header already has an id, it's kept
 * - Otherwise the id is the header's inner HTML with the first space replaced by a dash
 *
 * The toc property that autotoc added to each file was not used by any template or script, so it
 * is not generated here.
 */
const cheerio = require('cheerio');
const minimatch = require('minimatch');

// The htmlparser2 parser (selected using the xml option, with xmlMode false) matches the behavior of
// cheerio 0.22 used by metalsmith-autotoc: the parse5 parser would move elements such as a table inside
// a paragraph. Entities are decoded when parsing and encoded when serializing, as cheerio 0.22 did.
const parserOptions = { xml: { xmlMode: false, decodeEntities: true } };

module.exports = function headerIds(options) {
    options = options || {};
    const selector = options.selector || 'h2, h3';
    const pattern = options.pattern || '**/*.md';

    return function (files, metalsmith, done) {
        for (const key of Object.keys(files)) {
            const file = files[key];

            const filePath = file.path ? file.path.href + file.path.base : '';
            if (!minimatch(filePath, pattern)) {
                continue;
            }

            // The third parameter (false) parses a fragment so that html, head, and body tags are not added.
            const $ = cheerio.load(file.contents.toString('utf8'), parserOptions, false);
            // htmlparser2 does not decode entities in a textarea, but does encode them when serializing, which
            // would turn &quot; into &amp;quot;. Decode the text once so it round trips unchanged.
            $('textarea').each(function (i, el) {
                const textarea = $(el);
                textarea.text(cheerio.load(textarea.text(), parserOptions, false).root().text());
            });

            $(selector).each(function (i, el) {
                const header = $(el);
                if (!header.attr('id')) {
                    header.attr('id', header.html().replace(/ /, '-'));
                }
            });

            file.contents = Buffer.from($.html());
        }
        done();
    };
};
