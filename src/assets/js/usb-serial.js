
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
        
        const deviceRestoreInfo = await apiHelper.getDeviceRestoreInfo();

        if (connectOptions.showAllDevices) {
            filters.push({ usbVendorId: 0x2b04 }); // Particle devices
        }
        if (connectOptions.showWifiDevices) {
            for(const p of deviceRestoreInfo.platforms) {
                if (p.wifi) {
                    filters.push({ usbVendorId: 0x2b04, usbProductId: p.id }); 
                }
            }            
        }
        if (connectOptions.showCellularDevices) {
            for(const p of deviceRestoreInfo.platforms) {
                if (p.cellular) {
                    filters.push({ usbVendorId: 0x2b04, usbProductId: p.id }); 
                }
            }            
        }
        if (connectOptions.showWifiListeningDevices) {
            for(const p of deviceRestoreInfo.platforms) {
                if (p.wifi) {
                    filters.push({ usbVendorId: 0x2b04, usbProductId: 0xc000 | p.id }); 
                }
            }            
        }
        if (connectOptions.showCellularListeningDevices) {
            for(const p of deviceRestoreInfo.platforms) {
                if (p.cellular) {
                    filters.push({ usbVendorId: 0x2b04, usbProductId: 0xc000 | p.id }); 
                }
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



usbSerial.listeningCommand = function(options) {
    let listening = {};

    listening.options = listening.baseOptions = options || {};

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
        if (listening.options.logSend) {
            listening.options.logSend(s);
        }
        listening.conn.sendString(s);
    }

    listening.conn.onReceive = async function(str) {
        if (listening.options.onReceive) {
            listening.options.onReceive(str);
        }
        if (listening.options.logReceive) {
            listening.options.logReceive(str);
        }

        listening.response += str;


        if (listening.options.match) {
            for(const match of listening.options.match) {
                if ((match.endsWith && listening.response.endsWith(match.endsWith)) ||
                    (match.includes && listening.response.includes(match.includes)) ||
                    (match.regex && listening.response.match(match.regex))) {
                    // Matched!
                    match.handler(listening.response);
                }
            }    
        }

        if (listening.response.endsWith('\n')) {
            for(const line of listening.response.split('\n')) {
                if (listening.options.match) {
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
        listening.options = listening.connectOptions = {
            ...options,
            ...listening.baseOptions
        };
        listening.conn.connect(listening.options);
    };

    listening.start = function(options) {
        listening.options = {
            ...options,
            ...listening.connectOptions
        };

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

    listening.send('\ni');
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

    listening.send('\nv');
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


usbSerial.moduleInfo = function(listening, options) {
    let results = {
        data: ''
    };

    const completion = function() {
        listening.clearTimeout();
        options.onCompletion(results);
    };

    listening.send('\ns');
    listening.start({
        onLine: function(line) {
            line = line.trim();
            if (!line || results.json) {
                return;
            }
            try {
                results.data += line;
                results.json = JSON.parse(results.data);
                completion();
            }
            catch(e) {
            }
        },
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

    listening.send('\nm');
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

usbSerial.setClaimCode = function(listening, options) {
    let results = {};

    const completion = function() {
        listening.clearTimeout();
        options.onCompletion(results);
    };

    listening.send('\nC');
    listening.start({
        match: [
            {
                includes: 'code:',
                handler:function() {
                    listening.response = '';
                    listening.send(options.claimCode + '\r\n');
                }
            },
            {
                includes: 'set to:',
                handler:function() {
                    results.success = true;
                    completion();
                }
            }
        ],
        onTimeout: function() {
            results.timeout = true;
            completion();
        },    
        ...options
    });
};


usbSerial.exit = function(listening, options) {
    let results = {};

    listening.send('x');

    options.onCompletion(results);
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
                includes: 'Security 0=',
                handler:function() {
                    results.unknownSSID = true;
                    completion();
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
                includes: 'couldn\'t save the credentials.',
                handler: function() {
                    results.invalidPassword = true;
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
        const eventCategory = 'USB Serial Console';

        const usbSerialConsoleControlsElem = $(usbSerialConsoleElem).find('.apiHelper');
        const usbSerialConsoleConnectButton = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleConnect');
        const usbSerialConsoleDisconnectButton = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleDisconnect');
        const usbSerialConsoleClearButton = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleClear');
        const usbSerialConsoleCopyButton = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleCopy');
        const usbSerialConsoleDownloadButton = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleDownload');
        const usbSerialConsoleSendButton = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleSend');
        const usbSerialConsoleInputElem = $(usbSerialConsoleElem).find('.apiHelperSerialConsoleInput');
    
        const usbSerialConsoleStatusDiv = $(usbSerialConsoleElem).find('.usbSerialConsoleStatus');
        const usbSerialConsoleOutputDiv = $(usbSerialConsoleElem).find('.usbSerialConsoleOutput');
        const usbSerialConsoleTextAreaElem = $(usbSerialConsoleElem).find('textarea');
        
        let monitor;

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
            if (monitor) {
                monitor.done();
            }
            monitor = apiHelper.monitorUsage({ eventCategory, actionPrefix: 'USB Serial Usage '});
        };

        conn.onReceive = function(value) {
            appendText(value);
        };

        conn.onDisconnect = function(willReconnect) {
            $(usbSerialConsoleSendButton).prop('disabled', true);
            if (monitor) {
                monitor.done();
            }
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
			analytics.track('No WebSerial', {category:eventCategory, label:navigator.userAgent});
            return;
        }

        $(usbSerialConsoleConnectButton).on('click', async function() {
            // Connect
            $(usbSerialConsoleConnectButton).prop('disabled', true);
            $(usbSerialConsoleDisconnectButton).prop('disabled', false);

            analytics.track('Connection Attempt', {category:eventCategory});
            
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

        $(usbSerialConsoleCopyButton).on('click', function() {
			var t = document.createElement('textarea');
			document.body.appendChild(t);
			$(t).text($(usbSerialConsoleTextAreaElem).val());
			t.select();
			document.execCommand("copy");
			document.body.removeChild(t);
        });

        $(usbSerialConsoleDownloadButton).on('click', function() {
            let blob = new Blob([$(usbSerialConsoleTextAreaElem).val()], {type:'text/plain'});
            saveAs(blob, 'ConsoleOutput.txt');			
        });
        
        const sendInput = async function() {
            const str = $(usbSerialConsoleInputElem).val();
    
            conn.sendString(str + '\r\n');
            analytics.track('Data Sent', {category:eventCategory});
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

        $(ssidElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(passwordElem).trigger('click');    
        });

        $(passwordElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(startButton).trigger('click');    
        });


        const setStatus = function (status) {
            $(statusElem).html(status);
        };

        $(startButton).on('click', function() {
            $(startButton).prop('disabled', true);
            setStatus('Select device to configure...');

            const listening = usbSerial.listeningCommand();
            $('.apiHelperWiFiSetupInstructions').hide();
            $('.apiHelperWiFiSetupInstructions').hide();

            setStatus('Configuring device...');
        
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
                                        $('.apiHelperDeviceLookup').show();
                                        $('.apiHelperWiFiSetupInstructions').show();
                                    }
                                    else if (results.unknownSSID) {
                                        setStatus('The SSID could not be found by the device and was not set.<br/>Reset your device and enter listening mode before reattempting.');
                                    }
                                    else if (results.invalidPassword) {
                                        setStatus('The password was not accepted by the access point.');
                                    }
                                    else {
                                        // results.timeout
                                        setStatus('Timed out communicating with the device.<br/>Reset your device and enter listening mode again before attempting again.');
                                    }
                                    $(startButton).prop('disabled', false);

                                    listening.disconnect();
                                }
                            });

                        }
                    });
                }
            });

        });
    });

    $('.apiHelperDeviceInspect').each(function() {

        $(this).each(function() {
            const thisElem = $(this);

            const actionButtonElem = $(thisElem).find('.apiHelperActionButton');
            const tableBodyElem = $(thisElem).find('.usbSerialToolsOutput > table > tbody');
            const outputElem = $(thisElem).find('.usbSerialToolsOutput');
            const outputJsonElem = $(thisElem).find('.apiHelperEventViewerOutputJson');
            const rawJsonElem = $(thisElem).find('.rawJsonData');

            const setStatus = function(s) {
                $(thisElem).find('.usbSerialToolsStatus').text(s);
            };

            const displayParts = [
                {
                    id: 'u',
                    title: 'User firmware'
                },
                {
                    id: 's',
                    title: 'Device OS (System firmware)'
                },
                {
                    id: 'b',
                    title: 'Bootloader'
                },
                {
                    id: 'a',
                    title: 'Softdevice (Radio Stack)'
                },
                {
                    id: 'c',
                    title: 'Network Coprocessor (NCP)'
                }
            ];

            const moduleTitleFromId = function(id) {
                return displayParts.find((d) => d.id == id).title;
            }

            const versionText = function(m) {
                let text = m.v.toString();

                // Takes a module array (m) element or a dependency array element
                if (m.f == 's') {
                    const semVer = apiHelper.systemVersionToSemVer(m.v);
                    if (semVer) {
                        text += ' (' + semVer + ')';
                    }
                }
                return text;
            }

            const createValidityTable = function(vc, vv) {
                const flagBits = [
                    {
                        mask: 0x04,
                        title: "Dependencies"
                    },
                    {
                        mask: 0x02,
                        title: "CRC"
                    },
                    {
                        mask: 0x08,
                        title: "Address"
                    },
                    {
                        mask: 0x10,
                        title: "Platform"
                    },
                    {
                        mask: 0x20,
                        title: "Product"
                    }
                ];

                const cellWidth = '80px';

                const tableElem = document.createElement('table');

                const theadElem = document.createElement('thead');
                
                let trElem;

                trElem = document.createElement('tr');

                for(const f of flagBits) {
                    if ((vc & f.mask) != 0) {
                       const thElem = document.createElement('th');
                       $(thElem).css('width', cellWidth)
                                .css('text-align', 'center')
                                .text(f.title);

                       $(trElem).append(thElem); 
                    }
                }
                $(theadElem).append(trElem);
                $(tableElem).append(theadElem);

                const tbodyElem = document.createElement('tbody');

                trElem = document.createElement('tr');

                for(const f of flagBits) {
                    if ((vc & f.mask) != 0) {
                        const tdElem = document.createElement('td');

                        let cellContents;
                        if ((vv & f.mask) != 0) {
                            cellContents = '\u2705'; // Green Check
                        }   
                        else {
                            cellContents = '\u274C'; // Red X
                        }                     
                        $(tdElem).css('text-align', 'center')
                                 .text(cellContents);

                        $(trElem).append(tdElem); 
                    }
                }
                $(tbodyElem).append(trElem);

                $(tableElem).append(tbodyElem);

                return tableElem;
            };

            const createDependenciesTable = function(dArray, mArray) {

                const tableElem = document.createElement('table');


                const theadElem = document.createElement('thead');
                
                let trElem, thElem, tdElem;

                trElem = document.createElement('tr');

                thElem = document.createElement('th');
                $(thElem).text('Module Dependencies');
                $(trElem).append(thElem);
                
                thElem = document.createElement('th');
                $(thElem).text('Part');
                $(trElem).append(thElem);

                thElem = document.createElement('th');
                $(thElem).text('Version Required');
                $(trElem).append(thElem);

                thElem = document.createElement('th');
                $(thElem).text('Current Version');
                $(trElem).append(thElem);

                thElem = document.createElement('th');
                $(thElem).text('Met');
                $(trElem).append(thElem);

                $(theadElem).append(trElem);
                $(tableElem).append(theadElem);

                const tbodyElem = document.createElement('tbody');

                for(const d of dArray) {
                    trElem = document.createElement('tr');

                    tdElem = document.createElement('td');
                    $(tdElem).text(moduleTitleFromId(d.f) /* + ' (' + d.f + ')' */);
                    $(trElem).append(tdElem);

                    tdElem = document.createElement('td');
                    if (parseInt(d.n) != 0) {
                        $(tdElem).text(d.n);
                    }
                    $(trElem).append(tdElem);

                    tdElem = document.createElement('td');
                    $(tdElem).text(versionText(d));
                    $(trElem).append(tdElem);

                    let met = '&#x2715'; // X

                    tdElem = document.createElement('td');
                    for(const m of mArray) {
                        if (m.f == d.f && m.n == d.n) {
                            $(tdElem).text(versionText(m));
                            if (m.v > d.v) {
                                met = '&#x21E7'; // up arrow
                            } 
                            else if (m.v == d.v) {
                                met = '&#x2713'; // checkmark
                            }
                        }
                    }
                    $(trElem).append(tdElem);

                    tdElem = document.createElement('td');
                    $(tdElem).html(met);
                    $(trElem).append(tdElem);

                    $(tbodyElem).append(trElem);    
                }

                $(tableElem).append(tbodyElem);

                return tableElem;                
            };

            const outputModuleInfo = function(moduleInfo) {

                let parts = {};
                for(const m of moduleInfo.m) {
                    if (!parts[m.f]) {
                        parts[m.f] = [];
                    }
                    parts[m.f].push(m);
                }

                // Parts:
                // b = bootloader
                // u = user firmware
                // s = system firmware
                // a = softdevice (radio stack)
                // c = ncp

                const hasMultipleSystemParts = (parts.s.length > 0);

                for(const displayPart of displayParts) {
                    if (parts[displayPart.id]) {
                        for(const p of parts[displayPart.id]) {
                            const hElem = document.createElement('h4');

                            let title = displayPart.title;
                            if (parts[displayPart.id].length > 1) {
                                title += ' (part ' + p.n + ')';
                            }
                            $(hElem).text(title);
                            
                            $(outputElem).append(hElem);
                            
                            if (p.f != 'u') {
                                let pElem = document.createElement('p');
                                
                                let text = 'Current version: ' + p.v;

                                if (p.f == 's') {
                                    text += ' (' + apiHelper.systemVersionToSemVer(p.v) + ')';
                                }

                                $(pElem).text(text);
                                $(outputElem).append(pElem);    
                            }
    
                            $(outputElem).append(createValidityTable(p.vc, p.vv));


                            if (p.d && p.d.length > 0) {
                                $(outputElem).append(createDependenciesTable(p.d, moduleInfo.m));                                
                            }
                        }
                    }
                }

            };

            if (!('serial' in navigator)) {
                $(actionButtonElem).prop('disabled', true);
                setStatus('This tool is only available on the Chrome web browser on Mac, Windows, and Linux, version 89 and later.');
                return;
            }
    
            $(rawJsonElem).on('input', function() {
                $(outputElem).html('');
                setStatus('');

                try {
                    const parsedJson = JSON.parse($(rawJsonElem).val());
                    outputModuleInfo(parsedJson);
                }
                catch(e) {
                    setStatus('JSON data does not appear to be valid, be sure to copy the raw data from the event log');
                }
            });
            

            $(actionButtonElem).on('click', function() {
                const listening = usbSerial.listeningCommand();
                $(actionButtonElem).prop('disabled', true);
                $(outputJsonElem).hide();
                $(outputElem).html('');

                setStatus('Querying device for system module information...');

                listening.connect({
                    showWifiListeningDevices:true,            
                    showCellularListeningDevices:true,
                    onConnect: function() {
                        usbSerial.moduleInfo(listening, {
                            onCompletion: function(results) {

                                try {
                                    if (results.json) {
                                        setStatus('');
    
                                        if ($(outputJsonElem).hasClass('apiHelperJsonLinter')) {
                                            $(outputJsonElem).show();
                                            
                                            apiHelper.jsonLinterSetValue(outputJsonElem, JSON.stringify(results.json));
                                        }
                                        
                                        outputModuleInfo(results.json);
                                    }
                                    else {
                                        setStatus('Device did not return valid module information');
                                    }    
                                }
                                catch(e) {
                                    console.log(e);
                                }

                                listening.disconnect();
                                $(actionButtonElem).prop('disabled', false);
                            }
                        });
                    }
                });
            });
        });

    });

});

