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
const redirectsFile = path.join(topDir, 'config', 'redirects.json');

// Find a directory
// Pass in the directory (tutorials/asset-tracking for example) or '' to start at the top
// The parent must be the partial path, relative to the contentDir, not containing contentDir
// Returns a relative directory name (join to contentDir to find the directory on the file system)
async function getDirectory(parent) {
    let menuOptions = []; 
    menuOptions.push('this directory');
    for(const f of fs.readdirSync(path.join(contentDir, parent), {withFileTypes: true})) {
        if (f.isDirectory()) {
            menuOptions.push(f.name);
        }
    }
    if (menuOptions.length == 1) {
        // Only this many directories deep
        return parent;
    }

    const res = await helper.questionMenu('Directory?', menuOptions, {});

    if (res == 0) {
        return parent;
    }
    else {
        return await getDirectory(path.join(parent, menuOptions[res]));
    }
}

// Find a md file
// Pass in the directory (tutorials/asset-tracking for example) or '' to start at the top
// The parent must be the partial path, relative to the contentDir, not containing contentDir
// Returns a relative file name (join to contentDir to find the file on the file system)
async function getFile(parent) {
    let menuOptions = []; 
    for(const f of fs.readdirSync(path.join(contentDir, parent), {withFileTypes: true})) {
        if (f.isDirectory()) {
            menuOptions.push(f.name);
        }
    }
    for(const f of fs.readdirSync(path.join(contentDir, parent), {withFileTypes: true})) {
        if (f.isFile() && f.name.endsWith('.md')) {
            menuOptions.push(f.name);
        }
    }

    const res = await helper.questionMenu('File or Directory?', menuOptions, {});

    if (menuOptions[res].endsWith('.md')) {
        return path.join(parent, menuOptions[res]);
    }
    else {
        return await getFile(path.join(parent, menuOptions[res]));
    }
}


// Find the menu.json file for a directory
// Pass in the directory (tutorials/asset-tracking for example) not the md file path
// This should be the partial path, relative to the contentDir, not containing contentDir
// Returns a relative path name (join to contentDir to find the menu.json file on the file system)
function findMenu(dir) {
    const menuPath = path.join(dir, 'menu.json');

    if (fs.existsSync(path.join(contentDir, menuPath))) {
        return menuPath;
    }   
    else if (path.basename(dir) != '') {
        return findMenu(path.dirname(dir));
    }
    else {
        return '';
    }
}

function readFrontMatter(mdPartialPath) {
    let result = {};

    const md = fs.readFileSync(path.join(contentDir, mdPartialPath), 'utf8');
    let section = 0;
    for(const line of md.split('\n')) {
        if (line == '---') {
            section++;
        }
        if (section == 1) {
            const parts = line.split(':', 2);
            if (parts.length == 2) {
                result[parts[0].trim()] = parts[1].trim();
            }
        }
    }

    return result;
}


async function removeFromMenu(options) {

    options.menuPartialPath = findMenu(path.dirname(options.srcMdPartialPath));
    // console.log('options', options);

    options.urlName = path.basename(options.srcMdPartialPath, '.md');

    let menuJson = JSON.parse(fs.readFileSync(path.join(contentDir, options.menuPartialPath), 'utf8'));
    //console.log('menuJson', menuJson);

    const href = '/' + options.srcMdPartialPath.replace('.md', '') + '/';
    console.log('href', href);

    let items = [];
    let removeArray, removeIndex;

    const processArray = function(array) {
        for(let ii = 0; ii < array.length; ii++) {
            const item = array[ii];

            if (!Array.isArray(item)) {
                if (item.href == href) {
                    options.title = item.title;
                    removeArray = array;
                    removeIndex = ii;
                }
            }
            else {
                processArray(item);
            }
        }    
    }
    processArray(menuJson.items);

    if (removeArray) {
        removeArray.splice(removeIndex, 1);
    }

    // Remove from menu.json
    fs.writeFileSync(path.join(contentDir, options.menuPartialPath), JSON.stringify(menuJson, null, 2));

    
}

