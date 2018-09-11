// Unused
module.exports = function(str) {
	return str.replace(/[^a-z0-9]/gi, '-').toLowerCase();
};
