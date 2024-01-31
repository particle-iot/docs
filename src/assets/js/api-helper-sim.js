
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    // Remember the search parameters before they are replaced
    let urlParams = new URLSearchParams(window.location.search);

    let productState = {};
    let graphState = {};
    let lastQuery = '';

    const pushHistoryState = function() {

        let fullState = {};
        Object.assign(fullState, productState);
        Object.assign(fullState, graphState);

        let query = '';
        let sep = '?';
        for(const key in fullState) {
            const value = fullState[key];

            query += sep + key + '=' + encodeURIComponent(value);
            sep = '&';
        }
        if (query && query != lastQuery) {
            history.pushState(null, '', query);
            lastQuery = query;
        }
    }

    $('.apiHelperCellularUsage').each(function () {
        const thisElem = $(this);

        const actionButtonElem = $(thisElem).find('.apiHelperActionButton');
        const productSelector = $(thisElem).find('.apiHelperOrgProductSelector');
        const progressBarElem = $(thisElem).find('.progressBar');
        const postRetrieveActionsElem = $(thisElem).find('.postRetrieveActions');
        const downloadDataButtonElem = $(thisElem).find('.downloadData');
        const restoreFileInput = $(thisElem).find('.apiHelperRestoreFileInput');
        const restoreDataButtonElem = $(thisElem).find('.restoreData');
        const usageGraphsDivElem = $(thisElem).find('.usageGraphsDiv');
        const graphTypeSelectElem = $(thisElem).find('.graphTypeSelect');
        const dateSpanElem = $(thisElem).find('.dateSpan');
        const dateInputElem = $(thisElem).find('.dateInput');
        const iccidSpanElem = $(thisElem).find('.iccidSpan');
        const iccidInputElem = $(thisElem).find('.iccidInput');
        const cellularTableElem = $('#cellularTable');
        const cellularChartInstructionsElem = $('#cellularChartInstructions');

        const setStatus = function (status) {
            $(thisElem).find('.apiHelperStatus').html(status);
        };

        const setInstructions = function(s) {
            $(cellularChartInstructionsElem).text(s);
        }

        const loadSavedUsageData = function() {
            const savedUsage = sessionStorage.getItem(JSON.stringify(productState));
            if (savedUsage) {
                usageData = JSON.parse(savedUsage);
                $(postRetrieveActionsElem).show();
                $(downloadDataButtonElem).prop('disabled', false);
                $(graphTypeSelectElem).trigger('change');
                return true;
            }
            else {
                return false;
            }

        }

        const loadQuerySettings = function() {
            // Load query settings

            let querySettings = {};
            for(const [key, value] of urlParams) {
                querySettings[key] = value;
            }

            $(productSelector).data('loadQuerySettings')(querySettings);

            let triggerChange = false;

            if (loadSavedUsageData()) {
                triggerChange = true;
            }

            if (querySettings.iccid) {
                $(iccidInputElem).val(querySettings.iccid);
                triggerChange = true;
            }

            if (querySettings.date) {
                $(dateInputElem).val(querySettings.date);
                triggerChange = true;
            }

            if (querySettings.graphType) {
                if ($(graphTypeSelectElem).val() != querySettings.graphType) {
                    $(graphTypeSelectElem).val(querySettings.graphType);
                    triggerChange = true;
                }
            }

            if (triggerChange) {
                $(graphTypeSelectElem).trigger('change');
            }

            $(actionButtonElem).prop('disabled', !usageData.productId);
        }

        window.addEventListener('popstate', function(event) {
            urlParams = new URLSearchParams(window.location.search);
            
            loadQuerySettings();
        });


        let usageData = {};
        let cellularChart;

        $(productSelector).data('onChange', function() {

            usageData.productId = $(productSelector).data('getProductId')();

            usageData.fleetUsage = null;
            setStatus('');

            $(productSelector).data('saveQuerySettings')(productState);
            if (loadSavedUsageData()) {
                return;
            }

            $(actionButtonElem).prop('disabled', !usageData.productId);
            $(usageGraphsDivElem).hide();

            if (!!usageData.productId) {
                apiHelper.particle.getFleetDataUsage({ 
                    product: usageData.productId,
                    auth: apiHelper.auth.access_token 
                }).then(
                    function(res) {                
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

        const colorSet10 = [
            '#d9ed92',
            '#b5e48c',
            '#99d98c',
            '#76c893',
            '#52b69a',
            '#34a0a4',
            '#168aad',
            '#1a759f',
            '#1e6091',
            '#184e77'
        ];

        const colorSet5 = colorSet10.filter(function(elem, index) {
            return (index % 2) == 1;
        });

        const colorDefault = '#4face9';

        const colorOther = '#e5e5e5';

        const colorNoData = '#ffafcc';

        const dailyFleetCumulativeGraph = function(config) {
            let samples = [];

            config.type = 'line';

            config.data.labels = [];

            config.data.datasets = [{
                label: 'Daily fleet cumulative usage (MB)',
                data: samples,
                fill: false,
                borderColor: colorDefault,
                tension: 0.1
            }]

            for(const usage of usageData.fleetUsage.usage_by_day) {
                config.data.labels.push(usage.date);
                samples.push(usage.mbs_used_cumulative);
            }

            config.options.onClick = function(e) {
                const points = cellularChart.getElementsAtEventForMode(e, 'nearest', {
                    intersect: true
                }, false);
    
                if (points.length) {
                    const index = points[0].index;
    
                    setTimeout(function() {
                        $(dateInputElem).val(config.data.labels[index]);
                        $(graphTypeSelectElem).val('simUsageOnDate');
                        $(graphTypeSelectElem).trigger('change');    
                    }, 10);
                }
            };

            setInstructions('Click on a point to view the usage details for that date');
            pushHistoryState();

        };

        const dailyFleetUsageGraph = function(config) {
            let samples = [];

            config.type = 'bar';

            config.data.labels = [];

            config.data.datasets = [{
                label: 'Daily fleet usage (MB)',
                data: samples,
                fill: false,
                backgroundColor: colorDefault,
                tension: 0.1
            }]

            for(const usage of usageData.fleetUsage.usage_by_day) {
                config.data.labels.push(usage.date);
                samples.push(usage.mbs_used);
            }

            config.options.onClick = function(e) {
                const points = cellularChart.getElementsAtEventForMode(e, 'nearest', {
                    intersect: true
                }, false);
    
                if (points.length) {
                    const index = points[0].index;
                    
                    setTimeout(function() {
                        $(dateInputElem).val(config.data.labels[index]);
                        $(graphTypeSelectElem).val('simUsageOnDate');
                        $(graphTypeSelectElem).trigger('change');    
                    }, 10);
                }
            };

            setInstructions('Click on a bar to view the usage details for that date');
            pushHistoryState();

        };
        const simUsageOnDateGraph = function(config) {
            $(dateSpanElem).show();

            let date = $(dateInputElem).val();
            if (!date && usageData.fleetUsage.usage_by_day.length > 0) {
                date = usageData.fleetUsage.usage_by_day[0].date;
                $(dateInputElem).val(date);
            }
            if (!date) {
                return;
            }
            graphState.date = date;

            let usageForDate = [];

            // Aggregate usage by SIM for the specified date
            for(const iccid in usageData.simUsage) {
                for(const usage of usageData.simUsage[iccid]) {
                    if (usage.date == date) {
                        usageForDate.push({iccid, mbs_used: usage.mbs_used });
                        break;
                    }
                }
            }

            usageForDate.sort(function(a, b) {
                return b.mbs_used - a.mbs_used;
            });

            usageForDate = usageForDate.filter(function(elem, index) {
                return (index < 15) && elem.mbs_used > 0;
            });

            let samples = [];

            config.type = 'bar';

            config.data.labels = [];

            config.data.datasets = [{
                label: 'Largest SIM usage on date',
                data: samples,
                fill: false,
                backgroundColor: colorDefault,
                tension: 0.1
            }]

            for(const usage of usageForDate) {
                config.data.labels.push(usage.iccid);
                samples.push(usage.mbs_used);
            }

            setInstructions('');

            config.options.indexAxis = 'y';

            config.options.onClick = function(e) {
                const points = cellularChart.getElementsAtEventForMode(e, 'nearest', {
                    intersect: true
                }, false);
    
                if (points.length) {
                    const index = points[0].index;
                    
                    setTimeout(function() {
                        $(iccidInputElem).val(config.data.labels[index]);
                        $(graphTypeSelectElem).val('dailyUsageForSim');
                        $(graphTypeSelectElem).trigger('change');    
                    }, 10);
                }
            };

            setInstructions('Click on a bar to view usage for that SIM for the month');
            pushHistoryState();

        };

        const simsLargestMonthlyDataUsageGraph = function(config) {

            let simsByUsage = [];
            for(const iccid in usageData.simUsage) {
                const usageArray = usageData.simUsage[iccid];
                const monthlyUsage = usageArray[usageArray.length - 1].mbs_used_cumulative;

                if (monthlyUsage > 0) {
                    simsByUsage.push({
                        iccid,
                        monthlyUsage
                    });    
                }
            }

            simsByUsage.sort(function(a, b) {
                return b.monthlyUsage - a.monthlyUsage;
            });            

            let samples = [];

            config.type = 'bar';

            config.data.labels = [];

            config.data.datasets = [{
                label: 'SIMs with largest monthly data usage (MB)',
                data: samples,
                fill: false,
                backgroundColor: colorDefault,
                tension: 0.1
            }]

            for(const obj of simsByUsage) {
                config.data.labels.push(obj.iccid);
                samples.push(obj.monthlyUsage);
            }

            config.options.onClick = function(e) {
                const points = cellularChart.getElementsAtEventForMode(e, 'nearest', {
                    intersect: true
                }, false);
    
                if (points.length) {
                    const index = points[0].index;
                    
                    setTimeout(function() {
                        $(iccidInputElem).val(config.data.labels[index]);
                        $(graphTypeSelectElem).val('dailyUsageForSim');
                        $(graphTypeSelectElem).trigger('change');    
                    }, 10);
                }
            };

            setInstructions('Click on a bar to view details for that SIM');
            pushHistoryState();

        };

        const simpleTable = function(obj) {

            const tableElem = document.createElement('table');

            const tbodyElem = document.createElement('tbody');

            apiHelper.simpleTableObject(tbodyElem, obj);
            
            tableElem.appendChild(tbodyElem);

            return tableElem;
        }

        const dailyUsageForSimGraph = function(config) {
            $(iccidSpanElem).show();

            let iccid = $(iccidInputElem).val();
            if (!iccid && usageData.simUsage.length > 0) {
                iccid = Object.keys(usageData.simUsage)[0];
                $(iccidInputElem).val(iccid);
            }
            if (!usageData.simUsage[iccid]) {
                return;
            }
            $(cellularTableElem).html('');
            $(cellularTableElem).show();
            graphState.iccid = iccid;

            let samples = [];

            config.type = 'bar';

            config.data.labels = [];

            config.data.datasets = [{
                label: 'Daily usage for a SIM (MB)',
                data: samples,
                fill: false,
                backgroundColor: colorDefault,
                tension: 0.1
            }]

            for(const obj of usageData.simUsage[iccid]) {
                config.data.labels.push(obj.date);
                samples.push(obj.mbs_used);
            }

            setInstructions('');

            // ICCID information table
            let tableData = {};

            tableData['ICCID'] = iccid;

            for(const sim of usageData.simList) {
                if (sim._id == iccid) {
                    tableData['Device ID'] = sim.last_device_id;
                    tableData['Device Name'] = sim.last_device_name;
                }
            }

            const usageArray = usageData.simUsage[iccid];
            tableData['Monthly Usage'] = usageArray[usageArray.length - 1].mbs_used_cumulative;

            $(cellularTableElem).html(simpleTable(tableData));
            pushHistoryState();
        };

        const dailySimNoDataGraph = function(config) {
            $(cellularTableElem).html('');
            $(cellularTableElem).show();

            setInstructions('');

            // 
            let ignoreDate = [];
            for(const usage of usageData.fleetUsage.usage_by_day) {
                if (usage.mbs_used == 0) {
                    ignoreDate.push(usage.date);
                }   
            }

            let trElem;
            let tdElem;

            const tableElem = document.createElement('table');

            const theadElem = document.createElement('thead');
            trElem = document.createElement('tr');

            tdElem = document.createElement('td');
            $(tdElem).text('ICCID');
            trElem.appendChild(tdElem);

            for(const usage of usageData.fleetUsage.usage_by_day) {
                if (!ignoreDate.includes(usage.date)) {
                    tdElem = document.createElement('td');

                    const lastDash = usage.date.lastIndexOf('-');
                    if (lastDash) {
                        $(tdElem).text(usage.date.substr(lastDash + 1));
                    }

                    trElem.appendChild(tdElem);
                }
            }
            theadElem.appendChild(trElem);                

            tableElem.appendChild(theadElem);

            const tbodyElem = document.createElement('tbody');

            for(const iccid in usageData.simUsage) {
                let hasNoUsageOnDates = false;

                for(const usage of usageData.simUsage[iccid]) {
                    if (usage.mbs_used == 0 && !ignoreDate.includes(usage.date)) {
                        hasNoUsageOnDates = true;
                        break;
                    }
                }

                if (hasNoUsageOnDates) {
                    trElem = document.createElement('tr');

                    tdElem = document.createElement('td');
                    $(tdElem).text(iccid);
                    trElem.appendChild(tdElem);

                    for(const usage of usageData.simUsage[iccid]) {
                        if (!ignoreDate.includes(usage.date)) {
                            tdElem = document.createElement('td');
                            if (usage.mbs_used == 0) {
                                $(tdElem).attr('style', 'background-color:' + colorNoData);
                            }
                            $(tdElem).html('&nbsp;');
                            trElem.appendChild(tdElem);
                        }
                    }    

                    $(trElem).on('click', function() {
                        $(iccidInputElem).val(iccid);
                        $(graphTypeSelectElem).val('dailyUsageForSim');
                        $(graphTypeSelectElem).trigger('change');    
                    });

                    tbodyElem.appendChild(trElem);                        
                }
            }

            tableElem.appendChild(tbodyElem);

            $(cellularTableElem).html(tableElem);
            pushHistoryState();
        };

        $(dateInputElem).on('input', function() {
            $(graphTypeSelectElem).trigger('change');
        });

        $(iccidInputElem).on('input', function() {
            $(graphTypeSelectElem).trigger('change');
        });

        $(graphTypeSelectElem).on('change', function() {
            const graphType = $(graphTypeSelectElem).val();

            if (cellularChart) {
                cellularChart.destroy();
                cellularChart = null;
            }

            $(usageGraphsDivElem).show();

            graphState = {graphType};

            if (!usageData || !usageData.simUsage || !usageData.fleetUsage) {
                return;
            }

            let config = {
                data: {},
                options: {}
            };

            $(dateSpanElem).hide();
            $(iccidSpanElem).hide();
            $(cellularTableElem).hide();

            switch(graphType) {
                case 'dailyFleetCumulative':
                    dailyFleetCumulativeGraph(config);
                    break;

                case 'dailyFleetUsage':
                    dailyFleetUsageGraph(config);
                    break;

                case 'simUsageOnDate':
                    simUsageOnDateGraph(config);
                    break;

                case 'simsLargestMonthlyDataUsage':
                    simsLargestMonthlyDataUsageGraph(config);
                    break;

                case 'dailyUsageForSim':
                    dailyUsageForSimGraph(config);
                    break;

                case 'dailySimNoData':
                    dailySimNoDataGraph(config);
                    break;

            }

            if (config.type && config.data) {
                cellularChart = new Chart(
                    document.getElementById('cellularChart'),
                    config
                );    
            }
        });

        const showGraphs = function() {
            $(usageGraphsDivElem).show();
            $(graphTypeSelectElem).trigger('change');
        };

        $(thisElem).on('dragenter', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
        $(thisElem).on('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });

        const restoreFile = function(files) {
            for(file of files) {
                if (file.type == 'application/json') {
                    //$(searchModeElem).hide();

                    let reader = new FileReader();

                    reader.onload = function(e) {
                        usageData = JSON.parse(e.target.result);

                        if (usageData.productState) {
                            productState = usageData.productState;
                            $(productSelector).data('loadQuerySettings')(productState);
                        }

                        setStatus('Loaded previously saved data for ' + usageData.simList.length + ' SIMs');
                        showGraphs();
                    }

                    reader.readAsText(file);
                    break;
                }
            }
            $(actionButtonElem).prop('disabled', false);
        };

        $(thisElem).on('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();

            const files = e.originalEvent.dataTransfer.files;

            restoreFile(files);
           
        });


        $(downloadDataButtonElem).on('click', function() {            
            usageData.productState = productState;

            let blob = new Blob([JSON.stringify(usageData, null, 2)], {type:'application/json'});
            saveAs(blob, 'fleetUsage.json');
        });

        $(restoreFileInput).on('change', function() {

            restoreFile(this.files);

        });

        $(restoreDataButtonElem).on('click', function() {
            $(restoreFileInput).click();
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

            // Save data in session storage so we can efficiently go forward and backward in history
            sessionStorage.setItem(JSON.stringify(productState), JSON.stringify(usageData));

            setStatus('Get data complete!');
            $(progressBarElem).hide();

            $(actionButtonElem).prop('disabled', false);
            $(postRetrieveActionsElem).show();
            $(downloadDataButtonElem).prop('disabled', false);

            showGraphs();
        }

        const getListOfSimCards = function() {
            setStatus('Getting list of SIM cards...');
            usageData.simList = [];

            const fetchPage = function(page) {
                apiHelper.particle.listSIMs({ auth: apiHelper.auth.access_token, product:usageData.productId, perPage:100, page }).then(
                    function(data) {
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
        }

        $(actionButtonElem).on('click', function() {
            $(actionButtonElem).prop('disabled', true);
            $(progressBarElem).hide();
            $(postRetrieveActionsElem).hide();
            $(usageGraphsDivElem).hide();
            $(downloadDataButtonElem).prop('disabled', true);

            $(productSelector).data('saveQuerySettings')(productState);
    
            usageData.productId = $(productSelector).data('getProductId')();

            setStatus('Getting team members...');
            usageData.teamList = [];

            apiHelper.particle.listTeamMembers({ auth: apiHelper.auth.access_token, product:usageData.productId }).then(
                function(data) {
                    usageData.teamList = data.body.team;

                    // Done
                    getListOfSimCards();
                },
                function(err) {            
                }
            );            

        });

        loadQuerySettings();

    });
});
