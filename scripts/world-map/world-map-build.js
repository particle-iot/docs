// Generates the static world maps defined in maps.js.
//
// The generated files are written to src (by default src/assets/images/maps) so they can be 
// committed to GitHub, and are also added to the metalsmith files so they appear in the build.
// (The source files have already been read by the time this runs, like apidoc.js.)
//    .use(worldMapBuild({ sourceDir: '../src', formats: ['svg', 'png'] }))
//
// options:
//  .sourceDir directory the generated files are written to, relative to the scripts directory
//      (default '../src'). Each map's .file is relative to this directory.
//  .formats array of 'svg' and/or 'png' (default ['svg']). A map definition can override this 
//      with its own .formats.
//
// From the command line, to preview the maps (default output is a scratch directory):
//    node scripts/world-map/world-map-build.js [outDir] [svg|png|svg,png]

const path = require('path');

const carrierData = require('./carrier-data');
const { writeWorldMap, worldMapGlobal } = require('./world-map-static');
const defineMaps = require('./maps');

// Writes all of the maps to destDir. Returns an object whose keys are the file paths 
// relative to destDir ('assets/images/maps/ntn.svg') and values are Buffers.
async function generateAll(options = {}) {
    const destDir = options.destDir;
    const data = carrierData.load(options.carriersPath);

    const results = {};
    const seen = new Set();

    for(const map of defineMaps(data, worldMapGlobal)) {
        if (seen.has(map.file)) {
            throw new Error('world-map: duplicate map file ' + map.file);
        }
        seen.add(map.file);

        const formats = map.formats || options.formats || ['svg'];

        const written = await writeWorldMap(map, path.join(destDir, map.file), formats);
        const base = map.file.replace(/\.(svg|png)$/, '');
        for(const ext in written) {
            results[base + '.' + ext] = written[ext];
        }
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

        const destDir = path.resolve(__dirname, '..', options.sourceDir || '../src');

        generateAll({ destDir, formats: options.formats, carriersPath: options.carriersPath })
            .then(function(results) {
                for(const file in results) {
                    files[file] = { contents: results[file] };
                }
                done();
            })
            .catch(done);
    };
};

module.exports.generateAll = generateAll;

if (require.main === module) {
    const outDir = path.resolve(process.argv[2] || 'world-map-out');
    const formats = (process.argv[3] || 'svg').split(',');

    generateAll({ destDir: outDir, formats }).then(function(results) {
        for(const file in results) {
            console.log('wrote ' + path.join(outDir, file));
        }
    });
}
