var Particle = require('particle-api-js');
var particle = new Particle();

const helper = require('@particle/node-example-helper');

async function run() {
    // Authenticate the user and obtain the access token
    await helper.authenticate();

    try {
        // Get the list of devices
        const devices = await particle.listDevices({ auth: helper.auth });

        console.log('deviceId,iccid');
        
        for(const dev of devices.body) {
            if (dev.iccid) {
                console.log(dev.id + ',' + dev.iccid);
            }
        }
    }
    catch(e) {
        console.log('exception getting device list', e);
    }
    helper.close();
}


run();

