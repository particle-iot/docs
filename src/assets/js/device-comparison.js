$(document).ready(function () {
    // auth not required

    // Devices selected when the page is loaded without parameters
    const defaultDevices = ['M715', 'M404', 'M524'];

    // Symbols for recommendation values, used if the recommendation table does not have
    // symbol.greenCheckOrRedQuestion for that value
    const defaultRecommendationSymbol = {
        YES: '\u2705',
    };
    const defaultUnknownSymbol = '\u2753';

    const escapeAttr = function(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    };

    $('.deviceComparison').each(async function() {
        const thisElem = $(this);
        const tableElem = $(thisElem).find('.deviceComparisonTable');
        const countryElem = $(thisElem).find('input.deviceComparisonCountry');
        const selectElems = $(thisElem).find('select.deviceComparisonDevice');

        // Remember the search parameters before they are replaced
        const urlParams = new URLSearchParams(window.location.search);

        await datastore.init();

        // Choose the SKU that supplies the data for a group in skuFamily. The group has the modem and
        // SIM, but there are many SKUs (kits, trays, etc.) with the same values, so prefer one whose 
        // name starts with the group's short name.
        const findSkuForGroup = function(skuFamilyObj, groupObj) {
            const short = groupObj.short[0].toUpperCase();

            const skus = datastore.data.skus.filter(function(skuObj) {
                return skuObj.family == skuFamilyObj.family && skuObj.modem == groupObj.modem && skuObj.sim == groupObj.sim;
            });

            return skus.find(e => e.name.toUpperCase().startsWith(short)) || skus[0];
        };

        // Internal devices are shown to internal users, or if one is requested in the URL
        const showInternal = (typeof apiHelperAuth == 'object' && !!apiHelperAuth.isInternal);

        const requestedDevices = [];
        selectElems.each(function() {
            requestedDevices.push(urlParams.get($(this).data('param')));
        });

        const isInternalItem = function(obj) {
            return !!(obj.internal || obj.showInternalUsers);
        };

        // Generate the device list from skuFamily; same filtering as carriers.js
        const deviceOptions = [];
        for(const skuFamilyObj of datastore.data.skuFamily) {
            if (skuFamilyObj.wifi || skuFamilyObj.cellular === false || !skuFamilyObj.group) {
                continue;
            }

            const optGroup = {label: skuFamilyObj.name, options: []};

            for(const groupObj of skuFamilyObj.group) {
                if (!Array.isArray(groupObj.short) || groupObj.short.length == 0) {
                    continue;
                }
                if ((isInternalItem(skuFamilyObj) || isInternalItem(groupObj)) && !showInternal && !requestedDevices.includes(groupObj.short[0])) {
                    continue;
                }

                const skuObj = findSkuForGroup(skuFamilyObj, groupObj);
                if (!skuObj) {
                    continue;
                }

                optGroup.options.push({
                    value: groupObj.short[0],
                    title: groupObj.name,
                    sku: skuObj.name,
                });
            }

            if (optGroup.options.length) {
                deviceOptions.push(optGroup);
            }
        }

        const findDeviceOption = function(value) {
            for(const optGroup of deviceOptions) {
                const option = optGroup.options.find(e => e.value == value);
                if (option) {
                    return option;
                }
            }
            return null;
        };

        selectElems.each(function(index) {
            const selectElem = $(this);
            selectElem.empty();

            for(const optGroup of deviceOptions) {
                const optGroupElem = $('<optgroup>').attr('label', optGroup.label);
                for(const option of optGroup.options) {
                    $('<option>').attr('value', option.value).text(option.title).appendTo(optGroupElem);
                }
                selectElem.append(optGroupElem);
            }

            let value = urlParams.get(selectElem.data('param'));
            if (!value || !findDeviceOption(value)) {
                // Some defaults may be internal-only; use the next available default
                const available = defaultDevices.filter(e => findDeviceOption(e));
                value = available[index] || deviceOptions[0].options[0].value;
            }
            selectElem.val(value);
        });

        {
            // Show country compatibility, default is checked
            const cc = urlParams.get(countryElem.data('param'));
            if (cc !== null) {
                countryElem.prop('checked', cc != '0');
            }
        }

        // Returns the table rows for country compatibility, one per country. Each device column is
        // looked up in countryModemSim using the modem and SIM of the device's SKU.
        const getCountryRows = function(devices) {
            const rows = [{feature: '<strong>Country compatibility</strong>'}];

            const cmsByKey = {};
            for(const cmsObj of datastore.data.countryModemSim) {
                cmsByKey[cmsObj.country + '|' + cmsObj.modem + '|' + cmsObj.sim] = cmsObj;
            }

            for(const countryObj of datastore.data.countries) {
                const rowData = {feature: escapeAttr(countryObj.name)};
                let hasData = false;

                devices.forEach(function(device, index) {
                    const cmsObj = cmsByKey[countryObj.name + '|' + device.skuObj.modem + '|' + device.skuObj.sim];
                    if (!cmsObj || !cmsObj.recommendation) {
                        return;
                    }
                    const recommendationObj = datastore.data.recommendation.find(e => e.name == cmsObj.recommendation);
                    if (!recommendationObj) {
                        return;
                    }

                    let symbol = recommendationObj.symbol ? recommendationObj.symbol.greenCheckOrRedQuestion : undefined;
                    if (symbol === undefined) {
                        symbol = defaultRecommendationSymbol[recommendationObj.name] || defaultUnknownSymbol;
                    }

                    const tooltip = cmsObj.reason || recommendationObj.desc || recommendationObj.short;

                    if (!symbol) {
                        return;
                    }

                    rowData['device' + index] = '<span title="' + escapeAttr(tooltip) + '">' + symbol + '</span>';
                    hasData = true;
                });

                if (hasData) {
                    rows.push(rowData);
                }
            }
            return rows;
        };

        const update = function() {
            const devices = [];
            const urlConfig = {};

            selectElems.each(function() {
                const value = $(this).val();
                const option = findDeviceOption(value);
                if (option) {
                    devices.push({title: value, sku: option.sku, skuObj: datastore.findSkuByName(option.sku)});
                    urlConfig[$(this).data('param')] = value;
                }
            });

            const showCountry = countryElem.prop('checked');
            urlConfig[countryElem.data('param')] = showCountry ? '1' : '0';

            // Update URL
            history.pushState(null, '', '?' + $.param(urlConfig));

            const def = deviceComparison.getTableDefinition({devices}, datastore);

            let tableData = def.tableData;
            if (showCountry) {
                tableData = tableData.concat(getCountryRows(devices));
            }

            tableElem.empty().append(tableGenerator.generateTable({columns: def.columns}, tableData));
        };

        selectElems.on('change', update);
        countryElem.on('change', update);

        update();
    });
});
