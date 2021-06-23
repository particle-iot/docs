'use strict';

const fs = require('fs');
const path = require('path');

var JSZip = require("jszip");

let directoriesToProcess = [];
let filesProcessed = 0;

/*
 * Generates the zip files to download the additional content for things like app notes
 *
 * Sample usage from metalsmith.js:
 
    .use(buildZip({
        dirs: [
          'assets/files/app-notes/',
          'assets/files/projects/',
        ],
        tmpDir: '../tmp'
    }))
 *
 */
module.exports = function(options) {

	return function(files, metalsmith, done) {
        
        for(const dir of options.dirs) {
            const srcPath = metalsmith.path('../src/' + dir);
            const buildPath = metalsmith.path('../build/' + dir);


            fs.readdirSync(srcPath, {withFileTypes:true}).forEach(function(dirent) {
                if (dirent.isDirectory()) {
                    // console.log(dirent.name);
                    let obj = {
                        name: dirent.name,
                        srcPath,
                        buildPath
                    };
                    directoriesToProcess.push(obj);
                }
            });    
        }

        processNext(done);
	};
};

function processNext(done) {
    if (directoriesToProcess.length == 0) {
        done();
        return;
    }

    zipDir(directoriesToProcess.shift(), function() { processNext(done); });
}

function zipDir(obj, done) {
    // console.log('zipDir', obj);

    var zip = new JSZip();
    filesProcessed = 0;

    fs.mkdirSync(obj.buildPath, {recursive:true});
    const zipPath = path.join(obj.buildPath, obj.name + '.zip');
    
    addRecursive(zip.folder(obj.name), path.join(obj.srcPath, obj.name), function() {
        if (filesProcessed == 0) {
            done();
        }
        else {
            zip.generateNodeStream({type:'nodebuffer',streamFiles:true})
            .pipe(fs.createWriteStream(zipPath))
            .on('finish', function () {
                // console.log('generated ' + zipPath);
                done();
            });

        }
    });

}

function addRecursive(zip, dir, done) {
    // console.log('addRecursive ' + dir);
    fs.readdir(dir, {withFileTypes:true}, function(err, direntArray) {
        if (err) {
            throw err;
        }

        const skipFiles = [
            'node_modules',
            'package-lock.json'
        ];
        

        const next = function() {
            if (direntArray.length == 0) {
                done();
                return;
            }

            const dirent = direntArray.shift();

            if (skipFiles.includes(dirent.name)) {
                next();
                return;
            }

            if (dirent.isDirectory()) {
                // console.log('dir ' + dirent.name);                
                addRecursive(zip.folder(dirent.name), path.join(dir, dirent.name), next);
            }
            else {                
                if (!dirent.name.startsWith('.') || dirent.name == '.gitignore') {
                    // console.log('file ' + dirent.name);
                    fs.readFile(path.join(dir, dirent.name), function(err, data) {
                        if (err) throw err;
                        
                        filesProcessed++;
                        zip.file(dirent.name, data);
                        next();
                    });
                }
                else {
                    next();
                }
            }

        }
        
        next();
    });

}