
var Handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

// THIS IS NOT CURRENTLY USED
// Not sure if it works
// There are a lot of log statements in it still!

module.exports = function(context) {	
	const mode = context.hash.mode || 'download';
	
    // __dirname is templates/helpers
    // ../../src/assets/files/tracker
    let infoArray = [];

    const trackerDir = path.join(__dirname, '..', '..', 'src', 'assets', 'files', 'tracker');


    fs.readdirSync(trackerDir, {withFileTypes:true}).forEach(function(dirent) {
        if (!dirent.isDirectory()) {
            return;
        }
        // v11.zip, v12.zip, ...
        // tracker-edge-11@2.0.0-rc.4.bin, tracker-edge-12@3.0.0-rc.2.bin
        console.log('checking ' + dirent.name);

        const getInfoObj = function(version) {
            for(let ii = 0; ii < infoArray.length; ii++) {
                if (infoArray[ii].version == version) {
                    return infoArray[ii];
                }
            }
            let obj = {version};
            infoArray.push(obj);
            return obj;
        };

        let baseName = dirent.name;
        const lastDotIndex = dirent.name.lastIndexOf('.');
        if (lastDotIndex > 0) {
            baseName = baseName.substr(0, lastDotIndex);            
        }
        console.log('baseName ' + baseName);

        if (dirent.name.startsWith('v') && dirent.name.endsWith('.zip')) {
            const verNum = parseInt(baseName.substr(1));
            console.log('source v' + verNum);
            
            getInfoObj(verNum).source = dirent.name;
        }
        else
        if (dirent.name.startsWith('tracker-edge-') && dirent.name.endsWith('.bin')) {
            const atIndex = baseName.indexOf('@');
            if (atIndex > 0) {
                const target = baseName.substr(atIndex + 1);

                const lastDashIndex = baseName.lastIndexOf('-', atIndex);
                if (lastDashIndex > 0) {
                    const verNum = parseInt(baseName.substring(lastDashIndex + 1, atIndex));

                    console.log('bin v' + verNum + ' target=' + target);

                    getInfoObj(verNum).bin = dirent.name;
                    getInfoObj(verNum).target = target;                    
                }
            }
        }  
        else {
            return;
        }

    });


    infoArray.sort(function(a,b) {
        // Reverse numeric sort (higher first)
        return b.version - a.version;
    });

	let html = '';

    infoArray.forEach(function(obj) {
        // <option value="v12">Tracker Edge v12 (Device OS 3.0.0-rc.2 or later)</option>
        if (!obj.source) {
            console.log('missing source for TrackerEdge v' + version);
        }
        if (!obj.target) {
            console.log('missing binary for TrackerEdge v' + version);
        }

        html += '<option value="v' + obj.version + '">Tracker Edge v' + obj.version + ' (Device OS ' + obj.target + ' or later)</option>';
    });
	
	return new Handlebars.SafeString(html);
};
