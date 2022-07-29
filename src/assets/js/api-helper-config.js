

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
                    ga('send', 'event', 'Tracker Schema', 'Upload Success Codebox');
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
            next(err.responseJSON.message);
        },
        headers: {
            'Authorization':'Bearer ' + apiHelper.auth.access_token,
            'Content-Type':'application/schema+json'
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
            next(err.responseJSON.message);
        },
        headers: {
            'Accept':'application/schema+json'
        },
        method: 'GET',
        success: function (resp) {
            let blob = new Blob([resp], {type:'text/json'});
            saveAs(blob, filename);
            ga('send', 'event', 'Tracker Schema', 'Download Success');
            next();
        },
        url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl + '?access_token=' + apiHelper.auth.access_token
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
            'Accept':'application/json'
        },
        method: 'GET',
        success: function (resp) {
            completion(resp.configuration);
        },
        url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl + '?access_token=' + apiHelper.auth.access_token
    });    

};


$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    let sandboxTrackerProducts = [];


    const trackerSchemeButtonElems = $('.apiHelperConfigSchemaUpload, .apiHelperConfigSchemaDownload, .apiHelperConfigSchemaDefault, ' + 
        '.codeboxUploadSchemaButton, .apiHelperTrackerConfigSet, .apiHelperTrackerConfigDefault');

    const buildTrackerDeviceMenu = function(product) {
        if (!product) {
            let html = '<option disabled>Select a product first</option>'
            $('.apiHelperTrackerDeviceSelect').html(html);
            $(trackerSchemeButtonElems).prop('disabled', true);
            return;
        }
        const selectElems = $('.apiHelperTrackerDeviceSelect');

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
    const buildProductMenu = function(productArray, elems, options) {
        if (!options) {
            options = {};
        }
        let html = '';

        if (productArray.length == 0) {
            html = '<option disabled>No Tracker products available</option>'
            buildTrackerDeviceMenu();
            $(elems).html(html);
        }        
        else {
            if (options.noSelectFirst) {
                html += '<option value="" default>Select Product</option>'
            }
            for(const prod of productArray) {
                html += '<option value="' + prod.id + '">' + prod.name + ' (' + prod.id + ')</option>';
            }    

            $(elems).html(html);

            if (!options.noSelectFirst) {
                $(elems).trigger('change');
            }
        }

    };

    apiHelper.getProducts().then(function(productsResp) {
        sandboxTrackerProducts = apiHelper.filterByTrackerPlatform(productsResp.products);

        buildProductMenu(sandboxTrackerProducts, $('.apiHelperTrackerProductSelect'), {});
        if (sandboxTrackerProducts.length > 0) {
            $('.apiHelperTrackerProductSelect').trigger('change');
        }
        else {
            buildTrackerDeviceMenu();
        }
    });
    

    const productSelectElems = $('.apiHelperTrackerProductSelect');

    if (productSelectElems.length > 0 && apiHelper.auth) {
        apiHelper.getOrgs().then(function(orgsData) {
            // No orgs: orgsData.organizations empty array
            // Object in array orgsData.organizations: id, slug, name
            
            if (orgsData.organizations.length > 0) {
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

                            buildProductMenu(orgTrackerProducts, productSelectElems, {noSelectFirst:true});
                        }
                        else {
                            // 
                            buildProductMenu(sandboxTrackerProducts, productSelectElems, {});
                        }
                    
                        $(orgSelectElems).val(orgId);
                    });

                });
            }
            else {
                $('.apiHelperTrackerOrgRow').hide();
            }

        });



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
                        
                        ga('send', 'event', 'Tracker Config', 'Set Error', err.responseJSON.message);
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

                        ga('send', 'event', 'Tracker Config', 'Set Success');
                        setStatus(html);

                        getThisConfig();   
                    },
                    url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl + '?access_token=' + apiHelper.auth.access_token
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
        // 
        const setStatus = function(configSchemaPartial, status) {
            $(configSchemaPartial).find('.apiHelperConfigSchemaStatus').html(status);
        };


        $('.apiHelperConfigSchemaDownload').on('click', function(ev) {
            const configSchemaPartial = $(this).closest('div.apiHelperConfigSchema');
            const product = $(configSchemaPartial).find('.apiHelperTrackerProductSelect').val();
            const deviceId = $(configSchemaPartial).find('.apiHelperTrackerDeviceSelect').val();

            apiHelper.downloadSchema('schema.json', product, deviceId, function(err) {
                if (!err) {
                    setStatus(configSchemaPartial, 'Downloaded!');
                    ga('send', 'event', 'Tracker Schema', 'Download Success');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);    
                }
                else {
                    ga('send', 'event', 'Tracker Schema', 'Download Error', err);
                    setStatus(configSchemaPartial, 'Error downloading schema ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);
                }
            });
        });    

        $('.apiHelperConfigSchemaUpload').on('click', function() {
            const configSchemaPartial = $(this).closest('div.apiHelperConfigSchema');
            const product = $(configSchemaPartial).find('.apiHelperTrackerProductSelect').val();
            const deviceId = $(configSchemaPartial).find('.apiHelperTrackerDeviceSelect').val();

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
                                ga('send', 'event', 'Tracker Schema', 'Upload Success');
                                setTimeout(function() {
                                    setStatus('');
                                }, 4000);
                            }
                            else {
                                ga('send', 'event', 'Tracker Schema', 'Upload Error Saving Schema', err);
                                setStatus(configSchemaPartial, 'Error saving schema ' + err);
                                setTimeout(function() {
                                    setStatus('');
                                }, 10000);        
                            }
                        });
                    }
                    else {
                        ga('send', 'event', 'Tracker Schema', 'Upload Error Saving Backup Schema', err);
                        setStatus(configSchemaPartial, 'Error saving backup schema ' + err);
                        setTimeout(function() {
                            setStatus('');
                        }, 10000);
                    }
                });
            });

            $(configSchemaPartial).find('.apiHelperConfigSchemaFileInput').click();
            
        });    

        $('.apiHelperConfigSchemaDefault').on('click', function() {
            const configSchemaPartial = $(this).closest('div.apiHelperConfigSchema');
            const product = $(configSchemaPartial).find('.apiHelperTrackerProductSelect').val();
            const deviceId = $(configSchemaPartial).find('.apiHelperTrackerDeviceSelect').val();
            const deviceIdUrl = (deviceId == 'default') ? '' : '/' + deviceId; 

            setStatus(configSchemaPartial, 'Restoring default schema...');

            $.ajax({
                data: '{}',
                error: function(err) {
                    ga('send', 'event', 'Tracker Schema', 'Restore Default Error', err.responseJSON.message);
                    setStatus(configSchemaPartial, 'Error deleting schema: ' + err.responseJSON.message + '.<br/>This is normal if there is no custom schema defined.');
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);
                },
                headers: {
                    'Authorization':'Bearer ' + apiHelper.auth.access_token,
                    'Content-Type':'application/schema+json'
                },
                method: 'DELETE',
                success: function (resp) {
                    ga('send', 'event', 'Tracker Schema', 'Restore Default Success');
                    setStatus(configSchemaPartial, 'Successfully restored.');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);
                },
                url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl
            });    
        });    

    }

    $('.apiHelperSchemaEditor').each(async function() {
        const thisElem = $(this);

        const editModeSelectElem = $(thisElem).find('.editModeSelect');
        const addToTabRowElem = $(thisElem).find('.addToTabRow');
        const addToTabSelectElem = $(thisElem).find('.addToTabSelect');
        const addTabRowElem = $(thisElem).find('.addTabRow');
        const addTabNameElem = $(thisElem).find('.addTabName');
        const hideTabsRowElem = $(thisElem).find('.hideTabsRow');
        const hideTabsCellElem = $(thisElem).find('.hideTabsCell');
        const downloadButtonElem = $(thisElem).find('.downloadButton');
        const uploadButtonElem = $(thisElem).find('.uploadButton');
        const loadButtonElem = $(thisElem).find('.loadButton');
        const saveButtonElem = $(thisElem).find('.saveButton');


        

        // const Elem = $(thisElem).find('.');


        let schemaPropertyTemplate;
        let saveData = {};
        let defaultSchema; // this is a JSON object

        $(addTabNameElem).on('input', function() {
            const tabName = $(addTabNameElem).val();

            try {
                json = JSON.parse(apiHelper.jsonLinterGetValue(thisElem));
                json.$id = '#/properties/' + tabName;
                apiHelper.jsonLinterSetValue(thisElem, JSON.stringify(json));
            }
            catch(e) {
            }
        });

        $(addToTabSelectElem).on('change', function() {
            const tabName = $(addToTabSelectElem).val();

            try {
                json = defaultSchema.properties[tabName];
                apiHelper.jsonLinterSetValue(thisElem, JSON.stringify(json));
            }
            catch(e) {
            }
        });


        let lastMode;
        const updateEditMode = function() {
            const mode = $(editModeSelectElem).val();

            if (lastMode) {
                saveData[lastMode] = apiHelper.jsonLinterGetValue(thisElem);            
            }

            let data;

            if (mode == 'append') {
                $(addToTabRowElem).show();
                data = saveData.append;
                if (!data) {
                    data = JSON.stringify(defaultSchema.properties[$(addToTabSelectElem).val()]);
                }
                apiHelper.jsonLinterSetValue(thisElem, data);
                $(addToTabSelectElem).trigger('change');
            }
            else {
                $(addToTabRowElem).hide();   
            }

            if (mode == 'add') {
                $(addTabRowElem).show();
                data = saveData.add;
                if (!data) {
                    data = JSON.stringify(schemaPropertyTemplate);
                }
                apiHelper.jsonLinterSetValue(thisElem, data);
                $(addTabNameElem).trigger('input');
            }
            else {
                $(addTabRowElem).hide();
            }

            if (mode == 'add' || mode == 'append') {
                $(hideTabsRowElem).show();
            }
            else {
                $(hideTabsRowElem).hide();
            }

            if (mode == 'edit') {
                data = saveData.edit;
                if (!data) {
                    data = JSON.stringify(defaultSchema);
                }
                apiHelper.jsonLinterSetValue(thisElem, data);
            }

            lastMode = mode;
        };
        $(editModeSelectElem).on('change', updateEditMode);

        fetch('/assets/files/tracker/schema-property-template.json')
            .then(response => response.json())
            .then(function(data) {
                schemaPropertyTemplate = data;
            });

        fetch('/assets/files/tracker/default-schema.json')
            .then(response => response.json())
            .then(function(data) {
                defaultSchema = data;

                for(const tab in defaultSchema.properties) {
                    const title = defaultSchema.properties[tab].title;

                    const divElem = document.createElement('div');

                    const checkboxElem = document.createElement('input');
                    $(checkboxElem).prop('type', 'checkbox');

                    const labelElem = document.createElement('label');
                    $(labelElem).append(checkboxElem);
                    $(labelElem).append(document.createTextNode(title + ' (' + tab + ')'));

                    $(divElem).append(labelElem);
                    $(hideTabsCellElem).append(divElem);
                    
                    const optionElem = document.createElement('option');
                    $(optionElem).prop('value', tab);
                    $(optionElem).text(title)
                    $(addToTabSelectElem).append(optionElem);
                }

                saveData.edit = JSON.stringify(defaultSchema);
                apiHelper.jsonLinterSetValue(thisElem, saveData.edit);
                updateEditMode();
            });

        
    })


});