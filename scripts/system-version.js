const fs = require('fs');
const path = require('path');
const https = require('https');

async function generateSystemVersionInfo(options, files, done) {
    const versionInfoJsonRelativePath = 'assets/files/versionInfo.json';
    const versionInfoPath = path.join(__dirname, '..', 'src', versionInfoJsonRelativePath);

    const versionUpdatePath = path.join(__dirname, '..', 'config', 'versionUpdate.json');


    let oldVersionInfoStr = '';
    let oldVersionInfo = {};
    let oldVersionUpdate = {};
    if (fs.existsSync(versionInfoPath)) {
        oldVersionInfoStr = fs.readFileSync(versionInfoPath, 'utf8');
        oldVersionInfo = JSON.parse(oldVersionInfoStr);
    }
    if (fs.existsSync(versionUpdatePath)) {
        oldVersionUpdate = JSON.parse(fs.readFileSync(versionUpdatePath, 'utf8'));
    }


    // Check current data to see if the file should be downloaded again
    let now = Math.floor(Date.now() / 1000);
    if (!oldVersionInfo || !oldVersionUpdate.updated || oldVersionUpdate.updated < (now - 86400)) {
        let versionInfo = {
            versions: oldVersionInfo.versions
        }
        if (!versionInfo.versions) {
            versionInfo.versions = [];
        }


        const processUrl = async function(url) {
            let mdFile = '';

            await new Promise((resolve, reject) => {
                https.get(url, res => {
                    res.setEncoding("utf8");
                    res.on('data', data => {
                        mdFile += data;
                    });
                    res.on('end', () => {
                        resolve();
                    });
                });
            });
            
            // Parse md files
            // const mdFile = fs.readFileSync(path.join(__dirname, '..', 'tmp', 'system-versions.md'), 'utf8');
            // console.log('mdFile', mdFile);

            let lastBootLoaderVer = 0;

            for (let line of mdFile.split('\n')) {
                const parts = line.split('|');
                if (parts.length > 4) {
                    let bootLoaderVer = parseInt(parts[1]);
                    let systemVer = parseInt(parts[2]);
                    let semVer = parts[3].trim();

                    if (isNaN(bootLoaderVer)) {
                        bootLoaderVer = lastBootLoaderVer;
                    }
                    else {
                        lastBootLoaderVer = bootLoaderVer;
                    }
                    if (bootLoaderVer) {
                        if (!versionInfo.versions.find(e => e.sys == systemVer)) {
                            console.log('added version ' + semVer);
                            versionInfo.versions.push({
                                boot: bootLoaderVer,
                                sys: systemVer,
                                semVer: semVer
                            });    
                        }
                    }
                }
            }
        }
        processUrl('https://raw.githubusercontent.com/particle-iot/device-os/develop/system/system-versions.md');
        processUrl('https://raw.githubusercontent.com/particle-iot/device-os/develop-4.x/system/system-versions.md');
        
        
        // Sort versions
        versionInfo.versions.sort(function(a, b) {
            return a.sys - b.sys;
        });

        // Update JSON data on disk
        // console.log('versionInfo', versionInfo);
        const versionInfoStr = JSON.stringify(versionInfo, null, 2);
        if (oldVersionInfoStr != versionInfoStr) {
            fs.writeFileSync(versionInfoPath, versionInfoStr);
            console.log('updated versionInfo data');

            const fileArrayData = {
                contents: Buffer.from(versionInfoStr, 'utf8')
            };
            files[versionInfoJsonRelativePath] = fileArrayData;
        }

        oldVersionUpdate.updated = Math.floor(Date.now() / 1000);
        fs.writeFileSync(versionUpdatePath, JSON.stringify(oldVersionUpdate, null, 2));

    }

    done();
}


module.exports = function (options) {

    return function (files, metalsmith, done) {
        generateSystemVersionInfo(options, files, done);
    };
};
