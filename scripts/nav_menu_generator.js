'use strict';

const fs = require('fs');
const path = require('path');
const titleize = require('../templates/helpers/titleize');

let topMenuJson;

function generateNavMenu(files, fileName, contentDir) {
    let fileObj = files[fileName];
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

    const menuPath = path.join(contentDir, topLevelName, 'newMenu.json');
    if (!fs.existsSync(menuPath)) {
        // This is a directory like assets, that isn't in the navigation
        return;
    }

    let curSection;

    let menuJson = JSON.parse(fs.readFileSync(menuPath), 'utf8');

    let tileItem;

    const processArray = function(dir, array) {
        for (let item of array) {
            // Item in this level
            const href = '/' + dir + '/' + item.dir + '/';

            if (href == (fileObj.path.href + fileObj.path.base.replace('.md', '/'))) {
                item.activeItem = true;
                if (item.tiles) {
                    tileItem = item;
                }
                if (item.hidden || item.internal) {
                    fileObj.noIndex = true;
                }
            }

            if (item.isSection) {
                curSection = item.dir;
            }
            
            if (typeof item.subsections != 'undefined') {
                processArray(dir + '/' + item.dir, item.subsections);
            }
        }
    };
    processArray(menuJson.dir, menuJson.items);

    if (menuJson.items.length > 0 && menuJson.items[0].href == fileObj.path.href && menuJson.items[0].tiles) {
        // Handle top level items (Getting Started, Reference, Hardware, etc.) with tiles
        tileItem = menuJson.items[0];
    }

    if (tileItem) {
        let html = '';


        if (typeof tileItem.tileFormat === 'string' && tileItem.tileFormat == 'application-notes') {
            // Application note style, with picture
            html += '<div class="mainGridHome">\n';

            for(const tile of tileItem.tiles) {

                html += '	<div class="mainSquare">\n';
                html += '       <a href="' + tile.href + '" class="mainGridButton">\n';
                html += '			<div class="mainContent">\n';
                html += '				<div class="mainTopBottom">\n';
                html += '					<div class="applicationNoteTop">\n'; // Based on mainTop
                html += '						<img src="' + tile.img + '" class="applicationNoteGridImg"/>\n'; // Based on mainGridImg
                html += '					</div>\n';
                html += '					<div class="mainBottom">\n';
                html += '						<div class="mainBoxTitle">' + tile.title + '</div>\n';
                html += '						<div class="mainBoxDescription">' + tile.detail + '</div>\n';
                html += '					</div>\n';
                html += '				</div>\n';
                html += '			</div>\n';
                html += '		</a>\n';
                html += '	</div>\n';

            }

            html += '</div>\n';
        }
        else {
            // Normal style
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
        }


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
        // Used to call this  generateNavHtml(menuJson) to generate it statically, but now generates at runtime and fills in this div.
        fileObj.navigation = '<div class="navMenuOuter"></div>';
    }

    // sectionTitle is used for the page titles in the HTML <head> generated from head.hbs
    fileObj.sectionTitle = titleize(topLevelName);
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

        const menuPath = path.join(contentDir, 'newMenu.json');
        if (fs.existsSync(menuPath)) {
            topMenuJson = JSON.parse(fs.readFileSync(menuPath), 'utf8');
        }    

        Object.keys(files).forEach(function (fileName) {
            generateNavMenu(files, fileName, contentDir);
        });


        done();
    };
}

module.exports = {
    metalsmith,
};
