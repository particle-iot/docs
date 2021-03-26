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

    html += '</p><div class="codebox"><div class="codeboxBanner"><div class="codeboxBannerBox">';

    html += '<div><button type="button" onclick="codeboxDownload(\'' + content + '\')">Download</button> &nbsp;';
    
    html += '<button type="button" onclick="codeboxCopy(\'' + id + '\')">Copy to Clipboard</button> &nbsp;';

    if (context.hash.webide) {
        html += '<button type="button" onclick="codeboxOpenWebIDE(\'' + context.hash.webide + '\')">Open in Web IDE</button> &nbsp;';
    }

    if (context.hash.flash) {
        html += '<span class="codeboxFlashDeviceSpan" style="display: none"> &nbsp;&nbsp;'
        html += '<select class="codeboxFlashDeviceSelect"></select> '
        html += '<button type="button" onclick="codeboxFlash(\'' + id + '\')" disabled>Flash</button> &nbsp;';
        html += '</span>'
    }
    html += '</div><div class="codeboxFlashStatus"></div>';    

    html += '</div></div><div style="height:' + height + 'px; overflow:scroll;">';

    html += '<pre class="codeboxPre"><code class="lang-' + format + ' codebox" data-content="' + content + '" id="' + id + '">';

    html += '</code></pre></div></div><p>';

		
	return new Handlebars.SafeString(html);
};
