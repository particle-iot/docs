

module.exports = function(link) {
	
	var r = 
		'<div class="iframe-wrapper"><iframe src="'
	  + link
	  + '" width="320" height="320" frameborder="0"></iframe></div>';

	return r;
}