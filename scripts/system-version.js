const fs = require('fs');
const path = require('path');
const https = require('https');

async function generateSystemVersionInfo(options, done) {
    const versionInfoPath = path.join(__dirname, '..', 'src', 'assets', 'files', 'versionInfo.json');

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

        // Download from GitHub
        const url = 'https://raw.githubusercontent.com/particle-iot/device-os/develop/system/system-versions.md';

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

        oldVersionUpdate.updated = Math.floor(Date.now() / 1000);
        fs.writeFileSync(versionUpdatePath, JSON.stringify(oldVersionUpdate, null, 2));
        
        // Parse md files
        // const mdFile = fs.readFileSync(path.join(__dirname, '..', 'tmp', 'system-versions.md'), 'utf8');
        // console.log('mdFile', mdFile);

        let lastBootLoaderVer = 0;
        let versionInfo = {
            versions: []
        }


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
                    versionInfo.versions.push({
                        boot: bootLoaderVer,
                        sys: systemVer,
                        semVer: semVer
                    });
                }
            }
        }

        // Manually add these private versions
        // 1007	3210	3.2.1-p2.1	P2
        // 1007	3211	3.2.1-p2.2	P2
        // 1008	3212	3.2.1-p2.3	P2
        versionInfo.versions.push({
            boot: 1007,
            sys: 3210,
            semVer: '3.2.1-p2.1'
        });
        versionInfo.versions.push({
            boot: 1007,
            sys: 3211,
            semVer: '3.2.1-p2.2'
        });
        versionInfo.versions.push({
            boot: 1008,
            sys: 3212,
            semVer: '3.2.1-p2.3'
        });

        // Update JSON data on disk
        // console.log('versionInfo', versionInfo);
        const versionInfoStr = JSON.stringify(versionInfo, null, 2);
        if (oldVersionInfoStr != versionInfoStr) {
            fs.writeFileSync(versionInfoPath, versionInfoStr);
            console.log('updated versionInfo data');
        }

        // Update tables in docs?
    }

    done();
}


module.exports = function (options) {

    return function (files, metalsmith, done) {
        generateSystemVersionInfo(options, done);
    };
};
