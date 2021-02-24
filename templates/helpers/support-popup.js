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

    return r;
}
