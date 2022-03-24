const fs = require('fs');
const path = require('path');
const axios = require('axios');

let config = require('./config');

const helper = require('@particle/node-example-helper');
helper
    .withRootDir(__dirname)
    .withConfig(config);
 

async function run() {
    // Authenticate the user and obtain the access token
    await helper.authenticate();

    try {
        // Get the service agreements
        console.log('Getting service agreement...');

        let options = {};

        const getUrl = function(which) {
            let url;

            if (!config.orgId) {
                // Sandbox
                url = 'https://api.particle.io/v1/user/' + which;
            }
            else {
                // Organization
                url = 'https://api.particle.io/v1/orgs/' + config.orgId + '/' + which;
            }
            return url;
        }

        const serviceAgreement = await axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + helper.auth,
                'Accept': 'application/json'
            },
            url: getUrl('service_agreements')
        });

        // console.log('serviceAgreement.data', serviceAgreement.data);

        options.agreementId = serviceAgreement.data.data[0].id;
        options.startDate = serviceAgreement.data.data[0].attributes.current_billing_period_start;
        options.endDate = serviceAgreement.data.data[0].attributes.current_billing_period_end;

        // console.log('options', options);

        console.log('Requesting a report...');

        const requestReportData = {
            'report_type': 'devices',
            'date_period_start': options.startDate,
            'date_period_end': options.endDate
        }

        const requestReport = await axios({
            method: 'post',
            data: JSON.stringify(requestReportData),
            headers: {
                'Authorization': 'Bearer ' + helper.auth,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: getUrl('service_agreements') + '/' + options.agreementId + '/usage_reports'
        });


        options.reportId = requestReport.data.data.id;

        console.log('options', options);

        // Check the report status - repeat this every 10 seconds

        let delay = 7500; // 7.5 seconds

        for(let tries = 1; !options.downloadUrl && tries < 60; tries++) {
            console.log('Checking report status (attempt ' + tries + ')...');
            await new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve();
                }, delay);
            }); 
            if (delay < 60000) {
                delay *= 2;
            }

            const reportStatus = await axios({
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + helper.auth,
                    'Accept': 'application/json'
                },
                url: getUrl('usage_reports') + '/' + options.reportId
            });
    
            console.log('reportStatus.data', reportStatus.data);
    
            options.downloadUrl = reportStatus.data.data.attributes.download_url;
        }
        if (!options.downloadUrl) {
            console.log('report failed to retrieve');
        }

        // Download the report
        console.log('Downloading report...');
        const reportText = await axios({
            method: 'get',
            headers: {
                'Accept': 'text/csv'
            },
            responseType: 'text',
            url: options.downloadUrl
        });

        console.log('Report downloaded!');

        // Do something with the data here.

        // Save to a file:
        // fs.writeFileSync("report.csv", reportText.data);

        // Print to console
        console.log('report', reportText.data);
    }
    catch(e) {
        console.log('exception', e);
    }


    helper.close();
}


run();
