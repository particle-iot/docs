
$(document).ready(function() {

    $('.bleSerialConsole').each(function() {
        const bleSerialConsoleElem = $(this);
        const eventCategory = 'BLE Serial Console';

        const bleSerialConsoleControlsElem = $(bleSerialConsoleElem).find('.apiHelper');
        const bleSerialConsoleConnectButton = $(bleSerialConsoleElem).find('.apiHelperSerialConsoleConnect');
        const bleSerialConsoleDisconnectButton = $(bleSerialConsoleElem).find('.apiHelperSerialConsoleDisconnect');
        const bleSerialConsoleClearButton = $(bleSerialConsoleElem).find('.apiHelperSerialConsoleClear');
        const bleSerialConsoleCopyButton = $(bleSerialConsoleElem).find('.apiHelperSerialConsoleCopy');
        const bleSerialConsoleDownloadButton = $(bleSerialConsoleElem).find('.apiHelperSerialConsoleDownload');
        const bleSerialConsoleSendButton = $(bleSerialConsoleElem).find('.apiHelperSerialConsoleSend');
        const bleSerialConsoleInputElem = $(bleSerialConsoleElem).find('.apiHelperSerialConsoleInput');
    
        const bleSerialConsoleStatusDiv = $(bleSerialConsoleElem).find('.bleSerialConsoleStatus');
        const bleSerialConsoleOutputDiv = $(bleSerialConsoleElem).find('.bleSerialConsoleOutput');
        const bleSerialConsoleTextAreaElem = $(bleSerialConsoleElem).find('textarea');
        
        let monitor;
        let device;
        let rxCharacteristic;

        const setStatus = function (status) {
            $(bleSerialConsoleStatusDiv).html(status);
        };

        const appendText = function (text) {
            let scrollToEnd = false;

            const elemHeight = parseInt($(bleSerialConsoleTextAreaElem).css('height').replace('px',''));
            const scrollTop = $(bleSerialConsoleTextAreaElem)[0].scrollTop;
            const scrollHeight = $(bleSerialConsoleTextAreaElem)[0].scrollHeight;

            if (scrollTop == 0 || scrollTop >= (scrollHeight - elemHeight - 20)) {
                scrollToEnd = true;
            }

            const old = $(bleSerialConsoleTextAreaElem).val();
            $(bleSerialConsoleTextAreaElem).val(old + text);

            if (scrollToEnd) {
                $(bleSerialConsoleTextAreaElem).scrollTop(scrollHeight);
            }
        };
        /*
        conn.onCancelConnect = function() {
            $(bleSerialConsoleConnectButton).prop('disabled', false);
            $(bleSerialConsoleDisconnectButton).prop('disabled', true);
        };
        */
    
        if (!('bluetooth' in navigator)) {
            $(bleSerialConsoleControlsElem).hide();
            $(bleSerialConsoleOutputDiv).hide();
            setStatus('Web-based BLE serial is only available on the Chrome web browser on Mac, Windows, Linux, and Chromebook, version 89 and later.');
			analytics.track('No WebBLE', {category:eventCategory, label:navigator.userAgent});
            return;
        }

        const handleNotifications = function(event) {
            const value = event.target.value;

            const decoder = new TextDecoder('utf-8');

            appendText(decoder.decode(value.buffer));
        }

        const onDisconnected = function() {
            $(bleSerialConsoleSendButton).prop('disabled', true);
            appendText('Disconnected from BLE serial\n');

            if (monitor) {
                monitor.done();
            }
            device = null;
        };

        $(bleSerialConsoleConnectButton).on('click', async function() {
            // Connect
            $(bleSerialConsoleConnectButton).prop('disabled', true);
            $(bleSerialConsoleDisconnectButton).prop('disabled', false);

            analytics.track('Connection Attempt', {category:eventCategory});
            
            try {
                setStatus('Requesting bluetooth device...');
                device = await navigator.bluetooth.requestDevice({
                    filters: [{services: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']}]});

                device.addEventListener('gattserverdisconnected', onDisconnected);

                setStatus('Connecting to GATT server...');
                const server = await device.gatt.connect();
        
                setStatus('Initializing service...');
                const service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e');
        
                const txCharacteristic = await service.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e');
        
                await txCharacteristic.startNotifications();
        
                txCharacteristic.addEventListener('characteristicvaluechanged', handleNotifications);
                
                rxCharacteristic = await service.getCharacteristic('6e400002-b5a3-f393-e0a9-e50e24dcca9e');

                $(bleSerialConsoleSendButton).prop('disabled', false);    
                if (monitor) {
                    monitor.done();
                }
                monitor = apiHelper.monitorUsage({ eventCategory, actionPrefix: 'BLE Serial Usage '});
    
                setStatus('');

            } catch(error) {
                setStatus(error);
            }        
        });

        $(bleSerialConsoleDisconnectButton).on('click', async function() {
            $(bleSerialConsoleConnectButton).prop('disabled', false);
            $(bleSerialConsoleDisconnectButton).prop('disabled', true);

            if (device) {
                device.gatt.disconnect();
            }
        });

        $(bleSerialConsoleClearButton).on('click', function() {
            $(bleSerialConsoleTextAreaElem).val('');
        });

        $(bleSerialConsoleCopyButton).on('click', function() {
			var t = document.createElement('textarea');
			document.body.appendChild(t);
			$(t).text($(bleSerialConsoleTextAreaElem).val());
			t.select();
			document.execCommand("copy");
			document.body.removeChild(t);
        });

        $(bleSerialConsoleDownloadButton).on('click', function() {
            let blob = new Blob([$(bleSerialConsoleTextAreaElem).val()], {type:'text/plain'});
            saveAs(blob, 'ConsoleOutput.txt');			
        });
        
        const sendInput = async function() {
            const str = $(bleSerialConsoleInputElem).val();
            
            const encoder = new TextEncoder(); 
            const bytes = encoder.encode(str);
    
            rxCharacteristic.writeValue(bytes);

            analytics.track('Data Sent', {category:eventCategory});
        };
    
        $(bleSerialConsoleSendButton).on('click', async function() {
            sendInput();
        });

        $(bleSerialConsoleInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            sendInput();
            $(bleSerialConsoleInputElem).val('');
        });
        
    });
});
