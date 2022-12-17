var Handlebars = require('handlebars');


module.exports = function(context) {
	let html = '';
	
		
    var op = context.hash.op;
	if (op === 'start') {
		html += '</p><div class="apiHelperContentGuard" style="display:none" data-mode="' + context.hash.mode + '"><p>';	
    }
    else
    if (op === 'else') {
		html += '</p></div><div class="apiHelperContentGuardElse" style="display:none"><p>';	
	}
    else
    if (op === 'end') {
		html += '</p></div><p>';	
	}

        
	return new Handlebars.SafeString(html);
}
