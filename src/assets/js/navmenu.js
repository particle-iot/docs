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

    navMenu.menuPath = '/' + (!navMenu.isHomePage ? navMenu.pathParts[1] + '/' : '') + 'menu.json';

    const fetchRes = await fetch(navMenu.menuPath);
    const menuText = await fetchRes.text();
    navMenu.menuJson = JSON.parse(menuText);
    // console.log('navMenu.menuJson', navMenu.menuJson);

    navMenu.hrefPage = navMenu.pathParts.join('/');
    // console.log('hrefPage=' + navMenu.hrefPage);

    if (navMenu.hrefPage.startsWith('/reference/device-os/libraries')) {
        const fetchRes = await fetch('/assets/files/libraryInfo.json');
        const libraryInfoText = await fetchRes.text();
        navMenu.libraryInfo = JSON.parse(libraryInfoText);

        // navMenu.libraryInfo
        // .letterNavigation - array
        //      .title (generally uppercase)
        //      .href
        //      .letter (may be 'other' or a lowercase letter)
        //      .letterLibraries - array of libraries for this letter

        // console.log('navMenu.libraryInfo', navMenu.libraryInfo);
    }

    const processArray = function(array) {
        for(const item of array) {
            if (Array.isArray(item)) {
                processArray(item);
            }
            else {
                if (item.href == navMenu.hrefPage) {
                    item.activeItem = true;
                }        
            }
        }
    }
    processArray(navMenu.menuJson.items)
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
    Docs.scrollToElement($('#' + href));
}

