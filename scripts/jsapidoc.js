'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function (options) {
    return function (files, metalsmith, done) {
        const generatedDir = metalsmith.path(options.generatedDir);
        const jsMdSourcePath = metalsmith.path(options.javascriptSourceFile);
        const jsMdDestPath = path.join(generatedDir, 'javascript.md');
        const jsJsonDestPath = path.join(generatedDir, 'jsDocs.json');

        console.log('jsapidoc', { generatedDir, jsMdSourcePath, jsMdDestPath, jsJsonDestPath, options });

        // Generate jsDocsJson here
        let jsJsonDocs = {};


        {
            // Save to generated
            const jsJsonDocsOld = fs.existsSync(jsJsonDestPath) ? fs.readFileSync(jsJsonDestPath, 'utf8') : '';
            const jsJsonDocsStr = JSON.stringify(jsJsonDocs, null, 4);
            if (jsJsonDocsOld != jsJsonDocsStr) {
                fs.writeFileSync(jsJsonDestPath, jsJsonDocsStr);
            }

            // Save dynamically to src/assets/files
            const filesObj = {
                contents: jsJsonDocsStr,
            };
            files['assets/files/jsDocs.json'] = filesObj;
        }


        // Copy javascript.md
        if (fs.existsSync(jsMdSourcePath)) {
            const jsMdSourceOld = fs.readFileSync(jsMdSourcePath, 'utf8');

            const jsMdDestOld = fs.existsSync(jsMdDestPath) ? fs.readFileSync(jsMdDestPath, 'utf8') : '';
            if (jsMdSourceOld != jsMdDestOld) {
                console.log('updated ' + jsMdDestPath);
                fs.writeFileSync(jsMdDestPath, jsMdSourceOld);
            }
        }

        return done();
    };
};
