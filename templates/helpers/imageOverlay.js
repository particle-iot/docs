var crypto = require('crypto');

var Handlebars = require('handlebars');

module.exports = function(context) {
	var html = '';

    var src = context.hash.src;
    var large = context.hash.large || src;
    var alt = context.hash.alt;
    var cssClass = context.hash.class;
	
	var html = '';

    
    html += '<div align="center"><img src="' + src + '" onclick="imageOverlay.showOverlay(\'' + large + '\')" style="cursor:zoom-in" ';
    if (alt) {
        html += ' alt="' + alt +'" ';
    }
    if (cssClass) {
        html += ' class="' + cssClass + '" ';
    }
    html += '></div>';
	
	return new Handlebars.SafeString(html);
};
