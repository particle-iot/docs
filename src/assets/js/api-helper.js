// Particle API helper with Particle SSO (single-sign-on)
// Allows authenticated API calls from docs

let apiHelper = {};

apiHelper.deviceListRefreshCallbacks = [];
apiHelper.deviceListChangeCallbacks = [];

let deviceRestoreRequests;
let deviceRestoreInfo;

// Get the deviceRestoreInfo. Returns a promise that resolves immediately if the
// data has already been retrieved or later once the data has been fetched.
// Including the api-helper-version module will automatically start the fetch
// so the delay should be minimal in most cases.
apiHelper.getDeviceRestoreInfo = function() {
    return new Promise(function(resolve, reject) {
        if (deviceRestoreRequests == undefined) {
            deviceRestoreRequests = [];

            fetch('/assets/files/deviceRestore.json')
            .then(response => response.json())
            .then(function(res) {
                deviceRestoreInfo = res;
    
                // Resolve any promises waiting for this data
                while(deviceRestoreRequests.length) {
                    deviceRestoreRequests.pop()(res);
                }
            });
        }

        if (deviceRestoreInfo) {
            resolve(deviceRestoreInfo);
        }
        else {
            deviceRestoreRequests.push(resolve);
        }
    });
};

apiHelper.getPlatformInfo = async function(platformId) {
    if (!deviceRestoreInfo) {
        await apiHelper.getDeviceRestoreInfo();
    }

    return deviceRestoreInfo.platforms.find(e => e.id == platformId);
}

apiHelper.getPlatformTitle = async function(platformId) {
    const info = await apiHelper.getPlatformInfo(platformId);
    if (info) {
        return info.title;
    }
    else {
        return 'Unknown (' + platformId + ')';
    }
}

apiHelper.getPlatformName = async function(platformId) {
    const info = await apiHelper.getPlatformInfo(platformId);
    if (info) {
        return info.name;
    }
    else {
        return platformId.toString();
    }
}

// Sorts the results from getPlatformName putting the real results first A-Z, then
// the numeric (unknown/deprecated) platforms after it in numerical order
apiHelper.platformNameSort = function(a, b) {
    const isNum = function(s) {
        const code = s.charCodeAt(0);
        return code >= 0x30 && code <= 0x39;
    };
    const isNumA = isNum(a);
    const isNumB = isNum(b);

    if (isNumA && !isNumB) {
        return +1;
    }
    else
    if (!isNumA && isNumB) {
        return -1;
    }
    else
    if (isNumA && isNumB) {
        return parseInt(a) - parseInt(b);
    }
    else {
        return a.localeCompare(b);
    }
}

// Parses a semver (like '3.0.0-rc.1' and returns the broken out parts)
apiHelper.parseVersionStr = function(verStr) {
    let result = {};

    // Remove any leading non-numbers
    while(true) {
        const c = verStr.charAt(0);
        if (c >= '0' && c <= '9') {
            break;
        }
        verStr = verStr.substr(1);
    }

    const parts = verStr.split(/[-\\.]/);
    if (parts.length < 2) {
        return result;
    }
    result.major = parseInt(parts[0]);
    if (parts.length > 1) {
        result.minor = parseInt(parts[1]);
    }
    else {
        result.minor = 0;
    }

    if (parts.length > 2) {
        result.patch = parseInt(parts[2]);
    }
    else {
        result.patch = 0;
    }

    if (parts.length > 4) {
        result.pre = parseInt(parts[4]);
    }

    if (parts.length > 3) {
        switch(parts[3]) {
            case 'rc':
                result.rc = result.pre;
                result.preAdj = result.pre * 400;
                break;

            case 'alpha':
                result.alpha = result.pre;
                result.preAdj = result.pre * 200;
                break;

            case 'beta':
                result.beta = result.pre;
                result.preAdj = result.pre * 300;
                break;

            case 'test':
                result.test = result.pre;
                result.preAdj = result.pre * 100;
                break;
        }
    }

    return result;
};

// Sort by version number (newest/largest first)
apiHelper.versionSort = function(a, b) {
    const aa = apiHelper.parseVersionStr(a);
    const bb = apiHelper.parseVersionStr(b);

    let cmp;

    cmp = bb.major - aa.major;;
    if (cmp) {
        return cmp;
    }

    cmp = bb.minor - aa.minor;;
    if (cmp) {
        return cmp;
    }

    cmp = aa.patch != bb.patch;
    if (cmp) {
        return cmp;
    }

    if (aa.pre && !bb.pre) {
        return +1;
    }
    if (!aa.pre && bb.pre) {
        return -1;
    }

    cmp = bb.preAdj - aa.preAdj;

    return cmp;
};



