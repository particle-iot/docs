
var Handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

module.exports = function(context) {	
	const platformName = context.hash.platform;	
    
    // __dirname is templates/helpers
    // ../../src/assets/files/pinInfo.json

    const filesDir = path.join(__dirname, '..', '..', 'src', 'assets', 'files');
    
    const pinInfo = JSON.parse(fs.readFileSync(path.join(filesDir, 'pinInfo.json'), 'utf8'));
    
    let objectForPlatform = {};

    // Make pin index by name. The JSON file has an array but the hash makes it easier to access.
	for(var ii = 0; ii < pinInfo.platforms.length; ii++) {
		var name = pinInfo.platforms[ii].name;
		objectForPlatform[name] = pinInfo.platforms[ii];
	}
	
    var diagram = objectForPlatform[platformName].diagram;
	
	var pins = objectForPlatform[platformName].pins;

	var sortedPinsIndex = [];
	
	// sortedPinsIndex is an array of indexes into the pins array, sorted by the sortByTag.
	for(var ii = 0; ii < pins.length; ii++) {
		// Only include the items that don't have showInTable === false. In other words,
		// true or element doesn't exist. The default is to include.
        // For this table, also only include MCU pins (hardwarePin), not power and other pins
		if (pins[ii].showInTable !== false && pins[ii].hardwarePin) {
			sortedPinsIndex.push(ii);
		}
	}

    // We don't actually change the sort order here, but if we did, we could sort sortedPinsIndex

    // Details for tag is the details array has the tag as the key and the value is the
    // details object. 
    var detailsForTag = {};

    // Make detail index by tag. The JSON file has an array but the hash makes it easier to access.
	for(var ii = 0; ii < pinInfo.details.length; ii++) {
		var detail = pinInfo.details[ii];
		var tag = detail['tag'];
		detailsForTag[tag] = detail;
	}


	let html = '</p><table>';
	
    html += '<tr>';
    for(var col = 0; col < diagram.columns.length; col++) {
        var tag = diagram.columns[col];
        if (!Array.isArray(tag)) {
            const text = detailsForTag[tag].columnLabel || detailsForTag[tag].label;
            html += '<th>' + getShortName(text) + '</th>';
        }
        else {
            html += '<th>&nbsp;</th>';
        }
    }
    html += '</tr>';


	for(var ii = 0; ii < sortedPinsIndex.length; ii++) {
		// sortedPinsIndex is an array of indexed into the pins array, sorted by the sort by criteria,
		// a filtered to include only thing that should be shown in table view.
		var pinName = pins[sortedPinsIndex[ii]].name;
		
		// pinName is the name of the pin we're processing (D0, A0, GND, etc.)
        html += '<tr>';
		
		for(var col = 0; col < diagram.columns.length; col++) {
			// diagram is the diagram object for this platform. Here we're interested in 
			// diagram.columns which is an array of columns to show in the table for this platform.
			// This can either be a tag (like num or name) or an array of things to show
			// like hardwareTimer or spi.
			var tag = diagram.columns[col];
			if (!Array.isArray(tag)) {
				// Normal tag, used for things like num, name, modulePinName
				var value = pins[sortedPinsIndex[ii]][tag];
				if (value) {
                    html += '<td>' + getShortName(value) + '</td>';
				}
			}
			else {
				// Exposed function section. This is an array of things like hardwareTimer, hardwareADC, spi, i2c, etc.
                var cellClass = 'pinInfoFunction';
                var cellText = '';
                var cellTitle = '';

                for(var tagIndex = 0; tagIndex < diagram.columns[col].length; tagIndex++) {
					tag = diagram.columns[col][tagIndex];


					var value = pins[sortedPinsIndex[ii]][tag];
					if (value === true) {
                        cellText = pinName;
                        cellClass += ' pinInfoCell_' + sanitizeName(pinName);
					}
					else
					if (value) {
                        cellText = getShortName(value);
                        cellClass += ' pinInfoCell_' + tag;

						var longName = getLongDesc(value);
						if (longName != value) {
							cellTitle = longName;								
						}
					}					
				}

                html += '<td class="' + cellClass + '" ';
                if (cellTitle) {
                    html += 'title="' + cellTitle + '" ';
                }
                html += '>' + cellText + '</td>';
            }
		}
        html += '</tr>';
	}		

    /*
    					if (value === true) {
						tb.cell(col, currentRow).withClass('pinInfoFunction pinInfoCell_' + sanitizeName(pinName)).appendText(pinName);							
					}
					else
					if (value) {
						tb.cell(col, currentRow).withClass('pinInfoFunction pinInfoCell_' + tag).appendText(getShortName(value));
						

    */
	
    html += '</table><p>';

	return new Handlebars.SafeString(html);
};

// Some fields use the format "short|a much longer description" using a vertical bar to
// separate the parts.
// This function gets the short (first) part or the whole string if there is no |.
function getShortName(t) {
	if (typeof t == 'number') {
		return t.toString();
	}
	else
	if (typeof t != 'string') {
		return t;
	}
	
	var index = t.indexOf("|");
	if (index > 0) {
		return t.substring(0, index); 
	}
	else {
		return t;
	}
}

// Some fields use the format "short|a much longer description" using a vertical bar to
// separate the parts.
// This function gets the long (last) part or the whole string if there is no |.
function getLongDesc(t) {
	if (typeof t == 'number') {
		return t.toString();
	}
	else
	if (typeof t != 'string') {
		return t;
	}

	var index = t.indexOf("|");
	if (index > 0) {
		return t.substring(index + 1);
	}
	else {
		return t;
	}
	
}

// Function to just get the alphanumeric part of a name. Use to convert a pin name
// into a valid CSS style name
function sanitizeName(t) {
	return t.replace(/[^abcdefghijklmnopqrstuvwxyz0123456789]/gi, '');
}
