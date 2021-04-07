
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
    conn.connect = async function(connectOptions) {
        let filters = [];
        
        const wifiDevices = [6, 8, 12, 22];
        const cellularDevices = [10, 13, 23, 25, 26];

        if (connectOptions.showAllDevices) {
            filters.push({ usbVendorId: 0x2b04 }); // Particle devices
        }
        if (connectOptions.showWifiDevices) {
            for(const platformId of wifiDevices) {
                filters.push({ usbVendorId: 0x2b04, usbProductId: platformId }); 
            }            
        }
        if (connectOptions.showCellularDevices) {
            for(const platformId of cellularDevices) {
                filters.push({ usbVendorId: 0x2b04, usbProductId: platformId }); 
            }            
        }
        if (connectOptions.showWifiListeningDevices) {
            for(const platformId of wifiDevices) {
                filters.push({ usbVendorId: 0x2b04, usbProductId: 0xc000 | platformId }); 
            }            
        }
        if (connectOptions.showCellularListeningDevices) {
            for(const platformId of cellularDevices) {
                filters.push({ usbVendorId: 0x2b04, usbProductId: 0xc000 | platformId }); 
            }            
        }
        if (!connectOptions.showDebugger) {
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



usbSerial.listeningCommand = function(options) {
    let listening = {};

    listening.options = options || {};

    listening.conn = usbSerial.newConnection(listening.options);

    listening.disconnect = function() {
        listening.conn.disconnect();
        if (listening.timer) {
            clearTimeout(listening.timer);
            listening.timer = null;
        }        
        if (listening.options.onDisconnected) {
            listening.options.onDisconnected();
        }
    };

    listening.clearTimeout = function() {
        if (listening.timer) {
            clearTimeout(listening.timer);
            listening.timer = null;
        }        
    };

    listening.setTimeout = function(ms) {
        if (!ms) {
            ms = listening.options.timeout || 15000;
        }
        if (listening.timer) {
            clearTimeout(listening.timer);
        }        
        listening.timer = setTimeout(function() {
            if (listening.options.onTimeout) {
                listening.options.onTimeout();
            }
            else {
                listening.disconnect();
            }
        }, ms);
    };

    listening.conn.onConnect = function() {
        listening.setTimeout();
        if (listening.options.onConnect) {
            listening.options.onConnect();
        }
    };

    listening.send = function(s) {
        listening.conn.sendString(s);
    }

    listening.conn.onReceive = async function(str) {
        if (listening.options.onReceive) {
            listening.options.onReceive(str);
        }

        listening.response += str;

        for(const match of listening.options.match) {
            if ((match.endsWith && listening.response.endsWith(match.endsWith)) ||
                (match.includes && listening.response.includes(match.includes)) ||
                (match.regex && listening.response.match(match.regex))) {
                // Matched!
                match.handler(listening.response);
            }
        }

        if (listening.response.endsWith('\n')) {
            for(const line of listening.response.split('\n')) {
                for(const match of listening.options.match) {
                    if (match.lineIncludes) {
                        const offset = line.indexOf(match.lineIncludes);
                        if (offset >= 0) {
                            if (match.lineHandler) {
                                match.lineHandler(line);
                            }
                            if (match.promptHandler) {
                                match.promptHandler(line.substr(offset + match.lineIncludes.length).trim());
                            }
                        }
                    } 

                }
                if (listening.options.onLine) {
                    listening.options.onLine(line);
                }
            }
            if (listening.options.onLineEnd) {
                listening.options.onLineEnd(listening.response);
            }
            listening.response = '';
        }
    }

    listening.connect = function(options) {
        listening.options = options;

        listening.conn.connect(options);
    };

    listening.start = function(options) {
        listening.options = options;

        if (!listening.options.timeout) {
            listening.options.timeout = 15000;
        }
        if (!listening.options.match) {
            listening.options.match = [];
        }
        
        listening.response = '';
        listening.setTimeout();
    };

    return listening;
};

// 


usbSerial.identify = function(listening, options) {
    let results = {};

    const completion = function() {
        listening.clearTimeout();
        options.onCompletion(results);
    };

    listening.send('i');
    listening.start({
        match: [
            {
                lineIncludes:'Device ID:',
                promptHandler:function(data) {
                    results.deviceId = data;
                    listening.setTimeout(5000);
                }
            },
            {
                // Device ID only on Photon/P1
                lineIncludes:' id is',
                promptHandler:function(data) {
                    results.deviceId = data;
                    completion();
                }
            },
            {
                lineIncludes:'Device Secret:',
                promptHandler:function(data) {
                    results.deviceSecret = data;
                    results.isGen3 = true;
                }
            },
            {
                lineIncludes:'Serial Number:',
                promptHandler:function(data) {
                    results.serialNumber = data;
                    if (results.isGen3) {
                        // Last data on Gen 3
                        completion();
                    }
                }
            },
            {
                lineIncludes:'IMEI:',
                promptHandler:function(data) {
                    results.imei = data;
                }
            },        
            {
                lineIncludes:'ICCID:',
                promptHandler:function(data) {
                    // Last data on Electron/E Series
                    results.iccid = data;
                    completion();
                }
            }
        ],
        onTimeout: function() {
            completion();
        }
    });
};


usbSerial.version = function(listening, options) {
    let results = {};

    const completion = function() {
        listening.clearTimeout();
        options.onCompletion(results);
    };

    listening.send('v');
    listening.start({
        match: [
            {
                lineIncludes:'version:',
                promptHandler:function(data) {
                    results.version = data;
                    completion();
                }
            }
        ],
        onTimeout: function() {
            completion();
        }
    });
};

usbSerial.macAddress = function(listening, options) {
    let results = {};

    const completion = function() {
        listening.clearTimeout();
        options.onCompletion(results);
    };

    listening.send('m');
    listening.start({
        onLine: function(line) {
            const m = line.match(/[A-Fa-z0-9][A-Fa-z0-9]:[A-Fa-z0-9][A-Fa-z0-9]:[A-Fa-z0-9][A-Fa-z0-9]:[A-Fa-z0-9][A-Fa-z0-9]:[A-Fa-z0-9][A-Fa-z0-9]:[A-Fa-z0-9][A-Fa-z0-9]/);
            if (m) {
                results.mac = m;
                completion();
            }
        },
        onTimeout: function() {
            completion();
        }
    });
};


usbSerial.wifiSetup = function(listening, options) {
    let results = {};

    const completion = function() {
        listening.clearTimeout();
        options.onCompletion(results);
    };

            // C: Enter 63-digit claim code: 

    listening.send('w');
    listening.start({
        match: [
            {
                includes: 'SSID:',
                handler:function() {
                    listening.response = '';
                    listening.send(options.ssid + '\r\n');
                }
            },
            {
                includes: 'Password:',
                handler:function() {
                    listening.response = '';
                    listening.send(options.password + '\r\n');
                }
            },
            {
                includes: 'Security 0=',
                handler:function() {
                    results.unknownSSID = true;
                    completion();
                }
            },
            {
                includes: '<3 you!',
                handler:function() {
                    results.success = true;
                    completion();
                }
            }
        ],
        onTimeout: function() {
            results.timeout = true;
            completion();
        }    
    });
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
            
            conn.connect({
                showAllDevices: true,            
                showDebugger: true
            });
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

        const tableBody = $(usbSerialToolsElem).find('.usbSerialToolsOutput > table > tbody');

        const setStatus = function (status) {
            $(usbSerialToolsElem).find('.usbSerialToolsStatus').html(status);
        };

        const labelValueOutput = function(label, value) {
            $(tableBody).append(
                '<tr>',
                $(document.createElement('td')).text(label),
                $(document.createElement('td')).text(value),
                '</tr>'
            );
        }

        const setOutput = function (results) {
            $(tableBody).html('');

            if (results.deviceId) {
                labelValueOutput('Device ID', results.deviceId);
            }
            if (results.deviceSecret) {
                labelValueOutput('Device Secret', results.deviceSecret);
            }
            if (results.serialNumber) {
                labelValueOutput('Serial Number', results.serialNumber);
            }
            if (results.imei) {
                labelValueOutput('IMEI', results.imei);
            }
            if (results.iccid) {
                labelValueOutput('ICCID', results.iccid);
            }
            if (results.version) {
                labelValueOutput('Device OS Version', results.version);
            }
            if (results.mac) {
                labelValueOutput('MAC Address', results.mac);
            }

            if (results.deviceId && results.deviceId.match(/[A-Za-z0-9]{24}/)) {
                $('.apiHelperDeviceLookupDeviceId').val(results.deviceId);
                $('.apiHelperDeviceLookupDeviceId').trigger('input');
            }
            if (results.iccid && results.iccid.match(/89[0-9]{17,19}/)) {
                $('.apiHelperIccidLookupIccid').val(results.iccid);
                $('.apiHelperIccidLookupIccid').trigger('input');

            }
        };      

        if (!('serial' in navigator)) {
            $(usbSerialToolsControlsElem).hide();
            $(usbSerialToolsOutputDiv).hide();
            setStatus('USB Serial is only available on the Chrome web browser on Mac, Windows, and Linux, version 89 and later.');
            return;
        }

        $(usbSerialToolsElem).find('.apiHelperSerialToolsIdentify').on('click', function() {
            const listening = usbSerial.listeningCommand();
        
            listening.connect({
                showWifiListeningDevices:true,            
                showCellularListeningDevices:true,
                onConnect: function() {
                    usbSerial.identify(listening, {
                        onCompletion: function(results) {
                            usbSerial.version(listening, {
                                onCompletion: function(results2) {                                
                                    Object.assign(results, results2);
                                    setOutput(results);       
                                    listening.disconnect();
                                }
                            });

                        }
                    });
                }
            });
        });
        $(usbSerialToolsElem).find('.apiHelperSerialToolsMac').on('click', function() {
            const listening = usbSerial.listeningCommand();
        
            listening.connect({
                showWifiListeningDevices:true,            
                onConnect: function() {
                    usbSerial.macAddress(listening, {
                        onCompletion: function(results) {
                            setOutput(results);       
                            listening.disconnect();
                        }
                    });
                }
            });
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
            const listening = usbSerial.listeningCommand();
        
            listening.connect({
                showWifiListeningDevices:true,            
                onConnect: function() {
                    usbSerial.identify(listening, {
                        onCompletion: function(results) {
                            usbSerial.wifiSetup(listening, {
                                ssid: $(ssidElem).val(),
                                password: $(passwordElem).val(),
                                onCompletion: function(results2) {                                
                                    Object.assign(results, results2);

                                    if (results.deviceId && results.deviceId.match(/[A-Za-z0-9]{24}/)) {
                                        $('.apiHelperDeviceLookupDeviceId').val(results.deviceId);
                                        $('.apiHelperDeviceLookupDeviceId').trigger('input');
                                    }
                                    if (results.iccid && results.iccid.match(/89[0-9]{17,19}/)) {
                                        $('.apiHelperIccidLookupIccid').val(results.iccid);
                                        $('.apiHelperIccidLookupIccid').trigger('input');
                                    }                        

                                    if (results.success) {
                                        setStatus('Wi-Fi settings set!');
                                    }
                                    else if (results.unknownSSID) {
                                        setStatus('The SSID could not be found by the device and was not set.<br/>Reset your device and enter listening mode again before attempting again.');
                                    }
                                    else {
                                        // results.timeout
                                        setStatus('Timed out communicating with the device.<br/>Reset your device and enter listening mode again before attempting again.');
                                    }

                                    listening.disconnect();
                                }
                            });

                        }
                    });
                }
            });

        });
    });


});
