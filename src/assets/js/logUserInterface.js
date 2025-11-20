// The user interface requires jQuery!

logUserInterface = {
    // outputElem
    infoCache: {},
    sessionStorageKey: 'logDecoder',
};

logUserInterface.commandInfo = {
    CCID: {
        title: 'Card identification (ICCID)',
        desc: 'Returns the ICCID (Integrated Circuit Card ID) of the SIM-card. ICCID is a serial number identifying the SIM.',
    },
    CEDRXS: {
        title: 'eDRX setting',
    },
    CEDRXRDP: {
        title: 'eDRX read dynamic parameters',
    },
    CEER: {
        title: 'Extended error report',
    },
    CEINFO: {
        title: 'Retrieve coverage enhancement mode information',
    },
    CEREG: {
        title: 'EPS network registration status',
        parameters: {
            set: ['n'],
            read: ['n', 'stat', 'tac', 'ci', 'AcT'],
            URC: ['stat', 'tac', 'ci', 'AcT'],
            n: {
                title: 'Mode configuration',
                values: [
                    {
                        value: 0,
                        desc: 'network registration URC disabled',
                    },
                    {
                        value: 1,
                        desc: 'network registration URC enabled',
                    },
                    {
                        value: 2,
                        desc: 'network registration and location information URC enabled',
                    },
                    {
                        value: 3,
                        desc: 'network registration, location information and EMM cause value enabled',
                    },
                    {
                        value: 4,
                        desc: 'PSM, network registration and location information information enabled',
                    },
                    {
                        value: 5,
                        desc: 'PSM, network registration, location information and EMM cause value information enabled',
                    },
                ],
            },
            stat: {
                title: 'EPS registration status',
                values: [
                    {
                        value: 0,
                        desc: 'not registered',
                    },
                    {
                        value: 1,
                        desc: 'registered, home network',
                    },
                    {
                        value: 2,
                        desc: 'not registered, but the MT is currently trying to attach or searching an operator to register to',
                    },
                    {
                        value: 3,
                        desc: 'registration denied',
                    },
                    {
                        value: 4,
                        desc: 'unknown',
                    },
                    {
                        value: 5,
                        desc: 'registered, roaming',
                    },
                    {
                        value: 6,
                        desc: 'attached for emergency bearer services only',
                    },
                ],
            },
            tac: {
                title: 'Two bytes tracking area code in hexadecimal format',
            },
            ci: {
                title: 'Four bytes E-UTRAN cell-id in hexadecimal format',
            },
            AcT: {
                title: 'Access technology of the serving cell',
                values: [
                    {
                        value: 0,
                        desc: 'GSM',
                    },
                    {
                        value: 3,
                        desc: 'GSM/GPRS with EDGE',
                    },
                    {
                        value: 7,
                        desc: 'E-UTRAN',
                    },
                    {
                        value: 8,
                        desc: 'E-UTRAN EC-GSM-IoT',
                    },
                    {
                        value: 9,
                        desc: 'E-UTRAN Cat NB1',
                    },
                ],
            },
        },
    },
    CESQ: {
        title: 'Extended signal quality',
    },
    CIEV: {
        title: 'Mobile termination event reporting (URC)',
    },
    CFUN: {
        title: 'Set module functionality',
        parameters: {
            set: ['fun', 'rst'],
            read: ['power_mode', 'STK_mode'],
            fun: {
                title: 'Selected functionality',
                values: [
                    {
                        value: 0,
                        desc: 'sets the MT to minimum functionality (disable both transmit and receive RF circuits by deactivating both CS and PS services)',
                    },
                    {
                        value: 1,
                        desc: 'sets the MT to full functionality, e.g. from airplane mode or minimum functionality',
                    },
                                            {
                        value: 4,
                        desc: 'disables both transmit and receive RF circuits by deactivating both CS and PS services and sets the MT into airplane mode. Airplane mode is persistent between power cycles triggered by AT+CFUN=15, AT+CFUN=16 or AT+CPWROFF (where supported).',
                    },
                    {
                        value: 6,
                        desc: 'enables the SIM toolkit interface in dedicated mode and fetching of proactive commands by SIM Application Toolkit from the SIM card',
                    },
                    {
                        values: [7, 8],
                        desc: 'disables the SIM toolkit interface and fetching of proactive commands by SIM Application Toolkit from the SIM card',
                    },
                    {
                        value: 9,
                        desc: 'enables the SIM toolkit interface in raw mode and fetching of proactive commands by SIM Application Toolkit from the SIM card',
                    },
                    {
                        value: 10,
                        desc: ' fast and safe power-off, the command triggers a fast shutdown where the flash memory is closed right away and no further files are saved to the memory, cached settings are discarded and not saved. The "OK" final result code indicates the command request was successful, while the +UUFASTSHUTDOWN URC provides the status of the power-off process.',
                    },
                    {
                        value: 15,
                        desc: 'MT silent reset (with detach from network and saving of NVM parameters), without reset of the SIM card',
                    },
                    {
                        value: 16,
                        desc: 'MT silent reset (with detach from network and saving of NVM parameters), with reset of the SIM card',
                    },
                    {
                        value: 19,
                        desc: 'sets the MT to minimum functionality by deactivating CS and PS services and the SIM card',
                    },
                ],
            },
            rst: {
                title: 'Reset mode',
                values: [
                    {
                        value: 0,
                        desc: 'do not reset the MT before setting it to the selected <fun>',                            
                    },
                    {
                        value: 1,
                        desc: 'performs a MT silent reset (with detach from network and saving of NVM parameters) with reset of the SIM card before setting it to the selected <fun>',
                    },
                ],
            },
            power_mode: {
                title: 'Power mode',
                values: [
                    {
                        value: 0,
                        desc: 'MT is switched on with minimum functionality',                            
                    },
                    {
                        value: 1,
                        desc: 'MT is switched on',                            
                    },
                    {
                        value: 4,
                        desc: 'MT is in airplane mode',
                    },
                    {
                        value: 19,
                        desc: 'MT is in minimum functionality with SIM deactivated',
                    },

                ]
            },
            STK_mode: {
                title: 'SIM toolkit mode',
                values: [
                    {
                        value: 6,
                        desc: 'the SIM-toolkit interface in dedicated mode and fetching of proactive commands by SIM-APPL from the SIM-card are enabled',
                    },
                    {
                        values: [0, 7, 8],
                        desc: 'the SIM-toolkit interface is disabled; fetching of proactive commands by SIM-APPL from the SIM-card is enabled',
                    },
                    {
                        value: 9,
                        desc: 'the SIM-toolkit interface in raw mode and fetching of proactive commands by SIM-APPL from the SIM-card are enabled',
                    },
                ],
            },
        },
    },
    CGACT: {
        title: 'PDP context activate or deactivate',
    },
    CGATT: {
        title: 'GPRS attach or detach',
    },
    CGDATA: {
        title: 'Enter data state',
    },
    CGDCONT: {
        title: 'PDP context definition',
    },
    CGEREP: {
        title: 'Packet switched event reporting',
    },
    CGPADDR: {
        title: 'Show PDP address',
    },
    CGMI: {
        title: 'Manufacturer identification',
    },
    CGMM: {
        title: 'Model identification',
    },
    CGCMOD: {
        title: 'PDP context modify',
    },
    CGMR: {
        title: 'Firmware version identification',
    },
    CGREG: {
        title: 'GPRS network registration status',
        parameters: {
            set: ['n'],
            read: ['n', 'stat', 'lac', 'ci', 'AcT', 'rac'],
            URC: ['stat', 'lac', 'ci', 'AcT', 'rac'],
            n: {
                title: 'Mode configuration',
                values: [
                    {
                        value: 0,
                        desc: 'network registration URC disabled',
                    },
                    {
                        value: 1,
                        desc: 'network registration URC enabled',
                    },
                    {
                        value: 2,
                        desc: 'network registration and location information URC enabled',
                    },
                ],
            },
            stat: {
                title: 'EPS registration status',
                values: [
                    {
                        value: 0,
                        desc: 'not registered',
                    },
                    {
                        value: 1,
                        desc: 'registered, home network',
                    },
                    {
                        value: 2,
                        desc: 'not registered, but the MT is currently searching a new operator to register to',
                    },
                    {
                        value: 3,
                        desc: 'registration denied',
                    },
                    {
                        value: 4,
                        desc: 'unknown',
                    },
                    {
                        value: 5,
                        desc: 'registered, roaming',
                    },
                    {
                        value: 8,
                        desc: 'attached for emergency bearer service only',
                    },
                ],
            },
            lac: {
                title: 'Two bytes location area code or tracking area code',
            },
            ci: {
                title: '2 or 4 byte E-UTRAN cell-id in hexadecimal format',
            },
            AcT: {
                title: 'Radio access technology',
                values: [
                    {
                        value: 0,
                        desc: 'GSM',
                    },
                    {
                        value: 1,
                        desc: 'GSM COMPACT',
                    },
                    {
                        value: 2,
                        desc: 'UTRAN',
                    },
                    {
                        value: 3,
                        desc: 'GSM/GPRS with EDGE availability',
                    },
                    {
                        value: 4,
                        desc: 'UTRAN with HSDPA availability',
                    },
                    {
                        value: 5,
                        desc: ' UTRAN with HSUPA availability',
                    },
                    {
                        value: 6,
                        desc: 'UTRAN with HSDPA and HSUPA availability',
                    },
                    {
                        value: 7,
                        desc: 'E-UTRAN',
                    },
                    {
                        value: 255,
                        desc: 'invalid',
                    },
                ],
            },
            rac: {
                title: 'One byte routing area in hexadecimal format',
            },
        },               
    },
    CGSN: {
        title: 'Request product serial number identification (IMEI)',
        desc: 'Returns the International Mobile station Equipment Identity (IMEI) number',
    },
    CIMI: {
        title: 'International mobile subscriber identification (IMSI)',
        desc: 'Request the IMSI (International Mobile Subscriber Identity).',
    },
    CIND: {
        title: 'Indicator control',
    },
    CMEE: {
        title: 'Report mobile termination error',
    },
    CMER: {
        title: 'Mobile termination event reporting',
    },
    CMUX: {
        title: 'Multiplexing mode',
    },
    COPN: {
        title: 'Read operator names',
    },
    COPS: {
        title: 'Operator selection',
        parameters: {
            set: ['mode', 'format'],
            read: ['mode', 'format', 'oper', 'AcT'],
            mode: {
                title: 'operation selection mode',
                values: [
                    {
                        value: 0,
                        desc: 'factory default',
                    },
                    {
                        value: 1,
                        desc: 'manual',
                    },
                    {
                        value: 2,
                        desc: 'deregister from network',
                    },
                    {
                        value: 3,
                        desc: 'set only format',
                    },
                    {
                        value: 4,
                        desc: 'manual/automatic',
                    },
                    {
                        value: 5,
                        desc: 'extended network search',
                    },
                    {
                        value: 6,
                        desc: 'extended network search without the tags ',
                    },
                    {
                        value: 8,
                        desc: 'network timing advance search',
                    },
                ],
            },
            format: {
                title: 'operator format',
                values: [
                    {
                        value: 0,
                        desc: 'factory default',
                    },
                    {
                        value: 1,
                        desc: 'short format alphanumeric',
                    },
                    {
                        value: 2,
                        desc: 'numeric oper',
                    },
                ],
            },
            oper: {
                title: 'Operator',
                valueDecoder: async function(params) {
                    let value = params.value;
                    let mcc = 0, mnc = 0;

                    if (value.length == 5) {
                        mcc = parseInt(value.substring(0, 3));
                        mnc = parseInt(value.substring(3, 5));
                    }
                    else
                    if (params.value.length == 6) {
                        mcc = parseInt(value.substring(0, 3));
                        mnc = parseInt(value.substring(3, 6));
                    }
                    if (mcc && mnc) {
                        const mccMncObj = logDecoder.mccMncJson.find(e => e.mcc == mcc && e.mnc == mnc);
                        if (mccMncObj) {
                            value = mccMncObj.name + ' ' + mccMncObj.country + ' (' + value + ')';
                         }
                    }
                    return value;                    
                },
            },
            AcT: {
                title: 'Radio access technology',
                values: [
                    {
                        value: 0,
                        desc: 'GSM',
                    },
                    {
                        value: 1,
                        desc: 'GSM COMPACT',
                    },
                    {
                        value: 2,
                        desc: 'UTRAN',
                    },
                    {
                        value: 3,
                        desc: 'GSM/GPRS with EDGE availability',
                    },
                    {
                        value: 4,
                        desc: 'UTRAN with HSDPA availability',
                    },
                    {
                        value: 5,
                        desc: ' UTRAN with HSUPA availability',
                    },
                    {
                        value: 6,
                        desc: 'UTRAN with HSDPA and HSUPA availability',
                    },
                    {
                        value: 7,
                        desc: 'LTE', // Always returned for R510
                    },
                    {
                        value: 8,
                        desc: 'EC-GSM-IoT (A/Gb mode)',
                    },
                    {
                        value: 9,
                        desc: ' E-UTRAN (NB-S1 mode)',
                    },

                ],
            }
        },
    },
    CPIN: {
        title: 'Enter PIN',
    },
    CPLS: {
        title: 'Preferred PLMN list selection',
    },
    CPOL: {
        title: 'Preferred operator list',
    },
    CPWROFF: {
        title: 'Module switch off',
    },
    CREG: {
        title: 'Network registration status',
        parameters: {
            set: ['n'],
            read: ['n', 'stat', 'lac', 'ci', 'AcTStatus'],
            URC: ['n', 'stat', 'lac', 'ci', 'AcTStatus'],
            n: {
                title: 'Mode configuration',
                values: [
                    {
                        value: 0,
                        desc: 'network registration URC disabled',
                    },
                    {
                        value: 1,
                        desc: 'network registration URC enabled',
                    },
                    {
                        value: 2,
                        desc: 'network registration and location information URC enabled',
                    },
                ],
            },
            stat: {
                title: 'EPS registration status',
                values: [
                    {
                        value: 0,
                        desc: 'not registered',
                    },
                    {
                        value: 1,
                        desc: 'registered, home network',
                    },
                    {
                        value: 2,
                        desc: 'not registered, but the MT is currently searching a new operator to register to',
                    },
                    {
                        value: 3,
                        desc: 'registration denied',
                    },
                    {
                        value: 4,
                        desc: 'unknown',
                    },
                    {
                        value: 5,
                        desc: 'registered, roaming',
                    },
                    {
                        value: 6,
                        desc: 'registered for SMS only, home network',
                    },
                    {
                        value: 7,
                        desc: 'registered for SMS only, roaming',
                    },
                    {
                        value: 9,
                        desc: 'registered for CSFB not preferred, home network',
                    },
                    {
                        value: 10,
                        desc: 'registered for CSFB not preferred, roaming',
                    },
                ],
            },
            lac: {
                title: 'Two bytes location area code or tracking area code',
            },
            ci: {
                title: '2 or 4 byte E-UTRAN cell-id in hexadecimal format',
            },
            AcTStatus: {
                title: 'Radio access technology',
                values: [
                    {
                        value: 0,
                        desc: 'GSM',
                    },
                    {
                        value: 1,
                        desc: 'GSM COMPACT',
                    },
                    {
                        value: 2,
                        desc: 'UTRAN',
                    },
                    {
                        value: 3,
                        desc: 'GSM/GPRS with EDGE availability',
                    },
                    {
                        value: 4,
                        desc: 'UTRAN with HSDPA availability',
                    },
                    {
                        value: 5,
                        desc: ' UTRAN with HSUPA availability',
                    },
                    {
                        value: 6,
                        desc: 'UTRAN with HSDPA and HSUPA availability',
                    },
                    {
                        value: 7,
                        desc: 'E-UTRAN',
                    },
                    {
                        value: 255,
                        desc: 'invalid',
                    },
                ],
            },
        },        
    },
    CRSM: {
        title: 'Restricted SIM access',
    },
    CSCS: {
        title: 'TE character set configuration',
    },
    CSIM: {
        title: 'Generic SIM access',
    },
    CSQ: {
        title: 'Signal quality',
    },
    GMI: {
        title: 'Manufacturer identification',
    },
    GMM: {
        title: 'Model identification',
    },
    GMR: {
        title: 'Firmware version identification',
    },
    GSN: {
        title: 'IMEI identification',
    },
    IPR: {
        title: 'UART data rate configuration',
    },
    PACSP: {
        title: 'Network selection control',
    },
    UBANDMASK: {
        title: 'Band selection bitmask',
        render: async function(params) {
            let bands = [];
            for(let band = 1; band < 128; band++) {
                let bit; 

                if (band <= 64) {
                    bit = ((params.commaList[1] >> (band - 1)) & 1) != 0;
                }
                else {
                    bit = ((params.commaList[2] >> (band - 65)) & 1) != 0;
                }
                if (bit) {
                    bands.push('B' + band);
                }
            }
            const divElem = document.createElement('div');
            $(divElem).text(bands.join(', '));
            $(params.commandDivElem).append(divElem);
        }
    },
    UCELLINFO: {
        title: 'Provide cell information',
    },
    UCGED: {
        title: 'Channel and network environment description',
    },
    UDOPN: {
        title: 'Display operator name',
    },
    UECLS: {
        title: 'Coverage enhancement levels setting',
    },
    UGPIOC: {
        title: 'GPIO select configuration command',
        render: async function(params) {
            if (!params.lineObj.command.nonPlusObj) {
                return;
            }

            let tableParams = {
                columns: [
                    {
                        title: 'GPIO Number',
                    },
                    {
                        title: 'GPIO Mode',
                    },
                ],
                rows: [],
            };

                            for(const lineObj of params.lineObj.command.nonPlusObj) {
                const values = lineObj.msg.split(',');

                let row = [];

                row.push(values[0]);
                row.push(logUserInterface.valueLookup(parseInt(values[1]), params.lineObj.command.info.gpioModes));

                tableParams.rows.push(row);
            }

            $(params.commandDivElem).append(logUserInterface.renderTable(tableParams));
        },
        gpioModes: [
            {
                value: 0,
                desc: 'output',
            },
            {
                value: 1,
                desc: 'input',
            },
            {
                value: 2,
                desc: 'network status indication',
            },
            {
                value: 3,
                desc: 'external GNSS supply enable',
            },
            {
                value: 4,
                desc: 'external GNSS data ready',
            },
            {
                value: 5,
                desc: 'external GNSS RTC sharing',
            },
            {
                value: 6,
                desc: 'jamming detection indication',
            },
            {
                value: 7,
                desc: 'SIM card detection',
            },
            {
                value: 8,
                desc: 'headset detection',
            },
            {
                value: 9,
                desc: 'GMS Tx burst indication',
            },
            {
                value: 10,
                desc: 'module status indication',
            },
            {
                value: 11,
                desc: 'module operating mode indication',
            },
            {
                value: 12,
                desc: 'I2S digital audio interface',
            },
            {
                value: 13,
                desc: 'SPI serial interface',
            },
            {
                value: 14,
                desc: 'master clock generation',
            },
            {
                value: 15,
                desc: 'UART (DSR, DTR, DCD e RI) interface',
            },
            {
                value: 16,
                desc: 'Wi-Fi enable',
            },
            {
                value: 18,
                desc: 'ring indicator',
            },
            {
                value: 19,
                desc: 'last gasp',
            },
            {
                value: 20,
                desc: 'external GNSS antenna/LNA control enable',
            },
            {
                value: 21,
                desc: 'time pulse GNSS',
            },
            {
                value: 22,
                desc: 'time pulse output',
            },
            {
                value: 23,
                desc: 'time stamp of external interrupt',
            },
            {
                value: 24,
                desc: 'fast and safe power-off',
            },
            {
                value: 25,
                desc: 'LwM2M pulse',
            },
            {
                value: 26,
                desc: 'hardware flow control (RTS, CTS)',
            },
            {
                value: 27,
                desc: 'antenna dynamic tuning',
            },
            {
                value: 28,
                desc: 'external GNSS time pulse input',
            },
            {
                value: 29,
                desc: 'external GNSS timestamp of external input',
            },
            {
                value: 30,
                desc: 'DTR mode for power saving control',
            },
            {
                value: 32,
                desc: '32.768 kHz output',
            },
            {
                value: 255,
                desc: 'pad disabled',
            },
        ],
    },
    UGPIOR: {
        title: 'GPIO read command',
        parameters: {
            set: ['gpio_id', 'gpio_val'],
            gpio_id: {
                title: 'GPIO pin number',
            },
            gpio_val: {
                title: 'GPIO value (0 or 1)',
            },
        },
    },
    UMNOPROF: {
        title: 'Set MNO profile',
        parameters: {
            read: ['mno'],
            set: ['mno'],
            mno: {
                title: 'Mobile Network Operator (MNO) profile',
                values: [
                    {
                        value: 0,
                        desc: 'undefined',
                    },
                    {
                        value: 1,
                        desc: 'SIM ICCID/IMSI select',
                    },
                    {
                        value: 2,
                        desc: 'AT&T',
                    },
                    {
                        value: 3,
                        desc: 'Verizon',
                    },
                    {
                        value: 90,
                        desc: 'global',
                    },
                    {
                        value: 100,
                        desc: 'standard Europe',
                    },
                    {
                        value: 201,
                        desc: 'conformance testing',
                    },
                ],
            },
        },
    },
    UPORTFWD: {
        title: 'Configure the port forwarding',
    },
    UPSD: {
        title: 'Packet switched data configuration',
    },
    UPSDA: {
        title: 'Packet switched data action',
    },
    UPSDN: {
        title: 'Packet switched network-assigned data',
    },
    UPSV: {
        title: 'Power saving control (Power Saving)',
    },
    URAT: {
        title: 'Radio Access Technology (RAT) selection',
    },
    URATCONF: {
        title: 'Radio manager configuration',
    },
    UUICC: {
        title: 'Check for UICC card',
    },
};

