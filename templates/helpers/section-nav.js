var Handlebars = require('handlebars');

/*
Adds previous/next buttons and a "jump to page" select for navigating the pages in the
current section of the left-hand navigation (as defined in newMenu.json).

Usage (typically at the top and bottom of the page):

{{section-nav}}

This only outputs a placeholder. The controls are filled in at runtime by
navMenu.loadSectionNav() in src/assets/js/navmenu.js, after the menu has been loaded.
*/

module.exports = function(context) {
    return new Handlebars.SafeString('<div class="section-nav"></div>');
};
