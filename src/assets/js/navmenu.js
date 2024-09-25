// Navigation Menu
let navMenu = {
    gaCategory: 'navMenu',

    // Used for Device OS firmware reference and scroll groups
    pageQueue: [],
    pageLoading: false,

    loadMoreConfig: [
        {
            baseUrl: '/reference/device-os/api',
            menuJsonUrl: '/assets/files/apiMenus.json',
            insertLoc: 'device-os-api',
            hasPageQueue: true,
        },
        {
            baseUrl: '/reference/device-os/libraries',
            menuJsonUrl: '/assets/files/libraryMenus.json',
            insertLoc: 'libraries',
            hasPageQueue: false,
        },
        {
            baseUrl: '/getting-started/logic-ledger/',
            menuJsonUrl: '/assets/files/logicLedgerMenus.json',
            hasPageQueue: true,
        }
    ],
};

// This is copied from templates/helpers/titleize.js - try to keep in sync
navMenu.titleize = function(string) {
    var stringNoDashes = string.replace(/-/g, ' ');
    var stringToTitleCase = stringNoDashes.replace(/\w\S*/g, function(txt){
      txt = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  
      switch(txt) {
      case 'Faq':
          txt = 'FAQ';
          break;
      
      case 'Iot':
          txt = 'IoT';
          break;
          
      case 'Os':
          txt = 'OS';
          break;
          
      case 'Apis':
          txt = 'APIs';
          break;
  
      case 'Sdks':
          txt = 'SDKs';
          break;
          
      case 'Som':
          txt = 'SoM';
          break;
  
      case 'Usb':
          txt = 'USB';
          break;
  
      case 'Jtag':
          txt = 'JTAG';
          break;
          
      case 'And':
          txt = 'and';
          break;
          
      case 'Le':
          txt = 'LE'; // As in Bluetooth LE
          break;
  
      case 'Ml':
          txt = 'ML'; // Machine Learning
          break;
      
      default:
          break;
      }
  
      return txt;
    });
    return stringToTitleCase;
}
  

navMenu.load = async function() {
    navMenu.thisUrl = new URL(location.href);
    navMenu.pathParts = navMenu.thisUrl.pathname.split('/');

    if (window.location.search) {
        const searchParam = new URLSearchParams(window.location.search);
        if (searchParam) {
            navMenu.searchQuery = searchParam.get('q');
        } 
    }
    // pathParts[0] is empty
    // pathParts[1] is the top-level menu (empty for home page)
    // There's typically an empty entry at the end of the array as well

    navMenu.isHomePage = (navMenu.pathParts[1].length == 0); 

    {
        const parts = [];
        parts.push('/')
        for(let ii = 1; ii < navMenu.pathParts.length && navMenu.pathParts[ii].length; ii++) {
            parts.push(navMenu.pathParts[ii]);
            parts.push('/')
        }

        navMenu.hrefPage = parts.join('');

        if (parts.length > 2) {
            parts.splice(parts.length - 3, 2);
            navMenu.hrefParent = parts.join('');
        }
        else {
            navMenu.hrefParent = '';
        }
    }

    if (window.location.hash && window.location.hash.startsWith('#')) {
        navMenu.hash = window.location.hash.substring(1);
    }

    // console.log('navMenu', navMenu);

    navMenu.menuPath = '/' + (!navMenu.isHomePage ? navMenu.pathParts[1] + '/' : '') + 'newMenu.json';

    const fetchRes = await fetch(navMenu.menuPath);
    if (fetchRes.status != 200) {
        // No menus
        return;
    }
    navMenu.menuJson = await fetchRes.json();
    // End new code    

    navMenu.navigationItems = [];

    for(const loadMoreTemp of navMenu.loadMoreConfig) {
        if (navMenu.hrefPage.startsWith(loadMoreTemp.baseUrl)) {
            navMenu.loadMoreObj = loadMoreTemp;
            break;
        }
    }

    if (typeof navMenu.loadMoreObj != 'undefined') {
        const fetchMoreRes = await fetch(navMenu.loadMoreObj.menuJsonUrl);
        const moreMenuJson = await fetchMoreRes.json();
        
        if (navMenu.loadMoreObj.insertLoc) {
            // insertLoc is used for Device OS API reference and libraries
            const updateInsertLoc = function(array) {
                for(const itemObj of array) {
                    if (itemObj.insertLoc == navMenu.loadMoreObj.insertLoc) {
                        itemObj.subsections = moreMenuJson.items;
                    }
                    if (typeof itemObj.subsections != 'undefined') {
                        updateInsertLoc(itemObj.subsections);
                    }
                }
            }   
            updateInsertLoc(navMenu.menuJson.items);
    
            // For the Device OS API and Libraries, this is a sequential list of every page (not anchor)
            // which is useful for automatically scrolling
            let nextIsSectionStart = false;
    
            navMenu.forEachItemInternal(moreMenuJson.items, {callback:function(itemObj) {
                if (nextIsSectionStart) {
                    itemObj.sectionStart = true;
                    nextIsSectionStart = false;
                }
                navMenu.navigationItems.push(itemObj);
                if (itemObj.collapse) {
                    nextIsSectionStart = true;
                }
            }});
        }
        else {
            // This is a scroll group
            // moreMenuJson (object)
            //   pages (array of objects)
            //      url (url - begins and ends with a /)
            //      h1 (h1 of the page)
            //      items (array of navigation menu items, same format as subsection)

            for(const pageObj of moreMenuJson.pages) {
                let insertAt;

                navMenu.forEachItem(function(itemObj, forEachOptions) {
                    if (pageObj.url == forEachOptions.itemUrl && typeof insertAt == 'undefined') {
                        insertAt = itemObj;
                    }
                });

                if (insertAt) {
                    insertAt.subsections = pageObj.items;
                    insertAt.collapse = true;
                }    
            }
        }
    }
    
    const nav = navMenu.generateNavHtml(navMenu.menuJson);
    $('.navMenuOuter').replaceWith(nav);

    if (typeof navMenu.loadMoreObj == 'undefined') {
        navMenu.forEachItem(function(itemObj) {
            navMenu.navigationItems.push(itemObj);
        });
    }

    if (typeof navMenu.loadMoreObj != 'undefined' && navMenu.loadMoreObj.hasPageQueue) {
        // Has page queue
        $('.originalContent').addClass('referencePage');
        $('.originalContent').attr('data-href', navMenu.thisUrl.pathname);

        for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
            const itemObj = navMenu.navigationItems[ii];
            if (navMenu.thisUrl.pathname == itemObj.hrefNoAnchor) {
                navMenu.initialIndex = navMenu.topIndex = navMenu.bottomIndex = ii;
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

                    navMenu.replacePage({index:ii});
                });
            }
        }

        // Preload pages
        navMenu.queuePage({index:navMenu.initialIndex, skipIndex:true, count:1, toEnd:true, fillScreen:true}); 

        navMenu.syncNavigationToPage(navMenu.thisUrl.pathname);
    }
    else {
        // No page queue
        navMenu.syncNavigation();
        navMenu.searchContent();
    }
}

