// Generates static SVG world maps from node.js, using the same code as the browser-based
// maps (src/assets/js/world-map.js) with jsdom providing the DOM.
//
// const { generateWorldMapSvg, writeWorldMapSvg } = require('./world-map-static');
//
// options:
//  .styles array of style objects, in the same format as initWorldMap():
//      .title legend title (optional; styles without a title are not shown in the legend)
//      .color named color ('Sky_700') or css color ('#85D6E5'), or omit for the default fill color
//      .hatch 'forward', 'backward', or 'cross' (optional)
//  .countries array of { isoCode, style } where style is an index into .styles 
//      (or one of the objects in .styles). Country codes that are not on the map are skipped,
//      or throw an error if .strict is true.
//  .fillColor default country fill color (optional)
//  .legendTextColor legend text color, named or css (default Midnight_700)
//  Other options in worldMapGlobal.optionDefaults (legendFont, swatchWidth, etc.) may also be set.
//
// generateWorldMapSvg(options) returns the SVG as a string.
// writeWorldMapSvg(options, destPath) also writes it to destPath (creating directories as needed).

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const worldMapGlobal = require('../../src/assets/js/world-map.js');

const baseSvgPath = path.join(__dirname, '..', '..', 'src', 'assets', 'images', 'world-map.svg');

let baseSvgText;

function parseBaseSvg() {
    if (!baseSvgText) {
        baseSvgText = fs.readFileSync(baseSvgPath, 'utf8');
    }
    // A new document is needed for every map, as the instance modifies it
    return new JSDOM(baseSvgText, { contentType: 'image/svg+xml' }).window.document;
}

function generateWorldMapSvg(options) {
    if (!Array.isArray(options.styles)) {
        throw new Error('generateWorldMapSvg: styles must be an array');
    }

    // Don't modify the caller's objects, defaults get filled in
    const styles = options.styles.map(style => Object.assign({}, style));

    const instanceOptions = Object.assign({}, options, { styles });
    delete instanceOptions.countries;

    const env = {
        svgDoc: parseBaseSvg(),
        measureText: function(text, opts) {
            return { 
                width: worldMapGlobal.estimateTextWidth(text, opts.legendFontSize), 
                height: parseFloat(opts.legendFontSize),
            };
        },
    };

    const instance = worldMapGlobal.createInstance(instanceOptions, env);

    for(const countryObj of options.countries || []) {
        let styleIndex = countryObj.style;
        if (typeof styleIndex == 'object') {
            styleIndex = options.styles.indexOf(styleIndex);
        }
        if (!Number.isInteger(styleIndex) || styleIndex < 0 || styleIndex >= styles.length) {
            throw new Error('generateWorldMapSvg: invalid style ' + JSON.stringify(countryObj.style) + ' for country ' + countryObj.isoCode);
        }
        if (!instance.worldMapSvg.querySelector('.country-' + countryObj.isoCode)) {
            // Some countries in the carrier database (small territories) have no shape on the map
            if (options.strict) {
                throw new Error('generateWorldMapSvg: country ' + countryObj.isoCode + ' not found in the world map');
            }
            continue;
        }
        instance.setCountryColor(countryObj.isoCode, styleIndex);
    }

    // In the browser the legend text color comes from the page's CSS (.worldMapLegendText)
    const legendTextColor = instance.getColor(options.legendTextColor || 'Midnight_700');
    for(const textElem of instance.worldMapSvg.querySelectorAll('.worldMapLegendText')) {
        textElem.setAttribute('fill', legendTextColor);
    }

    // The base map has lowercase viewbox/baseprofile, which only works when the SVG is inlined in
    // an HTML page. Standalone SVG (such as in an img tag) is case sensitive.
    const svgElem = instance.worldMapSvg;
    for(const [lower, proper] of [['viewbox', 'viewBox'], ['baseprofile', 'baseProfile']]) {
        if (svgElem.hasAttribute(lower)) {
            svgElem.setAttribute(proper, svgElem.getAttribute(lower));
            svgElem.removeAttribute(lower);
        }
    }

    return svgElem.outerHTML + '\n';
}

function writeWorldMapSvg(options, destPath) {
    const svg = generateWorldMapSvg(options);

    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, svg);

    return svg;
}

module.exports = {
    generateWorldMapSvg,
    writeWorldMapSvg,
    worldMapGlobal,
};
