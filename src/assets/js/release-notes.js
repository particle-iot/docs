
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

            const renderPage = function() {
                const outputElem = $(thisPartial).find('.apiHelperOutput');
        
                $(outputElem).empty();
        
                const mode = $(thisPartial).find('input:radio[name=mode]').val();
                console.log('render mode=' + mode);

                if (mode == 'releaseNotes1') {
                    const ver = $(thisPartial).find('.versionSelect').val();
                    if (ver == '-') {
                        return;
                    }
                    const releaseObj = releaseNotesJson.releases[ver];

                    let sectionData = {};

                    for(const entry of releaseObj.entries) {
                        if (!sectionData[entry.section]) {
                            sectionData[entry.section] = [];
                        }
                        
                        sectionData[entry.section].push(entry);
                    }

                    for(const section in sectionData) {
                        const sectionElem = document.createElement('h3');
                        $(sectionElem).text(section);
                        $(outputElem).append(sectionElem);

                        const tableElem = document.createElement('table');
                        $(tableElem).css('margin', '20px 0px 20px 0px');

                        const tbodyElem = document.createElement('tbody');

                        for(const entry of sectionData[section]) {
                            const trElem = document.createElement('tr');

                            {
                                const tdElem = document.createElement('td');
                                $(tdElem).css('width', '500px');
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
                            
                            $(tbodyElem).append(trElem);
                        }

                        $(tableElem).append(tbodyElem);

                        $(outputElem).append(tableElem);

                    }

/*
*/

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
                    $(thisPartial).find('input:radio[name=mode][value=releaseNotes1]').trigger('click');
                }
                renderPage();
            });

            $(thisPartial).find('input:radio[name=mode][value=releaseNotes1]').on('change', renderPage);

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