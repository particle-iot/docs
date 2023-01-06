#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const argv = require('yargs').argv;
var luhn = require("luhn");

let dateToUse = new Date();

let count = 100;
if (argv.count) {
    count = parseInt(argv.count);
}

function zeroPad(value, length = 2) {
    let s = value.toString();
    for(let ii = s.length; ii < length; ii++) {
        s = '0' + s;
    }
    return s;
}

function randomAlphaNumeric(length) {
    const set = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';

    let s = '';

    for(let ii = 0; ii < length; ii++) {
        s += set.charAt(Math.floor(Math.random() * set.length));
    }
    return s;
}

function weekNumber() {
    // https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
    const startDate = new Date(dateToUse.getFullYear(), 0, 1);
    const days = Math.floor((dateToUse - startDate) / (24 * 60 * 60 * 1000));
          
    return Math.ceil(days / 7);
}

function makeDeviceId() {
    const value = new Uint8Array(12);
    
    for(let ii = 0; ii < value.length; ii++) {
        value[ii] = Math.random() * 255;
    }

    return Buffer.from(value).toString('hex');   
}

function makeSerial(options = {}) {
    const prefix = options.prefix || 'P033';
    const loc = options.loc || 'SF';

    const yearCode = (dateToUse.getFullYear() % 10).toString();

    return prefix + loc + yearCode + weekNumber().toString() + randomAlphaNumeric(6);
}

function makeIccid(options = {}) {
    // 89014103271529002873
    const prefix = options.prefix || '8901410';
    const length = options.length || 20;

    let base = prefix;
    for(let ii = prefix.length; ii < (length - 1); ii++) {
        const digit = Math.floor(Math.random() * 10);
        base += digit.toString();
    }

    let value;

    for(let ii = 0; ii < 10; ii++) {
        value = base + ii.toString();
        if (luhn.validate(value)) {
            break;
        }
    }
    return value;
}

function makeAccessToken() {
    const value = new Uint8Array(20);
    
    for(let ii = 0; ii < value.length; ii++) {
        value[ii] = Math.random() * 255;
    }

    return Buffer.from(value).toString('hex');   
}

// console.log(makeAccessToken());

if (argv.format == 'deviceId') {
    for(let ii = 0; ii < count; ii++) {
        console.log(makeDeviceId());
    }
}
if (argv.format == 'serial') {
    for(let ii = 0; ii < count; ii++) {
        console.log(makeSerial());
    }
}
if (argv.format == 'iccid') {
    for(let ii = 0; ii < count; ii++) {
        console.log(makeIccid());
    }
}
if (argv.format == 'accessToken') {
    for(let ii = 0; ii < count; ii++) {
        console.log(makeAccessToken());
    }
}

if (argv.format == 'csv1') {
    for(let ii = 0; ii < count; ii++) {
        console.log(makeDeviceId() + ',' + makeSerial() + ',' + makeIccid());
    }
}
