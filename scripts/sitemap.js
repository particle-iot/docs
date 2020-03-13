
var fs = require('fs');
var path = require('path');

module.exports = function plugin(options) {

    const sitemapConfig = JSON.parse(fs.readFileSync(path.join(__dirname, options.config)));
    // console.log("sitemapConfig", sitemapConfig);

	return function(files, metalsmith, done) {
        // Create the sitemap file
        var sitemap = '';

        sitemap += '<?xml version="1.0" encoding="UTF-8"?>\n';

        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';


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

            // TODO: Check fileName to see if it has a priority in the frontmatter
            
            let priority = 0.5;

            // Special case: for forked files, give the boron fork a priority bump (unless otherwise overridden)
            if (fileName.endsWith('boron.md')) {
                priority = 0.6;
            }

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



        sitemap += '</urlset>\n';

        const sitemapPath = path.join(__dirname, options.output);

        if (!fs.existsSync(path.dirname(sitemapPath))) {
            fs.mkdirSync(path.dirname(sitemapPath));
        }
        
        fs.writeFileSync(sitemapPath, sitemap);

        done();
    };
};

