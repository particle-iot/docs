
// Shared blurbs
//
// A shared blurb is a section of text that is kept identical in multiple md files:
//
// {{!-- BEGIN shared-blurb 39fe3a4d-397e-417f-b7f5-b1f91d69cee4 --}}
// text
// {{!-- END shared-blurb 39fe3a4d-397e-417f-b7f5-b1f91d69cee4 --}}
//
// The GUID on the END marker is optional. If it is omitted, the END closes the innermost
// blurb that is currently open (the original behavior).
//
// Blurbs can be nested. When nesting, include the GUID on the END marker so that it is clear
// which blurb is being closed:
//
// {{!-- BEGIN shared-blurb OUTER --}}
// {{!-- BEGIN shared-blurb INNER --}}
// text
// {{!-- END shared-blurb INNER --}}
// {{!-- END shared-blurb OUTER --}}
//
// The text of an outer blurb includes the markers and text of any inner blurbs.
//
// When a blurb is edited in one file, the change is propagated to all of the other copies. The
// hash of each blurb is stored in the config file to figure out which copy was edited. If
// multiple copies have been edited in different ways, the copy in the most recently modified
// file wins.

var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

const markerRE = /\{\{!--\s*(BEGIN|END)\s+shared-blurb(?:[ \t]+([^\s}]+))?\s*--\}\}/g;

// Maximum number of passes. Updating an outer blurb can change the text of an inner blurb and vice-versa,
// so this keeps going until things settle.
const maxRounds = 10;

// If the modification times are within this number of milliseconds, they are considered a tie.
const mtimeTieMs = 1;

function hashText(text) {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
}

// Finds all of the blurbs in a string, including nested blurbs. Returns an array of
// {blurbId, start, startEnd, end, endEnd, depth}
//
// start - offset of the BEGIN marker
// startEnd - offset of the first character of the blurb text (after the BEGIN marker and its newline)
// end - offset of the END marker (the blurb text is startEnd to end)
// endEnd - offset after the END marker
function findBlurbs(text, fileName, log) {
    log = log || console.log;

    const blurbs = [];
    const stack = [];

    markerRE.lastIndex = 0;
    let m;
    while((m = markerRE.exec(text)) !== null) {
        const isBegin = (m[1] == 'BEGIN');
        const markerId = m[2];

        if (isBegin) {
            if (!markerId) {
                log('Malformed blurb in ' + fileName + ' at offset ' + m.index + ' missing GUID on BEGIN');
                continue;
            }

            let startEnd = m.index + m[0].length;
            if (text.charAt(startEnd) == '\r') {
                startEnd++;
            }
            if (text.charAt(startEnd) == '\n') {
                startEnd++;
            }

            stack.push({
                blurbId: markerId,
                start: m.index,
                startEnd,
            });
            continue;
        }

        // END
        if (stack.length == 0) {
            log('Malformed blurb in ' + fileName + ' at offset ' + m.index + ' END without a matching BEGIN');
            continue;
        }

        let stackIndex = stack.length - 1;
        if (markerId) {
            stackIndex = -1;
            for(let ii = stack.length - 1; ii >= 0; ii--) {
                if (stack[ii].blurbId == markerId) {
                    stackIndex = ii;
                    break;
                }
            }
            if (stackIndex < 0) {
                log('Malformed blurb in ' + fileName + ' at offset ' + m.index + ' END ' + markerId + ' does not match an open BEGIN');
                continue;
            }
        }

        // Anything still open above the matching BEGIN was never closed
        while(stack.length - 1 > stackIndex) {
            const unclosed = stack.pop();
            log('Malformed blurb in ' + fileName + ' at offset ' + unclosed.start + ' missing END for ' + unclosed.blurbId);
        }

        const open = stack.pop();
        blurbs.push({
            blurbId: open.blurbId,
            start: open.start,
            startEnd: open.startEnd,
            end: m.index,
            endEnd: m.index + m[0].length,
            depth: stack.length,
        });
    }

    for(const unclosed of stack) {
        log('Malformed blurb in ' + fileName + ' at offset ' + unclosed.start + ' missing END');
    }

    // Sort by start offset (outer blurbs before the blurbs nested in them)
    blurbs.sort(function(a, b) {
        return a.start - b.start;
    });

    return blurbs;
}

// Reads the front matter from the on-disk version of the file, since the metalsmith contents do not include it
function getFrontMatter(fileContents) {
    let separatorCount = 0;
    let frontMatter = '';
    for(const line of fileContents.split(/\n/)) {
        frontMatter += line + '\n';

        if (line.trimEnd() == '---') {
            separatorCount++;

            if (separatorCount == 2) {
                break;
            }
        }
    }
    return frontMatter;
}

