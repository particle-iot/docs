'use strict';

const fs = require('fs');
const path = require('path');
const { hide } = require('yargs');

function createLibraries(options, files, sourceDir, redirectsPath) {
    // console.log('processing libraries');    

    const thisCardsDir = 'cards/libraries';

    let hasOther = false;
    let letters = [];
    let letterLibraries = {};

    for(const dirent of fs.readdirSync(sourceDir, {withFileTypes:true})) {
        if (!dirent.isFile || !dirent.name.endsWith('.json')) {
            continue;
        }
        const lib = JSON.parse(fs.readFileSync(path.join(sourceDir, dirent.name)));

        let letter = lib.id.substr(0, 1).toLowerCase();
        if (letter >= 'a' && letter <= 'z') {
            if (!letters.includes(letter)) {
                letters.push(letter);
            }    
        }
        else {
            hasOther = true;
            letter = 'other';
        }
        if (!letterLibraries[letter]) {
            letterLibraries[letter] = [];
        }
        letterLibraries[letter].push(lib.id);
    }
    letters.sort();
    if (hasOther) {
        letters.push('other');
    }

    const transformReadme = function(mdOld) {
        let mdNew = '';
        for(let line of mdOld.split('\n')) {
            line = line.trim();

            if (line.match(/^[#]+ /)) {
                // Move h1->h3, h2->h4, ...
                line = '##' + line;
            }
            // if (line.match(/!\[(.*)\]\((.*)\)/))
            // TODO: Something about inline images in the README.md

            mdNew += line + '\n';
        }
        return mdNew;
    };

    for(const dirent of fs.readdirSync(sourceDir, {withFileTypes:true})) {
        if (!dirent.isFile || !dirent.name.endsWith('.json')) {
            continue;
        }
        const lib = JSON.parse(fs.readFileSync(path.join(sourceDir, dirent.name)));

        let letter = lib.id.substr(0, 1).toLowerCase();
        if (letter < 'a' || letter > 'z') {
            letter = 'other';
        }

        let kindStr;
        if (lib.official) {
            kindStr = 'official library';
        }
        else if (lib.verified) {
            kindStr = 'verified community library';
        }
        else {
            kindStr = 'community library';
        }

        let md = '';
        
    
        md += '# ' + lib.id + ' (' + kindStr + ')\n\n';

        const makeLink = function(url) {
            if (url.startsWith('http')) {
                return '[' + url + '](' + url + ')';
            }
            else {
                return url;
            }
        };

        // Information table
        md += '## Summary\n\n'
        md += '| Name | Value |\n';
        md += '| :--- | :--- |\n';
        md += '| Name | ' + lib.attributes.name + ' |\n';
        md += '| Version | ' + lib.attributes.version + ' |\n';
        md += '| Installs | ' + lib.attributes.installs + ' |\n';
        if (lib.attributes.license) {
            md += '| License | ' + lib.attributes.license + ' |\n';
        }
        if (lib.attributes.author) {
            md += '| Author | ' + lib.attributes.author + ' |\n';
        }
        if (lib.attributes.maintainer) {
            md += '| Maintainer | ' + lib.attributes.maintainer + ' |\n';
        }
        if (lib.attributes.url) {
            md += '| URL | ' + makeLink(lib.attributes.url) + ' |\n';
        }
        if (lib.attributes.repository) {
            md += '| Repository | ' + makeLink(lib.attributes.repository) + ' |\n';
        }
        md += '\n';

        if (lib.attributes.sentence) {
            md += lib.attributes.sentence + '\n';
        }
        if (lib.attributes.paragraph) {
            md += lib.attributes.paragraph + '\n';
        }
        md += '\n';

        if (!lib.versions[lib.attributes.version].noExamples) {
            // Build matrix
            md += '## Example Build Testing\n'
            md += '\n';
            md += '{{> library-builds}}\n';
            md += '\n';
            md += 'This table is generated from an automated build.\n';
            md += 'The library may have included examples that are not intended to work on all devices, so a failed build may not indicate an actual problem with the library.\n';
            md += 'The builds have not been tested; they have only been compiled.\n';
            md += '\n';
        }

        // README
        if (lib.readme) {
            md += '## Library Read Me\n'
            md += '\n';
            md += '_This content is provided by the library maintainer and has not been validated or approved._\n';
            
            md += transformReadme(lib.readme);


            md += '\n\n';
        }

        // Library browser
        md += '## Browse Library Files\n'
        md += '\n';
        md += '{{> library-browser}}\n\n';

        // Parse out headers for navigation
        let h2 = [];
        for(let line of md.split('\n')) {
            line = line.trim();

            if (line.match(/^(## )/)) {
                h2.push(line.substr(3));
            }
        }

        const anchorFor = function(hdr) {
            return hdr.toLowerCase().replace(/[^-A-Za-z0-9_ ]+/g, ' ').replace(/ +/g, '-');
        }

        let newFile = {};
        
        newFile.title = lib.id;
        newFile.layout = 'cards.hbs';
        newFile.columns = 'two';
        newFile.collection = [];
        newFile.description = lib.id + ' (' + kindStr + ')';
        newFile.includeDefinitions = '[api-helper, api-helper-extras, api-helper-library]';
        newFile.infoFile = '/assets/files/libraries/' + lib.id + '.json';
        newFile.contents = Buffer.from(md); 

        // Generate navigation
        newFile.navigation = '';
        for(const curLetter of letters) {
            if (letter == curLetter) {
                newFile.navigation += '<li class="top-level active"><span>' + curLetter + '</span></li>';

                newFile.navigation += '<div class="in-page-toc-container">';
                for(let tempName of letterLibraries[letter]) {
                    newFile.navigation += '<ul class="nav in-page-toc show">';

                    if (tempName == lib.id) {
                        newFile.navigation += '<li class="middle-level active"><span>' + tempName + '</span></li>';

                        newFile.navigation += '<ul class="nav secondary-in-page-toc" style="display:block">';
                        for(const curH2 of h2) {
                            newFile.navigation += '<li data-secondary-nav><a href="#' + anchorFor(curH2) + '">' + curH2 + '</a></li>';
                        }
                        newFile.navigation += '</ul>';
                }
                    else {
                        newFile.navigation += '<li class="middle-level"><a href="/cards/libraries/' + curLetter + '/' + tempName + '">' + tempName + '</a></li>';
                    }
                    newFile.navigation += '</ul>';
                }
                newFile.navigation += '</div">';
            }
            else {
                newFile.navigation += '<li class="top-level"><a href="/cards/libraries/' + curLetter + '/">' + curLetter + '</a></li>';
            }
        }

            /*
        for(const letter of letters) {
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
        */
        
        // Save in metalsmith files so it the generated file will be converted to html
        const newPath = thisCardsDir + '/' + letter + '/' + lib.id + '.md';
        files[newPath] = newFile;
        
    }

    /*

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
        */

}


module.exports = function(options) {

	return function(files, metalsmith, done) {
        createLibraries(options, files, metalsmith.path(options.sourceDir), metalsmith.path(options.redirects));

		done();
	};
};
