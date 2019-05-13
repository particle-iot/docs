// Object that contains all of the data in te pinInfo.json file after it has
// been downloaded by AJAX.
var pinInfo;

// Key is a platform name ("Photon", "P1", etc.) object is the data for that platform
// The object contains things like id (int), name (string), pins (array), and diagram (object)
var objectForPlatform = {};

// Details for tag is the details array has the tag as the key and the value is the
// details object. 
var detailsForTag = {};

// useDiff is currently always true. It's whether to use diff on the individual table
// entries when comparing two platforms
var useDiff = true;

$(document).ready(function() {
	// Get the JSON data file containing all of the information. 
	$.ajax({
		  type: 'GET',
		  url: '/assets/files/pinInfo.json',
		  dataType: 'json',
		  success: getPinInfoCallback,
		  error: getPinInfoError
		});	
	
	// Hook up all of the dynamic items in the page with their Javascript handlers
	$('#modeSelect').change(updateMode);
	$('#deviceSelect').change(updateSettings);
	$('#device2Select').change(updateSettings);
	$('#showSelect').change(updateSettings);
	$('#sortBySelect').change(updateSettings);
	$('#tableSortBySelect').change(updateSettings);
});


// Called when the pinInfo.json file has been loaded
function getPinInfoCallback(pinInfoIn, textStatus, errorThrown) {
	// Store in a global variable for future use
	pinInfo = pinInfoIn;
		
	// Make pin index by name. The JSON file has an array but the hash makes it easier to access.
	for(var ii = 0; ii < pinInfo.platforms.length; ii++) {
		var name = pinInfo.platforms[ii].name;
		objectForPlatform[name] = pinInfo.platforms[ii];
	}
	
	// Make detail index by tag. The JSON file has an array but the hash makes it easier to access.
	for(var ii = 0; ii < pinInfo.details.length; ii++) {
		var detail = pinInfo.details[ii];
		var tag = detail['tag'];
		detailsForTag[tag] = detail;
	}

	// Build device/platform popup menu from the details section of the pinInfo.json file
	for(var ii = 0; ii < pinInfo.platforms.length; ii++) {
		var name = pinInfo.platforms[ii].name;

		var eb = new ElementBuilder().withName('option');
		
		if (ii == 0) {
			eb.withAttr('selected', 'selected');
		}
		
		eb.withAttr('value', name);
		eb.appendText(name);
		
		$('#deviceSelect').append(eb.elem);
		
		// Create a second object for the device2Select. Since we select a different
		// default item in this popup, just create a new element from scratch rather
		// than cloning the eb.elem above.
		var eb = new ElementBuilder().withName('option');
		
		if (ii == 1) {
			eb.withAttr('selected', 'selected');
		}
		
		eb.withAttr('value', name);
		eb.appendText(name);
		
		$('#device2Select').append(eb.elem);
	}
	
	// Build the showSelect popup menu from the details section of the pinInfo.json file
	for(var ii = 0; ii < pinInfo.details.length; ii++) {
		if (pinInfo.details[ii].searchable === true) {
			var eb = new ElementBuilder().withName('option');
			
			eb.withAttr('value', pinInfo.details[ii].tag);
			eb.appendText(pinInfo.details[ii].label);
			
			$('#showSelect').append(eb.elem);
		}
	}

	// Build the sort by popup menu from the details section of the pinInfo.json file
	for(var ii = 0; ii < pinInfo.details.length; ii++) {
		if (pinInfo.details[ii].sortable === true) {
			var eb = new ElementBuilder().withName('option');
			
			var tag = pinInfo.details[ii].tag;
			
			if (ii == 0) {
				eb.withAttr('selected', 'selected');
			}
			
			eb.withAttr('value', tag);
			eb.appendText(pinInfo.details[ii].label);
			
			$('#sortBySelect').append(eb.elem);
			
		}	
	}

	// If there are query parameters (after ?) in the window.location.search, use those to
	// adjust the activity and popup select elements in the page.
	loadSearch();
	
	// Show and hide sections. This also calls updateSettings to update the page based on the settings.
	updateMode();
}

function getPinInfoError(jqXHR, textStatus, errorThrown) {
	// console.log(textStatus, errorThrown);
}

