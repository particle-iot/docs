let firmwareReference = {
    pageQueue: [],
    pageLoading: false,
    gaCategory: 'firmware-reference',
};

$(document).ready(function() {

    const scrollableContent = $('div.content-inner');

    firmwareReference.thisUrl = new URL(location.href);
    $('.originalContent').addClass('referencePage');
    $('.originalContent').attr('data-href', firmwareReference.thisUrl.pathname);


    firmwareReference.loadPage = function() {
        if (firmwareReference.pageQueue.length == 0 || firmwareReference.pageLoading) {
            return;
        }
        let options = firmwareReference.pageQueue.splice(0, 1)[0];

        let itemIndex;

        if (typeof options.index != 'undefined') {
            itemIndex = options.index;

            if (typeof firmwareReference.lastItemIndex == 'undefined') {
                firmwareReference.lastItemIndex = options.index;
            }

            options.link = navMenu.navigationItems[options.index].hrefNoAnchor;
        }
        else {
            for(itemIndex = 0; itemIndex < navMenu.navigationItems.length; itemIndex++) {
                if (navMenu.navigationItems[itemIndex].hrefNoAnchor == options.link) {
                    break;
                }
            }
            if (itemIndex >= navMenu.navigationItems.length) {
                console.log('not found ' + options.link);
                return;
            }    
        }

        const itemObj = navMenu.navigationItems[itemIndex];

        if (options.replacePage) {
            $('.referencePage').remove();
            for(ii = 0; ii < navMenu.navigationItems.length; ii++) {
                navMenu.navigationItems[ii].contentElem = null;
            }
        }

        if (itemObj.contentElem) {
            firmwareReference.checkLoadPage(options);
            return;
        }
        if (itemObj.anchor) {
            firmwareReference.checkLoadPage(options);
            return;
        }

        firmwareReference.pageLoading = true;

        // console.log('loadPage', {options, itemIndex, itemObj});

        fetch(options.link)
            .then(response => response.text())
            .then(function(res) {

                // <!-- start 841427f3-9f46-4361-ab97-7afda1e082f9 -->
                // <!-- end 841427f3-9f46-4361-ab97-7afda1e082f9 -->
                let newContent = '';
                let inNewContent = false;

                for(const line of res.split('\n')) {
                    if (inNewContent) {
                        if (line.includes('end 841427f3-9f46-4361-ab97-7afda1e082f9')) {
                            inNewContent = false;
                        }
                        else {
                            newContent += line + '\n';
                        }
                    }
                    else {
                        if (line.includes('start 841427f3-9f46-4361-ab97-7afda1e082f9')) {
                            inNewContent = true;
                        }
                    }

                }

                let itemIndex;
                if (typeof options.index != 'undefined') {
                    itemIndex = options.index;
                }
                else {
                    for(itemIndex = 0; itemIndex < navMenu.navigationItems.length; itemIndex++) {
                        if (navMenu.navigationItems[itemIndex].hrefNoAnchor == options.link) {
                            break;
                        }
                    }
                    if (itemIndex >= navMenu.navigationItems.length) {
                        console.log('not found ' + options.link);
                        firmwareReference.pageLoading = false;
                        return;
                    }    
                }
                const itemObj = navMenu.navigationItems[itemIndex];
                // console.log('loadPage loaded', itemObj);
                
                let divElem = document.createElement('div');
                $(divElem).addClass('referencePage');
                $(divElem).attr('data-href', options.link);
                $(divElem).attr('data-index', itemIndex);
                $(divElem).append(newContent);

                // Remove the h2 when not at the start of a section
                if (!itemObj.sectionStart) {
                    $(divElem).find('h2').remove();
                }
        
                let params = {};
                params.scrollTopBefore = Math.round($(scrollableContent).scrollTop());
                params.scrollHeightBefore = $(scrollableContent).prop('scrollHeight');

                if (options.replacePage) {
                    analytics.track('replacePage', {label:options.link, category:firmwareReference.gaCategory});

                    for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
                        if (ii != itemIndex) {
                            const tempItemObj = navMenu.navigationItems[ii];
                            if (tempItemObj.collapseIconElem) {
                                navMenu.collapseExpand(tempItemObj, false);
                            }                   
                        }
                    }

                    firmwareReference.initialIndex = firmwareReference.topIndex = firmwareReference.bottomIndex = itemIndex;
                    history.pushState(null, '', itemObj.hrefNoAnchor);

                    $(divElem).addClass('originalContent');
                    $('div.content').append(divElem);

                    if (options.anchor) {
                        const elem = document.getElementById(options.anchor);
                        if (elem) {
                            elem.scrollIntoView();
                        }
                    }

                    firmwareReference.syncNavigationToPage(options.link);
                }
                else {
                    if (itemIndex < firmwareReference.topIndex) {
                        firmwareReference.topIndex = itemIndex;
                        analytics.track('addPageTop', {label:options.link, category:firmwareReference.gaCategory});

                        $('div.content').not('.note-common').first().prepend(divElem);
                    }
                    else
                    if (itemIndex > firmwareReference.bottomIndex) {
                        firmwareReference.bottomIndex = itemIndex;
                        analytics.track('addPageBottom', {label:options.link, category:firmwareReference.gaCategory});

                        $('div.content').not('.note-common').last().append(divElem);
                    }
                    else {
                        console.log('insertion error', {itemIndex, topIndex: firmwareReference.topIndex, bottomIndex: firmwareReference.bottomIndex})
                    }
                }

                // apiIndex.sections[nav.index].contentElem = divElem;
                itemObj.contentElem = divElem;

                // TODO: Add contentElem for the inner anchors
                $(divElem).find('h2,h3,h4').each(function() {
                    // const level = parseInt($(this).prop('tagName').substring(1));
                    const id = $(this).prop('id');

                    for(const tempItemObj of navMenu.navigationItems) {
                        if (typeof tempItemObj.anchor != 'undefined' && tempItemObj.anchor == id) {
                            tempItemObj.contentElem = this;
                        }
                    }
                });

                if (options.scrollIntoView) {
                    $(divElem)[0].scrollIntoView({block: "start", behavior: "smooth"}); // align to top 
                }

                navMenu.collapseExpand(itemObj, true);
                
                if (!options.noScroll) {
                    navMenu.syncNavigation();
                }
                firmwareReference.pageLoading = false;


                firmwareReference.checkLoadPage(options);
            })
            .catch(function(err) {
                console.log('err', err);
            });

    }

    firmwareReference.checkLoadPage = function(options) {
        if (options.fillScreen) {
            if (firmwareReference.pageQueue.length == 0) {
                const itemsNearby = firmwareReference.getItemsNearby();

                if (typeof itemsNearby.bottomIndex == 'undefined' && typeof itemsNearby.loadBelowIndex != 'undefined') {
                    firmwareReference.queuePage({index:itemsNearby.loadBelowIndex, skipIndex: false, count:1, toEnd:true, fillScreen:true});  
                }    
            }
            else {
            }
        }

        if (firmwareReference.pageQueue.length > 0) {
            firmwareReference.loadPage();
        }
    }

    firmwareReference.queuePage = function(options) {
        if (typeof options.index != 'undefined') {
            const count = (typeof options.count != 'undefined') ? options.count : 1;

            const start = options.skipIndex ? 1 : 0;
            let numAdded = 0;
            
            if (options.toEnd) {
                for(let ii = options.index + start; ii < navMenu.navigationItems.length; ii++) {
                    if (navMenu.navigationItems[ii].anchor) {
                        continue;
                    }

                    // Add to end
                    let obj = Object.assign({}, options);
                    obj.index = ii;
                    if (options.replacePage && numAdded > 0) {
                        obj.replacePage = false;
                        obj.syncNavigation = false;
                    }
                    firmwareReference.pageQueue.push(obj);        
                    
                    if (++numAdded >= count) {
                        break;
                    }
                }
            }
            else {
                for(let ii = options.index - start; ii >= 0; ii--) {
                    if (navMenu.navigationItems[ii].anchor) {
                        continue;
                    }
                    let obj = Object.assign({}, options);
                    obj.index = ii;
                    firmwareReference.pageQueue.push(obj);                            

                    if (++numAdded >= count) {
                        break;
                    }
                }       
            }            
        }
        else {
            if (options.link) {
                firmwareReference.pageQueue.push(options);            
            }    
        }
        firmwareReference.loadPage();
    }

    firmwareReference.replacePage = function(options) {
        firmwareReference.pageQueue = [];
        firmwareReference.lastScrollDir = null;

        if (typeof options.index != 'undefined') {
            const anchor = navMenu.navigationItems[options.index].anchor;

            let index = options.index;
            while(index >= 0) {
                if (!navMenu.navigationItems[index].anchor) {
                    break;
                }
                index--;
            }

            firmwareReference.queuePage({replacePage: true, skipIndex: false, index, count: 3, toEnd: true, fillScreen: true, anchor, });

            firmwareReference.lastItemIndex = options.index;
        }
    }

    firmwareReference.navMenuLoaded = function() {
        
        for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
            const itemObj = navMenu.navigationItems[ii];
            if (firmwareReference.thisUrl.pathname == itemObj.hrefNoAnchor) {
                firmwareReference.initialIndex = firmwareReference.topIndex = firmwareReference.bottomIndex = ii;
                $('.originalContent').data('index', ii);
                break;                
            }
        }

        for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
            const itemObj = navMenu.navigationItems[ii];

            if (itemObj.navLinkElem) {
                $(itemObj.navLinkElem).off('click');

                $(itemObj.navLinkElem).on('click', function(ev) {
                    ev.preventDefault();

                    firmwareReference.replacePage({index:ii});
                });
            }
        }

        // Preload pages
        firmwareReference.queuePage({index:firmwareReference.initialIndex, skipIndex:true, count:1, toEnd:true, fillScreen:true}); 

        firmwareReference.syncNavigationToPage(firmwareReference.thisUrl.pathname);
    }

    firmwareReference.updateScroll = function() {

        let params = {};

        params.scrollTop = Math.round($(scrollableContent).scrollTop());
        params.scrollHeight = $(scrollableContent).prop('scrollHeight');
        params.height = $(scrollableContent).height();
        
        params.atTop = (params.scrollTop == 0);
        params.atBottom = (params.scrollTop >= (params.scrollHeight - params.height));

        // $(scrollableContent).height() is the height of the view
        if (typeof firmwareReference.lastScrollTop != 'undefined') {
            if (params.scrollTop > (firmwareReference.lastScrollTop + 5)) {
                firmwareReference.lastScrollDir = 'down';
                firmwareReference.lastScrollTop = params.scrollTop;
            }
            else 
            if (params.scrollTop < (firmwareReference.lastScrollTop - 5)) {
                firmwareReference.lastScrollDir = 'up';
                firmwareReference.lastScrollTop = params.scrollTop;
            }
        }
        else {
            firmwareReference.lastScrollTop = params.scrollTop;
        }

        if (params.atBottom && firmwareReference.lastScrollDir == 'down' && firmwareReference.bottomIndex < navMenu.navigationItems.length) {
            firmwareReference.queuePage({index:firmwareReference.bottomIndex, skipIndex: true, count:3, toEnd:true});  
        }

        if (params.atTop && firmwareReference.lastScrollDir == 'up' && firmwareReference.topIndex >= 0) {
            firmwareReference.queuePage({index:firmwareReference.topIndex, skipIndex: true, count:3, toEnd:false});  
        }
        
        return params;
    }

    $(scrollableContent).on('scroll', function(e) {
        // console.log('scrolled ', e);
        // e.originalEvent
        if (!firmwareReference.pageLoading) {
            firmwareReference.updateScroll();
        }

    });


    firmwareReference.syncNavigationToPage = function(link) {
        $('.menubar').find('.navLinkActive').removeClass('navLinkActive');
        $('.menubar').find('.navActive').removeClass('navActive');

        for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
            const itemObj = navMenu.navigationItems[ii];
            if (itemObj.hrefNoAnchor == link) {
                // console.log('firmwareReference.syncNavigationToPage', {link, ii, itemObj});
                $(itemObj.elem).find('.navLink').addClass('navLinkActive');
                $(itemObj.elem).find('.navMenu' + itemObj.level).addClass('navActive');
                firmwareReference.lastItemIndex = ii;
                return;
            }
        }
    }

    firmwareReference.getItemsNearby = function() {
        const contentRect = $('.content-inner')[0].getBoundingClientRect();
        const contentHeight = contentRect.height;

        const itemsNearby = {
            visible: [],
        };

        for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
            const itemObj = navMenu.navigationItems[ii];
            if (itemObj.contentElem) {
                const offset = $(itemObj.contentElem).offset();
                if (offset.top < 0) {
                    itemsNearby.aboveIndex = ii;
                }
                else
                if (offset.top > contentHeight) {
                    if (typeof itemsNearby.belowIndex == 'undefined') {
                        itemsNearby.belowIndex = ii;
                    }
                }
                else {
                    itemsNearby.visible.push(ii);
                }
            }
        }
        if (typeof itemsNearby.aboveIndex == 'undefined' && itemsNearby.visible.length) {
            let index = itemsNearby.visible[0] - 1;
            for(; index >= 0; index--) {
                if (typeof navMenu.navigationItems[index].anchor == 'undefined') {
                    break;
                }
            }
            if (index >= 0) {
                itemsNearby.loadAboveIndex = index;
            }
        }

        if (typeof itemsNearby.belowIndex == 'undefined' && itemsNearby.visible.length) {
            const index = itemsNearby.visible[itemsNearby.visible.length - 1] + 1;
            for(; index < navMenu.navigationItems.length; index++) {
                if (typeof navMenu.navigationItems[index].anchor == 'undefined') {
                    break;
                }
            }
            if (index < navMenu.navigationItems.length) {
                itemsNearby.loadBelowIndex = index;
            }
        }

        if (firmwareReference.lastScrollDir == 'up') {
            // Use item above if not visible or scrolling up
            itemsNearby.selectIndex = itemsNearby.aboveIndex;
        }
        
        if (typeof itemsNearby.selectIndex == 'undefined' && itemsNearby.visible.length > 0) {
            itemsNearby.selectIndex = itemsNearby.visible[0];
        }

        return itemsNearby;
    }

    firmwareReference.syncNavigation = function() {
        if (!navMenu || !navMenu.menuJson) {
            return;
        }        

        const itemsNearby = firmwareReference.getItemsNearby();


        if (typeof itemsNearby.selectIndex != 'undefined') {
            $('.menubar').find('.navLinkActive').removeClass('navLinkActive');
            $('.menubar').find('.navActive').removeClass('navActive');
            
            const itemObj = navMenu.navigationItems[itemsNearby.selectIndex];
            // console.log('syncNavigation to item', itemObj);
            $(itemObj.elem).find('.navLink').addClass('navLinkActive');
            $(itemObj.elem).find('.navMenu' + itemObj.level).addClass('navActive');
            navMenu.scrollToActive();

            if (window.location.pathname != itemObj.hrefNoAnchor) {
                history.pushState(null, '', itemObj.hrefNoAnchor);
            }
        }
        
        if (firmwareReference.lastScrollDir == 'up' && typeof itemsNearby.loadAboveIndex != 'undefined') {
            firmwareReference.queuePage({index:itemsNearby.loadAboveIndex, skipIndex: false, count:3, toEnd:false, noScroll:true});  
        }
        if (firmwareReference.lastScrollDir == 'down' && typeof itemsNearby.loadBelowIndex != 'undefined') {
            firmwareReference.queuePage({index:itemsNearby.loadBelowIndex, skipIndex: false, count:3, toEnd:true, noScroll:true});  
        }
          

    }


    firmwareReference.navigatePage = function(options) {
            
        if (typeof firmwareReference.lastItemIndex == 'undefined') {
            firmwareReference.lastItemIndex = 0;
        }
        if (!options.dir) {
            options.dir = 1;
        }


        if (options.level) {
            for(let ii = firmwareReference.lastItemIndex + options.dir; ii >= 0 && ii < navMenu.navigationItems.length; ii += options.dir) {
                const itemObj = navMenu.navigationItems[ii];
                if (itemObj.level == options.level) {
                    firmwareReference.replacePage({index: ii});
                    break;
                }                
            }
        }   
        else
        if (options.section) {
            const hrefCurrent = navMenu.navigationItems[firmwareReference.lastItemIndex].hrefNoAnchor;

            for(let ii = firmwareReference.lastItemIndex + options.dir; ii >= 0 && ii < navMenu.navigationItems.length; ii += options.dir) {
                const itemObj = navMenu.navigationItems[ii];
                if (itemObj.hrefNoAnchor != hrefCurrent) {
                    firmwareReference.replacePage({index: ii});
                    break;    
                }
            }
        }
        
    }


    firmwareReference.navigate = function(dir) {
    
        switch(dir) {
            case 'up':
                firmwareReference.navigatePage({level: 3, dir: -1});
                break;

            case 'down':
                firmwareReference.navigatePage({level: 3, dir: +1});
                break;

            case 'left':
                firmwareReference.navigatePage({section: true, dir: -1});
                break;

            case 'right':
                firmwareReference.navigatePage({section: true, dir: +1});
                break;
    
            case 'Home':
            case 'End':
                break;

            case 'PageUp':
                firmwareReference.lastScrollDir = 'up';
                $(scrollableContent)[0].scrollBy(0, -($(scrollableContent).height() - 20));
                firmwareReference.syncNavigation();
                break;

            case 'PageDown':
                firmwareReference.lastScrollDir = 'down';
                $(scrollableContent)[0].scrollBy(0, $(scrollableContent).height() - 20);
                firmwareReference.syncNavigation();
                break;
        }
    }


});

