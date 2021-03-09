// One-time tool to move application notes from Github into docs
// Clone the app-note repo into the top level of the docs directory
// git clone https://github.com/particle-iot/app-notes
//
// cd scripts/MigrateAppNotes
// node app.js

const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..', '..');
// console.log(root);

const assetsDir = path.join(rootDir, 'src', 'assets');
const contentDir = path.join(rootDir, 'src', 'content');
const appNotesDir = path.join(rootDir, 'app-notes');


function copyNotes() {
    fs.readdirSync(appNotesDir, {withFileTypes:true}).forEach(function(dirent) {
        if (!dirent.name.startsWith("AN") || !dirent.isDirectory()) {
            return;
        }
    
        let nameBase = dirent.name;
        const nameLower = dirent.name.toLowerCase();
    
        const dashOffset = dirent.name.indexOf('-');
        if (dashOffset > 0) {
            nameBase = dirent.name.substr(0, dashOffset);
        }
    
        const anNumber = parseInt(nameBase.substr(2));
    
        console.log('nameBase=' + nameBase + ' name=' + dirent.name);
    
        const imagesDir = path.join(assetsDir, 'images', 'app-notes', nameBase);
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir);
        }
    
        // Copy images
        const imagesSrc = path.join(appNotesDir, dirent.name, 'images');
        if (fs.existsSync(imagesSrc)) {
            fs.readdirSync(imagesSrc, {withFileTypes:true}).forEach(function(dirent2) {
                if (dirent2.isDirectory()) {
                    console.log('directory in images - not copying ' + dirent2.name + ' in ' + dirent.name);
                    return;
                }
                const src = path.join(appNotesDir, dirent.name, 'images', dirent2.name);
                const dst = path.join(imagesDir, dirent2.name);
                console.log('copying image src=' + src + ' dst=' + dst);
                fs.copyFileSync(src, dst);
            });    
        }

        const filesDir = path.join(assetsDir, 'files', 'app-notes', nameBase);
        if (!fs.existsSync(filesDir)) {
            fs.mkdirSync(filesDir);
        }
    
        const copyFiles = function(src, dstDir) {
            const basename = path.basename(src);
            const st = fs.lstatSync(src);
            if (st.isDirectory()) {
                if (!fs.existsSync(path.join(dstDir, basename))) {
                    fs.mkdirSync(path.join(dstDir, basename));
                }
                fs.readdirSync(src, {withFileTypes:true}).forEach(function(dirent3) {
                    copyFiles(path.join(src, dirent3.name), path.join(dstDir, basename));
                });
            }
            else {
                const dst = path.join(dstDir, basename);
                console.log('copying file src=' + src + ' dst=' + dst);
                fs.copyFileSync(src, dst);
            }
        }

        // Copy files (except images)
        fs.readdirSync(path.join(appNotesDir, dirent.name), {withFileTypes:true}).forEach(function(dirent2) {
            if (dirent2.name == 'images' || dirent2.name == 'README.md' || dirent2.name.startsWith('.') || dirent2 == 'LICENSE') {
                // Skip these
            }
            else {
                copyFiles(path.join(appNotesDir, dirent.name, dirent2.name), filesDir);
            }
        });

        // Transform markdown
        let mdSource = fs.readFileSync(path.join(appNotesDir, dirent.name, 'README.md'), 'utf8');
    
        if (!mdSource.startsWith('# ')) {
            console.log('did not find title ' + nameBase);
        }
        const title = mdSource.split('\n', 2)[0].substr(2);
        console.log('title=' + title);
    
        const frontMatter = '---\ntitle: ' + title + '\nlayout: datasheet.hbs\ncolumns: two\norder: ' + (anNumber + 100) + '\n---\n';
    
        mdSource = mdSource.replace(/\]\(images\//g, '](/assets/images/app-notes/' + nameBase + '/');
    
        // Commented out so we don't overwrite the files that have since been manually edited!
        // fs.writeFileSync(path.join(contentDir, 'datasheets', 'app-notes', nameLower + '.md'), frontMatter + mdSource);    
    });
        
}


function fixIndex() {


    let mdSource = fs.readFileSync(path.join(appNotesDir, 'README.md'), 'utf8');

    // - [AN001 Basic SoM Design](https://github.com/particle-iot/app-notes/tree/master/AN001-Basic-SoM-Design) is a simple SoM base board. 

    const oldLinkBase = 'https://github.com/particle-iot/app-notes/tree/master/';

    let offset = 0;
    while(offset < mdSource.length) {
        offset = mdSource.indexOf(oldLinkBase, offset);
        if (offset < 0) {
            break;
        }

        const endOffset = mdSource.indexOf(')', offset);

        const oldLink = mdSource.substring(offset, endOffset);

        const lastSlash = oldLink.lastIndexOf('/');
        const oldName = oldLink.substr(lastSlash + 1);

        const newName = oldName.toLowerCase();

        const newLink = '/datasheets/app-notes/' + newName;

        mdSource = mdSource.substr(0, offset) + newLink + mdSource.substr(endOffset);

        offset += newLink.length;
    }
    

    console.log(mdSource);
}

copyNotes()
//fixIndex();