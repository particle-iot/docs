// Particle API helper with Particle SSO (single-sign-on)
// Allows authenticated API calls from docs

let apiHelper = {};

apiHelper.deviceListRefreshCallbacks = [];
apiHelper.deviceListChangeCallbacks = [];

apiHelper.deviceListRefresh = function(next) {
    if (apiHelper.fetchInProgress) {
        return;
    }

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

apiHelper.setCommonDevice = function(deviceId) {
    $('.apiHelperCommonDevice').each(function() {
        if ($(this).find('[value=\'' + deviceId + '\']').length == 0) {
            $(this).append('<option value="' + deviceId + '">' + apiHelper.deviceIdToName[deviceId] + '</option>');
        }
        $(this).val(deviceId);
    });

    apiHelper.deviceListChangeCallbacks.forEach(function(obj) {
        $(obj.elems).each(function() {
            obj.onChange($(this));
        });
    });
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
    
    if (options.onChange) {
        apiHelper.deviceListChangeCallbacks.push({elems:elems, onChange: options.onChange});
    }

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
            apiHelper.deviceListRefresh(function() {
            });
            return;
        }

        if ($(this).hasClass('apiHelperCommonDevice')) {
            apiHelper.setCommonDevice(val);
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
            setStatus('Error flashing device');
            setTimeout(function() {
                setStatus('');
            }, 4000);
        },
        method: 'PUT',
        processData: false,
        success: function (resp) {
            setStatus(resp.message);
            if (resp.ok) {
                setStatus(resp.message);
                setTimeout(function() {
                    setStatus('');
                }, 4000);
            }
            else {
                setStatus(resp.output + '<br/><pre>' + resp.errors.join('\n') + '</pre>');
            }
        },
        url: 'https://api.particle.io/v1/devices/' + deviceId + "?access_token=" + apiHelper.auth.access_token,
    });    

};

apiHelper.getProducts = async function() {
    return await $.ajax({
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'GET',
        url: 'https://api.particle.io/v1/user/products/'
    });    
};

apiHelper.getOrgs = async function() {
    return await $.ajax({
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'GET',
        url: 'https://api.particle.io/v1/orgs/'
    });    
};

apiHelper.getOrgProducts = async function(org) {
    return await $.ajax({
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'GET',
        url: 'https://api.particle.io/v1/orgs/' + org + '/products/'
    });    
};



$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    apiHelper.auth = null;

    // ready is only called if there are components that use the apiHelper

    apiHelper.particle = new Particle();

    $('.apiHelperFakeAuthButton').on('click', function() {
        const authData = prompt('JSON authentication data:');
        if (authData) {
            localStorage.setItem('particleAuth', authData);
            location.reload();
        }
    });
    
    $('.apiHelperLoginButton').on('click', function() {
        const origUrl = window.location.href;

		window.location.href = 'https://login.particle.io/login?redirect=' + encodeURI(origUrl); 
    });

    $('.apiHelperLogoutButton').on('click', function() {
        Cookies.remove('ember_simple_auth_session', { path: '/', domain: '.particle.io' });
        localStorage.removeItem('particleAuth');
        location.reload();
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

    
});