/*
                    {
                        value: ,
                        desc: '',
                    },
*/

logUserInterface.jsonFields = {
    deviceInfo: {
        fields: {
            band: {
                title: 'Cellular band',
            },
            cid: {
                title: 'Cell ID',
            },
            deviceId: {
                title: 'Device ID',
            },
            fwVersion: {
                title: 'Firmware version',
            },
            lac: {
                title: 'LAC (Location Area Code)',
            },
            mcc: {
                title: 'MCC (Mobile Country Code)',
            },
            mnc: {
                title: 'MNC (Mobile Network Code',
            },
            platform: {
                title: 'Device OS platform',
            },
            target: {
                title: 'Firmware target version',
            },
            sysVersion: {
                title: 'Device OS version on device',
            },
            serial: {
                title: 'Device serial number',
                valueDecoder: async function(params) {
                    let value = params.value;

                    let tableParams = {
                        banner: 'SKU information',
                        rows: [],
                    };

                    if (params.lineObj.skuObj) {

                        logUserInterface.rowsFromObject({
                            mapping: [
                                {
                                    key: 'name',
                                    title: 'SKU',
                                },
                                {
                                    key: 'desc',
                                    title: 'Description',
                                },
                                {
                                    key: 'lifecycle',
                                    title: 'Lifecycle',
                                },
                                {
                                    key: 'mcu',
                                    title: 'MCU',
                                },
                            ],
                            data: params.lineObj.skuObj,
                            rows: tableParams.rows,
                        });
                        
                        if (params.lineObj.skuObj.modem) {
                            let text = params.lineObj.skuObj.modem;

                            const modemObj = logDecoder.carriersJson.modems.find(e => e.model == params.lineObj.skuObj.modem);
                            if (modemObj) {
                                logDecoder.state.modemObj = modemObj;

                                text = modemObj.manufacturer + ' ' + modemObj.model + ' ' + modemObj.name;

                                tableParams.rows.push([
                                    'Cellular Modem Bands',
                                    modemObj.bands.join(', '),
                                ]);

                            }
                            
                            tableParams.rows.push([
                                'Cellular Modem Model',
                                text,
                            ]);
                        }
                    }


                    params.moreElem.push(logUserInterface.renderTable(tableParams));

                    return value;
                }
            },
            tech: {
                title: 'Cellular technology (RAT)',
            },
        },
    },
    deviceVitals: {
        fields: {
            'net:at': {
                title: 'Access Technology',
                showKey: true,
                valueDecoder: async function(params) {
                    let value = params.value;

                    let name;
                    switch(value) {
                        case 1: // NET_ACCESS_TECHNOLOGY_WIFI = 1,
                            name = 'Wi-Fi';
                            break;

                        case 2: // NET_ACCESS_TECHNOLOGY_GSM = 2,
                            name = 'GSM';
                            break;

                        case 3: // NET_ACCESS_TECHNOLOGY_EDGE = 3,
                            name = 'EDGE';
                            break;

                        case 4: // NET_ACCESS_TECHNOLOGY_UMTS = 4, NET_ACCESS_TECHNOLOGY_UTRAN, NET_ACCESS_TECHNOLOGY_WCDMA
                            name = 'UMTS';
                            break;

                        case 5: // NET_ACCESS_TECHNOLOGY_CDMA = 5,
                            name = 'CDMA';
                            break;

                        case 6: // NET_ACCESS_TECHNOLOGY_LTE = 6,
                            name = 'LTE';
                            break;

                        case 7: // NET_ACCESS_TECHNOLOGY_IEEE802154 = 7,
                            name = '802.15.4';
                            break;

                        case 8: // NET_ACCESS_TECHNOLOGY_LTE_CAT_M1 = 8,
                            name = 'LTE Cat M1';
                            break;

                        case 9: // NET_ACCESS_TECHNOLOGY_LTE_CAT_NB1 = 9,
                            name = 'LTE Cat NB1';
                            break;

                        default:
                        case 0: // NET_ACCESS_TECHNOLOGY_UNKNOWN, NET_ACCESS_TECHNOLOGY_NONE
                            name = 'unknown';
                            break;
                    }

                    if (name) {
                        value = name + ' (' + value + ')';
                    }

                    return value;
                },
            },
            'net:cell:cgi:ci': {
                title: 'Cell Identifier',
                showKey: true,
            },
            'net:cell:cgi:lac': {
                title: 'Location Area Code',
                showKey: true,
            },
            'net:cell:cgi:mcc': {
                title: 'Mobile Country Code',
                showKey: true,
                valueDecoder: async function(params) {
                    let value = params.value;

                    const mcc = params.lineObj.jsonData['net:cell:cgi:mcc'];
                    const mnc = params.lineObj.jsonData['net:cell:cgi:mnc'];
                    if (mcc && mnc) {
                        const mccMncObj = logDecoder.mccMncJson.find(e => e.mcc == mcc && e.mnc == mnc);
                        if (mccMncObj) {
                            value = mccMncObj.country + ' (' + value + ')';
                        }

                    }
                    return value;
                },
            },
            'net:cell:cgi:mnc': {
                title: 'Mobile Country Code',
                showKey: true,
                valueDecoder: async function(params) {
                    let value = params.value;

                    const mcc = params.lineObj.jsonData['net:cell:cgi:mcc'];
                    const mnc = params.lineObj.jsonData['net:cell:cgi:mnc'];
                    if (mcc && mnc) {
                        const mccMncObj = logDecoder.mccMncJson.find(e => e.mcc == mcc && e.mnc == mnc);
                        if (mccMncObj) {
                            value = mccMncObj.name + ' (' + value + ')';
                        }
                    }

                    return value;
                },
            },

            'sys:version': {
                title: 'Device OS version',
                showKey: true,
                valueDecoder: async function(params) {
                    let value = params.value;

                    const a = (value >> 24) & 0xff;
                    const b = (value >> 16) & 0xff;
                    const c = (value >> 8) & 0xff;
                    let d = (value >> 0) & 0xff;

                    let relType;
                    switch(c & 0xc0) {
                        case 0x80:
                            relType = 'rc';
                            d &= 0x3f;
                            break;

                        case 0x40:
                            relType = 'b';
                            d &= 0x3f;
                            break;

                        case 0x00:
                            if ((a == 0) || ((a == 1) && (b < 2))) {
                                // Prior to 1.2.0, all were RC if a was != 0
                                relType = 'rc';
                            }
                            else {
                                relType = 'a';
                            }
                            break;            
                    }

                    let valueStr;
                    if (relType && (d != 0xff)) {
                        valueStr = a + '.' + b + '.' + c + '.' + relType + d;
                    }
                    else {
                        valueStr = a + '.' + b + '.' + c;
                    }
                    return valueStr + ' (' + value + ')';
                },
            },
        },
    },
}; 

