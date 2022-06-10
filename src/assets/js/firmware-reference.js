$(document).ready(function() {
    let navigationInfo;

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
    const scrollableContent = $('div.content-inner');

    let apiIndex;

    const parsePath = function(pathname) {
        let result = {};

        const pathParts = pathname.split('/');
        // console.log('pathParts', pathParts);

        result.href = pathname;
        result.folder = pathParts[4];
        result.file = pathParts[5];

        return result;
    };

    const apiIndexFind = function(pathname) {
        const pathParts = parsePath(pathname);
        
        for(let index = 0; index < apiIndex.sections.length; index++) {
            const section = apiIndex.sections[index];
            if (section.folder == pathParts.folder && section.file == pathParts.file) {
                let obj = Object.assign({}, section);

                obj.index = index;
                if (index > 0) {
                    obj.prev = apiIndex.sections[index - 1].href;
                }
                if ((index + 1) < apiIndex.sections.length) {
                    obj.next = apiIndex.sections[index + 1].href;
                }

                return obj;
            }
        }
        return null;
    }

    const populateFolder = function(folder) {

        if (apiIndex.folders[folder].folderItems) {
            return;
        }

        let folderItems = [];
        let afterItem = apiIndex.folders[folder].elem;

        $(afterItem).find('i').removeClass('ion-arrow-right-b').addClass('ion-arrow-down-b');

        for(const section of apiIndex.sections) {
            if (section.folder == folder) {
                let divNavContainer = document.createElement('div');
                $(divNavContainer).addClass('navContainer');

                $(divNavContainer).addClass('navMenu4');
    
                let d = document.createElement('div');
                $(d).addClass('navIndent4');
                $(divNavContainer).append(d);
    
                d = document.createElement('div');
                $(d).addClass('navContent4');
                {
                    const aElem = document.createElement('a');
                    $(aElem).attr('href', section.href);
                    $(aElem).addClass('navLink');
                    $(aElem).text(section.title);
                    $(d).append(aElem);
                }
                $(divNavContainer).append(d);
                section.elem = divNavContainer;
    
                $(afterItem).after(divNavContainer);                
                folderItems.push(divNavContainer);
                afterItem = divNavContainer;
            }
        }
        apiIndex.folders[folder].folderItems = folderItems;
    }

    const syncNavigation = function() {
        // Synchronize the left navigation to the currently 

        let href;

        $('.referencePage').each(function() {
            const offset = $(this).offset();

            if (!href && offset.top > 0) {
                console.log('found elem offset.top=' + offset.top + ' href=' + href, this);
                href = $(this).attr('data-href');
            }
        });

        // console.log('visible first', $('.referencePage:visible:first'));
        // href = $('.referencePage:visible:first').attr('data-href');

        if (!href) {            
            return;
        }

        const pathParts = parsePath(href);
        const folder = pathParts.folder;
        populateFolder(folder);

        // Mark current page as active - TODO: This is not working all the time, need to investigate
        $('.navContainer').find('.navLinkActive').removeClass('navLinkActive');
        for(const section of apiIndex.sections) {
            if (section.href == href) {
                $(section.elem).find('a').addClass('navLinkActive');
                break;
            }
        }

        // Close other folders        
        for(const section of apiIndex.sections) {
            if (section.folder != folder && apiIndex.folders[section.folder].folderItems) {
                $(apiIndex.folders[section.folder].elem).find('i').removeClass('ion-arrow-down-b').addClass('ion-arrow-right-b');

                for(const elem of apiIndex.folders[section.folder].folderItems) {
                    $(elem).remove();
                }

                apiIndex.folders[section.folder].folderItems = null;
            }
        }



        /*
*/
        // a for current page gets .navLinkActive
        // Also the containing folder
        // Opened folders get i ion-arrow-down-b
        // Closed folders get i ion-arrow-right-b


    };




    // Save URL
    const thisUrl = new URL(location.href);
    $('.originalContent').addClass('referencePage');
    $('.originalContent').attr('data-href', thisUrl.pathname);

    let pageQueue = [];
    let pageLoading = false;


    const loadPage = function() {
        if (pageQueue.length == 0 || pageLoading) {
            return;
        }
        let options = pageQueue.splice(0, 1)[0];
        pageLoading = true;

        fetch(options.link)
            .then(response => response.text())
            .then(function(res) {
                pageLoading = false;

                // <!-- start 841427f3-9f46-4361-ab97-7afda1e082f9 -->
                // <!-- end 841427f3-9f46-4361-ab97-7afda1e082f9 -->
                let newContent = '';
                let inNewContent = false;

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

                }

                const nav = apiIndexFind(options.link);

                let divElem = document.createElement('div');
                $(divElem).addClass('referencePage');
                $(divElem).attr('data-href', options.link);
                $(divElem).append(newContent);

                if (!nav.startSection) {
                    // Remove the h2 when not at the start of a section
                    $(divElem).find('h2').remove();
                }


                let params = {};
                params.scrollTopBefore = Math.round($(scrollableContent).scrollTop());
                params.scrollHeightBefore = $(scrollableContent).prop('scrollHeight');


                if (options.toEnd) {
                    let doBefore = options.doBefore;

                    console.log('updating nextLink to ' + nav.next);
                    $(scrollableContent).data('nextLink', nav.next);

                    $('div.content').not('.note-common').last().append(divElem);

                    params.scrollHeightAfter = $(scrollableContent).prop('scrollHeight');
                    params.height = $(scrollableContent).height();

                    console.log('atEnd', params);

                    // Add more if necessary
                    if (params.scrollHeightAfter < params.height && nav.next) {
                        // Add more
                        console.log('load nextLink ' + nav.next, params);
                        options.link = nav.next;
                        pageQueue.push(options);
                        loadPage();
                        doBefore = false;
                    }                  
                
                    if (doBefore) {
                        console.log('loading doBefore link  ' + options.doBefore, params);
                        pageQueue.push({link: options.doBefore, toEnd: false});
                        loadPage();
                    }      
                }
                else {
                    // Insert before
                    console.log('updating prevLink to ' + nav.prev);
                    $(scrollableContent).data('prevLink', nav.prev);

                    $('div.content').not('.note-common').first().prepend(divElem);

                    params.divHeight = Math.floor($(divElem).height());
                    params.scrollTopAfter = params.scrollTopBefore + params.divHeight;

                    $(scrollableContent).scrollTop(params.scrollTopAfter);
                    console.log('insert before params', params);    
                }

                syncNavigation();

            })
            .catch(function(err) {
                console.log('err', err);
            });

    }
    const queuePage = function(options) {
        pageQueue.push(options);
        loadPage();
    }

    // Load the page index
    fetch('/assets/files/apiIndex.json')
    .then(response => response.json())
    .then(function(res) {
        apiIndex = res;
        console.log('apiIndex', apiIndex);

        const nav = apiIndexFind(thisUrl.pathname);
        console.log('nav', nav);

        // Build out the rest of the navigation menu. Insert all content after this:
        // div.navContainer .deviceOsApiNavMenu        
        // Insert div #navActiveContent containing the generated menus
        // Insert navContainers, one per item in the section
        // Most will contain a spacer div, and a navMenu2 

        const divActiveContent = document.createElement('div');
        $(divActiveContent).attr('id', 'activeContent');

        let lastFolder;

        apiIndex.folders = {};

        // Populate only the top level sections here because there are so many subsections
        for(let section of apiIndex.sections) {

            if (section.folder != lastFolder) {
                // New section
                let divNavContainer = document.createElement('div');
                $(divNavContainer).addClass('navContainer');
                $(divNavContainer).addClass('navMenu3');

                let d = document.createElement('div');
                $(d).addClass('navIndent3');
                $(divNavContainer).append(d);

                // TODO: Skip disclosure if only a single item
                d = document.createElement('div');
                $(d).addClass('navDisclosure');
                {
                    const iElem = document.createElement('i');
                    $(iElem).addClass('ion-arrow-right-b');
                    $(d).append(iElem);
                }
                $(divNavContainer).append(d);

                d = document.createElement('div');
                $(d).addClass('navContent3');
                {
                    const aElem = document.createElement('a');
                    $(aElem).text(apiIndex.folderTitles[section.folder]);
                    $(aElem).attr('href', section.href);
                    $(aElem).addClass('navLink');
                    $(d).append(aElem);
                }
                $(divNavContainer).append(d);

                apiIndex.folders[section.folder] = {
                    elem: divNavContainer
                };
                $(divActiveContent).append(divNavContainer);

                lastFolder = section.folder;
            }

        }

        $('.deviceOsApiNavMenu').after(divActiveContent);

        populateFolder(parsePath(thisUrl.pathname).folder);

        if (nav.next) {
            queuePage({link: nav.next, toEnd:true, doBefore:nav.prev});
        }
        else if (nav.prev) {
            queuePage({link: nav.prev, toEnd:true});
        }    
    });
    

    $(scrollableContent).on('scroll', function(e) {
        // console.log('scrolled ', e);
        // e.originalEvent
        let params = {};

        params.scrollTop = Math.round($(scrollableContent).scrollTop());
        params.scrollHeight = $(scrollableContent).prop('scrollHeight');
        params.height = $(scrollableContent).height();
        
        params.atTop = (params.scrollTop == 0);
        params.atBottom = (params.scrollTop >= (params.scrollHeight - params.height));

        // $(scrollableContent).height() is the height of the view

        syncNavigation();

        // console.log('params', params);

        if (params.atTop) {
            const prevLink = $(scrollableContent).data('prevLink');
            if (prevLink) {
                console.log('adding page above from scrolling ' + prevLink, params);
                queuePage({link: prevLink, toEnd:false});
            }
        }
        if (params.atBottom) {
            const nextLink = $(scrollableContent).data('nextLink');
            if (nextLink) {
                console.log('adding page below from scrolling ' + nextLink, params);
                queuePage({link: nextLink, toEnd:true});
            }
        }
    });


});

