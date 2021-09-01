
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

        let usageData = {};
        let cellularChart;

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
                        $(graphTypeSelectElem).val('largestDataUsersOnDate');
                        $(graphTypeSelectElem).trigger('change');    
                    }, 10);
                }
            };

            setInstructions('Click on a point to view the usage details for that date');
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
                        $(graphTypeSelectElem).val('largestDataUsersOnDate');
                        $(graphTypeSelectElem).trigger('change');    
                    }, 10);
                }
            };

            setInstructions('Click on a bar to view the usage details for that date');
    
        };
        const largestDataUsersOnDateGraph = function(config) {
            $(dateSpanElem).show();

            let date = $(dateInputElem).val();
            if (!date && usageData.fleetUsage.usage_by_day.length > 0) {
                date = usageData.fleetUsage.usage_by_day[0].date;
                $(dateInputElem).val(date);
            }
            if (!date) {
                return;
            }

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

            const largestUsageForDate = usageForDate.filter(function(elem, index) {
                return (index < 20) && elem.mbs_used > 0;
            });

            let samples = [];

            config.type = 'bar';

            config.data.labels = [];

            config.data.datasets = [{
                label: 'Largest data users on date',
                data: samples,
                fill: false,
                backgroundColor: colorDefault,
                tension: 0.1
            }]

            for(const usage of largestUsageForDate) {
                config.data.labels.push(usage.iccid);
                samples.push(usage.mbs_used);
            }

            setInstructions('');
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

        };


        const simpleTable = function(obj) {

            const tableElem = document.createElement('table');

            const tbodyElem = document.createElement('tbody');

            let trElem;
            
            for(key in obj) {
                const value = obj[key];

                const trElem = document.createElement('tr');

                let tdElem;

                tdElem = document.createElement('td');
                $(tdElem).text(key);
                trElem.appendChild(tdElem);

                tdElem = document.createElement('td');
                $(tdElem).text(value);
                trElem.appendChild(tdElem);

                tbodyElem.appendChild(trElem);                
            }

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

                case 'largestDataUsersOnDate':
                    largestDataUsersOnDateGraph(config);
                    break;

                case 'simsLargestMonthlyDataUsage':
                    simsLargestMonthlyDataUsageGraph(config);
                    break;

                case 'dailyUsageForSim':
                    dailyUsageForSimGraph(config);
                    break;

            }

            if (!config.noChart) {
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

    });
});
