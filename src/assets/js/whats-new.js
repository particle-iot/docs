$(document).ready(function() {
    const gaCategory = 'Whats New Page';

    let whatsNew = {
        contentElem: $('.content'),
        startHeaderId: 'updates',
        items: [],
        searchIsInteractive: false,
        searchKeyTimeoutMs: 500,
    };


    whatsNew.init = function() {
        let state = 'beforeStart';

        $(whatsNew.contentElem).children().each(function() {
            switch(state) {
                case 'beforeStart':
                    if ($(this).prop('id') == whatsNew.startHeaderId) {
                        state = 'inItems';
                        whatsNew.insertAfterElem = this;
                    }
                    break;

                case 'inItems':
                    if ($(this).prop('tagName') == 'H3') {
                        let curItem = {
                            headerElem: this,
                            content: [],
                            bodyText: '',
                        };              
                        const m = $(this).text().trim().match(/(.*) ([0-9]+-[0-9]+-[0-9]+)$/);
                        if (m) {
                            curItem.title = m[1];
                            curItem.date = m[2];
                            curItem.id = $(this).prop('id');
    
                            whatsNew.items.push(curItem);    
                        }
                        else {
                            console.log('unknown header ' + $(this).text());
                        }
                    }
                    else
                    if ($(this).prop('tagName') == 'H2') {
                        state = 'afterEnd';
                    }
                    else {
                        if (whatsNew.items.length) {
                            let curItem = whatsNew.items[whatsNew.items.length - 1];
                            curItem.content.push(this);
                            curItem.bodyText += $(this).text() + ' ';
                        }
                    }
                    break;

                case 'afterEnd':
                    break;
            }
        });

        // Build lunr search index
        whatsNew.lunrIndex = lunr(function() {
            const lunrThis = this;
            lunrThis.ref('id');
            lunrThis.field('title');
            lunrThis.field('date');
            lunrThis.field('text');

            for(const item of whatsNew.items) {
                let doc = {
                    id: item.id,
                    title: item.title,
                    date: item.date,
                    text: item.bodyText,
                };
                lunrThis.add(doc);
            }
        });
        
        whatsNew.hideAll = function() {
            for(const item of whatsNew.items) {
                $(item.headerElem).remove();
                for(const content of item.content) {
                    $(content).remove();
                }
            }
            navMenu.scanHeaders();
        }

        whatsNew.showAll = function() {
            let insertElem = whatsNew.insertAfterElem;

            for(const item of whatsNew.items) {
                $(insertElem).after(item.headerElem);
                insertElem = item.headerElem;
                for(const content of item.content) {
                    $(insertElem).after(content);
                    insertElem = content;
                }
            }            
            navMenu.scanHeaders();
        }

        whatsNew.searchButtonClear = function() {
            $(whatsNew.searchTextElem).val('');
            whatsNew.searchButtonEnable();    
        }

        whatsNew.searchButtonEnable = function() {
            const searchText = $(whatsNew.searchTextElem).val().trim();
            
            const disabled = (searchText.length < 3);

            whatsNew.searchButtonElem.prop('disabled', disabled);

            if (disabled) {
                whatsNew.hideAll();
                whatsNew.showAll();
            }

            whatsNew.searchClearButtonElem.prop('disabled', (searchText.length == 0));
        };
        
        whatsNew.searchButtonRun = function() {
            if ($(whatsNew.searchButtonElem).prop('disabled')) {
                return;
            }
            if (whatsNew.searchKeyTimer) {
                clearTimeout(whatsNew.searchKeyTimer);
                whatsNew.searchKeyTimer = null;
            }

            const searchText = $(whatsNew.searchTextElem).val().trim();

            $(whatsNew.searchButtonElem).prop('disabled', true);
            whatsNew.hideAll();

            const searchResults = whatsNew.lunrIndex.search(searchText);
            if (searchResults.length > 0) {
                analytics.track('Success', {category:gaCategory, label:searchText});

                let insertElem = whatsNew.insertAfterElem;

                for(const searchResult of searchResults) {
                    for(const item of whatsNew.items) {
                        if (item.id == searchResult.ref) {
                            $(insertElem).after(item.headerElem);
                            insertElem = item.headerElem;
                            for(const content of item.content) {
                                $(insertElem).after(content);
                                insertElem = content;
                            }    
                        }
                    }        
                }
            }
            else {
                analytics.track('No Results', {category:gaCategory, label:searchFor});                            
            }
            navMenu.scanHeaders();

            $(whatsNew.searchButtonElem).prop('disabled', false);
        }

        whatsNew.searchKeyTimerHandler = function() {
            whatsNew.searchKeyTimer = null;
            whatsNew.searchButtonRun();
        }

        $('.whatsNewSearch').first().each(function() {
            const thisElem = $(this);

            whatsNew.searchTextElem = $(thisElem).find('.searchText');
            whatsNew.searchButtonElem = $(thisElem).find('.searchButton');
            whatsNew.searchClearButtonElem = $(thisElem).find('.searchClearButton');

            $(whatsNew.searchTextElem).on('input', function() {
                whatsNew.searchButtonEnable();
            });
            $(whatsNew.searchTextElem).on('keydown', function(ev) {
                if (ev.key == 'Enter') {
                    whatsNew.searchButtonRun();
                    ev.preventDefault();
                    return;
                }
                if (whatsNew.searchIsInteractive) {
                    if (whatsNew.searchKeyTimer) {
                        clearTimeout(whatsNew.searchKeyTimer);
                        whatsNew.searchKeyTimer = null;
                    }
                    whatsNew.searchKeyTimer = setTimeout(whatsNew.searchKeyTimerHandler, whatsNew.searchKeyTimeoutMs);    
                }
            });
            whatsNew.searchButtonElem.on('click', whatsNew.searchButtonRun);

            whatsNew.searchClearButtonElem.on('click', whatsNew.searchButtonClear);


            whatsNew.searchButtonEnable();
        });

    }

    whatsNew.init();

});

