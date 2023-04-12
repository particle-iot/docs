$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    if (!('serial' in navigator)) {
        $('.webSerialNotAvailable').show();
        return;
    }

    $('.webSerialAvailable').show();

    let modbus = {};

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

        await modbus.port.open({ baudRate: 115200 });

        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = modbus.port.readable.pipeTo(textDecoder.writable);

        if (modbus.onConnect) {
            modbus.onConnect();
        }

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
    }

    $('.modbusClient, .modbusAnalyzer').each(function() {
        const thisPartial = $(this);

        $(thisPartial).data('modbus', modbus);

        $('#usbConnect').on('click', async function() {
            const filters = [];

            modbus.port = await navigator.serial.requestPort({ filters });
            
            modbus.handleConnection();
        });
    });
    

    $('.modbusClient').each(function() {
        const thisPartial = $(this);


    });

    $('.modbusAnalyzer').each(function() {
        const thisPartial = $(this);


    });

    
});

