const path = require('path');

const diagram = require('./pinmap-diagram.js');

const topDir = path.normalize(path.join(__dirname, '..', '..'));

let options = {
    topDir,
    pinInfo: path.normalize(path.join(topDir, 'src', 'assets', 'files', 'pinInfo.json')),
};

diagram.generateAll(options);

diagram.cleanPinInfo(options);