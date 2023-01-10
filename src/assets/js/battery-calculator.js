$(document).ready(function () {
    // auth not required

    const urlParams = new URLSearchParams(window.location.search);

    // File structure:
    // object
    //   devices: object key = SKU, value = object
    //     .sku: same as key
    //     .modes: object key = symbol, value = object
    //       .min, .typ, .max, .unit
    let powerConsumption;

    let deviceSelectElem;

    const recalculate = function() {
        if (!powerConsumption || !deviceSelectElem) {
            return;
        }

        let urlConfig = {};
        
        const sku = $(deviceSelectElem).val();
        urlConfig.dev = sku;

        if (!powerConsumption.devices[sku]) {
            console.log('invalid sku in deviceSelect');
            return;
        }

        const modes = powerConsumption.devices[sku].modes;
        console.log('modes', modes);

        // Update URL
        const searchStr = $.param(urlConfig);
        history.pushState(null, '', '?' + searchStr);     

    };

    $('.batteryCalculatorDeviceSelect').each(function() {
        const thisElem = $(this);
        
        deviceSelectElem = $(thisElem).find('.deviceSelect');

        const devOption = urlParams.get('dev');
        if (devOption) {
            $(deviceSelectElem).val(devOption);
        }

        $(deviceSelectElem).on('change', recalculate);        
    });

    // Load the power consumption table (it's about 100K currently)
    fetch('/assets/files/power.json')
        .then(response => response.json())
        .then(function(res) {
            powerConsumption = res;       
            recalculate();     
        });

    // Preload carriers.json as well
    apiHelper.getCarriersJson();
});



