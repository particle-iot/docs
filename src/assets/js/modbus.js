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
            decodedOutputElem: $(elem).find('.decodedOutput'),
            isConnected: false,
            data: [],
            requests: {},
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

        modbus.parseData = function() {
            console.log('parseData', modbus.data);

            if (modbus.data.length < 4) {
                // Not enough data
                return;
            }

            const readUInt16BE = function(offset) {
                return (modbus.data[offset].value << 8) | modbus.data[offset + 1].value;
            }
            const readUInt16LE = function(offset) {
                return modbus.data[offset].value | (modbus.data[offset + 1].value << 8);
            }
            const calcCRC = function(crcOffset) {
                let a = [];
                for(let ii = 0; ii < crcOffset; ii++) {
                    a.push(modbus.data[ii].value);
                }
                return modbus.crc16(new Uint8Array(a));
            }

            let decoded = {
                serverAddr: modbus.data[0].value,
                function: modbus.data[1].value,
                table: [],        
            };
            decoded.table.push({
                key: 'Server Address',
                value: decoded.serverAddr,                
            });
            decoded.table.push({
                key: 'Function',
                value: decoded.function,                
            });

            let decodedPossibilities = {
                request: {
                    request: true,
                    table: [],
                },
                response: {
                    response: true,
                    table: [],
                },
            };

            switch(decoded.function) {
                case 4: // Read input
                    // Read input request
                    if (modbus.data.length >= 8) {
                        decodedPossibilities.request.startAddr = readUInt16BE(2);
                        decodedPossibilities.request.numPoints = readUInt16BE(4);
                        decodedPossibilities.request.crcOffset = 6;

                        decodedPossibilities.request.table.push({
                            key: 'Start Address',
                            value: decodedPossibilities.request.startAddr,
                        });
                        decodedPossibilities.request.table.push({
                            key: 'Num Points',
                            value: decodedPossibilities.request.numPoints,
                        });
                    }
                    break;
            }

            switch(decoded.function) {
                case 4: // Read input
                    if (modbus.data.length >= 5) {
                        decodedPossibilities.response.byteCount = modbus.data[2].value;
                        if (modbus.data.length >= (3 + decodedPossibilities.response.byteCount + 2)) {
                            decodedPossibilities.response.crcOffset = 3 + decodedPossibilities.response.byteCount;
                            decodedPossibilities.response.dataSize = 16; // bits per register
                        }
                    }
                    break;
            }


            for(const key in decodedPossibilities) {
                if (decodedPossibilities[key].crcOffset) {
                    decodedPossibilities[key].length = decodedPossibilities[key].crcOffset + 2;
                    decodedPossibilities[key].crcData = readUInt16LE(decodedPossibilities[key].crcOffset);
                    decodedPossibilities[key].crcCalc = calcCRC(decodedPossibilities[key].crcOffset);
                    decodedPossibilities[key].crcValid = (decodedPossibilities[key].crcData == decodedPossibilities[key].crcCalc);
                }    
            }

            // console.log('decodedPossibilities', decodedPossibilities);

            let useOption;

            if (decodedPossibilities.request.length && modbus.data[0].sent && modbus.data.length >= decodedPossibilities.request.length) {
                // Is a known request, and we have the whole request
                useOption = decodedPossibilities.request;
            }
            else
            if (decodedPossibilities.response.length && modbus.data[0].received && modbus.data.length >= decodedPossibilities.response.length) {
                // Is a known response, and we have the whole response
                useOption = decodedPossibilities.response;
            }
            else 
            if (decodedPossibilities.request.crcValid) {
                useOption = decodedPossibilities.request;
            }
            else 
            if (decodedPossibilities.response.crcValid) {
                useOption = decodedPossibilities.response;
            }

            if (useOption) {
                for(const key in useOption) {
                    if (key != 'table') {
                        decoded[key] = useOption[key];
                    }
                }
                for(const obj of useOption.table) {
                    decoded.table.push(obj);
                }

                if (decoded.byteCount) {
                    decoded.table.push({
                        key: 'Data length',
                        value: decoded.byteCount,
                    });    
                    // TODO: Put pointer to data here 
                    console.log('have byteCount for serverAddr ' + decoded.serverAddr);
                    const origRequest = modbus.requests[decoded.serverAddr.toString()];
                    if (origRequest) {
                        console.log('request startAddr=' + origRequest.startAddr);
                    }

                    switch(decoded.dataSize) {
                        case 1:
                            break;

                        case 16:
                            for(let ii = 0; ii < decoded.byteCount; ii += 2) {
                                let label = 'Index ' + (ii / 2 + 1);
                                if (origRequest) {
                                    label += ' Address ' + (ii / 2 + origRequest.startAddr);
                                } 
                                let value16 = (modbus.data[ii + 2].value << 8) | (modbus.data[ii + 3].value);
                                
                                let signed16 = (value16 < 32768) ? value16 : (value16 - 65536);

                                const hex = value16.toString(16).padStart(4, '0');
                                
                                let value = '0x' + hex; 
                                
                                if (signed16 > 0) {
                                    value += ' (' + value16 + ' dec)';
                                }
                                else {
                                    value += ' (' + value16 + ' dec unsigned, ' + signed16 + ' dec signed)';
                                }

                                decoded.table.push({
                                    key: label,
                                    value: value,
                                });                                                
                            }
                            break;
                    }

                }

                // TODO: Put CRC check here!
                decoded.table.push({
                    key: 'CRC',
                    value: decoded.crcData,
                });

                console.log('decoded', decoded);

                if (decoded.request) {
                    modbus.requests[decoded.serverAddr.toString()] = decoded;
                }

                modbus.data.splice(0, decoded.length);
                if (modbus.data.length) {
                    modbus.parseData();   
                }
            }


            /*
            Request:
            - 01 = Server Address
            - 04 = Function (Read Input)
            - 00 01 = Starting address (0x0001)
            - 00 02 = Number of points (0x0002)
            - 20 0B = CRC

            Response:
            - 01 = Server Address
            - 04 = Function (Read Input 0x04)
            - 04 = Byte Count 
            - 00 FC = 252 = 25.2°C
            - 01 19 = 281 = 28.1 %RH
            - FB EE = CRC
            */
        };

        modbus.addData = function(ua, options = {}) {
        
            for(let ii = 0; ii < ua.length; ii++) {
                let obj = Object.assign({}, options, {
                    value: ua[ii],
                    chunkIndex: ii,
                    ts: Date.now(),
                });
                if (ii == 0) {
                    obj.chunkFirst = true;
                }
                if (ii == (ua.length - 1)) {
                    obj.chunkLast = true;
                }
                if (modbus.data.length > 0) {
                    if ((obj.ts - modbus.data[modbus.data.length - 1].ts) >= 5) {
                        obj.gapBefore = true;
                        modbus.data[modbus.data.length - 1].gapAfter = true;
                    }
                }
                else {
                    obj.gapBefore = true;
                }

                modbus.data.push(obj);
            }       
            modbus.parseData();         
        }

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
            $(modbus.requestDecodedElem).find('table > tbody').empty();
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

            let addDataOptions = {                    
            }
            if (modbus.setupOptions.isClient) {
                addDataOptions.received = true;
            }

            while (modbus.keepReading) {
                modbus.reader = modbus.port.readable.getReader();
    
                try {
                    while (true) {
                        const { value, done } = await modbus.reader.read();
                        if (done) {
                            break;
                        }
                        modbus.addRawHex(modbus.rawHexResponseElem, value);
                        modbus.addData(value, addDataOptions);
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

        modbus.setup = function(setupOptions) {
            modbus.setupOptions = setupOptions;

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

        const readInputModeElem = $(thisPartial).find('.readInputMode');

        const rawHexInputCrcCheckboxElem = $(thisPartial).find('.rawHexInputCrcCheckbox');

        modbus.setup({
            isClient: true,
        });


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

        const sendArray = function(a, options = {}) {
            let ua = new Uint8Array(a);

            if (options.addCrc) {
                let crc = modbus.crc16(ua);

                a.push(crc & 0xff);
                a.push(crc >> 8);
                ua = new Uint8Array(a);
            }
            console.log('ua', ua);

            modbus.sendUint8Array(ua);
            modbus.addData(ua, {sent:true});            
        }
        
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

            const sendArrayOptions = {
                addCrc: $(rawHexInputCrcCheckboxElem).prop('checked'),
            };

            sendArray(a, sendArrayOptions);

            setTimeout(function() {
                $(thisPartial).find('.sendRawHexButton').prop('disabled', false);
            }, 500);
        }

        const pushUint8 = function(a, elemOrNumber) {
            const value = (typeof(elemOrNumber) == 'number') ? elemOrNumber : parseInt($(elemOrNumber).val());

            a.push(value % 256);
        }
        const pushUint16BE = function(a, elemOrNumber) {
            const value = (typeof(elemOrNumber) == 'number') ? elemOrNumber : parseInt($(elemOrNumber).val());

            a.push((value >> 8) % 256);
            a.push(value % 256);
        }


        $(thisPartial).find('.sendRawHexButton').on('click', sendRawHex);

        $(thisPartial).find('.rawHexInput').on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            sendRawHex();    
        });  


        const sendReadInput = function() {
            $(thisPartial).find('.readInputButton').prop('disabled', true);
            let a = [];

            pushUint8(a, $(readInputModeElem).find('.serverAddress'));
            pushUint8(a, 4); // read input
            pushUint16BE(a, $(readInputModeElem).find('.readInputStart'));
            pushUint16BE(a, $(readInputModeElem).find('.readInputNum'));

            sendArray(a, {addCrc: true});

            setTimeout(function() {
                $(thisPartial).find('.readInputButton').prop('disabled', false);
            }, 500);
        };

        $(thisPartial).find('.readInputButton').on('click', sendReadInput);

        $(readInputModeElem).find('input[type="text"]').on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            sendReadInput();    
        });

        /*
        input type="text" size="6" value="1" class="serverAddress"/></td>
                                    <td>(1-255)</td>
                                </tr>
                                <tr>
                                    <td>Starting register</td>
                                    <td><input type="text" size="6" value="1" class="readInputStart"/></td>
                                    <td>(1-65535)</td>
                                </tr>
                                <tr>
                                    <td>Number of points</td>
                                    <td><input type="text" size="6" value="1" class="readInputNum"/></td>
                                    <td>(1-120, limited by size)</td>
                                </tr>
                                <tr>
                                    <td colspan="3"><button class="readInputButton
        */

    });

    $('.modbusAnalyzer').each(function() {
        const thisPartial = $(this);
        const modbus = createModbusHandler(thisPartial);
        modbus.setup({
            isAnalyzer: true,
        });


    });

    
});

