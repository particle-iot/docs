
var fs = require('fs');
var path = require('path');
const crypto = require('crypto');

const doBackfillLastMod = false;
const util = require('util');
const exec = util.promisify(require('child_process').exec);


module.exports = function plugin(options) {

    const sitemapConfigPath = path.join(__dirname, options.config);

    let sitemapConfig = JSON.parse(fs.readFileSync(sitemapConfigPath));
    // console.log("sitemapConfig", sitemapConfig);

    if (!sitemapConfig.pages) {
        sitemapConfig.pages = {};
    }

    async function run(files, metalsmith, done) {
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
                                if (e.hidden || e.internal) {
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
            'notes',
        ];


        for(const fileName in files) {
            if (!fileName.match(/md$/)) {
                // Ignore non-md files in sitemap
                continue;
            }
            // 
            let ignoreFile = false;

            sitemapConfig.ignore.forEach(function(str) {
                if (fileName.indexOf(str) >= 0) {
                    ignoreFile = true;
                }
            });
            
            if (ignoreFile) {
                continue;
            }

            if (hiddenPages[fileName]) {
                continue;
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
                    continue;
                }    
            }
                        
            let priority = 0.5;

            for(const str in sitemapConfig.priority) {
                if (fileName.indexOf(str) >= 0) {
                    priority = sitemapConfig.priority[str];
                }
            }
        
            if (!sitemapConfig.pages[fileName]) {
                sitemapConfig.pages[fileName] = {};
            }
            sitemapConfig.pages[fileName].seen = true;

            const lastModDate = function(d) {
                const s = d.toISOString();
                const offset = s.indexOf('T');
                return s.substring(0, offset);
            }

            const hash = crypto.createHash('sha256').update(files[fileName].contents).digest('hex');

            if (!sitemapConfig.pages[fileName].date && doBackfillLastMod) {     
                if (fs.existsSync(path.join(contentDir, fileName))) {
                    const cmd = 'cd ' + contentDir + ' && git log -n 1 ' + fileName;
                    const { stdout, stderr } = await exec(cmd);     
    
                    // console.log('git log', stdout);
                    
                    // Date:   Wed Jul 12 11:29:20 2023 -0400
                    const m = stdout.match(/Date:[ ]+(.*)\n/);
                    if (m) {
                        const d = new Date(m[1]);
                        sitemapConfig.pages[fileName].date = lastModDate(d);
                        console.log('backfill date', {
                            fileName,
                            date: sitemapConfig.pages[fileName].date,
                        })
                    }    
                }    
                else {
                    // Generated Device OS API files like reference/device-os/api/introduction/getting-started.md
                    // don't exist on the file system so just set those to today
                    console.log('generated file ' + fileName);
                    sitemapConfig.pages[fileName].date = lastModDate(new Date());
                }       
                sitemapConfig.pages[fileName].hash = hash;
            }
            else {
                if (hash != sitemapConfig.pages[fileName].hash) {
                    console.log('page changed ' + fileName);
    
                    sitemapConfig.pages[fileName].hash = hash;
                    sitemapConfig.pages[fileName].date = lastModDate(new Date());
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

            if (sitemapConfig.pages[fileName].date) {
                sitemap += '    <lastmod>' + sitemapConfig.pages[fileName].date + '</lastmod>\n';
            }
            
            sitemap += '  </url>\n'
        }

        for(const p of troubleshootingJson.pages) {
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

        for(const pagePath in sitemapConfig.pages) {
            if (sitemapConfig.pages[pagePath].seen) {
                delete sitemapConfig.pages[pagePath].seen;
            }
            else {
                // Can't currently do this because live update causes a run with only
                // the changed pages and this would cause them to be deleted and 
                // recreated with the wrong dates the next time
                // console.log('page removed ' + pagePath);
                // delete sitemapConfig.pages[pagePath];
            }
        }
    
        fs.writeFileSync(sitemapConfigPath, JSON.stringify(sitemapConfig, null, 4));

        done();
    }

	return function(files, metalsmith, done) {
        run(files, metalsmith, done);
    };
};

