const fs = require('fs');
const path = require('path');
const https = require('https');

async function generateSystemVersionInfo(options, done) {
    const versionInfoPath = path.join(__dirname, '..', 'src', 'assets', 'files', 'versionInfo.json');

    let oldVersionInfo = {};
    if (fs.existsSync(versionInfoPath)) {
        oldVersionInfo = JSON.parse(fs.readFileSync(versionInfoPath, 'utf8'));
    }

    // Check current data to see if the file should be downloaded again
    let now = Math.floor(Date.now() / 1000);
    if (oldVersionInfo.update < (now - 86400)) {

        // Download from Github
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

        // Parse md files
        // const mdFile = fs.readFileSync(path.join(__dirname, '..', 'tmp', 'system-versions.md'), 'utf8');
        // console.log('mdFile', mdFile);

        let lastBootLoaderVer = 0;
        let versionInfo = {
            versions: [],
            updated: Math.floor(Date.now() / 1000)
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

        // Update JSON data on disk
        // console.log('versionInfo', versionInfo);
        const versionInfoStr = JSON.stringify(versionInfo, null, 2);
        if (JSON.stringify(oldVersionInfo) != versionInfoStr) {
            fs.writeFileSync(versionInfoPath, versionInfoStr);
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
