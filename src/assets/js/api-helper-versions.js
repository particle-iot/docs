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
                if (verObj.release_state != 'internal') {
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
                    if (!versions.inputValues.ar) {
                        if (verObj.release_state == 'archived') {
                            continue;
                        }
                    }                  

                    // Platform filtering
                    if (versions.inputValues.pl == '-') {
                        // No filtering
                    }
                    else
                    if (versions.inputValues.pl.startsWith("gen")) {
                        const genNum = parseInt(versions.inputValues.pl.substring(3));

                        let found = false;

                        for(const platformId of verObj.supported_platforms) {
                            const tempPlatformObj = versions.platforms.find(e => e.id == platformId);
                            if (tempPlatformObj && tempPlatformObj.generation == genNum) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            continue;
                        }
                    }
                    else {
                        const targetPlatform = parseInt(versions.inputValues.pl);
                        if (!verObj.supported_platforms.includes(targetPlatform)) {
                            console.log('skipping targetPlatform=' + targetPlatform, verObj);
                            continue;
                        }
                    }

                    // Release line
                    const verNumObj = apiHelper.parseVersionStr(verObj.version);
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

                const tableElem = document.createElement('table');
                $(tableElem).addClass('apiHelperTableNoMargin');
                
                const tbodyElem = document.createElement('tbody');

                /*
                {
                    const trElem = document.createElement('tr');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text('Version');
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text(verObj.version);
                        $(trElem).append(tdElem);
                    }

                    $(tbodyElem).append(trElem);
                }
                {
                    const trElem = document.createElement('tr');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text('Release state');
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text(versions.releaseStateTitle(verObj.release_state));
                        $(trElem).append(tdElem);
                    }

                    $(tbodyElem).append(trElem);
                }
                */
                {
                    const trElem = document.createElement('tr');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text('Supported platforms');
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        
                        let names = [];

                        for(const platformId of verObj.supported_platforms) {
                            const tempPlatformObj = versions.platforms.find(e => e.id == platformId);
                            if (tempPlatformObj) {
                                names.push(tempPlatformObj.displayName);
                            }
                        }
                        names.sort((a, b) => a.localeCompare(b));

                        $(tdElem).text(names.join(', '));
                        $(trElem).append(tdElem);
                    }
                    $(tbodyElem).append(trElem);
                }

                {
                    const trElem = document.createElement('tr');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text('Github');
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        const baseUrl = verObj.base_url;
                        if (baseUrl) {
                            const lastSlashIndex = baseUrl.lastIndexOf('/');
                            if (lastSlashIndex >= 0) {
                                const tag = baseUrl.substring(lastSlashIndex + 1);

                                const url = 'https://github.com/particle-iot/device-os/releases/tag/' + tag;

                                const aElem = document.createElement('a');
                                $(aElem).attr('href', url);
                                $(aElem).text(url);
                                $(tdElem).append(aElem);
                            }

                        }

                        $(trElem).append(tdElem);
                    }

                    $(tbodyElem).append(trElem);
                }
    

                $(tableElem).append(tbodyElem);
                $(verDivElem).append(tableElem);

                // Release notes 
                {
                    const releaseNotesDivElem = document.createElement('div');

                    const releaseNotesControlDivElem = document.createElement('div');
                    const releaseNotesContentDivElem = document.createElement('div');

                    const labelElem = document.createElement('label');

                    const inputElem = document.createElement('input');
                    $(inputElem).attr('type', 'checkbox');
                    $(inputElem).on('click', function() {
                        const show = $(this).prop('checked');
                        console.log('showHide=' + show);

                        $(releaseNotesContentDivElem).empty();
                        if (show) {
                            const releaseNotes = $('.apiHelperVersionsReleaseNotes').data('releaseNotes');

                            if (releaseNotes) {            
                                releaseNotes.renderSingleVersion({ver: 'v' + verObj.version, outputElem: verDivElem, linkToGithub:false});                            
                            }        
                        }
                    })
                    $(labelElem).append(inputElem);
                
                    $(labelElem).append(document.createTextNode('Show release notes'));


                    $(releaseNotesControlDivElem).append(labelElem);

                    $(releaseNotesDivElem).append(releaseNotesControlDivElem);



                    $(releaseNotesDivElem).append(releaseNotesContentDivElem);

                    $(verDivElem).append(releaseNotesDivElem);
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
            versions.platforms = [];

            for(const key in versions.carriersJson.deviceConstants) {
                const platformObj = versions.carriersJson.deviceConstants[key];

                if (platformObj.generation == 3 && platformObj.baseMcu == 'rtl872x') {
                    platformObj.generation = 4;
                }

                if (platformObj.public && platformObj.productEligible) {
                    versions.platforms.push(platformObj);
                }

                /* This does not work because the support_platforms data is not backfilled for core and xenon
                else
                if ([0, 14].includes(platformObj.id)) {
                    // Also include core and xenon, even though they're not product eligible
                    versions.platforms.push(platformObj);
                }
                */

            }
            
            //platformDisplayNames.sort((a, b) => { return a.localeCompare(b); });
            versions.platforms.sort((a, b) => a.displayName.localeCompare(b.displayName));

            for(const platformObj of versions.platforms) {
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
