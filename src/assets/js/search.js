$(document).ready(function() {
    const searchEngineId = '03d3813fed2c848ab';
    const searchApiKey = 'AIzaSyBYJjm7PyDU1S42_JMkI7kvCAm43tgvZtw';
    const searchUrlBase = 'https://www.googleapis.com/customsearch/v1';

    const savedSearchKey = 'savedSearch';
    const searchHistorySize = 10;
    const autocompleteDelay = 750; // milliseconds

    let savedSearchObj;
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


    const saveSearch = function() {
        if (savedSearchObj) {
            localStorage.setItem(savedSearchKey, JSON.stringify(savedSearchObj));
        }
    }

    const filterUrl = function(url, options = {}) {        
        const defaultDocsUrl = 'https://docs.particle.io/';
        if (url.startsWith(defaultDocsUrl)) {
            // Leave the leading slash
            url = url.substring(defaultDocsUrl.length - 1);

            let targetParams = {
                q: options.query,
            };
            url += '?' + new URLSearchParams(targetParams).toString();
        }   
        return url;
    }

    const includeUrl = function(url) {
        const filteredUrl = filterUrl(url);

        if (filteredUrl.startsWith('/reference/device-os/firmware/')) {
            // Don't include single-page firmware API references
            return false;
        }
        if (filteredUrl.startsWith('/troubleshooting/led/')) {
            // This is the only page that forks per platform. Only include the boron result.
            if (!filteredUrl.includes('boron')) {
                return false;
            }
        }

        return true;
    }

    const closeSearchOverlay = function() {
        if (savedSearchObj) {
            if (savedSearchObj.q == $('.searchOverlayQueryInput').val()) {
                savedSearchObj.lastScroll = $('#searchOverlay').scrollTop();
            }
            else {
                savedSearchObj.q = $('.searchOverlayQueryInput').val();
                delete savedSearchObj.items;

                savedSearchObj.lastScroll = 0;
            }
            saveSearch();
        }
        $('body').off('keydown');
        $('#searchOverlay').hide();
    }

    const checkButtonEnable = function() {
        const query = $('.searchOverlayQueryInput').val();

        $('.searchOverlaySearchButton').prop('disabled', (query.length == 0));        
        $('.searchOverlayClearButton').prop('disabled', (query.length == 0));
    }
    checkButtonEnable();

    const searchApiQuery = async function(paramsObj) {
        // https://www.googleapis.com/customsearch/v1?[parameters]

        const searchParams = new URLSearchParams(paramsObj);

        const fetchRes = await fetch(searchUrlBase + '?' + searchParams.toString());
        const fetchJson = await fetchRes.json();

        return fetchJson;
    }

    const appendLoadMore = function() {
        if (!savedSearchObj.nextStartIndex) {
            return;
        }

        const loadMoreDivElem = document.createElement('div');
        $(loadMoreDivElem).addClass('searchOverlayLoadMore');

        const aElem = document.createElement('a');
        $(aElem).append('Load more results');
        $(aElem).on('click', function() {
            $(aElem).prop('disabled', true);
            fetchPage({
                query: savedSearchObj.q,
                start: savedSearchObj.nextStartIndex,
            })
        });
        
        $(loadMoreDivElem).append(aElem);

        $('.searchOverlayResults').append(loadMoreDivElem);
    
    }

    const appendSearchResult = function(options) {
        // Available fields are configured in fetchPage
        // title, link, formattedUrl, htmlSnippet, 
        const resultElem = document.createElement('div');
        $(resultElem).addClass('searchOverlayResult');
        $(resultElem).on('click', function() {
            let targetParams = {
                search: 1,
                q: options.query,
            };
            
            savedSearchObj.items.find(e => e.link == options.link).visited = true;
            savedSearchObj.lastLink = options.link;
            savedSearchObj.lastScroll = $('#searchOverlay').scrollTop();
            saveSearch();
            history.pushState(null, '', '#' + new URLSearchParams(targetParams).toString());
            location.href = filterUrl(options.link, options);
        });

        const titleElem = document.createElement('div');
        $(titleElem).addClass('searchOverlayTitle');
        const aElem = document.createElement('a');
        $(aElem).addClass('searchOverlayTitleAnchor');
        $(aElem).text(options.title);
        $(titleElem).append(aElem);
        if (options.visited) {
            const spanElem = document.createElement('span');
            $(spanElem).html(' &check;');
            $(titleElem).append(spanElem); 
        }
        $(resultElem).append(titleElem);

        let showLink = false;
        const lastDot = options.formattedUrl.lastIndexOf('.');
        if (lastDot > 0) {
            const ext = options.formattedUrl.substring(lastDot + 1).toLowerCase().trim();
            switch(ext) {
                case 'pdf':
                    showLink = true;
                    break;
            }
        }
        if (showLink) {
            const linkElem = document.createElement('div');
            $(linkElem).addClass('searchOverlayLink');
            $(linkElem).text(options.formattedUrl);
            $(resultElem).append(linkElem);    
        }


        const snippetElem = document.createElement('div');
        $(snippetElem).addClass('searchOverlaySnippet');
        $(snippetElem).html(options.htmlSnippet);
        $(resultElem).append(snippetElem);

        $('.searchOverlayResults').append(resultElem);   

    }

    const fetchPage = async function(options) {
        try {
            // Parameters described here: https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list
            // linkSite - restrict to this URL (not currently needed because only docs in this engine)
            // start - Index to get more pages of results
            let paramsObj = {
                cx: searchEngineId,
                key: searchApiKey,
                q: options.query,
                start: options.start,
                fields: 'items(title,link,formattedUrl,htmlSnippet),queries(nextPage)',
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
                if (includeUrl(item.link)) {
                    appendSearchResult(Object.assign({query: savedSearchObj.q}, item));
                    savedSearchObj.items.push(item);            
                }
            }

            if (resultObj.queries && resultObj.queries.nextPage && resultObj.queries.nextPage.length == 1) {
                const next = resultObj.queries.nextPage[0];
                savedSearchObj.nextStartIndex = next.startIndex;
            }
            else {
                savedSearchObj.nextStartIndex = 0;
            }

            saveSearch();

            appendLoadMore();

            
        }
        catch(e) {
            console.log('search exception', e);
        }

    }

    const openSearch = function(options) {
        $('body').on('keydown', function(ev) {
            switch(ev.key) {
                case 'Esc':
                case 'Escape':
                    closeSearchOverlay();
                    ev.preventDefault();
                    break;                    
            }
        });

        $('#searchOverlay').show();
        $('.searchOverlayQueryInput').focus();

        if (savedSearchObj && savedSearchObj.q) {
            $('.searchOverlayQueryInput').val(savedSearchObj.q);
        }
        checkButtonEnable();
    }

    const restoreSearchItems = function(options) {
        $('.searchOverlayResults').empty();

        if (savedSearchObj && savedSearchObj.q && Array.isArray(savedSearchObj.items)) {

            $('.searchOverlayQueryInput').val(savedSearchObj.q);
            $('.searchOverlayQueryInput')[0].setSelectionRange(0, savedSearchObj.q.length);

            for(const item of savedSearchObj.items) {
                appendSearchResult(Object.assign({query: savedSearchObj.q}, item));
            }        
            appendLoadMore();

            if (savedSearchObj.lastScroll) {
                $('#searchOverlay').scrollTop(savedSearchObj.lastScroll);
            }
        }
        else {
            if (savedSearchObj) {
                delete savedSearchObj.items;
            }
        }
    }


    let keyTimer;

    const checkAutoComplete = async function() {
        if (keyTimer) {
            clearTimeout(keyTimer);
            keyTimer = null;
        }
        const query = $('.searchOverlayQueryInput').val();
        if (query.length < 4) {
            return;
        }

        // Not currently supported by the programmable search API
    }

    const clearSearch = function() {
        $('.searchOverlayQueryInput').val('');
        $('.searchOverlayResults').empty();
        if (savedSearchObj) {
            savedSearchObj.q = '';
            savedSearchObj.items = [];
            saveSearch();
        }
        $('.searchOverlayQueryInput').focus();
    }

    const doSearch = async function() {
        if (keyTimer) {
            clearTimeout(keyTimer);
            keyTimer = null;
        }

        $('.searchOverlaySearchButton').prop('disabled', true);
        $('.searchOverlayResults').empty();


        const query = $('.searchOverlayQueryInput').val();
    
        savedSearchObj.q = query;
        savedSearchObj.items = [];

        /*
        // Not currently using search history popup, but here's where to add it
        if (!savedSearchObj.searchHistory) {
            savedSearchObj.searchHistory = [];
        }
        savedSearchObj.searchHistory.push(query);
        if (savedSearchObj.searchHistory.length > searchHistorySize) {
            savedSearchObj.searchHistory.splice(0, searchHistorySize - savedSearchObj.searchHistory.length);
        }
        */

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
        restoreSearchItems();    
    });

    $('.searchOverlayQueryInput').on('blur', checkAutoComplete);

    $('.searchOverlayQueryInput').on('keydown', function(ev) {
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

            case 'Clear':
                clearSearch();
                break;

            default:
                if (keyTimer) {
                    clearTimeout(keyTimer);
                    keyTimer = null;
                }
                keyTimer = setTimeout(checkAutoComplete, autocompleteDelay);
                break;
        }
    });

    $('.searchOverlayQueryInput').on('input', function() {
        checkButtonEnable();
    });

    $('.searchOverlayClearButton').on('click', function() {
        clearSearch();
    })


    if (window.location.hash && window.location.hash.startsWith("#search=1&")) {
        const searchParam = new URLSearchParams(window.location.hash.substring(1));

        const query = searchParam.get('q');
        if (query) {
            console.log('loadQuery query=' + query, savedSearchObj);

            if (savedSearchObj && savedSearchObj.q) {
                if (savedSearchObj.q == query && Array.isArray(savedSearchObj.items)) {
                    // Same as previous
                    openSearch({});
                    restoreSearchItems();    
                }
                else {
                    // Going back farther in history, probably. Load again.
                    savedSearchObj.q = query;
                    delete savedSearchObj.items;
                    saveSearch();
                    openSearch({});
                }
            }            
        }
    }

    checkButtonEnable();
});
