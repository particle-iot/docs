
let usbSerial = {};

usbSerial.newConnection = function(options) {
    let conn = {};

    conn.options = options || {};

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
        let filters = [];
        
        console.log('connect options', options);

        const wifiDevices = [6, 8, 12, 22];
        const cellularDevices = [10, 13, 23, 25, 26];

        if (options.showAllDevices) {
            filters.push({ usbVendorId: 0x2b04 }); // Particle devices
        }
        if (options.showWifiDevices) {
            for(const platformId of wifiDevices) {
                filters.push({ usbVendorId: 0x2b04, usbProductId: platformId }); 
            }            
        }
        if (options.showCellularDevices) {
            for(const platformId of cellularDevices) {
                filters.push({ usbVendorId: 0x2b04, usbProductId: platformId }); 
            }            
        }
        if (options.showWifiListeningDevices) {
            for(const platformId of wifiDevices) {
                filters.push({ usbVendorId: 0x2b04, usbProductId: 0xc000 | platformId }); 
            }            
        }
        if (options.showCellularListeningDevices) {
            for(const platformId of cellularDevices) {
                filters.push({ usbVendorId: 0x2b04, usbProductId: 0xc000 | platformId }); 
            }            
        }
        if (!options.showDebugger) {
            filters.push({ usbVendorId: 0x0d28, usbProductId: 0x0204 });// Particle debugger (DAPLink) 
        }


        try {
            conn.port = await navigator.serial.requestPort({ filters });

            conn.handleConnection();        
        }
        catch(e) {
            if (conn.onCancelConnect) {
                conn.onCancelConnect();
            }        
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

usbSerial.listeningCommand = async function(options, pipeline) {
    let conn = usbSerial.newConnection(options);
    let timer;

    conn.onConnect = function() {
        conn.sendString(pipeline.shift()());        

        timer = setTimeout(function() {
            conn.disconnect();
        }, 15000);
    };

    let response = '';

    conn.onReceive = async function(str) {
        pipeline[0](str, function(data) {
            pipeline.shift();
            if (pipeline.length >= 2) {
                conn.sendString(pipeline.shift()(data));        
            }
            else {
                if (timer) {
                    clearTimeout(timer);
                }
        
                conn.disconnect();        
            }
        });
    }

    conn.connect();

};

usbSerial.identify = async function(options) {
    let output = '';

    usbSerial.listeningCommand(options, [
        function() {
            return 'i';
        },
        function(str, done) {
            output += str;
            if (output.endsWith('\n')) {
                done();
            }
        },
        function() {
            return 'v';
        },
        function(str, done) {
            output += str;
            if (output.endsWith('\n')) {
                if (options.setOutput) {
                    options.setOutput(output);
                }
                done();            
            }
        }
    ]);

};


usbSerial.macAddress = async function(options) {
    let output = '';

    usbSerial.listeningCommand(options, [
        function() {
            return 'm';
        },
        function(str, done) {
            output += str;
            if (output.endsWith('\n') && (output.indexOf('\n') < (output.length - 1))) {
                if (options.setOutput) {
                    options.setOutput(output);
                }
                done();
            }
        }
    ]);

};


usbSerial.wifiSetup = async function(options) {
    let output = '';

    usbSerial.listeningCommand(options, [
        function() {
            output = '';
            return 'i';
        },
        function(str, done) {
            console.log('info: ', str);
            output += str;
            if (output.endsWith('\n')) {
                console.log('calling done');
                done();
            }
        },
        // C: Enter 63-digit claim code: 
        function() {
            output = '';
            return 'w';    
        },
        function(str, done) {
            console.log('str: ', str);
            output += str;
            if (output.includes('SSID:')) {
                console.log('got SSID prompt', output);
                done();            
            }
        },
        function() {
            output = '';
            return options.ssid + '\r\n';
        },
        function(str, done) {
            console.log('str: ', str);
            output += str;
            if (output.includes('Password:')) {
                console.log('got password prompt', output);
                done();            
            }
            // Security 0=unsecured, 1=WEP, 2=WPA, 3=WPA2: 
        },
        function() {
            output = '';
            console.log('sending password');
            return options.password + '\r\n';
        },
        function(str, done) {
            output += str;
            if (output.includes('<3 you!')) {
                console.log('got success prompt', output);
                done();            
            }
        },
    ]);

};


$(document).ready(function() {

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
        
        const options = {
            showAllDevices: true,
            showDebugger: true
        };

        let conn = usbSerial.newConnection(options);

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
        conn.onCancelConnect = function() {
            $(usbSerialConsoleConnectButton).prop('disabled', false);
            $(usbSerialConsoleDisconnectButton).prop('disabled', true);
        };
    
        if (!('serial' in navigator)) {
            $(usbSerialConsoleControlsElem).hide();
            $(usbSerialConsoleOutputDiv).hide();
            setStatus('Web-based USB serial is only available on the Chrome web browser on Mac, Windows, Linux, and Chromebook, version 89 and later.');
            return;
        }

        $(usbSerialConsoleConnectButton).on('click', async function() {
            // Connect
            $(usbSerialConsoleConnectButton).prop('disabled', true);
            $(usbSerialConsoleDisconnectButton).prop('disabled', false);
            
            conn.connect();
        });

        $(usbSerialConsoleDisconnectButton).on('click', async function() {
            $(usbSerialConsoleConnectButton).prop('disabled', false);
            $(usbSerialConsoleDisconnectButton).prop('disabled', true);

            conn.disconnect();
        });

        $(usbSerialConsoleClearButton).on('click', function() {
            $(usbSerialConsoleTextAreaElem).val('');
        });
        
        const sendInput = async function() {
            const str = $(usbSerialConsoleInputElem).val();
    
            conn.sendString(str + '\r\n');
        };
    
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

    $('.usbSerialTools').each(function() {
        const usbSerialToolsElem = $(this);

        const usbSerialToolsControlsElem = $(usbSerialToolsElem).find('.apiHelper');
    
        const setStatus = function (status) {
            $(usbSerialToolsElem).find('.usbSerialToolsStatus').html(status);
        };

        const setOutput = function (status) {
            const deviceId = status.match(/[A-Za-z0-9]{24}/);
            if (deviceId) {
                $('.apiHelperDeviceLookupDeviceId').val(deviceId);
                $('.apiHelperDeviceLookupDeviceId').trigger('input');
            }

            const iccid = status.match(/89[0-9]{17,19}/);
            if (iccid) {
                $('.apiHelperIccidLookupIccid').val(iccid);
                $('.apiHelperIccidLookupIccid').trigger('input');
            }

            $(usbSerialToolsElem).find('.usbSerialToolsOutput > pre').text(status);
        };

        if (!('serial' in navigator)) {
            $(usbSerialToolsControlsElem).hide();
            $(usbSerialToolsOutputDiv).hide();
            setStatus('USB Serial is only available on the Chrome web browser on Mac, Windows, and Linux, version 89 and later.');
            return;
        }

        const options = {
            setStatus,
            setOutput,
            showWifiListeningDevices:true,            
            showCellularListeningDevices:true,            
        };

        $(usbSerialToolsElem).find('.apiHelperSerialToolsIdentify').on('click', function() {
            usbSerial.identify(options);
        });
        $(usbSerialToolsElem).find('.apiHelperSerialToolsMac').on('click', function() {
            usbSerial.macAddress(options);
        });

    });

    $('.apiHelperWiFiSetup').each(function() {
        const wifiSetupElem = $(this);

        const ssidElem = $(wifiSetupElem).find('.apiHelperWiFiSSID');
        const passwordElem = $(wifiSetupElem).find('.apiHelperWiFiPassword');
        const startButton = $(wifiSetupElem).find('.apiHelperWiFiSetupUSB');

        const statusElem = $(wifiSetupElem).find('.apiHelperWiFiSetupStatus');

        $(statusElem).html('');

        const setStatus = function (status) {
            $(statusElem).html(status);
        };

        $(startButton).on('click', function() {
            let options = {
                setStatus,
                showWifiListeningDevices: true,
                ssid: $(ssidElem).val(),
                password: $(passwordElem).val()
            };
            
            usbSerial.wifiSetup(options);
        });
    });


});
