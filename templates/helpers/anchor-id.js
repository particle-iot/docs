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
	return sanitized + '-' + makeid();
};
