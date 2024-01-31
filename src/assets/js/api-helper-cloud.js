
$(document).ready(function () {
    if ($('.apiHelper').length == 0) {
        return;
    }

    const localStorageKey = 'cloudApiAuthDemo';
    let settings;
    try {
        settings = JSON.parse(sessionStorage.getItem(localStorageKey));
        if (!settings) {
            settings = {};
        }
        if (apiHelper.auth.access_token != settings.userToken) {
            sessionStorage.removeItem(localStorageKey);
            settings = {};
        }
    }
    catch (e) {
        settings = {};
    }

    const loadSettings = function () {
        if (settings.product) {
            $('.apiHelperAuthSettingsProduct').val(settings.product);
        }
        if (settings.clientId) {
            $('.apiHelperAuthSettingsClientId').val(settings.clientId);
        }
        if (settings.clientSecret) {
            $('.apiHelperAuthSettingsClientSecret').val(settings.clientSecret);
        }
        if (settings.productAccessToken) {
            $('.apiHelperAuthSettingsProductAccessToken').val(settings.productAccessToken);
        }
        if (settings.deviceId) {
            $('.apiHelperDeviceLookupDeviceId').val(settings.deviceId);
        }
        if (settings.lastCustomer && settings.customers && settings.customers[settings.lastCustomer]) {
            $('.apiHelperAuthSettingsCustomerEmail').val(settings.lastCustomer);                
            $('.apiHelperAuthSettingsCustomerAccessToken').val(settings.customers[settings.lastCustomer]);                
        }
        if (settings.claimCode) {
            $('.apiHelperAuthSettingsClaimCode').val(settings.claimCode);
        }
    };

    const saveSettings = function () {
        const elemArray = $('.apiHelperDeviceLookupDeviceId');
        if (elemArray.length > 0) {
            settings.deviceId = $(elemArray[0]).val();
        }
        settings.userToken = apiHelper.auth.access_token;

        sessionStorage.setItem(localStorageKey, JSON.stringify(settings));
    };

    $($('.apiHelper')[0]).on('ssoLogout', function() {
        sessionStorage.removeItem(localStorageKey);
    });

    const setCodeBox = function (parentElem, text) {
        const thisCodeElem = $(parentElem).find('.codebox');
        $(thisCodeElem).text(text);
        $(thisCodeElem).removeClass('prettyprinted');
        if (prettyPrint) {
            prettyPrint();
        }
    };

    const objectToFormUrl = function(obj) {
        let result = '';
        
        const keys = Object.keys(obj);
        for (let ii = 0; ii < keys.length; ii++) {
            result += keys[ii] + '=' + encodeURIComponent(obj[keys[ii]]);
            if ((ii + 1) < keys.length) {
                result += '&';
            }
        }
        return result;
    }

    const addQueryParameters = function(thisElem, parameterArray, request) {
        let queryParams = {};

        parameterArray.forEach(function (which) {
            const value = $(thisElem).find('.apiHelper_' + which).val();
            if (value) {
                queryParams[which] = value;
            }
        });

        if (Object.keys(queryParams).length > 0) {
            request.url += '?' + objectToFormUrl(queryParams);
        }
    }

    const setRequest = function (parentElem, request) {
        let requestStr = request.method + ' ' + request.url + '\n';
        if (request.headers) {
            for (const header in request.headers) {
                requestStr += header + ': ' + request.headers[header] + '\n';
            }
        }
        if (request.contentType) {
            requestStr += 'Content-Type: ' + request.contentType + '\n';
        }

        if (request.data) {
            requestStr += '\n' + request.data;
        }

        $(parentElem).find('.apiHelperApiRequest > pre').text(requestStr);
        $(parentElem).find('.apiHelperApiRequest').show();
    };

    const cloudDeviceSelectElems = $('.apiHelperCloudDeviceSelect');
    if (cloudDeviceSelectElems.length > 0) {
        apiHelper.deviceList(cloudDeviceSelectElems, {
            getTitle: function (dev) {
                return dev.name + ' (' + dev.id + ')' + (dev.online ? '' : ' (offline)');
            },
            hasRefresh: true,
            onChange: function (elem) {
                const deviceId = $(elem).val();
    
                const thisPartial = $(elem).closest('div.apiHelperDeviceVariable');
    
            }
        });    
    }

    const simpleGetConfigs = [
        {
            className: 'apiHelperCloudApiDeviceList',
            gaAction: 'List Devices',
            url: 'https://api.particle.io/v1/devices/'
        },
        {
            className: 'apiHelperCloudApiProductList',
            gaAction: 'List Products',
            url: 'https://api.particle.io/v1/user/products/'
        },
        {
            className: 'apiHelperCloudApiOrgList',
            gaAction: 'List Organizations',
            url: 'https://api.particle.io/v1/orgs/'
        }
    ];



    for (const simpleGetConfig of simpleGetConfigs) {

        $('.' + simpleGetConfig.className).each(function () {
            const thisElem = $(this);

            const setStatus = function (status) {
                $(thisElem).find('.apiHelperStatus').html(status);
            };

            $(thisElem).find('.apiHelperActionButton').on('click', function () {
                setStatus('Making request: ' + simpleGetConfig.gaAction + '...');

                const request = {
                    dataType: 'json',
                    error: function (jqXHR) {
                        analytics.track('Error', {category:simpleGetConfig.gaAction, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});
                        setStatus('Request failed');

                        $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                        $(respElem).show();
                    },
                    headers: {
                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                        'Accept': 'application/json'
                    },
                    method: 'GET',
                    success: function (resp, textStatus, jqXHR) {
                        analytics.track('Success', {category:simpleGetConfig.gaAction});
                        setStatus('');

                        $(outputJsonElem).show();
                        setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                        $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                        $(respElem).show();
                    },
                    url: simpleGetConfig.url
                };

                setRequest(thisElem, request);

                const respElem = $(thisElem).find('.apiHelperApiResponse');
                $(respElem).find('pre').text('');

                const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
                $(outputJsonElem).hide();

                $.ajax(request);

            });
        });
    }

    const readCommonOptions = function(thisElem) {
        let result = {};

        if ($(thisElem).find('.apiHelperDeviceLookupDeviceId').length) {
            result.deviceId = $(thisElem).find('.apiHelperDeviceLookupDeviceId').val();
        }
        else {
            result.deviceId = $(thisElem).find('.apiHelperCloudDeviceSelect').val();
        }

        if ($(thisElem).find('.apiHelperDeviceLookupDeviceId').length) {
            result.productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();
        }
        if ($(thisElem).find('.apiHelperAuthSettingsProductAccessToken').length) {
            result.accessToken = $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').val();
        }
        if ($(thisElem).find('.apiHelperAuthSettingsCustomerAccessToken').length) {
            result.accessToken = $(thisElem).find('.apiHelperAuthSettingsCustomerAccessToken').val();
        }
        if (!result.accessToken) {
            result.accessToken = apiHelper.auth.access_token;
        }
        
        result.getDeviceIdUrl = function(op) {
            if (result.productId) {
                return 'https://api.particle.io/v1/products/' + result.productId + '/' + op + '/' + result.deviceId;
            }
            else {
                return 'https://api.particle.io/v1/' + op + '/' + result.deviceId;
            }
        };

        return result;
    };

    const readCommonOptionsProdDevRadio = function(thisElem) {

        let result = {};
        
        const prodDevMode = $(thisElem).find('.apiHelperProductDeveloperRadio').find('input[type=radio]:checked').val();
        switch(prodDevMode) {
            case 'prod':
                result.productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();
                result.deviceId = $(thisElem).find('.apiHelperDeviceLookupDeviceId').val();
                result.accessToken = $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').val();                        
                break;

            case 'dev':
                result.deviceId = $(thisElem).find('.apiHelperCloudDeviceSelect').val();
                result.accessToken = apiHelper.auth.access_token;
                break;
        }

        result.getDeviceIdUrl = function(op) {
            switch(prodDevMode) {
                case 'prod':
                    return 'https://api.particle.io/v1/products/' + result.productId + '/' + op + '/' + result.deviceId;
    
                case 'dev':
                    return 'https://api.particle.io/v1/' + op + '/' + result.deviceId;
                }
        };

        return result;
    
    };

    $('.apiHelperCloudApiGetVariable').each(function () {
        const thisElem = $(this);


        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(thisElem).find('.apiHelperGetVariable').on('click', function () {
            setStatus('Requesting variable...');

            const opts = readCommonOptions(thisElem);

            const variableName = $(thisElem).find('.apiHelperVariableName').val();
            const style = $(thisElem).attr('data-style') || 'authHeader';

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:'Get Variable', label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error retrieving variable');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:'Get Variable'});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: opts.getDeviceIdUrl('devices') + '/' + variableName
            }

            switch (style) {
                case 'authHeader':
                    request.headers = {
                        'Authorization': 'Bearer ' + opts.accessToken,
                        'Accept': 'application/json'
                    };
                    break;

                case 'query':
                    request.url += '?access_token=' + opts.accessToken;
                    break;
            }
            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);

        });
    });


    $('.apiHelperCloudApiFunction').each(function () {
        const thisElem = $(this);

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(thisElem).find('.apiHelperCallFunction').on('click', function () {
            setStatus('Calling function...');

            const functionName = $(thisElem).find('.apiHelperFunctionName').val();
            const functionParameter = $(thisElem).find('.apiHelperFunctionParameter').val();
            const style = $(thisElem).attr('data-style') || 'authHeader';

            const opts = readCommonOptions(thisElem);

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:'Call function', label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error calling function');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:'Call Function'});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                url: opts.getDeviceIdUrl('devices') + '/' + functionName
            }

            switch (style) {
                case 'authHeader':
                    request.headers = {
                        'Authorization': 'Bearer ' + opts.accessToken,
                        'Accept': 'application/json'
                    };
                    request.data = JSON.stringify({ arg: functionParameter });
                    request.contentType = 'application/json';
                    break;

                case 'authHeaderForm':
                    request.headers = {
                        'Authorization': 'Bearer ' + opts.accessToken,
                        'Accept': 'application/json'
                    };
                    request.data = 'arg=' + encodeURIComponent(functionParameter);
                    request.contentType = 'application/x-www-form-urlencoded';
                    break;

                case 'form':
                    request.data = 'arg=' + encodeURIComponent(functionParameter) + '&access_token=' + opts.accessToken;
                    request.contentType = 'application/x-www-form-urlencoded';
                    break;
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);

        });
    });


    $('.apiHelperCloudApiPublish').each(function () {
        const thisElem = $(this);
        const gaCategory = 'Publish event';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(thisElem).find('.apiHelperActionButton').on('click', function () {
            setStatus('Publishing event...');

            let dataObj = {
                name: $(thisElem).find('.apiHelperEventName').val(),
                data: $(thisElem).find('.apiHelperEventData').val()
            };

            let accessToken;
            let url;

            if ($(thisElem).find('.apiHelperAuthSettingsProductAccessToken').length) {
                accessToken = $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').val();

                const productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();
                deviceId = $(thisElem).find('.apiHelperDeviceLookupDeviceId').val();
                url = 'https://api.particle.io/v1/products/' + productId + '/events';
            }
            else
            if ($(thisElem).find('.apiHelperAuthSettingsCustomerAccessToken').length) {
                accessToken = $(thisElem).find('.apiHelperAuthSettingsCustomerAccessToken').val();
                deviceId = $(thisElem).find('.apiHelperDeviceLookupDeviceId').val();
                url = 'https://api.particle.io/v1/devices/events';
            }
            else {
                accessToken = apiHelper.auth.access_token;
                deviceId = $(thisElem).find('.apiHelperCloudDeviceSelect').val();
                url = 'https://api.particle.io/v1/devices/events';
            }
            
            let request = {
                contentType: 'application/json',
                data: JSON.stringify(dataObj),
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Accept': 'application/json'
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                url,
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);

        });
    });





    $('.apiHelperCloudApiListProductDevices').each(function () {
        const thisElem = $(this);

        const requestElem = $(thisElem).find('.apiHelperApiRequest');
        const respElem = $(thisElem).find('.apiHelperApiResponse');
        const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
        const productSelectElem = $(thisElem).find('.apiHelperCloudProductSelect');

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(productSelectElem).on('change', function () {
            $(requestElem).hide();
            $(respElem).hide();
            $(outputJsonElem).hide();
        });

        apiHelper.getProducts().then(function (productsData) {

            productsData.products.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

            if (productsData.products.length > 0) {
                let html = '';
                for (let product of productsData.products) {
                    html += '<option value="' + product.id + '">' + product.name + ' (' + product.id + ')</option>';
                }
                $(productSelectElem).html(html);
            }
            else {
                setStatus('You do not have any products in your sandbox');
                $(thisElem).find('.apiHelperActionButton').prop('disabled', true);
            }
        });

        $(thisElem).find('.apiHelperActionButton').on('click', function () {
            setStatus('Requesting product devices...');

            const productId = $(productSelectElem).val();

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:'List Product Devices', label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error getting product device list');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:'List Product Devices'});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/products/' + productId + '/devices/'
            }

            addQueryParameters(thisElem, ['deviceId', 'deviceName', 'groups', 'sortAttr', 'sortDir', 'quarantined', 'page', 'perPage'], request);

            setRequest(thisElem, request);

            $(respElem).find('pre').text('');

            $(outputJsonElem).hide();

            $.ajax(request);

        });
    });



    $('.apiHelperCloudApiListOrgProducts').each(function () {
        const thisElem = $(this);

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };


        apiHelper.getOrgs().then(function (orgsData) {
            // No orgs: orgsData.organizations empty array
            // Object in array orgsData.organizations: id, slug, name

            if (orgsData.organizations.length > 0) {
                let html = '';
                for (let org of orgsData.organizations) {
                    html += '<option value="' + org.id + '">' + org.name + '</option>';
                }
                $(thisElem).find('.apiHelperCloudOrgSelect').html(html);
            }
            else {
                setStatus('You do not have access to any organizations');
                $(thisElem).find('.apiHelperActionButton').prop('disabled', true);
            }
        });

        $(thisElem).find('.apiHelperActionButton').on('click', function () {
            setStatus('Requesting organization products...');

            const org = $(thisElem).find('.apiHelperCloudOrgSelect').val();

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:'List Org Products', label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error getting organization products');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:'List Org Products'});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/orgs/' + org + '/products/'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);

        });
    });



    $('.apiHelperCloudApiListOrgTeam').each(function () {
        const thisElem = $(this);

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };


        apiHelper.getOrgs().then(function (orgsData) {
            // No orgs: orgsData.organizations empty array
            // Object in array orgsData.organizations: id, slug, name

            if (orgsData.organizations.length > 0) {
                let html = '';
                for (let org of orgsData.organizations) {
                    html += '<option value="' + org.id + '">' + org.name + '</option>';
                }
                $(thisElem).find('.apiHelperCloudOrgSelect').html(html);
            }
            else {
                setStatus('You do not have access to any organizations');
                $(thisElem).find('.apiHelperActionButton').prop('disabled', true);
            }
        });

        $(thisElem).find('.apiHelperActionButton').on('click', function () {
            setStatus('Requesting organization team members...');

            const org = $(thisElem).find('.apiHelperCloudOrgSelect').val();

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:'List Org Team', label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error getting organization team members');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:'List Org Team'});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/orgs/' + org + '/team/'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);

        });
    });

    if ($('.apiHelperCloudApiAuthSettings').length > 0) {

        const buildProductsMenu = function () {
            apiHelper.getProducts().then(function (productsResp) {
                const productsArray = apiHelper.filterByPlatformId(productsResp.products, 6);
                let html = '';
                if (productsArray.length == 0) {
                    html = '<option disabled>No Photon products available</option>';
                    delete settings.product;
                }
                else {
                    for (const prod of productsArray) {
                        html += '<option value="' + prod.id + '">' + prod.name + ' (' + prod.id + ')</option>';
                    }

                    const productMenuElems = $('.apiHelperAuthSettingsProduct');
                    $(productMenuElems).html(html);
                    if (settings.product) {
                        $(productMenuElems).val(settings.product);
                    }
                }
            });
        };

        if (settings.product) {
            buildProductsMenu();
        }

        $('.apiHelperCloudApiAuthSettings').each(function () {
            const thisElem = $(this);

            $(thisElem).on('loadSettings', loadSettings);

            const selectProductElem = $(thisElem).find('.apiHelperAuthSettingsProduct');
            const clientIdElem = $(thisElem).find('.apiHelperAuthSettingsClientId');
            const clientSecretElem = $(thisElem).find('.apiHelperAuthSettingsClientSecret');

            $(selectProductElem).on('click', async function () {
                buildProductsMenu();
            });
            $(selectProductElem).on('change', function () {
                settings.product = $(selectProductElem).val();
                saveSettings();
            });
            $(clientIdElem).on('blur', function () {
                settings.clientId = $(clientIdElem).val();
                saveSettings();
                $('.apiHelperAuthSettingsClientId').val(settings.clientId);
            });
            $(clientSecretElem).on('blur', function () {
                settings.clientSecret = $(clientSecretElem).val();
                saveSettings();
                $('.apiHelperAuthSettingsClientSecret').val(settings.clientSecret);
            });
        });

    }

    $('.apiHelperCloudApiCreateToken').each(function () {
        const thisElem = $(this);

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {
            const clientId = $(thisElem).find('.apiHelperAuthSettingsClientId').val();
            const clientSecret = $(thisElem).find('.apiHelperAuthSettingsClientSecret').val();

            const grantType = $(thisElem).find('.apiHelperAuthSettingsGrantType').val();
            const expiresIn = $(thisElem).find('.apiHelperAuthSettingsExpiresIn').val();

            let request = {
                contentType: 'application/x-www-form-urlencoded',
                data: 'grant_type=' + encodeURIComponent(grantType) + '&expires_in=' + encodeURIComponent(expiresIn),
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:'Create Token', label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error creating token');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret),
                    'Accept': 'application/json'
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:'Create Token'});

                    settings.productAccessToken = resp.access_token;
                    saveSettings();
                    $('.apiHelperAuthSettingsProductAccessToken').val(resp.access_token);


                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/oauth/token'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });
    });

    $('.apiHelperCloudApiCreateTokenSimple').each(function () {
        const thisElem = $(this);

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        if (apiHelper.auth && apiHelper.auth.username) {
            $(thisElem).find('.apiHelperAuthSettingsUsername').val(apiHelper.auth.username);
        }

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');
        const mfaTokenRow = $(thisElem).find('.apiHelperMfaTokenRow');
        const accessTokenRow = $(thisElem).find('.apiHelperAccessTokenRow');

        $(mfaTokenRow).hide();
        $(accessTokenRow).hide();

        let mfa_token;

        $(actionButtonElem).on('click', async function () {
            const expiresIn = $(thisElem).find('.apiHelperAuthSettingsExpiresIn').val();
            const username = $(thisElem).find('.apiHelperAuthSettingsUsername').val();
            const password = $(thisElem).find('.apiHelperAuthSettingsPassword').val();

            let requestData;
            if (mfa_token) {
                requestData = 'grant_type=urn:custom:mfa-otp&mfa_token=' + encodeURIComponent(mfa_token) + '&otp=' + encodeURIComponent($(thisElem).find('.apiHelperAuthSettingsMfaOtpToken').val());
            }
            else {
                requestData = 'grant_type=password&expires_in=' + expiresIn + '&username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
            }

            let request = {
                contentType: 'application/x-www-form-urlencoded',
                data: requestData,
                dataType: 'json',
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        // Got a 403 error, MFA required. Show the MFA/OTP page.
                        mfa_token = jqXHR.responseJSON.mfa_token;
                        $(thisElem).find('.apiHelperMfaTokenRow').show();
                        return;
                    }
                    analytics.track('Error', {category:'Create Token Simple', label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error creating token');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + btoa('particle:particle'),
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('Token created!');
                    analytics.track('Success', {category:'Create Token Simple'});

                    $(thisElem).find('.apiHelperAuthSettingsAccessToken').val(resp.access_token);
                    $(accessTokenRow).show();

                    mfa_token = null;
                    $(mfaTokenRow).hide();
                },
                url: 'https://api.particle.io/oauth/token'
            }

            $(accessTokenRow).hide();

            $.ajax(request);
        });
    });

    $('.apiHelperCloudApiImportDevice').each(function () {
        const thisElem = $(this);

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {


            const accessToken = $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').val();
            const productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();
            const deviceId = $(thisElem).find('.apiHelperDeviceLookupDeviceId').val();

            let request = {
                contentType: 'application/x-www-form-urlencoded',
                data: 'id=' + encodeURIComponent(deviceId),
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:'Import Device', label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error importing device');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Accept': 'application/json'
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:'Import Device'});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/products/' + productId + '/devices'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });
    });



    $('.apiHelperCloudApiGetDeviceInfo').each(function () {
        const thisElem = $(this);
        const gaCategory = 'GetDeviceInfo';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {
            let accessToken;
            let productId = 0;
            if ($(thisElem).find('.apiHelperAuthSettingsProductAccessToken').length) {
                accessToken = $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').val();
            }
            else {
                accessToken = apiHelper.auth.access_token;
            }
            if ($(thisElem).find('.apiHelperAuthSettingsProduct').length) {
                productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();
            }

            const deviceId = $(thisElem).find('.apiHelperDeviceLookupDeviceId').val();

            let url;
            if (productId) {
                url = 'https://api.particle.io/v1/products/' + productId + '/devices/' + deviceId;
            }
            else {
                url = 'https://api.particle.io/v1/devices/' + deviceId;
            }
            
            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });
    });


    $('.apiHelperCloudApiGetSimInfo').each(function () {
        const thisElem = $(this);
        const gaCategory = 'GetSimInfo';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {

            const iccid = $(thisElem).find('.apiHelperDeviceLookupSim').val();

            let url = 'https://api.particle.io/v1/sims/' + iccid;
            
            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });
    });




    $('.apiHelperCloudApiGetProductInfo').each(function () {
        const thisElem = $(this);
        const gaCategory = 'GetProductInfo';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {

            const productId = $(thisElem).find('.apiHelperDeviceLookupProductId').val();

            let url = 'https://api.particle.io/v1/products/' + productId;
            
            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });
    });


    $('.apiHelperProductDeveloperRadio').each(function(index) {
        const thisElem = $(this);

        const parentElem = $(thisElem).closest('div.apiHelperCloudApiDeviceVitalsLast');

        const baseId = 'apiHelperProductDeveloperRadio' + index;

        $(thisElem).find('input[value=prod]')
            .prop('id', baseId + 'radioProd')
            .prop('name', baseId)
            .prop('checked', true)
            .next()
                .prop('for', baseId + 'radioProd');

        $(thisElem).find('input[value=dev]')
        .prop('id', baseId + 'radioDev')
        .prop('name', baseId)
        .next()
            .prop('for', baseId + 'radioDev');
    
    });

    const productDeveloperRadioChange = function(thisElem) {
        $(thisElem).find('.apiHelperProductDeveloperRadio').find('input[type=radio]').on('change', function() {
            switch($(this).val()) {
                case 'prod':
                    $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').parents('tr').show();
                    $(thisElem).find('.apiHelperAuthSettingsProduct').parents('tr').show();
                    $(thisElem).find('.apiHelperDeviceLookupDeviceId').parents('tr').show();
                    $(thisElem).find('.apiHelperCloudDeviceSelect').parents('tr').hide();
                    break;

                case 'dev':
                    $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').parents('tr').hide();
                    $(thisElem).find('.apiHelperAuthSettingsProduct').parents('tr').hide();
                    $(thisElem).find('.apiHelperDeviceLookupDeviceId').parents('tr').hide();
                    $(thisElem).find('.apiHelperCloudDeviceSelect').parents('tr').show();
                    break;
            }
        });        

        $(thisElem).find('.apiHelperProductDeveloperRadio').find('input[type=radio]:checked').trigger('change');
    };

    $('.apiHelperCloudApiDeviceVitalsLast').each(function () {
        const thisElem = $(this);
        const gaCategory = 'Get Device Vitals Last';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {
            const opts = readCommonOptionsProdDevRadio(thisElem);
            
            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + opts.accessToken,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: opts.getDeviceIdUrl('diagnostics') + '/last'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });

        productDeveloperRadioChange(thisElem);
        
    });


    $('.apiHelperCloudApiDeviceVitals').each(function () {
        const thisElem = $(this);
        const gaCategory = 'Get Device Vitals';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {
            const opts = readCommonOptionsProdDevRadio(thisElem);
            
            let dataObj = {
                start_date: $(thisElem).find('.apiHelperDeviceLookupStartDate').val(),
                end_date: $(thisElem).find('.apiHelperDeviceLookupEndDate').val()
            }

            const outputFormat = $(thisElem).find('input[name=deviceVitalsFormat]:checked').val();
            let accept, dataType;
            if (outputFormat == 'csv') {
                accept = 'text/csv';
                dataType = 'text';
            }
            else {
                accept = 'application/json';
                dataType = 'json';
            }

            let request = {
                dataType,
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + opts.accessToken,
                    accept
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    if (outputFormat == 'csv') {
                        var blob = new Blob([resp], {type: "text/plain;charset=utf-8"});
                                                saveAs(blob, 'diagnostics.csv');
                        
                        setStatus('Saved csv data to Downloads');
                    }
                    else {
                        $(outputJsonElem).show();
                        setCodeBox(thisElem, JSON.stringify(resp, null, 2));
    
                        $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                        $(respElem).show();    
                    }
                },
                url: opts.getDeviceIdUrl('diagnostics')
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });

        productDeveloperRadioChange(thisElem);

        // Initial date values
        const endDate = new Date();
        $(thisElem).find('.apiHelperDeviceLookupEndDate').val(endDate.toISOString());

        const startDate = new Date(endDate.getTime() - 7 * 24 * 3600 * 1000);
        $(thisElem).find('.apiHelperDeviceLookupStartDate').val(startDate.toISOString()); 
    });


    $('.apiHelperCloudApiDeviceName').each(function () {
        const thisElem = $(this);
        const gaCategory = 'Device Rename';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {
            const opts = readCommonOptionsProdDevRadio(thisElem);
            
            let dataObj = {
                name: $(thisElem).find('.apiHelperDeviceName').val()
            };

            let request = {
                contentType: 'application/json',
                data: JSON.stringify(dataObj),
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + opts.accessToken,
                    'Accept': 'application/json'
                },
                method: 'PUT',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: opts.getDeviceIdUrl('devices')
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });

        productDeveloperRadioChange(thisElem);
        
    });

    $('.apiHelperCloudApiDevicePing').each(function () {
        const thisElem = $(this);
        const gaCategory = 'Device Ping';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {
            const opts = readCommonOptionsProdDevRadio(thisElem);
            
            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + opts.accessToken,
                    'Accept': 'application/json'
                },
                method: 'PUT',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: opts.getDeviceIdUrl('devices') + '/ping'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });

        productDeveloperRadioChange(thisElem);
        
    });


    $('.apiHelperCloudApiDeviceNotes').each(function () {
        const thisElem = $(this);

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $($(thisElem).find('.apiHelperGetButton')).on('click', async function () {
            const opts = readCommonOptionsProdDevRadio(thisElem);
            const gaCategory = 'Device Notes Get';
            
            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + opts.accessToken,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();

                    $(thisElem).find('.apiHelperCloudApiEdit > textarea').val(resp.notes);
                },
                url: opts.getDeviceIdUrl('devices')
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });

        $($(thisElem).find('.apiHelperSetButton')).on('click', async function () {
            const opts = readCommonOptionsProdDevRadio(thisElem);
            const gaCategory = 'Device Notes Set';
            
            let dataObj = {
                notes: $(thisElem).find('.apiHelperCloudApiEdit > textarea').val()
            };

            let request = {
                contentType: 'application/json',
                data: JSON.stringify(dataObj),
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + opts.accessToken,
                    'Accept': 'application/json'
                },
                method: 'PUT',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: opts.getDeviceIdUrl('devices')
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });

        productDeveloperRadioChange(thisElem);
        
    });

    $('.apiHelperCloudApiCreateCustomer').each(function () {
        const thisElem = $(this);

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(thisElem).find('.apiHelperUuidButton').on('click', function () {
            // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
            const uuidv4 = function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
            $(thisElem).find('.apiHelperAuthSettingsCustomerEmail').val(uuidv4());
        });

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {
            const productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();

            const clientId = $(thisElem).find('.apiHelperAuthSettingsClientId').val();
            const clientSecret = $(thisElem).find('.apiHelperAuthSettingsClientSecret').val();

            const customerEmail = $(thisElem).find('.apiHelperAuthSettingsCustomerEmail').val();

            const noPassword = $(thisElem).find('.apiHelperCreateCustomerNoPassword').val();

            let data = 'email=' + encodeURIComponent(customerEmail) + '&no_password=' + noPassword;

            let request = {
                contentType: 'application/x-www-form-urlencoded',
                data,
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:'Create Customer', label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error creating customer');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret),
                    'Accept': 'application/json'
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:'Create Customer'});

                    if (!settings.customers) {
                        settings.customers = {};
                    }

                    settings.lastCustomer = customerEmail;
                    settings.customers[customerEmail] = resp.access_token;
                    saveSettings();
                    $('.apiHelperAuthSettingsCustomerAccessToken').val(resp.access_token);

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/products/' + productId + '/customers'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });

    });


    $('.apiHelperCloudApiCustomerToken').each(function () {
        const thisElem = $(this);
        const gaCategory = 'Create Customer Token';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };


        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {
            const clientId = $(thisElem).find('.apiHelperAuthSettingsClientId').val();
            const clientSecret = $(thisElem).find('.apiHelperAuthSettingsClientSecret').val();

            const customerEmail = $(thisElem).find('.apiHelperAuthSettingsCustomerEmail').val();
            const expiresIn = $(thisElem).find('.apiHelperAuthSettingsExpiresIn').val();

            let dataObj = {
                grant_type: 'client_credentials',
                scope: 'customer=' + customerEmail
            };
            if (expiresIn) {
                dataObj.expires_in = expiresIn;
            }
            
            let request = {
                contentType: 'application/x-www-form-urlencoded',
                data: objectToFormUrl(dataObj),
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret),
                    'Accept': 'application/json'
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    if (!settings.customers) {
                        settings.customers = {};
                    }

                    settings.lastCustomer = customerEmail;
                    settings.customers[customerEmail] = resp.access_token;
                    saveSettings();
                    $('.apiHelperAuthSettingsCustomerAccessToken').val(resp.access_token);

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/oauth/token'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });

        let customerSelectEmpty;

        const customerSelectElem = $(thisElem).find('.apiHelperCloudCustomerSelect');
        $(customerSelectElem).on('click', function() {
            if (!customerSelectEmpty) {
                customerSelectEmpty = $(customerSelectElem).html();
            }
            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                perPage: 100,
                success: function (resp, textStatus, jqXHR) {
                    let html = customerSelectEmpty;
                    for(const customerObj of resp.customers) {
                        html += '<option value="' + customerObj.username + '">' + customerObj.username + '</option>';
                    }
                    $(customerSelectElem).html(html);
                },
                url: 'https://api.particle.io/v1/products/' + settings.product + '/customers'
            }

            $.ajax(request);
        });
        
        $(customerSelectElem).on('change', function() {
            const username = $(customerSelectElem).val();
            if (username != 'select') {
                $(thisElem).find('.apiHelperAuthSettingsCustomerEmail').val(username);
                $(customerSelectElem).html(customerSelectEmpty);
                $(customerSelectElem).val('select');
            }
        });
        


    });

    $('.apiHelperCloudApiCreateClaimCode').each(function () {
        const thisElem = $(this);

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {
            const accessToken = $(thisElem).find('.apiHelperAuthSettingsCustomerAccessToken').val();
            const productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();
            const imei = $(thisElem).find('.apiHelperClaimCodeIMEI').val();
            const iccid = $(thisElem).find('.apiHelperClaimCodeICCID').val();

            let data = '';
            if (imei) {
                data = 'imei=' + imei;
            }
            else if (iccid) {
                data = 'iccid=' + iccid;
            }

            let request = {
                contentType: 'application/x-www-form-urlencoded',
                data,
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:'Create Claim Code', label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error creating claim code');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Accept': 'application/json'
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:'Create Claim Code'});

                    settings.claimCode = resp.claim_code;
                    saveSettings();
                    $('.apiHelperAuthSettingsClaimCode').val(resp.claim_code);

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/products/' + productId + '/device_claims'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });
    });

    $('.apiHelperCloudApiPhotoClaimWiFi').each(function() {
        const thisElem = $(this);
        const gaCategory = 'Photon Claim WiFi';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {
            const claimCode = $(thisElem).find('.apiHelperAuthSettingsClaimCode').val();

            let dataObj = {
                k: 'cc',
                v: claimCode
            };

            let request = {
                data: JSON.stringify(dataObj),
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory});

                    setStatus('Error in ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'http://192.168.0.1/set'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });

        $(thisElem).find('.apiHelperResetButton').on('click', async function () {

            let dataObj = {
                idx: 0
            };

            let request = {
                data: JSON.stringify(dataObj),
                dataType: 'json',
                error: function (jqXHR) {
                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'http://192.168.0.1/connect-ap'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });

    });

    $('.apiHelperCloudApiPhotoClaimUSB').each(function() {
        const thisElem = $(this);
        const gaCategory = 'Photon Claim USB';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const logElem = $(thisElem).find('.apiHelperLog > pre');

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        let listening;

        const appendLog = function(s) {
            $(logElem).text($(logElem).text() + s);
        };

        const beginListening = async function(cb) {
            if (!listening) {
                $(logElem).text('');

                listening = usbSerial.listeningCommand({
                    logSend: appendLog,
                    logReceive: appendLog
                });
        
                listening.connect({
                    showWifiListeningDevices:true,            
                    onConnect: function() {
                        cb(listening);
                    }
                });
            }
            else {
                cb(listening);
            }
        }

        $(actionButtonElem).on('click', async function () {
            const claimCode = $(thisElem).find('.apiHelperAuthSettingsClaimCode').val();

            beginListening(function(listening) {
                usbSerial.setClaimCode(listening, {
                    onCompletion: function(results) {
                        setStatus('Completed');       
                    },
                    claimCode
                });
            });        
        });

        $(thisElem).find('.apiHelperResetButton').on('click', async function () {
            beginListening(function(listening) {
                usbSerial.exit(listening, {
                    onCompletion: function(results) {
                        listening.disconnect();
                    }
                });
            });        
        });
    });


    $('.apiHelperCloudApiListCustomers').each(function () {
        const thisElem = $(this);
        const gaCategory = 'List Customers';

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        $(actionButtonElem).on('click', async function () {
            const accessToken = $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').val();
            const productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/products/' + productId + '/customers'
            }

            addQueryParameters(thisElem, ['page', 'perPage'], request);

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });
    });

    $('.apiHelperCloudApiClaiming').each(function () {
        const thisElem = $(this);

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const claimDevice = function(accessToken) {
            const deviceId = $(thisElem).find('.apiHelperDeviceLookupDeviceId').val();
            const gaCategory = 'Claim Device';

            let request = {
                contentType: 'application/x-www-form-urlencoded',
                data: 'id=' + encodeURIComponent(deviceId),
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Accept': 'application/json'
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/devices/'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        }
        
        $(thisElem).find('.apiHelperClaimMyAccountButton').on('click', async function () {
            const accessToken = apiHelper.auth.access_token;
            claimDevice(accessToken);
        });

        $(thisElem).find('.apiHelperClaimCustomerButton').on('click', async function () {
            const accessToken = $(thisElem).find('.apiHelperAuthSettingsCustomerAccessToken').val();
            claimDevice(accessToken);        
        });

        $(thisElem).find('.apiHelperUnclaimButton').on('click', async function () {
            const accessToken = $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').val();
            const productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();
            const deviceId = $(thisElem).find('.apiHelperDeviceLookupDeviceId').val();
            const gaCategory = 'Claim My Account';

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Accept': 'application/json'
                },
                method: 'DELETE',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/products/' + productId + '/devices/' + deviceId + '/owner'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });
        
        const markDevelopment = function(turnOn) {
            const accessToken = $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').val();
            const productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();
            const deviceId = $(thisElem).find('.apiHelperDeviceLookupDeviceId').val();
            const gaCategory = 'Mark Development';

            let requestBodyObj = {
                development: turnOn
            };

            let request = {
                contentType: 'application/json',
                data: JSON.stringify(requestBodyObj),
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Accept': 'application/json'
                },
                method: 'PUT',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/products/' + productId + '/devices/' + deviceId
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        
        };
        $(thisElem).find('.apiHelperMarkDevelopmentButton').on('click', function () {
            markDevelopment(true);
        });
        $(thisElem).find('.apiHelperUnmarkDevelopmentButton').on('click', function () {
            markDevelopment(false);
        });

        $(thisElem).find('.apiHelperProductRemoveButton').on('click', async function () {
            const accessToken = $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').val();
            const productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();
            const deviceId = $(thisElem).find('.apiHelperDeviceLookupDeviceId').val();
            const gaCategory = 'Remove product device';

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Accept': 'application/json'
                },
                method: 'DELETE',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.particle.io/v1/products/' + productId + '/devices/' + deviceId
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });
        
    });

    $('.apiHelperOrgProductSelector').each(function() {
        const thisElem = $(this);

        const productSelectElem = $(thisElem).find('.apiHelperProductSelect');
        const orgSelectElem = $(thisElem).find('.apiHelperOrgSelect');

        let productsData;
        let orgsData;
        let queryState;

        const showHideRows = function() {
            const sandboxOrgVal = $(thisElem).find('.sandboxOrg:checked').val();

            $(thisElem).find('.productSelectorRow').show();

            if (orgsData && orgsData.organizations.length > 0) {
                $(thisElem).find('.sandboxOrgRow').show();

                if (sandboxOrgVal == 'sandbox') {
                    $(thisElem).find('.orgSelectorRow').hide();
                }
                else {
                    // sandboxOrg == 'org'
                    $(thisElem).find('.orgSelectorRow').show();
                }    
            }
            else {
                $(thisElem).find('.sandboxOrgRow').hide();
                $(thisElem).find('.orgSelectorRow').hide();
            }

        };

        $(thisElem).data('getProductId', function() {
            return parseInt($(productSelectElem).val());
        });
        $(thisElem).data('getPlatformId', function() {
            if (!productsData) {
                return null;
            }
            const productId = parseInt($(productSelectElem).val());
            for (let product of productsData.products) {
                if (product.id == productId) {
                    return product.platform_id;
                }
            }
            return null;
        });


        const onChange = function() {
            if ($(thisElem).data('onChange')) {
                $(thisElem).data('onChange')();
            }
        };

        const updateProductList = async function() {
            showHideRows();

            const sandboxOrgVal = $(thisElem).find('.sandboxOrg:checked').val();

            if (sandboxOrgVal == 'sandbox') {
                productsData = await apiHelper.getProducts();
            }
            else {
                const orgId = $(orgSelectElem).val();
                if (!orgId) {
                    return;
                }
                productsData = await apiHelper.getOrgProducts(orgId);
            }
            productsData.products.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

            if (productsData.products.length > 0) {
                let html = '';
                const filterNotProductId = $(thisElem).data('filterNotProductId');
                const filterPlatformId = $(thisElem).data('filterPlatformId');
                const filterEmpty = !!$(thisElem).attr('data-filter-empty');
                const filterCellular = !!$(thisElem).attr('data-cellular');

                for (let product of productsData.products) {
                    if (filterEmpty && product.device_count == 0) {
                        continue;
                    }
                    if (filterPlatformId) {
                        if (product.platform_id != filterPlatformId) {
                            continue;
                        }
                    }
                    if (filterCellular) {
                        let cellular = false;

                        switch (product.platform_id) {
                            case 10: // electron
                            case 13: // boron
                            case 23: // bsom
                            case 25: // bsom
                            case 26: // tracker
                                cellular = true;
                                break;

                            default:
                                break;
                        }
                        
                        if (!cellular) {
                            continue;
                        }
                    }
                    if (filterNotProductId && product.id == filterNotProductId) {
                        continue;
                    }

                    html += '<option value="' + product.id + '">' + product.name + ' (' + product.id + ')</option>';
                }

                $(productSelectElem).html(html);

                if (queryState && queryState.productId) {
                    $(productSelectElem).val(queryState.productId);
                }

            }
            else {
                $(thisElem).find('.apiHelperActionButton').prop('disabled', true);
            }

            onChange();
        };
        $(thisElem).data('updateProductList', updateProductList);

        $(thisElem).find('.sandboxOrg:radio').on('click', function() {
            const selectedRadioElem = $(this);
            $(thisElem).find('.sandboxOrg:radio').prop('checked', false);
            $(selectedRadioElem).prop('checked', true);

            updateProductList();
        });

        $(productSelectElem).on('change', onChange);

        $(orgSelectElem).on('change', updateProductList);

        if (apiHelper.auth) {
            updateProductList();

            apiHelper.getOrgs().then(function (data) {
                // No orgs: orgsData.organizations empty array
                // Object in array orgsData.organizations: id, slug, name
                orgsData = data;
    
                if (orgsData.organizations.length > 0) {
                    let html = '';
                    for (let org of orgsData.organizations) {
                        html += '<option value="' + org.id + '">' + org.name + '</option>';
                    }
                    $(orgSelectElem).html(html);
    
                    if (queryState && queryState.orgId) {
                        $(orgSelectElem).val(queryState.orgId);
                    }
    
                    updateProductList();
                }
                else {
                    // No orgs
                    $(thisElem).find('input[value=org]:radio').prop('disabled', true);
                    $(thisElem).find('.orgSelectorRow').hide();
                    $(thisElem).find('.sandboxOrgRow').hide();
                }
            });
        }


        $(thisElem).data('loadQuerySettings', function(stateObj) {
            queryState = stateObj;

            if (queryState.sandboxOrg) {
                $(thisElem).find('.sandboxOrg:radio[value="' + queryState.sandboxOrg + '"]').trigger('click');
            }
            if (queryState.orgId && orgsData) {
                $(orgSelectElem).val(queryState.orgId);
                $(orgSelectElem).trigger('change');
            }
            
            if (queryState.productId && productsData) {
                $(productSelectElem).val(queryState.productId);
                $(productSelectElem).trigger('change');
            }
            
        });
        $(thisElem).data('saveQuerySettings', function(stateObj) {
            stateObj.sandboxOrg = $(thisElem).find('.sandboxOrg:checked').val();
            if (stateObj.sandboxOrg == 'org') {
                stateObj.orgId = $(orgSelectElem).val();
            }
            else {
                delete stateObj.orgId;
            }
            stateObj.productId = $(productSelectElem).val();
        });


    });

    $('.apiHelperCloudProductDeviceMove').each(function () {
        const thisElem = $(this);

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');
        const devOrProductSelectorElem = $(thisElem).find('.devOrProductSelector');
        const productSourceElem = $(thisElem).find('.apiHelperProductSource');
        const productDestinationElem = $(thisElem).find('.apiHelperProductDestination');
        const deviceSelectorTableElem = $(thisElem).find('.deviceSelector');
        const selectAllButton = $(thisElem).find('.apiHelperSelectAllButton');
        const selectNoneButton = $(thisElem).find('.apiHelperSelectNoneButton');
        const outputElem = $(thisElem).find('.apiHelperCloudApiOutput');

        let deviceInfo = [];

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };
        const appendOutput = function(s) {
            $(outputElem).find('> pre').append(s);
        };

        const updateDeviceSelection = function() {
            let numSelected = 0;

            if (deviceInfo) {
                for(const di of deviceInfo) {
                    if ($(di.checkbox).prop('checked')) {
                        numSelected++;
                    }
                }    
            }
            $(selectAllButton).prop('disabled', deviceInfo.length == 0 || numSelected == deviceInfo.length);
            $(selectNoneButton).prop('disabled', deviceInfo.length == 0 || numSelected == 0);
            
            $(actionButtonElem).prop('disabled', numSelected == 0);
        };

        const updateDeviceListData = function(deviceList) {
            $(deviceSelectorTableElem).find('> tbody').html('');
            deviceInfo = [];

            for(const dev of deviceList) {
                const row = document.createElement('tr');

                let col = document.createElement('td');
                let checkbox = document.createElement('input');
                $(checkbox).attr('type', 'checkbox');
                $(checkbox).on('click', updateDeviceSelection);
                col.appendChild(checkbox);
                row.appendChild(col);

                col = document.createElement('td');
                $(col).text(dev.id);
                row.appendChild(col);

                col = document.createElement('td');
                $(col).text(dev.name ? dev.name : '');
                row.appendChild(col);

                col = document.createElement('td');
                $(col).attr('style', 'text-align: center;')
                $(col).html(dev.online ? '&check;' : '&nbsp;');
                row.appendChild(col);

                $(deviceSelectorTableElem).find('> tbody').append(row);

                deviceInfo.push({
                    id: dev.id,
                    checkbox,
                    row
                });

            }
            if (deviceList.length == 0) {
                $(thisElem).find('.deviceTableAndButtons').hide();
                $(thisElem).find('.noDevices').show();
            }
            else {
                $(thisElem).find('.deviceTableAndButtons').show();
                $(thisElem).find('.noDevices').hide();
            }
            updateDeviceSelection();
        };

        const updateDeviceList = function() {
            const devOrProductVal = $(devOrProductSelectorElem).find('.devOrProduct:checked').val();

            const sourceProduct = $(productSourceElem).find('.apiHelperProductSelect').val();
            const destinationProduct = $(productDestinationElem).find('.apiHelperProductSelect').val();
            const platformId = $(productDestinationElem).data('getPlatformId')();

            if ((devOrProductVal == 'product' && !sourceProduct) || !destinationProduct) {
                $(actionButtonElem).prop('disabled', true);
                $(thisElem).find('.deviceTableAndButtons').hide();
                $(thisElem).find('.noDevices').hide();
                return;
            }
            
            if (devOrProductVal == 'dev') {
                let deviceList = [];
                apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token }).then(
                    function(data) {
                        data.body.forEach(function(dev) {
                            if (dev.platform_id == platformId && dev.product_id == platformId) {
                                deviceList.push(dev);
                            }
                        });
                        updateDeviceListData(deviceList);
                    },
                    function(err) {
                    }
                );
            }
            else {
                let deviceList = [];

                const fetchPage = function(page) {
                    apiHelper.particle.listDevices({ auth: apiHelper.auth.access_token, product:sourceProduct, page }).then(
                        function(data) {
                            data.body.devices.forEach(function(dev) {
                                if (dev.quarantined || dev.denied) {
                                    return;
                                }
                                deviceList.push(dev);
                            });
        
                            if (page < data.body.meta.total_pages) {
                                fetchPage(++page);
                            }
                            else {
                                updateDeviceListData(deviceList);
                            }
                        },
                        function(err) {            
                        }
                    );            
                }    
                fetchPage(1);
            }

        };
    
        $(selectAllButton).on('click', function() {
            for(const di of deviceInfo) {
                $(di.checkbox).prop('checked', true);
            }
            updateDeviceSelection();
        });

        $(selectNoneButton).on('click', function() {
            for(const di of deviceInfo) {
                $(di.checkbox).prop('checked', false);
            }
            updateDeviceSelection();
        });

        $(devOrProductSelectorElem).find('.devOrProduct:radio').on('click', function() {
            const selectedRadioElem = $(this);
            $(devOrProductSelectorElem).find('.devOrProduct:radio').prop('checked', false);
            $(selectedRadioElem).prop('checked', true);

            const isDev = $(selectedRadioElem).val() == 'dev';
            if (isDev) {
                $(productSourceElem).hide();
            }
            else {
                $(productSourceElem).show();
            }
            updateDeviceList();
        });

        $(productSourceElem).data('onChange', updateDeviceList);

        $(productDestinationElem).data('onChange', function() {
            const productId = $(productDestinationElem).data('getProductId')();
            const platformId = $(productDestinationElem).data('getPlatformId')();
            if (!productId || !platformId) {
                return;
            }

            $(productSourceElem).data('filterNotProductId', productId);
            $(productSourceElem).data('filterPlatformId', platformId);

            $(productSourceElem).data('updateProductList')();

            updateDeviceList();
        });

        $(actionButtonElem).on('click', async function () {
            const devOrProductVal = $(devOrProductSelectorElem).find('.devOrProduct:checked').val();

            const sourceProduct = $(productSourceElem).find('.apiHelperProductSelect').val();
            const destinationProduct = $(productDestinationElem).find('.apiHelperProductSelect').val();

            $(actionButtonElem).prop('disabled', true);

            if (!deviceInfo) {
                return;
            }
            
            let numSelected = 0;

            for(const di of deviceInfo) {
                if ($(di.checkbox).prop('checked')) {
                    numSelected++;
                }
            }    
            if (!numSelected) {
                return;
            }
            const msg = 'Are you sure you want to move ' + numSelected + ' devices into product ' + destinationProduct + '?';
            if (!confirm(msg)) {
                return;
            } 

            $(outputElem).find('> pre').html('');
            $(outputElem).show();

            appendOutput( 'Moving ' + numSelected + ' devices into product ' + destinationProduct + '\n');

            // Move devices!
            for(const di of deviceInfo) {
                if (!$(di.checkbox).prop('checked')) {
                    continue;
                }

                if (devOrProductVal == 'product') {
                    // Remove from old product
                    const res = await apiHelper.particle.removeDevice({ 
                        deviceId: di.id,
                        product: sourceProduct,
                        auth: apiHelper.auth.access_token 
                    });
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        appendOutput('Removing ' + di.id + ' from ' + sourceProduct + ' succeeded\n');
                    }
                    else {
                        appendOutput('Removing ' + di.id + ' failed (code=' + res.statusCode + ')\n');
                    }
                }


                // Add device into product
                const res = await apiHelper.particle.addDeviceToProduct({ 
                    deviceId: di.id,
                    product: destinationProduct,
                    auth: apiHelper.auth.access_token 
                });
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    appendOutput('Adding ' + di.id + ' to ' + destinationProduct + ' succeeded\n');
                }
                else {
                    appendOutput('Adding ' + di.id + ' failed (code=' + res.statusCode + ')\n');
                }
            }

            appendOutput('Done!\n');

            updateDeviceList();
        });



    });


    $('.apiHelperCloudIntegrationMove').each(function () {
        const thisElem = $(this);

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');
        const productDestinationElem = $(thisElem).find('.apiHelperProductDestination');
        const integrationTableAndButtonsElem = $(thisElem).find('.integrationTableAndButtons');
        const integrationSelectorElem = $(thisElem).find('.integrationSelector');
        const copyModeElem = $(thisElem).find('.copyMode');
        const outputElem = $(thisElem).find('.apiHelperCloudApiOutput');

        const productOrSandboxSelectorElem = $(thisElem).find('.apiHelperProductOrSandboxSelector');
        let productSelectorObj;

        let integrationList;
        let integrationListElems;
        let integrationListDest;

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };
        const appendOutput = function(s) {
            $(outputElem).find('> pre').append(s);
        };

        const updateAlreadyExists = function() {
            if (!integrationList || !integrationListDest) {
                return;
            }
            for(let ii = 0; ii < integrationList.length; ii++) {
                let found = false;
                for(const itemDest of integrationListDest) {
                    if (itemDest.event == integrationList[ii].event) {
                        found = true;
                    }
                }
                
                if (found) {
                    $(integrationListElems[ii].alreadyExistsElem).html('&check;');
                }
                else {
                    $(integrationListElems[ii].alreadyExistsElem).html('&nbsp;');                    
                }
            }
        };

        const updateIntegrationSelection = function() {

            let numSelected = 0;

            for(const item of integrationListElems) {
                if ($(item.checkboxElem).prop('checked')) {
                    numSelected++;
                }
            }    
            $(actionButtonElem).prop('disabled', (actionButtonElem == 0));
        };

        const updateIntegrationList = function() {
            let sourceProduct = {};
            productSelectorObj.getOptions(sourceProduct);

            apiHelper.particle.listIntegrations({ auth: apiHelper.auth.access_token, product: sourceProduct.productId }).then(
                function(data) {
                    integrationList = data.body;

                    integrationListElems = [];

                    $(integrationSelectorElem).find('> tbody').html('');
        
                    for(let ii = 0; ii < integrationList.length; ii++) {
                        const rowElem = document.createElement('tr');
        
                        let col = document.createElement('td');
                        let checkboxElem = document.createElement('input');
                        $(checkboxElem).attr('type', 'checkbox');
                        $(checkboxElem).on('click', updateIntegrationSelection);
                        col.appendChild(checkboxElem);
                        rowElem.appendChild(col);
        
                        col = document.createElement('td');
                        $(col).text(integrationList[ii].event);
                        rowElem.appendChild(col);
        
                        col = document.createElement('td');
                        $(col).text(integrationList[ii].integration_type);
                        rowElem.appendChild(col);

                        col = document.createElement('td');
                        $(col).attr('style', 'text-align: center;');
                        $(col).html(integrationList[ii].disabled ? '&check;' : '&nbsp;');
                        rowElem.appendChild(col);

                        const alreadyExistsElem = document.createElement('td');
                        $(alreadyExistsElem).attr('style', 'text-align: center;');
                        rowElem.appendChild(alreadyExistsElem);

                        $(integrationSelectorElem).find('> tbody').append(rowElem);
        
                        integrationListElems.push({
                            alreadyExistsElem,
                            checkboxElem,
                            rowElem
                        });   
                    }
                    if (integrationList.length == 0) {
                        setStatus('No integrations in source');
                        $(integrationTableAndButtonsElem).hide();
                    }
                    else {
                        $(integrationTableAndButtonsElem).show();
                    } 
                    updateAlreadyExists();
                },
                function(err) {

                }
            );


        };
    
        const requestDestIntegrationList = function() {
            const productId = $(productDestinationElem).data('getProductId')();
            if (!productId) {
                return;
            }

            apiHelper.particle.listIntegrations({ auth: apiHelper.auth.access_token, product: productId }).then(
                function(data) {
                    integrationListDest = data.body;

                    updateAlreadyExists();
                },
                function(err) {
                }
            );   
        };

        // This is triggered by the product selector when the product list changes
        $(thisElem).on('updateProductList', async function(event, options) {
            productSelectorObj = $(productOrSandboxSelectorElem).data('productSelector');
            console.log('productSelectorObj', productSelectorObj);

            updateIntegrationList();
        });

        $(productDestinationElem).data('onChange', requestDestIntegrationList);

        $(actionButtonElem).on('click', async function () {
            const destinationProduct = $(productDestinationElem).find('.apiHelperProductSelect').val();

            $(actionButtonElem).prop('disabled', true);

            const copyMode = $(copyModeElem).val();

            if (!integrationList) {
                return;
            }

            let sourceProduct = {};
            productSelectorObj.getOptions(sourceProduct);

            if (sourceProduct.productId == destinationProduct) {
                alert('Source and destination products cannot be the same');
                return;
            }


            const keysToSkip = [
                'created_at',
                'disabled',
                'errors',
                'id',
                'logs'
            ];

            let numSelected = 0;

            for(let ii = 0; ii < integrationListElems.length; ii++) {
                if (!$(integrationListElems[ii].checkboxElem).prop('checked')) {
                    numSelected++;
                }
            }    
            if (numSelected == 0) {
                return;
            }

            const msg = 'Are you sure you want to copy ' + numSelected + ' integrations into product ' + destinationProduct + '?';

            if (!confirm(msg)) {
                return;
            } 

            $(outputElem).find('> pre').html('');
            $(outputElem).show();

            for(let ii = 0; ii < integrationListElems.length; ii++) {
                if (!$(integrationListElems[ii].checkboxElem).prop('checked')) {
                    continue;
                }

                try {
                    // Copy this integration
                    const integrationId = integrationList[ii].id;

                    let toAdd = {};

                    for(const key in integrationList[ii]) {
                        if (!keysToSkip.includes(key)) {
                            const value = integrationList[ii][key];
                            toAdd[key] = value;
                        }
                    }

                    if (copyMode == 'disableDest') {
                        toAdd.disabled = true;
                    }


                    // Create copy
                    let newIntegrationId;

                    await new Promise(function(resolve, reject) {
                        const request = {
                            dataType: 'json',
                            data: JSON.stringify(toAdd),
                            error: function (jqXHR) {
                                reject();
                            },
                            headers: {
                                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            success: function (resp, textStatus, jqXHR) {
                                resolve();
                                newIntegrationId = resp.id;
                            },
                            url: 'https://api.particle.io/v1/products/' + destinationProduct + '/integrations'
                        }
            
                        $.ajax(request);
                    });

                    appendOutput('Copied ' + integrationList[ii].event + '\n');
                    
                    let sourceUrlBase;
                    if (sourceProduct.productId) {
                        sourceUrlBase = 'https://api.particle.io/v1/products/' + sourceProduct.productId + '/integrations/' + integrationId
                    }
                    else {
                        sourceUrlBase = 'https://api.particle.io/v1/integrations/' + integrationId;
                    }


                    // Disable in destination (this does not work if you set it during creation)
                    if (copyMode == 'disableDest') {
                        toAdd.disabled = true;

                        await new Promise(function(resolve, reject) {
                            const request = {
                                dataType: 'json',
                                data: JSON.stringify(toAdd),
                                error: function (jqXHR) {
                                    reject();
                                },
                                headers: {
                                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                method: 'PUT',
                                success: function (resp, textStatus, jqXHR) {
                                    resolve();
                                },
                                url: 'https://api.particle.io/v1/products/' + destinationProduct + '/integrations/' + newIntegrationId
                            }
                
                            $.ajax(request);
                        });

                        appendOutput('Disabled ' + integrationList[ii].event + ' in destination\n');
                    }

                    // Modify original
                    if (copyMode == 'disableSource' && !integrationList[ii].disabled) {
                        toAdd.disabled = true;

                        await new Promise(function(resolve, reject) {
                            const request = {
                                dataType: 'json',
                                data: JSON.stringify(toAdd),
                                error: function (jqXHR) {
                                    reject();
                                },
                                headers: {
                                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                method: 'PUT',
                                success: function (resp, textStatus, jqXHR) {
                                    resolve();
                                },
                                url: sourceUrlBase
                            }
                
                            $.ajax(request);
                        });

                        appendOutput('Disabled ' + integrationList[ii].event + ' in source\n');
                    }
                    else
                    if (copyMode == 'deleteSource') {
                        await new Promise(function(resolve, reject) {
                            const request = {
                                dataType: 'json',
                                error: function (jqXHR) {
                                    reject();
                                },
                                headers: {
                                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                    'Accept': 'application/json',
                                },
                                method: 'DELETE',
                                success: function (resp, textStatus, jqXHR) {
                                    resolve();
                                },
                                url: sourceUrlBase
                            }
                
                            $.ajax(request);
                        });
                        appendOutput('Deleted ' + integrationList[ii].event + ' from source\n');
                    }
                }
                catch(e) {
                    appendOutput('Failed to copy ' + integrationList[ii].event + '\n');
                }

            }

            appendOutput('Done!\n');
            $(actionButtonElem).prop('disabled', false);

            updateIntegrationList();
            requestDestIntegrationList();
        });

        // updateIntegrationList();

    });

    $('.apiHelperCloudApiUserCreate,.apiHelperCloudApiUserList').each(function () {
        const thisElem = $(this);

        const isCreate = $(thisElem).hasClass('apiHelperCloudApiUserCreate');
        const isList = $(thisElem).hasClass('apiHelperCloudApiUserList');

        const productSelectElem = $(thisElem).find('.apiHelperProductSelect');
        const orgSelectElem = $(thisElem).find('.apiHelperOrgSelect');
        const friendlyNameElem = isCreate ? $(thisElem).find('.apiHelperFriendlyName') : undefined;
        const actionButtonElem = $(thisElem).find('.apiHelperActionButton,.apiHelperDeleteButton');

        let curScopes = [];

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const showHideRows = function() {
            const prodOrgVal = $(thisElem).find('.prodOrg:checked').val();
            const sandboxOrgVal = $(thisElem).find('.sandboxOrg:checked').val();

            if (prodOrgVal == 'prod') {
                $(thisElem).find('.productSelectorRow').show();
                $(thisElem).find('.sandboxOrgRow').show();

                if (sandboxOrgVal == 'sandbox') {
                    $(thisElem).find('.orgSelectorRow').hide();
                }
                else {
                    // sandboxOrg == 'org'
                    $(thisElem).find('.orgSelectorRow').show();
                }
            }
            else {
                // prodOrg == 'org'
                $(thisElem).find('.productSelectorRow').hide();
                $(thisElem).find('.sandboxOrgRow').hide();
                $(thisElem).find('.orgSelectorRow').show();

                setStatus('');
                enableButton();
            }

        };

        const updateProductList = async function() {
            showHideRows();

            const sandboxOrgVal = $(thisElem).find('.sandboxOrg:checked').val();

            let productsData;
            if (sandboxOrgVal == 'sandbox') {
                productsData = await apiHelper.getProducts();
            }
            else {
                const orgId = $(orgSelectElem).val();
                if (!orgId) {
                    return;
                }
                productsData = await apiHelper.getOrgProducts(orgId);
            }
            productsData.products.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

            if (productsData.products.length > 0) {
                let html = '';
                for (let product of productsData.products) {
                    html += '<option value="' + product.id + '">' + product.name + ' (' + product.id + ')</option>';
                }
                $(productSelectElem).html(html);

                enableButton();
            }
            else {
                setStatus('You do not have access to any products');
                $(thisElem).find('.apiHelperActionButton').prop('disabled', true);
            }
        };


        const enableButton = function() {
            const prodOrgVal = $(thisElem).find('.prodOrg:checked').val();
            const productId = $(productSelectElem).val();

            if (isCreate) {
                curScopes = [];

                $(thisElem).find('.scopeCheckbox:checked').each(function() {
                    curScopes.push($(this).val());
                });    

                const friendlyName = $(friendlyNameElem).val();

                const prodOrgVal = $(thisElem).find('.prodOrg:checked').val();
                const isOrgUser = (prodOrgVal == 'org');

                if (curScopes.length > 0 && friendlyName.length > 0 && (productId || isOrgUser)) {
                    $(actionButtonElem).prop('disabled', false);
                }
                else {
                    $(actionButtonElem).prop('disabled', true);
                }
            }

            if (isList) {
                if (prodOrgVal == 'prod') {
                    if (productId) {
                        $(actionButtonElem).prop('disabled', false);
                    }
                    else {
                        $(actionButtonElem).prop('disabled', true);
                    }
                }
                else {
                    //const orgId = $(orgSelectElem).val();
                    $(actionButtonElem).prop('disabled', false);
                }
            }

        };

        $(actionButtonElem).on('click', async function () {
            const isDelete = $(this).hasClass('apiHelperDeleteButton');

            const prodOrgVal = $(thisElem).find('.prodOrg:checked').val();
            const productId = $(productSelectElem).val();
            const orgId = $(orgSelectElem).val();
            let gaCategory;
            
            let url;

            if (prodOrgVal == 'prod') {
                url = 'https://api.particle.io/v1/products/' + productId + '/team';
            }
            else {
                // prodOrgVal == 'org'
                url = 'https://api.particle.io/v1/orgs/' + orgId + '/team';                
            }

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    if (isList && !isDelete) {
                        // Update programmatic user for delete

                        const users = resp.team.filter(obj => obj.is_programmatic);
                        if (users.length) {
                            for(const user of users) {
                                let optionElem = document.createElement('option');
                                $(optionElem).prop('value', user.username);
                                $(optionElem).text(user.username);
                                $(thisElem).find('.apiHelperUserSelect').append(optionElem);
                            }
                            $(thisElem).find('.apiHelperDeleteButton').prop('disabled', false);
                            $(thisElem).find('.deleteUserRow').show();
                        }
                    }

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: url
            }


            if (isCreate) {
                gaCategory = 'Create API User';

                let reqData = {
                    friendly_name: $(friendlyNameElem).val(),
                    scopes: curScopes
                };

                request.contentType = 'application/json';
                request.data = JSON.stringify(reqData);
                request.method = 'POST';
            }

            if (isList && !isDelete) {
                gaCategory = 'List API User';
                request.method = 'GET';       
            }
            
            if (isDelete) {
                request.method = 'DELETE';
                request.url += '/' + $(thisElem).find('.apiHelperUserSelect').val();
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();
            
            $(thisElem).find('.deleteUserRow').hide();

            if (isList) {
                $(thisElem).find('.apiHelperUserSelect').html('');
                $(thisElem).find('.apiHelperDeleteButton').prop('disabled', true);
            }


            $.ajax(request);


        });


        $(thisElem).find('.prodOrg:radio').on('click', function() {
            const selectedRadioElem = $(this);
            $(thisElem).find('.prodOrg:radio').prop('checked', false);
            $(selectedRadioElem).prop('checked', true);

            showHideRows();
        });

        $(thisElem).find('.sandboxOrg:radio').on('click', function() {
            const selectedRadioElem = $(this);
            $(thisElem).find('.sandboxOrg:radio').prop('checked', false);
            $(selectedRadioElem).prop('checked', true);

            updateProductList();
        });

        $(orgSelectElem).on('change', updateProductList);

        $(friendlyNameElem).on('input', enableButton);

        updateProductList();

        apiHelper.getOrgs().then(function (orgsData) {
            // No orgs: orgsData.organizations empty array
            // Object in array orgsData.organizations: id, slug, name

            if (orgsData.organizations.length > 0) {
                let html = '';
                for (let org of orgsData.organizations) {
                    html += '<option value="' + org.id + '">' + org.name + '</option>';
                }
                $(thisElem).find('.apiHelperOrgSelect').html(html);

                updateProductList();
            }
            else {
                // No orgs
                $(thisElem).find('input[value=org]:radio').prop('disabled', true);
                $(thisElem).find('.orgSelectorRow').hide();
                $(thisElem).find('.sandboxOrgRow').hide();
            }
        });

        if (isCreate) {
            fetch('/assets/files/userScopes.json')
            .then(response => response.json())
            .then(function(userScopes) {
                const maxCols = 2;
                let col = 0;
                for(const scope of userScopes) {
                    let labelElem = document.createElement('label');
    
                    let inputElem = document.createElement('input');
                    $(inputElem).prop('type', 'checkbox');                            
                    $(inputElem).prop('value', scope);
                    $(inputElem).prop('class', 'scopeCheckbox');
                    $(labelElem).append(inputElem);
                    
                    $(labelElem).append(scope);
    
                    $(labelElem).on('click', enableButton);
    
                    $(thisElem).find('.scopesCell' + col).append(labelElem);
                    $(thisElem).find('.scopesCell' + col).append(document.createElement('br'));
    
                    col++;
                    if (col >= maxCols) {
                        col = 0;
                    }
                }
            });    
        }

        if (isList) {
            enableButton();
        }

    });

    $('.apiHelperCloudApiServiceAgreements').each(function() {
        const thisElem = $(this);
        const gaCategory = 'GetServiceAgreements';

        const sandboxOrgSelectElem = $(thisElem).find('.apiHelperSandboxOrgSelect');
        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');
        const requestElem = $(thisElem).find('.apiHelperApiRequest');
        const respElem = $(thisElem).find('.apiHelperApiResponse');
        const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const getUrl = function(which) {
            let url;

            const orgId = $(sandboxOrgSelectElem).val();
            if (orgId == 0) {
                // Sandbox
                url = 'https://api.particle.io/v1/user/' + which;
            }
            else {
                // Organization
                url = 'https://api.particle.io/v1/orgs/' + orgId + '/' + which;
            }
            return url;
        }      
                $(sandboxOrgSelectElem).on('change', function() {
            // Copy this value to all sandbox org selects
            const val = $(sandboxOrgSelectElem).val();
            $('.apiHelperSandboxOrgSelect').val(val);
        })

        $(actionButtonElem).on('click', function() {
            let request = {
                contentType: 'application/json',
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error getting billing period');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();

                    const serviceAgreementNotifications = $('.apiHelperCloudApiServiceAgreementNotifications').data('serviceAgreementNotifications');
                    serviceAgreementNotifications.setParams({
                        orgId: $(sandboxOrgSelectElem).val(),
                        resp,
                    });
                    serviceAgreementNotifications.show();
                    
                },
                url: getUrl('service_agreements')
            }

            setRequest(thisElem, request);

            $(respElem).find('pre').text('');

            $(outputJsonElem).hide();

            $.ajax(request);
        });


        if (apiHelper && apiHelper.auth && apiHelper.auth.access_token) {
            apiHelper.getOrgs().then(function(orgsData) {
                // No orgs: orgsData.organizations empty array
                // Object in array orgsData.organizations: id, slug, name
    
                if (orgsData.organizations.length > 0) {
                    let html = '';
                    for (let org of orgsData.organizations) {
                        const optionElem = document.createElement('option');
                        $(optionElem).attr('value', org.id);
                        $(optionElem).text(org.name);
                        $(sandboxOrgSelectElem).append(optionElem);
                    }
                }
                else {
                    //$(sandboxOrgRowElem).hide();
                }
            });
        }
  

    });

    $('.apiHelperCloudApiServiceAgreementNotifications').each(function() {
        const thisElem = $(this);
        const gaCategory = 'GetServiceAgreementNotifications';

        const agreementSelectElem = $(thisElem).find('.apiHelperAgreementSelect');
        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');
        const requestElem = $(thisElem).find('.apiHelperApiRequest');
        const respElem = $(thisElem).find('.apiHelperApiResponse');
        const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');

        let serviceAgreementNotifications = {
            // orgId
        };
        $(thisElem).data('serviceAgreementNotifications', serviceAgreementNotifications);

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const getUrl = function() {
            let url;

            if (serviceAgreementNotifications.params.orgId == 0) {
                // Sandbox
                url = 'https://api.particle.io/v1/user/service_agreements/' + $(agreementSelectElem).val() + '/notifications';
            }
            else {
                // Organization
                url = 'https://api.particle.io/v1/orgs/' + serviceAgreementNotifications.params.orgId + '/service_agreements/' + $(agreementSelectElem).val() + '/notifications';
            }
            return url;
        }      
    
        $(actionButtonElem).on('click', function() {
            let request = {
                contentType: 'application/json',
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error getting service agreement notifications');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: getUrl()
            }

            setRequest(thisElem, request);

            $(respElem).find('pre').text('');

            $(outputJsonElem).hide();

            $.ajax(request);
        });        
        serviceAgreementNotifications.setParams = function(params) {
            serviceAgreementNotifications.params = params;

            $(agreementSelectElem).empty();
            for(const dataObj of params.resp.data) {
                if (dataObj.type == 'service_agreement') {
                    const optionElem = document.createElement('option');
                    $(optionElem).attr('value', dataObj.id.toString());
                    $(optionElem).text(dataObj.id.toString());
                    $(agreementSelectElem).append(optionElem);                    
                }
            }
        };

        serviceAgreementNotifications.show = function() {

            $(thisElem).show();
        }
    });

    $('.apiHelperCloudApiDataOperationsReport').each(function() {
        const thisElem = $(this);
        const gaCategoryReport = 'GetDataOperationsReport';
        const gaCategoryCheck = 'GetDataOperationsCheck';
        const gaCategoryStatus = 'GetDataOperationsStatus';
        const gaCategoryDownload = 'GetDataOperationsDownload';

        // const sandboxOrgRowElem = $(thisElem).find('.sandboxOrgRow');
        const sandboxOrgSelectElem = $(thisElem).find('.apiHelperSandboxOrgSelect');
        const checkAgreementButtonElem = $(thisElem).find('.checkAgreementButton');
        const agreementSelectElem = $(thisElem).find('.agreementSelect');
        const startDateElem = $(thisElem).find('.startDate');
        const endDateElem = $(thisElem).find('.endDate');
        const requestReportButtonElem = $(thisElem).find('.apiHelperActionButton');
        const reportIdInputElem = $(thisElem).find('.reportIdInput');
        const checkStatusButtonElem = $(thisElem).find('.checkStatusButton');
        const downloadReportButtonElem = $(thisElem).find('.downloadReportButton');
        const requestElem = $(thisElem).find('.apiHelperApiRequest');
        const respElem = $(thisElem).find('.apiHelperApiResponse');
        const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');

        let downloadReportUrl;
        
        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const getUrl = function(which) {
            let url;

            const orgId = $(sandboxOrgSelectElem).val();
            if (orgId == 0) {
                // Sandbox
                url = 'https://api.particle.io/v1/user/' + which;
            }
            else {
                // Organization
                url = 'https://api.particle.io/v1/orgs/' + orgId + '/' + which;
            }
            return url;
        }

        const enableButtons = function() {
            if ($(agreementSelectElem).val()) {
                $(requestReportButtonElem).prop('disabled', false);
            }
            else {
                $(requestReportButtonElem).prop('disabled', true);
            }

            if ($(reportIdInputElem).val()) {
                $(checkStatusButtonElem).prop('disabled', false);
            }
            else {
                $(checkStatusButtonElem).prop('disabled', true);
            }

            if (downloadReportUrl) {
                $(downloadReportButtonElem).prop('disabled', false);
            }
            else {
                $(downloadReportButtonElem).prop('disabled', true);
            }
        };

        $(sandboxOrgSelectElem).on('change', function() {
            // Copy this value to all sandbox org selects
            const val = $(sandboxOrgSelectElem).val();
            $('.apiHelperSandboxOrgSelect').val(val);
        })

        $(reportIdInputElem).on('change', enableButtons);

        $(checkAgreementButtonElem).on('click', function() {
            let request = {
                contentType: 'application/json',
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategoryCheck, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error getting billing period');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategoryCheck});

                    $(agreementSelectElem).html('');

                    if (resp.data && resp.data.length > 0) {
                        const attr = resp.data[0].attributes;      

                        $(startDateElem).val(attr.current_billing_period_start);
                        $(endDateElem).val(attr.current_billing_period_end);

                        for(const agreement of resp.data) {
                            const optionElem = document.createElement('option');
                            $(optionElem).attr('value', agreement.id);
                            $(optionElem).text(agreement.id);
                            $(agreementSelectElem).append(optionElem);
                        }

                        $(requestReportButtonElem).prop('disabled', false);
                    }

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: getUrl('service_agreements')
            }

            setRequest(thisElem, request);

            $(respElem).find('pre').text('');

            $(outputJsonElem).hide();

            $.ajax(request);
        });

        $(requestReportButtonElem).on('click', function() {
            let requestData = {
                'report_type': 'devices',
                'date_period_start': $(startDateElem).val(),
                'date_period_end': $(endDateElem).val()
            };

            let request = {
                contentType: 'application/json',
                data: JSON.stringify(requestData),
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategoryReport, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error getting data operations report');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategoryReport});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(reportIdInputElem).val(resp.data.id);
                    enableButtons();

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: getUrl('service_agreements') + '/' + $(agreementSelectElem).val() + '/usage_reports'
            }

            setRequest(thisElem, request);

            $(respElem).find('pre').text('');

            $(outputJsonElem).hide();

            $.ajax(request);
        });


        $(checkStatusButtonElem).on('click', function() {
            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategoryStatus, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error getting report status');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategoryStatus});

                    $(outputJsonElem).show();
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    if (resp.data.attributes.state == 'available') {
                        downloadReportUrl = resp.data.attributes.download_url;
                    }
                    enableButtons();

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: getUrl('usage_reports') + '/' + $(reportIdInputElem).val()
            }

            setRequest(thisElem, request);

            $(respElem).find('pre').text('');

            $(outputJsonElem).hide();

            $.ajax(request);
        });

        $(downloadReportButtonElem).on('click', function() {
            setStatus('Opened download URL in browser');
            analytics.track('Success', {category:gaCategoryDownload});

            $(requestElem).hide();
            $(respElem).hide();
            $(outputJsonElem).hide();

            location.href = downloadReportUrl;
        });

        if (apiHelper && apiHelper.auth && apiHelper.auth.access_token) {
            apiHelper.getOrgs().then(function(orgsData) {
                // No orgs: orgsData.organizations empty array
                // Object in array orgsData.organizations: id, slug, name
    
                if (orgsData.organizations.length > 0) {
                    let html = '';
                    for (let org of orgsData.organizations) {
                        const optionElem = document.createElement('option');
                        $(optionElem).attr('value', org.id);
                        $(optionElem).text(org.name);
                        $(sandboxOrgSelectElem).append(optionElem);
                    }
                }
                else {
                    //$(sandboxOrgRowElem).hide();
                }
            });
        }
        else {
            $(thisElem).find('.logInRequired').show();
            $(thisElem).find('table').hide();
        }

        {
            let d = new Date();

            const twoDigit = function(x) {
                if (x < 10) {
                    return '0' + x.toString();
                }
                else {
                    return x.toString();
                }
            }

            $(startDateElem).val(d.getFullYear() + '-' + twoDigit(d.getMonth() + 1) + '-' + twoDigit(1));
            $(endDateElem).val(d.getFullYear() + '-' + twoDigit(d.getMonth() + 1) + '-' + twoDigit(d.getDate()));
        }
    });

    $('.apiHelperSandboxOrOrg').each(function() {
        const thisElem = $(this);
        const sandboxOrgSelectElem = $(thisElem).find('.apiHelperSandboxOrgSelect');

        $(sandboxOrgSelectElem).on('change', function() {
            // Copy this value to all sandbox org selects
            const val = $(sandboxOrgSelectElem).val();
            $('.apiHelperSandboxOrgSelect').val(val);
        })

        if (apiHelper && apiHelper.auth && apiHelper.auth.access_token) {
            apiHelper.getOrgs().then(function(orgsData) {
                // No orgs: orgsData.organizations empty array
                // Object in array orgsData.organizations: id, slug, name
    
                if (orgsData.organizations.length > 0) {
                    let html = '';
                    for (let org of orgsData.organizations) {
                        const optionElem = document.createElement('option');
                        $(optionElem).attr('value', org.id);
                        $(optionElem).text(org.name);
                        $(sandboxOrgSelectElem).append(optionElem);
                    }
                }
                else {
                    //$(sandboxOrgRowElem).hide();
                }
            });
        }

    });


    $('.apiHelperCurl').each(function() {
        const thisElem = $(this);   
        const commandElem = $(thisElem).find('pre');
        const executeCommandElem = $(thisElem).find('.executeCommand');
        const copyCommandButtonElem = $(thisElem).find('.copyCommand');
        const respElem = $(thisElem).find('.apiHelperApiResponse');

        const updateCommand = function() {
            let options = $(thisElem).data('options');
            if (!options) {
                return;
            }
            if (!options.method) {
                options.method = 'GET';
            }
            if (!options.dataType) {
                options.dataType = 'json';
            }
            if (!options.headers) {
                options.headers = {};
            }
            if (!options.noToken) {
                options.headers['Authorization'] = 'Bearer ' + apiHelper.auth.access_token;
            }
            if (!options.noAccept) {
                options.headers['Accept'] = 'application/json';
            }
            if (options.postPutData && options.contentType) {
                options.headers['Content-Type'] = options.contentType;
            }

            if (options.updateCommandCallback) {
                options.updateCommandCallback(options);
            }

            options.command = 'curl -X ' + options.method + ' ';

            options.command += '\'' + options.url + '\' '

            // Add headers (-H)
            for(const key in options.headers) {
                options.command += '-H \'' + key + ': ' + options.headers[key] + '\' ';
            }

            if (options.postPutData) {
                if (typeof options.postPutData === 'string')  {
                    options.postPutString = options.postPutData;
                }               
                else {
                    options.postPutString = JSON.stringify(options.postPutData);
                }
                // TODO: Escape single quotes here for curl command only (leave options.postString unescaped)
                let escapedStr = options.postPutString;
                options.command += '-d \'' + escapedStr + '\' ';
            }

            $(commandElem).text(options.command);
            $(respElem).find('pre').text('');
        };
        $(thisElem).on('updateCommand', updateCommand);

        $(executeCommandElem).on('click', function() {
            let options = $(thisElem).data('options');
            if (!options) {
                return;
            }

            let request = {
                dataType: options.dataType,
                error: function (jqXHR) {
                    const err = (jqXHR.responseJSON ? jqXHR.responseJSON.error : '');
                    if (options.gaCategory) {
                        analytics.track('Error', {category:options.gaCategory, label:err});
                    }

                    if (options.setStatus) {
                        options.setStatus('Error: ' + err);
                    }
        
                    if (options.errorCallback) {
                        options.errorCallback(jqXHR);
                    }
                },
                headers: options.headers,
                method: options.method,
                success: function (resp, textStatus, jqXHR) {
                    //setStatus('');
                    if (options.gaCategory) {
                        analytics.track('Success', {category:options.gaCategory});
                    }

                    console.log('success', resp);

                    if (options.dataType == 'json') {
                        $(respElem).find('pre').text(JSON.stringify(resp));

                    }
                    else {
                        $(respElem).find('pre').text(resp);
                    }
                    $(respElem).show();

                    if (options.responseCallback) {
                        options.responseCallback(resp);
                    }
        
                },
                url: options.url
            }
            if (options.postPutData && options.contentType) {
                request.contentType = options.contentType;
            }
            if (options.postPutString) {
                request.data = options.postPutString;
            }

            if (options.requestCallback) {
                options.requestCallback(request);
            }

            $(respElem).find('pre').text('');
            $(respElem).show();
            $.ajax(request);
        });

        $(copyCommandButtonElem).on('click', function() {
			var t = document.createElement('textarea');
			document.body.appendChild(t);
			$(t).text($(commandElem).text());
			t.select();
			document.execCommand("copy");
			document.body.removeChild(t);
        });

    });


    $('.apiHelperServiceAgreementsCurl').each(function() {
        const thisElem = $(this);

        let setStatus = function(s) {
            $(thisElem).find('.statusDiv').text(s);
        }

        let options = {
            gaCategory: 'ServiceAgreementsCurl',
            updateCommandCallback: function(options) {
                const orgId = $('.apiHelperSandboxOrgSelect').val();

                if (orgId == 0) {
                    options.url = 'https://api.particle.io/v1/user/service_agreements/';
                }
                else {
                    options.url = 'https://api.particle.io/v1/orgs/' + orgId + '/service_agreements/';
                }
            },
            responseCallback: function(resp) {
                if (resp.data && resp.data.length > 0) {
                    const attr = resp.data[0].attributes;      

                    $('.apiHelperDataReportDates').find('.startDate').val(attr.current_billing_period_start);
                    $('.apiHelperDataReportDates').find('.endDate').val(attr.current_billing_period_end);

                    $('.apiHelperServiceAgreementIdInput').val(resp.data[0].id);

                    $('.apiHelperDataReportRequestCurl').trigger('updateCommand');
                }
            },
            setStatus
        };
        $(thisElem).data('options', options);
        $(thisElem).trigger('updateCommand');

        $('.apiHelperSandboxOrgSelect').on('change', function() {
            $(thisElem).trigger('updateCommand');
        });
    });

    $('.apiHelperServiceAgreementId').each(function() {
        const thisElem = $(this);

        const idInputElem = $(thisElem).find('.apiHelperServiceAgreementIdInput');
        $(idInputElem).on('input', function() {
            $('.apiHelperDataReportRequestCurl').trigger('updateCommand');
        });

    });

    $('.apiHelperDataReportDates').each(function() {
        const thisElem = $(this);

        const startDateElem = $(thisElem).find('.startDate');
        const endDateElem = $(thisElem).find('.endDate');

        const updateField = function() {
            $('.apiHelperDataReportRequestCurl').trigger('updateCommand');
        }

        $(startDateElem).on('input', updateField);
        $(endDateElem).on('input', updateField);

        {
            let d = new Date();

            const twoDigit = function(x) {
                if (x < 10) {
                    return '0' + x.toString();
                }
                else {
                    return x.toString();
                }
            }

            $(startDateElem).val(d.getFullYear() + '-' + twoDigit(d.getMonth() + 1) + '-' + twoDigit(1));
            $(endDateElem).val(d.getFullYear() + '-' + twoDigit(d.getMonth() + 1) + '-' + twoDigit(d.getDate()));
        } 
    });

    $('.apiHelperDataReportRequestCurl').each(function() {
        const thisElem = $(this);   

        let setStatus = function(s) {
            $(thisElem).find('.statusDiv').text(s);
        }

        let options = {
            gaCategory: 'ReportRequestCurl',
            method: 'POST',
            contentType: 'application/json',
            updateCommandCallback: function(options) {
                const orgId = $('.apiHelperSandboxOrgSelect').val();
                const agreementId = $('.apiHelperServiceAgreementIdInput').val();
                const startDate = $('.apiHelperDataReportDates').find('.startDate').val();
                const endDate = $('.apiHelperDataReportDates').find('.endDate').val();
    
                if (orgId == 0) {
                    options.url = 'https://api.particle.io/v1/user/service_agreements/';
                }
                else {
                    options.url = 'https://api.particle.io/v1/orgs/' + orgId + '/service_agreements/';
                }
                options.postPutData = {
                    'report_type': 'devices',
                    'date_period_start': startDate,
                    'date_period_end': endDate
                }
                options.url += agreementId + '/usage_reports'

                if (!agreementId && startDate && endDate) {
                    setStatus('Missing required parameters');
                    $(thisElem).find('.executeCommand').prop('disabled', true);
                }
                else {
                    setStatus('');
                    $(thisElem).find('.executeCommand').prop('disabled', false);
                }

            },
            responseCallback: function(resp) {
                // resp.data.id
                $('.apiHelperDataReportStatusCurl').find('.reportId').val(resp.data.id);
                $('.apiHelperDataReportStatusCurl').trigger('updateCommand');
            },
            setStatus
        };
        $(thisElem).data('options', options);
        $(thisElem).trigger('updateCommand');

        $('.apiHelperSandboxOrgSelect').on('change', function() {
            $(thisElem).trigger('updateCommand');
        });

    });

    $('.apiHelperDataReportStatusCurl').each(function() {
        const thisElem = $(this);   
        
        const reportIdElem = $(this).find('.reportId');

        let setStatus = function(s) {
            $(thisElem).find('.statusDiv').text(s);
        }

        let options = {
            gaCategory: 'ReportStatusCurl',
            method: 'GET',
            updateCommandCallback: function(options) {
                const orgId = $('.apiHelperSandboxOrgSelect').val();
                const reportId = $(reportIdElem).val();
    
                if (orgId == 0) {
                    options.url = 'https://api.particle.io/v1/user/usage_reports';
                }
                else {
                    options.url = 'https://api.particle.io/v1/orgs/' + orgId + '/usage_reports';
                }
                
                options.url += '/' + reportId;

                if (!reportId) {
                    setStatus('Report ID is required');
                }
                else {
                    setStatus('');
                }
                $(thisElem).find('.executeCommand').prop('disabled', !reportId);
            },
            responseCallback: function(resp) {
                // resp.data.id
                // resp.data.attributes.available == 'available'
                // resp.data.attributes.download_url
                console.log('attributes', resp.data.attributes);
                if (resp.data.attributes.download_url) {
                    $('.apiHelperDataReportDownloadCurl').find('.downloadUrl').val(resp.data.attributes.download_url);
                    $('.apiHelperDataReportDownloadCurl').trigger('updateCommand');
                }
            },
            setStatus,
        };
        $(thisElem).data('options', options);
        $(thisElem).trigger('updateCommand');

        $(reportIdElem).on('input', function() {
            $(thisElem).trigger('updateCommand');
        });
        $('.apiHelperSandboxOrgSelect').on('change', function() {
            $(thisElem).trigger('updateCommand');
        });

    });    

    $('.apiHelperDataReportDownloadCurl').each(function() {
        const thisElem = $(this);   

        const downloadUrlElem = $(thisElem).find('.downloadUrl');
        const downloadCommandElem = $(thisElem).find('.downloadCommand');
        
        let setStatus = function(s) {
            $(thisElem).find('.statusDiv').text(s);
        }

        let options = {
            gaCategory: 'ReportDownloadCurl',
            method: 'GET',
            dataType: 'text',
            noAccept: true,
            headers: {
                'Accept': 'text/csv'
            },
            updateCommandCallback: function(options) {
                options.url = $(downloadUrlElem).val();

                if (!options.url) {
                    setStatus('Download URL is required');
                }
                else {
                    setStatus('');
                }
                $(thisElem).find('.executeCommand').prop('disabled', !options.url);
                $(thisElem).find('.downloadCommand').prop('disabled', !options.url);

            },
            responseCallback: function(resp) {
                console.log('resp', resp);
            },
            setStatus
        };

        $(thisElem).data('options', options);
        $(thisElem).trigger('updateCommand');

        $(downloadUrlElem).on('input', function() {
            $(thisElem).trigger('updateCommand');
        });

        $(downloadCommandElem).on('click', function() {
            const url = $(downloadUrlElem).val();
            if (url) {
                location.href = url;
            }
        });


    });    

    $('.apiHelperProjectBrowser').each(function() {
        const thisElem = $(this);   
        
        const project = $(thisElem).data('project');
        if (project == 'node-data-report') {
            let params = {     
                preloadZip: true,
                stackblitzProject: {
                    description: 'sample script for downloading a data operations usage report',
                },
                stackblitzOptions: {
                    openFile: 'app.js',
                },
                updateConfig: function() {
                    let newConfigObject = {};

                    const orgId = $('.apiHelperSandboxOrgSelect').val();
                    if (orgId != 0) {
                        newConfigObject.orgId = orgId;
                    }

                    return newConfigObject;
                }
            };
    
            $(thisElem).data('params', params);
            $(thisElem).trigger('updateProject');

            $('.apiHelperSandboxOrgSelect').on('change', function() {
                $(thisElem).trigger('updateProject');                
            });
        }

    });


    loadSettings();

});


