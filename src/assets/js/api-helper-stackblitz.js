$(document).ready(function () {

    apiHelper.canUseStackblitz = function() {
        // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
        var isChromium = window.chrome;
        var winNav = window.navigator;
        var vendorName = winNav.vendor;
        var isOpera = typeof window.opr !== "undefined";
        var isIEedge = winNav.userAgent.indexOf("Edg") > -1;
        var isIOSChrome = winNav.userAgent.match("CriOS");
    
        if (isIOSChrome) {
            // is Google Chrome on IOS
            return false;
        } else if(
            isChromium !== null &&
            typeof isChromium !== "undefined" &&
            vendorName === "Google Inc." &&
            isOpera === false &&
            isIEedge === false) {
            // is Google Chrome
            return true;
        } else { 
            // not Google Chrome 
            return false;
        }
    };
    
    $('.stackblitz').each(function() {
        const thisElem = $(this);

        const projectId = $(thisElem).attr('data-project');
        
        $(thisElem).find('button').on('click', function() {

            const options = {
                openFile: 'index.js',
                hideNavigation: true,
                hideDevTools: false,
                devToolsHeight: 33,
            };

            StackBlitzSDK.openProjectId(projectId, options);
        });  
    });


});
