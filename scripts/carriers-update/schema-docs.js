const fs = require('fs');
const path = require('path');

// This is called from generator-config.js when the GUIDs for schema documents are encountered
(function(schemaDocs) {
    schemaDocs.generateMd = function(options = {}) {
        // options.kind = 'monitor' or 'tracker'

        // __dirname is docs/scripts/carriers-update, the directory the script is in
        const trackerDir = path.resolve(__dirname, '..', '..', 'src', 'assets', 'files', 'tracker');
        console.log('trackerDir=' + trackerDir);

        let schemas = {};
        let schemaVersions = [];

        for(const dirEntry of fs.readdirSync(trackerDir, {withFileTypes: true})) {
            if (dirEntry.isFile() && dirEntry.name.endsWith('.json')) {
                const m = dirEntry.name.match(/([a-z]+)-config-schema-([0-9]+)/);
                if (m) {
                    if (options.kind == m[1]) {
                        schemas[m[2]] = JSON.parse(fs.readFileSync(path.join(trackerDir, dirEntry.name), 'utf8'));
                        schemaVersions.push(parseInt(m[2]));
                    }
                }
            }
        }
        schemaVersions.sort((a, b) => b - a);

        const currentSchema = schemas[schemaVersions[0].toString()];
        // console.log('currentSchema', currentSchema);


        /*
        	"properties": {
                "modbus_rs485": {
                    "$id": "#/properties/modbus_rs485",
                    "type": "object",
                    "title": "Modbus RS-485",
                    "description": "Configuration for Modbus RTU with RS-485.",
                    "default": {},
                    "minimumFirmwareVersion": 2,
                    "properties": {
                        "baud": {
                            "$id": "#/properties/modbus_rs485/baud",
                            "type": "string",
                            "title": "RS-485 Baud",
                            "description": "Baud rate to operate the RS-485 bus.",
                            "default": "38400",
                            "enum": [
                                "1200",
                                "2400",
                                "4800",
                                "9600",
                                "19200",
                                "28800",
                                "38400",
                                "57600",
                                "76800",
                                "115200"
                            ]
                        },		
        */

        const knownTypes = {
            'string': 'String value',
            'integer': 'Integer (whole mumber) value',
            'boolean': 'Boolean (true or false) value',
            'number': 'Number (floating point) value',
        };

        let md = '';
        const baseHeading = 2;

        const mdHeading = function(level, s) {
            return '\n' + '######'.substring(0, baseHeading + level) + ' ' + s + '\n\n';
        }

        const processObject = function(indent, object) {
            for(const itemKey in object.properties) {
                const item = object.properties[itemKey];
                // item
                //  .type, .title, .description, .default,.enum

                md += mdHeading(indent + 1, item.title + ' configuration');
                md += item.description + '\n';
    
                if (item.type == 'object') {
                    processObject(indent + 1, item);
                }
                else {
                    if (!knownTypes[item.type]) {
                        console.log('unknown type', {
                            type: item.type,
                            item: itemKey,
                            id: object.id,
                        });
                    }    
                }
            }
        }

        for(const panelKey in currentSchema.properties) {
            const panel = currentSchema.properties[panelKey];
            // panel 
            //  .title, .description, .minimumFirmwareVersion
            //  .properties

            md += mdHeading(1, panel.title + ' tab');
            md += panel.description + '\n';

            if (panel.minimumFirmwareVersion) {
                md += '*Added in version ' + panel.minimumFirmwareVersion + '*\n';
            }

            processObject(1, panel);

        }
        
    
        return md;
    }

}(module.exports));
