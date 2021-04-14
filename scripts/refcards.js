'use strict';

const fs = require('fs');
const path = require('path');

function createRefCards(options, srcFile, cardsDir) {
    console.log('processing refCards for ' + srcFile);
    
    const cardsGroup = path.basename(srcFile, '.md');

    const thisCardsDir = path.join(cardsDir, cardsGroup);
    if (!fs.existsSync(thisCardsDir)) {
        fs.mkdirSync(thisCardsDir);
    }

    const mdFile = fs.readFileSync(srcFile, 'utf8');

    // Pass 1: Find all header-based anchors

    let anchors = {};
    let curFolder = '';
    let curFile = '';

    for(const line of mdFile.split('\n')) {
        if (line.startsWith('##')) {
            // Any L2 or higher is an an anchor
            const spaceIndex = line.indexOf(' ');
            if (spaceIndex < 0) {
                continue;
            }

            const origAnchor = line.substr(spaceIndex + 1).trim().toLowerCase().replace(/[^-A-Za-z0-9 ]+/g, ' ').replace(/ +/g, '-');

            if (line.startsWith('## ')) {
                // New L2 header denotes a new folder
                curFolder = origAnchor;
            }
            if (line.startsWith('### ')) {
                // New L3 header denotes a new file
                curFile = origAnchor;
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

        }
    }

    // Pass 2: Replace anchors
    // Example: before [`Particle.connect()`](#particle-connect-) is called

    mdFile.replace(/\]\(#[-A-Za-z0-9]+\)/g, function(replacement) {
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


    // Pass 3: Generate cards
    let curL2 = '';
    let titleL2 = '';
    let curFileContents = '';

    const writeCurFileContents = function() {
        if (curFileContents != '') {
            if (curFolder && curFile) {
                if (!fs.existsSync(path.join(thisCardsDir, curFolder))) {
                    fs.mkdirSync(path.join(thisCardsDir, curFolder));
                }
                fs.writeFileSync(path.join(thisCardsDir, curFolder, curFile + '.md'), curFileContents);
            }

            curFileContents = '';
        }
    };

    for(const line of mdFile.split('\n')) {
        if (line.startsWith('##')) {
            // Any L2 or higher is an an anchor
            const spaceIndex = line.indexOf(' ');
            if (spaceIndex < 0) {
                continue;
            }

            let title = line.substr(spaceIndex + 1).trim();

            const origAnchor = title.toLowerCase().replace(/[^-A-Za-z0-9 ]+/g, ' ').replace(/ +/g, '-');

            const origAnchorNoTrailingDash = origAnchor.replace(/[-]+$/g, '');

            if (line.startsWith('## ') || line.startsWith('### ')) {
                // New L2 header denotes a new folder and file
                writeCurFileContents();

                if (line.startsWith('## ')) {
                    // L2 is a new folder
                    curL2 = line;
                    titleL2 = title;
                    curFile = origAnchorNoTrailingDash;
                    curFolder = origAnchorNoTrailingDash;
                }

                if (line.startsWith('### ')) {
                    // New L3 header denotes a new file
                    curFile = origAnchorNoTrailingDash;
                    title = title + ' - ' + titleL2;
                }

                // 
                curFileContents += '---\n';
                curFileContents += 'title: ' + title + '\n';  
                curFileContents += 'layout: cards.hbs\n';  
                curFileContents += 'columns: two\n';                
                // curFileContents += 'description:\n';                
                curFileContents += '---\n\n';                

                if (curL2 != line) {
                    curFileContents += curL2 + '\n\n';
                }

            }
        }
        
        curFileContents += line + '\n';
    }

    writeCurFileContents();

}


module.exports = function(options) {

	return function(files, metalsmith, done) {
        const cardsDir = metalsmith.path(options.contentDir + '/' + options.outputDir);
        if (!fs.existsSync(cardsDir)) {
            fs.mkdirSync(cardsDir);
        }

        for(let partialDir of options.sources) {
            const srcFile = metalsmith.path(options.contentDir + '/' + partialDir);
            createRefCards(options, srcFile, cardsDir);
        }
		done();
	};
};