function loadSearch() {
	if (!window.location.search) {
		return;
	}
	
	// parseQuery is small function included at the end of this file to convert the search parameters
	// into a Javascript object
	var params = parseQuery(window.location.search);
	
	// Select the appropriate radio button
	$('#modeSelect').val(params.m);
	
	// Only load the parameters appropriate for the current mode, and also only if present
	// (its OK to omit parameters and the defaults will be used).
	if (params.m === 'table') {
		if (params.sort) {
			$('#tableSortBySelect').val(params.sort);
		}
	}
	else
	if (params.m === 'details' || params.m === 'compare') {
		if (params.dev) {
			$('#deviceSelect').val(params.dev);
		}
		if (params.dev2) {
			$('#device2Select').val(params.dev2);
		}
		if (params.show) {
			$('#showSelect').val(params.show);
		}
		if (params.sort) {
			$('#sortBySelect').val(params.sort);
		}
	}
}

function saveSearch() {
	// Save the current state in the URL, so it can be saved or shared
	if (!window.history.replaceState) {
		// Browser does not support this, so skip it.
		return;
	}
	
	var config = {};
	
	var modeSelect = $('#modeSelect').val();
	config.m = modeSelect;
	
	if (modeSelect === 'table') {
		config.sort = $('#tableSortBySelect').val();
	}
	else 
	if (modeSelect === 'details' || modeSelect === 'compare') {
		config.dev = $('#deviceSelect').val();
		config.show = $('#showSelect').val();
		config.sort = $('#sortBySelect').val();
		
		if (modeSelect === 'compare') {
			config.dev2 = $('#device2Select').val();			
		}
	}
	
	// Turn the object into a query string
	var encoded = $.param(config);
	
	window.history.replaceState(null, null, '?' + encoded);

}

// Called at startup and when the mode radio buttons are clicked. Calls updateSettings
// internally after the correct sections are shown or hidden.
function updateMode() {
	
	var modeSelect = $('#modeSelect').val();
	
	$('#pinDetailDiv').hide();
	$('#pinTableDiv').hide();
	
	if (modeSelect === 'table') {
		$('#device2Select').hide();
		$('#showTR').hide();
		$('#sortByTR').hide();
		$('#tableSortByTR').show();
		$('#deviceSpan').show();
		$('#compareDevicesSpan').hide();
	}
	else
	if (modeSelect === 'details') {
		$('#device2Select').hide();
		$('#showTR').show();
		$('#sortByTR').show();
		$('#tableSortByTR').hide();
		$('#deviceSpan').show();
		$('#compareDevicesSpan').hide();
	}
	else
	if (modeSelect == 'compare') {
		$('#device2Select').show();
		$('#showTR').show();
		$('#sortByTR').show();
		$('#tableSortByTR').hide();
		$('#deviceSpan').hide();
		$('#compareDevicesSpan').show();
	}

	updateSettings();
}

// Based on the radio button and popup select selections, display the appropriate data in the page
function updateSettings() {

	var modeSelect = $('#modeSelect').val();
	
	if (modeSelect === 'table') {
		loadTableView();
	}
	else
	if (modeSelect === 'details') {
		loadComparison(1);
	}	
	else
	if (modeSelect == 'compare') {
		loadComparison(2);		
	}
	
	saveSearch();
}

