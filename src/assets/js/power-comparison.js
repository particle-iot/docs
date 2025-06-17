$(document).ready(function() {
    let powerJson;

    async function run() {
        await new Promise(function(resolve, reject) {
            fetch('/assets/files/power.json')
            .then(response => response.json())
            .then(function(data) {
                // Data cleanup code is duplicated in scripts/power-consumption/app.js, should fix that

                // Fix missing data
                for(const key in data.devices.T402.modes.normal) {
                    if (!data.devices.ONE402.modes.normal[key]) {
                        data.devices.ONE402.modes.normal[key] = data.devices.T402.modes.normal[key]; 
                    }
                }
                for(const key in data.devices.T523.modes.normal) {
                    if (!data.devices.ONE523.modes.normal[key]) {
                        data.devices.ONE523.modes.normal[key] = data.devices.T523.modes.normal[key]; 
                    }
                }

                // Stop and ULP modes are the same on these devices
                for(const dev of ['M524', 'M404', 'PHN2', 'P2']) {
                    data.devices[dev].modes.ulp = {};

                    for(const key in data.devices[dev].modes.stop) {
                        data.devices[dev].modes.ulp[key.replace('stop', 'ulp')] = data.devices[dev].modes.stop[key];
                    }
                }

                powerJson = data;
                resolve();
            });
        });

        // Flatten out the power values by key
        for(const deviceKey in powerJson.devices) {
            const deviceObj = powerJson.devices[deviceKey];

            deviceObj.values = {};
            for(const modeKey in deviceObj.modes) {
                const modeObj = deviceObj.modes[modeKey];
                for(const key in modeObj) {
                    if (typeof deviceObj.values[key] == 'undefined') {
                        deviceObj.values[key] = modeObj[key];
                    }
                }
            }
        }


        console.log('loaded power-comparison', powerJson);

        const measurementColumns = [
            {
                key: 'min',
                title: 'Min',
            },
            {
                key: 'typ',
                title: 'Typ',
            },
            {
                key: 'max',
                title: 'Max',
            },
            {
                key: 'unit',
                title: 'Unit',
            },
        ];

        $('.powerComparison').each(function() {
            const thisPartial = $(this);

            const tbodyElem = $(thisPartial).find('.powerComparisonTable > tbody');

            $(tbodyElem).empty();

            const numLeftColumns = 2;
            const numComparison = 2;
            
            const comparisonSelectElem = [];

            function updateTable() {
                $('.dynamicRow').remove();

                for(const key in powerJson.info.labels) {
                    const title = powerJson.info.labels[key];


                    const trElem = document.createElement('tr');
                    $(trElem).addClass('dynamicRow');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text(title);
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text(key);
                        $(trElem).append(tdElem);
                    }

                    let hasValue = false;

                    for(let ii = 0; ii < numComparison; ii++) {
                        const deviceKey = $(comparisonSelectElem[ii]).val();
                        if (deviceKey != '-' && powerJson.devices[deviceKey] && powerJson.devices[deviceKey].values[key]) {
                            hasValue = true;
                            for(const mcObj of measurementColumns) {
                                const tdElem = document.createElement('td');
                                $(tdElem).text(powerJson.devices[deviceKey].values[key][mcObj.key]);
                                $(trElem).append(tdElem);
                            }
                        }
                        else {
                            const tdElem = document.createElement('td');
                            $(tdElem).attr('colspan', measurementColumns.length.toString());
                            $(tdElem).html('&nbsp;');
                            $(trElem).append(tdElem);
                        }
                    }               
                    if (!hasValue) {
                        continue;
                    } 

                    $(tbodyElem).append(trElem);

                }        
            }

            {
                // Device selector row
                const trElem = document.createElement('tr');

                for(let ii = 0; ii < numLeftColumns; ii++) {
                    const tdElem = document.createElement('td');
                    $(tdElem).html('&nbsp;');
                    $(trElem).append(tdElem);
                }                

                for(let ii = 0; ii < numComparison; ii++) {
                    const tdElem = document.createElement('td');
                    $(tdElem).attr('colspan', measurementColumns.length.toString());

                    const selectElem = document.createElement('select');
                    $(selectElem).addClass('apiHelperSelect');
                    if (ii > 0) {
                        const optionElem = document.createElement('option');
                        $(optionElem).attr('value', '-');
                        $(optionElem).text('Select device to compare');
                        $(selectElem).append(optionElem);
                    }
                    for(const title in powerJson.info.devices) {
                        const key = powerJson.info.devices[title];
                        const optionElem = document.createElement('option');
                        $(optionElem).attr('value', key);
                        $(optionElem).text(title);
                        $(selectElem).append(optionElem);
                    }
                    $(selectElem).on('change', updateTable);
                    comparisonSelectElem[ii] = selectElem;

                    $(tdElem).append(selectElem);

                    $(trElem).append(tdElem);
                }                

                $(tbodyElem).append(trElem);
            }

            {
                // Column label row
                const trElem = document.createElement('tr');

                {
                    const tdElem = document.createElement('td');
                    $(tdElem).attr('colspan', numLeftColumns.toString());
                    $(trElem).append(tdElem);
                }
                for(let ii = 0; ii < numComparison; ii++) {
                    for(const mcObj of measurementColumns) {
                        const tdElem = document.createElement('td');
                        $(tdElem).text(mcObj.title);
                        $(trElem).append(tdElem);
                    }
                }

                $(tbodyElem).append(trElem);
            }
            
            updateTable();

        });
    }

    run();
});