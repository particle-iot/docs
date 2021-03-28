$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }


    if ($('.apiHelperPublishEvent').length > 0 && apiHelper.auth) {
        $('.apiHelperPublishEventButton').on('click', function() {
            const thisPartial = $(this).closest('div.apiHelperPublishEvent');

            const eventName = $(thisPartial).find('.apiHelperPublishEventName').val();
            const eventData = $(thisPartial).find('.apiHelperPublishEventData').val();

            const setStatus = function(status) {
                $(thisPartial).find('.apiHelperPublishEventStatus').html(status);
            }
    
            setStatus('Publishing Event ' + eventName + '...');

            apiHelper.particle.publishEvent({ name: eventName, data: eventData, auth: apiHelper.auth.access_token  }).then(
                function (data) {
                    setStatus('Published!');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
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
                },
                function (err) {
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
                    setStatus('Success! (' + data.body.return_value + ')');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
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

            apiHelper.particle.getVariable({ deviceId, name: variableName, auth: apiHelper.auth.access_token  }).then(
                function (data) {
                    setStatus(data.body.result);
                },
                function (err) {
                    setStatus('Error: ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);                
                }
            );            
    
        });

    }

});


