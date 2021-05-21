
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    const setCodeBox = function(parentElem, text) {
        const thisCodeElem = $(parentElem).find('.codebox');
        $(thisCodeElem).text(text);
        $(thisCodeElem).removeClass('prettyprinted');
        if (prettyPrint) {
            prettyPrint();
        }   
    };

    const setRequest = function(parentElem, request) {
        let requestStr = request.method + ' ' + request.url + '\n';
        if (request.headers) {
            for(const header in request.headers) {
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
        getTitle: function(dev) {
            return dev.name + ' (' + dev.id + ')' + (dev.online ? '' : ' (offline)');
        },
        hasRefresh: true,
        onChange: function(elem) {
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

    

    for(const simpleGetConfig of simpleGetConfigs) {

        $('.' + simpleGetConfig.className).each(function() {
            const thisElem = $(this);
    
            const setStatus = function(status) {
                $(thisElem).find('.apiHelperStatus').html(status);
            };
    
            $(thisElem).find('.apiHelperActionButton').on('click', function() {
                setStatus('Making request: ' + simpleGetConfig.gaAction + '...');
    
                const request = {
                    dataType: 'json',
                    error: function(jqXHR) {
                        ga('send', 'event', simpleGetConfig.gaAction, 'Error', jqXHR.responseJSON.error);
                        setStatus('Request failed');

                        $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                        $(respElem).show();
                    },
                    headers: {
                        'Authorization':'Bearer ' + apiHelper.auth.access_token,
                        'Accept':'application/json'
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

    

    $('.apiHelperCloudApiGetVariable').each(function() {
        const thisElem = $(this);


        const setStatus = function(status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(thisElem).find('.apiHelperGetVariable').on('click', function() {
            setStatus('Requesting variable...');

            const deviceId = $(thisElem).find('.apiHelperCloudDeviceSelect').val();
            const variableName = $(thisElem).find('.apiHelperVariableName').val();
            const style = $(thisElem).attr('data-style') || 'authHeader';

            let request = {
                dataType: 'json',
                error: function(jqXHR) {
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
                url : 'https://api.particle.io/v1/devices/' + deviceId + '/' + variableName
            }

            switch(style) {
                case 'authHeader':
                    request.headers = {
                        'Authorization':'Bearer ' + apiHelper.auth.access_token,
                        'Accept':'application/json'
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


    $('.apiHelperCloudApiFunction').each(function() {
        const thisElem = $(this);

        const setStatus = function(status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(thisElem).find('.apiHelperCallFunction').on('click', function() {
            setStatus('Calling function...');

            const deviceId = $(thisElem).find('.apiHelperCloudDeviceSelect').val();
            const functionName = $(thisElem).find('.apiHelperFunctionName').val();
            const functionParameter = $(thisElem).find('.apiHelperFunctionParameter').val();
            const style = $(thisElem).attr('data-style') || 'authHeader';

            let request = {
                dataType: 'json',
                error: function(jqXHR) {
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

            switch(style) {
                case 'authHeader':
                    request.headers = {
                        'Authorization':'Bearer ' + apiHelper.auth.access_token,
                        'Accept':'application/json'
                    };
                    request.data = JSON.stringify({arg:functionParameter});
                    request.contentType = 'application/json';
                    break;

                case 'authHeaderForm':
                    request.headers = {
                        'Authorization':'Bearer ' + apiHelper.auth.access_token,
                        'Accept':'application/json'
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



    $('.apiHelperCloudApiListProductDevices').each(function() {
        const thisElem = $(this);

        const requestElem = $(thisElem).find('.apiHelperApiRequest');
        const respElem = $(thisElem).find('.apiHelperApiResponse');
        const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
        const productSelectElem = $(thisElem).find('.apiHelperCloudProductSelect');

        const setStatus = function(status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        $(productSelectElem).on('change', function() {
            $(requestElem).hide();
            $(respElem).hide();
            $(outputJsonElem).hide();
        });

        apiHelper.getProducts().then(function(productsData) {
            
            productsData.products.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
        
            if (productsData.products.length > 0) {
                let html = '';
                for(let product of productsData.products) {
                    html += '<option value="' + product.id + '">' + product.name + ' (' + product.id + ')</option>';
                }
                $(productSelectElem).html(html);
            }
            else {
                setStatus('You do not have any products in your sandbox');
                $(thisElem).find('.apiHelperActionButton').prop('disabled', true);
            }
        });

        $(thisElem).find('.apiHelperActionButton').on('click', function() {
            setStatus('Requesting product devices...');

            const productId = $(productSelectElem).val();

            let request = {
                dataType: 'json',
                error: function(jqXHR) {
                    ga('send', 'event', 'List Product Devices', 'Error', jqXHR.responseJSON.error);

                    setStatus('Error getting product device list');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization':'Bearer ' + apiHelper.auth.access_token,
                    'Accept':'application/json'
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
                url : 'https://api.particle.io/v1/products/' + productId + '/devices/'
            }

            let queryParams = {};

            ['deviceId', 'deviceName', 'groups', 'sortAttr', 'sortDir', 'quarantined', 'page', 'perPage'].forEach(function(which) {
                const value = $(thisElem).find('.apiHelper_' + which).val();
                if (value) {
                    queryParams[which] = value;
                }
            });


            const queryKeys = Object.keys(queryParams);
            if (queryKeys.length > 0) {
                for(let ii = 0; ii < queryKeys.length; ii++) {
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



    $('.apiHelperCloudApiListOrgProducts').each(function() {
        const thisElem = $(this);

        const setStatus = function(status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };


        apiHelper.getOrgs().then(function(orgsData) {
            // No orgs: orgsData.organizations empty array
            // Object in array orgsData.organizations: id, slug, name
            
            if (orgsData.organizations.length > 0) {
                let html = '';
                for(let org of orgsData.organizations) {
                    html += '<option value="' + org.id + '">' + org.name + '</option>';
                }
                $(thisElem).find('.apiHelperCloudOrgSelect').html(html);
            }
            else {
                setStatus('You do not have access to any organizations');
                $(thisElem).find('.apiHelperActionButton').prop('disabled', true);
            }
        });

        $(thisElem).find('.apiHelperActionButton').on('click', function() {
            setStatus('Requesting organization products...');

            const org = $(thisElem).find('.apiHelperCloudOrgSelect').val();

            let request = {
                dataType: 'json',
                error: function(jqXHR) {
                    ga('send', 'event', 'List Org Products', 'Error', jqXHR.responseJSON.error);

                    setStatus('Error getting organization products');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Authorization':'Bearer ' + apiHelper.auth.access_token,
                    'Accept':'application/json'
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
                url : 'https://api.particle.io/v1/orgs/' + org + '/products/'
            }

            setRequest(thisElem, request);

            const respElem = $(thisElem).find('.apiHelperApiResponse');
            $(respElem).find('pre').text('');

            const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');
            $(outputJsonElem).hide();

            $.ajax(request);    

        });
    });



});

/*

*/