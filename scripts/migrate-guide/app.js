#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const axios = require('axios');

const { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } = require('node-html-markdown');

// Required environment variables
// Set using commands like:
// export ZENDESK_AUTH=user@particle.io/token:xxxxxxxxxxx
// node app.js

let config = {};

// ZENDESK_AUTH - Zendesk auth token, usually of the form: user@particle.io/token:xxxxxxxxxxx
config.ZENDESK_AUTH = process.env.ZENDESK_AUTH;
if (!config.ZENDESK_AUTH) {
    console.log('ZENDESK_AUTH not set in environment');
    process.exit(1);
}

config.ZENDESK_URL = process.env.ZENDESK_URL || 'https://particle.zendesk.com';

const axiosInstance = axios.create({
    baseURL: config.ZENDESK_URL,
    headers: {
        'Authorization': 'Basic ' + Buffer.from(config.ZENDESK_AUTH, 'utf8').toString('base64')
    }
});

let data = {};

// Help Center API docs
// https://developer.zendesk.com/api-reference/help_center/help-center-api/articles/


// Basic Authentication using API tokens
// https://developer.zendesk.com/api-reference/ticketing/introduction/#api-token

const topDir = path.normalize(path.join(__dirname, '..', '..'));

const srcDir = path.join(topDir, 'src');

let options = {
    getSections: false,
    getCategories: false,
    getArticles: false,
    getAttachmentMeta: false,
    getAttachmentData: false,
    convert: true,
    outputDir: 'src/content/troubleshooting/', // relative to topDir
    imagesDir: '/assets/images/support/', // relative to srcDir, must end with with /
};

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}
const jsonDir = path.join(dataDir, 'json');
if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir);
    options.getSections = options.getCategories = options.getArticles = options.getAttachmentMeta = true;
}
const attachmentsDir = path.join('data', 'attachments');
if (!fs.existsSync(attachmentsDir)) {
    fs.mkdirSync(attachmentsDir);
    options.getAttachmentData = true;
}

const outputDir = path.join(topDir, options.outputDir);
if (!fs.existsSync(outputDir)) {
    console.log('outputDir does not exist ' + outputDir);
}

const imagesDir = path.join(srcDir, options.imagesDir);
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}


const nhm = new NodeHtmlMarkdown(
    /* options (optional) */ {}, 
    /* customTransformers (optional) */ undefined,
    /* customCodeBlockTranslators (optional) */ undefined
);

let imageNames = {};
let menuJsonData = {};

