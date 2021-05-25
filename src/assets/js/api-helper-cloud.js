
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

    apiHelper.deviceList($('.apiHelperCloudDeviceSelect'), {
        getTitle: function (dev) {
            return dev.name + ' (' + dev.id + ')' + (dev.online ? '' : ' (offline)');
        },
        hasRefresh: true,
        onChange: function (elem) {
            const deviceId = $(elem).val();

            const thisPartial = $(elem).closest('div.apiHelperDeviceVariable');

        }
    });

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
                        ga('send', 'event', simpleGetConfig.gaAction, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));
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
                        ga('send', 'event', simpleGetConfig.gaAction, 'Success');
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
                    ga('send', 'event', 'Get Variable', 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

                    setStatus('Error retrieving variable');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    ga('send', 'event', 'Get Variable', 'Success');

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
                    ga('send', 'event', 'Call function', 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

                    setStatus('Error calling function');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    ga('send', 'event', 'Call Function', 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', 'List Product Devices', 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', 'List Product Devices', 'Success');

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
                    ga('send', 'event', 'List Org Products', 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', 'List Org Products', 'Success');

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
                    ga('send', 'event', 'Create Token', 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', 'Create Token', 'Success');

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
                    ga('send', 'event', 'Import Device', 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', 'Import Device', 'Success');

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
            const accessToken = $(thisElem).find('.apiHelperAuthSettingsProductAccessToken').val();
            const productId = $(thisElem).find('.apiHelperAuthSettingsProduct').val();
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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
            console.log('outputFormat=' + outputFormat);
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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', 'Create Customer', 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', 'Create Customer', 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', 'Create Claim Code', 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', 'Create Claim Code', 'Success');

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
                    ga('send', 'event', gaCategory, 'Error');

                    setStatus('Error in ' + gaCategory);

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                },
                method: 'POST',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
                    ga('send', 'event', gaCategory, 'Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));

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
                    ga('send', 'event', gaCategory, 'Success');

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
/*
<div class="apiHelperCloudApiClaiming">
    <div class="apiHelper">
        <div class="apiHelperBox">
            <table class="apiHelperTableNoMargin">
                <tr><td class="apiHelperProductSelectorLabel">Product Access Token</td><td><input type="text" size="50" class="apiHelperAuthSettingsProductAccessToken" value=""></td><td>&nbsp;</td></tr>
                <tr><td class="apiHelperProductSelectorLabel">Product ID</td><td><input type="text" size="10" class="apiHelperAuthSettingsProduct" value=""></td><td>&nbsp;</td></tr>
                <tr><td class="apiHelperProductSelectorLabel">Customer Access Token</td><td><input type="text" size="50" class="apiHelperAuthSettingsCustomerAccessToken" value=""></td><td>&nbsp;</td></tr>
                <tr><td class="apiHelperProductSelectorLabel">Device ID</td><td><input type="text" size="30" class="apiHelperDeviceLookupDeviceId" value=""></td><td class="apiHelperProductSelectorLabel"></td></tr>

*/

    loadSettings();

});

