const versions = {};

$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.apiHelperVersions').each(function() {
        const thisPartial = $(this);
        
        $(thisPartial).data('versions', versions);

        versions.showPlatformsSelectElem = $(thisPartial).find('.showPlatformsSelect');
        versions.showReleaseLinesSelectElem = $(thisPartial).find('.showReleaseLinesSelect');
        versions.versionListElem = $(thisPartial).find('.versionList');

        versions.urlParams = new URLSearchParams(window.location.search);

        versions.releaseStateTitle = function(release_state) {
            let result;

            switch(release_state) {
                case 'ga':
                    result = 'GA';
                    break;

                default:
                    result = release_state.substring(0, 1).toUpperCase() + release_state.substring(1);
                    break;
            }
            return result;
        }

        versions.readInput = function() {
            versions.inputValues = {};

            $(thisPartial).find('.versionsParam').each(function() {
                const key = $(this).data('key');

                const inputType = $(this).prop('type');
                switch(inputType) {
                case 'checkbox':
                    versions.inputValues[key] = $(this).prop('checked');
                    break;

                case 'select':
                default:
                    versions.inputValues[key] = $(this).val();
                    break;
                }
            });
            // console.log('readInput', versions.inputValues);
        };

        versions.saveUrlParams = function() {
            versions.readInput();
            
            const searchStr = $.param(versions.inputValues);
            // console.log('searchStr=' + searchStr);

            if (versions.lastSearchParam != searchStr) {
                versions.lastSearchParam = searchStr;
                if (versions.saveTimer) {
                    clearTimeout(versions.saveTimer);
                    versions.saveTimer = 0;
                }
                versions.saveTimer = setTimeout(function() {
                    history.pushState(null, '', '?' + searchStr);
                }, 2000);
            }              
        }

        versions.loadUrlParams = function() {
            // versions.urlParams.get('o') 
            $(thisPartial).find('.versionsParam').each(function() {
                const key = $(this).data('key');

                const value = versions.urlParams.get(key);
                if (value === null) {
                    return;
                }

                const inputType = $(this).prop('type');

                // console.log('loadUrlParams', {key, value, inputType});

                switch(inputType) {
                case 'checkbox':
                    $(this).prop('checked', value === 'true');
                    break;

                case 'select':
                default:
                    $(this).val(value);
                    break;
                }
            });
        }

        versions.updateUI = function() {
            versions.saveUrlParams();

            versions.versionListElem.empty();

            const versionsArray = [];

            for(const verObj of versions.deviceOsVersions) {
                if (verObj.release_state != 'internal' && verObj.release_state != 'archived') {
                    if (!versions.inputValues.pr) {
                        if (verObj.release_state == 'preview') {
                            continue;
                        }
                    }                  
                    if (!versions.inputValues.ga) {
                        if (verObj.release_state == 'ga') {
                            continue;
                        }
                    }
                    if (versions.inputValues.pl != '-') {
                        const targetPlatform = parseInt(versions.inputValues.pl);
                        if (!verObj.supported_platforms.includes(targetPlatform)) {
                            console.log('skipping targetPlatform=' + targetPlatform, verObj);
                            continue;
                        }
                    }

                    const verNumObj = apiHelper.parseVersionStr(verObj.version);
                    
                    // TODO: Check release line
                    if (versions.inputValues.rl != '-') {
                        const releaseLine = parseInt(versions.inputValues.rl);
                        if (verNumObj.major != releaseLine) {
                            continue;
                        }
                    }

                    

                    versionsArray.push(verObj);
                }
            }
            versionsArray.sort((a, b) => apiHelper.versionSort(a.version, b.version));

            // console.log('versionsArray', versionsArray);

            // versions.releaseStateTitle
            $(versions.versionListElem).empty();

            for(const verObj of versionsArray) {
                const verDivElem = document.createElement('div');

                {
                    const hElem = document.createElement('h4');
                    $(hElem).attr('id', verObj.version);
                    $(hElem).text(verObj.version + ' (' + versions.releaseStateTitle(verObj.release_state) + ')');
                    
                    const aElem = document.createElement('a');
                    $(aElem).attr('href', '#' + verObj.version);
                    $(aElem).addClass('header-permalinks');

                    const iElem = document.createElement('i');
                    $(aElem).addClass('ion-link');
                    $(aElem).append(iElem);

                    $(hElem).append(aElem);
    
                    $(verDivElem).append(hElem);
    
                }

                $(versions.versionListElem).append(verDivElem);
            }

            
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
                versions.updateUI();
            });

            // Release state
            $(thisPartial).find('.releaseStateCheckbox').on('click', function() {
                versions.updateUI();
            });

            // Release lines
            const releaseLines = [];

            for(const verObj of versions.deviceOsVersions) {
                if (verObj.release_state != 'internal' && verObj.release_state != 'archived') {
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

            $(versions.showReleaseLinesSelectElem).on('change', function() {
                versions.updateUI();
            });

 

            versions.loadUrlParams();

            versions.updateUI();
        };
        versions.run();
    });
});
