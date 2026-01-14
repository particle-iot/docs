// SVG World Map from: https://simplemaps.com/resources/svg-world

const fs = require('fs');
const path = require('path');

const carriersJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../src/assets/files/carriers.json'), 'utf8'));

const orig = fs.readFileSync(path.join(__dirname, 'world.svg'), 'utf8');

let svg = new String(orig);

// Remove the XML preamble
const svgIndex = svg.indexOf('<svg');
svg = svg.substring(svgIndex);

const lines = svg.split('\n');

const countryNameRemap = {
    'Brunei Darussalam': 'Brunei',
    // Bhutan
    'Democratic Republic of the Congo': 'Congo (Kinshasa)',
    'Republic of Congo': 'Congo (Brazzaville)',
    'Czech Republic': 'Czechia',   
    // Djibouti
    // Eritrea
    'The Gambia': 'Gambia',
    'Republic of Korea': 'South Korea',
    'Lao PDR': 'Lao People\'s Democratic Republic',   
    // Liberia    
    // Libya
    'Macedonia': 'North Macedonia',
    // Dem. Rep. Korea
    // Western Sahara
    'Sudan': 'South Sudan',
    'Swaziland': 'eSwatini',
    // Syria
    // Turkmenistan
    // Timor-Leste
    'Russian Federation': 'Russia',
    'American Samoa': 'Samoa',
    'Saint-Barthélemy': 'Saint Barthélemy',
    'Cape Verde': 'Cabo Verde',
    // Falkland Islands
    'Faeroe Islands': 'Faroe Islands',
    // Federated States of Micronesia
    'Saint-Martin': 'Sint Maarten',
    // Marshall Islands
    // Northern Mariana Islands
    // New Caledonia
    // Palau
    // French Polynesia
    // São Tomé and Principe
    // Tuvalu
    'British Virgin Islands': 'Virgin Islands (British)',
    'United States Virgin Islands': 'Virgin Islands (U.S.)',
    // St. Eustatius (Netherlands)
    // Saba (Netherlands)
    // Canary Islands (Spain)
    'Reunion': 'Réunion',
}

for(let lineNum = 0; lineNum < lines.length; lineNum++) {
    let line = lines[lineNum];

    if (line.startsWith('<svg')) {
        // Remove width and height tags so the SVG will render to the containing div size
        // Leave viewbox since that specifies the coordinate system of the SVG file
        line = line.replace(/width="[0-9]+"/, ''); 
        line = line.replace(/height="[0-9]+"/, ''); 

        // Change default fill color
        line = line.replace('#ececec', '#E2E4EB'); // gray 200
    }

    const pathIndex = line.indexOf('<path');

    if (pathIndex >= 0) {
        const spaceIndex = line.indexOf(' ', pathIndex);
        const prefix = line.substring(0, spaceIndex + 1);
        const suffix = '>';

        const attributeString = line.substring(prefix.length, line.length - suffix.length).trim();
        const attributes = [];
        for(let offset = 0; offset < attributeString.length; ) {
            const m = attributeString.substring(offset).match(/([a-z]+)="([^"]+)"/);
            if (!m) {
                break;
            }
            const key = m[1];
            const value = m[2];
            attributes[key] = value;
            
            offset += m.index + m[0].length;
        }

        let countryName;
        if (attributes.class) {
            // The original map has a class of country names which don't match our database, and also are not
            // valid CSS class names.
            countryName = attributes.class;
        }
        if (attributes.name && attributes.id) {
            // Countries with only one path have a name and id, but do not have a class
            // Countries with more than one path have a class, but no name and ID
            // This is annoying to work with, so make everything have a class
            countryName = attributes.name;

            delete attributes.name;
            delete attributes.id;
            attributes.class = countryName;
        }

        if (typeof countryNameRemap[countryName] != 'undefined') {
            countryName = attributes.class = countryNameRemap[countryName];
        }

        if (countryName) {
            const countryObj = carriersJson.countries.find(e => e.name == countryName);
            if (countryObj) {
                // Change all class names to be of the form country-US with the last two letters being the two-letter
                // ISO country code in the isoCode field of the carrier data countries table.
                attributes.class = 'country-' +countryObj.isoCode;
            } else {
                console.log('country missing ' + countryName);
            }
        }
        else {
            console.log('country name missing' + line);
        }
        

        line = prefix;
        for(const key in attributes) {
            line += key + '="' + attributes[key] + '" ' 
        }
        line += suffix;

        /*
        const matchClass = line.match('class="([^"]+)"');
        const matchId = line.match('id="([A-Z]+)"');
        const matchName = line.match('name="([^"]+)"');
        
        let countryName;
        if (matchClass) {
            countryName = matchClass[1];
        }
        if (matchId && matchName) {
            // id="BI" name="Burundi"
            // console.log('convert to class ' + matchName[1]);
            countryName = matchName[1];

        }

        if (countryName) {
            const countryObj = carriersJson.countries.find(e => e.name == countryName);
            if (!countryObj) {
                // console.log('country missing ' + countryName);
            }
        }
        else {
            console.log('country name missing' + line);
        }
        */
        
    }


    lines[lineNum] = line;
}


fs.writeFileSync(path.join(__dirname, '../../src/assets/images/world-map.svg'), lines.join('\n'));
