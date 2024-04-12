
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
            'deprecation',
            'ota',
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

        // Various things that are filled in later
        releaseNotePlatforms: [],
        unknownTags: [],
    };

    const sanitizePlatform = function(platform) {
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

    const includePlatform = function(entry, filterPlatform) {
        if (!filterPlatform) { 
            // No filtering enabled
            return true;
        }

        if (entry.tags.length == 0) {
            // No tags, include (just in case)
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
                    sanitizedTags.push(sanitizePlatform(tag2));
                }
                continue;
            }

            sanitizedTags.push(sanitizePlatform(tag));
        }

        for(const tag of sanitizedTags) {
            if (releaseNotes.ignoreTags.includes(tag)) {
                return false;
            }
            if (releaseNotes.includeTags.includes(tag)) {
                return true;
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
                    if (gen == filterPlatform.generation) {
                        return true;
                    }
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
                    if (platform == filterPlatform.name) {
                        return true;
                    }
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
                    if (filterPlatform.baseMcu.startsWith(mcu)) {
                        return true;
                    }
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
                    if (filterPlatform.features.includes(feature)) {
                        return true;
                    }
                }
                return false;
            }            
        }


        for(const tag of sanitizedTags) {
            if (!releaseNotes.unknownTags.includes(tag)) {
                releaseNotes.unknownTags.push(tag);
            }
        }


        return false;
    }

    const doSetup = function() {
        $('.apiHelperReleaseNotes').each(function() {
            const thisPartial = $(this);
    
            analytics.track('Visit', {category:releaseNotes.gaCategory});

            const versions = [];

            for(const releaseName in releaseNotes.releaseNotesJson.releases) {
                if (releaseName.startsWith('v')) {
                    versions.push(releaseName.substring(1));
                }
            }

            versions.sort(apiHelper.versionSort);
            const renderOneList = function(items, options = {}) {
                const outputElem = $(thisPartial).find('.apiHelperOutput');

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

                let filterPlatform;
                if ($(thisPartial).find('.filterDevice').prop('checked')) {
                    const platformId = parseInt($(thisPartial).find('.filterPlatform').val());

                    filterPlatform = releaseNotes.releaseNotePlatforms.find(e => e.id == platformId);
                    console.log('filterPlatform', filterPlatform);
                }

                for(const entry of items) {
                    if (!includePlatform(entry, filterPlatform)) {
                        continue;
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


            const renderList = function(sectionData, options = {}) {
                const outputElem = $(thisPartial).find('.apiHelperOutput');

                let filterPlatform;
                if ($(thisPartial).find('.filterDevice').prop('checked')) {
                    const platformId = parseInt($(thisPartial).find('.filterPlatform').val());
                    filterPlatform = releaseNotes.releaseNotePlatforms.find(e => e.id == platformId);
                }

                for(const section in sectionData) {
                    if (filterPlatform && releaseNotes.ignoreSections.includes(section)) {
                        // Removing sections like INTERNAL when filtering by platform
                        continue;
                    }

                    const sectionElem = document.createElement('h3');
                    $(sectionElem).text(section);
                    $(outputElem).append(sectionElem);


                    renderOneList(sectionData[section], options);
                }
            }

            const dedupeList = function(items) {
                
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

            const renderPage = function() {
                const outputElem = $(thisPartial).find('.apiHelperOutput');
        
                $(outputElem).empty();
        
                const mode = $(thisPartial).find('input:radio[name=mode]:checked').val();

                let searchParams = new URLSearchParams();
                searchParams.set('mode', mode);

                if ($(thisPartial).find('.filterDevice').prop('checked')) {
                    const platformId = parseInt($(thisPartial).find('.filterPlatform').val());
                    searchParams.set('filter', platformId);
                }


                if (mode == 'rel1') {
                    const ver = $(thisPartial).find('.versionSelect').val();
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

                    renderList(sectionData, {showVersion:false});

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
                    const ver1 = $(thisPartial).find('.version1Select').val();
                    if (ver1 == '-') {
                        return;
                    }
                    const ver2 = $(thisPartial).find('.version2Select').val();

                    searchParams.set('ver1', ver1);
                    searchParams.set('ver2', ver2);

                    analytics.track('View Cumulative', {category:releaseNotes.gaCategory, label:ver1 + '-' + ver2});

                    let includeVer = false;

                    let sectionData = {};

                    for(const curVer of versions) {
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
                        dedupeList(sectionData[sectionKey]);
                    }

                    renderList(sectionData, {showVersion:true});
                }
                else 
                if (mode == 'search') {
                    const searchText = $(thisPartial).find('.searchInput').val();
                
                    const afterVer = $(thisPartial).find('.versionAfterSelect').val();

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
                        dedupeList(items);
    
                        renderOneList(items, {showVersion:true});    
                    }
                }
                releaseNotes.unknownTags.sort();
                console.log('unknownTags', releaseNotes.unknownTags);

                window.history.pushState({}, '', '?' + searchParams.toString());
            };
        

            
            for(const ver of versions) {
                const optionElem = document.createElement('option');
                $(optionElem).text(ver);
                $(optionElem).attr('value', 'v' + ver);
            
                $(thisPartial).find('.versionSelect').append(optionElem);

                const parsed = apiHelper.parseVersionStr(ver);
                if (!parsed.pre) {
                    $(thisPartial).find('.version1Select').append(optionElem.cloneNode(true));

                    $(thisPartial).find('.versionAfterSelect').append(optionElem.cloneNode(true));    
                }

                
            }

            $(thisPartial).find('.versionSelect').on('change', function() {
                const ver = $(thisPartial).find('.versionSelect').val();
                if (ver != '-') {
                    $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                    $(thisPartial).find('input:radio[name=mode][value=rel1]').prop('checked', true);
                }
                renderPage();
            });

            const buildMenuVersion2 = function() {
                const ver = $(thisPartial).find('.version1Select').val();
                if (ver != '-') {
                    $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                    $(thisPartial).find('input:radio[name=mode][value=rel2]').prop('checked', true);

                    $(thisPartial).find('.version2Select').empty();
                    for(const curVer of versions) {
                        const verKey = 'v' + curVer;

                        const parsed = apiHelper.parseVersionStr(ver);
                        if (!parsed.pre) {
                            const optionElem = document.createElement('option');
                            $(optionElem).text(curVer);
                            $(optionElem).attr('value', verKey);
                        
                            $(thisPartial).find('.version2Select').append(optionElem);
                        }
                        if (verKey == ver) {
                            break;
                        }
                    }    
                }
            }

            $(thisPartial).find('.version1Select').on('change', function() {
                buildMenuVersion2();
                renderPage();
            });
            $(thisPartial).find('.version2Select').on('change', function() {
                renderPage();
            });

            $(thisPartial).find('.filterDevice').on('click', function() {
                renderPage();
            });
            $(thisPartial).find('.filterPlatform').on('change', function() {
                renderPage();
            });

                
            $(thisPartial).find('input:radio[name=mode][value=rel1]').on('change', renderPage);

            let keyTimer;

            const clearKeyTimer = function() {
                if (keyTimer) {
                    clearTimeout(keyTimer);
                    keyTimer = 0;
                }
            }

            $(thisPartial).find('.searchInput').on('input', function() {
                $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                $(thisPartial).find('input:radio[name=mode][value=search]').prop('checked', true);

                clearKeyTimer();
                keyTimer = setTimeout(renderPage, 750);
            });

            $(thisPartial).find('.searchInput').on('blur', function() {
                clearKeyTimer();
                renderPage();
            });

            $(thisPartial).find('.searchInput').on('keydown', function(ev) {
                if (ev.key == 'Enter') {
                    clearKeyTimer();
                    renderPage();
                }
            });

            $(thisPartial).find('.versionAfterSelect').on('change', function() {
                clearKeyTimer();
                renderPage();
            });

            $(thisPartial).find('.showSearchTips').on('click', function() {
                const checked = $(this).prop('checked');
                if (checked) {
                    $(thisPartial).find('.searchTips').show();
                }
                else {
                    $(thisPartial).find('.searchTips').hide();
                }
            });




            if (releaseNotes.urlParams) {
                const filterPlatform = releaseNotes.urlParams.get('filter');
                if (filterPlatform) {
                    $(thisPartial).find('.filterPlatform').val(filterPlatform);
                    $(thisPartial).find('.filterDevice').prop('checked', true);
                }

                const mode = releaseNotes.urlParams.get('mode');
                if (mode == 'rel1') {
                    const ver = releaseNotes.urlParams.get('ver');
                    if (ver) {
                        $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                        $(thisPartial).find('input:radio[name=mode][value=rel1]').prop('checked', true);
        
                        $(thisPartial).find('.versionSelect').val(ver);
                        renderPage();
                    }
                }
                else
                if (mode == 'rel2') {
                    const ver1 = releaseNotes.urlParams.get('ver1');
                    const ver2 = releaseNotes.urlParams.get('ver2');
                    if (ver1 && ver2) {
                        $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                        $(thisPartial).find('input:radio[name=mode][value=rel2]').prop('checked', true);
                                
                        $(thisPartial).find('.version1Select').val(ver1);
                        buildMenuVersion2();

                        $(thisPartial).find('.version2Select').val(ver2);
                        renderPage();
                    }
                }
                else
                if (mode == 'search') {
                    const text = releaseNotes.urlParams.get('text');
                    const ver = releaseNotes.urlParams.get('ver') || '-';
                    if (text && ver) {
                        $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                        $(thisPartial).find('input:radio[name=mode][value=search]').prop('checked', true);

                        $(thisPartial).find('.searchInput').val(text);
                        $(thisPartial).find('.versionAfterSelect').val(ver);
                        renderPage();
                    }
                }
            }

            if (releaseNotes.defaultSearchAfter && $(thisPartial).find('.versionAfterSelect').val() == '-') {
                $(thisPartial).find('.versionAfterSelect').val(releaseNotes.defaultSearchAfter);
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

                doSetup();
            });
    });
    


});