apiHelper.getReleaseAndLatestRcVersionOnly = function() {
    return new Promise(async function(resolve, reject) {
        
        const deviceRestoreInfo = await apiHelper.getDeviceRestoreInfo();
        
        let hasRelease = false;

        const versionsArray = deviceRestoreInfo.versionNames.filter(function(versionStr) {
            const ver = apiHelper.parseVersionStr(versionStr);
            if (typeof ver.pre == 'undefined') {
                hasRelease = true;
            }                
            else {
                // Is prerelease (rc, beta, etc.)
                if (hasRelease) {
                    return false;
                }
            }
            return true;
        });

        return resolve(versionsArray);
    });
};


apiHelper.confirmFlash = function() {
    if (!apiHelper.flashConfirmed) {
        const warning = 'Flashing firmware to a device replaces the existing user firmware binary on the device. This can only be undone by locating and flashing the previous firmware on the device.';

        if (!confirm(warning)) {
            return false;
        }
    
        apiHelper.flashConfirmed = true;
    }
    return true;
}

apiHelper.deviceListRefresh = function(next) {
    if (apiHelper.fetchInProgress || !apiHelper.auth) {
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

apiHelper.cachedResult = function() {
    let cachedResult = {};

    cachedResult.queries = {};


    cachedResult.get = function(opts) {
        return new Promise(function(resolve, reject) {
            const cacheKey = JSON.stringify(opts);
            
            if (!cachedResult.queries[cacheKey]) {
                cachedResult.queries[cacheKey] = {opts};
            }

            if (cachedResult.queries[cacheKey].result) {
                resolve(cachedResult.queries[cacheKey].result);
            }
            else
            if (cachedResult.queries[cacheKey].requests) {
                cachedResult.queries[cacheKey].requests.push({resolve,reject});
            }
            else {
                cachedResult.queries[cacheKey].requests = [{resolve,reject}];

                $.ajax(opts)
                .done(function(data, textStatus, jqXHR) {
                    cachedResult.queries[cacheKey].result = data;
                    while(cachedResult.queries[cacheKey].requests.length) {
                        obj = cachedResult.queries[cacheKey].requests.pop();
                        obj.resolve(data);
                    }
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    while(cachedResult.queries[cacheKey].requests.length) {
                        obj = cachedResult.queries[cacheKey].requests.pop();
                        obj.reject(jqXHR);
                    }
                });
            }

        });

    };

    return cachedResult;
}

apiHelper.getProductsCache = apiHelper.cachedResult();

apiHelper.getProducts = async function() {
    if (!apiHelper.auth) {
        return { products: [] };
    }
    return await apiHelper.getProductsCache.get({
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'GET',
        url: 'https://api.particle.io/v1/user/products/'
    });    
};

apiHelper.getOrgsCache = apiHelper.cachedResult();

apiHelper.getOrgs = async function() {
    if (!apiHelper.auth) {
        return { organizations: [] };
    }
    return await apiHelper.getOrgsCache.get({
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'GET',
        url: 'https://api.particle.io/v1/orgs/'
    });
};


apiHelper.getOrgProductsCache = apiHelper.cachedResult();

apiHelper.getOrgProducts = async function(org) {
    return await apiHelper.getOrgProductsCache.get({
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'GET',
        url: 'https://api.particle.io/v1/orgs/' + org + '/products/'
    });    
};


apiHelper.filterByPlatformId = function(array, platformId) {
    let results = [];

    for(const obj of array) {
        if (obj.platform_id == platformId) {
            results.push(obj);
        }
    }

    results.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    return results;
};

apiHelper.filterByTrackerPlatform = function(array) {
    return apiHelper.filterByPlatformId(array, 26);
};

apiHelper.unclaimDevice = async function(deviceId) {
    return await $.ajax({
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'DELETE',
        url: 'https://api.particle.io/v1/devices/' + deviceId
    });    
};

apiHelper.unclaimProductDevice = async function(deviceId, productId) {
    return await $.ajax({
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'DELETE',
        url: 'https://api.particle.io/v1/products/' + productId +'devices' + deviceId + '/owner'
    });    
};

apiHelper.removeProductDevice = async function(deviceId, productId) {
    return await $.ajax({
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'DELETE',
        url: 'https://api.particle.io/v1/products/' + productId +'devices' + deviceId
    });    
};

apiHelper.monitorUsage = function(options) {
    let resultObj = {};

    resultObj.startMs = Date.now()

    const periodMinutes = options.periodMinutes || 1;

    resultObj.done = function() {
        if (resultObj.timer) {
            clearInterval(resultObj.timer);
            resultObj.timer = null;
            ga('send', 'event', options.eventCategory, 'Finished');
        }
    };

    resultObj.timer = setInterval(function() {

        let durationMinutesStr = Math.floor((Date.now() - resultObj.startMs) / 60000).toString(); 
        if (durationMinutesStr.length < 6) {
            durationMinutesStr = '000000'.substr(0, 6 - durationMinutesStr.length) + durationMinutesStr;
        }

        ga('send', 'event', options.eventCategory, options.actionPrefix + durationMinutesStr);
    }, periodMinutes * 60000);

    ga('send', 'event', options.eventCategory, 'Started');

    return resultObj;
};

apiHelper.getAllDevices = async function(options) {
    let deviceList = [];

    if (!options.productId) {
        deviceList = (await apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token })).body;
        if (options.owner) {
            for(let d of deviceList) {
                d.owner = options.owner;
            }    
        }
    }
    else {
        for(let page = 1; ; page++) {
            const resp = await apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token, product: options.productId, page });
            for(const d of resp.body.devices) {
                deviceList.push(d);
            }
            if (options.progressElem) {
                $(options.progressElem).prop('value', page);
                $(options.progressElem).prop('max', resp.body.meta.total_pages);
            } 

            if (page >= resp.body.meta.total_pages) {
                break;
            }
        }
    }
    return deviceList;
};

