
$(document).ready(function() {
    const navigate = function(next, group) {
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


        if (!group) {
            if (next) {
                if (middleIndex < (middleLevel.length - 1)) {
                    location.href = $(middleLevel[middleIndex + 1]).find('a').attr('href');
                }
                else {
                    group = true;
                }
            }
            else {
                if (middleIndex > 0) {
                    location.href = $(middleLevel[middleIndex - 1]).find('a').attr('href');
                }
                else {
                    group = true;
                }    
            }
        }

        if (group) {
            if (next) {
                if (topIndex < (topLevel.length - 1)) {
                    location.href = $(topLevel[topIndex + 1]).find('a').attr('href')
                }
            }
            else {
                if (topIndex > 0) {
                    location.href = $(topLevel[topIndex - 1]).find('a').attr('href')
                }    
            }
        }
    };


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
                navigate(false, false);
            }
            else
            if (startX > (screen.width - 150)) {
                navigate(true, false);
            }
        }

        if (Math.abs(deltaX) > 150 && Math.abs(deltaY) < 150 && deltaTime < 400) {
            // Swipe
            if (deltaX < 0) {
                // Right (next)
                navigate(true, false);
            }  
            else {
                // Left (previous)
                navigate(false, false);
            }
        }    
a    });    

    
    $('body').on('keydown', function(ev) {
        if (ev.shiftKey) {
            switch(ev.key) {
                case 'ArrowLeft':
                    navigate(false, false);
                    break;

                case 'ArrowRight':
                    navigate(true, false);
                    break;

                case 'ArrowUp':
                    navigate(false, true);
                    break;

                case 'ArrowDown':
                    navigate(true, true);
                    break;
            }

        }
    });

});
