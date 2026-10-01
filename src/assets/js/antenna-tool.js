$(document).ready(function () {
    // auth not required

    $('.antennaTool').each(function() {
        const thisElem = $(this);

        // Instance data for this tool
        const antennaTool = {
            thisElem,
            carriersJson: null,
            antennaData: null,
            customAntennas: {},
            antennaSelects: thisElem.find('.antennaSelect'),
        };

        const customAntennas = [
            {value: 'custom1', title: 'Custom 1'},
            {value: 'custom2', title: 'Custom 2'},
        ];

        // Returns the antenna object for a select value (sku or custom1/custom2)
        const getAntenna = function(value) {
            // Custom antennas will be populated by the upload process later
            if (customAntennas.find(c => c.value === value)) {
                return antennaTool.customAntennas[value] || null;
            }
            return antennaTool.antennaData.antennas.find(a => a.sku === value) || null;
        };

        const updateSelects = function() {
            // Enable the upload button only when the select is set to a custom antenna
            antennaTool.antennaSelects.each(function() {
                const isCustom = !!customAntennas.find(c => c.value === $(this).val());
                $(this).parent().find('.antennaUploadButton').prop('disabled', !isCustom);
            });

            const antenna1 = getAntenna(antennaTool.antennaSelects.eq(0).val());
            const antenna2 = getAntenna(antennaTool.antennaSelects.eq(1).val());

            console.log('antenna1', antenna1);
            console.log('antenna2', antenna2);
        };

        const setupSelects = function() {
            antennaTool.antennaSelects.each(function(index) {
                const selectElem = $(this);
                selectElem.empty();

                for(const antenna of antennaTool.antennaData.antennas) {
                    $(selectElem).append($('<option>').attr('value', antenna.sku).text(antenna.name + ' ' + antenna.sku));
                }
                for(const custom of customAntennas) {
                    $(selectElem).append($('<option>').attr('value', custom.value).text(custom.title));
                }

                // Default to the first two antennas
                selectElem.val(antennaTool.antennaData.antennas[index % antennaTool.antennaData.antennas.length].sku);
            });

            antennaTool.antennaSelects.on('change', updateSelects);

            antennaTool.antennaSelects.each(function() {
                const selectElem = $(this);
                const buttonElem = selectElem.parent().find('.antennaUploadButton');
                const inputElem = selectElem.parent().find('.antennaUploadInput');

                // Button opens the hidden file input
                buttonElem.on('click', function() {
                    inputElem.val('');
                    inputElem.trigger('click');
                });

                inputElem.on('change', function() {
                    const file = this.files[0];
                    if (!file) {
                        return;
                    }
                    const fileReader = new FileReader();
                    fileReader.onload = function() {
                        try {
                            antennaTool.customAntennas[selectElem.val()] = JSON.parse(fileReader.result);
                        }
                        catch(e) {
                            alert('The file could not be parsed as JSON: ' + e.message);
                            return;
                        }
                        updateSelects();
                    };
                    fileReader.readAsText(file);
                });
            });
        };

        Promise.all([
            apiHelper.getCarriersJson(),
            fetch('/assets/files/antenna-tool/antenna-data.json').then(response => response.json()),
        ]).then(function([carriersJson, antennaData]) {
            antennaTool.carriersJson = carriersJson;
            antennaTool.antennaData = antennaData;

            setupSelects();
            updateSelects();

            console.log('antennaTool', antennaTool);
        })
        .catch(function(err) {
            console.log('antenna tool initialization failed', err);
        });
    });

});