navMenu.openAnchor = function(href) {
    if (!href || href.length == 0) {
        return;
    }
    if (href.startsWith('/')) {
        window.location.href = href;
        return;
    }

    if (window.history) {
        history.pushState({hash: href}, 'New Hash', '#' + href);
    }
    if (typeof Docs != 'undefined') {
        Docs.scrollToElement($('#' + href));
    }
}

navMenu.collapseExpandAll = function(showSubsections) {
    for(const itemObj of navMenu.navigationItems) {
        if (itemObj.collapseIconElem) {
            navMenu.collapseExpand(itemObj, showSubsections);
        }
    }
}

navMenu.collapseExpandInternal = function(itemObj, showSubsections) {

    for(const innerItemObj of itemObj.subsections) {
        if (showSubsections) {
            $(innerItemObj.elem).show();
        }
        else {
            $(innerItemObj.elem).hide();
        }
        if (typeof innerItemObj.subsections != 'undefined') {
            navMenu.collapseExpandInternal(innerItemObj, showSubsections);
        }
    }
} 

navMenu.collapseExpand = function(itemObj, showSubsections) {
    
    if (!itemObj.collapseIconElem) {
        // This item does not have a collapse icon, but maybe a parent does
        for(const tempItemObj of navMenu.navigationItems) {
            if (tempItemObj.collapseIconElem && itemObj.hrefNoAnchor.startsWith(tempItemObj.hrefNoAnchor)) {
                // console.log('navMenu.collapseExpand found parent collapse', {itemObj, tempItemObj});
                itemObj = tempItemObj;
                break;
            }
        }            
    }

    if (!itemObj.collapseIconElem) {
        // console.log('navMenu.collapseExpand did not find parent collapse icon', itemObj)
        return;
    }

    if (typeof showSubsections == 'undefined') {
        showSubsections = $(itemObj.collapseIconElem).hasClass('ion-arrow-right-b');
    }
    const isShown = $(itemObj.collapseIconElem).hasClass('ion-arrow-down-b');

    // console.log('navMenu.collapseExpand', { itemObj, showSubsections, isShown, });

    if (isShown != showSubsections) {
        if (showSubsections) {
            // Was right, make down
            $(itemObj.collapseIconElem).removeClass('ion-arrow-right-b');
            $(itemObj.collapseIconElem).addClass('ion-arrow-down-b');
    
            navMenu.collapseExpandInternal(itemObj, true);
        }
        else {
            // Has down, make right
            $(itemObj.collapseIconElem).removeClass('ion-arrow-down-b');
            $(itemObj.collapseIconElem).addClass('ion-arrow-right-b');
    
            navMenu.collapseExpandInternal(itemObj, false);
        }    
    }
}


