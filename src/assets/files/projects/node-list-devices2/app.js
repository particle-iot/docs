var Particle = require('particle-api-js');
var particle = new Particle();

const accessToken = process.env.PARTICLE_AUTH;
if (!accessToken) {
    console.log('You must specify the PARTICLE_AUTH environment variable');
    process.exit(1);
}

function run() {
    particle.listDevices({ auth: accessToken }).then(
        function (devices) {
            for(const dev of devices.body) {
                console.log('name=' + dev.name + ' id=' + dev.id);
            }
        },
        function (err) {
            console.log('List devices call failed: ', err);
        }
    );    
}

run();

