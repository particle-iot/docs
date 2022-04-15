const { count } = require('console');
const fs = require('fs');
const path = require('path');

const svg = require('./svg');

(function(diagram) {
    
    
    diagram.generate = async function(options) {
        // console.log('generate', options);

        // Find platform object
        diagram.pinInfo = JSON.parse(fs.readFileSync(options.pinInfo, 'utf8'));
        diagram.platformInfo = null;
        for(const p of diagram.pinInfo.platforms) {
            if (p.name == options.platformName) {
                diagram.platformInfo = p;
            }
        }
        if (!diagram.platformInfo) {
            console.log('unknown platformName ' + options.platformName);
            return;
        }
        // diagram.platformInfo contains array "pins" and object "diagram"
        // diagram.platformInfo.diagram objects contain array "columns"

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
                const info = diagram.platformInfo.pins.find(e => e.num == num);
                if (info) {
                    draw.line({
                        x1: x, 
                        y1: y,
                        x2: x + p.xBar, 
                        y2: y + p.yBar,
                        stroke: 'black',
                        'stroke-width': 1,
                    });
    
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

/*
                num: 1,
                x: 298,
                y: 68,
                numDelta: 1,
                xDelta: 0,
                yDelta: 20,
                count: 15
                xBar: -200,
                yBar: 0,

        draw.line({
            x1:20, y1: 68,
            x2:298, y2: 68,
            stroke: 'black',
            'stroke-width': 1,
        });

        draw.line({
            x1:20, y1: 88,
            x2:298, y2: 88,
            stroke: 'black',
            'stroke-width': 1,
        });
*/

        fs.writeFileSync(path.join(__dirname, 'test.svg'), draw.render());
    };

    
}(module.exports));
