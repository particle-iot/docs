
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    const setCodeBox = function(parentElem, text) {
        const thisCodeElem = $(parentElem).find('.codebox');
        $(thisCodeElem).text(text);
        $(thisCodeElem).removeClass('prettyprinted');
        if (prettyPrint) {
            prettyPrint();
        }   
    };

    const setRequest = function(parentElem, request) {
        let requestStr = request.method + ' ' + request.url + '\n';
        if (request.headers) {
            for(const header in request.headers) {
                requestStr += header + ': ' + request.headers[header] + '\n';
            }    
        }
        if (request.contentType) {
            requestStr += 'Content-Type: ' + request.contentType + '\n';
        }

        if (request.data) {
            requestStr += '\n' + request.data;            
        }

        $(parentElem).find('.apiHelperApiRequest > pre').text(requestStr);
        $(parentElem).find('.apiHelperApiRequest').show();
    };

    apiHelper.deviceList($('.apiHelperCloudDeviceSelect'), {
        getTitle: function(dev) {
            return dev.name + ' (' + dev.id + ')' + (dev.online ? '' : ' (offline)');
        },
        hasRefresh: true,
        onChange: function(elem) {
            const deviceId = $(elem).val();

            const thisPartial = $(elem).closest('div.apiHelperDeviceVariable');

        }
    });    

    $('.apiHelperCloudApiDeviceList').each(function() {
        const thisElem = $(this);


        const setStatus = function(status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(thisElem).find('.apiHelperGetDeviceList').on('click', function() {
            setStatus('Requesting device list...');

            const request = {
                dataType: 'json',
                error: function(jqXHR) {
                    ga('send', 'event', 'List Devices', 'Error', jqXHR.responseJSON.error);

                    setStatus('Error listing devices');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    if (resp.length == 0) {
                        ga('send', 'event', 'List Devices', 'Success No Devices');
                        setStatus('Getting the device list succeeded, but you do not have any devices in your account.');
                    }
                    else {
                        ga('send', 'event', 'List Devices', 'Success');
                        setStatus('Success! Found ' + resp.length + ' devices in your account.');

                        $(outputJsonElem).show();
                        setCodeBox(thisElem, JSON.stringify(resp, null, 2));
    
                        $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                        $(respElem).show();
                    }
                },
                url: 'https://api.particle.io/v1/devices/?access_token=' + apiHelper.auth.access_token
            };

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);    
        
        });
    });

    $('.apiHelperCloudApiGetVariable').each(function() {
        const thisElem = $(this);


        const setStatus = function(status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(thisElem).find('.apiHelperGetVariable').on('click', function() {
            setStatus('Requesting variable...');

            const deviceId = $(thisElem).find('.apiHelperCloudDeviceSelect').val();
            const variableName = $(thisElem).find('.apiHelperVariableName').val();

            const request = {
                dataType: 'json',
                error: function(jqXHR) {
                    ga('send', 'event', 'Get Variable', 'Error', jqXHR.responseJSON.error);

                    setStatus('Error retrieving variable');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization':'Bearer ' + apiHelper.auth.access_token,
                    'Accept':'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('Success!');
                    ga('send', 'event', 'Get Variable', 'Success');

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url : 'https://api.particle.io/v1/devices/' + deviceId + '/' + variableName
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);    

        });
    });


    $('.apiHelperCloudApiFunction').each(function() {
        const thisElem = $(this);

        const setStatus = function(status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(thisElem).find('.apiHelperCallFunction').on('click', function() {
            setStatus('Calling function...');

            const deviceId = $(thisElem).find('.apiHelperCloudDeviceSelect').val();
            const functionName = $(thisElem).find('.apiHelperFunctionName').val();
            const functionParameter = $(thisElem).find('.apiHelperFunctionParameter').val();
            const style = $(thisElem).attr('data-style') || 'authHeader';

            let request = {
                dataType: 'json',
                error: function(jqXHR) {
                    ga('send', 'event', 'Call function', 'Error', jqXHR.responseJSON.error);

                    setStatus('Error calling function');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('Success!');
                    ga('send', 'event', 'Call Function', 'Success');

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/devices/' + deviceId + '/' + functionName,
            }

            switch(style) {
                case 'authHeader':
                    request.headers = {
                        'Authorization':'Bearer ' + apiHelper.auth.access_token,
                        'Accept':'application/json'
                    };
                    request.data = JSON.stringify({arg:functionParameter});
                    request.contentType = 'application/json';
                    break;

                case 'authHeaderForm':
                    request.headers = {
                        'Authorization':'Bearer ' + apiHelper.auth.access_token,
                        'Accept':'application/json'
                    };
                    request.data = 'arg=' + encodeURIComponent(functionParameter);
                    request.contentType = 'application/x-www-form-urlencoded';
                    break;
    
                case 'form':
                    request.data = 'arg=' + encodeURIComponent(functionParameter) + '&access_token=' + apiHelper.auth.access_token;
                    request.contentType = 'application/x-www-form-urlencoded';
                    break;
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);    

        });
    });

});

/*

*/