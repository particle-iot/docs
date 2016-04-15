var Handlebars = require('handlebars');
var crypto = require('crypto');


function makeid(str)
{
	return crypto.createHash('md5').update(str).digest('base64').substr(0, 4).replace(/[+/=]/g, '-');
}

module.exports = function (str) {
	var sanitized = str.replace(/[^a-z0-9]/gi, '-').toLowerCase();
	var anchorId = sanitized + '-' + makeid(sanitized);
	var title = Handlebars.Utils.escapeExpression(str);

	return new Handlebars.SafeString("<h3 id='" + sanitized + "' data-href='" + anchorId + "'>" + title + "<a href='#" + sanitized + "' class='header-permalinks' data-menu-href='" + anchorId + "'><i class='ion-link'></i></a></h3>");
};
