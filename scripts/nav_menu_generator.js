'use strict';

const fs = require('fs');
const path = require('path');
const titleize = require('../templates/helpers/titleize');

let topMenuJson;

function generateNavMenu(fileObj, contentDir) {
    // console.log('fileObj', fileObj);
    if (!fileObj.path || fileObj.path.ext !== '.md') {
        // Only md files could possibly get a nav menu
        return;
    }

    /*
      path: {
        root: '',
        dir: 'tutorials/diagnostics',
        base: 'fleet-health.md',
        ext: '.md',
        name: 'fleet-health',
        href: '/tutorials/diagnostics/'
      },
    */

    let pathParts = fileObj.path.dir.split('/');
    if (pathParts.length == 0) {
        // Items in the root directory don't currently have a nav menu, but they could by changing the code here
        return;
    }
    
    let topLevelName = pathParts[0];
    pathParts.splice(0, 1);

    let sectionName;
    if (pathParts.length > 0) {
        sectionName = pathParts[pathParts.length - 1];
    }

    const menuPath = path.join(contentDir, topLevelName, 'menu.json');
    if (!fs.existsSync(menuPath)) {
        // This is a directory like assets, that isn't in the navigation
        return;
    }

    let curSection;

    let menuJson = JSON.parse(fs.readFileSync(menuPath), 'utf8');

    let tileItem;

    const processArray = function(array) {
        for (let item of array) {
            if (Array.isArray(item)) {
                // Multi-level (like tutorials, reference, datasheets)    
                processArray(item);        
            }
            else {
                // Item in this level
                if (item.href == (fileObj.path.href + fileObj.path.base.replace('.md', '/'))) {
                    item.activeItem = true;
                    if (item.tiles) {
                        tileItem = item;
                    }
                }

                if (item.isSection) {
                    curSection = item.dir;
                }
            }
        }
    };
    processArray(menuJson.items);

    if (menuJson.items.length > 0 && menuJson.items[0].href == fileObj.path.href && menuJson.items[0].tiles) {
        // Handle top level items (Getting Started, Reference, Hardware, etc.) with tiles
        tileItem = menuJson.items[0];
    }

    if (tileItem) {
        let html = '';

        html += '<div class="mainGrid">\n';

        for(const tile of tileItem.tiles) {
            html += '   <div class="mainNoPicRect">\n';
            html += '       <a href="' + tile.href + '" class="mainGridButton">\n';
            html += '           <div class="mainContent">\n';
            html += '               <div class="mainNoPicTopBottom">\n';
            html += '                   <div class="mainNoPicTop">' + tile.title + '</div>\n';
            html += '                   <div class="mainNoPicBottom">' + tile.detail + '</div>\n';
            html += '               </div>\n';
            html += '           </div>\n';
            html += '       </a>\n';
            html += '   </div>\n';
        }

        html += '</div>\n';

        fileObj.tiles = html;
    }

    if (topMenuJson) {
        fileObj.topMenu = '';
        fileObj.topMenuDropdown = '';

        for(const item of topMenuJson.items) {
            let hrefParts = item.href.split('/');
            const isTopLevel = hrefParts.length > 2 && (hrefParts[1] == topLevelName);

            fileObj.topMenu += '<a class="nav ' + (isTopLevel ? "active" : "") + '" href="' + item.href + '">' + item.title + '</a>\n';
            fileObj.topMenuDropdown += '<li><a href="' + item.href + '">' + item.title + '</a></li>\n';
        }
    }

    // Firmware API (multiple page) and libraries generate their own navigation block, so don't override that 
    if (!fileObj.navigation) {
        // The navigation data is inserted using {{{navigation}}} in all layouts to generate the
        // navigation menu. It's passed verbatim, with no additional processing in the layout template.
        fileObj.navigation = generateNavHtml(menuJson);
    }

    // sectionTitle is used for the page titles in the HTML <head> generated from head.hbs
    fileObj.sectionTitle = titleize(topLevelName);
}


function insertIntoMenu(menuJson, outerMenuJson, insertLoc) {
    let resultMenuJson = {
        items: []
    };
    let useNextArray = false;

    const processArray = function(a, dest) {
        for(const e of a) {
            if (Array.isArray(e)) {
                if (useNextArray) {
                    useNextArray = false;
                    dest.push(menuJson);
                }
                else {
                    let a2 = [];
                    processArray(e, a2);
                    dest.push(a2);
                }
            }
            else {
                dest.push(e);
                if (e.insertLoc == insertLoc) {
                    useNextArray = true;
                }
            }
        }
    }
    processArray(outerMenuJson.items, resultMenuJson.items);

    return resultMenuJson;
};


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
            html += '<div style="width:' + indent * 15 + 'px;">&nbsp;</div>'; // Replacement for navIndent2
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
    let noSeparator = false;

    const processArray = function(array, indent) {
        let hasActiveItem = false;
        // console.log('processArray indent=' + indent, array);

        for (const item of array) {
            if (item.isCardSection) {
                nav += '<div class="navContainer">';
                if (indent) {
                    nav += '<div style="width:' + indent * 15 + 'px;">&nbsp;</div>'; // Replacement for navIndent2
                }
                nav += '<div class="navMenu2"><a href="' + item.href + '" class="navLink">' + makeTitle(item) + '</a></div>';
                nav += '</div>'; // navContainer
                cardSections.push(item);
                itemsFlat.push(item);
            }
            else if (item.isSection) {
                // Multi-level section title
                nav += '<div class="navContainer">';
                if (indent) {
                    nav += '<div style="width:' + indent * 15 + 'px;">&nbsp;</div>'; // Replacement for navIndent2
                }
                if (item.href) {
                    nav += '<div class="navMenu1"><a href="' + item.href + '" class="navLink">' + makeTitle(item) + '</a></div></div>';
                }
                else {
                    nav += '<div class="navMenu1">' + makeTitle(item) + '</div></div>';
                }
                if (item.noSeparator) {
                    noSeparator = true;
                }
            }
            else if (Array.isArray(item)) {
                // Multi-level (like tutorials, reference, datasheets)
                processArray(item, indent + 1);

                if (noSeparator) {
                    noSeparator = false;
                }
                else {
                    nav += '<div class="navSectionSpacer"></div>';
                }
                
            }
            else 
            if (item.activeItem || !item.hidden) {
                nav += makeNavMenu2(item, indent);
                itemsFlat.push(item);
            }

            if (item.activeItem) {
                hasActiveItem = true;
            }
        }
        if (hasActiveItem && cardSections.length > 0) {
            cardSections[cardSections.length - 1].activeSection = true;
        }

    };
    processArray(menuJson.items, 0);


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
        const contentDir = metalsmith.path(options.contentDir);

        const menuPath = path.join(contentDir, 'menu.json');
        if (fs.existsSync(menuPath)) {
            topMenuJson = JSON.parse(fs.readFileSync(menuPath), 'utf8');
        }    

        Object.keys(files).forEach(function (fileName) {
            generateNavMenu(files[fileName], contentDir);
        });

        done();
    };
}

module.exports = {
    metalsmith,
    generateNavHtml,
    insertIntoMenu
};
