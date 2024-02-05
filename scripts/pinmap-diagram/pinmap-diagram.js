const fs = require('fs');
const path = require('path');

const svg = require('./svg');

(function(diagram) {
    
    
    diagram.expandMorePins = function(pins) {
        for(const p of pins) {
            if (p.morePins) {
                for(const n of p.morePins) {
                    const obj = Object.assign({}, p);
                    delete obj.morePins;
                    obj.num = n;
                    pins.push(obj);
                }
            }
        }
    };

    diagram.generate = async function(options, files) {
        // console.log('generate', options);

        // Find platform object
        diagram.pinInfo = JSON.parse(fs.readFileSync(options.pinInfo, 'utf8'));
        diagram.platformInfo = diagram.pinInfo.platforms.find(e => e.name == options.platformName);
        if (!diagram.platformInfo) {
            console.log('unknown platformName ' + options.platformName);
            return;
        }
        // diagram.platformInfo contains array "pins" and object "diagram"
        // diagram.platformInfo.diagram objects contain array "columns"

        diagram.expandMorePins(diagram.platformInfo.pins);

        if (options.pinIncludeFn) {
            for(let ii = 0; ii < diagram.platformInfo.pins.length; ii++) {
                if (!options.pinIncludeFn(diagram.platformInfo.pins[ii])) {
                    // Remove
                    diagram.platformInfo.pins.splice(ii, 1);
                    ii--;
                }
            }
        }

        if (options.removeLiPin) {
            for(let p of diagram.platformInfo.pins) {
                if (p.name == 'LI+') {
                    p.name = 'NC';
                    p.desc = 'Not connected';
                    p.isPower = false;
                }
            }
            /*
            for(let ii = 0; ii < diagram.platformInfo.pins.length; ii++) {
                if (diagram.platformInfo.pins[ii].name == 'LI+') {
                    diagram.platformInfo.pins[ii].name = 'NC';
                    diagram.platformInfo.pins[ii].desc = 'Not connected';
                }
            }
            */
        }

        if (options.comparePlatform) {
            diagram.comparePlatformInfo = diagram.pinInfo.platforms.find(e => e.name == options.comparePlatform);            
            diagram.expandMorePins(diagram.comparePlatformInfo.pins);
        }
        else {
            diagram.comparePlatformInfo = null;
        }

        var draw = svg.svg({width:options.width, height:options.height});

        if (options.background) {
            draw.rect({
                x: 0,
                y: 0,
                width: options.width,
                height: options.height,
                fill: options.background,
            });    
        }
        
        if (options.deviceImage) {
            draw.g({
                transform: options.deviceImageTransform,
            }).svg({}, options.deviceImage);    
        }

        for(const p of options.pins) {
            
            let x = p.x;
            let y = p.y;
            let num = p.num;

            for(let ii = 0; ii < p.count; ii++) {
                // console.log('x=' + x + ' y=' + y);

                let info = diagram.platformInfo.pins.find(e => e.num == num);
                if (info) {
                    if (options.comparePlatform) {
                        let compareName = info[options.compareKey] || info.name;

                        info.compareName = compareName;
                        const comparisonInfo = diagram.comparePlatformInfo.pins.find(e => e.name == compareName);
                        if (comparisonInfo) {
                            for(const key in comparisonInfo) {
                                info['compare_' + key] = comparisonInfo[key];
                            }
                        }
                    }
                    // console.log('info', info);

                    let xBox = 0;
                    let dir;
                    let rotateTransform = '';
                    
                    if (p.xDir) {
                        dir = p.xDir;
                    }
                    else {
                        dir = p.yDir;
                        rotateTransform = 'rotate(90) ';
                    }
    
                    let xBar = 0;
    
                    let group = draw.g({
                        transform: 'translate(' + x + ',' + y +') ' + rotateTransform
                    });
    
                    for(let jj = 0; jj < p.columns.length; jj++) {
                        if (p.columns[jj].extraSpaceBefore) {
                            xBox += dir * p.columns[jj].extraSpaceBefore;
                        }

                        let width = options.xBox;
                        if (p.columns[jj].width) {
                            width = p.columns[jj].width;
                        }
                        if (dir < 0) {
                            xBox -= width;
                        }
                        let rectX = xBox;
                        let rectY = -options.yBox / 2;
                        
                        if (p.columns[jj].keys) {
                            for(let kk = 0; kk < p.columns[jj].keys.length; kk++) {
                                let key = p.columns[jj].keys[kk];
        
                                let text = info[key];
                                if (key == 'analogWritePWM') {
                                    if (info['hardwareTimer']) {
                                        text = info['hardwareTimer'];
                                    }
                                    else if (info[key]) {
                                        text = 'PWM';
                                    }
                                }
                                if (key == 'compare_analogWritePWM') {
                                    if (info['compare_hardwareTimer']) {
                                        text = info['compare_hardwareTimer'];
                                    }
                                    else if (info[key]) {
                                        text = 'PWM';
                                    }
                                }
                                if (text === true) {
                                    text = info.name;
                                }
                                
                                if (text && typeof text === 'string') {
                                    let offset = text.indexOf('|');
                                    if (offset >= 0) {
                                        text = text.substring(0, offset);
                                    }    
                                }
                                else 
                                if (typeof text === 'number') {
                                    if (options.numAdjust) {
                                        text += options.numAdjust;
                                    }
                                    text = text.toString();
                                }
                                        
                                if (text) {
                                    if (key == 'isPower' && text == 'GND') {
                                        key = 'isGnd';
                                    }

                                    let bgColor = options.featureColors[key];
                                    if (!bgColor) {
                                        bgColor = options.featureColors['default'];
                                        if (!bgColor) {
                                            bgColor = 'white';
                                        }
                                    }
                                    let textColor = options.featureTextWhite.includes(key) ? 'white' : 'black';
                                    
                                    if (dir < 0) {
                                        group.line({
                                            x1: xBar, 
                                            y1: 0,
                                            x2: rectX + width, 
                                            y2: 0,
                                            stroke: 'black',
                                            'stroke-width': 1,
                                        });        
                                        xBar = rectX;
                                    }
                                    else {
                                        group.line({
                                            x1: xBar, 
                                            y1: 0,
                                            x2: rectX, 
                                            y2: 0,
                                            stroke: 'black',
                                            'stroke-width': 1,
                                        });        
                                        xBar = rectX + width;
                                    }
                                        
    
                                    group.rect({
                                        x: rectX,
                                        y: rectY,
                                        width: width,
                                        height: options.yBox,
                                        stroke: 'black',
                                        fill: bgColor,
                                    });
                
        
                                    group.text({
                                        x: rectX + width / 2,
                                        y: rectY + options.yBox / 2,
                                        'text-anchor': 'middle',
                                        'dominant-baseline': 'middle',
                                        'font-family': options.fontFamily,
                                        'font-size': options.boxFontSize,
                                        fill: textColor,
                                    }, text);        
    
                                    break; 
                                }
    
                            }
                        }

                        if (dir > 0) {
                            xBox += width;
                        }

                        if (p.columns[jj].titlePosition) {
                            let showTitle = false;

                            if (p.columns[jj].titlePosition == 'first') {
                                if (ii == 0) {
                                    showTitle = true;
                                }
                            }
                            else 
                            if (p.columns[jj].titlePosition == 'last') {
                                if (ii == (p.count - 1)) {
                                    showTitle = true;
                                }
                            }
                            if (showTitle) {
                                if (p.columns[jj].titleAbove) {
                                    group.text({
                                        x: xBox + width / 2,
                                        y: -options.yBox,
                                        'text-anchor': 'middle',
                                        'dominant-baseline': 'bottom',
                                        'font-family': options.fontFamily,
                                        'font-size': options.titleFontSize,
                                        fill: 'black',
                                    }, p.columns[jj].titleAbove);            
                                }
                                
                                if (p.columns[jj].titleAfter) {
                                    group.text({
                                        x: xBox,
                                        y: -options.yBox,
                                        'text-anchor': 'middle',
                                        'dominant-baseline': 'bottom',
                                        'font-family': options.fontFamily,
                                        'font-size': options.titleFontSize,
                                        fill: 'black',
                                    }, p.columns[jj].titleAfter);            
                                }
                            }                        
                        }



                        xBox += dir * options.xBoxSpacing;
                        if (p.columns[jj].extraSpaceAfter) {
                            xBox += dir * p.columns[jj].extraSpaceAfter;
                        }

                    }
                }                

                if (!options.incrementFn || options.incrementFn(num)) {
                    x += p.xDelta;
                    y += p.yDelta;
                }
                num += p.numDelta;    
            }    
        }

        const newContents = draw.render();
        let saveFile = false;

        const outputPath = path.join(options.topDir, 'src', options.outputPath);

        if (fs.existsSync(outputPath)) {
            const oldContents = fs.readFileSync(outputPath, 'utf8');
            if (oldContents != newContents) {
                saveFile = true;
            }
        }
        else {
            saveFile = true;
        }

        if (saveFile) {
            fs.writeFileSync(outputPath, newContents);
            if (files && files[options.outputPath]) {
                files[options.outputPath].contents = Buffer.from(newContents, 'utf8');
            }
        }
        

    };



    diagram.optionsCommon = {
        xBox: 55,
        yBox: 16,
        xBoxSpacing: 4,
        xPinToBox: 10,
        fontFamily: 'Arial, Helvetica, sans-serif',
        boxFontSize: '8px',
        titleFontSize: '10px',
        featureColors: {
            altName: '#5CECFF', // ParticleBlue_400 (old: dark gray)
            analogWritePWM: '#007580', // ParticleBlue_800: (old: pink) 
            compareAltName: '#E2E4EB', // Gray_200 (old: white)
            compareName: '#E2E4EB', // Gray_200 (old: white)
            dac: '#FFADBD', // Watermelon_400 (old: orange)
            default: '#E2E4EB', // Gray_200 
            hardwareADC: '#BA70C6', // Scale_Poor_Violet (old: green)
            hardwarePin: '#BBBDC4', // Gray_300 (old: white)
            i2c: '#B0E5C9', // Mint_500 (old: light blue)
            isGnd: '#01131D', // Midnight_800 (old: black)
            isPower: '#B80023', // Watermelon_900 old: red (except for GND, see isGND)
            isControl: '#FFE949', // State_Yellow_500 (old: yellow mode, reset, etc.)
            jtag: '#858A9B', // Gray_400 (old: blueish-gray same as swd)
            m2Pin: '#F5F6FA', // COLOR_Gray_100
            name: '#00E1FF', // ParticleBlue_500 (old: dark gray)
            num: '#E6AB00', // (old: gold color)
            p2pin: '#E6AB00', // (old: gold)
            p2Pin: '#E6AB00', // (old: gold)
            serial: '#AFE4EE', // Sky_600 (old: periwinkle)
            spi: '#36CE7E', // Mint_800 (old: light gray)
            swd: '#858A9B', // Gray_400 (old: blueish-gray same as jtag)
            somPin: '#FF9F61', // Tangerine_400 (old: peach)
        },
        featureTextWhite: ['isPower', 'isGnd', 'analogWritePWM'],
    };


    diagram.generateArgon  = async function (generateOptions, files) {
        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'Argon',
            // height="194.98106" width="86.125328"
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/argon.svg'),
            outputPath: 'assets/images/argon-pinout.svg',
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

        await diagram.generate(options, files);
    }



    diagram.generatePhoton = async function (generateOptions, files) {
        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'Photon',
            // height=110.16 width 76.8
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/photon.svg'),
            outputPath: 'assets/images/photon-pinout.svg',
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

        await diagram.generate(options, files);
    }


    diagram.generateElectron = async function(generateOptions, files) {
        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'Electron',
            // height=110.16 width 76.8
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/electron.svg'),
            outputPath: 'assets/images/electron-pinout.svg',
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

        await diagram.generate(options, files);
    }

    diagram.generateESeries = async function(generateOptions, files) {
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'E Series',
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/e-series.svg'),
            outputPath: 'assets/images/e-series-pinout.svg',
            // scale to make height 500px width 221
            deviceImageTransform: 'translate(420,414) scale(1.04)',
            width: 1300,
            height: 1000,
            background: 'white',
            pins: [
                {   // Left side
                    num: 1,
                    x: 420,
                    y: 930,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: -24.6,
                    count: 20,
                    xDir: -1,
                    yDir: 0,
                    columns: [
                        {
                            width: 30,
                            keys: ['num'],
                        },
                        {
                            width: 50,
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
                    num: 21,
                    x: 453,
                    y: 420,
                    numDelta: 1,
                    xDelta: 24.6,
                    yDelta: 0,
                    count: 17,
                    xDir: 0,
                    yDir: -1,
                    columns: [
                        {
                            width: 30,
                            keys: ['num'],
                        },
                        {
                            width: 50,
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
                    num: 38,
                    x: 878,
                    y: 463,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: 24.6,
                    count: 20,
                    xDir: 1,
                    yDir: 0,
                    columns: [
                        {
                            width: 30,
                            keys: ['num'],
                        },
                        {
                            width: 50,
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
            ]
        });

        await diagram.generate(options, files);
    };


    diagram.generateE404X = async function(generateOptions, files) {
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'E404X',
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/e404x.svg'),
            outputPath: 'assets/images/e404x-pinout.svg',
            // scale to make height 500px width 221
            deviceImageTransform: 'translate(420,414) scale(1.04)',
            width: 1000,
            height: 1000,
            background: 'white',
            pins: [
                {   // Left side
                    num: 1,
                    x: 420,
                    y: 930,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: -24.6,
                    count: 20,
                    xDir: -1,
                    yDir: 0,
                    columns: [
                        {
                            width: 30,
                            keys: ['num'],
                        },
                        {
                            width: 50,
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
                    num: 21,
                    x: 453,
                    y: 420,
                    numDelta: 1,
                    xDelta: 24.6,
                    yDelta: 0,
                    count: 17,
                    xDir: 0,
                    yDir: -1,
                    columns: [
                        {
                            width: 30,
                            keys: ['num'],
                        },
                        {
                            width: 50,
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
                    num: 38,
                    x: 878,
                    y: 463,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: 24.6,
                    count: 20,
                    xDir: 1,
                    yDir: 0,
                    columns: [
                        {
                            width: 30,
                            keys: ['num'],
                        },
                        {
                            width: 50,
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
            ]
        });

        await diagram.generate(options, files);
    };

    diagram.generateM2SoM = async function(generateOptions, files) {        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: generateOptions.platformName,
            // deviceImage: 
            outputPath: generateOptions.outputPath,
            width: 1030,
            height: 650,
            background: 'white',
            pins: [
                {   // Left side
                    num: 2,
                    x: 500,
                    y: 30,
                    numDelta: 2,
                    xDelta: 0,
                    yDelta: 16,
                    count: 75,
                    xDir: -1,
                    yDir: 0,
                    columns: [
                        {
                            width: 30,
                            keys: ['num'],
                        },
                        {
                            width: 60,
                            keys: ['somPin'],
                        },
                        {
                            width: 60,
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
                {   // Right side
                    num: 1,
                    x: 530,
                    y: 30,
                    numDelta: 2,
                    xDelta: 0,
                    yDelta: 16,
                    count: 75,
                    xDir: 1,
                    yDir: 0,
                    columns: [
                        {
                            width: 30,
                            keys: ['num'],
                        },
                        {
                            width: 60,
                            keys: ['somPin'],
                        },
                        {
                            width: 60,
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
            ],
            incrementFn: function(num) {
                return num != 25;
            },
        });

        await diagram.generate(options, files);
    };


    diagram.generateM2Eval = async function(generateOptions, files) {        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: generateOptions.platformName,
            // deviceImage: 
            outputPath: generateOptions.outputPath,
            width: 1030,
            height: 650,
            background: 'white',
            pins: [
                {   // Left side
                    num: 2,
                    x: 500,
                    y: 30,
                    numDelta: 2,
                    xDelta: 0,
                    yDelta: 16,
                    count: 60,
                    xDir: -1,
                    yDir: 0,
                    columns: [
                        {
                            width: 30,
                            keys: ['num'],
                        },
                        {
                            width: 60,
                            keys: ['name'],
                        },
                        {
                            width: 60,
                            keys: ['altName'],
                        },
                        {
                            keys: ['isControl', 'i2c', 'swd'],
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
                        {
                            width: 30,
                            keys: ['m2Pin'],
                        },
                    ],
                },
                {   // Right side
                    num: 1,
                    x: 504,
                    y: 30,
                    numDelta: 2,
                    xDelta: 0,
                    yDelta: 16,
                    count: 60,
                    xDir: 1,
                    yDir: 0,
                    columns: [
                        {
                            width: 30,
                            keys: ['num'],
                        },
                        {
                            width: 60,
                            keys: ['name'],
                        },
                        {
                            width: 60,
                            keys: ['altName'],
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
                        {
                            width: 30,
                            keys: ['m2Pin'],
                        },
                    ],
                },
            ],
            incrementFn: function(num) {
                return num != 25;
            },
        });

        await diagram.generate(options, files);
    };


    diagram.generatePhoton2 = async function(generateOptions, files) {
        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'Photon 2',
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/photon2.svg'),
            outputPath: 'assets/images/photon-2-pinout.svg',
            // scale to make height 500px width 221
            deviceImageTransform: 'translate(374,0) scale(0.408)',
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
            ],
        });

        await diagram.generate(options, files);
    }


    diagram.generateFeatherPhoton2 = async function(generateOptions, files) {
        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'Photon 2',
            // height="610" width="270"
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/feather.svg'),
            outputPath: 'assets/images/photon-2-feather.svg',
            // scale to make height 500px width 221
            deviceImageTransform: 'translate(400,5) scale(1.71)',
            width: 1100,
            height: 510,
            background: 'white',
            removeLiPin: true,
            pins: [
                {   // Left side
                    num: 1,
                    x: 400,
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
                            keys: ['p2Pin'],
                        },
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
                    x: 628,
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
                            keys: ['p2Pin'],
                        },
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

        await diagram.generate(options, files);
    }



    diagram.generateP2Eval = async function(generateOptions, files) {
        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'P2 Eval',
            // 104 818 
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/header-40.svg'),
            outputPath: 'assets/images/p2-eval.svg',
            // scale to make height 500px
            deviceImageTransform: 'translate(420,12) scale(0.618)',
            width: 1000,
            height: 600,
            background: 'white',
            pins: [
                {   // Left side
                    num: 1,
                    x: 420,
                    y: 30,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: 24.6,
                    count: 20,
                    xDir: -1,
                    yDir: 0,
                    columns: [
                        {
                            width: 30,
                            keys: ['p2pin'],
                        },
                        {
                            width: 50,
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
                    num: 21,
                    x: 482,
                    y: 497.4,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: -24.6,
                    count: 20,
                    xDir: 1,
                    yDir: 0,
                    columns: [
                        {
                            width: 30,
                            keys: ['p2pin'],
                        },
                        {
                            width: 50,
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

        await diagram.generate(options, files);
    }

    diagram.generateP2 = async function (generateOptions, files) {
        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: generateOptions.platformName,
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/p1-pin-blank.svg'),
            outputPath: 'assets/images/' + generateOptions.platformName.toLowerCase() + '-pinout.svg',
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

        await diagram.generate(options, files);
    }


    diagram.generateArgonToPhoton2 = async function(generateOptions, files) {
        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'Photon 2',
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/photon2.svg'),
            outputPath: 'assets/images/' + generateOptions.outputFile,
            deviceImageTransform: 'translate(374,0) scale(0.408)',
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


        await diagram.generate(options, files);
    }


    diagram.generateMonitorOneExpansion = async function(generateOptions, files) {
        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'Monitor One Expansion',
            // 104 818 
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/monitor-one-expansion-blank.svg'),
            // scale to make height 500px
            deviceImageTransform: 'translate(285,0) scale(2.6)',
            width: 1100,
            height: 800,
            background: 'white',
            pins: [
                {   // Left side
                    num: 1,
                    x: 290,
                    y: 202,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: 21,
                    count: 24,
                    xDir: -1,
                    yDir: 0,
                    columns: generateOptions.columnsLeft || generateOptions.columns,
                },
                {   // Right side
                    num: 25,
                    x: 714,
                    y: 685,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: -21,
                    count: 24,
                    xDir: 1,
                    yDir: 0,
                    columns: generateOptions.columnsRight || generateOptions.columns,
                },
            ]
        });

        await diagram.generate(options, files);
    }



    diagram.generateMuon = async function(generateOptions, files) {
        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'Muon',
            // 104 818 
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/muon-expansion-blank.svg'),
            outputPath: generateOptions.outputPath,
            // scale to make height 500px
            deviceImageTransform: 'translate(285,0) scale(2.6)',
            width: 1100,
            height: 800,
            background: 'white',
            pins: [
                {   // Left side (outside, shared with Monitor One)
                    num: 1,
                    x: 290,
                    y: 202,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: 21,
                    count: 24,
                    xDir: -1,
                    yDir: 0,
                    columns: generateOptions.columns,
                },
                {   // Right side (outside, shared with Monitor One)
                    num: 25,
                    x: 714,
                    y: 685,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: -21,
                    count: 24,
                    xDir: 1,
                    yDir: 0,
                    columns: generateOptions.columns,
                },
                {   // Left side (inside)
                    num: 49,
                    x: 345,
                    y: 202,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: 21,
                    count: 24,
                    xDir: 1,
                    yDir: 0,
                    columns: generateOptions.columns,
                },
                {   // Right side (inside)
                    num: 73,
                    x: 659,
                    y: 685,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: -21,
                    count: 24,
                    xDir: -1,
                    yDir: 0,
                    columns: generateOptions.columns,
                },
            ]
        });

        await diagram.generate(options, files);
    }



    diagram.generateTrackerMExpansion = async function(generateOptions, files) {
        
        let options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'Tracker M Expansion',
            outputPath: 'assets/images/tracker-m-expansion1.svg',
            width: 980,
            height: 800,
            background: 'white',
            numAdjust: -100,
            pins: [
                {   // Left side
                    num: 101,
                    x: 400,
                    y: 50,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: 21,
                    count: 30,
                    xDir: -1,
                    yDir: 0,
                    columns: [
                        {
                            keys: ['num'],
                        },
                        {
                            width: 90,
                            keys: ['name'],
                        },
                        {
                            width: 80,
                            keys: ['isPower', 'isControl', 'hardwareADC'],
                        },
                        {
                            keys: ['serial','spi'],
                        },
                        {
                            keys: ['analogWritePWM'],
                        },
                    ],
                },
                {   // Right side
                    num: 131,
                    x: 450,
                    y: 659,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: -21,
                    count: 30,
                    xDir: 1,
                    yDir: 0,
                    columns: [
                        {
                            keys: ['num'],
                        },
                        {
                            width: 90,
                            keys: ['name'],
                        },
                        {
                            width: 80,
                            keys: ['isPower', 'isControl', 'i2c', 'swd'],
                        },
                        {
                            keys: ['serial', 'spi', 'hardwareADC'],
                        },
                        {
                            keys: ['analogWritePWM'],
                        },
                    ],
                },
            ]
        });

        await diagram.generate(options, files);


        options = Object.assign(Object.assign(Object.assign({}, generateOptions, diagram.optionsCommon)), {
            platformName: 'Tracker M Expansion',
            outputPath: 'assets/images/tracker-m-expansion2.svg',
            width: 980,
            height: 800,
            background: 'white',
            numAdjust: -200,
            pinIncludeFn: function(pin) {
                return pin.num >= 100 && pin.num < 300;
            },
            pins: [
                {   // Left side
                    num: 101,
                    x: 400,
                    y: 50,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: 21,
                    count: 30,
                    xDir: -1,
                    yDir: 0,
                    columns: [
                        {
                            keys: ['num'],
                        },
                        {
                            width: 90,
                            keys: ['name'],
                        },
                        {
                            width: 80,
                            keys: ['isPower', 'isControl', 'hardwareADC'],
                        },
                        {
                            keys: ['serial','spi'],
                        },
                        {
                            keys: ['analogWritePWM'],
                        },
                    ],
                },
                {   // Right side
                    num: 231,
                    x: 450,
                    y: 659,
                    numDelta: 1,
                    xDelta: 0,
                    yDelta: -21,
                    count: 30,
                    xDir: 1,
                    yDir: 0,
                    columns: [
                        {
                            keys: ['num'],
                        },
                        {
                            width: 90,
                            keys: ['name'],
                        },
                        {
                            width: 80,
                            keys: ['isPower', 'isControl', 'i2c', 'swd'],
                        },
                        {
                            keys: ['serial', 'spi', 'hardwareADC'],
                        },
                        {
                            keys: ['analogWritePWM'],
                        },
                    ],
                },
            ]
        });

        await diagram.generate(options, files);
        
    }


    
    diagram.generateAll = async function (generateOptions, files) {
        // generateOptions:
        //      topDir - top of the docs directory (contains src directory)
        //      pinInfo - path to the pinInfo.json file

        await diagram.generateArgon(generateOptions, files);

        await diagram.generatePhoton(generateOptions, files);
        
        await diagram.generateElectron(generateOptions, files);

        await diagram.generateESeries(generateOptions, files);

        await diagram.generateE404X(generateOptions, files);

        await diagram.generateM2SoM(Object.assign(Object.assign({}, generateOptions), {
            platformName: 'B4xx SoM',
            outputPath: 'assets/images/b4-som.svg',
        }), files);

        await diagram.generateM2SoM(Object.assign(Object.assign({}, generateOptions), {
            platformName: 'B5xx SoM',
            outputPath: 'assets/images/b5-som.svg',
        }), files);

        await diagram.generateM2SoM(Object.assign(Object.assign({}, generateOptions), {
            platformName: 'M SoM',
            outputPath: 'assets/images/msom.svg',
        }), files);

        await diagram.generateM2Eval(Object.assign(Object.assign({}, generateOptions), {
            platformName: 'M.2 SoM eval board header, nRF52 SoM',
            outputPath: 'assets/images/m2eval_nRF52.svg',
        }), files);

        
        await diagram.generateP2(Object.assign({
            platformName: 'P1'
        }, generateOptions), files);
        
        await diagram.generateP2(Object.assign({
            platformName: 'P2'
        }, generateOptions), files);
        
        await diagram.generatePhoton2(generateOptions, files);
        
        await diagram.generateFeatherPhoton2(generateOptions, files);
        
        await diagram.generateP2Eval(generateOptions, files);

        await diagram.generateArgonToPhoton2(Object.assign({
            outputFile: 'photon-2-argon-comparison.svg'
        }, generateOptions), files);
        
        await diagram.generateArgonToPhoton2(Object.assign({
            outputFile: 'photon-2-argon-spi-comparison.svg',
            feature: 'spi',
        }, generateOptions), files);
        
        await diagram.generateArgonToPhoton2(Object.assign({
            outputFile: 'photon-2-argon-serial-comparison.svg',
            feature: 'serial',
        }, generateOptions), files);
        
        await diagram.generateArgonToPhoton2(Object.assign({
            outputFile: 'photon-2-argon-adc-comparison.svg',
            feature: 'hardwareADC',
        }, generateOptions), files);
        
        await diagram.generateArgonToPhoton2(Object.assign({
            outputFile: 'photon-2-argon-pwm-comparison.svg',
            feature: 'analogWritePWM',
        }, generateOptions), files);    

        await diagram.generateMonitorOneExpansion(Object.assign({
            columnsLeft: [
                {
                    width: 100,
                    keys: ['name'],
                },
                {
                    keys: ['isPower', 'isControl', 'hardwareADC'],
                },
                {
                    keys: ['spi'],
                },
                {
                    keys: ['analogWritePWM'],
                },
            ],
            columnsRight: [
                {
                    width: 100,
                    keys: ['name'],
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
            ],
            outputPath: 'assets/images/monitor-one-expansion.svg',
        }, generateOptions), files);

        await diagram.generateMonitorOneExpansion(Object.assign({
            columns: [
                {
                    width: 100,
                    keys: ['name'],
                },
            ],
            outputPath: 'assets/images/monitor-one-pins.svg',
        }, generateOptions), files);

        await diagram.generateTrackerMExpansion(generateOptions, files);

        // Muon
        await diagram.generateMuon(Object.assign({
            columns: [
                {
                    width: 50,
                    keys: ['name'],
                },
                {
                    width: 100,
                    keys: ['net'],
                },
            ],
            outputPath: 'assets/images/muon-pins.svg',
        }, generateOptions), files);

        await diagram.generateMuon(Object.assign({
            columns: [
                {
                    width: 50,
                    keys: ['name'],
                },
                {
                    width: 100,
                    keys: ['hardwareADC'],
                },
            ],
            outputPath: 'assets/images/m-series/muon-adc.svg',
        }, generateOptions), files);

        await diagram.generateMuon(Object.assign({
            columns: [
                {
                    width: 50,
                    keys: ['name'],
                },
                {
                    width: 100,
                    keys: ['spi'],
                },
            ],
            outputPath: 'assets/images/m-series/muon-spi.svg',
        }, generateOptions), files);

        await diagram.generateMuon(Object.assign({
            columns: [
                {
                    width: 50,
                    keys: ['name'],
                },
                {
                    width: 100,
                    keys: ['i2c'],
                },
            ],
            outputPath: 'assets/images/m-series/muon-i2c.svg',
        }, generateOptions), files);

        await diagram.generateMuon(Object.assign({
            columns: [
                {
                    width: 50,
                    keys: ['name'],
                },
                {
                    width: 100,
                    keys: ['serial'],
                },
            ],
            outputPath: 'assets/images/m-series/muon-uart.svg',
        }, generateOptions), files);

        await diagram.generateMuon(Object.assign({
            columns: [
                {
                    width: 50,
                    keys: ['name'],
                },
                {
                    width: 100,
                    keys: ['analogWritePWM'],
                },
            ],
            outputPath: 'assets/images/m-series/muon-pwm.svg',
        }, generateOptions), files);

        await diagram.generateMuon(Object.assign({
            columns: [
                {
                    width: 50,
                    keys: ['name'],
                },
                {
                    width: 100,
                    keys: ['swd'],
                },
            ],
            outputPath: 'assets/images/m-series/muon-swd.svg',
        }, generateOptions), files);

        await diagram.generateMuon(Object.assign({
            columns: [
                {
                    width: 50,
                    keys: ['name'],
                },
                {
                    width: 100,
                    keys: ['digitalRead'],
                },
            ],
            outputPath: 'assets/images/m-series/muon-gpio.svg',
        }, generateOptions), files);
    }

    diagram.buildP2Eval = function(pinInfo) {
        let evalPlatform = pinInfo.platforms.find(p => p.name == 'P2 Eval');
        let p2Platform = pinInfo.platforms.find(p => p.name == 'P2');

        for(let pinObj of evalPlatform.pins) {
            if (pinObj.p2pin) {
                const p2pinObj = p2Platform.pins.find(p => p.num == pinObj.p2pin);
                for(const key in p2pinObj) {
                    if (key != 'num') {
                        if (pinObj[key] != p2pinObj[key]) {
                            pinObj[key] = p2pinObj[key];
                            console.log('updated p2 eval key=' + key + ' value=' + p2pinObj[key]);
                        }
                    }
                }
            }
        }
    }

    diagram.cleanPinInfo = function(options, files) {
        const origText = fs.readFileSync(options.pinInfo, 'utf8');
        let pinInfo = JSON.parse(origText);

        diagram.buildP2Eval(pinInfo);

        // Sort platforms by id (then by name)
        pinInfo.platforms.sort(function(a, b) {
            let cmp = a.id - b.id;
            if (cmp) {
                return cmp;
            }
            return a.name.localeCompare(b.name);
        });

        for(const platform of pinInfo.platforms) {
            platform.pins.sort(function(a, b) {
                return a.num - b.num;
            });
            /*
            for(let pinObj of platform.pins) {
                const pinObjOrig = Object.assign({}, pinObj);

                // These keys are first in this order. The rest follow alphabetically
                const firstKeys = ['num', 'name', 'altName', 'desc'];

                const allKeys = Object.keys(pinObj);
                let sortKeys = [];
                for(const k of allKeys) {
                    if (!firstKeys.includes(k)) {
                        sortKeys.push(k);
                    }
                }
                sortKeys.sort(function(a, b) {
                    return a.localeCompare(b);
                })

                pinObj = {};
                for(const k of firstKeys) {
                    if (pinObjOrig[k]) {
                        pinObj[k] = pinObjOrig[k];
                    }
                }
                for(const k of sortKeys) {
                    pinObj[k] = pinObjOrig[k];
                }
            }
            */
        }

        const newText = JSON.stringify(pinInfo, null, 2);
        if (origText != newText) {
            fs.writeFileSync(options.pinInfo, newText);
            // TODO: Updates the files[] array with this data!
        }

    };

    
    diagram.metalsmith = async function(files, metalsmith, done, generateOptions) {
        // files array key is relative to src and does not begin with a /, so its assets/files/...
        await diagram.generateAll(generateOptions, files);
        diagram.cleanPinInfo(generateOptions, files);
        done();
    }
    
}(module.exports));
