const fs = require('fs');
const path = require('path');

let config = require('./config');

const helper = require('@particle/node-example-helper');
helper
    .withRootDir(__dirname)
    .withConfig(config);
 

async function run() {
    await helper.authenticate();

    


    helper.close();
}


run();
