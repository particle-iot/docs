'use strict';

const fs = require('fs');
const path = require('path');

const contentRoot = path.join(__dirname, '../../src/content');
console.log('contentRoot=' + contentRoot);

const redirects = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/redirects.json')));

let mdFiles = [];

function processDir(dir) {
    fs.readdirSync(dir, {withFileTypes:true}).forEach(function(dirent, index) {
        if (dirent.isDirectory()) {
            processDir(path.join(dir, dirent.name));
        }
        else {
            if (dirent.name.match(/md$/i)) {
                mdFiles.push(path.join(dir, dirent.name));
            }
        }
    });
}

function fixRedirects(content) {
    let changed = false;

    const origContent = content;

    for(const old in redirects) {
        const replaceWith = redirects[old];

        content = content.replace(/'[' + old + '\/?'+ ']'/);
         
    }

    return changed;
}


processDir(contentRoot);
processNextMdFile();

// console.log('mdFiles', mdFiles);
// console.log('redirects', redirects);

function processNextMdFile() {
    if (mdFiles.length == 0) {
        console.log('done!');
        return;
    }
    const mdPath = mdFiles.shift();

    let mdFile = fs.readFileSync(mdPath, 'utf8');
    let changed = false;

    if (fixRedirects(mdFile)) {
        changed = true;
    }
    if (changed) {
        console.log('updating ' + mdPath);
        // fs.writeFileSync(mdPath, mdFile);
    }

    processNextMdFile();
}

