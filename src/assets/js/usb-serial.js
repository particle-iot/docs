
const usbSerialConnection = function() {
    let conn = {};

    const particleVendorId = 0x2b04;

    conn.handleConnection = async function() {
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
                        conn.onReceive(value);
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

    };

    conn.connect = async function() {
        const filters = [
            { usbVendorId: particleVendorId } // 2b04
        ];

        try {
            conn.port = await navigator.serial.requestPort({ filters });

            conn.handleConnection();        
            return true;
        }
        catch(e) {
            return false;
        }

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
        if (conn.port.readable) {
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



$(document).ready(function() {
    if ($('.usbSerialConsole').length == 0) {
        return;
    }

    $('.usbSerialConsole').each(function() {
        const usbSerialConsoleElem = $(this);

        const usbSerialConsoleControlsElem = $(usbSerialConsoleElem).find('.apiHelper');
        const usbSerialConsoleConnectButton = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleConnect');
        const usbSerialConsoleDisconnectButton = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleDisconnect');
        const usbSerialConsoleClearButton = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleClear');
        const usbSerialConsoleSendButton = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleSend');
        const usbSerialConsoleInputElem = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleInput');
    
        const usbSerialConsoleStatusDiv = $(usbSerialConsoleElem).find('.usbSerialConsoleStatus');
        const usbSerialConsoleOutputDiv = $(usbSerialConsoleElem).find('.usbSerialConsoleOutput');
        const usbSerialConsoleTextAreaElem = $(usbSerialConsoleElem).find('textarea');
        
        let conn = usbSerialConnection();

        const setStatus = function (status) {
            $(usbSerialConsoleStatusDiv).html(status);
        };

        const appendText = function (text) {
            let scrollToEnd = false;

            const elemHeight = parseInt($(usbSerialConsoleTextAreaElem).css('height').replace('px',''));
            const scrollTop = $(usbSerialConsoleTextAreaElem)[0].scrollTop;
            const scrollHeight = $(usbSerialConsoleTextAreaElem)[0].scrollHeight;

            if (scrollTop == 0 || scrollTop >= (scrollHeight - elemHeight - 20)) {
                scrollToEnd = true;
            }

            const old = $(usbSerialConsoleTextAreaElem).val();
            $(usbSerialConsoleTextAreaElem).val(old + text);

            if (scrollToEnd) {
                $(usbSerialConsoleTextAreaElem).scrollTop(scrollHeight);
            }
        };

        conn.onConnect = function() {
            appendText('Connected to USB serial\n');
            $(usbSerialConsoleSendButton).prop('disabled', false);    
        };

        conn.onReceive = function(value) {
            appendText(value);
        };

        conn.onDisconnect = function(willReconnect) {
            $(usbSerialConsoleSendButton).prop('disabled', true);
            if (willReconnect) {
                appendText('Disconnected from USB serial, will attempt to reconnect\n');
            }
            else {
                appendText('Disconnected from USB serial\n');
            }    
        };
        conn.onWillNotReconnect = function() {
            appendText('Will no longer attempt to reconnect\n');
        };
    
        if (!('serial' in navigator)) {
            $(usbSerialConsoleControlsElem).hide();
            $(usbSerialConsoleOutputDiv).hide();
            setStatus('USB Serial is only available on the Chrome web browser, version 89 and later.');
            return;
        }

        const sendInput = async function() {
            const str = $(usbSerialConsoleInputElem).val();
    
            conn.sendString(str + '\r\n');
        };
    

        $(usbSerialConsoleConnectButton).on('click', async function() {
            // Connect
            $(usbSerialConsoleConnectButton).prop('disabled', true);
            $(usbSerialConsoleDisconnectButton).prop('disabled', false);
            
            if (!conn.connect()) {
                $(usbSerialConsoleConnectButton).prop('disabled', false);
                $(usbSerialConsoleDisconnectButton).prop('disabled', true);
            }
        });

        $(usbSerialConsoleDisconnectButton).on('click', async function() {
            $(usbSerialConsoleConnectButton).prop('disabled', false);
            $(usbSerialConsoleDisconnectButton).prop('disabled', true);

            conn.disconnect();
        });

        $(usbSerialConsoleClearButton).on('click', function() {
            $(usbSerialConsoleTextAreaElem).val('');
        });
        
        $(usbSerialConsoleSendButton).on('click', async function() {
            sendInput();
        });

        $(usbSerialConsoleInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            sendInput();
            $(usbSerialConsoleInputElem).val('');
        });
        
    });


});
