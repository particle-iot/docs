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
    getTicketFields: false,
    getTicketForms: false,
    export: true,
};

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const outputDir = path.join(srcDir, 'assets', 'files');

async function run() {
    try {
        let data = {};

        let res;

        // This is not currently paginated but could be if a lot of fields are added.
        const ticketFieldsPath = path.join(dataDir, 'ticket_fields.json');
        if (options.getTicketFields) {
            res = await axiosInstance.get('/api/v2/ticket_fields');
            
            data.ticketFields = res.data.ticket_fields;
            fs.writeFileSync(ticketFieldsPath, JSON.stringify(res.data, null, 4));    
        }
        else {
            data.ticketFields = JSON.parse(fs.readFileSync(ticketFieldsPath, 'utf8')).ticket_fields;
        }

        // 
        const ticketFormsPath = path.join(dataDir, 'ticket_forms.json');
        if (options.getTicketFields) {
            res = await axiosInstance.get('/api/v2/ticket_forms');
            
            data.ticketForms = res.data.ticket_forms;
            fs.writeFileSync(ticketFormsPath, JSON.stringify(res.data, null, 4));    
        }
        else {
            data.ticketForms = JSON.parse(fs.readFileSync(ticketFormsPath, 'utf8')).ticket_forms;
        }

        // console.log('data', data);

        // Export public fields
        if (options.export) {
            let exportData = {
                ticketFields: [],
                ticketForms: [],
            };

            for(const f of data.ticketFields) {
                if (f.visible_in_portal) {
                    // console.log('f', f);
    
                    const obj = {};
    
                    obj.id = f.id;
                    obj.type = f.type; // text, textarea, etc.
                    obj.title = f.title_in_portal;
                    obj.description = f.description;
                    obj.required = f.required_in_portal;
                    
                    if (f.custom_field_options) {
                        obj.customFields = [];

                        for(const opt of f.custom_field_options) {
                            obj.customFields.push({
                                name: opt.name,
                                value: opt.value,
                                id: opt.id,
                                default: opt.default,
                            });
                        }
                    }
                    //console.log('obj', obj);
                    exportData.ticketFields.push(obj);
                }
            }

            const exportForms = [
                360001073373, // Help with my order
                360001730794, // Managing billing & subscriptions
                1260809279669, // Upgrading my account to the growth plan
                360000327294, // Another non-technical issue
                360005653294, // Can't set up a new device
                1500000002882, // Console ticket
                1500000002701, // Webhooks and integrations
                360006636913, // Another technical issue
                360005653294, // Cannot set up new device
                360006631353, // Cellular connectivity issue
                1500000002842, // Wi-Fi connectivity issues
                1500000008462, // Device is unresponsive
                360005659054, // Status LED blinking
                1500000002902, // SIM activation
            ];

            for(const f of data.ticketForms) {
                if (!exportForms.includes(f.id)) {
                    continue;
                }
                const obj = {
                    id: f.id,
                    title: f.display_name,
                    fields: [],
                    conditions: f.end_user_conditions,
                };

                for(const fieldId of f.ticket_field_ids) {
                    const fieldObj = data.ticketFields.find(e => e.id == fieldId);
                    if (fieldObj) {
                        if (fieldObj.visible_in_portal) {
                            obj.fields.push({id: fieldObj.id});
                        }
                    }
                }

                console.log('obj', obj);
                exportData.ticketForms.push(obj);

            }

            
            fs.writeFileSync(path.join(outputDir, 'ticketForms.json'), JSON.stringify(exportData, null, 4));
        }
    }
    catch(e) {
        console.log('uncaught exception in run', e);
    }
    
}

run();
