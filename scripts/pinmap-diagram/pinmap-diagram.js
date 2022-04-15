const { count } = require('console');
const fs = require('fs');
const path = require('path');

const svg = require('./svg');

(function(diagram) {
    
    
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

        if (options.comparePlatform) {
            diagram.comparePlatformInfo = diagram.pinInfo.platforms.find(e => e.name == options.comparePlatform);            
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
                    draw.line({
                        x1: x, 
                        y1: y,
                        x2: x + p.xBar, 
                        y2: y + p.yBar,
                        stroke: 'black',
                        'stroke-width': 1,
                    });
                    if (options.comparePlatform) {
                        let compareName = info[options.compareKey] || info.name;

                        info.compareName = compareName;
                        const comparisonInfo = diagram.comparePlatformInfo.pins.find(e => e.name == compareName);
                        if (comparisonInfo) {
                            info.compareAltName = comparisonInfo.altName;
                        }
                    }

                    let xBox = x;
                    let yBox = y;
                    let dirX = (p.xBar < 0) ? -1 : 1;
    
    
                    for(let jj = 0; jj < p.columns.length; jj++) {
                        let width = options.xBox;
                        if (p.columns[jj].width) {
                            width = p.columns[jj].width;
                        }
                        if (dirX < 0) {
                            xBox -= width;
                        }
                        let rectX = xBox;
                        let rectY = yBox - options.yBox / 2;
    

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
                            if (text === true) {
                                text = info.name;
                            }
                            
                            if (text) {
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
                                
                                draw.rect({
                                    x: rectX,
                                    y: rectY,
                                    width: width,
                                    height: options.yBox,
                                    stroke: 'black',
                                    fill: bgColor,
                                });
            
    
                                draw.text({
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
                        if (dirX > 0) {
                            xBox += width;
                        }

                        xBox += dirX * options.xBoxSpacing;

                    }
                }                

        
                x += p.xDelta;
                y += p.yDelta;
                num += p.numDelta;
            }    
        }

        fs.writeFileSync(options.outputPath, draw.render());
    };

    
}(module.exports));
