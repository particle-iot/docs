// Particle API helper with Particle SSO (single-sign-on)
// Allows authenticated API calls from docs

let apiHelper = {};


apiHelper.deviceListRefreshCallbacks = [];

apiHelper.deviceListRefresh = function(next) {
    if (apiHelper.fetchInProgress) {
        return;
    }

    console.log('fetching device list');
    apiHelper.fetchInProgress = true;

    apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token }).then(
        function(data) {
            apiHelper.deviceListCache = data.body;

            apiHelper.deviceIdToName = {};
            apiHelper.deviceListCache.forEach(function(dev) {
                apiHelper.deviceIdToName[dev.id] = dev.name;
            });

            apiHelper.deviceListRefreshCallbacks.forEach(function(callback) {
                callback();
            });
            apiHelper.fetchInProgress = false;
            next();
        },
        function(err) {
            apiHelper.fetchInProgress = false;
            next(err);
        }
    );    
};

apiHelper.deviceList = function(elems, options) {
    if (!options) {
        options = {};
    }
    
    const updateList = function() {
        let html = '';
        if (options.hasAllDevices) {
            const title = options.allDevicesTitle || 'All Devices';
            html += '<option value="all">' + title + '</option>';
        }
        if (options.hasSelectDevice) {
            const title = options.selectDeviceTitle || 'Select Device';
            html += '<option value="select">' + title + '</option>';
        }
        if (options.hasRefresh) {
            const title = options.refreshTitle || 'Refresh Device List';
            html += '<option value="refresh">' + title + '</option>';
        }

        let first = true;

        apiHelper.deviceListCache.forEach(function(dev, index) {
            if (!options.deviceFilter || options.deviceFilter(dev)) {
                const value = options.getValue ? options.getValue(dev) : dev.id;
                const title = options.getTitle ? options.getTitle(dev) : dev.name;
                const sel = ((!options.hasSelectDevice) && !options.hasAllDevices && first) ? ' selected' : '';
                first = false;

                html += '<option value="' + value + '"' + sel + '>' + title + '</option>';
            }
        });
        if (apiHelper.deviceListCache.length == 0) {
            const title = options.noDevicesTitle || 'No devices in this account';
            html += '<option value="none">' + title + '</option>';
        }

        elems.html(html);
    };

    apiHelper.deviceListRefreshCallbacks.push(updateList);
    
    if (apiHelper.deviceListCache) {
        updateList();
    }
    else {
        apiHelper.deviceListRefresh(function() {
        });
    }

    $(elems).on('change', function() {
        const val = $(this).val();
        if (val == 'refresh') {
            updateList();        
        }
        if (options.onChange) {
            options.onChange($(this));
        }
    });
};



apiHelper.flashDevice = function(deviceId, code, codebox) {
    if (!apiHelper.auth) {
        return;
    }

    const setStatus = function(status) {
        $(codebox).find('.codeboxFlashStatus').html(status);
    };
    setStatus('Preparing to flash code...');

    let formData = new FormData();

    let blob = new Blob([code], {type:'text/plain'});
    formData.append('file', blob, 'source.ino');
    
    $.ajax({
        data: formData,
        contentType: false,
        error: function(err) {
            setTimeout(function() {
                setStatus('');
            }, 4000);
        },
        method: 'PUT',
        processData: false,
        success: function (resp) {
            setStatus(resp.message);
            setTimeout(function() {
                setStatus('');
            }, 4000);
        },
        url: 'https://api.particle.io/v1/devices/' + deviceId + "?access_token=" + apiHelper.auth.access_token,
    });    

};


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

apiHelper.eventViewer = {};

apiHelper.eventViewer.events = [];

apiHelper.eventViewer.addRow = function(eventViewerElem, event) {
    const deviceFilter = $(eventViewerElem).find('.apiHelperEventViewerDeviceSelect').val();
    if (deviceFilter != 'all' && deviceFilter != event.coreid) {
        return;
    }
    const eventFilter = $(eventViewerElem).find('.apiHelperEventViewerFilter').val();
    if (eventFilter != '' && !event.name.startsWith(eventFilter)) {
        return;
    }

    let deviceName = apiHelper.deviceIdToName[event.coreid];
    if (!deviceName) {
        deviceName = event.coreid;
    }

    const time = event.published_at.replace('T', ' ');

    let html = '<tr>';
    html += '<td class="apiHelperEventViewerEvent">' + event.name + '</td>';
    html += '<td class="apiHelperEventViewerData">' + event.data + '</td>';
    html += '<td class="apiHelperEventViewerDevice">' + deviceName + '</td>';
    html += '<td class="apiHelperEventViewerTime">' + time + '</td>';
    html += '</tr>';

    $(eventViewerElem).find('.apiHelperEventViewerOutput > table > tbody').append(html);
};