navMenu.forEachItemInternal = function(array, options) {
    if (typeof options.path == 'undefined') {
        options.path = [];
    }

    for(const itemObj of array) {
        options.path.push(itemObj);

        if (options.rootDir) {
            options.itemUrl = options.rootDir;
        }
        else {
            options.itemUrl = '/';
        }
        for(const p of options.path) {
            if (typeof p.dir != 'undefined') {
                options.itemUrl += p.dir + '/';
            }
        }

        options.callback(itemObj, options);
        if (typeof itemObj.subsections != 'undefined') {
            navMenu.forEachItemInternal(itemObj.subsections, options);
        }
        options.path.splice(options.path.length - 1, 1);
    }
}

navMenu.forEachItem = function(callback) {    
    let options = {
        callback,
        path: [],
        rootDir: '/' + navMenu.menuJson.dir + '/',
    }
    navMenu.forEachItemInternal(navMenu.menuJson.items, options);
}

navMenu.generateNavHtmlInternal = function(submenuObj, options) {
    // options
    //   .level
    //   .path

    // CSS styles for menu items:
    // navMenu1, navMenu2, navMenu3, navMenu4, navMenu5
    // navSectionSpacer, navPlusMinus, navDisclosure
    // navIndent2, navIndent3, navIndent4, navIndent5
    // navContent3, navContent4, navContent5


    for(const itemObj of submenuObj) {
        // title, dir
        itemObj.level = options.level;
        itemObj.itemPath = (typeof itemObj.dir != 'undefined') ? (options.path + itemObj.dir) : options.path;
        itemObj.href = itemObj.href ? itemObj.href : itemObj.itemPath;
        if (!itemObj.title) {
            itemObj.title = navMenu.titleize(itemObj.dir);
        }
        {
            itemObj.hrefNoAnchor = itemObj.href;
            const ii = itemObj.hrefNoAnchor.indexOf('#')
            if (ii > 0) {
                itemObj.hrefNoAnchor = itemObj.hrefNoAnchor.substring(0, ii);
            }
            if (!itemObj.hrefNoAnchor.endsWith('/')) {
                itemObj.hrefNoAnchor += '/';
            }
        }
        

        itemObj.isActivePage = (itemObj.hrefNoAnchor == navMenu.hrefPage) ;
        itemObj.isActiveParent = (itemObj.hrefNoAnchor == navMenu.hrefParent) ;
        itemObj.isActivePath = (navMenu.pathParts[itemObj.level + 1] == itemObj.dir);

        if (itemObj.isActivePage && !itemObj.anchor && !itemObj.isContent && (typeof itemObj.subsections == 'undefined' || itemObj.insertLoc)) {
            // This is a normal page, add the internal headers to the navigation   
            let lastItemAtLevel = [];
            let lastLevel;

            lastItemAtLevel[1] = itemObj;

            $('div.content-inner').find('h2,h3,h4').each(function() {
                const level = parseInt($(this).prop('tagName').substring(1));
                
                let innerItemObj = {
                    title: $(this).text(),
                    anchor: $(this).attr('id'),
                    isContent: true,
                    href: itemObj.href,
                    level,
                    contentElem: this,
                };

                let addToLevel;
                for(addToLevel = level - 1; addToLevel >= 2; addToLevel--) {
                    if (lastItemAtLevel[addToLevel]) {
                        break;
                    }
                }

                if (lastItemAtLevel[addToLevel]) {
                    if (typeof lastItemAtLevel[addToLevel].subsections == 'undefined') {
                        lastItemAtLevel[addToLevel].subsections = [];
                    }
                    lastItemAtLevel[addToLevel].subsections.push(innerItemObj);
                }
                lastItemAtLevel[level] = innerItemObj;

                if (level < lastLevel) {
                    lastItemAtLevel = lastItemAtLevel.slice(0, level);
                }
                lastLevel = level;
            });     
            
        }

        if (itemObj.anchor) {
            itemObj.href += '#' + itemObj.anchor;
        }

        itemObj.elem = document.createElement('div');
        if (options.hideSubsections) {
            $(itemObj.elem).hide();   
        }
        $(itemObj.elem).addClass('navContainer');
        $(options.elem).append(itemObj.elem);

        const indentElem = document.createElement('div');
        $(indentElem).addClass('navIndent' + itemObj.level);
        $(itemObj.elem).append(indentElem);

        let hideSubsections = false;
        
        if (itemObj.collapse) {
            const triangleElem = document.createElement('div');
            $(triangleElem).addClass('navDisclosure');

            itemObj.collapseIconElem = document.createElement('i');      
            if (itemObj.isActivePath) {
                $(itemObj.collapseIconElem).addClass('ion-arrow-down-b');
            }   
            else {
                $(itemObj.collapseIconElem).addClass('ion-arrow-right-b');
                hideSubsections = true;
            }   
            $(triangleElem).append(itemObj.collapseIconElem);

            $(itemObj.elem).append(triangleElem);

            $(itemObj.elem).on('click', function(ev) {
                if ($(itemObj.collapseIconElem).hasClass('ion-arrow-right-b')) {
                    // Was right, make down (open)
                    analytics.track('collapseExpand', {label:itemObj.hrefNoAnchor, category:navMenu.gaCategory});
                    if (!ev.altKey) {
                        navMenu.collapseExpand(itemObj, true);
                    }
                    else {
                        navMenu.collapseExpandAll(true);
                    }
                }
                else {
                    // Has down, make right (close)
                    analytics.track('collapseCollapse', {label:itemObj.hrefNoAnchor, category:navMenu.gaCategory});
                    if (!ev.altKey) {
                        navMenu.collapseExpand(itemObj, false);
                    }
                    else {
                        navMenu.collapseExpandAll(false);
                    }
                }
            });


        }

        itemObj.linkElem = document.createElement('div');
        if (itemObj.isActivePage && (!itemObj.anchor || itemObj.anchor == navMenu.hash) && (typeof firmwareReference == 'undefined')) {
            // Don't highlight the active page for firmware reference here, it's done in syncNavigation
            $(itemObj.linkElem).addClass("navActive");
        }
        else {
            $(itemObj.linkElem).removeClass("navActive");
        }
        $(itemObj.linkElem).addClass("navMenu" + itemObj.level);

        let canLink = false;
        if (!itemObj.isActivePage && !itemObj.isSection) {
            // Non-active pages can be linked to, unless they are section headers
            canLink = true;
        }
        else 
        if (itemObj.anchor) {
            // Allow any page with an anchor to be linked to (this happens for deep inside the Device OS API reference)
            canLink = true;
        }
        else
        if (itemObj.insertLoc) {
            // Special page (Device OS API or Libraries) can be linked to always
            canLink = true;
        }

        if (canLink) {
            // This is not the active page and does not have subsections, so it's a clickable link
            // Also do this if it's a special page (Device OS API or Libraries)
            const aElem = document.createElement('a');
            $(aElem).addClass('navLink');
            if (typeof itemObj.anchor == 'undefined') {
                $(aElem).attr('href', itemObj.href);
            }
            else {
                $(aElem).attr('href', '#' + itemObj.anchor);
                $(aElem).on('click', function(ev) {
                    ev.preventDefault();

                    analytics.track('navClickInPage', {label:itemObj.anchor, category:navMenu.gaCategory});

                    $('.menubar').find('.navLinkActive').removeClass('navLinkActive');        
                    $(itemObj.elem).find('.navLink').addClass('navLinkActive');
                    navMenu.scrollToActive();        

                    if (itemObj.contentElem) {
                        navMenu.scrollDocsToElement(itemObj.contentElem);
                    }
                });            
            }
            $(aElem).text(itemObj.title);

            $(itemObj.linkElem).append(aElem);
            itemObj.navLinkElem = aElem;
        }
        else {
            $(itemObj.linkElem).text(itemObj.title);
        }
        $(itemObj.elem).append(itemObj.linkElem);    


        // console.log('itemObj', itemObj);

        if (typeof itemObj.subsections != 'undefined') {
            // Item with subsection

            const subOptions = Object.assign({}, options);
            subOptions.level = options.level + 1;
            subOptions.path = itemObj.itemPath + '/';
            subOptions.hideSubsections = options.hideSubsections || hideSubsections;

            navMenu.generateNavHtmlInternal(itemObj.subsections, subOptions);
        }
        else {
            // Regular item

        }
    }
}

