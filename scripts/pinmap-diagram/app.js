const path = require('path');

const pinmapDiagram = require('./pinmap-diagram.js');

const topDir = path.normalize(path.join(__dirname, '..', '..'));

pinmapDiagram.generateAll({
    topDir,
    pinInfo: path.normalize(path.join(topDir, 'src', 'assets', 'files', 'pinInfo.json')),
})