logUserInterface.saveLogAndSettings = function() {
    let settingsJson = {
        options: this.getOptions(),
        logs: logDecoder.getRawLogs(),
    };

    sessionStorage.setItem(logUserInterface.sessionStorageKey, JSON.stringify(settingsJson));
}

logUserInterface.loadLogAndSettings = async function() {
    let loaded = false;

    await logDecoder.loadedPromise;

    try {
        const s = sessionStorage.getItem(logUserInterface.sessionStorageKey);
        if (typeof s == 'string' && s.length >= 2) {
            const settingsJson = JSON.parse(s);
            if (settingsJson.options) {
                logUserInterface.setOptions(settingsJson.options);
            }
            if (settingsJson.logs) {
                $('.logDecoderInputTextArea').val(settingsJson.logs);
                $('.logDecoderInputTextArea').trigger('input');
            }
            loaded = true;
        }
    } 
    catch(e) {
        console.log('loadLogAndSettings exception', e);
    }
    if (!loaded) {
        // This is necessary to display the text field
        $('.logDecoderInputSelect').trigger('change');
    }
}

logUserInterface.deferredSave = function() {
    if (logUserInterface.deferredSaveTimer) {
        clearTimeout(logUserInterface.deferredSaveTimer);
        logUserInterface.deferredSaveTimer = 0;
    }

    logUserInterface.deferredSaveTimer = setTimeout(function() {
        logUserInterface.saveLogAndSettings();
    }, 5000);
}


