const path = require('path');

const pinmapDiagram = require('./pinmap-diagram.js');

const topDir = path.normalize(path.join(__dirname, '..', '..'));

let optionsCommon = {
    pinInfo: path.join(topDir, 'src', 'assets', 'files', 'pinInfo.json'),
    xBox: 50,
    yBox: 16,
    xBoxSpacing: 4,
    xPinToBox: 10,
    fontFamily: 'Arial, Helvetica, sans-serif',
    boxFontSize: '8px',
    featureColors: {
        isPower: '#CE3234',
        isControl: '#F6F06B',
        gnd: '#040707',
        hardwareADC: '#98CD67',
        i2c: '#70C9F2',
        serial: '#9695CA',
        spi: '#CCCCCC',
        analogWritePWM: '#FACBCD',
        hardwarePin: '#ffffff',
        name: '#6D6E71',
        altName: '#6D6E71',
    },
    featureTextWhite: ['isPower', 'name', 'altName'],

};

async function generatePhoton2() {
    
    let options = Object.assign(Object.assign({}, optionsCommon), {
        platformName: 'Photon 2',
        // height="194.98106" width="86.125328"
        deviceImage: path.join(topDir, 'src/assets/images/argon.svg'),
        // scale to make height 500px width 221
        deviceImageTransform: 'translate(375,0) scale(2.5643)',
        width: 1000,
        height: 1000,
        pins: [
            {   // Left side
                num: 1,
                x: 370,
                y: 70,
                numDelta: 1,
                xDelta: 0,
                yDelta: 24.6,
                count: 15,
                xBar: -300,
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
                xBar: 300,
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
                        keys: ['isPower', 'isControl', 'i2c'],
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