// Used to generate the table view
function loadTableView() {
	var platformName = $('#deviceSelect').val();

	var diagram = objectForPlatform[platformName].diagram;
	
	$('#pinTableDiv').html('');
	$('#pinTableDiv').show();

	var sortByTag = $('#tableSortBySelect').val();

	var pins = objectForPlatform[platformName].pins;

	var sortedPinsIndex = [];
	
	// sortedPinsIndex is an array of indexes into the pins array, sorted by the sortByTag.
	for(var ii = 0; ii < pins.length; ii++) {
		// Only include the items that don't have showInTable === false. In other words,
		// true or element doesn't exist. The default is to include.
		if (pins[ii].showInTable !== false) {
			sortedPinsIndex.push(ii);
		}
	}
	
	// sort the array. If the sortByTag is 'num' (pin number) then convert to an int using
	// parseInt so they in numerical order, not ASCII order. Otherwise, sort by ASCII order.
	sortedPinsIndex.sort(function(a,b) {
		var aa;
		var bb;
		
		if (sortByTag == 'normal') {
			aa = a;
			bb = b;
		}
		else
		if (sortByTag == 'num') {
			aa = parseInt(pins[a][sortByTag]);
			bb = parseInt(pins[b][sortByTag]);
		}
		else {
			aa = pins[a][sortByTag];
			bb = pins[b][sortByTag];
		}
		
		if (aa < bb) {
			return -1;
		}
		else
		if (aa > bb) {
			return +1;
		}
		else {
			return 0;
		}
	});

	// TableBuilder is in htmlBuilder.js. It makes it easier to build HTML tables.
	// Parameters are number of columns, number of rows, include a <th> 
	var tb = new TableBuilder(diagram.columns.length, sortedPinsIndex.length, true);

	var currentRow = 0;
	
	for(var ii = 0; ii < sortedPinsIndex.length; ii++) {
		// sortedPinsIndex is an array of indexed into the pins array, sorted by the sort by criteria,
		// a filtered to include only thing that should be shown in table view.
		var pinName = pins[sortedPinsIndex[ii]].name;
		
		// pinName is the name of the pin we're processing (D0, A0, GND, etc.)
		
		for(var col = 0; col < diagram.columns.length; col++) {
			// diagram is the diagram object for this platform. Here we're interested in 
			// diagram.columns which is an array of columns to show in the table for this platform.
			// This can either be a tag (like num or name) or an array of things to show
			// like hardwareTimer or spi.
			var tag = diagram.columns[col];
			if (!Array.isArray(tag)) {
				// Normal tag, used for thingsl like num, name, modulePinName
				var value = pins[sortedPinsIndex[ii]][tag];
				if (value) {
					tb.cell(col, currentRow).appendText(getShortName(value));
				}
				
				if (currentRow == 0) {
					tb.headerCell(col).appendText(detailsForTag[tag].columnLabel || detailsForTag[tag].label);
				}
			}
			else {
				// Exposed function section. This is an array of things like hardwareTimer, hardwareADC, spi, i2c, etc.
				for(var tagIndex = 0; tagIndex < diagram.columns[col].length; tagIndex++) {
					tag = diagram.columns[col][tagIndex];

					var value = pins[sortedPinsIndex[ii]][tag];
					if (value === true) {
						tb.cell(col, currentRow).withClass('pinInfoFunction pinInfoCell_' + sanitizeName(pinName)).appendText(pinName);							
					}
					else
					if (value) {
						tb.cell(col, currentRow).withClass('pinInfoFunction pinInfoCell_' + tag).appendText(getShortName(value));
						
						var longName = getLongDesc(value);
						if (longName != value) {
							tb.cell(col, currentRow).withAttr('title', longName);								
						}
					}
					else {
						tb.cell(col, currentRow).withClass('pinInfoFunction').appendText('');
					}
				}
			}
		}
		currentRow++;
	}		
	
	$('#pinTableDiv').append(tb.table.elem);
}

