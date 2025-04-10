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

// Redirects. Copy from 
// https://support.particle.io/theming/editor/e8b39926-efeb-439c-a536-3cf9733e0a7a/script.js
const redirects = {
    "360044252594": "https://docs.particle.io/reference/discontinued/hardware/xenon-nordic-sdk/",
    "360046862953": "https://docs.particle.io/hardware/expansion/create-a-custom-cold-chain-solution-using-gen3-devices-and-ble/",
    "360039735733": "https://docs.particle.io/troubleshooting/guides/device-management/finding-your-device-id/",
    "360039741113": "https://docs.particle.io/troubleshooting/guides/connectivity-troubleshooting/using-3rd-party-sim-cards/",
    "360039741113": "https://docs.particle.io/archives/mesh-setup-over-usb/",
    "360039251274": "https://docs.particle.io/archives/serial2-on-the-photon/",
    "360044183314": "https://docs.particle.io/archives/xenon-standalone/",
    "360044755894": "https://docs.particle.io/archives/create-a-local-publishsubscribe-group-using-ble-on-gen3-devices/",
    "360039741253": "https://docs.particle.io/archives/debugging-with-eclipse/",
    "360039251394": "https://docs.particle.io/archives/installing-dfu-util/",
    "360039741273": "https://docs.particle.io/archives/local-build-using-gcc-arm/",
    "1260802302149": "https://docs.particle.io/hardware/certification/enabling-wifi-rf-test-for-esp32/",
    "1260800691709": "https://docs.particle.io/troubleshooting/guides/connectivity-troubleshooting/troubleshooting-wifi-on-the-particle-argon/",
    "1260800692169": "https://docs.particle.io/troubleshooting/guides/connectivity-troubleshooting/troubleshooting-wifi-on-the-particle-photonp1/",
    "360052621274": "https://docs.particle.io/troubleshooting/guides/connectivity-troubleshooting/wifi-connectivity-troubleshooting-guide/",
    "360044518213": "https://docs.particle.io/troubleshooting/guides/connectivity-troubleshooting/cellular-connectivity-troubleshooting-guide/",
    "1260801313350": "https://docs.particle.io/troubleshooting/guides/build-tools-troubleshooting/troubleshooting-the-particle-workbench/",
    "1260801311330": "https://docs.particle.io/troubleshooting/guides/build-tools-troubleshooting/troubleshooting-the-particle-cli/",
    "1260801242950": "https://docs.particle.io/troubleshooting/guides/build-tools-troubleshooting/troubleshooting-webhookintegration-issues/",
    "4412206822555": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/troubleshooting-asset-tracker-issues/",
    "1260801921089": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/troubleshooting-the-setup-process/",
    "1260801176309": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/identifying-damaged-hardware/",
    "360060114433": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/device-breathing-cyan-but-cannot-connect/",
    "360049403474": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/device-blinking-dark-blue/",
    "360046136473": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/device-blinking-red-yellow-or-frozenno-led/",
    "1260803794770": "https://docs.particle.io/scaling/best-practices/what-are-particles-best-practices-with-respect-to-device-os-version-management/",
    "360045359554": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/device-blinking-cyan/",
    "360039251434": "https://docs.particle.io/getting-started/developer-tools/workbench-faq/",
    "360039251374": "https://docs.particle.io/troubleshooting/guides/build-tools-troubleshooting/installing-curl-for-windows/",
    "360047299873": "https://docs.particle.io/scaling/best-practices/messaging-architecture-for-scale/",
    "360059764393": "https://docs.particle.io/troubleshooting/guides/device-management/repairing-product-device-keys/",
    "360045547634": "https://docs.particle.io/troubleshooting/guides/device-management/how-can-i-set-up-my-argon-or-boron-via-usb/",
    "360057772154": "https://docs.particle.io/troubleshooting/guides/device-troubleshooting/using-particle-serial-inspect/",
    "360039251414": "https://docs.particle.io/reference/developer-tools/jtag/",
};

const topDir = path.normalize(path.join(__dirname, '..', '..'));

const srcDir = path.join(topDir, 'src');

let options = {
    getTicketFields: true,
    getTicketForms: true,
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

            console.log('updated ticket fields');
            
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

            console.log('updated ticket forms');

            data.ticketForms = res.data.ticket_forms;
            fs.writeFileSync(ticketFormsPath, JSON.stringify(res.data, null, 4));    
        }
        else {
            data.ticketForms = JSON.parse(fs.readFileSync(ticketFormsPath, 'utf8')).ticket_forms;
        }

        // console.log('data', data);

        // Flag redirected links
        for(const field of data.ticketFields) {
            const desc = field.description;
            if (desc) {
                const m = desc.match(/https:\/\/support.particle.io\/hc\/en-us\/articles\/([0-9]+)/);
                if (m) {
                    const articleNum = m[1];
                    if (redirects[articleNum]) {
                        console.log('form field ' + field.id + ' includes link to article ' + articleNum + ', change to ' + redirects[articleNum]);
                    }
                }
            }
        }


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
                35853786106395, // Cancel basic plan
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
                7521710158235, // Device doctor ticket
                360006636893, 
                360005653314,
                360006636853, // Unable to submit
                11779868461851, // Sample request
                28756428183451, // Help with my Kickstarter Pledge
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

                //console.log('obj', obj);
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
