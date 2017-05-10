// Preprocess the Markdown file generated for the Javascript library
// to remove things like the table of contents

module.exports = function (contents) {
	// Remove table of contents
	var start = contents.indexOf('### constructor');
	if (start !== -1) {
		contents = contents.substr(start);
	}

	// fix a bad link
	contents = contents.replace(
		'../src/Defaults.js',
		'https://github.com/spark/particle-api-js/blob/master/src/Defaults.js'
	);
	return contents;
};
