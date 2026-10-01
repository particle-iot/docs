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

        const bandParameters = [
            {key: 'peakGainDbi', title: 'Peak gain dBi', higherIsBetter: true},
            {key: 'avgGainDb', title: 'Average gain dB', higherIsBetter: true},
            {key: 'efficiencyPercent', title: 'Efficiency %'},
            {key: 'maxVswr', title: 'Max VSWR'},
            {key: 'maxReturnLossDb', title: 'Max return loss dB'},
        ];

        // Returns the terrestrial band data for a bucket, or null
        const getBand = function(antenna, bucketKey) {
            if (!antenna || !antenna.bands) {
                return null;
            }
            return antenna.bands.find(b => b.bucket === bucketKey && (!b.service || b.service === 'terrestrial')) || null;
        };

        const renderComparison = function(antenna1, antenna2) {
            const antennas = [antenna1, antenna2];
            const table = $('<table class="antennaToolTable">');

            const valueCell = function(value) {
                return $('<td>').text((value !== undefined && value !== null) ? value : '');
            };

            // If higherIsBetter is set and antenna 2 has a higher value than antenna 1, highlight antenna 2's cell
            const addRow = function(title, getValue, higherIsBetter) {
                const tr = $('<tr>').append($('<td>').text(title));
                const values = antennas.map(antenna => antenna ? getValue(antenna) : undefined);
                for(const value of values) {
                    tr.append(valueCell(value));
                }
                if (higherIsBetter && typeof values[0] === 'number' && typeof values[1] === 'number' && values[1] > values[0]) {
                    tr.children().eq(2).css('color', '#F45151'); // State_Red_600
                }
                table.append(tr);
            };

            const addSectionRow = function(title) {
                table.append($('<tr class="antennaToolSection">').append($('<th colspan="3">').text(title)));
            };

            addRow('Antenna SKU:', a => a.sku);
            addRow('Name', a => a.name);

            const datasheetRow = $('<tr>').append($('<td>').text('Datasheet link'));
            for(const antenna of antennas) {
                const td = $('<td>');
                if (antenna && antenna.datasheet) {
                    td.append($('<a>').attr({href: antenna.datasheet, target: '_blank'}).text('Datasheet'));
                }
                datasheetRow.append(td);
            }
            table.append(datasheetRow);

            addRow('Peak gain dBi', a => a.peakGain, true);
            addRow('Average gain dB', a => a.avgGain, true);

            for(const bucketKey of Object.keys(antennaTool.antennaData.buckets)) {
                const bucket = antennaTool.antennaData.buckets[bucketKey];
                addSectionRow(bucket.bucketName);

                /*
                table.append($('<tr>')
                    .append($('<td>').text('Frequency range MHz'))
                    .append($('<td colspan="2">').text(bucket.frequencyRangeMHz.join(' - '))));
                */
               
                for(const param of bandParameters) {
                    const getBandValue = function(a) {
                        const band = getBand(a, bucketKey);
                        return band ? band[param.key] : undefined;
                    };

                    // Omit the row if neither antenna has this parameter for the bucket
                    if (antennas.every(a => !a || getBandValue(a) === undefined || getBandValue(a) === null)) {
                        continue;
                    }
                    addRow(param.title, getBandValue, param.higherIsBetter);
                }
            }

            $(antennaTool.thisElem).find('.antennaToolComparison').empty().append(table);
        };

        const updateSelects = function() {
            const antenna1 = getAntenna(antennaTool.antennaSelects.eq(0).val());
            const antenna2 = getAntenna(antennaTool.antennaSelects.eq(1).val());

            console.log('antenna1', antenna1);
            console.log('antenna2', antenna2);

            renderComparison(antenna1, antenna2);
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

            antennaTool.antennaSelects.each(function(index) {
                const selectElem = $(this);
                const buttonElem = selectElem.parent().find('.antennaUploadButton');
                const inputElem = selectElem.parent().find('.antennaUploadInput');
                // Upload from the first select is Custom 1, from the second is Custom 2
                const customValue = customAntennas[index].value;

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
                            antennaTool.customAntennas[customValue] = JSON.parse(fileReader.result);
                        }
                        catch(e) {
                            alert('The file could not be parsed as JSON: ' + e.message);
                            return;
                        }
                        // Switch the select to the custom antenna that was just uploaded
                        selectElem.val(customValue);
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
