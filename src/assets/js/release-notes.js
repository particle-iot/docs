
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

            const renderOneList = function(items, options = {}) {
                const outputElem = $(thisPartial).find('.apiHelperOutput');

                const tableElem = document.createElement('table');
                $(tableElem).css('margin', '20px 0px 20px 0px');

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
                            $(tdElem).text(entry.prs.join(' '));
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

                $(outputElem).append(tableElem);            }


            const renderList = function(sectionData, options = {}) {
                const outputElem = $(thisPartial).find('.apiHelperOutput');

                for(const section in sectionData) {
                    const sectionElem = document.createElement('h3');
                    $(sectionElem).text(section);
                    $(outputElem).append(sectionElem);


                    renderOneList(sectionData[section], options);
                }

            }

            const renderPage = function() {
                const outputElem = $(thisPartial).find('.apiHelperOutput');
        
                $(outputElem).empty();
        
                const mode = $(thisPartial).find('input:radio[name=mode]:checked').val();
                console.log('render mode=' + mode);

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

                    renderList(sectionData, {showVersion:true});
                }
                else 
                if (mode == 'search') {
                    const searchText = $(thisPartial).find('.searchInput').val();

                    let items = [];

                    const searchResults = lunrIndex.search(searchText);
                    console.log('searchResults', searchResults);
                    for(const res of searchResults) {
                        const parts = res.ref.split('/');
                        const ver = parts[0]
                        const index = parseInt(parts[1]);

                        let entry = releaseNotesJson.releases[ver].entries[index];
                        entry.version = ver;

                        items.push(entry);
                    }
                    renderOneList(items, {showVersion:true});
                }
            };
        

            for(const releaseName in releaseNotesJson.releases) {
                if (releaseName.startsWith('v')) {
                    versions.push(releaseName.substring(1));
                }
            }

            versions.sort(apiHelper.versionSort);
            
            for(const ver of versions) {
                const optionElem = document.createElement('option');
                $(optionElem).text(ver);
                $(optionElem).attr('value', 'v' + ver);
            
                $(thisPartial).find('.versionSelect').append(optionElem);
            }

            $(thisPartial).find('.versionSelect').on('change', function() {
                const ver = $(thisPartial).find('.versionSelect').val();
                if (ver != '-') {
                    $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                    $(thisPartial).find('input:radio[name=mode][value=releaseNotes1]').prop('checked', true);
                }
                renderPage();
            });

            $(thisPartial).find('input:radio[name=mode][value=releaseNotes1]').on('change', renderPage);

            $(thisPartial).find('.searchInput').on('input', function() {
                $(thisPartial).find('input:radio[name=mode]').prop('checked', false);
                $(thisPartial).find('input:radio[name=mode][value=search]').prop('checked', true);
                renderPage();
            });



            // console.log(lunrIndex.search('ble'));
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