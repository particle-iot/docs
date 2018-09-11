// JSON pretty-print an object
// Usage:
// {{{json devices}}}
// ^^^ Note the triple mustache to avoid HTML escaping
module.exports = function json(object) {
	return JSON.stringify(object, true, 2);
};
