var Handlebars = require('handlebars');

module.exports = function(context) {
	let html = '';
	
    // Total content width = 760px
    const leftStyle = (typeof context.hash.leftStyle != 'undefined') ? context.hash.leftStyle : '';
    const rightStyle = (typeof context.hash.rightStyle != 'undefined') ? context.hash.rightStyle : '';

    let imageFile = '/assets/images/cyan-arrow-right.svg';
    if (typeof context.hash.type == 'string') {
        switch(context.hash.type) {
            case 'question':
                imageFile = '/assets/images/cyan-question-mark.svg';
                break;

            case 'arrow':
            default:
                break;
        }
    }

    html += '</p><table><tbody><tr>';

    html += '<td style="vertical-align: middle;"><img src="' + context.hash.leftImg + '" style="max-width: 300px; max-height: 425px; ' + leftStyle + '" /></td>';

    html += '<td style="vertical-align: middle;"><img src="' + imageFile + '" width="100" height="100" /></td>'

    html += '<td style="vertical-align: middle;"><img src="' + context.hash.rightImg + '" style="max-width: 300px; max-height: 425px; ' + rightStyle + '" /></td>';

    html += '</tr></tbody></table><p>';

	
	return new Handlebars.SafeString(html);
};
