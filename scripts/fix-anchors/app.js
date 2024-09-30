#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const topDir = path.normalize(path.join(__dirname, '..', '..'));
const srcDir = path.join(topDir, 'src');
const contentDir = path.join(srcDir, 'content');
const assetsDir = path.join(srcDir, 'assets');
const redirectsFile = path.join(topDir, 'config', 'redirects.json');

const firmwareMdPath = path.join(contentDir, 'reference', 'device-os', 'firmware.md');

let anchors = {};
let sections = ['', ''];

function parseLine(line, lineNum) {
    let parsed = {};

    if (line.startsWith('##')) {
        parsed.isHeader = true;

        const m1 = line.match(/^(#+) /);
        parsed.level = m1[1].length;
        const spaceIndex = line.indexOf(' ');

        parsed.origPrefix = line.substring(0, spaceIndex + 1);
        parsed.origTitle = line.substring(spaceIndex + 1).trim().replace(/&/g, '&amp;');

        const m2 = line.match(/ - (.+)$/);
        if (m2) {
            parsed.origClassName = m2[1];
        }

        parsed.shortTitle = parsed.origTitle;
        {
            const offset1 = parsed.shortTitle.indexOf('[');
            if (offset1 > 0) {
                parsed.shortTitle = parsed.shortTitle.substring(0, offset1).trim();
            }
            const offset2 = parsed.shortTitle.indexOf('(');
            if (offset2 > 0) {
                parsed.shortTitle = parsed.shortTitle.substring(0, offset2).trim();
            }                
        }

        if (parsed.level < sections.length) {
            sections = sections.slice(0, parsed.level);
        }
        sections[parsed.level] = parsed.shortTitle;

        if (sections[parsed.level - 1].length > 0) {
            parsed.newClassName = sections[parsed.level - 1];
        }

        parsed.origAnchor = parsed.origTitle.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w]+/g, '-');
        if (parsed.origAnchor === 'constructor') {
            parsed.origAnchor += '-';
        }

        parsed.origAnchorNoTrailingDash = parsed.origAnchor.replace(/[-]+$/g, '');

        if (typeof anchors[parsed.origAnchor] != 'undefined') {
            anchors[parsed.origAnchor].push(lineNum);
            console.log('non-unique anchor', {origAnchor:parsed.origAnchor, level:parsed.level, section: sections[parsed.level - 1], lines:anchors[parsed.origAnchor], });
            parsed.uniqueAnchor = parsed.origAnchor + '-' + (anchors[parsed.origAnchor].length + 1);
        }
        else {
            anchors[parsed.origAnchor] = [lineNum];
            parsed.uniqueAnchor = parsed.origAnchor;
        }    

        if (typeof parsed.origClassName == 'undefined') {
            if (sections[parsed.level - 1].length > 0) {
                parsed.newTitle = parsed.origTitle + ' - ' + sections[parsed.level - 1];
                parsed.newAnchor = parsed.newTitle.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w]+/g, '-');
            }
        }
        else {
        }
    }
    else {
        parsed.isHeader = false;
    }

    return parsed;
}

async function run() {
    const redirectsJson = JSON.parse(fs.readFileSync(redirectsFile, 'utf8'));

    anchors = {};
    sections = ['', ''];

    const origStr = fs.readFileSync(firmwareMdPath, 'utf8');
    let lineArray = [];

    let lineNum = 0;
    for(let line of origStr.split('\n')) {
        lineNum++;
        if (line.startsWith('## Device OS versions')) {
            // This is no longer included in the index as it's huge and doesn't render properly either
            // It must be the last thing in the file, as everything after it is ignored!
            break;
        }

        const parsed = parseLine(line, lineNum);
        if (!parsed.isHeader || parsed.level <= 3) {
            // Not a header, or a h2 (directory) or a h3 (file)
            continue;
        }

        /*
        if (line.startsWith('##')) {
            // Any L2 or higher is an an anchor
            const m1 = line.match(/^(#+) /);
            const level = m1[1].length;
            const spaceIndex = line.indexOf(' ');

            const origPrefix = line.substring(0, spaceIndex + 1);
            const origTitle = line.substring(spaceIndex + 1).trim().replace(/&/g, '&amp;');

            let origClassName;
            const m2 = line.match(/ - (.+)$/);
            if (m2) {
                origClassName = m2[1];
            }

            let shortTitle = origTitle;
            {
                const offset1 = shortTitle.indexOf('[');
                if (offset1 > 0) {
                    shortTitle = shortTitle.substring(0, offset1).trim();
                }
                const offset2 = shortTitle.indexOf('(');
                if (offset2 > 0) {
                    shortTitle = shortTitle.substring(0, offset2).trim();
                }                
            }

            if (level < sections.length) {
                sections = sections.slice(0, level);
            }
            sections[level] = shortTitle;

            let newClassName;
            if (sections[level - 1].length > 0) {
                newClassName = sections[level - 1];
            }

            let origAnchor = origTitle.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w]+/g, '-');
            if (origAnchor === 'constructor') {
                origAnchor += '-';
            }

            const origAnchorNoTrailingDash = origAnchor.replace(/[-]+$/g, '');

            let uniqueAnchor;

            if (typeof anchors[origAnchor] != 'undefined') {
                anchors[origAnchor].push(lineNum);
                console.log('non-unique anchor', {origAnchor, level, section: sections[level - 1], lines:anchors[origAnchor], });
                uniqueAnchor = origAnchor + '-' + (anchors[origAnchor].length + 1);
            }
            else {
                anchors[origAnchor] = [lineNum];
                uniqueAnchor = origAnchor;
            }    


            if (typeof origClassName == 'undefined') {
                if (sections[level - 1].length > 0) {
                    const newTitle = origTitle + ' - ' + sections[level - 1];
                    line = origPrefix + newTitle;   
                    console.log('updated title', {newTitle, origTitle, line});    

                    const newAnchor = newTitle.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w]+/g, '-');
                    if (uniqueAnchor != newAnchor) {

                    }
                }
            }
            else {
            }

        }
        */

        lineArray.push(line);
    }

    // fs.writeFileSync(firmwareMdPath, lineArray.join('\n'));
    // fs.writeFileSync(redirectsFile, JSON.stringify(redirectsJson, null, 2));
}

run();