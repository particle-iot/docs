$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    if (!apiHelper.auth || !apiHelper.auth.username) {
        return;
    }

    const localStorageKey = 'webhookDemo';

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

    const updateProductSelector = async function() {
        // const productSelectElem = $('#productSelect');

    }

    $('.webhookDemo[data-control="start"]').each(async function() {
        $(this).data('webhookDemo', webhookDemo);

        // Do stuff for browser compatibility checks here

        $('#canStart').show();

        $('.startDemo').on('click', async function() {
            $('#startButton').prop('disabled', true);
            $('.showWhenStarted').show();
            $('.hideWhenStarted').hide();

            webhookDemo.started = true;

            const embedObject = $('.stackblitzEmbed').data('embedObject');
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
            webhookDemo.deviceObj = apiHelper.deviceListCache.find(e => e.id == webhookDemo.settings.deviceId);
            const deviceSelectInfoElem = $('.deviceSelectInfo');
            const tbodyElem = $(deviceSelectInfoElem).find('tbody');
            $(deviceSelectInfoElem).show();
            $(tbodyElem).empty();

            webhookDemo.deviceObj._platform = await apiHelper.getPlatformName(webhookDemo.deviceObj.platform_id);
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

            updateProductSelector();
        }
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

    $('#devicePlatformSelect').on('change', function() {
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
        updateSettings();

        updateProductSelector();
    });

});
