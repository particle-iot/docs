'use strict';

var _ = require('lodash');
var fs = require('fs');

module.exports = function(options) {
	return function(files, metalsmith, done) {
		var src = metalsmith.path(options.srcFile);
		var dest = files[options.destFile];
		var fragment = options.fragment;
		var preprocess = options.preprocess;

		if (!fs.existsSync(src) || !dest || !fragment) {
			return done();
		}

		var generatedContent = fs.readFileSync(src, 'utf8');
		if (typeof preprocess === 'function') {
			generatedContent = preprocess(generatedContent);
		}

		var existingContent = dest.contents.toString('utf8');

		dest.contents = new Buffer(existingContent.replace(fragment, generatedContent));

		done();
	};
};
