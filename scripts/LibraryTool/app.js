#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const fetch = require("node-fetch");


const util = require('util');
const exec = util.promisify(require('child_process').exec);

const argv = require('yargs').argv;

var Particle = require('particle-api-js');
var particle = new Particle();

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));


const targetInfo = [
    {
        version: '5.0.1',
        platforms: ['argon', 'boron', 'bsom', 'b5som', 'tracker', 'p2'],
    },
    {
        version: '4.0.0',
        platforms: ['argon', 'boron', 'bsom', 'b5som', 'tracker', 'esomx'],
    },
    {
        version: '3.3.0',
        platforms: ['photon', 'electron', 'argon', 'boron'],
/*        ifAddedAfter: '2022-01-01T00:00:00.000Z' */
    },
    { 
        // Any new libraries build on 2.3.0
        version: '2.3.0',
        platforms: ['photon', 'electron', 'argon', 'boron'],
        isNotExists: '2.0.1',
    },
    /*
    { 
        version: '2.0.1',
        platforms: ['photon', 'electron', 'argon', 'boron'],
    },
    */
    {
        version: '1.5.2',
        platforms: ['photon', 'electron', 'argon', 'boron'],
        ifAddedBefore: '2022-01-01T00:00:00.000Z'
    }
];


const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}
const dataLibrariesDir = path.join(dataDir, 'libraries');
if (!fs.existsSync(dataLibrariesDir)) {
    fs.mkdirSync(dataLibrariesDir);
}

const libraryListPath = path.join(dataDir, 'libraryList.json');

const libraryDataPath = path.join(dataDir, 'libraryData.json');
let libraryDataStr;
try {
    libraryDataStr = fs.readFileSync(libraryDataPath, 'utf8');
    libraryData = JSON.parse(libraryDataStr);
}
catch (e) {
    libraryData = {};
}

async function fetchLibraryList() {
    let libraryList = [];

    for (let page = 1; page <= 16; page++) {
        const data = await particle.listLibraries({
            auth: config.accessToken,
            excludeScopes: 'private',
            limit: 50,
            page: page,
            sort: 'popularity'
        });
        if (data.body.data.length == 0) {
            break;
        }

        libraryList = libraryList.concat(data.body.data);
    }
    console.log('data', libraryList);
    fs.writeFileSync(libraryListPath, JSON.stringify(libraryList, null, 2));

    return libraryList;
}

async function downloadLibraries() {
    for (const lib of libraryList) {
        await downloadLib(lib);
    }
}

async function downloadLib(lib) {
    let doDownload = false;

    const libDir = path.join(dataLibrariesDir, lib.id);
    if (!fs.existsSync(libDir)) {
        fs.mkdirSync(libDir);
        doDownload = true;
    }
    const libVerDir = path.join(libDir, lib.attributes.version);
    if (!fs.existsSync(libVerDir)) {
        fs.mkdirSync(libVerDir);
        doDownload = true;
    }
    if (doDownload) {
        console.log('downloading ' + lib.id + ' ' + lib.attributes.version);
        await new Promise((resolve, reject) => {
            const filePath = path.join(libVerDir, 'archive.tar.gz');
            var fileStream = fs.createWriteStream(filePath);

            fetch(lib.links.download).then(res => {
                res.body.pipe(fileStream);
            });

            fileStream.on('finish', function() {
                resolve();
            });                
        });

        const cmd = 'cd "' + libVerDir + '" && tar xzf archive.tar.gz && rm archive.tar.gz';
        const { stdout, stderr } = await exec(cmd);
    }

    // Check for versions file
    const versionHistory = path.join(libDir, 'versions.json');
    if (!fs.existsSync(versionHistory) || doDownload) {

        const data = await particle.getLibraryVersions({
            auth: config.accessToken,
            limit: 50,
            name: lib.id,
            page: 1
        });

        // console.log('data', data);
        fs.writeFileSync(versionHistory, JSON.stringify(data.body.data, null, 2));
    }


}

