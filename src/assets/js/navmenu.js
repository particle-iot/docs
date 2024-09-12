// Navigation Menu
let navMenu = {};

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

    console.log('navMenu', navMenu);

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
    }
    
    const nav = navMenu.generateNavHtml(navMenu.menuJson);
    $('.navMenuOuter').replaceWith(nav);
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
    
    if ($(itemObj.collapseIconElem).hasClass('ion-arrow-right-b')) {
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


navMenu.forEachItemInternal = function(array, options) {
    for(const itemObj of array) {
        options.callback(itemObj);
        if (typeof itemObj.subsections != 'undefined') {
            navMenu.forEachItemInternal(itemObj.subsections, options);
        }
    }
}

navMenu.forEachItem = function(callback) {    
    navMenu.forEachItemInternal(navMenu.menuJson.items, {callback});
}

navMenu.generateNavHtmlInternal = function(submenuObj, options) {
    // options
    //   .level
    //   .path

    // CSS styles for menu items:
    // navMenu1, navActive1, navMenu2, navActive2, navMenu3, navMenu4, navMenu5
    // navSectionSpacer, navPlusMinus, navDisclosure
    // navIndent2, navIndent3, navIndent4, navIndent5
    // navContent3, navContent4, navContent5


    for(const itemObj of submenuObj) {
        // title, dir
        itemObj.level = options.level;
        itemObj.itemPath = (typeof itemObj.dir != 'undefined') ? (options.path + itemObj.dir) : options.path;
        itemObj.href = itemObj.href ? itemObj.href : itemObj.itemPath;
        if (!itemObj.href.endsWith('/')) {
            itemObj.href += '/';
        }
        if (!itemObj.title) {
            itemObj.title = navMenu.titleize(itemObj.dir);
        }

        itemObj.isActivePage = (itemObj.href == navMenu.hrefPage) ;
        itemObj.isActiveParent = (itemObj.href == navMenu.hrefParent) ;
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
                };

                if (lastItemAtLevel[level - 1]) {
                    if (typeof lastItemAtLevel[level - 1].subsections == 'undefined') {
                        lastItemAtLevel[level - 1].subsections = [];
                    }
                    lastItemAtLevel[level - 1].subsections.push(innerItemObj);
                }
                lastItemAtLevel[level] = innerItemObj;

                if (level < lastLevel) {
                    lastItemAtLevel[level] = null;
                }
                lastLevel = level;
            });     
            
            console.log('content navigation done', itemObj);
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

            $(itemObj.elem).on('click', function() {
                if ($(itemObj.collapseIconElem).hasClass('ion-arrow-right-b')) {
                    // Was right, make down (open)
                    navMenu.collapseExpand(itemObj, true);
                }
                else {
                    // Has down, make right (close)
                    navMenu.collapseExpand(itemObj, false);
                }
            });

        }

        itemObj.linkElem = document.createElement('div');
        if (itemObj.isActivePage && (!itemObj.anchor || itemObj.anchor == navMenu.hash)) {
            $(itemObj.linkElem).addClass("navActive" + itemObj.level);
        }
        else {
            $(itemObj.linkElem).addClass("navMenu" + itemObj.level);
        }

        let canLink = false;
        if (!itemObj.isActivePage && (typeof itemObj.subsections == 'undefined' || itemObj.insertLoc)) {
            // Non-active page always links if there are no subsections or this is a special page (Device OS API or Libraries)
            canLink = true;
        }
        else 
        if (itemObj.anchor) {
            // Allow any page with an anchor to be linked to (this happens for deep inside the Device OS API reference)
            canLink = true;
        }

        if (canLink) {
            // This is not the active page and does not have subsections, so it's a clickable link
            // Also do this if it's a special page (Device OS API or Libraries)
            const aElem = document.createElement('a');
            $(aElem).addClass('navLink');
            $(aElem).attr('href', itemObj.href);
            $(aElem).text(itemObj.title);

            $(itemObj.linkElem).append(aElem);
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

    console.log('menuJson', menuJson);

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
                        Docs.scrollToElement($('#' + res.ref));
                    });

                    $(tbodyElem).append(trElem);
                }
            }

            Docs.scrollToElement($('#' + searchResults[0].ref));
        }
    });
}

