
var Handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

module.exports = function(context) {	
	const mode = context.hash.mode || 'download';
    const tableId = context.hash.tableId || 'deviceRestoreTable'; 
	
    
    // __dirname is templates/helpers
    // ../../src/assets/files/device-restore/<version>/<platform>.hex
    // Horizontal axis: platform
    // Vertical axis: version
    let versions = {};
    let versionNames = [];

    const deviceRestoreDir = path.join(__dirname, '..', '..', 'src', 'assets', 'files', 'device-restore');


    fs.readdirSync(deviceRestoreDir, {withFileTypes:true}).forEach(function(dirent) {
        if (!dirent.isDirectory()) {
            return;
        }
        versions[dirent.name] = [];
        fs.readdirSync(path.join(deviceRestoreDir, dirent.name)).forEach(function(name) {
            if (!name.endsWith('.hex')) {
                return;
            }
            const platform = name.substr(0, name.length - 4);
            versions[dirent.name].push(platform);
        });

        if (versions[dirent.name].length > 0) {
            // console.log('versions ' + dirent.name, versions[dirent.name])
            versionNames.push(dirent.name);
        }
    });


    versionNames.sort(function(a,b) {
        aParts = a.split(/[-\\.]/);
        bParts = b.split(/[-\\.]/);
        
        for(let part = 0; part < 3; part++) {
            // Reverse numeric sort (higher first)
            let cmp = parseInt(bParts[part]) - parseInt(aParts[part]);
            if (cmp != 0) {
                return cmp;
            }
        }
        if (!aParts[3]) {
            // a is not an rc, but b is, so final goes first
            return 1;
        }
        if (!bParts[3]) {
            // a is not an rc, but b is, so final goes first
            return -1;
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

    const platforms = [
        {name:'argon',title:'Argon'},
        {name:'boron',title:'Boron'},
        {name:'bsom',title:'B4xx'},
        {name:'b5som',title:'B5xx'},
        {name:'tracker',title:'Tracker'},
        {name:'electron',title:'Electron'},
        {name:'photon',title:'Photon'},
        {name:'p1',title:'P1'},
        {name:'xenon',title:'Xenon'}
    ];

	let html = '';

    if (mode == 'radio') {
        html += '<form>';
    }

    html += '<table id="' + tableId + '"><thead></thead><tbody>';

    // console.log('versionNames', versionNames);
    html += '<tr><th>&nbsp;</th>';
    platforms.forEach(function(platformObj) {
        html += '<th>' + platformObj.title + '</th>';
    });
    html += '<tr>';

    versionNames.forEach(function(version) {
        html += '<tr><td>' + version + '</td>';
        platforms.forEach(function(platformObj) {
            html += '<td>';
            if (versions[version].includes(platformObj.name)) {
                if (mode == 'download') {
                    html += '<a href="/assets/files/device-restore/' + version + '/' + platformObj.name + '.hex" download>Download</a>';
                }
                else if (mode == 'flash') {
                    html += '<a onclick="startFlash(\'' + platformObj.name + '\', \'' + version + '\')">Flash!</a>';
                }
                else if (mode == 'radio') {
                    html += '<input type="radio" name="imageFile" value="' + version + '/' + platformObj.name + '.hex" />';
                }
                else {
                    html += '&nbsp;';
                }
            }
            else {
                html += '&nbsp;';
            }
            html += '</td>';
        });
        html += '</tr>\n';
    });


    html += '</tbody></table>';

    if (mode == 'radio') {
        html += '</form>';
    }
	
	return new Handlebars.SafeString(html);
};
