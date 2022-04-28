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
          body: item.highlight['body']
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
