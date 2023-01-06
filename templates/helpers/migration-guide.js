var Handlebars = require('handlebars');

module.exports = function(context) {
	let html = '';
	
    // Total content width = 760px
    // 

    html += '</p><table><tbody><tr>';

    html += '<td style="vertical-align: middle;"><img src="' + context.hash.leftImg + '" style="max-width: 300px; max-height: 425px;" /></td>';

    html += '<td style="vertical-align: middle;"><img src="/assets/images/cyan-arrow-right.svg" width="100" height="100" /></td>'

    html += '<td style="vertical-align: middle;"><img src="' + context.hash.rightImg + '" style="max-width: 300px; max-height: 425px;" /></td>';

    html += '</tr></tbody></table><p>';

	
	return new Handlebars.SafeString(html);
};
