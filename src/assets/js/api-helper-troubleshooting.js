$(document).ready(function () {

    if ($('.apiHelperTroubleshooting').each(function() {
        const thisPartial = $(this);

        const gaCategory = 'troubleshootingTool';
        const notesUrlBase = '/notes/';
        const ticketFormDataUrl = '/assets/files/ticketForms.json';


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
        ];

        let pageStack = [];

        const updateUrl = function() {
            // TODO: Match the query parameters to the pageStack here
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
            const pageObj = decisionTree.find(e => e.page == page);

            ga('send', 'event', gaCategory, 'showPage', page);

            const pageDivElem = document.createElement('div');
            $(pageDivElem).data('page', page);
            $(pageDivElem).addClass('apiHelperTroubleshootingPage');

            let fields = [];
            let submitButton;

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

                $(submitButton).prop('disabled', !isValid);
            };

            const addField = function(fieldSpecObj) {
                const fieldDivElem = document.createElement('div');
                $(fieldDivElem).addClass('apiHelperTroubleshootingField')
    

                if (fieldSpecObj.title) {
                    const titleElem = document.createElement('div');
                    $(titleElem).text(fieldSpecObj.title);
                    $(fieldDivElem).append(titleElem);    
                }
    
                const entryElem = document.createElement('div');
                $(entryElem).addClass('apiHelperTroubleshootingInput');
                if (fieldSpecObj.type == 'text') {
                    const inputElem = valElem= document.createElement('input');
                    $(inputElem).attr('type', 'text');
                    $(inputElem).attr('size', '60');
                    $(entryElem).append(inputElem);

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
                });
            }

            if (pageObj.fields) {
                for(const fieldObj of pageObj.fields) {
                    const fieldSpecObj = ticketForms.ticketFields.find(e => e.id == fieldObj.id);
                    if (fieldSpecObj) {
                        if (!fieldObj.value) {
                            addField(fieldSpecObj);
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

                $(buttonElem).on('click', function() {
                    $(buttonElem).prop('disabled');

                    let options = {
                        ticketFormId: pageObj.ticketForm
                    };

                    for(const field of fields) {
                        let val = '';
                        if (field.value) {
                            val = field.value;
                        }
                        else
                        if (field.valElem) {
                            val = $(field.valElem).val();
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

                    ga('send', 'event', gaCategory, 'ticketSubmit', pageObj.ticketForm);

                    apiHelper.ticketSubmit(options);

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

            validateForm();

            pageStack.push({
                page,
                pageObj,
                pageDivElem,
            });

            updateUrl();
        };

        const run = async function() {
            const formsFetch = await fetch(ticketFormDataUrl);
            ticketForms = await formsFetch.json();

            if (apiHelper.auth) {
                // Have a token, verify it
                showPage(101);
            }
            else {
                // No token
                showPage(100);
            }
    
        };
        run();


    }));
});
