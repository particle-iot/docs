// JSON pretty-print the current state of Metalsmith
// Useful to debug while developing
// Usage to print current state:
// {{debug}}
var Handlebars = require('handlebars');
module.exports = function json(context) {
	var metadata = Object.assign({}, context.data.root);
	// sanitize the metadata first to remove circular links
	if (metadata.collections) {
		var collections = Object.keys(metadata.collections);
		delete metadata.collections;
		collections.forEach(function (collection) {
			delete metadata[collection];
		});
	}
	delete metadata.contents;
	delete metadata.forkList;
	delete metadata.next;
	delete metadata.previous;
	delete metadata.redirectList;
	try {
		var json = JSON.stringify(metadata, true, 2);
		var html = '<pre>' + Handlebars.Utils.escapeExpression(json) + '</pre>';
		return new Handlebars.SafeString(html);
	} catch (e) {
		return 'Cannot print debug state. It contains circular references.';
	}
};
