$(document).ready(function () {

    if ($('.apiHelperTroubleshooting').each(function() {
        const thisPartial = $(this);

        const gaCategory = 'troubleshootingTool';
        const notesUrlBase = '/notes/';
        const ticketFormDataUrl = '/assets/files/ticketForms.json';
        const decisionTreeUrl = '/assets/files/troubleshooting.json';

        const urlParams = new URLSearchParams(window.location.search);

        const baseTitle = document.title;

        let ticketForms;

        // Loaded from /assets/file/troubleshooting.json
        let decisionTree;
           
        let pageStack = [];

        const updateUrl = function() {
            let query = '?p=';
            for(const p of pageStack) {
                query += p.page + ','
            }
            history.pushState(null, '', query);
        }

        const isStatusVisible = function() {
            for(const p of pageStack) {
                if (p.statusVisible) {
                    return true;
                }
            }
            return false;
        }

        const clearPagesBelow = function(page) {
            for(let ii = 0; ii < pageStack.length; ii++) {
                if (pageStack[ii].page == page) {
                    $(pageStack[ii].pageDivElem).find('.apiHelperGiantButtonSelected').removeClass('apiHelperGiantButtonSelected');

                    for(let jj = ii + 1; jj < pageStack.length; jj++) {
                        $(pageStack[jj].pageDivElem).remove();
                    }
                    pageStack.splice(ii + 1);
                    break;
                }
            }
            updateUrl();
        };


        const showPage = async function(pageOptions) {
            let pageObj = decisionTree.find(e => e.page == pageOptions.page);
            if (!pageObj) {
                pageObj = ticketForms.ticketForms.find(e => e.id == pageOptions.page);
                if (pageObj) {
                    pageObj.ticketForm = pageOptions.page;
                }
            }
            if (!pageObj) {
                ga('send', 'event', gaCategory, 'invalidPage', pageOptions.page);
                return false;
            }
            if (pageStack.find(e => e.page == pageOptions.page)) {
                ga('send', 'event', gaCategory, 'pageLoop', pageOptions.page);
                return false;
            }

            ga('send', 'event', gaCategory, 'showPage', pageOptions.page);

            const pageDivElem = document.createElement('div');
            $(pageDivElem).data('page', pageOptions.page);
            $(pageDivElem).addClass('apiHelperTroubleshootingPage');

            let fields = [];
            let submitButton;
            let conditionSelected = true;

            const validateForm = function() {
                let isValid = true;

                for(const field of fields) {
                    if (field.fieldSpecObj.required) {
                        if (field.valElem) {
                            const v = $(field.valElem).val();
                            if (Array.isArray(v)) {
                                if (v.length == 0 || v[0] == '-') {
                                    isValid = false;
                                    break;    
                                }
                            }
                            else
                            if (v.trim() == '') {
                                isValid = false;
                                break;
                            }
                        }
                    }
                }
                if (!conditionSelected) {
                    isValid = false;
                }

                $(submitButton).prop('disabled', !isValid);
            };

            const updateConditions = function() {
                if (!pageObj.conditions || pageObj.conditions.length == 0) {
                    return;
                }

                for(const conditionObj of pageObj.conditions) {
                    for(const childObj of conditionObj.child_fields) {
                        const childFieldObj = fields.find(e => e.customField == childObj.id);
                        $(childFieldObj.fieldDivElem).hide();                    
                    }
                }

                conditionSelected = false;

                for(const conditionObj of pageObj.conditions) {
                    const parentField = fields.find(e => e.customField == conditionObj.parent_field_id);
                    const val = $(parentField.valElem).val();
                    if (Array.isArray(val)) {
                        if (val.length != 1 || val[0] != '-') {
                            conditionSelected = true;
                        }
                    }
                    else
                    if (val != '-') {
                        conditionSelected = true;
                    }

                    if (val == conditionObj.value) {
                        for(const childObj of conditionObj.child_fields) {
                            const childFieldObj = fields.find(e => e.customField == childObj.id);
                            $(childFieldObj.fieldDivElem).show();                                                
                        }    
                    }
                }
                validateForm();
            };

            const addField = function(fieldSpecObj) {
                const fieldDivElem = document.createElement('div');
                $(fieldDivElem).addClass('apiHelperTroubleshootingField')
    
                let valElem;

                if (fieldSpecObj.title) {
                    const titleElem = document.createElement('div');
                    $(titleElem).text(fieldSpecObj.title);
                    $(fieldDivElem).append(titleElem);    
                }
    
                const entryElem = document.createElement('div');
                $(entryElem).addClass('apiHelperTroubleshootingInput');
                if (fieldSpecObj.type == 'text' || fieldSpecObj.type == 'integer') {
                    const inputElem = valElem= document.createElement('input');
                    $(inputElem).attr('type', 'text');
                    $(inputElem).attr('size', '60');
                    $(entryElem).append(inputElem);

                    if (fieldSpecObj.value) {
                        $(inputElem).val(fieldSpecObj.value);
                        $(inputElem).prop('readonly', true);
                    }

                    $(inputElem).on('input', validateForm);
                }
                else
                if (fieldSpecObj.type == 'textarea') {
                    const textareaElem = valElem = document.createElement('textarea');
                    $(textareaElem).attr('rows', '10');
                    $(textareaElem).attr('cols', '100');
                    $(entryElem).append(textareaElem);

                    $(textareaElem).on('input', validateForm);
                }
                else
                if (fieldSpecObj.type == 'tagger' || fieldSpecObj.type == 'multiselect') {
                    const selectElem = valElem = document.createElement('select');
                    if (fieldSpecObj.type == 'multiselect') {
                        $(selectElem).attr('multiple', true);
                        $(selectElem).addClass('apiHelperSelectMultiple');
                    }
                    else {
                        $(selectElem).addClass('apiHelperSelect');
                    }

                    let hasDefault = false;
                    for(f of fieldSpecObj.customFields) {
                        if (f.default) {
                            hasDefault = true;
                        }
                    }
                    if (!hasDefault) {
                        const optionElem = document.createElement('option');
                        $(optionElem).text('-');
                        $(optionElem).prop('value', '-')
                        $(optionElem).prop('selected', true);

                        $(selectElem).append(optionElem);
                    }

                    for(f of fieldSpecObj.customFields) {
                        const optionElem = document.createElement('option');
                        $(optionElem).text(f.name);
                        $(optionElem).prop('value', f.value)
                        // $(optionElem).data('valueId', f.id);

                        $(selectElem).append(optionElem);
                    }

                    $(entryElem).append(selectElem);

                    $(selectElem).on('change', function() {
                        updateConditions();
                    });

                }
                $(fieldDivElem).append(entryElem);
                
                if (fieldSpecObj.description) {
                    const descriptionElem = document.createElement('div');
                    $(descriptionElem).addClass('apiHelperTroubleshootingDescription');
                    $(descriptionElem).text(fieldSpecObj.description);
                    $(fieldDivElem).append(descriptionElem);
                }
                
    
                $(pageDivElem).append(fieldDivElem);    

                fields.push({
                    fieldSpecObj,
                    fieldDivElem,
                    valElem,
                    field: fieldSpecObj.field,
                    customField: fieldSpecObj.id,
                });
            }

            if (pageObj.title) {
                const titleElem = document.createElement('h3');
                $(titleElem).text(pageObj.title);
                $(pageDivElem).append(titleElem);    

                document.title = pageObj.title + ' - ' + baseTitle;
            }
            if (pageObj.description) {
                const descriptionElem = document.createElement('div');
                $(descriptionElem).text(pageObj.description);
                $(pageDivElem).append(descriptionElem);    
            }

            if (pageObj.note) {
                const url = notesUrlBase + pageObj.note.replace('.md', '/index.html');

                const noteFetch = await fetch(url);
                const html = await noteFetch.text();

                const noteElem = document.createElement('div');
                $(noteElem).html(html);
                $(pageDivElem).append(noteElem);
            }

            if (pageObj.ticketForm) {
                addField({
                    title: 'Email address',
                    type: 'text',
                    field: 'email',
                    required: true,
                    value: apiHelper.auth ? apiHelper.auth.username : undefined,
                });
            }

            if (pageObj.fields) {
                const ignoreFields = [
                    22020244, // subject
                    22020254, // description
                ];

                for(const fieldObj of pageObj.fields) {
                    const fieldSpecObj = ticketForms.ticketFields.find(e => e.id == fieldObj.id);
                    if (fieldSpecObj) {
                        if (!fieldObj.value) {
                            if (!ignoreFields.includes(fieldObj.id)) {
                                addField(fieldSpecObj);
                            }
                        }                    
                        else {
                            fields.push({
                                fieldSpecObj,
                                customField: fieldSpecObj.id,
                                value: fieldObj.value,
                            });    
                        }
                    }    
                }
            }

            if (pageObj.ticketForm) {
                addField({
                    title: 'Subject',
                    type: 'text',
                    field: 'subject',
                });
                addField({
                    title: 'Description',
                    type: 'textarea',
                    field: 'body',
                });

                const buttonElem = submitButton = document.createElement('button');
                $(buttonElem).text('Submit support request');
                $(pageDivElem).append(buttonElem);

                $(buttonElem).on('click', async function() {
                    $(buttonElem).prop('disabled');

                    let options = {
                        ticketFormId: pageObj.ticketForm
                    };

                    for(const field of fields) {
                        if (!$(field.valElem).is(':visible')) {
                            continue;
                        }

                        let val = '';
                        if (field.value) {
                            val = field.value;
                        }
                        else
                        if (field.valElem) {
                            val = $(field.valElem).val();
                        }
                        if (field.fieldSpecObj && field.fieldSpecObj.type == 'integer') {
                            val = parseInt(val);
                        }

                        if (field.field) {
                            options[field.field] = val;
                        }

                        if (field.fieldSpecObj.id) {
                            if (!options.customFields) {
                                options.customFields = [];
                            }
                            options.customFields.push({
                                id: field.fieldSpecObj.id,
                                value: val
                            });
                        }
                    }

                    console.log('options', options);

                    try {
                        const resp = await apiHelper.ticketSubmit(options);
                        console.log('resp', resp);

                        ga('send', 'event', gaCategory, 'ticketSubmitSuccess', pageObj.ticketForm);
                        showPage({page: 105}); // Ticket submitted
                    }
                    catch(e) {
                        console.log('exception submitting ticket');
                        ga('send', 'event', gaCategory, 'ticketSubmitError', pageObj.ticketForm);
                        showPage({page: 106}); // Ticket error
                    }
                    

                });
            }


            if (pageObj.buttons) {
                for(const buttonObj of pageObj.buttons) {
                    if (buttonObj.orgRequired && !apiHelper.selectedOrg) {
                        continue;
                    }

                    const buttonElem = document.createElement('div');
                    $(buttonElem).addClass('apiHelperGiantButton');
                    if (!buttonObj.detail) {
                        $(buttonElem).text(buttonObj.title);
                    }
                    else {
                        // Has multi-line button
                        const topElem = document.createElement('div');
                        $(topElem).text(buttonObj.title);
                        $(buttonElem).append(topElem);

                        const bottomElem = document.createElement('div');
                        $(bottomElem).addClass('apiHelperGiantButtonDetail');
                        $(bottomElem).text(buttonObj.detail);
                        $(buttonElem).append(bottomElem);
                        
                    }

                    if (pageOptions.next && pageOptions.next == buttonObj.page) {
                        $(buttonElem).addClass('apiHelperGiantButtonSelected');
                    }

                    if (buttonObj.swatch) {
                        const swatchElem = document.createElement('div');
                        $(swatchElem).addClass('apiHelperGiantButtonSwatch');
                        $(swatchElem).css('background-color', buttonObj.swatch);
                        $(buttonElem).append(swatchElem);

                        
                    }
 
                    $(buttonElem).on('click', function() {
                        clearPagesBelow(pageOptions.page);
                        $(buttonElem).addClass('apiHelperGiantButtonSelected');

                        if (buttonObj.loginService) {
                            const curPage = window.location.href;
                            ga('send', 'event', gaCategory, 'loginService', buttonObj.loginService);
                            window.location.href = 'https://login.particle.io/' + buttonObj.loginService + '?redirect=' + curPage;                        
                        }
                        else
                        if (buttonObj.page) {
                            showPage({page: buttonObj.page});
                        }
                        else
                        if (buttonObj.url) {
                            ga('send', 'event', gaCategory, 'buttonUrl', buttonObj.url);
                            window.location.href = buttonObj.url;                        
                        }
                    });

                    $(pageDivElem).append(buttonElem);
                }    
            }

            let statusVisible = false;

            if (pageObj.showStatus && !isStatusVisible()) {
                statusVisible = true;

                const iframeElem = document.createElement('iframe');
                $(iframeElem).attr('src', 'https://status.particle.io');
                $(iframeElem).attr('title', 'Particle status page');
                $(iframeElem).attr('width', '800');
                $(iframeElem).attr('height', '500');
                $(pageDivElem).append(iframeElem);
            }


            $(thisPartial).append(pageDivElem);

            pageStack.push({
                page: pageOptions.page,
                pageObj,
                pageDivElem,
                statusVisible,
            });

            
            // Enable buttons on the new page
            validateForm();
            updateConditions();

            // Scroll new page into view
            const pos = $(pageDivElem).position().top;
            $('.content-inner').scrollTop(pos);
            
            updateUrl();

            return true;
        };

        const loadPath = async function(path) {
            let loadedPage = false;

            for(let ii = 0; ii < path.length; ii++) {
                const page = path[ii];
                const next = ((ii + 1) < path.length) ? path[ii + 1] : undefined;

                const res = await showPage({page, next});
                if (!res) {
                    break;
                }
                loadedPage = false;
            }    
            return loadedPage;
        };

        const run = async function() {
            const decisionTreeFetch = await fetch(decisionTreeUrl);
            const formsFetch = await fetch(ticketFormDataUrl);

            decisionTree = await decisionTreeFetch.json();
            ticketForms = await formsFetch.json();

            if (apiHelper.auth) {
                // Have a token, verify it
                let showDefaultPage = true;

                const pageListStr = urlParams.get('p');
                if (pageListStr) {
                    let loadPages = [];
                    for(const p of pageListStr.split(',')) {
                        if (p != '') {
                            loadPages.push(parseInt(p));
                        }
                    }

                    if (loadPages.length == 1) {
                        let pageObj = decisionTree.find(e => e.page == loadPages[0]);
                        if (pageObj.paths) {
                            showDefaultPage = !loadPath(pageObj.paths[0]); 
                        }
                    }
                    else
                    if (loadPages.length > 1 || loadPages[0] != 100) {
                        // Not the no auth page
                        showDefaultPage = !loadPath(loadPages); 
                    }
                }

                if (showDefaultPage) {
                    await showPage({page: 101});
                }
            }
            else {
                // No token
                await showPage({page: 100});
            }
    
        };
        run();


    }));
});
