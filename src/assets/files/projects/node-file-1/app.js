const fs = require('fs');
const path = require('path');

const testFilePath = path.join(__dirname, 'testfile.txt');

const testFile = fs.readFileSync(testFilePath, 'utf8');

for(let line of testFile.split('\n')) {
    console.log(line);
}