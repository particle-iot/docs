// Insert a link to a Vine video
// Usage:
// {{vine "https://vine.co/v/.../embed/simple"}}
var Handlebars = require('handlebars');
module.exports = function(link) {
	var html = 
		'<div class="iframe-wrapper"><iframe src="'
		+ link
		+ '" width="320" height="320" frameborder="0"></iframe></div>';
	return new Handlebars.SafeString(html);
}
