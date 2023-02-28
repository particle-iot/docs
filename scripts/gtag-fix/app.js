#!/usr/bin/env node
const path = require('path');
const fs = require('fs');


const topDir = path.join(__dirname, '..', '..');

const jsDir = path.join(topDir, 'src/assets/js');
console.log('jsDir ' + jsDir);
for(const file of fs.readdirSync(jsDir)) {
    if (!file.endsWith('.js')) {
        continue;
    }
    const origFile = fs.readFileSync(path.join(jsDir, file), 'utf8');

    let newFile = '';
    for(let line of origFile.split(/\n/)) {
        const gtagIndex = line.indexOf('gtag(');
        if (gtagIndex >= 0) {
            const linePrefix = line.substring(0, gtagIndex);
            
            const paramStartIndex = gtagIndex + 5;
            const paramEndIndex = line.lastIndexOf(')');
            if (paramEndIndex >= paramStartIndex) {

                const paramStr = line.substring(paramStartIndex, paramEndIndex);

                const linePrefix = line.substring(0, gtagIndex);
                const lineSuffix = line.substring(paramEndIndex + 1);

                const params = paramStr.split(',');
                for(let ii = 0; ii < params.length; ii++) {
                    params[ii] = params[ii].trim();
                }
                if (params.length >= 4) {
                    if (params[0] == "'send'" && params[1] == "'event'") {
                        // console.log('params', params);    
    
                        // ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
                        // 2 eventCategory  -> event_category
                        // 3 eventAction -> event_action
                        // 4 eventLabel -> event_label
                        // 5 eventValue -> event_value
   
                        switch(params.length) {
                            case 4:
                                line = linePrefix + "gtag('event', " + params[3] + ", {'event_category':" + params[2] + "})" + lineSuffix;
                                break;
                                
                            case 5:
                                line = linePrefix + "gtag('event', " + params[3] + ", {'event_category':" + params[2] + ", 'event_label':" + params[4] + "})" + lineSuffix;
                                break;
                                
                            default:
                                console.log('too many parameters', params);                        
                                break;
                        }

                        console.log('updated line: ' + line);
                    }
                    else {
                        console.log('not send event params', params);    
                    }
                }
                else {
                    console.log('not enough parameters', params);
                }
            }   
            else {
                console.log('missing end )');
            }         
        }
        newFile += line + '\n';
    }

    if (newFile.trim() != origFile.trim()) {
        console.log('changed ' + file);
        fs.writeFileSync(path.join(jsDir, file), newFile);
    }
}
