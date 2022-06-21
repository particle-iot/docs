#!/usr/bin/env node

const fs = require('fs');
const path = require('path');


const pinInfoPath = '../../src/assets/files/pinInfo.json';

const pinInfo = JSON.parse(fs.readFileSync(pinInfoPath, 'utf8'));

const saveChanges = true;


//console.log('pinInfo', pinInfo);


{
    // Populate pull resistance
    
}


fs.writeFileSync(pinInfoPath, JSON.stringify(pinInfo, null, 4));