logUserInterface.optionChanged = async function() {    
    logUserInterface.getOptions();
    await logUserInterface.render();    

    // render() calls deferredSave()
}


logUserInterface.setupHandlers = function() {
    $('.logDecoderOption').each(function() {
        const tagName = $(this).prop('tagName').toLowerCase();
        const inputType = $(this).attr('type');
        // const key = $(this).data('key');
        let action;
        
        if (tagName == 'select') {
            action = 'change';
        }
        else
        if (tagName == 'input') {
            switch(inputType) {
                case 'checkbox': {
                    action = 'click';
                    break;
                }
                default:
                    break;
            }

        }

        if (action) {
            $(this).on(action, logUserInterface.optionChanged);
        }
    });

    if ($('.logDecoderInputOptionsDiv').length) {
        // Has input options
        $('.logDecoderInputSelect').on('change', function() {
            const which = $('.logDecoderInputSelect').val();
            
            $('.logDecoderInputDiv').hide();
            $('.logDecoderInputDiv[data-which="' + which + '"]').show();
        });

        $('.logDecoderInputFileButton').on('click', function() {
            $('.logDecoderInputFile').trigger('click');

        });

        $('.logDecoderInputFile').on('change', function() {
            const files = this.files;

            let fileReader = new FileReader();
            fileReader.onload = async function() {     
                // Possibly should fix line endings here               
                $('.logDecoderInputTextArea').val(fileReader.result);
                $('.logDecoderInputTextArea').trigger('input');
            };
            fileReader.readAsText(files[0]);

        });

        if (navigator.serial) {
            $('.logDecoderWebSerialConnectButton').prop('disabled', false);

        }
        else {
            $('.logDecoderWebSerialNotSupported').show();
        }


        $('.logDecoderWebSerialConnectButton').on('click', async function() {        
            $('.logDecoderWebSerialConnectButton').prop('disabled', true);
            $('.logDecoderWebSerialDisconnectButton').prop('disabled', true);

            logDecoder.webSerialConn = logUserInterface.newWebSerialConnection();
            if (await logDecoder.webSerialConn.connect()) {
                // Successfully opened
                $('.logDecoderWebSerialDisconnectButton').prop('disabled', false);
            }

            logDecoder.webSerialConn.onReceive = async function(s) {
                // console.log('webSerial receive', s);

                // Remove CRs so lines are only LF terminated
                s = s.replaceAll('\r', '');

                await logDecoder.parse(s);
                await logUserInterface.renderIncremental();
            }
        });

        $('.logDecoderWebSerialDisconnectButton').on('click', function() {
            $('.logDecoderWebSerialConnectButton').prop('disabled', false);
            $('.logDecoderWebSerialDisconnectButton').prop('disabled', true);
            logDecoder.webSerialConn.disconnect();
        });


        if (navigator.bluetooth) {
            $('.logDecoderWebBLEConnectButton').prop('disabled', false);

        }
        else {
            $('.logDecoderWebBLENotSupported').show();
        }


        $('.logDecoderWebBLEConnectButton').on('click', async function() {        
            $('.logDecoderWebBLEConnectButton').prop('disabled', true);
            $('.logDecoderWebBLEDisconnectButton').prop('disabled', true);

            logDecoder.webBLEConn = logUserInterface.newWebBLEConnection();
            if (await logDecoder.webBLEConn.connect()) {
                // Successfully opened
                $('.logDecoderWebBLEDisconnectButton').prop('disabled', false);
            }

            logDecoder.webBLEConn.onReceive = async function(s) {
                // console.log('webSerial receive', s);

                // Remove CRs so lines are only LF terminated
                s = s.replaceAll('\r', '');

                await logDecoder.parse(s);
                await logUserInterface.renderIncremental();
            }
        });

        $('.logDecoderWebBLEDisconnectButton').on('click', function() {
            $('.logDecoderWebBLEConnectButton').prop('disabled', false);
            $('.logDecoderWebBLEDisconnectButton').prop('disabled', true);
            logDecoder.webBLEConn.disconnect();
        });

    }
}


