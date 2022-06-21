#!/usr/bin/env node

const fs = require('fs');
const path = require('path');


const pinInfoPath = '../../src/assets/files/pinInfo.json';

const pinInfo = JSON.parse(fs.readFileSync(pinInfoPath, 'utf8'));

const saveChanges = true;


//console.log('pinInfo', pinInfo);


// Don't run this again as the output has been manually edited since generating
{
    // Populate pull resistance
    for(let platform of pinInfo.platforms) {
        console.log('id=' + platform.id + ' name=' + platform.name);

        if (platform.id == 0 || platform.id == 32 || platform.id == 99) {
            platform.mcu = 'RTL8721D';
            for(let p of platform.pins) {
                if (p.digitalRead) {
                    if (p.name == 'S4' || p.name == 'S5' || p.name == 'S6') {
                        p.internalPull = '22K. No internal pull up or pull down in HIBERNATE sleep mode.';
                    }
                    else
                    if (p.name == 'D0' || p.name == 'D1') {
                        p.internalPull = '22K';
                    }
                    else
                    if (p.name == 'A2' || p.name == 'A5' || p.name == 'D6' || p.name == 'TX' || p.name == 'RX') {
                        p.internalPull = '42K';
                    }
                    else {
                        p.internalPull = '2.1K';
                    }
                }
            }
        }
        else
        if (platform.id <= 10) {
            platform.mcu = 'STM32F205';
            for(let p of platform.pins) {
                if (p.digitalRead && !p.internalPull) {
                    if (p.name == 'D3' || p.name == 'D6' || p.name == 'D7') {
                        p.internalPull = '40K. Pull-up applied in bootloader for JTAG.';
                    }
                    else
                    if (p.name == 'D6') {
                        p.internalPull = '40K. Pull-down applied in bootloader for JTAG.';
                    }
                    else {
                        p.internalPull = '40K';
                    }
                }
            }
        }
        else {
            platform.mcu = 'nRF52840';
            for(let p of platform.pins) {
                if (p.digitalRead && !p.internalPull) {
                    p.internalPull = '13K';
                }
            }
        }
    }    
}


fs.writeFileSync(pinInfoPath, JSON.stringify(pinInfo, null, 2));