async function testBuilds() {
    for (const lib of libraryList) {
        if (!libraryData[lib.id]) {
            libraryData[lib.id] = {};
        }
        const libDir = path.join(dataLibrariesDir, lib.id);
        if (!fs.existsSync(libDir)) {
            console.log('missing library, downloading');
            await downloadLib(lib);
        }
        const libVerDir = path.join(libDir, lib.attributes.version);
        if (!fs.existsSync(libDir)) {
            console.log('missing library version, downloading');
            await downloadLib(lib);
        }

        console.log('checking ' + lib.id + ' ' + lib.attributes.version);

        if (!libraryData[lib.id]) {
            libraryData[lib.id] = {};
        }
        if (!libraryData[lib.id].versions) {
            libraryData[lib.id].versions = {};
        }
        if (!libraryData[lib.id].versions[lib.attributes.version]) {
            libraryData[lib.id].versions[lib.attributes.version] = {};
        }

        if (!libraryData[lib.id].versions[lib.attributes.version].added) {
            libraryData[lib.id].versions[lib.attributes.version].added = new Date().toISOString();
        }
        const dateAdded = new Date(libraryData[lib.id].versions[lib.attributes.version].added);

        if (!libraryData[lib.id].versions[lib.attributes.version].builds) {
            libraryData[lib.id].versions[lib.attributes.version].builds = {};
        }
        const examplesDir = path.join(libVerDir, 'examples');
        let examples = [];
        if (fs.existsSync(examplesDir)) {
            for(let dirent of fs.readdirSync(examplesDir, {withFileTypes:true})) {
                if (dirent.isDirectory()) {
                    let hasSource = false;
    
                    for(let dirent2 of fs.readdirSync(path.join(examplesDir, dirent.name), {withFileTypes:true})) {
                        if (dirent2.isFile() && (dirent2.name.endsWith('.cpp') || dirent2.name.endsWith('.ino'))) {
                            hasSource = true;
                            break;
                        }
                    }

                    if (hasSource) {
                        examples.push(dirent.name);
                    }
                }
            }
        }
        if (examples.length > 0) {
            const buildsDir = path.join(libVerDir, 'builds');
            if (!fs.existsSync(buildsDir)) {
                fs.mkdirSync(buildsDir);
            }
    
            for(const ti of targetInfo) {
                const target = ti.version;

                if (ti.ifAddedBefore) {
                    const ifAddedBefore = new Date(ti.ifAddedBefore);
                    if (dateAdded.getTime() >= ifAddedBefore) {
                        console.log('  skipping target ' + target + ' because of ifAddedBefore');
                        continue;
                    }
                }
                if (ti.ifAddedAfter) {
                    const ifAddedAfter = new Date(ti.ifAddedAfter);
                    if (dateAdded.getTime() < ifAddedAfter) {
                        console.log('  skipping target ' + target + ' because of ifAddedAfter');
                        continue;
                    }
                }
                if (ti.isNotExists) {
                    if (libraryData[lib.id].versions[lib.attributes.version].builds[ti.isNotExists]) {
                        console.log('  skipping target ' + target + ' because of ifNotExists');
                        continue;
                    }
                }


                if (!libraryData[lib.id].versions[lib.attributes.version].builds[target]) {
                    libraryData[lib.id].versions[lib.attributes.version].builds[target] = {};
                }
                const targetDir = path.join(buildsDir, target);
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir);
                }
        
                for(const platform of ti.platforms) {
                    if (!libraryData[lib.id].versions[lib.attributes.version].builds[target][platform]) {
                        libraryData[lib.id].versions[lib.attributes.version].builds[target][platform] = {};
                    }
                    const platformDir = path.join(targetDir, platform);
                    if (!fs.existsSync(platformDir)) {
                        fs.mkdirSync(platformDir);
                    }

                    for(const example of examples) {

                        const cmd = 'cd "' + libVerDir + '" && particle compile ' + platform + ' examples/' + example + ' --saveTo firmware.bin';

                        try {
                            if (typeof libraryData[lib.id].versions[lib.attributes.version].builds[target][platform][example] != 'undefined') {
                                continue;
                            }

                            console.log('  checking ' + example + ' ' + platform + ' ' + target);

                            const { stdout, stderr } = await exec(cmd);

                            fs.writeFileSync(path.join(platformDir, example + '.log'), stderr + '\n' + stdout);

                            console.log('    succeeded'); 
                            libraryData[lib.id].versions[lib.attributes.version].builds[target][platform][example] = true;
                        }  
                        catch(e) {
                            console.log('    failed');
                            fs.writeFileSync(path.join(platformDir, example + '.log'), e.stderr + '\n' + e.stdout);
                            libraryData[lib.id].versions[lib.attributes.version].builds[target][platform][example] = false;
                        }
                        saveLibraryData();
                    }
                }
            }            
        }
        else {
            libraryData[lib.id].versions[lib.attributes.version].noExamples = true;
        }


    }
}

