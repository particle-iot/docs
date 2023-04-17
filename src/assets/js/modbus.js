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
            isConnected: false,
        };
        $(elem).data('modbus', modbus);

        modbus.reconnectHandler = async function(event) {
            modbus.port = event.target;
            modbus.handleConnection();
        };
    
        modbus.sendString = async function(str) {
    
            const encoder = new TextEncoder();
            const writer = modbus.port.writable.getWriter();
            await writer.write(encoder.encode(str));
            writer.releaseLock();
        };
    
        modbus.sendUint8Array = async function(a) {
            const writer = modbus.port.writable.getWriter();
            await writer.write(a);
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
                        console.log('value', value);
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
        modbus.setup();

        $(thisPartial).find('.clientMode').on('change', function() {
            const mode = $(this).val();

            $(thisPartial).find('.modeContent').children().hide();
            $(thisPartial).find('.' + mode + 'Mode').show();
        });
        $(thisPartial).find('.clientMode').trigger('change');

        $(thisPartial).find('.sendRawHexButton').on('click', function() {
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

            const ua = new Uint8Array(a);
            console.log('ua', ua);
            modbus.sendUint8Array(ua);
        });


    });

    $('.modbusAnalyzer').each(function() {
        const thisPartial = $(this);
        const modbus = createModbusHandler(thisPartial);
        modbus.setup();


    });

    
});

