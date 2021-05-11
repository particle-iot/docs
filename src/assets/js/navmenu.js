// Navigation Menu
let navMenu = {};

navMenu.scanHeaders = function () {
    navMenu.headers = [];

    const contentInner = $('div.content-inner');

    $(contentInner).find('h2,h3,h4').each(function (index, elem) {
        // console.log('elem', elem);
        const id = $(elem).prop('id');
        if (id) {
            const level = parseInt($(elem).prop('tagName').substr(1));
            navMenu.headers.push({ elem, id, level });
        }
    });

    console.log('headers', navMenu.headers);

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
