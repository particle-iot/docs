// This tool updates docs.particle.io to import the marketing website application notes from
// https://www.particle.io/application-notes/
//
// The images are downloaded to xxx
// The heading, short description, and link are saved in src/content/reference/newMenu.json
// to populate the tiles on the page: /reference/application-notes/
//
// This is a separate tool from the standard docs build because it does not need to be run
// frequently, and also because it requires node.js v20 because of dependencies of cheerio.
//
// To use:
// nvm use 20
// npm install
// node app.js

const fs = require('fs');
const path = require('path');

const cheerio = require("cheerio");
const fetch = require("node-fetch"); // node-fetch@2 required for CommonJS

const imageDir = path.join(__dirname, '..', '..', 'src', 'assets', 'images', 'application-notes');
const menuJsonPath = path.join(__dirname, '..', '..', 'src', 'content', 'reference', 'newMenu.json');

async function run() {
    try {
        let html;

        if (fs.existsSync('test.html')) {
            html = fs.readFileSync('test.html', 'utf8');
        }
        else {
            const fetchRes = await fetch('https://www.particle.io/application-notes/');
            html = await fetchRes.text();
        }
    
        const $ = cheerio.load(html);   
    
        const tileDataArray = [];

        for(const liElem of $('main').find('li')) {

            const tileData = {
                href: $(liElem).find('a').attr('href'),
                title: $(liElem).find('h3').text(),
                text: $(liElem).find('p:first').text(),
                img: $(liElem).find('picture').find('img').attr('data-src'),
            };


            // TODO: possibly extract the image format from the fm=jpg part of the img path, but it
            // is currently always jpg
            tileData.imageFileName = tileData.title.replace(/[^A-Za-z0-9]/g, '').toLowerCase() + '.jpg';
            tileData.imageFilePath = path.join(imageDir, tileData.imageFileName);

            // console.log('tileData', tileData);

            if (!fs.existsSync( tileData.imageFilePath)) {
                const fetchRes = await fetch(tileData.img);
                const buf = await fetchRes.buffer();

                fs.writeFileSync( tileData.imageFilePath, buf);
            }      
            
            tileDataArray.push(tileData);
        }

        const menuJsonStr = fs.readFileSync(menuJsonPath, 'utf8');
        const menuJson = JSON.parse(menuJsonStr);

        const topItems = menuJson.items;
        const applicationNotesDir = topItems.find(e => e.dir == 'application-notes');
        
        applicationNotesDir.tiles = [];
        for(const tileData of tileDataArray) {
            const obj = {
                title: tileData.title,
                detail: tileData.text,
                href: 'https://www.particle.io' + tileData.href,
                img: '/assets/images/application-notes/' + tileData.imageFileName,
            };


            applicationNotesDir.tiles.push(obj);
        }
        console.log('tiles', applicationNotesDir.tiles);
        

        const newMenuJsonStr = JSON.stringify(menuJson, null, 4);
        if (menuJsonStr != newMenuJsonStr) {
            fs.writeFileSync(menuJsonPath, newMenuJsonStr);
            console.log('newMenu.json updated');
        }
        else {
            console.log('newMenu.json unchanged');
        }

    }
    catch(e) {
        console.log('exception', e);
    }
}

run();
