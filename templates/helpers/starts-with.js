// Check if long string starts with short string
// Usage:
// {{starts-with device 'P'}}
module.exports = function (long, short, context) {
	if (!long || long.indexOf(short) === 0) {
		return context.fn(this);
	} else {
		return context.inverse(this);
	}
};
