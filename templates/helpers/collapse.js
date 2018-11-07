var crypto = require('crypto');

var Handlebars = require('handlebars');

// Default computerOs (when not stored in localstorage) is set in src/assets/js/collapse.js
var collapseComputerOsList = [
	'Windows',
	'Mac',
	'Linux'
];
var collapsePhotoSensorList = [
	'Transistor',
	'Resistor'
];

module.exports = function(context) {
	var html = '';
	
	var op = context.hash.op;
	if (op === 'start') {
		if (context.hash.photoSensor) {
			// photoSensor: Photo Transistor or Resistor
			// Start with all sections hidden, one will be opened at runtime, either the default or the one
			// saved in localstorage, from the code in src/assets/js/collapse.js (runtime code)
			html += '</p><div class="collapsePhotoSensor collapsePhotoSensor' + context.hash.photoSensor + '" style="display:none">';
		}
		else
		if (context.hash.computerOs) {
			// computerOs start (Mac, Windows, Linux)
			// Start with all sections hidden, one will be opened at runtime, either the default or the one
			// saved in localstorage, from the code in src/assets/js/collapse.js (runtime code)
			html += '</p><div class="collapseComputerOs collapseComputerOs' + context.hash.computerOs + '" style="display:none;">';
		}
		else {
			// Default hidden section start					
			var id = crypto.randomBytes(12).toString("hex");
			html += '</p><p onclick="collapseToggle(\'' + id + '\')"><img src="/assets/images/disclosure-right.png" style="position:static; display:inline; margin:4px; width:12px; height:12px;" id="i' + id + '"/>' + context.hash.label + '</p>';
			
			html += '<div id="s' + id + '" style="display:none">';
		}
	}
	else
	if (op === 'end') {
		html += '</div><p>';	
	}
	else
	if (op === 'computerOsSelector') {
		var id = crypto.randomBytes(12).toString("hex");

		html += '</p><form><p>Select computer operating system:<br/>';
		
		for(var ii = 0; ii < collapseComputerOsList.length; ii++) {
			html += '<span onclick="collapseComputerOs(\'' + collapseComputerOsList[ii] + '\')">';
			html += '<input type="radio" class="collapseComputerOs collapseComputerOs' + collapseComputerOsList[ii] + '" id=" + id + ">'; 
			html += '<label for="' + id + '">' + collapseComputerOsList[ii] + '&nbsp;&nbsp;&nbsp;&nbsp;</label>';
			html += '</span>';
		}
		
		html += '</p></form><p>';
	}
	else
	if (op === 'photoSensor') {
		var id = crypto.randomBytes(12).toString("hex");

		html += '</p><form><p>Select the type of photo sensor in your kit:<br/>';
		
		for(var ii = 0; ii < collapsePhotoSensorList.length; ii++) {
			html += '<span onclick="collapsePhotoSensor(\'' + collapsePhotoSensorList[ii] + '\')">';
			html += '<input type="radio" class="collapsePhotoSensor collapsePhotoSensor' + collapsePhotoSensorList[ii] + '" id=" + id + ">'; 
			html += '<label for="' + id + '">Photo ' + collapsePhotoSensorList[ii] + '&nbsp;&nbsp;&nbsp;&nbsp;</label>';
			html += '</span>';
		}
		
		html += '</p></form><p>';
	}

		
	return new Handlebars.SafeString(html);
};
