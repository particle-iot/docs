// Block helper that allows iteration through an object
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
