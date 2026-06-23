
const fs = require('fs');
const path = require('path');
const lunr = require('lunr');
const { markdownToTxt } = require('markdown-to-txt');

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
        if (p.steps) {
            for(const step of p.steps) {
                if (step.page && step.page < 10000) {
                    // Link to a page (not a form)
                    crawl(step.page, newPagePath);
                }
                // Step-by-step pages don't have ticket forms
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

            // Titles for notes
            let titlesForNotes = {};

            for(const pageObj of troubleshootingJson.pages) {
                if (!pageObj.note) {
                    continue;
                }
                titlesForNotes[pageObj.note] = pageObj.title; 
            }

            // Add frontmatter to notes to they will render properly
            for(const file in files) {
                if (!file.startsWith('content/notes')) { // 
                    continue;
                }

                let lastSlashIndex = file.lastIndexOf('/');
                const noteName = file.substring(lastSlashIndex + 1);

                files[file].title = titlesForNotes[noteName];
                files[file].layout = 'commonTwo.hbs';
                files[file].columns = 'two';
                files[file].includeDefinitions = '[api-helper, api-helper-troubleshooting]';

                // console.log('file ' + file, files[file]);

            }

            // Generate lunr index of pages
            if (options.searchIndexFile) {
                var lunrIndex = lunr(function () {
                    this.ref('page');

                    for(const field of ['title', 'description','text','type']) {
                        this.field(field);
                    }

                    for(const pageObj of troubleshootingJson.pages) {
                        
                        if (!pageObj.note && !pageObj.description && !pageObj.buttons) {
                            // Empty
                            continue;
                        }

                        let hasNextStep = false;
                        if (pageObj.buttons) {
                            for(const buttonObj of pageObj.buttons) {
                                if (buttonObj.nextStep) {
                                    hasNextStep = true;
                                }
                            }
                        }
                        if (hasNextStep) {
                            // If part of a multi-step, ignore this page
                            continue;
                        }


                        let doc = {
                            page: pageObj.page.toString(),
                            type: 'page',
                        }
                        if (pageObj.title) {
                            doc.title = pageObj.title;
                        }
                        if (pageObj.description) {
                            doc.description = pageObj.description;
                        }

                        if (pageObj.note) {
                            // TODO: read note md file here
                            // doc.text = markdownToTxt()
                        }

                        if (pageObj.buttons) {
                            for(const buttonObj of pageObj.buttons) {
                                if (buttonObj.nonOrgRequired || buttonObj.enterpriseRequired) {
                                    continue;
                                }
                                if (buttonObj.page && buttonObj.page < 9999) {
                                    // Don't include buttons that link to a troubleshooting page
                                    continue;
                                }
                                if (!buttonObj.title) {
                                    continue;
                                }

                                let buttonDoc = {
                                    page: pageObj.page.toString(),
                                    title: buttonObj.title,
                                };
                                if (buttonObj.url) {
                                    buttonDoc.type = 'url';
                                }
                                else {
                                    buttonDoc.type =  'form';
                                }
                                this.add(buttonDoc);
                            }
                        }

                        this.add(doc);
                        // console.log('doc', doc);
                    }
                });
                // console.log('lunrIndex', lunrIndex);

                const lunrIndexText = JSON.stringify(lunrIndex, null, 2);
                files[options.searchIndexFile] = {
                    contents: Buffer.from(lunrIndexText, 'utf8'),
                    mode: '0644',
                    stats: fs.statSync(jsonPath)
                };                                
            }


            done();
        }
    },
};


