$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    const uploadAttachment = function(options) {
        // console.log('uploadAttachment', options);

        return new Promise(function(resolve, reject) {      

            const request = {
                contentType: 'application/binary',
                data: options.content,
                dataType: 'json',
                error: function (jqXHR) {
                    console.log('error', jqXHR);
                    reject(jqXHR.status);
                },
                headers: {
                    'Accept': 'application/json'
                },
                method: 'POST',
                processData: false,
                success: function (resp, textStatus, jqXHR) {
                    resolve(resp);
                },
                url: 'https://particle.zendesk.com/api/v2/uploads?filename=' + encodeURIComponent(options.name),
            };

            $.ajax(request);      
        });        
    }

    const submitTicketRequest = function(options) {
        // options:
        // name, email, subject, body
        return new Promise(function(resolve, reject) {      

            let zendeskRequestObj = {
                request: {
                    requester: {
                        name: options.name ? options.name : options.email,
                        email: options.email,
                    },
                    subject: options.subject,
                    comment: {
                        body: options.body,
                    },
                    ticket_form_id: options.ticketFormId,
                    custom_fields: options.customFields,
                }
            };

            const request = {
                contentType: 'application/json',
                data: JSON.stringify(zendeskRequestObj),
                dataType: 'json',
                error: function (jqXHR) {
                    console.log('error', jqXHR);
                    reject(jqXHR.status);
                },
                headers: {
                    'Accept': 'application/json'
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    resolve(resp);
                },
                url: 'https://particle.zendesk.com/api/v2/requests.json'
            };

            $.ajax(request);      
        });
    }

    /*
    const submitTicketComment = function(options) {
        return new Promise(function(resolve, reject) {      

            let zendeskRequestObj = {
                ticket: {
                    comment: {
                        'body': 'Test attachment',
                        'uploads': [
                            options.uploadToken,
                        ]
                    }
                }
            };

            const request = {
                contentType: 'application/json',
                data: JSON.stringify(zendeskRequestObj),
                dataType: 'json',
                error: function (jqXHR) {
                    console.log('error', jqXHR);
                    reject(jqXHR.status);
                },
                headers: {
                    'Accept': 'application/json'
                },
                method: 'PUT',
                success: function (resp, textStatus, jqXHR) {
                    resolve(resp);
                },
                url: 'https://particle.zendesk.com/api/v2/tickets/' + options.ticket,
            };

            $.ajax(request);      
        });        
    }
    */

    apiHelper.ticketSubmit = async function(options) {

        if (options.ticketAttachments && options.attachmentsField) {
            let value = '';

            for(const file of options.ticketAttachments) {
                const uploadAttachmentResp = await uploadAttachment({
                    name: file.name,
                    content: file.content,
                });
                // console.log('uploadAttachmentResp', uploadAttachmentResp);
        
                // const uploadToken = uploadAttachmentResp.upload.token;
                const contentUrl = uploadAttachmentResp.upload.attachment.content_url;
                value += 'Attachment: ' + contentUrl + '\n';
            }
            options.customFields.push({
                id: options.attachmentsField,
                value,
            });
        }


        const submitTicketResp = await submitTicketRequest(options);
        // console.log('submitTicketResp', submitTicketResp);

        // const ticket = submitTicketResp.request.id;

        return submitTicketResp;
    };

    apiHelper.showTicketPanel = function(options) {
        const ticketPanel = $('.apiHelperSupportTicket');

        const ops = $(ticketPanel).data('ops');

        ops.updateRequestFields(options);
        ops.showPanel();
    };

    $('.apiHelperSupportTicket').each(function() {
        const thisElem = $(this);

        //const boxDivElem = $(thisElem).find('.apiHelperBox');
        const submitTicketDivElem = $(thisElem).find('.submitTicketDiv');
        const loginRequiredDivElem = $(thisElem).find('.loginRequiredDiv');
        const isFreeTierDivElem = $(thisElem).find('.isFreeTierDiv');
        const usernameFieldElem = $(thisElem).find('.usernameField');
        const organizationFieldElem = $(thisElem).find('.organizationField');
        //const subjectRowElem = $(thisElem).find('.subjectRow');
        const subjectInputElem = $(thisElem).find('.subjectRow').find('input');
        const messageFieldElem = $(thisElem).find('.messageField');
        const submitButtonElem = $(thisElem).find('.submitButton');
        const ticketSubmittedDivElem = $(thisElem).find('.ticketSubmittedDiv');
        const ticketErrorDivElem = $(thisElem).find('.ticketErrorDiv');
        const ticketNumElem = $(thisElem).find('.ticketNum');
        
        let options = {};    

        if (apiHelper.auth) {
            options.email = apiHelper.auth.username;
        }
        
        // const Elem = $(thisElem).find('.');
        
        const style = $(thisElem).data('style');

        if (!apiHelper.auth) {
            $(loginRequiredDivElem).show();
            return;
        }

        const updateSupportAvailable = function() {
            if (apiHelper.selectedOrg) {
                $(isFreeTierDivElem).hide();
                $(submitTicketDivElem).show();

                $(usernameFieldElem).text(apiHelper.auth.username);
                $(organizationFieldElem).text(apiHelper.selectedOrg.name);
            }
            else {
                $(isFreeTierDivElem).show();
                $(submitTicketDivElem).hide();
            }
        };
    
        const enableButtons = function() {
            let disableSubmit = true;
            
            if ($(subjectInputElem).val().trim() && $(messageFieldElem).val().trim()) {
                disableSubmit = false;
            }

            $(submitButtonElem).prop('disabled', disableSubmit);
        };

        $('.apiHelper').on('selectedOrgUpdated', updateSupportAvailable);

        const showPanel = function() {
            $(thisElem).show();
            updateSupportAvailable();
            enableButtons();    
            const pos = $(thisElem).position().top;
            $('.content-inner').scrollTop(pos);
          };
        

        $(thisElem).data('ops', {
            showPanel, 
            updateRequestFields: function(opts) {
                if (opts.subject) {
                    $(subjectInputElem).val(opts.subject);
                }
                if (opts.message) {
                    $(messageFieldElem).val(opts.message);
                }
                if (opts.ticketFormId) {
                    options.ticketFormId = opts.ticketFormId;
                }
                if (opts.customFields) {
                    options.customFields = opts.customFields;
                }
                enableButtons();
            },
            subjectInputElem,
            messageFieldElem,
            enableButtons,
        });

        $(subjectInputElem).on('input', enableButtons);
        $(messageFieldElem).on('input', enableButtons);

        if (style == 'hidden') {
            $(thisElem).hide();
        }
        else {
            showPanel();
        }
        
    
        $(submitButtonElem).on('click', async function() {
            options.subject = $(subjectInputElem).val();
            options.body = '';
            
            $(submitButtonElem).prop('disabled', true);

            options.body += $(messageFieldElem).val();

            // console.log('options', options);
            
            try {
                const resp = await apiHelper.ticketSubmit(options);

                $(ticketNumElem).text(resp.request.id);

                $(ticketSubmittedDivElem).show();

            }
            catch(e) {
                console.log('exception submitting ticket', e);
                $(ticketErrorDivElem).show();
            }
        });

    });

});

