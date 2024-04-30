

function metalsmith(options) {
    return function (files, metalsmith, done) {
        console.log('priority-search');

        let resources = [];

        const processArray = function(array) {
            for(const item of array) {
                if (Array.isArray(item)) {
                    processArray(item);
                }
                else {
                    if (typeof item.href == 'string') {
                        if (item.href.startsWith('/') && item.href.endsWith('/')) {
                            const pageKey = item.href.substring(1, item.href.length - 1) + '.md';
                            if (files[pageKey]) {
                                // console.log('page ' + pageKey);
                                if (!resources.find(e => e.href == item.href)) {
                                    resources.push({
                                        href: item.href,
                                        title: files[pageKey].title,
                                        description: files[pageKey].description,
                                    });

                                    // TODO: Process contents of files to handle headers
                                    // TODO: Make sure single page Device OS API reference is ignored
                                    // TODO: Probably handle api helper in Device OS API reference
                                }
                            }                            
                        }    
                    }
                }
            }
        }

        let menus = {};

        for(const key in files) {
            if (key.endsWith('menu.json')) {
                menus[key] = JSON.parse(files[key].contents.toString());
            }
        }
        // key is the path (does not begin with a slash)
        // object contains key "items" that is an array of items in the menu
        //  objects in array may be:
        //     a directory with dir, title, href (optionally tiles)
        //     a section with dir, title (optional), isSection=true, next item is an array
        //     a menu item with dir, title, href
        
        // console.log('menus', menus);

        for(const menuKey in menus) {
            processArray(menus[menuKey].items);            
        }

        console.log('resources', resources);

        done();
    };
}

module.exports = {
    metalsmith,
};
