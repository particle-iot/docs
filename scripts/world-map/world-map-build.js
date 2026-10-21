// Generates the static world maps defined in maps.js.
//
// As a metalsmith plugin (see scripts/metalsmith.js), the SVG files are added to the
// build output; they are not stored in src:
//    .use(worldMapBuild({ sourceDir: '../src' }))
//
// From the command line, to preview the maps (default output is a scratch directory):
//    node scripts/world-map/world-map-build.js [outDir]

const path = require('path');

const carrierData = require('./carrier-data');
const { generateWorldMapSvg, worldMapGlobal } = require('./world-map-static');
const defineMaps = require('./maps');

// Returns array of { file, svg }
function generateAll(options = {}) {
    const data = carrierData.load(options.carriersPath);

    const results = [];
    const seen = new Set();

    for(const map of defineMaps(data, worldMapGlobal)) {
        if (seen.has(map.file)) {
            throw new Error('world-map: duplicate map file ' + map.file);
        }
        seen.add(map.file);

        results.push({ file: map.file, svg: generateWorldMapSvg(map) });
    }
    return results;
}

let firstLoad = true;

module.exports = function(options = {}) {
    return function(files, metalsmith, done) {
        // Only run this on first load, not when doing updates because the source data is not tracked
        if (!firstLoad) {
            return done();
        }
        firstLoad = false;

        try {
            for(const { file, svg } of generateAll(options)) {
                files[file] = { contents: Buffer.from(svg) };
            }
            done();
        }
        catch(e) {
            done(e);
        }
    };
};

module.exports.generateAll = generateAll;

if (require.main === module) {
    const fs = require('fs');

    const outDir = path.resolve(process.argv[2] || 'world-map-out');
    for(const { file, svg } of generateAll()) {
        const dest = path.join(outDir, file);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, svg);
        console.log('wrote ' + dest);
    }
}
