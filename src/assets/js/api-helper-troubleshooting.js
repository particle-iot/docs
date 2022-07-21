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
                description: 'What kind of question do you have?',
                buttons: [
                    {
                        title: 'Technical questions about devices, cloud services, or setup',
                        page: 108,
                    },
                    {
                        title: 'Order and billing questions',
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
                title: 'Order and billing questions',
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
                title: 'Technical questions',
                buttons: [
                    {
                        title: 'Device setup questions',
                        page: 126,
                    },
                    {
                        title: 'The status LED on my device is blinking colors, what do they mean?',
                        url: '/troubleshooting/led/',
                    },
                    {
                        title: 'Connectivity questions',
                        page: 127,
                    },
                    {
                        title: 'Developer tool questions',
                        page: 109,
                    },
                    {
                        title: 'Particle console (console.particle.io) questions',
                        page: 122,
                    },
                    {
                        title: 'Cloud API questions',
                        page: 119,
                    },
                    {
                        title: 'Webhook or other integrations questions',
                        page: 124,
                    },
                    {
                        title: 'I\'d like to create a support ticket for another technical issue',
                        page: 360006636913,
                        orgRequired: true,
                    }


                ],
            },
            {
                page: 109,
                title: 'Developer tool questions',
                buttons: [
                    {
                        title: 'Particle Workbench questions',
                        page: 110,
                    },
                    {
                        title: 'Particle CLI (Command Line Interface) questions',
                        page: 115,
                    },
                    {
                        title: 'Particle Dev (Atom IDE)',
                        page: 118,
                    },
                ],
            },
            {
                page: 110,
                title: 'Particle workbench questions',
                buttons: [
                    {
                        title: 'Visit the getting started guide',
                        url: '/getting-started/developer-tools/workbench/',
                    },
                    {
                        title: 'Visit the Workbench troubleshooting guide',
                        url: '/troubleshooting/guides/build-tools-troubleshooting/troubleshooting-the-particle-workbench/',
                    },
                    {
                        title: 'Visit the frequently asked questions',
                        url: '/getting-started/developer-tools/workbench/',
                    },  
                    {
                        title: 'Those resources did not answer my question',
                        page: 111,
                    },                    
                ],
            },
            {
                page: 111,
                title: 'Upgrading Workbench',
                note: 'workbench-upgrade.md',
                buttons: [
                    {
                        title: 'Upgrading was not necessary or did not help',
                        page: 112,
                    },                        
                ],
            },
            {
                page: 112,
                title: 'Disabling Workbench extensions',
                note: 'workbench-disable-extensions.md',
                buttons: [
                    {
                        title: 'Disabling extensions was not necessary or did not help',
                        page: 113,
                    },                        
                ],
            },
            {
                page: 113,
                title: 'Workbench community forums',
                description: 'The Particle community forums are the best place to ask questions about and report bugs in Particle workbench.',
                buttons: [
                    {
                        title: 'Visit the community forums',
                        url: 'https://community.particle.io/c/dt/particle-workbench/43',
                    },
                    {
                        title: 'Visit community forum instructions for reporting bugs',
                        url: 'https://community.particle.io/t/how-to-report-bugs-and-provide-feedback/52361',
                    },
                    {
                        title: 'I\'d like to create a support ticket',
                        page: 114,
                        orgRequired: true,
                    },                    
                ],
            },
            {
                page: 114,
                title: 'Workbench support ticket',
                ticketForm: 360006636893,
                fields: [
                    { id: 360056044093, value:'devtool_wb' }, // Developer tool issue category
                    { id: 360056044893 }, // Developer tool issue type
                    { id: 360056043773 }, // Computer OS
                ],                
            },
            {
                page: 115,
                title: 'Particle CLI questions',
                buttons: [
                    {
                        title: 'Visit the CLI getting started guide',
                        url: '/getting-started/developer-tools/cli/',
                        detail: 'Includes installation instructions.'
                    },  
                    {
                        title: 'Visit the CLI reference guide',
                        url: '/reference/developer-tools/cli/',
                    },  
                    {
                        title: 'Visit the CLI troubleshooting guide',
                        url: '/troubleshooting/guides/build-tools-troubleshooting/troubleshooting-the-particle-cli/',
                    },
                    {
                        title: 'Those resources did not answer my question',
                        page: 116,
                    },                    
                ],
            },
            {
                page: 116,
                title: 'CLI community forums',
                description: 'The Particle community forums are the best place to ask questions about and report bugs in the Particle CLI.',
                buttons: [
                    {
                        title: 'Visit the community forums',
                        url: 'https://community.particle.io/c/dt/cli/52',
                    },
                    {
                        title: 'Visit community forum instructions for reporting bugs',
                        url: 'https://community.particle.io/t/how-to-report-bugs-provide-feedback/53835',
                    },
                    {
                        title: 'I\'d like to create a support ticket',
                        page: 117,
                        orgRequired: true,
                    },                    
                ],
            },        
            {
                page: 117,
                title: 'CLI support ticket',
                ticketForm: 360006636893,
                fields: [
                    { id: 360056044093, value:'devtool_cli' }, // Developer tool issue category
                    { id: 360056044893 }, // Developer tool issue type
                    { id: 360056043773 }, // Computer OS
                ],                
            },
            {
                page: 118,
                title: 'Particle Dev (Atom IDE)',
                note: 'dev-deprecated.md',
                buttons: [
                    {
                        title: 'Install Workbench',
                        url: '/getting-started/developer-tools/workbench/',
                    },                        
                ],
            },
            {
                page: 119,
                title: 'Cloud API questions',
                showStatus: true, 
                buttons: [
                    {
                        title: 'Visit the introduction to the Cloud API',
                        url: '/getting-started/cloud/introduction/',
                    },        
                    {
                        title: 'Visit the interactive tutorial for getting started with the Cloud API',
                        url: '/getting-started/cloud/cloud-api/',
                    },             
                    {
                        title: 'Visit the Cloud API reference',
                        url: '/reference/cloud-apis/api/',
                        detail: 'Also includes information about using the web-based Postman tool for accessing the Particle Cloud API.',
                    },
                    {
                        title: 'Those resources did not answer my question',
                        page: 120,
                    },                    
                ],
            },
            {
                page: 120,
                title: 'Cloud API community forums',
                description: 'The Particle community forums are the best place to ask questions about and report bugs in the Particle Cloud API.',
                buttons: [
                    {
                        title: 'Visit the community forums',
                        url: 'https://community.particle.io/c/cloud-software/2',
                    },
                    {
                        title: 'I\'d like to create a support ticket',
                        page: 121,
                        orgRequired: true,
                    },                    
                ],
            },    
            {
                page: 121,
                title: 'Cloud support ticket',
                ticketForm: 360005653314,
                fields: [
                    { id: 360056043733 }, // Error messaging
                ],                
            },        
            {
                page: 122,
                title: 'Particle console questions',
                showStatus: true, 
                buttons: [
                    {
                        title: 'Visit the console getting started guide',
                        url: '/getting-started/console/console/',
                    },        
                    {
                        title: 'Visit the console',
                        url: 'https://console.particle.io',
                    },             
                    {
                        title: 'Those resources did not answer my question',
                        page: 123,
                    },                    
                ],
            },        
            {
                page: 123,
                title: 'Console community forums',
                description: 'The Particle community forums are the best place to ask questions about and report bugs in the Particle console.',
                buttons: [
                    {
                        title: 'Visit the community forums',
                        url: 'https://community.particle.io/c/cloud-software/2',
                    },
                    {
                        title: 'I\'d like to create a support ticket',
                        page: 1500000002882,
                        orgRequired: true,
                    },                    
                ],
            },    
            {
                page: 124,
                title: 'Webhook or other integration questions',
                showStatus: true, 
                buttons: [
                    {
                        title: 'Visit the integrations getting started guide',
                        url: '/getting-started/integrations/integrations/',
                    },        
                    {
                        title: 'Visit the console to manage integrations',
                        url: 'https://console.particle.io',
                    },             
                    {
                        title: 'Visit the integrations troubleshooting guide',
                        url: '/troubleshooting/guides/build-tools-troubleshooting/troubleshooting-webhookintegration-issues/',
                    },             
                    {
                        title: 'Those resources did not answer my question',
                        page: 125,
                    },                    
                ],
            },
            {
                page: 125,
                title: 'Integrations community forums',
                description: 'The Particle community forums are the best place to ask questions about and report bugs about webhooks and other integrations.',
                buttons: [
                    {
                        title: 'Visit the community forums',
                        url: 'https://community.particle.io/c/cloud-software/itg/23',
                    },
                    {
                        title: 'I\'d like to create a support ticket',
                        page: 1500000002701,
                        orgRequired: true,
                    },                    
                ],
            },    
            {
                page: 126,
                title: 'Device setup questions',
                buttons: [
                    {
                        title: 'Set up a device from a browser or mobile app',
                        url: 'https://setup.particle.io/',
                    },
                    {
                        title: 'Set up a device using the Particle CLI',
                        url: '/getting-started/developer-tools/cli/',
                    },
                    {
                        title: 'Set up a Tracker One or Tracker SoM device',
                        url: '/getting-started/tracker/tracker-setup/',
                    },
                    {
                        title: 'Troubleshooting the setup process',
                        url: '/troubleshooting/guides/device-troubleshooting/troubleshooting-the-setup-process/',
                    },
                    {
                        title: 'The status LED on my device is blinking colors, what do they mean?',
                        url: '/troubleshooting/led/',
                    },
                    {
                        title: 'Visit the community forums for help',
                        url: 'https://community.particle.io/',
                    },
                    {
                        title: 'I\'d like to create a support ticket',
                        page: 360005653294,
                        orgRequired: true,
                    },                                        
                ],
            },
            {
                page: 127,
                title: 'Connectivity questions',
                buttons: [
                    {
                        title: 'Cellular connectivity questions',
                        page: 128,
                    },
                    {
                        title: 'Wi-Fi connectivity questions',
                        page: 129,
                    },
                    {
                        title: 'Learn about billing (data operations)',
                        url: '/getting-started/billing/data-operations/',
                    }
                ],
            },
            {
                page: 128,
                title: 'Cellular connectivity questions',
                showStatus: true, 
                buttons: [
                    {
                        title: 'Is there cellular coverage in a particular country?',
                        url: '/reference/cellular/cellular-carriers/',
                    },
                    {
                        title: 'Troubleshooting cellular connectivity',
                        url: '/troubleshooting/guides/connectivity-troubleshooting/cellular-connectivity-troubleshooting-guide/',
                    },
                    {
                        title: 'Visit the community forums for help',
                        url: 'https://community.particle.io/',
                    },
                    {
                        title: 'I\'d like to create a support ticket',
                        page: 360006631353,
                        orgRequired: true,
                    },                                                            
                ],
            },
            {
                page: 129,
                title: 'Wi-Fi connectivity questions',
                showStatus: true, 
                buttons: [
                    {
                        title: 'Troubleshooting Wi-Fi connectivity',
                        url: '/troubleshooting/guides/connectivity-troubleshooting/wifi-connectivity-troubleshooting-guide/',
                    },
                    {
                        title: 'Visit the community forums for help',
                        url: 'https://community.particle.io/',
                    },
                    {
                        title: 'I\'d like to create a support ticket',
                        page: 1500000002842,
                        orgRequired: true,
                    },                                                            
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
                return;
            }
            if (pageStack.find(e => e.page == pageOptions.page)) {
                ga('send', 'event', gaCategory, 'pageLoop', pageOptions.page);
                return;
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
                        showPage({page: 105}); // Ticket submitted
                    }
                    catch(e) {
                        console.log('exception submitting ticket');
                        ga('send', 'event', gaCategory, 'ticketSubmitError', pageObj.ticketForm);
                        showPage({page: 106}); // Ticket error
                    }
                    */
                    

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
        };

        const run = async function() {
            const formsFetch = await fetch(ticketFormDataUrl);
            ticketForms = await formsFetch.json();

            if (apiHelper.auth) {
                // Have a token, verify it
                const pageListStr = urlParams.get('p');
                if (pageListStr) {
                    let loadPages = [];
                    for(const p of pageListStr.split(',')) {
                        if (p != '') {
                            loadPages.push(parseInt(p));
                        }
                    }
                    if (loadPages.length > 1 || loadPages[0] != 100) {
                        // Not the no auth page
                        for(let ii = 0; ii < loadPages.length; ii++) {
                            const page = loadPages[ii];
                            const next = ((ii + 1) < loadPages.length) ? loadPages[ii + 1] : undefined;
    
                            await showPage({page, next});
                        }    
                    }
                }

                if (pageStack.length == 0) {
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
