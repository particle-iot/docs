
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


        const setSearchStatus = function(s) {
            $('.searchStatus').text(s);
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

        $('.apiHelperInput[data-key="password"]').on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $('.setCredentials').trigger('click');    
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

            setSearchStatus('Searching...');

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
                            setSearchStatus('1 device found');
                        }
                        else {
                            setSearchStatus(jsonResult.results.length + ' devices found');
                        }
                    }
                    else {
                        setSearchStatus('No devices found');
                    }

                }
                else {
                    setSearchStatus('Error searching devices');
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


        const updateWiFiStatus = function(statusObj) {
            if (statusObj.ready) {
                const tableParams = {
                    noOuterDiv: true,
                    cssClassTable: 'apiHelperTableNoMargin',
                    keyMapping: {
                        localIP: 'Local IP Address',
                        ready: 'Wi-Fi connected',
                    },
                    object: statusObj,
                };
            
                const tableElem = apiHelper.simpleTable(tableParams);
                $('.wifiStatusStatus').text('');
                $('.wifiStatusResult').html(tableElem);
            }
            else {
                $('.wifiStatusStatus').text('Wi-Fi is not connected');
                $('.wifiStatusResult').empty();
            }
                        
        }

        const startEventStream = function() {
            return new Promise(function(resolve, reject) {

                const deviceId = $('input[type="radio"][name="searchDevice"]:checked').val();
                if (deviceId != wifiConfig.deviceId) {
                    wifiConfig.deviceId = deviceId;

                    $('.wifiSetupEventsDiv').empty();
                }

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
                    
                    wifiConfig.stream.on('event', function(data) {
                        try {
                            // data
                            //  .data (string)
                            //  .coreid
                            //  .productID
                            //  .name
                            //  .published_at

                            if (data.coreid != wifiConfig.deviceId) {
                                // console.log('event from a different device', data);
                                return;
                            }

                            // This event is from the target device
                            let suffix = '';

                            let lastSlash = data.name.lastIndexOf('/');
                            if (lastSlash >= 0) {
                                suffix = data.name.substring(lastSlash + 1);
                            }

                            try {
                                const json = JSON.parse(data.data);

                                // console.log('event', {data, json, suffix});

                                if (wifiConfig.waitForResponse && wifiConfig.waitForResponse.op == suffix) {
                                    wifiConfig.waitForResponse.resolve(json);
                                }

                                if (suffix == 'wifiStatus') {
                                    updateWiFiStatus(json);
                                }
                            }
                            catch(e) {
                                // Not JSON (not fatal either)
                            }

                            {
                                const outerDivElem = document.createElement('div');
                                $(outerDivElem).addClass('wifiSetupEventLogEntry');
                                {
                                    const headerElem = document.createElement('div');
                                    $(headerElem).addClass('wifiSetupEventLogHeader');
                                    $(headerElem).text(data.name);
                                    $(outerDivElem).append(headerElem);
                                }
                                {
                                    const eventDataElem = document.createElement('div');
                                    $(eventDataElem).addClass('wifiSetupEventLogData');
                                    $(eventDataElem).text(data.data);
                                    $(outerDivElem).append(eventDataElem);
                                }

                                $('.wifiSetupEventsDiv').append(outerDivElem);
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

            // console.log('sendFunction', json);

            const setStatus = function(s) {
                if (sendFunctionOptions.statusElem) {
                    $(sendFunctionOptions.statusElem).text(s);
                }
            }

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

                const callResult = await apiHelper.particle.callFunction(particleOptions);
                /// console.log('callResult', callResult);

                // callResult
                //   .statusCode
                //   .body
                //     .id
                //     .name
                //     .connected
                //     .return_value

                if (sendFunctionOptions.waitForResponse) {
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
                    result = callResult.body.return_value;

                    // console.log('sendFunction complete (no wait) result=' + result, callResult);
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

            $('.wifiNetworkList').empty();

            await startEventStream();

            let scanResult = await sendFunction({op: 'wifiScan'}, {
                waitForResponse: true,
                statusElem: $('.wifiScanStatus'),
            });

            if (scanResult) {

                const tableParams = {
                    noOuterDiv: true,
                    cssClassTable: 'apiHelperTableNoMargin',
                    columns: [
                        {
                            radioName: 'selectNetwork',
                            radioValueKey: 'ssid',
                        },
                        {
                            key: 'ssid',
                            title: 'SSID',
                        },
                        {
                            key: 'rssi',
                            title: 'RSSI',  
                        },
                        {
                            key: 'security',
                            title: 'Security',  
                        },
                    ],
                    rows: [],
                };
                // Dedupe the scanResults and sort
                wifiConfig.networksBySsid = {};
                for(const res of scanResult) {
                    if (wifiConfig.networksBySsid[res.ssid]) {
                        if (res.rssi > wifiConfig.networksBySsid[res.ssid].rssi) {
                            wifiConfig.networksBySsid[res.ssid] = res;
                        }
                    }
                    else {
                        wifiConfig.networksBySsid[res.ssid] = res;
                    }
                }
                for(const ssid in wifiConfig.networksBySsid) {
                    tableParams.rows.push(wifiConfig.networksBySsid[ssid]);
                }
                tableParams.rows.sort(function(a, b) {
                    return a.ssid.localeCompare(b.ssid);
                });
            
                const tableElem = apiHelper.simpleTable(tableParams);
                $('.wifiNetworkList').html(tableElem);

                $(thisPartial).find('input[name="selectNetwork"]').on('click', function() {
                    const ssid = $(thisPartial).find('input[name="selectNetwork"]:checked').val();

                    wifiConfig.credentialsInput.values.ssid = ssid;
                    wifiConfig.credentialsInput.values.password = '';
                    wifiConfig.credentialsInput.values.security = wifiConfig.networksBySsid[ssid].security;
                    wifiConfig.credentialsInput.values.hidden = false;
                    wifiConfig.credentialsInput.setValues();

                    $('.apiHelperInput[data-key="password"]').focus();
                });
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

        // TODO: Handle Enter in password field

        $(thisPartial).find('.setCredentials').on('click', async function() {
            $(thisPartial).find('.actionButton').prop('disabled', true);

            await startEventStream();

            const req = {
                op: 'setCredentials',
                credentials: {
                    ssid: wifiConfig.credentialsInput.values.ssid,
                    password: wifiConfig.credentialsInput.values.password,
                    security: wifiConfig.credentialsInput.values.security,
                    hidden: wifiConfig.credentialsInput.values.hidden,
                    validate: true, // TESTING
                },
            };

            const result = await sendFunction(req, {
                waitForResponse: false,
                statusElem: $('.setCredentialsStatus'),
            });

            if (result == 0) {
                $('.setCredentialsStatus').text('');
            }
            else {
                $('.setCredentialsStatus').text('Set credentials failed (possibly invalid password)');
            }

            $(thisPartial).find('.actionButton').prop('disabled', false);

        });

        $(thisPartial).find('.getCredentials').on('click', async function() {
            $(thisPartial).find('.actionButton').prop('disabled', true);

            $('.wifiCredentialsList').empty();

            await startEventStream();

            const credentialsList = await sendFunction({op: 'getCredentials'}, {
                waitForResponse: true,
                statusElem: $('.getCredentialsStatus'),
            });

            if (credentialsList && credentialsList.length) {
                const tableParams = {
                    noOuterDiv: true,
                    cssClassTable: 'apiHelperTableNoMargin',
                    columns: [
                        {
                            key: 'ssid',
                            title: 'SSID',
                        },
                        {
                            key: 'security',
                            title: 'Security',  
                        },
                        // cipher
                        // BSSID
                    ],
                    rows: credentialsList,
                };
            
                const tableElem = apiHelper.simpleTable(tableParams);
                $('.wifiCredentialsList').html(tableElem);
            }
            else {
                $('.getCredentialsStatus').text('Device has no Wi-Fi networks configured');
            }

            $(thisPartial).find('.actionButton').prop('disabled', false);
        });

        $(thisPartial).find('.clearCredentials').on('click', async function() {
            $(thisPartial).find('.actionButton').prop('disabled', true);

            await startEventStream();

            $('.wifiCredentialsList').empty();

            const req = {
                op: 'clearCredentials',
            };

            await sendFunction(req, {
                waitForResponse: false,
                statusElem: $('.clearCredentialsStatus'),
            });

            $('.clearCredentialsStatus').text('');

            $(thisPartial).find('.actionButton').prop('disabled', false);
        });

        $(thisPartial).find('.wifiStatus').on('click', async function() {
            $(thisPartial).find('.actionButton').prop('disabled', true);

            $('.wifiStatusResult').empty();

            await startEventStream();

            const statusObj = await sendFunction({op: 'wifiStatus'}, {
                waitForResponse: true,
                statusElem: $('.wifiStatusStatus'),
            });
            
            updateWiFiStatus(statusObj);

            $(thisPartial).find('.actionButton').prop('disabled', false);
        });

    })

});

