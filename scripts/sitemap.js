
var fs = require('fs');
var path = require('path');

module.exports = function plugin(options) {

    const sitemapConfig = JSON.parse(fs.readFileSync(path.join(__dirname, options.config)));
    // console.log("sitemapConfig", sitemapConfig);

	return function(files, metalsmith, done) {
        // Find menu.json files
        const contentDir = metalsmith.path(options.contentDir);

        // troubleshooting: '../src/assets/files/troubleshooting.json',
        const troubleshootingPath = metalsmith.path(options.troubleshooting);
        const troubleshootingJson = JSON.parse(fs.readFileSync(troubleshootingPath, 'utf8')); 
        
        let visiblePages = {};
        let hiddenPages = {};
        
        for(const dirEnt of fs.readdirSync(contentDir, {withFileTypes:true})) {
            if (dirEnt.isDirectory()) {
                const subdirPath = path.join(contentDir, dirEnt.name);
                const menuJsonPath = path.join(subdirPath, 'menu.json');
                if (fs.existsSync(menuJsonPath)) {
                    // console.log('menu.json', menuJsonPath);
                    const menuJson = JSON.parse(fs.readFileSync(menuJsonPath, 'utf8'));
                    
                    const processMenuArray = function(a) {
                        for(const e of a) {
                            if (Array.isArray(e)) {
                                processMenuArray(e);
                            }
                            else {
                                if (e.hidden) {
                                    if (!e.searchable) {
                                        // Example e.href: /reference/technical-advisory-notices/tan007/

                                        // Remove the leading slash
                                        let page = e.href.substring(1);

                                        // Remove the trailing slash
                                        page = page.substring(0, page.length - 1);

                                        page += '.md';

                                        hiddenPages[page] = e;
                                    }
                                }
                                else {
                                    if (e.href) {
                                        const mdPath = e.href.substring(1, e.href.length - 1) + '.md';
                                        visiblePages[mdPath] = true;    
                                    }
                                }
                            }
                        }
                    }
                    processMenuArray(menuJson.items);
                }
            }
        }

        // Create the sitemap file
        var sitemap = '';

        sitemap += '<?xml version="1.0" encoding="UTF-8"?>\n';

        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        const noPageInMenuCheck = [
            'archives',
            'community',
            'reference/device-os/api/',
            'reference/device-os/libraries/',
            'troubleshooting/led/',
        ];


        Object.keys(files).forEach(function (fileName) {
            if (!fileName.match(/md$/)) {
                // Ignore non-md files in sitemap
                return;
            }
            // 
            let ignoreFile = false;

            sitemapConfig.ignore.forEach(function(str) {
                if (fileName.indexOf(str) >= 0) {
                    ignoreFile = true;
                }
            });
            
            if (ignoreFile) {
                return;
            }

            if (hiddenPages[fileName]) {
                return;
            }

            let doPageInMenuCheck = true;
            for(const p of noPageInMenuCheck) {
                if (fileName.startsWith(p)) {
                    doPageInMenuCheck = false;
                    break;
                }
            }

            if (doPageInMenuCheck) {
                // Ignore pages that are not in menu.json if they are not in the list to include anyway
                if (!visiblePages[fileName]) {
                    // console.log('not visible ' + fileName);
                    return;
                }    
            }
            
            let priority = 0.5;

            for(const str in sitemapConfig.priority) {
                if (fileName.indexOf(str) >= 0) {
                    priority = sitemapConfig.priority[str];
                }
            }
        
            let url = options.baseUrl;
            if (fileName !== 'index.md') {
                url += fileName.replace('.md', '/');
            }
            url = encodeURI(url);


            // console.log('sitemap ' + url + ' priority=' + priority);

            sitemap += '  <url>\n';

            sitemap += '    <loc>' + url + '</loc>\n';
            sitemap += '    <priority>' + priority + '</priority>\n';

            sitemap += '  </url>\n'
        });

        for(const p of troubleshootingJson) {
            if (!p.paths) {
                continue;
            }
            
            let url = options.baseUrl + 'troubleshooting/troubleshooting/?p=' + p.paths[0][p.paths[0].length - 1];
            let priority = 0.4;

            sitemap += '  <url>\n';

            sitemap += '    <loc>' + url + '</loc>\n';
            sitemap += '    <priority>' + priority + '</priority>\n';

            sitemap += '  </url>\n'

        }


        sitemap += '</urlset>\n';

        const sitemapPath = path.join(__dirname, options.output);

        if (!fs.existsSync(path.dirname(sitemapPath))) {
            fs.mkdirSync(path.dirname(sitemapPath));
        }
        
        fs.writeFileSync(sitemapPath, sitemap);

        done();
    };
};

