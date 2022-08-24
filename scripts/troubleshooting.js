
const fs = require('fs');
const path = require('path');

function verifyTroubleshooting(options) {
    // console.log('verifyTroubleshooting', json);

    // Delete all of the paths and add them back in
    for(let p of options.troubleshootingJson.pages) {
        if (p.paths) {
            delete p.paths;
        }
    }

    const getPage = function(page) {
        return options.troubleshootingJson.pages.find(e => e.page == page);
    }

    const crawl = function(page, pagePath) {
        const p = getPage(page);
        if (!p) {
            console.log('ERROR! Troubleshooting page ' + page + ' not found', pagePath);
            return;
        }
        // console.log('crawl ' + page, pagePath);

        // Make sure we don't loop
        if (pagePath.includes(page)) {
            return;
        }

        const newPagePath = pagePath.concat([page]);

        if (p.ticketForm) {
            const form = options.ticketFormsJson.ticketForms.find(e => e.id == p.ticketForm);
            if (!form) {
                console.log('ERROR! Troubleshooting page ' + page + ' unknown ticketForm ' + p.ticketForm);
            }

            for(const field of p.fields) {
                const f = options.ticketFormsJson.ticketFields.find(e => e.id == field.id);
                if (!f) {
                    console.log('ERROR! Troubleshooting page ' + page + ' unknown ticketForm field ' + field.id);
                }
            }
        }

        if (p.buttons) {
            for(const b of p.buttons) {
                if (b.page && b.page < 10000) {
                    // Link to a page (not a form)
                    crawl(b.page, newPagePath);
                }
                else
                if (b.page >= 10000) {
                    // Link to ticket form
                    const f = options.ticketFormsJson.ticketForms.find(e => e.id == b.page);
                    if (!f) {
                        console.log('ERROR! Troubleshooting page ' + page + ' links to unknown form ' + b.page);
                    }
                }
            }    
        }
        
        if (p.note) {
            // console.log('note ' + p.note, newPagePath);
            // This is the old way, were we save every path
            /*
            if (!p.paths) {
                p.paths = [];
            }
            p.paths.push(newPagePath);
            */
            // We now only save the first path, because that's the one we use when loading, and with redundant paths 
            // the number of paths in the file was getting excessive
            if (!p.paths) {
                p.paths = [newPagePath];
            }
        }
    }   

    // Crawl from the first page
    crawl(101, []);


}

module.exports = {
    metalsmith: function(options) {

        return function(files, metalsmith, done) {
            // options.sourceDir is usually '../src' 
            // options.jsonFile is the configuration JSON file, relative to src: 'assets/files/troubleshooting.json'

            const jsonPath = metalsmith.path(path.join(options.sourceDir, options.jsonFile));

            const origJsonStr = fs.readFileSync(jsonPath, 'utf8');

            let troubleshootingJson = JSON.parse(origJsonStr);
            const redirectsJson = JSON.parse(fs.readFileSync(metalsmith.path(path.join(options.sourceDir, options.redirectsFile)), 'utf8'));
            const ticketFormsJson = JSON.parse(fs.readFileSync(metalsmith.path(path.join(options.sourceDir, options.ticketFormsFile)), 'utf8'));

            verifyTroubleshooting({
                troubleshootingJson,
                redirectsJson,
                ticketFormsJson
            });

            const newJsonStr = JSON.stringify(troubleshootingJson, null, 4);
            if (origJsonStr != newJsonStr) {
                console.log('updated ' + jsonPath);

                fs.writeFileSync(jsonPath, newJsonStr);

                files[options.jsonFile] = {
                    contents: Buffer.from(newJsonStr, 'utf8'),
                    mode: '0644',
                    stats: fs.statSync(jsonPath)
                };
        
            }

            // Generate export of pages
            if (options.pagesCsv) {
                const pagesCsvPath = metalsmith.path(path.join(options.sourceDir, options.pagesCsv));
                let pagesCsv = '';

                for(const pageObj of troubleshootingJson.pages) {
                    if (pageObj['title-hidden']) {
                        pagesCsv += pageObj.page + '\t' + pageObj['title-hidden'] + '\n';
                    }
                    else {
                        pagesCsv += pageObj.page + '\t' + pageObj.title + '\n';
                    }
                }
                for(const ticketFormObj of ticketFormsJson.ticketForms) {
                    pagesCsv += ticketFormObj.id + '\t' + ticketFormObj.title + '\n';
                }

                fs.writeFileSync(pagesCsvPath, pagesCsv);
            }


            done();
        }
    },
};


