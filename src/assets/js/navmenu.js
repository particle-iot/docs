// Navigation Menu
let navMenu = {
    gaCategory: 'navMenu',

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

    let loadMore;
    
    if (navMenu.hrefPage.startsWith('/reference/device-os/api')) {
        loadMore = {
            'url': '/assets/files/apiMenus.json',
            'insertLoc': 'device-os-api',
        };
    }
    if (navMenu.hrefPage.startsWith('/reference/device-os/libraries')) {
        loadMore = {
            'url': '/assets/files/libraryMenus.json',
            'insertLoc': 'libraries',
        };

    }
    navMenu.navigationItems = [];

    if (loadMore) {
        const fetchMoreRes = await fetch(loadMore.url);
        const moreMenuJson = await fetchMoreRes.json();

        const updateInsertLoc = function(array) {
            for(const itemObj of array) {
                if (itemObj.insertLoc == loadMore.insertLoc) {
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
            // if (!itemObj.anchor) {
                if (nextIsSectionStart) {
                    itemObj.sectionStart = true;
                    nextIsSectionStart = false;
                }
                navMenu.navigationItems.push(itemObj);
                if (itemObj.collapse) {
                    nextIsSectionStart = true;
                }
            // }
        }});
    }
    else {
        navMenu.forEachItem(function(itemObj) {
            if (!itemObj.anchor) {
                navMenu.navigationItems.push(itemObj);
            }
        });
    }
    
    const nav = navMenu.generateNavHtml(navMenu.menuJson);
    $('.navMenuOuter').replaceWith(nav);

    if (typeof firmwareReference != 'undefined') {
        firmwareReference.navMenuLoaded();
    }
    else {
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

    if (submenuObj.internal) {
        if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
            return;
        }
    }
    if (submenuObj.hidden) {
        return;
    }

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
                    lastItemAtLevel = lastItemAtLevel.slice(0, level + 1);
                }
                lastLevel = level;
            });     
            
        }

        if (itemObj.internal && !itemObj.isActivePage) {
            if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                continue;
            }
        }
        if (itemObj.hidden && !itemObj.isActivePage) {
            continue;
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

        if (itemObj.internal || itemObj.hidden) {
            const imgElem = document.createElement('img');
            $(imgElem).attr('src', '/assets/images/logo.png');
            $(imgElem).attr('width', '16px');
            $(imgElem).attr('height', '16px');

            $(itemObj.elem).append(imgElem);    
        }


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
    if (!navMenu.menuJson) {
        return;
    }
    if (typeof firmwareReference != 'undefined') {
        firmwareReference.syncNavigation();
        return;
    }
    
    let pageOffsets = [];
    $('div.content-inner').find('h2,h3,h4,h5').each(function (index, elem) {
        const offset = $(this).offset();

        let obj = {
            top: offset.top,
            id: $(this).attr('id'),
        };
        pageOffsets.push(obj);    
    });

    // If the 0 <= offset.top <= 10 then the referencePage is at the top of the screen and is definitely the
    // one to display.
    // However, if there isn't one in that range, then look up (negative offset) to find the closest href,
    // because it's been scrolled up.
    const menubarRect = $('.menubar')[0].getBoundingClientRect();
    
    let topIndex;
    for(let ii = pageOffsets.length - 1; ii >= 0; ii--) {
        if (pageOffsets[ii].top < (menubarRect.top + 10)) {
            topIndex = ii;
            break;
        }
    }
    if (typeof topIndex == 'undefined') {
        return;
    }

    const id = pageOffsets[topIndex].id;

    if (navMenu.lastAnchor == id) {
        return;
    }
    navMenu.lastAnchor = id;

    $('.menubar').find('.navLinkActive').removeClass('navLinkActive');

    navMenu.forEachItem(function(itemObj) {
        if (itemObj.isContent) {
            if (itemObj.anchor == id) {
                $(itemObj.elem).find('.navLink').addClass('navLinkActive');
                navMenu.scrollToActive();
            }
        }
    });
}

navMenu.navigatePage = function(options) {
    if (!options.dir) {
        options.dir = 1;
    }

    let index;

    for(let ii = 0; ii < navMenu.navigationItems.length; ii++) {
        const itemObj = navMenu.navigationItems[ii];
        if (navMenu.thisUrl.pathname == itemObj.hrefNoAnchor) {
            // Found page
            if (options.dir > 0) {
                if ((ii + 1) < navMenu.navigationItems.length) {
                    index = ii + 1;
                }
            }
            else {
                if (ii > 0) {
                    index = ii - 1;
                }
            }
            break;
        }
    }
    if (typeof index != 'undefined') {
        location.href = navMenu.navigationItems[index].hrefNoAnchor;
    }
}


navMenu.navigate = function(dir) {
    if (typeof firmwareReference != 'undefined') {
        firmwareReference.navigate(dir);
        return;
    }

    const scrollableContent = $('div.content-inner');

    switch(dir) {
        case 'up':
        case 'down':
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
            $(scrollableContent)[0].scrollBy(0, -($(scrollableContent).height() - 20));
            break;

        case 'PageDown':
            $(scrollableContent)[0].scrollBy(0, $(scrollableContent).height() - 20);
            break;
    }
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


    $('div.content-inner').on('scroll', function(e) {
        // TODO: Probably include code from firmware-reference to restrict syncNavigation
        navMenu.syncNavigation();
    });

    // navMenu.scanHeaders();
    navMenu.scrollToActive();


};

$(document).ready(function () {
    navMenu.ready();
});

