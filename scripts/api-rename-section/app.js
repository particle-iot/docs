#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const argv = require('yargs').argv;

const helper = require('@particle/node-example-helper');
const { dir } = require('console');
helper
    .withRootDir(__dirname);

const topDir = path.normalize(path.join(__dirname, '..', '..'));
const srcDir = path.join(topDir, 'src');
const contentDir = path.join(srcDir, 'content');
const assetsDir = path.join(srcDir, 'assets');
const cardMappingFile = path.join(topDir, 'config', 'card_mapping.json');
const redirectsFile = path.join(topDir, 'config', 'redirects.json');
const firmwareMdFile = path.join(contentDir, 'reference/device-os/firmware.md');
const apiPathPrefix = '/reference/device-os/api/'; // must end with a /

const dryRun = !!argv.dryRun; // --dry-run

console.log('This tool is to rename a top level section in the Device OS API reference');

function nameToAnchor(s) {
    const origTitle = s.trim().replace(/&/g, '&amp;');

    let origAnchor = origTitle.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w]+/g, '-');
    if (origAnchor === 'constructor') {
        origAnchor += '-';
    }

    return origAnchor;
}

function sortJson(obj) {
    const keys = Object.keys(obj);
    keys.sort(function(a, b) {
        return a.localeCompare(b);
    });

    let newObj = {};
    for(const key of keys) {
        newObj[key] = obj[key];
    }

    return newObj;
}


async function run() {
    let options = {};

    options.oldSectionName = await helper.question('Existing section name?');            
    options.oldAnchor = nameToAnchor(options.oldSectionName);
    options.oldFilename = options.oldAnchor.replace(/[-]+$/g, '');

    options.newSectionName = await helper.question('New section name?');            
    options.newAnchor = nameToAnchor(options.newSectionName);
    options.newFilename = options.newAnchor.replace(/[-]+$/g, '');

    console.log('options', options);

    let firmwareMdText = fs.readFileSync(firmwareMdFile, 'utf8');
    let redirectsJson = JSON.parse(fs.readFileSync(redirectsFile, 'utf8'));
    let cardMappingJson = JSON.parse(fs.readFileSync(cardMappingFile, 'utf8'));
    

    let firmwareMdArray = [];
    for(let line of firmwareMdText.split('\n')) {
        const m = line.match(/^## (.*)/);
        if (m) {
            if (m[1] == options.oldSectionName) {
                line = '## ' + options.newSectionName;
                console.log('updated header', line);
            }
        }
        // Fix local anchors
        for(const m of line.matchAll(/\]\(#([-a-z]+)\)/g)) {
            const localAnchor = m[1];
            if (localAnchor == options.oldAnchor) {
                line = line.replace('](#' + options.oldAnchor + ')', '](#' + options.newAnchor + ')' );
                console.log('updated internal anchor reference', line);
            }
        }

        firmwareMdArray.push(line);
    }
    if (!dryRun) {
        fs.writeFileSync(firmwareMdFile, firmwareMdArray.join('\n'));
    }
    
    // Find old links from card-mapping
    for(const key in cardMappingJson) {
        const page = cardMappingJson[key];
        if (page.startsWith(apiPathPrefix + options.oldFilename)) {
            cardMappingJson[key] = page.replaceAll(options.oldFilename, options.newFilename);

            let newNoTrailingSlash = cardMappingJson[key];
            if (newNoTrailingSlash.substring(newNoTrailingSlash.length - 1) == '/') {
                newNoTrailingSlash = newNoTrailingSlash.substring(0, newNoTrailingSlash.length - 1);
            }
            redirectsJson[page] = newNoTrailingSlash;
        }
    }
    if (!dryRun) {        
        fs.writeFileSync(cardMappingFile, JSON.stringify(cardMappingJson, null, 2));
    }    

    // Fix redirects
    for(const key in redirectsJson) {
        if (key.startsWith(apiPathPrefix + options.oldFilename)) {
            const newKey = key.replaceAll(options.oldFilename, options.newFilename);
            redirectsJson[newKey] = redirectsJson[key];
            console.log('adding redirect', {
                oldKey: key,
                newKey,
                target: redirectsJson[key],
            });
        }
    }

    for(const key in redirectsJson) {
        const page = redirectsJson[key];
        if (page.startsWith(apiPathPrefix + options.oldFilename)) {
            // console.log('new redirect ' + page);
            const oldTarget = redirectsJson[key];
            redirectsJson[key] = redirectsJson[key].replaceAll(options.oldFilename, options.newFilename);
            console.log('updating redirect', {
                key,
                oldTarget,
                newTarget: redirectsJson[key],
            });

        }
    }
    if (!dryRun) {        
        fs.writeFileSync(redirectsFile, JSON.stringify(sortJson(redirectsJson), null, 2));
    }    


    console.log('run FixLinks script to fix any other pages with links to the old header');

    helper.close();
}

run();

