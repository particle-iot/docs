'use strict';

const fs = require('fs');
const path = require('path');
var cloneDeep = require('lodash').cloneDeep;

function createRefCards(options, files, fileName) {
    // console.log('processing refCards for ' + fileName);
    
    const cardsGroup = path.basename(fileName, '.md');

    const thisCardsDir = options.outputDir + '/' + cardsGroup;

    const mdFile = files[fileName].contents.toString();

    // Pass 1: Find all header-based anchors

    let anchors = {};
    let curFolder = '';
    let curFile = '';
    let sections = [];
    let curL2 = {};
    
    for(const line of mdFile.split('\n')) {
        if (line.startsWith('##')) {
            // Any L2 or higher is an an anchor
            const spaceIndex = line.indexOf(' ');

            const origTitle = line.substr(spaceIndex + 1).trim();

            const origAnchor = origTitle.toLowerCase().replace(/[^-A-Za-z0-9 ]+/g, ' ').replace(/ +/g, '-');

            const origAnchorNoTrailingDash = origAnchor.replace(/[-]+$/g, '');

            let newFolder = false;

            if (line.startsWith('## ')) {
                // New L2 header denotes a new folder
                curFolder = origAnchorNoTrailingDash;
                curFile = origAnchorNoTrailingDash;
                curL2 = {
                    folder: curFolder,
                    origTitle: origTitle,
                    l3: [],
                    title: origTitle,
                    url: '/' + options.outputDir + '/' + cardsGroup + '/' + curFolder + '/' + curFolder
                };
                newFolder = true;
            }
            if (line.startsWith('### ')) {
                // New L3 header denotes a new file
                curFile = origAnchorNoTrailingDash;
            }
            
            let uniqueAnchor = origAnchor;
            //
            if (anchors[origAnchor]) {
                for(let ii = 1; ; ii++) {
                    uniqueAnchor = origAnchor + '-' + ii;
                    if (!anchors[uniqueAnchor]) {
                        break;
                    }
                }                
            }
            anchors[uniqueAnchor] = {
                folder: curFolder,
                file: curFile,
                anchor: origAnchor
            };


            if (line.startsWith('## ') || line.startsWith('### ')) {
                let obj = {
                    folder: curFolder,
                    newFolder: newFolder,
                    file: curFile,
                    curL2: curL2,
                    content: '',
                    origTitle: origTitle,
                    title: origTitle + ' - ' + curL2.title,
                    url: '/' + options.outputDir + '/' + cardsGroup + '/' + curFolder + '/' + curFile
                };
                curL2.l3.push(obj);
                sections.push(obj);                
                continue;
            }


        }

        if (sections.length) {
            sections[sections.length - 1].content += line + '\n';
        }
    }

    // Generate data now
    for(let section of sections) {
        if (!section.content.replace(/\n/g, '').trim()) {
            // Ignore empty sections
            continue;
        }

        // Replace anchors in content
        section.content = section.content.replace(/\]\(#[-A-Za-z0-9]+\)/g, function(replacement) {
            // console.log('replacement ' + replacement);
            let anchor = replacement.substr(3, replacement.length - 4);
            if (!anchors[anchor]) {
                console.log('missing ' + anchor);
                return replacement;
            }
            else {
                const url = '/' + options.outputDir + '/' + cardsGroup + '/' + anchors[anchor].folder + '/' + anchors[anchor].file + '#' + anchors[anchor].anchor;
                return '](' + url + ')';
            }
        });

        // Clone the original .md source file
        let newFile = cloneDeep(files[fileName]);
        

        newFile.title = section.title;
        newFile.layout = 'cards.hbs';
        newFile.columns = 'two';
        newFile.collection = [];
        newFile.path.dir = thisCardsDir + '/' + section.folder;
        newFile.path.base = section.file + '.md';
        newFile.path.name = section.file;
        newFile.path.href = section.url;
        newFile.noEditButton = true;

        newFile.description = 'Reference manual for the C++ API used by user firmware running on Particle IoT devices';
        delete newFile.redirects;

        // Create new contents
        let contents = '';
        contents += '## ' + section.curL2.title + '\n'; 

        if (section.curL2.title != section.origTitle) {
            contents += '### ' + section.origTitle + '\n'; 
        }

        contents += section.content;
        newFile.contents = Buffer.from(contents); 

        // Generate navigation
        newFile.navigation = '';
        for(const tempSection of section.curL2.l3) {
            newFile.navigation += '<ul>';

            if (tempSection.url === section.url) {
                newFile.navigation += '<li class="top-level active"><span>' + section.origTitle + '</span></li>';
            }
            else {
                if (tempSection.content.replace(/\n/g, '').trim()) {
                    // This is not an empty section
                    newFile.navigation += '<li class="top-level"><a href="' + tempSection.url + '">' + tempSection.origTitle + '</a></li>';
                }
            }

            newFile.navigation += '</ul>';
            /*
                       <ul>
              <li class="top-level active">
                  <span>Testing!</span>
              </li>
            </ul>
           <ul>
              <li class="top-level ">
                  <a href="/quickstart/boron">Boron</a>
              </li>
            </ul>
          </ul>
            */

        }
        //console.log('newFile', newFile);
        
        // Save in metalsmith files so it the generated file will be converted to html
        const newPath = thisCardsDir + '/' + section.folder + '/' + section.file + '.md';
        files[newPath] = newFile;
    }
}


module.exports = function(options) {

	return function(files, metalsmith, done) {
        Object.keys(files).forEach(function(fileName) {
            if (options.sources.includes(fileName)) {
                createRefCards(options, files, fileName);
            }
        });

		done();
	};
};