navMenu.generateNavHtml = function(menuJson) {
    const path = (menuJson.dir == '') ? '/' : '/' + menuJson.dir + '/';

    // console.log('menuJson', menuJson);

    const navElem = document.createElement('div');
    $(navElem).addClass('navMenuOuter');
    $(navElem).data('menuJson', menuJson);

    const options = {
        level:1, 
        path,
        elem: navElem,
    };

    navMenu.generateNavHtmlInternal(menuJson.items, options);

    return navElem;
}

navMenu.searchContent = function() {
    if (!navMenu.searchQuery || navMenu.searchQuery.length == 0) {
        return;
    }

    const contentInner = $('div.content-inner');


    $.getScript('/assets/js/lunr.min.js', function(data, textStatus, jqxhr) {
        // Search using lunr
        let indexData = {};

        const lunrIndex = lunr(function() {
            const lunrThis = this;
            lunrThis.ref('id');
            lunrThis.field('hdrText');
            lunrThis.field('text');
            lunrThis.metadataWhitelist = ['position']

            let curItem = {};

            const addDoc = function() {
                if (!curItem) {
                    return;
                }


                let doc = {
                    id: $(curItem.hdrElem).prop('id'),
                    hdrText: curItem.hdrText,
                    text: curItem.text,
                };
                lunrThis.add(doc);
                indexData[doc.id] = doc;

                curItem = null;
            };


            $(contentInner).find('h2,h3,h4,p').each(function (index, elem) {
                // console.log('search elem', elem);
                const tagName = $(elem).prop('tagName');
                if (tagName.startsWith('H')) {
                    if (curItem) {
                        addDoc();
                    }
                    curItem = {
                        hdrElem: elem,
                        hdrText: $(elem).text(),
                        text: '',
                    };
                }
                else {
                    const text = $(elem).text();
                    if (text && text.length) {
                        curItem.text += text + ' ';
                    }
                }
            });

            addDoc();
        });
        
        let searchResults = [];
        const searchQuery = navMenu.searchQuery.replace(/:/g, ' ');
        
        try {
            searchResults = lunrIndex.search(searchQuery);
        }
        catch(e) {
            console.log('exception in search', {searchQuery, e});
        }

        // console.log('searchResults', searchResults);
        if (searchResults.length > 0) {            
            const containerElem = $('.document-search-container');
            if (containerElem.length && searchResults.length > 1) {
                // Only show if there is more than one match, since we also scroll to it
                $(containerElem).show();

                $(containerElem).find('.documentSearchTerm').text(navMenu.searchQuery);

                $(containerElem).find('.documentSearchCloseIcon').on('click', function() {
                    $(containerElem).hide();
                });

                // const resultsElem = $('.document-search-results');
                // $(resultsElem).text('testing!');
                const tbodyElem = $('.document-search-results > table > tbody');
                for(let ii = 0; ii < 8 && ii < searchResults.length; ii++) {
                    const res = searchResults[ii];

                    // res.ref - index into indexData, also anchor id for header
                    // res.score - number (floating point)
                    // res.matchData - object
                    //   .metadata - object
                    //     .integr
                    //         .hdrText - object
                    //           .position - array arrays
                    //              (inner array) start, length
                    //         .text - object
                    //           .position - array arrays
                    //              (inner array) start, length

                    const trElem = document.createElement('tr');
                    $(trElem).addClass('documentSearchRow');

                    doc = indexData[res.ref];
                    
                    const insertText = function(req) {
                        let text = doc[req.which]

                        let start = 0;
                        let end = text.length;

                        let positions = [];

                        for(const key in res.matchData.metadata) {
                            if (res.matchData.metadata[key][req.which] && res.matchData.metadata[key][req.which].position) {
                                if (Array.isArray(res.matchData.metadata[key][req.which].position[0])) {
                                    // Multiple matches
                                    for(const p of res.matchData.metadata[key][req.which].position) {
                                        positions.push(p);
                                    }
                                }
                                else {
                                    positions.push(res.matchData.metadata[key][req.which].position);
                                }
                            }
                        }

                        positions.sort(function(a, b) {
                            return a[0] - b[0];
                        });

                        if (positions.length && req.which == 'text') {
                            const p = positions[0];
                            if (p[0] > 80) {
                            
                                start = p[0] - 30;
                                end -= start;                                    
                            }    
                        }

                        if ((end - start) > 180) {
                            end = start + 180;
                        }

                        let textSegments = [];
                        let curStart = start;

                        // console.log('in-document search', {start, end, positions, text});

                        if (positions.length) {
                            for(const pos of positions) {
                                if (pos[0] > curStart) {
                                    textSegments.push({
                                        text: text.substring(curStart, pos[0]),
                                    });        
                                    curStart = pos[0];
                                }
                                textSegments.push({
                                    text: text.substring(curStart, curStart + pos[1]),
                                    highlighted: true,
                                });                                    
                                curStart = curStart + pos[1];
                            }
                        }

                        if (curStart < end) {
                            textSegments.push({
                                text: text.substring(curStart, end),
                            });    
                        }

                        for(const seg of textSegments) {
                            const spanElem = document.createElement('span');
                            $(spanElem).text(seg.text);
                            if (seg.highlighted) {
                                $(spanElem).addClass('documentSearchHighlightedText');
                            }
                            $(req.tdElem).append(spanElem);
                        }

                    }


                    let tdElem = document.createElement('td');
                    $(tdElem).addClass('documentSearchCell');
                    insertText({tdElem, which:'hdrText'});
                    $(trElem).append(tdElem);

                    tdElem = document.createElement('td');
                    $(tdElem).addClass('documentSearchCell');
                    insertText({tdElem, which:'text'});
                    $(trElem).append(tdElem);


                    $(trElem).on('click', function() {
                        navMenu.scrollDocsToElement ($('#' + res.ref));
                    });

                    $(tbodyElem).append(trElem);
                }
            }

            navMenu.scrollDocsToElement ($('#' + searchResults[0].ref));
        }
    });
}

