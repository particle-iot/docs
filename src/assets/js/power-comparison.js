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

            

        });
    }

    run();
});