var Particle = require('particle-api-js');
var particle = new Particle();

const helper = require('@particle/node-example-helper');

async function run() {
    // Authenticate the user and obtain the access token
    await helper.authenticate();

    try {
        // Get the list of devices
        const devices = await particle.listDevices({ auth: helper.auth });

        const oldestTime = Date.parse('01 Jan 2021');

        for(const dev of devices.body) {
            const lastHeard = Date.parse(dev.last_heard);

            if (lastHeard < oldestTime) {
                console.log('name=' + dev.name + ' id=' + dev.id);
            }
        }
    }
    catch(e) {
        console.log('exception getting device list', e);
    }
    helper.close();
}

run();

