/**
 * Shared configuration for the command line tools in the scripts directory.
 *
 * Settings are read from scripts/config.json, which is not committed to git. See
 * scripts/config.example.json for the format. Currently it contains:
 *
 * - accessToken: A Particle API access token (used by library-tool and release-update)
 */
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'config.json');

/**
 * Loads config.json. Exits the process with an error message if it can't be read.
 *
 * @param {string[]} requiredKeys Keys that must be present, such as ['accessToken']
 * @returns {object} The parsed configuration
 */
function load(requiredKeys = []) {
    let config;
    try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    catch (e) {
        console.log('failed to read ' + configPath + ' (' + e.message + ')');
        console.log('copy scripts/config.example.json to scripts/config.json and edit it');
        process.exit(1);
    }

    for (const key of requiredKeys) {
        if (!config[key]) {
            console.log(configPath + ' did not contain ' + key);
            process.exit(1);
        }
    }
    return config;
}

module.exports = { load, configPath };
