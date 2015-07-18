module.exports = function (long, short, options) {
	if (!long || long.indexOf(short) === 0) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
};
