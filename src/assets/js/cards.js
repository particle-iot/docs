
$(document).ready(function() {

    $('body').on('keydown', function(ev) {
        if (ev.shiftKey) {
            if (!ev.key.startsWith('Arrow')) {
                return;
            }

            const guideMenu = $('ul.guide-menu');
             
            const topLevel = $(guideMenu).find('li.top-level');

            let topIndex = -1;
            for(let ii = 0; ii < topLevel.length; ii++) {
                if ($($(topLevel)[ii]).hasClass('active')) {
                    topIndex = ii;
                    break;
                }
            }
            if (topIndex < 0) {
                return;
            }

            const middleLevel = $(guideMenu).find('li.middle-level');

            let middleIndex = -1;
            for(let ii = 0; ii < middleLevel.length; ii++) {
                if ($($(middleLevel)[ii]).hasClass('active')) {
                    middleIndex = ii;
                    break;
                }
            }
            if (middleIndex < 0) {
                return;
            }

            let nextGroup = false;
            let prevGroup = false;

            if (ev.key === 'ArrowLeft') {
                prevGroup = true;
            }
            else
            if (ev.key == 'ArrowRight') {
                nextGroup = true;
            }
            else
            if (ev.key === 'ArrowUp') {
                if (middleIndex > 0) {
                    location.href = $(middleLevel[middleIndex - 1]).find('a').attr('href');
                }
                else {
                    prevGroup = true;
                }
            }
            else
            if (ev.key === 'ArrowDown') {
                if (middleIndex < (middleLevel.length - 1)) {
                    location.href = $(middleLevel[middleIndex + 1]).find('a').attr('href');
                }
                else {
                    nextGroup = true;
                }
                
            }

            if (prevGroup) {
                if (topIndex > 0) {
                    location.href = $(topLevel[topIndex - 1]).find('a').attr('href')
                }
            }
            else
            if (nextGroup) {
                if (topIndex < (topLevel.length - 1)) {
                    location.href = $(topLevel[topIndex + 1]).find('a').attr('href')
                }
            }
        }
    });

});
