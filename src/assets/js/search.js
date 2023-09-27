$(document).ready(function() {
    const searchEngineId = '03d3813fed2c848ab';
    const searchApiKey = 'AIzaSyBYJjm7PyDU1S42_JMkI7kvCAm43tgvZtw';
    const searchUrlBase = 'https://www.googleapis.com/customsearch/v1';

    const savedSearchKey = 'savedSearch';

    let savedSearchObj;

    const saveSearch = function() {
        if (savedSearchObj) {
            localStorage.setItem(savedSearchKey, JSON.stringify(savedSearchObj));
        }
    }

    const filterUrl = function(url) {
        const defaultDocsUrl = 'https://docs.particle.io/';
        if (url.startsWith(defaultDocsUrl)) {
            // Leave the leading slash
            url = url.substring(defaultDocsUrl.length - 1);
        }   
        return url;
    }

    const closeSearchOverlay = function() {
        $('body').off('keydown');
        $('#searchOverlay').hide();
    }

    const checkButtonEnable = function() {
        const query = $('.searchOverlayQueryInput').val();

        $('.searchOverlaySearchButton').prop('disabled', (query.length == 0));
    }
    checkButtonEnable();

    const searchApiQuery = async function(paramsObj) {
        // https://www.googleapis.com/customsearch/v1?[parameters]

        const searchParams = new URLSearchParams(paramsObj);

        const fetchRes = await fetch(searchUrlBase + '?' + searchParams.toString());
        const fetchJson = await fetchRes.json();

        return fetchJson;
    }

    const appendSearchResult = function(options) {
        // title, link, formattedUrl, htmlFormattedUrl, snippet, htmlSnippet, 
        const resultElem = document.createElement('div');
        $(resultElem).addClass('searchOverlayResult');
        $(resultElem).on('click', function() {
            let targetParams = {
                search: 1,
                q: options.query,
            };
            
            savedSearchObj.lastLink = options.link;
            saveSearch();
            history.pushState(null, '', '#' + new URLSearchParams(targetParams).toString());
            location.href = filterUrl(options.link);
        });

        const titleElem = document.createElement('div');
        $(titleElem).addClass('searchOverlayTitle');
        const aElem = document.createElement('a');
        $(aElem).addClass('searchOverlayTitleAnchor');
        $(aElem).text(options.title);
        $(titleElem).append(aElem);
        $(resultElem).append(titleElem);

        /*
        // Since all links are from docs.particle.io now, skip the visible links as they
        // were not included with Swiftype either, but this is how to add them:
        const linkElem = document.createElement('div');
        $(linkElem).addClass('searchOverlayLink');
        $(linkElem).text(options.formattedUrl);
        $(resultElem).append(linkElem);
        */

        const snippetElem = document.createElement('div');
        $(snippetElem).addClass('searchOverlaySnippet');
        $(snippetElem).html(options.htmlSnippet);
        $(resultElem).append(snippetElem);

        $('.searchOverlayResults').append(resultElem);   

    }

    let fetchPage;

    fetchPage = async function(options) {
        console.log('fetchPage', options);
        try {
            // Parameters described here: https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list
            // linkSite - restrict to this URL (not currently needed because only docs in this engine)
            // start - Index to get more pages of results
            let paramsObj = {
                cx: searchEngineId,
                key: searchApiKey,
                q: options.query,
                start: options.start,
            };

            const resultObj = await searchApiQuery(paramsObj);
            console.log('resultObj', resultObj);

            // On error: has error object with code and message
            if (resultObj.error) {

            }

            $('.searchOverlayLoadMore').remove();

            if (!savedSearchObj.items) {
                savedSearchObj.items = [];
            }

            // items is an array of objects with the results
            for(const item of resultObj.items) {
                appendSearchResult({
                    query: options.query,
                    link: item.link,
                    formattedUrl: item.formattedUrl,
                    title: item.title,
                    htmlSnippet: item.htmlSnippet,
                });

                savedSearchObj.items.push({
                    link: item.link,
                    formattedUrl: item.formattedUrl,
                    title: item.title,
                    htmlSnippet: item.htmlSnippet,
                });
        
            }

            // queries.nextPage (array of objects): count, startIndex, totalResults (string!)
            if (resultObj.queries.nextPage && resultObj.queries.nextPage.length == 1) {
                const next = resultObj.queries.nextPage[0];

                const loadMoreDivElem = document.createElement('div');
                $(loadMoreDivElem).addClass('searchOverlayLoadMore');

                const aElem = document.createElement('a');
                $(aElem).append('Load more results');
                $(aElem).on('click', function() {
                    $(aElem).prop('disabled', true);
                    fetchPage({
                        query: options.query,
                        start: next.startIndex,
                    })
                });
                
                $(loadMoreDivElem).append(aElem);

                $('.searchOverlayResults').append(loadMoreDivElem);
            }

            
        }
        catch(e) {
            console.log('search exception', e);
        }

    }

    const openSearch = function(options) {
        console.log('openSearch');
        $('body').on('keydown', function(ev) {
            switch(ev.key) {
                case 'Esc':
                case 'Escape':
                    closeSearchOverlay();
                    ev.preventDefault();
                    break;
                    
                case 'Enter':
                    if (!$('.searchOverlaySearchButton').prop('disabled')) {
                        doSearch();
                    }
                    break;
            }
        });

        $('#searchOverlay').show();
        $('.searchOverlayQueryInput').focus();

        if (savedSearchObj && savedSearchObj.q) {
            $('.searchOverlayQueryInput').val(savedSearchObj.q);
        }
    }

    const doSearch = async function() {
        console.log('doSearch');
        $('.searchOverlaySearchButton').prop('disabled', true);
        $('.searchOverlayResults').empty();
        
        const query = $('.searchOverlayQueryInput').val();
        console.log('doSearch query=' + query);

        savedSearchObj.q = query;

        await fetchPage({
            query,
            start: 1,
        })

        $('.searchOverlaySearchButton').prop('disabled', false);
    }

    $('.searchOverlaySearchButton').on('click', doSearch);

    $('.searchOverlayCloseIcon').on('click', closeSearchOverlay);

    $('.searchIcon').on('click', function() {

        openSearch({});
    });

    $('.searchOverlayQueryInput').on('keydown', function(ev) {
        switch(ev.key) {
            case 'Esc':
            case 'Escape':
                closeSearchOverlay();
                ev.preventDefault();
                break;    
        }
    });

    $('.searchOverlayQueryInput').on('input', function() {
        checkButtonEnable();
    });

    try {
        const str = localStorage.getItem(savedSearchKey);
        if (str) {
            savedSearchObj = JSON.parse(str);
        }
    }
    catch(e) {
        console.log('exception loading saved search', e);
    }
    if (!savedSearchObj) {
        savedSearchObj = {};
    }


    if (window.location.hash && window.location.hash.startsWith("#search=1&")) {
        const searchParam = new URLSearchParams(window.location.hash.substring(1));

        const query = searchParam.get('q');
        if (query) {
            console.log('loadQuery query=' + query, savedSearchObj);

            if (savedSearchObj && savedSearchObj.q) {
                if (savedSearchObj.q == query && Array.isArray(savedSearchObj.items)) {
                    // Same as previous
                    console.log('loadQuery query=' + query + ' reloading');

                    for(const item of savedSearchObj.items) {
                        appendSearchResult({
                            query,
                            link: item.link,
                            formattedUrl: item.formattedUrl,
                            title: item.title,
                            htmlSnippet: item.htmlSnippet,
                        });
                    }        
                }
                else {
                    // Going back farther in history, probably. Load again.
                    console.log('loadQuery query=' + query + ' need to search again');
                    savedSearchObj.q = query;
                    delete savedSearchObj.items;
                    saveSearch();
                }      

                openSearch({});
            }            
        }
    }
    checkButtonEnable();
});