navMenu.scanHeaders = function () {
    if (navMenu.thisUrl.pathname.startsWith('/reference/device-os/api')) {
        return;
    }

    let navLevel = $('#navActiveContent').data('level') || 3;

    navMenu.headers = [];

    const contentInner = $('div.content-inner');

    navMenu.useDisclosureTriangle = false;

    let headerLevels = 'h2,h3,h4';
    let levelAdjust = 0;

    let lastL2;
    let hasL2 = false;

    $(contentInner).find(headerLevels).each(function (index, elem) {
        // console.log('elem', elem);
        const id = $(elem).prop('id');
        if (id) {
            const level = parseInt($(elem).prop('tagName').substr(1)) + levelAdjust;
            let obj = { 
                elem, 
                id, 
                level,
                text: $(elem).text(),
            };
            navMenu.headers.push(obj);

            if (level == 2) {
                lastL2 = obj;
                hasL2 = true;
            }

            if (level > 2) {
                if (lastL2) {
                    navMenu.useDisclosureTriangle = true;
                    lastL2.hasDisclosureTriangle = true;
                }
            }
        }
    });

    if (!hasL2) {
        // Document has no L2 headers, promote all headers by one level
        for(let hdr of navMenu.headers) {
            hdr.level--;
        }
    }

    // console.log('scanHeaders headers', navMenu.headers);
    navMenu.searchContent();

    navMenu.currentHeader = 0;

    $(contentInner).on('scroll', function () {
        // Copied from docs.js.hbs
        var scrollPosition = contentInner.scrollTop();
        var done = false;

        var oldHeader = navMenu.currentHeader;
        while (!done) {
            if (navMenu.currentHeader < navMenu.headers.length - 2 &&
                scrollPosition >= Math.floor($(navMenu.headers[navMenu.currentHeader + 1].elem).position().top)) {
                navMenu.currentHeader += 1;
            } else if (navMenu.currentHeader > 0 &&
                scrollPosition < Math.floor($(navMenu.headers[navMenu.currentHeader].elem).position().top)) {
                navMenu.currentHeader -= 1;
            } else {
                done = true;
            }
        }

        if (oldHeader !== navMenu.currentHeader) {
            navMenu.updateTOC();
        }
    });

    $('.navActive2').siblings('.navPlusMinus').on('click', function() {
        const iconElem = $(this).find('i');

        if ($(iconElem).hasClass('ion-minus')) {
            // Is minus (content displayed), change to plus (content hidden)
            $(iconElem).removeClass('ion-minus').addClass('ion-plus');
            $('#navActiveContent').hide();
        }
        else {
            // Is plus (content hidden, change to minus (content displayed)
            $(iconElem).removeClass('ion-plus').addClass('ion-minus');
            $('#navActiveContent').show();
        }

    });  

    // Build TOC HTML
    lastL2 = null;
    let lastL3;

    let hasActiveContent = false;

    const createSimpleTocElem = function(hdr, level) {
        let e1, e2, e3;

        e1 = document.createElement('div');
        $(e1).addClass('navMenu' + level  + ' navContainer');

        e2 = document.createElement('div');
        $(e2).addClass('navIndent' + level)
        $(e1).append(e2);

        e2 = document.createElement('div');
        $(e2).addClass('navContent' + level);

        e3 = document.createElement('a');
        $(e3).addClass('navLink')
        $(e3).attr('href', '#' + hdr.id);
        $(e3).on('click', function() {
            navMenu.openAnchor(hdr.id);
        });
        $(e3).text($(hdr.elem).text());
        $(e2).append(e3);
        $(e1).append(e2);

        $('#navActiveContent').append(e1);
        hasActiveContent = true;

        $(e1).hide();
        hdr.tocElem = e1;

        return e1;
    }

    $('#navActiveContent').empty();
    for (let hdr of navMenu.headers) {
        if (hdr.level == 2) {
            let e1, e2, e3, e4;

            e1 = document.createElement('div');
            $(e1).addClass('navMenu' + navLevel + ' navContainer');

            e2 = document.createElement('div');
            $(e2).addClass('navIndent' + navLevel);
            $(e1).append(e2);

            if (hdr.hasDisclosureTriangle) {
                e2 = document.createElement('div');
                $(e2).addClass('navDisclosure');

                const iconElem = document.createElement('i');
                $(iconElem).addClass('ion-arrow-right-b');
                $(e2).append(iconElem);

                const clickHdr = hdr;

                $(e2).on('click', function () {
                    if ($(iconElem).hasClass('ion-arrow-right-b')) {
                        // Was right, make down
                        $(iconElem).removeClass('ion-arrow-right-b');
                        $(iconElem).addClass('ion-arrow-down-b');                        
                        $(clickHdr.tocChildren).show();
                    }
                    else {
                        // Has down, make right
                        $(iconElem).removeClass('ion-arrow-down-b');
                        $(iconElem).addClass('ion-arrow-right-b');
                        $(clickHdr.tocChildren).hide();
                    }
                });

                $(e1).append(e2);
            }
            else if (navMenu.useDisclosureTriangle) {
                // This is a change in behavior from before. Now, if there are
                // any disclosure triangles, entries without one are indented
                // to the same level so the text is aligned.
                e2 = document.createElement('div');
                $(e2).addClass('navDisclosure');
                $(e1).append(e2);
            }

            e2 = document.createElement('div');
            $(e2).addClass('navContent3');

            e3 = document.createElement('a');
            $(e3).addClass('navLink')
            $(e3).attr('href', '#' + hdr.id);
            $(e3).on('click', function() {
                navMenu.openAnchor(hdr.id);
            });
            $(e3).text($(hdr.elem).text());
            $(e2).append(e3);
            $(e1).append(e2);

            $('#navActiveContent').append(e1);
            hasActiveContent = true;
            hdr.tocElem = e1;

            lastL2 = hdr;
        }
        else if (hdr.level == 3 && lastL2) {
            let elem = createSimpleTocElem(hdr, 4);

            if (!lastL2.tocChildren) {
                lastL2.tocChildren = [];
            }
            lastL2.tocChildren.push(elem);

            lastL3 = hdr;
        }
        else if (hdr.level == 4 && lastL3) {
            let elem = createSimpleTocElem(hdr, 5);

            if (!lastL3.tocChildren) {
                lastL3.tocChildren = [];
            }
            lastL3.tocChildren.push(elem);
        }
    }

    if (!hasActiveContent) {
        $('.navActive2').siblings('.navPlusMinus').hide();
    }
};

