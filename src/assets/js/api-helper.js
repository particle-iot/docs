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

let carriersJsonRequests;
let carriersJson;

apiHelper.getCarriersJson = async function() {
    return new Promise(function(resolve, reject) {
        if (carriersJsonRequests == undefined) {
            carriersJsonRequests = [];

            fetch('/assets/files/carriers.json')
            .then(response => response.json())
            .then(function(res) {
                carriersJson = res;
    
                // Resolve any promises waiting for this data
                while(carriersJsonRequests.length) {
                    carriersJsonRequests.pop()(res);
                }
            });
        }

        if (carriersJson) {
            resolve(carriersJson);
        }
        else {
            carriersJsonRequests.push(resolve);
        }
    });
}

apiHelper.getDeviceConstants = async function() {
    const res = await apiHelper.getCarriersJson();    
    if (res) {
        return res.deviceConstants;
    } 
    else {
        return null;
    }
}


apiHelper.getPlatformInfo = async function(platformId) {
    const deviceConstants = await apiHelper.getDeviceConstants();
    if (deviceConstants) {
        for(const key in deviceConstants) {
            if (deviceConstants[key].id == platformId) {
                return deviceConstants[key];
            }    
        }    
    }

    return null;
}


apiHelper.getPlatformTitle = async function(platformId) {
    const info = await apiHelper.getPlatformInfo(platformId);
    if (info) {
        return info.displayName;
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

apiHelper.getSkuFromSerial = async function(serialNumber) {
    if (!serialNumber) {
        return null;
    }
    
    const carriers = await apiHelper.getCarriersJson();    
    if (!carriers) {
        return null;
    }
    for(const skuObj of carriers.skus) {
        if (skuObj.prefix) {
            if (serialNumber.startsWith(skuObj.prefix)) {
                return skuObj.name;
            }
        }
    }
    return null;
}

apiHelper.getSkuObjFromSerial = async function(serialNumber) {
    if (!serialNumber) {
        return null;
    }
    
    const carriers = await apiHelper.getCarriersJson();    
    if (!carriers) {
        return null;
    }
    for(const skuObj of carriers.skus) {
        if (skuObj.prefix) {
            if (serialNumber.startsWith(skuObj.prefix)) {
                return skuObj;
            }
        }
    }
    return null;
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


apiHelper.isDeviceId = function(str) {
    const deviceIdRE = /^([A-Fa-f0-9]{24})$/;

    return str.match(deviceIdRE) != null;
};

apiHelper.isSerialNumber = async function(str) {
    const skuObj = await apiHelper.getSkuObjFromSerial(str);
    return !!skuObj;
};

apiHelper.isICCID = function(str) {
    // Whole token match because otherwise a Device ID matches this
    const iccidRE = /^([0-9]{18,21})$/;

    return str.match(iccidRE) != null;
}

apiHelper.parseDeviceLine = async function(line) {
    let result = null;
    for(let token of line.split(/[, ]/)) {
        token = token.trim();

        if (apiHelper.isICCID(token)) {
            if (!result) {
                result = {};
            }
            result.iccid = token;
        }
        else
        if (apiHelper.isDeviceId(token)) {
            if (!result) {
                result = {};
            }
            result.deviceId = token;
        }
        else
        if (await apiHelper.isSerialNumber(token)) {
            if (!result) {
                result = {};
            }
            if (typeof result['serial'] == 'undefined') {
                result.serial = token;
            }
        }
        else {
            if (token.match(/[A-Z][A-Za-z0-9]+/)) {
                // Allow things that might be a serial instead of ignoring them
                if (!result) {
                    result = {};
                }
                if (Object.keys(result).length == 0) {
                    result.serial = token;    
                }
            }
        }

        // Possibly add support for mobile secret here
    }
    return result;
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

    // console.log('a', aa);
    // console.log('b', bb);

    let cmp;

    cmp = bb.major - aa.major;
    if (cmp) {
        return cmp;
    }

    cmp = bb.minor - aa.minor;
    if (cmp) {
        return cmp;
    }

    cmp = bb.patch - aa.patch;
    if (cmp) {
        return cmp;
    }

    if (!aa.pre && !bb.pre) {
        return 0;
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

apiHelper.modules = {};

apiHelper.moduleAdd = function(name) {
    if (apiHelper.modules[name]) {
        return apiHelper.modules[name];
    }
    const moduleObj = {
        name,
    };

    moduleObj.promiseObj = new Promise(function(resolve, reject) {
        moduleObj.resolveFn = resolve;
        moduleObj.rejectFn = reject;
    });

    apiHelper.modules[name] = moduleObj;

    return moduleObj;
};

apiHelper.moduleGet = function(name) {
    return apiHelper.modules[name];
};

apiHelper.moduleGetPromise = function(name) {
    let result;

    const moduleObj = apiHelper.modules[name];
    if (moduleObj) {
        result = moduleObj.promiseObj;
    }
    else {
        result = apiHelper.moduleAdd(name).promiseObj;
    }

    return result;
};

apiHelper.moduleComplete = function(name, resolveParam) {
    const moduleObj = apiHelper.modules[name];
    if (moduleObj && moduleObj.resolveFn) {
        moduleObj.resolveFn(resolveParam);
    }
}

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


apiHelper.simpleTableRow = function(tbodyElem, key, value) {
    const trElem = document.createElement('tr');

    let tdElem;

    tdElem = document.createElement('td');
    $(tdElem).text(key);
    $(trElem).append(tdElem);

    tdElem = document.createElement('td');
    $(tdElem).text(value);
    $(trElem).append(tdElem);

    $(tbodyElem).append(trElem);                
}

apiHelper.simpleTableObject = function(tbodyElem, obj) {
    for(const key in obj) {
        const value = obj[key];

        apiHelper.simpleTableRow(tbodyElem, key, value);
    }
}

apiHelper.simpleTableObjectMap = function(tbodyElem, keys, data) {
    for(const key in keys) {
        const label = keys[key];
        apiHelper.simpleTableRow(tbodyElem, label, data[key]);
    }

}


apiHelper.simpleTable = function(params) {
    let outerDivElem;

    if (!params.noOuterDiv) {
        outerDivElem = document.createElement('div');

        if (params.banner) {
            // text div above table
            const divElem = document.createElement('div');
            if (params.cssClassBanner) {
                $(divElem).addClass(params.cssClassBanner);
            }
            if (params.cssStyleBanner) {
                $(divElem).attr('style', params.cssStyleBanner);
            }
            $(divElem).text(params.banner);
            $(outerDivElem).append(divElem);
        }
    }
    
    const tableElem = document.createElement('table');
    if (params.cssClassTable) {
        $(tableElem).addClass(params.cssClassTable);
    }

    {
        const theadElem = document.createElement('thead');

        if (params.columns) {
            const trElem = document.createElement('tr');
            
            for(const columnObj of params.columns) {
                const thElem = document.createElement('th');
                if (columnObj.cssClassHead) {
                    $(thElem).addClass(columnObj.cssClassHead);
                }
                if (columnObj.title) {
                    $(thElem).text(columnObj.title);
                }
                $(trElem).append(thElem);
            }
            $(theadElem).append(trElem);
        }

        $(tableElem).append(theadElem);
    }
    {
        const tbodyElem = document.createElement('tbody');

        if (params.rows) { // An array of rows
            let columnIndex = -1;
            for(const row of params.rows) {
                columnIndex++;

                const trElem = document.createElement('tr');
                if (params.cssClassRow) {
                    $(trElem).addClass(params.cssClassRow);
                }

                
                for(const columnObj of params.columns) {
                    const tdElem = document.createElement('td');
                    if (columnObj.cssClass) {
                        $(tdElem).addClass(columnObj.cssClassBody);
                    }
                    if (columnObj.cssStyle) {
                        $(tdElem).attr('style', columnObj.cssStyleBody);
                    }

                    if (columnObj.radioName) {
                        const inputElem = document.createElement('input');
                        $(inputElem).attr('type', 'radio');
                        $(inputElem).attr('name', columnObj.radioName);
                        if (columnObj.radioClass) {
                            $(inputElem).addClass(columnObj.radioClass);
                        }
                        if (columnObj.radioValueKey) {
                            $(inputElem).attr('value', row[columnObj.radioValueKey]);
                        }

                        $(tdElem).html(inputElem);
                    }
                    else {
                        let text;
                        if (Array.isArray(row)) {
                            if (columIndex < row.length) {
                                text = row[colIndex];
                            }
                        }
                        else {
                            text = row[columnObj.key];
                        }

                        if (text) {
                            if (typeof columnObj.valueDecoder == 'function') {
                                text = columnObj.valueDecoder(text);
                            }

                            $(tdElem).text(text);
                        }

                    }


                    $(trElem).append(tdElem);
                }

                $(tbodyElem).append(trElem);
            }
        }

        $(tableElem).append(tbodyElem);
    }

    if (!params.noOuterDiv) {
        $(outerDivElem).append(tableElem);

        return outerDivElem;
    }
    else {
        return tableElem;
    }
}


apiHelper.sandboxProducts = function() {
    let sandboxProducts = {
    };

    sandboxProducts.get = function() {
        return new Promise(function(resolve, reject) {      
            if (sandboxProducts.result) {
                resolve(result);
            }
            else
            if (sandboxProducts.pending) {
                sandboxProducts.pending.push({resolve, reject});
            }
            else {
                sandboxProducts.pending = [];
                sandboxProducts.pending.push({resolve, reject});

                const request = {
                    dataType: 'json',
                    error: function (jqXHR) {
                        delete sandboxProducts.result;
                        sandboxProducts.pending.forEach(e => e.reject());
                        delete sandboxProducts.pending;
                    },
                    headers: {
                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                        'Accept': 'application/json',
                        'X-Particle-Tool': 'particle-docs',
                    },
                    method: 'GET',
                    success: function (resp, textStatus, jqXHR) {
                        sandboxProducts.result = resp.products;
                        for(let p of sandboxProducts.result) {
                            p.mine = (p.user == apiHelper.auth.username);
                            p.sandbox = true;
                        }
                        sandboxProducts.pending.forEach(e => e.resolve(sandboxProducts.result));
                        delete sandboxProducts.pending;
                    },
                    url: 'https://api.particle.io/v1/user/products/'
                };
    
                $.ajax(request);
            }
        });    
    }

    sandboxProducts.getById = async function(id) {
        await sandboxProducts.get();

        if (sandboxProducts.result) {
            return sandboxProducts.result.find(e => e.id == id);
        }
        return undefined;
    }

    sandboxProducts.getNameById = async function(id) {
        const e = sandboxProducts.getById(id);
        if (e) {
            return e.name;
        }
        return '';
    }
    return sandboxProducts;
}


const tinkerFunctions = ['digitalread', 'digitalwrite', 'analogread', 'analogwrite'];

apiHelper.deviceSupplementInfo = function(dev) {
    dev.isTracker = (dev.platform_id == 26 || dev.platform_id == 28);

    dev.isProductDevice = (dev.product_id > 100);

    let tinkerFunctionCount = 0;
    for(const s of tinkerFunctions) {
        if (dev.functions.includes(s)) {
            tinkerFunctionCount++;
        }
    }
    dev.isTinker = (tinkerFunctionCount == tinkerFunctions.length);
};

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

                apiHelper.deviceSupplementInfo(dev);
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

    let firstLoad = true;

    const updateList = function() {
        $(elems).each(function() {
            const elem = $(this);
            const oldValue = $(elem).val();

            $(elem).empty();
            
            let optionElem;

            if (options.hasAllDevices) {
                optionElem = document.createElement('option');
                $(optionElem).attr('value', 'all');
                $(optionElem).text(options.allDevicesTitle || 'All Devices');
                $(elem).append(optionElem);
            }
            if (options.hasSelectDevice) {
                optionElem = document.createElement('option');
                $(optionElem).attr('value', 'select');
                $(optionElem).text(options.selectDeviceTitle || 'Select Device');
                $(elem).append(optionElem);
            }
            if (options.hasRefresh) {
                optionElem = document.createElement('option');
                $(optionElem).attr('value', 'refresh');
                $(optionElem).text(options.refreshTitle || 'Refresh Device List');
                $(elem).append(optionElem);
            }
    
            let first = true;
    
            apiHelper.deviceListCache.forEach(function(dev, index) {
                if (!options.deviceFilter || options.deviceFilter(dev)) {
                    optionElem = document.createElement('option');
                    $(optionElem).attr('value', options.getValue ? options.getValue(dev) : dev.id);
                    $(optionElem).text(options.getTitle ? options.getTitle(dev) : dev.name);

                    if ((!options.hasSelectDevice) && !options.hasAllDevices && first) {
                        $(optionElem).attr('selected', 'selected');
                    }
                    first = false;
    
                    $(elem).append(optionElem);
                }
            });

            if (apiHelper.deviceListCache.length == 0) {
                optionElem = document.createElement('option');
                $(optionElem).attr('value', 'none');
                $(optionElem).text(options.noDevicesTitle || 'No devices in this account');

                $(elem).append(optionElem);
            }        
            if (!firstLoad && oldValue && oldValue != 'refresh') {
                $(elem).val(oldValue);
            }
            if (options.onUpdateList) {
                options.onUpdateList();
            }

            firstLoad = false;
        });
    };

    const refreshList = function() {
        apiHelper.deviceListRefresh(function() {
            updateList();
            if (options.onUpdateInfo) {
                options.onUpdateInfo();
            }
        });
    }



    if (options.monitorEvents) {
        apiHelper.eventViewer.addMonitor(function(event) {
            if (typeof options.monitorEvents == 'function') {
                options.monitorEvents(event);
            }

            switch(event.name) {
                case 'spark/status':
                    // event .name, data, .coreid
                    // Wait a bit, then refresh the list to make sure the cloud has the right data
                    setTimeout(function() {
                        refreshList();
                    }, 1000);
                    break;

                // case 'spark/flash/status':
            }
        });
        apiHelper.eventViewer.start();
    }

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

    $(elems).on('change', async function() {
        const val = $(this).val();
        if (val == 'refresh') {
            refreshList();
            return;
        }
        if (options.hasSelectDevice) {
            const selectOptionElem = $(this).find('option[value="select"]');
            if (selectOptionElem.length) {
                $(selectOptionElem).remove();           
            }
        }

        // Find the device in the cache
        let dev = apiHelper.deviceListCache.find(e => e.id == val);
        if (dev) {
            if (dev.isProductDevice) {
                const sandboxProducts = await apiHelper.sandboxProducts().get();
    
                dev.productInfo = sandboxProducts.find(e => e.id == dev.product_id);
                            
                dev.productDevInfo = (await apiHelper.particle.getDevice({ deviceId: dev.id, product: dev.product_id, auth: apiHelper.auth.access_token })).body;            
            }
    
            if ($(this).hasClass('apiHelperCommonDevice')) {
                apiHelper.setCommonDevice(val);
            }
    
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
        headers: {
            'Authorization': 'Bearer ' + apiHelper.auth.access_token,
            'X-Particle-Tool': 'particle-docs',
        },
        url: 'https://api.particle.io/v1/devices/' + deviceId,
    });    

};

apiHelper.cachedResult = function() {
    let cachedResult = {};

    cachedResult.queries = {};

    cachedResult.clear = function() {
        const cacheKey = JSON.stringify(opts);

        cachedResult.queries[cacheKey].result = null;
    };

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


apiHelper.getTeamMembers = async function(options) {
    // options
    //      .orgId (optional)
    //      .productId (optional, but usually required unless only getting the org team members)
    // At least one must be specified
    // If both are specified, then the results of both are combined

    let results = [];

    if (!apiHelper.auth) {
        return results;
    }

    const addTeam = async function(fnOptions = {}) {
        const res = await $.ajax({
            dataType: 'json',
            headers: {
                'Accept':'application/json',
                'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token,
                'X-Particle-Tool': 'particle-docs',
            },
            method: 'GET',
            url: fnOptions.url,
        });   
        if (res && res.ok) {
            for(let obj of res.team) {
                if (options.noProgrammatic) {
                    if (obj.is_programmatic) {
                        continue;   
                    }
                }
                if (fnOptions.isOrg) {
                    obj.isOrg = true;
                }
                results.push(obj);
            }
        }

    }

    if (options.orgId) {
        await addTeam({isOrg: true, url: 'https://api.particle.io/v1/orgs/' + options.orgId + '/team'});
    }
    
    if (options.productId) {
        await addTeam({url: 'https://api.particle.io/v1/products/' + options.productId + '/team'});
    }

    results.sort(function(a, b) {
        return a.username.localeCompare(b.username);
    })

    return results;
}

apiHelper.updateTeamSelect = function(options) {
    // options
    //      .elem select element to add to (required)
    //      .team array from getTeamMembers (required)
    //      .noEmpty Do not empty the select element before adding new team members

    if (!options.noEmpty) {
        $(options.elem).empty();
    }
    let added = {};

    for(const obj of options.team) {
        if (added[obj.username]) {
            continue;
        }
        added[obj.username] = true;

        const optionElem = document.createElement('option');

        $(optionElem).attr('value', obj.username);

        let append = [];
        if (obj.role && obj.role.isOwner) {
            append.push('Product Owner');
        }
        else
        if (obj.isOrg) {
            append.push('Organization Team Member');
        }

        let appendStr = '';
        if (append.length) {
            appendStr = ' (' + append.join(', ') + ')';
        }
        $(optionElem).text(obj.username + appendStr);

        $(options.elem).append(optionElem);
    }
}

apiHelper.getProductsCache = apiHelper.cachedResult();

apiHelper.getProducts = async function(options = {}) {
    if (!apiHelper.auth) {
        return { products: [] };
    }
    const reqOptions = {
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'GET',
        url: 'https://api.particle.io/v1/user/products/'
    };
    if (options.clearCache) {
        apiHelper.getProductsCache.clear(reqOptions); 
    }

    return await apiHelper.getProductsCache.get(reqOptions);    
};

apiHelper.getOrgsCache = apiHelper.cachedResult();

apiHelper.getOrgs = async function(options = {}) {
    if (!apiHelper.auth) {
        return { organizations: [] };
    }
    const reqOptions = {
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'GET',
        url: 'https://api.particle.io/v1/orgs/'
    };
    if (options.clearCache) {
        apiHelper.getOrgsCache.clear(reqOptions); 
    }

    return await apiHelper.getOrgsCache.get(reqOptions);
};


apiHelper.getOrgProductsCache = apiHelper.cachedResult();

apiHelper.getOrgProducts = async function(org, options = {}) {
    const reqOptions = {
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token
        },
        method: 'GET',
        url: 'https://api.particle.io/v1/orgs/' + org + '/products/'
    };
    if (options.clearCache) {
        apiHelper.getOrgProductsCache.clear(reqOptions); 
    }

    return await apiHelper.getOrgProductsCache.get(reqOptions);    
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

apiHelper.filterByPlatformIdArray = function(array, platformIdArray) {
    let results = [];

    for(const obj of array) {
        if (platformIdArray.includes(obj.platform_id)) {
            results.push(obj);
        }
    }

    results.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    return results;
};

apiHelper.filterByTrackerPlatform = function(array) {
    return apiHelper.filterByPlatformIdArray(array, [26, 28]);
};

apiHelper.unclaimDevice = async function(deviceId) {
    return await $.ajax({
        dataType: 'json',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token,
            'X-Particle-Tool': 'particle-docs',
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
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token,
            'X-Particle-Tool': 'particle-docs',
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
            'Authorization': 'Authorization: Bearer ' + apiHelper.auth.access_token,
            'X-Particle-Tool': 'particle-docs',
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
            analytics.track('Finished', {category:options.eventCategory});
        }
    };

    /*
    resultObj.timer = setInterval(function() {

        let durationMinutesStr = Math.floor((Date.now() - resultObj.startMs) / 60000).toString(); 
        if (durationMinutesStr.length < 6) {
            durationMinutesStr = '000000'.substr(0, 6 - durationMinutesStr.length) + durationMinutesStr;
        }

        analytics.track(options.actionPrefix + durationMinutesStr, {category:options.eventCategory});
    }, periodMinutes * 60000);
    */
   
    analytics.track('Started', {category:options.eventCategory});

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
    $('.apiHelperFileSelector').each(function() {
        const thisPartial = $(this);

        const inputId = $(thisPartial).data('input-id');
        console.log('inputId=' + inputId);

        $(thisPartial).on('click', function(ev) {
            console.log('click apiHelperFileSelector');
            $('#' + inputId).trigger('click');
            ev.preventDefault();
        });
    });        

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