async function insertIntoMenu(options) {

    options.menuPartialPath = findMenu(options.dstDirPartialPath);
    // console.log('options', options);

    let menuJson = JSON.parse(fs.readFileSync(path.join(contentDir, options.menuPartialPath), 'utf8'));
    //console.log('menuJson', menuJson);

    const href = '/' + options.dstDirPartialPath + '/';
    // console.log('href', href);

    let items = [];

    const processArray = function(array) {
        let lastDir;

        for(let ii = 0; ii < array.length; ii++) {
            const item = array[ii];

            if (!Array.isArray(item)) {
                if (item.dir) {
                    lastDir = item.dir;
                }
                if (item.href && item.href.startsWith(href)) {
                    if (item.title) {
                        items.push({
                            title: 'Before ' + item.title + ' (' + item.dir + ')',
                            index: ii,
                            array,
                        })
                    }    
                }
            }
            else {
                processArray(item);
                items.push({
                    title: 'Bottom of ' + lastDir,
                    index: item.length,
                    array: item,
                });
            }
        }    
    }
    processArray(menuJson.items);

    if (items.length) {
        const lastItem = items[items.length - 1];
        items.push({
            title: 'Append',
            index: lastItem.index + 1,
            array: lastItem.array
        })
    }
    else {
        items.push({
            title: 'Append',
            index: 0,
            array: menuJson.items
        });
    }
 
    let menuItems = [];
    for(const item of items) {
        menuItems.push(item.title);
    }

    let insertLocation;
    if (options.append) {
        insertLocation = items.length - 1;
    }
    else {
        insertLocation = await helper.questionMenu('Insert Location? ', menuItems, {});
    }

    // console.log('insert', items[insertLocation]);

    items[insertLocation].array.splice(items[insertLocation].index, 0, {
        dir: options.urlName,
        title: options.title,
        href: '/' + options.dstDirPartialPath + '/' + options.urlName + '/'
    })

    // Insert into menu.json
    fs.writeFileSync(path.join(contentDir, options.menuPartialPath), JSON.stringify(menuJson, null, 2));


}




