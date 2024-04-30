const lunr = require('lunr');


function metalsmith(options) {
    return function (files, metalsmith, done) {
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
                            if (files[pageKey] && pageKey != '/reference/device-os/firmware.md') {                                
                                // console.log('page ' + pageKey);
                                if (!resources.find(e => e.href == item.href)) {
                                    let resource = {
                                        href: item.href,
                                        title: files[pageKey].title,
                                        description: files[pageKey].description,
                                        headings: [],
                                    };
                                    // TODO: Process contents of files to handle headers
                                    // TODO: Make sure single page Device OS API reference is ignored
                                    // TODO: Probably handle api helper in Device OS API reference

                                    const headingRE = /^(#+)[ \t]+(.*)/;

                                    for(const line of files[pageKey].contents.toString().split('\n')) {
                                        const m = line.match(headingRE);
                                        if (m) {
                                            resource.headings.push({
                                                level: m[1].length,
                                                title: m[2],
                                            });
                                        }
                                    }

                                    resources.push(resource);

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
        if (menus.length < 5) {
            // This was a partial refresh during development; don't rebuild index
            console.log('prioritySearch index not rebuilt');
            done();
            return;
        }

        for(const menuKey in menus) {
            processArray(menus[menuKey].items);            
        }

        // console.log('resources', resources);

        // Generate index
        var lunrIndex = lunr(function () {
            this.ref('h');
    
            for(const field of ['t', 'b']) {
                this.field(field);
            }
    
            for(const resource of resources) {
                let doc = {
                    h: resource.href,
                    t: resource.title,
                    b: '',
                };
                if (resource.description) {
                    doc.b += resource.description + '\n';
                }

                for(const heading of resource.headings) {
                    if (heading.level <= 4) {
                        doc.b += heading.title + '\n';
                    }
                }

                this.add(doc)
            }

        });

        const s = JSON.stringify(lunrIndex);
        console.log('prioritySearch index ' + s.length + ' bytes');

        files['assets/files/prioritySearch.json'] = {
            contents: Buffer.from(s),
        }

        done();
    };
}

module.exports = {
    metalsmith,
};
