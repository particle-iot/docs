'use strict';

const fs = require('fs');
const path = require('path');

const indentLevel = 2;

function updateFileIfChanged(file, newContents) {
	let oldContents = '';
	if (fs.existsSync(file)) {
		oldContents = fs.readFileSync(file);
	}
	if (oldContents != newContents) {
		fs.writeFileSync(file, newContents);
	}
}

function updateConfigurationSchemas(dir, options) {
	// console.log('updating configuration schemas ' + dir);

	const originalSchemaObj = JSON.parse(fs.readFileSync(path.join(dir, options.officialSchema), 'utf8'));

	// Reformat to 2 spaces per indent to make it easier to read in the code box
	const newDefaultSchema = JSON.stringify(originalSchemaObj, null, indentLevel);
	updateFileIfChanged(path.join(dir, options.defaultSchema), newDefaultSchema);

	options.fragments.forEach(function(frag) {
		const fragmentPath = path.join(dir, frag + '-fragment.json');
		const fragmentObj = JSON.parse(fs.readFileSync(fragmentPath, 'utf8'));
		const dstPath = path.join(dir, frag + '.json');

		// Clean up fragment source if necessary
		updateFileIfChanged(fragmentPath, JSON.stringify(fragmentObj, null, indentLevel));

		// Duplicate original
		let newSchema = JSON.parse(JSON.stringify(originalSchemaObj));

		// Copy in new 
		Object.keys(fragmentObj).forEach(function(key) {
			newSchema.properties[key] = fragmentObj[key];
		});

		const newSchemaString = JSON.stringify(newSchema, null, indentLevel);
		updateFileIfChanged(dstPath, newSchemaString);
	});
}


module.exports = function(options) {

	return function(files, metalsmith, done) {
        const dir = metalsmith.path(options.dir);
		updateConfigurationSchemas(dir, options);
		done();
	};
};