navMenu.scrollToActive = function () {

    let activeElem = $('.navLinkActive');
    if (activeElem.length == 0) {
        activeElem = $('.navActive');
    }
    
    if (activeElem.length) {
        const boundingRect = $(activeElem)[0].getBoundingClientRect();

        const menubarRect = $('.menubar')[0].getBoundingClientRect();

        //console.log('scrollToActive', {boundingRect, menubarRect});

        if ((boundingRect.top >= menubarRect.top) && (boundingRect.bottom <= menubarRect.bottom)) {
            // Is already visible, don't scroll
        }
        else {
            activeElem[0].scrollIntoView();  
        }
    }
};

navMenu.scrollDocsToElement = function (element) {
    let topOffset = 10;

    // Make selection visible
    let tempElem = $(element);
    for (let tries = 0; tries < 20; tries++) {
        if ($(tempElem).hasClass('content')) {
            break;
        }

        if ($(tempElem).hasClass('collapseIndent')) {
            if (!$(tempElem).is(':visible')) {
                $(tempElem).show();
                break;
            }
            else {
            }
        }
        tempElem = $(tempElem).parent();
    }

    const containerElem = $('.document-search-container');
    if (containerElem.length) {
        if ($(containerElem).is(':visible')) {
            topOffset -= $(containerElem).height();
        }
    }

    var $element = $(element);
    if ($element.length === 1) {
        var position = $element.position().top + topOffset;
        $('.content-inner').scrollTop(position);
    }
    navMenu.syncNavigation();
};