logUserInterface.getOptions = function() {

    // <td><label><input type="checkbox" class="logDecoderOption" data-key="showTrace" check/>Show trace logs</label></td>

    logDecoder.state.options = {};

    $('.logDecoderOption').each(function() {
        const tagName = $(this).prop('tagName').toLowerCase();
        const inputType = $(this).attr('type');
        const key = $(this).data('key');
    

        if (tagName == 'select') {
            logDecoder.state.options[key] = $(this).val();
        }
        else
        if (tagName == 'input') {
            switch(inputType) {
                case 'checkbox':
                    logDecoder.state.options[key] = $(this).prop('checked');
                    break;

                default:
                    logDecoder.state.options[key] = $(this).val();
                    break;
            }

        }
    });

    return logDecoder.state.options;
}

logUserInterface.setOptions = function(options) {
    if (typeof options == 'undefined') {
        options = logDecoder.state.options;
    }

    $('.logDecoderOption').each(function() {
        const tagName = $(this).prop('tagName').toLowerCase();
        const inputType = $(this).attr('type');
        const key = $(this).data('key');
        
        if (tagName == 'select') {
            $(this).val(options[key]);
            $(this).trigger('change');
        }
        else
        if (tagName == 'input') {
            switch(inputType) {
                case 'checkbox':
                    $(this).prop('checked', options[key]);
                    break;

                default:
                    $(this).val(options[key]);
                    break;
            }
        }
    });
    
}

