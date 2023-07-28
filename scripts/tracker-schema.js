'use strict';

const fs = require('fs');
const path = require('path');

const indentLevel = 2;

function updateFileIfChanged(files, file, newContents) {
	let oldContents = '';
	if (fs.existsSync(file)) {
		oldContents = fs.readFileSync(file);
	}
	if (oldContents != newContents) {
		fs.writeFileSync(file, newContents);

		// Update the 
		let inputFile = file;
		const index = inputFile.indexOf('assets/files');
		if (index > 0) {
			inputFile = inputFile.substr(index);
		}
		files[inputFile] = {
            contents: newContents,
            mode: '0644',
            stats: fs.statSync(file)
        };
	}
}

function updateConfigurationSchemas(files, dir, options) {
	// console.log('updating configuration schemas ' + dir);

	const originalSchemaObj = JSON.parse(fs.readFileSync(path.join(dir, options.officialSchema), 'utf8'));

	// Reformat to 2 spaces per indent to make it easier to read in the code box
	const newDefaultSchema = JSON.stringify(originalSchemaObj, null, indentLevel);
	updateFileIfChanged(files, path.join(dir, options.defaultSchema), newDefaultSchema);

	options.fragments.forEach(function(frag) {
		const fragmentPath = path.join(dir, frag + '-fragment.json');
		const fragmentObj = JSON.parse(fs.readFileSync(fragmentPath, 'utf8'));
		const dstPath = path.join(dir, frag + '.json');

		// Clean up fragment source if necessary
		updateFileIfChanged(files, fragmentPath, JSON.stringify(fragmentObj, null, indentLevel));

		// Duplicate original
		let newSchema = JSON.parse(JSON.stringify(originalSchemaObj));

		// Copy in new 
		Object.keys(fragmentObj).forEach(function(key) {
			newSchema.properties[key] = fragmentObj[key];
		});

		const newSchemaString = JSON.stringify(newSchema, null, indentLevel);
		updateFileIfChanged(files, dstPath, newSchemaString);
	});
}

function updateFileIndex(files, dir, options) {
	const fileIndexPath = path.join(dir, 'file-index.json');

	let indexObj = {
	};
	
	{
		// Schemas
		indexObj.schemas = {};
		const kinds = [];
		for(const file of fs.readdirSync(dir)) {
			const m = file.match(/([a-z]+)-config-schema-([0-9]+)/);
			if (m) {
				const kind = m[1];
				const ver = parseInt(m[2]);
				if (!indexObj.schemas[kind]) {
					indexObj.schemas[kind] = [];
					kinds.push(kind);
				}
				indexObj.schemas[kind].push({
					ver,
					file,
				});
			}
		}

		for(const kind of kinds) {
			indexObj.schemas[kind].sort(function(a, b) {
				// Descending by version
				return b.ver - a.ver;
			});
		}
	}

	{
		// Edge Binary Versions
		indexObj.firmwareBinaries = {};
		const kinds = [];
		for(const file of fs.readdirSync(dir)) {
			const m = file.match(/([a-z]+)-edge-([0-9]+)\@([-.0-9A-Za-z]+)\.bin/);
			if (m) {
				const kind = m[1];
				const ver = parseInt(m[2]);
				const target = m[3];

				if (!indexObj.firmwareBinaries[kind]) {
					indexObj.firmwareBinaries[kind] = [];
					kinds.push(kind);
				}
				indexObj.firmwareBinaries[kind].push({
					ver,
					file,
					target,
				});
			}
		}

		for(const kind of kinds) {
			indexObj.firmwareBinaries[kind].sort(function(a, b) {
				// Descending by version
				return b.ver - a.ver;
			});
		}
	}

	{
		// Source Versions
		indexObj.firmwareSource = {};
		const kinds = [];
		for(const file of fs.readdirSync(dir)) {
			let m = file.match(/monitor-edge-([0-9]+)\.zip/);
			if (m) {
				const kind = 'monitor';
				const ver = parseInt(m[1]);
				if (!indexObj.firmwareSource[kind]) {
					indexObj.firmwareSource[kind] = [];
					kinds.push(kind);
				}
				indexObj.firmwareSource[kind].push({
					ver,
					file,
				});
			}
			m = file.match(/v([0-9]+)\.zip/);
			if (m) {
				const kind = 'tracker';
				const ver = parseInt(m[1]);
				if (!indexObj.firmwareSource[kind]) {
					indexObj.firmwareSource[kind] = [];
					kinds.push(kind);
				}
				indexObj.firmwareSource[kind].push({
					ver,
					file,
				});
			}
		}

		for(const kind of kinds) {
			indexObj.firmwareSource[kind].sort(function(a, b) {
				// Descending by version
				return b.ver - a.ver;
			});
		}
	}
	const newFileIndexStr = JSON.stringify(indexObj, null, indentLevel);
	updateFileIfChanged(files, fileIndexPath, newFileIndexStr);

}


module.exports = function(options) {

	return function(files, metalsmith, done) {
        const dir = metalsmith.path(options.dir);
		updateConfigurationSchemas(files, dir, options);
		updateFileIndex(files, dir, options);
		done();
	};
};
