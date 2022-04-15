const path = require('path');

const pinmapDiagram = require('./pinmap-diagram.js');

const topDir = path.normalize(path.join(__dirname, '..', '..'));

let optionsCommon = {
    pinInfo: path.join(topDir, 'src', 'assets', 'files', 'pinInfo.json'),
    xBox: 55,
    yBox: 16,
    xBoxSpacing: 4,
    xPinToBox: 10,
    fontFamily: 'Arial, Helvetica, sans-serif',
    boxFontSize: '8px',
    featureColors: {
        altName: '#6D6E71',
        analogWritePWM: '#FACBCD',
        dac: '#F79868',
        hardwareADC: '#98CD67',
        hardwarePin: '#ffffff',
        i2c: '#70C9F2',
        isPower: '#CE3234',
        isControl: '#F6F06B',
        name: '#6D6E71',
        serial: '#9695CA',
        spi: '#CCCCCC',
        swd: '#7B8FAE',
    },
    featureTextWhite: ['isPower', 'name', 'altName'],

};

// argon.svg
// height="194.98106" width="86.125328"
// scale to make height 500px width 221

async function generatePhoton2() {
    
    let options = Object.assign(Object.assign({}, optionsCommon), {
        platformName: 'Photon 2',
        // height="610" width="270"
        deviceImage: path.join(topDir, 'src/assets/images/photon2.svg'),
        // scale to make height 500px width 221
        deviceImageTransform: 'translate(375,0) scale(0.8196)',
        width: 1000,
        height: 510,
        background: 'white',
        pins: [
            {   // Left side
                num: 1,
                x: 370,
                y: 70,
                numDelta: 1,
                xDelta: 0,
                yDelta: 24.6,
                count: 15,
                xBar: -305,
                yBar: 0,
                columns: [
                    {
                        width: 30,
                        keys: ['name'],
                    },
                    {
                        width: 30,
                        keys: ['altName'],
                    },
                    {
                        keys: ['isPower', 'isControl', 'hardwareADC'],
                    },
                    {
                        keys: ['serial'],
                    },
                    {
                        keys: ['spi'],
                    },
                    {
                        keys: ['analogWritePWM'],
                    },
                    {
                        keys: ['hardwarePin'],
                    },
                ],
            },
            {   // Right side
                num: 16,
                x: 598,
                y: 439,
                numDelta: 1,
                xDelta: 0,
                yDelta: -24.6,
                count: 12,
                xBar: 305,
                yBar: 0,
                columns: [
                    {
                        width: 30,
                        keys: ['name'],
                    },
                    {
                        width: 30,
                        keys: ['altName'],
                    },
                    {
                        keys: ['isPower', 'isControl', 'i2c', 'swd'],
                    },
                    {
                        keys: ['serial'],
                    },
                    {
                        keys: ['spi', 'hardwareADC'],
                    },
                    {
                        keys: ['analogWritePWM'],
                    },
                    {
                        keys: ['hardwarePin'],
                    },
                ],
            },
        ]
    });

    await pinmapDiagram.generate(options);
}

generatePhoton2();