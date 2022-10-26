'use strict';

const fs = require('fs');
const path = require('path');

const topDir = path.resolve(__dirname, '../..');

const contentRoot = path.join(topDir, 'src/content');
console.log('contentRoot=' + contentRoot);

let redirects = JSON.parse(fs.readFileSync(path.join(topDir, 'config/redirects.json')));

const troubleshootingFile = '../../src/assets/files/troubleshooting.json';


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

{
    const spellingOrig = fs.readFileSync(path.join(__dirname, '../../.spelling'), 'utf8');
    let spellingNew = '';

    for(let line of spellingOrig.split('\n')) {
        // Note that lines begin with space dash space
        //  - src/content/tutorials/learn-more/ethernet-featherwing.md
        if (line.startsWith(' - ')) {
            const oldPath = line.substring(3);

            // Example entry in redirects object:
            // "/datasheets/accessories/debugger": "/reference/datasheets/accessories/debugger",
            for(const key in redirects) {
                if (oldPath == 'src/content' + key + '.md' && !redirects[key].startsWith('http')) {
                    // console.log('old=' + oldPath + ' new=' + redirects[key]);
                    line = ' - src/content' + redirects[key] + '.md';
                }
            }
        }
        spellingNew += line + '\n';
    }
    // Remove blank lines at the end of the file
    spellingNew = spellingNew.replace(/[\n]*\n$/, '\n');

    if (spellingOrig != spellingNew) {
        fs.writeFileSync(path.join(__dirname, '../../.spelling'), spellingNew);
    }    
}


// This is the mapping from the single-page firmware API reference to new card URLs
// "/reference/device-os/firmware/#cloud-functions": "/reference/device-os/api/cloud-functions/cloud-functions",
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

function processTroubleshooting() {
    const orig = fs.readFileSync(troubleshootingFile, 'utf8');
    let json = JSON.parse(orig);
    // console.log('json', json);
    for(let page of json.pages) {
        if (page.buttons) {
            for(let button of page.buttons) {
                if (button.url && button.url.startsWith('/')) {
                    if (redirects[button.url]) {
                        console.log('button url changed ' + button.url + ' -> ' + redirects[button.url]);
                        button.url = redirects[button.url];
                    }
                }
            }
        }
    }

    const final = JSON.stringify(json, null, 4);
    if (orig != final) {
        fs.writeFileSync(troubleshootingFile, final);
        console.log('troubleshooting.json updated');
    }
};

processTroubleshooting();

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

