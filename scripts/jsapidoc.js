'use strict';

var fs = require('fs');
var path = require('path');

function stripMdLinks(s) {
    return s.replaceAll(/\[([^\]]+)\]\([^\)]*\)/g, '$1');
}

function convertEntities(s) {
    return s.replaceAll('&lt;', '<');
}

module.exports = function (options) {
    return function (files, metalsmith, done) {
        const generatedDir = metalsmith.path(options.generatedDir);
        const jsMdSourcePath = metalsmith.path(options.javascriptSourceFile);
        const jsMdDestPath = path.join(generatedDir, 'javascript.md');
        const jsJsonDestPath = path.join(generatedDir, 'jsDocs.json');

        console.log('jsapidoc', { generatedDir, jsMdSourcePath, jsMdDestPath, jsJsonDestPath, options });


        const jsMdSourceOld = fs.readFileSync(jsMdSourcePath, 'utf8');

        // Generate jsDocsJson here
        let jsJsonDocs = {};

        // Parse md file
        {
            let headings = ['', '', ''];
            let state = '';
            let apis = [];
            let api = {};

            const boldPairRE = /\*\*([^\*]+)\*\*[ \t]*/;

            for(const line of jsMdSourceOld.split('\n')) {
                const m = line.match(/^(#+) (.*)/);
                if (m) {
                    const level = m[1].length;
                    headings.splice(level);
                    headings[level] = m[2];
                    // console.log('headings', headings);
                    state = 'heading'; 

                    if (headings[2] == 'Particle') {
                        if (Object.keys(api).length) {
                            apis.push(api);
                        }
            
                        api = {
                            name: headings[3],
                            params: [],
                        };
                    }
                }

                if (line.startsWith('[src/Particle.js')) {
                    // Source code link
                }

                if (line.startsWith('**Parameters**')) {
                    state = 'parameters';
                    api.parameters = [];
                }
                else
                if (state == 'parameters') {
                    let param = {};

                    const m2 = line.match(/^([ \t]*)-[ \t]+`([_$A-Za-z0-9\.]+)`[ \t]*/);
                    if (m2) {
                        param.indent = m2[1].length;    
                        param.name = m2[2];
                        param.descRaw = line.substring(m2[0].length);
                        param.descText = stripMdLinks(param.descRaw).trim();
                        
                        if (param.descText.length == 0) {
                            param.paramName = '';
                            param.isOptional = false;
                            api.params.push(param);
                        }
                        else {
                            const m3 = param.descText.match(boldPairRE); // /\*\*([^\*]+)\*\*[ \t]*/
                            if (m3) {
                                param.paramNameRaw = m3[1];
                                if (param.paramNameRaw.endsWith('?')) {
                                    param.paramName = param.paramNameRaw.substring(0, param.paramNameRaw.length - 1);
                                    param.isOptional = true;
                                }
                                else {
                                    param.paramName = param.paramNameRaw;
                                    param.isOptional = false;
                                }
    
                                param.paramDesc = param.descText.substring(m3[0].length);
                                // console.log('param', {param, api});
                                
                                api.params.push(param);
                            }
                            else {
                                console.log('unknown param format', {param, m2, api})                    
                            }
    
                        }
                    }
                    else
                    if (line.startsWith('Returns ')) {
                        api.returns = {};

                        api.returns.textRaw = line.substring(8).trim();
                        api.returns.text = stripMdLinks(api.returns.textRaw);
                        const m3 = api.returns.text.match(boldPairRE); // /\*\*([^\*]+)\*\*[ \t]*/
                        if (m3) {
                            api.returns.type = convertEntities(m3[1]);
                            api.returns.desc = api.returns.text.substring(m3[0].length).trim();
                            // console.log('returns', {line, api})                    
                        }
                        else {
                            console.log('unknown return format', {line, param, api})                    
                        }
                    }
                    else 
                    if (line.trim().length) {
                        console.log('unknown line', line);
                    }
                }
            }
            if (Object.keys(api).length) {
                apis.push(api);
            }

            // console.log('apis', apis);
        }


        {
            // Save to generated
            const jsJsonDocsOld = fs.existsSync(jsJsonDestPath) ? fs.readFileSync(jsJsonDestPath, 'utf8') : '';
            const jsJsonDocsStr = JSON.stringify(jsJsonDocs, null, 4);
            if (jsJsonDocsOld != jsJsonDocsStr) {
                fs.writeFileSync(jsJsonDestPath, jsJsonDocsStr);
            }

            // Save dynamically to src/assets/files
            const filesObj = {
                contents: jsJsonDocsStr,
            };
            files['assets/files/jsDocs.json'] = filesObj;
        }


        // Copy javascript.md
        if (fs.existsSync(jsMdSourcePath)) {
            const jsMdDestOld = fs.existsSync(jsMdDestPath) ? fs.readFileSync(jsMdDestPath, 'utf8') : '';
            if (jsMdSourceOld != jsMdDestOld) {
                console.log('updated ' + jsMdDestPath);
                fs.writeFileSync(jsMdDestPath, jsMdSourceOld);
            }
        }

        return done();
    };
};
