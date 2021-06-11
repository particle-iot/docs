
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
            const deviceId = $(deviceLookupDeviceIdInputElem).val();

            $(deviceLookupElem).find('.apiHelperDeviceLookupResult').html('');
            $(deviceLookupDetailBodyElem).html('');

    
            $(deviceLookupElem).find('.apiHelperDeviceLookupProduct').hide();
            $(deviceLookupElem).find('.apiHelperDeviceLookupOrg').hide();
            $(deviceLookupElem).find('.apiHelperDeviceLookupClaimDiv').hide();
            $(deviceLookupElem).find('.apiHelperDeviceLookupRenameDeviceDiv').hide();
                            
            let deviceFound = false;
            let deviceInfo;
            let deviceMine = false;
            let deviceProductName;
            let deviceProductId;

            {
                const currentOutput = function(status) {
                    $(deviceLookupElem).find('.apiHelperDeviceLookupClaimedMyAccount > span').append(status);
                };

                try {
                    const deviceData = await apiHelper.particle.getDevice({ deviceId, auth: apiHelper.auth.access_token });
        
                    currentOutput('\u2705 Yes!'); // green check
                    deviceFound = true;
                    deviceInfo = deviceData.body;      
                    deviceMine = true;     
                }
                catch(e) {
                    currentOutput('\u274C No'); // red x
                }
            }

            if (!deviceFound || modeRemoveProduct) {
                $(deviceLookupElem).find('.apiHelperDeviceLookupProduct').show();

                const currentOutput = function(status) {
                    $(deviceLookupElem).find('.apiHelperDeviceLookupProduct > span').append(status);
                };

                try {
                    const productsData = await apiHelper.getProducts();
    
                    let foundInProduct = false;
    
                    for(const product of productsData.products) {

                        try {
                            const deviceData = await apiHelper.particle.getDevice({ deviceId, product: product.id, auth: apiHelper.auth.access_token });
            
                            if (deviceData.body.product_id == product.id) {
            
                                currentOutput('\u2705 ' + product.name + ' (' + product.id + ') Yes!<br/>'); // green check
                                foundInProduct = true;
                                deviceFound = true;
                                deviceInfo = deviceData.body;
                                deviceProductName = product.name;
                                deviceProductId = product.id;
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

            if ((!deviceFound || (modeRemoveProduct && !deviceProductId)) && !modeNoCheckOrgs) {
                $(deviceLookupElem).find('.apiHelperDeviceLookupOrg').show();

                const currentOutput = function(status) {
                    $(deviceLookupElem).find('.apiHelperDeviceLookupOrg > span').append(status);
                };

                try {
                    const orgsData = await apiHelper.getOrgs();
    
                    for(const org of orgsData.organizations) {
                        // id, slug, name

                        const orgProducts = await apiHelper.getOrgProducts(org.id);

                        currentOutput('Checking organization ' + org.name + '...<br/>');

                        for(const product of orgProducts.products) {
                            let foundInOrgProduct = false;
    
                            try {
                                const deviceData = await apiHelper.particle.getDevice({ deviceId, product: product.id, auth: apiHelper.auth.access_token });
                                
                                if (deviceData.body.product_id == product.id) {
                                    currentOutput('\u2705 ' + product.name + ' (' + product.id + ') Yes!<br/>'); // green check
                                    deviceFound = true;
                                    foundInOrgProduct = true;
                                    deviceInfo = deviceData.body;
                                    deviceProductName = product.name;
                                    deviceProductId = product.id;
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

            if (deviceInfo) {
                const currentOutput = function(label, value) {
                    if (typeof value == 'undefined') {
                        return;
                    }
                    $(deviceLookupDetailBodyElem).append(
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

                currentOutput('Device ID', deviceInfo.id);
                currentOutput('Device Name', deviceInfo.name);

                currentOutput('Online', deviceInfo.online);
                currentOutput('Serial Number', deviceInfo.serial_number);
                currentOutput('ICCID', deviceInfo.iccid);
                currentOutput('IMEI', deviceInfo.imei);
                    
                currentOutput('Device OS Version', deviceInfo.system_firmware_version);

                currentOutput('Last Handshake', timeString(deviceInfo.last_handshake_at));
                currentOutput('Last Heard', timeString(deviceInfo.last_heard));
                currentOutput('Status', deviceInfo.status);

                if (deviceInfo.product_id > 100) {
                    currentOutput('Product ID', deviceInfo.product_id);
                    currentOutput('Product Name', deviceProductName);
                    currentOutput('Development', deviceInfo.development);
                    currentOutput('Quarantined', deviceInfo.quarantined);
                    currentOutput('Firmware Version', deviceInfo.firmware_version);
                    currentOutput('Desired Firmware Version', deviceInfo.desired_firmware_version);
    
                    
                    currentOutput('Firmware Updates Enabled', deviceInfo.firmware_updates_enabled);
                    currentOutput('Firmware Updates Forced', deviceInfo.firmware_updates_forced);
                    if (deviceInfo.groups) {
                        currentOutput('Groups', deviceInfo.groups.join(' '));
                    }    
                }

                if (deviceMine && modeUnclaim) {
                    $('.apiHelperDeviceLookupUnclaimDeviceDiv').show();
                    $(deviceLookupElem).find('.apiHelperDeviceLookupUnclaimDeviceButton').on('click', async function() {
                        const setButtonStatus = function(status) {
                            $(deviceLookupElem).find('.apiHelperDeviceLookupUnclaimDeviceStatus').text(status);
                        };
                        setButtonStatus('Unclaiming...');
                        try {
                            await apiHelper.unclaimDevice(deviceInfo.id);
                            setButtonStatus('Successfully unclaimed device ' + deviceInfo.id);
                        }
                        catch(e) {
                            setButtonStatus('Error unclaiming device');
                        }
                    });
                }
                if (deviceProductId && modeRemoveProduct) {
                    $('.apiHelperDeviceLookupRemoveProductDiv').show();
                    $(deviceLookupElem).find('.apiHelperDeviceLookupRemoveProductButton').on('click', async function() {
                        const setButtonStatus = function(status) {
                            $(deviceLookupElem).find('.apiHelperDeviceLookupRemoveProductStatus').text(status);
                        };
                        setButtonStatus('Removing from product...');
                        try {
                            await apiHelper.unclaimProductDevice(deviceInfo.id, deviceProductId);
                            await apiHelper.removeProductDevice(deviceInfo.id, deviceProductId);    
                            setButtonStatus('Successfully removed from product ' + deviceProductName);
                        }
                        catch(e) {
                            setButtonStatus('Error removing from product ' + deviceProductName);
                        }
                    });
                }

                if (deviceMine && !modeUnclaim){
                    $('.apiHelperDeviceLookupRenameDeviceName').val(deviceInfo.name);
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
    
});