function convertArticle(param) {

    let md = nhm.translate(param.article.body);

    const h1RE = /^# (.*)/;
    const hBoldRE = /^(#+) \*\*(.*)\*\*/;
    const hRE = /^(#+) (.*)/;
    const boldRE = /^\*\*(.*)\*\*$/;
    const imageRE = /!\[(.*)\]\((.*)\)/;

    const attachmentPrefix = 'https://support.particle.io/hc/article_attachments/';

    let mdTemp = '';

    let h1Count = 0;

    const articleName = convertName(param.article.title);

    // Create menu.json
    const menuJsonEntry = {
        dir: articleName,
        title: param.article.title,
        href: '/troubleshooting/' + param.catDirName + '/' + param.sectionDirName + '/' + articleName + '/'
    };
    if (!menuJsonData[param.catDirName]) {
        menuJsonData[param.catDirName] = {};
    }
    if (!menuJsonData[param.catDirName][param.sectionDirName]) {
        menuJsonData[param.catDirName][param.sectionDirName] = [];
    }
    menuJsonData[param.catDirName][param.sectionDirName].push(menuJsonEntry);

    // Create frontmatter
    mdTemp += '---\n';
    mdTemp += 'title: ' + param.article.title + '\n';
    mdTemp += 'layout: commonTwo.hbs\n';
    mdTemp += 'columns: two\n';
    mdTemp += '---\n';
    mdTemp += '\n';
    mdTemp += '# {{{title}}}\n';

    for(const line of md.split('\n')) {
        let m = line.match(h1RE);
        if (m) {
            // A bunch of documents have multiple H1, increase the level by 1
            h1Count++;
        }

        m = line.match(hBoldRE);
        if (m) {
            // Convert lines of the form
            // # **Issue Summary**
            let header = m[1];
            if (header == '#' || h1Count > 0) {
                header = '#' + header;
            }
            mdTemp += header + ' ' + m[2] + '\n';
            continue;
        }
        if (h1Count > 0) {
            m = line.match(hRE);
            if (m) {
                // Increase the 
                mdTemp += '#' + m[1] + ' ' + m[2] + '\n';
                continue;    
            }    
        }
        m = line.match(boldRE);
        if (m) {
            // Convert lines of the form
            // **Hardware Solution**
            // To h3, no bold
            mdTemp += '### ' + m[1] + '\n';
            continue;
        }
        
        m = line.match(imageRE);
        if (m) {
            if (m[2].startsWith(attachmentPrefix)) {
                console.log('image ' + m[1] + ' ' + m[2]);

                const nameWithArticleId = m[2].substring(attachmentPrefix.length);

                const filename = path.basename(m[2]);
                if (imageNames[filename]) {
                    console.log('not unique ' + filename);
                }
                imageNames[filename] = true;

                fs.copyFileSync(path.join(attachmentsDir, nameWithArticleId), path.join(imagesDir, filename));   

                mdTemp += '![' + m[1] + '](' + options.imagesDir + filename + ')\n';
                continue;
            }
        }

        mdTemp += line + '\n';
    }
    md = mdTemp;


    // console.log(md);
    fs.writeFileSync(path.join(param.outputSectionDirPath, articleName + '.md'), md);
}

function convertName(name) {
    return name.toLowerCase().replace(/ +/g, '-').replace(/[^-A-Za-z0-9]+/g, '').replace(/-+/g, '-');
}

async function run() {
    try {
        let res;

        const categoriesPath = path.join(jsonDir, 'categories.json');
        if (options.getCategories) {
            res = await axiosInstance.get('/api/v2/help_center/categories');
            data.categories = res.data.categories;
            fs.writeFileSync(categoriesPath, JSON.stringify(data.categories, null, 4));    
        }
        else {
            data.categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
        }

        const sectionsPath = path.join(jsonDir, 'sections.json');
        if (options.getSections) {
            res = await axiosInstance.get('/api/v2/help_center/sections');
            data.sections = res.data.sections;
            fs.writeFileSync(sectionsPath, JSON.stringify(data.sections, null, 4));            
        }
        else {
            data.sections = JSON.parse(fs.readFileSync(sectionsPath, 'utf8'));
        }

        const forEachSection = async function(cb) {

            for(const category of data.categories) {
                // console.log('category ' + category.name + ' ' + convertName(category.name));
                const catDirName = convertName(category.name);
                const catDirPath = path.join(jsonDir, catDirName);
                if (!fs.existsSync(catDirPath)) {
                    fs.mkdirSync(catDirPath);
                }
                const outputCatDirPath = path.join(outputDir, catDirName);
                if (!fs.existsSync(outputCatDirPath)) {
                    fs.mkdirSync(outputCatDirPath);
                }

                for(const section of data.sections) {
                    if (section.category_id != category.id) {
                        continue;
                    }
                    let param = {
                        category,
                        catDirName,
                        catDirPath,
                        outputCatDirPath,
                    };
                    param.section = section;

                    param.sectionDirName = convertName(section.name);
                    param.sectionDirPath = path.join(param.catDirPath, param.sectionDirName);
                    if (!fs.existsSync(param.sectionDirPath)) {
                        fs.mkdirSync(param.sectionDirPath);
                    }
                    param.outputSectionDirPath = path.join(param.outputCatDirPath, param.sectionDirName);
                    if (!fs.existsSync(param.outputSectionDirPath)) {
                        fs.mkdirSync(param.outputSectionDirPath);
                    }
                    
                    cb(param);
                }
            }
        };

        const forEachArticle = async function(cb) {
            forEachSection(async function(param) {
                const articles = JSON.parse(fs.readFileSync(path.join(param.sectionDirPath, 'articles.json'), 'utf8'));
                // console.log('articles', articles);

                for(const article of articles) {
                    if (article.draft || article.outdated) {
                        continue;
                    }

                    param.article = article;

                    const savePath = path.join(param.sectionDirPath, article.id + '.attachments.json');
                    if (fs.existsSync(savePath)) {
                        param.attachments = JSON.parse(fs.readFileSync(savePath, 'utf8'));
                    }
                    else {
                        param.attachments = null;
                    }

                    cb(param);
                }

            });
        }

        if (options.getArticles) {
            forEachSection(async function(param) {
                res = await axiosInstance.get('/api/v2/help_center/sections/' + param.section.id + '/articles');
                fs.writeFileSync(path.join(param.sectionDirPath, 'articles.json'), JSON.stringify(res.data.articles, null, 4));    
            });            
        }

        if (options.getAttachmentMeta) {
            forEachSection(async function(param) {
                const articles = JSON.parse(fs.readFileSync(path.join(param.sectionDirPath, 'articles.json'), 'utf8'));
                // console.log('articles', articles);

                for(const article of articles) {
                    res = await axiosInstance.get('/api/v2/help_center/articles/' + article.id + '/attachments.json');
                    if (res.data.article_attachments.length) {
                        const savePath = path.join(param.sectionDirPath, article.id + '.attachments.json');
                        fs.writeFileSync(savePath, JSON.stringify(res.data.article_attachments, null, 4));
                    }
                }
            });
        }

        if (options.getAttachmentData) {
            forEachArticle(async function(param) {
                if (!param.attachments) {
                    return;
                }
            
                for(const attachment of param.attachments) {

                    res = await axios.get(attachment.content_url, {
                        responseType: 'arraybuffer'
                    });
                    
                    const savePath = path.join(attachmentsDir, attachment.relative_path.replace('/hc/article_attachments/', ''));

                    const saveDir = path.dirname(savePath);

                    if (!fs.existsSync(saveDir)) {
                        fs.mkdirSync(saveDir);
                    }

                    fs.writeFileSync(savePath, res.data);
                }
            });
        }

        /*
        {
            // Check attachment names
            let names = {};

            forEachArticle(async function(param) {
                if (!param.attachments) {
                    return;
                }
            
                for(const attachment of param.attachments) {
                    console.log('attachment', attachment);
                    if (names[attachment.file_name] != attachment.id) {
                        console.log('attachment name is not unique ' + attachment.file_name);
                    }
                    else {
                        names[attachment.file_name] = attachment.id;
                    }
                }
            });
        }
        */

        if (options.convert) {
            forEachArticle(async function(param) {
                // 
                // console.log('article', param);


                convertArticle(param);

                // Attachments
                if (param.attachments) {
                    for(const attachment of param.attachments) {
                    }
                }
            });

            // Convert menuJsonData into a menu.json style file
            const menuJson = {
                items: []
            };

            for(const categoryName in menuJsonData) {
                menuJson.items.push({
                    dir: categoryName,
                    isSection: true
                });

                let categoryArray = [];

                for(const sectionName in menuJsonData[categoryName]) {
                    categoryArray.push({
                        dir: sectionName,
                        isSection: true
                    });
    
                    categoryArray.push(menuJsonData[categoryName][sectionName]);
                }

                menuJson.items.push(categoryArray);
            }

            fs.writeFileSync(path.join(dataDir, 'menu.json'), JSON.stringify(menuJson, null, 4));
        }
        
    }
    catch(e) {
        console.log('uncaught exception in run', e);
    }
    
}

run();
