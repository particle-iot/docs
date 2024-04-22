const { add } = require("lodash");


function metalsmith(options) {

    const codeBlocks = [
        {
            name: 'mermaid',
            includeDefinitions: ['mermaid'],
        },
    ];

    return function (files, metalsmith, done) {
        
        for(const def of codeBlocks) {
            def.re = new RegExp('^```' + def.name);
        }

        for(const filePath in files) {
            if (!filePath.endsWith('.md')) {
                continue;
            }

            const f = files[filePath];
            if (f.contents) {
                const stringContents = f.contents.toString();
                
                for(const line of stringContents.split('\n')) {
                    let addDefinitions = [];

                    for(const def of codeBlocks) {
                        const m = line.match(def.re);
                        if (m) {
                            for(const d of def.includeDefinitions) {
                                if (!addDefinitions.includes(d)) {
                                    addDefinitions.push(d);
                                }
                            }                        
                        }
                    }

                    if (addDefinitions.length) {
                        if (!f.includeDefinitions) {
                            f.includeDefinitions = [];
                        }

                        for(const d of addDefinitions) {
                            if (!f.includeDefinitions.includes(d)) {
                                f.includeDefinitions.push(d);
                            }    
                        }
                    }

                }
            }
            else {
                // console.log('no contents ' + filePath);
            }
        }
        
        done();
    };
}

module.exports = {
    metalsmith,
};
