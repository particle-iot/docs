$(document).ready(function() {
    const parser = new DOMParser();

    let deviceSelector = {
    };

    $('.deviceSelector').each( function() {
        const thisPartial = $(this);

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
                console.log('skipped solution', solutionObj);
            }
        }

        const renderVariation = async function(solutionElem, variationObj, options) {

            const headerElem = document.createElement('h4');
            $(headerElem).text(variationObj.title);
            $(solutionElem).append(headerElem);


            if (variationObj.note) {
                await renderNote({noteObj: variationObj.note, containerElem: solutionElem});
            }

            // Render SKUs
            if (typeof variationObj.skus != 'undefined') {
                // const skuHeaderElem = document.createElement('h4');
                // $(skuHeaderElem).text('SKUs');
                // $(solutionElem).append(skuHeaderElem);

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
        }

        const renderSolutions = async function() {
            $(deviceSelector.answerInnerElem).empty();

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
            let checkSolutionOptions = {
                onlyGateway: false,
            };

            if (deviceSelector.settings.ptg === '1') {
                checkSolutionOptions.onlyGateway = true;

                const questionObj = deviceSelector.config.questions.find(e => e.id == 'pt');
                for(const optionsObj of questionObj.checkboxes) {
                    if (optionsObj.id != 'ptg' && deviceSelector.settings[optionsObj.id] === '1') {
                        checkSolutionOptions.onlyGateway = false;
                    }
                }
            }
            
            for(const solutionObj of deviceSelector.solutions) {
                if (solutionObj.variations) {
                    for(const variationObj of solutionObj.variations) {
                        checkSolution(variationObj, checkSolutionOptions);
                        if (variationObj.show) {
                            solutionObj.show = true;
                        }
                    }
                }
                else {
                    checkSolution(solutionObj, checkSolutionOptions);
                }
            }

            // Render solutions

            for(const solutionObj of deviceSelector.solutions) {
                if (!solutionObj.show) {
                    continue;
                }

                const solutionElem = document.createElement('div');

                const headerElem = document.createElement('h3');
                $(headerElem).text(solutionObj.title);
                $(solutionElem).append(headerElem);


                if (solutionObj.note) {
                    await renderNote({noteObj: solutionObj.note, containerElem: solutionElem});
                }

                if (solutionObj.variations) {
                    for(const variationObj of solutionObj.variations) {
                        if (variationObj.show) {
                            await renderVariation(solutionElem, variationObj, {});
                        }
                    }
                }
                else {
                    await renderVariation(solutionElem, solutionObj, {});
                }

 
                $(deviceSelector.answerInnerElem).append(solutionElem);
            }
        }
        
        const saveSettings = function() {
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
            renderSolutions();
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

                        $(checkboxElem).on('click', function() {
                            saveSettings();
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

                        $(radioElem).on('click', function() {
                            saveSettings();
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

        const expandSolutionVariations = function() {
            deviceSelector.solutions = [];

            const noCopyKeys = ['id', 'variations'];

            // Expand tags in variations
            for(const solutionObj of deviceSelector.config.solutions) {
                const newSolutionObj = Object.assign({}, solutionObj);

                if (newSolutionObj.variations) {
                    for(const variationObj of newSolutionObj.variations) {
                        for(const key in newSolutionObj) {
                            if (!noCopyKeys.includes(key)) {
                                if (typeof variationObj[key] == 'undefined') {
                                    variationObj[key] = newSolutionObj[key];
                                }
                            }
                        }
                    }
                }
                deviceSelector.solutions.push(newSolutionObj);
            }

            // Handle derivedFrom
            for(const solutionObj of deviceSelector.solutions) {
                if (solutionObj.derivedFrom) {
                    const baseSolutionObj = deviceSelector.solutions.find(e => e.id == solutionObj.derivedFrom);
                    if (baseSolutionObj) {
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

            console.log('deviceSelector.solutions', deviceSelector.solutions);

            /*
            // Old way; delete this code soon
            function processObj(parentObj, solutionObj) {
                let combinedObj = parentObj ? Object.assign({}, parentObj) : {};

                for(const key in solutionObj) {
                    if (deviceSelector.config.mergeSolutionKeys.includes(key)) {
                        if (Array.isArray(combinedObj[key])) {
                            let tempArray = [];
                            for(const item of combinedObj[key]) {
                                tempArray.push(item);
                            }
                            for(const item of solutionObj[key]) {
                                if (!tempArray.includes(item)) {
                                    tempArray.push(item);
                                }
                            }
                            combinedObj[key] = tempArray;
                        }
                        else {
                            combinedObj[key] = solutionObj[key];
                        }    
                    }
                    else {
                        combinedObj[key] = solutionObj[key];
                    }  
                }
                deviceSelector.solutions.push(combinedObj);              

                if (typeof solutionObj.variations != 'undefined') {
                    for(const variationSolutionObj of solutionObj.variations) {
                        processObj(combinedObj, variationSolutionObj)
                    }
                }
            }

            for(const solutionObj of deviceSelector.config.solutions) {
                processObj(null, solutionObj);
            }
                */
        }

        const loadQuerySettings = function() {
            for(const fn of deviceSelector.loadFunctions) {
                fn();
            }
            saveSettings();
        };


        window.addEventListener('popstate', function(event) {
            deviceSelector.urlParams = new URLSearchParams(window.location.search);
            
            loadQuerySettings();
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
    
            console.log('deviceSelector', deviceSelector);

            expandSolutionVariations();

            await renderQuestions();
    
            loadQuerySettings();

            await renderSolutions();
        }

        run();

    });
});