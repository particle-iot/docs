
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.apiHelperCellularUsage').each(function () {
        const thisElem = $(this);

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');
        const productSelector = $(thisElem).find('.apiHelperOrgProductSelector');
        const progressBarElem = $(thisElem).find('.progressBar');
        const postRetrieveActionsElem = $(thisElem).find('.postRetrieveActions');
        const downloadDataButtonElem = $(thisElem).find('.downloadData');
        const searchModeElem = $(thisElem).find('.searchMode');
        const usageGraphsDivElem = $(thisElem).find('.usageGraphsDiv');

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        let usageData = {};

        $(productSelector).data('onChange', function() {

            usageData.productId = $(productSelector).data('getProductId')();

            usageData.fleetUsage = null;
            setStatus('');

            $(actionButtonElem).prop('disabled', !usageData.productId);
            $(usageGraphsDivElem).hide();

            if (!!usageData.productId) {
                apiHelper.particle.getFleetDataUsage({ 
                    product: usageData.productId,
                    auth: apiHelper.auth.access_token 
                }).then(
                    function(res) {
                        console.log('res', res);
                
                        if (res.statusCode == 200) {
                            // res.body.total_active_sim_cards
                            // res.body.total_mbs_used
                            // res.body.usage_by_day (array)
                            //   date, mbs_used, mbs_used_cumulative
                            
                            usageData.fleetUsage = res.body;

                            if (usageData.fleetUsage.total_active_sim_cards < 100) {
                                setStatus('This device fleet has ' + usageData.fleetUsage.total_active_sim_cards + ' SIMs.')
                            }
                            else
                            if (usageData.fleetUsage.total_active_sim_cards < 1000) {
                                setStatus('This device fleet has ' + usageData.fleetUsage.total_active_sim_cards + ' SIMs. It will take some time to get this data, and should not be done excessively as you can exceed the API rate limits for your site.');
                            }
                            else {
                                setStatus('This device fleet has ' + usageData.fleetUsage.total_active_sim_cards + ' SIMs. This tool is not recommended for very large fleets as it will take a long time to get the usage data and may exceed the API rate limits for your site.')
                            }
                        }        
                    },
                    function(err) {                        
                    }
                )

            }
        });

        const showGraphs = function() {
            console.log('showGraphs');
            $(usageGraphsDivElem).show();
        };

        $(thisElem).on('dragenter', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
        $(thisElem).on('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });

        $(thisElem).on('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();

            const files = e.originalEvent.dataTransfer.files;

            for(file of files) {
                if (file.type == 'application/json') {
                    $(searchModeElem).hide();

                    let reader = new FileReader();

                    reader.onload = function(e) {
                        usageData = JSON.parse(e.target.result);

                        setStatus('Loaded previously saved data for ' + usageData.simList.length + ' SIMs');
                        showGraphs();
                    }

                    reader.readAsText(file);
                    break;
                }
            }
           
        });


        $(downloadDataButtonElem).on('click', function() {
            let blob = new Blob([JSON.stringify(usageData, null, 2)], {type:'application/json'});
            saveAs(blob, 'fleetUsage.json');
        });


        const getPerSimUsage = async function() {
            setStatus('Getting per-SIM usage data for ' + usageData.simList.length + ' SIMs...');

            usageData.simUsage = {};

            $(progressBarElem).prop('value', 0);
            $(progressBarElem).prop('max', usageData.simList.length);
            $(progressBarElem).show();

            let ii = 0;
            for(const sim of usageData.simList) {
                const res = await apiHelper.particle.getSIMDataUsage({ auth: apiHelper.auth.access_token, product:usageData.productId, iccid: sim._id});

                if (res.statusCode == 200) {
                    // res.body.usage_by_day (array)
                    //   date, mbs_used, mbs_used_cumulative
                    usageData.simUsage[res.body.iccid] = res.body.usage_by_day;
                }
                $(progressBarElem).prop('value', ++ii);
            }

            setStatus('Get data complete!');
            $(progressBarElem).hide();

            $(postRetrieveActionsElem).show();

            console.log('simUsage', usageData.simUsage);
            showGraphs();
        }

        $(actionButtonElem).on('click', function() {
            $(actionButtonElem).prop('disabled', true);
            $(progressBarElem).hide();
            $(postRetrieveActionsElem).hide();
            $(usageGraphsDivElem).hide();

            usageData.productId = $(productSelector).data('getProductId')();

            setStatus('Getting list of SIM cards...');
            usageData.simList = [];

            const fetchPage = function(page) {
                apiHelper.particle.listSIMs({ auth: apiHelper.auth.access_token, product:usageData.productId, perPage:100, page }).then(
                    function(data) {
                        console.log('data', data);

                        data.body.sims.forEach(function(sim) {
                            usageData.simList.push(sim);
                        });
    
                        if (page < data.body.meta.total_pages) {
                            fetchPage(++page);
                        }
                        else {
                            // Done
                            getPerSimUsage();
                        }
                    },
                    function(err) {            
                    }
                );            
            }    
            fetchPage(1);
        });

    });
});
