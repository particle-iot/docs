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
		'defaultValue':'Electron',
		'cssClass':'collapseCellularDevice',
		'op':'cellularDevice',
		'options':[
			{'title':'Electron or E Series', 'tag':'Electron'},
			{'title':'Boron', 'tag':'Boron'}
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
			{'title':'E Series LTE (E402) or Boron LTE', 'tag':'LTE'},
			{'title':'Boron 2G/3G', 'tag':'Boron'}
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
			var id = crypto.randomBytes(12).toString("hex");
			html += '</p><p onclick="collapseToggle(\'' + id + '\')"><img src="/assets/images/disclosure-right.png" style="position:static; display:inline; margin:4px; width:12px; height:12px;" id="i' + id + '"/>' + context.hash.label + '</p>';
			
			html += '<div id="s' + id + '" style="display:none">';
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
			    		var id = crypto.randomBytes(12).toString("hex");
	
			    		html += '</p><form><p>' + collapseConfig[key].prompt + '<br/>';
	
			    		
			    		for(var ii = 0; ii < collapseConfig[key].options.length; ii++) {
				    		var specificClass = genericClass + collapseConfig[key].options[ii].tag;
				    		
			    			html += '<span onclick="collapseSelector(\'' + genericClass + '\', \'' + collapseConfig[key].options[ii].tag + '\')">';
			    			html += '<input type="radio" class="' + genericClass + ' ' + specificClass + '" id=" + id + ">'; 
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
