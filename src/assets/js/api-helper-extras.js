
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }


    if ($('.apiHelperLedFunctionTest').length > 0 && apiHelper.auth) {
        apiHelper.deviceList($('.apiHelperLedFunctionTestSelect'), {
            deviceFilter: function(dev) {
                return dev.functions.includes("led");
            },
            getTitle: function(dev) {
                return dev.name + (dev.online ? '' : ' (offline)');
            },
            hasRefresh: true,
            hasSelectDevice: true
        });    

        const setStatus = function(status) {
            $('.apiHelperLedFunctionTestStatus').html(status);
        }

        const ledControl = function(elem, cmd) {
            const deviceId = elem.find('select').val();

            setStatus('Sending request: ' + cmd);

            apiHelper.particle.callFunction({ deviceId, name: 'led', argument: cmd, auth: apiHelper.auth.access_token  }).then(
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
        };

        $('.apiHelperLedFunctionTestOn').on('click', function() {
            ledControl($(this).closest('div'), 'on');
        });

        $('.apiHelperLedFunctionTestOff').on('click', function() {
            ledControl($(this).closest('div'), 'off');
        });
    }

    if ($('.apiHelperColorFunctionTest').length > 0 && apiHelper.auth) {
        apiHelper.deviceList($('.apiHelperColorFunctionTestSelect'), {
            deviceFilter: function(dev) {
                return dev.functions.includes("setColor");
            },
            getTitle: function(dev) {
                return dev.name + (dev.online ? '' : ' (offline)');
            },
            hasRefresh: true,
            hasSelectDevice: true
        });    


        const ledControl = function(elem, cmd) {
            const deviceId = elem.find('select').val();

            const setStatus = function(status) {
                $(elem).find('.apiHelperColorFunctionTestStatus').html(status);
            }
    
            setStatus('Sending request: ' + cmd);

            apiHelper.particle.callFunction({ deviceId, name: 'setColor', argument: cmd, auth: apiHelper.auth.access_token  }).then(
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
        };

        $('.apiHelperColorFunctionTestSend').on('click', function() {
            const parent = $(this).closest('div.apiHelperColorFunctionTest');

            const color = $(parent).find('.apiHelperColorFunctionTestColor').val();
            const red = parseInt(color.substr(1, 2), 16);
            const green = parseInt(color.substr(3, 2), 16);
            const blue = parseInt(color.substr(5, 2), 16);

            ledControl(parent, red + ',' + green + ',' + blue);
        });

    }
    
});