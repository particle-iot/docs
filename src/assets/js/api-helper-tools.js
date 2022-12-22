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


        const claimLoggedInCheckboxElem = $(thisPartial).find('.claimLoggedInCheckbox');
        const claimTokenCheckboxElem = $(thisPartial).find('.claimTokenCheckbox');
        const claimTokenInputElem = $(thisPartial).find('.claimTokenInput');

        const selectFileButtonElem = $(thisPartial).find('.selectFileButton');
        const fileDropZoneElem = $(thisPartial).find('.fileDropZone');
        const importFileInputElem = $(thisPartial).find('.importFileInput');
        const manualEntryInputElem = $(thisPartial).find('.manualEntryInput');
        const addButtonElem = $(thisPartial).find('.addButton');

        const markDevelopmentCheckboxElem = $(thisPartial).find('.markDevelopmentCheckbox');
        const nameDevicePrefixElem = $(thisPartial).find('.nameDevicePrefix');

        const prepareButtonElem = $(thisPartial).find('.prepareButton');
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
                        title: 'Named',
                        key: 'named',
                        width: 10,
                    },
                    {
                        title: 'Development',
                        key: 'development',
                        width: 10,
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

            options.claimLogin = $(claimLoggedInCheckboxElem).prop('checked');
            options.claimToken = $(claimTokenCheckboxElem).prop('checked');

            options.development = $(markDevelopmentCheckboxElem).prop('checked');

            options.name = getNameRadio();
            if (options.name == 'sequential') {
                options.namePrefix = $(nameDevicePrefixElem).val();
            }

            // options.username = apiHelper.auth.username;
            // options.accessToken = apiHelper.auth.access_token;

            return options
        }


        $(claimLoggedInCheckboxElem).on('click', function() {
            const checked = $(this).prop('checked');
            if (checked) {
                $(claimTokenCheckboxElem).prop('checked', false);        
            }
            $(thisPartial).trigger('updateSearchParam');
        });
        $(claimTokenCheckboxElem).on('click', function() {
            const checked = $(this).prop('checked');
            if (checked) {
                $(claimLoggedInCheckboxElem).prop('checked', false);        
            }
            $(thisPartial).trigger('updateSearchParam');
        });

        let tokenInputTimer;

        const tokenInputMakePassword = function() {
            $(claimTokenInputElem).prop('type', 'password');    
        }

        $(claimTokenInputElem).on('input', function() {
            const text = $(claimTokenInputElem).val().trim();
            
            if (tokenInputTimer) {
                clearTimeout(tokenInputTimer);
                tokenInputTimer = 0;
            }
            if (text.length == 0) {
                $(claimTokenCheckboxElem).prop('checked', false);        
            }
            else {
                // Token is 40 characters, hexadecimal
                const tokenRE = /^[A-Fa-f0-9]{40}$/;
                if (text.match(tokenRE)) {
                    $(claimLoggedInCheckboxElem).prop('checked', false);        
                    $(claimTokenCheckboxElem).prop('checked', true);        
                    setStatus('');
                }
                else {
                    setStatus('Access tokens must be 40 hexadecimal characters');
                }

                $(claimTokenInputElem).prop('type', 'text');    
                tokenInputTimer = setTimeout(tokenInputMakePassword, 2000);
            }
        });
        
        $(claimTokenInputElem).on('blur', function() {
            if (tokenInputTimer) {
                clearTimeout(tokenInputTimer);
                tokenInputTimer = 0;
            }
            tokenInputMakePassword();
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


        const urlConfigFields = ['claimLogin', 'claimToken', 'name', 'namePrefix', 'development'];

        {
            let value = urlParams.get('claimLogin');
            if (value) {
                $(claimLoggedInCheckboxElem).prop('checked', true);
            }
            value = urlParams.get('claimToken');
            if (value) {
                $(claimLoggedInCclaimTokenCheckboxElemheckboxElem).prop('checked', true);
                if (typeof value == 'string') {
                    $(claimTokenInputElem).val(value);
                }
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
        $(document).on('updateSearchParam', function() {
            console.log('import devices updateSearchParam');
            try {
                let options = {};
                getOptions(options);

                let urlConfig = {};
                // tableObj.getUrlConfigObj(urlConfig);

                productSelectorObj.getUrlConfigObj(urlConfig);
                
                deviceGroup.getUrlConfigObj(urlConfig);

                for(const field of urlConfigFields) {
                    if (options[field]) {
                        urlConfig[field] = options[field];
                    }
                }

                const searchStr = $.param(urlConfig);
    
                history.pushState(null, '', '?' + searchStr);     
            }
            catch(e) {
                console.log('exception', e);
            }
        });
        
        $(selectFileButtonElem).on('click', function() {
            $(importFileInputElem).trigger('click');
        });

        const parseMultiLine = async function(text) {
            let hasDevices = false;

            for(let line of text.split(/[\r\n]/)) {
                line = line.trim();
                if (line.length > 0) {
                    const parsed = await apiHelper.parseDeviceLine(line);
                    if (parsed) {
                        tableObj.addRow(parsed, {show: true, addToTableData: true, sort: true});
                        $(prepareButtonElem).prop('disabled', false);
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
                $(prepareButtonElem).prop('disabled', false);
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


        $(prepareButtonElem).on('click', async function() {
            // Download the device list for the product
            const options = getOptions();

            setStatus('Retrieving product device list...');
            deviceList = await apiHelper.getAllDevices({productId:options.productId});
            console.log('deviceList', deviceList);
            console.log('tableObj.tableData', tableObj.tableData);
            for(let tableDeviceObj of tableObj.tableData.data) {
                let deviceObj = deviceList.find(e => (e.id == tableDeviceObj.deviceId));
                if (!deviceObj) {
                    deviceObj = deviceList.find(e => (e.serial_number == tableDeviceObj.serial));
                }
                if (!deviceObj) {
                    deviceObj = deviceList.find(e => (e.iccid == tableDeviceObj.iccid));
                }

                if (deviceObj) {
                    console.log('found tableDeviceObj', tableDeviceObj);
                    console.log('deviceObj', deviceObj);

                    if (!tableDeviceObj.deviceId && deviceObj.id) {
                        tableDeviceObj.deviceId = deviceObj.id;
                    }
                    if (!tableDeviceObj.serial && deviceObj.serial_number) {
                        tableDeviceObj.serial = deviceObj.serial_number;
                    }
                    if (!tableDeviceObj.iccid && deviceObj.iccid) {
                        tableDeviceObj.iccid = deviceObj.iccid;
                    }
                    if (!tableDeviceObj.name && deviceObj.name) {
                        tableDeviceObj.name = deviceObj.name;                        
                    }
                    if (!tableDeviceObj.claimed && deviceObj.owner) {
                        tableDeviceObj.claimed = deviceObj.owner;
                    }
                    if (!tableDeviceObj.development && deviceObj.development) {
                        tableDeviceObj.development = '\u2705'; // green check
                    }
                    if (!tableDeviceObj.added) {
                        tableDeviceObj.added = '\u2705'; // green check
                    }
                }

            }

            tableObj.refreshTable(tableObj.tableData);

            setStatus('Ready to import');

        });
        $(importButtonElem).on('click', function() {

        });
        $(clearButtonElem).on('click', function() {
            tableObj.refreshTable([]);
            $(prepareButtonElem).prop('disabled', true);
            $(importButtonElem).prop('disabled', true);
        });


    });



});
