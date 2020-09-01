// Inserts a table of DNS addresses
// {{dns-table key="udp"}}
// The data is stored in config/dnsTable.json
// The dnsTable.json file is generated or updated by scripts/generateDnsTable.js
var Handlebars = require('handlebars');

var lastCssClass;

module.exports = function(context) {
    const key = context.hash.key;
    if (!key) {
        return '';
    }
    const columns = context.hash.columns || 5;

    // console.log('context', context);
    // console.log('context.data.root.dns_table', context.data.root.dns_table);
    
    return generateTable(context.data.root.dnsTable[key].addresses, columns);
};

function generateTable(addresses, columns) {
    if (!addresses || addresses.length == 0) {
        return '';
    }

    if (columns > addresses.length) {
        columns = addresses.length;
    }
    let md = '';
    let col;

    for(col = 0; col < columns; col++) {
        md += '| IP Address ';
    }
    md += '|\n';

    for(col = 0; col < columns; col++) {
        md += '| :--- ';
    }
    md += '|\n';

    col = 0;
    addresses.forEach(function(address) {
        md += '| ' + address;
        if (++col >= columns) {
            col = 0;
            md += '|\n';
        }
    });
    if (col != 0) {
        md += '|\n';
    }

    return md;
}

