$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.cloudWifiConfig').each(function() {
        const thisPartial = $(this);

        const wifiConfig = {
            productInfo: {}, // Object, key is product slug
            deviceInfo: {}, // Object, key is device ID
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

        $('.deviceSearchText').on('input blur', async function() {
            await updateButtons();
        });
        
        $('.deviceSearchText').on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $('.deviceSearchButton').trigger('click');    
        });  

        $('.deviceSearchButton').on('click', async function() {
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

                                    tableRowObj.hasSetupFunction = jsonResult.functions.includes('WiFiSetup');
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
                            console.log('firstDeviceWithFunctionAndOnline ' + wifiConfig.firstDeviceWithFunctionAndOnline);
                            $('input[type="radio"][name="searchDevice"][value="' + wifiConfig.firstDeviceWithFunctionAndOnline + '"]').prop('checked', true);
                        }
                        else
                        if (wifiConfig.firstDeviceWithFunction) {
                            console.log('firstDeviceWithFunction ' + wifiConfig.firstDeviceWithFunction);
                            $('input[type="radio"][name="searchDevice"][value="' + wifiConfig.firstDeviceWithFunction + '"]').prop('checked', true);
                        }
                        else {
                            console.log('select first');
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



    })

});

