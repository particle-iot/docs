// {{api name1="Serial.println"}}
// This will generate entries for Serial.println
// as well as println if the name is of the form xxx.yyy.
// Can include more names using name2="xxx", etc.
// don't include parentheses or arguments

var Handlebars = require('handlebars');


module.exports = function(context) {
	
	let html = '';

    const sanitizeName = function(str) {
        return str.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    };

    let names = [];

    const addNames = function(name) {
        names.push(name);
        let parts = name.split('.');
        if (parts.length == 2) {
            names.push(parts[1]);
        }  
        else {
            parts = name.split('::');
            if (parts.length == 2) {
                names.push(parts[1]);
                const nameAlt = name.replace('::', '.');
                names.push(nameAlt);                
            }
        }
    };

    const name = context.hash.name1;
    if (name) {
        addNames(name); 
        for(let ii = 2; ii < 9; ii++) {
            if (!context.hash['name' + ii]) {
                break;
            }
            addNames(context.hash['name' + ii]);
        }

        const anchorName = 'api-' + sanitizeName(name);
        
        html += '<a name="' + anchorName + '" style="color:#a0a0a0">';

        for(let ii = 0; ii < names.length; ii++) {
            if (ii > 0) {
                html += ', ';
            }
            html += '<span data-swiftype-name="api" data-swiftype-type="enum" style="font-size: x-small">' + names[ii] + '</span>';
        }
        
        html += '</a>'
    }

	return new Handlebars.SafeString(html);
};
