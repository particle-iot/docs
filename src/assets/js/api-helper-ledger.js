

$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }



    let ledgerHelper = {
        infoLedgerName: "device-info",
        configDefaultLedgerName: "device-info-defaults",
        configDeviceLedgerName: "device-info-config",
    
    };


    apiHelper.listLedgerInstances = async function(options) {
        // options.ledgerName
        let result = [];

        try {
            for(let page = 1; page < 100; page++) {
                const res = await apiHelper.particle.listLedgerInstances({
                    auth: apiHelper.auth.access_token,
                    ledgerName: options.ledgerName,
                    page,
                });
                // res.body
                //   .instances (array)
                //      .version (string, guid)
                //      .scope (object)
                //          .name (string, device name)
                //          .type (string scope, "Device")
                //          .value (string, Device ID)
                //   .meta .page, .per_page, .total_page
                for (const inst of res.body.instances) {
                    result.push(inst);
                }           

                if (page >= res.body.meta.total_page) {
                    break;
                }
            }
        }
        catch(e) {
            console.log('exception in listLedgerInstances', e);
        }

        return result;
    }

    $('.deviceInfoViewer').each(async function() {
        const thisPartial = $(this);

        const setStatus = function(s) {
            $(thisPartial).find('.apiHelperStatus').text(s);
        }

    });

    $('.deviceInfoConfig').each(async function() {
        const thisPartial = $(this);

        const setStatus = function(s) {
            $(thisPartial).find('.apiHelperStatus').text(s);
        }
        /*
                    <div><label><input type="radio" name="deviceInfoConfig" class="deviceInfoConfigProductRadio" checked>Product default configuration</label> &nbsp;
                <label><input type="radio" name="deviceInfoConfig" class="deviceInfoConfigDeviceRadio">Device-specific configuration</label></div>
            <div class="deviceInfoConfigProduct" style="display:none">                
            </div>
            <div class="deviceInfoConfigDevice" style="display:none">                
            </div>

        */
    
    });


    const updateProductDeviceRadio = async function() {
        const isProduct = $('.deviceInfoConfigProductRadio').prop('checked');
        console.log('updateProductDeviceRadio isProduct=' + isProduct);

        $('.deviceInfoConfigProductId').text(ledgerHelper.productId);
        $('.deviceInfoConfigProductLedgerName').text(ledgerHelper.configDefaultLedgerName);
        $('.deviceInfoConfigDeviceLedgerName').text(ledgerHelper.configDeviceLedgerName);

        $('.deviceInfoConfigDiv').hide();
        $('.deviceInfoConfigOptions').hide();

        if (isProduct) {
            if (ledgerHelper.configDefaultLedger) {
                try {
                    const res = await apiHelper.particle.getLedgerInstance({
                        auth: apiHelper.auth.access_token,
                        ledgerName: ledgerHelper.configDefaultLedgerName,
                        scopeValue: ledgerHelper.productId,
                        // org: ledgerHelper.orgId,
                    });   
        
                    console.log('get product config ledger instance  res', res);
                    // res.body.instance.data
                    //  .connLog, .lastRun, .resetReason

                    $('.deviceInfoConfigJson').val(JSON.stringify(res.body.instance.data, null, 4));

                    $('.deviceInfoConfigProduct').show();
                    $('.deviceInfoConfigOptions').show();
                }
                catch(e) {
                    console.log('get product config ledger instance exception', e);

                    $('.deviceInfoConfigProductNoInstance').show();
                }
            }
            else {
                $('.deviceInfoConfigProductNoLedger').show();
            }
        }
        else {
            if (ledgerHelper.configDeviceLedger) {
                $('.deviceInfoConfigDevice').show();

                const instances = await apiHelper.listLedgerInstances({ledgerName: ledgerHelper.configDeviceLedgerName});
                console.log('config instances', instances);
            }
            else {
                $('.deviceInfoConfigDeviceNoLedger').show();

            }
        }
    }

    $('input[name="deviceInfoConfig"]').on('click', updateProductDeviceRadio); // updateProductDeviceRadio is async

    $('.deviceInfoCreateDefaultsLedger').on('click', function() {

    });
    $('.deviceInfoCreateDeviceLedger').on('click', function() {

    });

    const loadConfig = async function() {

        try {
            ledgerHelper.configDefaultLedger = await apiHelper.particle.getLedger({
                auth: apiHelper.auth.access_token,
                ledgerName: ledgerHelper.configDefaultLedgerName,
                org: ledgerHelper.orgId,
            });    
        }
        catch(e) {
            console.log('exception getting configDefaultLedger ' + ledgerHelper.configDefaultLedgerName, e);
            ledgerHelper.configDefaultLedger = null;
        }       

        try {
            ledgerHelper.configDeviceLedger = await apiHelper.particle.getLedger({
                auth: apiHelper.auth.access_token,
                ledgerName: ledgerHelper.configDeviceLedgerName,
                org: ledgerHelper.orgId,
            });    
        }
        catch(e) {
            console.log('exception getting configDeviceLedger ' + ledgerHelper.configDeviceLedgerName, e);
            ledgerHelper.configDeviceLedger = null;
        }       

        console.log('loadConfig', ledgerHelper);
    }
    
    const resetReasonString = function(reasonCode) {

        if (typeof reasonCode == 'string') {
            reasonCode = parseInt(reasonCode);
        }

        let reason = 'Unknown reason';

        switch(reasonCode) {
            case 0:
                reason = 'RESET_REASON_NONE';
                break;

            case 10:
                // RESET_REASON_UNKNOWN
                reason = 'RESET_REASON_UNKNOWN';
                break;

            case 20:
                reason = 'RESET_REASON_PIN_RESET';
                break;

            case 30:
                reason = 'RESET_REASON_POWER_MANAGEMENT';
                break;
                
            case 40:
                reason = 'RESET_REASON_POWER_DOWN';
                break;

            case 50:
                reason = 'RESET_REASON_POWER_BROWNOUT';
                break;

            case 60:
                reason = 'RESET_REASON_WATCHDOG';
                break;

            case 70:
                reason = 'RESET_REASON_UPDATE';
                break;

            case 80:
                reason = 'RESET_REASON_UPDATE_ERROR';
                break;

            case 90:
                reason = 'RESET_REASON_UPDATE_TIMEOUT';
                break;

            case 100:
                reason = 'RESET_REASON_FACTORY_RESET';
                break;
                
            case 110:
                reason = 'RESET_REASON_SAFE_MODE';
                break;

            case 120:
                reason = 'RESET_REASON_DFU_MODE';
                break;

            case 130:
                reason = 'RESET_REASON_PANIC';
                break;

            case 140:
                reason = 'RESET_REASON_USER';
                break;

            case 150:
                reason = 'RESET_REASON_CONFIG_UPDATE';
                break;
        }

        reason += ' (' + reasonCode + ')';

        return reason;
    }

    const infoFields = [
        {
            title: 'Device ID',
            devField: 'id',
        },
        {
            title: 'Device Name',
            devField: 'name',
        },
        {
            title: 'Last heard',
            devField: 'last_heard',
            filterFn: function(value) {
                return value ? value.replace('T', ' ') : value;
            },
        },
        {
            title: 'Last handshake',
            devField: 'last_handshake_at',
            filterFn: function(value) {
                return value ? value.replace('T', ' ') : value;
            },
        },
        {
            title: 'Online',
            devField: 'online',
            filterFn: function(value) {
                return value ? 'Yes' : 'No';
            },
        },
        {
            title: 'ICCID',
            devField: 'iccid',
        },
        {
            title: 'IMEI',
            devField: 'imei',
        },
        {
            title: 'Serial number',
            devField: 'serial_number',
        },
        {
            title: 'Product firmware version',
            devField: 'firmware_version',
        },
        {
            title: 'Targeted firmware release version',
            devField: 'targeted_firmware_release_version',
        },
        {
            title: 'Development device',
            devField: 'development',
            filterFn: function(value) {
                return value ? 'Yes' : 'No';
            },
        },
        {
            title: 'Info updated at',
            instanceField: 'updated_at',
            filterFn: function(value) {
                return value ? value.replace('T', ' ') : value;
            },
        },
        {
            title: 'Reset reason',
            dataField: 'resetReason',
            filterFn: function(value) {
                return resetReasonString(value);
            },
        },
        {
            title: 'Device OS version',
            dataField: 'sysver'
        }
        // diag
        // tower: mcc, mnc, cid, lac
    ];

    const textFields = [
        {
            title: 'Last run log',
            field: 'lastRun',
            showIfEmpty: true,
        },
        {
            title: 'Connection log',
            field: 'connLog',
            showIfEmpty: true,
        },
        {
            title: 'Diagnostic data',
            field: 'diag',
            json: true,
        },
        {
            title: 'Tower information',
            field: 'tower',
            json: true,
        },
    ];

    $('.detailsOverlayDownloadLink').on('click', function() {
        let blob = new Blob(['<html>', $('#detailsOverlay')[0].innerHTML, '</html>'], {type:'text/html'});
        saveAs(blob, 'deviceInfo.html');
    });


    const closeDetailsOverlay = function() {
        $('body').off('keydown');
        $('#detailsOverlayContainer').hide();
        $('#detailsToolsContainer').hide();
    }

    $('.detailsOverlayCloseIcon').on('click', closeDetailsOverlay);

    const appendTextBox = function(title, text) {
        const outerDiv = document.createElement('div');
        $(outerDiv).css('margin-top', '10px');
        $(outerDiv).css('margin-left', '10px');

        const titleDiv = document.createElement('div');
        $(titleDiv).css('margin-bottom', '4px');
        $(titleDiv).text(title);
        $(outerDiv).append(titleDiv);

        const dataDiv = document.createElement('div');
        if (text) {
            const preElem = document.createElement('pre');
            $(preElem).addClass('apiHelperMono');
            $(preElem).text(text);
            $(dataDiv).append(preElem);
        }
        else {
            $(dataDiv).text('no data');
        }
        $(outerDiv).append(dataDiv);


        $(ledgerHelper.detailContentBoxElem).append(outerDiv);
    }

    const showDeviceInfo = async function(rowObj) {
        console.log('showDeviceInfo', rowObj);

        $('#detailsOverlay').empty();
        $('#detailsOverlayContainer').show();
        $('#detailsToolsContainer').show();
        
        $('body').keydown(function(ev) {
            switch (ev.key) {
                case 'Esc':
                case 'Escape':
                    closeDetailsOverlay();
                    ev.preventDefault();
                    break;
    
                // Keyboard shortcuts for zoom in (Cmd-+ on the Mac, for example, are intercepted by the browser)
    
                default:
                    break;
            }
        });

        const detailContentBoxElem = ledgerHelper.detailContentBoxElem = document.createElement('div');
        $(detailContentBoxElem).css('margin-top', '50px');
        $(detailContentBoxElem).css('margin-left', '10px');
        $(detailContentBoxElem).css('margin-right', '10px');
        $('#detailsOverlay').append(detailContentBoxElem);   


        let detailTableBodyElem;

        {
            const tableDivElem = document.createElement('div');
            $(tableDivElem).css('margin-top', '50px');
            $(tableDivElem).css('margin-left', '10px');

            const tableElem = document.createElement('table');
            $(tableElem).addClass('apiHelperTableNoMargin');

            const tbodyElem = detailTableBodyElem = document.createElement('tbody');
            $(tableElem).append(tbodyElem);
            $(tableDivElem).append(tableElem);

            $(ledgerHelper.detailContentBoxElem).append(tableDivElem);   
        }

        try {
            const res = await apiHelper.particle.getLedgerInstance({
                auth: apiHelper.auth.access_token,
                ledgerName: ledgerHelper.infoLedgerName,
                scopeValue: rowObj.deviceId,
                org: ledgerHelper.orgId,
            });   

            console.log('showDeviceInfo res', res);
            // res.body.instance.data
            //  .connLog, .lastRun, .resetReason
            rowObj.instance = res.body.instance;

            rowObj.otherData = JSON.parse(JSON.stringify(rowObj.instance.data));
        }
        catch(e) {
            console.log('showDeviceInfo exception', e);
            rowObj.instance = null;
        }


        for(const field of infoFields) {
            const rowElem = document.createElement('tr');

            let fieldValue;
            if (field.devField) {
                fieldValue = rowObj.dev[field.devField];
            }
            else
            if (field.instanceField) {
                if (rowObj.instance) {
                    fieldValue = rowObj.instance[field.instanceField];
                }
            }
            else
            if (field.dataField) {
                if (rowObj.instance && rowObj.instance.data) {
                    fieldValue = rowObj.instance.data[field.dataField];

                    delete rowObj.otherData[field.dataField];
                }
            }
            if (fieldValue && field.filterFn) {
                fieldValue = field.filterFn(fieldValue);
            }

            if (!field.showIfEmpty && (!fieldValue || fieldValue.length == 0)) {
                continue;
            }

            {
                const tdElem = document.createElement('td');
                $(tdElem).css('padding-right', '10px');
                $(tdElem).text(field.title);
                $(rowElem).append(tdElem);
            }
            {
                const tdElem = document.createElement('td');
                $(tdElem).text(fieldValue);
                $(rowElem).append(tdElem);
            }

            $(detailTableBodyElem).append(rowElem);
        }
        
        if (rowObj.instance && rowObj.instance.data) {
            for(const textField of textFields) {
                let text = rowObj.instance.data[textField.field];
                if (textField.json && text) {
                    text = JSON.stringify(text, null, 4);
                } 
                if (textField.showIfEmpty || (text && text.length)) {
                    appendTextBox(textField.title, text);                    
                }

                delete rowObj.otherData[textField.field];
            }

            console.log('rowObj.otherData', rowObj.otherData);

            if (Object.keys(rowObj.otherData).length) {
                appendTextBox('Additional information', JSON.stringify(rowObj.otherData, null, 4));
            }
    
        }
        else {
            const warningElem = document.createElement('div');
            $(warningElem).text('No device information available in ledger.');
            $(ledgerHelper.detailContentBoxElem).append(warningElem);
        }


        // res.body.instance.data
        //  .connLog, .lastRun, .resetReason
    }

    const loadProduct = async function() {
        if (!apiHelper.manualSettings.settings || !apiHelper.manualSettings.settings.createOrSelectProduct || !apiHelper.manualSettings.settings.createOrSelectProduct.productId) {
            return;
        }

        Object.assign(ledgerHelper, apiHelper.manualSettings.settings.createOrSelectProduct);
        console.log('loadProduct', ledgerHelper);

        ledgerHelper.deviceList = await apiHelper.getAllDevices({productId: ledgerHelper.productId});
        console.log('deviceList', ledgerHelper.deviceList);
    

        const infoTableBodyElem = $('.deviceInfoList > table > tbody');
        $(infoTableBodyElem).empty();

        ledgerHelper.infoLedgerRows = [];


        for(const dev of ledgerHelper.deviceList) {
            let rowObj = {
                deviceId: dev.id,
                dev,
            };

    
            const rowElem = rowObj.rowElem = document.createElement('tr');

            {
                const tdElem = document.createElement('td');
                $(tdElem).text(rowObj.deviceId);
                $(rowElem).append(tdElem);
            }
            {
                const tdElem = document.createElement('td');
                $(tdElem).text(rowObj.dev.name);
                $(rowElem).append(tdElem);
            }
            {
                const tdElem = document.createElement('td');
                $(tdElem).html(rowObj.dev.online ? '&check;' : '&nbsp;');
                $(rowElem).append(tdElem);
            }
            /*
            {
                const tdElem = document.createElement('td');
                $(tdElem).text(rowObj.updatedAt ? rowObj.updatedAt.replace('T', ' ') : ' ');
                $(rowElem).append(tdElem);
            }
            */

            $(rowElem).on('click', function() {
                showDeviceInfo(rowObj);
            })

            $(infoTableBodyElem).append(rowElem);

            ledgerHelper.infoLedgerRows.push(rowObj);
        }

        await updateProductDeviceRadio();


        
    }

    $(document).on('commonProductSelected', async function(ev) {
        await loadProduct();
    });

    const run = async function() {
        apiHelper.manualSettings.load();
        // console.log('manualSettings', apiHelper.manualSettings);
        // apiHelper.manualSettings.settings.createOrSelectProduct.productId, .orgId, .platformId, .productName

        await loadConfig();

        await loadProduct();    
    }
    run();
    
});


