var Handlebars = require('handlebars');

/*
Usage:

{{step-diagram op="start" type="gen2"}}
// JSON configuration goes here
{{step-diagram op="end"}}
*/

module.exports = function(context) {
	var html = '';
	
		
    var op = context.hash.op;
	if (op === 'start') {
        html += '</p><div class="step-diagram" style="display:none">';
    }
    else
    if (op === 'end') {
		html += '</div><p>';	
	}

	
	return new Handlebars.SafeString(html);
};
