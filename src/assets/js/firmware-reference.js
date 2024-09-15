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

        if (itemObj.contentElem) {
            console.log('loadPage already loaded', {options, itemIndex, itemObj});
            firmwareReference.loadPage();
            return;
        }

        firmwareReference.pageLoading = true;

        console.log('loadPage', {options, itemIndex, itemObj});

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
                        return;
                    }    
                }
                const itemObj = navMenu.navigationItems[itemIndex];
                console.log('loadPage', itemObj);
                
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
                    $('.referencePage').remove();
                    for(itemIndex = 0; itemIndex < navMenu.navigationItems.length; itemIndex++) {
                        navMenu.navigationItems.contentElem = null;
                    }

                    firmwareReference.initialIndex = firmwareReference.topIndex = firmwareReference.bottomIndex = itemIndex;
                    history.pushState(null, '', itemObj.hrefNoAnchor);

                    $(divElem).addClass('originalContent');
                    $('div.content').append(divElem);
                }
                else {
                    if (itemIndex < firmwareReference.topIndex) {
                        console.log('prepend', divElem)
                        firmwareReference.topIndex = itemIndex;

                        $('div.content').prepend(divElem);
                    }
                    else
                    if (itemIndex > firmwareReference.bottomIndex) {
                        console.log('append', divElem)
                        firmwareReference.bottomIndex = itemIndex;

                        $('div.content').append(divElem);
                    }
                    else {
                        console.log('insertion error', {itemIndex, topIndex: firmwareReference.topIndex, bottomIndex: firmwareReference.bottomIndex})
                    }

                    /*
                    let inserted = false;

                    $('div.content').find('.referencePage').each(function() {
                        if (!inserted) {
                            const thisIndex = parseInt($(this).data('index'));
                            console.log('testing', {itemIndex, thisIndex })
                            if (itemIndex < thisIndex) {
                                console.log('insert before', {itemIndex, divElem});
                                inserted = true;
                                firmwareReference.topIndex = itemIndex;
                                $(this).before(divElem);

                                params.divHeight = Math.floor($(divElem).height());
                                params.scrollTopAfter = params.scrollTopBefore + params.divHeight;
            
                                $(scrollableContent).scrollTop(params.scrollTopAfter);
            
                            }
                        }
                    });

                    if (!inserted) {
                        console.log('append', divElem)
                        firmwareReference.bottomIndex = itemIndex;

                        $('div.content').append(divElem);
                    }
                    */
                }


                /*
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
                */

                // apiIndex.sections[nav.index].contentElem = divElem;
                itemObj.contentElem = divElem;


                firmwareReference.ignoreScroll = Date.now() + 1000;

                if (options.scrollIntoView) {
                    $(divElem)[0].scrollIntoView({block: "start", behavior: "smooth"}); // align to top 
                }

                if (itemObj.collapse) {
                    navMenu.collapseExpand(itemObj, true);
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
                    // Add to end
                    let obj = Object.assign({}, options);
                    obj.index = options.index + ii;
                    if (options.replacePage && ii > 0) {
                        options.replacePage = false;
                    }
                    firmwareReference.pageQueue.push(obj);                            
                }
            }
            else {
                for(let ii = start; (ii <= count) && ((options.index - ii) >= 0); ii++) {
                    // Add to top
                    let obj = Object.assign({}, options);
                    obj.index = options.index - ii;
                    firmwareReference.pageQueue.push(obj);                            
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

            firmwareReference.queuePage({replacePage: true, skipIndex: false, index: options.index, count: 3, toEnd: true});

            firmwareReference.lastItemIndex = options.index;

            firmwareReference.syncNavigation();
        }
    }

    firmwareReference.navMenuLoaded = function() {
        console.log('firmwareReference.navMenuLoaded', firmwareReference);


        for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
            const index = ii;
            const itemObj = navMenu.navigationItems[ii];
            if (firmwareReference.thisUrl.pathname == itemObj.hrefNoAnchor) {
                firmwareReference.initialIndex = firmwareReference.topIndex = firmwareReference.bottomIndex = ii;
                $('.originalContent').data('index', ii);
                break;                
            }

            if (itemObj.navLinkElem) {
                // $(itemObj.navLinkElem).off('click');

                $(itemObj.navLinkElem).on('click', function(ev) {
                    ev.preventDefault();

                    console.log('click nav', {itemObj, index});
                    firmwareReference.replacePage({index});
                });
            }
        }

        // Preload pages
        firmwareReference.queuePage({index:firmwareReference.initialIndex, skipIndex:true, count:4, toEnd:true}); 
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

        let itemFound;

        navMenu.forEachItem(function(itemObj) {
            if (itemObj.anchor == pageOffsets[index].id && typeof itemFound == 'undefined') {
                itemFound = itemObj;
                console.log('syncNavigation to anchor', itemObj);
                $(itemObj.elem).find('.navLink').addClass('navLinkActive');
                navMenu.scrollToActive();
            }
        });

        if (typeof itemFound != 'undefined') {
            return;
        }

        for(let ii = 0; ii < pageOffsets.length; ii++) {
            if (!pageOffsets[ii].href) {
                continue;
            }
            if (pageOffsets[ii].top >= (menubarRect.top && pageOffsets[ii].top < (menubarRect.bottom - 40))) {
                if (firmwareReference.lastPage != pageOffsets[ii].href) {
                    firmwareReference.lastPage = pageOffsets[ii].href;
                    console.log('new page scrolled ', pageOffsets[ii]);
                    index = ii;

                    for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
                        const itemObj = navMenu.navigationItems[ii];
                        if (pageOffsets[index].href == itemObj.hrefNoAnchor && !itemFound) {
                            console.log('select by href', itemObj);
                            $(itemObj.elem).find('.navLink').addClass('navLinkActive');
                            navMenu.scrollToActive();
                            history.pushState(null, '', itemObj.hrefNoAnchor);
                            firmwareReference.lastItemIndex = ii;
                            break;
                        }
                    }
                    break;            
                }
            }
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
                break;

            case 'PageDown':
                firmwareReference.lastScrollDir = 'down';
                $(scrollableContent)[0].scrollBy(0, $(scrollableContent).height() - 20);
                break;
        }
    }
    
});