logUserInterface.renderIncremental = async function() {
    const renderOptions = {
        afterLine: logDecoder.state.lastRenderLineNum,
    };

    await logUserInterface.render(renderOptions);
}

logUserInterface.render = async function(renderOptions = {}) {

    // console.log('logUserInterface.render', logDecoder.state);

    if (!logDecoder.state.options) {
        logDecoder.state.options = {};
    }

    logUserInterface.deferredSave();

    if (typeof renderOptions.afterLine == 'undefined') {
        $(logUserInterface.outputElem).empty();
    }

    for(const lineObj of logDecoder.state.lines) {
        if (typeof renderOptions.afterLine != 'undefined') {
            if (lineObj.lineNum <= renderOptions.afterLine) {
                continue;
            }
        }

        if (logDecoder.state.options.hideTrace) {
            if (lineObj.level == 'TRACE') {
                continue;
            }
        }

        const divElem = document.createElement('div');
        $(divElem).addClass('logDecoderMessageDiv');
        
        const preElem = document.createElement('pre');
        $(preElem).addClass('logDecoderMessage');
        $(preElem).text(lineObj.orig);
        $(divElem).append(preElem);

        if (lineObj.command) {
            if (!lineObj.command.info) {
                lineObj.command.info = logUserInterface.commandInfo[lineObj.command.cmd || lineObj.command.urc];
            }

            // Decoded AT command
            const commandDivElem = document.createElement('div');
            $(commandDivElem).addClass('logDecoderCommandInfo');

            if (lineObj.command.info && !logDecoder.state.options.hideDecoded) {
                if (lineObj.command.info.title) {
                    const tempElem = document.createElement('div');
                    $(tempElem).text(lineObj.command.info.title + ' (' + lineObj.command.atKind + ')');
                    $(commandDivElem).append(tempElem);
                }
                if (lineObj.command.info.desc) {
                    const tempElem = document.createElement('div');
                    $(tempElem).text(lineObj.command.info.desc)
                    $(commandDivElem).append(tempElem);
                }
                let commaList;
                if (lineObj.command.atKind == 'set') {
                    commaList = lineObj.command.sendCommaList;
                }
                else {
                    commaList = lineObj.command.commaList;
                }

                // console.log('render', {parameters: lineObj.command.info.parameters, commaList, atKind: lineObj.command.atKind, lineObj,});

                if (lineObj.command.info.render) {
                    await lineObj.command.info.render({
                        lineObj,
                        commaList,
                        commandDivElem,
                    });
                }
                else
                if (lineObj.command.info.parameters && lineObj.command.info.parameters[lineObj.command.atKind] && commaList && commaList.length) {
                    let params = {
                        rows: [],
                    };

                    for(let ii = 0; ii < commaList.length && ii < lineObj.command.info.parameters[lineObj.command.atKind].length; ii++) {
                        let row = [];

                        const paramInfoObj = lineObj.command.info.parameters[lineObj.command.info.parameters[lineObj.command.atKind][ii]];

                        let paramName = lineObj.command.info.parameters[lineObj.command.atKind][ii];
                        if (paramInfoObj && paramInfoObj.title) {
                            paramName = paramInfoObj.title + ' (' + paramName  + ')';
                        }

                        row.push(paramName);
                        row.push(commaList[ii]);

                        let desc = '';

                        if (paramInfoObj) {
                            if (paramInfoObj.values) {
                                let valueObj;

                                for(let jj = 0; jj < paramInfoObj.values.length; jj++) {
                                    if (paramInfoObj.values[jj].value && paramInfoObj.values[jj].value == commaList[ii]) {
                                        valueObj = paramInfoObj.values[jj];
                                    }
                                    else
                                    if (paramInfoObj.values[jj].values && paramInfoObj.values[jj].values.includes(commaList[ii])) {
                                        valueObj = paramInfoObj.values[jj];
                                    }
                                }
                                
                                // const valueObj = paramInfoObj.values.find(e => e.value == commaList[ii]);                                    
                                if (valueObj) {
                                    desc = valueObj.desc;
                                }
                            }
                            if (!desc && paramInfoObj.valueDecoder) {
                                desc = await paramInfoObj.valueDecoder({
                                    value: commaList[ii],
                                    paramInfoObj,
                                    ii,
                                    commaList,
                                });
                            }

                            if (!desc && paramInfoObj.title) {
                                desc = paramInfoObj.title;
                            }                        
                        }


                        row.push(desc);

                        params.rows.push(row);
                    }

                    $(commandDivElem).append(logUserInterface.renderTable(params));

                }
            }

            $(divElem).append(commandDivElem);
        }

        if (lineObj.jsonData && !logDecoder.state.options.hideDecoded) {
            // Firmware sent up a blob of JSON data, decode it here
            const infoDivElem = document.createElement('div');
            $(infoDivElem).addClass('commandInfo');

            const fieldDesc = logUserInterface.jsonFields[lineObj.jsonDataKey];

            let params = {
                rows: [],
                moreElem: [],
            };

            for(const key in lineObj.jsonData) {
                let name = key;
                if (fieldDesc.fields[key]) {
                    name = fieldDesc.fields[key].title;
                    if (fieldDesc.fields[key].showKey) {
                        name += ' (' + key + ')';
                    }
                }

                let text = lineObj.jsonData[key];
                if (fieldDesc.fields[key]) {
                    if (fieldDesc.fields[key].valueDecoder) {
                        text = await fieldDesc.fields[key].valueDecoder({
                            value: text, 
                            fieldDesc, 
                            key, 
                            fieldDescField: fieldDesc.fields[key],
                            lineObj,
                            rows: params.rows,
                            moreElem: params.moreElem,
                        });
                    }
                }                   

                if (typeof text == 'object') {
                    text = JSON.stringify(text);
                }

                params.rows.push([name, text]);
            }
            $(infoDivElem).append(logUserInterface.renderTable(params));

            for(const elem of params.moreElem) {
                $(infoDivElem).append(elem);
            }

            $(divElem).append(infoDivElem);

        }

        $(logUserInterface.outputElem).append(divElem);
    }
    if (logDecoder.state.lines.length > 0) {
        logDecoder.state.lastRenderLineNum = logDecoder.state.lines[logDecoder.state.lines.length - 1].lineNum;
    }

}

