// Navigation Menu
let navMenu = {};

navMenu.scanHeaders = function () {
    const thisUrl = new URL(location.href);
    if (thisUrl.pathname.startsWith('/reference/device-os/api')) {
        return;
    }

    navMenu.headers = [];

    const contentInner = $('div.content-inner');

    navMenu.useDisclosureTriangle = false;

    let headerLevels = 'h2,h3,h4';
    let levelAdjust = 0;

    // TODO: Remove this block, no longer used 
    /*
    if (location.href.includes('reference/device-os/api')) {
        headerLevels = 'h4,h5';
        levelAdjust = -2;
    }
    */

    let lastL2;

    $(contentInner).find(headerLevels).each(function (index, elem) {
        // console.log('elem', elem);
        const id = $(elem).prop('id');
        if (id) {
            const level = parseInt($(elem).prop('tagName').substr(1)) + levelAdjust;
            let obj = { 
                elem, 
                id, 
                level 
            };
            navMenu.headers.push(obj);

            if (level == 2) {
                lastL2 = obj;
            }

            if (level > 2) {
                if (lastL2) {
                    navMenu.useDisclosureTriangle = true;
                    lastL2.hasDisclosureTriangle = true;
                }
            }
        }
    });

    // console.log('headers', navMenu.headers);

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
        $(e3).prop('href', '#' + hdr.id);
        $(e3).text($(hdr.elem).text());
        $(e2).append(e3);
        $(e1).append(e2);

        $('#navActiveContent').append(e1);
        hasActiveContent = true;

        $(e1).hide();
        hdr.tocElem = e1;

        return e1;
    }

    for (let hdr of navMenu.headers) {
        if (hdr.level == 2) {
            let e1, e2, e3, e4;

            e1 = document.createElement('div');
            $(e1).addClass('navMenu3 navContainer');

            e2 = document.createElement('div');
            $(e2).addClass('navIndent3');
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
            $(e3).prop('href', '#' + hdr.id);
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


navMenu.ready = function () {
    navMenu.scanHeaders();
    navMenu.scrollToActive();


};

$(document).ready(function () {
    navMenu.ready();
});

