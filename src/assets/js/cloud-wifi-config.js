$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.cloudWifiConfig').each(function() {
        const thisPartial = $(this);

        const updateButtons = function() {
            const s = $('.deviceSearchText').val().trim();

            $('.deviceSearchButton').prop('disabled', (s.length == 0));
        };
        const setStatus = function(s) {
            $('.apiHelperDeviceFunctionStatus').text(s);
        }

        $('.deviceSearchText').on('input blur', function() {
            updateButtons();
        });
        
        $('.deviceSearchText').on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $('.deviceSearchButton').trigger('click');    
        });  

        $('.deviceSearchButton').on('click', async function() {
            const org = parseInt($('.apiHelperSandboxOrgSelect').val());

            const params = {
                text: $('.deviceSearchText').val().trim(),
                type: 'device',
            };
            const queryParams = new URLSearchParams(params);

            let searchUrl;
            let productInfoUrl;
            
            searchUrl = productInfoUrl = 'https://api.particle.io/v1/';

            if (org == 0) {
                searchUrl += 'user'
            }
            else {
                searchUrl += 'orgs/' + org;
            }
            searchUrl += '/search?' + queryParams.toString();
            productInfoUrl += 'products/';

            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                }
            };

            setStatus('Searching...');

            try {
                const fetchRes = await fetch(searchUrl, fetchOptions);

                const jsonResult = await fetchRes.json();

                console.log('jsonResult', jsonResult);

                if (jsonResult.ok) {
                    $('.searchResultTable').empty();

                    if (jsonResult.results.length > 0) {
                        let productInfo = {};


                        const tableParams = {
                            noOuterDiv: true,
                            cssClassTable: 'apiHelperTableNoMargin',
                            columns: [
                                {
                                    radioName: 'searchDevice',
                                    radioValueKey: 'id',
                                },
                                {
                                    key: 'id',
                                    title: 'Device ID',
                                },
                                {
                                    key: 'name',
                                    title: 'Device Name',  
                                },
                                {
                                    key: 'serialNumber',
                                    title: 'Serial Number',  
                                },
                                {
                                    key: 'productName',
                                    title: 'Product Name',  
                                },
                            ],
                            rows: [
                            ],
                        };

                        for(const res of jsonResult.results) {
                            // res
                            //   .device
                            //     .id
                            //     .name
                            //     .serialNumber
                            //     .productSlug
                            const tableRowObj = Object.assign({}, res.device);

                            if (res.device && res.device.productSlug) {
                                if (!productInfo[res.device.productSlug]) {
                                    try {
                                        const productFetchRes = await fetch(productInfoUrl + res.device.productSlug, fetchOptions);
                                        const productRes = await productFetchRes.json();

                                        // productRes
                                        //   .product
                                        //      .id
                                        //      .name
                                        //      .description
                                        //      .platform_id
                                        //      .slug
                                        //      .user

                                        console.log('productRes', productRes);
                                        productInfo[res.device.productSlug] = productRes.product;
                                    }   
                                    catch(e) {
                                        console.log('exception getting product ' + res.device.productSlug, e);
                                    }                                 
                                }
                                tableRowObj.productId = productInfo[res.device.productSlug].id;
                                tableRowObj.productName = productInfo[res.device.productSlug].name;
                                tableRowObj.platformId = productInfo[res.device.productSlug].platform_id;
                            }

                            tableParams.rows.push(tableRowObj);
                        }

                        const tableElem = apiHelper.simpleTable(tableParams);
                        
                        $('.searchResultTableDiv').html(tableElem);

                        $('input[type="radio"][name="searchDevice"]:first').prop('checked', true);

                        $('.searchResultTableDiv').show();

                        if (jsonResult.results.length == 1) {
                            setStatus('1 device found');
                        }
                        else {
                            setStatus(jsonResult.results.length + ' devices found');
                        }
                    }
                    else {
                        setStatus('No devices found');
                    }

                }
                else {
                    setStatus('Error searching devices');
                }

                // .ok (bool)
                // .hasMore (bool)
                // .results (array)


            }
            catch(e) {
                console.log('exception getting search resuts', e);
            }

        });



    })

});

