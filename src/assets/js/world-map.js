const worldMapGlobal = {
    // Names are limited to SVG defs element id names: 
    // Letters (A-Z, a-z), numbers (0-9), underscores (_), hyphens (-), and periods (.)
    // IDs cannot start with a number, a period, or a hyphen
    colorNames: {
		'ParticleBlue_400': '#5CECFF', 
		'ParticleBlue_500': '#00E1FF',
		'ParticleBlue_600': '#00D2E6', 
		'ParticleBlue_700': '#00A3B3', 
		'ParticleBlue_800': '#007580', 
		'ParticleBlue_900': '#004F57', 
		'Watermelon_500': '#FF6E8A',
		'White_0': '#FFFFFF',
		'Gray_100': '#F5F6FA',
		'Gray_200': '#E2E4EB',
		'Gray_300': '#BBBDC4',
		'Gray_400': '#858A9B',
		'Midnight_300': '#175676',
		'Midnight_400': '#01466C',
		'Midnight_500': '#00334F',
		'Midnight_600': '#002438',
		'Midnight_700': '#001928',
		'Midnight_800': '#01131D',
		'Midnight_900': '#010D14',
		'Sky_400': '#E6F6FA',
		'Sky_500': '#D9F2F7',
		'Sky_600': '#AFE4EE',
		'Sky_700': '#85D6E5',
		'Sky_800': '#5BC8DC',
		'Sky_900': '#2BB1CA',
		'Watermelon_400': '#FFADBD',
		'Watermelon_500': '#FF6E8A',
		'Watermelon_600': '#FF5979',
		'Watermelon_700': '#FF244E',
		'Watermelon_800': '#EB002D',
		'Watermelon_900': '#B80023',
		'Mint_400': '#D1F0E0',
		'Mint_500': '#B0E5C9',
		'Mint_600': '#89E2B3',
		'Mint_700': '#5FD898',
		'Mint_800': '#36CE7E',
		'Mint_900': '#27A060',
		'Tangerine_400': '#FF9F61',
		'Tangerine_500': '#FF802E',
		'Tangerine_600': '#FA6200',
		'Tangerine_700': '#C74E00',
		'Tangerine_800': '#943A00',
		'Tangerine_900': '#612600',
		'State_Green_500': '#78ECB0',
		'State_Orange_500': '#FFBC80',
		'State_Orange_600': '#FF993D',
		'State_Yellow_500': '#FFE949',
		'State_Yellow_600': '#FAD51D',
		'State_Red_500': '#FF6F76',
		'State_Red_600': '#F45151',
		'Scale_Good_Teal': '#01DBC5',
		'Scale_Fair_Teal': '#94F0E5',
		'Scale_Poor_Violet': '#BA70C6',
		'Scale_Bad_Violet': '#841D95',
	},
    optionDefaults: {
        fillColor: 'Gray_200',
        swatchWidth: 40,
        swatchHeight: 40,
        legendFont: 'Arial',
        legendFontSize: '30',
        legendFontY: -6,
        legendItemSeparation: 20,
    },
    styleDefaults: {
        width: 15,
        height: 15,
        patternUnits: 'userSpaceOnUse',
        hatchStrokeColor: '#000000',
        hatchStrokeWidth: 2,
    },
    // Valid values for a style's .hatch (besides undefined/'' for no hatch)
    hatchTypes: ['forward', 'backward', 'cross'],
};

// Builds a styles array containing, for each color in colors, one plain (unhatched)
// style followed by one style per worldMapGlobal.hatchTypes entry. Returns
// { styles, getStyleIndex } where getStyleIndex(colorIndex, hatch) maps a color
// index and a hatch value ('forward'/'backward'/'cross'/undefined/'') back to the
// matching index into styles, for use with worldMapInstance.setCountryColor().
worldMapGlobal.createHatchStyles = function(colors, extraOptions) {
    const hatchVariants = [undefined, ...worldMapGlobal.hatchTypes];

    const styles = [];
    colors.forEach(function(color) {
        hatchVariants.forEach(function(hatch) {
            const style = Object.assign({}, extraOptions, { color });
            if (hatch) {
                style.hatch = hatch;
            }
            styles.push(style);
        });
    });

    const getStyleIndex = function(colorIndex, hatch) {
        let hatchOffset = 0;
        if (hatch) {
            const hatchIndex = worldMapGlobal.hatchTypes.indexOf(hatch);
            if (hatchIndex >= 0) {
                hatchOffset = hatchIndex + 1;
            }
        }
        return colorIndex * hatchVariants.length + hatchOffset;
    };

    return { styles, getStyleIndex };
}
const SVG_NS = 'http://www.w3.org/2000/svg';

