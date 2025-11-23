$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.cloudWifiConfig').each(function() {
        const thisPartial = $(this);

        const wifiConfig = {
            productInfo: {}, // Object, key is product slug
            deviceInfo: {}, // Object, key is device ID
            setupFunctionName: 'WiFiSetup',
        };
        
        const updateButtons = async function() {
            const s = $('.deviceSearchText').val().trim();

            $('.deviceSearchButton').prop('disabled', (s.length == 0));

            const selectedDevice = $('input[type="radio"][name="searchDevice"]:checked').val();
            if (selectedDevice && wifiConfig.deviceInfo[selectedDevice].hasSetupFunction) {
                $('.wifiSetup').show();

                
            }
            else {
                // No devices listed
                $('.wifiSetup').hide();
            }
        };

        wifiConfig.tableParams = {
            noOuterDiv: true,
            cssClassTable: 'apiHelperTableNoMargin',
            columns: [
                {
                    radioName: 'searchDevice',
                    radioValueKey: 'id',
                },
                {
                    key: 'id',
                    title: 'Device ID',
                },
                {
                    key: 'name',
                    title: 'Device Name',  
                },
                {
                    key: 'serialNumber',
                    title: 'Serial Number',  
                },
                {
                    key: 'productName',
                    title: 'Product Name',  
                },
                {
                    key: 'hasSetupFunction',
                    title: 'Supports Wi-Fi Setup',
                    greenCheck: true,
                    // cssStyleBody: 'text-align: center;',
                },
                {
                    key: 'online',
                    title: 'Online',
                    greenCheck: true,
                }
            ],
            rows: [],
        };


        const setStatus = function(s) {
            $('.apiHelperDeviceFunctionStatus').text(s);
        }

        $(thisPartial).find('.deviceSearchText').on('input blur', async function() {
            await updateButtons();
        });
        
        $(thisPartial).find('.deviceSearchText').on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $('.deviceSearchButton').trigger('click');    
        });  

        $(thisPartial).find('.deviceSearchButton').on('click', async function() {
            const org = parseInt($('.apiHelperSandboxOrgSelect').val());

            const params = {
                text: $('.deviceSearchText').val().trim(),
                type: 'device',
            };
            const queryParams = new URLSearchParams(params);

            let searchUrl;
            let productInfoUrl;
            
            searchUrl = productInfoUrl = 'https://api.particle.io/v1/';

            if (org == 0) {
                searchUrl += 'user'
            }
            else {
                searchUrl += 'orgs/' + org;
            }
            searchUrl += '/search?' + queryParams.toString();
            productInfoUrl += 'products/';

            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                }
            };

            setStatus('Searching...');

            try {
                const fetchRes = await fetch(searchUrl, fetchOptions);

                const jsonResult = await fetchRes.json();


                if (jsonResult.ok) {
                    $('.searchResultTable').empty();

                    wifiConfig.tableParams.rows = [];

                    if (jsonResult.results.length > 0) {

                        wifiConfig.firstDeviceWithFunction = null;
                        wifiConfig.firstDeviceWithFunctionAndOnline = null;

                        for(const res of jsonResult.results) {
                            if (!res.device) {
                                continue;
                            }
                            // res
                            //   .device
                            //     .id
                            //     .name
                            //     .serialNumber
                            //     .productSlug
                            const tableRowObj = Object.assign({}, res.device);

                            if (!wifiConfig.deviceInfo[res.device.id]) {
                                wifiConfig.deviceInfo[res.device.id] = {
                                    id: res.device.id,
                                    name: res.device.name,
                                    serialNumber: res.device.serialNumber,
                                }; 
                            }

                            if (res.device.productSlug) {
                                // Product device
                                if (!wifiConfig.productInfo[res.device.productSlug]) {
                                    try {
                                        const productFetchRes = await fetch(productInfoUrl + res.device.productSlug, fetchOptions);
                                        const productRes = await productFetchRes.json();

                                        // productRes
                                        //   .product
                                        //      .id
                                        //      .name
                                        //      .description
                                        //      .platform_id
                                        //      .slug
                                        //      .user

                                        wifiConfig.productInfo[res.device.productSlug] = productRes.product;
                                    }   
                                    catch(e) {
                                        console.log('exception getting product ' + res.device.productSlug, e);
                                    }                                 
                                }
                                tableRowObj.productId = wifiConfig.deviceInfo[res.device.id].productId = wifiConfig.productInfo[res.device.productSlug].id;
                                tableRowObj.productName = wifiConfig.deviceInfo[res.device.id].productName =wifiConfig.productInfo[res.device.productSlug].name;
                                tableRowObj.platformId = wifiConfig.deviceInfo[res.device.id].platformId = wifiConfig.productInfo[res.device.productSlug].platform_id;
                                 
                            }
                            else {
                                // Sandbox device
                            }

                            if (!wifiConfig.deviceInfo[res.device.id].info) {
                                let url = 'https://api.particle.io/v1/';

                                if (wifiConfig.deviceInfo[res.device.id].productId) {
                                    url += 'products/' + wifiConfig.deviceInfo[res.device.id].productId + '/';
                                }
                                url += 'devices/' + res.device.id;

                                const fetchOptions = {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                    }
                                };
                                try {
                                    const fetchRes = await fetch(url, fetchOptions);

                                    const jsonResult = await fetchRes.json();
                                    
                                    wifiConfig.deviceInfo[res.device.id].info = jsonResult;

                                    tableRowObj.hasSetupFunction = wifiConfig.deviceInfo[res.device.id].hasSetupFunction = jsonResult.functions.includes(wifiConfig.setupFunctionName);
                                    tableRowObj.online = jsonResult.online;

                                    if (!wifiConfig.firstDeviceWithFunction) {
                                        if (tableRowObj.hasSetupFunction) {
                                            wifiConfig.firstDeviceWithFunction = res.device.id;
                                        }
                                    }
                                    if (!wifiConfig.firstDeviceWithFunctionAndOnline) {
                                        if (tableRowObj.hasSetupFunction && tableRowObj.online) {
                                            wifiConfig.firstDeviceWithFunctionAndOnline = res.device.id;
                                        }
                                    }
                                }
                                catch(e) {
                                    console.log('exception getting device info', e);
                                }
                            }

                            wifiConfig.tableParams.rows.push(tableRowObj);
                        }

                        const tableElem = apiHelper.simpleTable(wifiConfig.tableParams);
                        
                        $('.searchResultTableDiv').html(tableElem);

                        if (wifiConfig.firstDeviceWithFunctionAndOnline) {
                            $('input[type="radio"][name="searchDevice"][value="' + wifiConfig.firstDeviceWithFunctionAndOnline + '"]').prop('checked', true);
                        }
                        else
                        if (wifiConfig.firstDeviceWithFunction) {
                            $('input[type="radio"][name="searchDevice"][value="' + wifiConfig.firstDeviceWithFunction + '"]').prop('checked', true);
                        }
                        else {
                            $('input[type="radio"][name="searchDevice"]:first').prop('checked', true);
                        }

                        $('input[type="radio"][name="searchDevice"]').on('click', updateButtons);
                        await updateButtons();

                        $('.searchResultTableDiv').show();

                        if (jsonResult.results.length == 1) {
                            setStatus('1 device found');
                        }
                        else {
                            setStatus(jsonResult.results.length + ' devices found');
                        }
                    }
                    else {
                        setStatus('No devices found');
                    }

                }
                else {
                    setStatus('Error searching devices');
                }

                // .ok (bool)
                // .hasMore (bool)
                // .results (array)


            }
            catch(e) {
                console.log('exception getting search resuts', e);
            }

        });

        const getParticleOptions = function() {
            const deviceId = $('input[type="radio"][name="searchDevice"]:checked').val();

            let particleOptions  = {
                auth: apiHelper.auth.access_token,
                deviceId,
            };

            if (wifiConfig.deviceInfo[deviceId].productId) {
                particleOptions.product = wifiConfig.deviceInfo[deviceId].productId;
            }

            return particleOptions;
        };

        const startEventStream = function() {
            return new Promise(function(resolve, reject) {

                wifiConfig.deviceId = $('input[type="radio"][name="searchDevice"]:checked').val();

                let particleOptions  = {
                    auth: apiHelper.auth.access_token,
                };

                if (wifiConfig.deviceInfo[wifiConfig.deviceId].productId) {
                    particleOptions.product = wifiConfig.deviceInfo[wifiConfig.deviceId].productId;
                }
                else {
                    particleOptions.wifiConfig.deviceId = 'mine';
                }

                if (wifiConfig.stream) {
                    if (wifiConfig.eventStreamProduct == particleOptions.product) {
                        resolve(wifiConfig.stream);
                        return;
                    }
                    wifiConfig.stream.close(); // TODO: Verify that this is right
                    wifiConfig.stream = null;
                }
                wifiConfig.eventStreamProduct = particleOptions.product;
                
                $(thisPartial).find('.logsDiv').empty();
                $(thisPartial).find('.logsDiv').show();

                apiHelper.particle.getEventStream(particleOptions).then(function(stream) {
                    wifiConfig.stream = stream;
                    console.log('event stream started');
                    
                    wifiConfig.stream.on('event', function(data) {
                        try {
                            // data
                            //  .data (string)
                            //  .coreid
                            //  .productID
                            //  .name
                            //  .published_at

                            if (data.coreid != wifiConfig.deviceId) {
                                console.log('event from a different device', data);
                                return;
                            }

                            // This event is from the target device
                            let suffix = '';

                            let lastSlash = data.name.lastIndexOf('/');
                            if (lastSlash >= 0) {
                                suffix = data.name.substring(lastSlash + 1);
                            }

                            const json = JSON.parse(data.data);

                            console.log('event', {data, json, suffix});

                            if (wifiConfig.waitForResponse && wifiConfig.waitForResponse.op == suffix) {
                                wifiConfig.waitForResponse.resolve(json);
                            }

                        }
                        catch(e) {
                            console.log('exception in event handler', e);
                        }
                    });
                    resolve(wifiConfig.stream);
                });      

            });
        }

        const sendFunction = async function(json, sendFunctionOptions = {}) {
            let result;

            console.log('sendFunction', json);

            try {
                if (sendFunctionOptions.waitForResponse) {
                    wifiConfig.waitForResponse = {
                        op: json.op,                        
                    };

                    wifiConfig.waitForResponse.promise = new Promise(function(resolve, reject) {
                        wifiConfig.waitForResponse.resolve = resolve;
                        wifiConfig.waitForResponse.reject = reject;
                    });
                }

                let particleOptions = getParticleOptions();

                particleOptions.name = wifiConfig.setupFunctionName;
                particleOptions.argument = JSON.stringify(json);

                setStatus('Sending ' + json.op + ' request to ' + wifiConfig.deviceId + '...');

                await apiHelper.particle.callFunction(particleOptions);

                if (sendFunctionOptions.waitForResponse) {
                    console.log('sendFunction wait for response');
                    setStatus('Waiting for response from ' + wifiConfig.deviceId + '...');

                    const timeoutMs = sendFunctionOptions.timeout || 30000;
                    
                    const timer = setTimeout(function() {
                        wifiConfig.waitForResponse.reject('Timeout');
                    }, timeoutMs);

                    result = await wifiConfig.waitForResponse.promise;    

                    clearTimeout(timer);

                    setStatus('');
                    console.log('result', result);

                }
                else {
                    console.log('sendFunction complete (no wait)');
                    setStatus('Sent ' + json.op + ' request to ' + wifiConfig.deviceId);
                }
            }
            catch(e) {
                console.log('sendFunction exception', e);
                setStatus('Error sending ' + json.op + ' request to ' + wifiConfig.deviceId);
            }
            return result;
        };


        $(thisPartial).find('.wifiScan').on('click', async function() {
            $(thisPartial).find('.actionButton').prop('disabled', true);

            await startEventStream();

            let scanResult = await sendFunction({op: 'wifiScan'}, {waitForResponse:true});

            if (scanResult) {

            }

            $(thisPartial).find('.actionButton').prop('disabled', false);
        });

        wifiConfig.credentialsInput = {
            containerElem: $(thisPartial).find('.wifiSetupSetCredentials'),
            updateButtons: function() {            
                $(thisPartial).find('.setCredentials').prop('disabled', true);

                if (wifiConfig.credentialsInput.values.ssid != '') {
                    if (wifiConfig.credentialsInput.values.security == 'UNSEC') {
                        $(thisPartial).find('.wifiSetupSetCredentialsPasswordRow').hide();
                        $(thisPartial).find('.setCredentials').prop('disabled', false);
                    }
                    else {
                        $(thisPartial).find('.wifiSetupSetCredentialsPasswordRow').show();
                        if (wifiConfig.credentialsInput.values.password != '') {
                            $(thisPartial).find('.setCredentials').prop('disabled', false);
                        }
                    }
                }
            },
        };
        apiHelper.simpleInput(wifiConfig.credentialsInput);


        $(thisPartial).find('.setCredentials').on('click', async function() {
            $(thisPartial).find('.actionButton').prop('disabled', true);

            await startEventStream();

            $(thisPartial).find('.actionButton').prop('disabled', false);
        });

        $(thisPartial).find('.getCredentials').on('click', async function() {
            $(thisPartial).find('.actionButton').prop('disabled', true);

            await startEventStream();

            sendFunction({op: 'getCredentials'});

            $(thisPartial).find('.actionButton').prop('disabled', false);
        });

        $(thisPartial).find('.clearCredentials').on('click', async function() {
            $(thisPartial).find('.actionButton').prop('disabled', true);

            await startEventStream();

            $(thisPartial).find('.actionButton').prop('disabled', false);
        });

    })

});

