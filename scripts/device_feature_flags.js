// Feature flag check for each device
// Usage in template:
// {{#if has-wifi}}
// ...
// {{/if}}
var assign = require('lodash').assign;
var fs = require('fs');
var path = require('path');

module.exports = function plugin(options) {
	return function(files, metalsmith, done) {
		var configPath = metalsmith.path(options.config);
		var deviceFeatures = JSON.parse(fs.readFileSync(configPath));

		var deviceFeatureFlags = {};
		Object.keys(deviceFeatures).forEach(function (device) {
			var features = deviceFeatures[device];
			deviceFeatureFlags[device] = flagsForFeatures(features)
		});

		// For each feature like wifi, define a helper flag has-wifi
		function flagsForFeatures(features) {
			var flags = {};
			features.forEach(function (feature) {
				var flagName = 'has-' + feature;
				flags[flagName] = true;
			});
			return flags;
		}

		Object.keys(files).forEach(function (fileName) {
			var file = files[fileName];
			if (file.setdevice) {
				file.device = file.setdevice;
			}
			
			if (file.device) {
				var featureFlags = deviceFeatureFlags[file.device];
				assign(file, featureFlags);
			}
		});

		done();
	};
};

