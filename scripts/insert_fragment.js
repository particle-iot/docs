'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

module.exports = function(options) {
	return function(files, metalsmith, done) {
		var src = metalsmith.path(options.srcFile);
		var dest = files[options.destFile];
		var fragment = options.fragment;
		var preprocess = options.preprocess;

		const savePath = path.join(__dirname, '..', 'generated', path.basename(options.destFile));


		if (!dest || !fragment) {
			return done();
		}
		
		var generatedContent;

		if (fs.existsSync(src)) {
			generatedContent = fs.readFileSync(src, 'utf8');
			fs.writeFileSync(savePath, generatedContent);
		}
		else {
			if (!fs.existsSync(savePath)) {
				return done();
			}
			generatedContent = fs.readFileSync(savePath, 'utf8');
		}
		if (typeof preprocess === 'function') {
			generatedContent = preprocess(generatedContent);
		}

		var existingContent = dest.contents.toString('utf8');

		dest.contents = new Buffer(existingContent.replace(fragment, generatedContent));

		done();
	};
};
