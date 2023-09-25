$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }


    if ($('.apiHelperPublishEvent').length > 0 && apiHelper.auth) {
        $('.apiHelperPublishEventButton').on('click', function() {
            const thisPartial = $(this).closest('div.apiHelperPublishEvent');

            const eventName = $(thisPartial).find('.apiHelperPublishEventName').val();
            let eventData;
            if ($(thisPartial).hasClass('apiHelperJsonLinter')) {
                eventData = apiHelper.jsonLinterGetValue(thisPartial);
            }
            else {
                eventData = $(thisPartial).find('.apiHelperPublishEventData').val();
            }

            const setStatus = function(status) {
                $(thisPartial).find('.apiHelperPublishEventStatus').html(status);
            }
    
            setStatus('Publishing Event ' + eventName + '...');

            apiHelper.particle.publishEvent({ name: eventName, data: eventData, auth: apiHelper.auth.access_token  }).then(
                function (data) {
                    analytics.track('Success', {category:'Publish Event'});
                    setStatus('Published! ' + eventName + ' ' + eventData);
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
                    analytics.track('Error', {category:'Publish Event', label:err});
                    setStatus('Error: ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);                
                }
            );            
    
        });

    }



    if ($('.apiHelperPublishEventToDevice').length > 0 && apiHelper.auth) {
        apiHelper.deviceList($('.apiHelperPublishEventToDeviceSelect'), {
            getTitle: function(dev) {
                return dev.name + ' (' + dev.id +') ' + (dev.online ? '' : ' (offline)');
            },
            hasRefresh: true,
            hasSelectDevice: true,
            onChange: function(elem) {
                const deviceId = $(elem).val();

                if (deviceId != 'select') {
                    const thisPartial = $(elem).closest('div.apiHelperPublishEventToDevice');
                    const thisButton = $(thisPartial).find('.apiHelperPublishEventToDeviceButton');
    
                    $(thisButton).removeAttr('disabled');    
                }
            }
        });    
        $('.apiHelperPublishEventToDeviceButton').on('click', function() {
            const thisPartial = $(this).closest('div.apiHelperPublishEventToDevice');

            const deviceId = $(thisPartial).find('.apiHelperPublishEventToDeviceSelect').val();
            const eventName = deviceId + '/' + $(thisPartial).find('.apiHelperPublishEventToDeviceName').val();
            const eventData = $(thisPartial).find('.apiHelperPublishEventToDeviceData').val();

            const setStatus = function(status) {
                $(thisPartial).find('.apiHelperPublishEventToDeviceStatus').html(status);
            }
    
            setStatus('Publishing Event ' + eventName + '...');

            apiHelper.particle.publishEvent({ name: eventName, data: eventData, auth: apiHelper.auth.access_token  }).then(
                function (data) {
                    setStatus('Published: ' + eventName);
                    analytics.track('Success', {category:'Publish Device Event'});
                },
                function (err) {
                    analytics.track('Error', {category:'Publish Device Event', label:err});
                    setStatus('Error: ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);                
                }
            );            
    
        });

    }
    if ($('.apiHelperDeviceFunction').length > 0 && apiHelper.auth) {
        apiHelper.deviceList($('.apiHelperDeviceFunctionDeviceSelect'), {
            deviceFilter: function(dev) {
                return dev.functions && dev.functions.length > 0;
            },
            getTitle: function(dev) {
                return dev.name + (dev.online ? '' : ' (offline)');
            },
            hasRefresh: true,
            hasSelectDevice: true,
            onChange: function(elem) {
                const deviceId = $(elem).val();

                const thisPartial = $(elem).closest('div.apiHelperDeviceFunction');

                const functionSelect = $(thisPartial).find('.apiHelperDeviceFunctionFunctionSelect');

                const functionButton = (thisPartial).find('.apiHelperDeviceFunctionCall');

                $(functionSelect).html('');
                $(functionButton).attr('disabled', 'disabled');

                apiHelper.deviceListCache.forEach(function(dev) {
                    if (dev.id == deviceId) {
                        dev.functions.forEach(function(fn) {
                            $(functionSelect).append('<option name="' + fn + '">' + fn + '</option>');
                        });
                        $(functionButton).removeAttr('disabled');
                    }
                });
            }
        });    

        $('.apiHelperDeviceFunctionCall').on('click', function() {
            const thisPartial = $(this).closest('div.apiHelperDeviceFunction');

            const deviceId = $(thisPartial).find('.apiHelperDeviceFunctionDeviceSelect').val();
            const functionName = $(thisPartial).find('.apiHelperDeviceFunctionFunctionSelect').val();
            const arg = $(thisPartial).find('.apiHelperDeviceFunctionArg').val();

            const setStatus = function(status) {
                $(thisPartial).find('.apiHelperDeviceFunctionStatus').html(status);
            }
    
            setStatus('Making function call ' + functionName + ': ' + arg);

            apiHelper.particle.callFunction({ deviceId, name: functionName, argument: arg, auth: apiHelper.auth.access_token  }).then(
                function (data) {
                    analytics.track('Success', {category:'Call Function'});
                    setStatus('Success! (' + data.body.return_value + ')');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
                    analytics.track('Error', {category:'Call Function', label:err});
                    setStatus('Error: ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);                
                }
            );            
    
        });

    }


    if ($('.apiHelperDeviceVariable').length > 0 && apiHelper.auth) {
        apiHelper.deviceList($('.apiHelperDeviceVariableDeviceSelect'), {
            deviceFilter: function(dev) {
                return dev.variables && Object.keys(dev.variables).length > 0;
            },
            getTitle: function(dev) {
                return dev.name + (dev.online ? '' : ' (offline)');
            },
            hasRefresh: true,
            hasSelectDevice: true,
            onChange: function(elem) {
                const deviceId = $(elem).val();

                const thisPartial = $(elem).closest('div.apiHelperDeviceVariable');

                const variableSelect = $(thisPartial).find('.apiHelperDeviceVariableVariableSelect');

                const variableGetButton = (thisPartial).find('.apiHelperDeviceVariableGet');

                $(variableSelect).html('');
                $(variableGetButton).attr('disabled', 'disabled');

                apiHelper.deviceListCache.forEach(function(dev) {
                    if (dev.id == deviceId) {
                        Object.keys(dev.variables).forEach(function(v) {
                            $(variableSelect).append('<option name="' + v + '">' + v + '</option>');
                        });
                        $(variableGetButton).removeAttr('disabled');
                    }
                });
            }
        });    

        $('.apiHelperDeviceVariableGet').on('click', function() {
            const thisPartial = $(this).closest('div.apiHelperDeviceVariable');

            const deviceId = $(thisPartial).find('.apiHelperDeviceVariableDeviceSelect').val();
            const variableName = $(thisPartial).find('.apiHelperDeviceVariableVariableSelect').val();

            const setStatus = function(status) {
                $(thisPartial).find('.apiHelperDeviceVariableStatus').html(status);
            }
    
            setStatus('Getting Variable ' + variableName);

            // The getVariable method in Particle-api-js does not appear to return an error if the
            // variables does not exist
            $.ajax({
                error: function(err) {
                    analytics.track('Error', {category:'Get Variable', label:err.responseJSON.error});
                    setStatus('Error: ' + err.responseJSON.error);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);                
                },
                method: 'GET',
                success: function (resp) {
                    analytics.track('Success', {category:'Get Variable'});
                    setStatus(resp.result);
                },
                url: 'https://api.particle.io/v1/devices/' + deviceId + '/' + variableName + "?access_token=" + apiHelper.auth.access_token,
            });    
    
        });

    }

});