navMenu.updateTOC = function () {

    let hierarchy = [];
    hierarchy.push(navMenu.headers[navMenu.currentHeader]);
    for (let ii = navMenu.currentHeader - 1; ii >= 0; ii--) {
        if (navMenu.headers[ii].level < hierarchy[0].level) {
            hierarchy.splice(0, 0, navMenu.headers[ii]);
        }
        if (hierarchy[0].level == 2) {
            break;
        }
    }
    
    // Change active links back to plain
    $('.navLinkActive').removeClass('navLinkActive').addClass('navLink');

    // Collapse all sections
    $('#navActiveContent i').removeClass('navActive').removeClass('ion-arrow-down-b').addClass('ion-arrow-right-b');
    $('.navMenu4').hide();
    $('.navMenu5').hide();

    // Expand the current section
    $(hierarchy[0].tocElem).find('i').removeClass('ion-arrow-right-b').addClass('ion-arrow-down-b');

    for (let ii = 0; ii < hierarchy.length; ii++) {
        if (hierarchy[ii].tocElem) {
            $(hierarchy[ii].tocElem).find('a').removeClass('navLink').addClass('navLinkActive');
        }
        $(hierarchy[ii].tocChildren).show();
    }
    navMenu.scrollToActive();
};

navMenu.scrollToActive = function () {
    let activeElem = $('.navLinkActive');
    if (activeElem.length == 0) {
        activeElem = $('.navActive2');
    }
    if (activeElem.length) {
        activeElem[0].scrollIntoView();  
    }
};



navMenu.syncNavigation = function() {
    if (!navMenu.menuJson) {
        return;
    }
    
    let pageOffsets = [];
    $('div.content-inner').find('h2,h3,h4,h5').each(function (index, elem) {
        const offset = $(this).offset();
        pageOffsets.push({
            top: offset.top,
            id: $(this).attr('id')
        })
    });

    let id;

    // If the 0 <= offset.top <= 10 then the referencePage is at the top of the screen and is definitely the
    // one to display.
    // However, if there isn't one in that range, then look up (negative offset) to find the closest href,
    // because it's been scrolled up.
    for(let ii = pageOffsets.length - 1; ii >= 0; ii--) {
        if (pageOffsets[ii].top < 10) {
            id = pageOffsets[ii].id;
            break;
        }
    }

    if (!id) {
        return;
    }

    if (navMenu.lastAnchor == id) {
        return;
    }
    navMenu.lastAnchor = id;

    console.log('id=' + id);

    navMenu.forEachItem(function(itemObj) {
        if (itemObj.isContent) {
            if (itemObj.anchor == id) {
                console.log('found id=' + id);
            }
            else {

            }
        }
    });
}

$('div.content-inner').on('scroll', function(e) {
    // TODO: Probably include code from firmware-reference to restrict syncNavigation
    navMenu.syncNavigation();
});

navMenu.ready = async function () {
    await navMenu.load();

    navMenu.scanHeaders();
    navMenu.scrollToActive();


};

$(document).ready(function () {
    navMenu.ready();
});

