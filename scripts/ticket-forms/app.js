#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const axios = require('axios');

// Required environment variables
// Set using commands like:
// export ZENDESK_AUTH=user@particle.io/token:xxxxxxxxxxx
// node app.js

let config = {};

// ZENDESK_AUTH - Zendesk auth token, usually of the form: user@particle.io/token:xxxxxxxxxxx
config.ZENDESK_AUTH = process.env.ZENDESK_AUTH;
if (!config.ZENDESK_AUTH) {
    console.log('ZENDESK_AUTH not set in environment');
    process.exit(1);
}

config.ZENDESK_URL = process.env.ZENDESK_URL || 'https://particle.zendesk.com';

const axiosInstance = axios.create({
    baseURL: config.ZENDESK_URL,
    headers: {
        'Authorization': 'Basic ' + Buffer.from(config.ZENDESK_AUTH, 'utf8').toString('base64')
    }
});

let data = {};

// Ticket field docs
// https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/


// Basic Authentication using API tokens
// https://developer.zendesk.com/api-reference/ticketing/introduction/#api-token

const topDir = path.normalize(path.join(__dirname, '..', '..'));

const srcDir = path.join(topDir, 'src');

let options = {
    getTicketFields: true,
    getTicketForms: true,
};

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

async function run() {
    try {
        let res;

        // This is not currently paginated but could be if a lot of fields are added.
        const ticketFieldsPath = path.join(dataDir, 'ticket_fields.json');
        if (options.getTicketFields) {
            res = await axiosInstance.get('/api/v2/ticket_fields');
            
            fs.writeFileSync(ticketFieldsPath, JSON.stringify(res.data, null, 4));    
        }
        else {
            data.categories = JSON.parse(fs.readFileSync(ticketFieldsPath, 'utf8'));
        }

        // 
        const ticketFormsPath = path.join(dataDir, 'ticket_forms.json');
        if (options.getTicketFields) {
            res = await axiosInstance.get('/api/v2/ticket_forms');
            
            fs.writeFileSync(ticketFormsPath, JSON.stringify(res.data, null, 4));    
        }
        else {
            data.categories = JSON.parse(fs.readFileSync(ticketFormsPath, 'utf8'));
        }

    }
    catch(e) {
        console.log('uncaught exception in run', e);
    }
    
}

run();
