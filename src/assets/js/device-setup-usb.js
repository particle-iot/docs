
$(document).ready(function() {
    const gaCategory = 'USB Device Setup';
    const storageActivateSim = "DeviceSetupActivatingSim";
    const doneUrl = '/assets/images/device-setup/ok-48.png';

    if (!navigator.usb) {
        ga('send', 'event', gaCategory, 'No WebUSB', navigator.userAgent);
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

    $('.apiHelperDeviceSetupUsb').each(function() {

        const thisElem = $(this);

        const mode = $(thisElem).data('mode');

        const modes = ['doctor', 'setup', 'restore'];

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

        if (mode == 'restore' || apiHelper.auth) {
            $(thisElem).find('.deviceSetupLoggedIn').show();
        }

        ga('send', 'event', gaCategory, 'Opened Page', mode);

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
                key: 'iccid',
                label: 'ICCID',
                cellular: true
            },
            {
                key: 'imei',
                label: 'IMEI',
                cellular: true
            },
            {
                key: 'mfg',
                label: 'Modem Manufacturer',
                cellular: true
            },
            {
                key: 'model',
                label: 'Modem Model',
                cellular: true
            },
            {
                key: 'fwvers',
                label: 'Modem Firmware Version',
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


        const getUserFirmwareBackup = function() {
            let firmwareBackup;
            try {
                firmwareBackup = JSON.parse(localStorage.getItem('firmwareBackup'));
            }
            catch(e) {                        
            }
            if (!firmwareBackup) {
                firmwareBackup = {};
            }

            if (!firmwareBackup.backups) {
                firmwareBackup.backups = [];
            }

            // Ignore backups older than 1 week
            const oldestTs = Math.floor(Date.now() / 1000) - 604800;
            for(let ii = 0; ii < firmwareBackup.backups.length;) {
                if (firmwareBackup.backups[ii].ts < oldestTs) {
                    // Delete this
                    firmwareBackup.backups.splice(ii, 1);
                }
                else {
                    ii++;   
                }
            }

            return firmwareBackup;
        }

        const addUserFirmwareBackup = function() {
            let firmwareBackup = getUserFirmwareBackup();

            firmwareBackup.backups.push({
                deviceId: deviceInfo.deviceId,
                username: apiHelper.auth ? apiHelper.auth.username : '',
                ts: Math.floor(Date.now() / 1000)
            });

            localStorage.setItem('firmwareBackup', JSON.stringify(firmwareBackup));
        }

        const hasUserFirmwareBackup = function() {
            const firmwareBackup = getUserFirmwareBackup();

            for(const f of firmwareBackup.backups) {
                if (f.deviceId == deviceInfo.deviceId && f.username == apiHelper.auth.username) {
                    // Found
                    return true;
                }
            }
            
            return false;
        }
        


        const deviceLogsElem = $(thisElem).find('.deviceLogs');
        const deviceLogsTextElem = $(thisElem).find('.deviceLogsText');
        const showDebuggingLogsElem = $(thisElem).find('.showDebuggingLogs');
        const deviceLogsTextButtonsElem = $(thisElem).find('.deviceLogsTextButtons');
        const downloadLogsElem = $(thisElem).find('.downloadLogs');
        let deviceLogsTimer1;
        let deviceLogsTimer2;

        let deviceLogs = '';
        let deviceLogsPartialLine;
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
                $(deviceLogsTextElem).val(deviceLogs);
                deviceLogsTextElem.scrollTop(deviceLogsTextElem[0].scrollHeight - deviceLogsTextElem.height());    
                $(deviceLogsTextButtonsElem).show();
            }
            else {
                $(deviceLogsTextButtonsElem).hide();
            }
        });

        $(downloadLogsElem).on('click', function() {
            $(downloadLogsElem).prop('disabled', true);

            let blob = new Blob([getInfoTableText(), deviceLogs], {type:'text/plain'});
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

            if (!deviceLogsTimer1) {
                deviceLogsTimer1 = setInterval(async function() {

                    let reqObj = {
                        op: 'status'
                    };
    
                    let res;
                    try {
                        res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                    }
                    catch(e) {
                        if (e.message.includes('The device was disconnected.')) {
                            stopDeviceLogs();
                        } else {
                            console.log('control request exception', e);
                        }
                        return;
                    }
                    
                    if (res.result == 0 && res.data) {
                        const respObj = JSON.parse(res.data);
    
                        if (checkStatus) {
                            checkStatus(respObj);
                        }
    
                        if (respObj.mcc) {
                            setInfoTableItemObj(respObj);
    
                            if (mccmnc) {
                                for(const obj of mccmnc) {
                                    if (obj.mcc == respObj.mcc && obj.mnc == respObj.mnc) {
                                        setInfoTableItemObj(obj);                                        
                                    }
                                }
                            }                                          
                        }
                    }
                }, 2000);    
            }
            
            if (!deviceLogsTimer2) {
                // Retrieve logs more slowly on Gen 2 because the control request handler can run out of RAM
                let logTimerInterval = (deviceInfo.platformId <= 10) ? 2000 : 1000;
                
                deviceLogsTimer2 = setInterval(async function() {
                    if ($('.deviceLogWarning').is(':visible')) {
                        // On the Electron, skip the logs requests because control requests are blocked
                        // while connecting to cellular
                        return;
                    }

                    let reqObj = {
                        op: 'logs'
                    };
    
                    let res;
                    try {
                        res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                    }
                    catch(e) {
                        if (e.message.includes('The device was disconnected.')) {
                            stopDeviceLogs();
                        } else {
                            console.log('control request exception', e);
                        }
                        return;
                    }
                    
                    if (res.result == 0 && res.data) {
                        if (res.data.length > 0) {
                            let tempLog = (deviceLogsPartialLine ? deviceLogsPartialLine : '') + res.data;
                            let lastLF = tempLog.lastIndexOf('\n');
                            if (lastLF < (tempLog.length - 1)) {
                                deviceLogsPartialLine = tempLog.substr(lastLF + 1);
                                tempLog = tempLog.substr(0, lastLF + 1);
                            }
                            else {
                                deviceLogsPartialLine = '';
                            }
                            for(let line of tempLog.split('\n')) {
                                line = line.trim();
                                if (line.length) {
                                    processLogMessage(line);
                                }
                            }
                            
                            deviceLogs += tempLog;
                            if ($(showDebuggingLogsElem).prop('checked')) {
                                $(deviceLogsTextElem).val(deviceLogs);
                                deviceLogsTextElem.scrollTop(deviceLogsTextElem[0].scrollHeight - deviceLogsTextElem.height());    
                            }
                        }
                    }
                }, logTimerInterval);
            }


        };

        const decodeModuleInfoProtobuf = function(data) {
            // data must be a Uint8Array
            let moduleInfo = {
            };

            let protobuf = apiHelper.protobuf(data);
            
            const decodeDependencies = function(array, end) {
                let dependency = {};
        
                while(protobuf.offset < end) {
                    result = protobuf.decodeTag();
        
                    switch(result.field) {
                    case 1:
                        dependency.moduleType = result.value;
                        break;
        
                    case 2:
                        dependency.index = result.value;
                        break;
        
                    case 3:
                        dependency.version = result.value;
                        break;
                    }
                }
        
                array.push(dependency);
            };
        
            const decodeModule = function(end) {
                let module = {
                    dependencies: []
                };
                let result;
        
                while(protobuf.offset < end) {
                    result = protobuf.decodeTag();
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
                        module.size = result.value;
                        break;
                    case 5:
                        module.validity = result.value;
                        break;
                    case 6:
                        // Dependencies       
                        decodeDependencies(module.dependencies, protobuf.offset + result.value);
                        break;
                    }
                }
        
                moduleInfo.modules.push(module);    
            };

            // moduleType values
            // protobuf  system  description
            // 1         2       bootloader
            // 2         4       system part 
            // 3         5       user part (ignore index and version)
            // 4         3       monolithic firmware
            // 5         7       NCP
            // 6         8       Radio stack (softdevice)
            const systemModuleTypes = [0, 2, 4, 5, 3, 7, 8];

            const moduleTypeNames = ['', 'Bootloader', 'System Part', 'User Part', 'Monolithic', 'NCP', 'Softdevice (Radio Stack)']; 

            // Validity values:
            // 0 (or omitted): valid
            // 1 integrity check failed
            // 2 dependency check failed

        
            moduleInfo.modules = [];
        
            while(protobuf.offset < data.byteLength) {
                result = protobuf.decodeTag();
        
                // repeated Module modules = 1; // Firmware modules
                if (result.field != 1 || result.wireType != 2) {
                    return null;
                }
                
                result = decodeModule(protobuf.offset + result.value);
        
            }

            moduleInfo.moduletypeProtobufToName = function(moduleType) {
                return moduleTypeNames[moduleType];
            }

            moduleInfo.moduleTypeProtobufToSystem = function(moduleType) {
                return systemModuleTypes[moduleType];
            };

            moduleInfo.moduleTypeSystemToProtobuf = function(systemModuleType) {
                for(let ii = 0; ii < systemModuleTypes.length; ii++) {
                    if (systemModuleTypes[ii] == systemModuleType) {
                        return ii;
                    }
                }
                return 0;
            };

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
                return moduleInfo.getByModuleTypeIndex(5);
            };

            moduleInfo.getPrebootLoaderPart1 = function() {
                // prebootloader-part1 on P2 is bootloader (1) index 2
                return moduleInfo.getByModuleTypeIndex(1, 2);
            };
        
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
                if (obj.index) {
                    return moduleInfo.moduletypeProtobufToName(obj.moduleType) + ' ' + obj.index;
                }
                else {
                    return moduleInfo.moduletypeProtobufToName(obj.moduleType);
                }
            }

            const formatVersion = function(obj) {
                let text = '';
                if (obj.moduleType == 2) {
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

                ga('send', 'event', gaCategory, 'Selected', deviceInfo.platformId);

                if (!deviceInfo.targetVersion) {
                    deviceInfo.targetVersion = minimumDeviceOsVersion;
                }

                switch(deviceInfo.platformId) {
                    case 10: // electron (and E Series)
                    case 13: // boron
                    case 23: // bsom
                    case 25: // bsom
                    case 26: // tracker
                        deviceInfo.hasPMIC = true;
                        break;
                }

                if (!deviceInfo.platformVersionInfo) {
                    $(thisElem).find('.setupStepCheckDeviceStart').hide();
                    $(thisElem).find('.setupStepCheckDeviceUnknown').show();
                    return;
                }
    
                if (!usbDevice.isInDfuMode) {
                    // Attempt to get the module info on the device using control requests if not already in DFU mode.
                    // When in DFU already, just flash full Device OS and binaries to avoid leaving DFU.
                    ga('send', 'event', gaCategory, 'Already DFU', deviceInfo.platformId);

                    deviceModuleInfo = await getModuleInfoCtrlRequest();

                    if (deviceModuleInfo) {
                        showDeviceFirmwareInfo(deviceModuleInfo);    
                    }
                    else {
                        setSetupStep('setupStepManualDfu');      
                        return;              
                    }
                }

                if (usbDevice.isCellularDevice) {                    
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
                else {
                    deviceInfo.wifi = true;
                }

                // Don't check SIM or firmware backup when in device restore mode
                if (mode == 'setup' || mode == 'doctor') {
                    const stor = localStorage.getItem(storageActivateSim);
                    if (stor) {
                        try {
                            const storObj = JSON.parse(stor);
                            // TODO: Check date here
                            if (stor.deviceId == deviceInfo.deviceId) {
                                ga('send', 'event', gaCategory, 'Reopened during Activate SIM');
                                // TODO: Maybe ask user here?
                                activateSim();
                                return;''   
                            }
                        }
                        catch(e) {
    
                        }
                    }
    
                    if (hasUserFirmwareBackup()) {
                        ga('send', 'event', gaCategory, 'Firmware Backup Available');

                        $('.restoreDeviceId').text(deviceInfo.deviceId);
                        $('.restoreFirmwareDiv').show();
    
                        $('.setupRestoreDeviceButton').on('click', function() {
                            $('#uploadUserBinary').trigger('click');
                        });
                    }    
                }

                confirmFlash();
            }
            catch(e) {
                console.log('exception', e);
                ga('send', 'event', gaCategory, 'Exception', 'checkDevice');
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
                                    'Accept': 'application/json'
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
                    ga('send', 'event', gaCategory, 'Mark as Development Device prior to flashing');
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
                        ga('send', 'event', gaCategory, 'TowerScanAvailable', canTowerScan);


                        showInfoTable();
                        setInfoTableItem('deviceId', deviceInfo.deviceId);
                        setInfoTableItemObj(respObj);    

                        $(thisElem).find('.batteryWarning').hide();   
                        if (respObj.model) {
                            if (respObj.model.startsWith('SARA-R') || respObj.model.startsWith('BG9')) {
                                // LTE model, does not require a battery
                            }
                            else {
                                // Non-LTE model 
                                if (respObj.soc <= 0) {
                                    ga('send', 'event', gaCategory, 'BatteryWarning');
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
                                'Accept': 'application/json'
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
                        ga('send', 'event', gaCategory, 'Activating SIM');

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
                    ga('send', 'event', gaCategory, 'Exception', 'reconnectToDevice');
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
                    const filters = [
                        {vendorId: 0x2b04}
                    ];

                    $(thisElem).find('.reconnectUsb').on('click', async function() {

                        $(thisElem).find('.reconnectUsb').prop('disabled', true);

                        nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
                
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

                let options = {
                    eventCategory: 'USB Device Setup',
                    platformVersionInfo: deviceInfo.platformVersionInfo,
                    userFirmwareBinary,
                    setStatus,
                    version: deviceInfo.targetVersion, 
                    setupBit: flashDeviceOptions.setupBit,
                    claimCode: flashDeviceOptions.claimCode,
                    deviceModuleInfo: (flashDeviceOptions.forceUpdate ? null : deviceModuleInfo), // 
                    downloadUrl: flashDeviceOptions.downloadUrl, // May be undefined
                    prebootloader: flashDeviceOptions.prebootloader,
                    moduleInfo: flashDeviceOptions.moduleInfo,
                    zipFs: flashDeviceOptions.zipFs,
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
                                    nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters });
                        
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
                };

            
                if (flashDeviceOptions.mode == 'doctor' && !restoreFirmwareBinary) {
                    options.userBackup = true;
                }

                const restoreResult = await dfuDeviceRestore(usbDevice, options);
            
                if (restoreResult.ok) {
                    // Remember that we have backed up this device
                    addUserFirmwareBackup();
                }
                else {
                    console.log('dfu error', restoreResult);
                }
                
            }
            catch(e) {
                console.log('exception', e);
                setSetupStep('setupStepDfuFailed');
                $('.dfuFailedReason').text(e.text);
                ga('send', 'event', gaCategory, 'Exception', 'setupStepDfuFailed');
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
                ga('send', 'event', gaCategory, 'Exception', 'get restore json');
                // TODO: Do something here
            }
                
            const zipUrl = baseUrl + '.zip';
        
            flashDeviceOptions.zipFs = new zip.fs.FS();
        
            try {
                await flashDeviceOptions.zipFs.importHttpContent(zipUrl);
            }
            catch(e) {
                console.log('exception downloading restore json', e);
                ga('send', 'event', gaCategory, 'Exception', 'get restore zip');
                // TODO: Do something here
            }    

            let flashPrebootloaderFirst = false;
            let flashPrebootloaderLast = false;

            const flashPrebootloader = async function() {
                flashDeviceOptions.prebootloader = true;
                await flashDeviceInternal();
                flashDeviceOptions.prebootloader = false;    
            }

            // Check for P2 prebootloader update. Maybe do this after?
            if (deviceInfo.platformVersionInfo.isRTL872x) {          
                if (deviceModuleInfo && !flashDeviceOptions.forceUpdate) {
                    const m = deviceModuleInfo.getPrebootLoaderPart1();
                    if (m) {
                        const newVersion = flashDeviceOptions.moduleInfo['prebootloader-part1'].prefixInfo.moduleVersion;
                        
                        if (m.version < newVersion) {
                            // Upgrade prebootloader
                            flashPrebootloaderFirst = true;
                        }
                        else
                        if (m.version > newVersion) {
                            // Downgrade prebootloader
                            flashPrebootloaderLast = true;
                        }
                    }
                } 
                else {
                    // Either no module info (already in DFU) or fore update
                    flashPrebootloaderFirst = true;
                }                            
            }

            if (flashPrebootloaderFirst) {
                await flashPrebootloader();
                ga('send', 'event', gaCategory, 'Flash Prebootloader First');
            }
        
            // Flash Device OS
            await flashDeviceInternal();
            ga('send', 'event', gaCategory, 'Flash Device');
            
            if (flashPrebootloaderLast) {
                await flashPrebootloader();
                ga('send', 'event', gaCategory, 'Flash Prebootloade rLast');
            }

            if (deviceInfo.platformVersionInfo.isTracker) {
                let updateNcp = false;

                if (deviceModuleInfo && !flashDeviceOptions.forceUpdate) {
                    // Is a tracker, could need NCP
                    const m = deviceModuleInfo.getModuleNcp();
                    if (m) {
                        // TODO: Get this from the NCP binary
                        if (m.version < 7) {
                            updateNcp = true;
                        }
                    }
                }
                else {
                    updateNcp = flashDeviceOptions.updateNcp;
                }
                if (updateNcp) {
                    flashDeviceOptions.ncpUpdate = true;
                    await flashDeviceInternal();
                    ga('send', 'event', gaCategory, 'Flash NCP');
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
                ga('send', 'event', gaCategory, 'Add To Product', 'Success');
            }
            else {
                console.log('failed to add to product, do something here');
                ga('send', 'event', gaCategory, 'Add To Product', 'Failure ' + res.statusCode);
            }

            if (setupOptions.developmentDevice) {
                console.log('set as development device');

                await apiHelper.particle.markAsDevelopmentDevice({ 
                    deviceId: deviceInfo.deviceId,
                    product: setupOptions.productId,
                    auth: apiHelper.auth.access_token 
                });                
                ga('send', 'event', gaCategory, 'Mark as Development Device');
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
            
            // Doctor mode
            const doctorModeSettingsElem = $(thisElem).find('.doctorModeSettings');
            const doctorUseEthernetElem = $(thisElem).find('.doctorUseEthernet');
            const doctorSetKeepAliveCheckboxElem = $(thisElem).find('.doctorSetKeepAliveCheckbox');
            const doctorKeepAliveInputElem = $(thisElem).find('.doctorKeepAliveInput');


            $('.apiHelperProductDestination').each(function() {
                $(this).data('filterPlatformId', deviceInfo.platformId);
                $(this).data('updateProductList')();    
            });

            const checkButtonEnable = function() {
                let enableButton = true;

                if (mode == 'restore') {
                    switch($(modeSelectElem).val()) {
                        case 'upload':
                            $(restoreDeviceVersionTrElem).hide();
                            enableButton = !!restoreFirmwareBinary;
                            break;

                        case 'url':
                            $(restoreDeviceVersionTrElem).hide();
                            enableButton = $(userFirmwareUrlElem).val().trim() != '';
                            break;

                        default:
                            $(restoreDeviceVersionTrElem).show();
                            break;
                    }

                    if (deviceInfo.platformVersionInfo.isTracker) {
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

            if (mode == 'doctor' || mode == 'setup') {
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
                    $(optionElem).prop('value', ver);
                    $(optionElem).text(ver);
                    if (ver == deviceInfo.targetVersion) {
                        $(optionElem).prop('selected', true);
                    }

                    $(setupDeviceOsVersionElem).append(optionElem);
                }
            }

            if (deviceInfo.platformVersionInfo.gen == 2) {
                // No Ethernet option on Gen 2
                $(hasEthernetRowElem).hide();
            }

            
            if (mode == 'doctor') {
               
            }
            else
            if (mode == 'restore') {                
                const lastVersion = $(versionElem).val();
                $(versionElem).empty();
                let firstRelease;
                for(let ver of deviceInfo.platformVersionInfo.versionArray) {
                    versionElem.append('<option name="' + ver + '">' + ver + '</option>');
                    if (!firstRelease && !ver.includes('alpha') && !ver.includes('beta') && !ver.includes('rc')) {
                        firstRelease = ver;
                    }
                }
                if (lastVersion && !lastVersion.startsWith('Select')) {
                    $(versionElem).val(lastVersion);
                }
                else if (firstRelease) {
                    $(versionElem).val(firstRelease);
                }

                if (deviceInfo.platformVersionInfo.gen == 3) {
                    $(setupBitTrElem).show();
                }

                if (deviceInfo.platformVersionInfo.isTracker) {
                    $(modeSelectElem).find('option[value="tinker"]').text('Tracker Edge (Factory Default)');
                    $(trackerTrElem).show();
                }
                else {
                    $(modeSelectElem).find('option[value="tinker"]').text('Tinker (Factory Default)');
                    $(trackerTrElem).hide();
                }                

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



            $(setupDeviceButtonElem).on('click', async function() {
                ga('send', 'event', gaCategory, 'Confirmed Flash');
                
                const userFirmwareMode = $(modeSelectElem).val();
                if (userFirmwareMode == 'url' || userFirmwareMode == 'customUrl') {
                    setStatus('Confirming...');
                    const msg = 'This restore will use a custom binary downloaded from an external server. ' + 
                        'Make sure that it is from a reputable author and stored on a secure server. '
                    if (!confirm(msg)) {
                        ga('send', 'event', gaCategory, 'Rejected using custom binary');
                        setStatus('Restore canceled');
                        setSetupStep('setupStepStartOver');
                        return;
                    } 
                    flashDeviceOptions.downloadUrl = $(userFirmwareUrlElem).val().trim();
                }
                

                if (mode == 'restore') {
                    deviceInfo.targetVersion = $(versionElem).val();
                    flashDeviceOptions.setupBit = $(setupBitSelectElem).val();
                    flashDeviceOptions.shippingMode = $(shippingModeCheckboxElem).prop('checked');
                    flashDeviceOptions.forceUpdate = $(forceUpdateElem).prop('checked');

                    if (deviceInfo.platformVersionInfo.isTracker) {    
                        if (!deviceModuleInfo || flashDeviceOptions.forceUpdate) {
                            flashDeviceOptions.updateNcp = $(updateNcpCheckboxElem).prop('checked');
                        }
                    }
                    if (flashDeviceOptions.forceUpdate) {
                        ga('send', 'event', gaCategory, 'Restore Force Update');
                    }
                    if (flashDeviceOptions.shippingMode) {
                        ga('send', 'event', gaCategory, 'Restore Shipping Mode');
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
                                        'Accept': 'application/json'
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
                                ga('send', 'event', gaCategory, 'Create Product', 'Success');    
                            }
                            else {
                                // TODO: Handle error here
                                ga('send', 'event', gaCategory, 'Create Product', 'Failed');
                            }
        

                            // result.ok
                            // result.product .id, .platform_id, .name, .slug, .description, ...
                            setupOptions.productId = result.product.id;
                        }
                        else {
                            setupOptions.productId = $(trackerProductSelectElem).val();
                            ga('send', 'event', gaCategory, 'Add Tracker To Existing Product');    
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
                                        'Accept': 'application/json'
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
                    }

                    setupOptions.ethernet = $(setupUseEthernetElem).prop('checked');

                    flashDeviceOptions.setupBit = 'done';
                }
                else {
                    // mode == doctor
                    setupOptions.ethernet = $(doctorUseEthernetElem).prop('checked');

                    if (setupOptions.ethernet) {
                        ga('send', 'event', gaCategory, 'Doctor using Ethernet');    
                    }

                    if ($(doctorSetKeepAliveCheckboxElem).prop('checked')) {
                        setupOptions.keepAlive = parseInt($(doctorKeepAliveInputElem).val());
                    }
                    
                    flashDeviceOptions.setupBit = 'done';
                }

                hideDeviceFirmwareInfo();
                    
                if (mode == 'doctor') {
                    checkOwnership();
                }

                if (setupOptions.addToProduct) {
                    await addToProduct();
                }

                // This is used for both setup device and device doctor
                flashDeviceOptions.mode = mode;

                await flashDevice();

                if (mode == 'doctor' || mode == 'setup') {
                    if (setupOptions.ethernet) {
                        reqObj = {
                            op: 'connect',
                        };
                        await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
        
                        waitDeviceOnline();        
                    }
                    else
                    if (deviceInfo.wifi) {
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
            ga('send', 'event', gaCategory, 'Started Wi-Fi Scan');    

            // Start Wi-Fi scan
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

            let addedNetworks = {};

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

            const radioSelectionUpdate = function() {
                const checkedItems = $('input[name="selectedNetwork"]:checked');
                if (checkedItems.length > 0) {
                    $(wifiSettingsTableElem).show();

                    const ssid = $(checkedItems).val();

                    const wifiNetworkInfo = addedNetworks[ssid].respObj;

                    // sec values (WLanSecurityType):
                    // WLAN_SEC_UNSEC = 0,
                    // WLAN_SEC_WEP = 1,
                    // WLAN_SEC_WPA = 2,
                    // WLAN_SEC_WPA2 = 3,
                    // WLAN_SEC_WPA_ENTERPRISE = 4,
                    // WLAN_SEC_WPA2_ENTERPRISE = 5,
                    const secNames = [ 'Unsecured', 'WEP', 'WPA', 'WPA2', 'WPA Enterprise', 'WPA2 Enterprise'];

                    $(wifiSecurityTypeElem).text(secNames[wifiNetworkInfo.sec]);

                    $(eapTypeRowElem).hide();
                    $(passwordRowElem).hide();
                    $(wifiUsernameRowElem).hide();
                    $(outerIdentityRowElem).hide();
                    $(caCertRowElem).hide();
                    $(privateKeyRowElem).hide();
                    $(clientCertRowElem).hide();

                    if (wifiNetworkInfo.sec == 0) {
                        // Unsecured
                    }
                    else
                    if (wifiNetworkInfo.sec >= 1 && wifiNetworkInfo.sec <= 3) {
                        // WEP, WPA, WPA2
                        setStatus('Enter Wi-Fi network password and click Select Wi-Fi Network');
                        $(passwordRowElem).show();

                        $(passwordInputElem).focus();
                        $(passwordInputElem).select();            
                    }
                    else
                    if (wifiNetworkInfo.sec >= 4 && wifiNetworkInfo.sec <= 5) {
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
                
                // Setting credentials can take a few seconds, so put up the next step first
                // so it's clear that the button worked
                setSetupStep('setupStepWaitForOnline');

                const checkedItems = $('input[name="selectedNetwork"]:checked');
                const ssid = $(checkedItems).val();

                const wifiNetworkInfo = addedNetworks[ssid].respObj;

                let reqObj = {
                    op: 'wifiSetCredentials',
                    ssid,
                    sec: wifiNetworkInfo.sec,
                    cip: wifiNetworkInfo.cip,                    
                };

                if (wifiNetworkInfo.sec >= 1 && wifiNetworkInfo.sec <= 3) {
                    // WEP, WPA, WPA2
                    reqObj.pass = $(passwordInputElem).val();
                }
    
                if (wifiNetworkInfo.sec >= 4 && wifiNetworkInfo.sec <= 5) {
                    // Enterprise
                    const eapMode = parseInt($(eapSelectElem).val());

                    if (eapMode == 0) {
                        // PEAP/MSCHAPv2
                        // Requires: Inner Identity, Password
                        // Optional: Root CA, Outer Identity
                        reqObj.eap = 25; // WLAN_EAP_TYPE_PEAP
                        reqObj.username = $(wifiUsernameElem).val();
                        reqObj.pass = $(passwordInputElem).val();
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

                    ga('send', 'event', gaCategory, 'Wi-Fi Credentials Set');    

                }
                console.log('sending request', reqObj);

                await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                reqObj = {
                    op: 'connect',
                };
                await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                waitDeviceOnline();
                return;
            });

            radioSelectionUpdate();

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

                        if (!addedNetworks[respObj.ssid]) {
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
    
                            const rowElem = document.createElement('tr');
    
                            let colElem;
                            let radioElem;
    
                            // Radio button
                            colElem = document.createElement('td');
                            {
                                radioElem = document.createElement('input');
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

                            addedNetworks[respObj.ssid] = {
                                respObj,
                                rowElem,
                                radioElem
                            };
                        }                        
                    }
                    if (respObj.done) {
                        $(thisElem).find('.searchingWiFi').css('visibility', 'hidden');

                        $(thisElem).find('.scanAgain').prop('disabled', false);

                        const numNetworks = Object.keys(addedNetworks).length;
                        if (numNetworks == 0) {
                            setSetupStep('setupStepNoWiFi');
                        }
                        else
                        if (numNetworks == 1) {
                            const ssid = Object.keys(addedNetworks)[0];
                            $(addedNetworks[ssid].radioElem).trigger('click');
                        }

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

        };

        $(thisElem).find('.scanAgain').on('click', configureWiFi);

        const waitDeviceOnline = async function() {
            try {
                setSetupStep('setupStepWaitForOnline');
    
                $(userInfoElem).show();

                ga('send', 'event', gaCategory, 'waitDeviceOnline');    


                if (mode == 'doctor') {
                    if (deviceLookup && !deviceLookup.deviceInfo) {
                        setupOptions.noClaim = !$('.doctorClaimDevice').prop('checked');
                    }
                    else {
                        setupOptions.noClaim = true;    
                    }
                    // In doctor, if there is an org, enable the ticket button
                    if (apiHelper.selectedOrg) {
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
                            ga('send', 'event', gaCategory, 'networkReady');    
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

                ga('send', 'event', gaCategory, 'online');    

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
                                'Accept': 'application/json'
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
                        ga('send', 'event', gaCategory, 'claimed device');    
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

                if (mode == 'doctor') {                    
                    // TODO: Check if device is claimed to my account and 
                    setSetupStep('setupStepTroubleshootingSuccess');
                    ga('send', 'event', gaCategory, 'doctor success');    
                    return;
                }

                // TODO: Possibly allow naming in troubleshooting mode if name is not set
                nameDevice();
    
            }
            catch(e) {
                setSetupStep('setupStepClaimFailed');
                console.log('exception', e);
                ga('send', 'event', gaCategory, 'Exception', 'claim failed');
            }

            
        };

        const nameDevice = async function() {
            setSetupStep('setupStepNameDevice');

            const trochees = [
                'aardvark', 'bacon', 'badger', 'banjo', 'bobcat', 'boomer', 'captain', 'chicken', 'cowboy', 'cracker',
                'cranky', 'crazy', 'dentist', 'doctor', 'dozen', 'easter', 'ferret', 'gerbil', 'hacker', 'hamster', 'hindu',
                'hobo', 'hoosier', 'hunter', 'jester', 'jetpack', 'kitty', 'laser', 'lawyer', 'mighty', 'monkey', 'morphing',
                'mutant', 'narwhal', 'ninja', 'normal', 'penguin', 'pirate', 'pizza', 'plumber', 'power', 'puppy', 'ranger',
                'raptor', 'robot', 'scraper', 'scrapple', 'station', 'tasty', 'trochee', 'turkey', 'turtle', 'vampire',
                'wombat', 'zombie'];
        
        
            const getRandomTrochee = function() {
                const arr = trochees;
                const parts = [];
                for (let i = 0; i < 2; i++) {
                    const a = Math.floor(Math.random() * arr.length);
                    parts.push(arr[a]);
                }
                return parts.join('_');
            };

            const nameInputElem = $(thisElem).find('.nameInput');
            const setNameButtonElem = $(thisElem).find('.setName');

            $(nameInputElem).val(getRandomTrochee());
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
                            'Accept': 'application/json'
                        },
                        method: 'PUT',
                        success: function (resp, textStatus, jqXHR) {
                            resolve(resp);
                        },
                        url: requestUrl
                    };
        
                    $.ajax(request);            
                });
                ga('send', 'event', gaCategory, 'set name');    

                setupDone();
            });

            
            $(thisElem).find('.skipNaming').on('click', function() {
                ga('send', 'event', gaCategory, 'skip naming');    
                setupDone();
            });

            
        };

        const selectDevice = async function() {
            const filters = [
                {vendorId: 0x2b04}
            ];
        


            try {
                $(setupSelectDeviceButtonElem).prop('disabled', false);
        
            
                if (usbDevice) {
                    await usbDevice.close();
                    usbDevice = null;
                }

                const nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
        
                usbDevice = await ParticleUsb.openNativeUsbDevice(nativeUsbDevice, {});

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
        });        

        const setupDone = async function() {
            setSetupStep('setupStepDone');

            ga('send', 'event', gaCategory, 'setupDone');    

            if (setupOptions.addToProduct) {
                $(thisElem).find('.setupStepDoneNonProduct').hide();
            }
            else {
                $(thisElem).find('.setupStepDoneNonProduct').show();
            }
            

        };
    });

});