apiHelper.eventViewer.event = function(event) {
    apiHelper.eventViewer.events.push(event);

    $('.apiHelperEventViewer').each(function(index) {
        if ($(this).find('.apiHelperEventViewerEnable').prop('checked')) {
            apiHelper.eventViewer.addRow($(this), event);
        }
    });
};

apiHelper.eventViewer.updateFilter = function(elem) {
    const eventViewerElem = $(elem).closest('div.apiHelperEventViewer');

    $(eventViewerElem).find('.apiHelperEventViewerOutput > table > tbody').html('');
    apiHelper.eventViewer.events.forEach(function(event) {
        apiHelper.eventViewer.addRow(eventViewerElem, event);
    });
};

apiHelper.eventViewer.start = function(elem) {
    if (!apiHelper.eventViewer.stream) {
        apiHelper.particle.getEventStream({ deviceId: 'mine', auth: apiHelper.auth.access_token }).then(function(stream) {
            apiHelper.eventViewer.stream = stream;
            
            stream.on('event', function(data) {
                apiHelper.eventViewer.event(data);
            });
        });
    }
};


apiHelper.ready = function() {
    apiHelper.auth = null;

    // ready is only called if there are components that use the apiHelper

    apiHelper.particle = new Particle();

    $('.apiHelperFakeAuthButton').on('click', function() {
        const authData = prompt('JSON authentication data:');
        if (authData) {
            localStorage.setItem('particleAuth', authData);
            apiHelper.ready();
        }
    });
    
    $('.apiHelperLoginButton').on('click', function() {
        const origUrl = window.location.href;

		window.location.href = 'https://login.particle.io/login?redirect=' + encodeURI(origUrl); 
    });

    $('.apiHelperLogoutButton').on('click', function() {
        Cookies.remove('ember_simple_auth_session', { path: '/', domain: '.particle.io' });
        localStorage.removeItem('particleAuth');
        apiHelper.ready();
    });

    const cookie = Cookies.get('ember_simple_auth_session');
    if (cookie) {
        try {
            const json = JSON.parse(cookie);
            if (json.authenticated) {
                apiHelper.auth = json.authenticated;
            }
        }
        catch(e) {
        }
    }
    const fakeAuth = localStorage.getItem('particleAuth');
    if (fakeAuth) {
        try {
            apiHelper.auth = JSON.parse(fakeAuth);
        }
        catch(e) {
        }
    }

    $('.apiHelperLoggedIn').hide();
    $('.apiHelperCouldSSO').hide();
    $('.apiHelperFakeAuth').hide();

    if (apiHelper.auth) {
        $('.apiHelperUser').text(apiHelper.auth.username);

        $('.apiHelperLoggedIn').show();
    }
    else
    if (window.location.hostname.endsWith('particle.io')) {
        $('.apiHelperCouldSSO').show();
    }
    else {
        $('.apiHelperFakeAuth').show();
    }


    if ($('.apiHelperLedFunctionTest').length > 0 && apiHelper.auth) {
        apiHelper.deviceList($('.apiHelperLedFunctionTestSelect'), {
            deviceFilter: function(dev) {
                return dev.functions.includes("led");
            },
            getTitle: function(dev) {
                return dev.name + (dev.online ? '' : ' (offline)');
            },
            hasRefresh: true
        });    

        const setStatus = function(status) {
            $('.apiHelperLedFunctionTestStatus').html(status);
        }

        const ledControl = function(elem, cmd) {
            const deviceId = elem.find('select').val();

            setStatus('Sending request: ' + cmd);

            apiHelper.particle.callFunction({ deviceId, name: 'led', argument: cmd, auth: apiHelper.auth.access_token  }).then(
                function (data) {
                    setStatus('Success! (' + data.body.return_value + ')');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
                    setStatus('Error: ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);                
                }
            );            
        };

        $('.apiHelperLedFunctionTestOn').on('click', function() {
            ledControl($(this).closest('div'), 'on');
        });

        $('.apiHelperLedFunctionTestOff').on('click', function() {
            ledControl($(this).closest('div'), 'off');
        });
    }

    if ($('.apiHelperColorFunctionTest').length > 0 && apiHelper.auth) {
        apiHelper.deviceList($('.apiHelperColorFunctionTestSelect'), {
            deviceFilter: function(dev) {
                return dev.functions.includes("setColor");
            },
            getTitle: function(dev) {
                return dev.name + (dev.online ? '' : ' (offline)');
            },
            hasRefresh: true
        });    


        const ledControl = function(elem, cmd) {
            const deviceId = elem.find('select').val();

            const setStatus = function(status) {
                $(elem).find('.apiHelperColorFunctionTestStatus').html(status);
            }
    
            setStatus('Sending request: ' + cmd);

            apiHelper.particle.callFunction({ deviceId, name: 'setColor', argument: cmd, auth: apiHelper.auth.access_token  }).then(
                function (data) {
                    setStatus('Success! (' + data.body.return_value + ')');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
                    setStatus('Error: ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);                
                }
            );            
        };

        $('.apiHelperColorFunctionTestSend').on('click', function() {
            const parent = $(this).closest('div.apiHelperColorFunctionTest');

            const color = $(parent).find('.apiHelperColorFunctionTestColor').val();
            const red = parseInt(color.substr(1, 2), 16);
            const green = parseInt(color.substr(3, 2), 16);
            const blue = parseInt(color.substr(5, 2), 16);

            ledControl(parent, red + ',' + green + ',' + blue);
        });

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

    if ($('.codeboxFlashDeviceSpan').length > 0) {
        

        if (apiHelper.auth) {
            $('.codeboxFlashDeviceButton').attr('disabled', 'disabled');      
            $('.codeboxFlashDeviceSpan').show();

            apiHelper.deviceList($('.codeboxFlashDeviceSelect'), {
                getTitle: function(dev) {
                    return dev.name + (dev.online ? '' : ' (offline)');
                },
                hasRefresh: true,
                hasSelectDevice: true,
                onChange: function(elem) {
                    const newVal = $(elem).val();
                    $('.codeboxFlashDeviceSelect').val(newVal);
                    if (newVal != 'select') {
                        $('.codeboxFlashDeviceButton').removeAttr('disabled');
                    }
                    else {
                        $('.codeboxFlashDeviceButton').attr('disabled', 'disabled');      
                    }            
                }
            });    

   
        }
        else {
            $('.codeboxFlashDeviceSpan').hide();
        }

    }

    if ($('.apiHelperEventViewer').length > 0) {
        if (!apiHelper.auth) {
            $('.apiHelperEventViewerStatus').text('Log in to view events');
            $('.apiHelperEventViewerControls').hide();
            return;
        }

        console.log('has event viewer');

        $('.apiHelperEventViewerControls').show();

        apiHelper.deviceList($('.apiHelperEventViewerDeviceSelect'), {
            getTitle: function(dev) {
                return dev.name + (dev.online ? '' : ' (offline)');
            },
            hasAllDevices: true,
            hasRefresh: true,
            onChange: function(elem) {
                const newVal = $(elem).val();
            }
        });    

        $('.apiHelperEventViewerEnable').each(function(index) {
            const parentSpan =  $(this).closest('span');
            const id = 'apiHelperEventViewerEnableCheckbox' + index;
            $(this).attr('id', id);
            $(parentSpan).find('label').attr('for', id);
        });
        
        $('.apiHelperEventViewerEnable').change(function() {
            if (this.checked) {
                apiHelper.eventViewer.start(this);
            }
        });

        $('.apiHelperEventViewerDeviceSelect').change(function() {
            apiHelper.eventViewer.updateFilter(this);
        });

        $('.apiHelperEventViewerFilter').on('input', function() {
            apiHelper.eventViewer.updateFilter(this);
        });

    }

    if ($('.apiHelperDeviceFunction').length > 0 && apiHelper.auth) {
        apiHelper.deviceList($('.apiHelperDeviceFunctionDeviceSelect'), {
            deviceFilter: function(dev) {
                return dev.functions && dev.functions.length > 0;
            },
            getTitle: function(dev) {
                return dev.name + (dev.online ? '' : ' (offline)');
            },
            hasRefresh: true,
            hasSelectDevice: true,
            onChange: function(elem) {
                const deviceId = $(elem).val();

                const functionPartial = $(elem).closest('div.apiHelperDeviceFunction');

                const functionSelect = $(functionPartial).find('.apiHelperDeviceFunctionFunctionSelect');

                const functionButton = (functionPartial).find('.apiHelperDeviceFunctionCall');

                $(functionSelect).html('');
                $(functionButton).attr('disabled', 'disabled');

                apiHelper.deviceListCache.forEach(function(dev) {
                    if (dev.id == deviceId) {
                        dev.functions.forEach(function(fn) {
                            $(functionSelect).append('<option name="' + fn + '">' + fn + '</option>');
                            $(functionButton).removeAttr('disabled');
                        });
                    }
                });
            }
        });    

        $('.apiHelperDeviceFunctionCall').on('click', function() {
            const functionPartial = $(this).closest('div.apiHelperDeviceFunction');

            const deviceId = $(functionPartial).find('.apiHelperDeviceFunctionDeviceSelect').val();
            const functionName = $(functionPartial).find('.apiHelperDeviceFunctionFunctionSelect').val();
            const arg = $(functionPartial).find('.apiHelperDeviceFunctionArg').val();

            const setStatus = function(status) {
                $(functionPartial).find('.apiHelperDeviceFunctionStatus').html(status);
            }
    
            setStatus('Making function call ' + functionName + ': ' + arg);

            apiHelper.particle.callFunction({ deviceId, name: functionName, argument: arg, auth: apiHelper.auth.access_token  }).then(
                function (data) {
                    setStatus('Success! (' + data.body.return_value + ')');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
                    setStatus('Error: ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);                
                }
            );            
    
        });

    }


    if ($('.apiHelperDeviceVariable').length > 0 && apiHelper.auth) {
        apiHelper.deviceList($('.apiHelperDeviceVariableDeviceSelect'), {
            deviceFilter: function(dev) {
                return dev.variables && Object.keys(dev.variables).length > 0;
            },
            getTitle: function(dev) {
                return dev.name + (dev.online ? '' : ' (offline)');
            },
            hasRefresh: true,
            hasSelectDevice: true,
            onChange: function(elem) {
                const deviceId = $(elem).val();

                const variablePartial = $(elem).closest('div.apiHelperDeviceVariable');

                const variableSelect = $(variablePartial).find('.apiHelperDeviceVariableVariableSelect');

                const variableGetButton = (variablePartial).find('.apiHelperDeviceVariableGet');

                $(variableSelect).html('');
                $(variableGetButton).attr('disabled', 'disabled');

                apiHelper.deviceListCache.forEach(function(dev) {
                    if (dev.id == deviceId) {
                        Object.keys(dev.variables).forEach(function(v) {
                            $(variableSelect).append('<option name="' + v + '">' + v + '</option>');
                            $(variableGetButton).removeAttr('disabled');
                        });
                    }
                });
            }
        });    

        $('.apiHelperDeviceVariableGet').on('click', function() {
            const variablePartial = $(this).closest('div.apiHelperDeviceVariable');

            const deviceId = $(variablePartial).find('.apiHelperDeviceVariableDeviceSelect').val();
            const variableName = $(variablePartial).find('.apiHelperDeviceVariableVariableSelect').val();

            const setStatus = function(status) {
                $(variablePartial).find('.apiHelperDeviceVariableStatus').html(status);
            }
    
            setStatus('Getting Variable ' + variableName);

            apiHelper.particle.getVariable({ deviceId, name: variableName, auth: apiHelper.auth.access_token  }).then(
                function (data) {
                    console.log('data', data);
                    setStatus(data.body.result);
                },
                function (err) {
                    setStatus('Error: ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);                
                }
            );            
    
        });

    }
    
};

$(document).ready(function() {
    if ($('.apiHelper').length > 0) {
        apiHelper.ready();
    }
});
