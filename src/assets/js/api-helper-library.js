$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.apiHelperLibrarySearch').each(function() {
        let lunrIndex;
        let searchOpts = {};
        let searchResults;
        let fetchQueue = [];

        const thisPartial = $(this);

        const searchTextElem = $(thisPartial).find('.apiHelperLibrarySearchField');
        const searchButtonElem = $(thisPartial).find('.apiHelperLibrarySearchButton');
        const searchOutputElem = $(thisPartial).find('.apiHelperLibrarySearchOutput');
        const searchShowTipsElem = $(thisPartial).find('.apiHelperLibrarySearchShowTips');
        const searchTipsElem = $(thisPartial).find('.apiHelperLibrarySearchTips');
        const searchViewMoreElem = $(thisPartial).find('.apiHelperLibraryViewMoreButton');

        const librarySearchStorageKey = 'librarySearch';

        $(searchShowTipsElem).prop('checked', false);

        const fetchRange = function(start, end) {            
            for(let ii = start; ii < end && ii < searchResults.length; ii++) {
                fetchQueue.push(searchResults[ii].ref)
            }
            fetchResults();            

            if (end < searchResults.length) {
                $(searchViewMoreElem).show();
            }
            else {
                $(searchViewMoreElem).hide();
            }
        };

        const fetchMore = function() {
            const start = searchOpts.num;
            searchOpts.num += 20;
            if (searchOpts.num > searchResults.length) {
                searchOpts.num = searchResults.length;
            }
            sessionStorage.setItem(librarySearchStorageKey, JSON.stringify(searchOpts));

            fetchRange(start, searchOpts.num);
        };

        const fetchResults = function() {
            if (fetchQueue.length == 0) {
                return;
            }

            const name = fetchQueue.shift();
            const url = '/assets/files/libraries/' + name + '.json';

            fetch(url)
                .then(response => response.json())
                .then(function(libInfo) {
                    // 

                    let html = '<h3><a href="' + libInfo.cardUrl + '">' + libInfo.id + '</a></h3>';
                    $(searchOutputElem).append(html);
                    
                    $(searchOutputElem).append('<ul>');

                    $(searchOutputElem).append($(document.createElement('li')).text('Version: ' + libInfo.attributes.version));

                    $(searchOutputElem).append($(document.createElement('li')).text('Installs: ' + libInfo.attributes.installs));

                    if (libInfo.verification) {
                        $(searchOutputElem).append($(document.createElement('li')).text('Verification: ' + libInfo.verification));
                    }
                    if (libInfo.attributes.license) {
                        $(searchOutputElem).append($(document.createElement('li')).text('License: ' + libInfo.attributes.license));
                    }

                    if (libInfo.attributes.author) {
                        $(searchOutputElem).append($(document.createElement('li')).text('Author: ' + libInfo.attributes.author));
                    }
                    if (libInfo.attributes.maintainer) {
                        $(searchOutputElem).append($(document.createElement('li')).text('Maintainer: ' + libInfo.attributes.maintainer));
                    }

                    $(searchOutputElem).append('</ul>');

                    if (libInfo.attributes.sentence) {
                        $(searchOutputElem).append($(document.createElement('p')).text(libInfo.attributes.sentence));
                    }
                    if (libInfo.attributes.paragraph) {
                        $(searchOutputElem).append($(document.createElement('p')).text(libInfo.attributes.paragraph));
                    }

                    fetchResults();
                });
        }

        $(searchViewMoreElem).on('click', fetchMore);

        $(searchShowTipsElem).on('change', function() {
            if (this.checked) {
                $(searchTipsElem).show();
            }
            else {
                $(searchTipsElem).hide();
            }
        });

        $(searchTextElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(searchButtonElem).trigger('click');    
        });

        $(searchButtonElem).on('click', function() {
            const searchFor = $(searchTextElem).val();  

            if (!lunrIndex) {
                return;
            }

            searchOpts.text = searchFor;
            searchOpts.num = 0;
            sessionStorage.setItem(librarySearchStorageKey, JSON.stringify(searchOpts));

            $(searchOutputElem).html('');

            searchResults = lunrIndex.search(searchFor);
            if (searchResults.length == 0) {
                $(searchOutputElem).text('No matching libraries found');
                analytics.track('No Results', {category:'Library Search', label:searchFor});
            }
            else {
                analytics.track('Success', {category:'Library Search', label:searchFor});
                fetchQueue = [];
                fetchMore();
            }

        });

        $.getScript('/assets/js/lunr.min.js', function(data, textStatus, jqxhr) {
            fetch('/assets/files/librarySearch.json')
                .then(response => response.json())
                .then(function(data) {
                    lunrIndex = lunr.Index.load(data);

                    const savedSearch = sessionStorage.getItem(librarySearchStorageKey);
                    if (savedSearch) {
                        try {
                            searchOpts = JSON.parse(savedSearch);
                            $(searchTextElem).val(searchOpts.text);
                            $(searchButtonElem).trigger('click'); 
                        }
                        catch(e) {
                        }
                    }            
                });

        });
    });

    $('.apiHelperLibraryBuilds').each(function() {
        const thisPartial = $(this);

        const buildFailureElem = $(thisPartial).find('.apiHelperLibraryBuildsFailureNote');

        let libInfo;
        
        const updateTable = function() {
            const deviceOs = $(thisPartial).find('.apiHelperLibraryBuildsVersion').val();

            const buildResults = libInfo.versions[libInfo.attributes.version].builds[deviceOs];

            let examples = [];

            let html = '';
            html += '<tr><th>Example</th>';
            for(const platform in buildResults) {
                html += '<th>' + platform + '</th>';          

                for(const example in buildResults[platform]) {
                    if (!examples.includes(example)) {
                        examples.push(example);
                    }
                }
            }
            html += '</tr>';
            $(thisPartial).find('.apiHelperLibraryBuildsOutput > thead').html(html);

            let hasFailure = false;

            html = '';
            for(const example of examples) {
                html += '<tr>';

                html += '<td>' + example + '</td>';

                for(const platform in buildResults) {
                    let cellContents;

                    if (buildResults[platform][example] === true) {
                        cellContents = '\u2705'; // Green Check
                    }
                    else if (buildResults[platform][example] === false) {
                        cellContents = '\u274C'; // Red X
                        hasFailure = true;
                    }    
                    else {
                        cellContents = 'nbsp;';
                    }

                    html += '<td style="text-align: center;">' + cellContents + '</td>';
                }
                html += '</tr>';
            }

            $(thisPartial).find('.apiHelperLibraryBuildsOutput > tbody').html(html);

            if (hasFailure) {
                $(buildFailureElem).show();
            }
            else {
                $(buildFailureElem).hide();
            }
        };

        fetch($(thisPartial).attr('data-info'))
            .then(response => response.json())
            .then(function(data) {
            // 
            libInfo = data;
            $(thisPartial).find('.apiHelperLibraryBuildsVersion').html('');

            const builds = libInfo.versions[libInfo.attributes.version].builds;

            // Convert object to array
            let buildVersions = [];
            for(const version in builds) {
                buildVersions.push(version);
            }
            buildVersions.sort(apiHelper.versionSort);

            for(const deviceOs of buildVersions) {
                let html = '';
                html += '<option value="' + deviceOs + '">' + deviceOs + '</option>\n';
                $(thisPartial).find('.apiHelperLibraryBuildsVersion').append(html);
            }
            updateTable();
        });        

        $(thisPartial).find('.apiHelperLibraryBuildsVersion').on('change', updateTable);
    });

    $('.apiHelperLibraryBrowser').each(function() {
        const thisPartial = $(this);

        let extractedFiles;
        let libInfo;

        const updateFileSelector = function() {            
            $(thisPartial).find('.apiHelperLibrarySelect').show();
            $(thisPartial).find('.apiHelperLibraryBrowserOutput').show();

            const sel = $(thisPartial).find('.apiHelperLibrarySelect');
            $(sel).html('<option value="-1" selected>Select file to view</option>');

            for(let ii = 0; ii < extractedFiles.length; ii++) {
                const f = extractedFiles[ii];

                if (f.size == 0) { // f.name == '.' || f.name == '.git'
                    continue;
                }
                $(sel).append('<option value="' + ii + '">' + f.name + '</option>');
            }
        };

        const updateFile = function() {
            const sel = $(thisPartial).find('.apiHelperLibrarySelect');
            const index = parseInt($(sel).val());

            const outputDivElem = $(thisPartial).find('.apiHelperLibraryBrowserOutputDiv');
            $(outputDivElem).hide();

            const outputPreElem = $(thisPartial).find('.apiHelperLibraryBrowserOutputPre');
            $(outputPreElem).hide();

            const outputCodeElem = $(thisPartial).find('.apiHelperLibraryBrowserOutputCode');
            $(outputCodeElem).hide();

            if (index < 0) {
                return;
            }

            const name = extractedFiles[index].name;
            analytics.track('View', {category:'Library View', label:libInfo.id + ' ' + name});

            if (name.endsWith('.txt') || name.endsWith('.properties') || name.toUpperCase().startsWith('LICENSE')) {
                $(outputPreElem).find('pre').text(extractedFiles[index].readAsString());
                $(outputPreElem).show();
            }
            else if (name.endsWith('.md')) {
                var converter = new showdown.Converter();
                
                converter.setFlavor('github');

                $(outputDivElem).html(converter.makeHtml(extractedFiles[index].readAsString()));

                // 
                $(outputDivElem).find('img').each(function() {
                    const src = $(this).attr('src');
                    const lowerSrc = src.toLowerCase();
                    if (!lowerSrc.startsWith('http') && !lowerSrc.startsWith('/')) {
                        $(this).after('<span>[image unavailable]</span>');
                        $(this).hide();
                    }
                });

                $(outputDivElem).show();
            }
            else {
                $(outputCodeElem).show();

                const thisCodeElem = $(outputCodeElem).find('code');
                $(thisCodeElem).text(extractedFiles[index].readAsString());
                $(thisCodeElem).removeClass('prettyprinted');
                if (prettyPrint) {
                    prettyPrint();
                }    
            }
        };

        $(thisPartial).find('.apiHelperLibrarySelect').on('change', function() {
            if (extractedFiles) {
                updateFile();
            }
            else {
            }
        });

        $(thisPartial).find('.apiHelperLibraryStart').on('click', function() {
            $(thisPartial).find('.apiHelperLibraryStart').hide();
            $(thisPartial).find('.apiHelperLibrarySelect').show();

            fetch($(thisPartial).attr('data-info'))
                .then(response => response.json())
                .then(function(data) {
                // 
                libInfo = data;

                analytics.track('Download', {category:'Library View', label:libInfo.id});

                fetch(libInfo.links.download)
                    .then(response => response.arrayBuffer())
                    .then(function(gzipData) {
                    const tarData = window.pako.inflate(gzipData);

                    untar(tarData.buffer)
                        .progress(function(data) {
                        })
                        .then(function(data) {
                            extractedFiles = data;
                            updateFileSelector();
                        }); 
                });
            });            
                
        });



    });
});