navMenu.generateNavHtml = function(menuJson) {
    // console.log('base=' + fileObj.path.base + ' topLevelName=' + topLevelName + ' sectionName=' + sectionName);

    const makeTitle = function (item) {
        let title = item.title || navMenu.titleize(item.dir);

        // title = title.replace('&', '&amp;');

        return title;
    };

    const makeNavMenu2 = function (item, indent) {
        const divElem = document.createElement('div');
        $(divElem).addClass('navContainer');
        if (item.addClass) {
            $(divElem).addClass(item.addClass);
        }
        if (!item.activeItem && item.internal) {
            $(divElem).addClass('internalMenuItem');
            if (typeof internalMenuItem == 'undefined') {
                $(divElem).css('display', 'none');            
            }
        }

        if (indent) {
            const innerDivElem = document.createElement('div');
            $(innerDivElem).css('width', (indent * 15) + 'px');            
            $(innerDivElem).html('&nbsp;');
            $(divElem).append(innerDivElem);
        }

        if (item.activeItem) {
            let innerDivElem = document.createElement('div');
            $(innerDivElem).addClass('navActive2');
            $(innerDivElem).text(makeTitle(item));
            $(divElem).append(innerDivElem);
            
            innerDivElem = document.createElement('div');
            $(innerDivElem).addClass('navPlusMinus');
            const iElem = document.createElement('i');
            $(iElem).addClass('minus');
            $(innerDivElem).append(iElem);
            $(divElem).append(innerDivElem);
        }
        else {
            let innerDivElem = document.createElement('div');
            $(innerDivElem).addClass('navMenu2');
            const aElem = document.createElement('a');
            $(aElem).on('click', function(ev) {
                ev.preventDefault();
                navMenu.openAnchor(item.href);
            });
            $(aElem).attr('href', item.href);
            $(aElem).addClass('navLink');
            $(aElem).text(makeTitle(item));
            $(innerDivElem).append(aElem);
            $(divElem).append(innerDivElem);
        }
        if (item.internal) {
            let imgElem = document.createElement('img');
            $(imgElem).attr('src', '/assets/images/logo.png');
            $(imgElem).attr('width', '16');
            $(imgElem).attr('height', '16');
            $(imgElem).attr('title', 'Only visible to internal users');
            $(divElem).append(imgElem);
        }

        return divElem;
    };

    const navElem = document.createElement('div');
    $(navElem).addClass('navMenuOuter');
    $(navElem).data('testing', 'testing replacement');

    let itemsFlat = [];
    let cardSections = [];
    let noSeparator = false;

    const processArray = function(array, indent) {
        let hasActiveItem = false;
        // console.log('processArray indent=' + indent, array);

        for (const item of array) {
            if (item.isSection) {
                // Multi-level section title
                const navContainerElem = document.createElement('div');
                $(navContainerElem).addClass('navContainer');
                if (item.addClass) {
                    $(navContainerElem).addClass(item.addClass);
                }

                if (indent) {
                    const innerDivElem = document.createElement('div');
                    $(innerDivElem).css('width', (indent * 15) + 'px');            
                    $(innerDivElem).html('&nbsp;');
                    $(navContainerElem).append(innerDivElem);
                }

                if (item.href) {
                    const innerDivElem = document.createElement('div');
                    $(innerDivElem).addClass('navMenu1');

                    const aElem = document.createElement('a');
                    $(aElem).on('click', function(ev) {
                        ev.preventDefault();
                        navMenu.openAnchor(item.href);
                    });
                    $(aElem).attr('href', item.href);
                    $(aElem).addClass('navLink');
                    $(aElem).text(makeTitle(item));
                    $(innerDivElem).append(aElem);
                    
                    $(navContainerElem).append(innerDivElem);
                }
                else {
                    const innerDivElem = document.createElement('div');
                    $(innerDivElem).addClass('navMenu1');
                    $(innerDivElem).text(makeTitle(item));
                    $(navContainerElem).append(innerDivElem);
                }
                $(navElem).append(navContainerElem);

                if (item.noSeparator) {
                    noSeparator = true;
                }
            }
            else if (Array.isArray(item)) {
                // Multi-level (like tutorials, reference, datasheets)
                processArray(item, indent + 1);

                if (noSeparator) {
                    noSeparator = false;
                }
                else {
                    const innerDivElem = document.createElement('div');
                    $(innerDivElem).addClass('navSectionSpacer');
                    $(navElem).append(innerDivElem);
                }
                
            }
            else         
            if (item.activeItem || !item.hidden) {
                $(navElem).append(makeNavMenu2(item, indent));
                itemsFlat.push(item);
            }

            if (item.activeItem) {
                hasActiveItem = true;

                let innerDivElem = document.createElement('div');
                $(innerDivElem).attr('id', 'navActiveContent');
                $(navElem).append(innerDivElem);        
            }

            if (item.isLibrarySearch && navMenu.libraryInfo) {
                // Insert letter navigation here
                for(const obj of navMenu.libraryInfo.letterNavigation) {
                    const navContainerElem = document.createElement('div');
                    $(navContainerElem).addClass('navContainer');
                    if (item.addClass) {
                        $(navContainerElem).addClass(item.addClass);
                    }
    
                    if (indent) {
                        const innerDivElem = document.createElement('div');
                        $(innerDivElem).css('width', (indent * 15) + 'px');            
                        $(innerDivElem).html('&nbsp;');
                        $(navContainerElem).append(innerDivElem);
                    }
    
                    const innerDivElem = document.createElement('div');
                    $(innerDivElem).addClass('navMenu1');

                    // -1 is empty, -2 = library name, -3 = letter
                    const isThisLetter = navMenu.pathParts[navMenu.pathParts.length - 3] == obj.letter;
                    
                    if (!isThisLetter) {
                        const aElem = document.createElement('a');
                        $(aElem).on('click', function(ev) {
                            ev.preventDefault();
                            navMenu.openAnchor(obj.href);
                        });
                        $(aElem).attr('href', obj.href);
                        $(aElem).addClass('navLink');
                        $(aElem).text(obj.title);
                        $(innerDivElem).append(aElem);    
                    }
                    else {
                        $(innerDivElem).text(obj.title);
                    }
                    
                    $(navContainerElem).append(innerDivElem);
                    $(navElem).append(navContainerElem);


                    if (isThisLetter) {
                        for(const libName of obj.libraries) {
                            let isActiveItem = false;
                                
                            const libUrlArray = navMenu.pathParts.slice(0, navMenu.pathParts.length - 2);
                            libUrlArray.push(libName);
                            libUrlArray.push('');
                            
                            
                            const navContainerElem = document.createElement('div');
                            $(navContainerElem).addClass('navContainer');
                            if (item.addClass) {
                                $(navContainerElem).addClass(item.addClass);
                            }
            
                            {
                                const innerDivElem = document.createElement('div');
                                $(innerDivElem).css('width', ((indent + 1) * 15) + 'px');            
                                $(innerDivElem).html('&nbsp;');
                                $(navContainerElem).append(innerDivElem);    
                            }
                            {
                                const innerDivElem = document.createElement('div');
                                $(innerDivElem).addClass('navMenu1');    


                                if (navMenu.pathParts[navMenu.pathParts.length - 2] == libName) {
                                    const currentTitleElem = document.createElement('div');
                                    $(currentTitleElem).addClass('navMenu1');
                                    $(currentTitleElem).text(libName);
                                    $(innerDivElem).append(currentTitleElem);                    
                                    isActiveItem = true;
                                }
                                else {
                                    const aElem = document.createElement('a');
                                    $(aElem).attr('href', libUrlArray.join('/'));
                                    $(aElem).addClass('navLink');
                                    $(aElem).text(libName);
                                    $(innerDivElem).append(aElem);        
                                }
                                $(navContainerElem).append(innerDivElem);            
                            }
        
                            $(navElem).append(navContainerElem);

                            if (isActiveItem) {
                                const innerDivElem = document.createElement('div');
                                $(innerDivElem).attr('id', 'navActiveContent');
                                $(innerDivElem).data('level', '4');                                
                                $(navElem).append(innerDivElem);                        
                            }

                            
                        
                        }
                    }
                }
            }

        }
        if (hasActiveItem && cardSections.length > 0) {
            cardSections[cardSections.length - 1].activeSection = true;
        }

    };
    processArray(menuJson.items, 0);


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


navMenu.ready = async function () {
    await navMenu.load();

    navMenu.scanHeaders();
    navMenu.scrollToActive();


};

$(document).ready(function () {
    navMenu.ready();
});

