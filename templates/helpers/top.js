var Handlebars = require('handlebars');

module.exports = function(context) {    
    let html = '<a href="#top"><i class="ion-chevron-up"></i><span style="font-size: 13px"> Top</span></a>';

    return new Handlebars.SafeString(html);
};
