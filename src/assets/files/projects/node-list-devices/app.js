var Particle = require('particle-api-js');
var particle = new Particle();

const accessToken = process.env.PARTICLE_AUTH;
if (!accessToken) {
    console.log('You must specify the PARTICLE_AUTH environment variable');
    process.exit(1);
}

particle.listDevices({ auth: accessToken }).then(
    function (devices) {
        console.log('Devices: ', devices);
    },
    function (err) {
        console.log('List devices call failed: ', err);
    }
);
