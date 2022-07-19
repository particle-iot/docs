$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    apiHelper.ticketSubmit = function(options) {
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
    };

    apiHelper.showTicketPanel = function(options) {
        const ticketPanel = $('.apiHelperSupportTicket');

        const ops = $(ticketPanel).data('ops');

        ops.updateSubjectMessage(options);
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
            updateSubjectMessage: function(opts) {
                if (opts.subject) {
                    $(subjectInputElem).val(opts.subject);
                }
                if (opts.message) {
                    $(messageFieldElem).val(opts.message);
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
            let subject = $(subjectInputElem).val();
            let body = '';
            
            $(submitButtonElem).prop('disabled', true);

            body += 'Organization: ' + apiHelper.selectedOrg.name + '\n\n';
            body += $(messageFieldElem).val();

            let options = {
                email: apiHelper.auth.username,
                subject,
                body,
            };

            console.log('options', options);
            
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

