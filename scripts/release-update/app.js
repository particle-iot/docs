#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const querystring = require("querystring");

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const fetch = require("node-fetch"); // node-fetch@2 required for CommonJS


const argv = require('yargs').argv;

const topDir = path.normalize(path.join('..', '..'));
const configDir = path.join(topDir, 'config');
const releasesJsonPath = path.join(configDir, 'releases.json');

const filesDir = path.join(topDir, 'src', 'assets', 'files');

const releaseNotesPath = path.join(filesDir, 'releaseNotes.json');

const deviceRestoreJson = JSON.parse(fs.readFileSync(path.join(filesDir, 'deviceRestore.json'), 'utf8'));

// deviceRestoreDir has a directory for each version name (semver) with no 'v'
const deviceRestoreDir = path.join(filesDir, 'device-restore');

// This contains an abundance of information, including
// deviceConstants - The JSON data from device constants
const carriersJson = JSON.parse(fs.readFileSync(path.join(filesDir, 'carriers.json'), 'utf8'));
let platformNameToId = {};
let platformIdToName = {};
for(const key in carriersJson.deviceConstants) {
    const obj = carriersJson.deviceConstants[key];
    
    platformNameToId[obj.name] = obj.id;
    platformIdToName[obj.id.toString()] = obj.name;
}    

// config.json must contain an accessToken
let config = {};
try {
    config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
}
catch(e) {
    console.log('failed to read config.json');
    process.exit(1);
}
if (!config.accessToken) {
    console.log('config.json did not contain accessToken');
    process.exit(1);
}

// Create a new empty tempDir if necessary
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

let releasesJson;
try {
    releasesJson = JSON.parse(fs.readFileSync(releasesJsonPath, 'utf8'));
}
catch(e) {
    releasesJson = {};
}

let releaseNotesOrig = '';
let releaseNotesJson;
try {
    releaseNotesOrig = fs.readFileSync(releaseNotesPath, 'utf8');
    releaseNotesJson = JSON.parse(releaseNotesOrig);
}
catch(e) {
    releaseNotesJson = {};
}


const now = Math.floor(Date.now() / 1000);




async function fetchReleases(options) {
    // options.old, .repository

    // https://docs.github.com/en/rest/releases/releases

    let readMore = true;

    let newReleases = [];

    for(let page = 1; page <= 3 && readMore; page++) {
        const cmd = 'gh api -H "Accept: application/vnd.github+json" "/repos/' + options.repository + '/releases?page=' + page + '"';

        console.log('retrieving releases page ' + page + ' ' + options.repository);

        const { stdout, stderr } = await exec(cmd, {maxBuffer: 1024 * 1024 * 5});                

        const releaseArray = JSON.parse(stdout);
        if (releaseArray.length == 0) {
            break;
        }

        for(const release of releaseArray) {
            if (release.draft) {
                continue;
            }

            // Check our temporary downloads
            if (options.old) {
                const releaseExists = options.old.find(e => e.tag_name == release.tag_name);
                if (releaseExists) {
                    console.log('releaseExists ' + release.tag_name);
                    readMore = false;
                    break;
                }    
            }

            newReleases.push(release);
        }        
    }
    return newReleases;
}

async function fetchPulls() {
    if (!releasesJson.pulls) {
        releasesJson.pulls = [];
    }

    let readMore = true;

    let newPulls = [];

    for(let page = 1; page <= 100 && readMore; page++) {
        const cmd = 'gh api -H "Accept: application/vnd.github+json" "/repos/particle-iot/device-os/pulls?state=all&sort=created&direction=desc&page=' + page + '"';

        // console.log('cmd=' + cmd);

        const { stdout, stderr } = await exec(cmd, {maxBuffer: 1024 * 1024 * 5});                

        const pullsArray = JSON.parse(stdout);
        if (pullsArray.length == 0) {
            break;
        }

        console.log('retrieved pulls page ' + page + ' count=' + pullsArray.length);

        let numbers = [];

        for(const pull of pullsArray) {

            // Check our temporary downloads
            const pullExists = releasesJson.pulls.find(e => e.number == pull.number); 
            if (pullExists) {
                console.log('pullExists ' + pull.number);
                readMore = false;
                break;
            }
            numbers.push(pull.number);

            newPulls.push(pull);
        }        
        // console.log('numbers', numbers);

        // We need to read over 100 pages to get all of the PRs, so slow this down to avoid getting blocked by the API
        await new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 10000);
        });        
    }

    if (newPulls.length) {
        console.log('added ' + newPulls.length + ' pull requests');
        
        releasesJson.pulls = newPulls.concat(releasesJson.pulls);
    }

    releasesJson.updated = now;

    // Save releases file
    fs.writeFileSync(releasesJsonPath, JSON.stringify(releasesJson, null, 4));
}

