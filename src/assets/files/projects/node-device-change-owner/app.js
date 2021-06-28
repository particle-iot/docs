var Particle = require('particle-api-js');
var particle = new Particle();

var minimatch = require("minimatch");

const argv = require('yargs').argv

const fs = require('fs');
const path = require('path');

const accessTokenOld = process.env.PARTICLE_AUTH_OLD;
if (!accessTokenOld) {
    console.log('You must specify the PARTICLE_AUTH_OLD environment variable');
    process.exit(1);
}

const accessTokenNew = process.env.PARTICLE_AUTH_NEW;
if (!accessTokenNew) {
    console.log('You must specify the PARTICLE_AUTH_NEW environment variable');
    process.exit(1);
}

const statusPath = path.join(__dirname, 'status.json');
let status = {};
if (fs.existsSync(statusPath)) {
    status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
}

function saveStatus() {
    fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
}

if (argv.list) {
    listDevices(argv.list);
}

if (argv.run) {
    run();
}

async function listDevices(pattern) {

    const res = await particle.listDevices({ auth: accessTokenOld });

    if (argv.set) {
        // If you wanted set to replace the existing device list instead of adding to it,
        // uncomment this line:
        // status.devices = [];
    }
    
    for(let dev of res.body) {
        if (dev.name == null) {
            continue;
        }
        if (!minimatch(dev.name, pattern, { noglobstar: true, nocase: true })) {
            continue;
        }
        console.log(dev.name);
        if (argv.set) {
            status.devices.push({
                id: dev.id,
                name: dev.name
            });
        }
    }

    if (argv.set) {
        saveStatus();
    }    
}

async function run() {

    const deviceArray = (await particle.listDevices({ auth: accessTokenOld })).body;
    
    for(let statusDev of status.devices) {
        if (statusDev.done) {
            continue;
        }

        const match = deviceArray.filter(dev => (dev.id == statusDev.id));
        if (match.length == 0) {
            console.log('not in device list', statusDev);
            continue;
        }
        
        if (!match[0].online) {
            console.log('not online', statusDev);
            continue;
        }

        try {
            // Unclaim
            console.log('unclaiming ' + statusDev.name + ' ' + statusDev.id);
            await particle.removeDevice({ deviceId: statusDev.id, auth: accessTokenOld });
            statusDev.unclaimed = true;
            saveStatus();
        }
        catch(e) {
            console.log('unclaiming failed ' + statusDev.id, e);
            continue;
        }

        try {
            // Claim
            console.log('claiming ' + statusDev.name + ' ' + statusDev.id);
            await particle.claimDevice({ deviceId: statusDev.id, auth: accessTokenNew });

            statusDev.done = true;
            saveStatus();
        }
        catch(e) {
            console.log('claiming failed ' + statusDev.id, e);
        }
    }
}
