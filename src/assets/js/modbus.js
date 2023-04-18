$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    if (!('serial' in navigator)) {
        $('.webSerialNotAvailable').show();
        return;
    }

    $('.webSerialAvailable').show();

    const createModbusHandler = function(elem) {
        let modbus = {
            elem,
            connectButtonElem: $(elem).find('.usbConnect'),
            baudRateInputElem: $(elem).find('.baudRateInput'),
            baudRateSelectElem: $(elem).find('.baudRateSelect'),
            connectedDivElem: $(elem).find('.connectedDiv'),
            rawHexRequestElem: $(elem).find('.rawHexRequest'),
            rawHexResponseElem: $(elem).find('.rawHexResponse'),
    
            isConnected: false,
        };
        $(elem).data('modbus', modbus);

        modbus.crc16 = function(ua) {
            // https://stackoverflow.com/questions/70916752/crc-16-checksum-calculator-with-vanilla-js
            let crc = 0xFFFF;
            let odd;
        
            for(const value of ua.values()) {
                crc = crc ^ value;
        
                for (let bit = 0; bit < 8; bit++) {
                    odd = crc & 0x0001;
                    crc = crc >> 1;
                    if (odd) {
                        crc = crc ^ 0xA001;
                    }
                }
            }
            
            // Note: This is 16-bits, but it goes on the wire LSB first (crc & 0xff) then (crc >> 8)
            return crc;
        };
        
        modbus.addRawHex = function(elem, ua) {
            for(const v of ua.values()) {
                const divElem = document.createElement('div');
                $(divElem).css('padding', '0px 3px 0px 3px');

                const hex = v.toString(16).padStart(2, '0');

                let tooltip = '';
                tooltip += '0x' + hex;
                tooltip += ', ' + v + ' (dec)';
                if (v >= 33 && v < 127) {
                    tooltip += ', ' + String.fromCharCode(v) + ' (ASCII)';
                }
                $(divElem).attr('title', tooltip);
                
                $(divElem).text(hex);

                $(elem).append(divElem);
            }
        };

        modbus.reconnectHandler = async function(event) {
            modbus.port = event.target;
            modbus.handleConnection();
        };
    
        modbus.sendString = async function(str) {
    
            const encoder = new TextEncoder();
            const writer = modbusport.writable.getWriter();
            const ua = encoder.encode(str);
            modbus.addRawHex(modbus.rawHexRequestElem, ua);
            await writer.write(ua);
            writer.releaseLock();
        };
    
        modbus.sendUint8Array = async function(ua) {
            const writer = modbus.port.writable.getWriter();
            modbus.addRawHex(modbus.rawHexRequestElem, ua);
            await writer.write(ua);
            writer.releaseLock();
        }
    
        modbus.disconnect = async function() {
            if (modbus.port.readable && modbus.reader) {
                modbus.reader.cancel();
                modbus.keepReading = false;    
            }
            else {
                if (modbus.onWillNotReconnect) {
                    modbus.onWillNotReconnect();
                }
            }
    
            navigator.serial.removeEventListener('connect', modbus.reconnectHandler);
        };

        modbus.clearRequestResponse = function() {
            $(modbus.rawHexRequestElem).empty();
            $(modbus.rawHexResponseElem).empty();
        };
    
        modbus.handleConnection = async function() {
            // const { usbProductId, usbVendorId } = port.getInfo();   
            navigator.serial.addEventListener('connect', modbus.reconnectHandler);
            modbus.keepReading = true;
            
            let baudRate = 0;
            try {
                baudRate = $(modbus.baudRateInputElem).val();
            }
            catch(e) {
            }
            if (baudRate < 300) {
                baudRate = 9600;
            }

            await modbus.port.open({ baudRate: baudRate });
        
            if (modbus.onConnect) {
                modbus.onConnect();
            }
            $(modbus.connectedDivElem).show();
            modbus.isConnected = true;
            $(modbus.connectButtonElem).prop('disabled', false);
            $(modbus.connectButtonElem).text('Disconnect');


            while (modbus.keepReading) {
                modbus.reader = modbus.port.readable.getReader();
    
                try {
                    while (true) {
                        const { value, done } = await modbus.reader.read();
                        if (done) {
                            break;
                        }
                        modbus.addRawHex(modbus.rawHexResponseElem, value);
                        if (modbus.onReceive) {
                            modbus.onReceive(value);
                        }
                    }    
                }
                catch(e) {
                    modbus.reader.cancel();
                }
                finally {
                    modbus.reader.releaseLock();
                }
            }
        
            await modbus.port.close();
    
            if (modbus.onDisconnect) {
                // if keepReading == true then will attempt to reconnect
                modbus.onDisconnect(modbus.keepReading);
            }        

            $(modbus.connectButtonElem).prop('disabled', false);
            $(modbus.connectButtonElem).text('Connect');

            $(modbus.connectedDivElem).hide();
        }

        modbus.setup = function() {

            $(modbus.connectButtonElem).on('click', async function() {
                $(modbus.connectButtonElem).prop('disabled', true);

                if (!modbus.isConnected) {
                    // Connect
                    const filters = [];
    
        
                    try {
                        modbus.port = await navigator.serial.requestPort({ filters });
                    
                        modbus.handleConnection();    
                    }
                    catch(e) {
                        if (e.toString().indexOf('No port selected') < 0) {
                            console.log('connect exception', e);
                            $(modbus.connectButtonElem).prop('disabled', false);
                        }
                    }    
                }
                else {
                    // Disconnect
                    modbus.isConnected = false;
                    modbus.disconnect();
                }
            });
    
            $(modbus.baudRateSelectElem).on('change', function() {
                const val = $(modbus.baudRateSelectElem).val();
                if (val == '-') {
                    return;
                }
                $(modbus.baudRateSelectElem).val('-');
                $(modbus.baudRateInputElem).val(val);
            })
    
        }

        return modbus;
    }

    $('.modbusClient').each(function() {
        const thisPartial = $(this);
        const modbus = createModbusHandler(thisPartial);

        const rawHexInputCrcCheckboxElem = $(thisPartial).find('.rawHexInputCrcCheckbox');

        modbus.setup();


        $(thisPartial).find('.clientMode').on('change', function() {
            const mode = $(this).val();

            $(thisPartial).find('.modeContent').children().hide();
            $(thisPartial).find('.' + mode + 'Mode').show();

            /*
            if (mode == 'rawHex') {
                modbus.onReceive = function(value) {
                    console.log('rawHex', value);  

                };
            }
            */
        });
        $(thisPartial).find('.clientMode').trigger('change');

        const sendRawHex = function() {
            $(thisPartial).find('.sendRawHexButton').prop('disabled', true);

            modbus.clearRequestResponse();

            let hex = $(thisPartial).find('.rawHexInput').val();

            let a = [];

            hex = hex.replace(/0[Xx]/g, '');
            for(let part of hex.split(/[ ,]+/)) {
                if ((part.length % 2) == 1) {
                    part = '0' + part;
                }
                while(part.length >= 2) {
                    a.push(parseInt(part.substring(0, 2), 16));
                    
                    part = part.substring(2);
                }
            }

            let ua = new Uint8Array(a);

            if ($(rawHexInputCrcCheckboxElem).prop('checked')) {
                let crc = modbus.crc16(ua);

                a.push(crc & 0xff);
                a.push(crc >> 8);
                ua = new Uint8Array(a);
            }

            console.log('ua', ua);

            modbus.sendUint8Array(ua);

            setTimeout(function() {
                $(thisPartial).find('.sendRawHexButton').prop('disabled', false);
            }, 500);
        }

        $(thisPartial).find('.sendRawHexButton').on('click', sendRawHex);

        $(thisPartial).find('.rawHexInput').on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            sendRawHex();    
        });  

    });

    $('.modbusAnalyzer').each(function() {
        const thisPartial = $(this);
        const modbus = createModbusHandler(thisPartial);
        modbus.setup();


    });

    
});

