const fs = require('fs');
const path = require('path');

function metalsmith(options) {

    /*
      copyFiles({
        sourceTopDir: '..',
        destTopDir: '../src',
        copy: [
          {
            sourceDir: 'node_modules/particle-api-js/dist',
            destDir: 'assets/js',
            files: ['particle.min.js', 'particle.min.js.map'],
          }
        ],
      })
    */

    const run = async function(files, metalsmith, done) {
        for(const copyObj of options.copy) {
            const sourcePath = metalsmith.path(path.join(options.sourceTopDir, copyObj.sourceDir));
            const destPath = metalsmith.path(path.join(options.destTopDir, copyObj.destDir));

            for(const filename of copyObj.files) {
                const sourceFilePath = path.join(sourcePath, filename);
                const destFilePath = path.join(destPath, filename);
                const assetPath = path.join(copyObj.destDir, filename);

                if (fs.existsSync(sourceFilePath)) {
                    const fileData = fs.readFileSync(sourceFilePath);

                    let copyFile = false;

                    if (fs.existsSync(destFilePath)) {
                        const destFileData = fs.readFileSync(destFilePath);
                        copyFile = !fileData.equals(destFileData);
                    }
                    else {
                        copyFile = true;
                    }
                    if (copyFile) {
                        fs.writeFileSync(destFilePath, fileData);
                        console.log('copy-files copying', {sourceFilePath, destFilePath, assetPath});

                        files[assetPath] = {
                            contents: fileData,
                            mode: '0644',
                            stats: fs.statSync(destFilePath)
                        };                    
                    }
                }
                else {
                    console.log('copy-files: source path does not exist ' + sourceFilePath);
                }
            }

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