navMenu.syncNavigation = function() {
    if (!navMenu || !navMenu.menuJson) {
        return;
    }        

    const itemsNearby = navMenu.getItemsNearby();

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
    
    if (typeof navMenu.loadMoreObj != 'undefined' && navMenu.loadMoreObj.hasPageQueue) {

        if (navMenu.lastScrollDir == 'up' && typeof itemsNearby.loadAboveIndex != 'undefined') {
            navMenu.queuePage({index:itemsNearby.loadAboveIndex, skipIndex: false, count:3, toEnd:false, noScroll:true});  
        }
        if (navMenu.lastScrollDir == 'down' && typeof itemsNearby.loadBelowIndex != 'undefined') {
            navMenu.queuePage({index:itemsNearby.loadBelowIndex, skipIndex: false, count:3, toEnd:true, noScroll:true});  
        }
    }      

}


navMenu.navigatePage = function(options) {
        
    if (typeof navMenu.lastItemIndex == 'undefined') {
        navMenu.lastItemIndex = 0;
    }
    if (!options.dir) {
        options.dir = 1;
    }


    if (options.level) {
        for(let ii = navMenu.lastItemIndex + options.dir; ii >= 0 && ii < navMenu.navigationItems.length; ii += options.dir) {
            const itemObj = navMenu.navigationItems[ii];
            if (itemObj.level == options.level) {
                navMenu.replacePage({index: ii});
                break;
            }                
        }
    }   
    else
    if (options.section) {
        const hrefCurrent = navMenu.navigationItems[navMenu.lastItemIndex].hrefNoAnchor;

        for(let ii = navMenu.lastItemIndex + options.dir; ii >= 0 && ii < navMenu.navigationItems.length; ii += options.dir) {
            const itemObj = navMenu.navigationItems[ii];
            if (itemObj.hrefNoAnchor != hrefCurrent) {
                navMenu.replacePage({index: ii});
                break;    
            }
        }
    }
    
}


navMenu.navigate = function(dir) {
    
    switch(dir) {
        case 'up':
            navMenu.navigatePage({level: 3, dir: -1});
            break;

        case 'down':
            navMenu.navigatePage({level: 3, dir: +1});
            break;

        case 'left':
            navMenu.navigatePage({section: true, dir: -1});
            break;

        case 'right':
            navMenu.navigatePage({section: true, dir: +1});
            break;

        case 'Home':
        case 'End':
            break;

        case 'PageUp':
            navMenu.lastScrollDir = 'up';
            $(scrollableContent)[0].scrollBy(0, -($(scrollableContent).height() - 20));
            navMenu.syncNavigation();
            break;

        case 'PageDown':
            navMenu.lastScrollDir = 'down';
            $(scrollableContent)[0].scrollBy(0, $(scrollableContent).height() - 20);
            navMenu.syncNavigation();
            break;
    }
}


