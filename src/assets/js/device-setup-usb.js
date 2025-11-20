
$(document).ready(function() {
    let gaCategory = 'USB Device Setup';
    const storageActivateSim = "DeviceSetupActivatingSim";
    const doneUrl = '/assets/images/device-setup/ok-48.png';

    if (!navigator.usb) {
        analytics.track('No WebUSB', {category:gaCategory, label:navigator.userAgent});
        $('.setupBrowserError').show();
        $('.setupStepOtherIssues').show();
        return;
    }

    const stepClasses = [
        'setupStepSelectDevice'
    ];

    const updateSupportAvailable = function() {
        if (apiHelper.selectedOrg) {
            $('.setupSupportYes').show();
            $('.setupSupportNo').hide();
        }
        else {
            $('.setupSupportNo').show();
            $('.setupSupportYes').hide();
        }
    };

    $('.apiHelper').on('selectedOrgUpdated', updateSupportAvailable);
    updateSupportAvailable();

    $('.apiHelperDeviceSetupUsb').each(async function() {

        const thisElem = $(this);

        const mode = $(thisElem).data('mode');

        const modes = ['doctor', 'setup', 'restore', 'wifi', 'cloud', 'product'];

        // Hide all modes
        for(const m of modes) {
            $(thisElem).find('.' + m + 'Mode').hide();    
        }
        // Show active mode. It's done this way so you can add multiple mode classes and it's an OR, not an AND.
        for(const m of modes) {
            if (mode == m) {
                $(thisElem).find('.' + m + 'Mode').show();    
            }
        }
        gaCategory = 'USB Device Setup ' + mode;

        const noLoginRequired = (mode == 'restore' || mode == 'wifi' || mode == 'cloud');

        if (noLoginRequired || apiHelper.auth) {
            $(thisElem).find('.deviceSetupLoggedIn').show();
        }

        if (mode == 'wifi') {
            $(thisElem).find('.setupWiFiInstructions').show();
        }

        analytics.track('Opened Page', {category:gaCategory, label:mode});

        const setupSelectDeviceButtonElem = $(thisElem).find('.setupSelectDeviceButton');
        const setupStepElem = $(thisElem).find('.setupStep');

        const userInfoElem = $(thisElem).find('.userInfo');

        let usbDevice;
        let deviceInfo = {}; 
        let deviceLookup;
        let userFirmwareBinary;
        let restoreFirmwareBinary;
        let mccmnc;
        let setupOptions = {};
        let deviceModuleInfo;
        let flashDeviceOptions = {};
        let userInfo;
        let productData; // Used in product mode

        const deviceConstants = await apiHelper.getDeviceConstants();
        const usbFilters = [];
        for(const platformName in deviceConstants) {
            const dcObj = deviceConstants[platformName];
            if (dcObj.id >= 0 && dcObj.generation >= 2 && dcObj.generation <= 4) {
                usbFilters.push({vendorId: 0x2b04, productId: (0xc000 | dcObj.id)});
                usbFilters.push({vendorId: 0x2b04, productId: (0xd000 | dcObj.id)});
            }
        }


        let ticketOptions = {
            subject: 'Request from Device Doctor',
            message: '',
        }

        const minimumDeviceOsVersion = '2.1.0';

        const setStatus = function(status) {
            // $(thisElem).find('.setupStatus').text(status);
        }

        const setSetupStep = function(whichStep) {
            $(setupStepElem).children().each(function() {
                $(this).hide();
            });

            $(setupStepElem).children('.' + whichStep).show();
        };

        $('.apiHelperOtherIssuesLink').each(function() {
            const aElem = $(this);
            
            $(aElem).on('click', function() {
                setSetupStep($(aElem).data('step'));
            });
        });

        $('.reloadPage').on('click', function() {
            location.reload();
        });

        

        let infoTableItems = [
            {
                key: 'deviceId',
                label: 'Device ID',
            },
            {
                key: '+CCID', // Was: 'iccid'
                label: 'ICCID',
                cellular: true
            },
            {
                key: 'AT+CGSN', // Was: 'imei'
                label: 'IMEI',
                cellular: true
            },
            {
                key: 'AT+CIMI',
                label: 'IMSI',
                cellular: true
            },
            {
                key: 'AT+CGMI', // Was: 'mfg'
                label: 'Modem Manufacturer',
                cellular: true
            },
            {
                key: 'AT+CGMM', // Was: 'model'
                label: 'Modem Model',
                cellular: true
            },
            {
                key: 'AT+CGMR', // Was: 'fwvers'
                label: 'Modem Firmware Version',
                cellular: true
            },
            {
                key: 'ATI9',
                label: 'Modem Application Version',
                cellular: true
            },
            {
                key: 'power',
                label: 'Power Supply',
                power: true
            },
            {
                key: 'battery',
                label: 'Battery',
                power: true
            },
            {
                key: 'soc',
                label: 'Battery SoC',
                power: true
            },
            {
                key: 'country',
                label: 'Country',
                cellular: true
            },
            {
                key: 'name',
                label: 'Carrier',
                cellular: true
            },
            {
                key: 'tech',
                label: 'Access Technology',
                cellular: true
            },
            {
                key: 'band',
                label: 'Band',
                cellular: true
            },
            {
                key: 'cgi',
                label: 'Cellular Global Identity',
                cellular: true
            },
            /*
            {
                key: 'strength',
                label: 'Signal Strength',
                cellular: true
            },
            {
                key: 'quality',
                label: 'Signal Quality',
                cellular: true
            },
*/
        ];


        const showInfoTable = function() {
            const tbodyElem = $(thisElem).find('.cellularInfoTable > tbody');

            $(tbodyElem).html('');
            for(const item of infoTableItems) {
                if (item.cellular && !deviceInfo.cellular) {
                    item.hidden = true;
                    continue;
                }
                if (item.wifi && !deviceInfo.wifi) {
                    item.hidden = true;
                    continue;
                }
                if (item.power && !deviceInfo.hasPMIC) {
                    item.hidden = true;
                    continue;
                }

                item.hidden = false;

                const trElem = document.createElement('tr');
                
                const labelElem = document.createElement('td');
                $(labelElem).text(item.label);
                $(trElem).append(labelElem);

                const valueElem = item.elem = document.createElement('td');
                $(trElem).append(valueElem);
                
                $(tbodyElem).append(trElem);
            }

            $(thisElem).find('.cellularInfo').show();
        }

        const setInfoTableItem = function(key, value) {
            if (value) {
                for(const item of infoTableItems) {
                    if (item.key == key) {
                        $(item.elem).text(value);
                    }
                }    
            }
        };

        const setInfoTableItemObj = function(obj) {
            for(const key in obj) {
                setInfoTableItem(key, obj[key]);
            }
        }

        const getInfoTableText = function() {
            let text = '';
            
            if ((thisElem).find('.cellularInfo').prop('display') == 'none') {
                return text;
            }

            for(const item of infoTableItems) {
                if (!item.hidden) {
                    text += item.label + ': ' + $(item.elem).text() + '\n';
                }
            }
            return text;
        };


        const setUserInfoItem = function(label, value) {
            const trElem = document.createElement('tr');

            let tdElem = document.createElement('td');
            $(tdElem).append(document.createTextNode(label));
            $(trElem).append(tdElem);

            tdElem = document.createElement('td');
            if (value) {
                $(tdElem).append(document.createTextNode(value));
            }
            $(trElem).append(tdElem);
            
            $(thisElem).find('.userInfoTable > tbody').append(trElem);
        };


        const renderSimpleTable = function(options) {
            // option.data - array (outer = rows), of arrays (inner = column data)
            // options.elem - destination tbody element

            for(const rowObj of options.data) {                
                const rowElem = document.createElement('tr');

                for(const cellData of rowObj) {
                    const cellElem = document.createElement('td');
                    $(cellElem).text(cellData);
                    $(rowElem).append(cellElem);
                }

                $(options.elem).append(rowElem);
            }
        }


        const deviceLogsElem = $(thisElem).find('.deviceLogs');
        const deviceLogsOutputElem = $(thisElem).find('.logDecoderOutputDiv');
        const showDebuggingLogsElem = $(thisElem).find('.showDebuggingLogs');
        const deviceLogsTextButtonsElem = $(thisElem).find('.deviceLogsTextButtons');
        const downloadLogsElem = $(thisElem).find('.downloadLogs');
        let deviceLogsTimer1;
        let deviceLogsTimer2;

        let checkStatus;

        let msgExternalSIM = false;
        let msgCPINERROR = false;

        let gnssInfo = {
            hardwareTableInitialized: false,
            fields: [
                {
                    format: 'check',
                    locKey: 'loc',
                    locationTable: true,
                },
                {
                    num: 3,
                    title: 'Latitude',
                    format: 'latLon',
                    hardwareTable: true,
                    locKey: 'lat',
                    locationTable: true,
                },
                {
                    num: 5,
                    title: 'Longitude',
                    format: 'latLon',
                    hardwareTable: true,
                    locKey: 'lon',
                    locationTable: true,
                },
                {
                    num: 7,
                    title: 'Altitude',
                    unit: 'm',
                    hardwareTable: true,
                    locKey: 'alt',
                    locationTable: true,
                },
                {
                    num: 8,
                    title: 'Navigation Status',
                    format: 'ns',
                    hardwareTable: true,
                },
                {
                    num: 9,
                    title: 'Horizontal Accuracy',
                    unit: 'm',
                    hardwareTable: true,
                    locKey: 'h_acc',
                    locationTable: true,
                },
                {
                    num: 10,
                    title: 'Vertical Accuracy',
                    unit: 'm',
                    hardwareTable: true,
                    locKey: 'v_acc',
                    locationTable: true,
                },
                {
                    num: 11,
                    title: 'Speed Over Ground',
                    unit: 'km/h',
                    hardwareTable: true,
                    locKey: 'spd',
                    locationTable: true,
                },
                {
                    num: 12,
                    title: 'Course Over Ground',
                    unit: 'deg',
                    hardwareTable: true,
                    locKey: 'hd',
                    locationTable: true,
                },
                {
                    locKey: 'src',
                    locationTable: true,
                },
            ]
        };

        $(showDebuggingLogsElem).on('click', function() {
            if ($(showDebuggingLogsElem).prop('checked')) {                
                deviceLogsOutputElem.scrollTop(deviceLogsOutputElem[0].scrollHeight - deviceLogsOutputElem.height());    
                $(deviceLogsTextButtonsElem).show();
            }
            else {
                $(deviceLogsTextButtonsElem).hide();
            }
        });

        $(downloadLogsElem).on('click', function() {
            $(downloadLogsElem).prop('disabled', true);

            let blob = new Blob([getInfoTableText(), logDecoder.getRawLogs()], {type:'text/plain'});
            saveAs(blob, 'logs.txt');	

            $(downloadLogsElem).prop('disabled', false);
        });

        const stopDeviceLogs = function() {
            if (deviceLogsTimer1) {
                clearInterval(deviceLogsTimer1);
                deviceLogsTimer1 = null;
            }
            if (deviceLogsTimer2) {
                clearInterval(deviceLogsTimer2);
                deviceLogsTimer2 = null;
            }
        }

        const processLogMessage = function(msg) {
            if (msg.includes('Using external Nano SIM card')) {
                msgExternalSIM = true;
            }  
            else
            if (msg.includes('CPIN ERROR')) {
                msgCPINERROR = true;
            }
            {
                const searchStr = 'Cellular Info:';
                const index = msg.indexOf(searchStr);
                if (index >= 0) {
                    const content = msg.substring(index + searchStr.length).trim();
                    setInfoTableItem('cgi', content);
                }
            }            

            {
                // GNSS boot status messages
                const prefix = '$GNTXT,01,01,02,';
                const index = msg.indexOf(prefix);
                if (index >= 0) {
                    let param = msg.substring(index + prefix.length);
                    param = param.substring(0, param.length - 3);
    
                    let rowElem = document.createElement('tr');
                    
                    let cellElem = document.createElement('td');
                    $(cellElem).text(param);
    
                    $(rowElem).append(cellElem);
    
                    $('.gnssInfoTable > tbody').append(rowElem);
    
                    $('.gnssInfo').show();
                }
            }
            
            {
                // GNSS location
                // 0000016961 [app.gps.nmea] TRACE: RX: $PUBX,00,000014.00,4299.03984,N,07599.98328,W,328.330,DR,5.9,4
                // 0000309496 [app.gps.nmea] TRACE: RX: $PUBX,00,164020.00,4299.03899,N,07599.98425,W,331.708,RK,6.3,4
                const prefix = 'RX: $PUBX,';
                const index = msg.indexOf(prefix);
                if (index >= 0) {
                    let parts = msg.substring(index + 3).split(',');
                    
                    if (!gnssInfo.hardwareTableInitialized) {
                        for(let f of gnssInfo.fields) {
                            if (!f.hardwareTable) {
                                continue;
                            }
                            const rowElem = document.createElement('tr');

                            let tdElem = document.createElement('td');
                            $(tdElem).text(f.title);
                            $(rowElem).append(tdElem);

                            tdElem = f.hardwareTableElem = document.createElement('td');
                            $(rowElem).append(tdElem);

                            $('.gnssLocationTable > tbody').append(rowElem);
                        }
                        gnssInfo.hardwareTableInitialized = true;
                    }

                    for(let f of gnssInfo.fields) {
                        if (!f.hardwareTable) {
                            continue;
                        }
                        if (f.format == 'latLon') {
                            if (parts.length >= (f.num + 1) && parts[f.num].length > 0) {
                                const value = parseFloat(parts[f.num]);
                                const deg = Math.floor(value / 100);
                                const min = value - deg * 100;

                                $(f.hardwareTableElem).text(deg + '° ' + min + '\' ' + parts[f.num + 1]);
                            }
                            else {
                                $(f.hardwareTableElem).text('');
                            }
                        }
                        else 
                        if (f.format == 'ns') {
                            let ns = parts[f.num];
                            if (ns == 'NF') {
                                ns = 'No Fix (NF)';
                            }
                            else
                            if (ns == 'DR') {
                                ns = 'Dead-reckoning only (DR)';
                            }
                            else
                            if (ns == 'RK') {
                                ns = 'GPS or Dead-reckoning (RK)';
                            }
                            $(f.hardwareTableElem).text(ns);
                        }
                        else {
                            if (parts.length >= f.num) {
                                let text = parts[f.num];
                                if (typeof text == 'undefined') {
                                    text = '';
                                }
                                if (text.length && f.unit) {
                                    text += ' ' + f.unit;
                                }
                                $(f.hardwareTableElem).text(text)
                            }
                        }
                    }

                    // 0: $PUBX
                    // 1: msgId
                    // 2: time
                    // 3: lat ddmm. mmmmm
                    // 4: NS
                    // 5: long ddmm. mmmmm
                    // 6: EW
                    // 7: alt (meters)
                    // 8: navStat
                    // 9: hAcc (meters)
                    // 10: vAcc (meters) <- this is the last thing that seems to be enabled
                    // 11: SOG km/g
                    // 12: COG deg
                    // 13: vVel m/s
                    // 14: diffAge s
                    // 15: HDOP
                    // 16: VDOP
                    // 17: TDOP
                    // 18: numSvs
                    // 19: reserved
                    // 20: DR
                    // 21: cs
                }
            }

        };


        const showDeviceLogs = function() {
            $(deviceLogsElem).show();

            let failureCount = 0;

            if (!deviceLogsTimer1) {
                let statusNesting = 0;

                deviceLogsTimer1 = setInterval(async function() {

                    if (statusNesting == 0) {
                        statusNesting++;
                        try {
                            let reqObj = {
                                op: 'status'
                            };
            
                            let res;
                            try {
                                res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                            }
                            catch(e) {
                                console.log('control request exception', e);
                                if (++failureCount > 5) {
                                    stopDeviceLogs();
                                }
                            }
                            
                            if (res.result == 0 && res.data) {
                                const respObj = JSON.parse(res.data);
            
                                if (checkStatus) {
                                    checkStatus(respObj);
                                }
                
                                setInfoTableItemObj(respObj);    
                                if (respObj.mcc) {
                                    if (mccmnc) {
                                        for(const obj of mccmnc) {
                                            if (obj.mcc == respObj.mcc && obj.mnc == respObj.mnc) {
                                                setInfoTableItemObj(obj);                                        
                                            }
                                        }
                                    }                                          
                                }
                            }
                        }
                        catch(e) {
                            console.log('exception', e);
                        }
                        statusNesting--;
                    }
                    else {
                        // console.log('skipped status, busy');
                    }
                }, 2000);    
            }
            
            if (!deviceLogsTimer2) {
                // Retrieve logs more slowly on Gen 2 because the control request handler can run out of RAM
                let logTimerInterval = (deviceInfo.platformId <= 10) ? 2000 : 1000;
                let logNesting = 0;

                deviceLogsTimer2 = setInterval(async function() {
                    if ($('.deviceLogWarning').is(':visible')) {
                        // On the Electron, skip the logs requests because control requests are blocked
                        // while connecting to cellular
                        return;
                    }

                    if (logNesting == 0) {
                        logNesting++;
                        try {
                            let reqObj = {
                                op: 'logs'
                            };
            
                            let res;
    
                            res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                            if (res.result == 0 && res.data) {
                                if (res.data.length > 0) {                                    
                                    // Remove CRs so lines are only LF terminated
                                    const s = res.data.replaceAll('\r', '');

                                    await logDecoder.parse(s);
                                    await logUserInterface.renderIncremental();

                                    if ($(showDebuggingLogsElem).prop('checked')) {
                                        deviceLogsOutputElem.scrollTop(deviceLogsOutputElem[0].scrollHeight - deviceLogsOutputElem.height());    
                                    }
                                }
                            }
                        }
                        catch(e) {
                            console.log('control request exception', e);
                            if (++failureCount > 5) {
                                stopDeviceLogs();
                            }
                        }
                        
                        logNesting--;
                    }
                    else {
                        // console.log('skipped logs, busy');
                        $('.manualLogs').show();
                    }

                }, logTimerInterval);
            }


        };

        const decodeModuleInfoProtobuf = function(data) {
            // data must be a Uint8Array
            let moduleInfo = {
            };

            let protobuf = apiHelper.protobuf(data);
            

            // moduleType values
            // protobuf  system  description
            //           1       resource
            // 1         2       bootloader
            // 4         3       monolithic firmware
            // 2         4       system part 
            // 3         5       user part (ignore index and version)
            //           6       settings
            // 5         7       NCP
            // 6         8       Radio stack (softdevice)
            //           9       asset
            // The protobuf values are for v1 (prior to 5.7.0). In v2, they match the system values.
            const moduleData = [
                { // index 0
                    title: 'Invalid',
                    protobuf1: 0,
                },
                { // index 1
                    title: 'Resource',
                },
                { // index 2
                    title: 'Bootloader',
                    binaryVersionName: 'bootloader',
                    protobuf1: 1,
                },
                { // index 3
                    title: 'Monolithic',
                    binaryVersionName: 'monolithic',
                    protobuf1: 4,
                },
                { // index 4
                    title: 'System Part',                    
                    binaryVersionName: 'system_part',
                    protobuf1: 2,
                },
                { // index 5
                    title: 'User Part',
                    binaryVersionName: 'user_part',
                    protobuf1: 3,
                },
                { // index 6
                    title: 'Settings',
                },
                { // index 7
                    title: 'NCP',    
                    binaryVersionName: 'ncp_firmware',
                    protobuf1: 5,
                },
                { // index 8
                    title: 'Softdevice (Radio Stack)',
                    binaryVersionName: 'radio_stack',
                    protobuf1: 6,
                },
                { // index 9
                    title: 'Asset',
                },
            ];

            const decodeDependency = function(origTag, options = {}) {
                let dependency = {
                };
        
                while(!origTag.isEnd()) {
                    result = protobuf.decodeTag();
        
                    switch(result.field) {
                    case 1:
                        if (options.version == 1) {
                            dependency.moduleType = moduleData.findIndex(e => e.protobuf1 == result.value)
                        }
                        else {
                            dependency.moduleType = result.value;
                        }
                        break;
        
                    case 2:
                        dependency.index = result.value;
                        break;
        
                    case 3:
                        dependency.version = result.value;
                        break;
                    }
                }
        
                return dependency;
            };
        

            const decodeAsset = function(array, origTag) {
                let asset = {};
        
                let result = protobuf.decodeTag();
    
                switch(result.field) {
                case 1:
                    asset.hash = protobuf.decodeBytes(protobuf.offset + result.value);
                    break;
    
                case 2:
                    asset.name = protobuf.decodeString(protobuf.offset + result.value);
                    break;
    
                case 3:
                    asset.size = result.value;
                    break;
    
                case 4:
                    asset.storage_size = result.value;
                    break;

                }

                return asset;
            };
            
            const decodeSecurity = function(security, origTag) {
                let tag = protobuf.decodeTag();
                security.mode = tag.value;

                tag = protobuf.decodeTag();
                security.hash = protobuf.decodeBytes(protobuf.offset + tag.value);

            }

            
            const decodeModule = function(origTag) {
                let module = {
                    dependencies: [], // repeated
                };
        
                while(!origTag.isEnd()) {
                    const result = protobuf.decodeTag();
                    switch(result.field) {
                    case 1:
                        module.moduleType = moduleData.findIndex(e => e.protobuf1 == result.value);
                        break;
                    case 2:
                        module.index = result.value;
                        break;
                    case 3:
                        module.version = result.value;
                        break;
                    case 4:
                        module.size = result.value;
                        break;
                    case 5:
                        module.validity = result.value;
                        break;
                    case 6:
                        // Dependencies       
                        module.dependencies.push(decodeDependency(result, {version:1}));
                        break;
                    }
                }
        
                moduleInfo.modules.push(module);    
            };

            /*
            cloud version (5.7.0 and later)
            message FirmwareModule {
                FirmwareModuleType type = 1; ///< Module type
                uint32 index = 2; ///< Module index
                uint32 version = 3; ///< Module version
                FirmwareModuleStore store = 4; ///< Module store
                uint32 max_size = 5; ///< Maximum module size
                fixed32 checked_flags = 6; ///< Performed validation checks (see FirmwareModuleValidityFlag)
                fixed32 passed_flags = 7; ///< Passed validation checks (see FirmwareModuleValidityFlag)
                optional bytes hash = 8; ///< SHA-256 hash
                repeated FirmwareModuleDependency dependencies = 9; ///< Module dependencies
                repeated FirmwareModuleAsset asset_dependencies = 10; ///< Asset dependencies
                uint32 size = 11; ///< Actual module size
                FirmwareModuleSecurity security = 12; ///< Security mode
            }
            */
            const decodeModule2 = function(origTag) {
                let module = {
                    dependencies: [], // repeated
                    assets: [], // repeated
                };
        
                while(!origTag.isEnd()) {
                    const result = protobuf.decodeTag();

                    switch(result.field) {
                    case 1:
                        module.moduleType = result.value;
                        break;
                    case 2:
                        module.index = result.value;
                        break;
                    case 3:
                        module.version = result.value;
                        break;
                    case 4:
                        // FirmwareModuleStore
                        module.store = protobuf.decodeTag().value;
                        break;                    
                    case 5:
                        module.max_size = result.value;
                        break;
                    case 6: // fixed32
                        module.checked_flags = result.value;
                        break;
                    case 7: // fixed32
                        module.passed_flags = result.value;
                        break;
                    case 8:
                        module.hash = protobuf.decodeBytes(result.value); // optional
                        protobuf.offset += result.value;
                        break;                        
                    case 9:
                        // repeated Dependencies       
                        module.dependencies.push(decodeDependency(result, {version:2}));
                        break;
                    case 10:
                        // repeated asset_dependencies
                        module.assets.push(decodeAsset(result));
                        break;
                    case 11:
                        module.size = result.value;
                        break;
                    case 12:
                        // security
                        module.security = {};
                        decodeSecurity(module.security, result);
                        break;
                    }
                }
        
                moduleInfo.modules.push(module);    
            };

            // Validity values:
            // 0 (or omitted): valid
            // 1 integrity check failed
            // 2 dependency check failed

        
            moduleInfo.modules = [];
        

            while(protobuf.offset < data.byteLength) {
                result = protobuf.decodeTag();                

                // repeated Module modules = 1; // Firmware modules
                if (result.wireType == 2) {
                    if (result.field == 1) {
                        result = decodeModule(result);
                    }
                    else
                    if (result.field == 2) {
                        // .field is 2 in 5.7.0 and later as this will be deprecated
                        result = decodeModule2(result);
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
                
        
            }

            moduleInfo.moduletypeProtobufToName = function(moduleType) {
                if (moduleData[moduleType]) {
                    return moduleData[moduleType].title;
                }
                else {
                    return 'unknown module ' + moduleType;
                }
            }

            moduleInfo.moduletypeProtobufToBinaryVersionName = function(moduleType) {
                return moduleData[moduleType].binaryVersionName;
            }    
        
            moduleInfo.getDescriptiveName = function(modOrDep) {
                let descriptiveName;

                if (modOrDep.moduleType == 2) {
                    switch(modOrDep.index) {
                        case 2:
                            descriptiveName = 'prebootloader-part1';
                            break;

                        case 1:
                            descriptiveName = 'prebootloader-mbr';
                            break;

                        default:
                            descriptiveName = 'bootloader';
                            break;
                    }
                }
                else
                if (modOrDep.moduleType == 4) {
                    descriptiveName = 'system-part' + modOrDep.index;
                }
                else {
                    descriptiveName = moduleInfo.moduletypeProtobufToName(modOrDep.moduleType);
                    if (typeof modOrDep.index != 'undefined') {
                        descriptiveName += ' (index ' + modOrDep.index + ')';
                    }    
                }
                return descriptiveName;
            }

            moduleInfo.getByModuleTypeIndex = function(moduleType, index) {
                // Pass 1: Exact match
                let numModuleTypeMatches = 0;

                for(const m of moduleInfo.modules) {
                    if (m.moduleType == moduleType) {
                        if (m.index == index) {
                            return m;
                        }
                        numModuleTypeMatches++;
                    }
                }    

                // Pass 2: Only one instance of the module
                if (numModuleTypeMatches == 1) {
                    for(const m of moduleInfo.modules) {
                        if (m.moduleType == moduleType) {
                            return m;
                        }
                    }   
                }

                
                // Pass 3: Wildcard index
                for(const m of moduleInfo.modules) {
                    if (m.moduleType == moduleType && typeof m.index == 'undefined') {
                        return m;
                    }
                }    
                // Not found
                return null;
            };

            moduleInfo.getModuleNcp = function() {
                return moduleInfo.getByModuleTypeIndex(7);
            };

            moduleInfo.getPrebootLoaderPart1 = function() {
                // prebootloader-part1 on P2 is bootloader (1) index 2
                return moduleInfo.getByModuleTypeIndex(2, 2);
            };

            moduleInfo.getSystemVersion = function() {
                for(const m of moduleInfo.modules) {
                    if (m.moduleType == 4) {
                        return m.version;
                    }
                }
                return 0;
            }

            moduleInfo.getSystemSemver = function() {
                const v = moduleInfo.getSystemVersion();
                if (v) {
                    const semVer = apiHelper.systemVersionToSemVer(obj.version);
                    if (semVer) {
                        return semVer;
                    }
                } 
                return 0;
            }
              
            /*
            tag       := (field << 3) BIT_OR wire_type, encoded as varint
            value     := (varint|zigzag) for wire_type==0 |
        
            message GetModuleInfoReply {
            message Dependency {
                FirmwareModuleType type = 1; // Module type
                uint32 index = 2; // Module index
                uint32 version = 3; // Module version
            }
            message Module {
                FirmwareModuleType type = 1; // Module type
                uint32 index = 2; // Module index
                uint32 version = 3; // Module version
                uint32 size = 4; // Module size
                uint32 validity = 5; // Validity flags (see FirmwareModuleValidityFlag)
                repeated Dependency dependencies = 6; // Module dependencies
            }
            repeated Module modules = 1; // Firmware modules
            }
            // See also: https://developers.google.com/protocol-buffers/docs/encoding
            */
        
            return moduleInfo;
        }
        
        const getModuleInfoCtrlRequest = async function() {
            let moduleInfo;
            try {
                const res = await usbDevice.sendControlRequest(90, null, {timeout:15000}); // CTRL_REQUEST_GET_MODULE_INFO

                moduleInfo = decodeModuleInfoProtobuf(res.data);
            }
            catch(e) {
                // Could be timeout            
                console.log('getModuleInfoCtrlRequest exception', e);    
            }
            return moduleInfo;
        };

        const hideDeviceFirmwareInfo = function() {
            $('.deviceFirmwareInfo').hide();

            const tableBodyElem = $('.deviceFirmwareInfoTable > tbody');
            $(tableBodyElem).html('');
        };

        const showDeviceFirmwareInfo = function(moduleInfo) {
            $('.deviceFirmwareInfo').show();

            const tableBodyElem = $('.deviceFirmwareInfoTable > tbody');
            $(tableBodyElem).html('');

            const formatModuleIndex = function(obj) {
                return moduleInfo.getDescriptiveName(obj);
            }

            const formatVersion = function(obj) {
                let text = '';
                if (obj.moduleType == 4) {
                    const semVer = apiHelper.systemVersionToSemVer(obj.version);
                    if (semVer) {
                        text = semVer + ' (' + obj.version + ')';
                    }
                    else {
                        text = obj.version;                        
                    }
                }
                else {
                    text = obj.version;
                }             
                return text;   
            }

            for(const m of moduleInfo.modules) {
                const rowElem = document.createElement('tr');

                let cellElem;
                
                // Module
                cellElem = document.createElement('td');
                $(cellElem).text(formatModuleIndex(m));
                $(rowElem).append(cellElem);

                // Valid
                cellElem = document.createElement('td');
                if (!m.validity) {
                    $(cellElem).html('\u2705'); // Green Check
                }
                else {
                    $(cellElem).html('\u274C'); // Red X
                }                
                $(rowElem).append(cellElem);

                // Version
                cellElem = document.createElement('td');
                $(cellElem).text(formatVersion(m));
                $(rowElem).append(cellElem);

                // Dependencies
                cellElem = document.createElement('td');
                let deps = [];
                for(const d of m.dependencies) {
                    deps.push(formatModuleIndex(d) + ' ' + formatVersion(d));
                }
                $(cellElem).text(deps.join(', '));
                $(rowElem).append(cellElem);

                $(tableBodyElem).append(rowElem);
            }


        }

        /*

        */

        const checkDevice = async function() {

            try {
                setSetupStep('setupStepCheckDevice');
                
                // TODO: Add a info pane if this takes longer than ~5 seconds
                // Possibly try resetting the device
                $(thisElem).find('.setupStepCheckDevice').children().each(() => $(this).hide());
                $(thisElem).find('.setupStepCheckDeviceStart').show();

                deviceInfo.deviceId = usbDevice.id;
                deviceInfo.platformId = usbDevice.platformId;
                deviceInfo.firmwareVersion = usbDevice.firmwareVersion;
                deviceInfo.platformVersionInfo = apiHelper.getRestoreVersions(usbDevice);

                analytics.track('Selected', {category:gaCategory, label:deviceInfo.platformId});
                console.log('checkDevice', deviceInfo);

                if (!deviceInfo.targetVersion) {
                    deviceInfo.targetVersion = minimumDeviceOsVersion;
                }

                switch(deviceInfo.platformId) {
                    case 10: // electron (and E Series)
                    case 13: // boron
                    case 23: // bsom
                    case 25: // b5som
                    case 26: // tracker
                    case 28: // trackerm
                    case 35: // electron2
                        deviceInfo.hasPMIC = true;
                        break;
                }

                if (!deviceInfo.platformVersionInfo) {
                    $(thisElem).find('.setupStepCheckDeviceStart').hide();
                    $(thisElem).find('.setupStepCheckDeviceUnknown').show();
                    return;
                }

                if (mode == 'product') {
                    // If in product device flashing mode, get device information
                    productData = {
                        deviceId: deviceInfo.deviceId,                        
                    };

                    try {
                        productData.deviceData = (await apiHelper.particle.getDevice({ deviceId: productData.deviceId, auth: apiHelper.auth.access_token })).body;
                        
                        if (productData.deviceData.product_id < 100) {
                            throw 'not a product device';
                        }

                        productData.productId = productData.deviceData.product_id;


                        productData.productInfo = await new Promise(function(resolve, reject) {

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
                                    resolve(resp.product);
                                },
                                url: 'https://api.particle.io/v1/products/' + productData.productId,
                            }
                
                            $.ajax(request);
                        });
                        // productData.productInfo
                        //      .description
                        //      .groups (array)
                        //      .name
                        //      .platform_id
                        //      .settings (object)
                        //      .user

                        productData.productFirmware = await new Promise(function(resolve, reject) {

                            let request = {
                                dataType: 'json',
                                error: function (jqXHR) {
                                    reject(jqXHR);
                                },
                                headers: {
                                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                    'Accept': 'application/json',
                                    'X-Particle-Tool': 'particle-docs',
                                },
                                method: 'GET',
                                success: function (resp, textStatus, jqXHR) {
                                    resolve(resp);
                                },
                                url: 'https://api.particle.io/v1/products/' + productData.productId + '/firmware',
                            }
                
                            $.ajax(request);
                        });
                        // productData.productFirmware
                        //      array of objects:
                        //          app_hash
                        //          description
                        //          device_os_version
                        //          groups
                        //          name (filename)
                        //          product_default (boolean)
                        //          title (display name)
                        //          size
                        //          version
                
                        for(const firmwareVerObj of productData.productFirmware) {
                            if (firmwareVerObj.product_default) {
                                productData.defaultProductFirmwareVersion = firmwareVerObj.version;
                            }
                        }


                        productData.productDeviceData = (await apiHelper.particle.getDevice({ deviceId: productData.deviceId, product: productData.productId, auth: apiHelper.auth.access_token })).body;

                        productData.productFirmwareVersion = productData.productDeviceData.targeted_firmware_release_version;
                        if (!productData.productFirmwareVersion) {
                            if (productData.defaultProductFirmwareVersion) {
                                productData.productFirmwareVersion = productData.defaultProductFirmwareVersion;
                                productData.productFirmwareIsDefault = true;
                            }
                            else {
                                throw 'no firmware available';
                            }
                        }


                        productData.productFirmwareInfo = productData.productFirmware.find(e => e.version == productData.productFirmwareVersion);
                        // productData.productFirmwareInfo
                        //      .description
                        //      .device_os_version
                        //      .name (filename)
                        //      .title (display name)
                        //      .version


                        {
                            const resp = await fetch('https://api.particle.io/v1/products/' + productData.productId + '/firmware/' + productData.productFirmwareVersion + '/binary', {
                                headers: {
                                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                    'Accept': 'application/json',
                                    'X-Particle-Tool': 'particle-docs',
                                }
                            });
                            const respData = await resp.arrayBuffer();    
                            
                            if (respData.byteLength > 100) {
                                productData.productFirmwareBinary = respData;
                            }
                        }
                 
                    }
                    catch(e) {
                        console.log('exception', e);
                        console.log('productData', productData);
                    }

                    if (!productData.productId) {
                        setSetupStep('setupStepNotInProduct');
                        return;
                    }
                    if (!productData.productFirmwareBinary) {
                        setSetupStep('setupStepNoProductFirmware');
                        return;
                    }


                }
    
                if (!usbDevice.isInDfuMode) {
                    // Attempt to get the module info on the device using control requests if not already in DFU mode.
                    // When in DFU already, just flash full Device OS and binaries to avoid leaving DFU.

                    deviceModuleInfo = await getModuleInfoCtrlRequest();

                    if (deviceModuleInfo) {
                        showDeviceFirmwareInfo(deviceModuleInfo);    
                    }
                    else {
                        setSetupStep('setupStepManualDfu');      
                        return;              
                    }
                }
                else {
                    analytics.track('Already DFU', {category:gaCategory, label:deviceInfo.platformId});
                }
                // 
                if (deviceInfo.platformVersionInfo.cellular || usbDevice.isCellularDevice) {                    
                    deviceInfo.cellular = true;

                    // Used to do this, but this does not work on Gen 2 cellular devices
                    // deviceInfo.iccid = await usbDevice.getIccid();

                    // Preload the mccmnc database
                    fetch('/assets/files/mccmnc.json')
                        .then(response => response.json())
                        .then(function(data) {
                            mccmnc = data;
                        })
                        .catch(function() {
                        });

                }
                if (deviceInfo.platformVersionInfo.wifi) {
                    deviceInfo.wifi = true;
                }

                if (mode == 'wifi') {
                    if (!deviceInfo.wifi) {
                        analytics.track('Not allowed Is Cellular', {category:gaCategory});
                        setSetupStep('setupStepWiFiIsCellular');
                        return;
                    }

                    if (deviceInfo.platformVersionInfo.gen == 2) {
                        analytics.track('Not allowed Is Gen 2', {category:gaCategory});
                        setSetupStep('setupStepWifiGen2');
                        return;
                    }

                    if (usbDevice.isInDfuMode) {
                        analytics.track('Not allowed Is DFU', {category:gaCategory});
                        setSetupStep('setupStepWifiInDFU');
                        return;
                    }

                    configureWiFi();                              
                }
                else {
                    // Don't check SIM or firmware backup when in device restore mode
                    if (mode == 'setup' || mode == 'doctor' || mode == 'cloud') {
                        const stor = localStorage.getItem(storageActivateSim);
                        if (stor) {
                            try {
                                const storObj = JSON.parse(stor);
                                // TODO: Check date here
                                if (stor.deviceId == deviceInfo.deviceId) {
                                    analytics.track('Reopened during Activate SIM', {category:gaCategory});
                                    // TODO: Maybe ask user here?
                                    activateSim();
                                    return;
                                }
                            }
                            catch(e) {

                            }
                        }
                    }

                    // confirmFlash is used for setup, doctor, and restore (not wifi)
                    confirmFlash();
                }


            }
            catch(e) {
                console.log('exception', e);
                analytics.track('Exception', {category:gaCategory, label:'checkDevice'});
                // TODO: Handle errors like UsbError here
                // UsbError {jse_shortmsg: 'IN control transfer failed', jse_cause: DOMException: The device was disconnected., jse_info: {…}, message: 'IN control transfer failed: The device was disconnected.', stack: 'VError: IN control transfer failed: The device was…://ParticleUsb/./src/usb-device-webusb.js?:81:10)'}
                
                // This is not the right step!
                // setSetupStep('setupStepManualDfu');
            }
        };

        const doTowerScan = async function() {
            setSetupStep('setupStepTowerScan');
            $(thisElem).find('.towerScanOption').hide();

            const showStep = function(step) {
                $(thisElem).find('.setupStepTowerScan').children().each(function() {
                    $(this).hide();
                });
                $(thisElem).find('.' + step).show();    
            }

            showStep('setupStepTowerScanRunning');
            $(thisElem).find('.towerInfo').show();

            $(thisElem).find('.towerScanStepPreparingModem > td > img').css('visibility', 'visible');

            const reqObj = {
                op: 'towerScan'
            } 
            const res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

            let wasScanning = false;

            while(true) {
                const reqObj2 = {
                    op: 'towerScanResult'
                } 
                const res2 = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj2));
                if (res2.result == 0 && res2.data) {
                    const respObj = JSON.parse(res2.data);

                    if (respObj.cells) {
                        
                        // Show in list of cells
                        for(let cell of respObj.cells) {
                            const trElem = document.createElement('tr');
                            
                            let tdElem = document.createElement('td');
                            $(tdElem).text(cell.mcc);
                            $(trElem).append(tdElem);

                            tdElem = document.createElement('td');
                            $(tdElem).text(cell.mnc);
                            $(trElem).append(tdElem);

                            tdElem = document.createElement('td');
                            $(tdElem).text(cell.ci);
                            $(trElem).append(tdElem);

                            tdElem = document.createElement('td');
                            $(tdElem).text(cell.lac);
                            $(trElem).append(tdElem);

                            tdElem = document.createElement('td');
                            $(tdElem).text(cell.rssi);
                            $(trElem).append(tdElem);

                            tdElem = document.createElement('td');
                            if (mccmnc) {
                                for(const obj of mccmnc) {
                                    if (obj.mcc == cell.mcc && obj.mnc == cell.mnc) {
                                        $(tdElem).text(obj.name);
                                    }
                                }
                            }         
                            $(trElem).append(tdElem);

                            tdElem = document.createElement('td');
                            $(tdElem).text(cell.band);
                            $(trElem).append(tdElem);

                            $(thisElem).find('.towerInfoTable > tbody').append(trElem);
                        }
                    }
                    if (!wasScanning && respObj.scanning) {
                        wasScanning = respObj.scanning;

                        $(thisElem).find('.towerScanStepPreparingModem > td > img').attr('src', doneUrl);
                        $(thisElem).find('.towerScanStepsScanning > td > img').css('visibility', 'visible');

                    }

                    if (respObj.done) {
                        $(thisElem).find('.towerScanStepsScanning > td > img').attr('src', doneUrl);
                        break;
                    }
                }
                else {
                    console.log('error');
                    break;
                }

                await new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve();
                    }, 5000);
                });                
            }

            showStep('setupStepTowerScanDone');

        };

        const runDeviceLookup = async function() {
            const deviceLookupOutputElem = $(thisElem).find('.apiHelperDeviceLookupOutput');
            $(deviceLookupOutputElem).show();

            $('.apiHelperDeviceLookupResult').text('');
            $('.apiHelperDeviceLookupProduct').hide();
            $('.apiHelperDeviceLookupOrg').hide();
            
            deviceLookup = apiHelper.deviceLookup({
                deviceId: deviceInfo.deviceId,
                deviceLookupElem: deviceLookupOutputElem,
                platformId:  deviceInfo.platformId,
            });

            await deviceLookup.run();

        };

        const logEvents = function(eventOptions) {
            const locationEvent = function(eventName, eventJson) {
                if (!eventJson.loc) {
                    return;
                }

                if (!gnssInfo.locationTableInitialized) {
                    $('.locationInfo').show();

                    for(let f of gnssInfo.fields) {
                        if (!f.locationTable) {
                            continue;
                        }
                        const rowElem = document.createElement('tr');

                        let tdElem = document.createElement('td');
                        $(tdElem).text(f.title);
                        $(rowElem).append(tdElem);

                        tdElem = f.locationTableElem = document.createElement('td');
                        $(rowElem).append(tdElem);

                        tdElem = f.locationFusionTableElem = document.createElement('td');
                        $(rowElem).append(tdElem);

                        $('.locationInfoTable > tbody').append(rowElem);
                    }


                    gnssInfo.locationTableInitialized = true;
                }

                for(let f of gnssInfo.fields) {
                    if (!f.locationTable) {
                        continue;
                    }
                    const elem = (eventName == 'loc') ? f.locationTableElem : f.locationFusionTableElem;

                    let data = eventJson.loc[f.locKey];

                    if (f.format == 'check') {
                        if (parseInt(data)) {
                            $(elem).html('&check;');
                        } 
                        else {
                            $(elem).text('');
                        }
                    }
                    else {
                        if (!data) {
                            data = '';
                        }
                        $(elem).text(data);                        
                    }
                }
            };

            const diagnosticsEvent = function(eventJson) {
            };

            const addRow = function(event) {
                const tableBodyElem = $('.cloudEventsTable > tbody');

                const rowElem = document.createElement('tr');

                let cellElem = document.createElement('td');
                $(cellElem).text(event.name)
                $(rowElem).append(cellElem);

                cellElem = document.createElement('td');
                if (event.data) {
                    $(cellElem).text(event.data)
                }
                $(rowElem).append(cellElem);

                const time = event.published_at.replace('T', ' ');
                cellElem = document.createElement('td');
                $(cellElem).text(time)
                $(rowElem).append(cellElem);

                $(tableBodyElem).append(rowElem);

                if (event.name == 'loc' || event.name == 'loc-enhanced') {
                    try {
                        const eventJson = JSON.parse(event.data);                        
                        locationEvent(event.name, eventJson);
                    }
                    catch(e) {
                    }
                }
                else 
                if (event.name == 'spark/device/diagnostics/update') {
                    try {
                        const eventJson = JSON.parse(event.data);                        
                        diagnosticsEvent(eventJson);
                    }
                    catch(e) {
                    }
                }
                
            
            };

            const handleStream = function(stream) {
                stream.on('event', function(event) {
                    if (event.coreid == eventOptions.deviceId) {
                        try {
                            addRow(event);
                        }
                        catch(e) {
                            console.log('exception in event', e);
                        }
                    }
                });            
            };

            $('.cloudEvents').show();

            //
            if (eventOptions.productId) {
                apiHelper.particle.getEventStream({ product: eventOptions.productId, auth: apiHelper.auth.access_token }).then(handleStream);
            }
            else {
                apiHelper.particle.getEventStream({ deviceId: eventOptions.deviceId, auth: apiHelper.auth.access_token }).then(handleStream);    
            }
        };

        const checkAccount  = async function() {
            if (mode == 'setup' || mode == 'doctor') {
                // Device restore does not need a valid account
                // Product flash doesn't care (as much) about the calling user's account so don't check that here
                setSetupStep('setupStepCheckAccount');

                const showStep = function(step) {
                    $(thisElem).find('.setupStepCheckAccount').children().each(function() {
                        $(this).hide();
                    });
                    $(thisElem).find('.' + step).show();    
                }

                showStep('setupStepCheckAccountStart');
                if (apiHelper.auth) {
                    apiHelper.particle.getUserInfo({ auth: apiHelper.auth.access_token }).then(
                        function(data) {
                            userInfo = data.body;
                            
                            $(userInfoElem).show();
            
                            setUserInfoItem('Account email', userInfo.username);
            
                            let name = '';
                            if (userInfo.account_info.first_name) {
                                name += userInfo.account_info.first_name;
                            }
                            if (userInfo.account_info.last_name) {
                                if (name.length > 0) {
                                    name += ' ';
                                }
                                name += userInfo.account_info.last_name;
                            }
                            if (name) {
                                setUserInfoItem('Name', name);
                                userInfo.name = name;
                            }    

                            // Also get service agreements
                            let request = {
                                contentType: 'application/json',
                                dataType: 'json',
                                error: function (jqXHR) {
                                    showStep('setupStepCheckAccountInvalidToken');
                                },
                                headers: {
                                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                    'Accept': 'application/json',
                                    'X-Particle-Tool': 'particle-docs',
                                },
                                method: 'GET',
                                success: function (resp, textStatus, jqXHR) {
                                    if (resp.data && resp.data.length > 0) {
                                        const attr = resp.data[0].attributes;
                                        setUserInfoItem('Billing Period Start', attr.current_billing_period_start);
                                        setUserInfoItem('Device Limit Reached', attr.current_usage_summary.device_limit_reached ? 'Yes' : 'No');
                                        setUserInfoItem('Devices Paused', attr.current_usage_summary.device_limit_reached ? 'Yes' : 'No');
                                        setUserInfoItem('Usage threshold exceeded', attr.current_usage_summary.usage_threshold_exceeded ? 'Yes' : 'No');

                                        if (attr.current_usage_summary.device_limit_reached || 
                                            attr.current_usage_summary.device_limit_reached || 
                                            attr.current_usage_summary.usage_threshold_exceeded) {
                                            showStep('setupStepCheckAccountLimits');

                                        }
                                        else {
                                            setSetupStep('setupStepSelectDevice');
                                        }
                                    }
                                    else {
                                        // No service agreements?
                                        setSetupStep('setupStepSelectDevice');
                                    }

                                },
                                url: 'https://api.particle.io/v1/user/service_agreements/'
                            }
                            $.ajax(request);            
                        },
                        function(err) {
                            showStep('setupStepCheckAccountInvalidToken');
                        }
                    )
                }
                else {
                    console.log('no auth');
                    $('.apiHelperLoggedIn').hide();
                }
            }
            else {
                // restore mode just go to select device
                setSetupStep('setupStepSelectDevice');
            }
        };
        checkAccount();

        const checkOwnership  = async function() {
            setSetupStep('setupStepCheckOwnership');

            const showStep = function(step) {
                $(thisElem).find('.setupStepCheckOwnership').children().each(function() {
                    $(this).hide();
                });
                $(thisElem).find('.' + step).show();    
            }

            showStep('setupStepCheckOwnershipOwnership');

            await runDeviceLookup();

            if (!deviceLookup.deviceInfo) {
                showStep('setupStepCheckOwnershipNoDeviceInfo');


                await new Promise(function(resolve) {
                    const buttonElem = $(thisElem).find('.setupContinueSetupButton');
                    $(buttonElem).on('click', function() {
                        resolve();
                    });
                });

            }

            if (deviceLookup.deviceMine || deviceLookup.deviceProductId) {
                let eventOptions = {
                    deviceId: deviceInfo.deviceId,
                    productId: deviceLookup.deviceProductId,
                };
                logEvents(eventOptions);                
            }

            if (mode == 'doctor') { // TEMPORARY
                if (deviceLookup.deviceInMyProduct || deviceLookup.deviceInOrgProduct) {
                    // Mark as development device so firmware does not get overwritten
                    console.log('marking as development device');
                    await apiHelper.particle.markAsDevelopmentDevice({ 
                        deviceId: deviceInfo.deviceId,
                        product: deviceLookup.deviceProductId,
                        auth: apiHelper.auth.access_token 
                    });                
                    analytics.track('Mark as Development Device prior to flashing', {category:gaCategory});
                }
            }


            // deviceLookup.deviceMine

            // deviceLookup.deviceInMyProduct, .deviceProductId, .deviceProductName

            // deviceLookup.deviceInOrgProduct, .deviceProductId, .deviceProductName, .orgId, .orgName

            // if (deviceLookup.)
//            showStep('setupStepCheckOwnershipCheckAccount');

            // Do something with deviceLookup.deviceInfo.isProductDevice here

        };

        const activateSim = async function() {
            setSetupStep('setupStepActivateSim');

            showDeviceLogs();

            let needToActivate = false;
            let alreadyOwned = false;
            let clockTimer;
            let clockStart;
            let functionStart = new Date();
            let hasResetModem = false;

            const showStep = function(step) {
                $(thisElem).find('.setupStepActivateSim').children().each(function() {
                    $(this).hide();
                });
                $(thisElem).find('.' + step).show();    
            }

            showStep('setupStepActivateSimGet');

            const twoDigitString = function(n) {
                let s = n.toString();
                if (s.length >= 2) {
                    return s;
                }
                else {
                    return '0' + s;
                }
            }
            
            const elapsedString = function(secs) {
                let result = '';
            
                const h = Math.floor(secs / 3600);
                if (h > 0) {
                    result += twoDigitString(h) + ':';
                    secs -= h * 3600;
                }
            
                const m = Math.floor(secs / 60);
                secs -= m * 60;
            
                result += twoDigitString(m) + ':';
            
                const s = Math.floor(secs);
                result += twoDigitString(s);            
            
                return result;
            }
            
            const startClock = function() {
                $(thisElem).find('.setupStepActivateSimWaiting').show();

                clockTimer = setInterval(function() {
                    const elapsed = Math.floor((new Date().getTime() - clockStart.getTime()) / 1000);

                    $(thisElem).find('.setupStepActivateSimTimer').text(elapsedString(elapsed));
                }, 1000);
            };

            let done = false;
            $(thisElem).find('.continueWithoutActivating').on('click', function() {
                done = true;
            });
            
            let firmwareReplaced = false;

            while(!done) {
                try {
                    if (!deviceInfo.iccid) {

                        let reqObj = {
                            op: 'cellularInfo'
                        } 
                        if (setupOptions.simSelection) {
                            reqObj.simSelection = setupOptions.simSelection;
                        }
    
                        let res;
                        try {
                            res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                            if (res.result || !res.data) {
                                firmwareReplaced = true;
                            }    
                        }
                        catch(e) {
                            console.log('exception sending cellularInfo control request', e);
                            firmwareReplaced = true;
                        }

                        if (firmwareReplaced) {
                            break;
                        }

                        if (msgExternalSIM && msgCPINERROR) {
                            setSetupStep('setupStepNoExternalSIM');

                            $(thisElem).find('.externalSimUseInternal').on('click', async function() {
                                let reqObj = {
                                    op: 'internalSim'
                                } 
                                const res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                                
                                setSetupStep('setupStepActivateSim');
                            });

                            continue;
                        }
        
                        const respObj = JSON.parse(res.data);
                        if (!respObj.iccid) {
                            if (!hasResetModem) {
                                hasResetModem = true;
                                if (((new Date().getTime() - functionStart.getTime()) / 1000) > 50) {
                                    showStep('setupStepActivateSimGetSlow');
        
                                    reqObj = {
                                        op: 'cellularReset'
                                    } 
                                    await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));    
                                }
                            }
    
                            await new Promise(function(resolve) {
                                setTimeout(function() {
                                    resolve();
                                }, 5000);
                            });
                            continue;
                        }
    
                        deviceInfo.iccid = respObj.iccid;

                        // 
                        let canTowerScan = false;
                        if (respObj.model.startsWith('SARA-U') || respObj.model.startsWith('SARA-G')) {
                            canTowerScan = true;
                        }
                        
                        if (canTowerScan) {
                            $(thisElem).find('.towerScanOption').show();

                            $(thisElem).find('.doTowerScan').on('click', async function() {
                                await doTowerScan();
                                return;                                
                            });
                        }
                        analytics.track('TowerScanAvailable', {category:gaCategory, label:canTowerScan});


                        setInfoTableItemObj(respObj);    

                        $(thisElem).find('.batteryWarning').hide();   
                        if (respObj.model) {
                            if (respObj.model.startsWith('SARA-R') || respObj.model.startsWith('BG9')) {
                                // LTE model, does not require a battery
                            }
                            else {
                                // Non-LTE model 
                                if (respObj.soc <= 0) {
                                    analytics.track('BatteryWarning', {category:gaCategory});
                                    $(thisElem).find('.batteryWarning').show();   
                                }
                            }
        
                        }
    
                        showStep('setupStepActivateSimChecking');
                    }

                    let checkSimUrl;

                    if (setupOptions.addToProduct) {
                        checkSimUrl = 'https://api.particle.io/v1/products/' + setupOptions.productId + '/sims/' + deviceInfo.iccid;
                    }
                    else {
                        checkSimUrl = 'https://api.particle.io/v1/sims/' + deviceInfo.iccid;
                    }

                    // listSIMs doesn't filter on iccid correctly
                    // checkSIM does a HEAD so it doesn't return enough useful information
                    const result = await new Promise(function(resolve, reject) {
    
                        const request = {
                            dataType: 'json',
                            error: function (jqXHR) {
                                console.log('error', jqXHR);
                                reject(jqXHR.status);
                            },
                            headers: {
                                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                'Accept': 'application/json',
                                'X-Particle-Tool': 'particle-docs',
                            },
                            method: 'GET',
                            success: function (resp, textStatus, jqXHR) {
                                resolve(resp);
                            },
                            url: checkSimUrl
                        };
            
                        $.ajax(request);            
                    });
    
                    /*
                    last_status_change_action: "activate"
                    last_status_change_action_error: "no"
                    last_status_change_action_on: "2021-10-31T11:44:01.655Z"
                    state_change_in_progress: false
                    status: "active"
                    */
    
                    alreadyOwned = true;
                    if (result.status != 'active') {
                        if (result.last_status_change_action == 'activate' && result.state_change_in_progress) {
                            setStatus('SIM is being activated...');
                            if (!clockStart) {
                                clockStart = new Date(result.last_status_change_action_on);
                                startClock();
                            }
                        }
                        else {
                            needToActivate = true;
                        }
                    }
                    else {

                        localStorage.removeItem(storageActivateSim);

                        break;
                    }                            
    
                    // result.statusCode is 200 if not activated, and 205 if activated? Weird.
                }
                catch(e) {
                    if (e == 404) {
                        needToActivate = true;
                    }
                    else {
                        setSetupStep('setupStepSimActivationFailed');
                        console.log('exception', e);
                        break;    
                    }
                }
                
    
                if (needToActivate) {
                    try {
                        setStatus('Activating SIM...');
                        analytics.track('Activating SIM', {category:gaCategory});

                        if (!clockStart) {
                            clockStart = new Date();
                            startClock();    
                        }

                        const stor = {
                            deviceId: deviceInfo.deviceId,
                            start: clockStart.getTime() / 1000
                        };
                        localStorage.setItem(storageActivateSim, JSON.stringify(stor));

                        let activateOptions = {
                            auth: apiHelper.auth.access_token, 
                            iccid: deviceInfo.iccid
                        }

                        if (setupOptions.addToProduct) {
                            activateOptions.product = setupOptions.productId;
                        }

                        const result = await apiHelper.particle.activateSIM(activateOptions);
                        showStep('setupStepActivateSimWaiting');

                    }
                    catch(e) {
                        if (e.message.includes('408')) { 
                            // Activation in progress, check again in 30 seconds
                        }
                        else {
                            setSetupStep('setupStepSimActivationFailed');
                            // 403 if SIM is a product SIM I think
                            console.log('exception', e);
                            break;    
                        }

                    }    
                }

                // Wait a bit to try again
                await new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve();
                    }, 30000);
                });                
            }

            if (clockTimer) {
                clearInterval(clockTimer);
            }

            if (firmwareReplaced) {
                setSetupStep('setupStepFirmwareReplaced');
                return;
            }

            if (deviceInfo.platformVersionInfo.wifi && deviceInfo.platformVersionInfo.cellular) {
                // M SoM
                if ($(thisElem).find('.doctorSetupWiFi')) {
                    configureWiFi();                              
                    return;
                }
            }

            reqObj = {
                op: 'connect',
                ethernet: setupOptions.ethernet,
                keepAlive: setupOptions.keepAlive,
            };
            await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

            waitDeviceOnline();

            
        };


        const reconnectToDevice = async function() {

            setSetupStep('setupStepReconnecting');

            let nativeUsbDevice;

            const showStep = function(step) {
                $(thisElem).find('.setupStepReconnecting').children().each(function() {
                    $(this).hide();
                });
                $(thisElem).find('.' + step).show();    
            }
            showStep('setupStepReconnectingWaiting');

            for(let tries = 0; tries < 4 && !nativeUsbDevice; tries++) {
                await new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve();
                    }, 3000);
                });
        
                try {                    
                    const nativeUsbDevices = await navigator.usb.getDevices();

                    if (nativeUsbDevices.length > 0) {
                        for(let dev of nativeUsbDevices) {
                            if (dev.serialNumber == deviceInfo.deviceId) {
                                nativeUsbDevice = dev;
                                break;
                            }
                        }
                    }            
                }         
                catch(e) {
                    console.log('exception getting USB devices', e);
                    analytics.track('Exception', {category:gaCategory, label:'reconnectToDevice'});
                }

            }

            if (!nativeUsbDevice) {
                showStep('setupStepReconnectingNeedReauthorize');

                if (deviceInfo.platformVersionInfo.isRTL872x) {
                    $(setupStepWhiteLed).show();
                }
                else {
                    $(setupStepWhiteLed).hide();
                }
                

                await new Promise(function(resolve, reject) {

                    $(thisElem).find('.reconnectUsb').on('click', async function() {

                        $(thisElem).find('.reconnectUsb').prop('disabled', true);

                        nativeUsbDevice = await navigator.usb.requestDevice({ filters: usbFilters })
                
                        $(thisElem).find('.reconnectUsb').prop('disabled', false);

                        $(thisElem).find('.reconnectUsb').off('click');
                        resolve();
                    });
            
                });
            }
            

            usbDevice = await ParticleUsb.openNativeUsbDevice(nativeUsbDevice, {});
            
            if (!usbDevice.isInDfuMode) {
                // Control requests are not supported if the device is still in DFU mode
                // It should have rebooted but if we don't check this, if it didn't there will be a 
                // Uncaught (in promise) ProtocolError: Unable to parse service reply
                if (flashDeviceOptions.mode == 'setup' || flashDeviceOptions.mode == 'doctor') {
                    // In troubleshooting mode, disable autoconnect and connect manually instead
                    // as we want to check the SIM first
                    reqObj = {
                        op: 'noAutoConnect',
                    };
                    await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));      
    
                }            

                if (flashDeviceOptions.mode == 'setup' || flashDeviceOptions.mode == 'doctor') {
                    // Attempt to fetch the device module info for the device
                    deviceModuleInfo = await getModuleInfoCtrlRequest();
                }
                else {
                    deviceModuleInfo = null;
                }    
            }
            
        };

        let bootloaderByControlRequest = true; // options.platformVersionInfo.isRTL872x

        const flashDeviceInternal = async function() {
            try {
                setSetupStep('setupStepFlashDevice');

                $(userInfoElem).hide();

                const showStep = function(step) {
                    $(thisElem).find('.setupStepFlashDevice').children().each(function() {
                        $(this).hide();
                    });
                    $(thisElem).find('.' + step).show();    
                }

                showStep('setupStepFlashDeviceDownload');

                // Flash device               
                if (restoreFirmwareBinary) {
                    userFirmwareBinary = restoreFirmwareBinary;
                }

                // For restore mode, leave userFirmwareBinary undefined so tinker will be flashed

                let dfuPartTableInfo = {};

                // These used to be manually copied, but now flashDeviceOptions is just added to options by default
                // setupBit: flashDeviceOptions.setupBit,
                // claimCode: flashDeviceOptions.claimCode,
                // downloadUrl: flashDeviceOptions.downloadUrl, // May be undefined
                // prebootloader: flashDeviceOptions.prebootloader,
                // moduleInfo: flashDeviceOptions.moduleInfo,
                // zipFs: flashDeviceOptions.zipFs,

                let options = Object.assign(Object.assign({}, flashDeviceOptions), {
                    eventCategory: 'USB Device Setup',
                    platformVersionInfo: deviceInfo.platformVersionInfo,
                    userFirmwareBinary,
                    setStatus,
                    version: deviceInfo.targetVersion,
                    bootloaderByControlRequest, 
                    deviceModuleInfo: (flashDeviceOptions.forceUpdate ? null : deviceModuleInfo),
                    onEnterDFU: function() {
                        showStep('setupStepFlashDeviceEnterDFU');
                    },
                    onAuthorizeDFU: async function() {
                        showStep('setupStepFlashDeviceAuthorizeDFU');

                        await new Promise(function(resolve, reject) {
                            const filters = [
                                {vendorId: 0x2b04}
                            ];
        
                            $(thisElem).find('.reconnectUsb').on('click', async function() {
        
                                $(thisElem).find('.reconnectUsb').prop('disabled', true);
        
                                try {
                                    nativeUsbDevice = await navigator.usb.requestDevice({ filters: usbFilters });
                        
                                    showStep('setupStepFlashDeviceConnectDFU');
                                    $(thisElem).find('.reconnectUsb').prop('disabled', false);
            
                                    $(thisElem).find('.reconnectUsb').off('click');
                                    resolve(nativeUsbDevice);    
                                }
                                catch(e) {
                                    reject(e);
                                }
                            });                    
                        });
                    },
                    onStartFlash: function() {
                        showStep('setupStepFlashDeviceFlashing');
                    },
                    progressUpdate: function(msg, pct, obj) {
                        // obj.pct
                        // obj.func == 'erase' else programming
                        // obj.partName == system-part1, system-part2, system-part3, bootloader, softdevice, tinker
                        // (obj.partName is tinker even for a custom binary)
                        if (!dfuPartTableInfo[obj.partName]) {
                            return;
                        }
                        if (obj.skipSameVersion) {
                            $(dfuPartTableInfo[obj.partName].imgElem).css('visibility', 'visible');
                            $(dfuPartTableInfo[obj.partName].progressElem).hide();
                            $(dfuPartTableInfo[obj.partName].noteElem).text('Correct version already on device');
                            return;                            
                        }

                        if (obj.func != 'erase') {
                            pct += 100;
                        }

                        if (pct >= 200) {
                            $(dfuPartTableInfo[obj.partName].imgElem).css('visibility', 'visible');
                        }
                        $(dfuPartTableInfo[obj.partName].progressElem).val(pct);
                    },
                    progressDfuParts: function(dfuParts) {

                        const flashDeviceStepsElem = $(thisElem).find('.flashDeviceSteps');
                        $(flashDeviceStepsElem).empty();

                        for(const dfuPart of dfuParts) {
                            const rowElem = document.createElement('tr');

                            let colElem;
                            
                            // Green check when completed
                            colElem = document.createElement('td');
                            const imgElem = document.createElement('img');
                            $(imgElem).attr('src', '/assets/images/device-setup/checkmark-48.png');
                            $(imgElem).css('width', '24px');
                            $(imgElem).css('height', '24px');
                            $(imgElem).css('margin', '2px');
                            $(colElem).append(imgElem);
                            $(rowElem).append(colElem);
                            $(imgElem).css('visibility', 'hidden');

                            // Title
                            colElem = document.createElement('td');
                            $(colElem).text(dfuPart.title);
                            $(rowElem).append(colElem);

                            // Progress
                            colElem = document.createElement('td');
                            const progressElem = document.createElement('progress');
                            $(progressElem).attr('value', '0');
                            $(progressElem).attr('max', '200');
                            $(colElem).append(progressElem);
                            $(rowElem).append(colElem);

                            const noteElem = document.createElement('td');
                            $(rowElem).append(noteElem);

                            $(flashDeviceStepsElem).append(rowElem);


                            dfuPartTableInfo[dfuPart.name] = {
                                dfuPart,
                                progressElem,
                                rowElem,
                                imgElem,
                                noteElem
                            };
                        }
                    }
                });

        
                const restoreResult = await dfuDeviceRestore(usbDevice, options);
            
                if (!restoreResult.ok) {
                    console.log('dfu error', restoreResult);
                }
                
            }
            catch(e) {
                console.log('exception', e);
                setSetupStep('setupStepDfuFailed');
                $('.dfuFailedReason').text(e.text);
                analytics.track('Exception', {category:gaCategory, label:'setupStepDfuFailed'});
            }

            // Wait a little extra before trying to reconnect
            await new Promise(function(resolve) {
                setTimeout(function() {
                    resolve();
                }, 3000);
            });

        

            await reconnectToDevice();

        };

        const flashDevice = async function() {

            const baseUrl = '/assets/files/device-restore/' + deviceInfo.targetVersion + '/' + deviceInfo.platformVersionInfo.name;
    
            try {
                await new Promise(function(resolve, reject) {
                    fetch(baseUrl + '.json')
                    .then(response => response.json())
                    .then(function(res) {
                        flashDeviceOptions.moduleInfo = res;
                        resolve();
                    });
                });            
            }
            catch(e) {
                console.log('exception downloading restore json', e);
                analytics.track('Exception', {category:gaCategory, label:'get restore json'});
                // TODO: Do something here
            }
                
            const zipUrl = baseUrl + '.zip';
        
            flashDeviceOptions.zipFs = new zip.fs.FS();
        
            try {
                await flashDeviceOptions.zipFs.importHttpContent(zipUrl);
            }
            catch(e) {
                console.log('exception downloading restore json', e);
                analytics.track('Exception', {category:gaCategory, label:'get restore zip'});
                // TODO: Do something here
            }    
            
            // This is used in flashDeviceInternal and also below
            bootloaderByControlRequest = true; // options.platformVersionInfo.isRTL872x

        
            // Flash Device OS
            await flashDeviceInternal();
            analytics.track('Flash Device', {category:gaCategory});
            
    
            if (bootloaderByControlRequest) {          
                const controlRequestParts = [
                    {
                        moduleInfoName: 'prebootloader-part1',  
                        moduleType: 2,
                        moduleIndex: 2,
                        zipName: 'prebootloader-part1.bin',
                        step: 'setupStepFlashControlRequestsPrebootloader',
                    },
                    {
                        moduleInfoName: 'bootloader',  
                        moduleType: 2,
                        moduleIndex: 0,
                        zipName: 'bootloader.bin',
                        step: 'setupStepFlashControlRequestsBootloader',
                    },
                ]

                for(let tries = 1; !deviceModuleInfo && tries <= 3; tries++) {
                    deviceModuleInfo = await getModuleInfoCtrlRequest();                    
                }

                setSetupStep('setupStepFlashControlRequests');

                const showStep = function(step) {
                    $(thisElem).find('.setupStepFlashControlRequests').children().each(function() {
                        $(this).hide();
                    });
                    $(thisElem).find('.' + step).show();    
                }
                

                for(const controlRequestPart of controlRequestParts) {
                    if (deviceModuleInfo && flashDeviceOptions.moduleInfo[controlRequestPart.moduleInfoName]) {
                        // When upgrading from 5.3.0 to 5.5.0 and possibly other situations, the bootloader
                        // does not upgrade using the OTA trick. 
                        const desiredVersion = flashDeviceOptions.moduleInfo[controlRequestPart.moduleInfoName].prefixInfo.moduleVersion;
    
                        const m = deviceModuleInfo.getByModuleTypeIndex(controlRequestPart.moduleType, controlRequestPart.moduleIndex);
                        
                        if (desiredVersion != m.version) {
                            analytics.track('flashing ' + controlRequestPart.moduleInfoName + ' by control request', {category:gaCategory});
    
                            showStep(controlRequestPart.step);

                            const zipEntry = flashDeviceOptions.zipFs.find(controlRequestPart.zipName);
                            if (zipEntry) {
                                let part = await zipEntry.getUint8Array();
                
                                /*
                                if ((options.moduleInfo[partName].prefixInfo.moduleFlags & 0x01) != 0) { // ModuleInfo.Flags.DROP_MODULE_INFO
                                    part = part.slice(24); // MODULE_PREFIX_SIZE
                                }
                                */
                                                            
                                const res = await usbDevice.updateFirmware(part, {timeout:60000}); 

                                showStep('setupStepFlashControlRequestsWaiting');

                                // Wait a little extra before trying to reconnect
                                await new Promise(function(resolve) {
                                    setTimeout(function() {
                                        resolve();
                                    }, 3000);
                                });
                    
                                await reconnectToDevice();

                                // Fetch module info again
                                deviceModuleInfo = null;
                                for(let tries = 1; !deviceModuleInfo && tries <= 10; tries++) {
                                    try {
                                        deviceModuleInfo = await getModuleInfoCtrlRequest();
                                    }
                                    catch(e) {
                                        console.log('exception getting module info', e);
                                    }
    
                                    if (!deviceModuleInfo) {
                                        await new Promise(function(resolve, reject) {
                                            setTimeout(function() {
                                                resolve();
                                            }, 3000);
                                        });
                                    }
                                }
                
    
                            }    
                
                        }
                    }
                }


               
            }

            if (deviceInfo.platformVersionInfo.hasNCP) {
                let updateNcp = false;
                let minNcpVersion = 0;

                // TODO: Don't hardcode the version and path here!
                if (deviceInfo.platformVersionInfo.isTracker) {
                    minNcpVersion = 7;               
                    flashDeviceOptions.ncpPath = '/assets/files/ncp/tracker-esp32-ncp@0.0.7.bin';     
                }
                else {
                    minNcpVersion = 5;
                    flashDeviceOptions.ncpPath = '/assets/files/ncp/argon-ncp-firmware-0.0.5-ota.bin';
                }

                if (deviceModuleInfo && !flashDeviceOptions.forceUpdate) {
                    const m = deviceModuleInfo.getModuleNcp();
                    if (m) {
                        if (m.version < minNcpVersion) {
                            updateNcp = true;                            
                        }
                        console.log('version on device=' + m.version + ' minNcpVersion=' + minNcpVersion);
                    }
                }
                else {
                    updateNcp = flashDeviceOptions.updateNcp;
                    console.log('forcing ncp update updateNcp=' + updateNcp);
                }

                if (updateNcp) {
                    flashDeviceOptions.ncpUpdate = true;
                    await flashDeviceInternal();
                    analytics.track('Flash NCP', {category:gaCategory});
                }
            }

            if (deviceModuleInfo) {
                // Update firmware version table
                // deviceModuleInfo is updated in flashDeviceInternal
                showDeviceFirmwareInfo(deviceModuleInfo);
            }

        };


        const addToProduct = async function() {
            setSetupStep('setupStepAddToProduct');

            console.log('add device ' + deviceInfo.deviceId + ' to product ' + setupOptions.productId);

            // Add device into product
            const res = await apiHelper.particle.addDeviceToProduct({ 
                deviceId: deviceInfo.deviceId,
                product: setupOptions.productId,
                auth: apiHelper.auth.access_token 
            });
            if (res.statusCode >= 200 && res.statusCode < 300) {
                analytics.track('Add To Product', {category:gaCategory, label:'Success'});
            }
            else {
                console.log('failed to add to product, do something here');
                analytics.track('Add To Product', {category:gaCategory, label:'Failure ' + res.statusCode});
            }

            if (setupOptions.developmentDevice) {
                console.log('set as development device');

                await apiHelper.particle.markAsDevelopmentDevice({ 
                    deviceId: deviceInfo.deviceId,
                    product: setupOptions.productId,
                    auth: apiHelper.auth.access_token 
                });                
                analytics.track('Mark as Development Device', {category:gaCategory});
            }
        
        };


        const confirmFlash = async function() {
            setSetupStep('setupStepConfirm');

            setupOptions = {}; 


            const hasEthernetRowElem = $(thisElem).find('.hasEthernetRow');

            // Setup mode
            const setupNoClaimElem = $(thisElem).find('.setupNoClaim');
            const setupForceClaimRowElem = $(thisElem).find('.setupForceClaimRow');
            const setupForceClaimElem = $(thisElem).find('.setupForceClaim');
            const setupModeSettingsElem = $(thisElem).find('.setupModeSettings');
            const setupAddDeviceToProductDiv = $(thisElem).find('.setupAddDeviceToProductDiv');
            const setupAddToProductElem = $(setupModeSettingsElem).find('.setupAddToProduct');
            const setupAddToProductSelectorElem = $(setupModeSettingsElem).find('.setupAddToProductSelector');
            const setupSimSelectionRowElem = $(setupModeSettingsElem).find('.setupSimSelectionRow');
            const productSelectElem = $(setupModeSettingsElem).find('.apiHelperProductSelect');
            const setupDevelopmentDeviceRowElem = $(setupModeSettingsElem).find('.setupDevelopmentDeviceRow');
            const setupDevelopmentDeviceElem = $(setupModeSettingsElem).find('.setupDevelopmentDevice');
            const setupForceVersionElem = $(setupModeSettingsElem).find('.setupForceVersion');
            const setupDeviceOsVersionElem = $(setupModeSettingsElem).find('.setupDeviceOsVersion');
            const setupDeviceButtonElem = $('.setupSetupDeviceButton');
            const userFirmwareUrlElem = $('.apiHelperUsbRestoreDeviceUrl');
            const setupUseEthernetElem = $(thisElem).find('.setupUseEthernet');

            // Tracker setup
            const trackerProductSettingsElem = $(thisElem).find('.trackerProductSettings');
            const trackerSetupAddToProductSelectorElem = $(trackerProductSettingsElem).find('.trackerSetupAddToProductSelector');
            const trackerProductNamedElem = $(trackerProductSettingsElem).find('.trackerProductNamed');
            const trackerProductNameElem = $(trackerProductSettingsElem).find('.trackerProductName');
            const trackerProductSelectElem = $(trackerProductSettingsElem).find('.apiHelperProductSelect');
            const trackerSetupDevelopmentDeviceElem = $(trackerProductSettingsElem).find('.trackerSetupDevelopmentDevice');
            const trackerSetupNoClaimElem = $(trackerProductSettingsElem).find('.trackerSetupNoClaim');

            // Restore mode
            const modeSelectElem = $(thisElem).find('.apiHelperUsbRestoreDeviceModeSelect');
            const tinkerOptionElem = $(modeSelectElem).find('option[value="tinker"]');
            const setupBitTrElem =  $(thisElem).find('.apiHelperUsbRestoreSetupBitTr');
            const setupBitSelectElem = $(thisElem).find('.apiHelperUsbRestoreDeviceSetupBit');
            const trackerTrElem = $(thisElem).find('.apiHelperUsbRestoreTrackerTr');
            const shippingModeCheckboxElem = $(thisElem).find('.shippingModeCheckbox');
            const versionElem = $(thisElem).find('.apiHelperUsbRestoreDeviceVersion'); // 
            const uploadFileTrElem = $(thisElem).find('.apiHelperUsbRestoreDeviceFileTr');
            const enterUrlTrElem = $(thisElem).find('.apiHelperUsbRestoreDeviceUrlTr');
            const selectUserBinaryButtonElem = $(thisElem).find('.selectUserBinaryButton');
            const userBinaryFileSelectorElem = $(thisElem).find('#userBinaryFileSelector');
            const restoreDeviceVersionTrElem = $(thisElem).find('.apiHelperUsbRestoreDeviceVersionTr');
            const updateNcpCheckboxTrElem = $(thisElem).find('.updateNcpCheckboxTr');
            const updateNcpCheckboxElem = $(thisElem).find('.updateNcpCheckbox');
            const forceUpdateElem = $(thisElem).find('.forceUpdate');
            const trackerMonitorSelectorRowElem = $(thisElem).find('.trackerMonitorSelectorRow');
            const trackerMonitorRadioElem = $(thisElem).find('.trackerMonitorRadio');
            const trackerMonitorTrackerElem = $(thisElem).find('.trackerMonitorTracker');
            const trackerMonitorMonitorElem = $(thisElem).find('.trackerMonitorMonitor');
            const edgeVersionElem = $(thisElem).find('.apiHelperUsbRestoreEdgeVersion');
            const edgeVersionSelectorRowElem = $(thisElem).find('.edgeVersionSelectorRow');
            
            // Doctor mode and cloud mode
            const doctorModeSettingsElem = $(thisElem).find('.doctorModeSettings');
            const doctorUseEthernetElem = $(thisElem).find('.doctorUseEthernet');
            const doctorSetKeepAliveCheckboxElem = $(thisElem).find('.doctorSetKeepAliveCheckbox');
            const doctorKeepAliveInputElem = $(thisElem).find('.doctorKeepAliveInput');
            const doctorForceVersionElem = $(thisElem).find('.doctorForceVersion');
            const doctorDeviceOsVersionElem = $(thisElem).find('.doctorDeviceOsVersion');
            const hasWiFiRowElem = $(thisElem).find('.hasWiFiRow');
            const hasAntennaRowElem = $(thisElem).find('.hasAntennaRow');
            const doctorDeviceWiFiAntennaElem = $(thisElem).find('.doctorDeviceWiFiAntenna');

            // Product mode
            const productModeTableBodyElem = $(thisElem).find('.productModeTableBody');

            const trackerEdgeVersionsResp = await fetch('/assets/files/tracker/trackerEdgeVersions.json');
            const trackerEdgeVersions = JSON.parse(await trackerEdgeVersionsResp.text()); 

            const monitorEdgeVersionsResp = await fetch('/assets/files/tracker/monitorEdgeVersions.json');
            const monitorEdgeVersions = JSON.parse(await monitorEdgeVersionsResp.text()); 


            $('.apiHelperProductDestination').each(function() {
                $(this).data('filterPlatformId', deviceInfo.platformId);
                $(this).data('updateProductList')();    
            });


            const showHideSetupBitSelection = function() {
                let show = false;

                if (deviceInfo.platformVersionInfo.gen == 3) {
                    let versionElemForMode;
                    switch(mode) {
                        case 'doctor':
                        case 'cloud':
                        case 'product':
                            versionElemForMode = doctorDeviceOsVersionElem;
                            break;

                        case 'restore':
                            versionElemForMode = versionElem;
                            break;

                        case 'setup':
                            versionElemForMode = setupDeviceOsVersionElem;
                            break;
                    }
                    if (versionElemForMode) {
                        const verObj = apiHelper.parseVersionStr($(versionElemForMode).val());
                        if (verObj && verObj.major < 4) {
                            show = true;
                        }
                    }
                }

                if (show && mode != 'cloud') {
                    $(setupBitTrElem).show();
                }
                else {
                    $(setupBitSelectElem).val('unchanged');
                    $(setupBitTrElem).hide();
                }    
            };
            
            const updateTrackerMonitorDeviceOsVersions = function() {
                const isTrackerOne = $(trackerMonitorTrackerElem).prop('checked');
            
                const edgeVersions = isTrackerOne ? trackerEdgeVersions : monitorEdgeVersions;

                const versionName = $(edgeVersionElem).val();
                const edgeVersionObj = edgeVersions.versions.find(e => e.v == versionName);

                $(versionElem).empty();
                for(let ver of deviceInfo.platformVersionInfo.versionArray) {
                    const cmp = apiHelper.versionSort(edgeVersionObj.target, ver);
                    if (cmp < 0) {
                        break;
                    }
                    const optionElem = document.createElement('option');
                    $(optionElem).attr('name', ver);
                    $(optionElem).text(ver);
                    if (cmp == 0) {
                        $(optionElem).attr('selected', 'selected');
                    }

                    versionElem.append(optionElem);
                }
                showHideSetupBitSelection();
            }

            $(edgeVersionElem).on('change', updateTrackerMonitorDeviceOsVersions);

            const updateTrackerMonitorVersions = function() {
                const isTrackerOne = $(trackerMonitorTrackerElem).prop('checked');
            
                const edgeVersions = isTrackerOne ? trackerEdgeVersions : monitorEdgeVersions;
                $(edgeVersionElem).empty();
                for(const v of edgeVersions.versions) {
                    const optionElem = document.createElement('option');
                    $(optionElem).text(v.title + ' (targets Device OS ' + v.target + ')');
                    $(optionElem).attr('value', v.v);
                    $(edgeVersionElem).append(optionElem);
                }

                updateTrackerMonitorDeviceOsVersions();
            }


            $(trackerMonitorRadioElem).each(function() {
                // Used in Device Restore mode
                const thisElem = $(this);
                $(thisElem).on('click', function() {
                    $(trackerMonitorRadioElem).prop('checked', false);
                    $(thisElem).prop('checked', true);

                    updateTrackerMonitorVersions();
                });
            });
    

            const checkButtonEnable = function() {
                let enableButton = true;

                if (mode == 'restore') {
                    switch($(modeSelectElem).val()) {
                        case 'upload':
                            $(restoreDeviceVersionTrElem).hide();
                            $(edgeVersionSelectorRowElem).hide();
                            enableButton = !!restoreFirmwareBinary;
                            break;

                        case 'url':
                            $(restoreDeviceVersionTrElem).hide();
                            $(edgeVersionSelectorRowElem).hide();
                            enableButton = $(userFirmwareUrlElem).val().trim() != '';
                            break;

                        default:
                            $(restoreDeviceVersionTrElem).show();
                            if (deviceInfo.platformVersionInfo.isTracker) {
                                $(edgeVersionSelectorRowElem).show();
                            }
                            else {
                                $(edgeVersionSelectorRowElem).hide();
                            }
                            break;
                    }

                    if (deviceInfo.platformVersionInfo.hasNCP) {
                        const forceUpdate = $(forceUpdateElem).prop('checked');
                        if (forceUpdate) {
                            $(updateNcpCheckboxTrElem).show();
                        }
                        else {
                            if (!deviceModuleInfo) {
                                $(updateNcpCheckboxTrElem).show();
                            }
                            else {
                                $(updateNcpCheckboxTrElem).hide();
                            }
                        }
                    }
                }
                else
                if (mode == 'setup') {

                }
                $(setupDeviceButtonElem).prop('disabled', !enableButton);
            };
            checkButtonEnable();

            let minSysVer;

            if (mode == 'product') {
                userFirmwareBinary = productData.productFirmwareBinary;    

                const userFirmwareModuleInfo = parseBinaryModuleInfo(userFirmwareBinary);
                minSysVer = userFirmwareModuleInfo.depModuleVersion;

                renderSimpleTable({
                    elem: productModeTableBodyElem,
                    data: [
                        ['Device ID', productData.deviceId],
                        ['Device Name', productData.deviceData.name],
                        ['Product ID', productData.productId],
                        ['Product Name', productData.productInfo.name],
                        ['Firmware Release Name', productData.productFirmwareInfo.title],
                        ['Product Firmware Version', productData.productFirmwareVersion],
                        ['Device OS Version', apiHelper.systemVersionToSemVer(minSysVer)],
                    ],
                })
            }
            else
            if (mode == 'doctor' || mode == 'setup' || mode == 'cloud') {
                // In setup and doctor mode, minimum system version is the version the doctor/setup firmware was 
                // compiled with
                const resp = await fetch('/assets/files/docs-usb-setup-firmware/' + deviceInfo.platformVersionInfo.name + '.bin');
                userFirmwareBinary = await resp.arrayBuffer();    

                const userFirmwareModuleInfo = parseBinaryModuleInfo(userFirmwareBinary);
                minSysVer = userFirmwareModuleInfo.depModuleVersion;
            }
            else {
                minSysVer = apiHelper.semVerToSystemVersion(minimumDeviceOsVersion);
            }
            deviceInfo.targetVersion = apiHelper.systemVersionToSemVer(minSysVer);
            // console.log('minSysVer=' + minSysVer, deviceInfo.targetVersion);

            for(const ver of deviceInfo.platformVersionInfo.versionArray) {
                if (apiHelper.semVerToSystemVersion(ver) >= minSysVer) {
                    const optionElem = document.createElement('option');
                    $(optionElem).attr('value', ver);
                    $(optionElem).text(ver);
                    if (ver == deviceInfo.targetVersion) {
                        $(optionElem).attr('selected', 'selected');
                    }

                    $(setupDeviceOsVersionElem).append(optionElem);
                    $(doctorDeviceOsVersionElem).append(optionElem.cloneNode(true));
                }
            }

            if (deviceInfo.platformVersionInfo.gen == 2) {
                // No Ethernet option on Gen 2
                $(hasEthernetRowElem).hide();
            }

            if (deviceInfo.platformVersionInfo.wifi && deviceInfo.platformVersionInfo.cellular) {
                // M SoM
                $(hasWiFiRowElem).show();
            }
            else {
                $(hasWiFiRowElem).hide();
            }

            if (deviceInfo.platformVersionInfo.wifiSelectAntenna) {
                $(hasAntennaRowElem).show();
            }
            else {
                $(hasAntennaRowElem).hide();
            }


            if (mode == 'doctor' || mode == 'cloud' || mode == 'product') {
                $(doctorDeviceOsVersionElem).on('change', showHideSetupBitSelection);    
            }
            else
            if (mode == 'restore') {                

                if (deviceInfo.platformVersionInfo.isTracker) {
                    $(trackerMonitorSelectorRowElem).show();

                    $(modeSelectElem).find('option[value="tinker"]').text('Edge (Factory Default)');
                    $(trackerTrElem).show();

                    updateTrackerMonitorVersions();
                }
                else {
                    $(trackerMonitorSelectorRowElem).hide();
                    $(edgeVersionSelectorRowElem).hide();

                    $(modeSelectElem).find('option[value="tinker"]').text('Tinker (Factory Default)');
                    $(trackerTrElem).hide();

                    const lastVersion = $(versionElem).val();
                    $(versionElem).empty();
                    let firstRelease;
                    for(let ver of deviceInfo.platformVersionInfo.versionArray) {
                        versionElem.append('<option name="' + ver + '">' + ver + '</option>');
                        if (!firstRelease && !ver.includes('alpha') && !ver.includes('beta') && !ver.includes('rc') & !ver.startsWith('6.')) {
                            firstRelease = ver;
                        }
                    }
                    if (lastVersion && !lastVersion.startsWith('Select')) {
                        $(versionElem).val(lastVersion);
                    }
                    else if (firstRelease) {
                        $(versionElem).val(firstRelease);
                    }    
                }                
                $(versionElem).on('change', showHideSetupBitSelection);

                $(selectUserBinaryButtonElem).on('click', function() {
                    $(userBinaryFileSelectorElem).trigger('click');
                });
                $(userBinaryFileSelectorElem).on('change', function(event) {
                    if (this.files.length == 1) {
                        const file = this.files[0];
                        
                        let fileReader = new FileReader();
                        fileReader.onload = async function() {
                            restoreFirmwareBinary = fileReader.result;
                            checkButtonEnable();
                        };
                        fileReader.readAsArrayBuffer(file);
                    
                    }
                });

                $(modeSelectElem).on('change', function() {
                    const userFirmwareMode = $(modeSelectElem).val();

                    $(uploadFileTrElem).hide();
                    $(enterUrlTrElem).hide();

                    switch(userFirmwareMode) {
                        case 'tinker':
                            break;
                        case 'upload':
                            $(uploadFileTrElem).show();
                            break;

                        case 'url':
                            $(enterUrlTrElem).show();
                            break;
                    }
                    checkButtonEnable();
                });



                $(userFirmwareUrlElem).on('input', checkButtonEnable);
            }
            else
            if (mode == 'setup') {
                // Setup mode
                $(setupDeviceOsVersionElem).on('change', showHideSetupBitSelection);

                if (deviceInfo.platformVersionInfo.isTracker) {
                    // Tracker setup mode
                    $(trackerProductSettingsElem).show();
                    $(setupModeSettingsElem).hide();

                    $(trackerProductSettingsElem).find('input[name=trackerProductType][value=new]').on('click', function() {
                        $(trackerSetupAddToProductSelectorElem).hide();
                        $(trackerProductNamedElem).show();
                        $(trackerProductNameElem).show();
                    });
                    $(trackerProductSettingsElem).find('input[name=trackerProductType][value=existing]').on('click', function() {
                        $(trackerSetupAddToProductSelectorElem).show();
                        $(trackerProductNamedElem).hide();
                        $(trackerProductNameElem).hide();
                    });

                    $(trackerSetupDevelopmentDeviceElem).on('click', function() {
                        const devDevice = $(trackerSetupDevelopmentDeviceElem).prop('checked');
                        if (devDevice) {
                            $(trackerSetupNoClaimElem).prop('checked', false);
                            $(trackerSetupNoClaimElem).parents('p').hide();
                        }
                        else {
                            $(trackerSetupNoClaimElem).parents('p').show();
                        }
                    });

                }
                else {
                    // Non-tracker setup mode
                    $(trackerProductSettingsElem).hide();
                    $(setupModeSettingsElem).show();

                    if (deviceInfo.wifi) {
                        $(setupForceClaimRowElem).show();
                    }

                    $(setupForceClaimElem).on('click', function() {
                        const forceClaim = $(setupForceClaimElem).prop('checked');
                        if (forceClaim) {
                            $(setupAddDeviceToProductDiv).hide();
                            $(setupAddToProductElem).prop('checked', false);
                        }
                        else {
                            $(setupAddDeviceToProductDiv).show();
                        }
                    });

                    $(setupNoClaimElem).on('click', function() {
                        const noClaim = $(setupNoClaimElem).prop('checked');
                        if (noClaim) {
                            $(setupForceClaimElem).prop('checked', false);
                            $(setupForceClaimRowElem).hide();
                        }
                        else {
                            $(setupForceClaimRowElem).show();
                        }
                    });

                    $(setupAddToProductElem).on('click', function() {
                        setupOptions.addToProduct = $(setupAddToProductElem).prop('checked');
                        if (setupOptions.addToProduct) {
                            $(setupAddToProductSelectorElem).show();
                            $(setupDevelopmentDeviceRowElem).show()
                        }
                        else {
                            $(setupAddToProductSelectorElem).hide();
                            $(setupDevelopmentDeviceRowElem).hide();
                        }
                    });
        
                    $(productSelectElem).on('change', function() {
                        // Product changed                
                        console.log('product change ' + $(productSelectElem).val());
                    });
        
                }

            }

            showHideSetupBitSelection();


            const showSimSelectionOption = (deviceInfo.platformId == 13);

            if (showSimSelectionOption) { 
                // Boron
                $(setupSimSelectionRowElem).show();
            }
            else {
                $(setupSimSelectionRowElem).hide();
            }

            $(doctorUseEthernetElem).on('click', function() {
                if ($(doctorUseEthernetElem).prop('checked')) {
                    if (!$(doctorSetKeepAliveCheckboxElem).prop('checked')) {
                        $(doctorSetKeepAliveCheckboxElem).prop('checked', true);
                    }
                }
            });


            $(forceUpdateElem).on('click', checkButtonEnable);

            $(setupDeviceOsVersionElem).on('change', function() {
                $(setupForceVersionElem).prop('checked', true);
            });

            $(doctorDeviceOsVersionElem).on('change', function() {
                $(doctorForceVersionElem).prop('checked', true);
            });



            $(setupDeviceButtonElem).on('click', async function() {
                analytics.track('Confirmed Flash', {category:gaCategory});
                
                const userFirmwareMode = $(modeSelectElem).val();
                if (userFirmwareMode == 'url' || userFirmwareMode == 'customUrl') {
                    setStatus('Confirming...');
                    const msg = 'This restore will use a custom binary downloaded from an external server. ' + 
                        'Make sure that it is from a reputable author and stored on a secure server. '
                    if (!confirm(msg)) {
                        analytics.track('Rejected using custom binary', {category:gaCategory});
                        setStatus('Restore canceled');
                        setSetupStep('setupStepStartOver');
                        return;
                    } 
                    flashDeviceOptions.downloadUrl = $(userFirmwareUrlElem).val().trim();
                }
                

                if (mode == 'restore') {
                    if (deviceInfo.platformVersionInfo.isTracker) {
                        // restoreFirmwareBinary
                        const isTrackerOne = $(trackerMonitorTrackerElem).prop('checked');
            
                        let standardEdge = false;
                        switch($(modeSelectElem).val()) {
                            case 'upload':
                            case 'url':
                                break;
    
                            default:
                                standardEdge = true;
                                break;
                        }

                        if (standardEdge) {
                            const edgeVersions = isTrackerOne ? trackerEdgeVersions : monitorEdgeVersions;
        
                            const versionName = $(edgeVersionElem).val();
                            const edgeVersionObj = edgeVersions.versions.find(e => e.v == versionName);
                            
                            const resp = await fetch('/assets/files/tracker/' + edgeVersionObj.bin);
                            userFirmwareBinary = await resp.arrayBuffer();        

                            console.log('using standardEdge', {
                                edgeVersionObj,
                                userFirmwareBinary,
                            });
                        }
                    }

                    deviceInfo.targetVersion = $(versionElem).val();
                    flashDeviceOptions.setupBit = $(setupBitSelectElem).val();
                    flashDeviceOptions.shippingMode = $(shippingModeCheckboxElem).prop('checked');
                    flashDeviceOptions.forceUpdate = $(forceUpdateElem).prop('checked');

                    if (deviceInfo.platformVersionInfo.hasNCP) {    
                        if (!deviceModuleInfo || flashDeviceOptions.forceUpdate) {
                            flashDeviceOptions.updateNcp = $(updateNcpCheckboxElem).prop('checked');
                        }
                    }
                    if (flashDeviceOptions.forceUpdate) {
                        analytics.track('Restore Force Update', {category:gaCategory});
                    }
                    if (flashDeviceOptions.shippingMode) {
                        analytics.track('Restore Shipping Mode', {category:gaCategory});
                    }

                }
                else
                if (mode == 'setup') {
                    // mode == setup 

                    if (deviceInfo.platformVersionInfo.isTracker) {
                        if ($(trackerProductSettingsElem).find('input[name=trackerProductType][value=new]').prop('checked')) {
                            // Create a new product

                            const result = await new Promise(function(resolve, reject) {      
                                const requestObj = {
                                    product: {
                                        name: $(trackerProductNameElem).val(),
                                        platform_id: deviceInfo.platformId,
                                    },
                                }
                                
                                const request = {
                                    contentType: 'application/json',
                                    data: JSON.stringify(requestObj),
                                    dataType: 'json',
                                    error: function (jqXHR) {
                                        console.log('error', jqXHR);
                                        reject(jqXHR.status);
                                    },
                                    headers: {
                                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                        'Accept': 'application/json',
                                        'X-Particle-Tool': 'particle-docs',
                                    },
                                    method: 'POST',
                                    success: function (resp, textStatus, jqXHR) {
                                        resolve(resp);
                                    },
                                    url: 'https://api.particle.io/v1/user/products/'
                                };
                    
                                $.ajax(request);            
                            });

                            if (result.ok) {
                                analytics.track('Create Product', {category:gaCategory, label:'Success'});    
                            }
                            else {
                                // TODO: Handle error here
                                analytics.track('Create Product', {category:gaCategory, label:'Failed'});
                            }
        

                            // result.ok
                            // result.product .id, .platform_id, .name, .slug, .description, ...
                            setupOptions.productId = result.product.id;
                        }
                        else {
                            setupOptions.productId = $(trackerProductSelectElem).val();
                            analytics.track('Add Tracker To Existing Product', {category:gaCategory});    
                        }
                        setupOptions.addToProduct = true;
                        setupOptions.noClaim = $(trackerSetupNoClaimElem).prop('checked');
                        setupOptions.developmentDevice = $(trackerSetupDevelopmentDeviceElem).prop('checked');
                    }
                    else {
                        // Not tracker
                        setupOptions.noClaim = $(setupNoClaimElem).prop('checked');
                        setupOptions.developmentDevice = $(setupDevelopmentDeviceElem).prop('checked');

                        if ($(setupForceClaimElem).prop('checked')) {
                            // Get a claim code
                            const result = await new Promise(function(resolve, reject) {      
                                const requestObj = {
                                }
                                
                                const request = {
                                    contentType: 'application/json',
                                    data: JSON.stringify(requestObj),
                                    dataType: 'json',
                                    error: function (jqXHR) {
                                        console.log('error', jqXHR);
                                        reject(jqXHR.status);
                                    },
                                    headers: {
                                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                        'Accept': 'application/json',
                                        'X-Particle-Tool': 'particle-docs',
                                    },
                                    method: 'POST',
                                    success: function (resp, textStatus, jqXHR) {
                                        resolve(resp);
                                    },
                                    url: 'https://api.particle.io/v1/device_claims/'
                                };
                    
                                $.ajax(request);            
                            });
                            setupOptions.claimCode = flashDeviceOptions.claimCode = result.claim_code;
                        }
    
                        setupOptions.productId = $(productSelectElem).val();
                        if (showSimSelectionOption) {
                            setupOptions.simSelection = parseInt($(thisElem).find('.setupSimSelect').val());
                        }                            
                    
                    }

                    if ($(setupForceVersionElem).prop('checked')) {
                        deviceInfo.targetVersion = $(setupDeviceOsVersionElem).val();
                        analytics.track('Setup using set version', {category:gaCategory, label:deviceInfo.targetVersion});    
                    }

                    setupOptions.ethernet = $(setupUseEthernetElem).prop('checked');

                    apiHelper.setCommonDevice(deviceInfo.deviceId);

                    flashDeviceOptions.setupBit = 'done';
                }
                else {
                    // mode == doctor || mode == cloud || mode == product
                    setupOptions.ethernet = $(doctorUseEthernetElem).prop('checked');

                    if ($(doctorForceVersionElem).prop('checked')) {
                        deviceInfo.targetVersion = $(doctorDeviceOsVersionElem).val();
                        analytics.track('Doctor using set version', {category:gaCategory, label:deviceInfo.targetVersion});    
                    }

                    if (setupOptions.ethernet) {
                        analytics.track('Doctor using Ethernet', {category:gaCategory});    
                    }

                    if ($(doctorSetKeepAliveCheckboxElem).prop('checked')) {
                        setupOptions.keepAlive = parseInt($(doctorKeepAliveInputElem).val());
                    }

                    if (deviceInfo.platformVersionInfo.wifiSelectAntenna) {
                        setupOptions.wifiSelectAntenna = parseInt($(doctorDeviceWiFiAntennaElem).val());
                        if (setupOptions.wifiSelectAntenna != 255) {
                            analytics.track('Doctor setting antenna', {category:gaCategory, label:setupOptions.wifiSelectAntenna});
                        }
                    }
                    
                    apiHelper.setCommonDevice(deviceInfo.deviceId);

                    flashDeviceOptions.setupBit = 'done';
                }

                hideDeviceFirmwareInfo();
                    
                if (mode == 'doctor') { // Not done for cloud or product
                    checkOwnership();
                }

                if (setupOptions.addToProduct) {
                    await addToProduct();
                }

                // This is used for both setup device and device doctor
                flashDeviceOptions.mode = mode;

                await flashDevice();

                if (deviceInfo.platformVersionInfo.isRTL872x && ((mode == 'doctor') || (mode == 'setup') || (mode == 'restore'))) {
                    reqObj = {
                        op: 'disableFeature',
                        feature: 9, // FEATURE_DISABLE_LISTENING_MODE
                    } 
                    const res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                }

                if (mode == 'product') {
                    setSetupStep('setupStepProductDone');
                    analytics.track('Product flash complete', {category:gaCategory});    
                }
                else
                if (mode == 'cloud') {
                    setSetupStep('setupStepCloudDone');
                    analytics.track('Cloud Debug flash complete', {category:gaCategory});    
                }
                else
                if (mode == 'doctor' || mode == 'setup') {
                    showInfoTable();
                    setInfoTableItem('deviceId', deviceInfo.deviceId);

                    if (typeof setupOptions.wifiSelectAntenna != 'undefined' && setupOptions.wifiSelectAntenna != 255) {
                        reqObj = {
                            op: 'wifiSelectAntenna',
                            ant: setupOptions.wifiSelectAntenna,
                        };
                        await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                    }

                    if (setupOptions.ethernet) {
                        reqObj = {
                            op: 'connect',
                        };
                        await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
        
                        waitDeviceOnline();        
                    }
                    else
                    if (deviceInfo.wifi && !deviceInfo.platformVersionInfo.cellular) {
                        configureWiFi();                              
                    }
                    else {
                        activateSim();
                    }    
                }
                else {

                    // Restore
                    if (flashDeviceOptions.shippingMode) {
                        setSetupStep('setupStepShippingMode');
                        if (usbDevice) {                
                            const reqObj = {
                                cmd: 'enter_shipping'
                            };
                            await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));    
                        }
                        else {
                            setStatus('Failed to reconnect to device to enter shipping mode');
                        }

                    }
                    else {
                        setSetupStep('setupStepDeviceRestoreDone');
                    }

                }
            });

        }


        const configureWiFi = async function() {
            if (!deviceInfo.wifi) {
                waitDeviceOnline();
                return;
            }
            setSetupStep('setupStepConfigureWiFi');


            $(thisElem).find('.networkTable > tbody').html('');

            $(thisElem).find('.searchingWiFi').css('visibility', 'visible');

            $(thisElem).find('.scanAgain').prop('disabled', true);

            $(thisElem).find('.useExisting').on('click', async function() {

                setSetupStep('setupStepWaitForOnline');
                reqObj = {
                    op: 'connect',
                };
                await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                waitDeviceOnline();
            });
            analytics.track('Started Wi-Fi Scan', {category:gaCategory});    



            const wifiHiddenSsidDivElem = $(thisElem).find('.wifiHiddenSsidDiv');
            const wifiHiddenSsidWarningDivElem = $(thisElem).find('.wifiHiddenSsidWarningDiv');
            const wifiHiddenSsidCheckboxElem = $(thisElem).find('.wifiHiddenSsidCheckbox');
            const wifiHiddenSsidTextElem = $(thisElem).find('.wifiHiddenSsidText');
            const wifiSecurityTypeSelectElem =$(thisElem).find('.wifiSecurityTypeSelect');
            const wifiSecurityTypeNormalRowElem =$(thisElem).find('.wifiSecurityTypeNormalRow');
            const wifiSecurityTypeHiddenSsidRowElem =$(thisElem).find('.wifiSecurityTypeHiddenSsidRow');

            const wifiSettingsTableElem = $(thisElem).find('.wifiSettingsTable');
            const wifiSecurityTypeElem = $(thisElem).find('.wifiSecurityType');
            const passwordInputElem = $(thisElem).find('.passwordInput');
            const setCredentialsElem = $(thisElem).find('.setCredentials');
            const passwordRowElem = $(thisElem).find('.passwordRow');
            const eapTypeRowElem = $(thisElem).find('.eapTypeRow');
            const eapSelectElem = $(thisElem).find('.eapSelect');
            const wifiUsernameRowElem = $(thisElem).find('.wifiUsernameRow');
            const wifiUsernameElem = $(thisElem).find('.wifiUsername');
            const outerIdentityRowElem = $(thisElem).find('.outerIdentityRow');
            const outerIdentityElem = $(thisElem).find('.outerIdentity');
            const caCertRowElem = $(thisElem).find('.caCertRow');
            const caCertElem = $(thisElem).find('.caCert');
            const privateKeyRowElem = $(thisElem).find('.privateKeyRow');
            const privateKeyElem = $(thisElem).find('.privateKey');
            const clientCertRowElem = $(thisElem).find('.clientCertRow');
            const clientCertElem = $(thisElem).find('.clientCert');

            // </tr>const Elem =$(thisElem).find('.');

            let sortedNetworks = [];

            const eapSelectUpdate = function() {
                const eapMode = parseInt($(eapSelectElem).val());

                if (eapMode == 0) {
                    // PEAP/MSCHAPv2
                    $(wifiUsernameRowElem).show();
                    $(passwordRowElem).show();
                }
                else
                if (eapMode == 1) {
                    // EAP-TLS
                    $(wifiUsernameRowElem).hide();
                    $(passwordRowElem).hide();
                    $(privateKeyRowElem).show();
                    $(clientCertRowElem).show();
                }
            }

            const getSelectedNetwork = function() {
                let res = {};

                res.isHiddenSsid = $(wifiHiddenSsidDivElem).is(':visible') && $(wifiHiddenSsidCheckboxElem).prop('checked');
                if (res.isHiddenSsid) {
                    res.ssid = $(wifiHiddenSsidTextElem).val().trim();
                    res.sec = parseInt($(wifiSecurityTypeSelectElem).val());

                    $(wifiSecurityTypeNormalRowElem).hide();
                    $(wifiSecurityTypeHiddenSsidRowElem).show();
                }
                else {
                    $(wifiSecurityTypeNormalRowElem).show();
                    $(wifiSecurityTypeHiddenSsidRowElem).hide();
                }

                if (typeof sec == 'undefined') {
                    const checkedItems = $('input[name="selectedNetwork"]:checked');
                    if (checkedItems.length > 0) {
                        res.ssid = $(checkedItems).val();
                        const wifiNetworkInfo = sortedNetworks.find(e => e.ssid == res.ssid);
                        if (wifiNetworkInfo) {
                            res.sec = wifiNetworkInfo.sec;
                            res.cip = wifiNetworkInfo.cip;
                        }
                    }    
                }

                return res;
            }

            const radioSelectionUpdate = function() {
                const selectedNet = getSelectedNetwork();
                
                if (selectedNet.ssid) {
                    $(wifiSettingsTableElem).show();

                    // sec values (WLanSecurityType):
                    // WLAN_SEC_UNSEC = 0,
                    // WLAN_SEC_WEP = 1,
                    // WLAN_SEC_WPA = 2,
                    // WLAN_SEC_WPA2 = 3,
                    // WLAN_SEC_WPA_ENTERPRISE = 4,
                    // WLAN_SEC_WPA2_ENTERPRISE = 5,
                    const secNames = [ 'Unsecured', 'WEP', 'WPA', 'WPA2', 'WPA Enterprise', 'WPA2 Enterprise'];
                    $(wifiSecurityTypeElem).text(secNames[selectedNet.sec]);

                    $(eapTypeRowElem).hide();
                    $(passwordRowElem).hide();
                    $(wifiUsernameRowElem).hide();
                    $(outerIdentityRowElem).hide();
                    $(caCertRowElem).hide();
                    $(privateKeyRowElem).hide();
                    $(clientCertRowElem).hide();

                    if (selectedNet.sec == 0) {
                        // Unsecured
                    }
                    else
                    if (selectedNet.sec >= 1 && selectedNet.sec <= 3) {
                        // WEP, WPA, WPA2
                        setStatus('Enter Wi-Fi network password and click Select Wi-Fi Network');
                        $(passwordRowElem).show();

                        if (!selectedNet.isHiddenSsid) {
                            // Don't do this for hidden SSID because it makes it impossible to type the hidden SSID name
                            $(passwordInputElem).focus();
                            $(passwordInputElem).select();                
                        }
                    }
                    else
                    if (selectedNet.sec >= 4 && selectedNet.sec <= 5) {
                        // Enterprise
                        $(eapTypeRowElem).show();
                        eapSelectUpdate();

                        $(outerIdentityRowElem).show();
                        $(caCertRowElem).show();
    
                    }
                    else {
                        setStatus('Click Select Wi-Fi Network');
                    }

                    
                    $(setCredentialsElem).prop('disabled', false);
                }
                else {
                    $(wifiSettingsTableElem).hide();
                    $(setCredentialsElem).prop('disabled', true);
                }
            };

            
            const wifiNetworksUpdate = function() {
                $(thisElem).find('.networkTable > tbody').empty();
                
                for(let ii = 0; ii < sortedNetworks.length; ii++) {
                    const respObj = sortedNetworks[ii];

                    let bars = 0;
                    if (respObj.rssi >= -60) {
                        bars = 4;
                    }
                    else    
                    if (respObj.rssi >= -70) {
                        bars = 3;
                    }
                    else
                    if (respObj.rssi >= -80) {
                        bars = 2;
                    }
                    else {
                        bars = 1;
                    }
    
                    const rowElem = sortedNetworks[ii].rowElem = document.createElement('tr');
    
                    let colElem;
                    let radioElem;
    
                    // Radio button
                    colElem = document.createElement('td');
                    {
                        radioElem = sortedNetworks[ii].radioElem = document.createElement('input');
                        $(radioElem).attr('type', 'radio');
                        $(radioElem).attr('name', 'selectedNetwork');
                        $(radioElem).attr('value', respObj.ssid);
                        $(colElem).append(radioElem);
    
                        $(radioElem).on('click', radioSelectionUpdate);
                    }
                    $(rowElem).append(colElem);
    
                    // SSID
                    colElem = document.createElement('td');
                    $(colElem).text(respObj.ssid);
                    $(rowElem).append(colElem);
    
                    // Secure
                    colElem = document.createElement('td');
                    if (respObj.sec != 0) {
                        // 56x68
                        const imgElem = document.createElement('img');
                        $(imgElem).attr('src', '/assets/images/device-setup/wifi-lock.png');
                        $(imgElem).css('width', '15px');
                        $(imgElem).css('height', '17px');
                        $(imgElem).css('margin', '2px');
                        $(colElem).append(imgElem);
                    }
                    $(rowElem).append(colElem);
    
                    // Strength
                    colElem = document.createElement('td');
                    {
                        // 86x68
                        const imgElem = document.createElement('img');
                        $(imgElem).attr('src', '/assets/images/device-setup/signal-bars-' + bars + '.png');
                        $(imgElem).css('width', '22px');
                        $(imgElem).css('height', '17px');
                        $(imgElem).css('margin', '2px');
                        $(colElem).append(imgElem);    
                    }
                    $(rowElem).append(colElem);
                    
                    $(thisElem).find('.networkTable > tbody').append(rowElem);
    
                }     

            }
            const wifiNetworksDone = function() {
                $(thisElem).find('.searchingWiFi').css('visibility', 'hidden');

                $(thisElem).find('.scanAgain').prop('disabled', false);

                analytics.track('Wi-Fi Scan Done', {category:gaCategory, label:sortedNetworks.length});

                if (sortedNetworks.length == 0) {
                    setSetupStep('setupStepNoWiFi');
                }
                else
                if (sortedNetworks.length == 1) {
                    const ssid = sortedNetworks[0].ssid;
                    $(sortedNetworks[0].radioElem).trigger('click');
                }

            }

            const updateWiFiOnDevice = async function() {
                let knownNetworks = [];

                const wifiExistingElem = $(thisElem).find('.wifiExisting');
                const wifiExistingListElem = $(thisElem).find('.wifiExistingList');
                const wifiExistingRemoveSelectedElem = $(thisElem).find('.wifiExistingRemoveSelected');
                const wifiExistingRemoveAllElem = $(thisElem).find('.wifiExistingRemoveAll');                                

                $(wifiExistingElem).hide();

                try {
                    const knownNetworksRes = await usbDevice.sendControlRequest(502); // CTRL_REQUEST_WIFI_GET_KNOWN_NETWORKS

                    if (knownNetworksRes.result == 0 && knownNetworksRes.data) {
                        /*
                        enum Security {
                            NO_SECURITY = 0;
                            WEP = 1;
                            WPA_PSK = 2;
                            WPA2_PSK = 3;
                            WPA_WPA2_PSK = 4;
                        }
                        enum CredentialsType {
                            NO_CREDENTIALS = 0;
                            PASSWORD = 1;
                        }

                        message GetKnownNetworksRequest {
                            option (type_id) = 502; // CTRL_REQUEST_WIFI_GET_KNOWN_NETWORKS
                        }

                        message GetKnownNetworksReply {
                            message Network {
                                string ssid = 1;
                                Security security = 2;
                                CredentialsType credentials_type = 3;
                            }

                            repeated Network networks = 1;
                        }
                        */
                        let protobuf = apiHelper.protobuf(knownNetworksRes.data);

                        const decodeNetwork = function(origTag) {
                            let network = {};

                            while(!origTag.isEnd()) {
                                result = protobuf.decodeTag();
                                switch(result.field) {
                                case 1: // string ssid = 1;
                                    network.ssid = protobuf.decodeString(result.value);                                      
                                    break;

                                case 2: // Security security = 2;
                                    network.security = result.value;
                                    break;
                                    
                                case 3: // CredentialsType credentials_type = 3;
                                    network.credentialsType = result.value;
                                    break;
                                }                                        
                            }
                            return network;
                        }
    
                        while(protobuf.offset < knownNetworksRes.data.byteLength) {
                            result = protobuf.decodeTag();
                    
                            // repeated Network networks = 1;
                            if (result.field != 1 || result.wireType != 2) {
                                break;
                            }
                            
                            result = decodeNetwork(result);
                            if (result.ssid) {
                                knownNetworks.push(result);
                            }
                        }

                        knownNetworks.sort(function(a, b) {
                            return a.ssid.localeCompare(b.ssid);
                        })


                        if (knownNetworks.length > 0) {
                            analytics.track('Wi-Fi Existing', {category:gaCategory, label:knownNetworks.length});

                            $(wifiExistingRemoveSelectedElem).prop('disabled', true);
                            $(wifiExistingElem).show();
                            $(wifiExistingListElem).empty();

                            for(const network of knownNetworks) {
                                const divElem = document.createElement('div');
                                $(divElem).css('padding', '3px 0px 3px 0px');

                                const labelElem = document.createElement('label');

                                const radioElem = document.createElement('input');
                                $(radioElem).attr('type', 'radio');
                                $(radioElem).attr('value', network.ssid);
                                $(radioElem).on('click', function() {
                                    $(wifiExistingListElem).find('input').prop('checked', false);
                                    $(radioElem).prop('checked', true);
                                    $(wifiExistingRemoveSelectedElem).prop('disabled', false);
                                });

                                $(labelElem).append(radioElem);

                                $(labelElem).append(document.createTextNode(network.ssid));

                                $(divElem).append(labelElem);

                                $(wifiExistingListElem).append(divElem);
                            }

                            $(wifiExistingRemoveSelectedElem).on('click', async function() {
                                const ssid = $(wifiExistingListElem).find('input:checked').val();
                                console.log('remove ssid ' + ssid);

                                /*
                                message RemoveKnownNetworkRequest {
                                option (type_id) = 503; // CTRL_REQUEST_WIFI_REMOVE_KNOWN_NETWORK
                                string ssid = 1;
                                }
                                */
                                const enc = apiHelper.protobufEncoder();
                                enc.appendTag(1, 2);
                                enc.appendString(ssid);

                                const res = await usbDevice.sendControlRequest(503, enc.toUint8Array()); // CTRL_REQUEST_WIFI_REMOVE_KNOWN_NETWORK
                                console.log('res', res);

                                analytics.track('Wi-Fi Remove Existing', {category:gaCategory});

                                updateWiFiOnDevice();
                            });
                            $(wifiExistingRemoveAllElem).on('click', async function() {
                                /*
                                message ClearKnownNetworksRequest {
                                option (type_id) = 504; // CTRL_REQUEST_WIFI_CLEAR_KNOWN_NETWORKS
                                }
                                */
                                const res = await usbDevice.sendControlRequest(504); // CTRL_REQUEST_WIFI_CLEAR_KNOWN_NETWORKS
                                // console.log('res', res);
                                // res.result == 0 on success

                                analytics.track('Wi-Fi Remove All', {category:gaCategory});

                                updateWiFiOnDevice();
                            });

                        }
                    }
                    else {
                        console.log('non-zero status getting known networks or no data', knownNetworksRes.result);
                    }
                }  
                catch(e) {
                    console.log('exception getting known networks', e);
                }
                    
            }


            // RTL872x allow use of hidden SSIDs on Device OS 5.5.0 and later BUT this does not currently work with control requests
            // Hidden SSIDs are supported on P1 and Photon 1, but not implemented here
            // Hidden SSIDs are not supported on Argon but this techique can be used to connect to a network while offline
            if (deviceModuleInfo) {
                const v = deviceModuleInfo.getSystemVersion();
                let showHiddenOptions = false;
                /*
                if (deviceInfo.platformVersionInfo.isRTL872x) {
                    if (v >= 5500) { // 5.5.0-rc.1 or later
                        showHiddenOptions = true;
                    }
                }
                */
                $(wifiHiddenSsidWarningDivElem).hide();

                if (deviceInfo.platformVersionInfo.isnRF52) {
                    // Configuring a network that's offline isn't working on nRF52 either, so this is turned
                    // off as well now. I tested it incorrectly and it looked like it was working, but it wasn't.
                    // showHiddenOptions = true;
                    // $(wifiHiddenSsidWarningDivElem).show();
                }

                if (showHiddenOptions) {
                    $(wifiHiddenSsidDivElem).show();
                    $(wifiHiddenSsidCheckboxElem).on('click', radioSelectionUpdate);
                    $(wifiHiddenSsidTextElem).on('input', radioSelectionUpdate);
                    $(wifiSecurityTypeSelectElem).on('change', radioSelectionUpdate);
                }
            }


            // Get list of known networks. Use Device OS control requests. This only works on Gen 3
            if (deviceInfo.platformVersionInfo.gen >= 3) {
                updateWiFiOnDevice();
            }

            // Start Wi-Fi scan
            if (mode == 'wifi') {
                // Use Device OS control requests for Wi-Fi scan

                const networkResults = await usbDevice.scanWifiNetworks();

                sortedNetworks = [];
                
                for(let networkObj of networkResults) {
                    // Convert enums back into numbers for compatibility with setup firmware
                    switch(networkObj.security) {
                        case 'NO_SECURITY':
                            networkObj.sec = 0;
                            break;

                        case 'WEP':
                            networkObj.sec = 1;
                            break;

                        case 'WPA_PSK':
                            networkObj.sec = 2;
                            break;

                        default:
                        case 'WPA_WPA2_PSK':
                        case 'WPA2_PSK':
                            networkObj.sec = 3;
                            break;

                    }


                    if (networkObj.ssid && networkObj.ssid.length > 0 && networkObj.bssid && networkObj.bssid.length > 0) {
                        let found = false;

                        for(let ii = 0; ii < sortedNetworks.length; ii++) {
                            if (sortedNetworks[ii].ssid == networkObj.ssid) {
                                if (networkObj.rssi > sortedNetworks[ii].rssi) {
                                    sortedNetworks[ii] = networkObj;    
                                }
                                found = true;
                            }
                        }
                        if (!found) {
                            sortedNetworks.push(networkObj);
                        }
                    }
                }

                sortedNetworks.sort(function(a, b) {
                    return a.ssid.localeCompare(b.ssid);
                })
                
                wifiNetworksUpdate();
                wifiNetworksDone();
        
            }
            else {
                // Use device setup firmware control requests for Wi-Fi scan
                let reqObj = {
                    op: 'wifiScan'
                };
    
                const res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                if (!res.status && res.data) {
                    const respObj = JSON.parse(res.data);
                    
                    if (respObj.hasCredentials) {
                        // Show option to use existing
                        $(thisElem).find('.showUseExisting').show();
                    }
                }
    
            }
            
            $(eapSelectElem).on('change', eapSelectUpdate);

            $(passwordInputElem).on('keydown', function(ev) {
                if (ev.key != 'Enter') {
                    return;
                }
    
                ev.preventDefault();
                $(setCredentialsElem).trigger('click');    
            });

            $(setCredentialsElem).on('click', async function() {
                $(setCredentialsElem).prop('disabled', true);
                
                const selectedNet = getSelectedNetwork();
                const password = $(passwordInputElem).val();
                console.log('setCredentials selectedNet', selectedNet);

                // console.log('sortedNetworks', sortedNetworks);

                if (mode != 'wifi') {
                    // Setting credentials can take a few seconds, so put up the next step first
                    // so it's clear that the button worked
                    setSetupStep('setupStepWaitForOnline');


                    let reqObj = {
                        op: 'wifiSetCredentials',
                        ssid: selectedNet.ssid,
                        sec: selectedNet.sec,
                        cip: selectedNet.cip,                    
                    };

                    if (selectedNet.sec >= 1 && selectedNet.sec <= 3) {
                        // WEP, WPA, WPA2
                        reqObj.pass = password;
                    }
        
                    if (selectedNet.sec >= 4 && selectedNet.sec <= 5) {
                        // Enterprise
                        const eapMode = parseInt($(eapSelectElem).val());

                        if (eapMode == 0) {
                            // PEAP/MSCHAPv2
                            // Requires: Inner Identity, Password
                            // Optional: Root CA, Outer Identity
                            reqObj.eap = 25; // WLAN_EAP_TYPE_PEAP
                            reqObj.username = $(wifiUsernameElem).val();
                            reqObj.pass = password;
                        }
                        else
                        if (eapMode == 1) {
                            // EAP-TLS
                            // Requires: Client Certificate, Private Key
                            // Optional: Root CA, Outer Identity
                            reqObj.eap = 13; // WLAN_EAP_TYPE_TLS
                            reqObj.client_certificate = $(clientCertElem).val();
                            reqObj.private_key = $(privateKeyElem).val();
                        }

                        // Root CA
                        const caCert = $(caCertElem).val();
                        if (caCert.length) {
                            reqObj.root_ca = caCert;
                        }


                        // Outer Identity
                        const outerIdentity = $(outerIdentityElem).val();
                        if (outerIdentity.length) {
                            reqObj.outer_identity = outerIdentity;
                        }

                        analytics.track('Wi-Fi Credentials Set', {category:gaCategory});    

                    }
                    console.log('sending request', reqObj);

                    await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                    reqObj = {
                        op: 'connect',
                    };
                    await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                    waitDeviceOnline();
                }
                else {
                    // Set using Device OS control request
                    hideDeviceFirmwareInfo();

                    setSetupStep('setupStepWifiStart');
                    analytics.track('Wi-Fi Configure Start', {category:gaCategory});

                    
                    const reqObj = {
                        ssid: selectedNet.ssid, 
                        password
                    };
                    console.log('setCredentials reqObj', reqObj);
                
                    try {
                        const res = await usbDevice.joinNewWifiNetwork(reqObj);

                        setSetupStep('setupStepWifiComplete');
                        analytics.track('Wi-Fi Configure Success', {category:gaCategory});

                        await usbDevice.reset();

                        await usbDevice.close();
                        usbDevice = null;
                    }
                    catch(e) {
                        setSetupStep('setupStepWifiFailed');
                        analytics.track('Wi-Fi Configure Failed', {category:gaCategory});
                    }

                }

                return;
            });

            radioSelectionUpdate();

            if (mode != 'wifi') {
                // Display results
                while(true) {
                    reqObj = {
                        op: 'wifiScanResult'
                    } 
                    const res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                    if (res.result) {
                        break;
                    }

                    if (res.data) {
                        // TODO: catch exception here
                        const respObj = JSON.parse(res.data);
                        
                        if (respObj.ssid) {
                            let found = false;

                            for(let ii = 0; ii < sortedNetworks.length; ii++) {
                                if (sortedNetworks[ii].ssid == respObj.ssid) {
                                    if (respObj.rssi > sortedNetworks[ii].rssi) {
                                        sortedNetworks[ii] = respObj;    
                                    }
                                    found = true;
                                }
                            }
                            if (!found) {
                                sortedNetworks.push(respObj);
                            }

                            sortedNetworks.sort(function(a, b) {
                                return a.ssid.localeCompare(b.ssid);
                            });

                            wifiNetworksUpdate();
        
                        }
                        if (respObj.done) {
                            wifiNetworksDone();
                            break;
                        }
                        else {
                            // Wait a bit to try again
                            await new Promise(function(resolve) {
                                setTimeout(function() {
                                    resolve();
                                }, 500);
                            });
                        }


                    }
                }
            }     

        };

        $(thisElem).find('.scanAgain').on('click', configureWiFi);

        const waitDeviceOnline = async function() {
            try {
                setSetupStep('setupStepWaitForOnline');
    
                $(userInfoElem).show();

                analytics.track('waitDeviceOnline', {category:gaCategory});    


                if (mode == 'doctor') {
                    if (deviceLookup && !deviceLookup.deviceInfo) {
                        setupOptions.noClaim = !$('.doctorClaimDevice').prop('checked');
                    }
                    else {
                        setupOptions.noClaim = true;    
                    }
                    // In doctor, if there is an org, enable the ticket button
                    if (apiHelper.canSubmitTickets) {
                        $('.ticketButtonDiv').show();
                    }
                }
                
                if (setupOptions.noClaim || setupOptions.claimCode) {
                    $(thisElem).find('.waitOnlineStepClaim').hide();
                }

                if (deviceInfo.platformId == 10) {
                    $('.deviceLogWarning').show();
                }

                showDeviceLogs();

                
                const waitOnlineStepsElem = $(thisElem).find('.waitOnlineSteps');
    
                // waitOnlineSteps
    
                let networkReady = false;
    
                $(thisElem).find('.waitOnlineStepNetwork > td > img').css('visibility', 'visible');
                
                // Wait for online
                await new Promise(function(resolve, reject) {
                    checkStatus = function(respObj) {
                        if (respObj.netReady && !networkReady) {
                            networkReady = true;
                            if (deviceInfo.platformId == 10) {
                                $('.deviceLogWarning').hide();
                            }
                            analytics.track('networkReady', {category:gaCategory});    
                            $(thisElem).find('.waitOnlineStepNetwork > td > img').attr('src', doneUrl);
                            $(thisElem).find('.waitOnlineStepCloud > td > img').css('visibility', 'visible');
                        }
                        if (respObj.cloudConnected) {
                            // clearInterval(timer);
                            $(thisElem).find('.waitOnlineStepCloud > td > img').attr('src', doneUrl);
                            $(thisElem).find('.waitOnlineStepClaim > td > img').css('visibility', 'visible');
                            resolve();
                            return;
                        }
                    };
                });
    
                cloudConnectedResolve = null;
                checkStatus = null;

                analytics.track('online', {category:gaCategory});    

                if (!setupOptions.noClaim && !setupOptions.claimCode) {
                    // Claim device
                    console.log('claim ' + deviceInfo.deviceId);
                    
                    const result = await new Promise(function(resolve, reject) {      
                        const requestObj = {
                            id: deviceInfo.deviceId
                        }
                        
                        const request = {
                            contentType: 'application/json',
                            data: JSON.stringify(requestObj),
                            dataType: 'json',
                            error: function (jqXHR) {
                                console.log('error', jqXHR);
                                reject(jqXHR.status);
                            },
                            headers: {
                                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                'Accept': 'application/json',
                                'X-Particle-Tool': 'particle-docs',
                            },
                            method: 'POST',
                            success: function (resp, textStatus, jqXHR) {
                                resolve(resp);
                            },
                            url: 'https://api.particle.io/v1/devices/'
                        };
            
                        $.ajax(request);            
                    });


                    if (result.ok) {
                        analytics.track('claimed device', {category:gaCategory});    
                        $(thisElem).find('.waitOnlineStepClaim > td > img').attr('src', doneUrl);
                        
                        // Re-run device lookup to update information
                        runDeviceLookup();
            
                        // Wait a second so the green check shows up
                        await new Promise(function(resolve) {
                            setTimeout(function() {
                                resolve();
                            }, 1000);
                        });
                    }
                    else {
                        // TODO: Handle error. What happens if device is already claimed or 
                        // in a product? This might cause an exception, not an error
                        console.log('error claiming device', result);
                    }
                }

                // Re-run device lookup to update information from the cloud
                runDeviceLookup();

                if (mode == 'doctor') {                    
                    // TODO: Check if device is claimed to my account and 
                    setSetupStep('setupStepTroubleshootingSuccess');
                    analytics.track('doctor success', {category:gaCategory});    
                    return;
                }

                // TODO: Possibly allow naming in troubleshooting mode if name is not set
                nameDevice();
    
            }
            catch(e) {
                setSetupStep('setupStepClaimFailed');
                console.log('exception', e);
                analytics.track('Exception', {category:gaCategory, label:'claim failed'});
            }

            
        };

        const nameDevice = async function() {
            setSetupStep('setupStepNameDevice');

            const nameInputElem = $(thisElem).find('.nameInput');
            const setNameButtonElem = $(thisElem).find('.setName');

            // Defined in api-helper.extras.js
            $(nameInputElem).val(apiHelper.getRandomTrochee());
            $(nameInputElem).focus();
            $(nameInputElem).select();
            
            $(nameInputElem).on('keydown', function(ev) {
                if (ev.key != 'Enter') {
                    return;
                }
    
                ev.preventDefault();
                $(setNameButtonElem).trigger('click');    
            });

            $(setNameButtonElem).on('click', async function() {
                const result = await new Promise(function(resolve, reject) {      
                    const requestObj = {
                        name: $(nameInputElem).val()
                    };
                    
                    let requestUrl;
                    if (setupOptions.addToProduct) {
                        requestUrl = 'https://api.particle.io/v1/products/' + setupOptions.productId + '/devices/' + deviceInfo.deviceId;
                    }
                    else {
                        requestUrl = 'https://api.particle.io/v1/devices/' + deviceInfo.deviceId;
                    }

                    const request = {
                        contentType: 'application/json',
                        data: JSON.stringify(requestObj),
                        dataType: 'json',
                        error: function (jqXHR) {
                            console.log('error', jqXHR);
                            reject(jqXHR.status);
                        },
                        headers: {
                            'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                            'Accept': 'application/json',
                            'X-Particle-Tool': 'particle-docs',
                        },
                        method: 'PUT',
                        success: function (resp, textStatus, jqXHR) {
                            resolve(resp);
                        },
                        url: requestUrl
                    };
        
                    $.ajax(request);            
                });
                analytics.track('set name', {category:gaCategory});    

                setupDone();
            });

            
            $(thisElem).find('.skipNaming').on('click', function() {
                analytics.track('skip naming', {category:gaCategory});    
                setupDone();
            });

            
        };

        const selectDevice = async function() {
        

            try {
                $(setupSelectDeviceButtonElem).prop('disabled', false);
        
            
                if (usbDevice) {
                    await usbDevice.close();
                    usbDevice = null;
                }

                const nativeUsbDevice = await navigator.usb.requestDevice({ filters: usbFilters })
        
                usbDevice = await ParticleUsb.openNativeUsbDevice(nativeUsbDevice, {});

                if (mode == 'wifi') {
                    $(thisElem).find('.setupWiFiInstructions').hide();
                }
    
                // TODO: Try this with a device with old Device OS, not sure whether this step
                // fails or the next one, but if the Device OS doesn't support control requests
                // we need to update Device OS first, then go back to check device settings.

                checkDevice();
            }
            catch(e) {
                if (e.message.includes('No device selected')) {
                    return;
                }
                console.log('exception', e);
            }
        };

        $('.continueDfu').on('click', function() {
            selectDevice();
        });

        $('.continueToSelectDevice').on('click', function() {
            setSetupStep('setupStepSelectDevice');
        });


        $(setupSelectDeviceButtonElem).on('click', selectDevice);


        $('#uploadUserBinary').on('change', function() {
            if (this.files.length == 1) {
                const file = this.files[0];
                
                let fileReader = new FileReader();
                fileReader.onload = async function() {
                    restoreFirmwareBinary = fileReader.result;
                    await flashDevice({
                        restoreFirmwareBinary
                    });
                    setSetupStep('setupStepRestoreDone');
                };
                fileReader.readAsArrayBuffer(file);
            
            }
        });

        const padText = function(text, width) {
            if (text.length < width) {
                return text + '                                                           '.substring(0, width - text.length);
            }
            else {
                return text;
            }
        }

        const tableToText = function(tableElem) {
            let rows = [];
            for(const rowElem of $(tableElem).find('tr')) {
                let row = [];
                for(const colElem of $(rowElem).find('td')) {
                    row.push($(colElem).text());                    
                }
                rows.push(row);
            }
            // Calculate maximum column width
            let colWidths = [];
            for(const row of rows) {
                for(let colIndex = 0; colIndex < row.length; colIndex++) {
                    const col = row[colIndex];
                    if (colWidths.length <= colIndex) {
                        colWidths[colIndex] = 0;
                    }
                    if (col.length > colWidths[colIndex]) {
                        colWidths[colIndex] = col.length;
                    }
                }
            }

            let text = '';

            for(const row of rows) {
                for(let colIndex = 0; colIndex < row.length; colIndex++) {
                    const col = row[colIndex];
                    if ((colIndex + 1) < row.length) {

                        text += padText(col, colWidths[colIndex] + 1);
                    }
                    else {
                        text += col;
                    }
                }
                text += '\n';
            }            

            return text;
        }

        $(thisElem).find('.ticketButton').on('click', function() {
            $('.ticketButtonDiv').hide();

            ticketOptions.ticketFormId = 7521710158235;
            ticketOptions.customFields = [                
                {
                    // Device ID
                    id: 360056043053,
                    value: deviceInfo.deviceId,
                },
                {
                    // ICCID
                    id: 360026982714,
                    value: deviceInfo.iccid,
                },
                {
                    // Organization
                    id: 7522488707227,
                    value: apiHelper.selectedOrg ? apiHelper.selectedOrg.name : '',
                },
                {
                    // Device Logs
                    id: 7521822852635,
                    value: $('.deviceLogsText').val(),
                },
                {
                    // User Info
                    id: 7521824368795,
                    value: tableToText($(thisElem).find('.userInfoTable > tbody'))
                },
                {
                    // Network info
                    id: 7521832693787,
                    value: tableToText($(thisElem).find('.cellularInfoTable > tbody'))
                },
                {
                    // GNSS info
                    id: 7521793229083,
                    value: tableToText($(thisElem).find('.gnssLocationTable > tbody')) + '\n' + tableToText($(thisElem).find('.gnssInfoTable > tbody'))
                },
            ];

            apiHelper.showTicketPanel(ticketOptions);
        });


        $(thisElem).find('.setColorButton').on('click', function() {
            const color =  $(thisElem).find('.colorSelector').val();
            const red = parseInt(color.substr(1, 2), 16);
            const green = parseInt(color.substr(3, 2), 16);
            const blue = parseInt(color.substr(5, 2), 16);

            const cmd = red + ',' + green + ',' + blue;


            apiHelper.particle.callFunction({ deviceId: deviceInfo.deviceId, name: 'setColor', argument: cmd, auth: apiHelper.auth.access_token  }).then(
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
        });        

        const setupDone = async function() {
            setSetupStep('setupStepDone');

            analytics.track('setupDone', {category:gaCategory});    

            if (setupOptions.addToProduct) {
                $(thisElem).find('.setupStepDoneNonProduct').hide();
            }
            else {
                $(thisElem).find('.setupStepDoneNonProduct').show();
            }
            

        };
    });

    async function loadLogDecoder() {
        logDecoder.urlPrefix = '/assets/files/';
        logUserInterface.outputElem = $('.logDecoderOutputDiv');

        $('.logDecoderDownloadButton').on('click', function() {
            const str = logDecoder.getRawLogs();

            let blob = new Blob([str], {type:'text/plain'});
            saveAs(blob, 'log.txt');			

			analytics.track('File Download', {category:gaCategory});
        });
        $('.logDecoderCopyButton').on('click', function() {
            const str = logDecoder.getRawLogs();

			var t = document.createElement('textarea');
			document.body.appendChild(t);
			$(t).text(str);
			t.select();
			document.execCommand("copy");
			document.body.removeChild(t);

            analytics.track('File Copy', {category:gaCategory});
        });
        $('.logDecoderClearButton').on('click', function() {
            logDecoder.clear();
        });

        logDecoder.load();
        logUserInterface.setupHandlers();
        await logUserInterface.loadLogAndSettings();

    }
    loadLogDecoder();


});