async function run() {
    try {
        let cmd = '';
        let fixLinks = false;

        const menuOptions = [
            {
                key: 'move',
                desc: 'move a page',
            },
            {
                key: 'moveSection',
                desc: 'move a section of pages',
            },
            {
                key: 'create',
                desc: 'create a new page',
            },
            {
                key: 'show',
                desc: 'add a hidden page to a menu',
            },
        ];

        for(const m of menuOptions) {
            if (argv[m.key]) {
                cmd = m.key;
                break;
            }
        }
        
        if (!cmd) {
            let menuDesc = [];
            for(const m of menuOptions) {
                menuDesc.push(m.desc);
            }
            const res = await helper.questionMenu('Operation?', menuDesc, {});
            cmd = menuOptions[res].key;
        }

        const movePage = async function(options) {
            // Remove from old menu
            removeFromMenu(options);

            // Move file
            fs.renameSync(path.join(contentDir, options.srcMdPartialPath), path.join(contentDir, options.dstDirPartialPath, path.basename(options.srcMdPartialPath)));

            // Insert into new location
            await insertIntoMenu(options);

            // Create redirects
            let redirectsObj = JSON.parse(fs.readFileSync(redirectsFile, 'utf8'));

            const oldUrl = '/' + options.srcMdPartialPath.replace('.md', '');
            const newUrl = '/' + options.dstDirPartialPath + '/' + options.urlName;

            redirectsObj[oldUrl] = newUrl;

            // Fix any old redirects
            for(const key in redirectsObj) {
                if (redirectsObj[key] == oldUrl) {
                    redirectsObj[key] = newUrl;
                }
            }            

            let redirectsArray = [];
            for(const key in redirectsObj) {
                redirectsArray.push({
                    key,
                    obj: redirectsObj[key]
                })
            };
            redirectsArray.sort(function(a, b) {
                return a.key.localeCompare(b.key);
            })
            let newRedirectsObj = {};
            for(const obj of redirectsArray) {
                newRedirectsObj[obj.key] = obj.obj;
            }
            fs.writeFileSync(redirectsFile, JSON.stringify(newRedirectsObj, null, 2));
        }

        if (cmd == 'move') {
            let options = {};

            console.log('Move a page: select source md file');
            options.srcMdPartialPath = await getFile('');

            console.log('Select destination directory');
            options.dstDirPartialPath = await getDirectory('');

            await movePage(options);
            
            // Fix links? This takes a while to run, may be batch these up
            // fixLinks = true;
        }

        if (cmd == 'moveSection') {
            let options = {};

            
            console.log('Move a section: select directory to move the contents of');
            options.srcDirPartialPath = await getDirectory('');

            console.log('Select destination directory');
            options.dstDirPartialPath = await getDirectory('');

            console.log('options', options);

            // Find all pages in the source directory
            const processDir = async function(relativePath) {
                const dstDirPath = path.join(contentDir, options.dstDirPartialPath, relativePath);
                if (!fs.existsSync(dstDirPath)) {
                    fs.mkdirSync(dstDirPath);
                }
                for(const dirent of fs.readdirSync(path.join(contentDir, options.srcDirPartialPath, relativePath), {withFileTypes:true})) {
                    if (dirent.isDirectory()) {
                        if (!dirent.name.startsWith('.')) {                            
                            processDir(path.join(relativePath, dirent.name));
                        }
                    }
                    else
                    if (dirent.isFile() && dirent.name.endsWith('.md')) {
                        console.log({dir: relativePath, file: dirent.name});
                        await movePage({
                            srcMdPartialPath: path.join(options.srcDirPartialPath, relativePath, dirent.name),
                            dstDirPartialPath: path.join(options.dstDirPartialPath, relativePath),
                            append: true,
                        });
                    }
                }
            }
            await processDir('');

        }

        if (cmd == 'create') {
            console.log('Select destination directory');

            let options = {};

            options.dstDirPartialPath = await getDirectory('');
            
            options.title = await helper.question('Page title?');            

            const urlNameDefault = options.title.replace(/ /g, '-').replace(/[^-A-Za-z0-9]*/g, '').toLowerCase();
            
            options.urlName = await helper.question('Page URL name (Return to use default of "' + urlNameDefault + '")');            
            if (!options.urlName) {
                options.urlName = urlNameDefault;
            }

            await insertIntoMenu(options);

             // Create page
            let md = '';

            md += '---\n';
            md += 'title: ' + options.title + '\n';
            md += 'columns: two\n';
            md += 'layout: commonTwo.hbs\n';
            md += 'description: ' + options.title + '\n'; 
            md += '---\n';
            md += '\n';
            md += '# {{title}}\n';

            fs.writeFileSync(path.join(contentDir, options.dstDirPartialPath, options.urlName + '.md'), md);
        }

        if (cmd == 'show') {
            let options = {};
            
            console.log('Add a hidden page to a menu: select source md file');
            options.srcMdPartialPath = await getFile('');

            options.dstDirPartialPath = path.dirname(options.srcMdPartialPath);

            const frontMatter = readFrontMatter(options.srcMdPartialPath);
            
            options.title = frontMatter.title;

            options.menuPartialPath = findMenu(path.dirname(options.srcMdPartialPath));
        
            options.urlName = path.basename(options.srcMdPartialPath, '.md');

            //console.log('options', options);

            // Insert into new location
            await insertIntoMenu(options);

        }


        if (fixLinks) {
            const cmd = 'cd ../FixLinks && node app.js';
            console.log('Fixing links ' + cmd);
            const { stdout, stderr } = await exec(cmd);
            console.log(stderr + stdout);
        }
    }
    catch(e) {
        console.log('exception', e);
    }
    
    helper.close();
    
}

run();