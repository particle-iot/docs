// Generates HTML headers with unique anchor IDs from a title
// Usage:
// {{permalink-header title}}
var Handlebars = require('handlebars');

module.exports = function (str) {
	var sanitized = str.replace(/[^a-z0-9]/gi, '-').toLowerCase();
	var title = Handlebars.Utils.escapeExpression(str);

	return new Handlebars.SafeString("<h3 id='" + sanitized + "'>" + title + "<a href='#" + sanitized + "' class='header-permalinks'><i class='ion-link'></i></a></h3>");
};
