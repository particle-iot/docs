
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

        sessionStorage.setItem(localStorageKey, JSON.stringify(settings));
    };


    const setCodeBox = function (parentElem, text) {
        const thisCodeElem = $(parentElem).find('.codebox');
        $(thisCodeElem).text(text);
        $(thisCodeElem).removeClass('prettyprinted');
        if (prettyPrint) {
            prettyPrint();
        }
    };

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
                        ga('send', 'event', simpleGetConfig.gaAction, 'Error', jqXHR.responseJSON.error);
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



    $('.apiHelperCloudApiGetVariable').each(function () {
        const thisElem = $(this);


        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(thisElem).find('.apiHelperGetVariable').on('click', function () {
            setStatus('Requesting variable...');

            const deviceId = $(thisElem).find('.apiHelperCloudDeviceSelect').val();
            const variableName = $(thisElem).find('.apiHelperVariableName').val();
            const style = $(thisElem).attr('data-style') || 'authHeader';

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    ga('send', 'event', 'Get Variable', 'Error', jqXHR.responseJSON.error);

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
                url: 'https://api.particle.io/v1/devices/' + deviceId + '/' + variableName
            }

            switch (style) {
                case 'authHeader':
                    request.headers = {
                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                        'Accept': 'application/json'
                    };
                    break;

                case 'query':
                    request.url += '?access_token=' + apiHelper.auth.access_token;
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

            const deviceId = $(thisElem).find('.apiHelperCloudDeviceSelect').val();
            const functionName = $(thisElem).find('.apiHelperFunctionName').val();
            const functionParameter = $(thisElem).find('.apiHelperFunctionParameter').val();
            const style = $(thisElem).attr('data-style') || 'authHeader';

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    ga('send', 'event', 'Call function', 'Error', jqXHR.responseJSON.error);

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
                url: 'https://api.particle.io/v1/devices/' + deviceId + '/' + functionName,
            }

            switch (style) {
                case 'authHeader':
                    request.headers = {
                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                        'Accept': 'application/json'
                    };
                    request.data = JSON.stringify({ arg: functionParameter });
                    request.contentType = 'application/json';
                    break;

                case 'authHeaderForm':
                    request.headers = {
                        'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                        'Accept': 'application/json'
                    };
                    request.data = 'arg=' + encodeURIComponent(functionParameter);
                    request.contentType = 'application/x-www-form-urlencoded';
                    break;

                case 'form':
                    request.data = 'arg=' + encodeURIComponent(functionParameter) + '&access_token=' + apiHelper.auth.access_token;
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
                    ga('send', 'event', 'List Product Devices', 'Error', jqXHR.responseJSON.error);

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

            let queryParams = {};

            ['deviceId', 'deviceName', 'groups', 'sortAttr', 'sortDir', 'quarantined', 'page', 'perPage'].forEach(function (which) {
                const value = $(thisElem).find('.apiHelper_' + which).val();
                if (value) {
                    queryParams[which] = value;
                }
            });


            const queryKeys = Object.keys(queryParams);
            if (queryKeys.length > 0) {
                for (let ii = 0; ii < queryKeys.length; ii++) {
                    if (ii == 0) {
                        request.url += '?';
                    }
                    request.url += queryKeys[ii] + '=' + encodeURIComponent(queryParams[queryKeys[ii]]);
                    if ((ii + 1) < queryKeys.length) {
                        request.url += '&';
                    }
                }
            }

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
                    ga('send', 'event', 'List Org Products', 'Error', jqXHR.responseJSON.error);

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
            });
            $(clientSecretElem).on('blur', function () {
                settings.clientSecret = $(clientSecretElem).val();
                saveSettings();
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
                    ga('send', 'event', 'Create Token', 'Error', jqXHR.responseJSON.error);

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
                    ga('send', 'event', 'Import Device', 'Error', jqXHR.responseJSON.error);

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
                    ga('send', 'event', 'Create Customer', 'Error', jqXHR.responseJSON.error);

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
                    ga('send', 'event', 'Create Claim Code', 'Error', jqXHR.responseJSON.error);

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
                    ga('send', 'event', gaCategory, 'Error', jqXHR.responseJSON.error);

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

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');

        let listening;

        const beginListening = async function(cb) {
            if (!listening) {
                listening = usbSerial.listeningCommand();

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
                        setOutput(results);       
                    }
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
                    ga('send', 'event', gaCategory, 'Error', jqXHR.responseJSON.error);

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
                    ga('send', 'event', gaCategory, 'Error', jqXHR.responseJSON.error);

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

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);
        });
    });

    loadSettings();

});

