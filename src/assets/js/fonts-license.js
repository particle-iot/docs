'use strict';

window.addEventListener('load', function(event) {
	const userId = 'ae367dd9-aa38-4d14-be50-c858be50b3c1';
	const MTFontIds = ['721263'];
	const pf = MTFontIds.join(',');
	const mtTracking = document.createElement('link');
	mtTracking.type = 'text/css';
	mtTracking.rel = 'stylesheet';
	mtTracking.href = ('https:' === document.location.protocol ? 'https:' : 'http:') + '//fast.fonts.net/lt/1.css?apiType=css&c=' + userId + '&fontids=' + pf;
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(mtTracking);
});
