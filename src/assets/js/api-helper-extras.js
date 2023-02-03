
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    const trochees = [
        'aardvark', 'bacon', 'badger', 'banjo', 'bobcat', 'boomer', 'captain', 'chicken', 'cowboy', 'cracker',
        'cranky', 'crazy', 'dentist', 'doctor', 'dozen', 'easter', 'ferret', 'gerbil', 'hacker', 'hamster', 'hindu',
        'hobo', 'hoosier', 'hunter', 'jester', 'jetpack', 'kitty', 'laser', 'lawyer', 'mighty', 'monkey', 'morphing',
        'mutant', 'narwhal', 'ninja', 'normal', 'penguin', 'pirate', 'pizza', 'plumber', 'power', 'puppy', 'ranger',
        'raptor', 'robot', 'scraper', 'scrapple', 'station', 'tasty', 'trochee', 'turkey', 'turtle', 'vampire',
        'wombat', 'zombie'];


    apiHelper.getRandomTrochee = function() {
        const arr = trochees;
        const parts = [];
        for (let i = 0; i < 2; i++) {
            const a = Math.floor(Math.random() * arr.length);
            parts.push(arr[a]);
        }
        return parts.join('_');
    };


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
                setStatus('');
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
        
                    deviceLookup.deviceFound = true;
                    deviceLookup.deviceInfo = deviceData.body;      

                    deviceLookup.isProductDevice = (deviceLookup.deviceInfo.product_id > 100);
                    if (deviceLookup.isProductDevice) {
                        // Need to check the owner field as the non-product API can return information about 
                        // devices you have access to that are not claimed to your account
                        deviceLookup.isProductDevice = true;
                        deviceLookup.deviceProductId = deviceLookup.deviceInfo.product_id;
                        deviceLookup.deviceMine = (deviceLookup.deviceInfo.owner == apiHelper.auth.username);
                    }
                    else {
                        // Non-product devices can only be claimed to your own account
                        deviceLookup.deviceMine = true;
                    }
                    if (deviceLookup.deviceMine) {
                        currentOutput('\u2705 Yes!'); // green check
                    }
                    else {
                        currentOutput('\u274C No'); // red x
                    }
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
                    const productRes = await apiHelper.particle.getProduct({ 
                        product: deviceLookup.deviceProductId,
                        auth: apiHelper.auth.access_token 
                    });

                    // console.log('productRes', productRes);
                    // body.product.
                    //  id, name, description, device_count, groups[], etc.
                    //  org, organization_id
    
                    foundInProduct = true;
                    deviceLookup.productInfo = productRes.body.product;
                    deviceLookup.deviceFound = true;
                    deviceLookup.deviceProductName = deviceLookup.productInfo.name;

                    if (deviceLookup.productInfo.org) {
                        deviceLookup.deviceInOrgProduct = true; // In an product in an org I have access to
                        deviceLookup.orgId = deviceLookup.productInfo.organization_id;
                        deviceLookup.orgName = deviceLookup.productInfo.org;    
                        currentOutput('\u2705 ' + deviceLookup.deviceProductName + ' (' + deviceLookup.deviceProductId + ') Yes (organization ' + deviceLookup.orgName + ')!<br/>'); // green check
                    }
                    else {
                        deviceLookup.deviceInMyProduct = true; // Device is in a product owned by this account (sandbox)
                        currentOutput('\u2705 ' + deviceLookup.deviceProductName + ' (' + deviceLookup.deviceProductId + ') Yes (sandbox)!<br/>'); // green check
                    }
    
                }
                catch(e) {
                    // This should never happen
                    console.log('exception', e);
                    currentOutput('\u274C No'); // red x
                }
            }
            /*
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
            */

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
                const options = {};
                getOptions(options);
                if (options.isSandbox || !!options.productId) {        
                    $(actionButtonElem).prop('disabled', false);
                } 
                else {
                    $(actionButtonElem).prop('disabled', true);
                }  
                
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
                    if (options.productId && deviceInfo.product_id != options.productId) {
                        deviceInfo.notFound = true;
                    }

                    {
                        const rowElem = deviceInfo.rowElem = document.createElement('tr');

                        deviceInfo.deviceId = deviceInfo.id;
                        
                        if (deviceInfo.notFound) {                            
                            if (options.productId) {
                                // $(deviceInfo.removeStatusElem).text('Device not found in product');
                                deviceInfo.status = 'Not in product';
                            }
                            else {
                                // $(deviceInfo.removeStatusElem).text('Device not found in sandbox');                                
                                deviceInfo.status = 'Not in sandbox';
                            }
                        }

                        addColumns(deviceInfo, ['deviceId', 'name', 'owner', 'iccid', 'status']);

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

        const getOptions = function(options = {}) {
            const productSelector = $(thisPartial).data('productSelector')
            productSelector.getOptions(options);

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
            let options = {};
            getOptions(options);
            checkExecuteButton(options);
        })
        $(unclaimDeviceElem).on('click', function() {
            let options = {};
            getOptions(options);
            checkExecuteButton(options);
        })
        $(releaseSimElem).on('click', function() {
            let options = {};
            getOptions(options);
            checkExecuteButton(options);
        })

        

        $(deviceTextAreaElem).on('input', function() {
            checkDeviceList();
        });

        $(actionButtonElem).on('click', function() {
            let options = {};
            getOptions(options);
    
            $(actionButtonElem).prop('disabled', true);

            checkOperations(options);
        });

        $(executeButtonElem).on('click', function() {
            let options = {};
            getOptions(options);

            $(executeButtonElem).prop('disabled', true);
    
            // Hide all warning panes
            $(sandboxUnclaimWarningElem).hide();

            executeOperations(options);
        });

        $(productSelectElem).on('click', function() {
            checkDeviceList();
        });


    });

    $('.apiHelperCloudApiDeviceSelect').each(async function() {
        const thisPartial = $(this);

        const options = $(thisPartial).data('options').split(',');

        const apiHelperCloudDeviceSelectElem = $(thisPartial).find('.apiHelperCloudDeviceSelect');
        const apiHelperCloudApiDeviceSelectStatusElem = $(thisPartial).find('.apiHelperCloudApiDeviceSelectStatus');

        const setStatus = function(s) {
            $(apiHelperCloudApiDeviceSelectStatusElem).text(s);
        }

        apiHelper.deviceList(apiHelperCloudDeviceSelectElem, {
            deviceFilter: function(dev) {
                return true;
            },
            getTitle: function(dev) {
                let result;

                if (dev.name) {
                    result = dev.name;
                }
                else {
                    result = dev.id;
                }
                result += (dev.online ? '' : ' (offline)');
            },                    
            hasRefresh: true,
            hasSelectDevice: true,
            onChange: async function(elem) {
                const newVal = $(elem).val();

            }
        });   

    });

    $('.apiHelperFlashTinker').each(async  function() {
        const thisPartial = $(this);

        const apiHelperCloudDeviceSelectElem = $(thisPartial).find('.apiHelperCloudDeviceSelect');
        const flashTinkerButtonElem = $(thisPartial).find('.flashTinkerButton');
        const apiHelperStatusElem = $(thisPartial).find('.apiHelperStatus');
        const flashControlsElem = $(thisPartial).find('.flashControls');

        const setStatus = function(s) {
            $(apiHelperStatusElem).text(s);
        }
         
        apiHelper.deviceList(apiHelperCloudDeviceSelectElem, {
            deviceFilter: function(dev) {
                return true;
            },
            getTitle: function(dev) {
                let result;

                if (dev.name) {
                    result = dev.name;
                }
                else {
                    result = dev.id;
                }
                let attributes = [];
                if (!dev.online) {
                    attributes.push('offline');                    
                }
                if (dev.isProductDevice) {
                    attributes.push('product');                    
                }
                if (dev.isTracker) {
                    attributes.push('tracker');     
                }
                if (dev.isTinker) {
                    attributes.push('tinker');                    
                }
                if (attributes.length) {
                    result += ' (' + attributes.join(', ') + ')';
                }                            
                return result;
            },                    
            hasRefresh: true,
            hasSelectDevice: true,
            monitorEvents: true,
            onChange: async function(elem) {
                const newVal = $(elem).val();
                if (newVal == 'select' || newVal == 'refresh') {
                    $(flashTinkerButtonElem).prop('disabled', true);      
                    return;
                }

                const dev = apiHelper.deviceListCache.find(e => e.id == newVal);
                console.log('device ' +  newVal, dev);

                const platformInfo = await apiHelper.getPlatformInfo(dev.platform_id);
                console.log('platformInfo', platformInfo);

                const deviceKind = platformInfo ? platformInfo.displayName : 'Device';

                let canFlash = true;
                
                if (dev.isTracker) {
                    setStatus('Tinker functionality is not available on the Tracker.');
                    $(flashControlsElem).hide();
                }
                else
                if (dev.isTinker) {
                    if (dev.online) {
                        setStatus(deviceKind + ' is online and appears to be running Tinker firmware.');
                    }
                    else {
                        setStatus(deviceKind + ' was last running Tinker firmware, but is currently offline.');
                        // canFlash = false; // Once automatic online status change works, uncomment this line
                    }
                    $(flashControlsElem).hide();
                }
                else 
                if (dev.productInfo && dev.productDevInfo) {
                    const prefix = deviceKind + ' is in product ' + dev.productInfo.name + ' (' + dev.productInfo.id + ') '; 
                    if (dev.productDevInfo.development) {
                        if (dev.online) {
                            setStatus(prefix + 'and is a development device so it can be used');
                        }
                        else {
                            setStatus(prefix + 'and is a development device so it could be used, but is currently offline');  
                            // canFlash = false; // Once automatic online status change works, uncomment this line
                        }
                        $(flashControlsElem).show();
                    }
                    else {
                        setStatus(prefix + 'but is not a development device so it can be used');
                        canFlash = false;                    
                        $(flashControlsElem).hide();
                    }
                }
                else {
                    if (dev.online) {
                        setStatus(deviceKind + ' is online and can be flashed with Tinker firmware');
                    }
                    else {
                        setStatus(deviceKind + ' is offline, make sure it is powered on and breathing cyan.');
                        // canFlash = false; // Once automatic online status change works, uncomment this line
                    }
                    $(flashControlsElem).show();
                }
                $(flashTinkerButtonElem).prop('disabled', !canFlash);      

            }
        });   

        $(flashTinkerButtonElem).on('click', async function() {
            let deviceRestoreInfo = await apiHelper.getDeviceRestoreInfo();

            const deviceId = $(apiHelperCloudDeviceSelectElem).val();

            const dev = apiHelper.deviceListCache.find(e => e.id == deviceId);

            // 
            const platformObj = deviceRestoreInfo.platforms.find(e => e.id == dev.platform_id);

            const versionsList = deviceRestoreInfo.versionsZipByPlatform[platformObj.name];

            const targetVersion = versionsList.find(e => apiHelper.versionSort(e, dev.system_firmware_version) >= 0);

            const baseUrl = '/assets/files/device-restore/' + targetVersion + '/' + platformObj.name;

            const zipUrl = baseUrl + '.zip';

            setStatus('Downloading restore image...');
        
            const zipFs = new zip.fs.FS();
        
            try {
                await zipFs.importHttpContent(zipUrl);
            }
            catch(e) {
                setStatus('Error getting restore image, cannot flash device');
                return;
            }   

            let zipEntry = zipFs.find('tinker.bin');
            if (!zipEntry) {
                zipEntry = zipFs.find('tracker-edge.bin');
            }

            
            let partBinary = await zipEntry.getUint8Array();
            
            let formData = new FormData();

            let blob = new Blob([partBinary], {type:'application/octet-stream'});
            formData.append('file', blob, 'firmware.bin');
            
            $.ajax({
                data: formData,
                contentType: false,
                error: function(err) {
                    setStatus('Error flashing device');
                },
                method: 'PUT',
                processData: false,
                success: function (resp) {
                    setStatus(resp.status);
                    setTimeout(function() {
                        setStatus('');
                    }, 8000);
                },
                url: 'https://api.particle.io/v1/devices/' + deviceId + "?access_token=" + apiHelper.auth.access_token,
            });    


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

        let productSelector = {};
        $(thisPartial).data('productSelector', productSelector);

        if (!apiHelper.auth) {
            return;
        }

        let noSandbox = !!$(thisPartial).data('no-sandbox');
        if (noSandbox) {
            $(devOrProductRowElem).hide();
        }

        productSelector.show = function() {
            $(thisPartial).show();
        }

        productSelector.hide = function() {
            $(thisPartial).hide();
        }

        productSelector.getOptions = function(options) {
            const devOrProduct = (noSandbox ? 'product' : $(devOrProductRowElem).find('input:checked').val());
            const sandboxOrg = $(sandboxOrgRowElem).find('input:checked').val();

            let productId = 0;
 
            if (devOrProduct == 'product') {
                productId = $(productSelectElem).val();
            }

            options.isSandbox = (devOrProduct == 'dev');
            options.hasOrgs = productSelector.orgs.length > 0;
            options.devOrProduct = devOrProduct; // 'dev' (sandbox non-product) or 'product'
            options.sandboxOrg = sandboxOrg;   // 'sandbox' product or 'org' product
            options.productId = productId;    // 0 if sandbox
        

        }

        const updateProductList = async function() {
            if (!productSelector.orgs) {
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

            if (productSelector.orgs.length) {
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

            let options = {};
            productSelector.getOptions(options);
            $(thisPartial).trigger('updateProductList', [options]);
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
            productSelector.orgs = orgsData.organizations;

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

        productSelector.getUrlConfigObj = function(resultObj) {
            resultObj.devOrProduct = $(devOrProductRowElem).find('input:checked').val();
            resultObj.sandboxOrg = $(sandboxOrgRowElem).find('input:checked').val();

            if (productSelector.orgs && productSelector.orgs.length) {
                resultObj.org = $(orgSelectElem).val();
            }
 
            if (resultObj.devOrProduct == 'product') {
                resultObj.productId = $(productSelectElem).val();
            }
            else {
                resultObj.productId = 0;
            }
        };

    });

    apiHelper.manualSettings = function() {
        let manualSettings = {
            settingsKey: 'manualSetup',
            settingsChangeEventName: 'manualSetupSettingsChange',
        };

        manualSettings.load = function() {
            manualSettings.settings = {};

            const savedSettings = localStorage.getItem(manualSettings.settingsKey);
            if (savedSettings) {
                try {
                    manualSettings.settings = JSON.parse(savedSettings);
                    if (manualSettings.settings.username != apiHelper.auth.username) {
                        manualSettings.settings = {};
                    }
                    else {
                        $('.apiHelperManualSetup').trigger(manualSettings.settingsChangeEventName, [manualSettings.settings]);
                    }
                }
                catch(e) {
                }
            }
            return manualSettings.settings;
        };

        manualSettings.get = function(options = {}) {
            if (!manualSettings.settings) {
                manualSettings.load()
            }
            if (!options.key) {
                return manualSettings.settings;
            }
            else {
                if (!manualSettings.settings[options.key]) {
                    manualSettings.settings[options.key] = {};
                }
                return manualSettings.settings[options.key];
            }
        };

        manualSettings.setKeyObject = function(key, obj) {
            manualSettings.get({key});

            manualSettings.settings[key] = Object.assign(manualSettings.settings[key], obj);

            manualSettings.save();
        };

        manualSettings.save = function() {
            manualSettings.settings.username = apiHelper.auth.username;

            localStorage.setItem(manualSettings.settingsKey, JSON.stringify(manualSettings.settings));

            $('.apiHelperManualSetup').trigger(manualSettings.settingsChangeEventName, [manualSettings.settings]);
        }

        $(document).on(manualSettings.settingsChangeEventName, function(event, settings) {
            manualSettings.settings = settings;
        });

        return manualSettings;
    }();


    $('.apiHelperCheckboxList').each(function() {
        const thisPartial = $(this);

        let checkboxList = {};
        $(thisPartial).data('checkboxList', checkboxList);

        checkboxList.urlKey = 'cb';

        checkboxList.getOptions = function(options = {}) {

            return options;
        }

        checkboxList.getUrlConfigObj = function(urlConfig) {
            const array = checkboxList.getSelectedItems();
            
            for(let ii = 0; ii < array.length; ii++) {
                urlConfig[checkboxList.urlKey + ii] = array[ii];
            }
        }

        checkboxList.loadUrlParams = function(urlParams) {
            checkboxList.urlParams = urlParams;
        }

        checkboxList.resize = function() {
            // Remove explicit widths
            $(thisPartial).find('div').each(function() {
                const itemElem = $(this);
                $(itemElem).css('width', '');
            });

            // Measure
            let maxWidth = 0;
            $(thisPartial).find('div').each(function() {
                const itemElem = $(this);
                const width = $(itemElem).width();
                if (width > maxWidth) {
                    maxWidth = width;
                }
            });

            // Assign to widest width
            $(thisPartial).find('div').each(function() {
                const itemElem = $(this);
                $(itemElem).css('width', (maxWidth + 10) + 'px');
            });
        };

        checkboxList.addItem = function(itemName, options = {}) {
            const divElem = document.createElement('div');
            const labelElem = document.createElement('label');

            const checkboxElem = document.createElement('input');
            $(checkboxElem).attr('type', 'checkbox');
            $(checkboxElem).data('itemName', itemName);

            if (options.checked) {
                $(checkboxElem).prop('checked', true);
            }

            $(checkboxElem).on('click', function() {
                $(thisPartial).trigger('updateSearchParam'); 
            });

            $(labelElem).append(checkboxElem);
            $(labelElem).append(document.createTextNode(itemName));
            
            $(divElem).append(labelElem);
            $(divElem).append(document.createElement('br'));

            $(thisPartial).append(divElem);            
            checkboxList.resize();
        };

        checkboxList.addArray = function(array, options = {}) {
            for(const itemName of array) {
                checkboxList.addItem(itemName, options);
            }

            if (checkboxList.urlParams) {

                for(let ii = 0; ; ii++) {
                    const value = checkboxList.urlParams.get(checkboxList.urlKey + ii);
                    if (!value) {
                        break;
                    }
                    checkboxList.selectItem(value);
                }
    
                checkboxList.urlParams = null;
            }


            checkboxList.resize();
        };

        checkboxList.selectItem = function(itemName) {
            $(thisPartial).find('input').each(function() {
                const itemElem = $(this);
                if ($(itemElem).data('itemName') == itemName) {
                    $(itemElem).prop('checked', true);
                }
            });
        };

        checkboxList.getSelectedItems = function(itemName) {
            let array = [];

            $(thisPartial).find('input').each(function() {
                const itemElem = $(this);
                if ($(itemElem).prop('checked')) {
                    const itemName = $(itemElem).data('itemName');
                    array.push(itemName);
                }
            });

            return array;
        };


        checkboxList.empty = function() {
            $(thisPartial).empty();
        };


    });

    // Select or create a device group
    $('.apiHelperDeviceGroup').each(function() {
        const thisPartial = $(this);

        let productId;
        let groups;

        const productIsSelectedElem = $(thisPartial).find('.productIsSelected');
        // const selectedProductCellElem = $(thisPartial).find('.selectedProductCell');

        const groupListDivElem = $(thisPartial).find('.groupListDiv');
        const newGroupTextElem = $(thisPartial).find('.newGroupText');
        const newGroupButtonElem = $(thisPartial).find('.newGroupButton');
        const newGroupFirmwareSelectElem = $(thisPartial).find('.newGroupFirmwareSelect');
        const statusMessageElem = $(thisPartial).find('.statusMessage');
        const newGroupSetFirmwareCheckboxElem = $(thisPartial).find('.newGroupSetFirmwareCheckbox');
        const showNewGroupButton = $(thisPartial).find('.showNewGroupButton');
        const createNewGroupDivElem = $(thisPartial).find('.createNewGroupDiv');
        const newGroupDescriptionTextElem = $(thisPartial).find('.newGroupDescriptionText');
    
        let deviceGroup = {};
        $(thisPartial).data('deviceGroup', deviceGroup)

        deviceGroup.checkboxList = $(groupListDivElem).data('checkboxList');

        deviceGroup.checkboxList.urlKey = 'g';

        deviceGroup.getOptions = function(options = {}) {
            deviceGroup.checkboxList(options);
            return options;
        }
        
        deviceGroup.getUrlConfigObj = function(urlConfig) {
            deviceGroup.checkboxList.getUrlConfigObj(urlConfig);

        }

        deviceGroup.loadUrlParams = function(urlParams) {
            // This saves the urlParams in the checkbox list. addArray checks the saved urlParams
            deviceGroup.checkboxList.loadUrlParams(urlParams);
        }


        // 
        const updateSettings = async function(settings = apiHelper.manualSettings.get()) {
            if (apiHelper.auth && settings && settings.createOrSelectProduct && settings.createOrSelectProduct.productId) {
                productId = settings.createOrSelectProduct.productId;
                $(productIsSelectedElem).show();

                
                const firmwareRes = await apiHelper.particle.listProductFirmware({ 
                    product: productId,
                    auth: apiHelper.auth.access_token 
                });
                // console.log('firmwareRes', firmwareRes);
                // body: array of objects:
                //  version, title, description, device_count, name (filename), groups, product_default, immediate, mandatory, uploaded_by, uploaded_on, _id,
                $(newGroupFirmwareSelectElem).empty();
                for(const firmwareObj of firmwareRes.body) {
                    const optionElem = document.createElement('option');
                    $(optionElem).attr('value', firmwareObj.version.toString());
                    $(optionElem).text(firmwareObj.title + (firmwareObj.product_default ? ' (product default)' : ''));
                    if (firmwareObj.product_default) {
                        $(optionElem).attr('selected', 'selected');
                    }
                    $(newGroupFirmwareSelectElem).append(optionElem);
                }

                // Fetch device groups
                const productRes = await apiHelper.particle.getProduct({ 
                    product: productId,
                    auth: apiHelper.auth.access_token 
                });
                // console.log('productRes', productRes);
                // body.product.
                //  id, name, description, device_count, groups[], etc.

                groups = productRes.body.product.groups;

                deviceGroup.checkboxList.empty(); 
                // addArray checks urlParams to see if the items should be checked
                deviceGroup.checkboxList.addArray(groups);

            }
            else {
                $(productIsSelectedElem).hide();
            }
        }
        updateSettings();

    

        $(newGroupTextElem).on('input', function() {
            const groupName = $(newGroupTextElem).val().trim();
            if (productId && groupName.length) {
                // The name of the group. Must only contain lowercase letters, numbers, dashes, and underscores.
                // TODO: There's a maximum length, enforce that here as well, once I figure out what it is
                const validRE = /^[-a-z0-9_]+$/;
                if (groupName.match(validRE)) {
                    if (!groups.includes(groupName)) {
                        $(newGroupButtonElem).prop('disabled', false);
                        setStatus('');    
                    }
                    else {
                        setStatus('Group name already exists');    
                    }
                }
                else {
                    $(newGroupButtonElem).prop('disabled', true);
                    setStatus('Group name can only contain lowercase letters, numbers, dashes, and underscores');
                }
            }
            else {
                $(newGroupButtonElem).prop('disabled', true);
            }
        });

        $(showNewGroupButton).on('click', function() {
            $(showNewGroupButton).hide();
            $(createNewGroupDivElem).show();
        });

        $(newGroupButtonElem).on('click', async function() {
            $(newGroupButtonElem).prop('disabled', true);

            const groupName = $(newGroupTextElem).val().trim();
            const description = $(newGroupDescriptionTextElem).val();

            // Create a group
            let requestData = {
                name: groupName,
                description,
            };

            await new Promise(function(resolve, reject) {
                let request = {
                    contentType: 'application/json',
                    data: JSON.stringify(requestData),
                    dataType: 'json',
                    error: function (jqXHR) {
                        console.log('error', jqXHR);
                        reject(jqXHR);
                    },
                    headers: {
                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    success: function (resp, textStatus, jqXHR) {
                        console.log('resp', resp);
                        resolve();
                    },
                    url: 'https://api.particle.io/v1/products/' + productId + '/groups',
                }
                $.ajax(request);
            });

            // Release firmware to group

            // Add to popup
            deviceGroup.checkboxList.addItem(groupName, {checked:true});
            groups.push(groupName);
    
            $(newGroupButtonElem).prop('disabled', false);
            $(newGroupTextElem).val('');

            $(showNewGroupButton).show();
            $(createNewGroupDivElem).hide();

        });

        $(newGroupSetFirmwareCheckboxElem).on('click', function() {
            const setVersion = $(newGroupSetFirmwareCheckboxElem).prop('checked');
            if (setVersion) {
                $(newGroupFirmwareSelectElem).show();
            }
            else {
                $(newGroupFirmwareSelectElem).hide();
            }
        });

        $(thisPartial).on('updateSearchParam', function(event) {
            console.log('apiHelperDeviceGroup updateSearchParam');
        });

        $(document).on(apiHelper.manualSettings.settingsChangeEventName, function(event, settings) {
            updateSettings(settings);
        });

    });


    $('.apiHelperAddDeviceToProduct').each(function() {
        const thisPartial = $(this);

        const productIsSelectedElem = $(thisPartial).find('.productIsSelected');
        const selectedProductCellElem = $(thisPartial).find('.selectedProductCell');
        const statusMessageElem = $(thisPartial).find('.statusMessage');
        const deviceIdTextElem = $(thisPartial).find('.deviceIdText');
        const addDeviceButtonElem = $(thisPartial).find('.addDeviceButton');
        const deviceInstructionsElem = $(thisPartial).find('.deviceInstructions');
        const claimDeviceCheckboxElem = $(thisPartial).find('.claimDeviceCheckbox');
        const markDevelopmentCheckboxElem = $(thisPartial).find('.markDevelopmentCheckbox');
        const nameDeviceCheckboxElem = $(thisPartial).find('.nameDeviceCheckbox');
        const deviceNameTextElem = $(thisPartial).find('.deviceNameText');
        const addResultElem = $(thisPartial).find('.addResult');
        const claimResultElem = $(thisPartial).find('.claimResult');
        const markDevelopmentResultElem = $(thisPartial).find('.markDevelopmentResult');
        const nameResultElem = $(thisPartial).find('.nameResult');
        const allResultsElem = $(thisPartial).find('.allResults');


        
        
        let productId;

        // const Elem = $(thisPartial).find('.');

        const setStatus = function(s) {
            $(statusMessageElem).text(s);
        }

        const updateButton = async function() {
            const text = $(deviceIdTextElem).val().trim();

            if (apiHelper.isDeviceId(text)) {
                // Is a Device ID                
                setStatus('Appears to be a Device ID, can attempt to add');
                $(addDeviceButtonElem).prop('disabled', false);
                $(deviceInstructionsElem).hide();
            }
            else if (apiHelper.isSerialNumber(text)) {
                // Looks like a serial number
                setStatus('Appears to be a serial number, can attempt to add');
                $(addDeviceButtonElem).prop('disabled', false);
                $(deviceInstructionsElem).hide();
            }
            else {
                setStatus('');
                $(addDeviceButtonElem).prop('disabled', true);
                $(deviceInstructionsElem).show();
            }
        }

        const updateSettings = function(settings = apiHelper.manualSettings.get()) {

            if (settings && settings.createOrSelectProduct && settings.createOrSelectProduct.productId) {
                productId = settings.createOrSelectProduct.productId;
                $(productIsSelectedElem).show();
                $(selectedProductCellElem).text(settings.createOrSelectProduct.productName + ' (' + settings.createOrSelectProduct.productId + ')');
                setStatus('');
            } 
            else {
                $(productIsSelectedElem).hide();
                setStatus('Select the product to add the device to (above)');
            }
            if (settings && settings.deviceSelect && settings.deviceSelect.deviceId) {
                $(deviceIdTextElem).val(settings.deviceSelect.deviceId);
                updateButton();
            }
        }
        updateSettings();

        // Defined in api-helper.extras.js
        $(deviceNameTextElem).val(apiHelper.getRandomTrochee());


        $(deviceIdTextElem).on('keydown', function(ev) {
            if (ev.key == 'Enter') {
                $(addDeviceButtonElem).trigger('click');
                ev.preventDefault();
            }
        });

        $(addDeviceButtonElem).on('click', async function() {
            let text = $(deviceIdTextElem).val().trim();
            if (text.length == 0 || !productId) {
                return;
            }
            let isDeviceId = false;
            
            if (apiHelper.isDeviceId(text)) {
                text = text.toLowerCase();
                isDeviceId = true;
            }
            else {
                const spaceOffset = text.indexOf(' ');
                if (spaceOffset > 0) {
                    text = text.substring(0, spaceOffset);
                }    
            }
            $(deviceIdTextElem).val(text);

            $(allResultsElem).text('');

            $(addDeviceButtonElem).prop('disabled', true);

            setStatus('Adding device to product ' + productId + '...');

            const res = await apiHelper.particle.addDeviceToProduct({ 
                deviceId: text,
                product: productId,
                auth: apiHelper.auth.access_token 
            });
            if (res.statusCode >= 200 && res.statusCode < 300) {
                console.log('res', res);

                let deviceId;

                if (isDeviceId) {
                    deviceId = text;

                    setStatus('Adding device to product ' + productId + ' succeeded');
                    $(addResultElem).text('\u2705'); // green check
                }
                else {
                    setStatus('Checking product for newly added device...');
                    const deviceResult = await apiHelper.getAllDevices({productId});

                    console.log('deviceResult', deviceResult);

                    // Array of device objects:
                    //   id, name, iccid, serial_number, etc.
                    for(const d of deviceResult) {
                        if (d.serial_number == text) {
                            deviceId = d.id;
                        }
                    }

                    // TODO: If this is an Electron (platform = 10) and iccid is not set, need to
                    // activate the SIM separately

                    setStatus('Adding device to product ' + productId + ' succeeded');
                    $(addResultElem).text('\u2705'); // green check
                }

                if ($(claimDeviceCheckboxElem).prop('checked')) {
                    const claimRes = await apiHelper.particle.claimDevice({
                        deviceId,
                        auth: apiHelper.auth.access_token     
                    });
                    console.log('claimRes', claimRes);

                    $(claimResultElem).text((claimRes.statusCode == 200) ? '\u2705': '\u274C'); 
                }
                if ($(markDevelopmentCheckboxElem).prop('checked')) {
                    const markDevelopmentRes = await apiHelper.particle.markAsDevelopmentDevice({
                        deviceId,
                        product: productId,
                        development: true,
                        auth: apiHelper.auth.access_token     
                    });

                    console.log('markDevelopmentRes', markDevelopmentRes);
                    $(markDevelopmentResultElem).text((markDevelopmentRes.statusCode == 200) ? '\u2705': '\u274C'); 
                }
                if ($(nameDeviceCheckboxElem).prop('checked')) {
                    const name = $(deviceNameTextElem).val().trim();

                    const nameRes = await apiHelper.particle.renameDevice({
                        deviceId,
                        product: productId,
                        name,
                        auth: apiHelper.auth.access_token     
                    });

                    console.log('nameRes', nameRes);
                    $(nameResultElem).text((nameRes.statusCode == 200) ? '\u2705': '\u274C'); 
                }

                const infoRes = await apiHelper.particle.getDevice({
                    deviceId: text,
                    product: productId,
                    auth: apiHelper.auth.access_token     
                });
                console.log('infoRes', infoRes);

                // infoRes.body contains the device object
                //   id, name, iccid, serial_number, etc.

            }
            else {
                setStatus('Adding device to product ' + productId + ' failed');
                $(addResultElem).text('\u274C'); // Red X
            }

            $(addDeviceButtonElem).prop('disabled', false);

            
        });
        $(deviceIdTextElem).on('input', async function() {
            await updateButton();
        });

        $(deviceNameTextElem).on('input', function() {
            const text = $(deviceNameTextElem).val().trim();
            if (text.length > 0) {
                $(nameDeviceCheckboxElem).prop('checked', true);
            }
            else {
                $(nameDeviceCheckboxElem).prop('checked', false);
            }
        });


        $(document).on(apiHelper.manualSettings.settingsChangeEventName, function(event, settings) {
            console.log('settings update', settings);
            updateSettings(settings);
        });



    });


    $('.apiHelperCreateOrSelectProduct').each(function() {
        const thisPartial = $(this);

        const platformSelectElem = $(thisPartial).find('.apiHelperPlatformSelect');
        const deviceTypeSKUsElem = $(thisPartial).find('.deviceTypeSKUs');

        const sandboxOrgRowElem = $(thisPartial).find('.sandboxOrgRow');
        const sandboxOrgRadioCheckedVal = function() {
            return $(sandboxOrgRowElem).find('input:checked').val();
        };
        const sandboxOrgRadioSelect = function(value) {
            $(sandboxOrgRowElem).find('input[type="radio"]').prop('checked', false);
            $(sandboxOrgRowElem).find('input[value="' + value + '"]').prop('checked', true);            
        };
        const orgSelectorRowElem = $(thisPartial).find('.orgSelectorRow');
        const productSelectorRowElem = $(thisPartial).find('.productSelectorRow');
        const productSelectElem = $(thisPartial).find('.apiHelperProductSelect');
        const orgSelectElem = $(thisPartial).find('.apiHelperOrgSelect');

        const productNameInputElem = $(thisPartial).find('.productNameInput');

        const newExistingRadioElem = $(thisPartial).find('input[name="newExisting"]');
        const newRadioElem = $(thisPartial).find('input[name="newExisting"][value="new"]');
        const existingRadioElem = $(thisPartial).find('input[name="newExisting"][value="existing"]');
        const newExistingRadioCheckedVal = function() {
            return $(thisPartial).find('input[name="newExisting"]:checked').val();
        }
        const refreshProductsElem = $(thisPartial).find('.refreshProducts');

        const createProductButtonElem = $(thisPartial).find('.createProductButton');
        const statusMessageElem = $(thisPartial).find('.statusMessage');

        let carriersJson;

        const setStatus = function(s) {
            $(statusMessageElem).text(s);
        }
        setStatus('Loading...');

        let productSelector = {};
        $(thisPartial).data('productSelector', productSelector);

        if (!apiHelper.auth) {
            return;
        }

        productSelector.getOptions = function(options) {
            if (!options) {
                options = {};
            }
            const platformIdStr = $(platformSelectElem).val();
            if (platformIdStr == '-') {
                // No settings selected yet
                return options;
            }

            options.platformId = parseInt(platformIdStr);

            if (productSelector.orgs.length) {
                // Has organizations

                // sandbox or org
                options.sandboxOrg = sandboxOrgRadioCheckedVal();
                if (options.sandboxOrg == 'org') {
                    options.orgId = $(orgSelectElem).val();
                }
            }
            else {
                options.sandboxOrg = 'sandbox';
            }

            // new or existing
            options.newExisting = newExistingRadioCheckedVal();

            if (options.newExisting == 'new') {
                options.productName = $(productNameInputElem).val();
            }
            else {
                options.productId = parseInt($(productSelectElem).val());
                const productObj = productSelector.productsData.products.find(e => e.id == options.productId);
                if (productObj) {
                    options.productName = productObj.name;
                }
            }

            return options;
        }

        const urlConfigFields = ['platformId', 'orgId', 'sandboxOrg', 'productId'];

        productSelector.getUrlConfigObj = function(resultObj) {

            const options = productSelector.getOptions();

            for(const field of urlConfigFields) {
                if (options[field]) {
                    resultObj[field] = options[field];
                }
            }

        };


        productSelector.loadUrlParams = function(urlParams) {
            productSelector.urlParams = urlParams;

            let settings = apiHelper.manualSettings.get({key:'createOrSelectProduct'});

            for(const field of urlConfigFields) {
                const value = urlParams.get(field);
                if (value) {
                    settings[field] = value;
                }
            }

            apiHelper.manualSettings.save();
        };

        productSelector.saveSettings = function() {
            let settings = apiHelper.manualSettings.get({key:'createOrSelectProduct'});
            productSelector.getOptions(settings);
            apiHelper.manualSettings.save();
        }

        const updateNewExistingButton = function() {
            const newExisting = newExistingRadioCheckedVal();

            if (newExisting == 'new') {
                if ($(productNameInputElem).val().trim().length) {
                    $(createProductButtonElem).prop('disabled', false);
                }
                else {
                    $(createProductButtonElem).prop('disabled', true);
                }                                
            }
            else {
                $(createProductButtonElem).prop('disabled', true);
            }    
        }

        const updateProductList = async function(options = {}) {
            if (!productSelector.orgs) {
                // Not fully loaded yet
                return;
            }

            const platformIdStr = $(platformSelectElem).val();
            if (platformIdStr == '-') {
                // No platform selected
                return;
            }
            const platformId = parseInt(platformIdStr);

            $(orgSelectorRowElem).hide();
            $(sandboxOrgRowElem).hide();    
            
            const sandboxOrg = sandboxOrgRadioCheckedVal();

            if (productSelector.orgs.length) {
                // Has organizations

                $(sandboxOrgRowElem).show();
                switch(sandboxOrg) {
                    case 'sandbox':
                        break;

                    case 'org':
                        $(orgSelectorRowElem).show();
                        break;
                }               
            }

            setStatus('Getting products...');

            if (sandboxOrg == 'sandbox') {
                productSelector.productsData = await apiHelper.getProducts();
            }
            else {
                const orgId = $(orgSelectElem).val();
                if (!orgId) {
                    return;
                }
                productSelector.productsData = await apiHelper.getOrgProducts(orgId);
            }
            
            productSelector.productsData.products.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

            const lastSelected = $(productSelectElem).val();
            $(productSelectElem).empty();

            for(const product of productSelector.productsData.products) {
                if (product.platform_id == platformId) {
                    const optionElem = document.createElement('option');
                    $(optionElem).attr('value', product.id.toString());
                    $(optionElem).text(product.name + ' (' + product.id + ')');
                    $(productSelectElem).append(optionElem);    

                    let settings = apiHelper.manualSettings.get({key:'createOrSelectProduct'});
                    if (settings.productId == product.id) {
                        $(productSelectElem).val(product.id.toString());
                        $(newExistingRadioElem).prop('checked', false);
                        $(existingRadioElem).prop('checked', true);
                        $(createProductButtonElem).prop('disabled', true);
                    }

                }
            }
            if (lastSelected) {
                $(productSelectElem).val(lastSelected);
            }

            $(productSelectorRowElem).show();

            updateNewExistingButton();

            setStatus('');

            $(thisPartial).trigger('updateProductList');
        }

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
            productSelector.orgs = orgsData.organizations;

            if (orgsData.organizations.length > 0) {

                for (let org of orgsData.organizations) {
                    const optionElem = document.createElement('option');
                    $(optionElem).attr('value', org.id);
                    $(optionElem).text(org.name);

                    $(orgSelectElem).append(optionElem);        
                }
                let settings = apiHelper.manualSettings.get({key:'createOrSelectProduct'});
                if (settings.orgId) {
                    sandboxOrgRadioSelect('org');
                    $(orgSelectElem).val(settings.orgId);                    
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

        apiHelper.getCarriersJson().then(function(carriersJsonIn) {
            carriersJson = carriersJsonIn;

            let platforms = [];
            
            for(const platformName in carriersJson.deviceConstants) {
                const platformObj = carriersJson.deviceConstants[platformName];
                if (platformObj.productEligible) {
                    platforms.push(platformName);
                }
            }
            platforms.sort(function(a, b) {
                return carriersJson.deviceConstants[a].displayName.localeCompare(carriersJson.deviceConstants[b].displayName);
            })

            for(const platformName of platforms) {
                const platformObj = carriersJson.deviceConstants[platformName];
                const optionElem = document.createElement('option');
                $(optionElem).text(platformObj.displayName + ' (' + platformObj.id + ')');
                $(optionElem).attr('value', platformObj.id.toString());
                $(platformSelectElem).append(optionElem);    
            }

            let settings = apiHelper.manualSettings.get({key:'createOrSelectProduct'});
            if (settings.platformId) {
                $(platformSelectElem).val(settings.platformId.toString());
                $(platformSelectElem).trigger('change');
            }

            setStatus('');

        });

        $(createProductButtonElem).on('click', function() {
            // 
            const options = productSelector.getOptions();

            let requestDataObj = {
                product: {
                    name: options.productName,
                    platform_id: options.platformId,
                },
            };

            setStatus('Creating product...');

            let url;
            if (options.sandboxOrg == 'org') {
                url = 'https://api.particle.io/v1/orgs/' + options.orgId + '/products/';
            }
            else {
                url = 'https://api.particle.io/v1/user/products/';
            }

            const request = {                
                contentType: 'application/json',
                data: JSON.stringify(requestDataObj),
                dataType: 'json',
                error: function (jqXHR) {
                    // ga('send', 'event', simpleGetConfig.gaAction, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));
                    console.log('error', jqXHR);
                    setStatus('Product creation failed');
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    // ga('send', 'event', simpleGetConfig.gaAction, 'Success');
                    console.log('success', resp);
                    // ok: boolean
                    // product: object
                    //      id: int product ID
                    //      platform_id
                    //      name
                    //      slug
                    //      description
                    //      settings: object
                    //      groups: array
                    //      device_count: integer
                    if (resp.ok) {
                        // Add to popup and select
                        const optionElem = document.createElement('option');
                        $(optionElem).attr('value', resp.product.id.toString());
                        $(optionElem).text(resp.product.name + ' (' + resp.product.id + ') (newly created)');
                        $(productSelectElem).append(optionElem);    

                        $(productSelectElem).val(resp.product.id.toString());
                        $(newExistingRadioElem).prop('checked', false);
                        $(existingRadioElem).prop('checked', true);
                        $(productNameInputElem).val('');
                        $(createProductButtonElem).prop('disabled', true);

                        productSelector.saveSettings();
                        setStatus('Product ' + resp.product.name + ' successfully created');
                    }
                    else {
                        setStatus('Product creation failed');
                        console.log('request failed', resp);
                    }
                },
                url,
            };

            $.ajax(request);

        });

        $(productNameInputElem).on('input', function() {
            $(newExistingRadioElem).prop('checked', false);
            $(newRadioElem).prop('checked', true);

            updateNewExistingButton();
        });

        $(productSelectElem).on('change', function() {
            $(newExistingRadioElem).prop('checked', false);
            $(existingRadioElem).prop('checked', true);
            productSelector.saveSettings();
        });

        $(newRadioElem).on('click', function() {
            updateNewExistingButton();
        });

        $(existingRadioElem).on('click', function() {
            updateNewExistingButton();
            productSelector.saveSettings();
        });


        $(refreshProductsElem).on('click', async function() {
            await updateProductList({clearCache:true});
        });

        $(document).on(apiHelper.manualSettings.settingsChangeEventName, function(event, settings) {
            if (settings && settings.deviceSelect && settings.deviceSelect.platformId) {
                $(platformSelectElem).val(settings.deviceSelect.platformId.toString());
                $(platformSelectElem).trigger('change');    
            }
    
        });



        $(platformSelectElem).on('change', async function() {

            const value = $(this).val();

            const firstOptionElem = $(this).find('option').first();
            if ($(firstOptionElem).val() == '-') {
                $(firstOptionElem).remove();
            }

            
            $(deviceTypeSKUsElem).empty();


            const platformId = parseInt(value);

            let skus = [];

            for(const skuObj of carriersJson.skus) {
                if (skuObj.lifecycle == 'Hidden') {
                    // Hidden SKU
                    continue;
                }
                if (skuObj.multiple) {
                    // Omit tray SKUs
                    continue;
                }
                if (skuObj.platformId == platformId) {
                    skus.push(skuObj.name);                        
                }
            }

            skus.sort();

            $(deviceTypeSKUsElem).text(skus.join(', '));
        
            for(const platformName in carriersJson.deviceConstants) {
                const platformObj = carriersJson.deviceConstants[platformName];
                if (platformObj.id == platformId) {
                    $(productNameInputElem).val('test-' + platformObj.name + '-' + Math.floor(Math.random() * 99999));
                }
            }

            await updateProductList();

        });

        

    });


});

