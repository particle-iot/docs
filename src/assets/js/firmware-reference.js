let firmwareReference = {
    pageQueue: [],
    pageLoading: false,
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
        firmwareReference.pageLoading = true;

        if (typeof options.index != 'undefined' && typeof options.link == 'undefined') {
            options.link = navMenu.navigationItems[options.index].hrefNoAnchor;
        }

        console.log('loadPage', options);

        fetch(options.link)
            .then(response => response.text())
            .then(function(res) {
                firmwareReference.pageLoading = false;

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
                for(itemIndex = 0; itemIndex < navMenu.navigationItems.length; itemIndex++) {
                    if (navMenu.navigationItems[itemIndex].hrefNoAnchor == options.link) {
                        break;
                    }
                }
                if (itemIndex >= navMenu.navigationItems.length) {
                    console.log('not found ' + options.link);
                    return;
                }
                const itemObj = navMenu.navigationItems[itemIndex];
                console.log('loadPage', itemObj);
                
                let divElem = document.createElement('div');
                $(divElem).addClass('referencePage');
                $(divElem).attr('data-href', options.link);
                $(divElem).append(newContent);

                // Remove the h2 when not at the start of a section
                if (!itemObj.sectionStart) {
                    $(divElem).find('h2').remove();
                }

                let params = {};
                params.scrollTopBefore = Math.round($(scrollableContent).scrollTop());
                params.scrollHeightBefore = $(scrollableContent).prop('scrollHeight');

                if (options.replacePage) {
                    $('.referencePage').remove();
                    firmwareReference.initialIndex = firmwareReference.topIndex = firmwareReference.bottomIndex = itemIndex;

                    $(divElem).addClass('originalContent');
                    $('div.content').append(divElem);
                }
                else
                if (options.toEnd) {
                    // $(scrollableContent).data('nextLink', nav.next);
                    firmwareReference.bottomIndex = itemIndex;

                    $('div.content').not('.note-common').last().append(divElem);
                }
                else {
                    // Insert before
                    console.log('has insertBefore');
                    // $(scrollableContent).data('prevLink', nav.prev);
                    firmwareReference.topIndex = itemIndex;

                    $('div.content').not('.note-common').first().prepend(divElem);

                    params.divHeight = Math.floor($(divElem).height());
                    params.scrollTopAfter = params.scrollTopBefore + params.divHeight;

                    $(scrollableContent).scrollTop(params.scrollTopAfter);
                }

                // apiIndex.sections[nav.index].contentElem = divElem;

                firmwareReference.ignoreScroll = Date.now() + 1000;

                if (options.scrollIntoView) {
                    $(divElem)[0].scrollIntoView({block: "start", behavior: "smooth"}); // align to top 
                }

                for(const itemObj of navMenu.navigationItems) {
                    if (itemObj.hrefNoAnchor == options.link) {
                        if (itemObj.collapse) {
                            navMenu.collapseExpand(itemObj, true);
                        }
                    }
                }
                 

                if (options.syncNavigation) {
                    navMenu.syncNavigation();
                }

                if (firmwareReference.pageQueue.length) {
                    firmwareReference.loadPage();
                }           
            })
            .catch(function(err) {
                console.log('err', err);
            });

    }

    firmwareReference.queuePage = function(options) {
        if (typeof options.index != 'undefined') {
            const count = (typeof options.count != 'undefined') ? options.count : 1;

            const start = options.skipIndex ? 1 : 0;

            if (options.toEnd) {
                for(let ii = start; (ii <= count) && ((ii + options.index) < navMenu.navigationItems.length); ii++) {
                    firmwareReference.pageQueue.push({index: ii + options.index, toEnd:true});                            
                }
            }
            else {
                for(let ii = start; (ii <= count) && ((options.index - ii) >= 0); ii++) {
                    firmwareReference.pageQueue.push({index: options.index - ii, toEnd:false});                            
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
            firmwareReference.pageQueue.push({index: options.index, replacePage: true, });

            firmwareReference.queuePage({index: options.index, count: 3, toEnd: true});
        }
    }

    firmwareReference.navMenuLoaded = function() {
        console.log('firmwareReference.navMenuLoaded', firmwareReference);

        firmwareReference.loadedMoreItemsIndex = null;

        for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
            const index = ii;
            const itemObj = navMenu.navigationItems[ii];
            if (firmwareReference.thisUrl.pathname == itemObj.hrefNoAnchor) {
                if (!firmwareReference.loadedMoreItemsIndex) {
                    firmwareReference.loadedMoreItemsIndex = ii;
                }
            }

            if (itemObj.navLinkElem) {
                $(itemObj.navLinkElem).off('click');

                $(itemObj.navLinkElem).on('click', function(ev) {
                    ev.preventDefault();

                    console.log('click nav', {itemObj, index});
                    firmwareReference.replacePage({index});
                });
            }
        }


        if (firmwareReference.loadedMoreItemsIndex) {
            firmwareReference.initialIndex = firmwareReference.topIndex = firmwareReference.bottomIndex = firmwareReference.loadedMoreItemsIndex;

            // Preload pages
            firmwareReference.queuePage({index:firmwareReference.initialIndex, count:4, toEnd:true});  
        }    
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
                if (firmwareReference.lastScrollDir != 'down') {
                    console.log('firmwareReference.lastScrollDir = down');
                }
                firmwareReference.lastScrollDir = 'down';
                firmwareReference.lastScrollTop = params.scrollTop;
            }
            else 
            if (params.scrollTop < (firmwareReference.lastScrollTop - 5)) {
                if (firmwareReference.lastScrollDir != 'up') {
                    console.log('firmwareReference.lastScrollDir = up');
                }
                firmwareReference.lastScrollDir = 'up';
                firmwareReference.lastScrollTop = params.scrollTop;
            }
        }
        else {
            firmwareReference.lastScrollTop = params.scrollTop;
        }


        // console.log('params', params);
        if (!firmwareReference.ignoreScroll || Date.now() > firmwareReference.ignoreScroll) {
            firmwareReference.ignoreScroll = null;
            navMenu.syncNavigation();
        }
        else {
        }

        if (params.atTop && firmwareReference.topIndex >= 0) {
            console.log('atTop');
            firmwareReference.lastScrollDir = 'up';
            firmwareReference.queuePage({index:firmwareReference.topIndex, skipIndex: true, count:3, toEnd:false});  
        }
        if (params.atBottom && firmwareReference.bottomIndex < navMenu.navigationItems.length) {
            console.log('atBottom');
            firmwareReference.lastScrollDir = 'down';
            firmwareReference.queuePage({index:firmwareReference.bottomIndex, skipIndex: true, count:3, toEnd:true});  
        }
    }

    $(scrollableContent).on('scroll', function(e) {
        // console.log('scrolled ', e);
        // e.originalEvent
        firmwareReference.updateScroll();
    });


    firmwareReference.syncNavigation = function() {
        if (!navMenu || !navMenu.menuJson) {
            return;
        }
        
        let pageHref;
        let pageOffsets = [];
        $('div.content-inner').find('div,h2,h3,h4,h5').each(function (index, elem) {
            const offset = $(this).offset();
    
            let obj = {
                top: offset.top,
                id: $(this).attr('id'),
                elem: $(this),
            };
    
            const tag = $(this).prop('tagName').toLowerCase();
            if (tag == 'div') {
                if (!$(this).hasClass('referencePage')) {
                    return;
                }
                obj.href = $(this).data('href');
            }
    
            pageOffsets.push(obj);    
        });
    
        // If the 0 <= offset.top <= 10 then the referencePage is at the top of the screen and is definitely the
        // one to display.
        // However, if there isn't one in that range, then look up (negative offset) to find the closest href,
        // because it's been scrolled up.
        let index;

        const menubarRect = $('.menubar')[0].getBoundingClientRect();


        /*
        for(let ii = 0; ii < pageOffsets.length; ii++) {
            if (!pageOffsets[ii].href) {
                continue;
            }
            if (pageOffsets[ii].top >= (menubarRect.top && pageOffsets[ii].top < (menubarRect.bottom - 40))) {
                if (pageOffsets[ii].href && !pageOffsets[ii].anchor) {
                    if (firmwareReference.lastPage != pageOffsets[ii].href) {
                        firmwareReference.lastPage = pageOffsets[ii].href;
                        console.log('new page scrolled ', pageOffsets[ii]);
                        index = ii;
    
                        navMenu.forEachItem(function(itemObj) {
                            let selectItem = false;
                            if (pageOffsets[index].href && pageOffsets[index].href == itemObj.hrefNoAnchor) {
                                selectItem = true;
                                console.log('select by href', itemObj);
                                $(itemObj.elem).find('.navLink').addClass('navLinkActive');
                            }
                        });
                        return;            
                    }
    
                } 
            }
        }
        */

        
        if (firmwareReference.lastScrollDir == 'down') {
            for(let ii = pageOffsets.length - 1; ii >= 0; ii--) {
                if (pageOffsets[ii].top < (menubarRect.bottom - 20)) {
                    index = ii;
                    break;
                }
            }    
        }
        else {
            // "up" or not defined
            for(let ii = pageOffsets.length - 1; ii >= 0; ii--) {
                if (pageOffsets[ii].top < (menubarRect.top + 10)) {
                    index = ii;
                    break;
                }
            }    
        }

        if (typeof index == 'undefined') {
            return;
        }
    
        if (firmwareReference.lastAnchor == pageOffsets[index].id) {
            return;
        }
        firmwareReference.lastAnchor = pageOffsets[index].id;    
    
        // console.log('firmwareReference.syncNavigation', pageOffsets[index]);
        $('.menubar').find('.navLinkActive').removeClass('navLinkActive');

        navMenu.forEachItem(function(itemObj) {
            if (itemObj.anchor == pageOffsets[index].id) {
                $(itemObj.elem).find('.navLink').addClass('navLinkActive');
                navMenu.scrollToActive();
            }
        });
    }

    navMenu.navigate = function(dir) {
    
        switch(dir) {
            case 'up':
            case 'down':
                break;

            case 'left':
            case 'right':
                break;
    
            case 'Home':
            case 'End':
                break;

            case 'PageUp':
                firmwareReference.lastScrollDir = 'up';
                $(scrollableContent)[0].scrollBy(0, -($(scrollableContent).height() - 20));
                break;

            case 'PageDown':
                firmwareReference.lastScrollDir = 'down';
                $(scrollableContent)[0].scrollBy(0, $(scrollableContent).height() - 20);
                break;
        }
    }
    
});

