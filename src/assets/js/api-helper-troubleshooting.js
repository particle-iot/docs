
$(document).ready(function () {

    const decisionTreeUrl = '/assets/files/troubleshooting.json';

    const redirectNote = async function(noteName) {
        const decisionTreeFetch = await fetch(decisionTreeUrl);

        const troubleshootingJson = await decisionTreeFetch.json();

        let page;
        for(const pageObj of troubleshootingJson.pages) {
            if (pageObj.note == noteName) {
                page = pageObj.page;
            }
        }

        if (page) {
            location.href = '/troubleshooting/troubleshooting/?p=' + page;
            return;
        }

    };

    const notePattern = /notes\/([^\/]+)/;
    const match = location.href.match(notePattern);
    if (match) {
        const noteName = match[1] + '.md';
        redirectNote(noteName);
    }

    if ($('.apiHelperTroubleshooting').each(function() {
        const thisPartial = $(this);

        const gaCategory = 'troubleshootingTool';
        const notesUrlBase = '/notes/';
        const ticketFormDataUrl = '/assets/files/ticketForms.json';
        const environmentUrl = '/assets/files/environment.json';

        let partialOptions = [];
        const partialOptionsStr = $(thisPartial).data('options');
        if (partialOptionsStr) {
            partialOptions = partialOptionsStr.split(',');
        }
         
        const urlParams = new URLSearchParams(window.location.search);

        const parser = new DOMParser();

        const baseTitle = document.title;

        const startPage = $(thisPartial).data('page') ? parseInt($(thisPartial).data('page')) : undefined;

        const attachmentFields = [
            8688454802459,
        ];

        // Content loaded at runtime
        let ticketForms;
        let troubleshootingJson;
        let environmentJson;
        let ticketAttachments;
           
        let pageStack = [];

        const updateUrl = function() {
            if (partialOptions.includes('noUpdateUrl')) {
                return;
            }

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

        const getParentEnvironment = function() {
            if (pageStack.length) {
                return pageStack[pageStack.length - 1].pageObj.curEnvironment;
            }   
            else {
                return environmentJson;
            }
        }

        const showPage = async function(pageOptions) {
            let pageObj = troubleshootingJson.pages.find(e => e.page == pageOptions.page);
            if (!pageObj) {
                pageObj = ticketForms.ticketForms.find(e => e.id == pageOptions.page);
                if (pageObj) {
                    pageObj.ticketForm = pageOptions.page;
                }
            }
            if (pageObj.doNotRestore && pageOptions.loadPath) {
                return false;
            }
            if (!pageObj) {
                analytics.track('invalidPage', {category:gaCategory, label:pageOptions.page});
                return false;
            }
            if (pageStack.find(e => e.page == pageOptions.page)) {
                analytics.track('pageLoop', {category:gaCategory, label:pageOptions.page});
                return false;
            }
            pageObj.curEnvironment = Object.assign({}, getParentEnvironment());
            if (pageObj.environment) {
                pageObj.curEnvironment = Object.assign(pageObj.curEnvironment, pageObj.environment);
            }

            const handlebarsExpand = function(handlebarsTemplate) {
                const template = Handlebars.compile(handlebarsTemplate);
                return template(pageObj.curEnvironment);
            }

            analytics.track('showPage', {category:gaCategory, label:pageOptions.page});

            const pageDivElem = document.createElement('div');
            $(pageDivElem).data('page', pageOptions.page);
            $(pageDivElem).addClass('apiHelperTroubleshootingPage');

            let fields = [];
            let submitButton;
            let conditionSelected = true;
            let attachmentsField;

            const validateForm = function() {
                let isValid = true;

                for(const field of fields) {
                    if (field.fieldSpecObj.required) {
                        if (field.valElem && $(field.valElem).is(':visible')) {                            
                            if (field.fieldSpecObj.type == 'checkbox') {
                                if (!$(field.valElem).prop('checked')) {
                                    isValid = false;
                                }
                            }
                            else {
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
                if (attachmentFields.includes(fieldSpecObj.id)) {
                    // Don't render the attachment field
                    attachmentsField = fieldSpecObj.id;
                    return;
                }

                const fieldDivElem = document.createElement('div');
                $(fieldDivElem).addClass('apiHelperTroubleshootingField')
    
                let valElem;

                const entryElem = document.createElement('div');
                $(entryElem).addClass('apiHelperTroubleshootingInput');

                if (fieldSpecObj.type == 'checkbox') {
                    const labelElem = document.createElement('label');

                    const inputElem = valElem = document.createElement('input');
                    $(inputElem).attr('type', 'checkbox');

                    $(labelElem).append(inputElem);
                    $(labelElem).append(document.createTextNode(fieldSpecObj.title));

                    $(entryElem).append(labelElem);

                    $(inputElem).on('click', validateForm);
                }
                else {
                    if (fieldSpecObj.title) {
                        const titleElem = document.createElement('div');
                        $(titleElem).text(fieldSpecObj.title);
                        $(fieldDivElem).append(titleElem);    
                    }
        
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
                $(descriptionElem).text(handlebarsExpand(pageObj.description));
                $(pageDivElem).append(descriptionElem);    
            }

            if (pageObj.note) {
                const url = notesUrlBase + pageObj.note.replace('.md', '/index.html');

                const noteFetch = await fetch(url);
                const noteText = await noteFetch.text();                

                const noteDocument = parser.parseFromString(noteText, 'text/html');

                const noteElem = document.createElement('div');
                $(noteElem).html($(noteDocument).find('.content'));
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
                            if (!ignoreFields.includes(fieldObj.id) && !fieldObj.hidden) {
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
                if (!pageObj.subjectValue) {
                    addField({
                        title: 'Subject',
                        type: 'text',
                        field: 'subject',
                    });    
                }
                addField({
                    title: 'Description',
                    type: 'textarea',
                    field: 'body',
                });

                if (attachmentsField) {
                    const attachmentDiv = document.createElement('div');
                    $(attachmentDiv).css('padding', '5px 0px 20px 0px');

                    const labelElem = document.createElement('label');

                    const labelText = document.createTextNode(pageObj.attachmentTitle || 'Select files to attach or drag and drop files here (optional)')
                    $(labelElem).append(labelText);

                    const buttonElem = document.createElement('button');
                    $(buttonElem).css('margin-left', '10px');
                    $(buttonElem).text('Select files');
                    $(labelElem).append(buttonElem);

                    $(attachmentDiv).append(labelElem);    

                    const inputElem = document.createElement('input');
                    $(inputElem).attr('type', 'file');
                    if (pageObj.attachmentTypes) {
                        // comma-separated list of extensions ('.pdf') or mime types
                        $(inputElem).attr('accept', pageObj.attachmentTypes);
                    }
                    $(inputElem).attr('multiple', true);
                    $(inputElem).hide();

                    ticketAttachments = null;

                    $(buttonElem).on('click', function() {
                        $(inputElem).trigger('click');
                    });

                    $(attachmentDiv).append(inputElem);

                    const statusElem = document.createElement('div');
                    $(statusElem).hide();
                    $(attachmentDiv).append(statusElem);

                    const setStatus = function(s) {
                        if (s) {
                            $(statusElem).text(s);
                            $(statusElem).show();
                        }
                        else {
                            $(statusElem).hide();
                        }
                    }
                    const setStatusAttachmentError = function() {
                        setStatus('You can attach a maximum of 5 files, with a maximum size of 10 MB each');
                    }


                    $(pageDivElem).append(attachmentDiv);

                
                    const setAttachments = function(files, options) {
                        if (!options) {
                            options = {};
                        }
                        let totalSize = 0;
                        let totalFiles = 0;
                        if (!ticketAttachments || !options.addToExisting) {
                            ticketAttachments = [];
                        }
                        else {
                            for(const file of ticketAttachments) {
                                totalSize += file.size;
                            }
                            totalFiles += ticketAttachments.length;
                        }

                        if ((ticketAttachments.length + files.length) > 5) {
                            setStatusAttachmentError();
                        }
                        else
                        if (files.length > 0) {
                            for(const file of files) {
                                totalSize += file.size;
                            }
                            if (totalSize < (10 * 1048576)) { // 10 MB
                                for(const file of files) {
                                    // file.name, .lastModified, .lastModifiedDate, .size, .type
                                    
                                    let fileReader = new FileReader();
                                    fileReader.onload = async function() {
                                        ticketAttachments.push({
                                            'name': file.name,
                                            'size': file.size,
                                            'content': new Uint8Array(fileReader.result),
                                        });
                                    };
                                    fileReader.readAsArrayBuffer(file);
                                }      
                                
                                let prefixStr, unitStr;
                                totalFiles += files.length;
                                if (totalFiles == 1) {
                                    prefixStr = 'Will attach 1 file, size is ';
                                }
                                else {
                                    prefixStr = 'Will attach ' + totalFiles + ' files, total size is ';
                                }

                                if (totalSize > 1048576) { // 1 MB
                                    totalSize = Math.round(totalSize / 104857.6) / 10;
                                    unitStr = ' MB';
                                }
                                else
                                if (totalSize > 1024) { // 1 KB
                                    totalSize = Math.round((totalSize / 102.4)) / 10;
                                    unitStr = ' KB';
                                }
                                else {
                                    unitStr = ' B';
                                }
                                setStatus(prefixStr + totalSize + unitStr);
                            }
                            else {
                                setStatusAttachmentError();
                            }

                                              
                        } 
                    };


                    $(inputElem).on('change', function(event) {
                        setAttachments(this.files, {
                            addToExisting: false,
                        });                        
                    });

                    $(attachmentDiv).on('dragover', function(ev) {
                        ev.preventDefault();
                    });

                    $(attachmentDiv).on('drop', function(ev) {
                        ev.preventDefault();
                        if (ev.originalEvent.dataTransfer.items) {
                            let files = [];
                            for(const item of ev.originalEvent.dataTransfer.items) {
                                if (item.kind === 'file') {
                                    const file = item.getAsFile();
                                    // file.name, .lastModified, .lastModifiedDate, .size, .type
                                    files.push(file);
                                }
                            }
                            setAttachments(files, {
                                addToExisting: true,
                            })
                        }
                        else {
                            setAttachments(ev.originalEvent.dataTransfer.files, {
                                addToExisting: true,
                            })
                        }
                    });


                }


                const buttonElem = submitButton = document.createElement('button');
                $(buttonElem).text(pageObj.submitButtonTitle ? pageObj.submitButtonTitle : 'Submit support request');
                $(pageDivElem).append(buttonElem);

                $(buttonElem).on('click', async function() {
                    $(buttonElem).prop('disabled');

                    let options = {
                        ticketFormId: pageObj.ticketForm,
                        ticketAttachments,
                        attachmentsField,
                    };

                    for(const field of fields) {
                        if (!field.value && !$(field.valElem).is(':visible')) {
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
                    if (pageObj.subjectValue) {
                        options.customFields.push({
                            id: 22020244,
                            value: pageObj.subjectValue
                        });
                    }

                    

                    console.log('options', options);

                    try {
                        const resp = await apiHelper.ticketSubmit(options);
                        // console.log('resp', resp);

                        analytics.track('ticketSubmitSuccess', {category:gaCategory, label:pageObj.ticketForm});
                        showPage({page: 105}); // Ticket submitted
                    }
                    catch(e) {
                        console.log('exception submitting ticket');
                        analytics.track('ticketSubmitError', {category:gaCategory, label:pageObj.ticketForm});
                        showPage({page: 106}); // Ticket error
                    }
                    

                });
            }

            let firstStepPage;


            if (pageObj.steps) {
                for(let stepIndex = 0; stepIndex < pageObj.steps.length; stepIndex++) {
                    let stepObj = pageObj.steps[stepIndex];

                    let title = stepObj.title;
                    if (!title && stepObj.page) {
                        // If no title, use the target page title

                        let targetPageObj = troubleshootingJson.pages.find(e => e.page == stepObj.page);
                        title = targetPageObj.title;
                    }
                    title = (stepIndex + 1) + '. ' + title;

                    const buttonElem = document.createElement('div');
                    $(buttonElem).addClass('apiHelperGiantButton');

                    if (pageOptions.next && pageOptions.next == stepObj.page) {
                        $(buttonElem).addClass('apiHelperGiantButtonSelected');
                    }

                    $(buttonElem).text(title);

                    $(buttonElem).on('click', function() {
                        clearPagesBelow(pageOptions.page);
                        $(buttonElem).addClass('apiHelperGiantButtonSelected');

                        if (stepObj.page) {
                            showPage({page: stepObj.page});
                        }
                    });

                    if (stepIndex == 0 && !pageOptions.loadPath) {
                        firstStepPage = stepObj.page;
                        $(buttonElem).addClass('apiHelperGiantButtonSelected');
                    }

                    stepObj.buttonElem = buttonElem;

                    $(pageDivElem).append(buttonElem);
                }              
            }

            if (pageObj.buttons) {
                for(const buttonObj of pageObj.buttons) {
                    if (buttonObj.orgRequired && !apiHelper.selectedOrg) {
                        continue;
                    }
                    if (buttonObj.nonOrgRequired && !!apiHelper.selectedOrg) {
                        continue;
                    }
                    if (buttonObj.enterpriseRequired) {
                        if (!apiHelper.orgInfo || !apiHelper.orgInfo.isEnterprise) {
                            // Not enterprise
                            continue;
                        }
                    }

                    if (buttonObj.hidden) {
                        continue;
                    }

                    let title = buttonObj.title;
                    if (!title && buttonObj.page) {
                        // If no title, use the target page title

                        let targetPageObj = troubleshootingJson.pages.find(e => e.page == buttonObj.page);
                        title = targetPageObj.title;
                    }
                    
                    const buttonElem = document.createElement('div');
                    $(buttonElem).addClass('apiHelperGiantButton');

                    if (!buttonObj.nextStep) {
                        if (!buttonObj.detail) {
                            $(buttonElem).text(title);
                        }
                        else {
                            // Has multi-line button
                            const topElem = document.createElement('div');
                            $(topElem).text(title);
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
                                analytics.track('loginService', {category:gaCategory, label:buttonObj.loginService});
                                window.location.href = 'https://login.particle.io/' + buttonObj.loginService + '?redirect=' + curPage;                        
                            }
                            else
                            if (buttonObj.page) {
                                showPage({page: buttonObj.page});
                            }
                            else
                            if (buttonObj.url) {
                                analytics.track('buttonUrl', {category:gaCategory, label:buttonObj.url});
                                window.location.href = buttonObj.url;                        
                            }
                        });
    
                    }
                    else {
                        // nextStep is true
                        let stepsPageIndex = pageStack.length - 1;
                        let nextPage;
                        let nextButtonElem;

                        while(stepsPageIndex >= 0 && !pageStack[stepsPageIndex].pageObj.steps) {
                            stepsPageIndex--;
                        }
                        if (stepsPageIndex >= 0) {
                            stepsPageObj = pageStack[stepsPageIndex].pageObj;

                            for(let ii = 0; ii < stepsPageObj.steps.length; ii++) {
                                if (stepsPageObj.steps[ii].page == pageOptions.page) {
                                    if ((ii + 1) < stepsPageObj.steps.length) {
                                        nextPage = stepsPageObj.steps[ii + 1].page;
                                        nextButtonElem = stepsPageObj.steps[ii + 1].buttonElem;
                                    }
                                }
                            }
                        }

                        if (nextPage) {
                            if (title) {
                                $(buttonElem).text(title);
                            }
                            else {
                                $(buttonElem).text('Continue to the next step');
                            }
                        }
                        else {
                            $(buttonElem).text('All steps completed!');
                        }

                        $(buttonElem).on('click', function() {
                            clearPagesBelow(stepsPageObj.page);
                            if (nextPage) {
                                showPage({page: nextPage});
                                $(nextButtonElem).addClass('apiHelperGiantButtonSelected');
                            }
                        });
                    }


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

            if (!pageOptions.noUpdateUrl) {
                pageStack.push({
                    page: pageOptions.page,
                    pageObj,
                    pageDivElem,
                    statusVisible,
                });    
            }

            
            // Enable buttons on the new page
            validateForm();
            updateConditions();

            if (!partialOptions.includes('noScroll')) {
                // Scroll new page into view
                const pos = $(pageDivElem).position().top;
                $('.content-inner').scrollTop(pos);
            }
            
            if (!pageOptions.noUpdateUrl) {
                updateUrl();
            }

            if (firstStepPage) {
                showPage({page: firstStepPage});
            }

            return true;
        };

        const loadPath = async function(path) {
            let loadedPage = false;

            for(let ii = 0; ii < path.length; ii++) {
                const page = path[ii];
                const next = ((ii + 1) < path.length) ? path[ii + 1] : undefined;

                const res = await showPage({page, next, loadPath: true});
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
            const environmentFetch = await fetch(environmentUrl);

            troubleshootingJson = await decisionTreeFetch.json();
            ticketForms = await formsFetch.json();
            environmentJson = await environmentFetch.json();

            if (apiHelper.auth || startPage) {
                // Have a token, verify it
                let showDefaultPage = true;

                const pageListStr = urlParams.get('p');
                if (pageListStr) {
                    let loadPagesArray = [];
                    for(const p of pageListStr.split(',')) {
                        if (p != '') {
                            loadPagesArray.push(parseInt(p));
                        }
                    }

                    if (loadPagesArray.length >= 1 && loadPagesArray[0] == 100) {
                        // Was showing the need to login page, go to the default page instead
                        showDefaultPage = true;
                    }
                    else
                    if (loadPagesArray.length == 1) {
                        let pageObj = troubleshootingJson.pages.find(e => e.page == loadPagesArray[0]);
                        if (pageObj && pageObj.paths) {
                            showDefaultPage = !loadPath(pageObj.paths[0]); 
                        }
                        else {
                            pageObj = ticketForms.ticketForms.find(e => e.id == loadPagesArray[0]);
                            // Is a ticket form
                            showDefaultPage = !await showPage({page: loadPagesArray[0]}); 
                        }
                    }
                    else
                    if (loadPagesArray.length > 1 || loadPagesArray[0] != 100) {
                        // Not the no auth page
                        showDefaultPage = !loadPath(loadPagesArray); 
                    }
                }

                if (showDefaultPage) {
                    await showPage({page: (startPage ? startPage : 101)});
                }
            }
            else {
                // No token
                await showPage({page: 100, noUpdateUrl: true});
            }
    
        };
        run();


    }));
});

