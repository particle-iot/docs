'use strict';

const fs = require('fs');
const path = require('path');
const { hide } = require('yargs');
const lunr = require('lunr');
const { generateNavHtml, insertIntoMenu } = require('./nav_menu_generator.js');

function createLibraries(options, files, sourceDir, redirectsPath, searchIndexPath, contentDir) {
    // console.log('processing libraries');    

    // destDir does not begin or end with a slash
    const destDir = 'reference/device-os/libraries';

    const outerMenuJson = JSON.parse(fs.readFileSync(path.join(contentDir, 'reference', 'menu.json')));
    
    let searchDocuments = [];

    const topSpecial = ['Search'];
    const topSpecialFilename = function(name) {
        return name.replace(/[^-A-Za-z0-9_]/g, '-').toLowerCase();
    }

    const transformReadme = function (mdOld) {
        let mdNew = '';
        for (let line of mdOld.split('\n')) {
            line = line.trim();

            if (line.match(/^[#]+ /)) {
                // Move h1->h3, h2->h4, ...
                line = '##' + line;
            }

            // Remove relative images because they are not uploaded by default
            const m = line.match(/!\[[^\]]+\]\(([^\)]+)\)/);
            if (m) {
                if (!m[1].startsWith('http')) {
                    line = line.substr(0, m.index) + '[image unavailable]' + line.substr(m.index + m.input.length);
                }
            }

            mdNew += line + '\n';
        }
        return mdNew;
    };

    const makeLink = function (url) {
        if (url.startsWith('http')) {
            return '[' + url + '](' + url + ')';
        }
        else {
            return url;
        }
    };

    // Find all first letters for left navigation
    let hasOther = false;
    let letters = [];
    let letterLibraries = {};
    let libraryNames = [];

    for (const dirent of fs.readdirSync(sourceDir, { withFileTypes: true })) {
        if (!dirent.isFile || !dirent.name.endsWith('.json')) {
            continue;
        }

        libraryNames.push(dirent.name.substr(0, dirent.name.length - 5));
    }

    libraryNames.sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    for (const name of libraryNames) {
       let letter = name.substr(0, 1).toLowerCase();
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
        letterLibraries[letter].push(name);
    }
    letters.sort();
    if (hasOther) {
        letters.push('other');
    }

    const generateSpecialNavigation = function(menuJson, curSpecial) {
        for(const tempSpecial of topSpecial) {
            let obj = {
                href: '/' + destDir + '/' + topSpecialFilename(tempSpecial) + '/',
                title: tempSpecial
            };

            if (curSpecial == tempSpecial) {
                obj.activeItem == true;
            }

            menuJson.items.push(obj);
        }    
    };

    const generateLetterNavigation = function(menuJson, lib) {
        for (const curLetter of letters) {
            let letterUC = curLetter.substr(0, 1).toUpperCase() + curLetter.substr(1);

            let obj = {
                title:letterUC,
                href: '/' + destDir + '/' + curLetter + '/',
                isCardSection: true
            };
            menuJson.items.push(obj);

            if (lib && lib.letter == curLetter) {
                let a = [];

                for (let tempName of letterLibraries[lib.letter]) {
                    let obj2 = {
                        title: tempName,
                        href: '/' + destDir + '/' + curLetter + '/' + tempName + '/'    
                    };

                    if (tempName == lib.id) {
                        obj2.activeItem = true;
                    }
                    a.push(obj2);
                }

                menuJson.items.push(a);
            }
        }
    };


    // Build the content
    for (const name of libraryNames) {
        const lib = JSON.parse(fs.readFileSync(path.join(sourceDir, name + '.json')));

        let letter = lib.id.substr(0, 1).toLowerCase();
        if (letter < 'a' || letter > 'z') {
            letter = 'other';
        }

        let md = '';


        md += '# ' + lib.id + ' (' + lib.kind + ')\n\n';


        let searchDoc = {
            name: lib.attributes.name
        };

        // Information table
        md += '## Summary\n\n'
        md += '| Name | Value |\n';
        md += '| :--- | :--- |\n';
        md += '| Name | ' + lib.attributes.name + ' |\n';
        md += '| Version | ' + lib.attributes.version + ' |\n';
        md += '| Installs | ' + lib.attributes.installs + ' |\n';
        if (lib.verification) {
            md += '| Verification | ' + lib.verification + ' |\n';
            searchDoc.verification = lib.verification;
        }
        if (lib.attributes.license) {
            md += '| License | ' + lib.attributes.license + ' |\n';
        }
        if (lib.attributes.author) {
            md += '| Author | ' + lib.attributes.author + ' |\n';
            searchDoc.author = lib.attributes.author;
        }
        if (lib.attributes.maintainer) {
            md += '| Maintainer | ' + lib.attributes.maintainer + ' |\n';
            searchDoc.maintainer = lib.attributes.maintainer;
        }
        if (lib.attributes.url) {
            md += '| URL | ' + makeLink(lib.attributes.url) + ' |\n';
        }
        if (lib.attributes.repository) {
            md += '| Repository | ' + makeLink(lib.attributes.repository) + ' |\n';
        }
        md += '| Download | [.tar.gz](' + lib.links.download + ') |\n';

        // Version History
        if (lib.allVersions.length > 1) {
            md += '| All Versions | ' + lib.allVersions.join(', ') + ' |\n';
        }


        md += '\n';

        let desc = '';
        if (lib.attributes.sentence) {
            md += lib.attributes.sentence + '\n';
            desc += lib.attributes.sentence + '\n';
        }
        if (lib.attributes.paragraph) {
            md += lib.attributes.paragraph + '\n';
            desc += lib.attributes.paragraph + '\n';
        }
        if (desc) {
            searchDoc.description = desc;
        }
        md += '\n';

        if (!lib.versions[lib.attributes.version].noExamples) {
            // Build matrix
            md += '## Example Build Testing\n'
            md += '\n';
            md += '{{> library-builds}}\n';
            md += '\n';
        }

        // README
        if (lib.readme && lib.readme.trim().length > 0) {
            md += '## Library Read Me\n'
            md += '\n';
            md += '_This content is provided by the library maintainer and has not been validated or approved._\n';

            md += transformReadme(lib.readme);

            searchDoc.body = lib.readme;

            md += '\n\n';
        }
        searchDocuments.push(searchDoc);

        // Library browser
        md += '## Browse Library Files\n'
        md += '\n';
        md += '{{> library-browser}}\n\n';

        // Parse out headers for navigation
        let h2 = [];
        for (let line of md.split('\n')) {
            line = line.trim();

            if (line.match(/^(## )/)) {
                h2.push(line.substr(3));
            }
        }

        const anchorFor = function (hdr) {
            return hdr.toLowerCase().replace(/[^-A-Za-z0-9_ ]+/g, ' ').replace(/ +/g, '-');
        }

        let newFile = {};

        newFile.title = lib.id;
        newFile.layout = 'commonTwo.hbs';
        newFile.columns = 'two';
        newFile.collection = [];
        newFile.description = lib.id + ' (' + lib.kind + ')';
        newFile.includeDefinitions = '[api-helper, api-helper-extras, api-helper-library, lunr, showdown]';
        newFile.infoFile = '/assets/files/libraries/' + lib.id + '.json';
        newFile.contents = Buffer.from(md);

        // Generate navigation
        let menuJson = {items:[]};

        generateSpecialNavigation(menuJson);

        generateLetterNavigation(menuJson, lib);

        newFile.navigation = generateNavHtml(insertIntoMenu(menuJson.items, outerMenuJson, 'libraries'));

        // Save in metalsmith files so it the generated file will be converted to html
        const newPath = destDir + '/' + letter + '/' + lib.id + '.md';
        files[newPath] = newFile;

    }

    // Specials
    for(const curSpecial of topSpecial) {
        let newFile = {};

        let md = '';
        
        if (curSpecial == 'Search') {
            md += '# Library Search\n\n';
            md += '{{> library-search}}\n';
        }


        newFile.title = curSpecial;
        newFile.layout = 'commonTwo.hbs';
        newFile.columns = 'two';
        newFile.collection = [];
        newFile.description = 'Library search';
        newFile.includeDefinitions = '[api-helper, api-helper-extras, api-helper-library, lunr, showdown]';
        newFile.contents = Buffer.from(md);

        // Generate navigation
        let menuJson = {items:[]};

        generateSpecialNavigation(menuJson, curSpecial);
        generateLetterNavigation(menuJson)

        newFile.navigation = generateNavHtml(insertIntoMenu(menuJson.items, outerMenuJson, 'libraries'));

        // Save in metalsmith files so it the generated file will be converted to html
        const newPath = destDir + '/' + topSpecialFilename(curSpecial) + '.md';
        files[newPath] = newFile;
    }


    // Generate redirects for all directories to the first page in that group
    if (redirectsPath) {
        const origFile = fs.readFileSync(redirectsPath, 'utf8');

        let redirects = JSON.parse(origFile);

        // Top level - will go to the introduction/search page
        // redirects['/' + destDir] = allL2[0].url;

        // One time use - generate backward compatible URLs for all current pages
        /*
        {
            const oldBase = '/cards/libraries';
            const newBase = '/' + destDir;

            for (const name of libraryNames) {
                const lib = JSON.parse(fs.readFileSync(path.join(sourceDir, name + '.json')));
        
                let letter = lib.id.substr(0, 1).toLowerCase();
                if (letter < 'a' || letter > 'z') {
                    letter = 'other';
                }
                redirects[oldBase + '/' + letter] = newBase + '/' + letter;
        
                const oldUrl = oldBase + '/' + letter + '/' + lib.id;
                const newUrl = newBase + '/' + letter + '/' + lib.id;

                redirects[oldUrl] = newUrl;
            }        
            redirects[oldBase + '/search'] = newBase + '/search';
            redirects[oldBase] = newBase;            
        }
        */
        

        // All letters
        for (const letter of letters) {
            const letterPath = '/' + destDir + '/' + letter;
            redirects[letterPath] = letterPath + '/' + letterLibraries[letter][0];
        }

        // Sort the output file
        let redirectsArray = [];
        for (const key in redirects) {
            redirectsArray.push({ key: key, value: redirects[key] });
        }
        // Remove the trailing slash on all internal pages
        for (let ii = 0; ii < redirectsArray.length; ii++) {
            if (redirectsArray[ii].value.startsWith('/') && redirectsArray[ii].value.endsWith('/') && redirectsArray[ii].value.length > 1) {
                redirectsArray[ii].value = redirectsArray[ii].value.substr(0, redirectsArray[ii].value.length - 1);
            }
        }
        redirectsArray.sort(function (a, b) {
            return a.key.localeCompare(b.key);
        });
        let redirectsSorted = {};
        for (const obj of redirectsArray) {
            redirectsSorted[obj.key] = obj.value;
        }

        const newFile = JSON.stringify(redirectsSorted, null, 2);
        if (origFile != newFile) {
            fs.writeFileSync(redirectsPath, newFile);
        }
    }
    
    // Search Index
    var lunrIndex = lunr(function () {
        this.ref('name');

        for(const field of ['verification', 'author', 'maintainer', 'description', 'body']) {
            this.field(field);
        }

        searchDocuments.forEach(function (doc) {
            this.add(doc)
        }, this)
    })

    let paths = [];
    let curPath = path.dirname(searchIndexPath);
    while (!fs.existsSync(curPath)) {
        paths.push(curPath);
        curPath = path.dirname(curPath);
    }
    while(paths.length) {
        fs.mkdirSync(paths.pop());
    }
    
    const newSearchIndex = JSON.stringify(lunrIndex, null, 2);
    fs.writeFileSync(searchIndexPath, newSearchIndex);
}


module.exports = function (options) {

    return function (files, metalsmith, done) {
        createLibraries(options, files, metalsmith.path(options.sourceDir), metalsmith.path(options.redirects), metalsmith.path(options.searchIndex), metalsmith.path(options.contentDir));

        done();
    };
};

