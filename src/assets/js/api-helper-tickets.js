$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    apiHelper.ticketSubmit = async function(options) {
        // options:
        // name, email, subject, body
        const result = await new Promise(function(resolve, reject) {      

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
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
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

});

