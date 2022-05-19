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


let options = {
    getSections: false,
    getCategories: false,
    getArticles: false,
    getAttachments: true,
};

const nhm = new NodeHtmlMarkdown(
    /* options (optional) */ {}, 
    /* customTransformers (optional) */ undefined,
    /* customCodeBlockTranslators (optional) */ undefined
);


function convertArticle(article) {

    let md = nhm.translate(article.body);

    const h1RE = /^# \*\*(.*)\*\*/;
    const boldRE = /^\*\*(.*)\*\*$/;

    let mdTemp = '';

    // Create frontmatter
    mdTemp += '---\n';
    mdTemp += 'title: ' + article.title + '\n';
    mdTemp += 'layout: commonTwo.hbs\n';
    mdTemp += 'columns: two\n';
    mdTemp += '---\n';
    mdTemp += '\n';
    mdTemp += '# {{{title}}}\n';

    for(const line of md.split('\n')) {
        let m = line.match(h1RE);
        if (m) {
            // Convert lines of the form
            // # **Issue Summary**
            // To h2, no bold
            mdTemp += '## ' + m[1] + '\n';
            continue;
        }
        m = line.match(boldRE);
        if (m) {
            // Convert lines of the form
            // **Hardware Solution**
            // To h3, no bold
            mdTemp += '### ' + m[1] + '\n';
            continue;
        }
        mdTemp += line + '\n';
    }
    md = mdTemp;

    console.log(md);
}

function convertName(name) {
    return name.toLowerCase().replace(' ', '-').replace(/[^-A-Za-z0-9]/, '');
}

async function run() {
    try {
        let res;

        if (!fs.existsSync('data')) {
            fs.mkdirSync('data');
        }
        const jsonDir = path.join('data', 'json');
        if (!fs.existsSync(jsonDir)) {
            fs.mkdirSync(jsonDir);
        }
        const outputDir = path.join('data', 'output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

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
            let param = {};

            for(const category of data.categories) {
                // console.log('category ' + category.name + ' ' + convertName(category.name));
                param.category = category;
                param.catDirName = convertName(category.name);
                param.catDirPath = path.join(jsonDir, param.catDirName);
                for(const section of data.sections) {
                    if (section.category_id != category.id) {
                        continue;
                    }
                    param.section = section;

                    param.sectionDirName = convertName(section.name);
                    param.sectionDirPath = path.join(param.catDirPath, param.sectionDirName);

                    cb(param);
                }
            }
        };

        if (options.getArticles) {
            forEachSection(async function(param) {
                res = await axiosInstance.get('/api/v2/help_center/sections/' + param.section.id + '/articles');
                fs.writeFileSync(path.join(param.sectionDirPath, 'articles.json'), JSON.stringify(res.data.articles, null, 4));    
            });            
        }

        if (options.getAttachments) {
            forEachSection(async function(param) {
                const articles = JSON.parse(fs.readFileSync(path.join(param.sectionDirPath, 'articles.json'), 'utf8'));
                // console.log('articles', articles);

                for(const article of articles) {
                    res = await axiosInstance.get('/api/v2/help_center/articles/' + article.id + '/attachments.json');
                    if (res.data.article_attachments.length) {
                        console.log('res.data', res.data);
                        const savePath = path.join(param.sectionDirPath, article.id + '.attachments.json');
                        console.log('savePath ' + savePath);
                        fs.writeFileSync(savePath, JSON.stringify(res.data.article_attachments, null, 4));
                    }
                }


            });

            
        }

        //convertArticle(data.articlesInSection[0]);
        
    }
    catch(e) {
        console.log('uncaught exception in run', e);
    }
    
}

run();
