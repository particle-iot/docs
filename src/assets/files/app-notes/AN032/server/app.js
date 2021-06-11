// 1. Install dependencies
// 	npm install
// 
// 2. Set your auth token:
//  export AUTH_TOKEN=xxxxxxx
// See: https://docs.particle.io/reference/developer-tools/cli/#particle-token-create
//
// 3. Set the Device ID you want to control
//   export DEVICE_ID=xxxx
//
// 4. Run the program:
//	node app.js
//

var Particle = require('particle-api-js');
var particle = new Particle();

const fs = require('fs');
const path = require('path');
const net = require('net');

const argv = require('yargs')
    .usage('Usage: $0 [options]')
    .argv;


const token = process.env.AUTH_TOKEN || argv.authToken;
if (!token) {
    console.log("AUTH_TOKEN must be set in the environment or command line --auth-token");
    return 1;
}

const deviceId = process.env.DEVICE_ID || argv.deviceId;
if (!deviceId) {
    console.log("DEVICE_ID must be set in the environment or command line --device-id");
    return 1;
}

const port = process.env.PORT || argv.port || 3000;

const express = require('express');
const app = express();

const publicPath = path.join(__dirname, 'public');

app.use(express.json());

app.post('/led', function (req, res) {
    const arg = req.body.arg;

    particle.callFunction({ deviceId: deviceId, name: 'led', argument: arg, auth: token })
        .then(function (data) {
            res.json({ ok: true });
        }, function (err) {
            res.json({ ok: false, err });
        });
});

app.use('/', express.static(publicPath));


app.listen(port, function () {
    console.log('server: http://localhost:' + port);
});




