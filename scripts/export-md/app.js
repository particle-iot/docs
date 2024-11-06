#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const argv = require('yargs').argv;

const YAML = require('yaml');

const topDir = path.normalize(path.join(__dirname, '..', '..'));
const srcDir = path.join(topDir, 'src');
const contentDir = path.join(srcDir, 'content');
const assetsDir = path.join(srcDir, 'assets');

//
const yamlTemplate = {
    id: 'particle/monitor-edge',
    category: 'tutorial',
    icon: 'particle.png',
    gitrepo: 'https://github.com/particle-iot/monitor-edge',
    name: 'Monitor Edge',
    shortDescription: 'A complete Equipment Monitoring solution',
    version: '1.0.0',
    models: [],
    language: ['C++'],
    cloudServices: [],
    integrations: [],
    hardwareDependencies: [
        {
            name: 'Tracker One',
            link: 'https://www.particle.io/tracker-one/',        
        },
        {
            name: 'Particle T-SoM Module',
            link: 'https://www.particle.io/tracker-som/',
        },
    ],
    description: '',
}


async function run() {
    try {
        if (!argv.source) {
            console.log('--source is required');
            process.exit(1);
        }
        if (!argv.dest) {
            console.log('--dest is required');
            process.exit(1);
        }
        if (!fs.existsSync(argv.dest)) {
            fs.mkdirSync(argv.dest);
            console.log('creating ' + argv.dest);
        }
        const destImagesPath = path.join(argv.dest, 'images');
        if (!fs.existsSync(destImagesPath)) {
            fs.mkdirSync(destImagesPath);
            console.log('creating ' + destImagesPath);
        }
        const destProjName = argv.dest.substring(argv.dest.lastIndexOf('/') + 1);
        
        let mdPartialPath = argv.source;
        if (mdPartialPath.startsWith('/')) {
            mdPartialPath = mdPartialPath.substring(1);
        }
        const mdPath = path.join(contentDir, mdPartialPath);
        if (!fs.existsSync(mdPath)) {
            console.log('--source path not found', {mdPath, mdPartialPath, contentDir});
            process.exit(1);
        }
        let mdString = fs.readFileSync(mdPath, 'utf8');

        let frontMatter = {};
        let mdLines = [];

        let section = 0;
        for(let line of mdString.split('\n')) {
            if (line == '---' && section  < 2) {
                section++;
                if (section == 2) {
                    continue;
                }
            }
            if (section == 1) {
                const parts = line.split(':', 2);
                if (parts.length == 2) {
                    frontMatter[parts[0].trim()] = parts[1].trim();
                }
            }
            if (section == 2) {
                const lineOrig = line;

                // Images and links
                // ![M8 cable](/assets/images/app-notes/AN012/m8-cable.jpg)

                const matches = [...line.matchAll(/([!]*)\[([^\]]*)\]\(([^ \)]+)\)/g)];
                if (matches.length) {
                    // console.log('matches', matches);

                    let updates = []

                    for(const match of matches) {
                        let p = {
                            isImage: (match[1] == '!'),
                            text: match[2],
                            link: match[3],
                            index: match.index,
                            len: match[0].length,
                        }

                        const lastSlashIndex = p.link.lastIndexOf('/');
                        if (lastSlashIndex >= 0) {
                            p.filename = p.link.substring(lastSlashIndex + 1);
                        }
                        else {
                            p.filename = p.link;
                        }

                        if (p.link.startsWith('/assets/images')) {
                            const imgData = fs.readFileSync(path.join(srcDir, p.link));

                            fs.writeFileSync(path.join(destImagesPath, p.filename), imgData);

                            p.link = 'images/' + p.filename
                        }

                        if (!p.isImage && p.link.startsWith('/')) {
                            // Relative link, change to docs link
                            p.link = 'https://docs.particle.io' + p.link;
                        }

                        // console.log('match', p);
                        updates.push(p);
                    }

                    for(const p of updates.reverse()) {
                        let tag = '';

                        if (p.isImage) {
                            tag += '!';
                        }
                        tag += '[' + p.text + ']';
                        tag += '(' + p.link + ')';

                        line = line.substring(0, p.index) + tag + line.substring(p.index + p.len);
                    }
                }
                line = line.replace('{{title}}', destProjName);

                if (line != lineOrig) {
                    console.log('updated line', {line, lineOrig});
                }

                mdLines.push(line);
            }
        }

        mdString = mdLines.join('\n');

        {
            let updates = [];

            // For Azure IoT hub, which uses <img tags that span lines 
            const matches = [...mdString.matchAll(/<img([^>]+)>/g)];
            for(const match of matches) {
                let p = {
                    index: match.index,
                    len: match[0].length,
                    isImage: true,
                };

                let opts = {};
                const matches2 = [...match[0].matchAll(/([a-z]+)="([^"]*)"/g)];
                for(const match2 of matches2) {
                    opts[match2[1]] = match2[2];
                }

                if (!opts.src) {
                    continue;
                }
                p.link = opts.src;
                p.text = opts.alt || '';

                const lastSlashIndex = p.link.lastIndexOf('/');
                if (lastSlashIndex >= 0) {
                    p.filename = p.link.substring(lastSlashIndex + 1);
                }
                else {
                    p.filename = p.link;
                }

                if (p.link.startsWith('/assets/images')) {
                    const imgData = fs.readFileSync(path.join(srcDir, p.link));

                    fs.writeFileSync(path.join(destImagesPath, p.filename), imgData);

                    p.link = 'images/' + p.filename;
                }


                console.log('p', {p, match: match[0], opts});
                updates.push(p);

            }
            for(const p of updates.reverse()) {        
                if (!p.link) {
                    continue;
                }

                let tag = '';

                if (p.isImage) {
                    tag += '!';
                }
                tag += '[' + p.text + ']';
                tag += '(' + p.link + ')';

                mdString = mdString.substring(0, p.index) + tag + mdString.substring(p.index + p.len);
            }
        }
        




        // console.log('parsed', {mdLines, frontMatter});
        const destReadMePath = path.join(argv.dest, 'README.md');
        if (!fs.existsSync(destReadMePath) || argv.force) {
            fs.writeFileSync(destReadMePath, mdString);
            console.log('creating ' + destReadMePath);
        }

        const yaml = Object.assign({}, yamlTemplate);
        yaml.id = 'particle/' + destProjName;
        yaml.gitrepo = 'https://github.com/particle-iot/' + destProjName,
        yaml.name = destProjName;
        yaml.shortDescription = destProjName;
    
        const destYamlPath = path.join(argv.dest, 'blueprint.yaml');
        if (!fs.existsSync(destYamlPath) || argv.force) {
            fs.writeFileSync(destYamlPath, YAML.stringify(yaml));
            console.log('creating ' + destYamlPath);
        }

        for(const f of ['LICENSE', '.gitignore']) {
            const d = path.join(argv.dest, f);
            if (!fs.existsSync(d)) {
                fs.writeFileSync(d, fs.readFileSync(path.join(__dirname, f)));
                console.log('creating ' + d);
            }
        }
    }
    catch(e) {
        console.log('exception', e);
    }
    
}

run();