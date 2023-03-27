$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    if (!apiHelper.auth || !apiHelper.auth.username) {
        return;
    }

    const localStorageKey = 'webhookDemo';
    const webhookName = 'WebhookDemo01';

    let webhookDemo = {      
        started: false,
        settings: {},
    };

    try {
        const s = localStorage.getItem(localStorageKey);
        if (s) {
            webhookDemo.settings = JSON.parse(s);
            if (webhookDemo.settings.username != apiHelper.auth.username) {
                webhookDemo.settings = {};
            }    
        }
    }
    catch(e) {        
    }
    webhookDemo.settings.username = apiHelper.auth.username;

    const updateSettings = function() {
        localStorage.setItem(localStorageKey, JSON.stringify(webhookDemo.settings));
    }


    const updateAddDevice = function() {
        $('.addDeviceOptions').hide();

        if (!webhookDemo.deviceObj) {
            $('.addDeviceNoDevice').show();
        }
        else
        if (!webhookDemo.settings.productId) {
            $('.addDeviceNoProduct').show();
        }
        else
        if (webhookDemo.deviceObj.product_id == webhookDemo.settings.productId) {
            $('.addDeviceAlreadyAdded').show();
        }
        else {
            $('.addDeviceCanAddDevice').show();
        }        
    }


    const updateCreateWebhook = function() {
        $('.createWebhookOptions').hide();
        $('.testWebhookOptions').hide();

        if (!webhookDemo.settings.productId) {
            $('.webhookDemoNoProduct').show();
        }
        else
        if (!webhookDemo.hookUrl) {
            $('.webhookDemoNoUrl').show();
        }
        else {
            let found = webhookDemo.webhooks.find(e => e.event == webhookName);
            if (found) {
                $('.createWebhookAlreadyAdded').show();
                $('.testWebhookCanTest').show();
            }
            else {
                $('.createWebhookCanCreate').show();
                $('.testWebhookNoWebhook').show();
            }           
        }

    };


    const createOrUpdateWebhook = async function(options = {}) {
        let body = '{ "deviceId":"{{{PARTICLE_DEVICE_ID}}}", "ts":"{{{PARTICLE_PUBLISHED_AT}}}", "sensor":{{{PARTICLE_EVENT_VALUE}}} }';

        let settings = {
            integration_type: 'Webhook',
            headers: {
                'Content-Type': 'application/json'
            },
            url: webhookDemo.hookUrl,
            noDefaults: true,
            method: 'POST',
            body,
            responseTopic: '{{{PARTICLE_DEVICE_ID}}}/hook-response/{{{PARTICLE_EVENT_NAME}}}',
            errorResponseTopic: '{{{PARTICLE_DEVICE_ID}}}/hook-error/{{{PARTICLE_EVENT_NAME}}}',
            // responseTemplate
        };
        console.log('settings', settings);

        let integrationObj = webhookDemo.webhooks.find(e => e.event == webhookName);
        if (integrationObj) {
            console.log('update integration', integrationObj);
            const resp = await apiHelper.particle.editIntegration({
                integrationId: integrationObj.integrationId,
                event: webhookName, 
                settings, 
                product: webhookDemo.settings.productId,
                auth: apiHelper.auth.access_token});
            console.log('edit resp', resp);    
        }
        else 
        if (!options.updateOnly) {
            const resp = await apiHelper.particle.createIntegration({
                event: webhookName, 
                settings, 
                product: webhookDemo.settings.productId,
                auth: apiHelper.auth.access_token});

            console.log('create resp', resp);    
            webhookDemo.settings.integrationId = resp.body.id;
            updateSettings();                

            webhookDemo.webhooks = (await apiHelper.particle.listIntegrations({
                product: webhookDemo.settings.productId,
                auth: apiHelper.auth.access_token,
            })).body;            
        }
    }

    const updateProductSelector = async function() {
        // const productSelectElem = $('#productSelect');

        console.log('updateProductSelector', webhookDemo);

        webhookDemo.productsData = await apiHelper.getProducts();

        webhookDemo.productsData.products.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

        const lastSelected = $('#productSelect').val();
        $('#productSelect').empty();

        for(const product of webhookDemo.productsData.products) {
            if (product.platform_id == webhookDemo.settings.platformId) {
                const optionElem = document.createElement('option');
                $(optionElem).attr('value', product.id.toString());
                $(optionElem).text(product.name + ' (' + product.id + ')');
                $('#productSelect').append(optionElem);    

                /*
                let settings = apiHelper.manualSettings.get({key:'createOrSelectProduct'});
                if (settings.productId == product.id) {
                    $(productSelectElem).val(product.id.toString());
                    $(newExistingRadioElem).prop('checked', false);
                    $(existingRadioElem).prop('checked', true);
                    $(createProductButtonElem).prop('disabled', true);
                }
                */
            }
        }
        if (lastSelected) {
            $('#productSelect').val(lastSelected);
        }

        const newProductName = 'webhook-demo-' + webhookDemo.settings.platformName.toLowerCase() + '-' + Math.floor(Math.random() * 999999);
        $('#newProductNameInput').val(newProductName);

        if (webhookDemo.settings.productId) {
            $('#productSelect').val(webhookDemo.settings.productId);
            if ($('#productSelect').val() == webhookDemo.settings.productId) {
                $('#productSelect').trigger('change');
                $('#createNewProduct').prop('checked', false);
                $('#useExistingProduct').prop('checked', true);
            }
        }

        if (webhookDemo.url) {
            await updateWebhookUrl();
        }

        updateAddDevice();
    }

    const updateProduct = async function() {
        // webhookDemo.settings.productId

        webhookDemo.productInfo = (await apiHelper.particle.getProduct({
            product: webhookDemo.settings.productId,
            auth: apiHelper.auth.access_token,
        })).body;

        webhookDemo.webhooks = (await apiHelper.particle.listIntegrations({
            product: webhookDemo.settings.productId,
            auth: apiHelper.auth.access_token,
        })).body;

        webhookDemo.productFirmware = (await apiHelper.particle.listProductFirmware({
            product: webhookDemo.settings.productId,
            auth: apiHelper.auth.access_token,
        })).body;


        console.log('updateProduct', webhookDemo);

        updateAddDevice();
        updateCreateWebhook();
    }



    const updateDevice = async function() {
        // webhookDemo.settings.deviceId
        webhookDemo.deviceObj = (await apiHelper.particle.getDevice({
            deviceId: webhookDemo.settings.deviceId,
            auth: apiHelper.auth.access_token,
        })).body;
        
        //apiHelper.deviceListCache.find(e => e.id == webhookDemo.settings.deviceId);
        const deviceSelectInfoElem = $('.deviceSelectInfo');
        const tbodyElem = $(deviceSelectInfoElem).find('tbody');
        $(deviceSelectInfoElem).show();
        $(tbodyElem).empty();

        webhookDemo.deviceObj._platform = webhookDemo.settings.platformName = await apiHelper.getPlatformName(webhookDemo.deviceObj.platform_id);
        webhookDemo.deviceObj._sku = await apiHelper.getSkuFromSerial(webhookDemo.deviceObj.serial_number);
        if (!webhookDemo.deviceObj._sku) {
            webhookDemo.deviceObj._sku = 'Unknown';
        }
        webhookDemo.settings.platformId = webhookDemo.deviceObj.platform_id;
                    
        updateSettings();

        console.log('deviceInfo', webhookDemo.deviceObj);

        let tableData = {
            'id': 'Device ID',
            'name': 'Device Name',
            '_platform': 'Platform',
            'serial_number': 'Serial Number',
            '_sku': 'SKU',          
            'product_id': 'Product ID',                                       
        };

        apiHelper.simpleTableObjectMap(tbodyElem, tableData, webhookDemo.deviceObj);
        
        $('.webhookDemo').trigger('webhookDemoState', ['deviceSelected']);
        $('.noDeviceSelected').hide();
        $('.platformSelected').show();

        updateProductSelector();
        updateAddDevice();
    };

    const updateWebhookUrl = async function() {
        webhookDemo.hookUrl = webhookDemo.url + '/hook';
        console.log('updateWebhookUrl ' + webhookDemo.hookUrl);

        $('.webhookUrlSpan').text(webhookDemo.hookUrl);

        updateCreateWebhook();

        await createOrUpdateWebhook({updateOnly:true});
    }

    $('.webhookDemo[data-control="start"]').each(async function() {
        $(this).data('webhookDemo', webhookDemo);

        // Do stuff for browser compatibility checks here

        $('#canStart').show();

        $('#startDemo').on('click', async function() {
            $('#startDemo').prop('disabled', true);
            $('.showWhenStarted').show();
            $('.hideWhenStarted').hide();

            webhookDemo.started = true;

            const embedObject = $('.stackblitzEmbed').data('embedObject');
            embedObject.hasUrlCallback = async function(url) {
                webhookDemo.url = url;
                if (webhookDemo.settings.productId) {
                    await updateWebhookUrl();
                }
            }

            embedObject.load();
        })
    

    });

    const deviceListSelectElem = $('.deviceListSelect');
    
    apiHelper.deviceList(deviceListSelectElem, {
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
            webhookDemo.settings.deviceId = $(elem).val();
            await updateDevice();
        },
        onUpdateList: function() {
            if (webhookDemo.settings.deviceId) {
                console.log('onUpdateList ' + webhookDemo.settings.deviceId);
                $(deviceListSelectElem).val(webhookDemo.settings.deviceId);
                if ($(deviceListSelectElem).val() == webhookDemo.settings.deviceId) {
                    $(deviceListSelectElem).trigger('change');
                }
            }
        },
    }); 


    apiHelper.getCarriersJson().then(function(carriersJsonIn) {
        webhookDemo.carriersJson = carriersJsonIn;

        let platforms = [];
        
        for(const platformName in webhookDemo.carriersJson.deviceConstants) {
            const platformObj = webhookDemo.carriersJson.deviceConstants[platformName];
            if (platformObj.productEligible) {
                platforms.push(platformName);
            }
        }
        platforms.sort(function(a, b) {
            return carriersJson.deviceConstants[a].displayName.localeCompare(webhookDemo.carriersJson.deviceConstants[b].displayName);
        })

        for(const platformName of platforms) {
            const platformObj = webhookDemo.carriersJson.deviceConstants[platformName];
            const optionElem = document.createElement('option');
            $(optionElem).text(platformObj.displayName + ' (' + platformObj.id + ')');
            $(optionElem).attr('value', platformObj.id.toString());
            $('#devicePlatformSelect').append(optionElem);    
        }

    });

    $('#devicePlatformSelect').on('change', async function() {
        const valString = $(this).val();
        if (valString == '-') {
            // Select
            return;
        }
        const firstOptionElem = $(this).find('option').first();
        if ($(firstOptionElem).val() == '-') {
            $(firstOptionElem).remove();
        }

        webhookDemo.settings.platformId = parseInt(valString);
        webhookDemo.settings.platformName = await apiHelper.getPlatformName(webhookDemo.settings.platformId);

        updateSettings();
        updateProductSelector();

        $('.platformSelected').show();
    });

    $('#newProductNameInput').on('change', function() {
        $('.productRadio').prop('checked', false);
        $('#createNewProduct').prop('checked', true);
    });

    $('.productRadio').on('click', async function() {
        const createNew = $(this).attr('id') == 'createNewProduct';
        $('.productRadio').prop('checked', false);
        if (createNew) {
            $('#createNewProductButton').prop('disabled', false);
            $('#createNewProduct').prop('checked', true);

            webhookDemo.settings.productId = 0;
            updateSettings();
            updateAddDevice();
        }
        else {
            $('#createNewProductButton').prop('disabled', true);
            $('#useExistingProduct').prop('checked', true);

            if ($('#productSelect').val()) {
                webhookDemo.settings.productId = parseInt($('#productSelect').val());
                updateSettings();                
                await updateProduct();
            }
        }
    });

    $('#productSelect').on('change', async function() {
        webhookDemo.settings.productId = parseInt($('#productSelect').val());
        updateSettings();                
        await updateProduct();
    })


    $('#createNewProductButton').on('click', function() {
        let requestDataObj = {
            product: {
                name: $('#newProductNameInput').val(),
                platform_id: webhookDemo.settings.platformId,
            },
        };

        const request = {                
            contentType: 'application/json',
            data: JSON.stringify(requestDataObj),
            dataType: 'json',
            error: function (jqXHR) {
                // gtag('event', 'Error', {'event_category':simpleGetConfig.gaAction, 'event_label':(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});
                console.log('error', jqXHR);
                //setStatus('Product creation failed');
            },
            headers: {
                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                'Accept': 'application/json'
            },
            method: 'POST',
            success: function (resp, textStatus, jqXHR) {
                // gtag('event', 'Success', {'event_category':simpleGetConfig.gaAction});
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
                    $('#productSelect').append(optionElem);    
                    $('#productSelect').val(resp.product.id.toString());

                    $('#createNewProductButton').prop('disabled', true);
                    $('#createNewProduct').prop('checked', false);
                    $('#useExistingProduct').prop('checked', true);

                    webhookDemo.settings.productId = resp.product.id;
                    updateSettings();            

                    // setStatus('Product ' + resp.product.name + ' successfully created');
                }
                else {
                    // setStatus('Product creation failed');
                    console.log('request failed', resp);
                }
            },
            url: 'https://api.particle.io/v1/user/products/',
        };

        $.ajax(request);
    });

    $('#addDeviceButton').on('click', async function() {

        const resp = await apiHelper.particle.addDeviceToProduct({
            product: webhookDemo.settings.productId,
            deviceId: webhookDemo.settings.deviceId,
            auth: apiHelper.auth.access_token,
        });
        console.log('resp', resp);

        if (resp.statusCode == 200 && resp.body.updated == 1) {
            updateDevice();
        }
        else {
            // TODO: Error handling
        }
    });


    $('#createWebhookButton').on('click', async function() {
        await createOrUpdateWebhook();

        updateCreateWebhook();
    
    });

    $('#testWebhookButton').on('click', async function() {
        let eventDataObj = {
            sensor: 25,
        };

        const resp = await apiHelper.particle.publishEvent({ 
            name: webhookName, 
            data: JSON.stringify(eventDataObj), 
            product: webhookDemo.settings.productId,
            auth: apiHelper.auth.access_token,
        });

        console.log('resp', resp);

    });

});

