$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    let webhookDemo = {      
        started: false,  
    };

    $('.webhookDemo[data-control="start"]').each(async function() {
        $(this).data('webhookDemo', webhookDemo);

        // Do stuff for browser compatibility checks here

        $('#canStart').show();

        $('.startDemo').on('click', async function() {
            $('#startButton').prop('disabled', true);
            $('.showWhenStarted').show();
            $('.hideWhenStarted').hide();

            webhookDemo.started = true;
            $('.webhookDemo').trigger('webhookDemoStarted');

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
            const newVal = $(elem).val();
            webhookDemo.deviceObj = apiHelper.deviceListCache.find(e => e.id == newVal);
            const deviceSelectInfoElem = $('.deviceSelectInfo');
            const tbodyElem = $(deviceSelectInfoElem).find('tbody');
            $(deviceSelectInfoElem).show();
            $(tbodyElem).empty();

            webhookDemo.deviceObj._platform = await apiHelper.getPlatformName(webhookDemo.deviceObj.platform_id);
            webhookDemo.deviceObj._sku = await apiHelper.getSkuFromSerial(webhookDemo.deviceObj.serial_number);
            if (!webhookDemo.deviceObj._sku) {
                webhookDemo.deviceObj._sku = 'Unknown';
            }
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
            
            $('.webhookDemo').trigger('deviceSelected');
        }
    }); 
});
