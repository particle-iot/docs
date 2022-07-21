$(document).ready(function () {

    if ($('.apiHelperTroubleshooting').each(function() {
        const thisPartial = $(this);

        const gaCategory = 'troubleshootingTool';
        const notesUrlBase = '/notes/';
        const ticketFormDataUrl = '/assets/files/ticketForms.json';

        const urlParams = new URLSearchParams(window.location.search);

        let ticketForms;

        // Decision tree definition
        const decisionTree = [
            {
                page: 100,
                description: 'You must log into your Particle account to use the troubleshooting tool.',
                buttons: [
                    {
                       title: 'I forgot my password and need to reset it',
                       loginService: 'change-password',
                    },
                    {
                        title: 'I don\'t have an account yet and need to create one',
                        loginService: 'signup',
                    },
                    {
                        title: 'I am blocked from logging in due to multi-factor authentication (2FA/MFA)',
                        page: 102,
                    },
                    {
                        title: 'I cannot login because I don\'t know my username or password',
                        page: 103,
                    },
                    {
                        title: 'I cannot login due to an error in the login page',
                        page: 104,
                    },
                 ],
            },
            {
                page: 101,
                description: 'What kind of issue are you experiencing?',
                buttons: [
                    {
                        title: 'Technical issues with devices, cloud services, or setup',
                        page: 108,
                    },
                    {
                        title: 'Order and billing issues',
                        page: 107,
                    },
                ],
            },
            {
                page: 102,
                title: 'I am blocked from logging in due to multi-factor authentication (2FA/MFA)',
                note: 'lost-mfa.md',
                ticketForm: 360006636853,
                fields: [
                    { id: 360056036113 }, // Account email
                    { id: 360055034734 }, // Last 4 of credit card  
                    { id: 360056120693, value:'blocked_from_logging_in_due_to_2fa/mfa_issue'},
                ],                
            },
            {
                page: 103,
                title: 'I cannot login because I don\'t know my username or password',
                ticketForm: 360006636853,
                note: 'recover-account.md',
                fields: [
                    { id: 360055034734 }, // Last 4 of credit card  
                    { id: 360056120693, value:'i_don_t_know_my_login_credentials'},
                ],                
            },
            {
                page: 104,
                title: 'I cannot login due to an error in the login page',
                ticketForm: 360006636853,
                fields: [
                    { id: 360055034774 }, // Browser Type
                    { id: 1500000021382 }, // VPN
                    { id: 360056120693, value:'cannot_log_in__error_in_login_page_'},
                ],                
            },
            {
                page: 105,
                title: 'Ticket submitted!',
                note: 'ticket-submitted.md',
            },
            {
                page: 106,
                title: 'Error submitting ticket',
                description: 'An error occurred submitting your support ticket request.',
            },
            {
                page: 107,
                title: 'Order and billing issues',
                buttons: [
                    {
                        title: 'Help with my order',
                        page: 360001073373,
                    },
                    {
                        title: 'Managing billing and subscriptions',
                        page: 360001730794,
                    },
                    {
                        title: 'Upgrading my account to the growth plan',
                        page: 1260809279669,
                    },
                    {
                        title: 'I have another non-technical issue',
                        page: 360000327294,
                    },
                ],
            },
            {
                page: 108,
                title: 'Technical issues',
                buttons: [
                    /*
                    {
                        title: 'Can\'t set up new device',
                        page: 360005653294
                    }
                    */
                ],
            },
        ];

        let pageStack = [];

        const updateUrl = function() {
            let query = '?p=';
            for(const p of pageStack) {
                query += p.page + ','
            }
            history.pushState(null, '', query);
        }

        const clearPagesBelow = function(page) {
            console.log('clearPagesBelow ' + page);
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


        const showPage = async function(page) {
            let pageObj = decisionTree.find(e => e.page == page);
            if (!pageObj) {
                pageObj = ticketForms.ticketForms.find(e => e.id == page);
                if (pageObj) {
                    pageObj.ticketForm = page;
                }
            }
            if (!pageObj) {
                ga('send', 'event', gaCategory, 'invalidPage', page);
                return;
            }

            ga('send', 'event', gaCategory, 'showPage', page);

            const pageDivElem = document.createElement('div');
            $(pageDivElem).data('page', page);
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

                    /*
                    try {
                        const resp = await apiHelper.ticketSubmit(options);
                        console.log('resp', resp);

                        ga('send', 'event', gaCategory, 'ticketSubmitSuccess', pageObj.ticketForm);
                        showPage(105); // Ticket submitted
                    }
                    catch(e) {
                        console.log('exception submitting ticket');
                        ga('send', 'event', gaCategory, 'ticketSubmitError', pageObj.ticketForm);
                        showPage(106); // Ticket error
                    }
                    */
                    

                });
            }


            if (pageObj.buttons) {
                for(const buttonObj of pageObj.buttons) {
                    const buttonElem = document.createElement('div');
                    $(buttonElem).addClass('apiHelperGiantButton');
                    $(buttonElem).text(buttonObj.title);

                    $(buttonElem).on('click', function() {
                        clearPagesBelow(page);
                        $(buttonElem).addClass('apiHelperGiantButtonSelected');

                        if (buttonObj.loginService) {
                            const curPage = window.location.href;
                            ga('send', 'event', gaCategory, 'loginService', buttonObj.loginService);
                            window.location.href = 'https://login.particle.io/' + buttonObj.loginService + '?redirect=' + curPage;                        
                        }
                        else
                        if (buttonObj.page) {
                            showPage(buttonObj.page);
                        }
                    });

                    $(pageDivElem).append(buttonElem);
                }    
            }

            $(thisPartial).append(pageDivElem);

            pageStack.push({
                page,
                pageObj,
                pageDivElem,
            });

            
            // Enable buttons on the new page
            validateForm();
            updateConditions();

            // Scroll new page into view
            const pos = $(pageDivElem).position().top;
            $('.content-inner').scrollTop(pos);
            
            updateUrl();
        };

        const run = async function() {
            const formsFetch = await fetch(ticketFormDataUrl);
            ticketForms = await formsFetch.json();

            if (apiHelper.auth) {
                // Have a token, verify it
                const pageListStr = urlParams.get('p');
                if (pageListStr) {
                    for(const p of pageListStr.split(',')) {
                        await showPage(parseInt(p));
                    }
                }

                if (pageStack.length == 0) {
                    await showPage(101);
                }
            }
            else {
                // No token
                await showPage(100);
            }
    
        };
        run();


    }));
});
