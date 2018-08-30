var crypto = require('crypto');

var Handlebars = require('handlebars');

module.exports = function(context) {
	var html = '';
	
	// Note: requires disclosure triangle and collapse.js shared with collapse control!
	
	var show = context.hash.show || false;
	var rows = context.hash.rows || 4;
	var title = context.hash.title || 'Copy Code';
	
	var html = '';
	
	
	var id = crypto.randomBytes(12).toString("hex");
	
	// Button to copy, also can drag
	html += '<button type="button" onclick="collapseCopy(\'s' + id + '\')" draggable="true" ondragstart="collapseDrag(event, \'s' + id + '\')">' + title + '</button>&nbsp;';
		
	// Disclosure triangle
	var imgPath = show ? '/assets/images/disclosure-down.png' : '/assets/images/disclosure-right.png';


	var style = '';
	if (!show) {
		style += ' display:none';
	}
	
	html += '<img src="' + imgPath + '" style="position:static; display:inline; margin:2px; width:12px; height:12px;" id="i' + id + '" onclick="collapseToggle(\'' + id + '\')" />';
	html += '</p>';

	html += '<textarea rows="' + rows + '" cols="100" id="s' + id + '" style="' + style + '">';
	
	html += context.fn();
	
	html += '</textarea>';
	
	// This helper is called inside a <p> so we need to fake out closing and opening the <p> otherwise
	// things like <div> and <textarea> don't work properly
	html += '<p>';
	
	return new Handlebars.SafeString(html);
};
