'use strict';

const fs = require('fs');
const path = require('path');

const contentRoot = path.join(__dirname, '../../src/content');
console.log('contentRoot=' + contentRoot);

let redirects = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/redirects.json')));

// To simplify the logic below, we replicate every redirect that does not end with a '/' to one that does
for(const old in redirects) {
    const replaceWith = redirects[old];
    if (old.match(/\/$/)) {

    }
    else {
        redirects[old + '/'] = replaceWith;
        // console.log('added fake ' + old);
    }
}

// This is the mapping from the single-page firmware API reference to new card URLs
// "/reference/device-os/firmware/#cloud-functions": "/cards/firmware/cloud-functions/cloud-functions",
const cardMapping = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/card_mapping.json')));

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

function fixCards(content) {
    for(const old in cardMapping) {
        let replaceWith = cardMapping[old];

        content = replaceUrl(content, '](', ')', old, replaceWith);
        content = replaceUrl(content, 'href="', '"', old, replaceWith);

        const oldAlt = old.replace('/#', '#');
        if (oldAlt != old) {
            content = replaceUrl(content, '](', ')', oldAlt, replaceWith);
            content = replaceUrl(content, 'href="', '"', oldAlt, replaceWith);    
        }
    }
    return content;
}


function fixRedirects(content) {

    for(const old in redirects) {
        let replaceWith = redirects[old];

        if (replaceWith.match(/\/$/)) {
        }
        else {
            // Always terminate with a trailing slash
            replaceWith += '/';
        }

        content = replaceUrl(content, '](', ')', old, replaceWith);
        content = replaceUrl(content, '](', '#', old, replaceWith);

        content = replaceUrl(content, 'href="', '"', old, replaceWith);
        content = replaceUrl(content, 'href="', '#', old, replaceWith);
    }
    return content;
}

function replaceUrl(content, prefix, suffix, oldUrl, newUrl) {
    let index = 0;
    while(true) {
        const searchStr = prefix + oldUrl + suffix;

        index = content.indexOf(searchStr, index);
        if (index < 0) {
            break;
        }
        console.log('found=' + oldUrl + ' index=' +index);

        content = content.substring(0, index) + prefix + newUrl + suffix + content.substring(index + searchStr.length);
        
        index += prefix.length + newUrl.length + suffix.length;
    }
    return content;
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

    const orig = mdFile;

    mdFile = fixRedirects(mdFile);
    mdFile = fixCards(mdFile);

    if (orig !== mdFile) {
        console.log('updating ' + mdPath);
        fs.writeFileSync(mdPath, mdFile);
    }

    processNextMdFile();
}

