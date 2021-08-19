'use strict';

const fs = require('fs');
const path = require('path');



function updateDeviceRestoreInfo(sourceDir, outputFile) {

    let versions = {};
    let versionNames = [];

    let versionsZip = {};

    const deviceRestoreDir = path.join(sourceDir, 'assets', 'files', 'device-restore');

    fs.readdirSync(deviceRestoreDir, {withFileTypes:true}).forEach(function(dirent) {
        if (!dirent.isDirectory()) {
            return;
        }
        versions[dirent.name] = [];

        fs.readdirSync(path.join(deviceRestoreDir, dirent.name)).forEach(function(name) {
            if (name.length < 4) {
                return;
            }
            const platform = name.substr(0, name.length - 4);
            if (name.endsWith('.hex')) {
                versions[dirent.name].push(platform);
            }
            if (name.endsWith('.zip')) {
                if (!versionsZip[dirent.name]) {
                    versionsZip[dirent.name] = [];
                }
                versionsZip[dirent.name].push(platform);
            }
        });

        if (versions[dirent.name].length > 0) {
            // console.log('versions ' + dirent.name, versions[dirent.name])
            versionNames.push(dirent.name);
        }
    });


    versionNames.sort(function(a,b) {
        let aParts = a.split(/[-\\.]/);
        let bParts = b.split(/[-\\.]/);
        
        for(let part = 0; part < 3; part++) {
            // Reverse numeric sort (higher first)
            let cmp = parseInt(bParts[part]) - parseInt(aParts[part]);
            if (cmp != 0) {
                return cmp;
            }
        }
        if (!aParts[3]) {
            // a is not an rc, but b is, so final goes first
            return -1;
        }
        if (!bParts[3]) {
            // b is not an rc, but a is, so final goes first
            return +1;
        }
        let cmp = aParts[3].localeCompare(bParts[3]);
        if (cmp != 0) {
            return cmp;
        }

        cmp = parseInt(bParts[4]) - parseInt(aParts[4]);
        if (cmp) {
            return cmp;
        }
        return 0;
    });

//    console.log('versions', versions);
    let output = {};

    output.versionNames = versionNames;

    output.versions = versions;
    output.versionsZip = versionsZip;

    output.platforms = [
        {name:'argon', title:'Argon', id:12, gen:3},
        {name:'boron', title:'Boron', id:13, gen:3},
        {name:'bsom', title:'B4xx', id:23, gen:3},
        {name:'b5som', title:'B5xx', id:25, gen:3},
        {name:'tracker', title:'Tracker', id:26, gen:3},
        {name:'electron', title:'Electron', id:10, gen:2},
        {name:'photon', title:'Photon', id:6, gen:2},
        {name:'p1', title:'P1', id:8, gen:2},
        {name:'xenon', title:'Xenon', id:14, gen:3, discontinued:true}
    ];

    output.versionsZipByPlatform = {};
    for(let platformObj of output.platforms) {
        const platform = platformObj.name;
        output.versionsZipByPlatform[platform] = [];
        for(let version of output.versionNames) {
            if (versionsZip[version] && versionsZip[version].includes(platform)) {
                output.versionsZipByPlatform[platform].push(version);
            }
        }
    }

    let oldOutputStr;
    if (fs.existsSync(outputFile)) {
        oldOutputStr = fs.readFileSync(outputFile, 'utf8');
    }

    const outputStr = JSON.stringify(output, null, 2);
    if (oldOutputStr != outputStr) {
        fs.writeFileSync(outputFile, outputStr);
    }
}

module.exports = function(options) {

	return function(files, metalsmith, done) {
        updateDeviceRestoreInfo(metalsmith.path(options.sourceDir), metalsmith.path(options.outputFile));

		done();
	};
};