/*
$(document).ready(function() {
    const engineKey = 'xqs6ySrzs42txxzuWP_A';

    const resultTemplate = Handlebars.compile('<div class="st-result"><h3 class="title"><a href="{{url}}" class="st-search-result-link">{{title}}</a></h3><div class="st-metadata"><span class="st-snippet">{{{body}}}</span></div></div>');
        
    const filterUrl = function(url) {
        const defaultDocsUrl = 'https://docs.particle.io/';
        if (url.startsWith(defaultDocsUrl)) {
            // Leave the leading slash
            url = url.substring(defaultDocsUrl.length - 1);
        }   
        return url;
    }

    const customRenderer = function(documentType, item) {
        var data = {
          title: item['title'],
          url: filterUrl(item['url']),
          body: item.highlight['body'] || item.body.substring(0, 300),
        };
        return resultTemplate(data);
    };

    $('#st-search-input').on('keydown', function(ev) {
        if (ev.key != 'Enter') {
            return;
        }

        const searchText = $('#st-search-input').val();
        if (searchText) {
            ev.preventDefault();
            const searchTextEnc = encodeURI(searchText);
            location.href = '/search?#stq=' + searchTextEnc + '&stp=1';    
        }
    });

    var autocompleteRenderFunction = function(document_type, item) {
        const url = filterUrl(item['url']);
        
        var out = '<p class="title"><a href="' + Swiftype.htmlEscape(url) + '" class="st-search-result-link">' + Swiftype.htmlEscape(item['title']) + '</a></p>';
        return out;
    };

    $('#st-search-input').swiftype({
        // Autocomplete
        renderFunction: autocompleteRenderFunction,
        engineKey
    });
    $('#st-search-input-page').swiftypeSearch({
        // Form-based
        resultContainingElement: '#st-results-container',
        renderFunction: customRenderer,
        engineKey
    });

    if (window.location.hash && window.location.hash.startsWith('#stq=')) {
        // Search parameters in URL
        let searchTerm = window.location.hash.substring(5); // Skip over #stq=
        const sepIndex = searchTerm.indexOf('&');
        if (sepIndex >= 0) {
            searchTerm = searchTerm.substring(0, sepIndex);
        }
        try {
            searchTerm = decodeURI(searchTerm);
            $('#st-search-input-page').val(searchTerm);    
        }
        catch(e) {

        }
    }
});    
*/