'use strict';

const fs = require('fs');
const path = require('path');
var cloneDeep = require('lodash').cloneDeep;

function createRefCards(options, files, fileName, cardMappingPath, redirectsPath) {
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
    let curL3 = null;
    let allL2 = [];
    
    for(const line of mdFile.split('\n')) {
        if (line.startsWith('##')) {
            // Any L2 or higher is an an anchor
            const spaceIndex = line.indexOf(' ');

            const origTitle = line.substr(spaceIndex + 1).trim();

            const origAnchor = origTitle.toLowerCase().replace(/[^-A-Za-z0-9_ ]+/g, ' ').replace(/ +/g, '-');

            const origAnchorNoTrailingDash = origAnchor.replace(/[-]+$/g, '');

            let isL2 = false;

            if (line.startsWith('## ')) {
                // New L2 header denotes a new folder
                curFolder = origAnchorNoTrailingDash;
                curFile = origAnchorNoTrailingDash;
                curL2 = {
                    folder: curFolder,
                    origTitle: origTitle,
                    l3: [],
                    title: origTitle,
                    url: '/' + options.outputDir + '/' + cardsGroup + '/' + curFolder + '/' + curFolder + '/'
                };
                allL2.push(curL2);
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
                anchor: origAnchor,
                url: '/' + options.outputDir + '/' + cardsGroup + '/' + curFolder + '/' + curFile + '/'
            };
            
            if (line.startsWith('####')) {
                // L4 and higher can have direct links
                anchors[uniqueAnchor].url += '#' + origAnchor;
            }

            if (line.startsWith('## ') || line.startsWith('### ')) {
                let obj = {
                    folder: curFolder,
                    file: curFile,
                    curL2: curL2,
                    content: '',
                    origTitle: origTitle,
                    title: origTitle,
                    url: '/' + options.outputDir + '/' + cardsGroup + '/' + curFolder + '/' + curFile + '/'
                };


                curL2.l3.push(obj);
                sections.push(obj);    
                
                if (line.startsWith('## ')) {
                    obj.level = 2;
                    curL3 = null;
                }
                else {
                    curL3 = obj;
                    obj.level = 3;
                    obj.title = origTitle + ' - ' + curL2.title;
                }
                continue;
            }
            if (line.startsWith('#### ')) {
                // L4 is included in the navigation
                if (curL3) {
                    if (!curL3.l4) {
                        curL3.l4 = [];
                    }
                    let obj = {
                        curL3: curL3,
                        level: 4,
                        origTitle: origTitle,
                        origAnchor: origAnchor
                    };
                    curL3.l4.push(obj);
                }
            }


        }

        if (sections.length) {
            sections[sections.length - 1].content += line + '\n';
        }
    }

    // Output the redirect mapping table
    if (cardMappingPath) {
        const oldUrl = '/' + fileName.replace('.md', '') + '/#';  

        let mapping = {};
        for(const anchor in anchors) {
            mapping[oldUrl + anchor] = anchors[anchor].url;
        }
        fs.writeFileSync(cardMappingPath, JSON.stringify(mapping, null, 2));
    }

    // Clean up the case where an L3 is empty, because there are multiple L3 in a row
    // intended to have the same body
    for(let ii = 0; ii < sections.length; ii++) {
        if (!sections[ii].content.replace(/\n/g, '').trim()) {
            if (sections[ii].level == 3) {
                // Is L3 and empty
                for(let jj = ii + 1; jj < sections.length && sections[jj].level >= 3; jj++) {
                    if (sections[jj].content.replace(/\n/g, '').trim()) {
                        // Not empty
                        sections[ii].content = sections[jj].content;
                        break;
                    }                    
                }
            }
        }
    }

    // Clean up the case where the L2 is followed by L3 with no text.
    for(let ii = 0; ii < sections.length; ii++) {
        if (!sections[ii].content.replace(/\n/g, '').trim()) {
            // Section is empty
            
            if (sections[ii].curL2.l3[0].url == sections[ii].url) {
                sections[ii].curL2.l3.splice(0, 1);
                sections[ii].curL2.url = sections[ii].curL2.l3[0].url;
            }
            
            sections.splice(ii, 1);
            ii--;
        }
    }

    // Generate redirects for all directories to the first page in that group
    if (redirectsPath) {
        const origFile = fs.readFileSync(redirectsPath, 'utf8');

        let redirects = JSON.parse(origFile);
     
        // Top level
        redirects['/' + thisCardsDir] = allL2[0].url;

        // All L2s
        for(const curL2 of allL2) {
            redirects['/' + thisCardsDir + '/' + curL2.folder] = curL2.url;
        }

        // Sort the output file
        let redirectsArray = [];
        for(const key in redirects) {
            redirectsArray.push({key:key,value:redirects[key]});
        }
        // Remove the trailing slash on all internal pages
        for(let ii = 0; ii < redirectsArray.length; ii++) {
            if (redirectsArray[ii].value.startsWith('/') && redirectsArray[ii].value.endsWith('/') && redirectsArray[ii].value.length > 1) {
                redirectsArray[ii].value = redirectsArray[ii].value.substr(0, redirectsArray[ii].value.length - 1);
            }
        }
        redirectsArray.sort(function(a, b) {
            return a.key.localeCompare(b.key);
        });
        let redirectsSorted = {};
        for(const obj of redirectsArray) {
            redirectsSorted[obj.key] = obj.value;
        }

        const newFile = JSON.stringify(redirectsSorted, null, 2);
        if (origFile != newFile) {
            fs.writeFileSync(redirectsPath, newFile);
        }
    }

    // Remove Device OS Versions so we don't need to load the Javascript
    for(let ii = 0; ii < allL2.length; ii++) {
        if (allL2[ii].title == 'Device OS Versions') {
            allL2.splice(ii, 1);
            ii--;
        }
    }
    
    // Generate data now
    for(let section of sections) {

        // Replace anchors in content
        section.content = section.content.replace(/\]\(#[-A-Za-z0-9]+\)/g, function(replacement) {
            // console.log('replacement ' + replacement);
            let anchor = replacement.substr(3, replacement.length - 4);
            if (!anchors[anchor]) {
                console.log('missing ' + anchor);
                return replacement;
            }
            else {
                const url = '/' + options.outputDir + '/' + cardsGroup + '/' + anchors[anchor].folder + '/' + anchors[anchor].file + '/#' + anchors[anchor].anchor;
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
        delete newFile.singlePage;

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
        for(const tempL2 of allL2) {
            newFile.navigation += '<ul class="static-toc">';
            if (tempL2.url == section.curL2.url) {
                newFile.navigation += '<li class="top-level active"><span>' + tempL2.origTitle + '</span></li>';

                newFile.navigation += '<div class="in-page-toc-container">';
                for(const tempSection of section.curL2.l3) {
                    newFile.navigation += '<ul class="nav in-page-toc show">';

                    if (tempSection.url === section.url) {
                        newFile.navigation += '<li class="middle-level active"><span>' + section.origTitle + '</span></li>';

                        if (tempSection.l4) {
                            newFile.navigation += '<ul class="nav secondary-in-page-toc" style="display:block">';
                            for(const tempL4 of tempSection.l4) {
                                newFile.navigation += '<li data-secondary-nav><a href="#' + tempL4.origAnchor + '">' + tempL4.origTitle + '</a></li>';
                            }
                            newFile.navigation += '</ul>';
                        }
                    }
                    else {
                        newFile.navigation += '<li class="middle-level"><a href="' + tempSection.url + '">' + tempSection.origTitle + '</a></li>';
                    }


                    newFile.navigation += '</ul>';
                }
                newFile.navigation += '</div">';

            }
            else {
                newFile.navigation += '<li class="top-level"><a href="' + tempL2.url + '">' + tempL2.origTitle + '</a></li>';
            }
            newFile.navigation += '</ul>';
        }
        
        // Save in metalsmith files so it the generated file will be converted to html
        const newPath = thisCardsDir + '/' + section.folder + '/' + section.file + '.md';
        files[newPath] = newFile;
    }
}


module.exports = function(options) {

	return function(files, metalsmith, done) {
        Object.keys(files).forEach(function(fileName) {
            if (options.sources.includes(fileName)) {
                createRefCards(options, files, fileName, metalsmith.path(options.cardMapping), metalsmith.path(options.redirects));
            }
        });

		done();
	};
};
