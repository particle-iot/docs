// node scripts/build.js [--generate]
//
// Without --generate this is the CI-style build, which uses the previously committed generated files.
// With --generate, the steps that generate files committed to GitHub are run first.
var build = require('./metalsmith.js').build;

build(undefined, { generate: process.argv.includes('--generate') });
