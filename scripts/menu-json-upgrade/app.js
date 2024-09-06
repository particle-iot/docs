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

function processItemArray(itemArray, newItemsArray) {
    let sectionStack = [];

    for(const item of itemArray) {
        newItemsArray.push(item);

        if (!Array.isArray(item)) {
            if (item.isSection) {
                item.subsections = [];
                sectionStack.push(item);
            }
            else {
            }
        }
        else {
            processItemArray(item, sectionStack[sectionStack.length - 1].subsections);
            sectionStack.pop();
        }
    }
}

function processMenuJson(fileObj) {

    let newFileJson = {
        items: [],
    }

    processItemArray(fileObj.contents.items, newFileJson.items);

    // console.log('newFileJson', newFileJson);

    fs.writeFileSync(path.join(contentDir, fileObj.dir, 'newMenu.json'), JSON.stringify(newFileJson, null, 4));
    
}

async function run() {
    try {
        // Find menu.json files
        processDir('');

        // console.log('menuJsonFiles', menuJsonFiles);

        for(const fileObj of menuJsonFiles) {
            processMenuJson(fileObj);
        }
    }
    catch(e) {
        console.log('exception', e);
    }
}

run();