apiHelper.getAllSims = async function(options) {
    let simList = [];

    if (!options.productId) {
        const resp = (await apiHelper.particle.listSIMs({ auth: apiHelper.auth.access_token }));
        for(const d of resp.body.sims) {
            d.iccid = d._id;
            simList.push(d);
        }
    }
    else {
        for(let page = 1; ; page++) {
            const resp = await apiHelper.particle.listSIMs({ auth: apiHelper.auth.access_token, product: options.productId, page });
            for(const d of resp.body.sims) {
                d.iccid = d._id;
                simList.push(d);
            }

            if (page >= resp.body.meta.total_pages) {
                break;
            }
        }
    }
    return simList;
};

$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    // ready is only called if there are components that use the apiHelper

    apiHelper.particle = new Particle();

    if ($('.codeboxFlashDeviceSpan').length > 0) {
    
        $('.apiHelper').first().on('apiHelperLoggedIn', function() {

            $('.codeboxFlashDeviceButton').attr('disabled', 'disabled');      
            $('.codeboxFlashDeviceSpan').show();

            $('.codeboxFlashDeviceSelect').each(async function() {
                const thisDeviceSelectElem = $(this);

                let deviceSelectOptions = {};
                const deviceSelectOptionsStr = $(thisDeviceSelectElem).attr('data-options');
                if (deviceSelectOptionsStr) {
                    for(const opt of deviceSelectOptionsStr.split(',')) {
                        deviceSelectOptions[opt] = true;
                    }
                }

                let deviceRestoreInfo = await apiHelper.getDeviceRestoreInfo();
                
                apiHelper.deviceList(thisDeviceSelectElem, {
                    deviceFilter: function(dev) {
                        if (deviceSelectOptions.gen3) {
                            for(const platform of deviceRestoreInfo.platforms) {
                                if (platform.id == dev.platform_id && !platform.discontinued) {
                                    return platform.gen == 3;
                                }
                            }
                            return false;
                        }
                        else {
                            return true;
                        }
                    },
                    getTitle: function(dev) {
                        let result;

                        if (dev.name) {
                            result = dev.name;
                        }
                        else {
                            result = dev.id;
                        }
                        result += (dev.online ? '' : ' (offline)');
                        return result;
                    },                    hasRefresh: true,
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
            });
   
        });
    }
    else {
        $('.codeboxFlashDeviceSpan').hide();
    }


});

