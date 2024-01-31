$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    if (!apiHelper.auth || !apiHelper.auth.username) {
        return;
    }

    const serverUrlBase = 'https://api.webhook-demo.com/';
    const hookAuthorization = '9BQuGrR3ZhrPjBPBAQPRdSWNUFdAPLWseD7GzS5Cjg6tn43W';

    // These will be overridden based on the demo
    let gaCategory;
    
    let webhookDemo = {      
        started: false,
        settings: {},
    };

    $('.webhookDemo[data-control="start"]').each(function() {
        $(this).data('webhookDemo', webhookDemo);

        webhookDemo.mode = $(this).data('mode');
        switch(webhookDemo.mode) {
            case 'webhook01':
                webhookDemo.localStorageKey = 'webhookDemo';
                webhookDemo.webhookName = gaCategory = 'WebhookDemo01';
                webhookDemo.productNamePrefix = 'webhook-demo-';
                webhookDemo.firmwareVersion = 1;
                break;

            case 'function-publish':
                webhookDemo.localStorageKey = 'functionPublishDemo';
                webhookDemo.webhookName = gaCategory = 'G52ES20Q_DeviceGroup';
                webhookDemo.productNamePrefix = 'function-publish-demo-';
                webhookDemo.firmwareVersion = 1;
                webhookDemo.requiredFunctions = ['setColor', 'setDeviceGroups'];
                break;
        }
    
        webhookDemo.options = $(this).data('options').split(',');
    });

    try {
        const s = localStorage.getItem(webhookDemo.localStorageKey);
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
    
    analytics.track('opened ' + webhookDemo.mode, {category:gaCategory});

    webhookDemo.runningProductFirmware = new Promise(function(resolve, reject) {
        webhookDemo.runningProductFirmwareResolve = resolve;
    });
    webhookDemo.haveServerUrl = new Promise(function(resolve, reject) {
        webhookDemo.haveServerUrlResolve = resolve;
    });

    const updateSettings = function() {
        if (webhookDemo.localStorageKey) {
            localStorage.setItem(webhookDemo.localStorageKey, JSON.stringify(webhookDemo.settings));
        }
    }

    const updateLinks = function() {

        $('.webhookDemoLink').each(function() {
            let link = $(this).data('link');

            let isSandbox = false;
            if (link.startsWith('sandbox/')) {
                isSandbox = true;
                link = link.substring(8);
            }

            let newLink = 'https://console.particle.io/';

            if (!isSandbox && webhookDemo.productInfo) {
                newLink += webhookDemo.productInfo.slug + '/';
            }
            
            if (isSandbox || webhookDemo.productInfo) {
                switch(link) {
                    case 'product':
                        break;

                    case 'webhook':
                        if (webhookDemo.settings.integrationId) {
                            newLink += 'integrations/webhooks/' + webhookDemo.settings.integrationId;
                        }
                        break;

                    case 'devices':
                    case 'events':
                    case 'firmware':
                    case 'integrations':
                    case 'team':
                    case 'authentication':
                    case 'settings':
                    default:
                        newLink += link;
                        break;
                }    
            }

            $(this).prop('href', newLink);
        });

    }

    const updateCleanup = function() {
        // cleanupWebhook cleanupDevices cleanupProduct
        // cleanupButton

        if (!webhookDemo.productDevices || !webhookDemo.webhooks) {
            $('#cleanupStartWarning').show();
            $('#cleanupCanRun').hide();
            return;
        }

        $('#cleanupStartWarning').hide();
        $('#cleanupCanRun').show();

        if (!webhookDemo.settings.productId) {
            // No product selected
            $('#cleanupButton').prop('disabled', true);
            return;
        }

        $('#cleanupButton').prop('disabled', false);

        $('#cleanupWebhook').prop('disabled', true);
        $('#cleanupTinker').prop('disabled', true);
        $('#cleanupDevices').prop('disabled', true);
        $('#cleanupProduct').prop('disabled', true);

        
        if (webhookDemo.webhooks.length > 0) {
            $('#cleanupWebhook').prop('disabled', false);
        }

        if (webhookDemo.productDevices.length > 0) {
            $('#cleanupDevices').prop('disabled', false);
        }
        for(const dev of webhookDemo.productDevices) {
            if (dev.online && dev.firmware_version == webhookDemo.firmwareVersion) {
                $('#cleanupTinker').prop('disabled', false);
            }
        }
    
        if ((webhookDemo.webhooks.length == 0 || $('#cleanupWebhook').prop('checked')) &&
            (webhookDemo.productDevices.length == 0 || $('#cleanupDevices').prop('checked'))) {
            // Can only delete an empty product
            $('#cleanupProduct').prop('disabled', false);
        }
    

    }
    
    const makeBanner = function(options) {
        const bannerDivElem = document.createElement('div');
        $(bannerDivElem).css('padding', '10px 10px 10px 10px');
        $(bannerDivElem).css('margin', '10px 0px 10px 0px');
        $(bannerDivElem).css('text-align', 'center');
        $(bannerDivElem).css('background-color', options.color);
        $(bannerDivElem).text(options.title);
        return bannerDivElem;
    }

    const makeTextDiv = function(s) {
        const divElem = document.createElement('div');

        $(divElem).text(s);

        return divElem;
    }
    const makePreDiv = function(s) {
        const divElem = document.createElement('div');

        const preElem = document.createElement('pre');
        $(preElem).addClass('apiHelperMonoSmall');
        $(preElem).text(s);
        $(divElem).append(preElem);

        return divElem;
    }

    const updateExplainer = function(explainObj) {
        let nextExplainer;

        const colors = {
            device: '#00A3B3', // COLOR_ParticleBlue_700
            eventApi: '#5FD898',   // COLOR_Mint_700
            eventDevice: '#00E1FF',   // COLOR_ParticleBlue_500
            eventHook: '#B0E5C9',  // COLOR_Mint_500
            eventHookError: '#FF6F76',  // COLOR_State_Red_500
            hookReceived: '#FA6200',  // COLOR_Tangerine_600
            hookResponse: '#FF9F61',    // COLOR_Tangerine_400
            parsedData: '#FFADBD',   // COLOR_Watermelon_400
        };

        const divOuterElem = document.createElement('div');


        if (explainObj.kind == 'event') {
            let bannerOptions = {};
            

            let text = '';
            if (explainObj.event.name == webhookDemo.webhookName) {
                text += 'The Particle event ';
                if (explainObj.event.coreid == 'api') {
                    text += 'generated by the Test button or Cloud API:';
                    bannerOptions.title = 'Event (API)';
                    bannerOptions.color = colors.eventApi;
                }
                else {
                    text += 'generated by the device ' + explainObj.event.deviceName + ':';
                    bannerOptions.title = 'Event (Device)';
                    bannerOptions.color = colors.eventDevice;
                }
            }
            else
            if (explainObj.event.name.indexOf('hook-sent') >= 0) {
                text += 'The Particle webhook server has sent the event to your webhook server. You can also see this event in the product event stream in the console.'
                bannerOptions.title = 'Event (hook-sent)';
                bannerOptions.color = colors.eventHook;
            }
            else
            if (explainObj.event.name.indexOf('hook-response') >= 0) {
                text += 'The response data from your webhook server, converted into a Particle event that can be received by your device. '
                bannerOptions.title = 'Event (hook-response)';
                bannerOptions.color = colors.eventHook;                       
            }
            else
            if (explainObj.event.name.indexOf('hook-error') >= 0) {
                text += 'Your webhook server return an error:'
                bannerOptions.title = 'Event (hook-error)';
                bannerOptions.color = colors.eventHookError;
                
            }
            $(divOuterElem).append(makeBanner(bannerOptions));
            $(divOuterElem).append(makeTextDiv(text));

            const tableElem = document.createElement('table');

            const tbodyElem = document.createElement('tbody');

            if (explainObj.event.name == webhookDemo.webhookName) {
                $('#explainerTable').empty();
            }

            const fields = [
                {
                    key: 'name',
                    title: 'Event Name',
                },
                {
                    key: 'data',
                    title: 'Event Data',
                },
                {
                    key: 'deviceName',
                    title: 'Device',
                },
                {
                    key: 'published_at',
                    title: 'Published At',
                }
            ];
            for(const field of fields) {
                const trInnerElem = document.createElement('tr');

                {
                    const tdInnerElem = document.createElement('td');
                    $(tdInnerElem).text(field.title);
                    $(trInnerElem).append(tdInnerElem);    
                }
                {
                    const tdInnerElem = document.createElement('td');
                    $(tdInnerElem).text(explainObj.event[field.key]);
                    $(trInnerElem).append(tdInnerElem);    
                }

                $(tbodyElem).append(trInnerElem);
            }

            $(tableElem).append(tbodyElem);

            $(divOuterElem).append(tableElem);

            try {
                const jsonData = JSON.parse(explainObj.event.data);

                text = 'The data sent by your device appears to be JSON formatted, which we recommend. '
                if (jsonData.id) {
                    text += 'The data contains a unique id field, which can help associate requests and responses and handle deduplication.';
                }
                $(divOuterElem).append(makeTextDiv(text));
                $(divOuterElem).append(makePreDiv(JSON.stringify(jsonData, null, 4)));
            }
            catch(e) {

            }
        }
        else
        if (explainObj.kind == 'hook') {
            // hookObj  .hookId, .body, .headers, .method, .originalUrl, .query (object)
            let bannerOptions = {
                title: 'Your webhook server (received request)',
                color: colors.hookReceived,
            };
            $(divOuterElem).append(makeBanner(bannerOptions));

            let text = '';
            text += 'Your webhook server has received the request. These are the HTTP headers from the request:';
            $(divOuterElem).append(makeTextDiv(text));


            $(divOuterElem).append(makePreDiv(explainObj.hookObj.headers));
            
            let data = explainObj.hookObj.body;
            try {
                const json = JSON.parse(data);
                data = JSON.stringify(json, null, 4);
            }
            catch(e) {
            }
            nextExplainer = {
                kind: 'data',
                data,
            }
        }
        else
        if (explainObj.kind == 'hookResponse') {
            // hookObj  .hookId, .statusCode, contentType, body, 
            let bannerOptions = {
                title: 'Your webhook server (sent response)',
                color: colors.hookResponse,
            };
            $(divOuterElem).append(makeBanner(bannerOptions));

            let text = '';
            text += 'Your webhook server has processed the request and is returning a response. ';
            text += 'The contents below depend on your application.';

            $(divOuterElem).append(makeTextDiv(text));
            $(divOuterElem).append(makePreDiv(explainObj.hookObj.body));
        }
        else
        if (explainObj.kind == 'data') {
            let bannerOptions = {
                title: 'Data received by webhook server',
                color: colors.parsedData,
            };
            $(divOuterElem).append(makeBanner(bannerOptions));
            let text = '';
            text += 'The data that was received by your webhook server, which depends on your webhook configuration and '
            text += 'the data sent by the device.'
            $(divOuterElem).append(makeTextDiv(text));
            $(divOuterElem).append(makePreDiv(explainObj.data));
        }

    
        
        $('#explainerTable').append(divOuterElem);

        if (nextExplainer) {
            updateExplainer(nextExplainer);
        }

    }


    const startWebhookSession = function() {
        // Create a new SSE session which creates a new tutorial session
        const evtSource = webhookDemo.serverStream = new EventSource(serverUrlBase + 'stream', {withCredentials:false});

        evtSource.addEventListener('start', async function(event) {
            const dataObj = JSON.parse(event.data);

            webhookDemo.sessionId = dataObj.sessionId;

            webhookDemo.hookUrl = serverUrlBase + 'hook/' + webhookDemo.sessionId;
            webhookDemo.controlUrl = serverUrlBase + 'control/' + webhookDemo.sessionId;
            if (webhookDemo.settings.productId) {
                await updateWebhookUrl();
            }
            
            await sendControl({
                op: 'hookResponse',
                authorization: hookAuthorization,   
            })
        });

        evtSource.addEventListener('hook', function(event) {
            try {
                const hookObj = JSON.parse(event.data);

                updateExplainer({
                    kind: 'hook',
                    hookObj,
                });

                try {
                    const bodyObj = JSON.parse(hookObj.body);
                    updateDataTable(apiHelper.flattenObject(bodyObj));
                }
                catch(e) {
                }
            }
            catch(e) {
                console.log('exception in hook listener', e);
            }
        });


        evtSource.addEventListener('hookResponse', function(event) {
            try {
                const hookObj = JSON.parse(event.data);

                updateExplainer({
                    kind: 'hookResponse',
                    hookObj,
                });


            }
            catch(e) {
                console.log('exception in hook listener', e);
            }
        });

        evtSource.onerror = function(err) {
            console.error("EventSource failed:", err);
        };
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
            let found = webhookDemo.webhooks.find(e => e.event == webhookDemo.webhookName);
            if (found) {
                $('.createWebhookAlreadyAdded').show();
                $('.testWebhookCanTest').show();
            }
            else {
                $('.testWebhookNoWebhook').show();
            }           
        }
        updateCleanup();
        updateLinks();
    };


    const createOrUpdateWebhook = async function(options = {}) {
        let body = '{ "deviceId":"{{{PARTICLE_DEVICE_ID}}}", "ts":"{{{PARTICLE_PUBLISHED_AT}}}", "sensor":{{{PARTICLE_EVENT_VALUE}}} }';

        let settings = {
            integration_type: 'Webhook',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + hookAuthorization,
            },
            url: webhookDemo.hookUrl,
            noDefaults: true,
            requestType: 'POST',
            body,
            responseTopic: '{{{PARTICLE_DEVICE_ID}}}/hook-response/{{{PARTICLE_EVENT_NAME}}}',
            errorResponseTopic: '{{{PARTICLE_DEVICE_ID}}}/hook-error/{{{PARTICLE_EVENT_NAME}}}',
            // responseTemplate
        };

        $('#webhookSource > pre').text(JSON.stringify(settings, null, 4));

        let integrationObj = webhookDemo.webhooks.find(e => e.event == webhookDemo.webhookName);
        if (integrationObj) {
            webhookDemo.settings.integrationId = integrationObj.id;

            const resp = await apiHelper.particle.editIntegration({
                integrationId: integrationObj.id,
                event: webhookDemo.webhookName, 
                settings, 
                product: webhookDemo.settings.productId,
                auth: apiHelper.auth.access_token});
            // console.log('edit resp', resp);    

            analytics.track('editIntegration', {category:gaCategory,'value':(resp.ok ? 1 : 0)});
        }
        else 
        if (!options.updateOnly) {
            const resp = await apiHelper.particle.createIntegration({
                event: webhookDemo.webhookName, 
                settings, 
                product: webhookDemo.settings.productId,
                auth: apiHelper.auth.access_token});

            analytics.track('createIntegration', {category:gaCategory,'value':(resp.ok ? 1 : 0)});

            // console.log('create resp', resp);    
            webhookDemo.settings.integrationId = resp.body.id;
            updateSettings();                

            webhookDemo.webhooks = (await apiHelper.particle.listIntegrations({
                product: webhookDemo.settings.productId,
                auth: apiHelper.auth.access_token,
            })).body;            
        }
        else {
            webhookDemo.settings.integrationId = 0;
        }
        updateLinks();
        updateCleanup();
    }

    const updateProductSelector = async function() {
        // const productSelectElem = $('#productSelect');

        const lastSelected = $('#productSelect').val();
        $('#productSelect').empty();

        let demoProductId = 0;
        let haveExisting = false;

        for(const product of webhookDemo.productsData.products) {
            if (product.platform_id == webhookDemo.settings.platformId) {
                if (product.name.startsWith(webhookDemo.productNamePrefix)) {
                    const optionElem = document.createElement('option');
                    $(optionElem).attr('value', product.id.toString());
                    $(optionElem).text(product.name + ' (' + product.id + ')');
                    $('#productSelect').append(optionElem);    
                    haveExisting = true;
                }
            }
            if (!demoProductId && product.name.startsWith(webhookDemo.productNamePrefix)) {
                demoProductId = product.id;
            }
        }
        if (lastSelected) {
            $('#productSelect').val(lastSelected);
        }
        $('#useExistingProduct').prop('disabled', !haveExisting);

        const newProductName = webhookDemo.productNamePrefix + webhookDemo.settings.platformName.toLowerCase() + '-' + Math.floor(Math.random() * 999999);
        $('#newProductNameInput').val(newProductName);

        if (!webhookDemo.settings.productId && demoProductId) {
            webhookDemo.settings.productId = demoProductId;
        }

        if (webhookDemo.settings.productId) {
            $('#productSelect').val(webhookDemo.settings.productId);
            if ($('#productSelect').val() == webhookDemo.settings.productId) {
                $('#productSelect').trigger('change');
                $('#createNewProduct').prop('checked', false);
                $('#useExistingProduct').prop('checked', true);
            }
        }

        if (webhookDemo.hookUrl) {
            await updateWebhookUrl();
        }

        updateCleanup();
    }

    const updateProductDevices = async function() {
        webhookDemo.productDevices = await apiHelper.getAllDevices({
            productId: webhookDemo.settings.productId,
        });

        webhookDemo.productHasFirmware = 0;
        webhookDemo.productNeedsFirmware = 0;
        
        for(const dev of webhookDemo.productDevices) {
            if (dev.firmware_version == webhookDemo.firmwareVersion) {
                webhookDemo.productHasFirmware++;
            }
            else {
                webhookDemo.productNeedsFirmware++;
            }            
        }

        webhookDemo.deviceNames = {};
        for(const dev of webhookDemo.productDevices) {
            webhookDemo.deviceNames[dev.id] = dev.name || dev.id;
        }
        $('.webhookDemoProductDeviceSelect').each(async function() {
            const deviceSelectElem = this;
            $(deviceSelectElem).empty();

            for(const dev of webhookDemo.productDevices) {
                const optionElem = document.createElement('option');
                $(optionElem).attr('value', dev.id);

                if (dev.name) {
                    $(optionElem).text(dev.name + ' (' + dev.id + ')');
                }
                else {
                    $(optionElem).text(dev.id);
                }
                $(deviceSelectElem).append(optionElem);
            }
            $('.disableNoProductDevices').prop('disabled', webhookDemo.productDevices.length == 0);                
        });

        if (webhookDemo.productHasFirmware) {
            if (webhookDemo.runningProductFirmwareResolve) {
                webhookDemo.runningProductFirmwareResolve();
                webhookDemo.runningProductFirmwareResolve = null;
            }
        }

        updateCleanup();

    }

    const updateDeviceGroups = async function() {
        webhookDemo.deviceGroups = await new Promise(function(resolve, reject) {                
            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    reject(jqXHR);
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    resolve(resp);
                },
                url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/groups',
            }
            $.ajax(request);
        });

        $('.webhookDemoProductGroupSelect > option').not(':first').remove();
        for(const group of webhookDemo.deviceGroups.groups) {
            const optionElem = document.createElement('option');
            $(optionElem).attr('value', group.name);
            $(optionElem).text(group.name);
            $('.webhookDemoProductGroupSelect').append(optionElem);
        }

    }

    const updateProduct = async function() {
        // webhookDemo.settings.productId
        await updateProductDevices();

        webhookDemo.productInfo = (await apiHelper.particle.getProduct({
            product: webhookDemo.settings.productId,
            auth: apiHelper.auth.access_token,
        })).body.product;

        webhookDemo.webhooks = (await apiHelper.particle.listIntegrations({
            product: webhookDemo.settings.productId,
            auth: apiHelper.auth.access_token,
        })).body;

        webhookDemo.productFirmware = (await apiHelper.particle.listProductFirmware({
            product: webhookDemo.settings.productId,
            auth: apiHelper.auth.access_token,
        })).body;

        webhookDemo.hasDefaultProductFirmware = !!webhookDemo.productFirmware.find(e => e.product_default);

        webhookDemo.productFirmwareUploaded = !!webhookDemo.productFirmware.find(e => e.version == webhookDemo.firmwareVersion);
        
        await updateDeviceGroups();

        updateDevicesList();
        updateCreateWebhook();
        updateLinks();
        updateCleanup();
        updateFleet();

        
        $('#startDemo').prop('disabled', false);
    }


    const updateGroups = async function(options) {
        let requestDataObj = {
            groups: options.groups,
        };

        try {
            const setResp = await new Promise(function(resolve, reject) {
                const request = {                
                    contentType: 'application/json',
                    data: JSON.stringify(requestDataObj),
                    dataType: 'json',
                    error: function (jqXHR) {
                        console.log('control error', jqXHR);
                        reject();
                    },
                    headers: {
                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                        'Accept': 'application/json'
                    },
                    method: 'PUT',
                    success: function (resp, textStatus, jqXHR) {
                        resolve(resp);
                    },
                    url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/devices/' + options.deviceId,
                };
    
                $.ajax(request);
            });
            // console.log('setResp', setResp);
    
            webhookDemo.deviceObj = (await apiHelper.particle.getDevice({
                deviceId: options.deviceId,
                auth: apiHelper.auth.access_token,
            })).body;
    
            const callResp = await new Promise(function(resolve, reject) {
    
                const groupRequestObj = {
                    groups: options.groups,
                }

                const requestObj = {
                    arg: JSON.stringify(groupRequestObj),
                };

                const url = 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/devices/' +  options.deviceId + '/setDeviceGroups';
    
                let request = {
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(requestObj),
                    error: function (jqXHR) {
                        reject(jqXHR);
                    },
                    headers: {
                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    success: function (resp, textStatus, jqXHR) {
                        resolve(resp);
                    },
                    url,
                }
    
                $.ajax(request);
            });
            // console.log('call resp', callResp);        
        }
        catch(e) {
            console.log('exception updating groups', e);
        }

    }

    const updateDevice = async function() {
        // webhookDemo.settings.deviceId
        webhookDemo.deviceObj = (await apiHelper.particle.getDevice({
            deviceId: webhookDemo.settings.deviceId,
            auth: apiHelper.auth.access_token,
        })).body;
        
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
        updateCleanup();
    };

    const updateDevicesAddButton = function() {
        let enableCanAdd = false;
        for(const addDevObj of webhookDemo.addDevicesTable) {
            if (addDevObj.canAdd && $(addDevObj.checkboxElem).prop('checked')) {
                enableCanAdd = true;
            }
        }
        $('#addDevicesButton').prop('disabled', !enableCanAdd);
    }

    const updateDevicesList = function() {        
        
        let columns = [];
        $('#sandboxDevicesTable > thead > tr > th').each(function() {
            columns.push({
                key: $(this).data('key'),
            });
        });

        $('#sandboxDevicesTable > tbody').empty();

        webhookDemo.addDevicesTable = [];

        for(const devObj of webhookDemo.sandboxDevices) {
            if (devObj.platform_id != webhookDemo.settings.platformId) {
                continue;
            }

            const rowElem = document.createElement('tr');
            let checkboxElem;
            let alreadyAdded = false;
            let canAdd = false;

            for(const colObj of columns) {
                const cellElem = document.createElement('td');
                switch(colObj.key) {
                    case '_add':
                        {
                            checkboxElem = document.createElement('input');
                            $(checkboxElem).attr('type', 'checkbox');
                            $(cellElem).append(checkboxElem);

                            $(checkboxElem).on('click', function() {
                                updateDevicesAddButton();
                            })
                        }
                        break;

                    case '_product':
                        if (devObj.product_id == webhookDemo.settings.productId) {
                            $(cellElem).text('Already added to product');
                            $(checkboxElem).attr('checked', false);
                            $(checkboxElem).attr('disabled', true);
                            alreadyAdded = true;
                        }
                        else 
                        if (devObj.product_id == devObj.platform_id) {
                            $(cellElem).text('Sandbox device');
                            canAdd = true;
                        }
                        else {
                            if (webhookDemo.productsNames[devObj.product_id]) {
                                $(cellElem).text('Product ' + webhookDemo.productsNames[devObj.product_id]);
                            }
                            else {
                                $(cellElem).text('Product ' + devObj.product_id);
                            }
                            canAdd = true;
                        }
                        break;

                    default:
                        if (devObj[colObj.key]) {
                            $(cellElem).text(devObj[colObj.key]);
                        }  
                        else {
                            $(cellElem).html('&nbsp;');
                        }
                        break;
                }
                $(rowElem).append(cellElem);
            }
            webhookDemo.addDevicesTable.push({
                devObj,
                rowElem,
                checkboxElem,
                alreadyAdded,
                canAdd,
            });

            $('#sandboxDevicesTable > tbody').append(rowElem);
        }

        updateDevicesAddButton();

    };

    let updateFleet; // Forward declaration


    $('#addDevicesButton').on('click', async function() {
        $('#addDevicesButton').prop('disabled', true);

        const setStatus = function(s) {
            $('#addDevicesStatusDiv').text(s);
        }
        
        let devicesToImport = [];
        for(const addDevObj of webhookDemo.addDevicesTable) {
            if (addDevObj.canAdd && $(addDevObj.checkboxElem).prop('checked')) {
                devicesToImport.push(addDevObj.devObj.id);
            }
        }
        if (devicesToImport.length == 0) {
            return;
        }

        if (devicesToImport.length == 1) {
            setStatus('Importing device to product...')
        }
        else {
            setStatus('Importing ' + devicesToImport.length + ' devices to product...')
        }

        try {
            let formData = new FormData();
        
            let blob = new Blob([devicesToImport.join('\n')], {type:'text/plain'});
            formData.append('file', blob, 'devices.txt');
            formData.append('import_sims', 'true');
            formData.append('claim_user', apiHelper.auth.username);
    
            const importRes = await new Promise(function(resolve, reject) {
                $.ajax({
                    data: formData,
                    contentType: false,
                    error: function(err) {
                        console.log('error importing devices', err);
                        reject(err);
                    },
                    headers: {
                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    processData: false,
                    success: function (resp) {
                        resolve(resp);
                    },
                    url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/devices'
                });    
            });
            // console.log('importRes', importRes);
    
            setStatus('Importing devices successful!');
        }
        catch(e) {
            setStatus('Importing failed')
        }

        // Update sandbox devices
        webhookDemo.sandboxDevices = await apiHelper.getAllDevices({});
        updateDevicesList();

        // Update product devices
        await updateProductDevices();
        updateFleet();
    });

    const sendControl = function(requestDataObj) {
        return new Promise(function(resolve, reject) {
            const request = {                
                contentType: 'application/json',
                data: JSON.stringify(requestDataObj),
                dataType: 'json',
                error: function (jqXHR) {
                    console.log('control error', jqXHR);
                    reject();
                },
                headers: {
                    'Accept': 'application/json'
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    resolve(resp);
                },
                url: webhookDemo.controlUrl,
            };

            $.ajax(request);
        });
    }

    const updateWebhookUrl = async function() {
        $('.webhookUrlSpan').text(webhookDemo.hookUrl);

        updateCreateWebhook();

        // The webhook is automatically created now. To restore the behavior of only doing it
        // when the button is pressed, add this as the parameter: {updateOnly:true}
        await createOrUpdateWebhook();
        
    }

    const updateDataTable = function(dataObj) {
        if (!webhookDemo.dataTableColumns) {
            webhookDemo.dataTableColumns = [];
        }

        const tableElem = $('#webhookDemoDataTable');
        const theadElem = $(tableElem).find('thead');
        const tbodyElem = $(tableElem).find('thead');
        
        // Add columns if necessary
        let columnsUpdated = false;
        for(const key in dataObj) {            
            if (!webhookDemo.dataTableColumns.find(e => e.key == key)) {
                // Add column
                const headerElem = document.createElement('th');
                $(headerElem).text(key);

                webhookDemo.dataTableColumns.push({
                    key,
                    headerElem,
                });
                columnsUpdated = true;
            }
        }
        if (columnsUpdated) {
            $(theadElem).empty();
            const trElem = document.createElement('tr');

            for(const colObj of webhookDemo.dataTableColumns) {
                $(trElem).append(colObj.headerElem);
            }
            $(theadElem).append(trElem);
        }
        
        const trElem = document.createElement('tr');
        for(const colObj of webhookDemo.dataTableColumns) {
            const tdElem = document.createElement('td');

            if (dataObj[colObj.key]) {
                $(tdElem).text(dataObj[colObj.key]);
            }
            else {
                $(tdElem).html('&nbsp;');
            }

            $(trElem).append(tdElem);
        }
        $(tbodyElem).append(trElem);

        
    }

    const updateProductDevice = async function(deviceId) {
        const  deviceObj = (await apiHelper.particle.getDevice({
            deviceId: deviceId,
            product: webhookDemo.settings.productId,
            auth: apiHelper.auth.access_token,
        })).body;

        let found = false;
        for(let ii = 0; ii < webhookDemo.productDevices.length; ii++) {
            if (webhookDemo.productDevices[ii].id == deviceId) {
                webhookDemo.productDevices[ii] = deviceObj;
                found = true;
                updateFleet({deviceId});
                break;
            }
        }
        if (!found) {
            webhookDemo.productDevices.push(deviceObj);
            updateFleet();
        }
    }

    const updateEventLog = function(event) {
        switch(event.name) {
            case 'spark/status':
                // data = "online" or "offline"
                setTimeout(function() {
                    // Delay is required because the device state change occurs slightly
                    // after the event is sent
                    updateProductDevices();
                    updateFleet();
                }, 3000);
                break;

            case 'spark/device/diagnostics/update':
                break;

            case 'spark/device/updates/pending':
            case 'spark/device/updates/forced':
            case 'spark/device/updates/enabled':
                // data = "true" or "false"
                break;

            case 'spark/device/last_reset':
                // data = "power_down" or other constants
                break;
                
        }

        if (!webhookDemo.eventLogColumns) {
            webhookDemo.eventLogColumns = [];

            $('#eventsHeader > tr > th').each(function() {
                const key = $(this).data('key');
                webhookDemo.eventLogColumns.push({
                    key
                })
            });

        }
    
        // .deviceName, .name, .data, .published_at, .coreid

        const trElem = document.createElement('tr');

        for(let colObj of webhookDemo.eventLogColumns) {
            const tdElem = document.createElement('td');

            let value = event[colObj.key];

            switch(colObj.key) {
                case 'name':
                case 'data':
                    $(tdElem).css('max-width', '200px');
                    break;

                case 'published_at':
                    {
                        let tIndex = value.indexOf('T');
                        if (tIndex) {
                            value = value.substring(tIndex + 1);
                        }
                    }
                    break;
            }

            if (value) {
                $(tdElem).text(value);
            }
            else {
                $(tdElem).html('&nbsp;');
            }
            $(trElem).append(tdElem);
        }

        $('#eventsTable').prepend(trElem);
    }

    // Forward declared above
    updateFleet = function(options = {}) {
        const fleetOptions = $('.webhookDemo[data-control="fleet"]').data('options').split(',');

        if (!options.deviceId) {
            $('#fleetTable').empty();

            webhookDemo.fleetColumns = [];
            webhookDemo.fleetRows = [];

            $('#fleetHeader > tr').find('.groupColumn').remove();

            $('#fleetHeader > tr > th').each(function() {
                webhookDemo.fleetColumns.push({
                    key: $(this).data('key'),
                    style: $(this).data('style'),
                });
            });

            if (fleetOptions.includes('groupSelector')) {                
                // .groups
                for(const groupObj of webhookDemo.deviceGroups.groups) {
                    const thElem = document.createElement('th');
                    $(thElem).addClass('groupColumn');
                    $(thElem).text(groupObj.name);
                    $('#fleetHeader > tr').append(thElem);

                    webhookDemo.fleetColumns.push({
                        name: groupObj.name,
                        style: 'groupCheckbox',
                    });
                }
            }



            for(const deviceObj of webhookDemo.productDevices) {
                const rowElem = document.createElement('tr');
                $('#fleetTable').append(rowElem);

                webhookDemo.fleetRows.push({
                    deviceId: deviceObj.id,
                    rowElem,
                })
            }
        }

        if (!webhookDemo.fleetRows) {
            return;
        }

        for(const fleetRowObj of webhookDemo.fleetRows) {

            if (options.deviceId && options.deviceId != fleetRowObj.deviceId) {
                continue;
            }

            // .id, .name, .online, .owner, .product_id, .system_firmware_version
            // .last_handshake_at, .last_heard, 

            $(fleetRowObj.rowElem).empty();

            const deviceObj = webhookDemo.productDevices.find(e => e.id == fleetRowObj.deviceId);

            for(const colObj of webhookDemo.fleetColumns) {
                const cellElem = document.createElement('td');

                switch(colObj.key) {
                    case 'groups':
                        $(cellElem).text(deviceObj[colObj.key].join(', '));
                        break;

                    case 'development': 
                        {
                            const checkboxElem = document.createElement('input');
                            $(checkboxElem).attr('type', 'checkbox');
                            if (deviceObj.development) {
                                $(checkboxElem).attr('checked', 'checked');        
                            }
                            $(checkboxElem).on('click', async function() {
                                const checked = $(checkboxElem).prop('checked');
                                await apiHelper.particle.markAsDevelopmentDevice({ 
                                    deviceId: deviceObj.id,
                                    development: checked,
                                    product: webhookDemo.settings.productId,
                                    auth: apiHelper.auth.access_token,
                                });                
                                await updateProductDevices();
                            });
                            $(cellElem).append(checkboxElem);    
                            $(cellElem).css('text-align', 'center');
                        }
                        break;


                    default:
                        switch(colObj.style) {
                            case 'greenCheck':
                                if (deviceObj[colObj.key]) {
                                    $(cellElem).html('\u2705'); // green check
                                }
                                else {
                                    $(cellElem).html('&nbsp;');
                                }
                                $(cellElem).css('text-align', 'center');
                                break;

                            case 'firmware':
                                if (deviceObj[colObj.key] == webhookDemo.firmwareVersion) {
                                    // TODO: Also check functions here
                                    $(cellElem).html('\u2705'); // green check
                                }
                                else {
                                    if (deviceObj.online) {
                                        const aElem = document.createElement('a');
                                        $(aElem).text('Flash');
                                        $(aElem).on('click', async function() {
                                            $(cellElem).text('Flashing');

                                            await new Promise(function(resolve, reject) {
                                                let formData = new FormData();

                                                let blob = new Blob([webhookDemo.firmwareBinary], {type:'application/octet-stream'});
                                                formData.append('file', blob, 'firmware.bin');
                                    
                                                $.ajax({
                                                    data: formData,
                                                    contentType: false,
                                                    error: function(err) {
                                                        reject();
                                                    },
                                                    method: 'PUT',
                                                    processData: false,
                                                    success: function (resp) {
                                                        resolve();
                                                    },
                                                    url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/devices/' + deviceObj.id + "?access_token=" + apiHelper.auth.access_token,
                                                });    
                                            });        
                                            
                                        });
                                        $(cellElem).html(aElem);
                                    }
                                    else {
                                        $(cellElem).html('\u274c'); // red x
                                    }
                                }
                                $(cellElem).css('text-align', 'center');
                                break;

                            case 'groupCheckbox':
                                {
                                    const checkboxElem = document.createElement('input');
                                    $(checkboxElem).attr('type', 'checkbox');
                                    if (deviceObj.groups && deviceObj.groups.includes(colObj.name)) {
                                        $(checkboxElem).attr('checked', 'checked');
                                    }
                                    $(checkboxElem).on('click', async function() {
                                        const checked = $(checkboxElem).prop('checked');
                                        let newGroups = [];
                                        if (checked) {
                                            newGroups = deviceObj.groups;
                                            newGroups.push(colObj.name);
                                        }
                                        else {
                                            for(const g of deviceObj.groups) {
                                                if (g != colObj.name) {
                                                    newGroups.push(g);
                                                }
                                            }
                                        }
                                        await updateGroups({
                                            deviceId: deviceObj.id,
                                            groups: newGroups,
                                        });
                                    });
                                    $(cellElem).append(checkboxElem);    
                                }
                                $(cellElem).css('text-align', 'center');
                                break;

                            default:
                                if (deviceObj[colObj.key]) {
                                    $(cellElem).text(deviceObj[colObj.key]);
                                }
                                else {
                                    $(cellElem).html('&nbsp;');
                                }
                                break;
                        }
                        break;
                }
            

                $(fleetRowObj.rowElem).append(cellElem);
            }
        }
        updateCleanup();

    }


    const configChecklist = function(options) {
        let configChecklist = {};

        configChecklist.steps = options.steps;

        const tableElem = document.createElement('table');
        $(tableElem).addClass('apiHelperTableNoMargin');
        
        const tbodyElem = document.createElement('tbody');
        
        for(const step of configChecklist.steps) {
            const trElem = step.rowElem = document.createElement('tr');

            const indicatorElem = step.indicatorElem = document.createElement('td');
            $(trElem).append(indicatorElem);

            const titleElem = step.titleElem = document.createElement('td');
            if (step.title) {
                $(titleElem).text(step.title);
            }
            $(trElem).append(titleElem);

            $(tbodyElem).append(trElem);
        }
        $(tableElem).append(tbodyElem);
        $(options.containerElem).append(tableElem);

        configChecklist.getStep = function(key) {
            return configChecklist.steps.find(e => e.key == key);
        }

        configChecklist.setIndicatorText = function(key, indicator) {
            $(configChecklist.steps.find(e => e.key == key).indicatorElem).text(indicator);
        }

        configChecklist.setIndicatorIcon = function(key, iconName) {
            const imgElem = document.createElement('img');
            $(imgElem).attr('src', '/assets/images/device-setup/' + iconName);
            $(imgElem).css('width', '16px');
            $(imgElem).css('height', '16px');
            $(imgElem).css('margin', '2px');

            $(configChecklist.steps.find(e => e.key == key).indicatorElem).html(imgElem);
        }

        configChecklist.setIndicatorSpin = function(key) {
            configChecklist.setIndicatorIcon(key, 'spinner-48.gif');
        }
        configChecklist.setIndicatorOK = function(key) {
            configChecklist.setIndicatorIcon(key, 'ok-48.png');
        }
        configChecklist.setIndicatorRedX = function(key) {
            configChecklist.setIndicatorIcon(key, 'x-mark-48.png');
        }            

        return configChecklist;
    };



    const updatePostStart = async function() {

        $('.webhookDemo[data-control="product-config"]').each(async function() {

            webhookDemo.productConfigOptions = $(this).data('options').split(',');
    
            const configItemsElem = $(this).find('.configItems');
    
            const copyTemplate = function() {
                const copyElem = $('.productConfigTemplate')[0].cloneNode(true);
                $(copyElem).removeClass('productConfigTemplate');
                $(copyElem).show();
                return copyElem;
            };

            let outerDivElems = {};

            for(const option of webhookDemo.productConfigOptions) {
                const outerDivElem = copyTemplate();

                const setExplanationText = function(s) {
                    $(outerDivElem).find('.webhookDemoProductConfigExplanation').text(s);
                }

                switch(option) {
                    case 'functionPublishApiUser':
                        {
                            $(outerDivElem).find('.webhookDemoProductConfigBanner').text('API Users');
    
                            let msg = '';
                            msg += 'An API user is required for the webhook to be able to access the Particle API.';
                            setExplanationText(msg);                                
                        }
                        break;
                        
                    case 'functionPublishWebhook':
                        {
                            $(outerDivElem).find('.webhookDemoProductConfigBanner').text('Webhooks');
    
                            let msg = '';
                            msg += 'A webhook is required to allow the device to query the device group list.';
                            setExplanationText(msg);
                                                         
                        }
                        break;
    
                    case 'functionPublishDeviceGroups':
                        {
                            $(outerDivElem).find('.webhookDemoProductConfigBanner').text('Device Groups');
    
                            let msg = '';
                            msg += 'Two sample device groups are required. You can add more later.';
                            setExplanationText(msg);
            
                            
                        }
                        break;

                    case 'productFirmware':
                        {
                            $(outerDivElem).find('.webhookDemoProductConfigBanner').text('Product firmware');
    
                            let msg = '';
                            msg += 'This demo requires product firmware.';
                            setExplanationText(msg);

                            webhookDemo.firmwareChecklist = configChecklist({
                                steps: [
                                    {
                                        key: 'compile',
                                        title: 'Compile demo product firmware',    
                                    },
                                    {
                                        key: 'upload',
                                        title: 'Upload product firmware',    
                                    },
                                    {
                                        key: 'wait',
                                        title: 'Wait for a device to come online with firmware (required for release)',
                                    },
                                    {
                                        key: 'release',
                                        title: 'Release and set default product firmware',    
                                    },
                                ],
                                containerElem: $(outerDivElem).find('.webhookDemoProductConfigStatus'),
                            });
                            $(outerDivElem).find('.webhookDemoProductConfigStatus').show();
                        }
                        break;
    
                }
    
                $(configItemsElem).append(outerDivElem);
                outerDivElems[option] = outerDivElem;
            }
    
            for(const option of webhookDemo.productConfigOptions) {
                const outerDivElem = outerDivElems[option];
    
                const setExplanationText = function(s) {
                    $(outerDivElem).find('.webhookDemoProductConfigExplanation').text(s);
                }
                const setStatusText = function(s) {
                    $(outerDivElem).find('.webhookDemoProductConfigStatus').show();
                    $(outerDivElem).find('.webhookDemoProductConfigStatus').text(s);
                }
                const setDataText = function(s) {
                    $(outerDivElem).find('.webhookDemoProductConfigData').show();
                    $(outerDivElem).find('.webhookDemoProductConfigData > pre').text(s);
                }
    
                const apiUserRequest = function(options) {
                    return new Promise(function(resolve, reject) {                
                        let request = {
                            dataType: 'json',
                            error: function (jqXHR) {
                                reject(jqXHR);
                            },
                            headers: {
                                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                'Accept': 'application/json'
                            },
                            method: options.method,
                            success: function (resp, textStatus, jqXHR) {
                                resolve(resp);
                            },
                            url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/team',
                        }
                        switch(options.method) {
                            case 'GET':
                                break;
    
                            case 'POST':
                                {
                                    let reqData = {
                                        friendly_name: options.friendlyName,
                                        scopes: options.scopes,
                                    };
                    
                                    request.contentType = 'application/json';
                                    request.data = JSON.stringify(reqData);                
                                }
                                break;
    
                            case 'DELETE':
                                request.url += '/' + options.user;
                                break;
                        }
    
    
                        $.ajax(request);
                    });
                };
    
                const simpleProductRequest = function(options) {
                    return new Promise(function(resolve, reject) {                
                        let request = {
                            dataType: 'json',
                            error: function (jqXHR) {
                                reject(jqXHR);
                            },
                            headers: {
                                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                'Accept': 'application/json'
                            },
                            method: options.method || 'GET',
                            success: function (resp, textStatus, jqXHR) {
                                resolve(resp);
                            },
                            url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/' + options.api,
                        }
                        if (options.json) {
                            request.contentType = 'application/json';
                            request.data = JSON.stringify(options.json);
                        }
        
                        $.ajax(request);
                    });
                }
                    
                switch(option) {
                    case 'functionPublishApiUser':
                        {

                                    
                            try {
                                const getResp = await apiUserRequest({
                                    method: 'GET',
                                });
    
                                if (webhookDemo.settings.tokenUsername) {
                                    let found = false;
                                    for(const member of getResp.team) {
                                        if (member.username == webhookDemo.settings.tokenUsername) {
                                            found = true;
                                            break;
                                        }
                                    }
                                    if (found) {
                                        setStatusText('API user ' + webhookDemo.settings.tokenUsername + ' already exists and will be reused.');
                                        break;
                                    }
                                }
                                
                                const postResp = await apiUserRequest({
                                    method: 'POST',
                                    friendlyName: 'FunctionPublishDemo',
                                    scopes: ['devices:get'],
                                }); 
                                
                                webhookDemo.settings.tokenUsername = postResp.created.username;
                                webhookDemo.settings.token = postResp.created.tokens[0].token;
                                updateSettings();
    
                                setStatusText('API user ' + webhookDemo.settings.tokenUsername + ' created, using token ' + webhookDemo.settings.token);
                                analytics.track('apiUserCreated', {category:gaCategory});
                            }
                            catch(e) {
                                console.log('apiUser exception', e);
                            }
                        }
                        break;

                    case 'functionPublishWebhook':
                        {

                            let settings = {
                                integration_type: 'Webhook',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/devices/{{PARTICLE_DEVICE_ID}}',
                                noDefaults: true,
                                requestType: 'GET',
                                query: {
                                    'access_token': webhookDemo.settings.token,
                                },
                                responseTopic: '{{{PARTICLE_DEVICE_ID}}}/hook-response/{{{PARTICLE_EVENT_NAME}}}',
                                responseTemplate: '{"groups":[{{{groups}}}],"name":"{{{name}}}","product_id":{{product_id}},"development":{{development}},"notes":"{{{notes}}}"}',
                                errorResponseTopic: '{{{PARTICLE_DEVICE_ID}}}/hook-error/{{{PARTICLE_EVENT_NAME}}}',
                            };
                    
                            setDataText(JSON.stringify(settings, null, 4));
                    
                            if (webhookDemo.webhooks) {
                                let found = webhookDemo.webhooks.find(e => e.event == webhookDemo.webhookName);
                                if (found) {
                                    setStatusText('The webhook ' + webhookDemo.webhookName + ' already exists.');
                                    webhookDemo.settings.integrationId = found.id;
                                    updateSettings();                                
                                    break;
                                }    
                            }

                            const resp = await apiHelper.particle.createIntegration({
                                event: webhookDemo.webhookName, 
                                settings, 
                                product: webhookDemo.settings.productId,
                                auth: apiHelper.auth.access_token});
                
                            // console.log('create resp', resp);    
                            webhookDemo.settings.integrationId = resp.body.id;
                            analytics.track('functionPublishWebhookSuccess', {category:gaCategory});
                            updateSettings();                                
                        }
                        break;
    
                    case 'functionPublishDeviceGroups':
                        {

            
                            try {                                
                                if (webhookDemo.deviceGroups.groups.length > 0) {
                                    let groupNames = [];

                                    for(const group of webhookDemo.deviceGroups.groups) {
                                        groupNames.push(group.name);
                                    }
                        
                                    setStatusText('The product already has device groups configured; using existing groups: ' + groupNames.join(', '));
                                    break;
                                }

                                const groups = [
                                    {
                                        name: 'GroupA',
                                        group: 'Testing group A',
                                        // color: 
                                    },
                                    {
                                        name: 'GroupB',
                                        group: 'Testing group B',
                                        // color: 
                                    },
                                ];

                                for(const group of groups) {

                                    const postResp = await simpleProductRequest({
                                        method: 'POST',
                                        api: 'groups',
                                        json: group,
                                    });
                                    // console.log('groups postResp', postResp);
                                }

                                setStatusText('Created ' + groups.length + ' device groups for testing purposes.');
                                analytics.track('deviceGroupsCreated', {category:gaCategory});

                                await updateDeviceGroups();
                                updateFleet();

                            }
                            catch(e) {
                                console.log('device groups exception', e);
                            }
                        }
                        break;

                    case 'productFirmware':
                        {
                        
                            try {
                    
                                if (webhookDemo.productFirmware.length != 0) {

                                    const binary = await new Promise(function(resolve, reject) {
                                        fetch('https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/firmware/1/binary' + '?access_token=' + apiHelper.auth.access_token) 
                                            .then(response => response.arrayBuffer())
                                            .then(buffer => resolve(buffer));
                                    });
                                    analytics.track('productFirmwareBinaryDownloaded', {category:gaCategory});

                                    // console.log('downloaded binary', binary);
                                    webhookDemo.firmwareBinary = binary; // ArrayBuffer

                                    webhookDemo.firmwareChecklist.setIndicatorOK('compile'); //
                                    webhookDemo.firmwareChecklist.setIndicatorOK('upload');
                                }
                                else {
                                    webhookDemo.firmwareChecklist.setIndicatorSpin('compile');

                                    const getFormData = $('.apiHelperProjectBrowser').data('getFormData');

                                    analytics.track('productFirmwareSourceDownloaded', {category:gaCategory});

                                    const formData = await getFormData({
                                        product_id: webhookDemo.settings.productId,
                                        platform_id: webhookDemo.settings.platformId,
                                        // build_target_version
                                    });
                                        
                                    const compileRes = await new Promise(function(resolve, reject) {
                                        const request = {
                                            contentType: false,
                                            data: formData,
                                            dataType: 'json',
                                            error: function (jqXHR) {
                                               reject(jqXHR);
                                            },
                                            headers: {
                                                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                                'Accept': 'application/json'
                                            },
                                            method: 'POST',
                                            processData: false,
                                            success: function (resp, textStatus, jqXHR) {
                                               resolve(resp);    
                                            },
                                            url: 'https://api.particle.io/v1/binaries/',
                                        };
                            
                                        $.ajax(request);
                                    });
    
                                    analytics.track('productFirmwareSourceCompiled', {category:gaCategory});

                                    // console.log('compileRes', compileRes);
                                    webhookDemo.firmwareChecklist.setIndicatorOK('compile');

    
                                    const binary = await new Promise(function(resolve, reject) {
                                        fetch('https://api.particle.io' + compileRes.binary_url + '?access_token=' + apiHelper.auth.access_token) 
                                            .then(response => response.arrayBuffer())
                                            .then(buffer => resolve(buffer));
                                    });
                       
                                    analytics.track('productFirmwareBinaryDownloaded', {category:gaCategory});

                                    // console.log('binary', binary);
                                    webhookDemo.firmwareBinary = binary; // ArrayBuffer
        
                                    webhookDemo.firmwareChecklist.setIndicatorSpin('upload');

                                    let productFormData = new FormData();
    
                                    productFormData.append('version', webhookDemo.firmwareVersion.toString());
                                    productFormData.append('title', 'Demo firmware');
                                    productFormData.append('binary', new Blob([binary]), 'firmware.bin');
    
                                    const uploadRes = await new Promise(function(resolve, reject) {
                                        const request = {
                                            contentType: false,
                                            data: productFormData,
                                            dataType: 'json',
                                            error: function (jqXHR) {
                                               reject(jqXHR);
                                            },
                                            headers: {
                                                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                                'Accept': 'application/json'
                                            },
                                            method: 'POST',
                                            processData: false,
                                            success: function (resp, textStatus, jqXHR) {
                                               resolve(resp);    
                                            },
                                            url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/firmware',
                                        };
                            
                                        $.ajax(request);
                                    });                        
                                    analytics.track('productFirmwareUploaded', {category:gaCategory});
        
                                    // console.log('uploadRes', uploadRes);
                                    webhookDemo.firmwareChecklist.setIndicatorOK('upload');
                                }
                                
                                if (webhookDemo.hasDefaultProductFirmware) {
                                    webhookDemo.firmwareChecklist.setIndicatorOK('wait');
                                    webhookDemo.firmwareChecklist.setIndicatorOK('release');
                                    break;
                                }

                                webhookDemo.firmwareChecklist.setIndicatorSpin('wait');
                                await webhookDemo.runningProductFirmware;
                                webhookDemo.firmwareChecklist.setIndicatorOK('wait');

                                analytics.track('productFirmwareOnDevice', {category:gaCategory});

                                let releaseReqObj = {
                                    version: webhookDemo.firmwareVersion,
                                    // groups: [],
                                    intelligent: true,
                                    product_default: true,
                                }
                                webhookDemo.firmwareChecklist.setIndicatorSpin('release');

                                const releaseRes = await new Promise(function(resolve, reject) {
                                    const request = {
                                        contentType: 'application/json',
                                        data: JSON.stringify(releaseReqObj),
                                        dataType: 'json',
                                        error: function (jqXHR) {
                                           reject(jqXHR);
                                        },
                                        headers: {
                                            'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                            'Accept': 'application/json'
                                        },
                                        method: 'PUT',
                                        processData: false,
                                        success: function (resp, textStatus, jqXHR) {
                                           resolve(resp);    
                                        },
                                        url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/firmware/release',
                                    };
                        
                                    $.ajax(request);
                                });    
                                // console.log('releaseRes', releaseRes);
                                webhookDemo.firmwareChecklist.setIndicatorOK('release');
                                analytics.track('productFirmwareRelased', {category:gaCategory});

                            }
                            catch(e) {
                                console.log('compile firmware exception', e);
                            }
                        }
                        break;
    
                }
    
            }
        });
                
        $('.webhookDemo[data-control="function-publish-function"]').each(async function() {
            const thisElem = this;

            const selectElem = $(thisElem).find('.webhookDemoProductDeviceSelect');

            const setStatus = function(s) {
                $(thisElem).find('.statusDiv').text(s);
            }

            let clearTimer;

            $($(thisElem).find('.functionPublishCallFunctionButton')).on('click', async function() {

                const deviceId = $(selectElem).val();

                const colorHex = $(thisElem).find('input[type="color"]').val();

                const colorInt = parseInt(colorHex.substring(1), 16);

                const colorCommaSep = Math.floor(colorInt / 65536) % 256 + ',' + Math.floor(colorInt / 256) % 256 + ',' + colorInt % 256

                setStatus('Calling function setColor ' + colorCommaSep + ' on device ' + deviceId);

                const resp = await new Promise(function(resolve, reject) {

                    const requestObj = {
                        arg: colorCommaSep,
                    };


                    let request = {
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(requestObj),
                        error: function (jqXHR) {
                            reject(jqXHR);
                        },
                        headers: {
                            'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                            'Accept': 'application/json'
                        },
                        method: 'POST',
                        success: function (resp, textStatus, jqXHR) {
                            resolve(resp);
                        },
                        url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/devices/' +  $(selectElem).val() + '/setColor',
                    }
    
                    $.ajax(request);
                });

                // console.log('resp', resp);
                if (resp.connected && resp.return_value == 0) {
                    setStatus('Function called successfully');
                    analytics.track('functionPublishFunctionSuccess', {category:gaCategory});
                }
                else 
                if (!resp.connected) {
                    setStatus('Error calling function, device is offline');
                    analytics.track('functionPublishFunctionError', {category:gaCategory});
                }
                else {
                    setStatus('Error calling function');
                    analytics.track('functionPublishFunctionError', {category:gaCategory});
                }
                if (clearTimer) {
                    clearTimeout(clearTimer);
                    clearTimer = 0;
                }
                clearTimer = setTimeout(function() {
                    setStatus('');
                }, 5000);

                // connected, return_value

            });
        });

        $('.webhookDemo[data-control="function-publish-publish"]').each(async function() {
            const thisElem = this;

            const selectElem = $(thisElem).find('.webhookDemoProductGroupSelect');

            const setStatus = function(s) {
                $(thisElem).find('.statusDiv').text(s);
            }

            let clearTimer;

            $($(thisElem).find('.functionPublishPublishButton')).on('click', async function() {

                let eventName = "setColor";
                const groupName = $(selectElem).val();
                if (groupName != '-') {
                    eventName = groupName + '/' + eventName;
                }

                const colorHex = $(thisElem).find('input[type="color"]').val();

                const colorInt = parseInt(colorHex.substring(1), 16);

                const colorCommaSep = Math.floor(colorInt / 65536) % 256 + ',' + Math.floor(colorInt / 256) % 256 + ',' + colorInt % 256

                setStatus('Publishing event ' + eventName + ' with data ' + colorCommaSep);

                const resp = await new Promise(function(resolve, reject) {

                    const requestObj = {
                        name: eventName,
                        data: colorCommaSep,                        
                    };


                    let request = {
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(requestObj),
                        error: function (jqXHR) {
                            reject(jqXHR);
                        },
                        headers: {
                            'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                            'Accept': 'application/json'
                        },
                        method: 'POST',
                        success: function (resp, textStatus, jqXHR) {
                            resolve(resp);
                        },
                        url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/events',
                    }
    
                    $.ajax(request);
                });

                // console.log('resp', resp);
                analytics.track('functionPublishPublishSuccess', {category:gaCategory});

                if (clearTimer) {
                    clearTimeout(clearTimer);
                    clearTimer = 0;
                }
                clearTimer = setTimeout(function() {
                    setStatus('');
                }, 5000);

                // connected, return_value

            });
        });

    }

    const startDemo = async function() {
        if (webhookDemo.started) {
            return;
        }

        analytics.track('startDemo ' + webhookDemo.mode, {category:gaCategory});

        $('#startDemo').prop('disabled', true);
        $('.showWhenStarted').show();
        $('.hideWhenStarted').hide();

        webhookDemo.started = true;

        if (webhookDemo.mode == 'webhook01') {
            startWebhookSession();
        }

        if (webhookDemo.particleStream && webhookDemo.particleStreamProductId != webhookDemo.settings.productId) {
            // console.log('closing Particle event stream for product ' + webhookDemo.particleStreamProductId);
            if (webhookDemo.particleStreamCloseTimer) {
                clearTimeout(webhookDemo.particleStreamCloseTimer);
                webhookDemo.particleStreamCloseTimer = 0;
            }
            webhookDemo.particleStream.end();
            webhookDemo.particleStream = null;
            webhookDemo.particleStreamProductId = 0;
        }
        
        if (!webhookDemo.particleStream) {
            // console.log('starting Particle event stream for product ' + webhookDemo.settings.productId)
            webhookDemo.particleStreamProductId = webhookDemo.settings.productId;
            webhookDemo.particleStream = await apiHelper.particle.getEventStream({ product: webhookDemo.settings.productId, auth: apiHelper.auth.access_token });
                            
            webhookDemo.particleStream.on('event', function(event) {
                try {
                    // console.log('event', event);

                    event.deviceName = webhookDemo.deviceNames[event.coreid] || event.coreid;

                    updateEventLog(event);

                    // event.name, .data, .published_at, .coreid
                    if (event.name.indexOf(webhookDemo.webhookName) >= 0 || event.name.indexOf(webhookDemo.sessionId) >= 0) {
                        // logAddItem({op:'event', event});   
                        updateExplainer({
                            kind: 'event',
                            event,
                        });
                    }
                }
                catch(e) {
                    console.log('exception in Particle event stream listener', e);
                }
            });    
        }

        updateCleanup();

        updateFleet();

        setTimeout(function() {
            $('#startDemo').text('Stop demo', false);
            $('#startDemo').prop('disabled', false);
        }, 3000);

        // This function is async but we don't wait for it here
        updatePostStart();
    }

    const stopDemo = async function() {
        if (!webhookDemo.started) {
            return;
        }
        analytics.track('stopDemo ' + webhookDemo.mode, {category:gaCategory});

        $('#startDemo').prop('disabled', true);
        $('.showWhenStarted').hide();
        $('.hideWhenStarted').show();
        webhookDemo.started = false;

        if (webhookDemo.serverStream) {
            webhookDemo.serverStream.close();
            webhookDemo.serverStream = null;    
        }

        // Defer closing the Particle event stream in case we start quickly, to avoid making too many connections
        // as the SSE event stream is rate-limited.

        if (webhookDemo.particleStreamCloseTimer) {
            clearTimeout(webhookDemo.particleStreamCloseTimer);
            webhookDemo.particleStreamCloseTimer = 0;
        }
        webhookDemo.particleStreamCloseTimer = setTimeout(function() {
            // Executes 5 minutes later
            if (webhookDemo.particleStream) {
                webhookDemo.particleStream.end();
                webhookDemo.particleStream = null;
                webhookDemo.particleStreamProductId = 0;                    
            }
        }, 300000);

        setTimeout(function() {

            $('#startDemo').text('Start demo', false);
            $('#startDemo').prop('disabled', false);
        }, 1000);

    }

    $('.webhookDemo[data-control="start"]').each(async function() {
    
        // Do stuff for browser compatibility checks here

        $('#canStart').show();

        
        $('#startDemo').on('click', async function() {
            if (!webhookDemo.started) {
                await startDemo();
            }
            else {
                await stopDemo();
            }

        
        });

    });



    const carriersPromise = new Promise(function(resolve, reject) {
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

                if (!platformObj.productEligible) {
                    continue;
                }
                if (platformObj.features.includes('trackerServices') && webhookDemo.options.includes('noTracker')) {
                    continue;
                }

                const optionElem = document.createElement('option');
                $(optionElem).text(platformObj.displayName + ' (' + platformObj.id + ')');
                $(optionElem).attr('value', platformObj.id.toString());
                $('#devicePlatformSelect').append(optionElem);    
            }
            resolve();
        });
    });

    const deviceListSelectElem = $('.deviceListSelect');

    const productsPromise = new Promise(function(resolve, reject) {
        
        apiHelper.getProducts().then(function(data) {
            webhookDemo.productsData = data;

            webhookDemo.productsData.products.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

            webhookDemo.productsNames = {};
            
            for(const p of webhookDemo.productsData.products) {
                webhookDemo.productsNames[p.id.toString()] = p.name;
            }
           
            resolve();
        });
    });

    const devicesPromise = new Promise(function(resolve, reject) {
        apiHelper.getAllDevices({}).then(function(devices) {
            webhookDemo.sandboxDevices = devices;
            resolve();
        });
    });


    Promise.all([carriersPromise, productsPromise, devicesPromise]).then(function() {

        if (webhookDemo.settings.platformId) {
            $('#devicePlatformSelect').val(webhookDemo.settings.platformId.toString());
            $('#devicePlatformSelect').trigger('change');
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
        webhookDemo.settings.productId = 0;

        updateDevicesList();
        updateSettings();
        updateProductSelector();

        analytics.track('platformSelected', {category:gaCategory});

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
            updateCleanup();
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
                analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});
                console.log('error', jqXHR);
                //setStatus('Product creation failed');
            },
            headers: {
                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                'Accept': 'application/json'
            },
            method: 'POST',
            success: function (resp, textStatus, jqXHR) {
                analytics.track('createNewProduct', {category:gaCategory});

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
                    $('#useExistingProduct').prop('disabled', false);

                    $('#createNewProductButton').prop('disabled', true);
                    $('#createNewProduct').prop('checked', false);
                    $('#useExistingProduct').prop('checked', true);

                    webhookDemo.settings.productId = resp.product.id;
                    updateSettings();            
                    updateProduct();

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
        // console.log('resp', resp);

        if (resp.statusCode == 200 && resp.body.updated == 1) {
            analytics.track('addDeviceSuccess', {category:gaCategory});
            updateDevice();
            updateProductDevice(webhookDemo.settings.deviceId);
        }
        else {
            // TODO: Error handling
            analytics.track('addDeviceFailed', {category:gaCategory});
        }
    });

    $('#testWebhookButton').on('click', async function() {
        let eventDataObj = {
            id: Math.floor(Math.random() * 1000000),
            t: 25,
        };
        
        try {
            const resp = await apiHelper.particle.publishEvent({ 
                name: webhookDemo.webhookName, 
                data: JSON.stringify(eventDataObj), 
                product: webhookDemo.settings.productId,
                auth: apiHelper.auth.access_token,
            });
    
            // console.log('resp', resp);
    
            $('#testEventDataDiv').show();
            $('#testEventData').text(JSON.stringify(eventDataObj, null, 4));

            analytics.track('testWebhookSuccess', {category:gaCategory});
        }
        catch(e) {
            analytics.track('testWebhookFailed', {category:gaCategory});            
        }

    });

    $('.cleanupUpdateOnClick').on('click', function() {
        // Can't delete a product with webhooks or devices, so these checkboxes makes a difference
        updateCleanup();
    });
    
    $('#cleanupButton').on('click', async function() {
        // Confirm
        let msg = 'Are you sure you want to';
        if ($('#cleanupDevices').prop('checked')) {
            if (webhookDemo.productDevices.length == 1) {
                msg += ' remove one device from the product'; 
            }
            else {
                msg += ' remove ' + webhookDemo.productDevices.length + 'devices from the product'; 
            }
            if ($('#cleanupProduct').prop('checked')) {
                msg += ' and';
            }
        }

        if ($('#cleanupProduct').prop('checked')) {
            msg += ' delete the product ' + webhookDemo.productInfo.name + ' (' + webhookDemo.settings.productId + ')';
        }
        msg += '?';

        if (!confirm(msg)) {
            return;
        }

        const cleanupWebhook = $('#cleanupWebhook').prop('checked') && !$('#cleanupWebhook').prop('disabled');
        const cleanupTinker = $('#cleanupTinker').prop('checked') && !$('#cleanupTinker').prop('disabled');
        const cleanupDevices = $('#cleanupDevices').prop('checked') && !$('#cleanupDevices').prop('disabled');
        const cleanupProduct = $('#cleanupProduct').prop('checked') && !$('#cleanupProduct').prop('disabled')

        let cleanupSteps = [];

        if (cleanupWebhook) {
            cleanupSteps.push({
                key: 'webhook',
                title: 'Delete webhooks (required to delete products)',    
            });
        }
        if (cleanupTinker) {
            cleanupSteps.push({
                key: 'tinker',
                title: 'Flash tinker firmware to devices',    
            });
        }
        if (cleanupDevices) {
            cleanupSteps.push({
                key: 'devices',
                title: 'Remove devices from product (required to delete products)',    
            });
        }
        if (cleanupProduct) {
            cleanupSteps.push({
                key: 'product',
                title: 'Delete product',    
            });
        }
 
        const cleanupChecklist = configChecklist({
            steps: cleanupSteps,
            containerElem: $('#cleanupProgressDiv'),
        });
        $('#cleanupProgressDiv').show();

        analytics.track('cleanupStarted', {category:gaCategory});

        await stopDemo();
    
        if (cleanupWebhook) {
            // TODO: If deleting the product, delete all integrations as you cannot delete 
            // a product that has integrations
            try {
                cleanupChecklist.setIndicatorSpin('webhook');

                for(const hook of webhookDemo.webhooks) {
                    const resp = await apiHelper.particle.deleteIntegration({
                        integrationId: hook.id,
                        product: webhookDemo.settings.productId,
                        auth: apiHelper.auth.access_token});
        
                    // console.log('delete webhook resp', resp);            
                }

                analytics.track('cleanupDeleteWebhook', {category:gaCategory});
                cleanupChecklist.setIndicatorOK('webhook');
            }
            catch(e) {
                console.log('delete webhook exception', e);        
                cleanupChecklist.setIndicatorRedX('webhook');
            }
            webhookDemo.settings.integrationId = 0;
            webhookDemo.webhooks = null;
        }

        if (cleanupTinker) {
            let deviceTargetVersion;
            cleanupChecklist.setIndicatorSpin('tinker');

            for(const dev of webhookDemo.productDevices) {
                if (!deviceTargetVersion || apiHelper.versionSort(dev.system_firmware_version, deviceTargetVersion) < 0) {
                    deviceTargetVersion = dev.system_firmware_version;
                }
            }
            
            let deviceRestoreInfo = await apiHelper.getDeviceRestoreInfo();

            // 
            const platformObj = deviceRestoreInfo.platforms.find(e => e.id == webhookDemo.settings.platformId);

            const versionsList = deviceRestoreInfo.versionsZipByPlatform[platformObj.name];

            const targetVersion = versionsList.find(e => apiHelper.versionSort(e, deviceTargetVersion) >= 0);

            const baseUrl = '/assets/files/device-restore/' + targetVersion + '/' + platformObj.name;

            const zipUrl = baseUrl + '.zip';

            //setStatus('Downloading restore image...');
        
            const zipFs = new zip.fs.FS();
        
            await zipFs.importHttpContent(zipUrl);

            let zipEntry = zipFs.find('tinker.bin');
            
            let partBinary = await zipEntry.getUint8Array();
            
            let formData = new FormData();

            let blob = new Blob([partBinary], {type:'application/octet-stream'});
            formData.append('file', blob, 'firmware.bin');
            

            for(const dev of webhookDemo.productDevices) {
                try {
                    // Mark as development so the device won't get flashed product firmware
                    await apiHelper.particle.markAsDevelopmentDevice({ 
                        deviceId: dev.id,
                        development: true,
                        product: webhookDemo.settings.productId,
                        auth: apiHelper.auth.access_token,
                    });                

                    // Flash tinker
                    await new Promise(function(resolve, reject) {
                        $.ajax({
                            data: formData,
                            contentType: false,
                            error: function(err) {
                                reject();
                            },
                            method: 'PUT',
                            processData: false,
                            success: function (resp) {
                                resolve();
                            },
                            url: 'https://api.particle.io/v1/products/' + webhookDemo.settings.productId + '/devices/' + dev.id + "?access_token=" + apiHelper.auth.access_token,
                        });    
                    });
                }
                catch(e) {
                    console.log('flash device exception', e);      
                }
            }     
            cleanupChecklist.setIndicatorOK('tinker');
            analytics.track('cleanupTinker', {category:gaCategory});
        }


        if (cleanupDevices) {
            cleanupChecklist.setIndicatorSpin('devices');

            for(const dev of webhookDemo.productDevices) {
                try {
                    const resp = await apiHelper.particle.removeDevice({
                        deviceId: dev.id,
                        product: webhookDemo.settings.productId,
                        auth: apiHelper.auth.access_token});
    
                    // console.log('remove device resp', resp);      
                }
                catch(e) {
                    console.log('remove device exception', e);      
                }
            }                
            cleanupChecklist.setIndicatorOK('devices');
            analytics.track('cleanupRemoveDevices', {category:gaCategory});
            webhookDemo.productDevices = null
        }
        if (cleanupProduct) {
            // 
            try {
                cleanupChecklist.setIndicatorSpin('product');
                await new Promise(function(resolve, reject) {

                    const request = {                
                        contentType: 'application/json',
                        dataType: 'json',
                        error: function (jqXHR) {
                            analytics.track('cleanupDeleteProductFailed', {category:gaCategory});
                            console.log('product delete error', jqXHR);
                            //setStatus('Product creation failed');
                            reject();
                        },
                        headers: {
                            'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                            'Accept': 'application/json'
                        },
                        method: 'DELETE',
                        success: function (resp, textStatus, jqXHR) {
                            analytics.track('cleanupDeleteProductSuccess', {category:gaCategory});
                            resolve();                        
                        },
                        method: 'DELETE',
                        url: 'https://api.particle.io/v1/products/' + webhookDemo.productInfo.id 
                    };
            
                    $.ajax(request);            
                });    
                cleanupChecklist.setIndicatorOK('product');
            }
            catch(e) {
                console.log('delete product exception', e);
                cleanupChecklist.setIndicatorRedX('product');
            }
            
            webhookDemo.settings.productId = 0;
            webhookDemo.productInfo = null;
            webhookDemo.webhooks = null;
            webhookDemo.productFirmware = null;

            webhookDemo.sandboxDevices = await apiHelper.getAllDevices({});
            updateDevicesList();
        }

        updateSettings();
        updateCleanup();
        $('#startDemo').prop('disabled', true);

    });
    
});



