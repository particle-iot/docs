
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
                    ga('send', 'event', 'LED Function Test', 'Success');
                    setStatus('Success! (' + data.body.return_value + ')');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
                    ga('send', 'event', 'LED Function Test', 'Error', err);
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
                    ga('send', 'event', 'LED Color Test', 'Success');
                    setStatus('Success! (' + data.body.return_value + ')');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
                    ga('send', 'event', 'LED Color Test', 'Error', err);
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

    $('.apiHelperDeviceList').each(function() {
        const thisPartial = $(this);
        const gaCategory = 'deviceList'

        const actionButtonElem = $(thisPartial).find('.apiHelperActionButton');
        const outputElem = $(thisPartial).find('.deviceListOutput');
        let deviceRestoreInfo;
        let deviceList = [];
        let sandboxProducts = [];
        let orgList = [];
        let productIndex = {};
        let platformNames = {};
        let sandboxPlatforms = {};
        let userInfo;
        let allProductDevices = {};
        let sandboxProductCount = 0;

        const setStatus = function(status) {
            $(thisPartial).find('.apiHelperStatus').html(status);                
        };

        const renderList = function(list, prod, columns) {

        
            const ulElem = document.createElement('ul'); 
            if (list.length == 0) {
                let liElem = document.createElement('li');
                $(liElem).text('No devices');
                $(ulElem).append(liElem);                    
                $(outputElem).append(ulElem);                    
                return;
            }
            else {
                let liElem = document.createElement('li');
                $(liElem).text(list.length + ' devices');
                $(ulElem).append(liElem);                    

                if (prod) {
                    liElem = document.createElement('li');
                    if (prod.orgName) {
                        $(liElem).text('Organization product (' + prod.orgName + ')');    
                    }
                    else {
                        if (prod.mine) {
                            $(liElem).text('Sandbox product owned by me');    
                        }
                        else {
                            $(liElem).text('Sandbox product owned by ' + prod.user);    
                        }
                    }
                    $(ulElem).append(liElem);  
                    
                    if (!prod.orgName) {
                        liElem = document.createElement('li');
                        if (prod.mine) {
                            $(liElem).text('All devices in the product count against my device limit');    
                        }
                        else {
                            $(liElem).text('Product devices do not count against device limit (only my devices shown below)');    
                        }
                        $(ulElem).append(liElem);  
                    }
                    
                    
                    liElem = document.createElement('li');
                    if (platformNames[prod.platform_id]) {
                        $(liElem).text(platformNames[prod.platform_id] + ' product');
                    }
                    else {
                        $(liElem).text('Platform ' + prod.platform_id);
                    }             
                    $(ulElem).append(liElem);         
                
                }

                $(ulElem).append(liElem);                    
            }
            $(outputElem).append(ulElem);                    

            const tableElem = document.createElement('table');

            const columnTitles = {
                'id': 'Device ID',
                'name': 'Device Name',
                'platform_id': 'Platform',
                'owner': 'Owner',
                'last_handshake_at': 'Last Handshake',
                'system_firmware_version': 'Device OS'
            };

            {
                const theadElem = document.createElement('thead');

                const trElem = document.createElement('tr');

                for(const c of columns) {
                    const thElem = document.createElement('th');
                    $(thElem).text(columnTitles[c]);
                    $(trElem).append(thElem);
                }
    
                $(theadElem).append(trElem);
    
                $(tableElem).append(theadElem);                    
            }

            const tbodyElem = document.createElement('tbody');

            for(const dev of list) {
                const trElem = document.createElement('tr');

                for(const c of columns) {
                    const tdElem = document.createElement('td');

                    switch(c) {
                        case 'platform_id':
                            if (platformNames[dev[c]]) {
                                $(tdElem).text(platformNames[dev[c]]);
                            }
                            else {
                                $(tdElem).text(dev[c]);
                            }
                            break;

                        case 'last_handshake_at':
                            {
                                let s = dev[c].replace('T', ' ');
                                let off = s.lastIndexOf('.');
                                s = s.substr(0, off);
                                $(tdElem).text(s);
                            }
                            break;

                        default:
                            if (dev[c]) {
                                $(tdElem).text(dev[c]);
                            }
                            break;

                    }

                    $(trElem).append(tdElem);
                }


                $(tbodyElem).append(trElem);
            }

            $(tableElem).append(tbodyElem);

            $(outputElem).append(tableElem);                    

        };

        const displayList = function() {
            $(actionButtonElem).prop('disable', false);

            setStatus('');

            // Break out devices by product
            let sandboxDevices = [];
            let productDevices = {};
            let orgProductCount = 0;

            sandboxPlatforms = {};

            for(const d of deviceList) {
                if (d.product_id == d.platform_id) {
                    sandboxDevices.push(d);

                    if (platformNames[d.platform_id]) {
                        if (!sandboxPlatforms[d.platform_id]) {
                            sandboxPlatforms[d.platform_id] = [];
                        }
                        sandboxPlatforms[d.platform_id].push(d.id);    
                    }
                }
                else {
                    if (!productDevices[d.product_id]) {
                        productDevices[d.product_id] = [];
                    }
                    productDevices[d.product_id].push(d);
                    if (productIndex[d.product_id].orgName) {
                        orgProductCount++;
                    }
                }
            }

            $(outputElem).html('');

            let sectionElem = document.createElement('h3');
            $(sectionElem).text('Developer sandbox (non-product) devices');
            $(outputElem).append(sectionElem);
            renderList(sandboxDevices, null, ['id', 'name', 'platform_id', 'last_handshake_at', 'system_firmware_version']);

            if (Object.keys(sandboxPlatforms).length > 0) {
                sectionElem = document.createElement('h4');
                $(sectionElem).text('Download developer sandbox (non-product) device lists')
                $(outputElem).append(sectionElem);    

                const ulElem = document.createElement('ul');

                for(const platformId in sandboxPlatforms) {
                    const liElem = document.createElement('li');
                    const aElem = document.createElement('a');

                    const platformDeviceList = sandboxPlatforms[platformId];

                    $(aElem).text(platformNames[platformId] + ' device list');
                    $(aElem).on('click', function() {
                        const exportText = platformDeviceList.join('\n');

                        let blob = new Blob([exportText], {type:'text/plain'});
                        saveAs(blob, 'devices.txt');			
                    });
                    $(liElem).append(aElem);

                    const textElem = document.createTextNode(' (' + platformDeviceList.length + ' devices)');
                    $(liElem).append(textElem);

                    $(ulElem).append(liElem);
                }
                
                $(outputElem).append(ulElem);    
            }

            for(const productId in productDevices) {
                sectionElem = document.createElement('h3');
                $(sectionElem).text('Product ' + productIndex[productId].name + ' (' + productId + ')');
                $(outputElem).append(sectionElem);    

                if (productIndex[productId].mine) {
                    renderList(allProductDevices[productId], productIndex[productId], ['id', 'name', 'owner', 'last_handshake_at', 'system_firmware_version']);
                }
                else {
                    renderList(productDevices[productId], productIndex[productId], ['id', 'name', 'owner', 'last_handshake_at', 'system_firmware_version']);
                }
            }

            {
                let sectionElem = document.createElement('h3');
                $(sectionElem).text('Total Devices');                
                $(outputElem).append(sectionElem);
    
                const ulElem = document.createElement('ul'); 

                let liElem = document.createElement('li');
                $(liElem).text('Developer sandbox (non-product) devices: ' + sandboxDevices.length);
                $(ulElem).append(liElem);                    

                liElem = document.createElement('li');
                $(liElem).text('Sandbox product devices: ' + sandboxProductCount);
                $(ulElem).append(liElem);                    

                liElem = document.createElement('li');
                $(liElem).text('Organization product devices: ' + orgProductCount);
                $(ulElem).append(liElem);                    

                $(outputElem).append(ulElem);                    

            }
        };

        const listOrgProducts = function(index) {
            if (index >= orgList.length) {
                displayList();
                return;
            }

            setStatus('Getting organization products for ' + orgList[index].name + '...');

            const request = {
                dataType: 'json',
                error: function (jqXHR) {
                    setStatus('Listing organization products failed');
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    orgList[index].products = resp.products;

                    for(const p of orgList[index].products) {
                        productIndex[p.id] = {
                            name: p.name,
                            platform_id: p.platform_id,
                            sandbox: false,
                            orgId: orgList[index].id,
                            orgName: orgList[index].name
                        };                     
                    }

                    listOrgProducts(index + 1);
                },
                url: 'https://api.particle.io/v1/orgs/' + orgList[index].id + '/products/'
            };

            $.ajax(request);            
        };

        const listOrgs = function() {
            setStatus('Getting organizations...');

            const request = {
                dataType: 'json',
                error: function (jqXHR) {
                    setStatus('Listing organizations failed');
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    orgList = resp.organizations

                    listOrgProducts(0);
                },
                url: 'https://api.particle.io/v1/orgs/'
            };

            $.ajax(request);

        };

        const listProductDevicesPage = function(index, page) {
            apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token, product: sandboxProducts[index].id, page }).then(
                function(data) {
                    sandboxProductCount += data.body.devices.length;
                    for(const d of data.body.devices) {
                        allProductDevices[sandboxProducts[index].id].push(d);
                    }
                     
                    if (page < data.body.meta.total_pages) {
                        listProductDevicesPage(index, page + 1);
                    }
                    else {
                        listProductDevices(index + 1);
                    }
                },
                function(err) {
                    setStatus('Error retrieving product device list');
                    $(actionButtonElem).prop('disable', false);
                }
            );


        };
        const listProductDevices = function(index) {
            while(index < sandboxProducts.length && sandboxProducts[index].user != userInfo.username) {
                index++;
            }

            if (index >= sandboxProducts.length) {
                listOrgs();
                return;
            }
            setStatus('Getting sandbox product devices for ' + sandboxProducts[index].name + '...');

            allProductDevices[sandboxProducts[index].id] = [];

            listProductDevicesPage(index, 1);
        };

        const listProducts = function() {
            setStatus('Getting sandbox products...');
            const request = {
                dataType: 'json',
                error: function (jqXHR) {
                    setStatus('Listing products failed');
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    sandboxProducts = resp.products;
                    
                    for(const p of sandboxProducts) {
                        productIndex[p.id] = {
                            name: p.name,
                            user: p.user,
                            platform_id: p.platform_id,
                            sandbox: true,
                            mine: (p.user == userInfo.username)
                        };                     
                    }

                    listProductDevices(0);
                },
                url: 'https://api.particle.io/v1/user/products/'
            };

            $.ajax(request);

        };

        const listDevices = function() {
            setStatus('Getting sandbox devices...');

            fetch('/assets/files/deviceRestore.json')
                .then(response => response.json())
                .then(function(res) {
                    deviceRestoreInfo = res;
                    for(const p of deviceRestoreInfo.platforms) {
                        platformNames[p.id] = p.title;
                    }
                    platformNames[0] = 'Core';
                });

            apiHelper.particle.getUserInfo({ auth: apiHelper.auth.access_token }).then(
                function(data) {
                    userInfo = data.body;

                    apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token }).then(
                        function(data) {
                            deviceList = data.body;
                            for(let d of deviceList) {
                                d.owner = userInfo.username;
                            }
        
                            listProducts();
                        },
                        function(err) {
                            setStatus('Error retrieving device list');
                            $(actionButtonElem).prop('disable', false);
                        }
                    );
        
                },
                function(err) {
                    setStatus('Error retrieving user information (access token may have expired)');
                    $(actionButtonElem).prop('disable', false);
                }
            )

        };


        $(actionButtonElem).on('click', async function() {
            $(actionButtonElem).prop('disable', true);


            listDevices();
        });


    });

    apiHelper.deviceLookup = function(options) {
        let deviceLookup = {};

        // Input in options:
        // deviceLookup.deviceId
        // deviceLookup.deviceLookupElem
        
        // Optional in options:
        // platformId - This will reduce the number of products needed to be checked if you know it (such as for a device connected by USB)

        deviceLookup.options = options;
        
        deviceLookup.deviceFound = false;
        // deviceLookup.deviceInfo;
        deviceLookup.deviceMine = false;
        // deviceLookup.deviceProductName;
        // deviceLookup.deviceProductId;

        if (!options.deviceLookupDetailBodyElem) {
            options.deviceLookupDetailBodyElem = $(options.deviceLookupElem).find('.apiHelperDeviceLookupOutputDetails > table > tbody');
        }
        $(options.deviceLookupDetailBodyElem).html('');


        deviceLookup.run = async function() {

            deviceLookup.userInfo = (await apiHelper.particle.getUserInfo({ auth: apiHelper.auth.access_token })).body;

            {
                $(options.deviceLookupElem).find('.apiHelperDeviceLookupClaimedMyAccount').show();

                const currentOutput = function(status) {
                    $(options.deviceLookupElem).find('.apiHelperDeviceLookupClaimedMyAccount > span').append(status);
                };

                try {
                    const deviceData = await apiHelper.particle.getDevice({ deviceId: options.deviceId, auth: apiHelper.auth.access_token });
        
                    currentOutput('\u2705 Yes!'); // green check
                    deviceLookup.deviceFound = true;
                    deviceLookup.deviceInfo = deviceData.body;      
                    deviceLookup.deviceMine = true;  // Device is claimed to the account currently logged into

                    deviceLookup.isProductDevice = (deviceLookup.deviceInfo.product_id > 100);
                }
                catch(e) {
                    currentOutput('\u274C No'); // red x
                }
            }

            if (!deviceLookup.deviceFound || deviceLookup.isProductDevice) {
                $(options.deviceLookupElem).find('.apiHelperDeviceLookupProduct').show();

                const currentOutput = function(status) {
                    $(options.deviceLookupElem).find('.apiHelperDeviceLookupProduct > span').append(status);
                };

                try {
                    const productsData = await apiHelper.getProducts();
    
                    let foundInProduct = false;
    
                    for(const product of productsData.products) {
                        if (deviceLookup.deviceMine && deviceLookup.isProductDevice) {
                            if (product.id != deviceLookup.deviceInfo.product_id) {
                                // Skip this product
                                continue;
                            }
                        }
                        if (deviceLookup.options.platformId) {
                            if (product.platform_id != deviceLookup.options.platformId) {
                                continue;
                            }
                        }

                        try {
                            const deviceData = await apiHelper.particle.getDevice({ deviceId: options.deviceId, product: product.id, auth: apiHelper.auth.access_token });
            
                            if (deviceData.body.product_id == product.id) {
            
                                currentOutput('\u2705 ' + product.name + ' (' + product.id + ') Yes!<br/>'); // green check
                                foundInProduct = true;
                                deviceLookup.deviceFound = true;
                                deviceLookup.deviceInfo = deviceData.body;
                                deviceLookup.deviceProductName = product.name;
                                deviceLookup.deviceProductId = product.id;
                                deviceLookup.deviceInMyProduct = true; // Device is in a product owned by this account (sandbox)
                                deviceLookup.isProductDevice = true;
                                break;
                            }
                        }
                        catch(e) {
                        }

                        if (!foundInProduct) {
                            currentOutput('\u274C ' + product.name + ' (' + product.id + ')<br/>'); // red x
                        }
        
                    }
       
    
                }
                catch(e) {
                }
            }

            if ((!deviceLookup.deviceFound || deviceLookup.isProductDevice) && !options.modeNoCheckOrgs) {

                const currentOutput = function(status) {
                    $(options.deviceLookupElem).find('.apiHelperDeviceLookupOrg > span').append(status);
                };

                try {
                    const orgsData = await apiHelper.getOrgs();
    
                    for(const org of orgsData.organizations) {
                        // id, slug, name

                        const orgProducts = await apiHelper.getOrgProducts(org.id);

                        currentOutput('Checking organization ' + org.name + '...<br/>');
                        $(options.deviceLookupElem).find('.apiHelperDeviceLookupOrg').show();

                        for(const product of orgProducts.products) {
                            if (deviceLookup.deviceMine && deviceLookup.isProductDevice) {
                                if (product.id != deviceLookup.deviceInfo.product_id) {
                                    // Skip this product
                                    continue;
                                }
                            }
    
                            if (deviceLookup.options.platformId) {
                                if (product.platform_id != deviceLookup.options.platformId) {
                                    continue;
                                }
                            }
    
                            let foundInOrgProduct = false;
    
                            try {
                                const deviceData = await apiHelper.particle.getDevice({ deviceId: options.deviceId, product: product.id, auth: apiHelper.auth.access_token });
                                
                                if (deviceData.body.product_id == product.id) {
                                    currentOutput('\u2705 ' + product.name + ' (' + product.id + ') Yes!<br/>'); // green check
                                    deviceLookup.deviceFound = true;
                                    foundInOrgProduct = true;
                                    deviceLookup.deviceInfo = deviceData.body;
                                    deviceLookup.deviceProductName = product.name;
                                    deviceLookup.deviceProductId = product.id;
                                    deviceLookup.deviceInOrgProduct = true; // In an product in an org I have access to
                                    deviceLookup.orgId = org.id;
                                    deviceLookup.orgName = org.name;
                                    deviceLookup.isProductDevice = true;
                                    break;    
                                }
                            }
                            catch(e) {
                            }            

                            if (!foundInOrgProduct) {
                                currentOutput('\u274C ' + product.name + ' (' + product.id + ')<br/>'); // red x
                            }
                        }

                        if (foundInOrgProduct) {
                            break;
                        }
                    }
                    if (orgsData.organizations.length == 0) {
                        currentOutput('\u274C You do not have access to any organizations<br/>'); // red x
                    }
                }
                catch(e) {
                }
            }

            if (deviceLookup.deviceInfo) {
                const currentOutput = function(label, value) {
                    if (typeof value == 'undefined') {
                        return;
                    }
                    $(options.deviceLookupDetailBodyElem).append(
                        '<tr>',
                        $(document.createElement('td')).text(label),
                        $(document.createElement('td')).text(value),
                        '</tr>'
                    );
                };

                const timeString = function(val) {
                    if (val) {
                        const d = new Date(val);
                        return d.toLocaleString();
                    }
                    else {
                        return 'unknown';
                    }
                };

                currentOutput('Device ID', deviceLookup.deviceInfo.id);
                currentOutput('Device Name', deviceLookup.deviceInfo.name);

                currentOutput('Online', deviceLookup.deviceInfo.online);
                currentOutput('Serial Number', deviceLookup.deviceInfo.serial_number);
                currentOutput('ICCID', deviceLookup.deviceInfo.iccid);
                currentOutput('IMEI', deviceLookup.deviceInfo.imei);
                    
                currentOutput('Device OS Version', deviceLookup.deviceInfo.system_firmware_version);

                currentOutput('Last Handshake', timeString(deviceLookup.deviceInfo.last_handshake_at));
                currentOutput('Last Heard', timeString(deviceLookup.deviceInfo.last_heard));
                currentOutput('Status', deviceLookup.deviceInfo.status);

                if (deviceLookup.deviceMine) {
                    currentOutput('Owner', deviceLookup.userInfo.username);
                }

                if (deviceLookup.isProductDevice) {
                    if (deviceLookup.deviceMine) {
                        currentOutput('Owner', deviceLookup.deviceInfo.username);
                    }
                    currentOutput('Product ID', deviceLookup.deviceInfo.product_id);
                    currentOutput('Product Name', deviceLookup.deviceProductName);
                    currentOutput('Development', deviceLookup.deviceInfo.development);
                    currentOutput('Quarantined', deviceLookup.deviceInfo.quarantined);
                    currentOutput('Firmware Version', deviceLookup.deviceInfo.firmware_version);
                    currentOutput('Desired Firmware Version', deviceLookup.deviceInfo.desired_firmware_version);
    
                    
                    currentOutput('Firmware Updates Enabled', deviceLookup.deviceInfo.firmware_updates_enabled);
                    currentOutput('Firmware Updates Forced', deviceLookup.deviceInfo.firmware_updates_forced);
                    if (deviceLookup.deviceInfo.groups) {
                        currentOutput('Groups', deviceLookup.deviceInfo.groups.join(' '));
                    } 
                    
                    if (deviceLookup.orgName) {
                        currentOutput('Organization Name', deviceLookup.orgName);
                    }
                }
            }
        };


        return deviceLookup;
    };


    $('.apiHelperDeviceLookup').each(function() {
        const deviceLookupElem = $(this);

        const mode = $(deviceLookupElem).attr('data-mode') || '';
        const modeUnclaim = mode.includes('unclaim');
        const modeRemoveProduct = mode.includes('removeProduct');
        const modeNoCheckOrgs = mode.includes('noCheckOrgs');
        
        const deviceLookupDeviceIdInputElem = $(deviceLookupElem).find('.apiHelperDeviceLookupDeviceId');
        const deviceLookupButtonElem = $(deviceLookupElem).find('.apiHelperDeviceLookupButton');
        const deviceLookupDetailBodyElem = $(deviceLookupElem).find('.apiHelperDeviceLookupOutputDetails > table > tbody');
        const deviceLookupClaimButtonElem = $(deviceLookupElem).find('.apiHelperDeviceLookupClaimButton');
        const deviceLookupDeviceRenameButtonElem = $(deviceLookupElem).find('.apiHelperDeviceLookupRenameDeviceButton');

        const setStatus = function(status) {
            $(deviceLookupElem).find('.apiHelperDeviceLookupStatus').html(status);                
        };

        /*
        $(deviceLookupDeviceIdInputElem).on('input', function() {
            const deviceId = $(deviceLookupDeviceIdInputElem).val();

            const isValid = (deviceId.length == 24) && (deviceId.match(/[A-Za-z0-9]+/) == deviceId);
            // console.log('deviceId=' + deviceId + ' isValid=' + isValid);

            $(deviceLookupButtonElem).prop('disabled', !isValid);        
        });
        */

        $(deviceLookupClaimButtonElem).on('click', async function() {
            $(deviceLookupClaimButtonElem).prop('disable', true);

            const deviceId = $(deviceLookupDeviceIdInputElem).val();

            const setStatus = function(status) {
                $(deviceLookupElem).find('.apiHelperDeviceLookupClaimDiv > .apiHelperDeviceLookupResult').html(status);
            };

            try {
                await apiHelper.particle.claimDevice({ deviceId, auth: apiHelper.auth.access_token });

                setStatus('Claiming succeeded!');
                $(deviceLookupButtonElem).trigger('click');    

                apiHelper.deviceListRefresh(function() {
                    apiHelper.setCommonDevice(deviceId);
                });
            }
            catch(e) {
                setStatus('Claiming failed.');
            }

            $(deviceLookupClaimButtonElem).prop('disable', false);
        });

        $(deviceLookupDeviceRenameButtonElem).on('click', async function() {
            $(deviceLookupDeviceRenameButtonElem).prop('disable', true);

            const deviceId = $(deviceLookupDeviceIdInputElem).val();
            const name = $('.apiHelperDeviceLookupRenameDeviceName').val();

            const setStatus = function(status) {
                $(deviceLookupElem).find('.apiHelperDeviceLookupRenameDeviceDiv > .apiHelperDeviceLookupResult').html(status);
            };

            try {
                await apiHelper.particle.renameDevice({ deviceId, name, auth: apiHelper.auth.access_token });

                setStatus('Renaming succeeded!');

                apiHelper.deviceListRefresh(function() {
                    apiHelper.setCommonDevice(deviceId);
                });
            }
            catch(e) {
                setStatus('Renaming failed.');
            }

            $(deviceLookupDeviceRenameButtonElem).prop('disable', false);
        });

        $(deviceLookupDeviceIdInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(deviceLookupButtonElem).trigger('click');    
        });

        $(deviceLookupButtonElem).on('click', async function() {
            $(deviceLookupElem).find('.apiHelperDeviceLookupOutput').show();

            let deviceId;
            const input = $(deviceLookupDeviceIdInputElem).val().trim();

            if (!deviceId) {
                // See if the input field contains a Device ID (24 character hex)
                const re = /([A-Fa-f0-9]{24})/;
                const m = input.match(re);
                if (m) {
                    deviceId = m[1];
                }    
            }

            if (!deviceId) {
                // Try looking for a serial number (alphanumerics, stop at space to skip mobile secret)
                const re = /([A-Za-z0-9]+)/;
                const m = input.match(re);
                if (m) {
                    // Lookup serial number
                    const serialNumber = m[1];

                    const res = await apiHelper.particle.lookupSerialNumber({serialNumber, auth: apiHelper.auth.access_token});

                    if (res && res.body && res.body.ok) {
                        deviceId = res.body.device_id;
                        // iccid, platform_id
                    }
                }
            }

            if (!deviceId) {
                setStatus('No Device ID or Serial Number found');
                return;
            }

            $(deviceLookupElem).find('.apiHelperDeviceLookupResult').html('');

            $(deviceLookupElem).find('.apiHelperDeviceLookupClaimedMyAccount').show();
            $(deviceLookupElem).find('.apiHelperDeviceLookupProduct').hide();
            $(deviceLookupElem).find('.apiHelperDeviceLookupOrg').hide();
            $(deviceLookupElem).find('.apiHelperDeviceLookupClaimDiv').hide();
            $(deviceLookupElem).find('.apiHelperDeviceLookupRenameDeviceDiv').hide();
                            

            let deviceLookup = apiHelper.deviceLookup({
                deviceId,
                deviceLookupElem,
                modeNoCheckOrgs,
                modeRemoveProduct,
                deviceLookupDetailBodyElem
            });

            await deviceLookup.run();

            if (deviceLookup.deviceInfo) {
                if (deviceLookup.deviceMine && modeUnclaim) {
                    $('.apiHelperDeviceLookupUnclaimDeviceDiv').show();
                    $(deviceLookupElem).find('.apiHelperDeviceLookupUnclaimDeviceButton').on('click', async function() {
                        const setButtonStatus = function(status) {
                            $(deviceLookupElem).find('.apiHelperDeviceLookupUnclaimDeviceStatus').text(status);
                        };
                        setButtonStatus('Unclaiming...');
                        try {
                            await apiHelper.unclaimDevice(deviceLookup.deviceInfo.id);
                            setButtonStatus('Successfully unclaimed device ' + deviceLookup.deviceInfo.id);
                        }
                        catch(e) {
                            setButtonStatus('Error unclaiming device');
                        }
                    });
                }
                if (deviceLookup.deviceProductId && modeRemoveProduct) {
                    $('.apiHelperDeviceLookupRemoveProductDiv').show();
                    $(deviceLookupElem).find('.apiHelperDeviceLookupRemoveProductButton').on('click', async function() {
                        const setButtonStatus = function(status) {
                            $(deviceLookupElem).find('.apiHelperDeviceLookupRemoveProductStatus').text(status);
                        };
                        setButtonStatus('Removing from product...');
                        try {
                            await apiHelper.unclaimProductDevice(deviceLookup.deviceInfo.id, deviceLookup.deviceProductId);
                            await apiHelper.removeProductDevice(deviceLookup.deviceInfo.id, deviceLookup.deviceProductId);    
                            setButtonStatus('Successfully removed from product ' + deviceLookup.deviceProductName);
                        }
                        catch(e) {
                            setButtonStatus('Error removing from product ' + deviceLookup.deviceProductName);
                        }
                    });
                }

                if (deviceLookup.deviceMine && !modeUnclaim){
                    $('.apiHelperDeviceLookupRenameDeviceName').val(deviceLookup.deviceInfo.name);
                    $(deviceLookupElem).find('.apiHelperDeviceLookupRenameDeviceDiv').show();    
                    apiHelper.setCommonDevice(deviceId);
                }
            }
            else if (!modeUnclaim) {
                $(deviceLookupElem).find('.apiHelperDeviceLookupClaimDiv').show();
            }
        });

    });
    


    $('.apiHelperIccidLookup').each(function() {
        const iccidLookupElem = $(this);

        const iccidLookupIccidInputElem = $(iccidLookupElem).find('.apiHelperIccidLookupIccid');
        const iccidLookupButtonElem = $(iccidLookupElem).find('.apiHelperIccidLookupButton');
        const iccidLookupDetailBodyElem = $(iccidLookupElem).find('.apiHelperIccidLookupOutputDetails > table > tbody');

        const setStatus = function(status) {
            $(iccidLookupElem).find('.apiHelperIccidLookupStatus').html(status);                
        };

        $(iccidLookupIccidInputElem).on('input', function() {
            const iccid = $(iccidLookupIccidInputElem).val();

            const isValid = (iccid.match(/89[0-9]{17,19}/) == iccid);

            $(iccidLookupButtonElem).prop('disabled', !isValid);        
        });

        $(iccidLookupIccidInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(iccidLookupButtonElem).trigger('click');    
        });

        $(iccidLookupButtonElem).on('click', async function() {
            $(iccidLookupElem).find('.apiHelperIccidLookupOutput').show();
            const iccid = $(iccidLookupIccidInputElem).val();

            $(iccidLookupElem).find('.apiHelperIccidLookupResult').html('');
            $(iccidLookupDetailBodyElem).html('');

    
            $(iccidLookupElem).find('.apiHelperIccidLookupProduct').hide();
            $(iccidLookupElem).find('.apiHelperIccidLookupOrg').hide();
        
                        
            let simFound = false;
            let simInfo;
            let simMine = false;

            {
                const currentOutput = function(status) {
                    $(iccidLookupElem).find('.apiHelperIccidLookupMyAccount > span').append(status);
                };

                try {
                    const simData = await apiHelper.particle.listSIMs({ iccid, auth: apiHelper.auth.access_token });

                    for(sim of simData.body.sims) {
                        if(sim._id == iccid) {
                            currentOutput('\u2705 Yes!'); // green check
                            simFound = true;
                            simInfo = sim;      
                            simMine = true;             
                        }
                    }

                }
                catch(e) {
                }

                if (!simFound) {
                    currentOutput('\u274C No'); // red x
                }
            }

            if (!simFound) {
                $(iccidLookupElem).find('.apiHelperIccidLookupProduct').show();

                const currentOutput = function(status) {
                    $(iccidLookupElem).find('.apiHelperIccidLookupProduct > span').append(status);
                };

                try {
                    const productsData = await apiHelper.getProducts();
    
    
                    for(const product of productsData.products) {

                        try {
                            const simData = await apiHelper.particle.listSIMs({ iccid, product: product.id, auth: apiHelper.auth.access_token });
            
                            if (simData.body.sims.length == 1) {
                                currentOutput('\u2705 ' + product.name + ' (' + product.id + ') Yes!<br/>'); // green check
                                simFound = true;
                                simInfo = simData.body.sims[0];
                                break;    
                            }
                        }
                        catch(e) {
                        }

                        if (!simFound) {
                            currentOutput('\u274C ' + product.name + ' (' + product.id + ')<br/>'); // red x
                        }                
                    }
                }
                catch(e) {
                }

                if (!simFound) {
                    currentOutput('&nbsp;<br/>');
                }
            }

            if (!simFound) {
                $(iccidLookupElem).find('.apiHelperIccidLookupOrg').show();

                const currentOutput = function(status) {
                    $(iccidLookupElem).find('.apiHelperIccidLookupOrg > span').append(status);
                };

                try {
                    const orgsData = await apiHelper.getOrgs();
    
                    for(const org of orgsData.organizations) {
                        // id, slug, name

                        const orgProducts = await apiHelper.getOrgProducts(org.id);

                        currentOutput('Checking organization ' + org.name + '...<br/>');

                        for(const product of orgProducts.products) {
    
                            try {
                                const simData = await apiHelper.particle.listSIMs({ iccid, product: product.id, auth: apiHelper.auth.access_token });
                                if (simData.body.sims.length == 1) {
                                    currentOutput('\u2705 ' + product.name + ' (' + product.id + ') Yes!<br/>'); // green check
                                    simFound = true;
                                    simInfo = simData.body.sims[0];
                                    break;    
                                }
                            }
                            catch(e) {
                            }            
                            if (!simFound) {
                                currentOutput('\u274C ' + product.name + ' (' + product.id + ')<br/>'); // red x
                            }
                        }

                        if (simFound) {
                            break;
                        }
                    }
                    if (orgsData.organizations.length == 0) {
                        currentOutput('\u274C You do not have access to any organizations<br/>'); // red x
                    }
                }
                catch(e) {
                }
            }

            if (simInfo) {
                const currentOutput = function(label, value) {
                    $(iccidLookupDetailBodyElem).append(
                        '<tr>',
                        $(document.createElement('td')).text(label),
                        $(document.createElement('td')).text(value),
                        '</tr>'
                    );
                };

                currentOutput('ICCID', simInfo._id);
                currentOutput('Status', simInfo.status);
                if (simInfo.last_device_id) {
                    currentOutput('Last used in device ID', simInfo.last_device_id);
                }
                if (simInfo.last_device_name) {
                    currentOutput('Last used in device name', simInfo.last_device_name);
                }
            }
            else {
                $(iccidLookupElem).find('.apiHelperIccidLookupClaimDiv').show();
            }
        });

    });
    
    $('.apiHelperDeviceRemove').each(function() {
        const thisPartial = $(this);
        const gaCategory = 'deviceRemove';

        const deviceTextAreaElem = $(thisPartial).find('.deviceTextArea');
        const productSelectElem = $(thisPartial).find('.apiHelperProductSelect');

        const removeFromProductRowElem = $(thisPartial).find('.removeFromProductRow');
        const removeFromProductElem = $(thisPartial).find('.removeFromProduct');
        const unclaimDeviceElem = $(thisPartial).find('.unclaimDevice');
        const releaseSimRowElem = $(thisPartial).find('.releaseSimRow');
        const releaseSimElem = $(thisPartial).find('.releaseSim');
        const actionButtonElem = $(thisPartial).find('.actionButton');
        const statusElem = $(thisPartial).find('.apiHelperStatus');
        const logDivElem = $(thisPartial).find('.logDiv');
        const logTextAreaElem = $(thisPartial).find('.logDiv > textarea');

        const deviceTableDivElem = $(thisPartial).find('.deviceTableDiv');
        const deviceTableElem = $(deviceTableDivElem).find('table');
        const deviceTableBodyElem = $(deviceTableElem).find('tbody');

        const executeButtonElem = $(thisPartial).find('.executeButton');
        const sandboxUnclaimWarningElem = $(thisPartial).find('.sandboxUnclaimWarning');
        

        const setStatus = function(s) {
            $(statusElem).text(s);
        }
        const appendLog = function(s) {
            const textNode = document.createTextNode(s);
            $(logDivElem).append(textNode, document.createElement('br'));
        }

        let deviceList;
        let deviceInfoMap = {};
        let simInfoMap = {};
        let userInfo = {
            productIndex: {},
            productDevices: {}
        };

        const checkDeviceList = function() {
            const deviceListRaw = $(deviceTextAreaElem).val();

            const deviceIdRE = /([a-f0-9]{24})/gi;

            deviceList = deviceListRaw.match(deviceIdRE);
            if (deviceList && deviceList.length) {
                $(actionButtonElem).prop('disabled', false);
                setStatus(deviceList.length + ' device IDs entered');
            }
            else {
                $(actionButtonElem).prop('disabled', true);
                setStatus('No device IDs in box');
            }
        };

        const checkExecuteButton = function(options) {
            let enableExecute = false;



            if (options.productId && options.removeFromProduct) {
                for(const deviceId in deviceInfoMap) {
                    if (!deviceInfoMap[deviceId].notFound) {
                        enableExecute = true;
                    }
                }
            }

            $(sandboxUnclaimWarningElem).hide();

            if (options.unclaimDevice) {
                let hasDevice = false;

                for(const deviceId in deviceInfoMap) {
                    const unclaimElem = deviceInfoMap[deviceId].unclaimElem;

                    if (deviceInfoMap[deviceId].owner) {
                        enableExecute = true;
                        hasDevice = true;
                        $(unclaimElem).text('');
                    }
                    else {
                        $(unclaimElem).text('No');
                    }
                }    

                if (!options.productId && hasDevice) {
                    $(sandboxUnclaimWarningElem).show();
                }            
            }
            else {

                for(const deviceId in deviceInfoMap) {
                    const unclaimElem = deviceInfoMap[deviceId].unclaimElem;
                    $(unclaimElem).text('No');
                }
            }

            if (options.releaseSim) {

                for(const iccid in simInfoMap) {
                    const releaseElem = simInfoMap[iccid].releaseElem;

                    if (!simInfoMap[iccid].notFound) {
                        enableExecute = true;
                        $(releaseElem).text('');    
                    }
                    else {
                        $(releaseElem).text('No');                        
                    }
                }                 
            }
            else {
                for(const iccid in simInfoMap) {
                    const releaseElem = simInfoMap[iccid].releaseElem;
                    $(releaseElem).text('No');
                }
            }

            $(executeButtonElem).prop('disabled', !enableExecute)

        };

        const addColumns = function(infoObj, columns) {
            for(const col of columns) {
                colElemKey = col + 'Elem';

                const tdElem = infoObj[colElemKey] = document.createElement('td');

                if (infoObj[col]) {
                    $(tdElem).text(infoObj[col]);
                }

                $(infoObj.rowElem).append(tdElem);
            }
        };


        const checkOperations = async function(options) {
            $(deviceTableBodyElem).html('');
            $(deviceTableDivElem).show();

            try {


                let hasSim = false;

                // 
                for(const deviceId of options.deviceList) {
                    let deviceInfo;

                    try {
                        if (options.productId) {
                            // Unclaim product device
                            deviceInfo = (await apiHelper.particle.getDevice({ deviceId, product:options.productId, auth: apiHelper.auth.access_token })).body;
                        }
                        else {
                            // Unclaim developer device
                            deviceInfo = (await apiHelper.particle.getDevice({ deviceId, auth: apiHelper.auth.access_token })).body;
                        }        
                    }
                    catch(e) {
                        console.log('exception getting deviceInfo for ' + deviceId);
                    }

                    if (!deviceInfo) {
                        deviceInfo = {
                            id: deviceId,
                            notFound: true
                        }
                    }

                    {
                        const rowElem = deviceInfo.rowElem = document.createElement('tr');

                        deviceInfo.deviceId = deviceInfo.id;
                        
                        addColumns(deviceInfo, ['deviceId', 'name', 'owner', 'iccid']);

                        if (deviceInfo.notFound) {
                            if (options.productId) {
                                // $(deviceInfo.removeStatusElem).text('Device not found in product');
                            }
                            else {
                                // $(deviceInfo.removeStatusElem).text('Device not found in sandbox');                                
                            }
                        }
                        if (deviceInfo.cellular && deviceInfo.iccid) {
                            hasSim = true;
                        }
                                                                
                        $(deviceTableBodyElem).append(rowElem);

                        deviceInfoMap[deviceId] = deviceInfo;        
                    }
                }

                if (hasSim) {
                    $(releaseSimRowElem).show();
                }
                else {
                    $(releaseSimRowElem).hide();
                }
                setStatus('Device and SIM check complete!');

                $(logTextAreaElem).val('');
                $(logDivElem).hide();

                ga('send', 'event', gaCategory, 'Check Success');

                checkExecuteButton(options);
            }
            catch(e) {
                console.log('exception', e);
                ga('send', 'event', gaCategory, 'Check Error');
            }

        };

        const appendLogLine = function(s) {
            const old = $(logTextAreaElem).val();

            $(logTextAreaElem).val(old + s + '\n');
        }

        const executeOperations = async function(options) {
            try {
                let hasErrors = false;

                $(logDivElem).show();

                let stats = {};

                if (options.productId) {
                    stats.product = true;
                }
                else {
                    stats.sandbox = true;
                }

                const deviceCount = Object.keys(deviceInfoMap).length;
                let deviceNum = 1;

                for(const deviceId in deviceInfoMap) {
                    setStatus('Processing device ' + deviceNum + ' of ' + deviceCount);
                    deviceNum++;

                    appendLogLine(deviceId + ' (' + deviceInfoMap[deviceId].name + ')');

                    if (deviceInfoMap[deviceId].notFound) {
                        if (options.productId) {
                            appendLogLine('  Not found in product  ' + options.productId + ' ****');
                        }
                        else {
                            appendLogLine('  Not found in developer sandbox ' + ' ****');
                        }
                        continue;
                    }

                    const iccid = deviceInfoMap[deviceId].iccid;
                    if (options.releaseSim && iccid) {
                        try {
                            if (options.productId) {
                                // Remove product SIM
                                await apiHelper.particle.removeSIM({ iccid, product:options.productId, auth: apiHelper.auth.access_token });
                            }
                            else {
                                // Remove developer SIM
                                await apiHelper.particle.removeSIM({ iccid, auth: apiHelper.auth.access_token });
                            }
                            stats.release = stats.release ? stats.release + 1 : 1;
                            appendLogLine('  Release SIM success ' + iccid);
                        }
                        catch(e) {
                            console.log('exception', e);
                            appendLogLine('  Release SIM failed ' + iccid + ' *****');
                            hasErrors = true;
                            stats.errors = stats.errors ? stats.errors + 1 : 1;
                        }
    
                    }
                    if (options.unclaimDevice && deviceInfoMap[deviceId].owner) {
                        const unclaimElem = deviceInfoMap[deviceId].unclaimElem;

                        try {
                            if (options.productId) {
                                // Unclaim product device
                                await apiHelper.particle.removeDeviceOwner({ deviceId, product:options.productId, auth: apiHelper.auth.access_token });
                            }
                            else {
                                // Unclaim developer device
                                await apiHelper.particle.removeDevice({ deviceId, auth: apiHelper.auth.access_token });
                            }    
                            appendLogLine('  Unclaim success ' + deviceInfoMap[deviceId].owner);
                            stats.unclaim = stats.unclaim ? stats.unclaim + 1 : 1;
                            // $(unclaimElem).html('&#x2705'); // green check
                        }
                        catch(e) {
                            console.log('exception', e);
                            appendLogLine('  Unclaim failed ' + deviceInfoMap[deviceId].owner + ' ****');
                            // $(unclaimElem).html('&#x274c'); // red x
                            hasErrors = true;
                            stats.errors = stats.errors ? stats.errors + 1 : 1;
                        }
                    }

                    if (options.productId && options.removeFromProduct) {
                        // Remove from product
                        try {
                            await apiHelper.particle.removeDevice({ deviceId, product:options.productId, auth: apiHelper.auth.access_token });

                            appendLogLine('  Remove from product ' + options.productId + ' success ');
                            stats.remove = stats.remove ? stats.remove + 1 : 1;
                        }
                        catch(e) {
                            console.log('exception', e);
                            appendLogLine('  Remove from product ' + options.productId + ' failed ' + ' ****');
                            hasErrors = true;
                            stats.errors = stats.errors ? stats.errors + 1 : 1;
                        }
                    }
                    

                }                
             
                if (!hasErrors) {
                    setStatus('All operations completed successfully!');
                } 
                else {
                    setStatus('Operations completed, but errors occurred');
                }

                $(actionButtonElem).prop('disabled', false);
                ga('send', 'event', gaCategory, 'Execute Success', JSON.stringify(stats));
            }
            catch(e) {
                console.log('exception', e);
                ga('send', 'event', gaCategory, 'Execute Error');
            }
        }

        const getOptions = function() {
            let options = $(thisPartial).data('getOptions')();

            options.removeFromProduct = (options.productId != 0) && $(removeFromProductElem).prop('checked'),
            options.unclaimDevice = $(unclaimDeviceElem).prop('checked');
            options.releaseSim = $(releaseSimElem).prop('checked');
            options.username = apiHelper.auth.username;
            options.accessToken = apiHelper.auth.access_token;
            options.deviceList = deviceList;

            return options;
        }

        $(thisPartial).on('updateProductList', async function(event, options) {
            switch(options.devOrProduct) {
                case 'product':
                    $(removeFromProductRowElem).show();
                    break;

                case 'dev':
                    $(removeFromProductRowElem).hide();
                    break;                    

            }
        });


        $(removeFromProductElem).on('click', function() {
            checkExecuteButton(getOptions());
        })
        $(unclaimDeviceElem).on('click', function() {
            checkExecuteButton(getOptions());
        })
        $(releaseSimElem).on('click', function() {
            checkExecuteButton(getOptions());
        })

        

        $(deviceTextAreaElem).on('input', function() {
            checkDeviceList();
        });

        $(actionButtonElem).on('click', function() {
    
            $(actionButtonElem).prop('disabled', true);

            checkOperations(getOptions());
        });

        $(executeButtonElem).on('click', function() {
            $(executeButtonElem).prop('disabled', true);
    
            // Hide all warning panes
            $(sandboxUnclaimWarningElem).hide();

            executeOperations(getOptions());
        });

        $(productSelectElem).on('click', function() {
            checkDeviceList();
        });


    });

    $('.apiHelperListDevices').each(function() {
        const thisPartial = $(this);
        const gaCategory = 'listDevices';

        const productOrSandboxSelectorElem = $(thisPartial).find('.apiHelperProductOrSandboxSelector');
        const productSelectElem = $(thisPartial).find('.apiHelperProductSelect');
        const actionButtonElem = $(thisPartial).find('.actionButton');

        const deviceTableDivElem = $(thisPartial).find('.deviceTableDiv');
        const deviceTableElem = $(deviceTableDivElem).find('table');
        const deviceTableHeadElem = $(deviceTableElem).find('thead');
        const deviceTableBodyElem = $(deviceTableElem).find('tbody');
        
        const statusElem = $(thisPartial).find('.apiHelperStatus');

        const progressDivElem = $(thisPartial).find('.progressDiv');
        const progressElem = $(progressDivElem).find('progress');

        const downloadDivElem = $(thisPartial).find('.downloadDiv');
        const formatSelectElem = $(thisPartial).find('.formatSelect');
        const includeHeaderCheckboxElem = $(thisPartial).find('.includeHeaderCheckbox');
        const dateFormatSelectElem = $(thisPartial).find('.dateFormatSelect');
        const downloadButtonElem = $(thisPartial).find('.downloadButton');
        const copyButtonElem = $(thisPartial).find('.copyButton');

        const fieldSelectorElem = $(thisPartial).find('.apiHelperFieldSelector');

        if (!apiHelper.auth) {
            // Not logged in
            $(thisPartial).hide();
            return;
        }

        let deviceList;

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams) {
            const formatParam = urlParams.get('format');
            if (formatParam) {
                $(formatSelectElem).val(formatParam);
            }
            const headerParam = urlParams.get('header');
            if (headerParam !== null) {
                $(includeHeaderCheckboxElem).prop('checked', !!headerParam);
            }
            const dateFormatParam = urlParams.get('dateFormat');
            if (dateFormatParam) {
                $(dateFormatSelectElem).val(dateFormatParam);
            }

        }

        const setStatus = function(s) {
            $(statusElem).text(s);
        }

        const getOptions = function() {
            
            let options = $(productOrSandboxSelectorElem).data('getOptions')();

            options.format = $(formatSelectElem).val();
            options.header = $(includeHeaderCheckboxElem).prop('checked');
            options.dateFormat = $(dateFormatSelectElem).val();

            options.username = apiHelper.auth.username;
            options.accessToken = apiHelper.auth.access_token;

            return options;
        }

        const clearDeviceList = function() {
            $(deviceTableBodyElem).html('');
            $(deviceTableDivElem).hide();
            $(downloadDivElem).hide();
        };

        const updateSearchParam = function() {
    
            try {
                const options = getOptions();

                let urlConfig = $(fieldSelectorElem).data('getUrlConfigObj')();

                urlConfig = Object.assign($(productOrSandboxSelectorElem).data('getUrlConfigObj')(), urlConfig);
                
                urlConfig.format = options.format;
                urlConfig.header = options.header;
                urlConfig.dateFormat = options.dateFormat;
                
                const searchStr = $.param(urlConfig);
    
                history.pushState(null, '', '?' + searchStr);     

                $(copyButtonElem).prop('disabled', (options.format == 'xlsx'));
            }
            catch(e) {
                console.log('exception', e);
            }
        };

        const getTableData = function(configObj, options) {

            let tableData = {
                keys:[],
                titles:[],
                widths:[],
                indexFor: {}
            }
            
            if (options.export && options.format == 'deviceId') {
                tableData.keys.push('id');
            }
            else
            if (options.export && options.format == 'iccid') {
                tableData.keys.push('iccid');                
            }
            else {
                for(field of configObj.fields) {
                    if (field.isChecked()) {
                        tableData.keys.push(field.key);
                        tableData.titles.push(field.customTitle ? field.customTitle : field.title);
                        tableData.widths.push(parseInt(field.customWidth ? field.customWidth : field.width));
                        tableData.indexFor[field.key] = tableData.keys.length - 1;
                    }
                }    
            }

            if (deviceList) {
                tableData.data = [];

                for(const deviceInfo of deviceList) {
                    let d = {};

                    if (options.export && options.format == 'iccid' && !deviceInfo['iccid']) {
                        continue;
                    }

                    for(const key of tableData.keys) {
                        if (typeof deviceInfo[key] !== 'undefined') {
                            if (Array.isArray(deviceInfo[key])) {
                                // Occurs for groups and functions
                                d[key] = deviceInfo[key].join(' ');
    
                                // TODO: Also handle object for variables. Maybe boolean as we well
                            }
                            else {
                                let value = deviceInfo[key];

                                if (options.convertDates) {
                                    if (key == 'last_heard' || key == 'last_handshake_at' ) {
                                        value = new Date(value);
                                    }
                                }

                                d[key] = value;
                            }
                        }
                    }
                    tableData.data.push(d);
                }    
            }

            // TODO: Filtering of desired rows
            // TODO: Date formatting

            return tableData;
        } 

        const refreshTable = function(configObj) {            
            // 
            const tableData = getTableData(configObj, getOptions());

            $(deviceTableHeadElem).html('');
            {
                const rowElem = document.createElement('tr');
                let col = 0;
                for(const title of tableData.titles) {
                    const thElem = document.createElement('th');
                    $(thElem).text(title);
                    $(rowElem).append(thElem);
                }
                $(deviceTableHeadElem).append(rowElem);
            }

            $(deviceTableBodyElem).html('');

            if (tableData.data) {
                $(downloadDivElem).show();

                for(const d of tableData.data) {
                    const rowElem = document.createElement('tr');
    
                    for(let col = 0; col < tableData.keys.length; col++) {
                        const key = tableData.keys[col];

                        const tdElem = document.createElement('td');
                        $(tdElem).css('width', tableData.widths[col] + 'ch');
        
                        if (d[key]) {
                            $(tdElem).text(d[key]);
                        }
        
                        $(rowElem).append(tdElem);
                    }
    
                    $(deviceTableBodyElem).append(rowElem);
    
                }
            }
            else {
                $(downloadDivElem).hide();
            }
        };

        const getDeviceList = async function(options) {
            $(deviceTableBodyElem).html('');
            $(deviceTableDivElem).show();

            try {
                let stats = {
                    product: (options.productId != 0)
                };

                // 
                setStatus('Getting device list...');
                $(progressDivElem).show();

                deviceList = await apiHelper.getAllDevices({
                    productId: options.productId,
                    owner: options.username,
                    progressElem: progressElem
                });

                $(progressDivElem).hide();

                stats.count = deviceList.length;

                setStatus('Device list retrieved!');

                refreshTable($(fieldSelectorElem).data('getConfigObj')());

                ga('send', 'event', gaCategory, 'Get Devices Success', JSON.stringify(stats));
            }
            catch(e) {
                console.log('exception', e);
                ga('send', 'event', gaCategory, 'Get Devices Error');
            }

        };

        $(actionButtonElem).on('click', function() {
            getDeviceList(getOptions());
        });

        $(productSelectElem).on('change', function() {
            clearDeviceList();
            updateSearchParam();
        });

        $(thisPartial).on('updateProductList', async function(event, options) {
            clearDeviceList();
            updateSearchParam();
        });

        $(thisPartial).on('fieldSelectorUpdate', async function(event, config) {
            refreshTable(config);
            updateSearchParam();
        });


        $(formatSelectElem).on('change', function() {
            updateSearchParam();
        });
        $(dateFormatSelectElem).on('change', function() {
            updateSearchParam();
        });

        $(includeHeaderCheckboxElem).on('click', function() {
            updateSearchParam();
        });

        const getXlsxData = function(options) {
            if (!options) {
                options = {};
            }
            if (!options.sheetName) {
                options.sheetName = 'Devices';
            }
            let xlsxData = {};

            xlsxData.options = getOptions();

            xlsxData.configObj = $(fieldSelectorElem).data('getConfigObj')();

            let getTableDataOptions = getOptions();

            getTableDataOptions.convertDates = (xlsxData.options.dateFormat != 'iso');
            getTableDataOptions.export = true;

            xlsxData.tableData = getTableData(xlsxData.configObj, getTableDataOptions);

            let conversionOptions = {
                header: xlsxData.tableData.keys
            };
            if (!xlsxData.options.header) {
                conversionOptions.skipHeader = true;
            }
            if (xlsxData.options.dateFormat != 'iso') {
                conversionOptions.dateNF = xlsxData.options.dateFormat;
            }

            if (!options.fileName) {
                switch(xlsxData.options.format) {
                    case 'deviceId':
                        options.fileName = 'devices.txt';
                        conversionOptions.skipHeader = true;
                        break;

                    case 'iccid':
                        options.fileName = 'iccids.txt';
                        conversionOptions.skipHeader = true;
                        break;

                    default:
                        options.fileName = 'devices.' + xlsxData.options.format;
                        break;
                }
            }
            let stats = {
                format: xlsxData.options.format,
                cols: xlsxData.tableData.keys.length,
                count: xlsxData.tableData.data.length
            };


            xlsxData.worksheet = XLSX.utils.json_to_sheet(xlsxData.tableData.data, conversionOptions);

            xlsxData.workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(xlsxData.workbook, xlsxData.worksheet, options.sheetName);

            if (xlsxData.options.header) {
                XLSX.utils.sheet_add_aoa(xlsxData.worksheet, [xlsxData.tableData.titles], { origin: "A1" });
            }

            // Columns widths
            if (!xlsxData.worksheet['!cols']) {
                xlsxData.worksheet['!cols'] = [];
            }
            for(let ii = 0; ii < xlsxData.tableData.widths.length; ii++) {
                if (!xlsxData.worksheet['!cols'][ii]) {
                    xlsxData.worksheet['!cols'][ii] = {};
                }
                xlsxData.worksheet['!cols'][ii].wch = xlsxData.tableData.widths[ii];
            }

            switch(xlsxData.options.format) {
                case 'xlsx':
                    // toFile/toClipboard is ignored; cannot create 
                    XLSX.writeFile(xlsxData.workbook, options.fileName);
                    ga('send', 'event', gaCategory, 'Download', JSON.stringify(stats));
                    break;

                case 'deviceId':
                case 'iccid':
                case 'csv':
                    xlsxData.textOut = XLSX.utils.sheet_to_csv(xlsxData.worksheet);
                    break;

                case 'tsv':
                    xlsxData.textOut = XLSX.utils.sheet_to_csv(xlsxData.worksheet, {FS:'\t'});
                    break;
            }
            if (xlsxData.textOut) {
                if (options.toClipboard) {
                    var t = document.createElement('textarea');
                    document.body.appendChild(t);
                    $(t).text(xlsxData.textOut);
                    t.select();
                    document.execCommand("copy");
                    document.body.removeChild(t);

                    ga('send', 'event', gaCategory, 'Clipboard', JSON.stringify(stats));
                }
                if (options.toFile) {
                    let blob = new Blob([xlsxData.textOut], {type:'text/' + xlsxData.options.format});
                    saveAs(blob, options.fileName);	        
                    ga('send', 'event', gaCategory, 'Download', JSON.stringify(stats));
                }
            }

            return xlsxData;
        }

        $(downloadButtonElem).on('click', function() {
            getXlsxData({toFile: true});

        });

        $(copyButtonElem).on('click', function() {
            getXlsxData({toClipboard: true});
            
        });


    });

    $('.apiHelperFieldSelector').each(function() {
        const thisPartial = $(this);

        const configElem = $(thisPartial).find('textarea');
        const configText = configElem.text();
        // console.log('configText', configText);
        let configObj = JSON.parse(configText);
        $(configElem).replaceWith('');

        for(const field of configObj.fields) {
            if (!field.width) {
                field.width = '10';
            }
        }

        // console.log('configObj', configObj);

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('k0')) {
            let newFields = [];

            for(let index = 0; ; index++) {
                let key = urlParams.get('k' + index);
                if (!key) {
                    break;
                }
                let checked = false;    
                if (key.startsWith('*')) {
                    checked = true;
                    key = key.substring(1);
                }

                const field = configObj.fields.find(f => f.key == key);
                if (field) {
                    field.checked = checked;
                    const customTitle = urlParams.get('t' + index);
                    if (customTitle) {
                        field.customTitle = customTitle;
                    }
                    const customWidth = urlParams.get('w' + index);
                    if (customWidth) {
                        field.customWidth = customWidth;
                    }
                    newFields.push(field);
                }
            }

            for(const field of configObj.fields) {
                const inNew = !!newFields.find(f => f.key == field.key);
                if (!inNew) {
                    field.checked = false;
                    newFields.push(field);
                }
            }

            // Add in other non-selected fields
            configObj.fields = newFields;
        }


        const refreshTable = function() {   
            $(thisPartial).trigger('fieldSelectorUpdate', [configObj]);
        };

        const moveField = function(fromKey, toKey, afterTarget) {
            let fromIndex = -1;
            let toIndex = -1;
            for(let ii = 0; ii < configObj.fields.length; ii++) {
                if (configObj.fields[ii].key == fromKey) {
                    fromIndex = ii;
                }
                if (configObj.fields[ii].key == toKey) {
                    toIndex = ii;
                }
            }

            if (fromIndex == toIndex || fromIndex < 0 || toIndex < 0) {
                return;
            }

            // Reorder items in the DOM
            $(configObj.fields[fromIndex].trElem).detach();
            if (afterTarget) {
                $(configObj.fields[toIndex].trElem).after(configObj.fields[fromIndex].trElem);

            }
            else {
                $(configObj.fields[toIndex].trElem).before(configObj.fields[fromIndex].trElem);

            }

            // Reorder items in array
            const fromArrayItem = configObj.fields[fromIndex];
            configObj.fields.splice(fromIndex, 1);
            if (toIndex > fromIndex) {
                toIndex--;
            }
            if (afterTarget) {
                toIndex++;
            }
            configObj.fields.splice(toIndex, 0, fromArrayItem);

            //console.log('fields', configObj.fields);
            refreshTable();
            
        };

        const tableElem = document.createElement('table');
        {
            $(tableElem).addClass('apiHelperTableNoMargin');

            {
                const theadElem = document.createElement('thead');
                const trElem = document.createElement('tr');

                {
                    // Drag to reorder
                    const thElem = document.createElement('th');
                    $(thElem).text('Reorder');
                    $(trElem).append(thElem);
                }
                {
                    const thElem = document.createElement('th');
                    $(thElem).text('Include');
                    $(trElem).append(thElem);
                }
                {
                    const thElem = document.createElement('th');
                    $(thElem).text('Column Name');
                    $(trElem).append(thElem);
                }
                {
                    const thElem = document.createElement('th');
                    $(thElem).text('Key');
                    $(trElem).append(thElem);
                }
                {
                    const thElem = document.createElement('th');
                    $(thElem).text('Width');
                    $(trElem).append(thElem);
                }

                $(theadElem).append(trElem);

                $(tableElem).append(theadElem);
            }

            const tbodyElem = document.createElement('tbody');

            for(const field of configObj.fields) {
                const trElem = field.trElem = document.createElement('tr');

                let tdElem;

                // Drag icon
                tdElem = document.createElement('td');
                $(tdElem).attr('style', 'vertical-align: middle !important');
                const imgElem = document.createElement('img');
                $(imgElem).attr('src', '/assets/images/drag-handle-black.png');
                $(imgElem).attr('width', '20');
                $(imgElem).attr('height', '20');
                $(imgElem).attr('style', 'margin:0px !important');
                $(imgElem).attr('draggable', 'true');
                $(imgElem).on('dragstart', function(ev) {
                    ev.originalEvent.dataTransfer.setData('text', field.key);
                });
                $(tdElem).append(imgElem);
                trElem.append(tdElem);

                // Checkbox
                tdElem = document.createElement('td');
                $(tdElem).attr('style', 'vertical-align: middle !important');

                const checkboxElem = document.createElement('input');
                $(checkboxElem).prop('type', 'checkbox');
                if (field.checked) {
                    $(checkboxElem).prop('checked', 'checked');
                }
                $(checkboxElem).on('click', function() {
                    refreshTable();
                });
                $(tdElem).append(checkboxElem);
                trElem.append(tdElem);

                field.isChecked = function() {
                    return $(checkboxElem).prop('checked');
                };

                // Field Name
                tdElem = document.createElement('td');
                $(tdElem).attr('style', 'vertical-align: middle !important');

                const titleInputElem = document.createElement('input');
                $(titleInputElem).attr('type', 'text');
                $(titleInputElem).attr('value', field.customTitle ? field.customTitle : field.title);
                $(titleInputElem).on('blur', function() {
                    field.customTitle = $(titleInputElem).val();
                    refreshTable();
                });
                $(tdElem).append(titleInputElem);
                trElem.append(tdElem);

                // Key
                tdElem = document.createElement('td');
                $(tdElem).attr('style', 'vertical-align: middle !important');
                $(tdElem).text(field.key);
                $(tdElem).on('click', function() {
                    $(checkboxElem).trigger('click');
                });
                trElem.append(tdElem);

                // Width
                tdElem = document.createElement('td');
                const widthInputElem = document.createElement('input');
                $(widthInputElem).attr('type', 'text');
                $(widthInputElem).attr('value', field.customWidth ? field.customWidth : field.width); 
                $(widthInputElem).attr('size', '5'); 
                $(widthInputElem).on('blur', function() {
                    field.customWidth = $(widthInputElem).val();                    
                    refreshTable();
                });
                $(tdElem).append(widthInputElem);
                trElem.append(tdElem);


                $(trElem).on('dragover', function(ev) {
                    const key = ev.originalEvent.dataTransfer.getData("text");                    
                    if (key != field.key) {
                        ev.preventDefault();
                    }
                });
                $(trElem).on('drop', function(ev) {
                    const key = ev.originalEvent.dataTransfer.getData("text");                    
                    console.log('ev', ev);

                    const targetClientHeight = ev.currentTarget.clientHeight;
                    const afterTarget = (ev.originalEvent.offsetY >= (targetClientHeight / 2));

                    moveField(key, field.key, afterTarget);
                });
    

                $(tbodyElem).append(trElem);
            }

            $(tableElem).append(tbodyElem);
        }

        $(thisPartial).append(tableElem);

        $(thisPartial).data('getConfigObj', function() {
            return configObj;
        });

        $(thisPartial).data('getUrlConfigObj', function() {
            let resultObj = {};
            let index = 0;

            for(const field of configObj.fields) {

                resultObj['k' + index] = (field.isChecked() ? '*' : '') + field.key;
                    
                if (field.customTitle && field.customTitle != field.title) {
                    resultObj['t' + index] = field.customTitle;
                }

                if (field.customWidth && field.customWidth != field.width) {
                    resultObj['w' + index] = field.customWidth;
                }

                index++;
            }
            return resultObj;
        });

        $(thisPartial).data('loadUrlConfig', function(urlConfig) {
            
        });


    });

    $('.apiHelperProductOrSandboxSelector').each(function() {
        const thisPartial = $(this);

        let urlParams = new URLSearchParams(window.location.search);

        const devOrProductRowElem = $(thisPartial).find('.devOrProductRow');
        const sandboxOrgRowElem = $(thisPartial).find('.sandboxOrgRow');
        const orgSelectorRowElem = $(thisPartial).find('.orgSelectorRow');
        const productSelectorRowElem = $(thisPartial).find('.productSelectorRow');
        const productSelectElem = $(thisPartial).find('.apiHelperProductSelect');
        const orgSelectElem = $(thisPartial).find('.apiHelperOrgSelect');

        if (!apiHelper.auth) {
            return;
        }

        let orgs;

        const getOptions = function() {
            const devOrProduct = $(devOrProductRowElem).find('input:checked').val();
            const sandboxOrg = $(sandboxOrgRowElem).find('input:checked').val();

            let productId = 0;
 
            if (devOrProduct == 'product') {
                productId = $(productSelectElem).val();
            }

            let options = {                
                isSandbox: (devOrProduct == 'dev'),
                hasOrgs: orgs.length > 0,
                devOrProduct, // 'dev' (sandbox non-product) or 'product'
                sandboxOrg,   // 'sandbox' product or 'org' product
                productId,    // 0 if sandbox
            };

            return options;
        }

        const updateProductList = async function() {
            if (!orgs) {
                // Not fully loaded yet
                return;
            }

            $(orgSelectorRowElem).hide();
            $(sandboxOrgRowElem).hide();    
            
            if (urlParams) {
                const devOrProductParam = urlParams.get('devOrProduct');
                if (devOrProductParam) {
                    $(devOrProductRowElem).find('input[value="' + devOrProductParam + '"]').prop('checked', true);
                }
                const sandboxOrgParam = urlParams.get('sandboxOrg')
                if (sandboxOrgParam) {
                    $(sandboxOrgRowElem).find('input[value="' + sandboxOrgParam + '"]').prop('checked', true);
                }
            }

            const devOrProduct = $(devOrProductRowElem).find('input:checked').val();
            switch(devOrProduct) {
                case 'product':
                    $(productSelectorRowElem).show();
                    break;

                case 'dev':
                    $(productSelectorRowElem).hide();
                    $(orgSelectorRowElem).hide();
                    $(sandboxOrgRowElem).hide();
                    break;                    
            }

            const sandboxOrg = $(sandboxOrgRowElem).find('input:checked').val();

            if (orgs.length) {
                // Has organizations

                switch(devOrProduct) {
                    case 'dev':
                        // No sandbox or organization popups
                        break;

                    case 'product':
                        $(sandboxOrgRowElem).show();
                        switch(sandboxOrg) {
                            case 'sandbox':
                                break;

                            case 'org':
                                $(orgSelectorRowElem).show();
                                break;
                        }               
                        break;
                }
            }

            let productsData;

            if (sandboxOrg == 'sandbox') {
                productsData = await apiHelper.getProducts();
            }
            else {
                const orgId = $(orgSelectElem).val();
                if (!orgId) {
                    return;
                }
                productsData = await apiHelper.getOrgProducts(orgId);
            }
            
            productsData.products.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

            $(productSelectElem).html('');

            for(const product of productsData.products) {
                const optionElem = document.createElement('option');
                $(optionElem).attr('value', product.id);
                $(optionElem).text(product.name + ' (' + product.id + ')');
                $(productSelectElem).append(optionElem);
            }

            if (urlParams) {
                const productIdParam = urlParams.get('productId');
                if (productIdParam) {
                    const productId = parseInt(productIdParam);
                    if (productId) {
                        $(productSelectElem).val(productId);
                    }
                }
                
                urlParams = null;
            }

            $(thisPartial).trigger('updateProductList', [getOptions()]);
        }

        $(devOrProductRowElem).find('input').each(function() {
            const radioElem = $(this);
            $(radioElem).on('click', async function() {
                await updateProductList();
            });
        });

        $(sandboxOrgRowElem).find('input').each(function() {
            const radioElem = $(this);
            $(radioElem).on('click', async function() {
                await updateProductList();
            });
        });

        $(orgSelectElem).on('change', updateProductList);

        apiHelper.getOrgs().then(async function(orgsData) {
            // No orgs: orgsData.organizations empty array
            // Object in array orgsData.organizations: id, slug, name
            orgs = orgsData.organizations;

            if (orgsData.organizations.length > 0) {

                for (let org of orgsData.organizations) {
                    const optionElem = document.createElement('option');
                    $(optionElem).attr('value', org.id);
                    $(optionElem).text(org.name);

                    $(orgSelectElem).append(optionElem);        
                }
                if (urlParams) {
                    const orgId = urlParams.get('org');
                    if (orgId) {
                        $(orgSelectElem).val(orgId);
                    }
                }

            }
            else {
                // No orgs
                // $(sandboxOrgRowElem).find('input[value=org]:radio').prop('disabled', true);
                $(orgSelectorRowElem).hide();
                $(sandboxOrgRowElem).hide();
            }

            await updateProductList();
        });


        $(thisPartial).data('getOptions', getOptions);
        
        $(thisPartial).data('getUrlConfigObj', function() {
            let resultObj = {};

            resultObj.devOrProduct = $(devOrProductRowElem).find('input:checked').val();
            resultObj.sandboxOrg = $(sandboxOrgRowElem).find('input:checked').val();

            if (orgs && orgs.length) {
                resultObj.org = $(orgSelectElem).val();
            }
 
            if (resultObj.devOrProduct == 'product') {
                resultObj.productId = $(productSelectElem).val();
            }
            else {
                resultObj.productId = 0;
            }

            return resultObj;
        });

    });


});

