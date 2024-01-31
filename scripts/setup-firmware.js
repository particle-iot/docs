
var path = require('path');
var fs = require('fs');
const { HalModuleParser, ModuleInfo } = require('binary-version-reader');

let versionInfo;
let carriersJson;



function getPlatformInfo(platformId) {
    for(const key in carriersJson.deviceConstants) {
        if (carriersJson.deviceConstants[key].id == platformId) {
            return carriersJson.deviceConstants[key];
        }    
    }    
}


async function firmwareTable(options) {
    let md = '';

    md += '| Platform | Required Device OS |\n';
    md += '| :--- | :--- |\n';

    let allInfoObj = [];

    for(file of fs.readdirSync(options.binaryDir)) {
        if (!file.endsWith('.bin')) {
            continue;
        }

        // Add module info
        const infoObj = await new Promise(function(resolve, reject) {
            const reader = new HalModuleParser();
            reader.parseFile(path.join(options.binaryDir, file), function(fileInfo, err) {
                if (err) {
                    console.log("error processing file " + path.join(inputDir, part.path), err);
                    reject(err);
                }
                
                let result = {
                    file,
                    platformId: fileInfo.prefixInfo.platformID,
                    prefixInfo: fileInfo.prefixInfo,
                    suffixInfo: fileInfo.suffixInfo,
                };

                for(const ver of versionInfo.versions) {
                    if (ver.sys == fileInfo.prefixInfo.depModuleVersion) {
                        result.systemVersion = ver.semVer;
                    }
                }

                result.platformInfo = getPlatformInfo(fileInfo.prefixInfo.platformID);

                // fileInfo.prefixInfo
                //  .platformID 
                //  .depModuleVersion (system version required)

                resolve(result);
            });
        });

        allInfoObj.push(infoObj);
        
    }
    
    allInfoObj.sort(function(a, b) {
        return a.platformInfo.displayName.localeCompare(b.platformInfo.displayName);
    });

    for(const infoObj of allInfoObj) {
        md += '| [' + infoObj.platformInfo.displayName + '](/assets/files/docs-usb-setup-firmware/' + infoObj.file + ') | ' + infoObj.systemVersion + ' |\n';
    }


    return md;
}

module.exports = function(options) {

	return async function(files, metalsmith, done) {

        const contentDir = metalsmith.path(options.contentDir);
        const filesDir = metalsmith.path(options.filesDir);
    
        versionInfo = JSON.parse(fs.readFileSync(path.join(filesDir, 'versionInfo.json'), 'utf8'));
        carriersJson = JSON.parse(fs.readFileSync(path.join(filesDir, 'carriers.json'), 'utf8'));

        
        for(const fileName of options.sources) {
			var file = files[fileName];
            if (!file) {
                continue;
            }
            
            const oldText = file.contents.toString('utf8');

            const startBlurbString = '{{!-- BEGIN setup-firmware-list ';
            const endMarker = '--}}';

            let pos = 0;
            while(true) {
                const start = oldText.indexOf(startBlurbString, pos);
                if (start >= 0) {
                    let startEnd = oldText.indexOf(endMarker, start);
                    if (startEnd >= 0) {
                        const blurbId = oldText.substring(start + startBlurbString.length, startEnd).trim();

                        startEnd += endMarker.length;
                        if (oldText.charAt(startEnd) == '\n') {
                            startEnd++;
                        }

                        const end = oldText.indexOf('{{!-- END setup-firmware-list', start);
                        if (end >= 0) {            
                            let endEnd = oldText.indexOf(endMarker, start);
                            if (endEnd >= 0) {
                                endEnd += endMarker.length;
                                pos = endEnd;

                                const oldTable = oldText.substring(startEnd, end);

                                const newTable = await firmwareTable({
                                    binaryDir: path.join(filesDir, 'docs-usb-setup-firmware'),
                                });

                                if (oldTable != newTable) {
                                    const oldFileContents = fs.readFileSync(path.join(contentDir, fileName), 'utf8');
                                    let separatorCount = 0;
                                    let frontMatter = '';
                                    for(const line of oldFileContents.split(/\n/)) {
                                        frontMatter += line + '\n';

                                        if (line == '---') {
                                            separatorCount++;

                                            if (separatorCount == 2) {
                                                break;
                                            }
                                        }
                                    }
                                    
                                    const oldText = files[fileName].contents.toString('utf8');

                                    let newText = oldText.substring(0, startEnd) + newTable + oldText.substring(end);

                                    files[fileName].contents = Buffer.from(newText, 'utf8');

                                    // Update file on disk
                                    fs.writeFileSync(path.join(contentDir, fileName), frontMatter + newText);
                                }
                                
                            }
                            else {
                                console.log('Malformed block in ' + fileName + ' at offset ' + start + ' missing }} on END');
                                break;
                            }
                        } 
                        else {
                            console.log('Malformed block ' + fileName + ' at offset ' + start + ' missing END');
                            break;
                        }
                    }
                    else {
                        console.log('Malformed block in ' + fileName + ' at offset ' + start + ' missing }} on START');
                        break;
                    }
                }
                else {
                    break;
                }
            }
            
        }


		done();
	};
};
