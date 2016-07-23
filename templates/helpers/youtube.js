

module.exports = function(link) {
	
	var r = 
		'<div class="video-frame"><iframe src="'
	  + link
	  + '" width="560" height="315" frameborder="0" allowfullscreen></iframe></div>';

	return r;
}
