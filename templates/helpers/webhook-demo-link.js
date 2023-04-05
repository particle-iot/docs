
var Handlebars = require('handlebars');

module.exports = function(context) {	
	const text = context.hash.text || 'Particle console';
    const link = context.hash.link;

	let html = '<a href="https://console.particle.io/" data-link="' + link + '" class="webhookDemoLink" target="_blank">' + text + '</a>';
	
	return new Handlebars.SafeString(html);
};
