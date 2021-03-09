'use strict';

const fs = require('fs');
const path = require('path');

var JSZip = require("jszip");

let directoriesToProcess = [];
let filesProcessed = 0;

/*
 * Generates the zip files to download the additional content for things like app notes
 */
module.exports = function(options) {

	return function(files, metalsmith, done) {
        
        const basePath = metalsmith.path(options.dir);

        fs.readdirSync(basePath, {withFileTypes:true}).forEach(function(dirent) {
            if (dirent.isDirectory()) {
                // console.log(dirent.name);
                directoriesToProcess.push(path.join(basePath, dirent.name));
            }
        });

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

function zipDir(dir, done) {
    //console.log('zipDir ' + dir);

    var zip = new JSZip();
    filesProcessed = 0;
    
    addRecursive(zip.folder(path.basename(dir)), dir, function() {
        if (filesProcessed == 0) {
            if (fs.existsSync(dir + '.zip')) {
                fs.unlinkSync(dir + '.zip');
            }
            done();
        }
        else {
            zip.generateNodeStream({type:'nodebuffer',streamFiles:true})
            .pipe(fs.createWriteStream(dir + '.zip.tmp'))
            .on('finish', function () {
                //console.log('generated ' + dir + '.zip');
                if (fs.existsSync(dir + '.zip')) {
                    const bufOld = fs.readFileSync(dir + '.zip');
                    const bufNew = fs.readFileSync(dir + '.zip.tmp');

                    if (bufOld.compare(bufNew) == 0) {
                        fs.unlinkSync(dir + '.zip');
                        fs.renameSync(dir + '.zip.tmp', dir + '.zip');
                    }
                    else {
                        fs.unlinkSync(dir + '.zip.tmp');                        
                    }
                }
                else {
                    fs.renameSync(dir + '.zip.tmp', dir + '.zip');
                }

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

        const next = function() {
            if (direntArray.length == 0) {
                done();
                return;
            }

            const dirent = direntArray.shift();

            if (dirent.isDirectory()) {
                //console.log('dir ' + dirent.name);                
                addRecursive(zip.folder(dirent.name), path.join(dir, dirent.name), next);
            }
            else {
                if (!dirent.name.startsWith('.')) {
                    //console.log('file ' + dirent.name);
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