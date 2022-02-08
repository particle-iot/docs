'use strict';

const fs = require('fs');
const path = require('path');
const titleize = require('../templates/helpers/titleize');

function generateNavMenu(fileObj, contentDir) {
    // console.log('fileObj', fileObj);
    if (!fileObj.path || fileObj.path.ext !== '.md') {
        // Only md files could possibly get a nav menu
        return;
    }

    const parse1 = path.parse(fileObj.path.dir);

    // if parse1.dir is '' then this is a one-level menu, like community or quickstart
    let topLevelName;
    let sectionName;
    if (parse1.dir) {
        topLevelName = parse1.dir;
        sectionName = parse1.base;
    }
    else {
        topLevelName = parse1.base;
    }
    if (!topLevelName) {
        // Items in the root directory don't currently have a nav menu, but they could by changing the code here
        return;
    }

    const menuPath = path.join(contentDir, topLevelName, 'menu.json');
    if (!fs.existsSync(menuPath)) {
        // This is a directory like assets, that isn't in the navigation
        return;
    }

    let curSection;

    let menuJson = JSON.parse(fs.readFileSync(menuPath), 'utf8');

    for (let item of menuJson.items) {
        if (Array.isArray(item)) {
            // Multi-level (like tutorials, reference, datasheets)            
            for (let itemInner of item) {
                if (itemInner.dir === fileObj.path.name) {
                    if (!sectionName || sectionName == curSection) {
                        itemInner.activeItem = true;
                    }
                }
            }    
        }
        else {
            // Single level deep (like quickstart or community)
            if (item.dir === fileObj.path.name) {
                item.activeItem = true;
            }
            if (item.isSection) {
                curSection = item.dir;
            }
        }
    }


    fileObj.navigation = generateNavHtml(menuJson);

    fileObj.sectionTitle = titleize(topLevelName);
}

function generateNavHtml(menuJson) {
    // console.log('base=' + fileObj.path.base + ' topLevelName=' + topLevelName + ' sectionName=' + sectionName);

    let nav = '';

    const makeTitle = function (item) {
        let title = item.title || titleize(item.dir);

        title = title.replace('&', '&amp;');

        return title;
    };

    const makeNavMenu2 = function (item, indent) {
        let html = '';

        html += '<div class="navContainer">';

        if (indent) {
            html += '<div class="navIndent2">&nbsp;</div>'
        }

        if (item.activeItem) {
            html += '<div class="navActive2">' + makeTitle(item) + '</div>';
            html += '<div class="navPlusMinus"><i class="ion-minus"></i></div>';
        }
        else {
            html += '<div class="navMenu2"><a href="' + item.href + '" class="navLink">' + makeTitle(item) + '</a></div>';
        }

        html += '</div>'; // navContainer

        if (item.activeItem) {
            html += '<div id="navActiveContent"></div>';
        }

        return html;
    };

    nav += '<div class="navMenuOuter">';

    let itemsFlat = [];
    let cardSections = [];

    for (const item of menuJson.items) {
        if (item.isCardSection) {
            nav += '<div class="navContainer">';
            nav += '<div class="navMenu2"><a href="' + item.href + '" class="navLink">' + makeTitle(item) + '</a></div>';
            nav += '</div>'; // navContainer
            cardSections.push(item);
            itemsFlat.push(item);
        }
        else if (item.isSection) {
            // Multi-level section title
            nav += '<div class="navContainer"><div class="navMenu1">' + makeTitle(item) + '</div></div>';
        }
        else if (Array.isArray(item)) {
            // Multi-level (like tutorials, reference, datasheets)
            let hasActiveItem = false;
            
            for (const itemInner of item) {
                nav += makeNavMenu2(itemInner, true);
                itemsFlat.push(itemInner);
                if (itemInner.activeItem) {
                    hasActiveItem = true;
                }
            }
            nav += '<div class="navSectionSpacer"></div>';
            
            if (hasActiveItem && cardSections.length > 0) {
                cardSections[cardSections.length - 1].activeSection = true;
            }
        }
        else {
            // Single level deep (like quickstart or community)
            nav += makeNavMenu2(item, false);
            itemsFlat.push(item);
        }
    }
    nav += '</div>'; // navMenuOuter

    // Generate keyboard and swipe navigation directions for this page
    let navigationInfo = {};
    let itemFound = false;

    for(let ii = 0; ii < itemsFlat.length; ii++) {
        if (itemsFlat[ii].activeItem) {
            if (ii > 0) {
                navigationInfo.prevLink = itemsFlat[ii - 1].href;
            }
            if ((ii + 1) < itemsFlat.length) {
                navigationInfo.nextLink = itemsFlat[ii + 1].href;
            }
            itemFound = true;
            break;
        }
    }
    if (!itemFound && itemsFlat.length >= 2) {
        navigationInfo.nextLink = itemsFlat[1].href;
    }

    itemFound = false;
    for(let ii = 0; ii < cardSections.length; ii++) {
        if (cardSections[ii].activeSection) {
            if (ii > 0) {
                navigationInfo.prevGroup = cardSections[ii - 1].href;
            }
            if ((ii + 1) < cardSections.length) {
                navigationInfo.nextGroup = cardSections[ii + 1].href;
            }
            itemFound = true;
            break;
        }
    }
    if (!itemFound && cardSections.length >= 2) {
        navigationInfo.nextGroup = cardSections[1].href;
    }

    nav += '<script>navigationInfo=' + JSON.stringify(navigationInfo) + '</script>';
    

    return nav;
}

/*
fileObj {
  word: 'Fleet Health',
  title: 'Fleet Health',
  order: 3,
  shared: true,
  columns: 'two',
  layout: 'tutorials.hbs',
  contents: <Buffer 0a 23 20 7b 7b 74 69 74 6c 65 7d 7d 0a 0a 41 73 20 79 6f 75 20 62 65 67 69 6e 20 64 65 70 6c 6f 79 69 6e 67 20 6d 6f 72 65 20 63 6f 6e 6e 65 63 74 65 ... 9060 more bytes>,
  mode: '0644',
  stats: Stats {
    ...
  },
  assets: '/assets',
  branch: 'feature/navigation',
  noIndex: false,
  noScripts: false,
  srcLocal: '/Users/rick/Documents/src/docs/src',
  development: true,
  path: {
    root: '',
    dir: 'tutorials/diagnostics',
    base: 'fleet-health.md',
    ext: '.md',
    name: 'fleet-health',
    href: '/tutorials/diagnostics/'
  },
  collection: [ 'tutorials.diagnostics' ],
  section: 'diagnostics',

*/

function metalsmith(options) {
    return function (files, metalsmith, done) {
        Object.keys(files).forEach(function (fileName) {
            generateNavMenu(files[fileName], metalsmith.path(options.contentDir));
        });

        done();
    };
}

module.exports = {
    metalsmith,
    generateNavHtml
};
