$(document).ready(function() {
    let deviceRestoreFilesCommon = {
    };

    deviceRestoreFilesCommon.ready = new Promise(function(resolve, reject) {
        deviceRestoreFilesCommon.readyResolve = resolve;
    });

    $('.deviceRestoreFiles').each(function() {
        const thisPartial = $(this);

        let deviceRestoreFiles = {
            thisPartial,
            mode: $(thisPartial).data('mode')
        };
        $(thisPartial).data('deviceRestoreFiles', deviceRestoreFiles);

        const deviceRestorePlatformSelectElem = $(thisPartial).find('.deviceRestorePlatformSelect');
        const deviceRestoreVersionSelectElem = $(thisPartial).find('.deviceRestoreVersionSelect');
        const deviceOsVersionRowElem = $(thisPartial).find('.deviceOsVersionRow')
        const downloadRowElem = $(thisPartial).find('.downloadRow')
        const downloadButtonElem = $(thisPartial).find('.downloadButton')
        // const Elem = $(thisPartial).find('.')

        

        const run = async function() {
            await deviceRestoreFilesCommon.ready;

            console.log("deviceRestoreFiles ready", {deviceRestoreFilesCommon, deviceRestoreFiles});


            for(const platformName of deviceRestoreFilesCommon.platforms) {
                const platformObj = deviceRestoreFilesCommon.carriersJson.deviceConstants[platformName];

                const optionElem = document.createElement('option');
                $(optionElem).text(platformObj.displayName + ' (' + platformObj.id + ')');
                $(optionElem).attr('value', platformName);
                $(deviceRestorePlatformSelectElem).append(optionElem);    
            }

            $(deviceRestorePlatformSelectElem).on('change', function() {
                const platformName = $(deviceRestorePlatformSelectElem).val();
                $(deviceRestoreVersionSelectElem).empty();
                if (platformName == '-') {
                    return;
                }

                const platformObj = deviceRestoreFilesCommon.carriersJson.deviceConstants[platformName];
                console.log('platform selected ' + platformName, platformObj);

                const versionArray = [];
                for(const version in deviceRestoreFilesCommon.deviceRestoreJson.versions) {
                    if (deviceRestoreFilesCommon.deviceRestoreJson.versions[version].includes(platformName)) {
                        versionArray.push(version);
                    }
                }
                versionArray.sort(apiHelper.versionSort);
                
                for(const version of versionArray) {
                    const optionElem = document.createElement('option');
                    $(optionElem).text(version);
                    $(optionElem).attr('value', version);
                    $(deviceRestoreVersionSelectElem).append(optionElem);        
                }

                $(deviceOsVersionRowElem).show();
                $(downloadRowElem).show();
            });    

            $(downloadButtonElem).on('click', async function() {
                const platformName = $(deviceRestorePlatformSelectElem).val();
                const versionName = $(deviceRestoreVersionSelectElem).val();
                
                const fileName = platformName + '.hex';
    
                const fetchRes = await fetch('/assets/files/device-restore/' + versionName + '/' + fileName);
                const blob = await fetchRes.blob();
                
                saveAs(blob, fileName);

                analytics.track('Device Restore Hex Download', 'Download', {category: (versionName + '/' + platformName)}); 
            });
        }


        run();
    });


    deviceRestoreFilesCommon.run = async function() {
        const promises = [];

        promises.push(new Promise(function(resolve, reject) {
            fetch('/assets/files/deviceRestore.json')
            .then(response => response.json())
            .then(function(res) {
                deviceRestoreFilesCommon.deviceRestoreJson = res;
                resolve();
            });        
        }));

        
        promises.push(new Promise(function(resolve, reject) {
            apiHelper.getCarriersJson().then(function(carriersJsonIn) {
                deviceRestoreFilesCommon.carriersJson = carriersJsonIn;
    
                deviceRestoreFilesCommon.platforms = [];
                
                for(const platformName in deviceRestoreFilesCommon.carriersJson.deviceConstants) {
                    const platformObj = deviceRestoreFilesCommon.carriersJson.deviceConstants[platformName];
                    if (platformObj.productEligible) {
                        deviceRestoreFilesCommon.platforms.push(platformName);
                    }
                }
                deviceRestoreFilesCommon.platforms.sort(function(a, b) {
                    return deviceRestoreFilesCommon.carriersJson.deviceConstants[a].displayName.localeCompare(deviceRestoreFilesCommon.carriersJson.deviceConstants[b].displayName);
                })
    
                resolve();
            });
        }));
    

        await Promise.all(promises);

        deviceRestoreFilesCommon.readyResolve();
    };


    deviceRestoreFilesCommon.run();
    

});

