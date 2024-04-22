

function metalsmith(options) {
    return function (files, metalsmith, done) {
        
        for(const filePath in files) {
            if (!filePath.endsWith('.md')) {
                continue;
            }

            const f = files[filePath];
            if (f.contents) {
                const stringContents = f.contents.toString();
                
                for(const line of stringContents.split('\n')) {
                    const m = line.match(/^```mermaid/);
                    if (m) {

                        if (!files[filePath].includeDefinitions) {
                            files[filePath].includeDefinitions = [];
                        }

                        if (!files[filePath].includeDefinitions.includes('mermaid')) {
                            files[filePath].includeDefinitions.push('mermaid');
                        }

                        // console.log('is mermaid ' + filePath, files[filePath]);
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
