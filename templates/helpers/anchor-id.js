// Unused
// TODO: remove
var crypto = require('crypto');

function makeid(str)
{
	return crypto.createHash('md5').update(str).digest('base64').substr(0, 4).replace(/[+/=]/g, '-');
}

module.exports = function (str) {
	var sanitized = str.replace(/[^a-z0-9]/gi, '-').toLowerCase();
	return sanitized + '-' + makeid(sanitized);
};
