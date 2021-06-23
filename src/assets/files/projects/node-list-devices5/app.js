var Particle = require('particle-api-js');
var particle = new Particle();

const accessToken = process.env.PARTICLE_AUTH;
if (!accessToken) {
    console.log('You must specify the PARTICLE_AUTH environment variable');
    process.exit(1);
}

async function run() {
    const devices = await particle.listDevices({ auth: accessToken });

    const oldestTime = Date.parse('01 Jan 2021');

    for(const dev of devices.body) {
        const lastHeard = Date.parse(dev.last_heard);

        if (lastHeard < oldestTime) {
            console.log('name=' + dev.name + ' id=' + dev.id);
        }
    }
}

run();