// Used to generate the details and comparison views
// numComparison == 1 for details, and numComparison == 2 for comparison
function loadComparison(numComparison) {

	// pinsArray is has one element (for details) or two elements (for comparison)
	var pinsArray = [];
	
	// Get the pins array for the device (details) or left device (comparison)
	var platformNameLeft = $('#deviceSelect').val();
	
	var pinsLeft = objectForPlatform[platformNameLeft].pins;

	pinsArray.push(pinsLeft);

	if (numComparison == 2) {
		// If doing comparison, add the right device
		var platformNameRight = $('#device2Select').val();
		
		var pinsRight = objectForPlatform[platformNameRight].pins;
		
		pinsArray.push(pinsRight);
	}


	
	$('#pinDetailDiv').html('');
	$('#pinDetailDiv').show();

	// Filter is 'all' or something to limit by, for example 'spi' to only show SPI interfaces
	var filter = $('#showSelect').val();
		
	// sortByTag is what to sort the table by, typically name, num, somPin
	var sortByTag = $('#sortBySelect').val();
	
	// sortByValues is an array of values for sortByTag. It's built unsorted, then sorted
	// later using the built-in Javascript sort method.
	var sortByValues = [];
	
	// infoByValue is a hash containing the information to be displayed for each value.
	// If sorting by pin number, then the key is num. If sorting by pin name, then the key is name.
	// The value is an array, the first index is the left display, and the only display for details
	// If using a comparison, the second index is the right display.
	// In comparison mode, it's possible that one of the indexes will be left undefined if
	// a pin only exists on one device.
	var infoByValue = {};
	
	// Iterate the pin lists and find all pins that have the sortByTag and add them
	pinsArray.forEach(function(pins, index) {
		for(var ii = 0; ii < pins.length; ii++) {
			if (pins[ii].hasOwnProperty(sortByTag)) {
				var value = pins[ii][sortByTag];
				
				if (filter != 'all') {
					var valueFilter = pins[ii][filter];
					if (valueFilter === undefined || valueFilter === false) {
						continue;
					}
				}
				
				if (value !== undefined) {
					if (!sortByValues.includes(value)) {
						sortByValues.push(value);
					}
					if (infoByValue[value] == undefined) {
						infoByValue[value] = [];
					}
					var added = false;
					for(var jj = 0; jj < infoByValue[value].length; jj++) {
						if (infoByValue[value][jj].name == pins[ii].name) {
							infoByValue[value][jj][index] = pins[ii];
							added = true;
							break;
						}
					}
					if (!added) {
						var obj = {};
						obj.name = pins[ii].name;
						obj[index] = pins[ii];
						infoByValue[value].push(obj);						
					}
				}
			}
		}		
	});
	
	// If we are showing details, all, by pin number, expand out the morePins array
	// so all of the pins are shown in their own table section so we get a complete
	// list of pins
	if (numComparison === 1 && filter === 'all' && sortByTag === 'num') {
		for(var ii = 0; ii < pinsLeft.length; ii++) {
			if (pinsLeft[ii].hasOwnProperty(sortByTag) && Array.isArray(pinsLeft[ii].morePins)) {
				for(var jj = 0; jj < pinsLeft[ii].morePins.length; jj++) {
					var addPin = pinsLeft[ii].morePins[jj];
					
					if (!sortByValues.includes(addPin)) {
						sortByValues.push(addPin);
					}
					if (infoByValue[addPin] == undefined) {
						infoByValue[addPin] = [];
					}
					
					var pinModified = Object.assign({}, pinsLeft[ii]);
					pinModified.num = addPin;
															
					var obj = {};
					obj.name = pinModified.name;
					obj[0] = pinModified;
					infoByValue[addPin].push(obj);						

				}
			}
		}
	}
	
	// Now go through and add in the sorted details into infoByValue. This is
	// necessary so we can size the table properly and also match up fields
	for(value in infoByValue) {		
		for(var ii = 0; ii < infoByValue[value].length; ii++) {
			infoByValue[value][ii].details = [];
			
			for(var jj = 0; jj < pinInfo.details.length; jj++) {
				var detail = pinInfo.details[jj];
				var tag = detail.tag;
				var label = detail.label;
				
				var showInSearch;
				
				if (Array.isArray(detail.showInSearch)) {
					showInSearch = detail.showInSearch.includes(filter);
				}
				else {
					showInSearch = (detail.showInSearch !== false);
				}
				
				if (showInSearch) {
					for(var kk = 0; kk < numComparison; kk++) {
						if (infoByValue[value][ii][kk] !== undefined && 
							infoByValue[value][ii][kk][tag] !== undefined &&
							!infoByValue[value][ii].details.includes(tag)) {
							
							// This detail tag should be added, unless it should be omitted
							// because of search criteria
							if (filter === 'all' || tag === filter || showInSearch) {
								infoByValue[value][ii].details.push(tag);
							}
						}
					}
				}
			}
		}
	}
		
	sortByValues.sort(function(a,b) {
		if (a < b) {
			return -1;
		}
		else
		if (a > b) {
			return +1;
		}
		else {
			return 0;
		}
	});
	
	// Count the number of rows we'll need
	var totalRows = 0;
	
	for(var ii = 0; ii < sortByValues.length; ii++) {
		var value = sortByValues[ii];
		for(var jj = 0; jj < infoByValue[value].length; jj++) {
			totalRows += infoByValue[value][jj].details.length + 1;
		}
	}
	
	var curRow = 0;
	var tb = new TableBuilder(numComparison + 1, totalRows, false);

	for(var ii = 0; ii < sortByValues.length; ii++) {
		var value = sortByValues[ii];
				
		for(var jj = 0; jj < infoByValue[value].length; jj++) {
			var title = (sortByTag == 'name') ? value : value + ' (' + infoByValue[value][jj].name + ')';
			tb.cell(0, curRow++).withClass('pinInfoHeader').withAttr('colspan', '3').appendText(title);
			
			for(var kk = 0; kk < infoByValue[value][jj].details.length; kk++) {
				var tag = infoByValue[value][jj].details[kk];

				tb.row(curRow).withClass('pinInfoStriped');

				tb.cell(0, curRow).withClass('pinInfoLabel');
				tb.cell(0, curRow).appendText(detailsForTag[tag].label);

				var text = [];
				var doNotDiff = false;
				
				for(var ll = 0; ll < numComparison; ll++) {
					if (infoByValue[value][jj][ll] !== undefined && infoByValue[value][jj][ll][tag] !== undefined) {
						var s = infoByValue[value][jj][ll][tag];

						if (Array.isArray(s)) {
							s = s.join(', ');
						}

						// Special case: If filtering by ADC, return false for is5VTolerant since no ADCs
						// are currently 5V tolerant in analogRead mode
						if (tag === 'is5VTolerant' && filter === 'analogRead') {
							s = false;
						}
						
						if (s === true) {
							s = detailsForTag[tag].ifTrue;
							doNotDiff = true;
						}
						else
						if (s === false) {
							s = detailsForTag[tag].ifFalse;					
							doNotDiff = true;
						}
						else {
							s = getLongDesc(s);
						}

						text.push(s);				
					}
					else {
						text.push('');										
					}
				}
				
				// If only one of the items has details, do not diff the individual lines
				if (numComparison == 2 && useDiff && !doNotDiff) {
					if (infoByValue[value][jj][0] === undefined || infoByValue[value][jj][1] === undefined) {
						doNotDiff = true;
					} 
				}
				
				// If we're comparing the modulePinName or modulePinNumber and one is blank, do not diff
				// (it happens all the time and it just clutters the display)
				if (numComparison == 2 && useDiff && !doNotDiff) {
					if (tag == 'modulePinName' || tag == 'modulePinNumber') {
						if (text[0] === '' || text[1] === '') {
							doNotDiff = true;
						}
					}
				}
				
				if (numComparison == 2 && useDiff && !doNotDiff && text[0] != text[1]) {
					var diffs = diff(text[0], text[1]);			
					// // [[-1, "Goo"], [1, "Ba"], [0, "d dog"]]
					
					// If there are too many differences, just show the whole thing as changed
					if (diffs.length < 10 && tag !== 'num' && tag !== 'modulePinNumber' && tag !== 'hardwareADC' && tag != 'hardwareTimer') {
						for(var ll = 0; ll < diffs.length; ll++) {
							if (diffs[ll][0] == 0) {
								// Same
								tb.cell(1, curRow).appendText(diffs[ll][1]);												
								tb.cell(2, curRow).appendText(diffs[ll][1]);												
							}
							else {
								// Different
								var addTo = (diffs[ll][0] < 0) ? 1 : 2;
								
								var eb = new ElementBuilder().withName('span').withClass('pinInfoDiff');
								
								eb.appendText(diffs[ll][1]);
								tb.cell(addTo, curRow).appendNode(eb.elem);												
	
							}
								
						}
					}
					else {
						// Too many differences, just show the whole thing as one big diff
						for(var ll = 0; ll < numComparison; ll++) {
							var eb = new ElementBuilder().withName('span').withClass('pinInfoDiff');
							
							eb.appendText(text[ll]);
							tb.cell(1 + ll, curRow).appendNode(eb.elem);												
						}

					}
				}
				else {
					for(var ll = 0; ll < numComparison; ll++) {
						tb.cell(1 + ll, curRow).appendText(text[ll]);					
					}
				}
				
				curRow++;
			}
		}

	}

	$('#pinDetailDiv').append(tb.table.elem);
	
}

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

// https://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var value = pair[1] || '';
        value = value.replace(/\+/g, ' ');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(value);
    }
    return query;
}


