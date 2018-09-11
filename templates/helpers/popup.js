// Display extra information in a popup
// Usage with type 'note':
// {{popup 'short text' 'note' 'Long margin note on mouse over'}}
// Usage with type 'vine':
// {{popup 'short text' 'vine' 'htts://vine.co/v/...'}}
// Usage with type 'img':
// {{popup 'short text' 'img' 'image-filename.png'}}
var Handlebars = require('handlebars');
module.exports = function(link, type, args) {
    if (type == 'img') {
	var r = '<span class="popupLink">'
	    + link
	    + '<span class="popup"><img src="/assets/images/'
	    + args
	    + '" style="margin:auto; max-width:100%"></span></span>';
    }
    else if (type == 'note') {
	var r = '<span class="footnoteLink">'
	    + link
	    + '<span class="footnote">'
	    + args
	    + '</span></span>';
    }
    else if (type == 'vine') {
	var r = '<span class="popupLink">'
	    + link
	    + '<span class = "popup"><iframe src="'
	    + args
	    + '" width="320" height="320" frameborder="0"></iframe></span></span>';
    }
    return new Handlebars.SafeString(r);
}