// Used for Device OS API and scroll groups (previously part of firmware-reference.js)
navMenu.loadPage = function() {
    if (navMenu.pageQueue.length == 0 || navMenu.pageLoading) {
        return;
    }
    const scrollableContent = $('div.content-inner');

    let options = navMenu.pageQueue.splice(0, 1)[0];

    let itemIndex;

    if (typeof options.index != 'undefined') {
        itemIndex = options.index;

        if (typeof navMenu.lastItemIndex == 'undefined') {
            navMenu.lastItemIndex = options.index;
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
        navMenu.checkLoadPage(options);
        return;
    }
    if (itemObj.anchor) {
        navMenu.checkLoadPage(options);
        return;
    }

    navMenu.pageLoading = true;

    // console.log('loadPage', {options, itemIndex, itemObj});

    fetch(options.link)
        .then(response => response.text())
        .then(function(res) {

            // <!-- start 841427f3-9f46-4361-ab97-7afda1e082f9 -->
            // <!-- end 841427f3-9f46-4361-ab97-7afda1e082f9 -->
            let newContent = '';
            let inNewContent = false;

            // Note: these markers are currently in the commonTwo and reference layouts
            // only, but could easily be added to other layouts if needed. Almost
            // everything new uses commonTwo.
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
                    navMenu.pageLoading = false;
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
                analytics.track('replacePage', {label:options.link, category:navMenu.gaCategory});

                for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
                    if (ii != itemIndex) {
                        const tempItemObj = navMenu.navigationItems[ii];
                        if (tempItemObj.collapseIconElem) {
                            navMenu.collapseExpand(tempItemObj, false);
                        }                   
                    }
                }

                navMenu.initialIndex = navMenu.topIndex = navMenu.bottomIndex = itemIndex;
                history.pushState(null, '', itemObj.hrefNoAnchor);

                $(divElem).addClass('originalContent');
                $('div.content').append(divElem);

                navMenu.syncNavigationToPage(options.link);
            }
            else {
                if (itemIndex < navMenu.topIndex) {
                    navMenu.topIndex = itemIndex;
                    analytics.track('addPageTop', {label:options.link, category:navMenu.gaCategory});

                    $('div.content').not('.note-common').first().prepend(divElem);
                }
                else
                if (itemIndex > navMenu.bottomIndex) {
                    navMenu.bottomIndex = itemIndex;
                    analytics.track('addPageBottom', {label:options.link, category:navMenu.gaCategory});

                    $('div.content').not('.note-common').last().append(divElem);
                }
                else {
                    console.log('insertion error', {itemIndex, topIndex: navMenu.topIndex, bottomIndex: navMenu.bottomIndex})
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
            navMenu.pageLoading = false;


            navMenu.checkLoadPage(options);
        })
        .catch(function(err) {
            console.log('err', err);
        });

}

// Used if hasPageQueue is true in the loadMoreConfig, currently Device OS API and scroll groups
navMenu.checkLoadPage = function(options) {
    if (options.fillScreen) {
        if (navMenu.pageQueue.length == 0) {
            const itemsNearby = navMenu.getItemsNearby();

            if (typeof itemsNearby.bottomIndex == 'undefined' && typeof itemsNearby.loadBelowIndex != 'undefined') {
                navMenu.queuePage({index:itemsNearby.loadBelowIndex, skipIndex: false, count:1, toEnd:true, fillScreen:true});  
            }    
        }
        else {
        }
    }

    if (navMenu.pageQueue.length > 0) {
        navMenu.loadPage();
    }
}

// Used if hasPageQueue is true in the loadMoreConfig, currently Device OS API and scroll groups
navMenu.queuePage = function(options) {
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
                navMenu.pageQueue.push(obj);        
                
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
                navMenu.pageQueue.push(obj);                            

                if (++numAdded >= count) {
                    break;
                }
            }       
        }            
    }
    else {
        if (options.link) {
            navMenu.pageQueue.push(options);            
        }    
    }
    navMenu.loadPage();
}

// Used if hasPageQueue is true in the loadMoreConfig, currently Device OS API and scroll groups
navMenu.replacePage = function(options) {

    navMenu.pageQueue = [];
    navMenu.lastScrollDir = null;

    if (typeof options.index != 'undefined') {

        if (typeof navMenu.loadMoreObj != 'undefined' && navMenu.loadMoreObj.hasPageQueue) {
            navMenu.queuePage({replacePage: true, skipIndex: false, index: options.index, count: 3, toEnd: true, fillScreen: true, });
        }
        else {
            options.link = navMenu.navigationItems[options.index].hrefNoAnchor;            
            location.href = options.link;
        }
        navMenu.lastItemIndex = options.index;
    }
}


