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
    
    // Save URL
    const thisUrl = new URL(location.href);
    $('.originalContent').attr('data-href', thisUrl.pathname);

    const loadPage = function(link, toEnd) {
        // Load previous page
        fetch(link)
            .then(response => response.text())
            .then(function(res) {
                // <!-- start 841427f3-9f46-4361-ab97-7afda1e082f9 -->
                // <!-- end 841427f3-9f46-4361-ab97-7afda1e082f9 -->
                let newContent = '';
                let inNewContent = false;
                let navigationInfo = '';
                const navigationInfoString = 'navigationInfo=';

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

                    // navigationInfo={"prevLink":"/reference/device-os/api/softap-http-pages/the-default-page/","nextLink":"/reference/device-os/api/softap-http-pages/complete-example/","prevGroup":"/reference/device-os/api/wifi/wifi/","nextGroup":"/reference/device-os/api/cellular/cellular/"}
                    const navigationInfoOffset = line.indexOf(navigationInfoString);
                    if (navigationInfoOffset >= 0) {
                        const startOffset = navigationInfoOffset + navigationInfoString.length;
                        const endOffset = line.indexOf('</script');
                        navigationInfo = JSON.parse(line.substring(startOffset, endOffset));
                    }
                }

                // console.log('prevLink', newContent);
                let divElem = document.createElement('div');
                $(divElem).attr('data-href', link);
                $(divElem).append(newContent);

                if (toEnd) {
                    if (navigationInfo.nextLink) {
                        $(divElem).attr('data-nextLink', navigationInfo.nextLink);                    
                    }
                    $('.content').append(divElem);
                }
                else {
                    if (navigationInfo.prevLink) {
                        $(divElem).attr('data-prevLink', navigationInfo.prevLink);                    
                    }
                    $('.content').prepend(divElem);
                }
            })
            .catch(function(err) {
                console.log('err', err);
            });

    }

    if (navigationInfo.prevLink) {
        loadPage(navigationInfo.prevLink, false);
    }
    if (navigationInfo.nextLink) {
        loadPage(navigationInfo.nextLink, true);
    }

    const scrollableContent = $('div.content-inner');
    $(scrollableContent).on('scroll', function(e) {
        // console.log('scrolled ', e);
        // e.originalEvent
        let params = {};

        params.scrollTop = $(scrollableContent).scrollTop();
        params.scrollHeight = $(scrollableContent).prop('scrollHeight');
        params.height = $(scrollableContent).height();
        
        params.atTop = (params.scrollTop == 0);
        params.atBottom = (params.scrollTop == (params.scrollHeight - params.height));

        // $(scrollableContent).height() is the height of the view

        console.log('params', params);

    });


});

