const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

function metalsmith(options) {

    const run = async function(files, metalsmith, done) {
        const pathsToProcess = ['appsSourceDir', 'appDestDir'];

        let optionsPaths = {};
        for(const p of pathsToProcess) {
            if (options[p]) {
                optionsPaths[p] =  metalsmith.path(options[p]);
            }
        }  

        optionsPaths.appDestDirInFiles = optionsPaths.appDestDir.replace(options.removePrefix, '');

        // console.log('cloud-app-templates optionsPaths', optionsPaths);
        
        if (fs.existsSync(optionsPaths.appsSourceDir)) {
            for(const dirEntry of fs.readdirSync(optionsPaths.appsSourceDir, {withFileTypes:true})) {
                const curAppSourceDir = path.join(optionsPaths.appsSourceDir, dirEntry.name, 'src');
                if (fs.existsSync(curAppSourceDir)) {
                    const curDestDir = path.join(optionsPaths.appDestDir, dirEntry.name);
                    if (!fs.existsSync(curDestDir)) {
                        fs.mkdirSync(curDestDir);
                    } 
                    for(const dirEntry2 of fs.readdirSync(curAppSourceDir, {withFileTypes:true})) {
                        if (dirEntry2.isFile && !dirEntry2.name.startsWith('.')) {
                            // console.log('cloud-app-templates', {curAppSourceDir, curDestDir, name: dirEntry2.name});

                            const srcPath = path.join(curAppSourceDir, dirEntry2.name);
                            const dstPath = path.join(curDestDir, dirEntry2.name);

                            const srcStr = fs.readFileSync(srcPath, 'utf8');
                            let dstStr = '';
                            if (fs.existsSync(dstPath)) {
                                dstStr = fs.readFileSync(dstPath, 'utf8');
                            }
                            if (srcStr != dstStr) {
                                fs.writeFileSync(dstPath, srcStr);

                                assetsPath = optionsPaths.appDestDirInFiles + '/' +  dirEntry.name + '/' + dirEntry2.name;
                                files[assetsPath] = {
                                    contents: Buffer.from(srcStr, 'utf8'),                
                                }
                    
                                console.log('cloud-app-templates updated', {srcPath, dstPath, assetsPath});
                            }
                        }
                        else {
                            // console.log('cloud-app-templates skipping', {curAppSourceDir, curDestDir, name: dirEntry2.name});
                        }
                    }   
                }
                else {
                    console.log('cloud-app-templates missing src dir ' + curAppSourceDir);
                }
            }            
        }
        else {
            console.log('cloud-app-templates not updating')
        }

        /*
        if (assetFile) {
            files[options.assetPath] = {
                contents: Buffer.from(assetFile, 'utf8'),                
            }
        }
        else {
            console.log('failed to read postman generated file ' + options.postmanGeneratedFile);
        }
*/

        done();
    }

    return function (files, metalsmith, done) {
        run(files, metalsmith, done);
    };
}

module.exports = {
    metalsmith,
};
