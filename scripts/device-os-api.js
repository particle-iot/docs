'use strict';

const fs = require('fs');
const path = require('path');
var cloneDeep = require('lodash').cloneDeep;


function generateDeviceOsApiMultiPage(options, files, fileName, cardMappingPath, redirectsPath, contentDir) {
    // console.log('processing refCards for ' + fileName);
    
    const outerMenuJson = JSON.parse(fs.readFileSync(path.join(contentDir, 'reference', 'menu.json')));

    const apiMenusRelativePath = 'assets/files/apiMenus.json';
    const apiMenusJsonPath = path.join(contentDir, '../' + apiMenusRelativePath);

    const destDir = options.outputDir;

    const mdFile = files[fileName].contents.toString();

    // Pass 1: Find all header-based anchors

    let anchors = {};
    let curFolder = '';
    let curFile = '';
    let sections = [];
    let curL2 = {};
    let curL3 = null;
    let allL2 = [];
    
    let apiIndexJson = {
        sections: [],
        folderTitles: {},
    };
    let apiMenusJson = {
        items: [],
    };

    for(const line of mdFile.split('\n')) {
        if (line.startsWith('##')) {
            // Any L2 or higher is an an anchor
            const spaceIndex = line.indexOf(' ');

            const origTitle = line.substr(spaceIndex + 1).trim().replace(/&/g, '&amp;');

            let origAnchor = origTitle.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w]+/g, '-');
            if (origAnchor === 'constructor') {
                origAnchor += '-';
            }

            // const origAnchor = origTitle.toLowerCase().replace(/&/g, 'amp-').replace(/[^-A-Za-z0-9_]+/g, ' ').replace(/ +/g, '-');

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
                    url: '/' + options.outputDir + '/' + curFolder + '/' + curFolder + '/'
                };
                if (origTitle == 'Device OS versions') {
                    curL2.omitSection = true;
                }

                if (!curL2.omitSection) {
                    allL2.push(curL2);
                }
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
                url: '/' + options.outputDir + '/' + curFolder + '/' + curFile + '/'
            };
            
            if (line.startsWith('####')) {
                // L4 and higher can have direct links
                anchors[uniqueAnchor].url += '#' + origAnchor;

                const spaceIndex = line.indexOf(' ');
                
                sections[sections.length - 1].subsections.push({
                    level: spaceIndex,
                    anchor: origAnchor,
                    title: line.substring(spaceIndex + 1).trim(),
                });
            }

            if (line.startsWith('## ') || line.startsWith('### ')) {
                let obj = {
                    folder: curFolder,
                    file: curFile,
                    curL2: curL2,
                    content: '',
                    origTitle: origTitle,
                    title: origTitle,
                    url: '/' + options.outputDir + '/' + curFolder + '/' + curFile + '/',
                    subsections: [],
                };


                curL2.l3.push(obj);

                if (!curL2.omitSection) {
                    sections.push(obj);    
                }

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
            if (line.startsWith('## Device OS versions')) {
                // This is no longer included in the index as it's huge and doesn't render properly either
                // It must be the last thing in the file, as everything after it is ignored!
                break;
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
    const origFile = fs.readFileSync(redirectsPath, 'utf8');

    let redirects = JSON.parse(origFile);

    // Top level
    redirects['/' + destDir] = allL2[0].url;

    // All L2s
    for(const curL2 of allL2) {
        redirects['/' + destDir + '/' + curL2.folder] = curL2.url;

        apiIndexJson.folderTitles[curL2.folder] = curL2.origTitle;

        apiMenusJson.items.push({
            title: curL2.origTitle,
            folder: curL2.folder,
            subsections: [],
        });
    }

    {
        // Sort L2 headers alphabetically
        let introductionItem;
        for(let ii = 0; ii < apiMenusJson.items.length; ii++) {
            if (apiMenusJson.items[ii].folder == 'introduction') {
                introductionItem = apiMenusJson.items[ii];
                apiMenusJson.items.splice(ii, 1);
                break;
            }
        }

        apiMenusJson.items.sort((a,b) => a.title.localeCompare(b.title));

        apiMenusJson.items.splice(0, 0, introductionItem);
    }

    // Generate data now
    for(let section of sections) {

        // Replace anchors in content
        section.content = section.content.replace(/\]\(#[-A-Za-z0-9_]+\)/g, function(replacement) {
            // console.log('replacement ' + replacement);
            let anchor = replacement.substr(3, replacement.length - 4);
            if (!anchors[anchor]) {
                console.log('missing ' + anchor);
                return replacement;
            }
            else {
                const url = '/' + options.outputDir + '/' + anchors[anchor].folder + '/' + anchors[anchor].file + '/#' + anchors[anchor].anchor;
                return '](' + url + ')';
            }
        });

        let l3obj = {
            title: section.title,
            dir: section.folder,
            file: section.file,
            subsections: [],
        }

        // section.subsections is flat array of objects:
        //    level: 4 or higher (corresponds to the number of # in the section header)
        //    anchor: sanitized html anchor in the file 
        //    title: title from the section header

        // This gets converted into nested objects to make it easier to render as a hierarchical list
        // item.subsections: Array of objects
        //   anchor: h4 anchor
        //   title: h4 title
        //   subsections: Array of objects if there are h5 headers
        {
            let curL4;

            for(const obj of section.subsections) {
                if (obj.level == 4) {
                    delete obj.level;
                    obj.c = true;
                    l3obj.subsections.push(obj);
                    curL4 = obj;
                }
                else if (obj.level == 5) {
                    // Deepest header is h5, and there are not many of them (except in the old firmware version list)
                    if (!curL4.subsections) {
                        curL4.subsections = [];
                    }
                    delete obj.level;
                    obj.c = true;
                    curL4.subsections.push(obj);
                }
            }
        }

        if (l3obj.subsections.length == 0) {
            delete l3obj.subsections;
        }

        const folderItem = apiMenusJson.items.find(e => e.folder == section.folder);
        if (folderItem) {
            folderItem.subsections.push(l3obj);
        }
        else {
            console.log('missing folder in apiMenusJson.items ' + section.folder);
        }
        
        delete section.subsections;


        // Clone the original .md source file
        let newFile = cloneDeep(files[fileName]);
        

        newFile.title = section.title;
        newFile.layout = 'firmwareReference.hbs';
        newFile.columns = 'two';
        newFile.collection = [];
        newFile.path.dir = destDir + '/' + section.folder;
        newFile.path.base = section.file + '.md';
        newFile.path.name = section.file;
        newFile.path.href = section.url;
        newFile.includeDefinitions = '[firmware-reference]';
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
        let menuJson = {items:[]};

        for(const tempL2 of allL2) {
            menuJson.items.push({title:tempL2.origTitle,href:tempL2.url});

            if (tempL2.url == section.curL2.url) {
                let a = [];

                for(const tempSection of tempL2.l3) {
                    let obj = {title:tempSection.origTitle,href:tempSection.url};
                    if (tempSection.url == newFile.path.href) {
                        obj.activeItem = true;
                    }
                    a.push(obj);
                }
                menuJson.items.push(a);                                
            }
        }


        let sectionObj = {
            folder: section.folder,
            file: section.file,
            title: section.origTitle,
            href: '/' + destDir + '/' + section.folder + '/' + section.file + '/'
        };
        // TODO: Add a flag to indicate that this section does not have subsections

        apiIndexJson.sections.push(sectionObj);

        // Save in metalsmith files so it the generated file will be converted to html
        const newPath = destDir + '/' + section.folder + '/' + section.file + '.md';
        files[newPath] = newFile;

        // Only do this once to map the old cards/firmware URLs.
        // redirects['/cards/firmware/' + section.folder + '/' + section.file] = '/' + newPath.replace('.md', '');

    }

    // Note the first file in every section so we know whether to show or hide the L2 header
    {
        let lastFolder;
        for(let section of apiIndexJson.sections) {
            if (lastFolder != section.folder) {
                section.startSection = true;
            }
            lastFolder = section.folder;
        }
    }
    const apiIndexJsonInfo = {
        contents: Buffer.from(JSON.stringify(apiIndexJson), 'utf8')
    };
    files['assets/files/apiIndex.json'] = apiIndexJsonInfo;
    
    {
        // Output apiMenus.json
        
        let apiMenusJsonChanged = false;
        const newApiMenusJsonStr = JSON.stringify(apiMenusJson, null, 2);
        if (fs.existsSync(apiMenusJsonPath)) {
            const oldApiMenusJsonStr = fs.readFileSync(apiMenusJsonPath, 'utf8');
    
            apiMenusJsonChanged = (newApiMenusJsonStr != oldApiMenusJsonStr);
        }
        else {
            apiMenusJsonChanged = true;
        }
        if (apiMenusJsonChanged) {
            fs.writeFileSync(apiMenusJsonPath, newApiMenusJsonStr);
    
            const apiMenusJsonInfo = {
                contents: Buffer.from(newApiMenusJsonStr, 'utf8')
            };
            files[apiMenusRelativePath] = apiMenusJsonInfo;
        
        }    
    }
    

    // One time - fix old cards links
    /*
    for(const oldLink in redirects) {
        // "/cards/firmware/system-events": "/cards/firmware/system-events/system-events"
        const newLink = redirects[oldLink];
        if (newLink.startsWith('/cards/firmware')) {
            redirects[oldLink] = newLink.replace('/cards/firmware', '/' + destDir);
        }
    }
    */
    
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


module.exports = function(options) {

	return function(files, metalsmith, done) {
        Object.keys(files).forEach(function(fileName) {
            if (options.sources.includes(fileName)) {
                generateDeviceOsApiMultiPage(options, files, fileName, metalsmith.path(options.cardMapping), metalsmith.path(options.redirects), metalsmith.path(options.contentDir));
            }
        });

		done();
	};
};
