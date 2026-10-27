// DOM implementation of updater.generateTable() from scripts/carriers-update/carriers-update.js.
// Takes the same options (table definition) and data, but builds a table element using jQuery
// instead of generating a Markdown table. Requires jQuery.

tableGenerator = {};

// Same as updater.getShortName: use the text before the first | in a name
tableGenerator.getShortName = function(t) {
    if (typeof t == 'number') {
        return t.toString();
    }
    if (typeof t != 'string') {
        return t;
    }

    const index = t.indexOf('|');
    if (index > 0) {
        return t.substring(0, index);
    }
    return t;
};

// options.columns is an array of objects that specify columns of the table left to right
//   .key, .title, .align (left (default), center, right), .map, .checkmark, .onlyCheckmark,
//   .useShortName, .capitalizeValue, .linkKey
// options.tableCssClass is an optional class for the table element
// data is an array of objects. The elements of the array are rows in the table.
//
// Cell values are HTML, as they are in the Markdown version (for example &nbsp;, &check;, <sup>).
// Returns the jQuery table element.
tableGenerator.generateTable = function(options, data) {
    const tableElem = $('<table>');
    if (options.tableCssClass) {
        tableElem.addClass(options.tableCssClass);
    }

    const alignStyle = function(c) {
        const align = c.align || 'left';
        return {'text-align': align};
    };

    // Table headers
    const theadElem = $('<thead>').appendTo(tableElem);
    const headRowElem = $('<tr>').appendTo(theadElem);
    for(const c of options.columns) {
        let title = c.title;
        if (!title) {
            title = c.key.substr(0, 1).toUpperCase() + c.key.substr(1);
        }
        $('<th>').css(alignStyle(c)).html(title).appendTo(headRowElem);
    }

    // Table data
    const tbodyElem = $('<tbody>').appendTo(tableElem);
    for(const d of data) {
        const rowElem = $('<tr>').appendTo(tbodyElem);

        for(const c of options.columns) {
            let s = '&nbsp;';

            if (c.onlyCheckmark && d[c.key]) {
                s = '&check;';
            }
            else
            if (c.checkmark && d[c.key] === true) {
                s = '&check;';
            }
            else
            if (d[c.key]) {
                if (c.map && c.map[d[c.key]]) {
                    s = c.map[d[c.key]];
                }
                else
                if (c.useShortName) {
                    s = tableGenerator.getShortName(d[c.key]);
                }
                else
                if (c.capitalizeValue) {
                    s = d[c.key].substr(0, 1).toUpperCase() + d[c.key].substr(1);
                }
                else {
                    s = d[c.key];
                }
            }

            const cellElem = $('<td>').css(alignStyle(c)).appendTo(rowElem);

            if (c.linkKey && d[c.linkKey]) {
                let link = d[c.linkKey];

                const linkPrefix = 'https://docs.particle.io';
                if (link.startsWith(linkPrefix)) {
                    link = link.substring(linkPrefix.length);
                }
                $('<a>').attr('href', link).html(s).appendTo(cellElem);
            }
            else {
                cellElem.html(s);
            }
        }
    }

    return tableElem;
};
