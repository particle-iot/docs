var Handlebars = require('handlebars');

var lastCssClass;

module.exports = function(context) {
	var html = '';
	
	var cssClass = context.hash.cssClass || 'boxed';
	
	var op = context.hash.op;
	if (op === 'start') {		
		html += '</p><div class="' + cssClass + '"><p>';
		lastCssClass = cssClass;
	}
	else
	if (op === 'end') {
		html += '</p></div><p>';	
	}
	else
	if (op === 'switch') {
		html += '</p></div><div class="' + lastCssClass + '"><p>';	
	}
	
	return new Handlebars.SafeString(html);
};
