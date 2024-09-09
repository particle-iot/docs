'use strict';

const fs = require('fs');
const path = require('path');
const { hide } = require('yargs');
const lunr = require('lunr');
var cloneDeep = require('lodash').cloneDeep;

function createLibraries(options, files, sourceDir, redirectsPath, searchIndexPath, contentDir) {
    // console.log('processing libraries');    

    // destDir does not begin or end with a slash
    const destDir = 'reference/device-os/libraries';
    const searchPage = destDir + '/search.md';

    const libraryMenusRelativePath = 'assets/files/libraryMenus.json';
    const libraryMenusJsonPath = path.join(contentDir, '../' + libraryMenusRelativePath);
    let libraryMenusJson = {
        items: [
            {
                "title": "Search",
                "href": "/reference/device-os/libraries/search/",
                "isLibrarySearch": true
            },
        ],
    }

    // const outerMenuJson = JSON.parse(fs.readFileSync(path.join(contentDir, 'reference', 'menu.json')));
    
    let searchDocuments = [];


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

        libraryNames.push(dirent.name.substring(0, dirent.name.length - 5));
    }

    libraryNames.sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    for (const name of libraryNames) {
       let letter = name.substring(0, 1).toLowerCase();
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

    {
        let libraryInfo = {
            // libraryNames,
            letterNavigation: [],
        };

        for (const curLetter of letters) {
            let letterUC = curLetter.substr(0, 1).toUpperCase() + curLetter.substr(1);

            let obj = {
                title: letterUC,
                href: '/' + destDir + '/' + curLetter + '/',
                letter: curLetter,
                libraries: letterLibraries[curLetter],
            };
            libraryInfo.letterNavigation.push(obj);

            // New menu format
            obj = {
                title: letterUC,
                dir: curLetter,
                c: true,
                subsections: [],
            }
            for(const lib of letterLibraries[curLetter]) {
                obj.subsections.push({
                    title: lib,
                    dir: lib,
                });
            }
            libraryMenusJson.items.push(obj);
        }

        let newFile = {};
        newFile.contents = Buffer.from(JSON.stringify(libraryInfo));
        const newPath = 'assets/files/libraryInfo.json';
        files[newPath] = newFile;
    }

    // Build the content
    for (const name of libraryNames) {
        const lib = JSON.parse(fs.readFileSync(path.join(sourceDir, name + '.json')));
        if (!lib) {
            console.log('missing library JSON ' + name);
            continue;
        }
        if (!lib.id) {
            console.log('missing library JSON id ' + name, lib);
            continue;
        }

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

        // Formerly loaded from lib.attributes.installs, but that's been moved to a new file
        md += '| Installs | <span class="libraryInstallCounter" data-library-id="' + lib.id + '"> |\n';
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

        let newFile = cloneDeep(files[searchPage]);
        if (!newFile) {
            return;
        }

        newFile.title = lib.id;
        newFile.description = lib.id + ' (' + lib.kind + ')';
        newFile.infoFile = '/assets/files/libraries/' + lib.id + '.json';
        newFile.noEditButton = true;
        newFile.contents = Buffer.from(md);
        // newFile.description = 'Reference manual for the C++ API used by user firmware running on Particle IoT devices';

        // Generate navigation
        let menuJson = {items:[]};

        // Save in metalsmith files so it the generated file will be converted to html
        const newPath = destDir + '/' + letter + '/' + lib.id + '.md';
        files[newPath] = newFile;
    }


    // Generate redirects for all directories to the first page in that group
    if (redirectsPath) {
        const origFile = fs.readFileSync(redirectsPath, 'utf8');

        let redirects = JSON.parse(origFile);

        // Top level - will go to the introduction/search page
        // redirects['/' + destDir] = allL2[0].url;


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

    {
        // Output libraryMenus.json
        
        let libraryMenusJsonChanged = false;
        const newLibraryMenusJsonStr = JSON.stringify(libraryMenusJson, null, 2);
        if (fs.existsSync(libraryMenusJsonPath)) {
            const oldLibraryMenusJsonStr = fs.readFileSync(libraryMenusJsonPath, 'utf8');
    
            libraryMenusJsonChanged = (newLibraryMenusJsonStr != oldLibraryMenusJsonStr);
        }
        else {
            libraryMenusJsonChanged = true;
        }

        if (libraryMenusJsonChanged) {
            fs.writeFileSync(libraryMenusJsonPath, newLibraryMenusJsonStr);
    
            const libraryMenusJsonInfo = {
                contents: Buffer.from(newLibraryMenusJsonStr, 'utf8')
            };
            files[libraryMenusRelativePath] = libraryMenusJsonInfo;
        
        }    
    }
    
}


module.exports = function (options) {

    return function (files, metalsmith, done) {
        createLibraries(options, files, metalsmith.path(options.sourceDir), metalsmith.path(options.redirects), metalsmith.path(options.searchIndex), metalsmith.path(options.contentDir));

        done();
    };
};

