const fs = require('fs');
const path = require('path');

const argv = require('yargs').argv

let deviceIds = [];

if (argv._.length == 0) {
	console.log("file of device IDs is required");
	process.exit(1);
}

for(const name of argv._) {
	// console.log('processing ' + name);
	
	const fileContents = fs.readFileSync(name, 'utf8');
	
	const re = /([A-Fa-f0-9]{24})/;

    for(const line of fileContents.split("\n")) {
        const m = line.match(re);
        if (m) {
			deviceIds.push(m[1]);
        }
	}
}

console.log('deviceIds', deviceIds);
