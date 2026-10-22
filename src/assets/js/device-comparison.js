$(document).ready(function () {
    // auth not required

    // Devices selected when the page is loaded without parameters
    const defaultDevices = ['M715', 'M404', 'M524'];

    $('.deviceComparison').each(async function() {
        const thisElem = $(this);
        const tableElem = $(thisElem).find('.deviceComparisonTable');
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

        // Internal devices are only shown if one is requested in the URL
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
                if ((isInternalItem(skuFamilyObj) || isInternalItem(groupObj)) && !requestedDevices.includes(groupObj.short[0])) {
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
                value = defaultDevices[index];
            }
            selectElem.val(value);
        });

        const update = function() {
            const devices = [];
            const urlConfig = {};

            selectElems.each(function() {
                const value = $(this).val();
                const option = findDeviceOption(value);
                if (option) {
                    devices.push({title: value, sku: option.sku});
                    urlConfig[$(this).data('param')] = value;
                }
            });

            // Update URL
            history.pushState(null, '', '?' + $.param(urlConfig));

            const def = deviceComparison.getTableDefinition({devices}, datastore);

            tableElem.empty().append(tableGenerator.generateTable({columns: def.columns}, def.tableData));
        };

        selectElems.on('change', update);

        update();
    });
});
