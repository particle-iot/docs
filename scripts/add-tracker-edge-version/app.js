#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const argv = require('yargs').argv;

let version;
if (!argv._) {
    console.log('must specify a version to build as a parameter');
    process.exit(1);
}

try {
    version = parseInt(argv._);
}
catch(e) {
    console.log('version must be an integer');
    process.exit(1);
}

console.log('add version ' + version);

const repo = 'https://github.com/particle-iot/tracker-edge';

const stageDir = 'stage';
const edgeDir = stageDir + '/tracker-edge';

const assetsOutputDir = '../../src/assets/files/tracker';

const stagePath = path.join(__dirname, stageDir);
if (!fs.existsSync(stagePath)) {
    fs.mkdirSync(stagePath);
}
for(const f of fs.readdirSync(stagePath)) {
    if (f.startsWith('tracker-edge') && f.endsWith('.bin')) {
        fs.unlinkSync(path.join(stagePath, f));
    }
}


async function run() {
    
    var zip = new JSZip();

    if (!fs.existsSync(path.join(__dirname, edgeDir))) {
        const cmd = 'cd ' + stageDir + ' && git clone ' + repo;
        const { stdout, stderr } = await exec(cmd);        
    }
    {
        const cmd = 'cd ' + edgeDir + ' && git fetch';
        const { stdout, stderr } = await exec(cmd);
    }
    {
        const cmd = 'cd ' + edgeDir + ' && git checkout release/v' + version;
        const { stdout, stderr } = await exec(cmd);
    }
    {
        const cmd = 'cd ' + edgeDir + ' && git submodule update --init --recursive';
        const { stdout, stderr } = await exec(cmd);
    }
    
    const addDir = function(dir, parentDir) {
        const base = path.basename(dir);
        const zipDir = parentDir.folder(base);

        for(const dirent of fs.readdirSync(dir, {withFileTypes: true})) {
            let skip = false;
            switch(dirent.name) {
                case '.':
                case '..':
                case '.DS_Store':
                case '.git':
                    skip = true;
                    break;
            }
            if (skip) {
                continue;
            }

            const newPath = path.join(dir, dirent.name);
            if (dirent.isDirectory()) {
                addDir(newPath, zipDir);
            }
            else {
                zipDir.file(dirent.name, fs.readFileSync(newPath));
            }
        }

    };
    addDir(edgeDir, zip);
    
    const zipFilename = 'v' + version + '.zip';
    const zipPath = path.join(stageDir, zipFilename);

    await new Promise(function(resolve, reject) {

        zip.generateNodeStream({streamFiles:true})
        .pipe(fs.createWriteStream(zipPath))
        .on('finish', function () {
            resolve();
        });
    });

    fs.copyFileSync(zipPath, path.join(assetsOutputDir, zipFilename));
    

    // gh release list
    {
        const cmd = 'cd ' + stageDir + ' && gh release download v' + version + ' --pattern \'*.bin\' --repo ' + repo;
        const { stdout, stderr } = await exec(cmd);                
    }
    
    
    for(const f of fs.readdirSync(stagePath)) {
        if (f.startsWith('tracker-edge') && f.endsWith('.bin')) {
            fs.copyFileSync(path.join(stagePath, f), path.join(assetsOutputDir, f));
        }
    }
    

};

// 

run();
