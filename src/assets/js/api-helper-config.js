

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
            next();
        },
        url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl + '?access_token=' + apiHelper.auth.access_token
    });    
};

$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }



    if (($('.apiHelperConfigSchema').length > 0 || $('.codeboxConfigSchemaSpan').length > 0) && apiHelper.auth) {
        // 
        const updateDeviceList = function(parentDiv) {
            const product = $(parentDiv).find('.apiHelperConfigSchemaProductSelect').val();
            if (!product) {
                return;
            }
            
            apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token, product:product }).then(
                function(data) {
                    let html = '<option value="default">Product Default</option>';
                    data.body.devices.forEach(function(dev) {
                        html += '<option value="' + dev.id + '">' + dev.name + '</option>';
                    });
                    $(parentDiv).find('.apiHelperConfigSchemaDeviceSelect').html(html);
                },
                function(err) {
        
                }
            );        
            
        };

        $.ajax({
            data: {
                'access_token': apiHelper.auth.access_token
            },
            error: function(err) {
                console.log('getting getting list of products ', err);
            },
            method: 'GET',
            success: function (resp) {
                let html = '';
                resp.products.forEach(function(prod) {
                    if (prod.platform_id == 26) {
                        // Tracker
                        html += '<option value="' + prod.id + '">' + prod.name + ' (' + prod.id + ')</option>';
                    }
                });
                if (html === '') {
                    html = '<option disabled>No Tracker products available</option>'
                    $('.codeboxConfigSchemaSpan').hide();
                }
                else {
                    $('.codeboxConfigSchemaProductSelect').html(html);
                    $('.codeboxConfigSchemaSpan').show();
                }

                $('.apiHelperConfigSchemaProductSelect').html(html);

                $('.apiHelperConfigSchemaProductSelect').each(function(index) {

                    const parentDiv = $(this).closest('div');
                    
                    $(this).on('change', function() {
                        updateDeviceList(parentDiv);
                    });
                    
                    updateDeviceList(parentDiv);
                    
                });

            },
            url: 'https://api.particle.io/v1/user/products',
        });

        const setStatus = function(configSchemaPartial, status) {
            $(configSchemaPartial).find('.apiHelperConfigSchemaStatus').html(status);
        };


        $('.apiHelperConfigSchemaDownload').on('click', function(ev) {
            const configSchemaPartial = $(this).closest('div.apiHelperConfigSchema');
            const product = $(configSchemaPartial).find('.apiHelperConfigSchemaProductSelect').val();
            const deviceId = $(configSchemaPartial).find('.apiHelperConfigSchemaDeviceSelect').val();

            apiHelper.downloadSchema('schema.json', product, deviceId, function(err) {
                if (!err) {
                    setStatus(configSchemaPartial, 'Downloaded!');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);    
                }
                else {
                    setStatus(configSchemaPartial, 'Error downloading schema ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);
                }
            });
        });    

        $('.apiHelperConfigSchemaUpload').on('click', function() {
            const configSchemaPartial = $(this).closest('div.apiHelperConfigSchema');
            const product = $(configSchemaPartial).find('.apiHelperConfigSchemaProductSelect').val();
            const deviceId = $(configSchemaPartial).find('.apiHelperConfigSchemaDeviceSelect').val();

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
                                setTimeout(function() {
                                    setStatus('');
                                }, 4000);
                            }
                            else {
                                setStatus(configSchemaPartial, 'Error saving schema ' + err);
                                setTimeout(function() {
                                    setStatus('');
                                }, 10000);        
                            }
                        });
                    }
                    else {
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
            const product = $(configSchemaPartial).find('.apiHelperConfigSchemaProductSelect').val();
            const deviceId = $(configSchemaPartial).find('.apiHelperConfigSchemaDeviceSelect').val();
            const deviceIdUrl = (deviceId == 'default') ? '' : '/' + deviceId; 

            setStatus(configSchemaPartial, 'Restoring default schema...');

            $.ajax({
                data: '{}',
                error: function(err) {
                    // console.log('err', err);
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
                    setStatus(configSchemaPartial, 'Successfully restored.');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);
                },
                url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl
            });    
        });    

    }


});