const fs = require('fs');
const { update } = require('lodash');
const path = require('path');

const generatorConfig = require('./generator-config');

(function(updater) {

    updater.datastore = {};

    updater.datastore.data = {};

    //
    // Copied from ../../src/assets/js/updater.datastore.js
    // Should find a better way to do this!
    //
    updater.datastore.countryInList = function(country, countryList) {
        let found = false;

        countryList.forEach(function(obj) {
            if (obj.name == country) {
                found = true;
            }
        });

        return found;
    };

    updater.datastore.findModemByModel = function(model) {
        for(let ii = 0; ii < updater.datastore.data.modems.length; ii++) {
            const obj = updater.datastore.data.modems[ii];
            if (obj.model == model) {
                return obj;
            }
        }
        return null;
    };

    updater.datastore.findRegionGroupById = function(id) {
        for(let ii = 0; ii < updater.datastore.data.regionGroups.length; ii++) {
            const obj = updater.datastore.data.regionGroups[ii];
            if (obj.id == id) {
                return obj;
            }
        }
        return null;
    };

    updater.datastore.findSimById = function(id) {
        for(let ii = 0; ii < updater.datastore.data.sims.length; ii++) {
            const obj = updater.datastore.data.sims[ii];
            if (obj.id == id) {
                return obj;
            }
        }
        return null;
    };

    updater.datastore.findSimPlanById = function(id) {
        for(let ii = 0; ii < updater.datastore.data.simPlans.length; ii++) {
            const obj = updater.datastore.data.simPlans[ii];
            if (obj.id == id) {
                return obj;
            }
        }
        return null;
    };

    updater.datastore.findSkuByName = function(name, createIfNecessary) {
        for(let ii = 0; ii < updater.datastore.data.skus.length; ii++) {
            const obj = updater.datastore.data.skus[ii];
            if (obj.name == name) {
                return obj;
            }
        }

        if (createIfNecessary) {
            obj = {};
            obj.name = name;
            updater.datastore.data.skus.push(obj);
            return obj;
        }
        else {
            return null;
        }
    };

    updater.datastore.findSkuClassByName = function(name) {
        for(let ii = 0; ii < updater.datastore.data.skuClass.length; ii++) {
            const obj = updater.datastore.data.skuClass[ii];
            if (obj.name == name) {
                return obj;
            }
        }

        return null;
    };

    updater.datastore.findSkusWithSameSimAndModem = function(name, lifecycles) {
        const lookFor = updater.datastore.findSkuByName(name);
        if (!lookFor) {
            return null;
        }

        if (lifecycles != undefined && !Array.isArray(lifecycles)) {
            lifecycles = [lifecycles];
        }

        let results = [];
        for(let ii = 0; ii < updater.datastore.data.skus.length; ii++) {
            const obj = updater.datastore.data.skus[ii];
            if (obj.sim == lookFor.sim && obj.modem == lookFor.modem) {
                if (lifecycles == undefined || lifecycles.includes(obj.lifecycle)) {
                    results.push(obj);
                }
            }
        }
        return results;
    };

    updater.datastore.findSkuFamily = function(family) {
        for(let ii = 0; ii < updater.datastore.data.skuFamily.length; ii++) {
            const obj = updater.datastore.data.skuFamily[ii];
            if (obj.family == family) {
                return obj;
            }
        }

        return null;
    };

    updater.datastore.findTechnologiesForModems = function(modemsOpt) {
        let results = [];
        if (!modemsOpt) {
            modemsOpt = updater.datastore.data.modems;
        }
        modemsOpt.forEach(function(obj) {
            obj.technologies.forEach(function(technology) {
                if (!results.includes(technology)) {
                    results.push(technology);
                }
            });
        });

        results.sort();

        return results;
    };

    updater.datastore.findRecommendationByName = function(name) {
        for(let ii = 0; ii < updater.datastore.data.recommendation.length; ii++) {
            const obj = updater.datastore.data.recommendation[ii];
            if (obj.name == name) {
                return obj;
            }
        }

        return null;
    };
    updater.datastore.pointInBox = function(point, box) {
        // point must have lat and lon members (float)
        // box must have ne and sw, each with lat and lon (like in dataset.data.countries.box)
        let lonInBox;
        if (box.ne.lon < box.sw.lon) {
            lonInBox = (point.lon >= box.sw.lon) || (point.lon <= box.ne.lon);
        }
        else {
            lonInBox = (point.lon >= box.sw.lon) && (point.lon <= box.ne.lon)
        }
        if (lonInBox) {
            if (point.lat >= box.sw.lat && point.lat <= box.ne.lat) {
                return true;
            }
        }
        return false;
    };

    updater.datastore.findCountryByName = function(name) {
        let result = null;

        updater.datastore.data.countries.forEach(function(obj) {
            if (obj.name == name) {
                result = obj;
            }
        });

        return result;
    };

    updater.datastore.findCountryModemSim = function(country, modem, sim) {
        let result = null;

        updater.datastore.data.countryModemSim.forEach(function(obj) {
            if (obj.country == country && obj.modem == modem && obj.sim == sim) {
                result = obj;
            }
        });

        return result;
    };

    updater.datastore.findCountriesByPoint = function(point) {
        // point must have lat and lon members (float)
        let result = [];

        updater.datastore.data.countries.forEach(function(obj) {
            if (obj.box) {
                if (updater.datastore.pointInBox(point, obj.box)) {
                    result.push(obj);
                }
            }

        });

        return result;
    };

    updater.datastore.countryInRegionArray = function(countryName, regionArray) {
        let countryObj = updater.datastore.findCountryByName(countryName);
        if (!countryObj) {
            return false;
        }
        for(let ii = 0; ii < countryObj.regions.length; ii++) {
            if (regionArray.includes(countryObj.regions[ii])) {
                return true;
            }
        }
        return false;
    };



    updater.datastore.findRecommendationByName = function(name) {
        for(let ii = 0; ii < updater.datastore.data.recommendation.length; ii++) {
            const obj = updater.datastore.data.recommendation[ii];
            if (obj.name == name) {
                return obj;
            }
        }

        return null;        
    };
    updater.datastore.isInMapRegion = function(point, name) {
        let found = false;

        updater.datastore.data.mapRegions.forEach(function(obj) {
            if (obj.name == name && obj.box) {
                if (updater.datastore.pointInBox(point, obj.box)) {
                    found = true;
                }
            }

        });
        return found;
    };

    updater.datastore.findMapRegionsByPoint = function(point) {
        // point must have lat and lon members (float)
        let result = [];

        updater.datastore.data.mapRegions.forEach(function(obj) {
            if (obj.box) {
                if (updater.datastore.pointInBox(point, obj.box)) {
                    result.push(obj);
                }
            }

        });

        return result;
    };

    updater.datastore.findSkuLifecycle = function(name) {
        for(let ii = 0; ii < updater.datastore.data.skuLifecycle.length; ii++) {
            const obj = updater.datastore.data.skuLifecycle[ii];
            if (obj.name == name) {
                return obj;
            }
        }

        return null;        
    };

    //
    // Updater Functions
    // 

    updater.skuRegionReadable = {
        global:'Global',
        emeaa:'EMEAA',
        noram:'NORAM',
        americas:'Americas',
    };


    updater.generateCountryList = function(skuFamily, options) {
        if (!options) {
            options = {};
        }

        let modems = [];
        let shortModelForModem = {};

        updater.datastore.data.skuFamily.forEach(function(skuFamilyObj) {
            if (skuFamilyObj.family != skuFamily) {
                return;
            }
            skuFamilyObj.group.forEach(function(groupObj) {
                if (groupObj.sim != 4) {
                    return;
                }
                if (options.groupFn && options.groupFn(groupObj)) {
                    return;
                }
                modems.push(groupObj.modem);

                let models = [];
                groupObj.short.forEach(function(model) {
                    if (options.modelFilterFn) {
                        if (options.modelFilterFn(model)) {
                            return;
                        }
                    }
                    models.push(model);
                });

                if (models.length) {
                    shortModelForModem[groupObj.modem] = models.join(', ');
                }
            });
        });

        // Filter
        let countryModemSimFiltered = [];

        updater.datastore.data.countryModemSim.forEach(function(cmsObj) {
            if (cmsObj.sim != 4 || cmsObj.recommendation != 'YES') {
                // Wrong SIM or not recommended, skip
                return;
            }
            if (!modems.includes(cmsObj.modem)) {
                return;
            }

            countryModemSimFiltered.push(cmsObj);
        });

        // Render
        let md = '';

        let tableOptions = {
            columns: [
            ],
        };

        tableOptions.columns.push({
            key: 'country',
            title: 'Country',
        });
        if (!options.noModel) {
            tableOptions.columns.push({
                key: 'model',
                title: 'Model',
            });
    
        }
        tableOptions.columns.push({
            key: 'technologies',
            title: 'Technologies',
        });
        tableOptions.columns.push({
            key: 'carriers',
            title: 'Carriers',
        });

        let tableData = [];

        technologies = ['2G', '3G', 'Cat1', 'M1'];

        countryModemSimFiltered.forEach(function(cmsObj) {
            let showTechnologies = [];
            let carriers = [];
            
            const modemObj = updater.datastore.findModemByModel(cmsObj.modem);

            updater.datastore.data.countryCarrier.forEach(function(ccObj) {
                if (ccObj.country != cmsObj.country) {
                    return;
                }
                if (!ccObj.supersim || ccObj.supersim.prohibited) {
                    return;
                }   
                let hasTech = false;

                technologies.forEach(function(tech) {
                    if (!modemObj.technologies.includes(tech)) {
                        return;
                    }
                    const allowFlag = ccObj.supersim['allow' + tech]; 
                    if (!allowFlag) {
                        return;
                    }
                    if (tech == 'M1' && allowFlag == 5) {
                        // T-Mobile unofficial support (no longer hiding)
                        // return;
                    }
                    if (options.noVerizon && tech == 'M1' && allowFlag == 7) {
                        // Verizon on Electron LTE and E404 is not supported
                        return;
                    }

                    if (!showTechnologies.includes(tech)) {
                        showTechnologies.push(tech);
                    }
                    hasTech = allowFlag;
                });
                if (!hasTech) {
                    return;
                }

                let carrier = ccObj.carrier;
                if (hasTech !== true) {
                    carrier += '<sup>' + hasTech + '</sup>';
                }

                carriers.push(carrier);
            });

            if (carriers.length == 0) {
                return; 
            }

            showTechnologies.sort();

            tableData.push({
                country: cmsObj.country,
                model: shortModelForModem[cmsObj.modem],
                technologies: showTechnologies.join(', '),
                carriers: carriers.join(', '),
            });

        });

        return updater.generateTable(tableOptions, tableData); 

    };

    updater.generateCountryComparison = function(options) {
        // models: array of objects: title, modem, sim
        let tableOptions = {
            columns: [
                {
                    key: 'country',
                    title: 'Country',
                },
            ],
        };
        for(let ii = 0; ii < options.models.length; ii++) {
            tableOptions.columns.push({
                key: ii.toString(),
                title: options.models[ii].title,
                align: 'center',
            });
        }

        let recommendationMap = {
            'YES': '&check;', 
            'NS': '?',
            'POSS': '',
            'NRND': 'NRND',
            'NR': '',
        }

        let tableData = [];

        for(const cmsObj of updater.datastore.data.countryModemSim) {
            for(let ii = 0; ii < options.models.length; ii++) {                
                if (cmsObj.modem != options.models[ii].modem || cmsObj.sim != options.models[ii].sim) {
                    continue;
                }
                if (cmsObj.roamingRestrictions == 'hide') {
                    continue;
                }
                let countryData = tableData.find(e => e.country == cmsObj.country);
                if (!countryData) {
                    countryData = {
                        country: cmsObj.country
                    }
                    tableData.push(countryData);
                }
                let recommendation;
                if (!recommendation && options.models[ii].recommendationMap) {
                    recommendation = options.models[ii].recommendationMap[cmsObj.recommendation];
                }
                if (!recommendation) {
                    recommendation = recommendationMap[cmsObj.recommendation];
                }
                countryData[ii.toString()] = recommendation;
            }    
        }

        // Remove blank rows
        for(let row = tableData.length - 1; row >= 0; row--) {
            let hasData = false;

            for(let ii = 0; ii < options.models.length; ii++) {                
                if (tableData[row][ii.toString()]) {
                    hasData = true;
                }
            }
            if (!hasData) {
                tableData.splice(row, 1);
            }
        }

        tableData.sort(function(a, b) {
            return a.country.localeCompare(b.country);
        });
        

        // Render
        return updater.generateTable(tableOptions, tableData);        
    }

    updater.generateSkuToPrefix = function(options = {}) {
        let skus = [];

        let tableOptions = {
            columns: [
                {
                    key: 'sku',
                    title: 'SKU',
                },
                {
                    key: 'desc',
                    title: 'Description',
                },
                {
                    key: 'lifecycle',
                    title: 'Lifecycle',
                },
                {
                    key: 'prefix',
                    title: 'Prefix',
                },
            ],
        };

        let tableData = [];

        for(const skuObj of updater.datastore.data.skus) {
            if (skuObj.lifecycle == 'Hidden' || skuObj.accessory) {
                continue;
            }
            if (!skuObj.prefix) {
                continue;
            }
            tableData.push({
                sku: skuObj.name,
                desc: skuObj.desc,
                prefix: skuObj.prefix,
                lifecycle: skuObj.lifecycle,
            });
        }

        tableData.sort(function(a, b) {
            return a.sku.localeCompare(b.sku);
        });

        // Render
        return updater.generateTable(tableOptions, tableData);        
    }

    updater.generatePrefixToSku = function(options = {}) {
        let skus = [];

        let tableOptions = {
            columns: [
                {
                    key: 'prefix',
                    title: 'Prefix',
                },
                {
                    key: 'sku',
                    title: 'SKU',
                },
                {
                    key: 'desc',
                    title: 'Description',
                },
                {
                    key: 'lifecycle',
                    title: 'Lifecycle',
                },
            ],
        };

        let tableData = [];

        for(const skuObj of updater.datastore.data.skus) {
            if (skuObj.lifecycle == 'Hidden' || skuObj.accessory) {
                continue;
            }
            if (!skuObj.prefix) {
                continue;
            }
            tableData.push({
                sku: skuObj.name,
                desc: skuObj.desc,
                prefix: skuObj.prefix,
                lifecycle: skuObj.lifecycle,
            });
        }

        tableData.sort(function(a, b) {
            return a.prefix.localeCompare(b.prefix);
        });

        // Render
        return updater.generateTable(tableOptions, tableData);   
    }

    updater.generateFamilySkus = function(skuFamily, options) {
        let skus = [];

        if (!options) {
            options = {};
        }

        // Filter
        updater.datastore.data.skus.forEach(function(skuObj) {
            if (skuObj.family != skuFamily) {
                return;
            }

            if (skuObj.lifecycle == 'Discontinued' && skuObj.skuClass == 'kit') {
                // Hide discontinued kits
                return;
            }
            if (skuObj.lifecycle == 'Hidden') {
                // Hidden, whether a kit or not
                return;
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            skus.push(skuObj);
        });

        // Sort
        skus.sort(function(a, b) {
            const lifecycleA = updater.datastore.findSkuLifecycle(a.lifecycle);
            const lifecycleB = updater.datastore.findSkuLifecycle(b.lifecycle);

            let cmp = lifecycleA.sortOrder - lifecycleB.sortOrder;
            if (cmp) {
                return cmp;
            }

            return a.name.localeCompare(b.name);
        });

        // Render
        let md = '';

        const skuFamilyObj = updater.datastore.findSkuFamily(skuFamily);

        md += '| SKU | Description | Region ';
        if (!skuFamilyObj.wifi) {
            md += ' | Modem | EtherSIM';
        }
        md += '| Lifecycle | Replacement |\n';

        //
        md += '| :--- | :--- | :--- ';
        if (!skuFamilyObj.wifi) {
            md += ' | :--- | :---: ';
        }
        md += '| :--- | :--- |\n';

        skus.forEach(function(skuObj) {
            md += '| ' + skuObj.name + ' | ' + skuObj.desc + ' | ' + updater.skuRegionReadable[skuObj.skuRegion];

            if (!skuFamilyObj.wifi) {
                md += ' | ' + skuObj.modem;
                md += ' | ' + ((skuObj.sim == 4) ? '&check;' : '');
            }

            md += ' | ' + skuObj.lifecycle + ' | ' + (skuObj.replacement ? skuObj.replacement : '') + '|\n'; 
        });

        return md;
    }


    updater.generateTable = function(options, data) {
        // options includes options, table headers, etc.
        // data contains the data as an array of objects. The elements of the array are rows in the table.

        // options.columns is an array of objects that specify columns of the table left to right
        //   .title 
        //   .align left(default), center, right

        let md = '';

        // Table headers
        let line = '';
        for(const c of options.columns) {
            let title = c.title;
            if (!title) {
                title = c.key.substr(0, 1).toUpperCase() + c.key.substr(1);
            }            
            line += '| ' + (title || '') + ' ';
        }
        md += line + '|\n'; 

        // Table header separator
        line = '';
        for(const c of options.columns) {
            let align;
            switch(c.align || 'left') {
                case 'center':
                    line += '| :---: ';
                    break;

                case 'right':
                    line += '| ---: ';
                    break;
                
                // 'left'
                default: 
                    line += '| :--- ';
                    break;
            }
        }
        md += line + '|\n'; 


        // Table data
        for(const d of data) {
            line = '';
            for(const c of options.columns) {
                if (c.checkmark && d[c.key] === true ) {
                    line += '| &check; ';
                }
                else
                if (d[c.key]) {
                    if (c.map && c.map[d[c.key]]) {
                        line += '| ' + c.map[d[c.key]] + ' ';
                        continue;
                    }

                    if (c.capitalizeValue) {
                        line += '| ' + d[c.key].substr(0, 1).toUpperCase() + d[c.key].substr(1) + ' ';
                    }
                    else {
                        line += '| ' + d[c.key] + ' ';
                    }
                }
                else {
                    line += '| &nbsp; ';
                }
            }
            md += line + '|\n';             
        }


        return md;
    };

    // https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
    updater.escapeHtml = function(s) {
        if (Array.isArray(s)) {
            let s2 = [];
            for(const s1 of s) {
                s2.push(updater.escapeHtml(s1));
            }
            return s2.join(',<br>');
        }

        if (!s) {
            return '';
        }

        if (typeof s != 'string') {
            return s.toString();
        }

        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    updater.generateHtmlTable = function(options, data) {
        // options includes options, table headers, etc.
        // data contains the data as an array of objects. The elements of the array are rows in the table.

        // options.columns is an array of objects that specify columns of the table left to right
        //   .title 
        //   .align left(default), center, right

        let md = '<table class="' + (options.tableCssClass || '') + '">\n';

        // Table headers
        md += '<thead>\n';
        let line = '';
        for(const c of options.columns) {
            let title = c.title;
            if (!title) {
                title = c.key.substr(0, 1).toUpperCase() + c.key.substr(1);
            }            
            md += '<th>' + updater.escapeHtml(title) + '</th>';
        }
        md += '</thead>\n';

    

        // Table data
        md += '<tbody>\n';
        for(const d of data) {
            line = '<tr>';
            for(const c of options.columns) {
                let align;
                switch(c.align || 'left') {
                    case 'center':
                        align = 'text-align: center; '
                        break;

                    case 'right':
                        align = 'text-align: right; '
                        break;
                    
                    // 'left'
                    default: 
                        align = 'text-align: left; '
                        break;
                }

                line += '<td class="' + (c.cssClass || '') + '" style="' + align + '">';
                if (c.checkmark && d[c.key] === true ) {
                    line += '&check;';
                }
                else
                if (d[c.key]) {
                    if (c.map && c.map[d[c.key]]) {
                        line += updater.escapeHtml(c.map[d[c.key]]);
                        continue;
                    }

                    if (c.capitalizeValue) {
                        line += updater.escapeHtml(d[c.key].substr(0, 1).toUpperCase() + d[c.key].substr(1));
                    }
                    else {
                        line += updater.escapeHtml(d[c.key]);
                    }
                }
                else {
                    line += '&nbsp;';
                }
                line += '</td>';
            }
            md += line + '</tr>\n';             
        }
        md += '</tbody>\n';

        md += '</table>\n';


        return md;
    };

    updater.generateVerizonSku = function(options = {}) {
        let tableData = [];

        updater.datastore.data.skus.forEach(function(skuObj) {
            if (!skuObj.verizon) {
                // Not Verizon
                return;
            }
            
            tableData.push(skuObj);
        });

        tableData.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        let tableOptions = {
            columns: [
                {
                    key: 'name',
                    title: 'SKU',
                },
                {
                    key: 'desc',
                    title: 'Description',
                },
                {
                    key: 'cellAnt',
                    title: 'Antenna',
                },
                {
                    key: 'cellAntAlt',
                    title: 'Antenna Alternative',
                },
            ]
        };

        // Render
        return updater.generateTable(tableOptions, tableData);
    };


    updater.generateUsbCable = function(options = {}) {
        let tableData = [];

        updater.datastore.data.skus.forEach(function(skuObj) {
            if (skuObj.usb === false) {
                // No USB required
                return;
            }
            if (skuObj.lifecycle == 'Hidden') {
                // Hidden SKU
                return;
            }
            if (skuObj.multiple) {
                // Omit tray SKUs
                return;
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            tableData.push(skuObj);
        });

        tableData.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        let tableOptions = {
            columns: [
                {
                    key: 'name',
                    title: 'SKU',
                },
                {
                    key: 'desc',
                    title: 'Description',
                },
                {
                    key: 'usb',
                    title: 'USB Cable',
                    map: {
                        'micro-b': 'Micro B',
                        'c': 'USB-C',
                    },
                },
            ]
        };

        // Render
        return updater.generateTable(tableOptions, tableData);


    }


    updater.generateBatteryRequired = function(options = {}) {
        let tableData = [];

        updater.datastore.data.skus.forEach(function(skuObj) {
            if (!skuObj.gen) {
                // Not a device
                return;
            }
            if (skuObj.lifecycle == 'Hidden') {
                // Hidden SKU
                return;
            }
            if (skuObj.multiple) {
                // Omit tray SKUs
                return;
            }
            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }
            tableData.push(skuObj);
        });

        tableData.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        let tableOptions = {
            columns: [
                {
                    key: 'name',
                    title: 'SKU',
                },
                {
                    key: 'desc',
                    title: 'Description',
                },
                {
                    key: 'batteryRequired',
                    title: 'Battery Required',
                    checkmark: true,
                    align: 'center',
                },
            ]
        };

        // Render
        return updater.generateTable(tableOptions, tableData);


    }

    updater.generateSkuLifecycle = function(options) {
        let tableData = [];

        if (!options) {
            options = {};
        }

        // Filter
        updater.datastore.data.skus.forEach(function(skuObj) {
            if (!skuObj.lifecycle.startsWith('NRND') && skuObj.lifecycle != 'Deprecated' && skuObj.lifecycle != 'End of life') {
                return;
            }
            
            if (options.omitSkus) {
                if (options.omitSkus.includes(skuObj.name)) {
                    return true;
                }
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            if (!skuObj.multiple || skuObj.accessory) {
                return;
            }

            if (skuObj.lifecycle.startsWith('NRND') && skuObj.endOfSupport) {
                delete skuObj.endOfSupport;
            }

            tableData.push(skuObj);
        });

        const columns = [
            {
                key: 'name',
                title: 'SKU'
            },
            {
                key: 'desc',
                title: 'Description'
            },
            {
                key: 'gen',
                title: 'Gen',
                align: 'center'
            },
            {
                key: 'lifecycle',
                title: 'Lifecycle',
                align: 'center'
            },
            {
                key: 'replacement',
                title: 'Replacement',
                align: 'center'
            },
            {
                key: 'endOfSupport',
                title: 'End of support',
                align: 'center'
            },

        ];

        // Generate data
        let tableOptions = {
            columns
        };


        // Sort table rows
        tableData.sort(function(a, b) {
            if (options.sortFn) {
                return options.sortFn(a, b);
            }

            const lifecycleA = updater.datastore.findSkuLifecycle(a.lifecycle);
            const lifecycleB = updater.datastore.findSkuLifecycle(b.lifecycle);

            let cmp = lifecycleA.sortOrder - lifecycleB.sortOrder;
            if (cmp) {
                return cmp;
            }

            return a.name.localeCompare(b.name);
        });


        // Render
        return updater.generateTable(tableOptions, tableData);
    }


    updater.generateSkuList = function(options) {
        let skus = [];

        if (!options) {
            options = {};
        }

        // Filter
        updater.datastore.data.skus.forEach(function(skuObj) {
            if (options.includeSkus) {
                if (options.includeSkus.includes(skuObj.name)) {
                    skus.push(skuObj);
                    return;
                }
            }

            if (options.lifecycles) {
                if (!options.lifecycles.includes(skuObj.lifecycle)) {
                    return;
                }
            }
            else
            if (options.onlyGA && skuObj.lifecycle != 'GA' && skuObj.lifecycle != 'NRND-US') {
                return;
            }

            if (skuObj.lifecycle == 'Discontinued' && skuObj.skuClass == 'kit') {
                // Hide discontinued kits
                return;
            }
            if (skuObj.lifecycle == 'Hidden') {
                // Hidden, whether a kit or not
                return;
            }

            if (options.omitSkus) {
                if (options.omitSkus.includes(skuObj.name)) {
                    return true;
                }
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            skus.push(skuObj);
        });


        const hasReplacements = skus.some((e) => !!e.replacement);

        const columnDefinitions = {
            batteryInc: {
                title: 'Battery Inc',
                checkmark: true,
                align: 'center'
            },
            cellAntInc: {
                title: 'Cell Ant Inc',
                checkmark: true,
                align: 'center'
            },
            desc: {
                title: 'Description'
            },
            ethersim: {
                title: 'EtherSIM',
                checkmark: true,
                align: 'center'
            },
            gen: {
                title: 'Gen',
                align: 'center'
            },
            inStock: {
                title: 'In Stock',
                align: 'center'
            },
            name: {
                title: 'SKU'
            },
            simName: {
                title: 'SIM'
            },
            skuClass: {
                title: 'Class',
                capitalizeValue: true
            },

            // region, modem, lifecycle, replacement
        };


        // Pick columns
        let columns = [];
        for(const key of options.columns) {
            if (columnDefinitions[key]) {
                if (options.hideEmptyReplacement && key == 'replacement') {
                    if (!hasReplacements) {
                        continue;
                    }
                }

                columns.push(Object.assign({key}, columnDefinitions[key]));
            }
            else {
                columns.push({
                    key,
                    title: key.substr(0, 1).toUpperCase() + key.substr(1)
                });
            }
        }

        // Generate data
        let tableOptions = {
            columns
        };
        let tableData = [];

        skus.forEach(function(skuObj) {
            let row = Object.assign({}, skuObj);

            row.region = skuObj.skuRegion ? updater.skuRegionReadable[skuObj.skuRegion] : '';

            if (skuObj.allocation || skuObj.maxOrder) {
                row.inStock = 'Limited';
            }
            else if (skuObj.inStock) {
                row.inStock = skuObj.inStock.substr(0, 1).toUpperCase() + skuObj.inStock.substr(1);
            }
            else {
                row.inStock = 'No';
            }
            

            if (skuObj.sim) {
                row.ethersim = (skuObj.sim == 4);

                row.simName = updater.datastore.findSimById(skuObj.sim).name;
            }

            tableData.push(row);
        });

        // Sort table rows
        tableData.sort(function(a, b) {
            if (options.sortFn) {
                return options.sortFn(a, b);
            }

            const lifecycleA = updater.datastore.findSkuLifecycle(a.lifecycle);
            const lifecycleB = updater.datastore.findSkuLifecycle(b.lifecycle);

            let cmp = lifecycleA.sortOrder - lifecycleB.sortOrder;
            if (cmp) {
                return cmp;
            }

            return a.name.localeCompare(b.name);
        });


        // Render
        return updater.generateTable(tableOptions, tableData);
    };


    updater.generateAntCell = function(options) {
        let skus = [];

        if (!options) {
            options = {};
        }

        // Filter
        updater.datastore.data.skus.forEach(function(skuObj) {
            if (!skuObj.cellAnt) {
                return;
            }
            if (skuObj.lifecycle == 'Discontinued' || skuObj.lifecycle == 'Hidden') {
                return;
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            skus.push(skuObj);
        });

        // Sort
        skus.sort(function(a, b) {
            return a.desc.localeCompare(b.desc);
        });

        // Render
        let md = '';

        md += '| Device | SKU  | Included | Antenna | Alternate | Lifecycle |\n';
        md += '| :----- | :--- | :--------: | :------: | :--------: | :-------: |\n'; 
        

        skus.forEach(function(skuObj) {
            md += '| ' + skuObj.desc + ' | ' + skuObj.name;
            
            md += ' | ' + (skuObj.cellAntInc ? '&check;' : '&nbsp;');

            md += ' | ' + skuObj.cellAnt;

            if (skuObj.cellAntAlt) {
                let footnote = '2';
                if (skuObj.cellAntAlt == 'ANT-FLXU') {
                    footnote = '3';
                }
                md += ' | ' + skuObj.cellAntAlt + '<sup>' + footnote + '</sup>';
            }
            else {
                md += ' | &nbsp;';
            }

            md += ' | ' + skuObj.lifecycle;

            md += '|\n';
            
        });

        return md;    
    };



    updater.generateAntWiFi = function(options) {
        let skus = [];

        if (!options) {
            options = {};
        }

        // Filter
        updater.datastore.data.skus.forEach(function(skuObj) {
            if (!skuObj.wifiAntInt && !skuObj.wifiAntExt) {
                return;
            }
            if (skuObj.lifecycle == 'Discontinued' || skuObj.lifecycle == 'Hidden') {
                return;
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            skus.push(skuObj);
        });

        // Sort
        skus.sort(function(a, b) {
            return a.desc.localeCompare(b.desc);
        });

        // Render
        let md = '';

        md += '| Device | SKU  | Built-In Antenna | External Compatible | External Included | Lifecycle |\n';
        md += '| :----- | :--- | :--------: | :------: | :------: | :-------: |\n';


        skus.forEach(function(skuObj) {
            md += '| ' + skuObj.desc + ' | ' + skuObj.name;
            
            md += ' | ' + (skuObj.wifiAntInt ? skuObj.wifiAntInt : '&nbsp;');
            md += ' | ' + (skuObj.wifiAntExt ? skuObj.wifiAntExt : '&nbsp;');
            md += ' | ' + (skuObj.wifiAntExtInc ? '&check;' : '&nbsp;');
            md += ' | ' + skuObj.lifecycle;

            md += '|\n';
            
        });

        return md;    
    };



    updater.generateAntBle = function(options) {
        let skus = [];

        if (!options) {
            options = {};
        }

        // Filter
        updater.datastore.data.skus.forEach(function(skuObj) {
            if (!skuObj.bleAntInt && !skuObj.bleAntExt) {
                return;
            }
            if (skuObj.lifecycle == 'Hidden' || skuObj.lifecycle == 'End of life') {
                return;
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            skus.push(skuObj);
        });

        // Sort
        skus.sort(function(a, b) {
            return a.desc.localeCompare(b.desc);
        });

        // Render
        let md = '';

        md += '| Device | SKU  | Built-In Antenna | External Compatible | External Included | Lifecycle |\n';
        md += '| :----- | :--- | :--------: | :------: | :------: | :-------: |\n';


        skus.forEach(function(skuObj) {
            md += '| ' + skuObj.desc + ' | ' + skuObj.name;
            
            md += ' | ' + (skuObj.bleAntInt ? '&check;' : '&nbsp;');
            md += ' | ' + (skuObj.bleAntExt ? skuObj.bleAntExt : '&nbsp;');
            md += ' | ' + (skuObj.bleAntExtInc ? '&check;' : '&nbsp;');
            md += ' | ' + skuObj.lifecycle;

            md += '|\n';
            
        });

        return md;    
    };


    updater.generateAntNfc = function(options) {
        let skus = [];

        if (!options) {
            options = {};
        }

        // Filter
        updater.datastore.data.skus.forEach(function(skuObj) {
            if (!skuObj.nfcAntExt) {
                return;
            }
            if (skuObj.lifecycle == 'Hidden' || skuObj.lifecycle == 'End of life') {
                return;
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            skus.push(skuObj);
        });

        // Sort
        skus.sort(function(a, b) {
            return a.desc.localeCompare(b.desc);
        });

        // Render
        let md = '';



        md += '| Device | SKU  | Compatible | Included | Lifecycle |\n';
        md += '| :----- | :--- | :--------: | :------: | :-------: |\n';


        skus.forEach(function(skuObj) {
            md += '| ' + skuObj.desc + ' | ' + skuObj.name;
            
            md += ' | ' + (skuObj.nfcAntExt ? '&check;': '&nbsp;');
            md += ' | ' + (skuObj.nfcAntExtInc ? '&check;' : '&nbsp;');
            md += ' | ' + skuObj.lifecycle;

            md += '|\n';
            
        });

        return md;    
    };



    updater.generateAntGnss = function(options) {
        let skus = [];

        if (!options) {
            options = {};
        }

        // Filter
        updater.datastore.data.skus.forEach(function(skuObj) {
            if (!skuObj.gnssAntInt && !skuObj.gnssAntExt) {
                return;
            }
            if (skuObj.lifecycle == 'Hidden' || skuObj.lifecycle == 'End of life') {
                return;
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            skus.push(skuObj);
        });

        // Sort
        skus.sort(function(a, b) {
            return a.desc.localeCompare(b.desc);
        });

        // Render
        let md = '';



        md += '| Device | SKU  | Compatible | Included | Lifecycle |\n';
        md += '| :----- | :--- | :--------: | :------: | :-------: |\n';


        skus.forEach(function(skuObj) {
            md += '| ' + skuObj.desc + ' | ' + skuObj.name;
            
            md += ' | ' + ((skuObj.gnssAntInt || skuObj.gnssAntExt)  ? '&check;' : '&nbsp;');
            md += ' | ' + ((skuObj.gnssAntIntInc || skuObj.gnssAntExtInc)  ? '&check;' : '&nbsp;');
            md += ' | ' + skuObj.lifecycle;

            md += '|\n';
            
        });

        return md;    
    };



    updater.generateNotCompatible = function(options) {
        let skus = [];

        if (!options) {
            options = {};
        }

        // Filter
        updater.datastore.data.skus.forEach(function(skuObj) {
            if (skuObj.lifecycle == 'Hidden' || skuObj.lifecycle == 'End of life') {
                return;
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            skus.push(skuObj);
        });

        // Sort
        skus.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        // Render
        let md = '';

        md += '| Family | SKUs |\n';
        md += '| :----- | :--- |\n';

        updater.datastore.data.skuFamily.forEach(function(skuFamilyObj) {
            let familySkuNames = [];

            skus.forEach(function(skuObj) {
                if (skuObj.family != skuFamilyObj.family) {
                    return;
                }
                familySkuNames.push(skuObj.name);
            });

            if (familySkuNames.length > 0) {
                md += '| ' + skuFamilyObj.name + ' | ';

                md += familySkuNames.join(', ');

                md += '|\n'
            }
        });

        return md;    
    };

    updater.generateGen2Migration = function() {
        let md = '';

        // Rows: Country - Carrier
        // Columns: Country, Carrier, Gen 2, Boron 2G/3G, B524/T524, LTE M1

        md += '| Country | Carrier | Gen 2 | BRN314 | B524/T524 | LTE Cat M1 |\n';
        md += '| :--- | :--- | :---: | :---: | :---: | :---: |\n'

        updater.datastore.data.countryCarrier.forEach(function(ccObj) {
            let row = '';
            let hasCheck = false;

            if (!ccObj.telefonicaPPU2020 || ccObj.telefonicaPPU2020.prohibited) {
                if (!ccObj.supersim || ccObj.supersim.prohibited) {
                    // Not Telefonica and not Twilio
                    return;
                }
            }

            row += '| ' + ccObj.country + ' | ' + ccObj.carrier + ' | ';

            if (ccObj.telefonicaPPU2020 && !ccObj.telefonicaPPU2020.prohibited) {
                // Has Telefonica
                let cmsObj = updater.datastore.findCountryModemSim(ccObj.country, 'U201', 1);
                if (cmsObj && (cmsObj.recommendation == 'YES' || cmsObj.recommendation == 'NRND')) {
                    row += '&check; | ';
                    hasCheck = true;
                }
                else {
                    row += '&nbsp; | ';
                }

            }
            else {
                row += '&nbsp; | ';
            }


            if (ccObj.supersim && !ccObj.supersim.prohibited) {
                // Has supersim
                let cmsObj = updater.datastore.findCountryModemSim(ccObj.country, 'U201', 4);
                if (cmsObj && (ccObj.supersim.allow2G || ccObj.supersim.allow3G)) {
                    if (cmsObj.recommendation == 'YES') {
                        row += '&check; | ';
                        hasCheck = true;
                    }
                    else 
                    if (cmsObj.recommendation == 'NRND') {
                        row += '<sup>NRND</sup> | ';
                        hasCheck = true;
                    }
                    else {
                        row += '&nbsp; | ';
                    }

                }
                else {
                    row += '&nbsp; | ';
                }

                cmsObj = updater.datastore.findCountryModemSim(ccObj.country, 'EG91-E', 4);
                if (cmsObj && cmsObj.recommendation == 'YES' && (ccObj.supersim.allow2G || ccObj.supersim.allow3G || ccObj.supersim.allowCat1)) {
                    row += '&check; | ';
                    hasCheck = true;
                }
                else {
                    row += '&nbsp; | ';
                }
                

                cmsObj = updater.datastore.findCountryModemSim(ccObj.country, 'R410', 4);
                if (cmsObj && cmsObj.recommendation == 'YES' && ccObj.supersim.allowM1 === true) {
                    row += '&check; |';
                    hasCheck = true;
                }
                else {
                    row += '&nbsp; |';
                }
                
            }
            else {
                row += '&nbsp; | &nbsp; | &nbsp; |';
            }
            if (hasCheck) {
                md += row + '\n';
            }
        });

        return md;
    };

    updater.simActivationSpeed = function(options) {
        let skus = [];

        if (!options) {
            options = {};
        }

        // Filter
        updater.datastore.data.skus.forEach(function(skuObj) {
            if (!skuObj.cellAnt) {
                return;
            }
            if (skuObj.lifecycle == 'Hidden' || skuObj.lifecycle == 'End of life') {
                return;
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            skus.push(skuObj);
        });

        // Sort
        skus.sort(function(a, b) {
            return a.desc.localeCompare(b.name);
        });

        // Render
        let md = '';

        md += '| SKU | Device | SIM Activation Speed | Lifecycle | Replacement | \n';
        md += '| :-- | :----- | :------------------: | :-------: | :---------: |\n'; 
        

        skus.forEach(function(skuObj) {
            md += '| ' + skuObj.name + ' | ' + skuObj.desc;
            
            switch(skuObj.sim) {
                case 1:
                    md += ' | Generally fast<sup>2</sup>';
                    break;

                case 2:
                case 3:
                    md += ' | Sometimes slow<sup>3</sup>';
                    break;

                default:
                case 4:
                    md += ' | Fast<sup>1</sup>';
                    break;

            }

            md += ' | ' + skuObj.lifecycle;
            md += ' | ' + (skuObj.replacement ? skuObj.replacement : '');

            md += '|\n';
            
        });

        return md;    
    };


    updater.generateSpecialSkuList = function(options) {
        let skus = [];

        if (!options) {
            options = {};
        }

        let tableData = [];

        // Filter
        updater.datastore.data.skus.forEach(function(skuObj) {
            if (skuObj.lifecycle == 'Deprecated' && skuObj.skuClass == 'kit') {
                // Hide discontinued kits
                return;
            }
            if (skuObj.lifecycle == 'Hidden') {
                // Hidden, whether a kit or not
                return;
            }

            if (options.filterFn) {
                if (options.filterFn(skuObj)) {
                    return;
                }
            }

            tableData.push(skuObj);
        });

        // Sort
        skus.sort(function(a, b) {
            const lifecycleA = updater.datastore.findSkuLifecycle(a.lifecycle);
            const lifecycleB = updater.datastore.findSkuLifecycle(b.lifecycle);

            let cmp = lifecycleA.sortOrder - lifecycleB.sortOrder;
            if (cmp) {
                return cmp;
            }

            return a.name.localeCompare(b.name);
        });


        let tableOptions = {
            columns: [
                {
                    key: 'name',
                    title: 'SKU'
                },
                {
                    key: 'desc',
                    title: 'Description'
                },
                {
                    key: 'modem',
                    title: 'Modem'
                },
                /*
                {
                    key: 'lifecycle',
                    title: 'Lifecycle'
                },
                {
                    key: 'replacement',
                    title: 'Replacement'
                }
                */
            ],
        };

        return updater.generateTable(tableOptions, tableData);
    }

    updater.generateExpansionCarrierList = function(options) {
        let tableData = [];

        // Build list of LTE Cat 1 countries
        let cmsList = [];
        for(const cmsObj of updater.datastore.data.countryModemSim) {
            if (cmsObj.modem != 'EG91-E' || cmsObj.sim != 4 || cmsObj.recommendation != 'YES') {
                continue;
            }
            cmsList.push(cmsObj);
        }

        for(const cmsObj of cmsList) {
            for(const ccObj of updater.datastore.data.countryCarrier) {
                if (ccObj.country != cmsObj.country) {
                    continue;
                }
                if (!ccObj.supersim) {
                    continue;
                }
                
                tableData.push({
                    country: ccObj.country,
                    carrier: ccObj.carrier,
                    expansion: (cmsObj.expansion == '2022-05-18')
                });
            }
        }

        let tableOptions = {
            columns: [
                {
                    key: 'country',
                    title: 'Country'
                },
                {
                    key: 'carrier',
                    title: 'Carrier'
                },
                {
                    key: 'expansion',
                    title: 'Expansion',
                    checkmark: true,
                    align: 'center'    
                },
            ]
        };

        return updater.generateTable(tableOptions, tableData);
    };

    updater.generatePinInfo = function(options) {

        const expandMorePins = function(pinArray) {
            let pins = [];
            for(const pin of pinArray) {
                pins.push(pin);
                if (pin.morePins) {
                    for(const pinNum of pin.morePins) {
                        let pinCopy = Object.assign({}, pin);
                        pinCopy.num = pinNum;
                        pins.push(pinCopy);
                    }
                }
            }        
            return pins;
        }


        // Some fields use the format "short|a much longer description" using a vertical bar to
        // separate the parts.
        // This function gets the short (first) part or the whole string if there is no |.
        const getShortName = function(t) {
            if (typeof t == 'number') {
                return t.toString();
            }
            else
            if (typeof t != 'string') {
                return t;
            }
            
            var index = t.indexOf("|");
            if (index > 0) {
                return t.substring(0, index); 
            }
            else {
                return t;
            }
        }

        // Some fields use the format "short|a much longer description" using a vertical bar to
        // separate the parts.
        // This function gets the long (last) part or the whole string if there is no |.
        const getLongDesc = function(t) {
            if (typeof t == 'number') {
                return t.toString();
            }
            else
            if (typeof t != 'string') {
                return t;
            }

            var index = t.indexOf("|");
            if (index > 0) {
                return t.substring(index + 1);
            }
            else {
                return t;
            }
            
        }

        const getPinInfo = function(pinArray, pinNum) {
            for(const p of pinArray) {
                if (p.num == pinNum) {
                    return p;
                }
            }
            return {
                pin: pinNum,
                name: 'NC',
                desc: 'Leave unconnected',
                isMissing: true,
            }
        };

        const getPinUsage = function(p) {
            if (typeof p != 'undefined') {
                if (p === true) {
                    return 'Yes';
                }
                else
                if (p === false) {
                    return 'No';
                }
                else {
                    return getLongDesc(p);
                }
            }
            else {
                return 'n/a';
            }
        };

        const getPinNameWithAlt = function(p) {
            if (!p.altName) {
                return p.name;
            }
            else {
                return p.name + ' / ' + p.altName;
            }
        }

        const portColumnValue = function(value) {
            if (value) {
                if (options.useShortName) {
                    return getShortName(value);
                }
                else {
                    return '&check;';
                }
            }
            else {
                return '&nbsp;';
            }
        } 

        const sortTableData = function(tableData) {
            if (options.tableSortFn) {
                tableData.sort(options.tableSortFn);
            }    
        }

        let platformInfoNew = updater.pinInfo.platforms.find(p => p.name == options.platformNew);
        if (!platformInfoNew) {
            return '';
        }
        platformInfoNew = Object.assign({}, platformInfoNew);

        if (options.pinIncludeFn) {
            let tempPins = [];
            for(let ii = 0; ii < platformInfoNew.pins.length; ii++) {
                if (options.pinIncludeFn(platformInfoNew.pins[ii])) {
                    tempPins.push(platformInfoNew.pins[ii]);
                }
            }
            platformInfoNew.pins = tempPins;
        }

        let platformInfoOld;
        let mappedPins;

        if (options.platformOld) {
            platformInfoOld = updater.pinInfo.platforms.find(p => p.name == options.platformOld);

            mappedPins = [];

            if (options.mapping) {
                let mapping = Object.assign({}, options.mapping);
                
                // Fill in default mapping of matching name if not otherwise mapped
                for(const pinOld of platformInfoOld.pins) {
                    if (!mapping[pinOld.name]) {
                        if (!options.onlyIO || pinOld.isIO) {
                            for(const pinNew of platformInfoNew.pins) {
                                if (pinOld.name == pinNew.name) {
                                    mapping[pinOld.name] = pinNew.name;
                                }
                            }                                
                        }
                    }
                }

                for(const pinOld of platformInfoOld.pins) {
                    if (mapping[pinOld.name]) {
                        for(const pinNew of platformInfoNew.pins) {
                            if (pinNew.name == mapping[pinOld.name]) {
                                let m = {
                                    name: pinOld.name,
                                    title: pinOld.name,
                                    old: pinOld,
                                    new: pinNew,
                                };        
                                mappedPins.push(m);
                                break;
                            }
                        }
                    }
                }

                // Sort
                mappedPins.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                });
            }
            else
            if (options.mapBy && options.mapBy == 'hardwarePin') {
                for(const pinOld of platformInfoOld.pins) {
                    if (pinOld.hardwarePin) {
                        let m = {
                            name: pinOld.name,
                            title: pinOld.name,
                            old: pinOld
                        };
                        for(const pinNew of platformInfoNew.pins) {
                            if (pinNew.hardwarePin && pinNew.hardwarePin == pinOld.hardwarePin) {
                                m.new = pinNew;
                                if (pinOld.name != pinNew.name) {
                                    m.title = pinOld.name + '/' + pinNew.name;
                                }
                                mappedPins.push(m);
                                break;
                            }
                        }
                    }
                }
                // Sort
                mappedPins.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                });
            }
            else
            if (options.mapBy) {
                let foundNew = [];

                for(const pinOld of platformInfoOld.pins) {
                    let m = {
                        name: pinOld.name,
                        title: pinOld.name,
                        old: pinOld
                    };
                    for(const pinNew of platformInfoNew.pins) {
                        if (pinNew.name == pinOld.name) {
                            m.new = pinNew;
                            break;
                        }
                        if (options.mapBy && pinNew[options.mapBy] && pinNew[options.mapBy] == pinOld.name) {                            
                            m.title = pinNew.name + ' (was ' + pinOld.name + ')';
                            m.new = pinNew;
                            break;
                        }
                        if (pinOld.altName && pinNew.name == pinOld.altName) {
                            m.new = pinNew;
                            break;
                        }
                        if (pinNew.altName && pinNew.altName == pinOld.name) {
                            m.name = pinNew.altName;
                            m.title = pinNew.altName;
                            m.new = pinNew;
                            break;
                        }
                        if (pinNew.altName && pinOld.altName && pinNew.altName == pinOld.altName) {
                            m.name = pinNew.altName;
                            m.title = pinNew.altName;
                            m.new = pinNew;
                            break;
                        }
                    }
                    if (m.new) {
                        foundNew[m.new.num] = true;
                    }
                    mappedPins.push(m);                
                }
                // Pins in platformInfoNew but not platformInfoOld
                for(const pinNew of platformInfoNew.pins) {
                    if (!foundNew[pinNew.num]) {
                        let m = {
                            name: pinNew.name,
                            title: pinNew.name,
                            new: pinNew
                        };
                        mappedPins.push(m);                    
                    }
                }

                // Sort
                mappedPins.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                });
                
            }
            else {
                // Map by module pin number
                const oldPinsExpanded = expandMorePins(platformInfoOld.pins);
                const newPinsExpanded = expandMorePins(platformInfoNew.pins);
    
                for(let pinNum = 1; pinNum <= 72; pinNum++) {
                    let oldPin = getPinInfo(oldPinsExpanded, pinNum);
                    let newPin = getPinInfo(newPinsExpanded, pinNum);

                    if (oldPin.isMissing && newPin.isMissing) {
                        continue;
                    }
                    
                    if (options.port && !oldPin[options.port] && !newPin[options.port]) {
                        // Neither device supports this port on this pin
                        continue;
                    }

                    let m = {
                        num: pinNum,
                        old: oldPin,
                        new: newPin,
                    };
                    
                    if (options.noModulePin) {
                        if (oldPin.name == newPin.name) {
                            m.title = oldPin.name;
                        }
                        else {
                            m.title = oldPin.name + ' / ' + newPin.name;
                        }    
                    }
                    else {
                        if (oldPin.name == newPin.name) {
                            m.title = 'Module Pin ' + pinNum + ' (' + oldPin.name + ')';
                        }
                        else {
                            m.title = 'Module Pin ' + pinNum + ' (' + oldPin.name + ' / ' + newPin.name + ')';
                        }    
                    }
                    mappedPins.push(m);                
                }    

                // Sort
                mappedPins.sort(function(a, b) {
                    return parseInt(a.num) - parseInt(b.num);
                });

            }                        
        }
        if (!mappedPins) {
            // Map new pin by module pin
            const newPinsExpanded = expandMorePins(platformInfoNew.pins);
            
            mappedPins = [];

            for(let pinNum = 1; pinNum <= 72; pinNum++) {
                let newPin = getPinInfo(newPinsExpanded, pinNum);

                if (!newPin[options.port]) {
                    // This pin is not used
                    continue;
                }

                let m = {
                    num: pinNum,
                    new: newPin,
                };

                m.title = 'Module Pin ' + pinNum + ' (' + newPin.name + ')\n';
                mappedPins.push(m);                
            }    

            // Sort
            mappedPins.sort(function(a, b) {
                return parseInt(a.num) - parseInt(b.num);
            });
        }


        const newTitle = options.platformNewTitle ? options.platformNewTitle : options.platformNew;
        const oldTitle = options.platformOldTitle ? options.platformOldTitle : options.platformOld;

        let detailsForTag = {};
        for(const d of updater.pinInfo.details) {
            detailsForTag[d.tag] = d;
        }


        let md = '';

        if (options.style == 'pinFunction') {
            const functionCols = [["hardwareADC"], ["i2c","swd"], ["spi"], ["serial"]];


            let pins = [];
            for(const pin of platformInfoNew.pins) {
                if (!pin.isPower && !pin.isControl) {
                    pins.push(pin);
                }
            }
            pins.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });

            let tableOptions = {
                columns: [],
            };
            
            tableOptions.columns.push({
                key: 'pinName',
                title: 'Pin Name',
            });
            if (!options.noPinNumbers) {
                tableOptions.columns.push({
                    key: 'num',
                    title: 'Module Pin',
                    align: 'center',
                });    
            }
            if (options.sortByNum) {
                // Put module pin first
                tableOptions.columns.reverse();
            }


            for(let ii = 0; ii < functionCols.length; ii++) {
                tableOptions.columns.push({
                    key: 'col' + ii,
                    title: ' ',
                });    
            }
            tableOptions.columns.push({
                key: 'hardwarePin',
                title: 'MCU'
            });

            let tableData = [];
            for(const pin of pins) {
                let rowData = Object.assign({}, pin);
                rowData.pinName = getPinNameWithAlt(pin);

                for(let ii = 0; ii < functionCols.length; ii++) {
                    const colKey = 'col' + ii;
                    for(const key of functionCols[ii]) {
                        if (pin[key]) {
                            let s = pin[key];
                            const barIndex = s.indexOf('|');
                            if (barIndex > 0) {
                                s = s.substr(0, barIndex);
                            }
                            rowData[colKey] = s;
                            break;
                        }
                    }
                }
                
                tableData.push(rowData);
            }

            if (options.sortByNum) {
                tableData.sort(function(a, b) {
                    return a.num - b.num;
                });
            }

            md += updater.generateTable(tableOptions, tableData);
        }


        if (options.style == 'modulePins') {
            let pins = expandMorePins(platformInfoNew.pins);    

            pins.sort(function(a, b) {
                return a.num - b.num;
            });
    
            let tableOptions = {
                columns: [],
            };

            if (!options.noPinNumbers) {
                tableOptions.columns.push({
                    key: 'num',
                    title: 'Pin',
                    align: 'center',
                });    
            }
            tableOptions.columns.push({
                key: 'pinName',
                title: 'Pin Name',
            });
            tableOptions.columns.push({
                key: 'desc',
                title: 'Description'
            });
            tableOptions.columns.push({
                key: 'hardwarePin',
                title: 'MCU'
            });

            let tableData = [];
            for(const pin of pins) {
                let rowData = Object.assign({}, pin);
                rowData.pinName = getPinNameWithAlt(pin);
                
                if (options.specialPinFn) {
                    rowData.num = options.specialPinFn(pin.num);
                }

                tableData.push(rowData);
            }

            sortTableData(tableData);

            md += updater.generateTable(tableOptions, tableData);
        }

        if (options.style == 'pwm-groups') {
            let timerNames = [];
            let timers = {};

            for(const p of platformInfoNew.pins) {
                if (p.hardwareTimer) {
                    if (!timerNames.includes(p.hardwareTimer)) {
                        timerNames.push(p.hardwareTimer);
                        timers[p.hardwareTimer] = [];
                    }
                    timers[p.hardwareTimer].push(p.name);
                }
            }
            timerNames.sort(function(a, b) {
                return a.localeCompare(b);
            });

            for(const t of timerNames) {
                timers[t].sort(function(a, b) {
                    return a.localeCompare(b);
                });    

                let tName = t;
                if (options.useGroup) {
                    tName = tName.replace('PWM', 'Group ').replace('TIM', 'Group ');
                }

                md += '- ' + tName + ': ' + timers[t].join(', ') + '\n';
            }
        }


        if (options.style == 'migration-removed') {
            let tableOptions = {
                columns: [],
            };

            if (!options.noPinNumbers) {
                tableOptions.columns.push({
                    key: 'num',
                    title: 'Pin',
                    align: 'center',
                });    
            }
            tableOptions.columns.push({
                key: 'pinName',
                title: 'Pin Name',
            });
            tableOptions.columns.push({
                key: 'desc',
                title: 'Description'
            });
        
            let tableData = [];

            for(const m of mappedPins) {
                let oldPin = m.old;
                let newPin = m.new;
                if (newPin && newPin.name != 'NC') {
                    continue;
                }
                if (!oldPin || oldPin.name == 'NC') {
                    continue;
                }
                let rowData = Object.assign({}, oldPin);
                rowData.pinName = getPinNameWithAlt(oldPin);                
                tableData.push(rowData);
            }

            md += updater.generateTable(tableOptions, tableData);

        }

        if (options.style == 'migration-added') {
            let tableOptions = {
                columns: [],
            };

            if (!options.noPinNumbers) {
                tableOptions.columns.push({
                    key: 'num',
                    title: 'Pin',
                    align: 'center',
                });    
            }
            tableOptions.columns.push({
                key: 'pinName',
                title: 'Pin Name',
            });
            tableOptions.columns.push({
                key: 'desc',
                title: 'Description'
            });
        
            let tableData = [];

            for(const m of mappedPins) {
                let oldPin = m.old;
                let newPin = m.new;
                if (oldPin && oldPin.name != 'NC') {
                    continue;
                }
                if (!newPin || newPin.name == 'NC') {
                    continue;
                }

                let rowData = Object.assign({}, newPin);
                rowData.pinName = getPinNameWithAlt(newPin);                
                tableData.push(rowData);
            }

            md += updater.generateTable(tableOptions, tableData);

        }
        
        if (options.style == 'old-new-comparison') {
            // Use with mapBy: 'hardwarePin' for best results
            let tableOptions = {
                columns: [],
            };

            if (options.changeIndicator) {
                tableOptions.columns.push({
                    key: 'change',
                    title: '&nbsp;',
                    align: 'center',
                });    
            }

            if (options.pinNumberOld) {
                tableOptions.columns.push({
                    key: 'oldPinNum',
                    title: oldTitle + ' Pin Number'
                });    
            }
            tableOptions.columns.push({
                key: 'oldPinName',
                title: oldTitle + ' Pin Name',
            });
            tableOptions.columns.push({
                key: 'oldDesc',
                title: oldTitle + ' Description'
            });
            tableOptions.columns.push({
                key: 'newPinName',
                title: newTitle + ' Pin Name',
            });
            tableOptions.columns.push({
                key: 'newDesc',
                title: newTitle + ' Description'
            });
            if (options.pinNumberNew) {
                tableOptions.columns.push({
                    key: 'newPinNum',
                    title: newTitle + ' Pin Number'
                });    
            }
            if (options.hardwarePin) {
                tableOptions.columns.push({
                    key: 'hardwarePin',
                    title: 'MCU'
                });
            }

            let tableData = [];

            for(const m of mappedPins) {
                let oldPin = m.old;
                let newPin = m.new;
            
                let rowData = Object.assign({}, newPin);

                rowData.oldPinName = getPinNameWithAlt(oldPin);
                rowData.oldDesc = oldPin.desc;
                rowData.oldPinNum = oldPin.num;
                rowData.newPinName = getPinNameWithAlt(newPin);                
                rowData.newDesc = newPin.desc;
                rowData.newPinNum = newPin.num;

                if (rowData.oldPinName != rowData.newPinName || rowData.oldDesc != rowData.newDesc) {
                    rowData.change = '∆'; // delta
                }
                else {
                    rowData.change = '';
                }

                tableData.push(rowData);
            }

            md += updater.generateTable(tableOptions, tableData);

        }

        let comparisonTags = [
            'name',
            'altName',
            'desc',
            'digitalRead',
            'digitalWrite',
            'analogRead',
            'analogWriteDAC',
            'analogWritePWM',
            'tone',
            'serial',
            'spi',
            'i2c',
            'attachInterrupt',
            'can',
            'i2s',
            'internalPull',
            'is5VTolerant',
            'jtag',
            'swd',
            'boot',
        ];

        if (options.style == 'full-details') {
            if (options.showPinNum) {
                comparisonTags.splice(0, 0, 'num');
            }

            comparisonTags.push('hardwarePin', 'm2Pin');

            const pinsExpanded = expandMorePins(platformInfoNew.pins);
            pinsExpanded.sort(function(a, b) {
                return a.num - b.num;
            });

            for(const pin of pinsExpanded) {
            
                md += '\n#### ' + pin.num + ' ' + pin.name + '\n\n';


                let tableOptions = {
                    columns: [],
                    tableCssClass: 'pinDetailTable',
                };
                let tableData = [];

                tableOptions.columns.push({
                    key: 'label',
                    title: ' ',
                    cssClass: 'pinDetailTableLabel',
                });
                tableOptions.columns.push({
                    key: 'function',
                    title: 'Details',
                });

                for(const tag of comparisonTags) {
                    if (!pin[tag]) {
                        continue;
                    }

                    tableData.push({
                        tag,
                        label: detailsForTag[tag].label,
                        function: getPinUsage(pin[tag]),
                    });

                }    

                md += updater.generateHtmlTable(tableOptions, tableData);
                
            }
        }

        if (options.style == 'full-comparison') {
            if (options.showPinNum) {
                comparisonTags.splice(0, 0, 'num');
            }

            for(const m of mappedPins) {
                let oldPin = m.old;
                let newPin = m.new;
                if (!oldPin && !newPin) {
                    continue;
                }
                if (!oldPin) {
                    oldPin = {
                        name: 'NC',
                        desc: 'Leave unconnected'
                    }
                }
                if (!newPin) {
                    newPin = {
                        name: 'NC',
                        desc: 'Leave unconnected'
                    }
                }

                
                let hasChanges = false;
                for(const tag of comparisonTags) {
                    if (!oldPin[tag] && !newPin[tag]) {
                        continue;
                    }

                   if (getPinUsage(oldPin[tag]) != getPinUsage(newPin[tag])) {
                       hasChanges = true;
                       break;
                   }
                }

                if (hasChanges || !options.hideUnchanged) {
                    md += '#### ' + m.title + '\n';
                }

                if (!m.old) {
                    md += '| | Added to ' + newTitle + ' |\n';
                    md += '| :--- | :--- |\n';

                    for(const tag of comparisonTags) {
                        if (!oldPin[tag] && !newPin[tag]) {
                            continue;
                        }
    
                        md += '| ' + detailsForTag[tag].label + ' | ' + getPinUsage(newPin[tag]) + '|\n';
                    }    

                }
                else
                if (!m.new) {
                    md += '| | Removed from ' + oldTitle + ' |\n';
                    md += '| :--- | :--- |\n';

                    for(const tag of comparisonTags) {
                        if (!oldPin[tag] && !newPin[tag]) {
                            continue;
                        }
    
                        md += '| ' + detailsForTag[tag].label + ' | ' + getPinUsage(oldPin[tag]) + '|\n';
                    }    

                }
                else
                if (hasChanges) {
                    let tableOptions = {
                        columns: [],
                    };
                    let tableData = [];

                    tableOptions.columns.push({
                        key: 'change',
                        title: ' ',
                    });

                    tableOptions.columns.push({
                        key: 'label',
                        title: ' ',
                    });

                    tableOptions.columns.push({
                        key: 'oldFunction',
                        title: oldTitle,
                    });

                    tableOptions.columns.push({
                        key: 'newFunction',
                        title: newTitle,
                    });
    
                    for(const tag of comparisonTags) {
                        if (!oldPin[tag] && !newPin[tag]) {
                            continue;
                        }

                        let change = '';
                        if (getPinUsage(oldPin[tag]) != getPinUsage(newPin[tag])) {
                            change = '∆';
                        }

                        tableData.push({
                            tag,
                            label: detailsForTag[tag].label,
                            oldFunction: getPinUsage(oldPin[tag]),
                            newFunction: getPinUsage(newPin[tag]),
                            change,
                        });

                    }    

                    md += updater.generateTable(tableOptions, tableData);
                }
                else 
                if (!options.hideUnchanged) {
                    md += '| | Unchanged between ' + oldTitle + ' and ' + newTitle + ' |\n';
                    md += '| :--- | :--- |\n';

                    for(const tag of comparisonTags) {
                        if (!oldPin[tag] && !newPin[tag]) {
                            continue;
                        }
    
                        md += '| ' + detailsForTag[tag].label + ' | ' + getPinUsage(oldPin[tag]) + '|\n';
                    }    

                }

            }

        }

        if (options.style == 'port-comparison') {
            // options.port

            let tableOptions = {
                columns: [],
            };

            if (!options.noPinNumbers) {
                tableOptions.columns.push({
                    key: 'num',
                    title: 'Pin',
                    align: 'center',
                });    
            }
            if (options.oldPinNumber) {
                tableOptions.columns.push({
                    key: 'oldNum',
                    title: oldTitle + ' Pin',
                    align: 'center',
                });    
            }
            tableOptions.columns.push({
                key: 'oldPinName',
                title: oldTitle + ' Pin Name'
            });    
            tableOptions.columns.push({
                key: 'oldPort',
                title: oldTitle + ' ' + options.label,
                checkmark: !!options.checkmark,
            });    
            if (options.newPinNumber) {
                tableOptions.columns.push({
                    key: 'newNum',
                    title: newTitle + ' Pin',
                    align: 'center',
                });    
            }
            tableOptions.columns.push({
                key: 'newPinName',
                title: newTitle + ' Pin Name'
            });    
            tableOptions.columns.push({
                key: 'newPort',
                title: newTitle + ' ' + options.label,
                checkmark: !!options.checkmark,
            });    
            if (options.includeHardwareTimer) {
                tableOptions.columns.push({
                    key: 'newHardwareTimer',
                    title: newTitle + ' Hardware Timer'
                });        
            }

            let tableData = [];

            for(const m of mappedPins) {
                if ((m.new && m.new[options.port]) || (m.old && m.old[options.port])) {
                    let rowData = {
                        num: m.num
                    };
                    if (m.old) {
                        rowData.oldNum = m.old.num;
                        rowData.oldPinName = getPinNameWithAlt(m.old);
                        rowData.oldPort = portColumnValue(m.old[options.port]);
                    }
                    if (m.new) {
                        rowData.newNum = m.new.num;
                        rowData.newPinName = getPinNameWithAlt(m.new);
                        rowData.newPort = portColumnValue(m.new[options.port]);
                        rowData.newHardwareTimer = m.new.hardwareTimer;
                    }
                    tableData.push(rowData);
                }
            }            



            md += updater.generateTable(tableOptions, tableData);
        }

        if (options.style == 'portPins') {
            // options.port
            const newPins = expandMorePins(platformInfoNew.pins);

            // Options: showBootMode include columns for special boot mode

            let tableOptions = {
                columns: [],
            };

            if (!options.noPinNumbers) {
                tableOptions.columns.push({
                    key: 'num',
                    title: 'Pin',
                    align: 'center',
                });    
            }
            if (platformInfoOld) {
                tableOptions.columns.push({
                    key: 'oldPinName',
                    title: options.platformOld + ' Pin Name',
                });
                tableOptions.columns.push({
                    key: 'oldPort',
                    title: options.platformOld + ' ' + options.label,
                    checkmark: !!options.checkmark,
                });
    
            }
            tableOptions.columns.push({
                key: 'newPinName',
                title: options.platformNew + ' Pin Name',
            });
            tableOptions.columns.push({
                key: 'newPort',
                title: options.platformNew + ' ' + options.label,
                checkmark: !!options.checkmark,
            });
            if (options.newMCU) {
                tableOptions.columns.push({
                    key: 'newHardwarePin',
                    title: options.newMCU,
                });    
            }
            if (options.showBootMode) {
                tableOptions.columns.push({
                    key: 'newBoot',
                    title: 'Special boot function'
                });    
            }

            
            let tableData = [];

            
            for(const m of mappedPins) {
                if ((m.new && m.new[options.port]) || (m.old && m.old[options.port])) {
                    let rowData = {
                        num: m.num
                    };
                    if (m.old) {
                        rowData.oldPinName = getPinNameWithAlt(m.old);
                        rowData.oldPort = portColumnValue(m.old[options.port]);
                        rowData.oldHardwarePin = m.old.hardwarePin;
                    }
                    if (m.new) {
                        rowData.newPinName = getPinNameWithAlt(m.new);
                        rowData.newPort = portColumnValue(m.new[options.port]);
                        rowData.newHardwarePin = m.new.hardwarePin;
                        rowData.newBoot = m.new.boot;
                    }
                    tableData.push(rowData);
                }

            }
            sortTableData(tableData);
        

            md += updater.generateTable(tableOptions, tableData);
        }

        if (options.style == 'interfacePins') {
            // options.interface

            let pins = [];
            for(const pin of platformInfoNew.pins) {
                if (options.is5VTolerant) {
                    if (pin.is5VTolerant) {
                        pins.push(pin);
                    }
                }
                else
                if (pin[options.interface]) {
                    pins.push(pin);
                }    
                if (options.otherNames) {
                    if (options.otherNames.includes(pin.name)) {
                        pins.push(pin);
                    }
                }
            }

            pins.sort(function(a, b) {
                return a.num - b.num;
            });

            let tableOptions = {
                columns: [],
            };

            if (!options.noPinNumbers) {
                tableOptions.columns.push({
                    key: 'num',
                    title: 'Pin',
                    align: 'center',
                });    
            }
            tableOptions.columns.push({
                key: 'pinName',
                title: 'Pin Name',
            });
            tableOptions.columns.push({
                key: 'desc',
                title: 'Description'
            });
            if (!options.noInterface) {
                tableOptions.columns.push({
                    key: 'interface'
                });    
            }
            if (options.showHardwareTimer) {
                tableOptions.columns.push({
                    key: 'hardwareTimer',
                    title: 'Timer',
                });    
            }
            if (options.showSomPin) {
                tableOptions.columns.push({
                    key: 'somPin',
                    title: 'SoM Pin'
                });    
            }
            if (options.showP2pin) {
                tableOptions.columns.push({
                    key: 'p2pin',
                    title: 'P2 Pin'
                });    
            }
            if (!options.noMCU) {
                tableOptions.columns.push({
                    key: 'hardwarePin',
                    title: 'MCU'
                });    
            }

            let tableData = [];
            for(const pin of pins) {
                let rowData = Object.assign({}, pin);
                rowData.pinName = getPinNameWithAlt(pin);
                rowData.interface = getShortName(pin[options.interface]);
                
                tableData.push(rowData);
            }
            sortTableData(tableData);

            md += updater.generateTable(tableOptions, tableData);
        }

        if (options.style == 'bootPins') {
            // options.interface

            let pins = [];
            for(const pin of platformInfoNew.pins) {
                if (pin.boot) {
                    pins.push(pin);
                }    
            }

            pins.sort(function(a, b) {
                return a.num - b.num;
            });

            let tableOptions = {
                columns: [],
            };

            if (!options.noPinNumbers) {
                tableOptions.columns.push({
                    key: 'num',
                    title: 'Pin',
                    align: 'center',
                });    
            }
            tableOptions.columns.push({
                key: 'pinName',
                title: 'Pin Name',
            });
            tableOptions.columns.push({
                key: 'boot',
                title: 'Description'
            });
            tableOptions.columns.push({
                key: 'hardwarePin',
                title: 'MCU'
            });

            let tableData = [];
            for(const pin of pins) {
                let rowData = Object.assign({}, pin);
                rowData.pinName = getPinNameWithAlt(pin);
                rowData.interface = getShortName(pin[options.interface]);
                
                tableData.push(rowData);
            }

            md += updater.generateTable(tableOptions, tableData);
        }

        if (options.style == 'classic-adapter') {
            let tableOptions = {
                columns: [],
            };

            if (!options.noPinNumbers) {
                tableOptions.columns.push({
                    key: 'num',
                    title: 'Pin',
                    align: 'center',
                });    
            }
            tableOptions.columns.push({
                key: 'oldPinName',
                title: options.platformOld + ' Pin Name',
            });
            tableOptions.columns.push({
                key: 'oldDesc',
                title: options.platformOld + ' Description',
            });
            tableOptions.columns.push({
                key: 'newPinName',
                title: options.platformNew + ' Pin Name',
            });
            tableOptions.columns.push({
                key: 'newDesc',
                title: options.platformNew + ' Description',
            });
            /*
            tableOptions.columns.push({
                key: 'hardwarePin',
                title: 'MCU'
            });
            */

            let tableData = [];
            for(const m of mappedPins) {
                let rowData = {};
                if (m.old) {
                    rowData.oldPinName = getPinNameWithAlt(m.old);
                    rowData.oldDesc = m.old.desc;
                    if (m.new && m.new.classicAdapter) {
                        rowData.newPinName = getPinNameWithAlt(m.new);
                        rowData.newDesc = m.new.desc;    
                    }
                    else {
                        rowData.newDesc = 'Not Connected';    
                    }
                }
                else {
                    rowData.oldDesc = 'Not Connected';
                    rowData.newPinName = getPinNameWithAlt(m.new);
                    rowData.newDesc = m.new.desc;                    
                }
                tableData.push(rowData);
            }
            md += updater.generateTable(tableOptions, tableData);
        }

        if (options.style == 'pinNameChange2022_02_25') {
            let pins = [];
            for(const pin of platformInfoNew.pins) {
                if (pin['nameBefore2022_02_25']) {
                    pins.push(pin);
                }
            }

            pins.sort(function(a, b) {
                let cmp = parseInt(a['nameBefore2022_02_25'].substr(1)) - parseInt(b['nameBefore2022_02_25'].substr(1));
                // console.log('a=' + a['nameBefore2022_02_25'] + ' b=' + b['nameBefore2022_02_25'] + ' cmp=' + cmp);
                return cmp;
            });

            md += '| Pin | Old Pin Name | New Pin Name | Description | MCU |\n';
            md += '| :---: | :---: | :---: | :--- |:--- |\n'
    
            for(const pin of pins) {
                md += '| ' + pin.num + ' | ' + pin['nameBefore2022_02_25'] + '|' + getPinNameWithAlt(pin) + ' | ' + pin.desc + ' | ';
                
                md += (pin.hardwarePin ? pin.hardwarePin : '') + ' |\n';
            }            
        }

        return md;
    };

    updater.generateMd = function(guid) {
        for(const updateConfig of generatorConfig.updates) {
            if (updateConfig && updateConfig.guid == guid) {
                return updateConfig.generatorFn(updater);
            }
        }
        // Error is flagged in the caller to generateMd
        return '';
    };

    updater.updateFile = function(name, files) {
        // name is the key into the files object
        // it is the pathname to the md file in the src directory. For example:
        // "content/tutorials/cellular-connectivity/introduction.md"

        // updater.srcPath is the path to the src directory, so you can make a path
        // to a file on disk by using path.join(updater.srcPath, name)

        const file = files[name];
        // file.contents: buffer of the file contents
        // file.stats: file stat information

        // {{!-- BEGIN do not edit content below, it is automatically generated 323fb696-76c4-11eb-9439-0242ac130002 --}}
        // {{!-- END do not edit content above, it is automatically generated --}}
        const replacePrefixBegin = '{{!-- BEGIN do not edit content below, it is automatically generated ';
        const replacePrefixEnd = '{{!-- END do not edit content above, it is automatically generated';

        const guidRE = /([-A-Fa-f0-9]+)/;

        let contentsStr = file.contents.toString();
        if (contentsStr.indexOf(replacePrefixBegin) < 0) {
            // Nothing to update
            return;
        }

        let blocks = [];
        let guid;
        let inGuid = false;
        let currentBlock = '';
        
        contentsStr.split("\n").forEach(function(line, index) {
            if (!inGuid) {
                currentBlock += line + '\n';

                if (line.startsWith(replacePrefixBegin)) {
                    const m = line.substring(replacePrefixBegin.length).match(guidRE);
                    if (m) {
                        guid = m[1];
                        updater.curOptions = line.substring(replacePrefixBegin.length + m.index + guid.length + 1).trim();
                        const endIndex = updater.curOptions.lastIndexOf('--');
                        if (endIndex >= 0) {
                            updater.curOptions = updater.curOptions.substring(0, endIndex).trim();
                        }
                        // console.log('file=' + name + ' guid=' + guid);
                        inGuid = true;
                        if (currentBlock.length) {
                            blocks.push(currentBlock);
                            const md = updater.generateMd(guid);
                            if (md) {
                                // I'm not sure the newlines are necessary here, but the old generator put them in
                                blocks.push('\n' + md + '\n\n');
                            }
                            else {
                                console.log('no update configuration for ' + guid + ' used in file=' + name);
                            }
                        }
                        currentBlock = '';    
                    }
                    else {
                        console.log('missing guid file=' + name + ' : ' + line);
                    }
                }
            }
            else {
                if (line.startsWith(replacePrefixEnd)) {
                    inGuid = false;
                    currentBlock = line + '\n';
                }
            }            
        });

        if (currentBlock.length) {
            blocks.push(currentBlock);
        }

        // console.log('file', file);

        // Read the original file to get the front matter
        const mdPath = path.join(updater.srcPath, name);

        const oldDocsData = fs.readFileSync(mdPath, 'utf8');
        let frontMatter = '';
        let dashCount = 0;
        for(let line of oldDocsData.split('\n')) {
            line = line.trim();
            frontMatter += line + '\n';
            if (line == '---') {
                if (++dashCount == 2) {
                    break;
                }            
            }
        }

        let newDocsData = frontMatter;

        for(const b of blocks) {
            if (b === null) {
                newDocsData += '\n' + md + '\n\n';
            }
            else {
                newDocsData += b;
            }
        }  

        // Make newDocsData end with exactly one \n, otherwise it keeps getting one added on each run
        let len = newDocsData.length;
        while(len > 0 && newDocsData.charAt(len - 1) == '\n') {
            len--;
        }
        if ((len + 1) < newDocsData.length) {
            newDocsData = newDocsData.substring(0, len + 1);
        }
        
        // console.log('file=' + name, newDocsData);
        if (oldDocsData != newDocsData) {
            console.log('updated ' + name);

            file.contents = Buffer.from(newDocsData, 'utf8');
            fs.writeFileSync(mdPath, newDocsData);
        }
    };

    //
    // Do the update
    // Called at the end of this file
    //
    updater.doUpdate = function(scriptsDir, files) {

        //updater.pathPrefix = path.resolve(scriptsDir, '../src/content');
        updater.srcPath = path.resolve(scriptsDir, '../src');

    
        updater.pinInfo = JSON.parse(fs.readFileSync(path.resolve(scriptsDir, '../src/assets/files/pinInfo.json'), 'utf8'));

        updater.datastore.data = JSON.parse(fs.readFileSync(path.resolve(scriptsDir, '../src/assets/files/carriers.json'), 'utf8'));

        for(let name in files) {
            if (name.endsWith('.md')) {
                updater.updateFile(name, files);
            }
        }

        // console.log('carriers-update complete');
    };

}(module.exports));
