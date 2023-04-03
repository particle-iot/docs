var crypto = require('crypto');

var Handlebars = require('handlebars');

var collapseConfig = {
	'computerOs':{
		'prompt':'Select computer operating system:',
		'defaultValue':'Windows',
		'cssClass':'collapseComputerOs',
		'op':'computerOsSelector',
		'options':[
			{'title':'Windows', 'tag':'Windows'},
			{'title':'Mac', 'tag':'Mac'},
			{'title':'Linux', 'tag':'Linux'}
		]
	},
	'photoSensor':{
		'prompt':'Select the type of photo sensor in your kit:',
		'defaultValue':'Resistor',
		'cssClass':'collapsePhotoSensor',
		'op':'photoSensor',
		'options':[
			{'title':'Transistor', 'tag':'Transistor'},
			{'title':'Resistor', 'tag':'Resistor'}
		]		
	},
	'cellularDevice':{
		'prompt':'Select the type of cellular device you have:',
		'defaultValue':'Boron',
		'cssClass':'collapseCellularDevice',
		'op':'cellularDevice',
		'options':[
			{'title':'Boron', 'tag':'Boron'},
			{'title':'Electron or E Series', 'tag':'Electron'}
		]				
	},
	'hardwareTutorial':{
		'prompt':'Select the type of Particle device you have:',
		'defaultValue':'Photon',
		'cssClass':'collapseHardwareTutorial',
		'op':'hardwareTutorial',
		'options':[
			{'title':'Photon', 'tag':'Photon'},
			{'title':'Electron', 'tag':'Electron'},
			{'title':'Argon or Boron (Gen 3)', 'tag':'Gen3'}
		]				
	},
	'simType':{
		'prompt':'Select the type of cellular device you have:',
		'defaultValue':'Electron',
		'cssClass':'collapseSimType',
		'op':'simType',
		'multilineSelector':true,
		'options':[
			{'title':'Electron 2G (G350), Electron 3G (U260/U270), or E Series 2G/3G (E310)', 'tag':'Electron'},
			{'title':'E Series LTE (E402), Boron LTE, B Series B402 SoM, Tracker T402 SoM, or Electron LTE (ELC402) (LTE Cat M1)', 'tag':'LTE'},
			{'title':'B Series B523 SoM or Tracker T523 SoM', 'tag':'B523'},
			{'title':'Boron 2G/3G', 'tag':'Boron'},
			{'title':'Boron 2G/3G, E Series E313 (Enterprise Only Option)', 'tag':'BoronAllNet', 'hideWithoutOption':true}
		]				
	}
};

module.exports = function(context) {
	var html = '';
	
	var op = context.hash.op;
	if (op === 'start') {
		var hasSelector = false;
		
		for (var key in collapseConfig) {
		    if (collapseConfig.hasOwnProperty(key)) {
		    	if (context.hash[key]) {
		    		hasSelector = true;

		    		var genericClass = collapseConfig[key].cssClass;
		    		var specificClass = genericClass + context.hash[key];
		    		
					html += '</p><div class="' + genericClass + ' ' + specificClass + '" style="display:none">';

		    	}
		    }
		}
		
		if (!hasSelector)  {
			// Default hidden section start					
			let styleOptions = '';
			if (context.hash['indent']) {
				styleOptions += 'padding-left: ' + context.hash['indent'] + '; ';
			}

			var id = crypto.randomBytes(12).toString("hex");

			let pictureSrc = '<picture />';
			pictureSrc += '<source srcset="/assets/images/disclosure-right-dark.png" media="(prefers-color-scheme: dark)" />'
			pictureSrc += '<img src="/assets/images/disclosure-right.png" style="display:inline; position:static; margin:0px 4px; width:14px; height:14px;" id="ir' + id + '" />'
			pictureSrc += '</picture>';
			pictureSrc += '<picture />';
			pictureSrc += '<source srcset="/assets/images/disclosure-down-dark.png" media="(prefers-color-scheme: dark)" />'
			pictureSrc += '<img src="/assets/images/disclosure-down.png" style="display:none; position:static; margin:0px 4px; width:14px; height:14px;" id="id' + id + '"/>'
			pictureSrc += '</picture>';

			html += '</p><p onclick="collapseToggle(\'' + id + '\')" style="' + styleOptions + '">' + pictureSrc + context.hash.label + '</p>';
			
			html += '<div id="s' + id + '" class="collapseIndent" style="display:none">';
		}
	}
	else
	if (op === 'end') {
		html += '</div><p>';	
	}
	else {
		for (var key in collapseConfig) {
		    if (collapseConfig.hasOwnProperty(key)) {	    		
		    	if (op === collapseConfig[key].op) {
		    		var genericClass = collapseConfig[key].cssClass;

		    		if (!context.hash.force) {	
			    		html += '</p><form><p>' + collapseConfig[key].prompt + '<br/>';
	
			    		
			    		for(var ii = 0; ii < collapseConfig[key].options.length; ii++) {
				    		var specificClass = genericClass + collapseConfig[key].options[ii].tag;
							
							var id = crypto.randomBytes(12).toString("hex");

							var hiddenExtra = '';
							if (collapseConfig[key].options[ii].hideWithoutOption) {
								hiddenExtra = 'style="display:none" class="' + genericClass + 'optionHide" ';
							}

			    			html += '<span onclick="collapseSelector(event, \'' + genericClass + '\', \'' + collapseConfig[key].options[ii].tag + '\')" ' + hiddenExtra + '>';
			    			html += '<input type="radio" class="' + genericClass + ' ' + specificClass + '" id=" ' + id + '" >'; 
			    			html += '<label for="' + id + '">' + collapseConfig[key].options[ii].title + '&nbsp;&nbsp;&nbsp;&nbsp;</label>';
			    			html += '</span>';
			    			
			    			if (collapseConfig[key].multilineSelector) {
			    				html += '<br/>';
			    			}
			    		}
			    		
			    		html += '<input type="hidden" class="collapseDefault" name="' + genericClass + '" value="' + collapseConfig[key].defaultValue + '"/>';
			    		
			    		html += '</p></form><p>';
		    		}
		    		else {
			    		html += '</p><form>';
			    		
			    		html += '<input type="hidden" class="collapseForce" name="' + genericClass + '" value="' + context.hash.force + '"/>';
			    		
			    		html += '</form><p>';
	
		    		}
		    	}
		    }
		}
	
	}
		
	return new Handlebars.SafeString(html);
};
