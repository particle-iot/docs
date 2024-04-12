
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    let releaseNotesJson;
    let lunrIndex;
    const urlParams = new URLSearchParams(window.location.search);

    const defaultSearchAfter = 'v1.4.4';
    const gaCategory = 'Release Note Search';

    let releaseNotePlatforms = [];
    let allTags = [];

    // Platforms to hide from the filter select
    const hidePlatforms = ['trackerm'];

    // Mapped tags (lowercased)
    const mapTags = {
        'm som': 'msom',
    };
    const ignoreTags = [
        'ci',
        'test',
    ];

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
        for(const tag of entry.tags) {
            if (mapTags[tag]) {
                sanitizedTags.push(mapTags[tag]);
                continue;
            }
            
            const slashParts = tag.split('/');
            if (slashParts.length > 1) {
                for(let tag2 of slashParts) {
                    tag2 = tag2.trim();
                    sanitizedTags.push(tag2);
                }
                continue;
            }

            sanitizedTags.push(tag);
        }

        for(const tag of sanitizedTags) {
            if (ignoreTags.includes(tag)) {
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
                    if (gen == filterPlatform.generation) {
                        console.log('filter generations allow', generations);
                        return true;
                    }
                }
                console.log('filter generations omit', generations);
                return false;
            }
        }


//        console.log('sanitizedTags', sanitizedTags);
        
        return true;
    }

    const doSetup = function() {
        $('.apiHelperReleaseNotes').each(function() {
            const thisPartial = $(this);
    
            analytics.track('Visit', {category:gaCategory});

            const versions = [];

            for(const releaseName in releaseNotesJson.releases) {
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

                    filterPlatform = releaseNotePlatforms.find(e => e.id == platformId);
                }

                for(const entry of items) {
                    for(let tag of entry.tags) {
                        tag = tag.toLowerCase();
                        if (!allTags.includes(tag)) {
                            allTags.push(tag);
                        }
                    }

                    if (!includePlatform(entry, filterPlatform)) {
                        console.log('includePlatform exclude', entry);
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
                                
                                const pullObj = releaseNotesJson.pulls[pr.toString()];
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
                            const releaseObj = releaseNotesJson.releases[entry.version];
                            
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
                    filterPlatform = releaseNotePlatforms.find(e => e.id == platformId);
                }

                for(const section in sectionData) {
                    if (filterPlatform && section == 'INTERNAL') {
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

                    analytics.track('View Version', {category:gaCategory, label:ver});

                    const releaseObj = releaseNotesJson.releases[ver];

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

                    analytics.track('View Cumulative', {category:gaCategory, label:ver1 + '-' + ver2});

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
                            const releaseObj = releaseNotesJson.releases[verKey];
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

                        const searchResults = lunrIndex.search(searchText);
                        if (searchResults.length > 0) {
                            analytics.track('Success', {category:gaCategory, label:searchText});
                        }
                        else {
                            analytics.track('No Results', {category:gaCategory, label:searchFor});                            
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
    
                            let entry = releaseNotesJson.releases[ver].entries[index];
                            entry.version = ver;
    
                            items.push(entry);
                        }
                        dedupeList(items);
    
                        renderOneList(items, {showVersion:true});    
                    }
                }
                console.log('allTags', allTags);

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




            if (urlParams) {
                const filterPlatform = urlParams.get('filter');
                if (filterPlatform) {
                    $(thisPartial).find('.filterPlatform').val(filterPlatform);
                    $(thisPartial).find('.filterDevice').prop('checked', true);
                }

                const mode = urlParams.get('mode');
                if (mode == 'rel1') {
                    const ver = urlParams.get('ver');
                    if (ver) {
                        $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                        $(thisPartial).find('input:radio[name=mode][value=rel1]').prop('checked', true);
        
                        $(thisPartial).find('.versionSelect').val(ver);
                        renderPage();
                    }
                }
                else
                if (mode == 'rel2') {
                    const ver1 = urlParams.get('ver1');
                    const ver2 = urlParams.get('ver2');
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
                    const text = urlParams.get('text');
                    const ver = urlParams.get('ver') || '-';
                    if (text && ver) {
                        $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                        $(thisPartial).find('input:radio[name=mode][value=search]').prop('checked', true);

                        $(thisPartial).find('.searchInput').val(text);
                        $(thisPartial).find('.versionAfterSelect').val(ver);
                        renderPage();
                    }
                }
            }

            if (defaultSearchAfter && $(thisPartial).find('.versionAfterSelect').val() == '-') {
                $(thisPartial).find('.versionAfterSelect').val(defaultSearchAfter);
            }
        
        });

    };

    apiHelper.getCarriersJson().then(function(carriersJson) {
        // console.log(carriersJson);
        // carriersJson.deviceConstants (object)
        //   baseMcu, features, generation, name, public, productEligible, displayName
        for(const key in carriersJson.deviceConstants) {
            if (carriersJson.deviceConstants[key].public && carriersJson.deviceConstants[key].productEligible) {
                if (!hidePlatforms.includes(carriersJson.deviceConstants[key].name)) {
                    releaseNotePlatforms.push(Object.assign({}, carriersJson.deviceConstants[key]));
                }
            }
        }

        // Sort by display name, alphabetical
        releaseNotePlatforms.sort(function(a, b) {
            return a.displayName.localeCompare(b.displayName);
        });

        for(const p of releaseNotePlatforms) {
            const optionElem = document.createElement('option');
            $(optionElem).attr('value', p.id.toString());
            $(optionElem).text(p.displayName);
            $('.filterPlatform').append(optionElem);
        }
    });
    
    fetch('/assets/files/releaseNotes.json')
        .then(response => response.json())
        .then(function(data) {
            releaseNotesJson = data;

            // console.log('releaseNotesJson', releaseNotesJson);

            lunrIndex = lunr(function() {
                const lunrThis = this;
                lunrThis.ref('key');
                lunrThis.field('prs');
                lunrThis.field('tags');
                lunrThis.field('text');

                for(const releaseName in releaseNotesJson.releases) {
                    const releaseObj = releaseNotesJson.releases[releaseName];
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
