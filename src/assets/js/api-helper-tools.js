$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }



    $('.apiHelperListDevices').each(function() {
        const thisPartial = $(this);
        const gaCategory = 'listDevices';

        const productOrSandboxSelectorElem = $(thisPartial).find('.apiHelperProductOrSandboxSelector');
        const productSelectElem = $(thisPartial).find('.apiHelperProductSelect');
        const actionButtonElem = $(thisPartial).find('.actionButton');
        
        const statusElem = $(thisPartial).find('.apiHelperStatus');

        const progressDivElem = $(thisPartial).find('.progressDiv');
        const progressElem = $(progressDivElem).find('progress');

        if (!apiHelper.auth) {
            // Not logged in
            $(thisPartial).hide();
            return;
        }

        let deviceList;

        const urlParams = new URLSearchParams(window.location.search);

        const tableObj = $(thisPartial).data('table');
        const productSelectorObj = $(productOrSandboxSelectorElem).data('productSelector');

        const tableConfigObj = {
            gaCategory,
            fieldSelector: {
                showControl: true,
                height: '300px',
                fields: [
                    {
                        title: 'Device ID',
                        key: 'id',
                        checked: true,
                        width: 24
                    },
                    {
                        title: 'Device Name',
                        key: 'name',
                        checked: true,
                        width: 15
                    },
                    {
                        title: 'ICCID',
                        key: 'iccid' ,
                        checked: true,
                        width: 20
                    },
                    {
                        title: 'IMEI',
                        key: 'imei',
                        width: 16
                    },
                    {
                        title: 'Serial',
                        key: 'serial_number',
                        width: 20
                    },
                    {
                        title: 'SKU',
                        key: '_sku',
                        width: 10
                    },
                    {
                        title: 'Wi-Fi MAC Address',
                        key: 'mac_wifi',
                        width: 14
                    },
                    {
                        title: 'Groups',
                        key: 'groups',
                        width: 15
                    },
                    {
                        title: 'Owner',
                        key: 'owner',
                        width: 16
                    },
                    {
                        title: 'Last Heard',
                        key: 'last_heard'
                    },
                    {
                        title: 'Last Handshake',
                        key: 'last_handshake_at'
                    },
                    {
                        title: 'Last IP',
                        key: 'last_ip_address'
                    },
                    {
                        title: 'Online',
                        key: 'online'
                    },
                    {
                        title: 'Status',
                        key: 'status'
                    },
                    {
                        title: 'Device OS Version',
                        key: 'system_firmware_version'
                    },
                    {
                        title: 'Product ID',
                        key: 'product_id'
                    },
                    {
                        title: 'Platform ID',
                        key: 'platform_id'
                    },
                    {
                        title: 'Platform Name',
                        key: '_platformName'
                    },
                    {
                        title: 'Firmware Version',
                        key: 'firmware_version'
                    },
                    {
                        title: 'Desired Firmware Version',
                        key: 'desired_firmware_version'
                    },
                    {
                        title: 'Dev',
                        key: 'development'
                    },
                    {
                        title: 'Quarantined',
                        key: 'quarantined'
                    },
                    {
                        title: 'Denied',
                        key: 'denied'
                    },
                    {
                        title: 'Notes',
                        key: 'notes'
                    }
                ],
            },
            exportOptions: {
                showControl: true,
                showDateOptions: true,
                additionalFormats: [
                    {
                        title: 'Device ID Only (*.txt)',
                        key: 'deviceId',
                    },
                    {
                        title: 'ICCID Only (*.txt)',
                        key: 'iccid',
                    },
                ],
            },
            tableKeysOverride: function(options) {

                // Implement this to return keys other than the ones that are checked.
                // This is done for Device List export Device ID only or ICCID only, for example
                if (options.export && options.format == 'deviceId') {
                    return ['id'];
                }
                else
                if (options.export && options.format == 'iccid') {
                    return ['iccid'];                
                }

                return null;
            },
            generateFilename: function(options) {
                let fileName;

                switch(options.format) {
                    case 'deviceId':
                        fileName = 'devices.txt';
                        break;

                    case 'iccid':
                        fileName = 'iccids.txt';
                        // TODO: Need to filter out empty rows for this option
                        break;

                    default:
                        fileName = 'devices.' + options.format;
                        break;
                }
                return fileName;
            },
            filterData: function(filteredObj, xlsxData) {
                if (xlsxData.options.format == 'iccid') {
                    if (!filteredObj.iccid) {
                        // Remove from array
                        return true;
                    }
                }

                return false;
            },
        };
        
        tableObj.setConfig(tableConfigObj);
        tableObj.loadUrlParams(urlParams);
        

        const setStatus = function(s) {
            $(statusElem).text(s);
        }

        const getOptions = function(options) {
            
            productSelectorObj.getOptions(options);
            tableObj.getOptions(options);

            options.username = apiHelper.auth.username;
            options.accessToken = apiHelper.auth.access_token;
        }

        const clearDeviceList = function() {
            tableObj.clearList();
        };

        const getTableData = async function(options) {

            if (!options) {
                options = {};
                getOptions(options);
            }

            let tableData = {
            }
            
            if (deviceList) {
                tableData.data = [];

                for(const deviceInfo of deviceList) {
                    let d = {};

                    if (options.isSandbox && deviceInfo.product_id != deviceInfo.platform_id) {
                        // Listing sandbox devices and this is a product device
                        continue;
                    }

                    if (options.export && options.format == 'iccid' && !deviceInfo['iccid']) {
                        continue;
                    }

                    for(const field of tableConfigObj.fieldSelector.fields) {
                        const key = field.key;
                        if (key.startsWith('_')) {
                            // Internal converted field
                            switch(key) {
                                case '_platformName':
                                    d[key] = await apiHelper.getPlatformName(deviceInfo['platform_id']);
                                    break;
                                case '_sku': 
                                    d[key] = await apiHelper.getSkuFromSerial(deviceInfo['serial_number']);
                                    if (!d[key]) {
                                        d[key] = 'unknown';
                                    }
                                    break;
                            }
                        }
                        else
                        if (typeof deviceInfo[key] !== 'undefined') {
                            if (Array.isArray(deviceInfo[key])) {
                                // Occurs for groups and functions
                                d[key] = deviceInfo[key].join(' ');
    
                                // TODO: Also handle object for variables. Maybe boolean as we well
                            }
                            else {
                                let value = deviceInfo[key];

                                if (options.convertDates) {
                                    if (key == 'last_heard' || key == 'last_handshake_at' ) {
                                        value = new Date(value);
                                    }
                                }

                                d[key] = value;
                            }
                        }
                    }
                    tableData.data.push(d);
                }    
            }

            // TODO: Filtering of desired rows
            // TODO: Date formatting

            return tableData;
        } 

        // This gets the options, table data, and refreshes the actual table based on the new settings
        const refreshTable = async function() {            
            // 
            let options = {};
            getOptions(options);

            const tableData = await getTableData(options);

            tableObj.refreshTable(tableData, options);

        };

        const getDeviceList = async function(options) {
            tableObj.clearList();

            try {
                let stats = {
                    product: (options.productId != 0)
                };

                // 
                setStatus('Getting device list...');
                $(progressDivElem).show();

                deviceList = await apiHelper.getAllDevices({
                    productId: options.productId,
                    owner: options.username,
                    progressElem: progressElem
                });

                $(progressDivElem).hide();

                stats.count = deviceList.length;

                setStatus('Device list retrieved!');

                await refreshTable();

                ga('send', 'event', gaCategory, 'Get Devices Success', JSON.stringify(stats));
            }
            catch(e) {
                console.log('exception', e);
                ga('send', 'event', gaCategory, 'Get Devices Error');
            }

        };

        $(actionButtonElem).on('click', function() {
            let options = {};
            getOptions(options);
            getDeviceList(options);
        });

        $(productSelectElem).on('change', function() {
            clearDeviceList();
            $(thisPartial).trigger('updateSearchParam');
        });

        // This is triggered by the product selector when the product list changes
        $(thisPartial).on('updateProductList', async function(event, options) {
            clearDeviceList();
            $(thisPartial).trigger('updateSearchParam');
        });

        // This is triggered when the field selector updates, which requires that the table be refreshed
        // and the URL search parameters update, which needs to be done from the outer container
        // because it may include information in addition to the table itself.
        $(thisPartial).on('fieldSelectorUpdate', async function(event) {
            await refreshTable();
            $(thisPartial).trigger('updateSearchParam');
        });

        // This is triggered to update the URL search parameters when settings change
        $(thisPartial).on('updateSearchParam', function() {
            try {
                let options = {};
                getOptions(options);

                let urlConfig = {};
                tableObj.getUrlConfigObj(urlConfig);

                productSelectorObj.getUrlConfigObj(urlConfig);
                                
                const searchStr = $.param(urlConfig);
    
                history.pushState(null, '', '?' + searchStr);     
            }
            catch(e) {
                console.log('exception', e);
            }
        });



    });


    $('.apiHelperImportDevices').each(function() {
        const thisPartial = $(this);
        const gaCategory = 'importDevices';

        //const productOrSandboxSelectorElem = $(thisPartial).find('.apiHelperProductOrSandboxSelector');
        //const actionButtonElem = $(thisPartial).find('.actionButton');

        const productSelectorElem = $(thisPartial).find('.apiHelperCreateOrSelectProduct');

        const deviceGroupElem = $(thisPartial).find('.apiHelperDeviceGroup');


        const claimCheckboxElem = $(thisPartial).find('.claimCheckbox');
        const claimUsernameSelectElem = $(thisPartial).find('.claimUsernameSelect');

        const selectFileButtonElem = $(thisPartial).find('.selectFileButton');
        const fileDropZoneElem = $(thisPartial).find('.fileDropZone');
        const importFileInputElem = $(thisPartial).find('.importFileInput');
        const manualEntryInputElem = $(thisPartial).find('.manualEntryInput');
        const addButtonElem = $(thisPartial).find('.addButton');

        const markDevelopmentCheckboxElem = $(thisPartial).find('.markDevelopmentCheckbox');
        const nameDevicePrefixElem = $(thisPartial).find('.nameDevicePrefix');

        const importButtonElem = $(thisPartial).find('.importButton');
        const downloadButtonElem = $(thisPartial).find('.downloadButton');
        const clearButtonElem = $(thisPartial).find('.clearButton');

        // const Elem = $(thisPartial).find('.');

        
        const statusElem = $(thisPartial).find('.apiHelperStatus');

        const progressDivElem = $(thisPartial).find('.progressDiv');
        const progressElem = $(progressDivElem).find('progress');

        const setStatus = function(s = '') {
            $(statusElem).text(s);
        }

        const getNameRadio = function() {
            return $(thisPartial).find('input[name="nameDevices"]:checked').val();
        }
        const setNameRadio = function(value) {
            console.log('setNameRadio', value);
            $(thisPartial).find('input[name="nameDevices"]').prop('checked', false);
            $(thisPartial).find('input[name="nameDevices"][value="' + value + '"]').prop('checked', true);
        }
        
        if (!apiHelper.auth) {
            // Not logged in
            $(thisPartial).hide();
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);

        const tableObj = $(thisPartial).data('table');

        const productSelectorObj = $(productSelectorElem).data('productSelector');
        productSelectorObj.loadUrlParams(urlParams);


        let deviceGroup = $(deviceGroupElem).data('deviceGroup');

        let deviceList;
        let deviceListProductId;
        let teamList;

        const tableConfigObj = {
            gaCategory,
            fieldSelector: {
                showControl: false,                
                fields: [
                    {
                        title: 'Device ID',
                        key: 'deviceId',
                        width: 24
                    },
                    {
                        title: 'Device Name',
                        key: 'name',
                        width: 15
                    },
                    {
                        title: 'ICCID',
                        key: 'iccid' ,
                        width: 20
                    },
                    {
                        title: 'Serial',
                        key: 'serial',
                        width: 20
                    },
                    {
                        title: 'Added',
                        key: 'added',
                        width: 10,
                    },
                    {
                        title: 'Claimed',
                        key: 'claimed',
                        width: 10,
                    },
                    {
                        title: 'Development',
                        key: 'development',
                        width: 10,
                    },
                    {
                        title: 'Groups',
                        key: 'groups',
                        width: 20,
                    },
                ],
            },
            exportOptions: {
                showControl: false,
                showDateOptions: false,
            },
            tableOptions: {
                showAlways: true,
            },
        };

        tableObj.setConfig(tableConfigObj);
        // tableObj.loadUrlParams(urlParams);
        tableObj.refreshTable([], {});

        const getOptions = function(options = {}) {
            
            productSelectorObj.getOptions(options);
            // tableObj.getOptions(options);
            deviceGroup.getOptions(options); // Fills in groups array

            if ($(claimCheckboxElem).prop('checked')) {
                options.claim = $(claimUsernameSelectElem).val();
            }
            else {
                delete options.claim;
            }

            options.development = $(markDevelopmentCheckboxElem).prop('checked');

            options.name = getNameRadio();
            if (options.name == 'sequential') {
                options.namePrefix = $(nameDevicePrefixElem).val();
            }

            // options.username = apiHelper.auth.username;
            // options.accessToken = apiHelper.auth.access_token;

            return options
        }


        $(claimCheckboxElem).on('click', function() {
            $(thisPartial).trigger('updateSearchParam');
        });
        $(claimUsernameSelectElem).on('change', function() {
            $(thisPartial).trigger('updateSearchParam');
        });

        $(markDevelopmentCheckboxElem).on('click', function() {
            $(thisPartial).trigger('updateSearchParam');
        });

        $(thisPartial).find('input[name="nameDevices"]').on('click', function() {
            $(thisPartial).trigger('updateSearchParam');
        });


        $(nameDevicePrefixElem).on('input', function() {
            $(thisPartial).trigger('updateSearchParam');
        });
        
        // This is triggered by the product selector when the product list changes
        $(thisPartial).on('updateProductList', async function(event, options) {
            $(thisPartial).trigger('updateSearchParam');
        });


        const urlConfigFields = ['name', 'namePrefix', 'development'];

        {
            let value = urlParams.get('claim');
            if (value) {
                $(claimCheckboxElem).prop('checked', true);
                $(claimUsernameSelectElem).val(value);
            }
            value = urlParams.get('development');
            if (value) {
                $(markDevelopmentCheckboxElem).prop('checked', true);
            }

            value = urlParams.get('name');
            if (value) {
                setNameRadio(value);
                if (value == 'sequential') {
                    value = urlParams.get('namePrefix');
                    if (value) {
                        $(nameDevicePrefixElem).val(value);
                    }
                }
    
            }


            deviceGroup.loadUrlParams(urlParams);
        }

        // This is triggered to update the URL search parameters when settings change
        $(document).on('updateSearchParam', async function() {
            console.log('import devices updateSearchParam');
            try {
                let options = {};
                getOptions(options);


                if (options.productId && (!teamList || deviceListProductId != options.productId)) {
                    teamList = (await apiHelper.particle.listTeamMembers({ auth: apiHelper.auth.access_token, product:options.productId })).body.team;
                    // console.log('team', team);
    
                    $(claimUsernameSelectElem).empty();
                    for(const member of teamList) {
                        const optionElem = document.createElement('option');
                        $(optionElem).prop('value', member.username);
                        $(optionElem).text(member.username);                    
                        $(claimUsernameSelectElem).append(optionElem);
                    }
                    const claimValue = urlParams.get('claim');
                    if (claimValue) {
                        $(claimUsernameSelectElem).val(claimValue);
                    }
                }

                let urlConfig = {};
                // tableObj.getUrlConfigObj(urlConfig);

                productSelectorObj.getUrlConfigObj(urlConfig);
                
                deviceGroup.getUrlConfigObj(urlConfig);

                if ($(claimCheckboxElem).prop('checked')) {
                    urlConfig.claim = $(claimUsernameSelectElem).val();
                }
            
                for(const field of urlConfigFields) {
                    if (options[field]) {
                        urlConfig[field] = options[field];
                    }
                }

                const searchStr = $.param(urlConfig);
    
                history.pushState(null, '', '?' + searchStr);     
        
                if (!deviceList || deviceListProductId != options.productId) {
                    setStatus('Retrieving product device list...');
                    deviceList = await apiHelper.getAllDevices({productId:options.productId});
                    deviceListProductId = options.productId;
                    setStatus(deviceList.length + ' devices currently in product ' + options.productId);
                }
            }
            catch(e) {
                console.log('exception', e);
            }
        });
        
        $(selectFileButtonElem).on('click', function() {
            $(importFileInputElem).trigger('click');
        });

        const updateDeviceInfo = async function(tableDeviceObj) {
            let deviceObj;

            if (deviceList) {
                deviceObj = deviceList.find(e => (e.id == tableDeviceObj.deviceId));
                if (!deviceObj) {
                    deviceObj = deviceList.find(e => (e.serial_number == tableDeviceObj.serial));
                    if (!deviceObj) {
                        deviceObj = deviceList.find(e => (e.iccid == tableDeviceObj.iccid));
                    }
                }                
            }
    
            if (deviceObj) {
                tableDeviceObj.deviceObj = deviceObj;
                console.log('found tableDeviceObj', tableDeviceObj);
                console.log('deviceObj', deviceObj);

                if (deviceObj.id) {
                    tableDeviceObj.deviceId = deviceObj.id;
                }
                if (deviceObj.serial_number) {
                    tableDeviceObj.serial = deviceObj.serial_number;
                }
                if (deviceObj.iccid) {
                    tableDeviceObj.iccid = deviceObj.iccid;
                }
                if (deviceObj.name) {
                    tableDeviceObj.name = deviceObj.name;                        
                }
                if (deviceObj.owner) {
                    tableDeviceObj.claimed = deviceObj.owner;
                }
                if (deviceObj.development) {
                    tableDeviceObj.development = '\u2705'; // green check
                }
                if (!tableDeviceObj.added) {
                    tableDeviceObj.added = '\u2705'; // green check
                }
                if (deviceObj.groups) {
                    tableDeviceObj.groups = deviceObj.groups.join(', ');
                }
            }    
        };

        const parseMultiLine = async function(text) {
            let hasDevices = false;

            for(let line of text.split(/[\r\n]/)) {
                line = line.trim();
                if (line.length > 0) {
                    const tableDeviceObj = await apiHelper.parseDeviceLine(line);
                    if (tableDeviceObj) {
                        updateDeviceInfo(tableDeviceObj);
                        tableObj.addRow(tableDeviceObj, {show: true, addToTableData: true, sort: true});

                        $(importButtonElem).prop('disabled', false);
                        hasDevices = true;
                    }                
                }
            }
            return hasDevices;
        }

        const processFilesArray = function(files, index) {
            if (index < files.length) {
                let fileReader = new FileReader();
                fileReader.onload = async function() {
                    await parseMultiLine(fileReader.result);
                    processFilesArray(files, index + 1);
                };
                fileReader.readAsText(files[index]);                         
            }
        };

        $(importFileInputElem).on('change', function() {
            processFilesArray(this.files, 0);
        });

        $(fileDropZoneElem).on('dragenter', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
        $(fileDropZoneElem).on('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
        $(fileDropZoneElem).on('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();

            const files = e.originalEvent.dataTransfer.files;
            if (files) {
                processFilesArray(files, 0);
            }
        });

        $(downloadButtonElem).on('click', async function() {
            await tableObj.getXlsxData({toFile: true});

        });

        const parseManualInput = async function() {
            const text = $(manualEntryInputElem).val();

            if (parseMultiLine(text)) {
                $(manualEntryInputElem).val('');
            }
        };

        $(manualEntryInputElem).on('keydown', async function(ev) {
            if (ev.key != 'Enter') {
                return;
            }
    
            ev.preventDefault();
            await parseManualInput();
        });

        $(manualEntryInputElem).on('blur', async function() {
            await parseManualInput();
        });

        $(addButtonElem).on('click', async function() {
            await parseManualInput();
        });

        const deviceNameExistsInProduct = function(name) {
            if (name && deviceList) {
                for(const dev of deviceList) {
                    if (dev.name == name) {
                        return true;
                    }
                }    
            }
            return false;
        }

        const isNamePrefix = function(name, namePrefix) {
            if (name && name.startsWith(namePrefix)) {
                const value = parseInt(name.substring(namePrefix.length));
                if (!isNaN(value)) {
                    return value;
                }
            }
            return 0;
        }

        $(importButtonElem).on('click', async function() {
            const options = getOptions();

            // options.productId
            console.log('import options', options);

            // Get sequence number in case that option is used
            let lastSeqNum = 0;
            for(const dev of deviceList) {
                const seqNum = isNamePrefix(dev.name, options.namePrefix);
                if (seqNum > lastSeqNum) {
                    lastSeqNum = seqNum;
                }
            }
            console.log('lastSeqNum', lastSeqNum);
            // Import devices into product
            let devicesToImport = [];

            for(let tableDeviceObj of tableObj.tableData.data) {
                /*                
                if (tableDeviceObj.deviceObj && tableDeviceObj.deviceObj.product_id == options.productId) {
                    // Already in product
                    continue;
                }
                */

                if (tableDeviceObj.deviceId) {
                    devicesToImport.push(tableDeviceObj.deviceId);
                }
                else
                if (tableDeviceObj.serial) {
                    devicesToImport.push(tableDeviceObj.serial);
                }
                else
                if (tableDeviceObj.iccid) {
                    devicesToImport.push(tableDeviceObj.iccid);                    
                }
            }
            console.log('devicesToImport', devicesToImport);

            if (devicesToImport.length > 0) {
                setStatus('Importing ' + devicesToImport.length + ' devices...');

                let formData = new FormData();
    
                let blob = new Blob([devicesToImport.join('\n')], {type:'text/plain'});
                formData.append('file', blob, 'devices.txt');
                formData.append('import_sims', 'true');
                if (options.claim) {
                    formData.append('claim_user', options.claim);
                }

                const importRes = await new Promise(function(resolve, reject) {
    
                    $.ajax({
                        data: formData,
                        contentType: false,
                        error: function(err) {
                            console.log('error importing devices', err);
                            setStatus('Error importing devices');
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
                        url: 'https://api.particle.io/v1/products/' + options.productId + '/devices'
                    });    
                });
                console.log('importRes', importRes);
                // existingDeviceIds (array)
                // invalidDeviceIds (array)
                // nonmemberDeviceIds (array)
                // updated (number)
                // updatedDeviceIds (array)

                setStatus('Re-retrieving product device list...');
                deviceList = await apiHelper.getAllDevices({productId:options.productId});
                
                console.log('updated deviceList', deviceList);
    
                for(let tableDeviceObj of tableObj.tableData.data) {
                    if (!tableDeviceObj.deviceObj) {
                        updateDeviceInfo(tableDeviceObj);
                    }
                }
                tableObj.refreshTable();
       
       
            }
            if (options.development || options.name != 'none' || options.groups) {
                for(let tableDeviceObj of tableObj.tableData.data) {
                    if (!tableDeviceObj.deviceObj) {
                        // Was not added to the product
                        continue;
                    }

                    const reqObj = {

                    };

                    if (!tableDeviceObj.development) {
                        // Mark as development
                        reqObj.development = true;
                    }
                    
                    // Name device
                    let newName;
                    switch(options.name) {
                        case 'sequential':
                            const seqNum = isNamePrefix(tableDeviceObj.deviceObj.name, options.namePrefix);
                            if (seqNum == 0) {
                                newName = options.namePrefix + (++lastSeqNum);
                            }
                            break;

                        case 'serial':
                            if (tableDeviceObj.deviceObj.serial_number) {
                                newName = tableDeviceObj.deviceObj.serial_number;
                            }
                            break;

                        case 'random':
                            do {
                                newName = apiHelper.getRandomTrochee();
                            } while(deviceNameExistsInProduct(newName));
                            break;
                    }
                    if (newName && newName != tableDeviceObj.deviceObj.name) {
                        reqObj.name = newName;
                    }

                    // Device groups
                    if (options.groups && options.groups.length) {
                        reqObj.groups = options.groups;
                    }

                    const setRes = await new Promise(function(resolve, reject) {
                        $.ajax({
                            data: JSON.stringify(reqObj),
                            contentType: 'application/json',
                            error: function(err) {
                                console.log('error setting device info', err);
                                reject(err);
                            },
                            headers: {
                                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                'Accept': 'application/json'
                            },
                            method: 'PUT',
                            success: function (resp) {
                                resolve(resp);
                            },
                            url: 'https://api.particle.io/v1/products/' + options.productId + '/devices/' + tableDeviceObj.deviceId
                        });    
                    });
                    console.log('setRes', setRes);


                    // Fetch updated data
                    for(let ii = 0; ii < deviceList.length; ii++) {
                        if (deviceList[ii].id == tableDeviceObj.deviceId) {
                            /*
                            const deviceData = await apiHelper.particle.getDevice({ deviceId: tableDeviceObj.deviceId, product: options.productId, auth: apiHelper.auth.access_token });
                            console.log('deviceData', deviceData);
                            deviceList[ii] = tableDeviceObj.deviceObj = deviceData;
                            */
                            for(const key in setRes) {
                                if (!['id', 'updated_at'].includes(key)) {
                                    deviceList[ii][key] = tableDeviceObj.deviceObj[key] = setRes[key];
                                    console.log('updated ' + key, deviceList[ii][key]);
                                }
                            }
                        }
                    }


                    updateDeviceInfo(tableDeviceObj);
                    tableObj.refreshTable();

                }    
            }

            setStatus('Done!');


            /*
            for(let tableDeviceObj of tableObj.tableData.data) {
                console.log('tableDeviceObj', tableDeviceObj);
                console.log('deviceObj', tableDeviceObj.deviceObj); // will often be undefined

                // options.claim
                // options.development
                // options.name
                // options.namePrefix = $(nameDevicePrefixElem).val();
                if (options.name == 'sequential') {

                }

                // Add device to product
                let resp = await particle.addDeviceToProduct({
                    product: options.productId,
                    deviceId, 
                    auth: helper.auth
                });
        
                // Get device info
                const deviceInfo = (await particle.getDevice({ 
                    product: productInfo.id,
                    deviceId, 
                    auth: helper.auth 
                })).body;
                    
    
            }
            */
        });
        $(clearButtonElem).on('click', function() {
            tableObj.refreshTable([]);
            $(prepareButtonElem).prop('disabled', true);
            $(importButtonElem).prop('disabled', true);
        });


    });


    $('.apiHelperEventViewer2').each(function() {
        const thisPartial = $(this);

        const gaCategory = 'eventViewer2';

        const productOrSandboxSelectorElem = $(thisPartial).find('.apiHelperProductOrSandboxSelector');
        
        const decodeJsonCheckboxElem = $(thisPartial).find('.decodeJsonCheckbox');        
        const omitRawDataCheckboxElem = $(thisPartial).find('.omitRawDataCheckbox');

        const startButtonElem = $(thisPartial).find('.startButton');
        const pauseResumeButtonElem = $(thisPartial).find('.pauseResumeButton');
        const clearButtonElem = $(thisPartial).find('.clearButton');


        
        
        // const Elem = $(thisPartial).find('.');



        const statusElem = $(thisPartial).find('.apiHelperStatus');

        if (!apiHelper.auth) {
            // Not logged in
            $(thisPartial).hide();
            return;
        }

        let eventViewer = {};
        $(thisPartial).data('eventViewer', eventViewer);

        const urlParams = new URLSearchParams(window.location.search);

        eventViewer.tableObj = $(thisPartial).data('table');
        eventViewer.productSelectorObj = $(productOrSandboxSelectorElem).data('productSelector');

        const tableConfigObj = {
            gaCategory,
            fieldSelector: {
                showControl: true,
                height: '200px',
                fields: [
                    {
                        title: 'Event name',
                        key: 'name',
                        checked: true,
                        width: 15
                    },
                    {
                        title: 'Event data',
                        key: 'data',
                        checked: true,
                        width: 40
                    },
                    {
                        title: 'Published',
                        key: 'published_at',
                        checked: true,
                        width: 20
                    },
                    {
                        title: 'Device ID',
                        key: 'coreid',
                        checked: true,
                        width: 24
                    },

                ],
            },
            exportOptions: {
                showControl: true,
                showDateOptions: true,
            },
            tableOptions: {
                showAlways: true,
            },
        };
        
        eventViewer.tableObj.setConfig(tableConfigObj);
        eventViewer.tableObj.loadUrlParams(urlParams);
        eventViewer.tableObj.refreshTable([], {});


        const setStatus = function(s) {
            $(statusElem).text(s);
        }

        const getOptions = function(options = {}) {
            
            eventViewer.productSelectorObj.getOptions(options);
            eventViewer.tableObj.getOptions(options);

            eventViewer.decodeJson = options.decodeJson = $(decodeJsonCheckboxElem).prop('checked');
            eventViewer.omitRaw = options.omitRaw = $(omitRawDataCheckboxElem).prop('checked');

    
            return options;
        }

        eventViewer.processEvent = function(data) {
            let addedField = false;

            if (eventViewer.decodeJson) {
                try {
                    const dataJson = JSON.parse(data.data);

                    const processObject = function(obj, path) {
                        for(const key in obj) {
                            const newPath = path.length ? path + '.' + key : key;

                            if (typeof obj[key] == 'object' && !Array.isArray(obj[key])) {
                                processObject(obj[key], newPath);
                            }
                            else {
                                if (!eventViewer.tableObj.fieldSelectorObj.getFieldByKey(newPath)) {
                                    eventViewer.tableObj.fieldSelectorObj.addField({
                                        title: newPath,
                                        key: newPath,
                                        checked: true,
                                    });
                                    addedField = true;
                                }
                                if (Array.isArray(obj[key])) {
                                    data[newPath] = JSON.stringify(obj[key]);

                                }
                                else {
                                    data[newPath] = obj[key];                                                
                                }

                            }

                        }                                    
                    }
                    processObject(dataJson, '');

                    if (eventViewer.omitRaw) {
                        delete data.data;
                    }
                }
                catch(e) {                            
                    // console.log('exception parsing data json', e);
                }

            }
            eventViewer.tableObj.addRow(data, {show: true, addToTableData: true, sort: true});    
            if (addedField) {
                eventViewer.refreshTable();
            }
        }

        eventViewer.startStream = function() {
            const options = getOptions();

            let eventStreamOptions = {
                auth: apiHelper.auth.access_token
            };
            if (options.isSandbox) {
                eventStreamOptions.deviceId = 'mine';
            }
            if (options.productId) {
                eventStreamOptions.product = options.productId;
            }

            apiHelper.particle.getEventStream(eventStreamOptions).then(function(stream) {
                eventViewer.stream = stream;
                
                eventViewer.productSelectorObj.hide();

                stream.on('event', function(data) {
                    try {
                        if (!eventViewer.paused) {
                            eventViewer.processEvent(data);
                        }
                        else {
                            if (!eventViewer.pausedEvents) {
                                eventViewer.pausedEvents = [];
                            }
                            eventViewer.pausedEvents.push(data);
                        }
                    }
                    catch(e) {
                        console.log('exception in event handler', e);
                    }
                });
            });

        };

        eventViewer.refreshTable = async function() {            
            // 
            const options = getOptions();

            eventViewer.tableObj.refreshTable(eventViewer.tableObj.tableData, options);
        };

        $(decodeJsonCheckboxElem).on('click', function() {
            const checked = $(decodeJsonCheckboxElem).prop('checked');
            if (checked) {
                $(omitRawDataCheckboxElem).prop('disabled', false);
            }
            else {
                $(omitRawDataCheckboxElem).prop('disabled', true);
            }
            $(thisPartial).trigger('updateSearchParam');
        });

        $(omitRawDataCheckboxElem).on('click', function() {
            $(thisPartial).trigger('updateSearchParam');
        });

        $(startButtonElem).on('click', function() {
            eventViewer.startStream();
            eventViewer.paused = false;
            $(startButtonElem).prop('disabled', true);
            $(pauseResumeButtonElem).prop('disabled', false);
            $(clearButtonElem).prop('disabled', false);
        });

        $(pauseResumeButtonElem).on('click', function() {
            if (eventViewer.paused) {
                // Was paused and the button was "Resume" so now we're resumed
                $(pauseResumeButtonElem).text('Pause');
                eventViewer.paused = false;

                if (eventViewer.pausedEvents) {
                    for(const data of eventViewer.pausedEvents) {
                        eventViewer.processEvent(data);
                    }
                    eventViewer.pausedEvents = null;
                }
            }
            else {
                $(pauseResumeButtonElem).text('Resume');
                eventViewer.paused = true;
            }
        });

        $(clearButtonElem).on('click', function() {
            eventViewer.tableObj.refreshTable([], {});
        });

        // This is triggered by the product selector when the product list changes
        $(thisPartial).on('updateProductList', async function(event, options) {
            $(thisPartial).trigger('updateSearchParam');
        });

        // This is triggered when the field selector updates, which requires that the table be refreshed
        // and the URL search parameters update, which needs to be done from the outer container
        // because it may include information in addition to the table itself.
        $(thisPartial).on('fieldSelectorUpdate', async function(event) {
            await eventViewer.refreshTable();
            $(thisPartial).trigger('updateSearchParam');
        });

        // This is triggered to update the URL search parameters when settings change
        $(thisPartial).on('updateSearchParam', function() {
            try {
                let options = {};
                getOptions(options);

                let urlConfig = {};
                eventViewer.tableObj.getUrlConfigObj(urlConfig);

                eventViewer.productSelectorObj.getUrlConfigObj(urlConfig);
                                
                urlConfig.decodeJson = options.decodeJson;
                urlConfig.urlConfig = options.omitRaw;


                const searchStr = $.param(urlConfig);
    
                history.pushState(null, '', '?' + searchStr);     
            }
            catch(e) {
                console.log('exception', e);
            }
        });

        {
            let value = urlParams.get('decodeJson');
            if (value) {
                $(decodeJsonCheckboxElem).prop('checked', true);
            }
            value = urlParams.get('omitRaw');
            if (value) {
                $(omitRawDataCheckboxElem).prop('checked', true);
            }
        }


    });



});
