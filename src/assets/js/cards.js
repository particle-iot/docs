
$(document).ready(function() {
    
    const navigate = function(next, group) {

        if (!navigationInfo) {
            return;
        }

        if (!group) {
            if (next) {
                if (navigationInfo.nextLink) {
                    location.href = navigationInfo.nextLink;
                }
            }
            else {
                if (navigationInfo.prevLink) {
                    location.href = navigationInfo.prevLink;
                }
            }
        }

        if (group) {
            if (next) {
                if (navigationInfo.nextGroup) {
                    location.href = navigationInfo.nextGroup;
                }
            }
            else {
                if (navigationInfo.prevGroup) {
                    location.href = navigationInfo.prevGroup;
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
    });    

    
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
