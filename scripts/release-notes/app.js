#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const argv = require('yargs').argv;

const topDir = path.normalize(path.join('..', '..'));
const configDir = path.join(topDir, 'config');
const releasesJsonPath = path.join(configDir, 'releases.json');

const releaseNotesPath = path.join(topDir, 'src', 'assets', 'files', 'releaseNotes.json');

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


async function fetchReleases() {
    // https://docs.github.com/en/rest/releases/releases

    if (!releasesJson.releases) {
        releasesJson.releases = [];
    }

    let readMore = true;

    let newReleases = [];

    for(let page = 1; page <= 2 && readMore; page++) {
        const cmd = 'gh api -H "Accept: application/vnd.github+json" "/repos/particle-iot/device-os/releases?page=' + page + '"';

        console.log('retrieving releases page ' + page);

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
            const releaseExists = releasesJson.releases.find(e => e.tag_name == release.tag_name);
            if (releaseExists) {
                console.log('releaseExists ' + release.tag_name);
                readMore = false;
                break;
            }

            newReleases.push(release);
        }        
    }

    if (newReleases.length) {
        console.log('added ' + newReleases.length + ' releases');
        
        releasesJson.releases = newReleases.concat(releasesJson.releases);
    }

    releasesJson.updated = now;

    // Save releases file
    fs.writeFileSync(releasesJsonPath, JSON.stringify(releasesJson, null, 4));
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

async function run() {

    if (argv.forceFetch || !releasesJson.updated || releasesJson.updated < (now - 86400)) {
        await fetchReleases();
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
        }
    }


}


run();


