

apiHelper.uploadSchemaCodebox = function(schema, product, deviceId, next) {
    if (!apiHelper.auth) {
        return;
    }

    const setStatus = function(status) {
        $('.codeboxFlashStatus').html(status);
    };

    setStatus('Saving backup schema...');

    apiHelper.downloadSchema('backup-schema.json', product, deviceId, function(err) {
        if (!err) {
            setStatus('Uploading schema...');
            apiHelper.uploadSchema(schema, product, deviceId, function(err) {
                if (!err) {
                    setStatus('Schema uploaded!');
                    analytics.track('Upload Success Codebox', {category:'Tracker Schema'});
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);
                }
                else {
                    setStatus('Error saving schema ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);        
                }
            });
        }
        else {
            setStatus('Error saving backup schema ' + err);
            setTimeout(function() {
                setStatus('');
            }, 10000);
        }
    });




};

apiHelper.uploadSchema = function(schema, product, deviceId, next) {
    const deviceIdUrl = (deviceId == 'default') ? '' : '/' + deviceId; 

    $.ajax({
        data: schema,
        error: function(err) {
            next(err);
        },
        headers: {
            'Authorization':'Bearer ' + apiHelper.auth.access_token,
            'Content-Type':'application/schema+json',
            'X-Particle-Tool': 'particle-docs',
        },
        method: 'PUT',
        processData: false,
        success: function (resp) {
            next();
        },
        url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl
    }); 
};

apiHelper.uploadSchemaFile = function(file, product, deviceId, next) {
    const deviceIdUrl = (deviceId == 'default') ? '' : '/' + deviceId; 

    let fileReader = new FileReader();
    fileReader.onload = function() {
        apiHelper.uploadSchema(fileReader.result, product, deviceId, next);        
    };
    fileReader.readAsText(file);
};

apiHelper.downloadSchema = function(filename, product, deviceId, next) {
    const deviceIdUrl = (deviceId == 'default') ? '' : '/' + deviceId; 

    $.ajax({
        dataType: 'text',
        error: function(err) {
            next(err);
        },
        headers: {
            'Accept':'application/schema+json',
            'X-Particle-Tool': 'particle-docs',
        },
        method: 'GET',
        success: function (resp) {
            let blob = new Blob([resp], {type:'text/json'});
            saveAs(blob, filename);
            analytics.track('Download Success', {category:'Tracker Schema'});
            next();
        },
        headers: {
            'Authorization':'Bearer ' + apiHelper.auth.access_token,
            'X-Particle-Tool': 'particle-docs',
        },
        url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl
    });    
};

apiHelper.getTrackerConfig = function(product, deviceId, completion) {
    const deviceIdUrl = (!deviceId || deviceId == 'default') ? '' : '/' + deviceId; 

    $.ajax({
        dataType: 'json',
        error: function(err) {
            completion();
        },
        headers: {
            'Accept':'application/json',
            'X-Particle-Tool': 'particle-docs',
        },
        method: 'GET',
        success: function (resp) {
            completion(resp.configuration);
        },
        headers: {
            'Authorization':'Bearer ' + apiHelper.auth.access_token,
            'X-Particle-Tool': 'particle-docs',
        },
        url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl
    });    

};


