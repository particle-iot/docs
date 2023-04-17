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
    
            const textDecoder = new TextDecoderStream();
            const readableStreamClosed = modbus.port.readable.pipeTo(textDecoder.writable);
    
            if (modbus.onConnect) {
                modbus.onConnect();
            }
            $(modbus.connectedDivElem).show();
            modbus.isConnected = true;
            $(modbus.connectButtonElem).prop('disabled', false);
            $(modbus.connectButtonElem).text('Disconnect');


            while (modbus.port.readable && modbus.keepReading) {
                modbus.reader = textDecoder.readable.getReader();
    
                try {
                    while (true) {
                        const { value, done } = await modbus.reader.read();
                        if (done) {
                            break;
                        }
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
    
            await readableStreamClosed.catch(() => {});
    
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
            const rawHex = $(thisPartial).find('.rawHexInput').val();

            
        });


    });

    $('.modbusAnalyzer').each(function() {
        const thisPartial = $(this);
        const modbus = createModbusHandler(thisPartial);
        modbus.setup();


    });

    
});

