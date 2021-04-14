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
                sections.push({
                    folder: curFolder,
                    newFolder: newFolder,
                    file: curFile,
                    curL2: curL2,
                    content: '',
                    origTitle: origTitle,
                    title: origTitle + ' - ' + curL2.title,
                    url: '/' + options.outputDir + '/' + cardsGroup + '/' + curFolder + '/' + curFile
                });                
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

        let newFile = cloneDeep(files[fileName]);
        
        newFile.title = section.title;
        newFile.layout = 'cards.hbs';
        newFile.columns = 'two';
        // delete description and redirects?

        let contents = '';
        contents += '## ' + section.curL2.title + '\n'; 

        if (section.curL2.title != section.origTitle) {
            contents += '### ' + section.origTitle + '\n'; 
        }

        contents += section.content;

        newFile.contents = Buffer.from(contents); 

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