logUserInterface.rowsFromObject = function(params) {
    // params.mapping: array of objects
    //    key
    //    title
    // params.data: object to read from
    // params.rows: array to append to

    for(const mappingObj of params.mapping) {
        if (params.data[mappingObj.key]) {
            params.rows.push([
                mappingObj.title,
                params.data[mappingObj.key],
            ]);
        }
    }


}

logUserInterface.renderTable = function(params) {
    const outerDivElem = document.createElement('div');

    if (params.banner) {
        const divElem = document.createElement('div');
        $(divElem).addClass('logDecoderTableBanner')
        $(divElem).text(params.banner);
        $(outerDivElem).append(divElem);
    }


    const tableElem = document.createElement('table');
    $(tableElem).addClass('apiHelperTableNoMargin');

    {
        const theadElem = document.createElement('thead');

        if (params.columns) {
            const trElem = document.createElement('tr');
            
            for(const columnObj of params.columns) {
                const thElem = document.createElement('th');
                if (columnObj.title) {
                    $(thElem).text(columnObj.title);
                }
                $(trElem).append(thElem);
            }
            $(theadElem).append(trElem);
        }

        $(tableElem).append(theadElem);
    }
    {
        const tbodyElem = document.createElement('tbody');

        if (params.rows) { // An array of rows
            for(const row of params.rows) {
                const trElem = document.createElement('tr');
                
                if (Array.isArray(row)) {
                    // row is an array of columns
                    for(const col of row) {
                        const tdElem = document.createElement('td');
                        $(tdElem).text(col);
                        $(trElem).append(tdElem);
                    }
                }
                else {
                    // row is object, keys in columns
                    for(const columnObj of params.columns) {
                        const tdElem = document.createElement('td');
                        let text = row[columnObj.key];
                        if (text) {
                            $(tdElem).text(text);
                        }
                        $(trElem).append(tdElem);
                    }
                }

                $(tbodyElem).append(trElem);
            }
        }

        $(tableElem).append(tbodyElem);
    }
    $(outerDivElem).append(tableElem);

    return outerDivElem;
}


