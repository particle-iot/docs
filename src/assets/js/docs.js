/* eslint-env browser */
/* global jQuery, Handlebars, prettyPrint */
/*!

Documentation middleware.
Created by Zach Supalla.
(c) 2016 Particle Industries, Inc. MIT licensed.

*/

$(document).ready(function () {

    /**
     * Basic Docs module.
     */

    var Docs = {};

    Docs.transform = function () {
        this.tagImages();
        this.prettifyCode();
    };

    /**
     * Tags paragraphs that include images.
     */

    Docs.tagImages = function () {
        $('.content').find('p:has(img)').each(function () {
            var $el = $(this);
            $el.addClass('img');
        });
    };

    /**
     * Make code prettier
     */

    Docs.prettifyCode = function () {
        $('.content').find('pre code').each(function () {
            if ($(this).hasClass('lang-event-viewer')) {
                $(this).addClass('event-viewer');
            }
            else
                if ($(this).hasClass('lang-mermaid')) {
                    $(this).addClass('mermaid');
                }
                else
                    if (!$(this).hasClass('lang-none')) {
                        $(this).addClass('prettyprint');
                    }
        });
    };


    Docs.rememberDevices = function () {
        if (typeof Storage !== 'undefined') {
            var currentPath = window.location.pathname;
            if (currentPath.indexOf('photon') > -1) {
                localStorage.setItem('lastDevice', 'photon');
            } else if (currentPath.indexOf('core') > -1) {
                localStorage.setItem('lastDevice', 'core');
            } else if (currentPath.indexOf('electron') > -1) {
                localStorage.setItem('lastDevice', 'electron');
            } else if (currentPath.indexOf('argon') > -1) {
                localStorage.setItem('lastDevice', 'argon');
            } else if (currentPath.indexOf('boron') > -1) {
                localStorage.setItem('lastDevice', 'boron');
            } else if (currentPath.indexOf('xenon') > -1) {
                localStorage.setItem('lastDevice', 'xenon');
            } else if (currentPath.indexOf('tracker-som') > -1) {
                localStorage.setItem('lastDevice', 'tracker-som');
            }
        }
    };

    Docs.scrollToElement = function (element) {
        let topOffset = 10;

        // Make selection visible
        let tempElem = $(element);
        for (let tries = 0; tries < 20; tries++) {
            if ($(tempElem).hasClass('content')) {
                break;
            }

            if ($(tempElem).hasClass('collapseIndent')) {
                if (!$(tempElem).is(':visible')) {
                    $(tempElem).show();
                    break;
                }
                else {
                }
            }
            tempElem = $(tempElem).parent();
        }

        const containerElem = $('.document-search-container');
        if (containerElem.length) {
            if ($(containerElem).is(':visible')) {
                topOffset -= $(containerElem).height();
            }
        }

        var $element = $(element);
        if ($element.length === 1) {
            var position = $element.position().top + topOffset;
            $('.content-inner').scrollTop(position);
        }
    };

    Docs.scrollToInternalLinks = function () {
        var $internalLinks = $('.menubar a[href^="#"], a.header-permalinks');
        $internalLinks.on('click', function () {
            var href = $(this).attr('href');
            if (window.history) {
                history.pushState({ hash: href }, 'New Hash', href);
            }
        });

        window.onpopstate = function (e) {
            if (e.state && e.state.hash) {
                Docs.scrollToElement(e.state.hash);
            }
        };
    };


    Docs._removeEmptyTokens = function removeEmptyTokens(token) {
        if (token.length > 0) {
            return token;
        };
    };

    Docs.resultsAdded = 0;

    Docs.buildSearch = function () {

        $('body').on('click', function () {
            $('.search-results').hide();
        });
        $('.search-results').on('click', function (e) {
            e.stopPropagation();
        });
    };
    Docs.emptyResults = function () {
        $('.search-results ul.results').empty();
        Docs.resultsAdded = 0;
    };

    Docs.titleize = function (string) {
        var stringNoDashes = string.replace(/-/g, ' ');
        var stringToTitleCase = stringNoDashes.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        return stringToTitleCase;
    };

    Docs.toggleShowing = function () {
        $('span.popupLink, span.footnoteLink').on('click', function () {
            $(this).toggleClass('showing');
        });
    };

    Docs.toggleNav = function () {
        var $root = $(".content-root");
        $('.toggle-navigation').on('click', function (e) {
            e.preventDefault();
            toggleNav();
            updateBackdrop();
        });

        $root.on('click', '.menubar-backdrop', function (e) {
            e.preventDefault();
            closeNav();
            updateBackdrop();
        });

        function toggleNav() {
            $root.toggleClass('menubar-show');
        }

        function closeNav() {
            $root.removeClass('menubar-show');
        }

        function updateBackdrop() {
            if ($root.hasClass('menubar-show')) {
                $root.prepend('<div class="menubar-backdrop"></div>');
            } else {
                $('.menubar-backdrop').remove();
            }
        }
    };

    Docs.applyColorTheme = function(which) {
        $('html').attr('data-theme', which);

        $('img[data-dark-src]').each(function() {
            const src = $(this).data(which + '-src');
            if (src) {
                $(this).prop('src', src);
            }
        });

        switch(which) {
            default:
            case 'dark':
                $('img:not(.no-darken)').prop('filter', 'brightness(0.8) contrast(1.2);');
                break;

            case 'light':
                $('img.no-darken').prop('filter', 'brightness(1) contrast(1);');
                break;
        }
    }

    const storage = localStorage.getItem('docsGeneral');
    if (storage) {
        try {
            Docs.settings = JSON.parse(storage);
        }
        catch(e) {            
        }
    }
    if (!Docs.settings) {
        Docs.settings = {};
    }
    if (!Docs.settings.colorTheme) {
        Docs.settings.colorTheme = 'dark';
    }

    Docs.saveSettings = function() {
        localStorage.setItem('docsGeneral', JSON.stringify(Docs.settings));
    }

    Docs.updateColorTheme = function(options = {}) {        
        $('input[name="theme-menu-radio"]').prop('checked', false);
        $('input[name="theme-menu-radio"][data-theme="' + options.colorTheme + '"]').prop('checked', true);
        
        switch(options.colorTheme) {
            default:
            case 'dark':
                Docs.settings.colorTheme = 'dark';
                Docs.applyColorTheme(options.colorTheme);
                break;
    
            case 'light':
                Docs.settings.colorTheme = options.colorTheme;
                Docs.applyColorTheme(options.colorTheme);
                break;
    
            case 'auto':
                Docs.settings.colorTheme = options.colorTheme;
                const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
                if (prefersDarkScheme.matches) {
                    Docs.applyColorTheme('dark');
                }
                else {
                    Docs.applyColorTheme('light');
                }        
                break;
        }

        if (options.save) {
            Docs.saveSettings();
        }        
    }
    Docs.updateColorTheme({colorTheme: Docs.settings.colorTheme, save: false});


    $('#userMenuChangeTheme > a').on('click', function() {
        if ($('.theme-menu-sub').first().is(':visible')) {
            $('.changeThemeExpand').show();
            $('.changeThemeCollapse').hide();
            $('.theme-menu-sub').hide();
            $('.changeThemeIcon').show();
            $('.changeThemeOpenIcon').hide();
        }
        else {
            $('.changeThemeExpand').hide();
            $('.changeThemeCollapse').show();
            $('.theme-menu-sub').show();
            $('.changeThemeIcon').hide();
            $('.changeThemeOpenIcon').show();
        }
    });


    $('input[name="theme-menu-radio"]').on('click', function() {
        const colorTheme = $(this).data('theme');
        Docs.updateColorTheme({colorTheme, save: true});
    });


    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            if (Docs.settings.colorTheme == 'auto') {
                Docs.applyColorTheme('dark');
            }
        }
    });

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
        if (event.matches) {
            if ( Docs.settings.colorTheme == 'auto') {
                Docs.applyColorTheme('light');
            }
        }
    });



    const windowResizeHandler = function () {

        if (window.innerWidth < 1290) {
            $('.sections').css('display', 'none');
            $('.narrow-top-nav').css('display', 'inline-block');
        }
        else {
            $('.sections').css('display', 'block');
            $('.narrow-top-nav').css('display', 'none');
        }


        // left includes the logo and top nav bar    
        const leftRect = $('.left')[0].getBoundingClientRect();

        // right includes search and user bar
        // const rightRect = $('.right')[0].getBoundingClientRect();

        // const sectionsRect = $('.sections')[0].getBoundingClientRect();

        // Returned rects are x, y, width, height, top, button (DOMRect)

        // console.log('leftRect.width=' + leftRect.width + ' rightRect.x=' + rightRect.x + ' rightRect.x-margin=' + (rightRect.x - 270));

        if ($('.menubar').length == 0) {
            // On pages without a left nav, hide the hamburger icon
            $('.toggle-nav').hide();
        }


        // narrow-top-nav
        // none or inline-block

        // sections: none or display: block;

        // search or searchIcon: none or inline-block    
    };
    window.addEventListener('resize', windowResizeHandler);
    windowResizeHandler();


    // Ok, then let's do it!
    Docs.rememberDevices();
    Docs.transform();
    Docs.scrollToInternalLinks();
    Docs.buildSearch();
    Docs.toggleNav();
    Docs.toggleShowing();
    //Docs.enableZendeskWidget();
    if (prettyPrint) {
        prettyPrint();
    }

    if (window.location.hash && !window.location.hash.startsWith("#search=1&")) {
        Docs.scrollToElement(window.location.hash);
    }

    /*
    setTimeout(function () {
        let status = 'unsupported';

        if (window.matchMedia) {
            // Check if the dark-mode Media-Query matches
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                status = 'dark';
            }
            else {
                status = 'light';
            }
        }
        analytics.track('colorMode', { category: 'env30s', label: status });
    }, 30000);
    */
});
