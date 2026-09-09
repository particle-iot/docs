var Handlebars = require('handlebars');

module.exports = function(context) {
	var html = '';

	// Note: requires disclosure triangle and collapse.js shared with collapse control!

	var show = context.hash.show || false;
	var rows = context.hash.rows || 4;
	var title = context.hash.title || 'Copy Code';

	var html = '';

	// No id is needed: the runtime finds the textarea below as the next sibling of this
	// paragraph, from either the button or the disclosure image (see collapse.js).

	// Button to copy, also can drag
	html += '<button type="button" onclick="collapseCopy(this)" draggable="true" ondragstart="collapseDrag(event, this)">' + title + '</button>&nbsp;';

	// Disclosure triangle
	var imgPath = show ? '/assets/images/disclosure-down.png' : '/assets/images/disclosure-right.png';


	var style = '';
	if (!show) {
		style += ' display:none';
	}

	html += '<img src="' + imgPath + '" style="position:static; display:inline; margin:2px; width:12px; height:12px;" onclick="collapseToggle(this)" />';
	html += '</p>';

	html += '<textarea rows="' + rows + '" cols="100" style="' + style + '">';

	html += context.fn();

	html += '</textarea>';
	
	// This helper is called inside a <p> so we need to fake out closing and opening the <p> otherwise
	// things like <div> and <textarea> don't work properly
	html += '<p>';
	
	return new Handlebars.SafeString(html);
};