module.exports = function(options) {

    // Index of blurbId -> {fileName: true} for every file known to contain the blurb. It is built from the
    // first (full) build. When running under metalsmith-watch, later runs only contain the files that changed,
    // so the index is used to find the other copies of a changed blurb, which are read from disk.
    const blurbIndex = {};
    let fullBuildDone = false;

    const skipFile = function(fileName) {
        // Skip over expanded version of fireware.md (individual files for each L2 header)
        return !fileName.endsWith('.md') || fileName.startsWith('reference/device-os/api/');
    };

	return function(files, metalsmith, done) {
        // Read config file
        let blurbConfig = {
            blurbs: {}
        };
        let blurbConfigOrig = '';

        const blurbConfigPath = metalsmith.path(options.config);
        if (fs.existsSync(blurbConfigPath)) {
            blurbConfigOrig = fs.readFileSync(blurbConfigPath, 'utf8');
            blurbConfig = JSON.parse(blurbConfigOrig);
        }

        const contentDir = metalsmith.path(options.contentDir);

        const mtimeCache = {};
        const getMtime = function(fileName) {
            if (typeof mtimeCache[fileName] == 'undefined') {
                try {
                    mtimeCache[fileName] = fs.statSync(path.join(contentDir, fileName)).mtimeMs;
                }
                catch(e) {
                    mtimeCache[fileName] = 0;
                }
            }
            return mtimeCache[fileName];
        };

        const malformedLogged = {};

        // Files processed by this plugin. On a full build this is just files. On an incremental build (watch)
        // it also includes other files on disk that share a blurb with a changed file. Those extra files are not
        // part of the metalsmith pipeline, they are only updated on disk. The file watcher then rebuilds them.
        const work = Object.assign({}, files);

        const updateIndex = function(fileName, text) {
            for(const id of Object.keys(blurbIndex)) {
                delete blurbIndex[id][fileName];
            }
            for(const b of findBlurbs(text, fileName, function() {})) {
                if (!blurbIndex[b.blurbId]) {
                    blurbIndex[b.blurbId] = {};
                }
                blurbIndex[b.blurbId][fileName] = true;
            }
        };

        if (!fullBuildDone) {
            fullBuildDone = true;
            for(const fileName of Object.keys(files)) {
                if (!skipFile(fileName)) {
                    updateIndex(fileName, files[fileName].contents.toString('utf8'));
                }
            }
        }
        else {
            // Incremental build. Refresh the index for the changed files, then pull in every other file that
            // shares a blurb with them (repeating, because those files may contain other blurbs).
            const queue = [];
            for(const fileName of Object.keys(files)) {
                if (!skipFile(fileName)) {
                    const text = files[fileName].contents.toString('utf8');
                    updateIndex(fileName, text);
                    queue.push(text);
                }
            }
            while(queue.length) {
                const text = queue.pop();
                for(const b of findBlurbs(text, '', function() {})) {
                    for(const otherName of Object.keys(blurbIndex[b.blurbId] || {})) {
                        if (work[otherName]) {
                            continue;
                        }
                        try {
                            const diskText = fs.readFileSync(path.join(contentDir, otherName), 'utf8');
                            const frontMatter = getFrontMatter(diskText);
                            const body = diskText.substring(frontMatter.length);
                            work[otherName] = { contents: Buffer.from(body, 'utf8'), extra: true };
                            queue.push(body);
                        }
                        catch(e) {
                            // File was deleted or renamed
                            delete blurbIndex[b.blurbId][otherName];
                        }
                    }
                }
            }
        }

        for(let round = 0; round < maxRounds; round++) {
            let blurbInfo = {};

            // Process all files looking for blurbs
            for(const fileName of Object.keys(work)) {
                if (skipFile(fileName)) {
                    continue;
                }

                const oldText = work[fileName].contents.toString('utf8');

                // Only log malformed blurbs once, not on every round
                const blurbs = findBlurbs(oldText, fileName, function(msg) {
                    if (!malformedLogged[msg]) {
                        malformedLogged[msg] = true;
                        console.log(msg);
                    }
                });

                for(const b of blurbs) {
                    const blurbText = oldText.substring(b.startEnd, b.end);
                    const hashHex = hashText(blurbText);

                    if (!blurbInfo[b.blurbId]) {
                        blurbInfo[b.blurbId] = {
                            blurbId: b.blurbId,
                            locations: []
                        };
                    }

                    blurbInfo[b.blurbId].locations.push({
                        fileName,
                        start: b.start,
                        startEnd: b.startEnd,
                        end: b.end,
                        endEnd: b.endEnd,
                        depth: b.depth,
                        hash: hashHex,
                        blurbText,
                        isEmpty: (blurbText.trim().length == 0),
                    });
                }
            }

            // Figure out which location (if any) of each blurb has the correct text
            let updates = [];

            for(const blurbId of Object.keys(blurbInfo)) {
                const locations = blurbInfo[blurbId].locations;
                const configEntry = blurbConfig.blurbs[blurbId];
                const configHash = configEntry ? configEntry.hash : undefined;

                // Locations that differ from the last known good version. If the blurb is not in the config
                // yet, any location with text is a candidate. An empty location is a placeholder to be filled in.
                const candidates = locations.filter(function(loc) {
                    return !loc.isEmpty && loc.hash != configHash;
                });

                let winner;

                const candidateHashes = {};
                for(const loc of candidates) {
                    candidateHashes[loc.hash] = true;
                }

                if (candidates.length > 0) {
                    // Sort by most recently modified file first
                    candidates.sort(function(a, b) {
                        return getMtime(b.fileName) - getMtime(a.fileName);
                    });
                    winner = candidates[0];

                    if (Object.keys(candidateHashes).length > 1) {
                        // Conflict. Multiple different versions of the blurb that are not the version in the config.
                        // Use the modification time of the files to figure out which one is correct.
                        const runnerUp = candidates.find(function(loc) {
                            return loc.hash != winner.hash;
                        });
                        const isTie = Math.abs(getMtime(winner.fileName) - getMtime(runnerUp.fileName)) <= mtimeTieMs;

                        console.log('blurb ' + blurbId + ' is changed in multiple files! config hash=' + configHash);
                        for(const loc of candidates) {
                            console.log('  ' + loc.fileName + ' at ' + loc.start + ' hash=' + loc.hash + ' modified=' + new Date(getMtime(loc.fileName)).toISOString());
                        }

                        if (isTie) {
                            console.log('  modification times are the same, cannot tell which is correct, not updating');
                            continue;
                        }
                        console.log('  using the version in the most recently modified file ' + winner.fileName);
                    }
                }
                else {
                    // Nothing has been changed (or the blurb is empty everywhere), so the config version is current
                    const nonEmpty = locations.filter(function(loc) {
                        return !loc.isEmpty;
                    });
                    if (nonEmpty.length == 0) {
                        continue;
                    }
                    winner = nonEmpty[0];
                    if (!configEntry) {
                        blurbConfig.blurbs[blurbId] = {};
                    }
                    blurbConfig.blurbs[blurbId].hash = winner.hash;
                }

                // Update the hash in the config
                if (!blurbConfig.blurbs[blurbId]) {
                    blurbConfig.blurbs[blurbId] = {};
                }
                blurbConfig.blurbs[blurbId].hash = winner.hash;

                // Update all of the other locations
                for(const loc of locations) {
                    if (loc.hash != winner.hash) {
                        let info = Object.assign({}, loc);
                        info.blurbText = winner.blurbText;
                        updates.push(info);
                    }
                }
            }

            if (updates.length == 0) {
                break;
            }

            // Sort updates by file, and within a file by ascending start, so that outer blurbs come before the
            // blurbs nested in them.
            updates.sort(function(a, b) {
                let cmp = a.fileName.localeCompare(b.fileName);
                if (cmp == 0) {
                    cmp = a.start - b.start;
                }
                return cmp;
            });

            // Updating an outer blurb replaces any blurbs nested inside it, so skip updates that are inside a range that
            // is already being updated. The next round will find any remaining differences.
            let filteredUpdates = [];
            let lastFileName = '';
            let lastEnd = -1;
            for(const loc of updates) {
                if (loc.fileName != lastFileName) {
                    lastFileName = loc.fileName;
                    lastEnd = -1;
                }
                if (loc.start < lastEnd) {
                    continue;
                }
                lastEnd = loc.endEnd;
                filteredUpdates.push(loc);
            }

            // Apply from the end of the file toward the beginning so offsets stay correct
            filteredUpdates.sort(function(a, b) {
                let cmp = a.fileName.localeCompare(b.fileName);
                if (cmp == 0) {
                    cmp = b.start - a.start;
                }
                return cmp;
            });

            // Process all files to update blurbs
            const writeFiles = {};
            for(const loc of filteredUpdates) {
                const oldText = work[loc.fileName].contents.toString('utf8');

                const newText = oldText.substring(0, loc.startEnd) + loc.blurbText + oldText.substring(loc.end);

                work[loc.fileName].contents = Buffer.from(newText, 'utf8');
                writeFiles[loc.fileName] = true;
            }

            // Update files on disk
            for(const fileName of Object.keys(writeFiles)) {
                const oldFileContents = fs.readFileSync(path.join(contentDir, fileName), 'utf8');
                const frontMatter = getFrontMatter(oldFileContents);

                fs.writeFileSync(path.join(contentDir, fileName), frontMatter + work[fileName].contents.toString('utf8'));

                // The file was just written by this script, so its modification time no longer says anything about
                // which edit is the most recent
                delete mtimeCache[fileName];
            }
        }

        // Save config file if changed
        const blurbConfigNew = JSON.stringify(blurbConfig, null, 2);
        if (blurbConfigNew != blurbConfigOrig) {
            fs.writeFileSync(blurbConfigPath, blurbConfigNew);
        }

		done();
	};
};

module.exports.findBlurbs = findBlurbs;
