'use strict';

const fs = require('fs');
const path = require('path');
const Handlebars = require("handlebars");

function parseScrollGroupMd(scrollGroup, fileObj) {

    fileObj.outputObj.items = [];

    for(const line of fileObj.mdFile.split('\n')) {
        
        const m1 = line.match(/^([#]+) /);
        if (m1) {
            let level = m1[1].length;
            let obj = {
                title: line.substring(m1[0].length).trim(),
                isContent: true,
            }
            obj.anchor = obj.title.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w]+/g, '-');

            if (level == 1) {
                const template = Handlebars.compile(obj.title);
                fileObj.outputObj.h1 = template(fileObj.metalsmithFile);
            }
            else
            if (level == 3) {
                if (fileObj.outputObj.items.length) {
                    // Normal level 3, add to level 2
                    let lastObj = fileObj.outputObj.items[fileObj.outputObj.items.length - 1];
                    if (typeof lastObj.subsections == 'undefined') {
                        lastObj.subsections = [];
                    }
                    lastObj.subsections.push(obj);
                }
                else {
                    // Special case of no level 2 header before the level 3,
                    // just promote the header to level 2 for now, maybe change behavior later
                    level = 2;
                }
            }

            // Not an else because level may be changed above
            if (level == 2) {
                fileObj.outputObj.items.push(obj);    
            }
            
        }
    }

}

module.exports = function(options) {

	return function(files, metalsmith, done) {
        for(const groupObj of options.groups) {
            // groupObj (object)
            //   sourceDir
            //   outputFile
            const outputPath = metalsmith.path('../src/' + groupObj.outputFile);

            let scrollGroup = {
                groupObj,
                files: [],
                outputObj: {
                    pages: [],
                },
            };

            Object.keys(files).forEach(function(fileName) {
                if (fileName.startsWith(groupObj.sourceDir) && fileName.endsWith('.md')) {
                    const fileObj = {
                        fileName,
                        fileNameNoMd: fileName.replace(/\.md$/, ''),
                        metalsmithFile: files[fileName],
                        mdFile: files[fileName].contents.toString(),
                        outputObj: {},
                    }
                    
                    fileObj.outputObj.url = '/' + fileObj.fileNameNoMd + '/';

                    scrollGroup.outputObj.pages.push(fileObj.outputObj);

                    scrollGroup.files.push(fileObj);

                    parseScrollGroupMd(scrollGroup, fileObj);
                }
            });

            if (scrollGroup.files.length > 0) {
                // On live reload the refresh may not have any files, so avoid writing out an empty file
                let outputOld = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
            
                let outputStr = JSON.stringify(scrollGroup.outputObj, null, 4);
                if (outputOld != outputStr) {
                    fs.writeFileSync(outputPath, outputStr);
                    
                    if (typeof files[groupObj.outputFile] != 'undefined') {
                        files[groupObj.outputFile].contents = Buffer.from(outputStr);
                    }
                    else {
                        files[groupObj.outputFile] = {
                            contents: Buffer.from(outputStr),
                        }
                    }
                }                
            }
        }

		done();
	};
};
