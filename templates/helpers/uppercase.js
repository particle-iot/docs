// Convert entire string to upper case
// Usage:
// {{uppercase title}}
module.exports = function(string) {
	if (!string) return string;
	return string.toUpperCase();
};
