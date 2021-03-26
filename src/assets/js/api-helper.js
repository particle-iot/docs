// Particle API helper with Particle SSO (single-sign-on)
// Allows authenticated API calls from docs

let apiHelper = {};

apiHelper.deviceList = function(elems, options) {
    if (!options) {
        options = {};
    }
    apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token }).then(
        function(data) {
            let html = '';
            data.body.forEach(function(dev) {
                if (!options.deviceFilter || options.deviceFilter(dev)) {
                    const value = options.getValue ? options.getValue(dev) : dev.id;
                    const title = options.getTitle ? options.getTitle(dev) : dev.name;
                    html += '<option value="' + value + '">' + title + '</option>';
                }
            });
            elems.html(html);
        },
        function(err) {

        }
    );
};

apiHelper.flashDevice = function(deviceId, code) {
    if (!apiHelper.auth) {
        return;
    }

    let formData = new FormData();

    let blob = new Blob([code], {type:'text/plain'});
    formData.append('file', blob, 'source.ino');
    
    $.ajax({
        data: formData,
        contentType: false,
        error: function(err) {
            console.log('error flashing ', err);
        },
        method: 'PUT',
        processData: false,
        success: function (resp) {
            console.log('flash success', resp);
        },
        url: 'https://api.particle.io/v1/devices/' + deviceId + "?access_token=" + apiHelper.auth.access_token,
    });    

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
        // TODO: Find and add an anchor here!
        const origUrl = req.protocol + "://" + req.get('host') + req.originalUrl;

		location.href = 'https://login.particle.io/login?redirect=' + encodeURI(origUrl); 
    });

    $('.apiHelperLogoutButton').on('click', function() {
        Cookies.remove('ember_simple_auth_session');
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
        console.log('authenticated!');
        $('.apiHelperUser').text(apiHelper.auth.username);

        $('.apiHelperLoggedIn').show();
    }
    else
    if (window.location.hostname.endsWith('particle.io')) {
        console.log('could sso');
        $('.apiHelperCouldSSO').show();
    }
    else {
        console.log('requires fake auth');
        $('.apiHelperFakeAuth').show();
    }


    if ($('.apiHelperFunctionTest').length > 0 && apiHelper.auth) {
        console.log('running function test');

        const refreshDeviceList = function() {
            apiHelper.deviceList($('.apiHelperLedFunctionTestSelect'), {
                deviceFilter: function(dev) {
                    return dev.functions.includes("led");
                },
                getTitle: function(dev) {
                    return dev.name + (dev.online ? '' : ' (offline)');
                }
            });    
        }
        refreshDeviceList();

        const ledControl = function(elem, cmd) {
            const deviceId = elem.find('select').val();

            apiHelper.particle.callFunction({ deviceId, name: 'led', argument: cmd, auth: apiHelper.auth.access_token  }).then(
                function (data) {
                    console.log('success');
                },
                function (err) {
                    console.log('failure', err);
                }
            );            
        };

        $('.apiHelperLedFunctionRefresh').on('click', function() {
            refreshDeviceList();
        });

        $('.apiHelperLedFunctionTestOn').on('click', function() {
            console.log('on button');
            ledControl($(this).closest('div'), 'on');
        });

        $('.apiHelperLedFunctionTestOff').on('click', function() {
            console.log('off button');
            ledControl($(this).closest('div'), 'off');
        });
    }

    if ($('.apiHelperConfigSchema').length > 0 && apiHelper.auth) {
        console.log('has config-schema');

        const updateDeviceList = function(parentDiv) {
            const product = $(parentDiv).find('.apiHelperConfigSchemaProductSelect').val();
            
            
            apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token, product:product }).then(
                function(data) {
                    let html = '<option value="default">Product Default</option>';
                    console.log('data', data);
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
                console.log('getting getting schema ', err);
            },
            method: 'GET',
            success: function (resp) {
                // console.log('get products', resp.products);
                let html = '';
                resp.products.forEach(function(prod) {
                    if (prod.platform_id == 26) {
                        // Tracker
                        html += '<option value="' + prod.id + '">' + prod.name + ' (' + prod.id + ')</option>';
                    }
                });
                if (html === '') {
                    html = '<option disabled>No Tracker products available</option>'
                }

                $('.apiHelperConfigSchemaProductSelect').html(html);

                $('.apiHelperConfigSchemaProductSelect').each(function(index) {
                    // console.log('selector ', $(this));

                    const parentDiv = $(this).closest('div');
                    
                    $(this).on('change', function() {
                        updateDeviceList(parentDiv);
                    });
                    
                    updateDeviceList(parentDiv);
                    
                });

            },
            url: 'https://api.particle.io/v1/user/products',
        });

        const uploadSchema = function(file, product, deviceId) {
            const deviceIdUrl = (deviceId == 'default') ? '' : '/' + deviceId; 

            let fileReader = new FileReader();
            fileReader.onload = function() {
                // console.log('file loaded ', fileReader.result);

                $.ajax({
                    data: fileReader.result,
                    error: function(err) {
                        console.log('error uploading schema ', err);
                    },
                    headers: {
                        'Authorization':'Bearer ' + apiHelper.auth.access_token,
                        'Content-Type':'application/schema+json'
                    },
                    method: 'PUT',
                    processData: false,
                    success: function (resp) {
                        console.log('upload success', resp);
                    },
                    url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl
                }); 
            };
            fileReader.readAsText(file);
        };

        $('.apiHelperConfigSchemaDownload').on('click', function(ev) {

            const configSchemaPartial = $(this).closest('div.apiHelperConfigSchema');
            const product = $(configSchemaPartial).find('.apiHelperConfigSchemaProductSelect').val();
            const deviceId = $(configSchemaPartial).find('.apiHelperConfigSchemaDeviceSelect').val();
            const deviceIdUrl = (deviceId == 'default') ? '' : '/' + deviceId; 

            $.ajax({
                dataType: 'text',
                error: function(err) {
                    console.log('error getting schema ', err);
                },
                headers: {
                    'Accept':'application/schema+json'
                },
                method: 'GET',
                success: function (resp) {
                    let blob = new Blob([resp], {type:'text/json'});
                    saveAs(blob, 'schema.json');
                },
                url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl + '?access_token=' + apiHelper.auth.access_token
            });    
        });    

        $('.apiHelperConfigSchemaUpload').on('click', function() {
            const configSchemaPartial = $(this).closest('div.apiHelperConfigSchema');
            const product = $(configSchemaPartial).find('.apiHelperConfigSchemaProductSelect').val();
            const deviceId = $(configSchemaPartial).find('.apiHelperConfigSchemaDeviceSelect').val();

            $(configSchemaPartial).find('.apiHelperConfigSchemaFileInput').on('change', function() {
                console.log('file selected!', this.files);
                uploadSchema(this.files[0], product, deviceId);
            });

            $(configSchemaPartial).find('.apiHelperConfigSchemaFileInput').click();
            
        });    

        $('.apiHelperConfigSchemaDefault').on('click', function() {
            const configSchemaPartial = $(this).closest('div.apiHelperConfigSchema');
            const product = $(configSchemaPartial).find('.apiHelperConfigSchemaProductSelect').val();
            const deviceId = $(configSchemaPartial).find('.apiHelperConfigSchemaDeviceSelect').val();
            const deviceIdUrl = (deviceId == 'default') ? '' : '/' + deviceId; 

            $.ajax({
                data: '{}',
                error: function(err) {
                    console.log('error deleting schema ', err);
                },
                headers: {
                    'Authorization':'Bearer ' + apiHelper.auth.access_token,
                    'Content-Type':'application/schema+json'
                },
                method: 'DELETE',
                success: function (resp) {
                    console.log('delete success', resp);
                },
                url: 'https://api.particle.io/v1/products/' + product + '/config' + deviceIdUrl
            });    
        });    
        
    }

    if ($('.codeboxFlashDeviceSpan').length > 0) {
        
        console.log('has flash device');
        $('.codeboxFlashDeviceSpan').hide();

        if (apiHelper.auth) {
            apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token }).then(
                function(data) {
                    let html = '<option value="select" selected>Select Device</option>';
                    console.log('data', data);
                    data.body.forEach(function(dev) {
                        html += '<option value="' + dev.id + '">' + dev.name + '</option>';
                    });
                    $('.codeboxFlashDeviceSelect').html(html);
                    if (data.body.length > 0) {
                        $('.codeboxFlashDeviceSelect').on('change', function() {
                            const containingSpan = $(this).closest('span.codeboxFlashDeviceSpan');
                            if ($(this).val() != 'select') {
                                $(containingSpan).find('button').removeAttr('disabled');
                            }
                            else {
                                $(containingSpan).find('button').attr('disabled', 'disabled');      
                            }
                        });
                        $('.codeboxFlashDeviceSpan').show();
                    }
                },
                function(err) {        
                }
            );        
        }

    }
};

$(document).ready(function() {
    if ($('.apiHelper').length > 0) {
        apiHelper.ready();
    }
});
