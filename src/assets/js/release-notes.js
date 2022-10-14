
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    let releaseNotesJson;
    let lunrIndex;


    const doSetup = function() {
        $('.apiHelperReleaseNotes').each(function() {
            const thisPartial = $(this);
    
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
                    textWidth -= 60;
                }

                for(const entry of items) {
                    const trElem = document.createElement('tr');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).css('width', textWidth + 'px');
                        $(tdElem).text(entry.text);
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).css('width', '100px');
                        if (entry.tags) {
                            $(tdElem).text(entry.tags.join(' '));
                        }
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).css('width', '100px');
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
                        $(tdElem).css('width', '60px');
                        if (entry.prs) {
                            $(tdElem).text(entry.version);
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

                for(const section in sectionData) {
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

                if (mode == 'releaseNotes1') {
                    const ver = $(thisPartial).find('.versionSelect').val();
                    if (ver == '-') {
                        return;
                    }
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
                }
                else
                if (mode == 'releaseNotes2') {
                    const ver1 = $(thisPartial).find('.version1Select').val();
                    if (ver1 == '-') {
                        return;
                    }
                    const ver2 = $(thisPartial).find('.version2Select').val();

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
                        let items = [];

                        const searchResults = lunrIndex.search(searchText);
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
                        console.log('items', items);
    
                        renderOneList(items, {showVersion:true});    
                    }
                }
            };
        

            
            for(const ver of versions) {
                const optionElem = document.createElement('option');
                $(optionElem).text(ver);
                $(optionElem).attr('value', 'v' + ver);
            
                $(thisPartial).find('.versionSelect').append(optionElem);

                $(thisPartial).find('.version1Select').append(optionElem.cloneNode(true));

                $(thisPartial).find('.versionAfterSelect').append(optionElem.cloneNode(true));
                
            }

            $(thisPartial).find('.versionSelect').on('change', function() {
                const ver = $(thisPartial).find('.versionSelect').val();
                if (ver != '-') {
                    $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                    $(thisPartial).find('input:radio[name=mode][value=releaseNotes1]').prop('checked', true);
                }
                renderPage();
            });

            $(thisPartial).find('.version1Select').on('change', function() {
                const ver = $(thisPartial).find('.version1Select').val();
                if (ver != '-') {
                    $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                    $(thisPartial).find('input:radio[name=mode][value=releaseNotes2]').prop('checked', true);

                    $(thisPartial).find('.version2Select').empty();
                    for(const curVer of versions) {
                        const verKey = 'v' + curVer;
                        const optionElem = document.createElement('option');
                        $(optionElem).text(curVer);
                        $(optionElem).attr('value', verKey);
                    
                        $(thisPartial).find('.version2Select').append(optionElem);
                        if (verKey == ver) {
                            break;
                        }
                    }        
                }
                renderPage();
            });
            $(thisPartial).find('.version2Select').on('change', function() {
                renderPage();
            });

                
            $(thisPartial).find('input:radio[name=mode][value=releaseNotes1]').on('change', renderPage);

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

        });

    };
    
    fetch('/assets/files/releaseNotes.json')
        .then(response => response.json())
        .then(function(data) {
            releaseNotesJson = data;

            console.log('releaseNotesJson', releaseNotesJson);

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