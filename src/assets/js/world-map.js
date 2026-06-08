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
        swatchWidth: 16,
        swatchHeight: 16,
        legendFont: 'Arial',
        legendFontSize: '24',
        legendFontY: -2,
    },
    styleDefaults: {
        width: 20,
        height: 20,
        strokeWidth: 1,
        patternUnits: 'userSpaceOnUse',
        hatchStrokeColor: '#404040',
        hatchStrokeWidth: 1,
    },
};
	

async function initWorldMap(options) {
    const worldMapInstance = {
        options,
        worldMapGlobal,
        fillOverrides: [],
    };

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

    worldMapInstance.getColor = function(color) {
        if (typeof color != 'string' || color == '') {
            // Most commonly this will be undefined, but the test above will catch that and other edge cases
            color = worldMapInstance.options.fillColor;
        }
        else
        if (!color.startsWith('#')) {
            // Named color like ParticleBlue_500
            color = worldMapGlobal.colorNames[color];
        }
        // else css hex color like #00E1FF
        
        return color;
    }

    worldMapInstance.generatePatternElem = function(style) {
        const patternElem = document.createElement('pattern');

        patternElem.setAttribute('id', worldMapInstance.generateId(style));
        patternElem.setAttribute('width', style.width); // Default: 20
        patternElem.setAttribute('height', style.height); // Default: 20
        patternElem.setAttribute('patternUnits', style.patternUnits); // Default: userSpaceOnUse
        
        const rectElem = document.createElement('rect');
        rectElem.setAttribute('width', style.width); // Default: 20
        rectElem.setAttribute('height', style.height); // Default: 20
        rectElem.setAttribute('fill', worldMapInstance.getColor(style.color)); 

        patternElem.append(rectElem);

        const appendLine = function(x1, y1, x2, y2, style) {
            const lineElem = document.createElement('line');

            lineElem.setAttribute('x1', x1);
            lineElem.setAttribute('y1', y1);
            lineElem.setAttribute('x2', x2);
            lineElem.setAttribute('y2', y2);
            lineElem.setAttribute('stroke', style.hatchStrokeColor);
            lineElem.setAttribute('strokeWidth', style.hatchStrokeWidth);

            patternElem.append(lineElem);
        }

        if (style.hatch == 'backward' || style.hatch == 'cross') {
            appendLine(0, 0, style.width, style.height, style);
        }
        if (style.hatch == 'forward' || style.hatch == 'cross') {
            appendLine(style.width, style.height, 0, 0, style);
        }

        return patternElem;
    }

    worldMapInstance.generateDefs = function() {
        const defsElem = document.createElement('defs');

        for(const style of options.styles) {
            const patternElem = worldMapInstance.generatePatternElem(style);
            $(defsElem).append(patternElem)
        }
        return defsElem;
    }


    worldMapInstance.removeFill = function() {
        if (worldMapInstance.fillOverrides) {
            const svgElem = $('.familyMapDiv > svg ');
            for(const className of worldMapInstance.fillOverrides) {
                $(svgElem).find('.' + className).css('fill', options.fillColor);
            }
        }
        worldMapInstance.fillOverrides = [];
    }

    worldMapInstance.getSvgText = function() {
        const containerElem = document.createElement('root');

        containerElem.append(worldMapInstance.worldMapSvg);

        return containerElem.getHTML();
    }
    
    const parser = new DOMParser();
    worldMapInstance.worldMapSvgDoc = parser.parseFromString(worldMapGlobal.svgText, 'image/svg+xml');

    // Update the map SVG
    worldMapInstance.worldMapSvg = worldMapInstance.worldMapSvgDoc.querySelector('svg');

    worldMapInstance.worldMapSvg.classList.add('world-map');

    const defsElem = worldMapInstance.generateDefs();
    worldMapInstance.worldMapSvg.prepend(defsElem.cloneNode(true));
    
    // Generate legend TODO: refactor this
    
    {
        const viewbox = worldMapInstance.worldMapSvg.getAttribute('viewbox');

        const svgWidth = parseFloat(viewbox.split(' ')[2]);
        const svgHeight = parseFloat(viewbox.split(' ')[3]);

        const gElem = document.createElement('g');


        let x = 10;

        for(const style of options.styles) {
            if (style.title) {
                const rectElem = document.createElement('rect');

                rectElem.setAttribute('x', x);
                rectElem.setAttribute('y', svgHeight - options.swatchHeight);
                rectElem.setAttribute('width', options.swatchWidth);
                rectElem.setAttribute('height', options.swatchHeight);
                rectElem.setAttribute('fill', worldMapInstance.getColor(style.color)); 

                gElem.append(rectElem);
                x += 20;
            }
        }
        worldMapInstance.worldMapSvg.append(gElem);

        const textElem = document.createElement('text');
        textElem.setAttribute('x', x);
        textElem.setAttribute('y', svgHeight + options.legendFontY );
        textElem.setAttribute('font-family', options.legendFont);
        textElem.setAttribute('font-size', options.legendFontSize);
        textElem.classList.add('worldMapLegendText');
        textElem.textContent = 'This is a test';
        worldMapInstance.worldMapSvg.append(textElem);
    }
        

    console.log('worldMapInstance.worldMapSvg', worldMapInstance.worldMapSvg);

    // Generate hatch swatches for the legend, if necessary
    /*
        for(const style of worldMapInstance.extraStyles) {
            const styleId = worldMapInstance.generateId(style);
            const swatchId = 'swatch-' + styleId;
            console.log('swatchId=' + swatchId);

            // TODO: Restrict this to a container element
            $('.' + swatchId).each(function() {
                console.log('swatch element', this);
            });

            const svgElem = document.createElement('svg');
            svgElem.setAttribute('width', options.swatchWidth);
            svgElem.setAttribute('height', options.swatchHeight);
            svgElem.append(defsElem);

            const rectElem = document.createElement('rect');
            rectElem.setAttribute('width', options.swatchWidth);
            rectElem.setAttribute('height', options.swatchHeight);
            rectElem.setAttribute('fill', 'url(#' + worldMapInstance.generateId(style) + ')' );
            

        }
    */

    return worldMapInstance;
}

worldMapGlobal.init = async function() {
    const fetchRes = await fetch('/assets/images/world-map.svg');
    worldMapGlobal.svgText = await fetchRes.text();

    worldMapGlobal.initPromiseResolve();
}

