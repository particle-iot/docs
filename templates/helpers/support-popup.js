// Unused
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
    return r;
}
