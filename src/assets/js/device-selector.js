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
                const questionElem = document.createElement('div');

                const headerElem = document.createElement('h3');
                $(headerElem).text(questionObj.title);
                $(questionElem).append(headerElem);

                for(const optionsObj of questionObj.options) {
                    const optionDivElem = document.createElement('div');

                    if (optionsObj.type == 'checkbox') {
                        const labelElem = document.createElement('label');
                        
                        const checkboxElem = document.createElement('input');
                        $(checkboxElem).attr('type', optionsObj.type);
                        $(checkboxElem).addClass('device-selector-checkbox');
                        $(labelElem).append(checkboxElem);

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
                        
                        $(optionDivElem).append(labelElem);
                    }
                    
                    $(questionElem).append(optionDivElem);
                }

                if (questionObj.note) {
                    const url = notesUrlBase + questionObj.note.replace('.md', '/index.html');

                    const noteFetch = await fetch(url);
                    const noteText = await noteFetch.text();                
    
                    const noteDocument = parser.parseFromString(noteText, 'text/html');
    
                    const noteElem = document.createElement('div');
                    const contentElem = $(noteDocument).find('.content');
                    $(contentElem).removeClass('content');
                    $(contentElem).addClass('device-selector-note');
                    $(noteElem).html(contentElem);
                    $(questionElem).append(noteElem);

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