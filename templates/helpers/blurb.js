// {{blurb name="tiers"}}
const fs = require('fs');
const path = require('path');

const Handlebars = require('handlebars');

module.exports = function(context) {
    const name = context.hash.name;
    if (!name) {
        return '';
    }

    const source = fs.readFileSync(path.join(context.data.root.src, 'content', 'blurbs', name + '.md'), 'utf8');

    var template = Handlebars.compile(source);

    // console.log('context', context);

    const html = template(context.data.root);

    return new Handlebars.SafeString(html);
};