navMenu.updateScroll = function() {

    const scrollableContent = $('div.content-inner');

    let params = {};

    params.scrollTop = Math.round($(scrollableContent).scrollTop());
    params.scrollHeight = $(scrollableContent).prop('scrollHeight');
    params.height = $(scrollableContent).height();
    
    params.atTop = (params.scrollTop == 0);
    params.atBottom = (params.scrollTop >= (params.scrollHeight - params.height));

    // $(scrollableContent).height() is the height of the view
    if (typeof navMenu.lastScrollTop != 'undefined') {
        if (params.scrollTop > (navMenu.lastScrollTop + 5)) {
            navMenu.lastScrollDir = 'down';
            navMenu.lastScrollTop = params.scrollTop;
        }
        else 
        if (params.scrollTop < (navMenu.lastScrollTop - 5)) {
            navMenu.lastScrollDir = 'up';
            navMenu.lastScrollTop = params.scrollTop;
        }
    }
    else {
        navMenu.lastScrollTop = params.scrollTop;
    }

    if (typeof navMenu.loadMoreObj != 'undefined' && !navMenu.loadMoreObj.hasPageQueue) {
        if (params.atBottom && navMenu.lastScrollDir == 'down' && navMenu.bottomIndex < navMenu.navigationItems.length) {
            navMenu.queuePage({index:navMenu.bottomIndex, skipIndex: true, count:3, toEnd:true});  
        }

        if (params.atTop && navMenu.lastScrollDir == 'up' && navMenu.topIndex >= 0) {
            navMenu.queuePage({index:navMenu.topIndex, skipIndex: true, count:3, toEnd:false});  
        }
    }    
    return params;
}

// Used if hasPageQueue is true in the loadMoreConfig, currently Device OS API and scroll groups
navMenu.syncNavigationToPage = function(link) {
    $('.menubar').find('.navLinkActive').removeClass('navLinkActive');
    $('.menubar').find('.navActive').removeClass('navActive');

    for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
        const itemObj = navMenu.navigationItems[ii];
        if (itemObj.hrefNoAnchor == link) {
            // console.log('navMenu.syncNavigationToPage', {link, ii, itemObj});
            $(itemObj.elem).find('.navLink').addClass('navLinkActive');
            $(itemObj.elem).find('.navMenu' + itemObj.level).addClass('navActive');
            navMenu.lastItemIndex = ii;
            return;
        }
    }
}

navMenu.getItemsNearby = function() {
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

    if (navMenu.lastScrollDir == 'up') {
        // Use item above if not visible or scrolling up
        itemsNearby.selectIndex = itemsNearby.aboveIndex;
    }
    
    if (typeof itemsNearby.selectIndex == 'undefined' && itemsNearby.visible.length > 0) {
        itemsNearby.selectIndex = itemsNearby.visible[0];
    }

    return itemsNearby;
}


navMenu.ready = async function () {
    await navMenu.load();


    let startX, startY, startTime;

    $('div.page-body').on('touchstart', function(e) {
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
        startTime = Date.now();
    });

    $('div.page-body').on('touchend', function(e) {
        const deltaX = e.changedTouches[0].pageX - startX;
        const deltaY = e.changedTouches[0].pageY - startY;
        const deltaTime = Date.now() - startTime;

        if (Math.abs(deltaX) < 30 && Math.abs(deltaY) < 30 && deltaTime < 200) {
            // Tap
            if (startX < 150) {
                // Tap left
                navMenu.navigate('left');
            }
            else
            if (startX > (screen.width - 150)) {
                // Tap right
                navMenu.navigate('right');
            }
        }

        if (Math.abs(deltaX) > 150 && Math.abs(deltaY) < 150 && deltaTime < 400) {
            // Swipe
            if (deltaX < 0) {
                // Right (next)
                navMenu.navigate('right');
            }  
            else {
                // Left (previous)
                navMenu.navigate('left');
            }
        }    
    });    

    

    $('body').on('keydown', function(ev) {
        if (ev.shiftKey) {
            switch(ev.key) {
                case 'ArrowLeft':
                    // Prev topic
                    ev.preventDefault();
                    navMenu.navigate('left');
                    break;

                case 'ArrowRight':
                    // Next topic
                    ev.preventDefault();
                    navMenu.navigate('right');
                    break;

                case 'ArrowUp':
                    // Previous section
                    ev.preventDefault();
                    navMenu.navigate('up');
                    break;

                case 'ArrowDown':
                    // Next section
                    ev.preventDefault();
                    navMenu.navigate('down');
                    break;
            }
        }
        else {
            switch(ev.key) {
                case 'Home':
                case 'End':
                case 'PageUp':
                case 'PageDown':
                    ev.preventDefault();
                    navMenu.navigate(ev.key);
                    break;
            }
        }
    });



    // Used if hasPageQueue is true in the loadMoreConfig, currently Device OS API and scroll groups
    $('div.content-inner').on('scroll', function(e) {
        // console.log('scrolled ', e);
        // e.originalEvent
        if (typeof navMenu.loadMoreObj != 'undefined' && navMenu.loadMoreObj.hasPageQueue) {
            if (!navMenu.pageLoading) {
                navMenu.updateScroll();
            }
        }
        navMenu.syncNavigation();
    });

    // navMenu.scanHeaders();
    navMenu.scrollToActive();


};

$(document).ready(function () {
    navMenu.ready();
});

