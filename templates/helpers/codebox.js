var crypto = require('crypto');

var Handlebars = require('handlebars');

module.exports = function(context) {
	var html = '';
	
	// Note: requires collapse.js shared with collapse and copycode helpers!
	
	var content = context.hash.content;
    
    var format = context.hash.format;

    var height = context.hash.height || 200;

	var html = '';
    
    var id = crypto.randomBytes(12).toString("hex");

	// This helper is called inside a <p> so we need to fake out closing and opening the <p> otherwise
	// things like <div> and <textarea> don't work properly

    html += '</p><div>';

    html += '<button type="button" onclick="codeboxDownload(\'' + content + '\')">Download</button> &nbsp;';
    
    html += '<button type="button" onclick="codeboxCopy(\'' + id + '\')">Copy to Clipboard</button>';

    html += '</div><div style="height:' + height + 'px; overflow:scroll;">';

    html += '<pre><code class="lang-' + format + ' codebox" data-content="' + content + '" id="' + id + '">';

    html += '</code></pre></div><p>';

		
	return new Handlebars.SafeString(html);
};
