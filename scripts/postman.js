const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

function metalsmith(options) {

    const run = async function(files, metalsmith, done) {
        const pathsToProcess = ['apiServiceSourceDir', 'postmanBuiltFile', 'postmanGeneratedFile'];

        let optionsPaths = {};
        for(const p of pathsToProcess) {
            if (options[p]) {
                optionsPaths[p] =  metalsmith.path(options[p]);
            }
        }

        // console.log('postman optionsPaths', optionsPaths);
        
        let assetFile;
        
        if (fs.existsSync(optionsPaths.apiServiceSourceDir)) {
            // console.log('source dir exists ' + optionsPaths.apiServiceSourceDir);
            try {
                const cmd = 'cd ' + optionsPaths.apiServiceSourceDir + ' && npm run postman';

                const { stdout, stderr } = await exec(cmd);
                // console.log('stdout:', stdout);
                // console.log('stderr:', stderr);
                
                // Workaround for incorrect path in api-service build that has a double .json extension
                if (!fs.existsSync(optionsPaths.postmanBuiltFile) && fs.existsSync(optionsPaths.postmanBuiltFile + '.json')) {
                    optionsPaths.postmanBuiltFile += '.json';
                }
                
                const newFile = fs.readFileSync(optionsPaths.postmanBuiltFile, 'utf8');
                let oldFile = '';
                if (fs.existsSync(optionsPaths.postmanGeneratedFile)) {
                    oldFile = fs.readFileSync(optionsPaths.postmanGeneratedFile, 'utf8');
                }
                if (oldFile != newFile) {
                    fs.writeFileSync(optionsPaths.postmanGeneratedFile, newFile);
                    // console.log('updated postman ' + options.postmanGeneratedFile);
                }
                assetFile = newFile;
            }
            catch(e) {
                console.log('failed to build postman files', e);
            }
        }
        else {
            // console.log('using generated file');
            assetFile = fs.readFileSync(optionsPaths.postmanGeneratedFile, 'utf8');
        }
        
        if (assetFile) {
            files[options.assetPath] = {
                contents: Buffer.from(assetFile, 'utf8'),                
            }
        }
        else {
            console.log('failed to read postman generated file ' + options.postmanGeneratedFile);
        }

        done();
    }

    return function (files, metalsmith, done) {
        run(files, metalsmith, done);
    };
}

module.exports = {
    metalsmith,
};
