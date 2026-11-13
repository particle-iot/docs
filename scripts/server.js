// node scripts/server.js [--no-generate]
//
// Generates, builds, and serves with interactive updates. With --no-generate the generation steps are skipped and the
// previously committed generated files are used.
var server = require('./metalsmith.js').server;

server(undefined, { generate: !process.argv.includes('--no-generate') });
