
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

    const filesDir = path.join(__dirname, '..', '..', 'src', 'assets', 'files');
    
    const info = JSON.parse(fs.readFileSync(path.join(filesDir, 'deviceRestore.json'), 'utf8'));
    
    const deviceRestoreDir = path.join(filesDir, 'device-restore');

	let html = '';

    if (mode == 'radio') {
        html += '<form>';
    }

    html += '<table id="' + tableId + '"><thead></thead><tbody>';

    const platformFilter = function(platformObj) {
        if (platformObj.id == 32) { // P2
            if (mode == 'flash') {
                return true; // Web JTAG does not currently work with the P2
            }
        }
        return false; // Do not filter (include platform)
    }
    
    // console.log('versionNames', versionNames);
    html += '<tr><th>&nbsp;</th>';
    info.platforms.forEach(function(platformObj) {
        if (platformFilter(platformObj)) {
            return;
        }

        html += '<th>' + platformObj.title + '</th>';
    });
    html += '<tr>';

    info.versionNames.forEach(function(version) {
        let row = '';
        let hasItems = false;

        row += '<tr><td>' + version + '</td>';
        info.platforms.forEach(function(platformObj) {
            if (platformFilter(platformObj)) {
                return;
            }
    
            row += '<td>';

            if (mode == 'zip') {
                if (info.versionsZip[version] && info.versionsZip[version].includes(platformObj.name)) {
                    const script = "analytics.track('Device Restore Zip Download', 'Download', {category: '" + version + "/" + platformObj.name + "'}); return true;";
    
                    row += '<a href="/assets/files/device-restore/' + version + '/' + platformObj.name + '.zip" download onclick="' + script + '">Download</a>';
                    hasItems = true;
                }
                else {
                    row += '&nbsp;';
                }
            }
            else {
                if (info.versions[version].includes(platformObj.name)) {
                    if (mode == 'download') {
                        const script = "analytics.track('Device Restore Hex Download', 'Download', {category: '" + version + "/" + platformObj.name + "'}); return true;";
    
                        row += '<a href="/assets/files/device-restore/' + version + '/' + platformObj.name + '.hex" download onclick="' + script + '">Download</a>';
                        hasItems = true;
                    }
                    else if (mode == 'flash') {
                        row += '<a onclick="startFlash(\'' + platformObj.name + '\', \'' + version + '\')">Flash!</a>';
                        hasItems = true;
                    }
                    else if (mode == 'radio') {
                        row += '<input type="radio" name="imageFile" value="' + version + '/' + platformObj.name + '.hex" />';
                        hasItems = true;
                    }
                    else {
                        row += '&nbsp;';
                    }
                }
                else {
                    row += '&nbsp;';
                }    
            }
            row += '</td>';
        });
        row += '</tr>\n';

        if (hasItems) {
            html += row;
        }
    });


    html += '</tbody></table>';

    if (mode == 'radio') {
        html += '</form>';
    }
	
	return new Handlebars.SafeString(html);
};
