// Block helper that allows iteration through an object
// Sets key and value for each property of the object
// Similar to #each which iterates over arrays
// Usage:
// {{#items forkLocations}}
// Render fork for device {{key}}
// {{/item}}
module.exports = function items(object, options) {
	var ret = "";
	Object.keys(object).forEach(function (key) {
		ret += options.fn({
			key: key,
			value: object[key]
		});
	});

	return ret;
};
