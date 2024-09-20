'use strict';

var fs = require('fs');
var path = require('path');

// Set this to true to save additional unprocessed data to jsDocs.json for debugging parsing errors.
// Turn it back off before committing! 
const saveRaw = false;

function stripMdLinks(s) {
    return s.replaceAll(/\[([^\]]+)\]\([^\)]*\)/g, '$1');
}

function parseMdLinks(s) {
    let result = {};

    const m1 = s.match(/\[([^\]]+)\]\(([^\)]*)\)/);
    if (m1) {
        result.text = m1[1];

        const m2 = m1[2].match(/([^ ]+) "([^"]*)"/)
        if (m2) {
            result.link = m2[1];
            result.alt = m2[2];
        }
        else {
            result.link = m1[2];
        }

        const m3 = m1[1].match(/:([0-9]+)-([0-9]+)/);
        if (m3) {
            result.lines = [parseInt(m3[1]), parseInt(m3[2])];
        }

        if (saveRaw) {
            result.rawLink = s;
            // result.rawMatch1 = m1;
            // result.rawMatch2 = m2;
        }
    }

    return result;
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

        // console.log('jsapidoc', { generatedDir, jsMdSourcePath, jsMdDestPath, jsJsonDestPath, options });

        let jsJsonDocsStr;
        let jsMdSourceStr;

        if (fs.existsSync(jsMdSourcePath)) {
            jsMdSourceStr = fs.readFileSync(jsMdSourcePath, 'utf8');

            // Generate jsDocsJson here
            let jsJsonDocs = {};
    
            // Parse md file
            {
                let headings = ['', '', ''];
                let state = '';
                let apis = [];
                let api = {};
                let param = {};
    
                const saveParam = function() {
                    if (typeof api[state] != 'undefined' && typeof param.name != 'undefined' && param.name != '') {
                        api[state].push(param);
                    }
                    param = {};
                }
                const saveApi = function() {
                    saveParam();
                    if (Object.keys(api).length) {
                        apis.push(api);
                    }
                }
    
                const boldPairRE = /\*\*([^\*]+)\*\*[ \t]*/;
    
                const lineArray = jsMdSourceStr.split('\n');
                for(let lineNum = 1; lineNum <= lineArray.length; lineNum++) {
                    const line  = lineArray[lineNum - 1];
                    const m = line.match(/^(#+) (.*)/);
                    if (m) {
                        const level = m[1].length;
                        headings.splice(level);
                        headings[level] = m[2];
                        // console.log('headings', headings);
                        state = 'heading'; 
    
                        if (headings[2] == 'Particle') {
                            saveApi();
                
                            api = {
                                name: headings[3],
                                lineNum,
                            };
                        }
                    }
    
                    if (line.startsWith('**Properties**')) {
                        saveParam();
        
                        state = 'properties';
                        api.properties = [];
                    }
                    else
                    if (line.startsWith('**Parameters**')) {
                        saveParam();
    
                        state = 'parameters';
                        api.parameters = [];
                    }
                    else
                    if (state == 'parameters' || state == 'properties') {
                        const m2 = line.match(/^([ \t]*)-[ \t]+`([_$A-Za-z0-9\.]+)`[ \t]*/);
                        if (m2) {
                            saveParam();
                            param = {};
            
                            param.indent = m2[1].length;    
                            param.name = m2[2];
                            param.descRaw = line.substring(m2[0].length);
                            param.descText = stripMdLinks(param.descRaw).trim();
                            param.lineNum = lineNum;
                            
                            if (param.descText.length == 0) {
                                param.type = '';
                                param.optional = false;
                            }
                            else {
                                const m3 = param.descText.match(boldPairRE); // /\*\*([^\*]+)\*\*[ \t]*/
                                if (m3) {
                                    param.typeRaw = m3[1];
                                    if (param.typeRaw.endsWith('?')) {
                                        param.type = param.typeRaw.substring(0, param.typeRaw.length - 1);
                                        param.optional = true;
                                    }
                                    else {
                                        param.type = param.typeRaw;
                                        param.optional = false;
                                    }
        
                                    param.desc = param.descText.substring(m3[0].length);
                                    // console.log('param', {param, api});
                                    
                                }
                                else {
                                    // console.log('unknown param format', {param, m2, api})                    
                                    param.desc = param.descText;
                                }
        
                            }
    
                            if (!saveRaw) {
                                delete param.descRaw;
                                delete param.descText;                                
                                delete param.typeRaw;
                                delete param.lineNum;
                            }
                        }
                        else
                        if (line.startsWith('Returns ')) {
                            state = 'returns';
                        }
                        else {
                            const m3 = line.match(/[ \t]+/)
                            if (m3) {
                                if (typeof param.desc != 'undefined') {
                                    param.desc += '\n' + line.trim();
                                }
                                else {
                                    console.log('continuation line no desc', {param, line});
                                }
                            }
                            else 
                            if (line.trim().length) {
                                console.log('unknown line', line);
                            }
                        }
                    }
    
                    if (state == 'returns') {
                        // This can't be an else because we enter this state from parameters                    
                        if (line.startsWith('Returns ')) {
                            saveParam();
    
                            api.returns = {
                                lineNum,
                            };
    
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
    
                            if (!saveRaw) {
                                delete api.returns.textRaw;
                                delete api.returns.text;
                                delete api.returns.lineNum;
                            }      
                        }
                        else
                        if (line.trim().length == 0 || line.startsWith('##')) {
                            state = 'unknown';
                        }
                        else {
                            api.returns.desc += '\n' + line.trim();
                        }
                    }
    
                    if (state == 'heading') {
                        if (line.startsWith('[src/Particle.js')) {
                            // Source code link
                            api.sourceLink = parseMdLinks(line);
                        }
                        else
                        if (!line.startsWith('#') && line.trim().length > 0) {
                            if (typeof api.text != 'undefined') {
                                if (api.text.length) {
                                    api.text += '\n';
                                    api.textRaw += '\n';
                                }
                            }
                            else {
                                api.text = '';          
                                api.textRaw = '';                  
                            }
    
                            api.text += stripMdLinks(line.trim());
                            api.textRaw += line.trim();
                        }
                        
                    }
    
                }
                saveApi();
                // console.log('apis', apis);
    
                // Remove the outer wrapper (first element of apis)
                apis.splice(0, 1);
    
                // Nest the parameter objects
                for(const api of apis) {
                    for(const key of ['parameters', 'properties']) {
                        if (typeof api[key] == 'undefined') {
                            continue;
                        }
    
                        let topObj = {
                            fields: [],
                        };
                        let curObj = null;
    
                        for(let ii = 0; ii < api[key].length; ii++) {
                            const param = api[key][ii];
    
                            if (typeof param.indent == 'undefined') {
                                console.log('missing indent', param);
                                continue;
                            }
                            const indent = param.indent;
                            if (!saveRaw) {
                                delete param.indent;
                            }
                            
                            if (indent == 0) {
                                if (curObj) {
                                    topObj.fields.push(curObj);
                                }
                                curObj = param;
                            }
                            else
                            if (!curObj) {
                                console.log('indent != 0 but curObj is not set', param);
                            }
                            else {
                                if (typeof curObj.fields == 'undefined') {
                                    curObj.fields = [];
                                }
                                const nameParts = param.name.split('.');
                                if (nameParts.length == 2) {
                                    if (nameParts[0] == curObj.name) {
                                        param.nameFull = param.name;
                                        param.name = nameParts[1];
                                    }
                                    else {
                                        console.log('nested name mismatch', {curObj, param});
                                    }
                                }
                                curObj.fields.push(param);
                            }
                        }
    
                        if (curObj && typeof curObj.fields != 'undefined' && curObj.fields.length > 0) {
                            topObj.fields.push(curObj);
                        }
    
                        if (saveRaw) {
                            topObj.rawArray = api[key];
                        }
                        api[key] = topObj;
    
                        
                    }    
                    if (!saveRaw) {
                        delete api.lineNum;
                        delete api.textRaw;
                    }
                }
    
                jsJsonDocs.apis = apis;
    
            }
    
            // Save to generated
            const jsJsonDocsOld = fs.existsSync(jsJsonDestPath) ? fs.readFileSync(jsJsonDestPath, 'utf8') : '';
            jsJsonDocsStr = JSON.stringify(jsJsonDocs, null, 4);
            if (jsJsonDocsOld != jsJsonDocsStr) {
                fs.writeFileSync(jsJsonDestPath, jsJsonDocsStr);
            }

            // Copy javascript.md
            const jsMdDestOld = fs.existsSync(jsMdDestPath) ? fs.readFileSync(jsMdDestPath, 'utf8') : '';
            if (jsMdSourceStr != jsMdDestOld) {
                console.log('updated ' + jsMdDestPath);
                fs.writeFileSync(jsMdDestPath, jsMdSourceStr);
            }
        }
        else {
            // This file is required to be committed, so if this fails its a fatal error
            jsJsonDocsStr = fs.readFileSync(jsJsonDestPath, 'utf8');
        }

        // Save dynamically to src/assets/files
        const filesObj = {
            contents: jsJsonDocsStr,
        };
        files['assets/files/jsDocs.json'] = filesObj;

        return done();
    };
};
