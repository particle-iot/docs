
const fs = require('fs');
const path = require('path');

const Handlebars = require('handlebars');
const { version } = require('yargs');


module.exports = function(context) {
	var html = '';

    // __dirname is the helpers directory: docs/templates/helpers
    const topPath = path.join(__dirname, '..', '..');
    const filesPath = path.join(topPath, 'src', 'assets', 'files');

    const deviceRestore = JSON.parse(fs.readFileSync(path.join(filesPath, 'deviceRestore.json'), 'utf8'));

    // deviceRestore.versionNames is an array of all version names, newest first
    // These are all possible keys into the .versions object
    
    // deviceRestore.versions is an object
    //   key: version name ("3.0.0") value is array of platforms included in this version
    // deviceRestore.platforms is an array of object with platform information (gen, cellular, etc.)

    // console.log('deviceRestore', deviceRestore);

    const versionInfo = JSON.parse(fs.readFileSync(path.join(filesPath, 'versionInfo.json'), 'utf8'));

    // versionInfo.versions: array of all versions, each array element contains an object:
    // {
    //    "boot": 1005,
    //    "sys": 3005,
    //    "semVer": "3.0.0"
    // },
  
    const parseSemVer = function(ver) {
        let result = {};

        let releaseParts;
        let nonReleaseParts;

        const dashIndex = ver.indexOf('-');
        if (dashIndex > 0) {
            releaseParts = ver.substring(0, dashIndex).split('.');
            nonReleaseParts = ver.substring(dashIndex + 1).split('.');
        }
        else {
            releaseParts = ver.split('.');
        }
        
        if (releaseParts.length >= 1) {
            result.major = parseInt(releaseParts[0]);
        }
        if (releaseParts.length >= 2) {
            result.minor = parseInt(releaseParts[1]);
        }
        if (releaseParts.length >= 3) {
            result.patch = parseInt(releaseParts[2]);
        }
        result.releaseParts = releaseParts;
        result.isFinalRelease = !nonReleaseParts;

        if (nonReleaseParts && nonReleaseParts.length >= 2) {
            switch(nonReleaseParts[0]) {
                case 'alpha':
                case 'beta':
                case 'rc':
                    result.nonFinalRelease = nonReleaseParts[0];
                    result[nonReleaseParts[0]] = true;
                    break;

                default:
                    result.specialRelease = nonReleaseParts[0];
                    break;
            }    
            result.nonFinalVersion = parseInt(nonReleaseParts[1]);
        }
        return result;
    }


    const mode = context.hash.mode;

    if (mode == 'latest') {
        // Return the latest in a release line
        // "line" parameter in context is usually something like "2" (for LTS 2.x) or "2.3" (for 2.3.x).
        // This also returns alpha, beta, and rc versions; see latestRelease for final releases only.
        const line = context.hash.line;

        for(const ver of deviceRestore.versionNames) {
            const verParsed = parseSemVer(ver);
            if (ver.startsWith(line)) {
                html += ver;
                break;
            }
        }
    }
    if (mode == 'latestRelease') {
        const line = context.hash.line;

        for(const ver of deviceRestore.versionNames) {
            const verParsed = parseSemVer(ver);
            if (ver.startsWith(line) && verParsed.isFinalRelease) {
                html += ver;
                break;
            }
        }
        if (!html && context.hash.alt) {
            html += context.hash.alt;
        }
    }
    if (mode == 'testWith') {
        const line = context.hash.line;
        const allowAlpha = context.hash.allowAlpha && context.hash.allowAlpha !== 'false' && context.hash.allowAlpha !== '0';

        for(const ver of deviceRestore.versionNames) {
            const verParsed = parseSemVer(ver);
            if (ver.startsWith(line)) {
                if (verParsed.isFinalRelease) {
                    // Already final release, no betas
                    html += ver;
                    break;
                }
                if (verParsed.beta || verParsed.rc) {
                    // Test with beta and rc releases (don't list alpha here)
                    html += ver;
                    break;
                }    
                if (verParsed.alpha && allowAlpha) {
                    html += ver;
                    break;
                }
            }

        }
        if (!html && context.hash.alt) {
            html += context.hash.alt;
        }
    }
    

	return new Handlebars.SafeString(html);
};
