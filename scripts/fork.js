'use strict';

var cloneDeep = require('lodash').cloneDeep;
var path = require('path');
var fs = require('fs');

module.exports = function(options) {
	var key = options.key;
	var redirectTemplate = fs.readFileSync(path.resolve(options.redirectTemplate));

	return function(files, metalsmith, done) {
		Object.keys(files).forEach(function (fileName) {
			var file = files[fileName];
			var forkValues = file[key];
			if (!forkValues) return;

			var forkLocations = {};

			forkValues.forEach(function (value) {
				var extension = path.extname(fileName);
				var fileNameWithoutExt = path.basename(fileName, extension);
				var newName = path.join(path.dirname(fileName), fileNameWithoutExt, value + extension);

				var newFile = cloneDeep(file, function(value) {
					if (value instanceof Buffer) {
						return new Buffer(value);
					}
				});

				newFile[value] = true;
				files[newName] = newFile;
				forkLocations[value] = '/' + newName.replace(extension, '');
			});

			file.forkLocations = forkLocations;

			file.keyString = JSON.stringify(forkLocations);
			file.contents = redirectTemplate;
			delete file.template;

			// rename from .XXX (original extension) to .YYY (extension of redirectTemplate)
			files[path.join(path.dirname(fileName), path.basename(fileName, path.extname(fileName)) + path.extname(options.redirectTemplate))] = file;
			delete files[fileName];
		});

		done();
	};
};
