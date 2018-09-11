// Handles generating HTML redirect pages for old links
var redirect = require('metalsmith-redirect');
var fs = require('fs');
var path = require('path');

module.exports = function plugin(options) {
	return function(files, metalsmith, done) {
		var configPath = metalsmith.path(options.config);
		var redirectList = JSON.parse(fs.readFileSync(configPath));

		// Save in the global metadata
		var metadata = metalsmith.metadata();
		metadata.redirectList = redirectList;

		// delegate to the plugin
		var redirectPlugin = redirect(redirectList);

		redirectPlugin(files, metalsmith, done);
	};
};