// Environment-independent core. Used by both the browser (initWorldMap, below) and
// node.js (scripts/world-map/world-map-static.js), which differ only in how the SVG
// document is parsed, how text is measured, and how the result is delivered.
//
// options: see initWorldMap. Defaults are filled in by this function.
// env:
//  .svgDoc     a parsed Document of the base world map SVG (DOMParser or jsdom)
//  .measureText(text, options) function returning { width, height } for legend text
worldMapGlobal.createInstance = function(options, env) {
    const worldMapInstance = {
        options,
        worldMapGlobal,
        fillOverrides: [],
    };

    // Fill in option default values
    for(const key in worldMapGlobal.optionDefaults) {
        if (typeof options[key] == 'undefined') {
            options[key] = worldMapGlobal.optionDefaults[key];
        }
    }

    // Fill in style default values
    for(const style of options.styles) {
        for(const key in worldMapGlobal.styleDefaults) {
            if (typeof style[key] == 'undefined') {
                style[key] = worldMapGlobal.styleDefaults[key];
            }
        }
    }

    const svgDoc = env.svgDoc;
    const createElem = function(name) {
        return svgDoc.createElementNS(SVG_NS, name);
    };

    worldMapInstance.generateId = function(style) {
        let id = style.color;
        if (typeof id != 'string' || id == '') {
            // Most commonly this will be undefined, but the test above will catch that and other edge cases
            id = worldMapInstance.options.fillColor;
        }
        
        if (id.startsWith('#')) {
            id = 'color-' + id.substring(1);
        }
        if (style.hatch) {
            id += '-' + style.hatch;
        }
        return id;
    }

    worldMapInstance.getDefsId = function(style) {
        return 'url(#' + worldMapInstance.generateId(style) + ')';
    }

    worldMapInstance.getColor = function(color) {
        if (typeof color != 'string' || color == '') {
            // Most commonly this will be undefined, but the test above will catch that and other edge cases
            color = worldMapInstance.options.fillColor;
        }
        if (!color.startsWith('#')) {
            // Named color like ParticleBlue_500 (this also resolves options.fillColor, itself a named color)
            color = worldMapGlobal.colorNames[color];
        }
        // else css hex color like #00E1FF
        
        return color;
    }

    worldMapInstance.generatePatternElem = function(style) {
        const patternElem = createElem('pattern');

        patternElem.setAttribute('id', worldMapInstance.generateId(style));
        patternElem.setAttribute('width', style.width); // Default: 20
        patternElem.setAttribute('height', style.height); // Default: 20
        patternElem.setAttribute('patternUnits', style.patternUnits); // Default: userSpaceOnUse
        
        const rectElem = createElem('rect');
        rectElem.setAttribute('width', style.width); // Default: 20
        rectElem.setAttribute('height', style.height); // Default: 20
        rectElem.setAttribute('stroke-width', 0);
        rectElem.setAttribute('fill', worldMapInstance.getColor(style.color)); 

        patternElem.append(rectElem);

        const appendLine = function(x1, y1, x2, y2, style) {
            const lineElem = createElem('line');

            lineElem.setAttribute('x1', x1);
            lineElem.setAttribute('y1', y1);
            lineElem.setAttribute('x2', x2);
            lineElem.setAttribute('y2', y2);
            lineElem.setAttribute('stroke', style.hatchStrokeColor);
            lineElem.setAttribute('stroke-width', style.hatchStrokeWidth);

            patternElem.append(lineElem);
        }

        if (style.hatch == 'backward' || style.hatch == 'cross') {
            appendLine(0, 0, style.width, style.height, style);
        }
        if (style.hatch == 'forward' || style.hatch == 'cross') {
            appendLine(0, style.height, style.width, 0, style);
        }

        return patternElem;
    }

    worldMapInstance.generateDefs = function() {
        const defsElem = createElem('defs');

        for(const style of options.styles) {
            defsElem.append(worldMapInstance.generatePatternElem(style));
        }
        return defsElem;
    }

    // Applies a style to every element of a country. Used for static maps; the browser 
    // overrides this to apply the style after the SVG has been inserted into the page.
    worldMapInstance.setCountryColor = function(isoCode, styleIndex) {
        const className = 'country-' + isoCode;
        worldMapInstance.fillOverrides.push(className);

        const elems = worldMapInstance.worldMapSvg.querySelectorAll('.' + className);
        for(const elem of elems) {
            elem.setAttribute('style', 'fill:' + worldMapInstance.getDefsId(options.styles[styleIndex]));
        }
    }

    worldMapInstance.generateLegend = function() {
        const viewbox = worldMapInstance.worldMapSvg.getAttribute('viewbox');

        const svgHeight = parseFloat(viewbox.split(' ')[3]);

        const gElem = createElem('g');

        let x = 10;

        for(const style of options.styles) {
            if (style.title) {
                const rectElem = createElem('rect');

                rectElem.setAttribute('x', x);
                rectElem.setAttribute('y', svgHeight - options.swatchHeight);
                rectElem.setAttribute('width', options.swatchWidth);
                rectElem.setAttribute('height', options.swatchHeight);
                rectElem.setAttribute('fill', worldMapInstance.getDefsId(style)); 

                gElem.append(rectElem);
                x += options.swatchWidth + 4;

                const dims = env.measureText(style.title, options);
                
                const textElem = createElem('text');
                textElem.setAttribute('x', x);
                textElem.setAttribute('y', svgHeight + options.legendFontY );
                textElem.setAttribute('font-family', options.legendFont);
                textElem.setAttribute('font-size', options.legendFontSize);
                textElem.classList.add('worldMapLegendText');
                textElem.textContent = style.title;
                worldMapInstance.worldMapSvg.append(textElem);

                x += dims.width + options.legendItemSeparation;
            }
        }
        worldMapInstance.worldMapSvg.append(gElem);
    }

    worldMapInstance.worldMapSvgDoc = svgDoc;

    // Update the map SVG
    worldMapInstance.worldMapSvg = svgDoc.querySelector('svg');

    worldMapInstance.worldMapSvg.classList.add('world-map');

    worldMapInstance.worldMapSvg.prepend(worldMapInstance.generateDefs());

    worldMapInstance.generateLegend();

    return worldMapInstance;
}