async function processReleases() {

    for(const release of releasesJson.releases) {
        // console.log('name=' + release.name + ' tag_name=' + release.tag_name);
        // console.log('body', release.body);
    
        let section2 = '', section3;
    
        if (!releaseNotesJson.releases) {
            releaseNotesJson.releases = {};
        }
    
        const releaseObj = {
            url: release.html_url,
            tag_name: release.tag_name,
            name: release.name,
            prerelease: release.prerelease,
            created_at: release.created_at,
            published_at: release.published_at,
            entries: [],
            prs: [],
        };
    
        for(let line of release.body.split('\n')) {
            if (line.startsWith('- ')) {
                let tags = [];
                let prs = [];
                let issues;
            
                const processLinks = function(re) {
                    for(const match of line.matchAll(re)) {
                        const kind = match[3];
                        const id = parseInt(match[4]);
                        if (kind == 'pull') {
                            if (!prs.includes(id)) {
                                prs.push(id);
                            }
                            if (!releaseObj.prs.includes(id)) {
                                releaseObj.prs.push(id)
                            }    
                        }
                        else
                        if (kind == 'issues') {
                            if (!issues) {
                                issues = [];                                
                            }
                            if (!issues.includes(id)) {
                                issues.push(id);
                            }
                        }
                    }
                    line = line.replace(re, '');
                }


                // 
                processLinks(/\[[A-Za-z ]*[#[0-9]+\]\(https:\/\/github\.com\/(particle-iot|spark)\/(device-os|firmware)\/(pull|issue)\/([0-9]+)\)/g);

                processLinks(/\[`[^`]*`\]\(https:\/\/github\.com\/(particle-iot|spark)\/(device-os|firmware)\/(pull|issues)\/([0-9]+)\)/g);

                
                let entry = line.substring(2).trim();
                while(entry.length) {
                    if (entry.startsWith('[')) {
                        const endIndex = entry.indexOf(']');
                        if (endIndex > 0) {
                            const tag = entry.substring(1, endIndex);
                            // console.log('tag=' + tag);
                            if (tag.length < 15 && tag.indexOf('**') < 0) {
                                tags.push(tag);
                            }
    
                            entry = entry.substring(endIndex + 1).trim();
                        }
                        else {
                            break;
                        }
                    }
                    else {                                            
                        if (section3 && !section2.startsWith('Upgrading')) {
                            // console.log('msg=' + entry);
                            const entryObj = {
                                tags,
                                prs,
                                issues,
                                section: section3,
                                text: entry,
                            };
                            releaseObj.entries.push(entryObj);
                        }
                        break;
                    }
                }    
            }
            else
            if (line.startsWith('### ')) {
                section3 = line.substring(4).trim();
                // console.log('section=' + section3);
            }
            else
            if (line.startsWith('## ')) {
                section2 = line.substring(3).trim();
            }
        }
        releaseObj.prs.sort();

        releaseNotesJson.releases[release.tag_name] = releaseObj;
    }
}

async function processPulls() {
    
    
    if (!releaseNotesJson.pulls) {
        releaseNotesJson.pulls = {};
    }

    let sectionKeys = [];

    for(const pull of releasesJson.pulls) {

        let pullsObj = {
            url: pull.html_url,
            number: pull.number,
            title: pull.title,
            state: pull.state,
            created_at: pull.created_at,
            published_at: pull.published_at,
        };
        // console.log('pullsObj', pullsObj);

        let sectionData = {};
        let sectionKey = 'none';

        if (pull.body) {
            for(let line of pull.body.split('\n')) {
                line = line.replace(/[\r]/g, '');
    
                if (line.startsWith('### ')) {
                    sectionKey = line.substring(3).trim().toLowerCase();
                    if (!sectionKeys.includes(sectionKey)) {
                        sectionKeys.push(sectionKey);
                    }
                }
                else
                if (!line.startsWith('#')) {            
                    if (!sectionData[sectionKey]) {
                        sectionData[sectionKey] = '';
                    }
                    sectionData[sectionKey] += line + '\n';
                }
            }
    
            for(const field of ['problem', 'description']) {
                if (sectionData[field]) {
                    pullsObj.detail = sectionData[field].trim();
                    break;
                }
            }
        }

        //console.log('saving ' + pull.number);
        releaseNotesJson.pulls[pull.number.toString()] = pullsObj;
    }

    sectionKeys.sort();
    // console.log('sectionKeys', sectionKeys);

}

async function fetchDeviceOsVersions() {
    let deviceOsVersions = [];


    for(let page = 1; ; page++) {
        const queryOptions = {
            access_token: config.accessToken,
            page,
        };

        const url = 'https://api.particle.io/v1/device-os/versions?' + querystring.stringify(queryOptions);

        const result = await new Promise(function(resolve, reject) {
            const fetchRes = fetch(url)
            .then(response => response.json())
            .then(function(result) {
                resolve(result);
            });
        });
        for(const v of result.versions) {
            deviceOsVersions.push(v);
        }
        if (deviceOsVersions.length >= result.meta.total || result.versions.length == 0) {
            break;
        }
    }

    // console.log('deviceOsVersions', deviceOsVersions);

    // Array of:
    // {
    //     version: '5.2.0',
    //     internal_version: 5200,
    //     state: 'pre_release',
    //     base_url: 'https://api.particle.io/v1/firmware/device-os/v5.2.0',
    //     supported_platforms: [Array]
    // },
    return deviceOsVersions;
}

async function fetchVersionDetails(options) {
    // options.platformId .version
    const queryOptions = {
        access_token: config.accessToken,
        platform_id: options.platformId,
    };

    const url = 'https://api.particle.io/v1/device-os/versions/' + options.version + '?' + querystring.stringify(queryOptions);
    console.log('url=' + url);
    
    const result = await new Promise(function(resolve, reject) {
        const fetchRes = fetch(url)
        .then(response => response.json())
        .then(function(result) {
            resolve(result);
        });
    });

    /*
    Returned object:
    {
        version: '5.5.0-rc.1',
        internal_version: 5500,
        state: 'pre_release',
        base_url: 'https://api.particle.io/v1/firmware/device-os/v5.5.0-rc.1',
        supported_platforms: [
            12, 25, 13, 23, 15,
            35, 32, 26, 28
        ],
        modules: [
            {
            filename: 'trackerm-bootloader@5.5.0-rc.1.bin',
            crc: [Object],
            prefixInfo: [Object],
            suffixInfo: [Object]
            },
            {
            filename: 'trackerm-prebootloader-mbr@5.5.0-rc.1.bin',
            crc: [Object],
            prefixInfo: [Object],
            suffixInfo: [Object]
            },
    */

    // Append the filename to the base_url with a / separator
    // https://api.particle.io/v1/firmware/device-os/v3.3.1/photon-system-part1@3.3.1.bin

    return result;
}

async function runDeviceOs() {
    const ignoreVersions = ['3.2.1-p2.1', '3.0.1-p2.4', '3.0.1-p2.5'];

    const deviceOsVersions = await fetchDeviceOsVersions();
    for(const ver of deviceOsVersions) {
        if (ver.internal_version < 2100) {
            // Ignore versions older than 2.1.0
            continue;
        }
        if (ver.internal_version < 4000 && (ver.version.includes('rc') || ver.version.includes('beta'))) {
            // Ignore rc and beta versions before 4.0.0
            continue;
        }
        if (ignoreVersions.includes(ver.version)) {
            // Manually excluded version
            continue;
        }

        if (deviceRestoreJson.versionNames.includes(ver.version) && ver.version != '5.5.0-rc.1') { //TEMPORARY
            // Already in deviceRestore.json
            continue;
        }   

        console.log('unknown version', ver);

        for(const platformId of ver.supported_platforms) {
            const details = await fetchVersionDetails({
                version: ver.version,
                platformId,
            });
            // console.log('details', details);

            // Pass 1: Download binaries
            for(const module of details.modules) {
                const url = details.base_url + '/' + module.filename;

                const binaryFile = path.join(tempDir, module.filename);

                if (module.filename.includes('prebootloader-mbr')) {
                    // Skip P2 prebootloader-mbr as it must never be flashed to a device
                    continue;
                }

                if (!fs.existsSync(binaryFile)) {
                    console.log('downloading ' + module.filename);
                    const binary = await new Promise(function(resolve, reject) {
                        const fetchRes = fetch(url)
                        .then(response => response.arrayBuffer())
                        .then(function(response) {
                            resolve(Buffer.from(response));
                        });
                    });
    
                    // console.log('binary', binary);
                    fs.writeFileSync(binaryFile, binary);    
                }    
            }
            
            const outputDir = path.join(deviceRestoreDir, ver.version);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }

            // Pass 2: Process files as done in HexTool
        }
    }

    // Clean up tempDir
    // fs.rmSync(tempDir, {recursive:true});
}

async function runEdgeVersion(options) {
    // options.repository, .kind

    if (!releasesJson.edge) {
        releasesJson.edge = {};
    }
    if (!releasesJson.edge[options.kind]) {
        releasesJson.edge[options.kind] = [];
    }
    if (!releasesJson.edge[options.kind].releases) {
        releasesJson.edge[options.kind].releases = [];
    }


    // .kind is 'tracker-edge' or 'monitor-edge'

    const newReleases = await fetchReleases({
        repository: options.repository,
        old: releasesJson.edge[options.kind].releases,
    });

    if (newReleases.length) {
        console.log('added ' + newReleases.length + ' ' + options.kind + ' releases');
        
        releasesJson.edge[options.kind].releases = newReleases.concat(releasesJson.edge[options.kind].releases);

        // Save releases file
        fs.writeFileSync(releasesJsonPath, JSON.stringify(releasesJson, null, 4));
    }

}


async function run() {
    let releaseNotesUpdated = false;

    // Disable release notes using --no-release-notes
    if (argv.releaseNotes !== false) {
        // Release notes
        if (argv.forceFetch || !releasesJson.updated || releasesJson.updated < (now - 86400)) {
            // Fetch releases
            if (!releasesJson.releases) {
                releasesJson.releases = [];
            }
        
            const newReleases = await fetchReleases({
                old: releasesJson.releases,
                repository: 'particle-iot/device-os',
            });
        
        
            if (newReleases.length) {
                console.log('added ' + newReleases.length + ' releases');
                
                releasesJson.releases = newReleases.concat(releasesJson.releases);
            }
        
            releasesJson.updated = now;
        
            // Save releases file
            fs.writeFileSync(releasesJsonPath, JSON.stringify(releasesJson, null, 4));
        

            await fetchPulls();
        }
        
        if (!argv.noProcess) {
            await processReleases();
            await processPulls();
    
            // Save JSON if changed
            const releaseNotesNew = JSON.stringify(releaseNotesJson, null, 4);
            if (releaseNotesNew != releaseNotesOrig) {
                console.log('updated ' + releaseNotesPath);
                fs.writeFileSync(releaseNotesPath, releaseNotesNew);
                releaseNotesUpdated = true;    
            }
        }    
    }

    // Process Tracker Edge versions. Disable with --no-tracker-edge
    if (argv.trackerEdge !== false) {
        await runEdgeVersion({
            kind: 'tracker-edge',
            repository: 'particle-iot/tracker-edge',
        });
    }
    

    // Process Device OS versions. Disable with --no-device-os
    if (argv.deviceOs !== false) {
        await runDeviceOs();
    }
    

    if (argv.clearVersionUpdate || releaseNotesUpdated) {
        // Clear version Update
        try {
            const versionUpdatePath = path.join(configDir, 'versionUpdate.json');

            let json = JSON.parse(fs.readFileSync(versionUpdatePath, 'utf8'));
            delete json.updated;
            fs.writeFileSync(versionUpdatePath, JSON.stringify(json, null, 4));
        }
        catch(e) {
            console.log('exception updating versionUpdate.json', e);
        }
    }


}


run();

