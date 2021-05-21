
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

            const url = 'https://api.particle.io/v1/devices/?access_token=' + apiHelper.auth.access_token;
            $(thisElem).find('.apiHelperApiRequest').text('GET ' + url);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax({
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
                url
            });    
        
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

            const url = 'https://api.particle.io/v1/devices/' + deviceId + '/' + variableName;
            $(thisElem).find('.apiHelperApiRequest').text('GET ' + url);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax({
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
                url,
            });    

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

            const url = 'https://api.particle.io/v1/devices/' + deviceId + '/' + functionName;
            $(thisElem).find('.apiHelperApiRequest').text('POST ' + url);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax({
                contentType: 'application/json',
                data: JSON.stringify({arg:functionParameter}),
                dataType: 'json',
                error: function(jqXHR) {
                    ga('send', 'event', 'Call function', 'Error', jqXHR.responseJSON.error);

                    setStatus('Error calling function');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization':'Bearer ' + apiHelper.auth.access_token,
                    'Accept':'application/json'
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
                url,
            });    

        });
    });

});

/*

*/