
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.apiHelperVersions').each(function() {
        const thisPartial = $(this);
        
        let versions = {};
        $(thisPartial).data('versions', versions);

        versions.showPlatformsSelectElem = $(thisPartial).find('.showPlatformsSelect');
        versions.showReleaseLinesSelectElem = $(thisPartial).find('.showReleaseLinesSelect');

        versions.urlParams = new URLSearchParams(window.location.search);


        versions.loadUrlParams = async function() {
            // versions.urlParams.get('o') 
        }

        versions.run = async function() {
            const promises = [];

            promises.push(new Promise(function(resolve, reject) {
                fetch('/assets/files/deviceOsVersions.json')
                .then(response => response.json())
                .then(function(res) {
                    versions.deviceOsVersions = res;
                    resolve();
                });
        
            }));
    
            promises.push(new Promise(function(resolve, reject) {
                fetch('/assets/files/carriers.json')
                .then(response => response.json())
                .then(function(res) {
                    versions.carriersJson = res;
                    resolve();
                });        
            }));
    
            await Promise.all(promises);

            console.log('loaded versions', versions);

            // carriersJson.deviceConstants - object key platform name, contains id, name, displayName, etc.
            const platforms = [];

            for(const key in versions.carriersJson.deviceConstants) {
                const platformObj = versions.carriersJson.deviceConstants[key];
                if (platformObj.public && platformObj.productEligible) {
                    platforms.push(platformObj);
                }                
            }
            //platformDisplayNames.sort((a, b) => { return a.localeCompare(b); });
            platforms.sort((a, b) => a.displayName.localeCompare(b.displayName));

            for(const platformObj of platforms) {
                const optionElem = document.createElement('option');
                $(optionElem).attr('value', platformObj.id.toString());
                $(optionElem).text(platformObj.displayName);
                $(versions.showPlatformsSelectElem).append(optionElem);
            }

            $(versions.showPlatformsSelectElem).on('change', function() {
                console.log('select platform');
            });

            // Release state


            // Release lines
            const releaseLines = [];

            for(const verObj of versions.deviceOsVersions) {
                if (verObj.state != 'internal') {
                    const verNumObj = apiHelper.parseVersionStr(verObj.version);
                    if (!releaseLines.includes(verNumObj.major)) {
                        releaseLines.push(verNumObj.major);
                    }
                }
            }
            releaseLines.sort((a, b) => b - a); // Sort descending
            
            for(const rel of releaseLines) {
                const optionElem = document.createElement('option');
                $(optionElem).attr('value', rel.toString());
                $(optionElem).text(rel + '.x');
                $(versions.showReleaseLinesSelectElem).append(optionElem);
            }


 

            await versions.loadUrlParams();
        };
        versions.run();
    });
});
