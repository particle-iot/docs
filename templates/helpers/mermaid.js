var Handlebars = require('handlebars');


module.exports = function(context) {
	var html = '';
	
	var op = context.hash.op;
	if (op === 'start') {
		html = '</p><div class="mermaid">';
	}
	else
	if (op === 'end') {
		html += '</div><p>';	
	}
		
	return new Handlebars.SafeString(html);
};
