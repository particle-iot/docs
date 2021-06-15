var Particle = require('particle-api-js');
var particle = new Particle();

const accessToken = process.env.PARTICLE_AUTH;
if (!accessToken) {
    console.log('You must specify the PARTICLE_AUTH environment variable');
    process.exit(1);
}

async function run() {
    const devices = await particle.listDevices({ auth: accessToken });

    for(const dev of devices.body) {
        if (dev.iccid) {
            console.log(dev.id + ',' + dev.iccid);
        }
    }
}

run();

