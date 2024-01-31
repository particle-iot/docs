$(document).ready(function() {
    let navigationInfo;

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

    const closeFolder = function(folder) {
        for(const section of apiIndex.sections) {
            if (section.folder == folder && apiIndex.folders[section.folder].folderItems) {
                $(apiIndex.folders[section.folder].elem).find('i').removeClass('ion-arrow-down-b').addClass('ion-arrow-right-b');

                for(const elem of apiIndex.folders[section.folder].folderItems) {
                    $(elem).remove();
                }

                apiIndex.folders[section.folder].folderItems = null;
            }
        }
    }

    const syncNavigation = function(linkOptional) {
        // Synchronize the left navigation to the currently 

        let href;

        let pageOffsets = [];
        $('.referencePage').each(function() {
            const offset = $(this).offset();
            pageOffsets.push({
                top: offset.top,
                href: $(this).attr('data-href')
            })
        });

        if (linkOptional) {
            href = linkOptional;
        }
        else {
            // If the 0 <= offset.top <= 10 then the referencePage is at the top of the screen and is definitely the
            // one to display.
            // However, if there isn't one in that range, then look up (negative offset) to find the closest href,
            // because it's been scrolled up.
            for(let ii = pageOffsets.length - 1; ii >= 0; ii--) {
                if (pageOffsets[ii].top < 10) {
                    href = pageOffsets[ii].href;
                    break;
                }
            }
        }

        if (!href) {            
            return;
        }

        /*
        if (linkOptional) {
            console.log('syncNavigation to link ' + href);
        }
        else {
            console.log('syncNavigation from position ' + href);
        }
        */

        const pathParts = parsePath(href);
        const folder = pathParts.folder;
        populateFolder(folder);

        // Mark current page as active
        $('.navContainer').find('.navLinkActive').removeClass('navLinkActive');
        for(let ii = 0; ii < apiIndex.sections.length; ii++) {
            let section = apiIndex.sections[ii];
            if (section.href == href) {
                $(section.elem).find('a').addClass('navLinkActive');


                // Add items for this page
                if (!section.fileItems) {
                    let fileItems = [];

                    let afterItem = section.elem;

                    $(section.contentElem).find('h4').each(function() {
                        const h4Elem = this;
                        let aElem;

                        let divNavContainer = document.createElement('div');
                        $(divNavContainer).addClass('navContainer');
                        $(divNavContainer).addClass('navMenu5');
        
                        let d = document.createElement('div');
                        $(d).addClass('navIndent5');
                        $(divNavContainer).append(d);
                
                        d = document.createElement('div');
                        $(d).addClass('navContent5');
                        {
                            aElem = document.createElement('a');
                            $(aElem).text($(h4Elem).text());
                            $(aElem).attr('href', '#' + $(h4Elem).attr('id'));
                            $(aElem).addClass('navLink');
                            $(d).append(aElem);
                        }
                        $(divNavContainer).append(d);              
                        $(afterItem).after(divNavContainer);
                        afterItem = divNavContainer;
                        
                        fileItems.push({
                            elem: divNavContainer,
                            aElem,
                            h4Elem
                        });
                    });
                    window.history.replaceState(null, null, section.href);
    
                    // Update page/group navigation
                    navigationInfo = {};
                    if (ii > 0) {
                        navigationInfo.prevLink = apiIndex.sections[ii - 1].href;
                    }
                    if ((ii + 1) < apiIndex.sections.length) {
                        navigationInfo.nextLink = apiIndex.sections[ii + 1].href;
                    }
                    for(let jj = ii - 1; jj >= 0; jj--) {
                        if (apiIndex.sections[jj].folder != section.folder) {
                            navigationInfo.prevGroup = apiIndex.sections[jj].href;
                            break;
                        }
                    }
                    for(let jj = ii + 1; jj < apiIndex.sections.length; jj++) {
                        if (apiIndex.sections[jj].folder != section.folder) {
                            navigationInfo.nextGroup = apiIndex.sections[jj].href;
                            break;
                        }
                    }

                    section.fileItems = fileItems;    
                }

                // Add a navLinkActive to the current fileItem
                let sectionOffsets = [];
                for(const item of section.fileItems) {
                    const offset = $(item.h4Elem).offset();
                    sectionOffsets.push({
                        top: offset.top,
                        aElem: item.aElem,
                        id: $(item.h4Elem).prop('id')
                    });                    
                }
                // console.log('sectionOffsets', sectionOffsets);

                for(let ii = 0; ii < sectionOffsets.length; ii++) {
                    if (sectionOffsets[ii].top > 0) {
                        $(sectionOffsets[ii].aElem).addClass('navLinkActive');
                        const url = section.href + '#' + sectionOffsets[ii].id;
                        window.history.replaceState(null, null, url);
                        break;
                    }
                }
    
            }
            else
            if (section.fileItems) {
                // Remove the items for this page
                for(const item of section.fileItems) {
                    $(item.elem).remove();
                }

                section.fileItems = null;
            }
        }

        // Close other folders        
        for(const section of apiIndex.sections) {
            if (section.folder != folder) {
                closeFolder(section.folder);
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
    let ignoreScroll;


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
                    $(scrollableContent).data('nextLink', nav.next);

                    $('div.content').not('.note-common').last().append(divElem);

                    if (pageQueue.length) {
                        loadPage();
                    }           
                }
                else {
                    // Insert before
                    console.log('has has insertBefore');
                    $(scrollableContent).data('prevLink', nav.prev);

                    $('div.content').not('.note-common').first().prepend(divElem);

                    params.divHeight = Math.floor($(divElem).height());
                    params.scrollTopAfter = params.scrollTopBefore + params.divHeight;

                    $(scrollableContent).scrollTop(params.scrollTopAfter);
                }

                apiIndex.sections[nav.index].contentElem = divElem;

                ignoreScroll = Date.now() + 1000;

                if (options.scrollIntoView) {
                    $(divElem)[0].scrollIntoView({block: "start", behavior: "smooth"}); // align to top 
                }

                if (options.syncNavigation) {
                    syncNavigation(options.link);
                }

            })
            .catch(function(err) {
                console.log('err', err);
            });

    }
    const queuePage = function(options) {
        pageQueue.push(options);
        loadPage();
    }

    const preloadPages = function(pathname) {
        const pathParts = parsePath(pathname);
        
        for(let index = 0; index < apiIndex.sections.length; index++) {
            const section = apiIndex.sections[index];
            if (section.folder == pathParts.folder && section.file == pathParts.file) {
                for(let ii = 1; ii <= 3 && (index + ii) < apiIndex.sections.length; ii++) {
                    queuePage({link: apiIndex.sections[index + ii].href, toEnd:true});
                }                
                break;
            }
        }
    }

    // Load the page index
    fetch('/assets/files/apiIndex.json')
    .then(response => response.json())
    .then(function(res) {
        apiIndex = res;

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
        let topLevelSections = [];
        for(let section of apiIndex.sections) {
            if (section.folder != lastFolder) {
                // New section
                topLevelSections.push({
                    folder: section.folder,
                    sections: [section],
                });
                lastFolder = section.folder;
            }
            else {
                topLevelSections[topLevelSections.length - 1].sections.push(section);
            }
        }

        topLevelSections.sort(function(a, b) {
            if (a.folder == 'introduction') {
                return -1;
            }
            else
            if (b.folder == 'introduction') {
                return +1;
            }
            else {
                return a.folder.localeCompare(b.folder);
            }
        });

        // Re-sort apiIndex.sections so scrolling, forward, backward, next group, etc. work right
        apiIndex.sections = [];
        for(let obj of topLevelSections) {
            for(let section of obj.sections) {
                apiIndex.sections.push(section);
            }
        }
        const nav = apiIndexFind(thisUrl.pathname);


        for(const obj of topLevelSections) {
            let section = obj.sections[0];
            // New section
            let divNavContainer = document.createElement('div');
            $(divNavContainer).addClass('navContainer');
            $(divNavContainer).addClass('navMenu3');

            let d = document.createElement('div');
            $(d).addClass('navIndent3');
            $(divNavContainer).append(d);

            // TODO: Skip disclosure if only a single item
            d = document.createElement('div');
            $(d).attr('data-folder', section.folder);
            $(d).addClass('navDisclosure');
            {
                const iElem = document.createElement('i');
                $(iElem).addClass('ion-arrow-right-b');
                $(d).append(iElem);
            }
            $(d).on('click', function() {
                const folder = $(this).attr('data-folder');
                if ($(this).find('i').hasClass('ion-arrow-right-b')) {
                    populateFolder(folder);
                }
                else {
                    console.log('close folder from click');
                    closeFolder(folder);
                }  
            });
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


        }

        $('.deviceOsApiNavMenu').after(divActiveContent);

        apiIndex.sections[nav.index].contentElem = $('.originalContent');

        navMenu.searchContent();

        populateFolder(parsePath(thisUrl.pathname).folder);

        syncNavigation(thisUrl.pathname);

        preloadPages(thisUrl.pathname);
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

        // console.log('params', params);
        if (!ignoreScroll || Date.now() > ignoreScroll) {
            ignoreScroll = null;
            syncNavigation();
        }
        else {
        }

        if (params.atTop) {
            const prevLink = $(scrollableContent).data('prevLink');
            if (prevLink) {
                queuePage({link: prevLink, toEnd:false});
            }
        }
        if (params.atBottom) {
            const nextLink = $(scrollableContent).data('nextLink');
            if (nextLink) {
                queuePage({link: nextLink, toEnd:true});
            }
        }
    });



    const navigate = function(next, group) {
        if (!navigationInfo) {
            return;
        }

        if (!group) {
            if (next) {
                if (navigationInfo.nextLink) {
                    queuePage({link: navigationInfo.nextLink, toEnd:true, scrollIntoView:true, syncNavigation:true});
                }
            }
            else {
                if (navigationInfo.prevLink) {
                    queuePage({link: navigationInfo.prevLink, toEnd:false, scrollIntoView:true, syncNavigation:true});
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

