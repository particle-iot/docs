var Handlebars = require('handlebars');

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = function (str) {
	var sanitized = str.replace(/[^a-z0-9]/gi, '-').toLowerCase();
	var anchorId = sanitized + '-' + makeid();
	var title = Handlebars.Utils.escapeExpression(str);

	return new Handlebars.SafeString("<h3 id='#" + sanitized + "' data-href='" + anchorId + "'>" + title + "<a href='#" + sanitized + "' class='header-permalinks' data-menu-href='" + anchorId + "'><i class='ion-link'></i></a></h3>");
};
