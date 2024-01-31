
var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

module.exports = function(options) {

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

        let blurbInfo = {};

        // Process all files looking for blurbs
        for(const fileName of Object.keys(files)) {
            if (!fileName.endsWith('.md')) {
                continue;
            }
            // Skip over expanded version of fireware.md (individual files for each L2 header)
            if (fileName.startsWith('reference/device-os/api/')) {
                continue;
            }

			var file = files[fileName];
            
            const oldText = file.contents.toString('utf8');

            const startBlurbString = '{{!-- BEGIN shared-blurb ';
            const endMarker = '--}}';

            let pos = 0;
            while(true) {
                const start = oldText.indexOf(startBlurbString, pos);
                if (start >= 0) {
                    let startEnd = oldText.indexOf(endMarker, start);
                    if (startEnd >= 0) {
                        const blurbId = oldText.substring(start + startBlurbString.length, startEnd).trim();

                        startEnd += endMarker.length;
                        if (oldText.charAt(startEnd) == '\n') {
                            startEnd++;
                        }

                        const end = oldText.indexOf('{{!-- END shared-blurb', start);
                        if (end >= 0) {
                            let endEnd = oldText.indexOf(endMarker, start);
                            if (endEnd >= 0) {
                                endEnd += endMarker.length;

                                const blurbText = oldText.substring(startEnd, end);
                                // console.log('blurbText', blurbText);

                                const hash = crypto.createHash('sha256');
                                hash.update(blurbText);
                                const hashHex = hash.digest('hex');

                                if (!blurbConfig.blurbs[blurbId]) {
                                    blurbConfig.blurbs[blurbId] = {
                                        hash: hashHex                                        
                                    }
                                }

                                if (!blurbInfo[blurbId]) {
                                    blurbInfo[blurbId] = {
                                        blurbId,
                                        locations: []
                                    };
                                }

                                let info = {
                                    fileName,
                                    start,
                                    startEnd,
                                    end,
                                    endEnd,
                                    hash: hashHex,
                                    isChanged: (blurbConfig.blurbs[blurbId].hash != hashHex)
                                };
                                if (info.isChanged) {
                                    info.blurbText = blurbText;
                                }

                                blurbInfo[blurbId].locations.push(info);

                                pos = endEnd;
                            }
                            else {
                                console.log('Malformed blurb in ' + fileName + ' at offset ' + start + ' missing }} on END');
                                break;
                            }
                        } 
                        else {
                            console.log('Malformed blurb in ' + fileName + ' at offset ' + start + ' missing END');
                            break;
                        }
                    }
                    else {
                        console.log('Malformed blurb in ' + fileName + ' at offset ' + start + ' missing }} on START');
                        break;
                    }
                }
                else {
                    break;
                }
            }
		}

        // console.log('blurbInfo', JSON.stringify(blurbInfo, null, 2));

        // Check for multiple changes in files
        for(const blurbId of Object.keys(blurbInfo)) {
            let changes = 0;
            let hashCounts = {};
            for(const loc of blurbInfo[blurbId].locations) {
                if (loc.isChanged) {
                    changes++;
                    if (hashCounts[loc.hash]) {
                        hashCounts[loc.hash]++;
                    }
                    else {
                        hashCounts[loc.hash] = 1;
                    }
                }
            }

            if (Object.keys(hashCounts).length == 1) {
                console.log('blurb ' + blurbId + ' is changed, updating all locations');
                for(const loc of blurbInfo[blurbId].locations) {
                    if (loc.isChanged) {
                        blurbConfig.blurbs[blurbId].hash = loc.hash;
                    }
                }
            }
            else 
            if (changes > 1) {
                console.log('blurb ' + blurbId + ' is changed in multiple files! config hash=' + blurbConfig.blurbs[blurbId].hash);
                for(const loc of blurbInfo[blurbId].locations) {
                    if (loc.isChanged) {
                        console.log('  ' + loc.fileName + ' at ' + loc.start + ' hash=' + loc.hash);
                        loc.isChanged = false;
                    }
                }
    
            }
        }

        // Process list of updates
        let updates = [];

        for(const blurbId of Object.keys(blurbInfo)) {
            let changedLoc;

            for(const loc of blurbInfo[blurbId].locations) {
                if (loc.isChanged) {
                    changedLoc = loc;
                }
            }
            if (changedLoc) {
                // Update other locations of this blurb
                for(const loc of blurbInfo[blurbId].locations) {
                    if (!loc.isChanged) {
                        let info = Object.assign({}, loc);
                        info.blurbText = changedLoc.blurbText;
                        updates.push(info);                        
                    }
                }
                // Update hash in config
                blurbConfig.blurbs[blurbId].hash = changedLoc.hash;
            }
        }

        // Sort updates
        updates.sort(function(a, b) {
            let cmp = a.fileName.localeCompare(b.fileName);
            if (cmp == 0) {
                // Sort by descending start so the last change in a file is updated first so offsets stay correct
                cmp = b.start - a.start;
            }
            return cmp;
        });

        // console.log('updates', updates);

        // Process all files to update blurbs
        for(const loc of updates) {
            const oldFileContents = fs.readFileSync(path.join(contentDir, loc.fileName), 'utf8');
            let separatorCount = 0;
            let frontMatter = '';
            for(const line of oldFileContents.split(/\n/)) {
                frontMatter += line + '\n';

                if (line == '---') {
                    separatorCount++;

                    if (separatorCount == 2) {
                        break;
                    }
                }
            }
            
            const oldText = files[loc.fileName].contents.toString('utf8');

            newText = oldText.substring(0, loc.startEnd) + loc.blurbText + oldText.substring(loc.end);

            files[loc.fileName].contents = Buffer.from(newText, 'utf8');

            // Update file on disk
            fs.writeFileSync(path.join(contentDir, loc.fileName), frontMatter + newText);
        }

        // Save config file if changed
        const blurbConfigNew = JSON.stringify(blurbConfig, null, 2);
        if (blurbConfigNew != blurbConfigOrig) {
            fs.writeFileSync(blurbConfigPath, blurbConfigNew);
        }
        else {
        }

		done();
	};
};