// Estimates text width without a layout engine, from Helvetica/Arial advance widths
// (units of 1/1000 em, ASCII 32-126). Good enough to space legend items in node.js.
worldMapGlobal.estimateTextWidth = function(text, fontSize) {
    const widths = [
        278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, // space - /
        556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556, // 0 - ?
        1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, // @ - O
        667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, // P - _
        333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, // ` - o
        556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584, // p - ~
    ];
    let total = 0;
    for(const ch of String(text)) {
        const code = ch.charCodeAt(0);
        total += (code >= 32 && code <= 126) ? widths[code - 32] : 556;
    }
    return total * parseFloat(fontSize) / 1000;
}

// Browser only from here on
if (typeof window != 'undefined') {

    async function initWorldMap(options) {
        // options
        //  .styles array of objects
        //    .title legend title
        //    .color name string ('Sky_700' or css color string '#85D6E5')
        //    .hatch hatch style (optional)
        //  .fillColor ('Sky_700' or css color string '#E2E4EB')
        //  .containerElem the element to insert the SVG into

        // hatch styles:
        // 'forward' (like forwards slash /)
        // 'backward' (like back slash \)
        // 'cross'

        if (!worldMapGlobal.initPromise) {
            worldMapGlobal.initPromise = new Promise(function(resolve, reject) {
                worldMapGlobal.initPromiseResolve = resolve;
                worldMapGlobal.initPromiseReject = reject;

                worldMapGlobal.init();
            });        
        }

        await Promise.all([worldMapGlobal.initPromise, datastore.init()]);

        const measureText = function(text, options) {
            const svg = document.createElementNS(SVG_NS, "svg");
            svg.style.position = "absolute";
            svg.style.visibility = "hidden";
            svg.style.top = "-9999px";

            const textElem = document.createElementNS(SVG_NS, "text");
            textElem.setAttribute('font-family', options.legendFont);
            textElem.setAttribute('font-size', options.legendFontSize);
            textElem.textContent = text;

            svg.appendChild(textElem);
            document.body.appendChild(svg);

            const { width, height } = textElem.getBBox();

            document.body.removeChild(svg);

            return { width, height };        
        };

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(worldMapGlobal.svgText, 'image/svg+xml');

        const worldMapInstance = worldMapGlobal.createInstance(options, { svgDoc, measureText });

        worldMapInstance.removeFill = function() {
            if (worldMapInstance.fillOverrides) {
                const svgElem = $('.familyMapDiv > svg ');
                for(const className of worldMapInstance.fillOverrides) {
                    $(svgElem).find('.' + className).css('fill', options.fillColor);
                }
            }
            worldMapInstance.fillOverrides = [];
        }

        // Unlike the static version, the SVG is already in the page when this is called
        worldMapInstance.setCountryColor = function(isoCode, styleIndex) {
            const className = 'country-' + isoCode;
            worldMapInstance.fillOverrides.push(className);

            $(options.containerElem).find('.' + className).css('fill', worldMapInstance.getDefsId(options.styles[styleIndex]));        
        }

        worldMapInstance.getSvgText = function() {
            const containerElem = document.createElement('root');

            containerElem.append(worldMapInstance.worldMapSvg);

            return containerElem.getHTML();
        }

        $(options.containerElem).append(worldMapInstance.getSvgText());

        return worldMapInstance;
    }

    worldMapGlobal.init = async function() {
        const fetchRes = await fetch('/assets/images/world-map.svg');
        worldMapGlobal.svgText = await fetchRes.text();

        worldMapGlobal.initPromiseResolve();
    }

    window.initWorldMap = initWorldMap;
}

if (typeof module != 'undefined' && module.exports) {
    module.exports = worldMapGlobal;
}
