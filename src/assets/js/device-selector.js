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

        const saveSettings = function() {
            let settings = {};

            for(const fn of deviceSelector.saveFunctions) {
                fn(settings);
            }

            console.log('saveSettings', settings);

            let query = '';
            let sep = '?';
            for(const key in settings) {
                const value = settings[key];
    
                query += sep + key + '=' + encodeURIComponent(value);
                sep = '&';
            }
            if (query && query != deviceSelector.lastQuery) {
                history.pushState(null, '', query);
                deviceSelector.lastQuery = query;
            }
    
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
                    let detailsElem;
                    if (questionObj.note.details) {
                        detailsElem = containerElem = document.createElement('details');
                        $(detailsElem).addClass('device-selector-details');
    
                        const summaryElem = document.createElement('summary');
                        $(summaryElem).text(questionObj.note.summary ? questionObj.note.summary : 'Additional information');
                        $(detailsElem).append(summaryElem);    
                    }
                    
                    const url = notesUrlBase + questionObj.note.file.replace('.md', '/index.html');

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
                        $(questionElem).append(detailsElem);
                    }
                    else {
                        $(questionElem).append(noteElem);
                    }
                }

                $(deviceSelector.elem).append(questionElem);
            }


            deviceSelector.answerElem = document.createElement('h2');
            $(deviceSelector.answerElem).text('Solutions');
            $(deviceSelector.elem).append(deviceSelector.answerElem);

        }

        const loadQuerySettings = function() {
            for(const fn of deviceSelector.loadFunctions) {
                fn();
            }
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

            await renderQuestions();
    
            loadQuerySettings();
        }

        run();

    });
});