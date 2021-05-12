// Navigation Menu
let navMenu = {};

navMenu.scanHeaders = function () {
    navMenu.headers = [];

    const contentInner = $('div.content-inner');

    navMenu.useDisclosureTriangle = false;

    let lastL2;

    $(contentInner).find('h2,h3').each(function (index, elem) {
        // console.log('elem', elem);
        const id = $(elem).prop('id');
        if (id) {
            const level = parseInt($(elem).prop('tagName').substr(1));
            let obj = { elem, id, level };
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

    // Build TOC HTML
    lastL2 = null;

    for(let hdr of navMenu.headers) {
        if (hdr.level == 2) {
            let e1, e2, e3, e4;

            e1 = document.createElement('div');
            $(e1).addClass('navMenu3 navContainer');
            $(e1).addClass('navL2' + hdr.id);

            e2 = document.createElement('div');
            $(e2).addClass('navIndent3');
            $(e1).append(e2);

            if (hdr.hasDisclosureTriangle) {
                e2 = document.createElement('div');
                $(e2).addClass('navDisclosure');
                
                const iconElem = document.createElement('i');
                $(iconElem).addClass('ion-arrow-right-b');
                $(e2).append(iconElem);

                $(e2).on('click', function() {
                    if ($(iconElem).hasClass('ion-arrow-right-b')) {
                        // Was right, make down
                        $(iconElem).removeClass('ion-arrow-right-b');
                        $(iconElem).addClass('ion-arrow-down-b');
                        $('.navL3' + hdr.id).show();
                    }
                    else {
                        // Has down, make right
                        $(iconElem).removeClass('ion-arrow-down-b');
                        $(iconElem).addClass('ion-arrow-right-b');                        
                        $('.navL3' + hdr.id).hide();
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
            hdr.tocElem = e1;

            lastL2 = hdr;
        }
        else
        if (hdr.level == 3 && lastL2) {
            let e1, e2, e3;

            e1 = document.createElement('div');
            $(e1).addClass('navMenu4 navContainer');
            $(e1).addClass('navL3' + lastL2.id);

            e2 = document.createElement('div');
            $(e2).addClass('navIndent4')
            $(e1).append(e2);

            e2 = document.createElement('div');
            $(e2).addClass('navContent4');

            e3 = document.createElement('a');
            $(e3).addClass('navLink')
            $(e3).prop('href', '#' + hdr.id);
            $(e3).text($(hdr.elem).text());
            $(e2).append(e3);
            $(e1).append(e2);
            
            $('#navActiveContent').append(e1);
            $(e1).hide();
            hdr.tocElem = e1;
        }

    }
};

navMenu.updateTOC = function() {
    console.log('updateTOC', navMenu.headers[navMenu.currentHeader]);
    
    let hierarchy = [];
    hierarchy.push(navMenu.headers[navMenu.currentHeader]);
    for(let ii = navMenu.currentHeader - 1; ii >= 0; ii--) {
        if (navMenu.headers[ii].level < hierarchy[0].level) {
            hierarchy.splice(0, 0, navMenu.headers[ii]);
        }
        if (hierarchy[0].level == 2) {
            break;
        }
    }

    console.log('hierarchy ', hierarchy);

    // Change active links back to plain
    $('.navLinkActive').removeClass('navLinkActive').addClass('navLink');

    // Collapse all sections
    $('#navActiveContent i').removeClass('navActive').removeClass('ion-arrow-down-b').addClass('ion-arrow-right-b');
    $('.navMenu4').hide();

    // Expand the current section
    $('.navL2' + hierarchy[0].id + ' i').removeClass('ion-arrow-right-b').addClass('ion-arrow-down-b');
    $('.navL3' + hierarchy[0].id).show();

    for(let ii = 0; ii < hierarchy.length; ii++) {
        if (hierarchy[ii].tocElem) {
            $(hierarchy[ii].tocElem).find('a').removeClass('navLink').addClass('navLinkActive');
        }
    } 
};

navMenu.ready = function () {
    navMenu.scanHeaders();
};

$(document).ready(function () {
    navMenu.ready();
});



/*
    var content = $('.content-inner');
    var headers = content.find('h2, h3');

    if (headers.length === 0) {
      return;
    }

    var twoLevelTOC = content.find('h2').length > 0;
    var currentHeader = -1;

    // When scrolling, find the closest header and synchronize which TOC
    // entry is active
    content.on('scroll', function() {
      var scrollPosition = content.scrollTop();
      var done = false;

      var oldHeader = currentHeader;
      while (!done) {
        if (currentHeader < headers.length - 2 &&
           scrollPosition >= Math.floor($(headers[currentHeader + 1]).position().top)) {
          currentHeader += 1;
        } else if (currentHeader > 0 &&
                  scrollPosition < Math.floor($(headers[currentHeader]).position().top)) {
          currentHeader -= 1;
        } else {
          done = true;
        }
      }

      if (oldHeader !== currentHeader) {
        navMenu.showTOC($(headers[currentHeader]));
        Docs.updateTOC($(headers[currentHeader]), twoLevelTOC);
      }
    });
    */