async function generate() {

    const librariesDir = path.join(__dirname, '../../src/assets/files/libraries');
    if (!fs.existsSync(librariesDir)) {
        fs.mkdirSync(librariesDir);
    }

    for (const lib of libraryList) {
        const libSourceDir = path.join(dataLibrariesDir, lib.id);

        const libInfoPath = path.join(librariesDir, lib.id + '.json');

        // Stuff from the library information API
        let libInfo = {};
        libInfo = Object.assign(libInfo, lib);

        if (lib.attributes.official) {
            libInfo.verification = 'official';
            libInfo.kind = 'official library';
        }
        else
        if (lib.attributes.verified) {
            libInfo.verification = 'verified';
            libInfo.kind = 'verified community library';
        }
        else {
            libInfo.kind = 'community library';
        }


        libInfo.letter = lib.id.substr(0, 1).toLowerCase();
        if (libInfo.letter < 'a' || libInfo.letter > 'z') {
            libInfo.letter = 'other';
        }
        libInfo.cardUrl = '/cards/libraries/' + libInfo.letter + '/' + lib.id;

        // Build history
        if (libraryData[lib.id]) {
            libInfo = Object.assign(libInfo, libraryData[lib.id]);
        }

        // Readme
        const libDir = path.join(dataLibrariesDir, lib.id);
        if (fs.existsSync(libDir)) {
            const libVerDir = path.join(libDir, lib.attributes.version);
            if (fs.existsSync(libVerDir)) {
                ['README.md', 'README.txt', 'README'].some(function(name) {
                    const readmePath = path.join(libVerDir, name);
                    if (fs.existsSync(readmePath)) {
                        libInfo.readme = fs.readFileSync(readmePath, 'utf8');
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
        }
    
        // Version history
        const versionHistory = JSON.parse(fs.readFileSync(path.join(libSourceDir, 'versions.json'), 'utf8'));
        libInfo.allVersions = [];
        for(const ver of versionHistory) {
            if (ver.attributes.visibility === 'public') {
                libInfo.allVersions.push(ver.attributes.version);
            }
        }
        libInfo.allVersions.sort(function(a, b) {
            const aParts = a.split('.');
            const bParts = b.split('.');
            for(let ii = 0; ii < 3; ii++) {
                if (bParts.length < ii) {
                    return -1;
                }
                if (aParts.length < ii) {
                    return +1;
                }
                let cmp = parseInt(bParts[ii]) - parseInt(aParts[ii]);
                if (cmp != 0) {
                    return cmp;
                }
            }
            return 0;
        });

        let libInfoOld = '';
        if (fs.existsSync(libInfoPath)) {
            libInfoOld = fs.readFileSync(libInfoPath, 'utf8');
        }
        const libInfoNew = JSON.stringify(libInfo, null, 2);
        if (libInfoOld != libInfoNew) {
            fs.writeFileSync(libInfoPath, libInfoNew);
        }

    }

    // Generate top-level
}


function saveLibraryData() {
    const newStr = JSON.stringify(libraryData, null, 2);
    if (newStr != libraryDataStr) {
        libraryDataStr = newStr;
        fs.writeFileSync(libraryDataPath, libraryDataStr);
    }
}


async function run() {
    if (argv.fetchLibraryList || !fs.existsSync(libraryListPath)) {
        libraryList = await fetchLibraryList();
    }
    else {
        libraryList = JSON.parse(fs.readFileSync(libraryListPath, 'utf8'));
    }
    console.log('libraryList loaded with ' + libraryList.length + ' entries');

    if (argv.downloadLibraries) {
        await downloadLibraries();
    }

    if (argv.testBuilds) {
        await testBuilds();
    }

    if (argv.generate) {
        await generate();
    }

    saveLibraryData();
}

run();

