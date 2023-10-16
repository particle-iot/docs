#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


const commentParser = require('comment-parser'); // https://www.npmjs.com/package/comment-parser

let globalOptions = {
    sourceExtensions: ['js', 'ts'],
};

globalOptions.docsTopDir = path.resolve(path.join(__dirname, '..', '..')),


globalOptions.apis = {
    cloud: {
        name: 'api-service',
        dirs: [
            'src/views',
        ],
        requireApiTag: true,
    },
    js: {
        name: 'particle-api-js',
        files: [
            'src/Particle.js',
        ],
        requireApiTag: false,
    },
};

async function scanFile(api, curFile) {

    const fileContents = fs.readFileSync(path.join(api.baseDir, curFile), 'utf8');

    const fileLines = fileContents.split('\n');

    let parsed = commentParser.parse(fileContents);
    
    for(let ii = 0; ii < parsed.length; ii++) {

        let apiDef = {
            description: parsed[ii].description,
            tags: parsed[ii].tags,              
            // source: parsed[ii].source,
            functionPrototype: '',
            line: 1,
            library: api.name,
            file: curFile, 
        };


        let isApi = false;
        let skipApi = false;
        for(const tag of parsed[ii].tags) {
            if (tag.tag == 'api') {
                isApi = true;
            }
            if (tag.tag == 'private' || tag.tag == 'apiPrivate') {
                skipApi = true;
            }
            if (tag.tag == 'apiName') {
                apiDef.apiName = tag.name;
                console.log('apiName ' + apiDef.apiName);
            }
        }

        if (api.requireApiTag && !isApi) {
            continue;
        }
        if (skipApi) {
            continue;
        }

        if (parsed[ii].source.length > 0) {
            apiDef.line = parsed[ii].source[0].number;

            const lastLine = parsed[ii].source[parsed[ii].source.length - 1].number;

            let indent;
            for(let line = lastLine + 1; line < fileLines.length; line++) {
                const m = fileLines[line].match(/^([ \t]+)/);
                if (!m) {
                    break;
                }

                if (!indent) {
                    indent = m[1];
                }
                if (m[1].length > indent.length) {
                    break;
                }

                apiDef.functionPrototype += fileLines[line].trim() + ' ';
            }

            apiDef.functionPrototype = apiDef.functionPrototype.replace(/[{ \t]+$/, '');

            if (!apiDef.apiName && apiDef.functionPrototype.length) {
                const m = apiDef.functionPrototype.match(/([A-Za-z0-9_]+)[ ]*\(/);
                if (m) {
                    apiDef.apiName = m[1];
                }
                else {
                    console.log('did not parse functionName ' + apiDef.functionPrototype);
                }        
            }
        }

        // console.log('apiDef', apiDef);
        api.definitions.push(apiDef);

        if (apiDef.apiName) {
            api.definitionByName[apiDef.apiName.toLowerCase()] = apiDef;
        }
    }                
}

async function run() {
    // Preflight
    for(const apiName in globalOptions.apis) {
        let api = globalOptions.apis[apiName];

        if (!api.baseDir) {
            api.baseDir = path.resolve(path.join(globalOptions.docsTopDir, '..', api.name));
        }

        if (!api.definitions) {
            api.definitions = [];
        }
        if (!api.definitionByName) {
            api.definitionByName = {};
        }

        if (!fs.existsSync(api.baseDir)) {
            console.error('missing dir ' + api.baseDir + ' in ' + api.name);
            process.exit(1);
        }

        if (api.files) {
            for(const file of api.files) {
                await scanFile(api, file);    
            }
        }
        else {
            for(const dirName of api.dirs) {
                const curDir = path.join(api.baseDir, dirName);
                if (!fs.existsSync(curDir)) {
                    console.error('missing dir ' + curDir + ' in ' + api.name);
                    process.exit(1);
                }
                
                for(const dirEntry of fs.readdirSync(curDir, {withFileTypes: true})) {
                    if (!dirEntry.isFile()) {
                        continue;
                    }
                    const lastDotIndex = dirEntry.name.lastIndexOf('.');
                    const ext = ((lastDotIndex > 0) ? dirEntry.name.substring(lastDotIndex + 1) : '').toLowerCase();
                    if (!globalOptions.sourceExtensions.includes(ext)) {
                        continue;
                    }
    
                    const curFile = path.join(dirName, dirEntry.name);
    
                    await scanFile(api, curFile);
                }
            }    
        }
        
    }

    // Show cloud APIs
    
    for(const apiName in globalOptions.apis.cloud.definitionByName) {
        //console.log('cloud apiName ' + apiName);
    }
    

    // See if Javascript API names can be 
    
    for(const apiName in globalOptions.apis.js.definitionByName) {
        if (!globalOptions.apis.cloud.definitionByName[apiName]) {
            //console.log('apiName ' + apiName + ' not present in cloud api');
        }
        else {
            console.log('apiName ' + apiName + ' matched cloud api');
        }
    }    

    // console.log('globalOptions', globalOptions);

}

run();

