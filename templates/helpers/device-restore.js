
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

    // console.log('versionNames', versionNames);
    html += '<tr><th>&nbsp;</th>';
    info.platforms.forEach(function(platformObj) {
        html += '<th>' + platformObj.title + '</th>';
    });
    html += '<tr>';

    info.versionNames.forEach(function(version) {
        html += '<tr><td>' + version + '</td>';
        info.platforms.forEach(function(platformObj) {
            html += '<td>';
            if (info.versions[version].includes(platformObj.name)) {
                if (mode == 'download') {
                    const script = "ga('send', 'event', 'Download', 'Device Restore Hex Download', '" + version + "/" + platformObj.name + "'); return true;";

                    html += '<a href="/assets/files/device-restore/' + version + '/' + platformObj.name + '.hex" download onclick="' + script + '">Download</a>';
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
