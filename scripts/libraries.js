'use strict';

const fs = require('fs');
const path = require('path');
const { hide } = require('yargs');
const lunr = require('lunr');

function createLibraries(options, files, sourceDir, redirectsPath, searchIndexPath) {
    // console.log('processing libraries');    

    const thisCardsDir = 'cards/libraries';

    const topSpecial = ['Search'];
    const topSpecialFilename = function(name) {
        return name.replace(/[^-A-Za-z0-9_]/g, '-').toLowerCase();
    }

    let hasOther = false;
    let letters = [];
    let letterLibraries = {};

    for (const dirent of fs.readdirSync(sourceDir, { withFileTypes: true })) {
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

    // Generate redirects for all directories to the first page in that group
    if (redirectsPath) {
        const origFile = fs.readFileSync(redirectsPath, 'utf8');

        let redirects = JSON.parse(origFile);

        // Top level - will go to the introduction/search page
        // redirects['/' + thisCardsDir] = allL2[0].url;

        // All letters
        for (const letter of letters) {
            const letterPath = '/' + thisCardsDir + '/' + letter;
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

    let searchDocuments = [];

    for (const dirent of fs.readdirSync(sourceDir, { withFileTypes: true })) {
        if (!dirent.isFile || !dirent.name.endsWith('.json')) {
            continue;
        }
        const lib = JSON.parse(fs.readFileSync(path.join(sourceDir, dirent.name)));

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
            md += '_This table is generated from an automated build. The library may have included examples that are not intended to work on all devices, so a failed build may not indicate an actual problem with the library. The builds have not been tested; they have only been compiled._\n';
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
        md += '{{> library-browser height="500"}}\n\n';

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
        newFile.layout = 'cards.hbs';
        newFile.columns = 'two';
        newFile.collection = [];
        newFile.description = lib.id + ' (' + lib.kind + ')';
        newFile.includeDefinitions = '[api-helper, api-helper-extras, api-helper-library]';
        newFile.infoFile = '/assets/files/libraries/' + lib.id + '.json';
        newFile.contents = Buffer.from(md);

        // Generate navigation
        newFile.navigation = '';
        for(const curSpecial of topSpecial) {
            newFile.navigation += '<ul class="static-toc">';
            newFile.navigation += '<li class="top-level"><a href="/cards/libraries/' + topSpecialFilename(curSpecial) + '/">' + curSpecial + '</a></li>';
            newFile.navigation += '</ul>';
        }

        for (const curLetter of letters) {
            newFile.navigation += '<ul class="static-toc">';
            if (lib.letter == curLetter) {
                newFile.navigation += '<li class="top-level active"><span>' + curLetter.toUpperCase() + '</span></li>';

                newFile.navigation += '<div class="in-page-toc-container">';
                for (let tempName of letterLibraries[lib.letter]) {
                    newFile.navigation += '<ul class="nav in-page-toc show">';

                    if (tempName == lib.id) {
                        newFile.navigation += '<li class="middle-level active"><span>' + tempName + '</span></li>';

                        newFile.navigation += '<ul class="nav secondary-in-page-toc" style="display:block">';
                        for (const curH2 of h2) {
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
                newFile.navigation += '<li class="top-level"><a href="/cards/libraries/' + curLetter + '/">' + curLetter.toUpperCase() + '</a></li>';
            }
            newFile.navigation += '</ul>';
        }

        // Save in metalsmith files so it the generated file will be converted to html
        const newPath = thisCardsDir + '/' + letter + '/' + lib.id + '.md';
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
        newFile.layout = 'cards.hbs';
        newFile.columns = 'two';
        newFile.collection = [];
        newFile.description = 'Library search';
        newFile.includeDefinitions = '[api-helper, api-helper-extras, api-helper-library]';
        newFile.contents = Buffer.from(md);

        // Generate navigation
        newFile.navigation = '';
        for(const tempSpecial of topSpecial) {
            newFile.navigation += '<ul class="static-toc">';

            if (curSpecial == tempSpecial) {
                newFile.navigation += '<li class="top-level active"><span>' + curSpecial + '</span></li>';
            }
            else {
                newFile.navigation += '<li class="top-level"><a href="/cards/libraries/' + topSpecialFilename(tempSpecial) + '/">' + tempSpecial + '</a></li>';
            }
            newFile.navigation += '</ul>';
        }

        for (const curLetter of letters) {
            newFile.navigation += '<ul class="static-toc">';
            newFile.navigation += '<li class="top-level"><a href="/cards/libraries/' + curLetter + '/">' + curLetter.toUpperCase() + '</a></li>';
            newFile.navigation += '</ul>';
        }

        // Save in metalsmith files so it the generated file will be converted to html
        const newPath = thisCardsDir + '/' + topSpecialFilename(curSpecial) + '.md';
        files[newPath] = newFile;
    }

    var lunrIndex = lunr(function () {
        this.ref('name');

        for(const field of ['verification', 'author', 'maintainer', 'description', 'body']) {
            this.field(field);
        }

        searchDocuments.forEach(function (doc) {
            this.add(doc)
        }, this)
    })

    let oldSearchIndex = '';
    if (fs.existsSync(searchIndexPath)) {
        oldSearchIndex = fs.readFileSync(searchIndexPath, 'utf8');
    }
    const newSearchIndex = JSON.stringify(lunrIndex, null, 2);
    if (oldSearchIndex != newSearchIndex) {
        fs.writeFileSync(searchIndexPath, newSearchIndex);
    }
}


module.exports = function (options) {

    return function (files, metalsmith, done) {
        createLibraries(options, files, metalsmith.path(options.sourceDir), metalsmith.path(options.redirects), metalsmith.path(options.searchIndex));

        done();
    };
};
