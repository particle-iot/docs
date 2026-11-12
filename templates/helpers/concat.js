// Concatenate strings, for building a value from parts inside a subexpression
// Usage:
// {{imageOverlay src=(concat "/assets/images/dir/" some-front-matter-value "/image.png")}}
module.exports = function () {
	// The last argument is the Handlebars options object
	return Array.prototype.slice.call(arguments, 0, -1).join('');
};
