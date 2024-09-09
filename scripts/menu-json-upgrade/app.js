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

let rootTitles = {};

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

function processItemArray(options) {
    let sectionStack = [];

    for(const item of options.itemArray) {
        if (item.dir) {
            item.path = options.path + item.dir + '/';
        }
        if ((item.path == item.href) || (item.path == (item.href + '/'))) {
            delete item.href;
        }
        if (item.href) {
            delete item.path;
        }
        options.newItemsArray.push(item);

        if (!Array.isArray(item)) {
            if (item.isSection) {
                delete item.isSection;
                item.subsections = [];
                sectionStack.push(item);
            }
            else {
            }
        }
        else {
            processItemArray({
                path: sectionStack[sectionStack.length - 1].path,
                itemArray: item, 
                newItemsArray: sectionStack[sectionStack.length - 1].subsections
            });
            sectionStack.pop();
        }
    }
}

function processMenuJson(fileObj) {

    let newFileJson = {
        // title
        // dir: fileObj.dir,
        items: [],
    }

    processItemArray({
        path: '/' + fileObj.dir + '/',
        itemArray: fileObj.contents.items, 
        newItemsArray: newFileJson.items,
    });

    // Delete the path out of the file because it can be generated when the file is read
    // but it's necessary during conversion to determine if the href can be deleted
    const removePath = function(array) {
        for(const item of array) {
            delete item.path;
            if (item.subsections) {
                removePath(item.subsections);
            }
        }
    };
    removePath(newFileJson.items);

    // console.log('newFileJson', newFileJson);

    fs.writeFileSync(path.join(contentDir, fileObj.dir, 'newMenu.json'), JSON.stringify(newFileJson, null, 4));
    
}

async function run() {
    try {
        // Find menu.json files
        processDir('');

        let rootItems = menuJsonFiles.find(e => e.dir == '');
        if (rootItems) {
            for(const item of rootItems.contents.items) {
                const parts = item.href.split('/');
                //console.log('parts', parts);
                rootTitles[parts[1]] = item.title;
            }
        }
        // console.log('rootTitles', rootTitles);

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