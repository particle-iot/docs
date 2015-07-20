module.exports = function(str, replaceWith) {
	if (typeof replaceWith === 'undefined') {
		replaceWith = '-';
	}
	return str.replace(/[^a-z0-9]/gi, replaceWith);
};
