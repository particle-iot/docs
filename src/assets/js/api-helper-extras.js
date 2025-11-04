
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
                    analytics.track('Success', {category:'LED Function Test'});
                    setStatus('Success! (' + data.body.return_value + ')');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
                    analytics.track('Error', {category:'LED Function Test', label:err});
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
                    analytics.track('Success', {category:'LED Color Test'});
                    setStatus('Success! (' + data.body.return_value + ')');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
                    analytics.track('Error', {category:'LED Color Test', label:err});
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
                    'Accept': 'application/json',
                    'X-Particle-Tool': 'particle-docs',
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
                    'Accept': 'application/json',
                    'X-Particle-Tool': 'particle-docs',
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
    
    $('.apiHelperDeviceSelect').each(async function() {
        const thisPartial = $(this);
        
        const options = $(thisPartial).data('options').split(',');

        const deviceSelectSelectElem = $(thisPartial).find('.deviceSelectSelect');

        let deviceSelect = {
            options,
            partialElem: thisPartial,
            selectElem: deviceSelectSelectElem,
        };
        $(thisPartial).data('deviceSelect', deviceSelect);

        apiHelper.deviceList(deviceSelectSelectElem, {
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
                return result;
            },                    
            hasRefresh: true,
            hasSelectDevice: true,
            onChange: async function(elem) {
                const newVal = $(elem).val();
                deviceSelect.dev = apiHelper.deviceListCache.find(e => e.id == newVal);
                if (deviceSelect.onChange) {
                    deviceSelect.onChange(deviceSelect.dev);
                }
                if (options.includes('deviceInfo')) {
                    const deviceSelectInfoElem = $(thisPartial).find('.deviceSelectInfo');
                    const tbodyElem = $(deviceSelectInfoElem).find('tbody');
                    $(deviceSelectInfoElem).show();
                    $(tbodyElem).empty();

                    deviceSelect.dev._platform = await apiHelper.getPlatformName(deviceSelect.dev.platform_id);
                    deviceSelect.dev._sku = await apiHelper.getSkuFromSerial(deviceSelect.dev.serial_number);
                    if (!deviceSelect.dev._sku) {
                        deviceSelect.dev._sku = 'Unknown';
                    }
                    console.log('deviceInfo', deviceSelect.dev);

                    let tableData = {
                        'id': 'Device ID',
                        'name': 'Device Name',
                        '_platform': 'Platform',
                        'serial_number': 'Serial Number',
                        '_sku': 'SKU',          
                        'product_id': 'Product ID',                                       
                    };

                    apiHelper.simpleTableObjectMap(tbodyElem, tableData, deviceSelect.dev);
                    
                    $(thisPartial).trigger('deviceSelected', [deviceSelect.dev]);
                }
            }
        });   

    });

    $('.apiHelperFlashTinker').each(async  function() {
        const thisPartial = $(this);

        const apiHelperCloudDeviceSelectElem = $(thisPartial).find('.apiHelperCloudDeviceSelect');
        const flashTinkerButtonElem = $(thisPartial).find('.flashTinkerButton');
        const apiHelperStatusElem = $(thisPartial).find('.apiHelperStatus');
        const flashControlsElem = $(thisPartial).find('.flashControls');
        const warningMessageElem = $(thisPartial).find('.warningMessage');

        const setStatus = function(s) {
            $(apiHelperStatusElem).text(s);
        }
         
        const updateInfo = async function() {
            const newVal = $(apiHelperCloudDeviceSelectElem).val();
            if (newVal == 'select' || newVal == 'refresh') {
                $(flashTinkerButtonElem).prop('disabled', true);      
                return;
            }

            const dev = apiHelper.deviceListCache.find(e => e.id == newVal);

            const platformInfo = await apiHelper.getPlatformInfo(dev.platform_id);

            $('.apiHelperTinker').trigger('updateInfo', [{dev, platformInfo}]);

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
            monitorEvents: function(event) {
                switch(event.name) {
                    case 'spark/flash/status':
                        // This event has a trailing space on the data
                        if (event.data.trim() == 'success') {
                            setStatus('Flash successful, waiting for device to restart and reconnect to the cloud');
                        }
                        break;

                    case 'spark/status':
                        break;
                }
            },
            onChange: async function(elem) {
                updateInfo();
            },
            onUpdateInfo: async function(elem) {
                updateInfo();
            },

        });   

        $(flashTinkerButtonElem).on('click', async function() {
            let deviceRestoreInfo = await apiHelper.getDeviceRestoreInfo();

            $(flashTinkerButtonElem).prop('disabled', true);
            $(warningMessageElem).hide();

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
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'X-Particle-Tool': 'particle-docs',
                },
                url: 'https://api.particle.io/v1/devices/' + deviceId,
            });    


        });

    });

    $('.apiHelperTinker').each(function() {
        const thisPartial = $(this);

        const apiHelperStatusElem = $(thisPartial).find('.apiHelperStatus');
        const canvasViewDivElem = $(thisPartial).find('.canvasViewDiv');
        const canvasElem = $(thisPartial).find('.canvasViewDiv > canvas');
        const pinsDivElem = $(thisPartial).find('.pinsDiv');
        const deviceImageElem = $(thisPartial).find('.deviceImage');

        let tinker = {
        };

        const setStatus = function(s) {
            $(apiHelperStatusElem).text(s);
        }

        $.ajax({
            type: 'GET',
            url: '/assets/files/pinInfo.json',
            dataType: 'json',
            success: function(data) {
                // .details (array)
                // .platforms (array)
                tinker.pinInfo = data;
            },
            error: function(err) {
                console.log('error fetching pinInfo', err);
            },
        });	

        tinker.functions = [
            {
                pinInfoKey: 'analogRead',
                tinkerFunction: 'analogread',
                title: 'analogRead',
            },
            {
                pinInfoKey: 'analogWritePWM',
                pinInfoAltKey: 'analogWriteDAC',
                tinkerFunction: 'analogwrite',
                title: 'analogWrite',
            },
            {
                pinInfoKey: 'digitalRead',
                tinkerFunction: 'digitalread',
                title: 'digitalRead',
            },
            {
                pinInfoKey: 'digitalWrite',
                tinkerFunction: 'digitalwrite',
                title: 'digitalWrite',
            },
        ];
            
        tinker.callFunction = async function(functionName, arg) {
            try {
                const res = await apiHelper.particle.callFunction({ deviceId: tinker.dev.id, name: functionName, argument: arg, auth: apiHelper.auth.access_token  });
                if (res.statusCode == 200) {
                    setStatus('Called function ' + functionName + ' ' + arg + ', returned ' + res.body.return_value);
                    return res.body.return_value;
                }
                else {
                    setStatus('Calling function ' + functionName + ' failed');
                    return 0;
                }    
            }
            catch(e) {
                setStatus('Calling function ' + functionName + ' failed');
                return 0;
            }
        }

        tinker.findPinByNum = function(num) {
            for(const pin of tinker.devicePinInfo.pins) {
                if (pin.num == num) {
                    return pin;
                }
                if (pin.morePins && pin.morePins.includes(num)) {
                    return pin;
                }
            }
            return null;
        }

        tinker.update = async function() {
            // tinker.dev (object) Device Information
            // tinker.platformInfo (object): Device Constants platform info

            $(canvasViewDivElem).hide();

            const canvasWidth = $(thisPartial).width();
            $(canvasElem).css('width', canvasWidth);

            let pinInfoName;
            switch(tinker.dev.platform_id) {
                case 10:
                    pinInfoName = 'Electron';
                    setStatus('Both E Series and Electron devices display as Electron; this does not affect operation');
                    break;

                case 32:
                    // TODO: In the future, determine this by SKU 
                    pinInfoName = 'Photon 2';
                    setStatus('Both P2 and Photon 2 devices display as Photon 2; this does not affect operation');
                    break;
            }


            let skuObj;
            if (tinker.dev.serial_number) {
                skuObj = await apiHelper.getSkuObjFromSerial(tinker.dev.serial_number);
                // console.log('skuObj', skuObj);
            }

            if (pinInfoName) {
                tinker.devicePinInfo = tinker.pinInfo.platforms.find(e => e.name == pinInfoName);
            }
            else {
                tinker.devicePinInfo = tinker.pinInfo.platforms.find(e => e.id == tinker.dev.platform_id);
            }
            if (!tinker.devicePinInfo) {
                setStatus('The device platform ' + tinker.dev.platform_id + ' is not currently supported');
                return;
            }
            // console.log('tinker.devicePinInfo', tinker.devicePinInfo);
            // console.log('tinker.platformInfo', tinker.platformInfo);
            
            $(canvasViewDivElem).show();


            tinker.pinElements = [];

            const generatePin = function(pin, options = {}) {
                const pinElement = {
                    pin,
                };

                const widths = {
                    label: 40,
                    select: 110,
                    value: 60,
                }
                let posOffsets;
                if (options.reverse) {
                    posOffsets = [-widths.label, -(widths.label + widths.select), -(widths.label + widths.select + widths.value)];
                }
                else {
                    posOffsets = [0, widths.label, widths.label + widths.select];
                }

                {
                    const divElem = document.createElement('div');
                    $(divElem).css('position', 'absolute');
                    $(divElem).css('left', options.pos + posOffsets[0]);
                    $(divElem).css('top', options.top);
                    $(divElem).css('height', options.height);
                    $(divElem).css('width', widths.label);
                    $(divElem).css('line-height', options.height);
                    if (options.reverse) {
                        $(divElem).css('text-align', 'right');
                    }
                    $(divElem).text(pin.name);
                    $(options.elem).append(divElem);
                }
                if (pin.isIO) {
                    {
                        const divElem = document.createElement('div');
                        $(divElem).css('position', 'absolute');
                        $(divElem).css('left', options.pos + posOffsets[1]);
                        $(divElem).css('top', options.top);
                        $(divElem).css('width', widths.select);
                        $(divElem).css('height', options.height);
                            
                        const selectElem = pinElement.selectElem = document.createElement('select');
                        $(selectElem).addClass('apiHelperSelect');
                        $(selectElem).css('width', '100px');
    
                        {
                            const optionElem = document.createElement('option');
                            $(optionElem).prop('value', '-');
                            $(optionElem).text('-');
                            $(selectElem).append(optionElem);
                        }
                        for(const fun of tinker.functions) {
                            if (pin[fun.pinInfoKey] || (fun.pinInfoAltKey && pin[fun.pinInfoAltKey])) {
                                const optionElem = document.createElement('option');
                                $(optionElem).prop('value', fun.tinkerFunction);
                                $(optionElem).text(fun.title);
                                $(selectElem).append(optionElem);    
                            }
                        }
    
                        $(divElem).append(selectElem);
                        $(options.elem).append(divElem);
                    }
                    {
                        const divElem = document.createElement('div');
                        $(divElem).css('position', 'absolute');
                        $(divElem).css('left', options.pos + posOffsets[2]);
                        $(divElem).css('top', options.top);
                        $(divElem).css('width', widths.value);
                        $(divElem).css('height', options.height);

                        const inputElem = pinElement.inputElem = document.createElement('input');
                        $(inputElem).css('display', 'none');
                        $(inputElem).css('font-size', '11px');
                        $(inputElem).prop('size', 8);
                        $(inputElem).prop('value', '0');
                        $(divElem).append(inputElem);
    
                        const spanElem = pinElement.spanElem = document.createElement('span');
                        $(spanElem).css('display', 'none');
                        $(spanElem).css('cursor', 'pointer');
                        $(divElem).css('line-height', options.height);
                        $(divElem).append(spanElem);
        
    
                        $(options.elem).append(divElem);
                    }    
                }
                

                const updateValue = async function() {
                    let s;

                    const val = $(pinElement.selectElem).val();
                    switch(val) {
                        case 'analogwrite':
                            s = parseInt($(pinElement.inputElem).val()).toString();
                            await tinker.callFunction(val, pinElement.pin.name + ':' + s);
                            break;
                            
                        case 'analogread':
                            s = (await tinker.callFunction(val, pinElement.pin.name)).toString();
                            $(pinElement.spanElem).text(s);
                            break;

                        case 'digitalread':
                            s = (await tinker.callFunction(val, pinElement.pin.name)) ? 'HIGH' : 'LOW';
                            $(pinElement.spanElem).text(s);
                            break;

                        case 'digitalwrite':
                            s = pinElement.output ? 'HIGH' : 'LOW';
                            $(pinElement.spanElem).text(s);
                            await tinker.callFunction(val, pinElement.pin.name + ':' + s);
                            break;
                    }

                }

                $(pinElement.selectElem).on('change', async function() {
                    const val = $(pinElement.selectElem).val();
                    $(pinElement.inputElem).hide();
                    $(pinElement.spanElem).hide();

                    switch(val) {
                        case 'analogwrite':
                            $(pinElement.inputElem).show();
                            break;

                        case 'analogread':
                        case 'digitalread':
                            $(pinElement.spanElem).prop('title', 'Click to re-read value');
                            $(pinElement.spanElem).show();
                            break;

                        case 'digitalwrite':
                            $(pinElement.spanElem).prop('title', 'Click to toggle output');
                            $(pinElement.spanElem).show();
                            break;
                    }
                    await updateValue();
                });


                $(pinElement).on('keydown', async function(ev) {
                    if (ev.key != 'Enter') {
                        return;
                    }
        
                    ev.preventDefault();
                    await updateValue();                    
                });
                $(pinElement.inputElem).on('blur', async function() {
                    await updateValue();                    
                });
                $(pinElement.spanElem).on('click', async function() {
                    const val = $(pinElement.selectElem).val();
                    if (val == 'digitalwrite') {
                        pinElement.output = !pinElement.output;
                    }

                    await updateValue();                    
                });

                tinker.pinElements.push(pinElement);

                return pinElement;
            }

            $(pinsDivElem).empty();


            tinker.layout = tinker.devicePinInfo.layout;
            if (!tinker.layout) {
                // Create default layout here
                let pinNumbers = [];
                for(const pin of tinker.devicePinInfo.pins) {
                    if (pin.isIO) {
                        pinNumbers.push(pin.num);
                        if (pin.morePins) {
                            for(const p of pin.morePins) {
                                pinNumbers.push(p);
                            }
                        }
    
                    }
                }
                pinNumbers.sort();

                tinker.layout = {
                    columns: [
                        {
                            pins: [],
                            reverse: false,
                            rowStart: 0,
                            hOffset: -100,
                        }
                    ],
                };
                for(let ii = 0; ii < pinNumbers.length; ii++) {
                    tinker.layout.columns[0].pins.push(pinNumbers[ii]);
                }
            }

            const contentCenter = Math.floor($(canvasElem).width() / 2);
            let maxHeight = 0;

            for(let col = 0; col < tinker.layout.columns.length; col++) {
                const pos = $(canvasElem).position().left + contentCenter + tinker.layout.columns[col].hOffset;

                

                for(let ii = 0; ii < tinker.layout.columns[col].pins.length; ii++) {
                    const vOffset = (tinker.layout.columns[col].rowStart + ii) * 30;
                    let top = $(canvasElem).position().top + 20 + vOffset;
                    if (tinker.layout.extraTop) {
                        top += tinker.layout.extraTop;
                    }
                    const pin = tinker.findPinByNum(tinker.layout.columns[col].pins[ii]);
                    if (pin) {
                        pinElement = generatePin(pin, {
                            top,
                            pos,
                            reverse: tinker.layout.columns[col].reverse,
                            elem: $(pinsDivElem),
                            height: '27px',
                        });                    
                        if ((vOffset + 30) > maxHeight) {
                            maxHeight = (vOffset + 30);
                        }
                    }
    
                }
            }

            if (tinker.layout.extraBottom) {
                maxHeight += tinker.layout.extraBottom;
            }

            $(canvasElem).prop('height', maxHeight);

            if (tinker.devicePinInfo.layout && tinker.devicePinInfo.layout.image) {
                $(deviceImageElem).on('load', function() {
                    const ctx = canvasElem[0].getContext('2d');
                    ctx.globalAlpha = 0.5;
    
                    ctx.setTransform(tinker.devicePinInfo.layout.scale, 0, 0, tinker.devicePinInfo.layout.scale, tinker.devicePinInfo.layout.translate[0], tinker.devicePinInfo.layout.translate[1]);
                    ctx.drawImage(deviceImageElem[0], 0, 0);
                });    
                $(deviceImageElem).prop('src', tinker.devicePinInfo.layout.image);
            }

        }

        $(thisPartial).data('tinker', tinker);

        $(thisPartial).on('updateInfo', async function(event, info) {
            for(const key in info) {
                tinker[key] = info[key];
            }
            await tinker.update();
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
        
            if (sandboxOrg != 'sandbox') {
                options.orgId = $(orgSelectElem).val();
            }
            else {
                options.orgId = 0;
            }

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

        $(productSelectElem).on('change', function() {
            let options = {};
            productSelector.getOptions(options);
            $(thisPartial).trigger('updateProductList', [options]);
        });

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
            options.groups = deviceGroup.checkboxList.getSelectedItems();
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
                        'Accept': 'application/json',
                        'X-Particle-Tool': 'particle-docs',
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

        let partialOptions = $(thisPartial).data('options').split(',');
        if (!partialOptions) {
            partialOptions = [];
        }
        // sandboxOnly - don't show org options even if the account is in an org
        // status - show status row

        if (partialOptions.includes('status')) {
            $(thisPartial).show('.statusRow');
        }

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

        $(document).on('deviceSelected', function(event, deviceObj) {
            $(platformSelectElem).val(deviceObj.platform_id.toString());
            $(platformSelectElem).trigger('change');
        })

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

            if (productSelector.orgs.length && !partialOptions.includes('sandboxOnly')) {
                // Has organizations

                // sandbox or org
                options.sandboxOrg = sandboxOrgRadioCheckedVal();
                if (options.sandboxOrg == 'org') {
                    options.orgId = $(orgSelectElem).val();
                }
                else {
                    options.orgId = 0;
                }
            }
            else {
                options.sandboxOrg = 'sandbox';
                options.orgId = 0;
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

            let productId = 0;
            if (settings.newExisting != 'new') {
                const productSelectValString = $(productSelectElem).val();
                if (productSelectValString) {
                    productId = parseInt(productSelectValString);
                }
            }

            console.log('triggering commonProductSelected', productId);
            $(thisPartial).trigger('commonProductSelected', [productId]);
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
            $(thisPartial).trigger('updateProductList');
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

            if (productSelector.orgs.length && !partialOptions.includes('sandboxOnly')) {
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
                    // analytics.track('Error', {category:simpleGetConfig.gaAction, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});
                    console.log('error', jqXHR);
                    setStatus('Product creation failed');
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json',
                    'X-Particle-Tool': 'particle-docs',
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    // analytics.track('Success', {category:simpleGetConfig.gaAction});
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
            $(thisPartial).trigger('updateProductList');
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

    $('.windowsCliDownloads').each(async function() {
        const thisPartial = $(this);

        const installerManifest = await new Promise(function(resolve, reject) {
            fetch('https://binaries.particle.io/particle-cli/installer/manifest.json')
            .then(response => response.json())
            .then(function(data) {
                resolve(data);
            });
        });

        // console.log('installerManifest', installerManifest);
        // installers: array of objects
        //   released_at (ISO date)
        //   version (string)
        //   platforms (object)
        //     key: platform name (currently "win32")
        //     value: object
        //       url: download URL (binaries.particle.io)
        //       manifest: manifest JSON URL for that release
        const versionTableBodyElem = $(thisPartial).find('.versionTable > tbody');

        $(versionTableBodyElem).empty();

        for(let ii = installerManifest.installers.length - 1; ii >= 0; ii--) {
            const releaseObj = installerManifest.installers[ii];
            if (typeof releaseObj.platforms['win32'] == undefined) {
                continue;
            }

            const trElem = document.createElement('tr');

            {
                const tdElem = document.createElement('td');
                $(tdElem).text(releaseObj.version);
                $(trElem).append(tdElem);
            }
            {
                const tdElem = document.createElement('td');
                $(tdElem).text(releaseObj.released_at.split('T')[0]);
                $(trElem).append(tdElem);
            }
            {
                const tdElem = document.createElement('td');
                
                const aElem = document.createElement('a');
                $(aElem).attr('href', releaseObj.platforms.win32.url);
                $(aElem).text('Download');
                $(tdElem).append(aElem);

                $(trElem).append(tdElem);
            }

            $(versionTableBodyElem).append(trElem);
        }
    });


    $('.apiHelperFileToCode').each(function() {
        const thisPartial = $(this);

        let fileToCode = {
            params: {},
        };

        const showStatusMsg = function(s) {
            $(thisPartial).find('.statusMsg').text(s);
        }

        const showPanels = function() {
            const dataSource = $(thisPartial).find('[data-key="dataSource"]').val();
            $(thisPartial).find('.sourcePanel').hide();

            $(thisPartial).find('.sourcePanel[data-which="' + dataSource + '"').show();
        }

        $(thisPartial).find('[data-key="dataSource"]').on('change', function() {
            fileToCode.data = null;
            showPanels();
            enableButtons();
            $(thisPartial).find('.buttonDownloadBinary').prop('disabled', true);
            $(thisPartial).find('.outputTextArea').val('');
        });

        const updateParams = function() {
            $(thisPartial).find('.paramValue').each(function() {
                const key = $(this).data('key');
                const format = $(this).data('format') || 'string';

                fileToCode.params[key] = $(this).val();
                if (format == 'int') {
                    fileToCode.params[key] = parseInt(fileToCode.params[key]);
                }    
            });
        }

        const enableButtons = function() {
            updateParams();

            let canGenerate = false;

            if (fileToCode.params.dataSource == 'file') {
                canGenerate = typeof fileToCode.data != 'undefined';
            }
            else
            if (fileToCode.params.dataSource == 'random') {
                canGenerate = fileToCode.params.randomDataSize > 0;
            }

            const variableNameRE = /^[A-Za-z][_A-Za-z0-9]*$/;
            if (!fileToCode.params.variableName.match(variableNameRE)) {
                canGenerate = false;
            }

            $(thisPartial).find('.generateCode').prop('disabled', !canGenerate);
        }

        showPanels();
        enableButtons();

        $(thisPartial).find('.generateCode').on('click', async function() {
            $(thisPartial).find('.generateCode').prop('disabled', true);

            updateParams();

            if (fileToCode.params.dataSource == 'random') {
                if (!fileToCode.data || fileToCode.data.length != fileToCode.params.randomDataSize) {
                    fileToCode.data = new Uint8Array(fileToCode.params.randomDataSize);
                    for(let ii = 0; ii < fileToCode.params.randomDataSize; ii++) {
                        fileToCode.data[ii] = Math.floor(Math.random() * 256);
                    }    
                }
            }
            else
            if (fileToCode.params.dataSource == 'file') {
            }

            if (fileToCode.params.outputFormat == 'c') {
                fileToCode.filename = fileToCode.params.variableName + '.cpp';
                fileToCode.prefix = 'const uint8_t ' + fileToCode.params.variableName + '[' + fileToCode.data.length + '] = {\n';
                fileToCode.suffix = '};\n';

                fileToCode.hashPrefix = 'const char *' + fileToCode.params.variableName +  '_hash = "';
                fileToCode.hashSuffix = '";\n';
            }
            else
            if (fileToCode.params.outputFormat == 'js') {
                fileToCode.filename = fileToCode.params.variableName + '.js';
                fileToCode.prefix = 'const ' + fileToCode.params.variableName + ' = [\n';
                fileToCode.suffix = '];\n';

                fileToCode.hashPrefix = 'const ' + fileToCode.params.variableName +  '_hash = "';
                fileToCode.hashSuffix = '";\n';
            }
            fileToCode.binaryFilename = fileToCode.params.variableName + '.bin';

            let lines = [];
            let col = 0;
            let line = '';

            for(let ii = 0; ii < fileToCode.data.length; ii++) {
                let hex = fileToCode.data[ii].toString(16);
                if (hex.length == 1) {
                    hex = '0' + hex;
                }
                line += '0x' + hex;

                if ((ii + 1) < fileToCode.data.length) {
                    line += ', ';
                }

                if (++col >= fileToCode.params.bytesPerLine) {
                    lines.push(line);
                    line = '';
                    col = 0;
                }
            }
            if (line.length) {
                lines.push(line);
            }
            fileToCode.code = fileToCode.prefix + lines.join('\n') + fileToCode.suffix + '\n';

            if (fileToCode.params.includeHash != 'none') {
                const hashBytes = await crypto.subtle.digest(fileToCode.params.includeHash, fileToCode.data);
                const hashHex = Array.from(new Uint8Array(hashBytes))
                  .map(v => v.toString(16).padStart(2, '0'))
                  .join('');
                
                fileToCode.code += fileToCode.hashPrefix + hashHex + fileToCode.hashSuffix;
            }


            $(thisPartial).find('.outputTextArea').val(fileToCode.code);

            $(thisPartial).find('.buttonDownloadBinary').prop('disabled', fileToCode.params.dataSource != 'random');

            enableButtons();
        });

        $(thisPartial).find('.buttonCopy').on('click', function() {
            const t = $(thisPartial).find('.outputTextArea')[0];
            t.select();
            document.execCommand("copy");
        });

        $(thisPartial).find('.buttonDownload').on('click', function() {
            let blob = new Blob([fileToCode.code], {type:'text/plain'});
            saveAs(blob, fileToCode.filename);
        });
        
        $(thisPartial).find('.buttonDownloadBinary').on('click', function() {
            let blob = new Blob([fileToCode.data], {type:'application/octet-stream'});
            saveAs(blob, fileToCode.binaryFilename);
        });

        
        $(thisPartial).find('.selectFileButton').on('click', function() {
            $(thisPartial).find('.selectFileInput').trigger('click');
        });

        $(thisPartial).find('.selectFileInput').on('change', function() {
            const files = this.files;

            let fileReader = new FileReader();
                fileReader.onload = async function() {                    
                    fileToCode.data = new Uint8Array(fileReader.result);
                    enableButtons();
                };
                fileReader.readAsArrayBuffer(files[0]);
        });


        $(thisPartial).find('.paramValue').on('input', enableButtons);
    });


    apiHelper.flattenObject = function(objIn) {
        let objOut = {};

        console.log('flattenObject objIn', objIn);

        
        const flattenInternal = function(valueIn, prefix) {
            if (Array.isArray(valueIn)) {
                for(let ii = 0; ii < valueIn.length; ii++) {
                    const newKey = prefix + '[' + ii + ']';
                    flattenInternal(valueIn[ii], newKey);
                }
            }
            else
            if (typeof valueIn == 'object') {
                for(const key in valueIn) {
                    const newKey = prefix + (prefix != '' ? '.' : '') + key;
                    flattenInternal(valueIn[key], newKey);
                }
            }
            else {
                objOut[prefix] = valueIn;
            }
        }
        flattenInternal(objIn, '');


        console.log('flattenObject objOut', objOut);

        return objOut;
    }


    $('.apiHelperModuleVersion').each(function() {
        const thisPartial = $(this);

        const moduleVersionHelper = {
            outputWidth: '440px',
        };

        const moduleVersionPlatformElem = $(thisPartial).find('.moduleVersionPlatform');
        const moduleVersion1Elem = $(thisPartial).find('.moduleVersion1');
        const moduleVersion2Elem = $(thisPartial).find('.moduleVersion2');
        const moduleVersionBodyElem = $(thisPartial).find('.moduleVersionBody');

        const updateOutput = async function() {
            const platformName = $(moduleVersionPlatformElem).val();
            const ver1 = $(moduleVersion1Elem).val();
            const ver2 = $(moduleVersion2Elem).val();

            let verInfo1;
            try {
                const fetchRes = await fetch('/assets/files/device-restore/' + ver1 + '/' + platformName + '.json');
                verInfo1 = await fetchRes.json();
            }
            catch(e) {                
            }

            let verInfo2;
            if (ver2 != '-') {
                try {
                    let fetchRes = await fetch('/assets/files/device-restore/' + ver2 + '/' + platformName + '.json');
                    verInfo2 = await fetchRes.json();
                }
                catch(e) {                
                }
            }

            $(thisPartial).find('.moduleVersionHead1').text(ver1);
            if (verInfo2) {
                $(thisPartial).find('.moduleVersionHead2').text(ver2);
            }
            else {
                $(thisPartial).find('.moduleVersionHead2').text('');
            }

            let moduleFunctions = [];
            for(const key in verInfo1) {
                const prefixInfo = verInfo1[key].prefixInfo;

                moduleFunctions.push({
                    moduleFunction: prefixInfo.moduleFunction,
                    moduleIndex: prefixInfo.moduleIndex,
                    key,
                });
            }
            console.log('moduleFunctions', moduleFunctions);

            $(moduleVersionBodyElem).empty();

            const fields = [
                {
                    title: 'Module Version',
                    key: 'moduleVersion'
                },
            ];

            for(const key in verInfo1) {
                let trElem = document.createElement('tr');

                let tdElem;
                tdElem = document.createElement('td');
                $(tdElem).attr('colspan', 4);
                $(tdElem).text(key);
                $(trElem).append(tdElem);
                $(moduleVersionBodyElem).append(trElem);

                for(const fieldObj in fields) {
                    trElem = document.createElement('tr');

                    // Spacer below module name
                    tdElem = document.createElement('td');
                    $(trElem).append(tdElem);

                    tdElem = document.createElement('td');
                    $(tdElem).text(fieldObj.title);                        
                    $(trElem).append(tdElem);

                    for(const values in [verInfo1, verInfo2]) {
                        if (!values || !values.prefixInfo) {
                            continue;
                        }

                        tdElem = document.createElement('td');
                        $(tdElem).text(values[fieldObj.key]);
                        $(trElem).append(tdElem);
                    }

                    $(moduleVersionBodyElem).append(trElem);
                }


            }

            if (verInfo2) {
            }


        }

        const updateVersionSelect = async function() {
            $(moduleVersion1Elem).empty();
            $(moduleVersion2Elem).empty();

            {
                const optionElem = document.createElement('option');
                $(optionElem).text('None');
                $(optionElem).val('-');

                $(moduleVersion2Elem).append(optionElem);
            }

            const platformName = $(moduleVersionPlatformElem).val();

            for(const verString of moduleVersionHelper.deviceRestore.versionsZipByPlatform[platformName]) {
                const optionElem = document.createElement('option');
                $(optionElem).text(verString);
                $(optionElem).val(verString);

                $(moduleVersion1Elem).append(optionElem);
                $(moduleVersion2Elem).append(optionElem.cloneNode(true));
            }


            $(moduleVersion1Elem).on('change', updateOutput);
            $(moduleVersion2Elem).on('change', updateOutput);
            updateOutput();
        }

        const run = async function() {

            const promises = [];

            /*
            promises.push(new Promise(function(resolve, reject) {
                apiHelper.getCarriersJson().then(function(carriersJson) {
                    moduleVersionHelper.carriersJson = carriersJson;
            
                    resolve();
                });
            }));
            */

            promises.push(new Promise(function(resolve, reject) {
                fetch('/assets/files/deviceRestore.json')
                    .then(response => response.json())
                    .then(function(data) {

                        moduleVersionHelper.deviceRestore = data;
                        
                        resolve();
                    });                    
            }));

            await Promise.all(promises);

            console.log('moduleVersionHelper', moduleVersionHelper);

            moduleVersionHelper.devicePlatformNames = [];
            for(const platformObj of moduleVersionHelper.deviceRestore.platforms) {
                if (!platformObj.discontinued) {
                    moduleVersionHelper.devicePlatformNames.push(platformObj.name);
                }
            }
            moduleVersionHelper.devicePlatformNames.sort(function(a, b) {
                const aObj = moduleVersionHelper.deviceRestore.platforms.find(e => e.name == a);
                const bObj = moduleVersionHelper.deviceRestore.platforms.find(e => e.name == b);

                return aObj.title.localeCompare(bObj.title);
            })

            // Load platform popup
            for(const name of moduleVersionHelper.devicePlatformNames) {
                const platformObj = moduleVersionHelper.deviceRestore.platforms.find(e => e.name == name)

                const optionElem = document.createElement('option');
                $(optionElem).text(platformObj.title + ' (' + platformObj.id + ')');
                $(optionElem).val(name);

                $(moduleVersionPlatformElem).append(optionElem);
            }
            $(moduleVersionPlatformElem).on('change', updateVersionSelect)
            await updateVersionSelect();
        };
        run();
    })

});


/*
function updateTinker(settings) {
    $('.apiHelperTinker').each(function() {
        const thisPartial = $(this);

        let tinker = $(thisPartial).data('tinker');
        for(const key in settings) {
            switch(key) {
                case 'leftOffset':
                    tinker.layout.columns[0].hOffset = settings[key];
                    break;

                case 'rightOffset':
                    tinker.layout.columns[1].hOffset = settings[key];
                    break;

                default:
                    tinker.layout[key] = settings[key];
                    break;
            }
        }
        tinker.update();
    });    
}
*/