$(document).ready(async function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    let sandboxTrackerProducts = [];
    let fileIndex = {};

    await new Promise(function(resolve, reject) {
        fetch('/assets/files/tracker/file-index.json')
        .then(response => response.json())
        .then(function(data) {
            fileIndex = data;
            resolve();
        });
    });

    let urlOptions = {};

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams) {
        let opt;
        org = urlParams.get('org');
        if (opt) {
            urlOptions.org = opt;
        }        

        opt = urlParams.get('product');
        if (opt) {
            urlOptions.product = parseInt(opt);
        }
        opt = urlParams.get('mode');
        if (opt) {
            urlOptions.mode = opt;
        }
    }

    
    const trackerSchemeButtonElems = $('.apiHelperConfigSchemaUpload, .apiHelperConfigSchemaDownload, .apiHelperConfigSchemaSet, ' + 
        '.codeboxUploadSchemaButton, .apiHelperTrackerConfigSet, .apiHelperTrackerConfigDefault');

    const buildTrackerDeviceMenu = function(product) {
        const selectElems = $('.apiHelperTrackerDeviceSelect');

        if (!product) {
            let html = '<option disabled>Select a product first</option>'
            $('.apiHelperTrackerDeviceSelect').html(html);
            $(trackerSchemeButtonElems).prop('disabled', true);
            return;
        }

        $(selectElems).each(function() {
            const selectElem = $(this);
            $(selectElem).html('');

            if ($(selectElem).attr('data-has-product-default')) {
                $(selectElem).append('<option value="default">Product Default</option>');
            }
        });

        let deviceList = [];

        const fetchPage = function(page) {
            apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token, product:product, page }).then(
                function(data) {
                    data.body.devices.forEach(function(dev) {
                        deviceList.push(dev);
                    });

                    if (page < data.body.meta.total_pages) {
                        fetchPage(++page);
                    }
                    else {
                        deviceList.sort(function(a,b) {
                            return a.name.localeCompare(b.name);
                        });

                        let html = '';
                        for(const dev of deviceList) {
                            html += '<option value="' + dev.id + '">' + dev.name + '</option>';
                        }
                        $(selectElems).append(html);

                        $(selectElems).trigger('change');
                        $(trackerSchemeButtonElems).prop('disabled', false);
                    }
                },
                function(err) {            
                }
            );            
        }    
        fetchPage(1);
    };
    const buildProductMenu = async function(productArray, elems, options) {
        if (!options) {
            options = {};
        }
        let html = '';

        if (urlOptions.product) {
            if (!productArray.find(e => e.id == urlOptions.product)) {
                try {
                    const productRes = await apiHelper.particle.getProduct({ 
                        product: urlOptions.product,
                        auth: apiHelper.auth.access_token 
                    });
                    // console.log('productRes', productRes);
                    // body.product.
                    //  id, name, description, device_count, groups[], etc.
    
                    html += '<option value="' + urlOptions.product + '">' + productRes.body.name + ' (' + urlOptions.product + ')</option>';    
                }
                catch(e) {
                    html += '<option value="' + urlOptions.product + '">' + urlOptions.product + '</option>';    
                }

                $(elems).html(html);
                $(elems).trigger('change');
                return;
            }    
        }

        if (productArray.length == 0) {
            html = '<option disabled>No Tracker products available</option>'
            buildTrackerDeviceMenu();
            $(elems).html(html);
        }        
        else {
            if (options.noSelectFirst) {
                html += '<option value="" selected>Select Product</option>'
            }
            for(const prod of productArray) {
                html += '<option value="' + prod.id + '">' + prod.name + ' (' + prod.id + ')</option>';
            }    

            $(elems).html(html);

            if (!options.noSelectFirst) {
                $(elems).trigger('change');
            }
        }
        if (urlOptions.product) {
            $(elems).val(urlOptions.product);
            $(elems).trigger('change');
        }

    };

    let orgsDisabled = false;

    function disableOrgSelection() {
        const orgSelectElems = $('.apiHelperTrackerOrgSelect');
        $(orgSelectElems).val('sandbox');
        $(orgSelectElems).trigger('change');
        orgsDisabled = true;

        $('.apiHelperTrackerOrgRow').hide();
    }


    async function setupMenus() {
        try {
            const productsResp = await apiHelper.getProducts();
            sandboxTrackerProducts = apiHelper.filterByTrackerPlatform(productsResp.products);

            await buildProductMenu(sandboxTrackerProducts, $('.apiHelperTrackerProductSelect'), {});
            if (sandboxTrackerProducts.length > 0) {
                $('.apiHelperTrackerProductSelect').trigger('change');
            }
            else {
                buildTrackerDeviceMenu();
            }

            const productSelectElems = $('.apiHelperTrackerProductSelect');

            if (productSelectElems.length > 0 && apiHelper.auth && !urlOptions.product) {
                const orgsData = await apiHelper.getOrgs();

                // No orgs: orgsData.organizations empty array
                // Object in array orgsData.organizations: id, slug, name
                
                if (!orgsDisabled && orgsData.organizations.length > 0) {
                    const orgSelectElems = $('.apiHelperTrackerOrgSelect');

                    let html = '<option value="sandbox" checked>Sandbox</option>';
                    for(let org of orgsData.organizations) {
                        html += '<option value="' + org.id + '">' + org.name + '</option>';
                    }
                    $(orgSelectElems).html(html);

                    $('.apiHelperTrackerOrgRow').show();

                    $(orgSelectElems).each(async function() {
                        const orgSelectElem = $(this);

                        $(orgSelectElem).on('change', async function() {
                            const productSelectElems = $('.apiHelperTrackerProductSelect');

                            const orgId = $(orgSelectElem).val();
                            if (orgId != 'sandbox') {
                                const orgProductsResp = await apiHelper.getOrgProducts(orgId);
                            
                                // Array is orgProductsResp.products
                                // Each contains id and name
            
                                const orgTrackerProducts = apiHelper.filterByTrackerPlatform(orgProductsResp.products);

                                await buildProductMenu(orgTrackerProducts, productSelectElems, {noSelectFirst:true});
                            }
                            else {
                                // 
                                await buildProductMenu(sandboxTrackerProducts, productSelectElems, {});
                            }
                        
                            $(orgSelectElems).val(orgId);
                        });

                    });
                }
                else {
                    $('.apiHelperTrackerOrgRow').hide();
                }
            }            
        }
        catch(e) {
            if (e.status == 401) {
                // Expired token
            }
            apiHelper.notLoggedIn();
        }
    };

    if (apiHelper.auth) {
        setupMenus();
    }
    else {
        // Not logged in
    }


    $('.apiHelperTrackerProductSelect').each(function(index) {

        const parentDiv = $(this).closest('div');
        
        $(this).on('change', function() {
            const product = $(parentDiv).find('.apiHelperTrackerProductSelect').val();
            
            buildTrackerDeviceMenu(product);

            // Change all product popups to this value
            $('.apiHelperTrackerProductSelect').val(product);
        });        
    });

    if ($('.apiHelperTrackerConfig').length > 0 && apiHelper.auth) {
        $('.apiHelperTrackerConfig').each(function() {
            const trackerConfigElem = $(this);

            const setStatus = function(status) {
                $(trackerConfigElem).find('.apiHelperTrackerConfigStatus').html(status);
            };

            const deviceSelectElem = $(trackerConfigElem).find('.apiHelperTrackerDeviceSelect');

            const buttonElems = $(trackerConfigElem).find('.apiHelperTrackerConfigSet, .apiHelperTrackerConfigDefault');

            const getThisConfig = function() {
                const product = $(trackerConfigElem).find('.apiHelperTrackerProductSelect').val();
                if (!product) {
                    $(buttonElems).prop('disabled', true);
                    setStatus('No Tracker product selected');
                    return;
                }

                const deviceId = $(deviceSelectElem).val();
                if (!deviceId) {
                    $(buttonElems).prop('disabled', true);
                    setStatus('No devices in this product');
                    return;
                }

                apiHelper.getTrackerConfig(product, deviceId, function(configObj) {

                    $(buttonElems).prop('disabled', false);

                    if (!configObj) {
                        return;
                    }

                    const showElem = $(trackerConfigElem).find('.apiHelperTrackerConfigShow');

                    let show = $(trackerConfigElem).find('.apiHelperTrackerConfigShow').val();

                    $(showElem).find('option[value="current"]').prop('disabled', !configObj.current);
                    $(showElem).find('option[value="pending"]').prop('disabled', !configObj.pending);

                    if (show == 'current') {
                        if (configObj.pending) {
                            show = 'pending';
                        }
                        else {
                            show = '';
                        }
                    }
                    else {
                        // pending
                        if (configObj.current) {
                            show = 'current';
                        }
                        else {
                            show = '';
                        }
                    }
                    $(trackerConfigElem).find('.apiHelperTrackerConfigShow').val(show);

                    if (show) {
                        apiHelper.jsonLinterSetValue(trackerConfigElem, JSON.stringify(configObj[show])); 
                    }
                    else {
                        apiHelper.jsonLinterSetValue(trackerConfigElem, ''); 
                        setStatus('No custom configuration');
                    }

                });
            };

            $(deviceSelectElem).on('change', function() {
                setStatus('');
                getThisConfig();

            });

            $(trackerConfigElem).find('.apiHelperTrackerConfigShow').on('change', function() {
                $(deviceSelectElem).trigger('change');
            });


            const setConfig = function(data) {
                const product = $(trackerConfigElem).find('.apiHelperTrackerProductSelect').val();
                if (!product) {
                    return;
                }

                const deviceId = $(deviceSelectElem).val();
                if (!deviceId) {
                    return;
                }

                const deviceIdUrl = (!deviceId || deviceId == 'default') ? '' : '/' + deviceId; 

                $.ajax({
                    contentType: 'application/json',
                    data: data,
                    dataType: 'json',
                    error: function(err) {
                        let html = '';
                        
                        analytics.track('Set Error', {category:'Tracker Config', label:err.responseJSON.message});
                        html += '<p>' + err.responseJSON.message + '</p>';

                        if (err.responseJSON.violations && err.responseJSON.violations.length > 0) {
                            html += '<ul>';
                            err.responseJSON.violations.forEach(function(v) {
                                html += '<li>' + v.message + ' ';
                                if (v.params) {
                                    html += JSON.stringify(v.params);
                                }

                                html += '<br />';
                            });
                            html += '</ul>';
                        }

                        setStatus(html);
                    },
                    method: 'PUT',
                    success: function (resp) {
                        let html = '';
                        html += '<p>' + resp.message + '</p>';
                        if (resp.details) {
                            html += '<p>' + resp.details + '</p>';
                        }

                        analytics.track('Set Success', {category:'Tracker Config'});
                        setStatus(html);

                        getThisConfig();   
                    },
                    headers: {
                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                        'X-Particle-Tool': 'particle-docs',
                    },
                    url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl
                });    
            
            };

            $(trackerConfigElem).find('.apiHelperTrackerConfigSet').on('click', function() {
                const data = apiHelper.jsonLinterGetValue(trackerConfigElem);
                setConfig(data);
            });

            $(trackerConfigElem).find('.apiHelperTrackerConfigDefault').on('click', function() {
                setConfig('');
            });
        });
    }


    if (($('.apiHelperConfigSchema').length > 0) && apiHelper.auth) {
        
        $('.apiHelperConfigSchema').each(function() {
            const thisPartial = $(this);

            const options = ($(thisPartial).data('options') || '').split(',');

            if (options.includes('noDownloadUpload')) {
                $(thisPartial).find('.noDownloadUpload').hide();
            }
            if (options.includes('noOrg')) {
                disableOrgSelection();
            }

            const defaultModeOptions = ['tracker', 'monitor'];
            let defaultMode;
            if (urlOptions.mode && defaultModeOptions.includes(urlOptions.mode)) {
                defaultMode = urlOptions.mode;
            }

            if (!defaultMode) {
                for(const m of defaultModeOptions) {
                    if (options.includes(m)) {
                        defaultMode = m;
                        break; 
                    }
                }    
            }

            let deviceFirmware;

            if (defaultMode) {
                $(thisPartial).find('.deviceFirmwareRadio').prop('checked', false);
                $(thisPartial).find('.deviceFirmwareRadio[value="' + defaultMode + '"]').prop('checked', true);
                deviceFirmware = $(thisPartial).find('.deviceFirmwareRadio:checked').val();
            }

            const alwaysBackup = options.includes('backup');
            if (alwaysBackup) {
                $(thisPartial).find('.alwaysBackup').hide();
            }

            // 
            const setStatus = function(configSchemaPartial, status) {
                $(thisPartial).find('.apiHelperConfigSchemaStatus').html(status);
            };

            const apiHelperTrackerSchemaVersionElem = $(thisPartial).find('.apiHelperTrackerSchemaVersion');


            const deviceFirmwareChanged = function() {
                deviceFirmware = $(thisPartial).find('.deviceFirmwareRadio:checked').val();

                $(apiHelperTrackerSchemaVersionElem).each(function() {
                    $(this).find('option').not(':first').remove();
                    switch(deviceFirmware) {
                        case 'tracker':
                            $(this).find('option:first').prop('disabled', false);
                            $(this).find('option:first').prop('selected', true);
                            break;
        
                        case 'monitor':
                            $(this).find('option:first').prop('disabled', true);
                            $(this).find('option:first').prop('selected', false);
                            break;
                    }                    
                });    
                
                if (deviceFirmware) {
                    for(const obj of fileIndex.schemas[deviceFirmware]) {
                        const optionElem = document.createElement('option');
                        $(optionElem).attr('value', obj.file);
                        $(optionElem).text('v' + obj.ver);
    
                        $(apiHelperTrackerSchemaVersionElem).append(optionElem);
                    }    
                }

            };
            deviceFirmwareChanged();

            $(thisPartial).find('.deviceFirmwareRadio').on('click', function() {
                $(thisPartial).find('.deviceFirmwareRadio').prop('checked', false);
                $(this).prop('checked', true);
                deviceFirmwareChanged();
            });

            $(thisPartial).find('.apiHelperConfigSchemaDownload').on('click', function(ev) {
                const configSchemaPartial = $(this).closest('div.apiHelperConfigSchema');
                const product = $(configSchemaPartial).find('.apiHelperTrackerProductSelect').val();
                const deviceId = 'default';

                apiHelper.downloadSchema('schema.json', product, deviceId, function(err) {
                    if (!err) {
                        setStatus(configSchemaPartial, 'Downloaded!');
                        analytics.track('Download Success', {category:'Tracker Schema'});
                        setTimeout(function() {
                            setStatus('');
                        }, 4000);    
                    }
                    else {
                        analytics.track('Download Error', {category:'Tracker Schema', label:err});
                        setStatus(configSchemaPartial, 'Error downloading schema ' + err);
                        setTimeout(function() {
                            setStatus('');
                        }, 10000);
                    }
                });
            });    

            
            $(thisPartial).find('.apiHelperConfigSchemaUpload').on('click', function() {
                const configSchemaPartial = $(this).closest('div.apiHelperConfigSchema');
                const product = $(configSchemaPartial).find('.apiHelperTrackerProductSelect').val();
                const deviceId = 'default';

                setStatus(configSchemaPartial, 'Select schema to upload...');

                $(configSchemaPartial).find('.apiHelperConfigSchemaFileInput').on('change', function() {
                    const fileList = this.files[0];

                    setStatus(configSchemaPartial, 'Saving backup schema...');

                    apiHelper.downloadSchema('backup-schema.json', product, deviceId, function(err) {
                        if (!err) {
                            setStatus(configSchemaPartial, 'Uploading schema...');
                            apiHelper.uploadSchemaFile(fileList, product, deviceId, function(err) {
                                if (!err) {
                                    setStatus(configSchemaPartial, 'Schema uploaded!');
                                    analytics.track('Upload Success', {category:'Tracker Schema'});
                                    setTimeout(function() {
                                        setStatus('');
                                    }, 4000);
                                }
                                else {
                                    analytics.track('Upload Error Saving Schema', {category:'Tracker Schema', label:err});
                                    setStatus(configSchemaPartial, 'Error saving schema ' + err);
                                    setTimeout(function() {
                                        setStatus('');
                                    }, 10000);        
                                }
                            });
                        }
                        else {
                            analytics.track('Upload Error Saving Backup Schema', {category:'Tracker Schema', label:err});
                            setStatus(configSchemaPartial, 'Error saving backup schema ' + err);
                            setTimeout(function() {
                                setStatus('');
                            }, 10000);
                        }
                    });
                });

                $(configSchemaPartial).find('.apiHelperConfigSchemaFileInput').click();
                
            });    

            $(thisPartial).find('.apiHelperConfigSchemaSet').on('click', async function() {
                const configSchemaPartial = $(this).closest('div.apiHelperConfigSchema');
                const product = $(configSchemaPartial).find('.apiHelperTrackerProductSelect').val();
                const deviceId = 'default';
                const deviceIdUrl = (deviceId == 'default') ? '' : '/' + deviceId; 

                if (alwaysBackup || $(thisPartial).find('.saveBackup').prop('checked')) {
                    setStatus(configSchemaPartial, 'Saving backup schema...');
                    await new Promise(function(resolve, reject) {
                        apiHelper.downloadSchema('backup-schema.json', product, deviceId, function(err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve();
                            }
                        });
                    });    
                }

                let schemaFile = $(apiHelperTrackerSchemaVersionElem).val();
                if (schemaFile == 'default') {
                    setStatus(configSchemaPartial, 'Restoring default schema...');

                    $.ajax({
                        data: '{}',
                        error: function(err) {
                            analytics.track('Restore Default Error', {category:'Tracker Schema', label:err.responseJSON.message});
                            setStatus(configSchemaPartial, 'Error deleting schema: ' + err.responseJSON.message + '.<br/>This is normal if there is no custom schema defined.');
                            setTimeout(function() {
                                setStatus('');
                            }, 10000);
                        },
                        headers: {
                            'Authorization':'Bearer ' + apiHelper.auth.access_token,
                            'Content-Type':'application/schema+json',
                            'X-Particle-Tool': 'particle-docs',
                        },
                        method: 'DELETE',
                        success: function (resp) {
                            analytics.track('Restore Default Success', {category:'Tracker Schema'});
                            setStatus(configSchemaPartial, 'Successfully restored.');
                            setTimeout(function() {
                                setStatus('');
                            }, 4000);
                        },
                        url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl
                    });        
                }
                else {
                    setStatus(configSchemaPartial, 'Downloading schema...');
                    const schemaData = await new Promise(function(resolve, reject) {
                        fetch('/assets/files/tracker/' + schemaFile)
                            .then(response => response.text())
                            .then(function(data) {
                                resolve(data);
                            });
                    });

                    setStatus(configSchemaPartial, 'Setting schema...');

                    await new Promise(function(resolve, reject) {
                        apiHelper.uploadSchema(schemaData, product, deviceId, resolve);
                    });

                    setStatus(configSchemaPartial, 'Schema updated!');


                }
            });    

        });


    }

    $('.apiHelperSchemaEditor').each(async function() {
        const thisElem = $(this);
        const gaCategory = 'Schema Editor';

        const editModeSelectElem = $(thisElem).find('.editModeSelect');
        const editTabRowElem = $(thisElem).find('.editTabRow');
        const editTabSelectElem = $(thisElem).find('.editTabSelect');
        const addTabRowElem = $(thisElem).find('.addTabRow');
        const addTabNameElem = $(thisElem).find('.addTabName');
        const uploadButtonElem = $(thisElem).find('.uploadButton');
        const revertButtonElem = $(thisElem).find('.revertButton');
        const saveBackupCheckboxElem = $(thisElem).find('.saveBackupCheckbox');
        const apiHelperStatusMsgElem = $(thisElem).find('.apiHelperStatusMsg');

        let schemaPropertyTemplate;
        let downloadedSchema;
        let downloadedProductId;
        let originalFieldValue;
        let lastTabName;
        let lastMode;
        let statusTimer;

        const setStatus = function(msg, time) { 
            if (statusTimer) {
                clearTimeout(statusTimer);
                statusTimer = null;
            }           
            $(apiHelperStatusMsgElem).text(msg);

            if (time) {
                statusTimer = setTimeout(function() {
                    $(apiHelperStatusMsgElem).html('&nbsp;');
                    statusTimer = null;
                }, time);
            }
        }

        const options = ($(thisPartial).data('options') || '').split(',');
        if (options.includes('noOrg')) {
            disableOrgSelection();
        }


        $(addTabNameElem).on('input', function() {
            const tabName = $(addTabNameElem).val();

            let tabNameCaps = '';
            if (tabName.length >= 1) {
                tabNameCaps = tabName.substring(0, 1).toUpperCase() + tabName.substring(1);
            }

            try {
                json = JSON.parse(apiHelper.jsonLinterGetValue(thisElem));
                json.$id = '#/properties/' + tabName;
                json.title = tabNameCaps;
                apiHelper.jsonLinterSetValue(thisElem, JSON.stringify(json));
            }
            catch(e) {
            }
        });

        const updateEditExistingTab = function() {
            const tabName = $(editTabSelectElem).val();

            try {
                json = downloadedSchema.properties[tabName];
                apiHelper.jsonLinterSetValue(thisElem, JSON.stringify(json));
                originalFieldValue = apiHelper.jsonLinterGetValue(thisElem);
            }
            catch(e) {
            }    

            lastTabName = tabName;
        }

        $(editTabSelectElem).on('change', function() {
            if (originalFieldValue != apiHelper.jsonLinterGetValue(thisElem)) {
                if (!confirm('Changing the Edit existing tab will discard the changes you have made.\nContinue?')) {
                    $(editTabSelectElem).val(lastTabName);
                }
            }

            updateEditExistingTab();
        });

    


        const updateEditMode = function() {
            const mode = $(editModeSelectElem).val();

            if (mode != lastMode) {
                if (mode == 'edit') {
                    $(editTabRowElem).show();
                    const editTab = $(editTabSelectElem).val();
                    apiHelper.jsonLinterSetValue(thisElem, JSON.stringify(downloadedSchema.properties[editTab]));
                    updateEditExistingTab();    
                }
                else {
                    $(editTabRowElem).hide();   
                }
    
                if (mode == 'add') {
                    $(addTabRowElem).show();
                    const data = schemaPropertyTemplate;
                    apiHelper.jsonLinterSetValue(thisElem, JSON.stringify(data));
                    $(addTabNameElem).trigger('input');
                }
                else {
                    $(addTabRowElem).hide();
                }
        
                if (mode == 'full') {       
                    apiHelper.jsonLinterSetValue(thisElem, JSON.stringify(downloadedSchema));
                }
    
            }

            originalFieldValue = apiHelper.jsonLinterGetValue(thisElem);
            lastMode = mode;
        };

        const updateTabList = function() {
            $(editTabSelectElem).empty();

            for(const tab in downloadedSchema.properties) {
                const title = downloadedSchema.properties[tab].title;
                
                const optionElem = document.createElement('option');
                $(optionElem).prop('value', tab);
                $(optionElem).text(title)
                $(editTabSelectElem).append(optionElem);
            }
        }



        const downloadSchema = async function() {
            return await new Promise(function(resolve, reject) {

                const productId = $(thisElem).find('.apiHelperTrackerProductSelect').val();
                downloadedProductId = productId;

                $.ajax({
                    dataType: 'text',
                    error: function(err) {
                        reject(err);
                    },
                    headers: {
                        'Accept':'application/schema+json',
                        'X-Particle-Tool': 'particle-docs',
                    },
                    method: 'GET',
                    success: function (resp) {
                        resolve(resp);
                    },
                    headers: {
                        'Authorization':'Bearer ' + apiHelper.auth.access_token,
                        'X-Particle-Tool': 'particle-docs',
                    },
                    url: 'https://api.particle.io/v1/products/' + productId + '/config'
                });                
            });
        };

        const downloadSchemaAndUpdateUI = async function() {
            try {
                const resp = await downloadSchema();

                setStatus('Downloaded schema from product', 5000);
                originalFieldValue = resp;
                downloadedSchema = JSON.parse(resp);
                apiHelper.jsonLinterSetValue(thisElem, originalFieldValue);
                updateTabList();
                updateEditMode();
            }
            catch(e) {
                setStatus('Error getting schema from product');
            }
        };

        const downloadAndSaveIfEnabled = async function() {
            if (!$(saveBackupCheckboxElem).prop('checked')) {
                return;
            }

            const schemaText = await downloadSchema();

            let blob = new Blob([schemaText], {type:'text/json'});
            saveAs(blob, 'backup-schema.json');
        }

        const uploadSchema = async function(newSchema) {
            await downloadAndSaveIfEnabled();

            return await new Promise(function(resolve, reject) {
                const productId = $(thisElem).find('.apiHelperTrackerProductSelect').val();;

                $.ajax({
                    data: JSON.stringify(newSchema),
                    error: function(err) {
                        reject(err);
                    },
                    headers: {
                        'Authorization':'Bearer ' + apiHelper.auth.access_token,
                        'Content-Type':'application/schema+json',
                        'X-Particle-Tool': 'particle-docs',
                    },
                    method: 'PUT',
                    processData: false,
                    success: function (resp) {
                        resolve(resp);
                    },
                    url: 'https://api.particle.io/v1/products/' + productId + '/config'
                }); 
            });
        }

        const revertSchema = async function() {
            await downloadAndSaveIfEnabled();

            return await new Promise(function(resolve, reject) {
                const productId = $(thisElem).find('.apiHelperTrackerProductSelect').val();;

                $.ajax({
                    data: '{}',
                    error: function(err) {
                        reject(err);
                    },
                    headers: {
                        'Authorization':'Bearer ' + apiHelper.auth.access_token,
                        'Content-Type':'application/schema+json',
                        'X-Particle-Tool': 'particle-docs',
                    },
                    method: 'DELETE',
                    success: function (resp) {
                        resolve(resp);
                    },
                    url: 'https://api.particle.io/v1/products/' + productId + '/config'
                });   
            });
        }

        $(editModeSelectElem).on('change', function() {
            if (originalFieldValue != apiHelper.jsonLinterGetValue(thisElem)) {
                if (!confirm('Changing the Edit mode will discard the changes you have made.\nContinue?')) {
                    $(editModeSelectElem).val(lastMode);
                }
            }
            updateEditMode();
        });

        $(uploadButtonElem).on('click', async function() {
            let newSchema;

            let json;
            try {
                json = JSON.parse(apiHelper.jsonLinterGetValue(thisElem));
            }
            catch(e) {
                alert('The editor does not have valid JSON and can only be uploaded if it is valid.');
                analytics.track('Upload invalid JSON', {category:gaCategory});
                return;
            }


            if (!confirm('This will update the product schema for all devices in the product and change the console behavior for all product team members.\nContinue?')) {
                analytics.track('Upload canceled', {category:gaCategory});
                return;
            }

            switch($(editModeSelectElem).val()) {
                case 'full':
                    newSchema = json;
                    break;

                case 'edit':
                    {
                        const editTab = $(editTabSelectElem).val();
                        newSchema = Object.assign({}, downloadedSchema);
                        newSchema.properties[editTab] = json;
                    }
                    break;

                case 'add':
                    {
                        const editTab = $(addTabNameElem).val();
                        newSchema = Object.assign({}, downloadedSchema);
                        newSchema.properties[editTab] = json;                        
                    }
                    break;

            }

            // console.log('newSchema', newSchema);

            try {
                const resp = await uploadSchema(newSchema);
                setStatus('Schema uploaded to product', 5000);
                downloadedSchema = newSchema;
                analytics.track('Upload success', {category:gaCategory, label:$(editModeSelectElem).val()});
            }
            catch(e) {
                setStatus('Error uploading schema');
            }

        });

        $(revertButtonElem).on('click', async function() {
            if (confirm('Revert product schema will discard any schema changes made locally and affect all devices in the product and change the console behavior for all product team members.\nContinue?')) {
                const productId = $(thisElem).find('.apiHelperTrackerProductSelect').val();;

                try {
                    await revertSchema();

                    analytics.track('Restore Default Success', {category:gaCategory});
                    setStatus('Schema reverted to default', 5000);
                    await downloadSchemaAndUpdateUI();
                }
                catch(e) {
                    if (e.status == 404) {
                        setStatus('Schema was already the the default', 5000);
                        analytics.track('Restore Default Already Default', {category:gaCategory});
                    }
                    else {
                        setStatus('Schema could not be reverted');
                        analytics.track('Restore Default Exception', {category:gaCategory});
                    }
                }        
            }
            else {
                analytics.track('Restore Default Canceled', {category:gaCategory});
            }
        });


        $('.apiHelperTrackerProductSelect').on('change', async function() {
            let productId = $(thisElem).find('.apiHelperTrackerProductSelect').val();
            if (productId != downloadedProductId) {
                // This event fires multiple times, so checking for change prevents downloading the file 6 times.
                await downloadSchemaAndUpdateUI();
            }    
        });

        fetch('/assets/files/tracker/schema-property-template.json')
            .then(response => response.json())
            .then(function(data) {
                schemaPropertyTemplate = data;
            });
        /*
        fetch('/assets/files/tracker/default-schema.json')
            .then(response => response.json())
            .then(function(data) {
                defaultSchema = data;

                originalFieldValue = JSON.stringify(defaultSchema);
                apiHelper.jsonLinterSetValue(thisElem, originalFieldValue);
                updateEditMode();
            });
        */
        
    })


});
