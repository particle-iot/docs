var Handlebars = require('handlebars');

/*
Adds an in-page table of contents with links to the headings on the page.

Usage:

{{content-nav}}            - Links to the H2 headings
{{content-nav h3=true}}    - Links to the H2 and H3 headings, with H3 indented below its H2

This only outputs a placeholder. The list is generated at runtime by 
navMenu.loadContentNav() in src/assets/js/navmenu.js.
*/

module.exports = function(context) {
    const levels = (context && context.hash && context.hash.h3) ? 3 : 2;

    return new Handlebars.SafeString('<div class="content-nav" data-levels="' + levels + '"></div>');
};
