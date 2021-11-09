'use strict';

const fs = require('fs');
const path = require('path');


function updateEdgeVersions(trackerDir, outputFile, options) {
    const zipRE = /^v([0-9]+)\.zip$/;
    const binRE = /^tracker-edge-([0-9]+)\@([-.0-9a-zA-Z]+)\.bin$/;

    let versionsObj = {};

    for(const filename of fs.readdirSync(trackerDir)) {
        const add = function(re, key) {
            const m = filename.match(re);
            if (m) {
                if (!versionsObj[m[1]]) {
                    versionsObj[m[1]] = {
                        version: parseInt(m[1])
                    }
                }
                versionsObj[m[1]][key] = m[0];    
                if (m[2]) {
                    versionsObj[m[1]].target = m[2];
                }
            }
        }
    
        add(zipRE, 'zip');
        add(binRE, 'bin');        
    }

    let versionsArray = [];
    for(const key in versionsObj) {
        if (versionsObj[key].bin && versionsObj[key].zip) {
            versionsObj[key].v = 'v' + versionsObj[key].version;
            versionsObj[key].title = 'Tracker Edge ' + versionsObj[key].v + ' (Device OS ' + versionsObj[key].target + ')';

            versionsArray.push(versionsObj[key]);
        }
    }

    versionsArray.sort(function(a, b) {
        return b.version - a.version;
    });

    // console.log('versionsArray', versionsArray);

    const newJson = JSON.stringify(versionsArray, null, 2);

    let oldJson;
    if (fs.existsSync(outputFile)) {
        oldJson = fs.readFileSync(outputFile, 'utf8');
    }
    if (oldJson != newJson) {
        fs.writeFileSync(outputFile, newJson);
    }
}

module.exports = function(options) {

	return function(files, metalsmith, done) {
        // options.sourceDir is usually '../src' 

        // inputFile begins with "assets/files" and does not have the leading slash
        const inputFile = options.trackerDir + '/' + options.jsonFile;

        const outputFile = metalsmith.path(path.join(options.sourceDir, inputFile));

        updateEdgeVersions(metalsmith.path(path.join(options.sourceDir, options.trackerDir)), outputFile, options);

        files[inputFile] = {
            contents: fs.readFileSync(outputFile),
            mode: '0644',
            stats: fs.statSync(outputFile)
        };

        done();
	};
};


