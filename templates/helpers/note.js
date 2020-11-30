var Handlebars = require('handlebars');

/*
Usage:

{{note op="start" type="gen2"}}
Markdown text for Gen 2 platforms go here
{{note op="end"}}

You can include multiple types:

{{note op="start" type="gen2 cellular"}}

The following types are supported:
gen2      - Gen2 platform
gen3      - Gen3 platform
wifi      - Wi-Fi devices only (cellular and wifi are mutually exclusive)
cellular  - Cellular devices only (cellular and wifi are mutually exclusive)
note      - A note (orange bar). Has precedence over others except warning. Note and warning are mutually exclusive.
warning   - A warning (red bar). Has precedence over others. Note and warning are mutually exclusive.

If there's both a generation and network ("gen3 cellular") then the network color will
be displayed because there can only be one colored bar visible at a time since 
the CSS border class is used.
*/

/*
These are the CSS colors defined in colors.less. The brand colors (@NC_CYAN) are defined in variables.less
@note-gen2: @NC_CYAN;
@note-gen3: @NC_NAVY_HOVER;
@note-wifi: @NC_EMERALD;
@note-cellular: @NC_EMERALD_DARK;
@note-note: @NC_MACARONI;
@note-warning: @NC_WARNING; 


*/

module.exports = function(context) {
	var html = '';
	
		
    var op = context.hash.op;
	if (op === 'start') {
        var cssClass = '';
        var message = '';

        if (context.hash.type.indexOf("warning") >= 0) {
            message = 'Warning:';
            cssClass = 'note-warning';
        }
        else
        if (context.hash.type.indexOf("note") >= 0) {
            message = 'Note:';
            cssClass = 'note-note';
        }
        else
        if (context.hash.type.indexOf("cellular") >= 0) {
            if (context.hash.type.indexOf("gen3") >= 0) {
                message = 'Gen 3 Cellular Devices:';
            }
            else if (context.hash.type.indexOf("gen2") >= 0) {
                message = 'Gen 2 Cellular Devices:';
            }
            else {
                message = 'Cellular Devices:';
            }
            cssClass = 'note-cellular';
        }
        else
        if (context.hash.type.indexOf("wifi") >= 0) {
            if (context.hash.type.indexOf("gen3") >= 0) {
                message = 'Gen 3 Wi-Fi Devices:';
            }
            else if (context.hash.type.indexOf("gen2") >= 0) {
                message = 'Gen 2 Wi-Fi Devices:';
            }
            else {
                message = 'Wi-Fi Devices:';
            }
            cssClass = 'note-wifi';
        }
        else
        if (context.hash.type.indexOf("gen3") >= 0) {
            message = 'Gen 3 Devices:';
            cssClass = 'note-gen3';
        }
        else
        if (context.hash.type.indexOf("gen2") >= 0) {
            message = 'Gen 2 Devices:';
            cssClass = 'note-gen2';
        }

        html += '<span class="note-prefix">' + message + '</span></p><div class="note-common ' + cssClass + ' content reference"><p>';
    }
    else
    if (op === 'end') {
		html += '</p></div><p>';	
	}

	
	return new Handlebars.SafeString(html);
};
