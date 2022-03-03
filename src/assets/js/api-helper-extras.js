
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
    

    $('.apiHelperLocalLogIn').each(function() {
        // Handler for pane to allow login by username/password or token
        const thisPartial = $(this);
        const gaCategory = 'localLogin';

        const pageLoginElem = $(thisPartial).find('.pageLogin');
        const logInUsingRowElem = $(pageLoginElem).find('.logInUsingRow');
        const usernameRowElem = $(pageLoginElem).find('.usernameRow');
        const usernameInputElem = $(pageLoginElem).find('.usernameInput');
        const passwordRowElem = $(pageLoginElem).find('.passwordRow');
        const passwordInputElem = $(pageLoginElem).find('.passwordInput');
        const accessTokenRowElem = $(pageLoginElem).find('.accessTokenRow');
        const accessTokenInputElem = $(pageLoginElem).find('.accessTokenInput');
        const pageLoginButtonElem = $(pageLoginElem).find('.actionButton');

        const pageOTPElem = $(thisPartial).find('.pageOTP');
        const otpInputElem = $(pageOTPElem).find('.otpInput');
        const pageOTPButtonElem = $(pageOTPElem).find('.actionButton');

        const pageLogoutElem = $(thisPartial).find('.pageLogout');
        const pageLogoutButtonElem = $(pageLogoutElem).find('.actionButton');
        const loggedInAsElem = $(pageLogoutElem).find('.loggedInAs');
        
        const pageLoginFailedElem = $(thisPartial).find('.pageLoginFailed');

        let mfaToken;

        apiHelper.localLogin = {};


        $('.apiHelperRequiresLocalLogin').each(function() {
            $(this).hide();
        });

        const loginSuccess = function(token) {
            apiHelper.localLogin.accessToken = token;
            $(pageLogoutElem).show();
            $(pageLoginFailedElem).hide();
            $(loggedInAsElem).text(apiHelper.localLogin.username);

            $('.apiHelperRequiresLocalLogin').each(function() {
                $(this).show();
            });
        }
        
        const logInRadioChange = function() {
            const radioVal = $(logInUsingRowElem).find("input:checked").val();
            
            switch(radioVal) {
                case 'userPass':
                    $(usernameRowElem).show();
                    $(passwordRowElem).show();
                    $(accessTokenRowElem).hide();
                    $(usernameInputElem).focus();   
                    break;
                case 'token':
                    $(usernameRowElem).hide();
                    $(passwordRowElem).hide();
                    $(accessTokenRowElem).show();
                    $(accessTokenInputElem).focus();   
                    break;
            }
        };
        $(logInUsingRowElem).find('input').on('click', logInRadioChange);
        logInRadioChange();

        $(pageLoginButtonElem).on('click', function() {
            $(pageLoginElem).hide();
            $(pageLoginFailedElem).hide();

            $('.apiHelperRequiresLocalLogin').each(function() {
                $(this).hide();
            });
    
            const radioVal = $(logInUsingRowElem).find("input:checked").val();
            switch(radioVal) {
                case 'userPass':
                    // Attempt to log into the Particle cloud
                    apiHelper.localLogin.username = $(usernameInputElem).val();
                    $.ajax({
                        data: {
                            'client_id': 'particle',
                            'client_secret': 'particle',
                            'expires_in': 3600,
                            'grant_type': 'password',
                            'password': $(passwordInputElem).val(),
                            'username': $(usernameInputElem).val()
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (jqXHR.status === 403) {
                                // Got a 403 error, MFA required. Show the MFA/OTP page.
                                mfaToken = jqXHR.responseJSON.mfa_token;
                                $(pageOTPElem).show();
                                $(otpInputElem).val('');
                                $(otpInputElem).focus();
                                return;
                            }
                            console.log('error ' + textStatus, errorThrown);
                            $(pageLoginElem).show();
                            $(pageLoginFailedElem).show();
                        },
                        method: 'POST',
                        success: function (data) {
                            loginSuccess(data.access_token);
                        },
                        url: 'https://api.particle.io/oauth/token',
                    });
                    break;

                case 'token':
                    // Verify the token
                    $.ajax({
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('error ' + textStatus, errorThrown);
                            $(pageLoginElem).show();
                            $(pageLoginFailedElem).show();
                        },
                        method: 'GET',
                        success: function (data) {
                            apiHelper.localLogin.username = data.username;
                            loginSuccess($(accessTokenInputElem).val());
                        },
                        url: 'https://api.particle.io/v1/user?access_token=' + $(accessTokenInputElem).val(),
                    });
                    break;
            }
            
        });

        $(usernameInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(passwordInputElem).focus();   
        });  

        $(passwordInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(pageLoginButtonElem).trigger('click');    
        });  

        $(accessTokenInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(pageLoginButtonElem).trigger('click');    
        });  
        
        $(otpInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(pageOTPButtonElem).trigger('click');    
        });  

        $(pageOTPButtonElem).on('click', function() {
            const otpValue = $(otpInputElem).val();

            // console.log('otp login mfaToken=' + mfaToken + ' otpValue=' + otpValue);

            $(pageOTPElem).hide();

            $.ajax({
                data: {
                    'client_id': 'particle',
                    'client_secret': 'particle',
                    'grant_type': 'urn:custom:mfa-otp',
                    'mfa_token': mfaToken,
                    'otp': otpValue
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Invalid MFA token
                    $(pageLoginElem).show();
                    $(pageLoginFailedElem).show();
                },
                method: 'POST',
                success: function (data) {
                    loginSuccess(data.access_token);
                },
                url: 'https://api.particle.io/oauth/token',
            });
        })

        $(pageLogoutButtonElem).on('click', function() {
            console.log('logout');

            $(pageLoginElem).show();
            $(pageLogoutElem).hide();
  

            // Invalidate the token on the cloud side
            $.ajax({
                data: {
                    'access_token': apiHelper.localLogin.accessToken
                },
                method: 'DELETE',
                complete: function () {
                    // Show the login page
                    $('#mainDiv').css('display', 'none');
                    $('#loginDiv').css('display', 'inline');
                    $('#loginFailedDiv').css('display', 'none');
                },
                url: 'https://api.particle.io/v1/access_tokens/current',
            });
        })

    });

});

