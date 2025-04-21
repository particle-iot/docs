// Update sections that are shared across multiple md documents

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const updater = {};


async function run(files, metalsmith) {
    // console.log('update-shared');

    // Read blurb configuration file
    updater.origBlurbsString = fs.readFileSync(updater.blurbsConfigPath, 'utf8');
    updater.blurbsConfig = JSON.parse(updater.origBlurbsString);
    
    // Read diagram configuration file
    updater.diagrams = [];
    for(const de of fs.readdirSync(updater.diagramsPath, {withFileTypes: true})) {
        if (de.isFile && de.name.endsWith('.json')) {
            const j = JSON.parse(fs.readFileSync(path.join(updater.diagramsPath, de.name)));
            updater.diagrams.push(j);
        }
    }

    const findMarkers = function(f) {
        let sequentialMarkers = [];

        // <!-- shared-blurb start primary-led -->
        const markerRE = /<!--[ \t]*shared-([-_a-zA-z0-0]+)[ \t]+([-_a-zA-z0-9 \t]+)-->/;
        const markerImplicitEndRE = /<!--[ \t]*end[ \t]*-->/;

        const implicitStartMarkers = ['diagram-label'];

        // Find all markers
        let index = 0;        
        while(index < f.content.length) {
            const m = f.content.substring(index).match(markerRE);
            if (!m) {
                break;
            }
            
            const marker = {};
            marker.start = index + m.index;
            marker.end = marker.start + m[0].length;
            marker.kind = m[1];
            marker.param = m[2].trim().split(' ');

            const isImplicitStart = implicitStartMarkers.includes(marker.kind);
            if (isImplicitStart) {
                marker.param.splice(0, 0, 'start');                
            }

            sequentialMarkers.push(marker);

            if (isImplicitStart) {
                const m2 = f.content.substring(marker.end).match(markerImplicitEndRE);
                if (m2) {
                    const endMarker = {};
                    endMarker.start = marker.end + m2.index,
                    endMarker.end = endMarker.start + m2[0].length;
                    endMarker.kind = marker.kind;
                    endMarker.param = [];
                    for(const s of marker.param) {
                        endMarker.param.push(s);
                    }
                    endMarker.param[0] = 'end';
                    sequentialMarkers.push(endMarker);
                }
                else {
                    console.log('implicit marker at start=' + marker.start + ' does not have a end marker');
                }
            }


            index += m.index + m[0].length;
        }

        // Pair up start and end markers
        const pairMarkers = function(markers) {
            let paired = [];

            for(let ii = 0; ii < markers.length; ii++) {
                if (markers[ii].param[0] == 'start') {
                    let jj = ii;
                    for(; jj < markers.length; jj++) {
                        if (markers[jj].kind == markers[ii].kind && 
                            markers[jj].param[0] == 'end' && 
                            markers[jj].param[1] == markers[ii].param[1]) {
                            // 
                            break;
                        }
                    }
                    if (jj < markers.length) {
                        markers[ii].endMarker = markers[jj];
                        markers[ii].inner = pairMarkers(markers.slice(ii + 1, jj));

                        markers[ii].startContent = markers[ii].end;
                        markers[ii].endContent = markers[jj].start;
                        markers[ii].content = f.content.substring(markers[ii].startContent, markers[ii].endContent);
                        markers[ii].contentIsEmpty = markers[ii].content.replace('\n', '').trim() == '';

                        const hash = crypto.createHash('sha1');
                        hash.update(markers[ii].content);
                        markers[ii].hash = hash.digest('hex');
                        markers[ii].f = f;

                        paired.push(markers[ii]);
                        ii = jj;
                    }
                    else {
                        console.log('start marker does not have end', markers[ii]);
                    }
                }
            }

            return paired;
        }
        const pairedMarkers = pairMarkers(sequentialMarkers);

        // Now sort the markers innermost to outermost, end to start
        let sortedMarkers = [];

        const sortMarkers = function(markers) {
            for(let ii = markers.length - 1; ii >= 0; ii--) {
                if (markers[ii].inner.length) {
                    sortMarkers(markers[ii].inner);
                }
                sortedMarkers.push(markers[ii]);
            }
        }
        sortMarkers(pairedMarkers);

        f.markers = sortedMarkers;
    }
    /*
        const b1 = findMarkers("<!-- shared-blurb start primary-led -->\nxxx\n<!-- shared-blurb end primary-led -->");
        console.log('b1', b1);

        const b2 = findMarkers("xxx <!-- shared-diagram-label top-diagram primary-usb title-label-paren -->1<!-- end --> yyy");
        console.log('b2', b2);

        const b3 = findMarkers("aaa<!-- shared-blurb start primary-led -->\nxxx<!-- shared-diagram top-diagram primary-usb -->1<!-- end --> yyy\n<!-- shared-blurb end primary-led -->");
        console.log('b3', JSON.stringify(b3, null, 4));

    */

    // Find all files recursively
    /*
    const processDir = async function(relativePath) {
        for(const de of fs.readdirSync(path.join(updater.docsPath, relativePath), {withFileTypes: true})) {
            if (de.name.startsWith('.')) {
                continue;
            }

            if (de.isDirectory()) {
                await processDir(relativePath + '/' + de.name);
            }
            else
            if (de.name.endsWith('.md')) {
                const f = {
                    name: de.name,
                    relativePath: relativePath + '/' + de.name,
                };
                f.fsPath = path.join(updater.docsPath, f.relativePath);

                f.content = fs.readFileSync(f.fsPath, 'utf8');
                
                findMarkers(f);

                updater.files.push(f);
            }
        }
    }
    await processDir('');
    */
    for(const fileName of Object.keys(files)) {
        if (!fileName.endsWith('.md')) {
            continue;
        }
        // Skip over expanded version of fireware.md (individual files for each L2 header)
        if (fileName.startsWith('reference/device-os/api/')) {
            continue;
        }

        var file = files[fileName];
        
        const f = {
            relativePath: fileName,
            fsPath: path.join(updater.docsPath, fileName), 
        };

        const lastSlashIndex = fileName.lastIndexOf('/');
        if (lastSlashIndex > 0) {
            f.name = fileName.substring(lastSlashIndex + 1);            
        }
        else {
            f.name = fileName;
        }

        f.content = file.contents.toString('utf8');
        
        findMarkers(f);

        updater.files.push(f);

    }


    // Find all of the shared blurbs by name to find the correct one
    updater.blurbs = {};
    for(const f of updater.files) {
        for(const m of f.markers) {
            if (m.kind == 'blurb') {
                if (!updater.blurbs[m.param[1]]) {
                    updater.blurbs[m.param[1]] = {
                        markers: [],
                    };
                }
                updater.blurbs[m.param[1]].markers.push(m);
            }
        }
    }
    // console.log('blurbs', updater.blurbs);

    // Check blurbs
    for(const blurbKey in updater.blurbs) {
        let p = {
            name: blurbKey,
            blurb: updater.blurbs[blurbKey],
            byHash: {},
            matchesConfig: [],
            possibleNewBlurb: [],
            isEmpty: [],
        };


        for(const m of updater.blurbs[blurbKey].markers) {
            if (m.contentIsEmpty) {
                p.isEmpty.push(m);
            }

            let matchesConfig = false;

            if (updater.blurbsConfig[blurbKey] && updater.blurbsConfig[blurbKey].hash == m.hash) {
                p.matchesConfig.push(m);
                matchesConfig = true;
            } 
            else if (!m.contentIsEmpty) {
                p.possibleNewBlurb.push(m);
            }

            if (typeof p.byHash[m.hash] == 'undefined') {
                let obj = {
                    matches: [],
                    isEmpty: m.contentIsEmpty,
                    matchesConfig,
                };

                p.byHash[m.hash] = obj;
            }
            p.byHash[m.hash].matches.push(m);
        }
        p.isSame = Object.keys(p.byHash).length <= 1;

        if (!p.isSame) {
            if (p.possibleNewBlurb.length == 0 && p.matchesConfig.length > 0 && p.isEmpty.length > 0) {
                // Added a new empty blurb
                p.possibleNewBlurb = [p.matchesConfig[0]];
                p.matchesConfig = [];
            }
            
            if (p.possibleNewBlurb.length == 1) {
                // One instance has been updated manually, propagate to others
                for(const m2 of p.isEmpty.concat(p.matchesConfig)) {
                    m2.newContent = p.possibleNewBlurb[0].content;
                }

                if (!updater.blurbsConfig[blurbKey]) {
                    updater.blurbsConfig[blurbKey] = {};
                }
                updater.blurbsConfig[blurbKey].hash = p.possibleNewBlurb[0].hash;
            }
            else {
                console.log('blurb changed but unsure which is correct', p);
            }
        }
        else
        if (Object.keys(p.byHash).length == 1) {            
            if (!updater.blurbsConfig[blurbKey]) {
                updater.blurbsConfig[blurbKey] = {};
            }
            updater.blurbsConfig[blurbKey].hash = Object.keys(p.byHash)[0];
        }
        
    }

    // <!-- shared-diagram-label top-diagram primary-usb title-label-paren --><!-- end -->
    for(const f of updater.files) {
        for(const m of f.markers) {
            if (m.kind == 'diagram-label') {
                const p = {
                    diagramId: m.param[1],
                    labelId: m.param[2],
                    format: m.param[3],
                    m,
                };
                
                const diagramObj = updater.diagrams.find(e => e.id == p.diagramId);
                if (diagramObj) {
                    const labelObj = diagramObj.labels.find(e => e.id == p.labelId);
                    if (labelObj) {
                        // console.log('diagram-label update', {p, m});
                        let newContent;
                        switch(p.format) {
                            case 'label':
                                newContent = labelObj.label;
                                break;
                            case 'title':
                                newContent = labelObj.title;
                                break;
                            case 'id':
                                newContent = labelObj.id;
                                break;
                            case 'title-label-paren':
                                newContent = labelObj.title + ' (' + labelObj.label + ')'; 
                                break;

                            default:
                                console.log('diagram-label unknown diagram label format', {p, m});
                                break;
                        }
                        if (newContent) {
                            m.newContent = newContent;
                        }
                    }
                    else {
                        console.log('diagram-label unknown diagram label', {p, m});
                    }
                }
                else {
                    console.log('diagram-label unknown diagram', {p, m});
                }
                
            }
        }
    }
    
    // Diagram table
    // <!-- shared-diagram-table start top-diagram -->
    // <!-- shared-diagram-table end top-diagram -->
    for(const f of updater.files) {
        for(const m of f.markers) {
            if (m.kind == 'diagram-table') {
                const p = {
                    diagramId: m.param[1],
                };

                if (m.param.length > 2) {
                    // Restrict to certain keys
                    p.restrict = [];
                    for(let ii = 2; ii < m.param.length; ii++) {
                        p.restrict.push(m.param[ii]);
                    }
                }

                const diagramObj = updater.diagrams.find(e => e.id == p.diagramId);
                if (diagramObj) {
                    if (m.param.length > 2) {
                        const labelSet = m.param[2];

                        const labelSetObj = diagramObj.labelSets.find(e => e.id == labelSet);
                        if (labelSetObj) {
                            p.restrict = labelSetObj.labels;
                        }
                        else {
                            console.log('diagram-table unknown diagram labelSet', {p, m, labelSet, diagramObj});
                        }
                    }
        
                    let newContent = '\n';

                    newContent += '| Label | Description |\n';
                    newContent += '| ---: | :--- |\n';

                    for(const labelObj of diagramObj.labels) {
                        if (p.restrict && !p.restrict.includes(labelObj.id)) {
                            continue;
                        }

                        newContent += '| ' + labelObj.label + ' | ' + labelObj.title + ' |\n';                        
                    }

                    m.newContent = newContent;
                }
                else {
                    console.log('diagram-table unknown diagram', {p, m});
                }
            }
        }
    }    
    
    // Perform updates
    for(const f of updater.files) {
        for(const m of f.markers) {
            if (typeof m.newContent != 'undefined' && m.content != m.newContent) {
                if (!f.newContent) {
                    f.newContent = f.content;
                }

                const p = {
                    startContent: m.startContent,
                    endContent: m.endContent,
                    old: m.content,
                    new: m.newContent,
                    beforeText: f.newContent.substring(0, m.startContent),
                    afterText: f.newContent.substring(m.endContent),
                };
                f.newContent = p.beforeText + p.new + p.afterText;

                // console.log('update marker', p);            
            }
        }
        if (f.newContent && f.content != f.newContent) {
            const oldFileContents = fs.readFileSync(f.fsPath, 'utf8');

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

            console.log('update file', f.relativePath);
            files[f.relativePath].content = Buffer.from(f.newContent, 'utf8');

            fs.writeFileSync(f.fsPath, frontMatter + f.newContent);
        }
    }
    // console.log('blurbs', updater.blurbs);


    // console.log('updater', updater);

    // Update blurbs
    const newBlurbsString = JSON.stringify(updater.blurbsConfig, null, 4);
    if (newBlurbsString != updater.origBlurbsString) {
        console.log('updating blurbs file ' + updater.blurbsConfigPath);
        fs.writeFileSync(updater.blurbsConfigPath, newBlurbsString);
    }    
    
}


module.exports = function(options) {

	return async function(files, metalsmith, done) {
        updater.files = [];

        updater.topPath = path.resolve(__dirname, '..');
    
        updater.docsPath = path.join(updater.topPath, 'src/content');

        updater.configPath = path.join(updater.topPath, 'config');
        updater.blurbsConfigPath = path.join(updater.configPath, 'blurbs.json');

        updater.diagramsPath = path.join(updater.configPath, 'diagrams');
  
        await run(files, metalsmith);
        done();
    }
}
