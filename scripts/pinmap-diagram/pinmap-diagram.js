const { count } = require('console');
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
                            info.compareAltName = comparisonInfo.altName;
                        }
                    }

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
                        let width = options.xBox;
                        if (p.columns[jj].width) {
                            width = p.columns[jj].width;
                        }
                        if (dir < 0) {
                            xBox -= width;
                        }
                        let rectX = xBox;
                        let rectY = -options.yBox / 2;
    

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
                        if (dir > 0) {
                            xBox += width;
                        }

                        xBox += dir * options.xBoxSpacing;

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
