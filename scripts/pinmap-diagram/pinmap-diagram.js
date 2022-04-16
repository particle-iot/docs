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

    diagram.generate = async function(options) {
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
        
        draw.g({
            transform: options.deviceImageTransform,
        }).svg({}, options.deviceImage);

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
                                const key = p.columns[jj].keys[kk];
        
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
        
        
                                if (text) {
                                    let bgColor = options.featureColors[key];
                                    if (!bgColor) {
                                        bgColor = 'white';
                                    }
                                
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
                                        fill: options.featureTextWhite.includes(key) ? 'white' : 'black',
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

        
                x += p.xDelta;
                y += p.yDelta;
                num += p.numDelta;
            }    
        }

        const newContents = draw.render();
        
        if (fs.existsSync(options.outputPath)) {
            const oldContents = fs.readFileSync(options.outputPath, 'utf8');
            if (oldContents != newContents) {
                fs.writeFileSync(options.outputPath, newContents);
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


    diagram.generateArgon  = async function (generateOptions) {
        
        let options = Object.assign(Object.assign(generateOptions, diagram.optionsCommon), {
            platformName: 'Argon',
            // height="194.98106" width="86.125328"
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/argon.svg'),
            outputPath: path.join(generateOptions.topDir, 'src/assets/images/argon-pinout.svg'),
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

        await diagram.generate(options);
    }



    diagram.generatePhoton = async function (generateOptions) {
        
        let options = Object.assign(Object.assign(generateOptions, diagram.optionsCommon), {
            platformName: 'Photon',
            // height=110.16 width 76.8
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/photon.svg'),
            outputPath: path.join(generateOptions.topDir, 'src/assets/images/photon-pinout.svg'),
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

        await diagram.generate(options);
    }


    diagram.generateElectron = async function(generateOptions) {
        
        let options = Object.assign(Object.assign(generateOptions, diagram.optionsCommon), {
            platformName: 'Electron',
            // height=110.16 width 76.8
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/electron.svg'),
            outputPath: path.join(generateOptions.topDir, 'src/assets/images/electron-pinout.svg'),
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

        await diagram.generate(options);
    }

    diagram.generatePhoton2 = async function(generateOptions) {
        
        let options = Object.assign(Object.assign(generateOptions, diagram.optionsCommon), {
            platformName: 'Photon 2',
            // height="610" width="270"
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/photon2.svg'),
            outputPath: path.join(generateOptions.topDir, 'src/assets/images/photon-2-pinout.svg'),
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

        await diagram.generate(options);
    }


    diagram.generateP2 = async function (generateOptions) {
        
        let options = Object.assign(Object.assign(generateOptions, diagram.optionsCommon), {
            platformName: generateOptions.platformName,
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/p1-pin-blank.svg'),
            outputPath: path.join(generateOptions.topDir, 'src/assets/images/' + generateOptions.platformName.toLowerCase() + '-pinout.svg'),
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

        await diagram.generate(options);
    }


    diagram.generateArgonToPhoton2 = async function(generateOptions) {
        
        let options = Object.assign(Object.assign(generateOptions, diagram.optionsCommon), {
            platformName: 'Photon 2',
            deviceImage: path.join(generateOptions.topDir, 'src/assets/images/photon2.svg'),
            outputPath: path.join(generateOptions.topDir, 'src/assets/images/' + generateOptions.outputFile),
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


        await diagram.generate(options);
    }

    diagram.generateAll = async function (generateOptions) {
        // generateOptions:
        //      topDir - top of the docs directory (contains src directory)
        //      pinInfo - path to the pinInfo.json file

        await diagram.generateArgon(generateOptions);

        await diagram.generatePhoton(generateOptions);
        
        await diagram.generateElectron(generateOptions);
        
        await diagram.generateP2(Object.assign({
            platformName: 'P1'
        }, generateOptions));
        
        await diagram.generateP2(Object.assign({
            platformName: 'P2'
        }, generateOptions));
        
        await diagram.generatePhoton2(generateOptions);
        
        await diagram.generateArgonToPhoton2(Object.assign({
            outputFile: 'photon-2-argon-comparison.svg'
        }, generateOptions));
        
        await diagram.generateArgonToPhoton2(Object.assign({
            outputFile: 'photon-2-argon-spi-comparison.svg',
            feature: 'spi',
        }, generateOptions));
        
        await diagram.generateArgonToPhoton2(Object.assign({
            outputFile: 'photon-2-argon-serial-comparison.svg',
            feature: 'serial',
        }, generateOptions));
        
        await diagram.generateArgonToPhoton2(Object.assign({
            outputFile: 'photon-2-argon-adc-comparison.svg',
            feature: 'hardwareADC',
        }, generateOptions));
        
        await diagram.generateArgonToPhoton2(Object.assign({
            outputFile: 'photon-2-argon-pwm-comparison.svg',
            feature: 'analogWritePWM',
        }, generateOptions));    
    }

    diagram.metalsmith = async function(files, metalsmith, done, generateOptions) {
        await diagram.generateAll(generateOptions);
        done();
    }
    
}(module.exports));
