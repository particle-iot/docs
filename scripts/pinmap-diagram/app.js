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
    titleFontSize: '10px',
    featureColors: {
        altName: '#6D6E71',
        analogWritePWM: '#FACBCD',
        compareAltName: '#FFFFFF',
        compareName: '#FFFFFF',
        dac: '#F79868',
        hardwareADC: '#98CD67',
        hardwarePin: '#FFFFFF',
        i2c: '#70C9F2',
        isPower: '#CE3234',
        isControl: '#F6F06B',
        jtag: '#7B8FAE',
        name: '#6D6E71',
        num: '#E6AB00',
        serial: '#9695CA',
        spi: '#CCCCCC',
        swd: '#7B8FAE',
    },
    featureTextWhite: ['isPower', 'name', 'altName'],

};

// argon.svg
// scale to make height 500px width 221


async function generateArgon() {
    
    let options = Object.assign(Object.assign({}, optionsCommon), {
        platformName: 'Argon',
        // height="194.98106" width="86.125328"
        deviceImage: path.join(topDir, 'src/assets/images/argon.svg'),
        outputPath: path.join(topDir, 'src/assets/images/argon-pinout.svg'),
        // scale to make height 500px width 221
        deviceImageTransform: 'translate(375,0) scale(2.564)',
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
                xDir: -1,
                yDir: 0,
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
                xDir: +1,
                yDir: 0,
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



async function generatePhoton() {
    
    let options = Object.assign(Object.assign({}, optionsCommon), {
        platformName: 'Photon',
        // height=110.16 width 76.8
        deviceImage: path.join(topDir, 'src/assets/images/photon.svg'),
        outputPath: path.join(topDir, 'src/assets/images/photon-pinout.svg'),
        // scale to make height 500px width 221
        deviceImageTransform: 'translate(375,15) scale(2.55)',
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
                count: 12,
                xDir: -1,
                yDir: 0,
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
                        keys: ['serial', 'dac'],
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
                num: 13,
                x: 575,
                y: 340.6,
                numDelta: 1,
                xDelta: 0,
                yDelta: -24.6,
                count: 12,
                xDir: +1,
                yDir: 0,
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
                        keys: ['jtag'],
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


async function generateElectron() {
    
    let options = Object.assign(Object.assign({}, optionsCommon), {
        platformName: 'Electron',
        // height=110.16 width 76.8
        deviceImage: path.join(topDir, 'src/assets/images/electron.svg'),
        outputPath: path.join(topDir, 'src/assets/images/electron-pinout.svg'),
        // scale to make height 500px width 221
        deviceImageTransform: 'translate(375,17) scale(3.477)',
        width: 1000,
        height: 600,
        background: 'white',
        pins: [
            {   // Left side
                num: 1,
                x: 370,
                y: 70,
                numDelta: 1,
                xDelta: 0,
                yDelta: 24.6,
                count: 18,
                xDir: -1,
                yDir: 0,
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
                        keys: ['serial', 'dac'],
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
                num: 19,
                x: 580,
                y: 488.2,
                numDelta: 1,
                xDelta: 0,
                yDelta: -24.6,
                count: 24,
                xDir: +1,
                yDir: 0,
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
                        keys: ['jtag'],
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

async function generatePhoton2() {
    
    let options = Object.assign(Object.assign({}, optionsCommon), {
        platformName: 'Photon 2',
        // height="610" width="270"
        deviceImage: path.join(topDir, 'src/assets/images/photon2.svg'),
        outputPath: path.join(topDir, 'src/assets/images/photon-2-pinout.svg'),
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
                xDir: -1,
                yDir: 0,
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
                xDir: 1,
                yDir: 0,
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


async function generateP2(platformName) {
    
    let options = Object.assign(Object.assign({}, optionsCommon), {
        platformName,
        deviceImage: path.join(topDir, 'src/assets/images/p1-pin-blank.svg'),
        outputPath: path.join(topDir, 'src/assets/images/' + platformName.toLowerCase() + '-pinout.svg'),
        deviceImageTransform: 'translate(230,480) scale(0.1662)',
        width: 1400, 
        height:1200,
        background: 'white',
        pins: [
            {   // Bottom side
                num: 1,
                x: 541,
                y: 980,
                numDelta: 1,
                xDelta: 24.6,
                yDelta: 0,
                count: 15,
                xDir: 0,
                yDir: 1,
                columns: [
                    {
                        width: 20,
                        keys: ['num'],
                    },
                    {
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
                        keys: ['serial', 'dac'],
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
                x: 927,
                y: 926,
                numDelta: 1,
                xDelta: 0,
                yDelta: -24.6,
                count: 17,
                xDir: 1,
                yDir: 0,
                columns: [
                    {
                        width: 20,
                        keys: ['num'],
                    },
                    {
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
                        keys: ['serial', 'dac'],
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
            {   // Top side
                num: 33,
                x: 884,
                y: 476,
                numDelta: 1,
                xDelta: -24.6,
                yDelta: 0,
                count: 15,
                xDir: 0,
                yDir: -1,
                columns: [
                    {
                        width: 20,
                        keys: ['num'],
                    },
                    {
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
                        keys: ['serial', 'dac'],
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
            {   // Left side
                num: 48,
                x: 510,
                y: 532,
                numDelta: 1,
                xDelta: 0,
                yDelta: 24.6,
                count: 17,
                xDir: -1,
                yDir: 0,
                columns: [
                    {
                        width: 20,
                        keys: ['num'],
                    },
                    {
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
            },        ]
    });

    await pinmapDiagram.generate(options);
}


async function generateArgonToPhoton2(generateOptions) {
    
    let options = Object.assign(Object.assign({}, optionsCommon), {
        platformName: 'Photon 2',
        deviceImage: path.join(topDir, 'src/assets/images/photon2.svg'),
        outputPath: path.join(topDir, 'src/assets/images/' + generateOptions.outputFile),
        deviceImageTransform: 'translate(375,0) scale(0.8196)',
        width: 1000,
        height: 510,
        background: 'white',
        comparePlatform: 'Argon',
        compareKey: 'argonName',
        pins: [
            {   // Left side
                num: 1,
                x: 370,
                y: 70,
                numDelta: 1,
                xDelta: 0,
                yDelta: 24.6,
                count: 15,
                xDir: -1,
                yDir: 0,
                columns: [],
            },
            {   // Right side
                num: 16,
                x: 598,
                y: 439,
                numDelta: 1,
                xDelta: 0,
                yDelta: -24.6,
                count: 12,
                xDir: 1,
                yDir: 0,
                columns: [],
            },
        ]
    });

    const titlePositions = ['first', 'last'];
    for(let ii = 0; ii < options.pins.length; ii++) {
        options.pins[ii].columns.push({
            width: 30,
            keys: ['name'],
            titlePosition: titlePositions[ii],
            titleAfter: 'Photon 2',
        });
        options.pins[ii].columns.push({
            width: 30,
            keys: ['altName'],
        });
        if (generateOptions.feature) {
            options.pins[ii].columns.push({
                keys: [generateOptions.feature],
            });    
        }

        // Spacer
        options.pins[ii].columns.push({
            width: 20,
        });

        if (generateOptions.feature) {
            options.pins[ii].columns.push({
                keys: ['compare_' + generateOptions.feature],
            });    
        }

        options.pins[ii].columns.push({
            width: 30,
            keys: ['compareName'],
            titlePosition: titlePositions[ii],
            titleAfter: 'Argon',
        });
        options.pins[ii].columns.push({
            width: 30,
            keys: ['compare_altName'],
        });
    
    }


    await pinmapDiagram.generate(options);
}

generateArgon();

generatePhoton();

generateElectron();

generateP2('P1');

generateP2('P2');

generatePhoton2();

generateArgonToPhoton2({
    outputFile: 'photon-2-argon-comparison.svg'
});

generateArgonToPhoton2({
    outputFile: 'photon-2-argon-spi-comparison.svg',
    feature: 'spi',
});

generateArgonToPhoton2({
    outputFile: 'photon-2-argon-serial-comparison.svg',
    feature: 'serial',
});

generateArgonToPhoton2({
    outputFile: 'photon-2-argon-adc-comparison.svg',
    feature: 'hardwareADC',
});

generateArgonToPhoton2({
    outputFile: 'photon-2-argon-pwm-comparison.svg',
    feature: 'analogWritePWM',
});
