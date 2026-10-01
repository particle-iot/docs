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
            skuOptions: [],
            skuSelect: thisElem.find('.antennaSkuSelect'),
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

        // Flatten skuFamily: top-level objects with a group contribute the group's contents, others are used as is.
        // Only entries with a modem can be used for band filtering.
        const buildSkuOptions = function() {
            const flat = [];
            for(const family of antennaTool.carriersJson.skuFamily) {
                if (Array.isArray(family.group)) {
                    flat.push(...family.group);
                }
                else {
                    flat.push(family);
                }
            }
            return flat.filter(item => item.modem);
        };

        // Returns the modem's band strings (like 4G-12) that are part of the bucket. A modem that is not 
        // found returns null, which means no filtering.
        const getModemBucketBands = function(modemName, bucket) {
            const modem = antennaTool.carriersJson.modems.find(m => m.model === modemName);
            if (!modem || !modem.bands) {
                return null;
            }
            return modem.bands.filter(function(bandStr) {
                // Band strings look like 4G-12, M1-12, 5G-77, NTN-255, 3G-5, 2G-850
                const [tech, bandNum] = bandStr.split('-');
                const band = parseInt(bandNum);
                switch(tech) {
                    case '4G':
                    case 'M1':
                        return bucket.lteBands.includes(band);
                    case '5G':
                    case 'NTN':
                        return bucket.nrBands.includes(band);
                    case '3G':
                        return (bucket.umtsBands || []).includes(band);
                    case '2G':
                        // 2G "band" is a frequency in MHz (850, 900, 1800, 1900), not a band number
                        return (bucket.gsmBands || []).includes(band);
                    default:
                        return false;
                }
            });
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
            let target = table; // rows added by addRow go here

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
                target.append(tr);
            };

            const addSectionRow = function(title) {
                table.append($('<tr class="antennaToolSection">').append($('<th colspan="3">').text(title)));
            };

            addRow('Antenna SKU', a => a.sku);
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

            const skuModem = antennaTool.skuSelect.val();
            const filterBySku = !!skuModem && skuModem !== 'any';

            // Row listing the modem's bands in the bucket, only when filtering by SKU
            const addModemBandsRow = function(bucket) {
                const modemBands = filterBySku ? getModemBucketBands(skuModem, bucket) : null;
                if (modemBands) {
                    table.append($('<tr>')
                        .append($('<td>').text('Bands'))
                        .append($('<td colspan="2">').text(modemBands.join(', '))));
                }
            };

            for(const bucketKey of Object.keys(antennaTool.antennaData.buckets)) {
                const bucket = antennaTool.antennaData.buckets[bucketKey];

                // Skip buckets the selected SKU's modem does not support
                if (filterBySku && getModemBucketBands(skuModem, bucket)?.length === 0) {
                    continue;
                }
                // Build the bucket's parameter rows separately so the header can be omitted if there are none
                const bucketRows = $('<tbody>');
                target = bucketRows;

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
                target = table;

                if (bucketRows.children().length === 0) {
                    if (filterBySku) {
                        // The modem uses this bucket (unsupported buckets were skipped above), but neither antenna covers it
                        addSectionRow(bucket.bucketName);
                        addModemBandsRow(bucket);
                        table.append($('<tr>').append($('<td colspan="3">').text('Band required by modem but not supported by selected antennas')));
                    }
                    continue;
                }

                addSectionRow(bucket.bucketName);
                addModemBandsRow(bucket);

                table.append(bucketRows.children());
            }

            $(antennaTool.thisElem).find('.antennaToolComparison').empty().append(table);
        };

        const updateSelects = function() {
            const antenna1 = getAntenna(antennaTool.antennaSelects.eq(0).val());
            const antenna2 = getAntenna(antennaTool.antennaSelects.eq(1).val());

            renderComparison(antenna1, antenna2);
        };

        const setupSelects = function() {
            antennaTool.skuOptions = buildSkuOptions();
            antennaTool.skuSelect.empty();
            antennaTool.skuSelect.append($('<option>').attr('value', 'any').text('Any'));
            for(const item of antennaTool.skuOptions) {
                antennaTool.skuSelect.append($('<option>').attr('value', item.modem).text(item.name));
            }
            antennaTool.skuSelect.on('change', updateSelects);

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

            thisElem.find('.antennaSwapButton').on('click', function() {
                const oldValues = antennaTool.antennaSelects.map(function() { return $(this).val(); }).get();
                const oldCustom = Object.assign({}, antennaTool.customAntennas);

                antennaTool.antennaSelects.each(function(index) {
                    const otherValue = oldValues[1 - index];
                    if (customAntennas.find(c => c.value === otherValue)) {
                        // Move the custom antenna data into this select's own custom slot (select 1 = Custom 1, select 2 = Custom 2)
                        const slot = customAntennas[index].value;
                        if (oldCustom[otherValue]) {
                            antennaTool.customAntennas[slot] = oldCustom[otherValue];
                        }
                        else {
                            delete antennaTool.customAntennas[slot];
                        }
                        $(this).val(slot);
                    }
                    else {
                        $(this).val(otherValue);
                    }
                });
                updateSelects();
            });

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
        })
        .catch(function(err) {
            console.log('antenna tool initialization failed', err);
        });
    });

});
