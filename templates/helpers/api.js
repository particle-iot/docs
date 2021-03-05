// {{api name1="Serial.println" name2=println"}}
// Can include more or fewer names
// don't include parentheses or arguments

var Handlebars = require('handlebars');


module.exports = function(context) {
	
	let html = '';

    const sanitizeName = function(str) {
        return str.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    };

    const name = context.hash.name1;
    if (name) {
        const anchorName = 'api-' + sanitizeName(name);
        
        html += '<a name="' + anchorName + '" style="color:#a0a0a0">';
        
        for(let ii = 1; ii < 9; ii++) {
            if (!context.hash['name' + ii]) {
                break;
            }

            if (ii > 1) {
                html += ', ';
            }
            html += '<span data-swiftype-name="api" data-swiftype-type="enum" style="font-size: x-small">' + context.hash['name' + ii] + '</span>';
        }
        
        html += '</a>'
    }

	return new Handlebars.SafeString(html);
};
