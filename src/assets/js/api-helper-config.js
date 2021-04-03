

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

    if ($('.apiHelperTrackerProductSelect').length > 0 && apiHelper.auth) {
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
                $('.apiHelperTrackerProductSelect').html(html);

                if (html === '') {
                    html = '<option disabled>No Tracker products available</option>'
                    $('.codeboxConfigSchemaSpan').hide();
                }
                else {
                    $('.codeboxConfigSchemaProductSelect').html(html);
                    $('.codeboxConfigSchemaSpan').show();
                    $('.apiHelperTrackerProductSelect').trigger('change');
                }

            },
            url: 'https://api.particle.io/v1/user/products',
        });
    }


    $('.apiHelperTrackerProductSelect').each(function(index) {

        const parentDiv = $(this).closest('div');
        
        $(this).on('change', function() {
            const product = $(parentDiv).find('.apiHelperTrackerProductSelect').val();
            if (!product) {
                return;
            }
            const selectElem = $(parentDiv).find('.apiHelperTrackerDeviceSelect');
            $(selectElem).html('');

            if ($(selectElem).attr('data-has-product-default')) {
                $(selectElem).append('<option value="default">Product Default</option>');
            }

            const fetchPage = function(page) {
                apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token, product:product, page }).then(
                    function(data) {
                        let html = '';
                        data.body.devices.forEach(function(dev) {
                            if (dev.development) {
                                html += '<option value="' + dev.id + '">' + dev.name + '</option>';
                            }
                        });
                        $(selectElem).append(html);

                        if (page < data.body.meta.total_pages) {
                            fetchPage(++page);
                        }
                        else {
                            $(selectElem).trigger('change');
                        }
                    },
                    function(err) {            
                    }
                );            
            }

            fetchPage(1);
        });        
    });

    if ($('.apiHelperTrackerConfig').length > 0 && apiHelper.auth) {
        $('.apiHelperTrackerConfig').each(function() {
            const trackerConfigElem = $(this);

            const setStatus = function(status) {
                $(trackerConfigElem).find('.apiHelperTrackerConfigStatus').html(status);
            };

            const deviceSelectElem = $(trackerConfigElem).find('.apiHelperTrackerDeviceSelect');


            const getThisConfig = function() {
                const product = $(trackerConfigElem).find('.apiHelperTrackerProductSelect').val();
                if (!product) {
                    return;
                }

                const deviceId = $(deviceSelectElem).val();
                if (!deviceId) {
                    return;
                }

                apiHelper.getTrackerConfig(product, deviceId, function(configObj) {

                    const showElem = $(trackerConfigElem).find('.apiHelperTrackerConfigShow');

                    let show = $(trackerConfigElem).find('.apiHelperTrackerConfigShow').val();

                    if (!configObj.pending) {
                        show = 'current';
                        $(showElem).val(show);
                        $(showElem).find('option[value="pending"]').attr('disabled', 'disabled');
                    }
                    else {
                        $(showElem).find('option[value="pending"]').removeAttr('disabled');
                    }


                    apiHelper.jsonLinterSetValue(trackerConfigElem, JSON.stringify(configObj[show])); 
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
                        console.log('setTrackerConfig error', err);
                        let html = '';
                        
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
                        console.log('setTrackerConfig success', resp);
                        let html = '';
                        html += '<p>' + resp.message + '</p>';
                        if (resp.details) {
                            html += '<p>' + resp.details + '</p>';
                        }

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


    if (($('.apiHelperConfigSchema').length > 0 || $('.codeboxConfigSchemaSpan').length > 0) && apiHelper.auth) {
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
            const product = $(configSchemaPartial).find('.apiHelperTrackerProductSelect').val();
            const deviceId = $(configSchemaPartial).find('.apiHelperTrackerDeviceSelect').val();
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