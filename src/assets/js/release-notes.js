
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    let releaseNotes = {
        urlParams: new URLSearchParams(window.location.search),
        defaultSearchAfter: 'v1.4.4',
        gaCategory: 'Release Note Search',

        // Platforms to hide from the filter select
        hidePlatforms: ['trackerm'],

        // Mapped tags (lowercased). Use this to correct misspelled tags.
        mapTags: {
            'asset tracker': 'tracker',
            'e404x': 'esomx',
            'esom': 'esomx',
            'rtl8721x': 'rtl872x',
        },

        // Implicitly add tags based on pull request number
        // TODO: Implement this!
        addTags: [
        ],

        includeTags: [
            'build',
            'deprecation',
            'hal',
            'network',
            'ota',
            'services',
            'system',
            'wiring',
        ],

        // Always ignore tags
        ignoreTags: [
            'ci',
            'experimental',
            'test',
            'tests',
        ],

        // Ignore these sections when filtering by platform
        ignoreSections: [
            'INTERNAL',
        ],

        debugPrs: [
            2619,
        ],

        // Various things that are filled in later
        releaseNotePlatforms: [],
        unknownTags: [],
    };

    releaseNotes.sanitizePlatform = function(platform) {
        const m = platform.match(/([a-z][0-9]*){1}[- ]*som/);
        if (m) {
            // TODO: When deviceConstants changes to names like m-som may need to change this!
            platform = m[1] + 'som';

            if (releaseNotes.mapTags[platform]) {
                platform = releaseNotes.mapTags[platform];
            }
        }

        return platform;
    }

    releaseNotes.includePlatform = function(entry, options = {}) {
        if (!releaseNotes.filterOptions || !releaseNotes.filterOptions.platform) { 
            // No filtering enabled
            if (options.debug) {
                console.log('no filtering enabled', {entry});
            }
            return true;
        }

        if (entry.tags.length == 0) {
            // No tags, include (just in case)
            if (options.debug) {
                console.log('no tags', {entry});
            }
            return true;
        }

        let sanitizedTags = [];
        for(let tag of entry.tags) {
            tag = tag.toLowerCase();

            if (releaseNotes.mapTags[tag]) {
                sanitizedTags.push(releaseNotes.mapTags[tag]);
                continue;
            }
            
            const slashParts = tag.split('/');
            if (slashParts.length > 1) {
                for(let tag2 of slashParts) {
                    tag2 = tag2.trim();
                    sanitizedTags.push(releaseNotes.sanitizePlatform(tag2));
                }
                continue;
            }

            sanitizedTags.push(releaseNotes.sanitizePlatform(tag));
        }

        for(const tag of sanitizedTags) {
            if (releaseNotes.ignoreTags.includes(tag)) {
                if (options.debug) {
                    console.log('in ignoreTags', {entry, tag});
                }
                return false;
            }
        }        
        
        {
            const generations = [];
            for(const tag of sanitizedTags) {
                const m = tag.match(/gen[ ]*([0-9]+)/);
                if (m) {
                    generations.push(parseInt(m[1]));
                }
            }
            
            if (generations.length) {
                // If there is any gen set, any one can match, otherwise filter out
                for(const gen of generations) {
                    if (gen == releaseNotes.filterOptions.platform.generation) {
                        if (options.debug) {
                            console.log('including by generation', {entry, gen});
                        }
                        return true;
                    }
                }
                if (options.debug) {
                    console.log('omitting by generation', {entry, generations});
                }
                return false;
            }
        }
        {
            const platforms = [];
            for(const tag of sanitizedTags) {
                for(const key in releaseNotes.carriersJson.deviceConstants) {
                    if (tag == carriersJson.deviceConstants[key].name) {
                        platforms.push(tag);
                    }
                }
            }
            if (platforms.length) {
                // If there is any platform set, any one can match, otherwise filter out
                for(const platform of platforms) {
                    if (platform == releaseNotes.filterOptions.platform.name) {
                        if (options.debug) {
                            console.log('including by platform', {entry, platform});
                        }
                        return true;
                    }
                }
                if (options.debug) {
                    console.log('omitting by platform', {entry, platforms});
                }
                return false;
            }
        }
        {
            const mcus = [];
            for(const tag of sanitizedTags) {
                for(const key in releaseNotes.carriersJson.deviceConstants) {
                    if (carriersJson.deviceConstants[key].baseMcu.startsWith(tag)) {
                        // startsWith so nrf52 matches nrf52840
                        mcus.push(tag);
                    }
                }
            }
            if (mcus.length) {
                // If there is any mcu set, any one can match, otherwise filter out
                for(const mcu of mcus) {
                    if (releaseNotes.filterOptions.platform.baseMcu.startsWith(mcu)) {
                        if (options.debug) {
                            console.log('including by mcu', {entry, mcu});
                        }
                        return true;
                    }
                }
                if (options.debug) {
                    console.log('omitting by mcu', {entry, mcus});
                }
                return false;
            }            
        }
        {
            const features = [];
            for(const tag of sanitizedTags) {
                for(const key in releaseNotes.carriersJson.deviceConstants) {
                    for(const feature of carriersJson.deviceConstants[key].features) {
                        if (feature == tag) {
                            features.push(tag);
                        }
                    }
                }
            }
            if (features.length) {
                // If there is any feature set, any one can match, otherwise filter out
                for(const feature of features) {
                    if (releaseNotes.filterOptions.platform.features.includes(feature)) {
                        if (options.debug) {
                            console.log('including by feature', {entry, feature});
                        }
                        return true;
                    }
                }
                if (options.debug) {
                    console.log('omitting by feature', {entry, features});
                }
                return false;
            }            
        }
        {
            const allModemFeatures = [];
            for(const modemObj of releaseNotes.carriersJson.modems) {
                const mfg = modemObj.manufacturer.toLowerCase();
                if (!allModemFeatures.includes(mfg)) {
                    allModemFeatures.push(mfg);
                }

                const model = modemObj.model.toLowerCase();
                if (!allModemFeatures.includes(model)) {
                    allModemFeatures.push(model);
                }
            }
            const modemFeatures = [];
            for(const tag of sanitizedTags) {
                for(const feature of allModemFeatures) {
                    if (feature.indexOf(tag) >= 0) {
                        modemFeatures.push(tag);
                    }
                }
            }

            if (modemFeatures.length) {
                // If this platform does not have a modem, don't include
                if (!releaseNotes.filterOptions.modems) {
                    if (options.debug) {
                        console.log('omitting by lack of modem', {entry});
                    }    
                    return false;
                }
                
                // If there is any feature set, any one can match, otherwise filter out
                for(const feature of modemFeatures) {
                    for(const modemObj of releaseNotes.filterOptions.modems) {
                        const mfg = modemObj.manufacturer.toLowerCase();
                        if (feature == mfg) {
                            if (options.debug) {
                                console.log('including by modem manufacturer', {entry, mfg});
                            }
                            return true;
                        }
    
                        const model = modemObj.model.toLowerCase();
                        if (feature.indexOf(model) >= 0) {
                            if (options.debug) {
                                console.log('including by modem model', {entry, model});
                            }
                            return true;
                        }    
                    }
                }
                if (options.debug) {
                    console.log('omitting by modem features', {entry, modemFeatures});
                }
                return false;
            }                   
        }

        for(const tag of sanitizedTags) {
            if (releaseNotes.includeTags.includes(tag)) {
                if (options.debug) {
                    console.log('including by includeTag', {entry, tag});
                }
                return true;
            }
        }        

        for(const tag of sanitizedTags) {
            if (!releaseNotes.unknownTags.includes(tag)) {
                releaseNotes.unknownTags.push(tag);
            }
        }


        return false;
    }

    releaseNotes.renderOneList = function(items, options = {}) {
        const outputElem = $(releaseNotes.thisPartial).find('.apiHelperOutput');

        const tableElem = document.createElement('table');
        $(tableElem).css('margin', '20px 0px 20px 0px');

        const theadElem = document.createElement('thead');
        const trElem = document.createElement('tr');
        {
            const thElem = document.createElement('th');
            $(thElem).text('Description');
            $(trElem).append(thElem);
        }
        {
            const thElem = document.createElement('th');
            $(thElem).text('Tags');
            $(trElem).append(thElem);
        }
        {
            const thElem = document.createElement('th');
            $(thElem).text('Pull Request');
            $(trElem).append(thElem);
        }
        if (options.showVersion) {
            const thElem = document.createElement('th');
            $(thElem).text('Version');
            $(trElem).append(thElem);
        }
        $(theadElem).append(trElem);
        $(tableElem).append(theadElem);

        const tbodyElem = document.createElement('tbody');

        let textWidth = 500;
        if (options.showVersion) {
            textWidth -= 80;
        }


        for(const entry of items) {
            let debug = false;
            if (releaseNotes.debugPrs && entry.prs) {
                for(const pr1 of releaseNotes.debugPrs) {
                    for(const pr2 of entry.prs) {
                        if (pr1 == pr2) {
                            debug = true;
                        }
                    }
                }
            }

            if (!releaseNotes.includePlatform(entry, {debug})) {
                if (debug) {
                    console.log('entry omitted', entry);
                }
                continue;
            }
            if (debug) {
                console.log('entry allowed', entry);
            }

            // Special case: Some items have 'wifi' in the text but not a tag
            if (releaseNotes.filterPlatform) {
                const title = entry.text.toLowerCase();

                if (title.indexOf('wifi') >= 0 && title.indexOf('cellular') < 0) {
                    if (!releaseNotes.filterPlatform.features.includes('wifi')) {
                        continue;
                    }
                }
            } 

            const trElem = document.createElement('tr');

            {
                const tdElem = document.createElement('td');
                $(tdElem).css('width', textWidth + 'px');
                $(tdElem).text(entry.text);
                $(trElem).append(tdElem);
            }
            {
                const tdElem = document.createElement('td');
                $(tdElem).css('width', '90px');
                if (entry.tags) {
                    $(tdElem).text(entry.tags.join(' '));
                }
                $(trElem).append(tdElem);
            }
            {
                const tdElem = document.createElement('td');
                $(tdElem).css('width', '90px');
                if (entry.prs) {
                    for(const pr of entry.prs) {
                        const aElem = document.createElement('a');
                        $(aElem).text(pr);                              
                        
                        const pullObj = releaseNotes.releaseNotesJson.pulls[pr.toString()];
                        if (pullObj) {
                            $(aElem).attr('href', pullObj.url);
                            $(aElem).attr('title', pullObj.title);                                    
                        }
                        
                        $(tdElem).append(aElem);
                        $(tdElem).append(document.createTextNode(' ')); 
                    }
                    // $(tdElem).text(entry.prs.join(' '));
                }
                $(trElem).append(tdElem);
            }
            if (options.showVersion) {
                const tdElem = document.createElement('td');
                $(tdElem).css('width', '80px');
                if (entry.version) {
                    const releaseObj = releaseNotes.releaseNotesJson.releases[entry.version];
                    
                    const aElem = document.createElement('a');
                    $(aElem).attr('href', releaseObj.url);
                    $(aElem).text(entry.version);

                    $(tdElem).append(aElem)
                }
                $(trElem).append(tdElem);
            }
            
            $(tbodyElem).append(trElem);
        }

        $(tableElem).append(tbodyElem);

        $(outputElem).append(tableElem);            
    }


    releaseNotes.renderList = function(sectionData, options = {}) {
        const outputElem = $(releaseNotes.thisPartial).find('.apiHelperOutput');

        releaseNotes.filterPlatform = null;
        releaseNotes.filterOptions = null;

        if ($(releaseNotes.thisPartial).find('.filterDevice').prop('checked')) {
            releaseNotes.platformId = parseInt($(releaseNotes.thisPartial).find('.filterPlatform').val());
            releaseNotes.filterPlatform = releaseNotes.releaseNotePlatforms.find(e => e.id == releaseNotes.platformId);

            releaseNotes.filterOptions = {};

            releaseNotes.filterOptions.platform = releaseNotes.releaseNotePlatforms.find(e => e.id == releaseNotes.platformId);
            
            for(const skuObj of releaseNotes.carriersJson.skus) {
                if (skuObj.platformId == releaseNotes.platformId) {
                    if (!releaseNotes.filterOptions.skus) {
                        releaseNotes.filterOptions.skus = [];
                    }
                    releaseNotes.filterOptions.skus.push(skuObj);

                    const modemObj = releaseNotes.carriersJson.modems.find(e => e.model == skuObj.modem);
                    if (modemObj) {
                        if (!releaseNotes.filterOptions.modems) {
                            releaseNotes.filterOptions.modems = [];
                        }
                        if (!releaseNotes.filterOptions.modems.find(e => e.model == modemObj.model)) {
                            releaseNotes.filterOptions.modems.push(modemObj);
                        }    
                    }
                }
            }

            console.log('filterOptions', releaseNotes.filterOptions);

        }


        for(const section in sectionData) {
            if (releaseNotes.filterPlatform && releaseNotes.ignoreSections.includes(section)) {
                // Removing sections like INTERNAL when filtering by platform
                continue;
            }

            const sectionElem = document.createElement('h3');
            $(sectionElem).text(section);
            $(outputElem).append(sectionElem);


            releaseNotes.renderOneList(sectionData[section], options);
        }
    }

    releaseNotes.dedupeList = function(items) {
        
        for(let ii = 0; ii < items.length; ii++) {
            for(let jj = 0; jj < ii; jj++) {
                if (items[jj].text == items[ii].text && items[ii].version.startsWith(items[jj].version)) {
                    items.splice(jj, 1);
                    ii--;
                    break;
                }
            }
        }   
    }

    releaseNotes.renderPage = function() {
        const outputElem = $(releaseNotes.thisPartial).find('.apiHelperOutput');

        $(outputElem).empty();

        const mode = $(releaseNotes.thisPartial).find('input:radio[name=mode]:checked').val();

        let searchParams = new URLSearchParams();
        searchParams.set('mode', mode);

        if (releaseNotes.filterPlatform && releaseNotes.platformId) {
            searchParams.set('filter', releaseNotes.platformId);
        }


        if (mode == 'rel1') {
            const ver = $(releaseNotes.thisPartial).find('.versionSelect').val();
            if (ver == '-') {
                return;
            }
            searchParams.set('ver', ver);

            analytics.track('View Version', {category:releaseNotes.gaCategory, label:ver});

            const releaseObj = releaseNotes.releaseNotesJson.releases[ver];

            let sectionData = {};

            for(let entry of releaseObj.entries) {
                entry.version = ver;

                if (!sectionData[entry.section]) {
                    sectionData[entry.section] = [];
                }
                
                sectionData[entry.section].push(entry);
            }

            releaseNotes.renderList(sectionData, {showVersion:false});

            {
                const divElem = document.createElement('div');
                const aElem = document.createElement('a');
                $(aElem).attr('href', releaseObj.url);
                $(aElem).text('View full release notes on Github');
                $(divElem).append(aElem);
                $(outputElem).append(divElem);    
            }
        }
        else
        if (mode == 'rel2') {
            const ver1 = $(releaseNotes.thisPartial).find('.version1Select').val();
            if (ver1 == '-') {
                return;
            }
            const ver2 = $(releaseNotes.thisPartial).find('.version2Select').val();

            searchParams.set('ver1', ver1);
            searchParams.set('ver2', ver2);

            analytics.track('View Cumulative', {category:releaseNotes.gaCategory, label:ver1 + '-' + ver2});

            let includeVer = false;

            let sectionData = {};

            for(const curVer of releaseNotes.versions) {
                const verKey = 'v' + curVer;
                
                if (!includeVer) {
                    if (verKey == ver2) {
                        includeVer = true;
                    }
                }

                if (includeVer) {
                    const releaseObj = releaseNotes.releaseNotesJson.releases[verKey];
                    for(let entry of releaseObj.entries) {
                        entry.version = verKey;

                        if (!sectionData[entry.section]) {
                            sectionData[entry.section] = [];
                        }
                        
                        sectionData[entry.section].push(entry);
                    }                            
                }

                if (includeVer) {
                    if (verKey == ver1) {
                         break;
                    }
                }
            }

            for(const sectionKey in sectionData) {
                releaseNotes.dedupeList(sectionData[sectionKey]);
            }

            releaseNotes.renderList(sectionData, {showVersion:true});
        }
        else 
        if (mode == 'search') {
            const searchText = $(releaseNotes.thisPartial).find('.searchInput').val();
        
            const afterVer = $(releaseNotes.thisPartial).find('.versionAfterSelect').val();

            if (searchText.length >= 2) {

                searchParams.set('text', searchText);
                searchParams.set('ver', afterVer);

                let items = [];

                const searchResults = releaseNotes.lunrIndex.search(searchText);
                if (searchResults.length > 0) {
                    analytics.track('Success', {category:releaseNotes.gaCategory, label:searchText});
                }
                else {
                    analytics.track('No Results', {category:releaseNotes.gaCategory, label:searchFor});                            
                }

                for(const res of searchResults) {
                    const parts = res.ref.split('/');
                    const ver = parts[0]
                    const index = parseInt(parts[1]);

                    if (afterVer != '-') {
                        if (apiHelper.versionSort(ver, afterVer) > 0) {
                            continue;
                        }
                    }

                    let entry = releaseNotes.releaseNotesJson.releases[ver].entries[index];
                    entry.version = ver;

                    items.push(entry);
                }
                releaseNotes.dedupeList(items);

                releaseNotes.renderOneList(items, {showVersion:true});    
            }
        }
        releaseNotes.unknownTags.sort();
        console.log('unknownTags', releaseNotes.unknownTags);

        window.history.pushState({}, '', '?' + searchParams.toString());
    };


    
    releaseNotes.doSetup = function() {
        $('.apiHelperReleaseNotes').each(function() {
            if (releaseNotes.thisPartial) {
                // Only process first (you can only have one release notes partial per page)
                return;
            }

            releaseNotes.thisPartial = $(this);
    
            analytics.track('Visit', {category:releaseNotes.gaCategory});

            releaseNotes.versions = [];

            for(const releaseName in releaseNotes.releaseNotesJson.releases) {
                if (releaseName.startsWith('v')) {
                    releaseNotes.versions.push(releaseName.substring(1));
                }
            }

            releaseNotes.versions.sort(apiHelper.versionSort);

            
            for(const ver of releaseNotes.versions) {
                const optionElem = document.createElement('option');
                $(optionElem).text(ver);
                $(optionElem).attr('value', 'v' + ver);
            
                $(releaseNotes.thisPartial).find('.versionSelect').append(optionElem);

                const parsed = apiHelper.parseVersionStr(ver);
                if (!parsed.pre) {
                    $(releaseNotes.thisPartial).find('.version1Select').append(optionElem.cloneNode(true));

                    $(releaseNotes.thisPartial).find('.versionAfterSelect').append(optionElem.cloneNode(true));    
                }

                
            }

            $(releaseNotes.thisPartial).find('.versionSelect').on('change', function() {
                const ver = $(releaseNotes.thisPartial).find('.versionSelect').val();
                if (ver != '-') {
                    $(releaseNotes.thisPartial).find('input:radio[name=mode]').prop('checked', false);
                    $(releaseNotes.thisPartial).find('input:radio[name=mode][value=rel1]').prop('checked', true);
                }
                releaseNotes.renderPage();
            });

            const buildMenuVersion2 = function() {
                const ver = $(releaseNotes.thisPartial).find('.version1Select').val();
                if (ver != '-') {
                    $(releaseNotes.thisPartial).find('input:radio[name=mode]').prop('checked', false);
                    $(releaseNotes.thisPartial).find('input:radio[name=mode][value=rel2]').prop('checked', true);

                    $(releaseNotes.thisPartial).find('.version2Select').empty();
                    for(const curVer of releaseNotes.versions) {
                        const verKey = 'v' + curVer;

                        const parsed = apiHelper.parseVersionStr(ver);
                        if (!parsed.pre) {
                            const optionElem = document.createElement('option');
                            $(optionElem).text(curVer);
                            $(optionElem).attr('value', verKey);
                        
                            $(releaseNotes.thisPartial).find('.version2Select').append(optionElem);
                        }
                        if (verKey == ver) {
                            break;
                        }
                    }    
                }
            }

            $(releaseNotes.thisPartial).find('.version1Select').on('change', function() {
                buildMenuVersion2();
                releaseNotes.renderPage();
            });
            $(releaseNotes.thisPartial).find('.version2Select').on('change', function() {
                releaseNotes.renderPage();
            });

            $(releaseNotes.thisPartial).find('.filterDevice').on('click', function() {
                releaseNotes.renderPage();
            });
            $(releaseNotes.thisPartial).find('.filterPlatform').on('change', function() {
                releaseNotes.renderPage();
            });

                
            $(releaseNotes.thisPartial).find('input:radio[name=mode][value=rel1]').on('change', releaseNotes.renderPage);

            let keyTimer;

            const clearKeyTimer = function() {
                if (keyTimer) {
                    clearTimeout(keyTimer);
                    keyTimer = 0;
                }
            }

            $(releaseNotes.thisPartial).find('.searchInput').on('input', function() {
                $(releaseNotes.thisPartial).find('input:radio[name=mode]').prop('checked', false);
                $(releaseNotes.thisPartial).find('input:radio[name=mode][value=search]').prop('checked', true);

                clearKeyTimer();
                keyTimer = setTimeout(releaseNotes.renderPage, 750);
            });

            $(releaseNotes.thisPartial).find('.searchInput').on('blur', function() {
                clearKeyTimer();
                releaseNotes.renderPage();
            });

            $(releaseNotes.thisPartial).find('.searchInput').on('keydown', function(ev) {
                if (ev.key == 'Enter') {
                    clearKeyTimer();
                    releaseNotes.renderPage();
                }
            });

            $(releaseNotes.thisPartial).find('.versionAfterSelect').on('change', function() {
                clearKeyTimer();
                releaseNotes.renderPage();
            });

            $(releaseNotes.thisPartial).find('.showSearchTips').on('click', function() {
                const checked = $(this).prop('checked');
                if (checked) {
                    $(releaseNotes.thisPartial).find('.searchTips').show();
                }
                else {
                    $(releaseNotes.thisPartial).find('.searchTips').hide();
                }
            });




            if (releaseNotes.urlParams) {
                const filterPlatform = releaseNotes.urlParams.get('filter');
                if (filterPlatform) {
                    $(releaseNotes.thisPartial).find('.filterPlatform').val(filterPlatform);
                    $(releaseNotes.thisPartial).find('.filterDevice').prop('checked', true);
                }

                const mode = releaseNotes.urlParams.get('mode');
                if (mode == 'rel1') {
                    const ver = releaseNotes.urlParams.get('ver');
                    if (ver) {
                        $(releaseNotes.thisPartial).find('input:radio[name=mode]').prop('checked', false);
                        $(releaseNotes.thisPartial).find('input:radio[name=mode][value=rel1]').prop('checked', true);
        
                        $(releaseNotes.thisPartial).find('.versionSelect').val(ver);
                        releaseNotes.renderPage();
                    }
                }
                else
                if (mode == 'rel2') {
                    const ver1 = releaseNotes.urlParams.get('ver1');
                    const ver2 = releaseNotes.urlParams.get('ver2');
                    if (ver1 && ver2) {
                        $(releaseNotes.thisPartial).find('input:radio[name=mode]').prop('checked', false);
                        $(releaseNotes.thisPartial).find('input:radio[name=mode][value=rel2]').prop('checked', true);
                                
                        $(releaseNotes.thisPartial).find('.version1Select').val(ver1);
                        buildMenuVersion2();

                        $(releaseNotes.thisPartial).find('.version2Select').val(ver2);
                        releaseNotes.renderPage();
                    }
                }
                else
                if (mode == 'search') {
                    const text = releaseNotes.urlParams.get('text');
                    const ver = releaseNotes.urlParams.get('ver') || '-';
                    if (text && ver) {
                        $(releaseNotes.thisPartial).find('input:radio[name=mode]').prop('checked', false);
                        $(releaseNotes.thisPartial).find('input:radio[name=mode][value=search]').prop('checked', true);

                        $(releaseNotes.thisPartial).find('.searchInput').val(text);
                        $(releaseNotes.thisPartial).find('.versionAfterSelect').val(ver);
                        releaseNotes.renderPage();
                    }
                }
            }

            if (releaseNotes.defaultSearchAfter && $(releaseNotes.thisPartial).find('.versionAfterSelect').val() == '-') {
                $(releaseNotes.thisPartial).find('.versionAfterSelect').val(releaseNotes.defaultSearchAfter);
            }
        
        });

    };

    apiHelper.getCarriersJson().then(function(carriersJson) {
        releaseNotes.carriersJson = carriersJson;

        // console.log(carriersJson);
        // carriersJson.deviceConstants (object)
        //   baseMcu, features, generation, name, public, productEligible, displayName
        for(const key in carriersJson.deviceConstants) {
            if (carriersJson.deviceConstants[key].public && carriersJson.deviceConstants[key].productEligible) {
                if (!releaseNotes.hidePlatforms.includes(carriersJson.deviceConstants[key].name)) {
                    releaseNotes.releaseNotePlatforms.push(Object.assign({}, carriersJson.deviceConstants[key]));
                }
            }
        }

        // Sort by display name, alphabetical
        releaseNotes.releaseNotePlatforms.sort(function(a, b) {
            return a.displayName.localeCompare(b.displayName);
        });

        for(const p of releaseNotes.releaseNotePlatforms) {
            const optionElem = document.createElement('option');
            $(optionElem).attr('value', p.id.toString());
            $(optionElem).text(p.displayName);
            $('.filterPlatform').append(optionElem);
        }

        fetch('/assets/files/releaseNotes.json')
            .then(response => response.json())
            .then(function(data) {
                releaseNotes.releaseNotesJson = data;

                // console.log('releaseNotesJson', releaseNotes.releaseNotesJson);

                releaseNotes.lunrIndex = lunr(function() {
                    const lunrThis = this;
                    lunrThis.ref('key');
                    lunrThis.field('prs');
                    lunrThis.field('tags');
                    lunrThis.field('text');

                    for(const releaseName in releaseNotes.releaseNotesJson.releases) {
                        const releaseObj = releaseNotes.releaseNotesJson.releases[releaseName];
                        for(let ii = 0; ii < releaseObj.entries.length; ii++) {
                            const entryObj = releaseObj.entries[ii]
                            let doc = {
                                key: releaseName + '/' + ii.toString(),
                                prs: entryObj.prs.join(', '),
                                tags: entryObj.tags.join(', '),
                                text: entryObj.text,
                            };
                            lunrThis.add(doc);
                        }
                    }
                });

                releaseNotes.doSetup();
            });
    });
    


});