logUserInterface.valueLookup = function(value, array) {
    const arrayObj = array.find(e => e.value == value);
    if (arrayObj) {
        if (arrayObj.desc) {
            value = arrayObj.desc + ' (' + value + ')';
        }
    }

    return value;
}



logUserInterface.newWebSerialConnection = function(options) {
    let conn = {};

    conn.options = options || {};

    conn.handleConnection = async function() {
        try {
            // const { usbProductId, usbVendorId } = port.getInfo();   
            navigator.serial.addEventListener('connect', conn.reconnectHandler);
            conn.keepReading = true;

            await conn.port.open({ baudRate: 115200 });

            const textDecoder = new TextDecoderStream();
            const readableStreamClosed = conn.port.readable.pipeTo(textDecoder.writable);

            if (conn.onConnect) {
                conn.onConnect();
            }

            while (conn.port.readable && conn.keepReading) {
                conn.reader = textDecoder.readable.getReader();

                try {
                    while (true) {
                        const { value, done } = await conn.reader.read();
                        if (done) {
                            break;
                        }
                        if (conn.onReceive) {
                            await conn.onReceive(value);
                        }
                    }    
                }
                catch(e) {
                    conn.reader.cancel();
                }
                finally {
                    conn.reader.releaseLock();
                }
            }

            await readableStreamClosed.catch(() => {});

            await conn.port.close();

            if (conn.onDisconnect) {
                // if keepReading == true then will attempt to reconnect
                conn.onDisconnect(conn.keepReading);
            }
        }
        catch(e) {
            console.log('exception in WebSerial handleConnection', e);
        }


    };
    conn.connect = async function(connectOptions) {
        let connected = false;

        let filters = [
            { usbVendorId: 0x2b04 },  // Particle devices
        ];
        
        conn.port = null;

        try {
            conn.port = await navigator.serial.requestPort({ filters });

            // Don't await so handleConnection continues to run in the background
            conn.handleConnection();   
            connected = true;     
        }
        catch(e) {
            console.log('exception opening webserial', e);
            if (conn.onCancelConnect) {
                conn.onCancelConnect();
            }        
        }
        return connected;
    };

    conn.reconnectHandler = async function(event) {
        conn.port = event.target;
        conn.handleConnection();
    };

    conn.sendString = async function(str) {

        const encoder = new TextEncoder();
        const writer = conn.port.writable.getWriter();
        await writer.write(encoder.encode(str));
        writer.releaseLock();
    };


    conn.disconnect = async function() {
        if (conn.port.readable && conn.reader) {
            conn.reader.cancel();
            conn.keepReading = false;    
        }
        else {
            if (conn.onWillNotReconnect) {
                conn.onWillNotReconnect();
            }
        }

        navigator.serial.removeEventListener('connect', conn.reconnectHandler);
    };

    return conn;
};

logUserInterface.newWebBLEConnection = function(options) {
    let conn = {};

    const setStatus = function(s) {
        $('.logDecoderStatusBLE').text(s);
    }

    conn.options = options || {};

    conn.handleNotifications = async function(event) {
        const value = event.target.value;

        const decoder = new TextDecoder('utf-8');

        const text = decoder.decode(value.buffer);
        if (conn.onReceive) {
            await conn.onReceive(text);
        }
    }

    conn.onDisconnected = async function() {
        conn.device = null;
    };

    conn.connect = async function() {        
        try {
            setStatus('Requesting bluetooth device...');
            conn.device = await navigator.bluetooth.requestDevice({
                filters: [{services: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']}]});

            conn.device.addEventListener('gattserverdisconnected', conn.onDisconnected);

            setStatus('Connecting to GATT server...');
            const server = await conn.device.gatt.connect();
    
            setStatus('Initializing service...');
            const service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e');
    
            const txCharacteristic = await service.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e');
    
            await txCharacteristic.startNotifications();
    
            txCharacteristic.addEventListener('characteristicvaluechanged', conn.handleNotifications);
            
            conn.rxCharacteristic = await service.getCharacteristic('6e400002-b5a3-f393-e0a9-e50e24dcca9e');

            setStatus('');

        } catch(error) {
            setStatus(error);
        }                
    }
    return conn;
};
