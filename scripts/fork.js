'use strict';

var cloneDeep = require('lodash').cloneDeep;
var path = require('path');

module.exports = function(options) {
	var key = options.key;
	return function(files, metalsmith, done) {
		Object.keys(files).forEach(function (fileName) {
			var file = files[fileName];
			var forkValues = file[key];
			if (!forkValues) return;

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

				// TODO replace base path with redirector
			});
		});

		done();
	};
};
