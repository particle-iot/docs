#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const argv = require('yargs').argv;

const topDir = path.normalize(path.join(__dirname, '..', '..'));
const srcDir = path.join(topDir, 'src');
const contentDir = path.join(srcDir, 'content');
const assetsDir = path.join(srcDir, 'assets');
const redirectsFile = path.join(topDir, 'config', 'redirects.json');

const menuJsonFiles = [
];

function processDir(dir) {

    for(const dirEntry of fs.readdirSync(path.join(contentDir, dir), {withFileTypes:true})) {
        if (dirEntry.name.startsWith('.')) {
            continue;
        }

        if (dirEntry.isDirectory()) {
            processDir(path.join(dir, dirEntry.name));
        }
        else 
        if (dirEntry.name == 'menu.json') {            
            const obj = {
                dir,
                relativePath: path.join(dir, dirEntry.name),
                contents: JSON.parse(fs.readFileSync(path.join(contentDir, dir, dirEntry.name), 'utf8')),
            };
            menuJsonFiles.push(obj);
        }
    }
}

async function run() {
    try {
        // Find menu.json files
        processDir('');

        console.log('menuJsonFiles', menuJsonFiles);
    }
    catch(e) {
        console.log('exception', e);
    }
}

run();