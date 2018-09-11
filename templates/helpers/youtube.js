// Insert a link to a Youtube video
// Usage:
// {{youtube "https://www.youtube.com/embed/..."}}
var Handlebars = require('handlebars');
module.exports = function(link) {
	var html = 
		'<div class="video-container"><div class="video-frame"><iframe src="'
		+ link
		+ '" width="560" height="315" frameborder="0" allowfullscreen></iframe></div></div>';
	return new Handlebars.SafeString(html);
}
