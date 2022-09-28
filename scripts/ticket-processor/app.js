#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const axios = require('axios');

// Required environment variables
// Set using commands like:
// export ZENDESK_AUTH=user@particle.io/token:xxxxxxxxxxx
// node app.js

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

let config = {};

const configPath = path.join(dataDir, 'config.json');
if (fs.existsSync(configPath)) {
    try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    catch(e) {        
    }
}


// ZENDESK_AUTH - Zendesk auth token, usually of the form: user@particle.io/token:xxxxxxxxxxx
if (!config.ZENDESK_AUTH) {
    config.ZENDESK_AUTH = process.env.ZENDESK_AUTH;
    if (!config.ZENDESK_AUTH) {
        console.log('ZENDESK_AUTH not set in environment');
        process.exit(1);
    }    
}

if (!config.ZENDESK_URL) {
    config.ZENDESK_URL = process.env.ZENDESK_URL || 'https://particle.zendesk.com';
}

const axiosInstance = axios.create({
    baseURL: config.ZENDESK_URL,
    headers: {
        'Authorization': 'Basic ' + Buffer.from(config.ZENDESK_AUTH, 'utf8').toString('base64')
    }
});

// How often to check for new tickets (seconds)
if (!config.checkPeriodSec) {
    config.checkPeriodSec = 30; 
}

// console.log('config', config);

let dataJson = {};

const dataJsonPath = path.join(dataDir, 'data.json');
if (fs.existsSync(dataJsonPath)) {
    try {
        dataJson = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
    }
    catch(e) {

    }
}

if (!dataJson.processed) {
    dataJson.processed = [];
}

function saveDataJson() {
    fs.writeFileSync(dataJsonPath, JSON.stringify(dataJson, null, 4));
}

function unixTimeNow() {
    return Math.round(new Date().getTime() / 1000);
}


if (!dataJson.nextCheck) {
    dataJson.nextCheck = unixTimeNow();
    saveDataJson();
}

async function processTicketAttachments(ticket, arrayOfTokens) {

    console.log('processTicketAttachments ' + ticket.id, arrayOfTokens);

    try {
        const reqObj = {
            'ticket': {
                'comment': {
                    'body': 'The original requester attached these files:',
                    'uploads': arrayOfTokens,
                    'public': false
                },    
            },
        }
        // console.log('reqObj', reqObj);
        
        // This can't be used with a standard access token. 
        // When used, add config as the third parameter to axiosInstance.put
        /*
        const config = {
            headers: {
                'X-On-Behalf-Of': ticket.requester_id.toString(),
            }
        }
        console.log('config', config);
        */

        const res = await axiosInstance.put('/api/v2/tickets/' + ticket.id, reqObj);
               
        // console.log('res', res);
    }
    catch(e) {
        if (e.response.status == 404) {
            console.log('not found in processTicketAttachments, happens when an attachment has already been processed');
        }
        else {
            console.log('exception in processTicketAttachments', e);

        }
        console.log('e.response.data', JSON.stringify(e.response.data, null, 4));    
    }

}

async function processTicket(ticket) {
    try {
        let processedAttachments = false;

        // console.log('processing ticket ' + ticket.id);

        // console.log('ticket', ticket);
        if (ticket.custom_fields) {
            for(const field of ticket.custom_fields) {
                if (field.id == 8688454802459 && field.value) {
                    // console.log('ticket ', ticket);
                    // console.log('attachment field', field.value);

                    const tokenRE = /Token: ([A-Za-z0-9]+)/g;
            
                    const matches = [...field.value.matchAll(tokenRE)];

                    // console.log('matches', matches);

                    let arrayOfTokens = [];
                    for(const match of matches) {
                        arrayOfTokens.push(match[1]);
                    }

                    if (arrayOfTokens.length) {
                        await processTicketAttachments(ticket, arrayOfTokens);

                        console.log('processed attachments for ticket ' + ticket.id);
                        processedAttachments = true;       
                    }
                    else {
                        console.log('no tokens');
                    }
                }
            }
        }
        if (!processedAttachments) {
            console.log('no attachments ticket ' + ticket.id);
        }
    }
    catch(e) {
        console.log('uncaught exception in processTicket', e);
    }

}

async function processTickets() {
    try {

        if (!dataJson.cursor && !dataJson.startTime) {
            // If startTime is not set, set to 2 minutes ago, Unix epoch time (January 1, 1970), UTC
            dataJson.startTime = unixTimeNow() - 120;
            saveDataJson();
        }

        let requestUrl = '/api/v2/incremental/tickets/cursor.json?';
        if (dataJson.cursor) {
            requestUrl += 'cursor=' + dataJson.cursor;
        }
        else {
            // start_time must be at least 60 seconds ago
            requestUrl += 'start_time=' + dataJson.startTime + config.checkPeriodSec - 62;
        }
        // console.log('requestUrl=' + requestUrl);

        const res = await axiosInstance.get(requestUrl);
        
        // Update cursor and start time
        if (res.data.after_cursor) {
            dataJson.cursor = res.data.after_cursor;
            console.log('new cursor ' + dataJson.cursor);
        }
        dataJson.startTime = unixTimeNow();

        // console.log('res.data', res.data);

        // res.data:
        // tickets (array of objects):
        //  url, id, subject, description
        //  custom_fields (array):
        //    id, value
        for(const ticket of res.data.tickets) {
            if (!dataJson.processed.includes(ticket.id)) {
                await processTicket(ticket);

                dataJson.processed.push(ticket.id);        
            }
        }

        if (res.data.tickets.length == 0) {
            console.log('no new tickets at ' + new Date().toISOString());
        }

        if (dataJson.processed.length > 100) {
            dataJson.processed.splice(0, 100 - dataJson.processed.length);
        }

        saveDataJson();
    }
    catch(e) {
        console.log('uncaught exception in processTickets', e);
    }

}

async function run() {
    try {
        while(true) {
            if (dataJson.nextCheck <= unixTimeNow()) {
                dataJson.nextCheck = unixTimeNow() + config.checkPeriodSec;
                saveDataJson();

                await processTickets();
            }
        }
    }
    catch(e) {
        console.log('uncaught exception in run', e);
    }
    
}

run();
