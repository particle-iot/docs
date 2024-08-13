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
        if (window.location.hash.startsWith('#')) {
            versions.hash = window.location.hash;
        }

        versions.versionToId = function(version) {
            return 'v' + version.replaceAll('.', '_');
        }

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

                case 'text':
                    versions.inputValues[key] = $(this).val().trim();
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
            
            let saveValues;

            if (versions.inputValues.def) {
                saveValues = {def: true};
            }
            else
            if (versions.inputValues.vc && versions.inputValues.v.trim().length) {
                saveValues = {v: versions.inputValues.v};
            }
            else {
                saveValues = Object.assign({}, versions.inputValues);
                delete saveValues.def;
                delete saveValues.vc;
                delete saveValues.v;
            }

            const searchStr = $.param(saveValues);
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
            $('.specificVersionCheckbox').prop('checked', false);
            $('.onlyShowDefaultReleases').prop('checked', false);
            

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
                case 'text':
                default:
                    $(this).val(value);
                    break;
                }
            });

            if (versions.urlParams.get('v')) {
                $('.specificVersionCheckbox').prop('checked', true);
                $('.specificVersionCheckbox')[0].scrollIntoView();
            }
        }


        /*
        versions.displayNameFromPlatformId = function(platformId, options = {}) {
            let result;

            const tempPlatformObj = versions.platforms.find(e => e.id == platformId);
            if (tempPlatformObj) {
                result = tempPlatformObj.displayName;
            }
            else {
                result = 'Platform ' + platformId.toString();
            }

            if (options.splitParts) {
                const parts = result.split('/');
                for(let part of parts) {
                    part = part.trim();
                }
                result = parts.join(options.splitParts);
            }

            return result;
        }

        versions.platformListString = function(arrayOfPlatformIds) {
            let names = [];

            for(const platformId of arrayOfPlatformIds) {
                const tempPlatformObj = versions.platforms.find(e => e.id == platformId);
                if (tempPlatformObj) {
                    names.push(tempPlatformObj.displayName);
                }
            }
            names.sort((a, b) => a.localeCompare(b));

            return names.join(', ');
        }
        */

        versions.updateUI = function() {
            versions.saveUrlParams();

            versions.versionListElem.empty();

            if (versions.inputValues.def) {
                $('.filterControl').prop('disabled', true);
                $('.specificVersionInput').prop('disabled', true);
                $('.specificVersionCheckbox').prop('checked', false);
            }
            else
            if (versions.inputValues.vc) {
                $('.filterControl').prop('disabled', true);
                $('.specificVersionInput').prop('disabled', false);
                $('.onlyShowDefaultReleases').prop('checked', false);
            } 
            else{
                $('.filterControl').prop('disabled', false);
                $('.specificVersionInput').prop('disabled', false);
                $('.onlyShowDefaultReleases').prop('disabled', false);
            }
    
            const versionsArray = [];

            for(const verObj of versions.deviceOsVersions) {
                if (verObj.release_state != 'internal') {
                    if (versions.inputValues.vc) {
                        if (!verObj.version.startsWith(versions.inputValues.v)) {
                            continue;
                        }
                    }
                    else
                    if (versions.inputValues.def) {
                        if (!verObj.default_platforms || verObj.default_platforms.length == 0) {
                            continue;
                        }
                    }
                    else {
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
                $(verDivElem).css('margin-top', '15px');

                {
                    const hElem = document.createElement('h4');
                    $(hElem).attr('id', versions.versionToId(verObj.version));
                    $(hElem).text(verObj.version + ' (' + versions.releaseStateTitle(verObj.release_state) + ')');
                    
                    const aElem = document.createElement('a');
                    $(aElem).attr('href', '#' + versions.versionToId(verObj.version));
                    $(aElem).addClass('header-permalinks');

                    const iElem = document.createElement('i');
                    $(aElem).addClass('ion-link');
                    $(aElem).append(iElem);

                    $(hElem).append(aElem);
    
                    $(verDivElem).append(hElem);
    
                }

                let tableElem = document.createElement('table');
                $(tableElem).addClass('apiHelperTableNoMargin');
                $(tableElem).css('overflow-x', 'auto');
                
                let tbodyElem = document.createElement('tbody');

            

                // Idea: Add row with links to download zip

                let versionPlatforms = [];
                let hasDownloadZip = false;

                for(const platformId of verObj.supported_platforms) {            
                    const versionPlatformObj = {
                        platformId,
                        isDefault: (verObj.default_platforms && verObj.default_platforms.includes(platformId)),
                    };

                    const tempPlatformObj = versions.platforms.find(e => e.id == platformId);
                    if (!tempPlatformObj) {
                        continue;
                    }
        
                    const parts = tempPlatformObj.displayName.split('/');
                    for(let part of parts) {
                        part = part.trim();
                    }
                    versionPlatformObj.displayName = parts.join('<br />');
    
                    if (versions.deviceRestoreJson.versions[verObj.version]) {
                        if (versions.deviceRestoreJson.versions[verObj.version].includes(tempPlatformObj.name)) {
                            const dir = '/assets/files/device-restore/' + verObj.version + '/';

                            versionPlatformObj.hex = dir + tempPlatformObj.name + '.hex';

                            if (versions.deviceRestoreJson.versionsZipByPlatform[tempPlatformObj.name].includes(verObj.version)) {
                                versionPlatformObj.zipName = tempPlatformObj.name + '.zip';
                                versionPlatformObj.zip = dir + versionPlatformObj.zipName;
                                hasDownloadZip = true;
                            }
                        }
                    }


                    versionPlatforms.push(versionPlatformObj);
                }
                versionPlatforms.sort((a, b) => a.displayName.localeCompare(b.displayName));

                const leftColumnWidth = '120px';
                const platformColumnWidth = '82px';
            
                {
                    const trElem = document.createElement('tr');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).css('width', leftColumnWidth);
                        $(tdElem).text('Supported platforms');
                        $(trElem).append(tdElem);
                    }
                    for(const versionPlatformObj of versionPlatforms) {
                        const tdElem = document.createElement('td');
                        if (platformColumnWidth) {
                            $(tdElem).css('width', platformColumnWidth);
                        }
                        $(tdElem).html(versionPlatformObj.displayName);
                        $(trElem).append(tdElem);                        
                    }
                    for(let ii = versionPlatforms.length; ii < versionPlatforms.length ; ii++) {
                        const tdElem = document.createElement('td');
                        if (platformColumnWidth) {
                            $(tdElem).css('width', platformColumnWidth);
                        }
                        $(trElem).append(tdElem);                        
                    }

                    $(tbodyElem).append(trElem);
                }
                if (verObj.default_platforms && verObj.default_platforms.length > 0) {
                    const trElem = document.createElement('tr');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).css('width', leftColumnWidth);
                        $(tdElem).text('Default release');
                        $(trElem).append(tdElem);
                    }
                    for(const versionPlatformObj of versionPlatforms) {
                        const tdElem = document.createElement('td');
                        const html = (versionPlatformObj.isDefault) ? '&check;' : '&nbsp;';
                        $(tdElem).html(html);
                        $(trElem).append(tdElem);                        
                    }

                    $(tbodyElem).append(trElem);
                }
                if (hasDownloadZip) {
                    const trElem = document.createElement('tr');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).css('width', leftColumnWidth);
                        $(tdElem).text('Download zip');
                        $(trElem).append(tdElem);
                    }
                    for(const versionPlatformObj of versionPlatforms) {
                        const tdElem = document.createElement('td');

                        if (versionPlatformObj.zip) {
                            const aElem = document.createElement('a');
                            $(aElem).attr('href', versionPlatformObj.zip);
                            $(aElem).text(versionPlatformObj.zipName);
                            $(tdElem).append(aElem);
                        }

                        $(trElem).append(tdElem);                        
                    }

                    $(tbodyElem).append(trElem);

                }

                $(tableElem).append(tbodyElem);
                $(verDivElem).append(tableElem);


                // Start new table

                tableElem = document.createElement('table');
                $(tableElem).css('padding-top', '12px');
                $(tableElem).addClass('apiHelperTableNoMargin');
                
                tbodyElem = document.createElement('tbody');


                {
                    const trElem = document.createElement('tr');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).css('width', leftColumnWidth);
                        $(tdElem).text('Publish date');
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        
                        if (verObj.publishedAt) {
                            $(tdElem).text(verObj.publishedAt.split('T')[0]);
                        }
                        $(trElem).append(tdElem);
                    }
                    $(tbodyElem).append(trElem);                    
                }

                {
                    const trElem = document.createElement('tr');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).css('width', leftColumnWidth);
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

                    const detailsElem = document.createElement('details');
                    $(detailsElem).css('margin-left', '5px');
                    $(detailsElem).css('margin-top', '10px');
                    $(detailsElem).css('font-size', '11px');
                    
                    const summaryElem = document.createElement('summary');
                    $(summaryElem).text('Show release notes for this version');
                    $(detailsElem).append(summaryElem);


                    const releaseNotesContentDivElem = document.createElement('div');
                    $(detailsElem).append(releaseNotesContentDivElem);

                    const showNotes = function() {                            
                        const releaseNotes = $('.apiHelperVersionsReleaseNotes').data('releaseNotes');
                        if (releaseNotes) {            
                            releaseNotes.renderSingleVersion({
                                ver: 'v' + verObj.version, 
                                outputElem: releaseNotesContentDivElem, 
                                linkToGithub:false,
                                headerTag: 'h5'
                            });                            
                        }        
                    }

                    $(detailsElem).on('click', function() {
                        const show = !$(this).prop('open');

                        $(releaseNotesContentDivElem).empty();
                        if (show) {                            
                            showNotes();
                        }
                    })

                    if (versions.inputValues.vc && versions.inputValues.v == verObj.version) {
                        // Open release notes if show specific version checkbox is checked and there's an exact match
                        $(detailsElem).prop('open', true);
                        showNotes();
                    }

                    $(releaseNotesDivElem).append(detailsElem);

                    $(verDivElem).append(releaseNotesDivElem);
                }
                // SKUs div
                {
                    const skusDivElem = document.createElement('div');

                    const detailsElem = document.createElement('details');
                    $(detailsElem).css('margin-left', '5px');
                    $(detailsElem).css('margin-top', '10px');
                    $(detailsElem).css('font-size', '11px');
                    
                    const summaryElem = document.createElement('summary');
                    $(summaryElem).text('Show SKUs compatible with this version');
                    $(detailsElem).append(summaryElem);


                    const skusContentDivElem = document.createElement('div');
                    $(detailsElem).append(skusContentDivElem);

                    $(detailsElem).on('click', function() {
                        const show = !$(this).prop('open');

                        $(skusContentDivElem).empty();
                        if (show) {
                            const tableElem = document.createElement('table');
                            $(tableElem).addClass('apiHelperTableNoMargin');

                            const theadElem = document.createElement('thead');                            
                            {
                                const trElem = document.createElement('tr');

                                {
                                    const thElem = document.createElement('th');
                                    $(thElem).text('SKU');
                                    $(trElem).append(thElem);
                                }
                                {
                                    const thElem = document.createElement('th');
                                    $(thElem).text('Description');
                                    $(trElem).append(thElem);
                                }
                                {
                                    const thElem = document.createElement('th');
                                    $(thElem).text('Lifecycle');
                                    $(trElem).append(thElem);
                                }
                            
                                $(theadElem).append(trElem);
                            }
                            $(tableElem).append(theadElem);

                            const tbodyElem = document.createElement('tbody');
                            $(tableElem).append(tbodyElem);

                            for(const skuObj of versions.carriersJson.skus) {
                                if (verObj.supported_platforms.includes(skuObj.platformId)) {
                                    const trElem = document.createElement('tr');

                                    {
                                        const tdElem = document.createElement('td');
                                        $(tdElem).text(skuObj.name);
                                        $(trElem).append(tdElem);
                                    }
                                    {
                                        const tdElem = document.createElement('td');
                                        $(tdElem).text(skuObj.desc);
                                        $(trElem).append(tdElem);
                                    }
                                    {
                                        const tdElem = document.createElement('td');
                                        $(tdElem).text(skuObj.lifecycle);
                                        $(trElem).append(tdElem);
                                    }

                                    $(tbodyElem).append(trElem);
                                }
                            }
                            
                            $(skusContentDivElem).append(tableElem);
                        }
                    })


                    $(skusDivElem).append(detailsElem);

                    $(verDivElem).append(skusDivElem);
            
                }

                $(versions.versionListElem).append(verDivElem);
            }

            if (versionsArray.length == 0) {
                const noVersionsElem = document.createElement('div');
                $(noVersionsElem).text('No versions match search criteria');
                $(versions.versionListElem).append(noVersionsElem);
            }

            if (versions.hash) {
                const verDivElem = $(versions.hash);
                if (verDivElem.length) {
                    $(verDivElem)[0].scrollIntoView();
                }
                
                delete versions.hash;
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

            promises.push(new Promise(function(resolve, reject) {
                fetch('/assets/files/deviceRestore.json')
                .then(response => response.json())
                .then(function(res) {
                    versions.deviceRestoreJson = res;
                    resolve();
                });        
            }));

            // Also make sure the releaseNotes module is loaded. 
            promises.push(apiHelper.moduleGetPromise('releaseNotes'));

            await Promise.all(promises);

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
                else
                if ([0, 14].includes(platformObj.id)) {
                    // Also include core and xenon, even though they're not product eligible
                    versions.platforms.push(platformObj);
                }

            }
            
            versions.platforms.sort((a, b) => a.displayName.localeCompare(b.displayName));

            for(const platformObj of versions.platforms) {
                const optionElem = document.createElement('option');
                $(optionElem).attr('value', platformObj.id.toString());
                $(optionElem).text(platformObj.displayName);
                $(versions.showPlatformsSelectElem).append(optionElem);
            }

            $(versions.showPlatformsSelectElem).on('change', function() {
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

            
            $('.onlyShowDefaultReleases').on('click', function() {
                if ($(this).prop('checked')) {
                    $('.specificVersionCheckbox').prop('checked', false);
                }
                versions.updateUI();
            });

            $('.specificVersionCheckbox').on('click', function() {
                if ($(this).prop('checked')) {
                    $('.onlyShowDefaultReleases').prop('checked', false);
                }
                versions.updateUI();
            });
            $('.specificVersionInput').on('input', function() {
                if ($(this).val().trim().length) {
                    $('.onlyShowDefaultReleases').prop('checked', false);
                    $('.specificVersionCheckbox').prop('checked', true);    
                }
                else {
                    $('.specificVersionCheckbox').prop('checked', false);    
                }
                versions.updateUI();
            });
            $('.specificVersionInput').on('blur', function() {
                versions.updateUI();
            });



            apiHelper.moduleComplete('versions')

            versions.loadUrlParams();

            versions.updateUI();
        };

        apiHelper.moduleAdd('versions');

        versions.run();
    });
});
