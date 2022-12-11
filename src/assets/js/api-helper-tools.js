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


/*
    $('.apiHelperImportDevices').each(function() {
        const thisPartial = $(this);
        const gaCategory = 'importDevices';

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

        const urlParams = new URLSearchParams(window.location.search);


        const tableConfigObj = {
            gaCategory,
            fieldSelector: {
                showControl: false,
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
                        title: 'Serial',
                        key: 'serial_number',
                        checked: true,
                        width: 20
                    },
                    {
                        title: 'SKU',
                        key: '_sku',
                        checked: true,
                        width: 10
                    }
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
        
        $(thisPartial).data('setConfigObj')(tableConfigObj);
        $(thisPartial).data('loadUrlParams')(urlParams);
        

        const setStatus = function(s) {
            $(statusElem).text(s);
        }

        const getOptions = function(options) {
            
            $(productOrSandboxSelectorElem).data('getOptions')(options);
            $(thisPartial).data('getOptions')(options);

            options.username = apiHelper.auth.username;
            options.accessToken = apiHelper.auth.access_token;
        }

        const clearDeviceList = function() {
            $(thisPartial).data('clearList')();
        };

        const getTableData = async function(configObj, options) {

            let tableData = {
                keys:[],
                titles:[],
                widths:[],
                indexFor: {}
            }
            
            if (options.export && options.format == 'deviceId') {
                tableData.keys.push('id');
            }
            else
            if (options.export && options.format == 'iccid') {
                tableData.keys.push('iccid');                
            }
            else {
                for(field of configObj.fieldSelector.fields) {
                    if (!configObj.fieldSelector.showControl || field.isChecked()) {
                        tableData.keys.push(field.key);
                        tableData.titles.push(field.customTitle ? field.customTitle : field.title);
                        tableData.widths.push(parseInt(field.customWidth ? field.customWidth : field.width));
                        tableData.indexFor[field.key] = tableData.keys.length - 1;
                    }
                }    
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

                    for(const key of tableData.keys) {
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
        const refreshTable = async function(configObj) {            
            // 
            let options = {};
            getOptions(options);

            const tableData = await getTableData(configObj, options);

            $(thisPartial).data('refreshTable')(tableData, options);

        };

        const getDeviceList = async function(options) {
            $(thisPartial).data('clearList')();

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

                await refreshTable($(thisPartial).data('getConfigObj')());

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
        $(thisPartial).on('fieldSelectorUpdate', async function(event, config) {
            await refreshTable(config);
            $(thisPartial).trigger('updateSearchParam');
        });

        // This is triggered to update the URL search parameters when settings change
        $(thisPartial).on('updateSearchParam', function() {
            try {
                let options = {};
                getOptions(options);

                let urlConfig = {};
                $(thisPartial).data('getUrlConfigObj')(urlConfig);

                $(productOrSandboxSelectorElem).data('getUrlConfigObj')(urlConfig);
                
                urlConfig.format = options.format;
                urlConfig.header = options.header;
                urlConfig.dateFormat = options.dateFormat;
                
                const searchStr = $.param(urlConfig);
    
                history.pushState(null, '', '?' + searchStr);     
            }
            catch(e) {
                console.log('exception', e);
            }
        });



    });

*/


});
