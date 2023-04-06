$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    if (!apiHelper.auth || !apiHelper.auth.username) {
        return;
    }

    const localStorageKey = 'webhookDemo';
    const webhookName = 'WebhookDemo01';
    const serverUrlBase = 'https://api.webhook-demo.com/';
    const hookAuthorization = '9BQuGrR3ZhrPjBPBAQPRdSWNUFdAPLWseD7GzS5Cjg6tn43W';
    const gaCategory = 'WebhookDemo01';

    gtag('event', 'opened', {'event_category':gaCategory});

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

        if (!webhookDemo.settings.productId) {
            // No product selected
            $('#cleanupButton').prop('disabled', true);
            return;
        }

        $('#cleanupButton').prop('disabled', false);

        
        /*
        if (!webhookDemo.deviceObj) {
            // No device selected
        }
        
        if (webhookDemo.deviceObj && webhookDemo.deviceObj.product_id == webhookDemo.settings.productId) {
            // Device in product
        }
         

        if (!webhookDemo.hookUrl) {
        }
        */

        $('#cleanupWebhook').prop('disabled', true);
        $('#cleanupDevices').prop('disabled', true);
        $('#cleanupProduct').prop('disabled', true);


        if (webhookDemo.settings.integrationId) {
            $('#cleanupWebhook').prop('disabled', false);
        }

        if (webhookDemo.productDevices) {
            if (webhookDemo.productDevices.length > 0) {
                $('#cleanupDevices').prop('disabled', false);
            }
        
            if (webhookDemo.productDevices.length == 0 || $('#cleanupDevices').prop('checked')) {
                // Can only delete an empty product
                $('#cleanupProduct').prop('disabled', false);
            }
        }

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

        const divOuterElem = document.createElement('div');


        if (explainObj.kind == 'event') {
            let bannerOptions = {};
            

            let text = '';
            if (explainObj.event.name == webhookName) {
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

            if (explainObj.event.name == webhookName) {
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


    const startSession = function() {
        // Create a new SSE session which creates a new tutorial session
        const evtSource = webhookDemo.serverStream = new EventSource(serverUrlBase + 'stream', {withCredentials:false});

        evtSource.addEventListener('start', async function(event) {
            const dataObj = JSON.parse(event.data);

            webhookDemo.sessionId = dataObj.sessionId;
            console.log('new sessionId ' + webhookDemo.sessionId);

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
            let found = webhookDemo.webhooks.find(e => e.event == webhookName);
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
            method: 'POST',
            body,
            responseTopic: '{{{PARTICLE_DEVICE_ID}}}/hook-response/{{{PARTICLE_EVENT_NAME}}}',
            errorResponseTopic: '{{{PARTICLE_DEVICE_ID}}}/hook-error/{{{PARTICLE_EVENT_NAME}}}',
            // responseTemplate
        };

        $('#webhookSource > pre').text(JSON.stringify(settings, null, 4));

        let integrationObj = webhookDemo.webhooks.find(e => e.event == webhookName);
        if (integrationObj) {
            console.log('update integration', integrationObj);
            webhookDemo.settings.integrationId = integrationObj.id;

            const resp = await apiHelper.particle.editIntegration({
                integrationId: integrationObj.id,
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
        else {
            webhookDemo.settings.integrationId = 0;
        }
        updateLinks();
        updateCleanup();
    }

    const updateProductSelector = async function() {
        // const productSelectElem = $('#productSelect');

        console.log('updateProductSelector', webhookDemo);

        const lastSelected = $('#productSelect').val();
        $('#productSelect').empty();

        let demoProductId = 0;

        for(const product of webhookDemo.productsData.products) {
            if (product.platform_id == webhookDemo.settings.platformId) {
                const optionElem = document.createElement('option');
                $(optionElem).attr('value', product.id.toString());
                $(optionElem).text(product.name + ' (' + product.id + ')');
                $('#productSelect').append(optionElem);    
            }
            if (!demoProductId && product.name.startsWith('webhook-demo-')) {
                demoProductId = product.id;
            }
        }
        if (lastSelected) {
            $('#productSelect').val(lastSelected);
        }

        const newProductName = 'webhook-demo-' + webhookDemo.settings.platformName.toLowerCase() + '-' + Math.floor(Math.random() * 999999);
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

    const updateProduct = async function() {
        // webhookDemo.settings.productId

        webhookDemo.productDevices = await apiHelper.getAllDevices({
            productId: webhookDemo.settings.productId,
        });
        // console.log('webhookDemo.productDevices', webhookDemo.productDevices);
        webhookDemo.deviceNames = {};
        for(const dev of webhookDemo.productDevices) {
            webhookDemo.deviceNames[dev.id] = dev.name || dev.id;
        }
        // console.log('webhookDemo.deviceNames', webhookDemo.deviceNames);

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


        console.log('updateProduct', webhookDemo);

        updateDevicesList();
        updateCreateWebhook();
        updateLinks();
        updateCleanup();

        $('#startDemo').prop('disabled', false);
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
        if (!webhookDemo.settings.productId) {
            $('#addDevicesNoProductDiv').show();
            $('#addDevicesTableDiv').hide();
            return;
        }
        $('#addDevicesNoProductDiv').hide();
        $('#addDevicesTableDiv').show();

        // webhookDemo.settings.platformId = parseInt(valString);
        // webhookDemo.settings.platformName = await apiHelper.getPlatformName(webhookDemo.settings.platformId);
        console.log('webhookDemo.settings.platformId ' + webhookDemo.settings.platformId );
        
        let columns = [];
        $('#sandboxDevicesTable > thead > tr > th').each(function() {
            columns.push({
                key: $(this).data('key'),
            });
        });
        console.log('columns', columns);

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
        console.log('devicesToImport', devicesToImport);
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
            console.log('importRes', importRes);
    
            setStatus('Importing devices successful!');
        }
        catch(e) {
            setStatus('Importing failed')
        }

        webhookDemo.sandboxDevices = await apiHelper.getAllDevices({});
        updateDevicesList();
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
                    console.log('control success', resp);                
                    resolve(resp);
                },
                url: webhookDemo.controlUrl,
            };

            $.ajax(request);
        });
    }

    const updateWebhookUrl = async function() {
        console.log('updateWebhookUrl ' + webhookDemo.hookUrl);

        $('.webhookUrlSpan').text(webhookDemo.hookUrl);

        updateCreateWebhook();

        // The webhook is automatically created now. To restore the behavior of only doing it
        // when the button is pressed, add this as the parameter: {updateOnly:true}
        await createOrUpdateWebhook();

        
        // This does not seem to be necessary, as long as the server is set to have a long enough maximum request time. 
        // It's currently set to 30 minutes.
        /*
        if (!webhookDemo.pingTimer) {
            webhookDemo.pingTimer = window.setInterval(async function() {
                try {
                    await sendControl({
                        op: 'ping',
                    });    
                }
                catch(e) {                    
                }
            }, 60000);
        }
        */
        
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

    let updateFleet;

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
                console.log('updating single device ' + deviceId);
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
                    updateProductDevice(event.coreid);
                }, 2000);
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
            if (event[colObj.key]) {
                $(tdElem).text(event[colObj.key]);
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

        if (!options.deviceId) {
            $('#fleetTable').empty();

            webhookDemo.fleetColumns = [];
            webhookDemo.fleetRows = [];

            $('#fleetHeader > tr > th').each(function() {
                webhookDemo.fleetColumns.push({
                    key: $(this).data('key'),
                    style: $(this).data('style'),
                });
            });

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

                if (deviceObj[colObj.key]) {
                    switch(colObj.key) {
                        default:
                            switch(colObj.style) {
                                case 'greenCheck':
                                    if (deviceObj[colObj.key]) {
                                        $(cellElem).html('\u2705'); // green check
                                    }
                                    else {
                                        $(cellElem).html('&nbsp;');
                                    }
                                    break;

                                default:
                                    $(cellElem).text(deviceObj[colObj.key]);
                                    break;
                            }
                            break;
                    }
                }
                else {
                    $(cellElem).html('&nbsp;');
                }

                $(fleetRowObj.rowElem).append(cellElem);
            }
        }

    }

    const startDemo = async function() {
        if (webhookDemo.started) {
            return;
        }

        gtag('event', 'startDemo', {'event_category':gaCategory});

        $('#startDemo').prop('disabled', true);
        $('.showWhenStarted').show();
        $('.hideWhenStarted').hide();

        webhookDemo.started = true;

        startSession();

        if (webhookDemo.particleStream && webhookDemo.particleStreamProductId != webhookDemo.settings.productId) {
            console.log('closing Particle event stream for product ' + webhookDemo.particleStreamProductId);
            if (webhookDemo.particleStreamCloseTimer) {
                clearTimeout(webhookDemo.particleStreamCloseTimer);
                webhookDemo.particleStreamCloseTimer = 0;
            }
            webhookDemo.particleStream.end();
            webhookDemo.particleStream = null;
            webhookDemo.particleStreamProductId = 0;
        }
        
        if (!webhookDemo.particleStream) {
            console.log('starting Particle event stream for product ' + webhookDemo.settings.productId)
            webhookDemo.particleStreamProductId = webhookDemo.settings.productId;
            webhookDemo.particleStream = await apiHelper.particle.getEventStream({ product: webhookDemo.settings.productId, auth: apiHelper.auth.access_token });
                            
            webhookDemo.particleStream.on('event', function(event) {
                try {
                    // console.log('event', event);

                    event.deviceName = webhookDemo.deviceNames[event.coreid] || event.coreid;

                    updateEventLog(event);

                    // event.name, .data, .published_at, .coreid
                    if (event.name.indexOf(webhookName) >= 0 || event.name.indexOf(webhookDemo.sessionId) >= 0) {
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
    }

    const stopDemo = async function() {
        if (!webhookDemo.started) {
            return;
        }
        gtag('event', 'stopDemo', {'event_category':gaCategory});

        $('#startDemo').prop('disabled', true);
        $('.showWhenStarted').hide();
        $('.hideWhenStarted').show();
        webhookDemo.started = false;

        webhookDemo.serverStream.close();
        webhookDemo.serverStream = null;

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
        $(this).data('webhookDemo', webhookDemo);

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

            /*
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

                    if (dev.product_id != dev.platform_id) {
                        if (webhookDemo.productsNames[dev.product_id]) {
                            result += ' (product ' + webhookDemo.productsNames[dev.product_id] + ')';
                        }
                        else {
                            result += ' (product ' + dev.product_id + ')';
                        }
                    }

                    return result;
                },                    
                hasRefresh: true,
                hasSelectDevice: true,
                onChange: async function(elem) {
                    gtag('event', 'selectedDevice', {'event_category':gaCategory});
                    webhookDemo.settings.deviceId = $(elem).val();
                    await updateDevice();
                },
                onUpdateList: async function() {
                    if (webhookDemo.settings.deviceId) {
                        $(deviceListSelectElem).val(webhookDemo.settings.deviceId);
                        if ($(deviceListSelectElem).val() == webhookDemo.settings.deviceId) {
                            await updateDevice();
                        }
                    }
                },
            }); 
            */
           
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

        gtag('event', 'platformSelected', {'event_category':gaCategory});

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
                gtag('event', 'Error', {'event_category':gaCategory, 'event_label':(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});
                console.log('error', jqXHR);
                //setStatus('Product creation failed');
            },
            headers: {
                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                'Accept': 'application/json'
            },
            method: 'POST',
            success: function (resp, textStatus, jqXHR) {
                gtag('event', 'createNewProduct', {'event_category':gaCategory});
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
            gtag('event', 'addDeviceSuccess', {'event_category':gaCategory});
            updateDevice();
            updateProductDevice(webhookDemo.settings.deviceId);
        }
        else {
            // TODO: Error handling
            gtag('event', 'addDeviceFailed', {'event_category':gaCategory});
        }
    });

    $('#testWebhookButton').on('click', async function() {
        let eventDataObj = {
            id: Math.floor(Math.random() * 1000000),
            t: 25,
        };
        
        try {
            const resp = await apiHelper.particle.publishEvent({ 
                name: webhookName, 
                data: JSON.stringify(eventDataObj), 
                product: webhookDemo.settings.productId,
                auth: apiHelper.auth.access_token,
            });
    
            console.log('resp', resp);
    
            $('#testEventDataDiv').show();
            $('#testEventData').text(JSON.stringify(eventDataObj, null, 4));

            gtag('event', 'testWebhookSuccess', {'event_category':gaCategory});
        }
        catch(e) {
            gtag('event', 'testWebhookFailed', {'event_category':gaCategory});            
        }

    });

    $('#cleanupDevices').on('click', function() {
        // Can't delete a product with devices, so this checkbox makes a difference
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

        gtag('event', 'cleanupStarted', {'event_category':gaCategory});

        await stopDemo();
    
        if ($('#cleanupWebhook').prop('checked') && !$('#cleanupWebhook').prop('disabled')) {
            try {
                const resp = await apiHelper.particle.deleteIntegration({
                    integrationId: webhookDemo.settings.integrationId,
                    product: webhookDemo.settings.productId,
                    auth: apiHelper.auth.access_token});
    
                console.log('delete webhook resp', resp);        
                gtag('event', 'cleanupDeleteWebhook', {'event_category':gaCategory});
            }
            catch(e) {
                console.log('delete webhook exception', e);        
            }
            webhookDemo.settings.integrationId = 0;
            webhookDemo.webhooks = null;
        }
        if ($('#cleanupDevices').prop('checked') && !$('#cleanupDevices').prop('disabled')) {
            for(const dev of webhookDemo.productDevices) {
                try {
                    const resp = await apiHelper.particle.removeDevice({
                        deviceId: dev.id,
                        product: webhookDemo.settings.productId,
                        auth: apiHelper.auth.access_token});
    
                    console.log('remove device resp', resp);      
                }
                catch(e) {
                    console.log('remove device exception', e);      
                }
            }                
            gtag('event', 'cleanupRemoveDevices', {'event_category':gaCategory});
            webhookDemo.productDevices = null
        }
        if ($('#cleanupProduct').prop('checked') && !$('#cleanupProduct').prop('disabled')) {
            // 
            console.log('deleting product ' + webhookDemo.settings.productId);
            try {
                await new Promise(function(resolve, reject) {

                    const request = {                
                        contentType: 'application/json',
                        dataType: 'json',
                        error: function (jqXHR) {
                            gtag('event', 'cleanupDeleteProductFailed', {'event_category':gaCategory});
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
                            gtag('event', 'cleanupDeleteProductSuccess', {'event_category':gaCategory});
                            console.log('product delete success', resp);
                            resolve();                        
                        },
                        method: 'DELETE',
                        url: 'https://api.particle.io/v1/products/' + webhookDemo.productInfo.id 
                    };
            
                    $.ajax(request);            
                });    
            }
            catch(e) {
                console.log('delete product exception', e);
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



