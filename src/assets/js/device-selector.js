$(document).ready(function() {
    const parser = new DOMParser();

    // Include in content md:
    // includeDefinitions: [api-helper, device-selector, showdown]


    let deviceSelector = {
        context: {}, // Markdown context
    };

    $('.deviceSelector').each( function() {
        const thisPartial = $(this);

        if (deviceSelector.elem) {
            // Only one device selector allowed per page
            return;
        }

        deviceSelector.showdown = new showdown.Converter();                
        deviceSelector.showdown.setFlavor('github');

        const notesUrlBase = '/notes/';

        deviceSelector.elem = thisPartial;
        $(thisPartial).data('deviceSelector', deviceSelector);

        deviceSelector.urlParams = new URLSearchParams(window.location.search);

        deviceSelector.loadFunctions = [];
        deviceSelector.saveFunctions = [];
        deviceSelector.lastQuery = '';

        const renderNote = async function(options) {
            let detailsElem;
            if (options.options.noteObj.details) {
                detailsElem = containerElem = document.createElement('details');
                $(detailsElem).addClass('device-selector-details');

                const summaryElem = document.createElement('summary');
                $(summaryElem).text(options.noteObj.summary ? options.noteObj.summary : 'Additional information');
                $(detailsElem).append(summaryElem);    
            }
            
            const url = notesUrlBase + options.noteObj.file.replace('.md', '/index.html');

            const noteFetch = await fetch(url);
            const noteText = await noteFetch.text();                

            const noteDocument = parser.parseFromString(noteText, 'text/html');

            const noteElem = document.createElement('div');
            const contentElem = $(noteDocument).find('.content');
            $(contentElem).removeClass('content');
            $(contentElem).addClass('device-selector-note');
            $(noteElem).html(contentElem);

            if (detailsElem) {
                $(detailsElem).append(noteElem);
                $(options.containerElem).append(detailsElem);
            }
            else {
                $(options.containerElem).append(noteElem);
            }
        }

        const renderMd = function(options) {            
            // options
            //  .md text to render (Markdown format)
            //  .containerElem where to append the html div

            const expandedMd =  Handlebars.compile(options.md)(deviceSelector.context);

            const html = deviceSelector.showdown.makeHtml(expandedMd);

            const noteElem = document.createElement('div');
            $(noteElem).html(html);
            $(options.containerElem).append(noteElem);
        }

        const checkSolution = function(solutionObj, options) {
            solutionObj.show = true;

            for(const questionObj of deviceSelector.config.questions) {
                if (options.onlyGateway && !solutionObj.pt.includes('ptg')) {
                    solutionObj.show = false;
                    solutionObj.reasons.push('onlyGateway and solution is not ptg for ' + questionObj.id);
                }
                
                if (questionObj.checkboxes) {
                    let hasCheckbox = false;

                    for(const optionsObj of questionObj.checkboxes) {
                        if (deviceSelector.settings[optionsObj.id] === '1') {
                            hasCheckbox = true;
                            break;
                        }
                    }
                    
                    if (hasCheckbox) {
                        // User selected at least one option, so add rankings
                        let hasAny = false;

                        for(const optionsObj of questionObj.checkboxes) {
                            if (deviceSelector.settings[optionsObj.id] === '1') {
                                if (Array.isArray(solutionObj[questionObj.id]) && 
                                    solutionObj[questionObj.id].includes(optionsObj.id)) {
                                    hasAny = true;
                                }
                            }
                        }
                        if (questionObj.id == 'c' && deviceSelector.settings.ce === '1') {
                            // User has requested Ethernet
                            if (solutionObj.ceOptional) {
                                hasAny = true;
                            }
                        }

                        if (!hasAny) {
                            solutionObj.show = false;
                            solutionObj.reasons.push('not a solution for for ' + questionObj.id);
                        }
                    }
                    else {
                        // No checkbox checked, allow any answer
                    }
                }
                if (questionObj.radio) {
                    // Radio buttons always have an answer
                    if (questionObj.id == 'g' && deviceSelector.settings.g == 'gl') {
                        // Geolocation not needed, allow any 
                        solutionObj.reasons.push('geolocation not needed ' + questionObj.id);
                    }
                    else
                    if (Array.isArray(solutionObj[questionObj.id]) && solutionObj[questionObj.id].includes(deviceSelector.settings[questionObj.id])) {
                        solutionObj.reasons.push('radio question included' + questionObj.id);
                    }
                    else {
                        solutionObj.reasons.push('radio undefined for question=' + questionObj.id + ' value=' + deviceSelector.settings[questionObj.id]);
                        solutionObj.show = false;
                    }
                }
            }

            if (!solutionObj.show) {
                // console.log('skipped solution', solutionObj);
            }
        }

        const renderVariation = async function(solutionElem, solutionObj, variationObj, options) {

            deviceSelector.context.variation = variationObj;

            let title;
            if (variationObj.variationTitle && options.isVariation) {
                title = solutionObj.title + ' (' + variationObj.variationTitle + ')';

                const headerElem = document.createElement('h4');
                $(headerElem).text(title);
                $(solutionElem).append(headerElem);
            }
            else {
                title = variationObj.title;
            }
 
            if (variationObj.textMd) {    
                renderMd({md: variationObj.textMd, containerElem: solutionElem});
            }
            if (variationObj.note) {
                await renderNote({noteObj: variationObj.note, containerElem: solutionElem});
            }

            // Render SKUs

            if (typeof variationObj.skus != 'undefined') {
                const headerElem = document.createElement('h5');
                $(headerElem).text('SKUs - ' + title);
                $(solutionElem).append(headerElem);

                const tableElem = document.createElement('table');
                $(tableElem).addClass('apiHelperTableNoMargin')

                const columnInfo = [
                    {
                        title: 'SKU',
                        width: '100px',
                        key: 'name',
                    },
                    {
                        title: 'Description',
                        width: '350px',
                        key: 'desc',
                    },
                    {
                        title: 'Lifecycle',
                        width: '120px',
                        key: 'lifecycle',
                    },
                ];

                {
                    const theadElem = document.createElement('thead');
                    const trElem = document.createElement('tr');

                    for(const col of columnInfo) {
                        const tdElem = document.createElement('td');                                
                        $(tdElem).text(col.title);
                        $(trElem).append(tdElem);
                    }


                    $(theadElem).append(trElem);
                    $(tableElem).append(theadElem);    
                }

                const tbodyElem = document.createElement('tbody');

                for(const skuName of variationObj.skus) {
                    const skuObj = deviceSelector.carriersJson.skus.find(e => e.name == skuName);
                    if (!skuObj) {
                        continue;
                    }

                    const trElem = document.createElement('tr');

                    for(const col of columnInfo) {
                        const tdElem = document.createElement('td'); 
                        $(tdElem).css('width', col.width);
                        if (skuObj[col.key]) {
                            $(tdElem).text(skuObj[col.key]);
                        }
                        $(trElem).append(tdElem);
                    }

                    $(tbodyElem).append(trElem);
                }

                $(tableElem).append(tbodyElem);
                
                $(solutionElem).append(tableElem);
            }

            if (variationObj.countries.length > 0) {
                const headerElem = document.createElement('h5');
                $(headerElem).text('Supported countries (cellular) - ' + title);
                $(solutionElem).append(headerElem);
    
                const tableElem = document.createElement('table');
                $(tableElem).addClass('apiHelperTableNoMargin')

                const columnInfo = {
                    columns: 6,
                    columnWidth: '130px',
                    columnNum: -1,
                }

                const tbodyElem = document.createElement('tbody');

                for(const variationCountryObj of variationObj.countries) {
                    // TODO: Filtering by selected locations
                    
                    if (columnInfo.columnNum < 0) {
                        columnInfo.trElem = document.createElement('tr');
                        columnInfo.columnNum  = 0;
                    }
                    const tdElem = document.createElement('td'); 
                    $(tdElem).css('width', columnInfo.columnWidth);
                    $(tdElem).text(variationCountryObj.name);

                    $(columnInfo.trElem).append(tdElem);

                    if (++columnInfo.columnNum >= columnInfo.columns) {
                        $(tbodyElem).append(columnInfo.trElem);
                        columnInfo.trElem = null;
                        columnInfo.columnNum = -1;
                    }
                }

                if (columnInfo.trElem) {
                    $(tbodyElem).append(columnInfo.trElem);
                }

                $(tableElem).append(tbodyElem);
                $(solutionElem).append(tableElem);                
            }

        }

        const renderSolutions = async function() {
            $(deviceSelector.answerInnerElem).empty();

            deviceSelector.context.settings = deviceSelector.settings;

            // Clear the show selection flag
            for(const solutionObj of deviceSelector.solutions) {
                solutionObj.show = false;
                solutionObj.reasons = [];
                if (solutionObj.variations) {
                    for(const variationObj of solutionObj.variations) {
                        variationObj.show = false;
                        variationObj.reasons = [];
                    }
                }
            }

            // Check and see if we are only showing gateways
            let options = {
                onlyGateway: false,
            };

            if (deviceSelector.settings.ptg === '1') {
                options.onlyGateway = true;

                const questionObj = deviceSelector.config.questions.find(e => e.id == 'pt');
                for(const optionsObj of questionObj.checkboxes) {
                    if (optionsObj.id != 'ptg' && deviceSelector.settings[optionsObj.id] === '1') {
                        options.onlyGateway = false;
                    }
                }
            }

            {
                const questionObj = deviceSelector.config.questions.find(e => e.id == 'lo');
                
                let numChecked = 0;

                for(const optionsObj of questionObj.checkboxes) {
                    if (deviceSelector.settings[optionsObj.id] === '1') {
                        numChecked++;
                    }
                }

                options.filterLocation = (numChecked > 0) && (numChecked < questionObj.checkboxes.length);
            }

            deviceSelector.context.options = options;
            

            console.log('context', deviceSelector.context);

            // If variation is shown, also propagate the show flag up into the solution
            for(const solutionObj of deviceSelector.solutions) {
                if (solutionObj.variations) {
                    for(const variationObj of solutionObj.variations) {
                        checkSolution(variationObj, options);
                        if (variationObj.show) {
                            solutionObj.show = true;
                        }
                    }
                }
                else {
                    checkSolution(solutionObj, options);
                }
            }

            // Render solutions
            for(const solutionObj of deviceSelector.solutions) {
                if (!solutionObj.show) {
                    continue;
                }

                deviceSelector.context.solution = solutionObj;

                console.log('render solution ' + solutionObj.title, solutionObj);

                const solutionElem = document.createElement('div');

                const headerElem = document.createElement('h3');
                $(headerElem).text(solutionObj.title);
                $(solutionElem).append(headerElem);

                // Note
                if (solutionObj.textMd) {
                    renderMd({md: solutionObj.textMd, containerElem: solutionElem});
                }

                if (solutionObj.note) {
                    await renderNote({noteObj: solutionObj.note, containerElem: solutionElem});
                }

                // Image

                // Solution fit

                // Details (MCU, RAM, etc.)

                // Variations and SKUs
                options.isVariation = !!solutionObj.variations;

                if (solutionObj.variations) {
                    for(const variationObj of solutionObj.variations) {
                        if (variationObj.show) {
                            await renderVariation(solutionElem, solutionObj, variationObj, options);
                        }
                    }
                }
                else {
                    await renderVariation(solutionElem, solutionObj, solutionObj, options);
                }

 
                $(deviceSelector.answerInnerElem).append(solutionElem);
            }
        }
        
        const saveSettings = async function() {
            deviceSelector.settings = {};

            for(const fn of deviceSelector.saveFunctions) {
                fn(deviceSelector.settings);
            }

            let query = '';
            let sep = '?';
            for(const key in deviceSelector.settings) {
                const value = deviceSelector.settings[key];
    
                query += sep + key + '=' + encodeURIComponent(value);
                sep = '&';
            }
            if (query && query != deviceSelector.lastQuery) {
                history.pushState(null, '', query);
                deviceSelector.lastQuery = query;
            }
            await renderSolutions();
        }


        const renderQuestions = async function() {
            $(deviceSelector.elem).empty();

            const questionElem = document.createElement('h2');
            $(questionElem).text('Tell us about your project');
            $(deviceSelector.elem).append(questionElem);


            for(const questionObj of deviceSelector.config.questions) {
                const questionElem = questionObj.questionElem = document.createElement('div');

                const headerElem = document.createElement('h3');
                $(headerElem).text(questionObj.title);
                $(questionElem).append(headerElem);

                if (questionObj.checkboxes) {

                    for(const optionsObj of questionObj.checkboxes) {
                        const outerDivElem = document.createElement('div');
                        $(outerDivElem).addClass('device-selector-outer-checkbox-div');
                        
                        const topDivElem = document.createElement('div');

                        const labelElem = document.createElement('label');
                        
                        const checkboxElem = document.createElement('input');
                        $(checkboxElem).attr('type', 'checkbox');
                        $(checkboxElem).addClass('device-selector-checkbox');
                        $(labelElem).append(checkboxElem);
                        if (optionsObj.checked) {
                            $(checkboxElem).prop('checked', true);
                        }

                        $(checkboxElem).on('click', async function() {
                            await saveSettings();
                        });

                        deviceSelector.loadFunctions.push(function() {
                            const value = deviceSelector.urlParams.get(optionsObj.id);
                            $(checkboxElem).prop('checked', value === '1');    
                        });

                        deviceSelector.saveFunctions.push(function(settings) {
                            const checked = $(checkboxElem).prop('checked');

                            settings[optionsObj.id] = checked ? '1' : '0';
                        });

                        const textElem = document.createTextNode(optionsObj.title);
                        $(labelElem).append(textElem);
                        
                        $(topDivElem).append(labelElem);
                        $(outerDivElem).append(topDivElem);

                        if (optionsObj.description) {
                            const lowerDivElem = document.createElement('div');
                            $(lowerDivElem).addClass('device-selector-description');
                            $(lowerDivElem).text(optionsObj.description);
                            
                            $(outerDivElem).append(lowerDivElem);
                        }


                            
                        $(questionElem).append(outerDivElem);
                    }
                }
                
                if (questionObj.radio) {
                    deviceSelector.saveFunctions.push(function(settings) {
                        settings[questionObj.id] = $(questionElem).find('input:checked').val();
                    });

                    for(const optionsObj of questionObj.radio) {
                        const outerDivElem = document.createElement('div');
                        $(outerDivElem).addClass('device-selector-outer-checkbox-div');
                        
                        const topDivElem = document.createElement('div');

                        const labelElem = document.createElement('label');
                        
                        const radioElem = document.createElement('input');
                        $(radioElem).attr('type', 'radio');
                        $(radioElem).attr('name', questionObj.id);
                        $(radioElem).attr('value', optionsObj.id);
                        $(radioElem).addClass('device-selector-checkbox');
                        if (optionsObj.checked) {
                            $(radioElem).prop('checked', true);
                        }
                        $(labelElem).append(radioElem);

                        $(radioElem).on('click', async function() {
                            await saveSettings();
                        });

                        deviceSelector.loadFunctions.push(function() {
                            const value = deviceSelector.urlParams.get(questionObj.id);
                            if (value == optionsObj.id) {
                                $(radioElem).prop('checked', true);
                            }
                        });

                        const textElem = document.createTextNode(optionsObj.title);
                        $(labelElem).append(textElem);
                        
                        $(topDivElem).append(labelElem);
                        $(outerDivElem).append(topDivElem);

                        if (optionsObj.description) {
                            const lowerDivElem = document.createElement('div');
                            $(lowerDivElem).addClass('device-selector-description');
                            $(lowerDivElem).text(optionsObj.description);
                            
                            $(outerDivElem).append(lowerDivElem);
                        }


                            
                        $(questionElem).append(outerDivElem);
                    }
                }
                

                if (questionObj.textMd) {
                    renderMd({md: solutionObj.textMd, containerElem: questionElem});
                }

                if (questionObj.note) {
                    await renderNote({noteObj: questionObj.note, containerElem: questionElem});
                }

                $(deviceSelector.elem).append(questionElem);
            }

            deviceSelector.answerOuterElem = document.createElement('div');

            const headerElem = document.createElement('h2');
            $(headerElem).text('Solutions');
            $(deviceSelector.answerOuterElem).append(headerElem);

            deviceSelector.answerInnerElem = document.createElement('div');
            $(deviceSelector.answerOuterElem).append(deviceSelector.answerInnerElem);

            $(deviceSelector.elem).append(deviceSelector.answerOuterElem);

        }

        const cloneSolutionObj = function(solutionObj, options = {}) {
            const newSolutionObj = {};

            for(const key in solutionObj) {
                if (typeof options.noCopyKeys != 'undefined') {
                    if (options.noCopyKeys.includes(key)) {
                        continue;
                    }
                }

                if (Array.isArray(solutionObj[key])) {
                    const newArray = [];

                    for(const e of solutionObj[key]) {
                        if (typeof e == 'object') {
                            newArray.push(Object.assign({}, e));
                        }
                        else {
                            newArray.push(e);
                        }
                    }
                    newSolutionObj[key] = newArray;
                }
                else {
                    newSolutionObj[key] = solutionObj[key];
                }
            }
            return newSolutionObj;
        }

        const processDeviceSelectorJson = function() {
            // Fill in locations from carrier list
            const regionConfig = deviceSelector.carriersJson.regionGroups.find(e => e.id == 'device-selector');
            const locationObj = deviceSelector.config.questions.find(e => e.id == 'lo');
            for(const r of regionConfig.regions) {
                locationObj.checkboxes.push({
                    id: r.id,
                    title: r.name,
                    regions: r.regions,
                });
            }

            // Capture all of the question IDs
            deviceSelector.questionIds = [];
            for(const questionObj of deviceSelector.config.questions) {
                deviceSelector.questionIds.push(questionObj.id);
            }

            deviceSelector.solutions = [];

            // Duplicate so the copy can be modified
            for(const solutionObj of deviceSelector.config.solutions) {
                deviceSelector.solutions.push(cloneSolutionObj(solutionObj, {}));
            }

            // Handle derivedFrom
            for(const solutionObj of deviceSelector.solutions) {
                if (solutionObj.derivedFrom) {
                    let baseSolutionObj = deviceSelector.solutions.find(e => e.id == solutionObj.derivedFrom);
                    if (baseSolutionObj) {
                        // Duplicate it so the variations array is a copy so it can be modified
                        baseSolutionObj = cloneSolutionObj(baseSolutionObj, {});

                        // variations are copied for derivedFrom
                        const noCopyKeys = ['id'];

                        for(const key in baseSolutionObj) {
                            if (!noCopyKeys.includes(key)) {
                                if (typeof solutionObj[key] == 'undefined') {
                                    solutionObj[key] = baseSolutionObj[key];
                                }
                            }
                        }
                    }
                }
            }


            // Variation and regular fields (this must be done before expanding tags in variations)
            for(const solutionObj of deviceSelector.solutions) {

                const variationKeys = [];
                for(const array of [solutionObj.variations, solutionObj.locationVariations]) {
                    if (typeof array != 'undefined') {
                        for(const variationObj of array) {
                            for(const key in variationObj) {
                                if (deviceSelector.questionIds.includes(key)) {
                                    if (!variationKeys.includes(key)) {
                                        variationKeys.push(key);
                                    }    
                                }
                            }
                        }
                    }
                }

                const keys = [];
                for(const key in solutionObj) {
                    if (solutionObj) {
                        if (deviceSelector.questionIds.includes(key)) {
                            if (!keys.includes(key) && !variationKeys.includes(key)) {
                                keys.push(key);
                            }
                        }
                    }
                }

                solutionObj.keys = keys;
                solutionObj.variationKeys = variationKeys;
            }            

            // Expand tags in variations
            for(const solutionObj of deviceSelector.solutions) {

                for(const array of [solutionObj.variations, solutionObj.locationVariations]) {
                    if (typeof array != 'undefined') {
                        const noCopyKeys = ['id', 'variations'];

                        for(const variationObj of array) {
                            for(const key in solutionObj) {
                                if (!noCopyKeys.includes(key)) {
                                    if (typeof variationObj[key] == 'undefined') {
                                        variationObj[key] = solutionObj[key];
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Combined list of SKUs per solution            
            for(const solutionObj of deviceSelector.solutions) {
                solutionObj.nonAccessorySkus = [];

                const skuArrays = [];

                for(const array of [solutionObj.variations, solutionObj.locationVariations]) {
                    if (typeof array != 'undefined') {
                        for(const variationObj of array) {
                            if (variationObj.skus) {
                                skuArrays.push(variationObj.skus);
                            }    
                        }                    
                    }
                }

                if (solutionObj.skus) {
                    skuArrays.push(solutionObj.skus);
                }

                for(const skuArray of skuArrays) {
                    for(const skuName of skuArray) {
                        const skuObj = deviceSelector.carriersJson.skus.find(e => e.name == skuName);
                        if (skuObj) {
                            if (!skuObj.accessory) {
                                if (!solutionObj.nonAccessorySkus.includes(skuName)) {
                                    solutionObj.nonAccessorySkus.push(skuName);
                                }
                            }
                        }    
                    }
                }

                // MCU information
                for(const skuName of solutionObj.nonAccessorySkus) {
                    const skuObj = deviceSelector.carriersJson.skus.find(e => e.name == skuName);
                    if (skuObj && skuObj.mcu) {
                        const mcuObj = deviceSelector.carriersJson.mcus.find(e => e.id == skuObj.mcu);
                        if (mcuObj) {
                            solutionObj.mcuObj = mcuObj;
                            break;
                        }
                    }
                }
            }


            // Calculate location variations based on SKUs
            for(const solutionObj of deviceSelector.solutions) {
                if (typeof solutionObj.locationVariations != 'undefined') {
                    // Convert to regular variations
                    solutionObj.variations = solutionObj.locationVariations;
                    delete solutionObj.locationVariations;

                    // Expand the lo key in variations. At this location, it will only
                    // execute for location variations.

                    for(const variationObj of solutionObj.variations) {
                        variationObj.countries = [];
                        variationObj.possibleCountries = 0;

                        for(const skuName of variationObj.skus) {
                            const skuObj = deviceSelector.carriersJson.skus.find(e => e.name == skuName);
                            if (skuObj) {
                                // const modemObj = deviceSelector.carriersJson.modems.find(e => e.model == skuObj.modem);

                                for(const cmsObj of deviceSelector.carriersJson.countryModemSim) {
                                    if (cmsObj.modem == skuObj.modem && cmsObj.sim == skuObj.sim) {
                                        // There is information about this country, mode, and sim
                                        
                                        const countryObj = deviceSelector.carriersJson.countries.find(e => e.name == cmsObj.country);

                                        if (cmsObj.recommendation == 'YES') {
                                            // This variation is recommended in this country

                                            // countryObj.regions: array of regions for this country
                                        
                                            

                                            for(const r1 of regionConfig.regions) {
                                                for(const r2 of r1.regions) {
                                                    if (countryObj.regions.includes(r2)) {
                                                        if (!variationObj.lo) {
                                                            variationObj.lo = [];
                                                            if (!solutionObj.variationKeys.includes('lo')) {
                                                                solutionObj.variationKeys.push('lo');
                                                            }
                                                        }

                                                        let variationCountryObj = variationObj.countries.find(e => e.name == cmsObj.country);
                                                        if (!variationCountryObj) {
                                                            variationCountryObj = {
                                                                name: cmsObj.country,
                                                                lo: [],
                                                            }
                                                            variationObj.countries.push(variationCountryObj);
                                                        }
                                                        if (!variationCountryObj.lo.includes(r1.id)) {
                                                            variationCountryObj.lo.push(r1.id);
                                                        }


                                                        if (!variationObj.lo.includes(r1.id)) {
                                                            variationObj.lo.push(r1.id);
                                                        }
                                                        break;
                                                    }
                                                } 
                                            }
                                            
                                        }
                                        else
                                        if (cmsObj.recommendation == 'POSS') {
                                            variationObj.possibleCountries++;
                                        }
                                    }
                                }
        
                            }
                        
                        }
                        variationObj.countries.sort((a, b) => a.name.localeCompare(b.name));
                    }   
                    
                }
            }

            console.log('deviceSelector.solutions', deviceSelector.solutions);

        }

        const loadQuerySettings = async function() {
            for(const fn of deviceSelector.loadFunctions) {
                fn();
            }
            await saveSettings();
        };


        window.addEventListener('popstate', async function(event) {
            deviceSelector.urlParams = new URLSearchParams(window.location.search);
            
            await loadQuerySettings();
        });


        const run = async function() {
            const promises = [];
    
            promises.push(new Promise(function(resolve, reject) {
                fetch('/assets/files/carriers.json')
                .then(response => response.json())
                .then(function(res) {
                    deviceSelector.carriersJson = res;
                    resolve();
                });        
            }));
    
            promises.push(new Promise(function(resolve, reject) {
                fetch('/assets/files/device-selector.json')
                .then(response => response.json())
                .then(function(res) {
                    deviceSelector.config = res;
                    resolve();
                });        
            }));
        
            await Promise.all(promises);
    
            processDeviceSelectorJson();

            console.log('deviceSelector', deviceSelector);

            await renderQuestions();
    
            // loadQuerySettings calls renderSolutions() via saveSettings()
            await loadQuerySettings();
        }

        run();

    });
});