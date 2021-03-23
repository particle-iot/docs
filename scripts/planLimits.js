var assign = require('lodash').assign;
var fs = require('fs');
var path = require('path');

module.exports = function plugin(options) {
	return function(files, metalsmith, done) {
		var configPath = metalsmith.path(options.config);
		var planLimits = JSON.parse(fs.readFileSync(configPath));

		Object.keys(files).forEach(function (fileName) {
			assign(files[fileName], planLimits);
		});

		done();
	};
};

