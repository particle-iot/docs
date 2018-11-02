// Insert a download button
// Usage:
// {{downloadButton url="/assets/pdfs/datasheets/argon-datasheet.pdf"}}
var Handlebars = require('handlebars');
module.exports = function(context) {
	var html = '';
	
	var url = context.hash.url;
	
	var title = 'Download';
	if (context.hash.title) {
		title = context.hash.title;
	}
	else
	if (url.endsWith('pdf')) {
		title = 'Download PDF';
	}
	
	html += '</p><div class="buttonUpperRight">';
	
	html += '<a href="' + url + '" class="button buttonRounded';
	
	if (context.hash.cssClass) {
		html += ' ' + context.hash.cssClass;
	}
	
	if (context.hash.style) {
		html += '" style="' + context.hash.style;
	}
	
	html += '">' + title + '</a></div><p>'
	
	if (context.hash.style) {
		html += 'style="' + context.hash.style + '" ';
	}

	
	return new Handlebars.SafeString(html);
}
