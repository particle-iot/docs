const fs = require('fs');
const path = require('path');

const argv = require('yargs').argv;

const csvParse = require('csv-parse/lib/sync');

let allRecords = [];

if (argv._.length == 0) {
	console.log("csv file is required");
	process.exit(1);
}

for (const name of argv._) {
	// console.log('processing ' + name);

	const fileContents = fs.readFileSync(name, 'utf8');

	const records = csvParse(fileContents, {
		columns: true,
		skip_empty_lines: true
	});

	allRecords = allRecords.concat(records);
}

console.log('allRecords', allRecords);

// If we only cared about the device IDs:

for (const rec of allRecords) {
	const deviceId = rec.deviceId;
	console.log(deviceId);
}