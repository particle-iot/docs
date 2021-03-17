const path = require('path');

const carriersUpdate = require('./carriers-update.js');

carriersUpdate.doUpdate(path.resolve(__dirname, '..'));
