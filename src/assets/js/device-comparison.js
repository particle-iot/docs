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

        // Choose the SKU that supplies the data for a group in skuFamily. The group's skus array has the
        // SKUs for the group (kits, trays, etc.) with the preferred one first.
        const findSkuForGroup = function(skuFamilyObj, groupObj) {
            for(const skuName of (groupObj.skus || [])) {
                const skuObj = datastore.data.skus.find(e => e.name == skuName);
                if (skuObj) {
                    return skuObj;
                }
            }
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

        // Generate the device list from skuFamily; same filtering as carriers.js, but only embedded
        // devices (not Linux devices such as Tachyon) can be compared
        const deviceOptions = [];
        for(const skuFamilyObj of datastore.data.skuFamily) {
            if (skuFamilyObj.kind !== 'embedded') {
                continue;
            }
            // Wi-Fi devices are included here, but not in carriers.js
            if (skuFamilyObj.cellular === false || !skuFamilyObj.group) {
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
                    modem: groupObj.modem,
                    sim: groupObj.sim,
                    simPlan: groupObj.simPlan,
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

                    rowData['device' + index] = '<span class="deviceComparisonCell" title="' + escapeAttr(tooltip) + 
                        '" data-country="' + escapeAttr(countryObj.name) + '" data-device="' + escapeAttr(device.title) + '">' + symbol + '</span>';
                    hasData = true;
                });

                if (hasData) {
                    rows.push(rowData);
                }
            }
            return rows;
        };

        // Opens an overlay panel with a title and returns the element for its content. The overlay is 
        // sized to its content up to 900 px wide, and scrolls vertically if the content is long.
        const openOverlay = function(title) {
            const overlayElem = $('<div class="deviceComparisonOverlay">');
            const panelElem = $('<div class="deviceComparisonOverlayPanel">').appendTo(overlayElem);

            const close = function() {
                $(document).off('keydown.deviceComparisonOverlay');
                overlayElem.parent().remove();
            };
            $('<button type="button" class="deviceComparisonOverlayClose" aria-label="Close">&times;</button>').on('click', close).appendTo(panelElem);
            $('<h3>').text(title).appendTo(panelElem);

            const contentElem = $('<div>').appendTo(panelElem);

            overlayElem.on('click', function(ev) {
                if (ev.target === overlayElem[0]) {
                    close();
                }
            });
            $(document).on('keydown.deviceComparisonOverlay', function(ev) {
                if (ev.key == 'Escape') {
                    close();
                }
            });

            // Site table and font styles are scoped to #docs .content, so the overlay needs a .content
            // ancestor to look like the carriers page. It can't go in the page's own .content element
            // because that is inside a transformed, scrolling container, which breaks position: fixed.
            // Instead, add a separate .content wrapper directly under #docs. Use the page's background color
            // so the theme matches.
            let hostElem = $('#docs');
            if (!hostElem.length) {
                hostElem = $('body');
            }
            let bgColor = 'transparent';
            for(let e = $(thisElem).closest('.content')[0] || hostElem[0]; e; e = e.parentElement) {
                bgColor = getComputedStyle(e).backgroundColor;
                if (bgColor != 'transparent' && bgColor != 'rgba(0, 0, 0, 0)') {
                    break;
                }
            }
            panelElem.css('background-color', bgColor);

            $('<div class="content">').append(overlayElem).appendTo(hostElem);

            return contentElem;
        };

        // Show the country details for a device in an overlay, using the same content as the country
        // details tab on the carriers page (from the recommendation down, without the SKU list)
        const showDetails = function(country, deviceValue) {
            const option = findDeviceOption(deviceValue);
            if (!option) {
                return;
            }

            const resultDiv = openOverlay(option.title + ' in ' + country);

            countryDetails.generateTable({
                country,
                modem: option.modem,
                sim: option.sim,
                simPlan: option.simPlan,
                tableId: 'deviceComparisonDetailTable',
                resultDiv,
            });
        };

        // Show the additional information for a row in an overlay. The note is a markdown file in
        // content/notes, which is built into a page at /notes/<name>/index.html. Like the troubleshooting 
        // tool, get the content of that page.
        const showNote = async function(noteName, title) {
            const contentElem = openOverlay(title);
            contentElem.text('Loading...');

            try {
                const noteFetch = await fetch('/notes/' + noteName.replace(/\.md$/, '') + '/index.html');
                if (!noteFetch.ok) {
                    throw new Error('status ' + noteFetch.status);
                }
                const noteDocument = new DOMParser().parseFromString(await noteFetch.text(), 'text/html');

                contentElem.empty().append($(noteDocument).find('.content').children());
            }
            catch(e) {
                contentElem.text('Unable to load the additional information.');
            }
        };

        tableElem.on('click keydown', '.deviceComparisonInfo', function(ev) {
            if (ev.type == 'keydown' && ev.key != 'Enter' && ev.key != ' ') {
                return;
            }
            ev.preventDefault();
            showNote($(this).data('note'), $(this).data('title'));
        });

        tableElem.on('click', 'td', function() {
            const cellElem = $(this).find('.deviceComparisonCell');
            if (cellElem.length) {
                showDetails(cellElem.data('country'), cellElem.data('device'));
            }
        });

        const update = function() {
            const devices = [];
            const urlConfig = {};

            selectElems.each(function() {
                const value = $(this).val();
                const option = findDeviceOption(value);
                if (option) {
                    devices.push({title: value, option, sku: option.sku, skuObj: datastore.findSkuByName(option.sku)});
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

            $(thisElem).find('.deviceComparisonFootnoteShared').toggle(def.tableData.some(r => Object.values(r).some(v => typeof v == 'string' && v.includes('PARANTWM1EA<sup>2</sup>'))));

            // Rows with an infoNote get an info icon after the label that opens the note
            for(const rowData of tableData) {
                if (rowData.infoNote) {
                    rowData.feature = escapeAttr(rowData.feature) + 
                        '<img class="deviceComparisonInfo" src="/assets/images/info-icon.png" width="14" height="14" tabindex="0" role="button"' +
                        ' alt="More information about ' + escapeAttr(rowData.feature) + '" title="More information"' +
                        ' data-note="' + escapeAttr(rowData.infoNote) + '" data-title="' + escapeAttr(rowData.feature) + '">';
                }
            }

            tableElem.empty().append(tableGenerator.generateTable({columns: def.columns}, tableData));
        };

        selectElems.on('change', update);
        countryElem.on('change', update);

        update();
    });
});
