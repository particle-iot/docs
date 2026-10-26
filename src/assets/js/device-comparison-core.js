// Device comparison table definition. Shared by the build-time generator in
// scripts/carriers-update/carriers-update.js (Node) and the runtime device comparison tool
// (src/assets/js/device-comparison.js), so it must not depend on either environment.

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
    else {
        root.deviceComparison = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    const deviceComparison = {};

    // Returns an array of row definitions ({id, title, fn}) for the options
    //   options.footnote is appended after the "No" values for features that are on the base board 
    //     on M.2 SoMs. Default is '<sup>1</sup>'
    //   options.sharedAntennaFootnote is appended to antennas shared by Wi-Fi and BLE. Default is '<sup>2</sup>'
    deviceComparison.getRowDefs = function(options) {
        options = options || {};

        const footnote = options.footnote || '<sup>1</sup>';
        const noBaseBoard = 'No' + footnote;

        const manufacturerNames = {
            quectel: 'Quectel',
            ublox: 'u-blox',
        };
        const regionNames = {
            global: 'Global',
            noram: 'NorAm',
            americas: 'Americas',
            emeaa: 'EMEAA',
        };
        const usbNames = {
            'c': 'USB-C',
            'micro-b': 'Micro-B',
        };
        // Values for rgbStatusLed, modeButton, and resetButton in skus: true (on the device), 
        // 'base board' (not on a module, typically on your base board), and 'internal' (inside the 
        // product enclosure)
        const formatOnBoard = function(value) {
            if (value === true) {
                return 'Yes';
            }
            if (value === 'base board') {
                return noBaseBoard;
            }
            if (value === 'internal') {
                return 'Internal';
            }
            return value === false ? 'No' : undefined;
        };
        const skuClassFormFactors = {
            production: 'SMD module',
            prototyping: 'Prototyping module',
            kit: 'Developer kit',
            eval: 'Evaluation board',
            both: 'Gateway',
        };

        const yesNo = function(b) {
            return b ? 'Yes' : 'No';
        };

        const antennaType = function(t) {
            // Both the trace and chip antennas are on-board antennas
            return t ? 'PCB antenna' : null;
        };

        // Antenna values are part numbers; some SKUs have true/false instead, which is ignored. 
        // A value of 4 means Wi-Fi and BLE share a single external antenna (PARANTWM1EA), which is
        // shown with a footnote.
        const sharedAntennaFootnote = options.sharedAntennaFootnote || '<sup>2</sup>';
        const antennaList = function(values) {
            const list = values.filter(e => (typeof e == 'string' && e) || e === 4).map(function(e) {
                return (e == '4') ? ('PARANTWM1EA' + sharedAntennaFootnote) : e;
            });
            return list.length ? list.join(', ') : 'None';
        };

        const rowDefs = [
            {
                id: 'form-factor',
                title: 'Form factor',
                fn: function({sku}) {
                    if (sku.feather) {
                        return 'Feather';
                    }
                    if (sku.m2som) {
                        return 'M.2 SoM';
                    }
                    // Fall back to a description based on the SKU class
                    return skuClassFormFactors[sku.skuClass] || '';
                },
                infoNote: 'form-factor.md'
            },
            {
                id: 'lifecycle',
                title: 'Lifecycle',
                fn: function({sku}) {
                    return sku.lifecycle == 'Pre development' ? 'In development' : (sku.lifecycle || '');
                }
            },
            {
                id: 'cellular-modem',
                title: 'Cellular modem',
                fn: function({modem}) {
                    if (!modem) {
                        return 'None';
                    }
                    return manufacturerNames[modem.manufacturer] + ' ' + (modem.partName || modem.model);
                }
            },
            {
                id: 'cellular-region',
                title: 'Cellular region',
                fn: function({sku, modem}) {
                    return modem ? regionNames[sku.skuRegion] : 'N/A';
                },
                infoNote: 'cellular-region.md'
            },
            {
                id: 'cellular-technology',
                title: 'Cellular technology',
                fn: function({modem}) {
                    return modem ? modem.techSummary : 'None';
                },
                infoNote: 'cellular-technology.md'
            },
            {
                id: 'wi-fi-supported',
                title: 'Wi-Fi supported',
                fn: function({sku, mcu}) {
                    if (sku.wifi || sku.wifiAntInt || sku.wifiAntExt) {
                        return 'Yes' + ((sku.wifiBands || mcu.wifiBands) ? ' (' + (sku.wifiBands || mcu.wifiBands) + ')' : '');
                    }
                    return 'No';
                }
            },
            {
                id: 'generation',
                title: 'Generation',
                fn: function({sku}) {
                    return 'Gen ' + sku.gen;
                }
            },
            {
                id: 'mcu',
                title: 'MCU',
                fn: function({mcu}) {
                    return mcu.name;
                }
            },
            {
                id: 'mcu-processor-speed',
                title: 'MCU processor speed',
                fn: function({mcu}) {
                    return mcu.cpuSummary;
                }
            },
            {
                id: 'user-ram-available',
                title: 'User RAM available',
                fn: function({mcu}) {
                    if (!mcu.userRam) {
                        return;
                    }
                    return (mcu.userRamApprox ? '~' : '') + mcu.userRam;
                }
            },
            {
                id: 'maximum-user-application-size',
                title: 'Maximum user application size',
                fn: function({mcu}) {
                    return mcu.userAppSize;
                }
            },
            {
                id: 'li-po-battery-connector',
                title: 'Li-Po battery connector',
                fn: function({sku}) {
                    // M.2 SoMs do not have a battery connector; it's on the base board
                    const m = sku.m2som ? null : (sku.batteryConn || '').match(/-([0-9]+)$/);
                    return m ? m[1] + '-pin' : 'No';
                }
            },
            {
                id: 'rgb-status-led',
                title: 'RGB status LED',
                fn: function({sku}) {
                    return formatOnBoard(sku.rgbStatusLed);
                }
            },
            {
                id: 'mode-and-reset-buttons',
                title: 'MODE and RESET buttons',
                fn: function({sku}) {
                    if (sku.modeButton === sku.resetButton) {
                        return formatOnBoard(sku.modeButton);
                    }
                    return 'MODE: ' + formatOnBoard(sku.modeButton) + ', RESET: ' + formatOnBoard(sku.resetButton);
                }
            },
            {
                id: 'usb-connector',
                title: 'USB connector',
                fn: function({sku}) {
                    return usbNames[sku.usb] || noBaseBoard;
                }
            },
            {
                id: 'ble-support',
                title: 'BLE support',
                fn: function({mcu}) {
                    return yesNo(mcu.ble);
                }
            },
            {
                id: 'nfc-tag-support',
                title: 'NFC tag support',
                fn: function({mcu}) {
                    return yesNo(mcu.nfcTag);
                }
            },
            {
                id: 'gnss-support',
                title: 'GNSS support',
                fn: function({sku}) {
                    return yesNo(sku.gnss);
                }
            },
            {
                id: 'sim',
                title: 'SIM',
                fn: function({sku}) {
                    if (sku.simEsim) {
                        return 'e-sim';
                    }
                    let types = [];
                    if (sku.simMff2) {
                        types.push('MFF2');
                    }
                    if (sku.sim4ff) {
                        types.push('4FF');
                    }
                    return types.length ? types.join(' or ') : 'None';
                },
                infoNote: 'sim.md'
            },
            {
                id: 'cellular-antenna',
                title: 'Cellular antenna',
                fn: function({sku}) {
                    return antennaList([sku.cellAnt, sku.cellAntAlt, sku.ntnAnt]);
                },
                infoNote: 'antenna.md'
            },
            {
                id: 'wi-fi-antenna',
                title: 'Wi-Fi antenna',
                fn: function({sku}) {
                    return antennaList([sku.wifiAntExt]);
                }
            },
            {
                id: 'ble-antenna',
                title: 'BLE antenna',
                fn: function({sku}) {
                    return antennaList([sku.bleAntExt]);
                }
            },
            {
                id: 'on-board-antennas',
                title: 'On-board antennas',
                fn: function({sku}) {
                    const wifi = antennaType(sku.wifiAntInt);
                    const ble = antennaType(sku.bleAntInt);
                    if (wifi && ble) {
                        return 'Wi-Fi/BLE ' + wifi;
                    }
                    if (wifi) {
                        return 'Wi-Fi ' + wifi;
                    }
                    if (ble) {
                        return 'BLE ' + ble;
                    }
                    return 'None';
                }
            },
            {
                id: 'platform',
                title: 'Platform',
                fn: function({platform}) {
                    return platform ? platform.displayName + ' (' + platform.id + ')' : '';
                }
            },
            {
                // Only included by default (all rows), which is how the interactive tool uses it
                id: 'datasheet',
                title: 'Datasheet',
                fn: function({sku}) {
                    if (!sku.datasheet) {
                        return '';
                    }
                    let link = sku.datasheet;
                    const linkPrefix = 'https://docs.particle.io';
                    if (link.startsWith(linkPrefix)) {
                        link = link.substring(linkPrefix.length);
                    }
                    return '<a href="' + link.replace(/"/g, '&quot;') + '">Datasheet</a>';
                }
            },
        ];

        return rowDefs;
    };

    // Builds the table definition and data for generateTable (Markdown) or tableGenerator (DOM)
    //
    // options.devices is an array of objects, one per column, left to right:
    //   .title   Column heading
    //   .sku     SKU in the skus table that supplies the data for that column
    // options.rows is an optional array of row ids to include, in order. Default is all rows.
    // options.footnote see getRowDefs
    //
    // lookup is an object with findSkuByName, findMcuById, and findModemByModel. Both
    // updater.datastore (Node) and datastore (browser) work.
    //
    // Returns {columns, tableData}
    deviceComparison.getTableDefinition = function(options, lookup) {
        const allRowDefs = deviceComparison.getRowDefs(options);

        // Select and order the rows. Default is all rows in the order defined above.
        let rows = allRowDefs;
        if (options.rows) {
            rows = options.rows.map(function(id) {
                const rowDef = allRowDefs.find(e => e.id == id);
                if (!rowDef) {
                    throw new Error('generateDeviceComparison: unknown row id ' + id);
                }
                return rowDef;
            });
        }

        // Collect the data for each column
        let devices = [];
        for(const device of options.devices) {
            const sku = lookup.findSkuByName(device.sku);
            if (!sku) {
                throw new Error('generateDeviceComparison: sku ' + device.sku + ' not found');
            }
            const mcu = lookup.findMcuById(sku.mcu);
            if (!mcu) {
                throw new Error('generateDeviceComparison: mcu ' + sku.mcu + ' not found for sku ' + device.sku);
            }
            const modem = sku.modem ? lookup.findModemByModel(sku.modem) : null;

            // Platform is in the deviceConstants object (keyed by name), matched on id
            let platform = null;
            if (sku.platformId !== undefined && lookup.data && lookup.data.deviceConstants) {
                platform = Object.values(lookup.data.deviceConstants).find(e => e.id == sku.platformId) || null;
            }

            devices.push({title: device.title, sku, mcu, modem, platform});
        }

        // The table is transposed from the usual generateTable usage: each row is a feature, and 
        // each column is a device. The first column is the feature name, which has no heading.
        let columns = [{key: 'feature', title: ' '}];
        devices.forEach(function(device, index) {
            columns.push({key: 'device' + index, title: device.title, align: 'center'});
        });

        let tableData = [];
        for(const rowDef of rows) {
            let rowData = {feature: rowDef.title};
            if (rowDef.infoNote) {
                // Only used by the interactive tool, which adds an info icon to the row. The markdown
                // table generator ignores this key.
                rowData.infoNote = rowDef.infoNote;
            }
            devices.forEach(function(device, index) {
                const value = rowDef.fn(device);
                rowData['device' + index] = (typeof value == 'undefined' || value === null || value === '') ? 'N/A' : value;
            });
            tableData.push(rowData);
        }

        return {columns, tableData};
    };

    return deviceComparison;
}));
