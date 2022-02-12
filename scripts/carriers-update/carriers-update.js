const fs = require('fs');
const path = require('path');
const { option } = require('yargs');

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

                shortModelForModem[groupObj.modem] = models.join(', ');
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

        // Country 2G 3G Cat1 M1 Model Carriers?
        md += '| Country | Model | Technologies | Carriers |\n';
        md += '| :--- | :--- | :--- | :--- |\n';

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
                    if (!ccObj.supersim['allow' + tech]) {
                        return;
                    }
                    if (!showTechnologies.includes(tech)) {
                        showTechnologies.push(tech);
                    }
                    hasTech = true;
                });
                if (!hasTech) {
                    return;
                }
                carriers.push(ccObj.carrier);
            });

            if (carriers.length == 0) {
                return; 
            }

            showTechnologies.sort();


            md += '| ' + cmsObj.country + ' | ' + shortModelForModem[cmsObj.modem] + ' | ' + showTechnologies.join(', ');
            md += ' | ' + carriers.join(', ') + ' |\n';

        });

        return md;

    };

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
                if (c.checkmark) {
                    line += '| ' + (d[c.key] ? '&check;' : '');
                }
                else
                if (d[c.key]) {
                    if (c.capitalizeValue) {
                        line += '| ' + d[c.key].substr(0, 1).toUpperCase() + d[c.key].substr(1);
                    }
                    else {
                        line += '| ' + d[c.key];
                    }
                }
                else {
                    line += '| ';
                }
            }
            md += line + '|\n';             
        }


        return md;
    };

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
                title: 'EtherSim',
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
            md += ' | ' + (skuObj.cellAntAlt ? skuObj.cellAntAlt + '<sup>2</sup>' : '&nbsp;');

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
                if (cmsObj && cmsObj.recommendation == 'YES' && ccObj.supersim.allowM1) {
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
            if (/*skuObj.lifecycle == 'Discontinued' || */skuObj.lifecycle == 'Hidden') {
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

    updater.generatePinInfo = function(options) {
        const platformInfoNew = updater.pinInfo.platforms.find(p => p.name == options.platformNew);
        if (!platformInfoNew) {
            return '';
        }

        let platformInfoOld;
        if (options.platformOld) {
            platformInfoOld = updater.pinInfo.platforms.find(p => p.name == options.platformOld);
        }


        let detailsForTag = {};
        for(const d of updater.pinInfo.details) {
            detailsForTag[d.tag] = d;
        }

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
                desc: 'Leave unconnected'
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

        let md = '';

        if (options.style == 'pinFunction') {
            const functionCols = [["hardwareADC"], ["i2c","swd"], ["spi"], ["serial"]];

            md += '| Pin Name | Module Pin |';
            for(const colInfo of functionCols) {
                md += '  |';
            }
            md += ' MCU |\n';

            md += '| :--- | :---: |';
            for(const colInfo of functionCols) {
                md += ' :---: |';
            }
            md += ':---: |\n'

            let pins = [];
            for(const pin of platformInfoNew.pins) {
                pins.push(pin);
            }
            pins.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });

            for(const pin of pins) {
                if (pin.isPower) {
                    continue;
                }
                
                md += '| ' + getPinNameWithAlt(pin) + ' | ' + pin.num + ' | ';
                
                for(const colInfo of functionCols) {
                    let added = false;
                    for(const key of colInfo) {
                        if (pin[key]) {
                            added = true;
                            let s = pin[key];
                            const barIndex = s.indexOf('|');
                            if (barIndex > 0) {
                                s = s.substr(0, barIndex);
                            }
                            md += s + ' | ';
                            break;
                        }
                    }
                    if (!added) {
                        md += '  | ';
                    }
                }
                
                md += (pin.hardwarePin ? pin.hardwarePin : '') + ' |\n';
            }
        }


        if (options.style == 'modulePins') {
            md += '| Pin | Pin Name | Description | MCU |\n';
            md += '| :---: | :--- | :--- | :---: |\n'

            let pins = expandMorePins(platformInfoNew.pins);    

            pins.sort(function(a, b) {
                return a.num - b.num;
            });
    
            for(const pin of pins) {
                md += '| ' + pin.num + ' | ' + getPinNameWithAlt(pin) + ' | ' + pin.desc + ' | ' + (pin.hardwarePin ? pin.hardwarePin : '') + ' |\n';
            }
        }

        if (options.style == 'migration-removed') {

            let pins = [];
            for(const pin of platformInfoOld.pins) {
                if (pin.name != 'NC') {
                    if (!platformInfoNew.pins.find(p => p.num == pin.num)) {
                        pins.push(pin);
                    }
                }
            }

            pins.sort(function(a, b) {
                return a.num - b.num;
            });

            md += '| Pin | Pin Name | Description |\n';
            md += '| :---: | :--- | :--- |\n'
    
            for(const pin of pins) {
                md += '| ' + pin.num + ' | ' + getPinNameWithAlt(pin) + ' | ' + pin.desc + ' |\n';
            }

        }

        if (options.style == 'migration-added') {
            let pins = [];
            for(const pin of platformInfoNew.pins) {
                if (pin.name != 'NC') {
                    if (!platformInfoOld.pins.find(p => p.num == pin.num)) {
                        pins.push(pin);
                    }
                }
            }

            pins.sort(function(a, b) {
                return a.num - b.num;
            });

            md += '| Pin | Pin Name | Description |\n';
            md += '| :---: | :--- | :--- |\n'
    
            for(const pin of pins) {
                md += '| ' + pin.num + ' | ' + getPinNameWithAlt(pin) + ' | ' + pin.desc + ' |\n';
            }

        }
        
        if (options.style == 'full-comparison') {

            const comparisonTags = [
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
                'is5VTolerant',
                'jtag',
                'swd'      
            ];


            const oldPins = expandMorePins(platformInfoOld.pins);
            const newPins = expandMorePins(platformInfoNew.pins);

            for(let pinNum = 1; pinNum <= 72; pinNum++) {
                let oldPin = getPinInfo(oldPins, pinNum);
                let newPin = getPinInfo(newPins, pinNum);
                
                if (oldPin.name == newPin.name) {
                    md += '#### Module Pin ' + pinNum + ' (' + oldPin.name + ')\n';
                }
                else {
                    md += '#### Module Pin ' + pinNum + '\n';
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

                if (hasChanges) {
                    md += '| | ' + options.platformOld + ' | ' + options.platformNew + ' |\n';
                    md += '| :--- | :--- | :--- |\n';
    
                    for(const tag of comparisonTags) {
                        if (!oldPin[tag] && !newPin[tag]) {
                            continue;
                        }
    
                        md += '| ' + detailsForTag[tag].label + ' | ' + getPinUsage(oldPin[tag]) + ' | ' + getPinUsage(newPin[tag]) + '|\n';
    
                    }    
                }
                else {
                    md += '| | Unchanged between ' + options.platformOld + ' and ' + options.platformNew + ' |\n';
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
            const platformInfoOld = updater.pinInfo.platforms.find(p => p.id == 8);

            const p1pins = expandMorePins(platformInfoOld.pins);
            const p2pins = expandMorePins(platformInfoNew.pins);

            md += '| Pin | ' + options.platformOld + ' Pin Name | ' + options.platformOld + ' ' + options.label + ' | ' + options.platformNew + ' Pin Name | ' + options.platformNew + ' ' + options.label  + ' |\n';
            md += '| :---: | :--- | :--- | :--- | :--- |\n'

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

            for(let pinNum = 1; pinNum <= 72; pinNum++) {
                let p1pin = getPinInfo(p1pins, pinNum);
                let p2pin = getPinInfo(p2pins, pinNum);

                if (!p1pin[options.port] && !p2pin[options.port]) {
                    // Neither device supports this port on this pin
                    continue;
                }
                md += '| ' + pinNum + ' | ' + getPinNameWithAlt(p1pin) + ' | ' + portColumnValue(p1pin[options.port]) + ' | ';
                md += getPinNameWithAlt(p2pin) + ' | ' + portColumnValue(p2pin[options.port]) + ' | \n';
            }            
        }

        if (options.style == 'interfacePins') {
            // options.interface

            let pins = [];
            for(const pin of platformInfoNew.pins) {
                if (pin[options.interface]) {
                    pins.push(pin);
                }
            }

            pins.sort(function(a, b) {
                return a.num - b.num;
            });

            md += '| Pin | Pin Name | Description | Interface | MCU |\n';
            md += '| :---: | :--- | :--- | :--- |:--- |\n'
    
            for(const pin of pins) {
                md += '| ' + pin.num + ' | ' + getPinNameWithAlt(pin) + ' | ' + pin.desc + ' | ';
                
                md += getShortName(pin[options.interface]) + ' | ';

                md += (pin.hardwarePin ? pin.hardwarePin : '') + ' |\n';
            }
        }

        if (options.style == 'interfaceTypePins') {
            // options.interface

            let pins = [];
            for(const pin of platformInfoNew.pins) {
                if (pin[options.interface]) {
                    pins.push(pin);
                }
            }

            pins.sort(function(a, b) {
                return a.num - b.num;
            });

            md += '| Pin | Pin Name | Description | MCU |\n';
            md += '| :---: | :--- | :--- |:--- |\n'
    
            for(const pin of pins) {
                md += '| ' + pin.num + ' | ' + getPinNameWithAlt(pin) + ' | ' + pin.desc + ' | ';
                
                md += (pin.hardwarePin ? pin.hardwarePin : '') + ' |\n';
            }
        }

        return md;
    };

    updater.docsToUpdate = [
        {
            path:'/datasheets/electron/electron-datasheet.md', 
            updates:[
                {
                    guid:'ab31991a-76c5-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('electron'); 
                    } 
                },
                {
                    guid:'0ca3e34e-76e2-11eb-9439-0242ac130002',
                    generatorFn:function() {
                        return updater.generateCountryList('electron'); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/electron/e-series-datasheet.md', 
            updates:[
                {
                    guid:'26c8707c-76ca-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('e series'); 
                    } 
                },
                {
                    guid:'2445e222-76e2-11eb-9439-0242ac130002',
                    generatorFn:function() {
                        return updater.generateCountryList('e series'); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/electron/e-series-eval-board.md', 
            updates:[
                {
                    guid:'89806642-76cb-11eb-9439-0242ac130002',
                    generatorFn:function() {
                        return updater.generateFamilySkus('e series', {
                            filterFn:function(skuObj) {
                                return skuObj.skuClass != 'eval';
                            }        
                        }); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/boron/boron-datasheet.md', 
            updates:[
                {
                    guid:'281acdea-76ce-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('boron'); 
                    } 
                },
                {
                    guid:'945c4c4c-76d1-11eb-9439-0242ac130002',
                    generatorFn:function() {
                        return updater.generateCountryList('boron'); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/boron/b402-datasheet.md', 
            updates:[
                {
                    guid:'91d8b83c-76ce-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('b series', {
                            filterFn:function(skuObj) {
                                return skuObj.skuRegion != 'noram';
                            }        
                        }); 
                    } 
                },
                {
                    guid:'c9241a2c-76e0-11eb-9439-0242ac130002',
                    generatorFn:function() {
                        return updater.generateCountryList('b series', {
                            groupFn:function(groupObj) {
                                return groupObj.modem != 'R410';
                            }
                        }); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/boron/b523-datasheet.md', 
            updates:[
                {
                    guid:'ea841986-76ce-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('b series', {
                            filterFn:function(skuObj) {
                                return skuObj.skuRegion != 'emeaa';
                            }        
                        }); 
                    } 
                },
                {
                    guid:'99975710-76e0-11eb-9439-0242ac130002',
                    generatorFn:function() {
                        return updater.generateCountryList('b series', {
                            groupFn:function(groupObj) {
                                return groupObj.modem != 'EG91-E';
                            }
                        }); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/asset-tracking/tracker-one.md', 
            updates:[
                {
                    guid:'9aef0d9c-76d6-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('tracker', {
                            filterFn:function(skuObj) {
                                return !skuObj.name.startsWith('ONE');
                            }        
                        }); 
                    } 
                },
                {
                    guid:'2f3d1a14-76de-11eb-9439-0242ac130002',
                    generatorFn:function() {
                        return updater.generateCountryList('tracker', {
                            modelFilterFn:function(model) {
                                return !model.startsWith('ONE');
                            }
                        }); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/asset-tracking/tracker-som-datasheet.md', 
            updates:[
                {
                    guid:'04ad48d4-76d7-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('tracker', {
                            filterFn:function(skuObj) {
                                return !skuObj.name.startsWith('T') || skuObj.skuClass == 'eval';
                            }        
                        }); 
                    } 
                },
                {
                    guid:'8e7b0446-76de-11eb-9439-0242ac130002',
                    generatorFn:function() {
                        return updater.generateCountryList('tracker', {
                            modelFilterFn:function(model) {
                                return !model.startsWith('T');
                            }
                        }); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/asset-tracking/tracker-som-eval-board.md', 
            updates:[
                {
                    guid:'698155b6-76d7-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('tracker', {
                            filterFn:function(skuObj) {
                                return !skuObj.name.startsWith('T') || skuObj.skuClass != 'eval';
                            }        
                        }); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/wi-fi/argon-datasheet.md', 
            updates:[
                {
                    guid:'81ddccf2-774f-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('argon'); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/wi-fi/p1-datasheet.md', 
            updates:[
                {
                    guid:'797577ac-7751-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('p series', {
                            filterFn:function(skuObj) {
                                return !skuObj.name.startsWith('P1');
                            }        
                        }); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/wi-fi/photon-datasheet.md', 
            updates:[
                {
                    guid:'c9a47b1a-7751-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('photon'); 
                    } 
                }
            ]
        },
        {
            path:'/datasheets/certifications/antenna.md', 
            updates:[
                {
                    guid:'95bdb290-775f-11eb-9439-0242ac130002', 
                    generatorFn:updater.generateAntCell
                },
                {
                    guid:'04ed49fe-7766-11eb-9439-0242ac130002', 
                    generatorFn:updater.generateAntWiFi
                },
                {
                    guid:'54f1ecbe-7768-11eb-9439-0242ac130002', 
                    generatorFn:updater.generateAntBle
                },
                {
                    guid:'2b1c34c8-776b-11eb-9439-0242ac130002', 
                    generatorFn:updater.generateAntNfc
                },
                {
                    guid:'dd897350-776b-11eb-9439-0242ac130002', 
                    generatorFn:updater.generateAntGnss
                },
                {
                    guid:'57d69268-776d-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateNotCompatible({
                            filterFn:function(skuObj) {
                                return !!skuObj.cellAnt;
                            }        
                        });
                    }
                },
                {
                    guid:'cee24faa-776d-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateNotCompatible({
                            filterFn:function(skuObj) {
                                return !!skuObj.wifiAntInt || !!skuObj.wifiAntExt;
                            }        
                        });
                    }
                },
                {
                    guid:'2cf3e112-776e-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateNotCompatible({
                            filterFn:function(skuObj) {
                                return !!skuObj.bleAntInt || !!skuObj.bleAntExt;
                            }        
                        });
                    }
                },
                {
                    guid:'6b9301fa-776e-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateNotCompatible({
                            filterFn:function(skuObj) {
                                return !!skuObj.nfcAntExt;
                            }        
                        });
                    }
                }
            ]
        },
        {
            path:'/tutorials/asset-tracking/introduction.md', 
            updates:[
                {
                    guid:'e6d392c0-777e-11eb-9439-0242ac130002', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('tracker'); 
                    } 
                }
            ]
        },
        {
            path:'/tutorials/cellular-connectivity/introduction.md', 
            updates:[
                {
                    guid:'0f0d9a27-0176-4f7d-8006-75cf7c3f5072', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('boron'); 
                    } 
                },
                {
                    guid:'295a969b-7ffa-4f84-8234-7e4cb38d1f10', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('b series'); 
                    } 
                },
                {
                    guid:'d833e557-5289-450c-92cf-a6eedec30bd8', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('tracker'); 
                    } 
                },
                {
                    guid:'7a6e03da-072c-4955-922a-288e9609292a', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('electron'); 
                    } 
                },
                {
                    guid:'d5825d70-1978-4172-a917-9127c8879f4e', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('e series'); 
                    } 
                },
                {
                    // SKUs by region
                    guid:'921d1b74-0130-49e9-9322-3da75e405e4e',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            columns: ['region', 'name', 'desc', 'modem', 'ethersim', 'gen', 'lifecycle', 'replacement'],
                            filterFn: function(skuObj) {
                                return !skuObj.modem;
                            },
                            sortFn: function(a, b) {
                                let cmp = a.skuRegion.localeCompare(b.skuRegion);
                                if (cmp) {
                                    return cmp;
                                }
                                return a.name.localeCompare(b.name);
                            },
                        }); 
                    } 
                },
                {
                    // SKUs by modem
                    guid:'a85479cf-355b-45c8-9062-db69f037bfea',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            columns: ['modem', 'name', 'desc', 'region', 'ethersim', 'gen', 'lifecycle', 'replacement'],
                            filterFn: function(skuObj) {
                                return !skuObj.modem;
                            },
                            sortFn: function(a, b) {
                                let cmp = a.modem.localeCompare(b.modem);
                                if (cmp) {
                                    return cmp;
                                }
                                return a.name.localeCompare(b.name);
                            },
                        }); 
                    }                 
                },
                {
                    // SKUs by SIM
                    guid:'8747e7eb-420e-425e-882c-e10117b77620',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            columns: ['simName', 'name', 'desc', 'region', 'modem', 'gen', 'lifecycle', 'replacement'],
                            filterFn: function(skuObj) {
                                return !skuObj.modem;
                            },
                            sortFn: function(a, b) {
                                let cmp = a.simName.localeCompare(b.simName);
                                if (cmp) {
                                    return cmp;
                                }
                                return a.name.localeCompare(b.name);
                            },
                        }); 
                    }                 
                },
                {
                    // SKUS - 2G only
                    guid:'8d85e976-88f2-11ec-a8a3-0242ac120002',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            columns: ['name', 'desc', 'region', 'modem', 'gen', 'lifecycle', 'replacement'],
                            filterFn: function(skuObj) {
                                const modemObj = updater.datastore.findModemByModel(skuObj.modem);
                                if (!modemObj) {
                                    return true;
                                }
                                if (modemObj.technologies.length != 1) {
                                    return true;
                                }
                                return modemObj.technologies[0] != '2G';
                            },
                            sortFn: function(a, b) {
                                let cmp = a.simName.localeCompare(b.simName);
                                if (cmp) {
                                    return cmp;
                                }
                                return a.name.localeCompare(b.name);
                            },
                        }); 
                    }                 
                },
                {
                    // SKUS - 2G/3G only
                    guid:'84f9efae-88f3-11ec-a8a3-0242ac120002',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            columns: ['name', 'desc', 'region', 'ethersim', 'modem', 'gen', 'lifecycle', 'replacement'],
                            filterFn: function(skuObj) {
                                const modemObj = updater.datastore.findModemByModel(skuObj.modem);
                                if (!modemObj) {
                                    return true;
                                }
                                if (modemObj.technologies.length != 2) {
                                    return true;
                                }
                                return !modemObj.technologies.includes('2G') || !modemObj.technologies.includes('3G');
                            },
                        }); 
                    }                 
                },
                ,
                {
                    // SKUS - LTE Cat M1
                    guid:'2b701cb4-88f4-11ec-a8a3-0242ac120002',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            columns: ['name', 'desc', 'region', 'ethersim', 'modem', 'gen', 'lifecycle', 'replacement'],
                            filterFn: function(skuObj) {
                                const modemObj = updater.datastore.findModemByModel(skuObj.modem);
                                if (!modemObj) {
                                    return true;
                                }
                                return !modemObj.technologies.includes('M1');
                            },
                        }); 
                    }                 
                },
                {
                    // SKUS - LTE Cat 1
                    guid:'42193f40-88f4-11ec-a8a3-0242ac120002',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            columns: ['name', 'desc', 'region', 'ethersim', 'modem', 'gen', 'lifecycle', 'replacement'],
                            filterFn: function(skuObj) {
                                const modemObj = updater.datastore.findModemByModel(skuObj.modem);
                                if (!modemObj) {
                                    return true;
                                }
                                return !modemObj.technologies.includes('Cat1');
                            },
                        }); 
                    }                 
                },
                {
                    // 3rd-party SIM compatible
                    guid:'5299a764-88fa-11ec-a8a3-0242ac120002',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            columns: ['name', 'desc', 'region', 'ethersim', 'modem', 'gen', 'lifecycle', 'replacement'],
                            filterFn: function(skuObj) {
                                if (!skuObj.sim4ff) {
                                    return true;
                                }
                                return false;
                            },
                        }); 
                    }                 
                },
            ]
        },
        {
            path:'/tutorials/learn-more/gen2-cellular-migration.md', 
            updates:[
                {
                    guid:'0f0d9a27-0176-4f7d-8006-75cf7c3f5072', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('boron'); 
                    } 
                },
                {
                    guid:'295a969b-7ffa-4f84-8234-7e4cb38d1f10', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('b series'); 
                    } 
                },
                {
                    guid:'d833e557-5289-450c-92cf-a6eedec30bd8', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('tracker'); 
                    } 
                },
                {
                    guid:'7a6e03da-072c-4955-922a-288e9609292a', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('electron'); 
                    } 
                },
                {
                    guid:'d5825d70-1978-4172-a917-9127c8879f4e', 
                    generatorFn:function() {
                        return updater.generateFamilySkus('e series'); 
                    } 
                },
                {
                    guid:'0c8fb8e4-0420-11ec-9a03-0242ac130003',
                    generatorFn:function() {
                        return updater.generateGen2Migration(); 
                    } 
                }

                
            ]

            
            
        },
        {
            path:'/tutorials/device-cloud/device-claiming.md', 
            updates:[
                {
                    guid:'fabf0754-7838-11ec-90d6-0242ac120003', 
                    generatorFn:function() {
                        return updater.simActivationSpeed(); 
                    } 
                },
            ]
        },
        {
            path: '/tutorials/particle-hardware.md',
            updates: [
                {
                    guid:'b7083b52-4bd3-47a6-85e8-396922c41b33',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'region', 'lifecycle'],
                            filterFn: function(skuObj) {
                                return skuObj.family != 'tracker' || !skuObj.name.includes('ONE');
                            },
                        }); 
                    } 
                },
                {
                    guid:'6a02fd77-1222-4208-8da5-45c9290c5f6d',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'lifecycle'],
                            filterFn: function(skuObj) {
                                return !skuObj.accessory || !skuObj.name.includes('M8');
                            },
                        }); 
                    } 
                },
                {
                    // Argon and Boron, no quantity packs
                    guid:'455bf1d0-0230-4074-bfa7-99ce6e4f6245',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'region', 'batteryInc', 'lifecycle'],
                            filterFn: function(skuObj) {
                                if (skuObj.multiple) {
                                    return true;
                                }
                                return skuObj.gen != '3' || (skuObj.skuClass != 'prototyping' && skuObj.skuClass != 'kit');
                            },
                            omitSkus: [
                                'BRN310TRAY50', 'ARG-AQKT'
                            ]
                        }); 
                    } 
                },                               
                {
                    // Argon and Boron, include multi-packs
                    guid:'a4c0c80f-3745-4b3c-b6dd-e774c4c71ad5',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'region', 'batteryInc', 'lifecycle'],
                            filterFn: function(skuObj) {
                                return skuObj.gen != '3' || (skuObj.skuClass != 'prototyping' && skuObj.skuClass != 'kit');
                            },
                            omitSkus: [
                                'BRN310TRAY50', 'ARG-AQKT'
                            ]
                        }); 
                    } 
                },               

                {
                    guid:'518869dc-61de-43db-add1-f0d57956c4e0',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'region', 'batteryInc', 'cellAntInc', 'lifecycle'],
                            filterFn: function(skuObj) {
                                return skuObj.family != 'boron';
                            },
                        }); 
                    } 
                },
                {
                    guid:'b28329f3-7067-4ae1-aafa-c48b75d77674',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'region', 'lifecycle'],
                            filterFn: function(skuObj) {
                                return skuObj.family != 'b series';
                            },
                            includeSkus:['M2EVAL'],
                        }); 
                    } 
                },
                {
                    guid:'88844fc4-c390-44ff-9254-2fa41e2b8963',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'region', 'lifecycle'],
                            filterFn: function(skuObj) {
                                return skuObj.family != 'tracker' || skuObj.name.includes('ONE');
                            },
                        }); 
                    } 
                },
                {
                    // All trackers
                    guid:'b9f495c6-80bc-49d7-a4b7-cb210f89fb65',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'region', 'batteryInc', 'cellAntInc', 'lifecycle'],
                            filterFn: function(skuObj) {
                                return skuObj.family != 'tracker';
                            },
                        }); 
                    } 
                },
                {
                    // Argon
                    guid:'a1f313d4-5b1a-409e-b03c-32ebec003b10',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'region', 'lifecycle'],
                            filterFn: function(skuObj) {
                                return skuObj.family != 'argon';
                            },
                        }); 
                    } 
                },
                {
                    guid:'5e188545-21ff-4ef8-9510-155caea7014e',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'region', 'batteryInc', 'cellAntInc', 'lifecycle'],
                            filterFn: function(skuObj) {
                                return skuObj.family != 'e series';
                            },
                        }); 
                    } 
                },
                {
                    guid:'8ba8241b-1084-463b-b5be-64cda68e3a4b',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'region', 'lifecycle'],
                            filterFn: function(skuObj) {
                                return skuObj.family != 'p series' || skuObj.name.includes('P0');
                            },
                        }); 
                    } 
                },
                {
                    // Ethernet compatible models: All Gen3 except Tracker One
                    guid:'2de596b8-2889-4df7-86d1-910d5551b34f',
                    generatorFn:function() {
                        return updater.generateSkuList({
                            onlyGA: true,
                            columns: ['name', 'desc', 'region', 'batteryInc', 'cellAntInc', 'lifecycle'],
                            filterFn: function(skuObj) {
                                return skuObj.gen != '3' || skuObj.name.includes('ONE');
                            },
                            includeSkus: [
                                'FWNG-ETH', 'M2EVAL'
                            ],
                            omitSkus: [
                                'BRN310TRAY50', 'ARG-AQKT'
                            ]
                        }); 
                    } 
                },


                

    

            ]
        }    
    ];

    updater.updateDocs = function(pathPrefix, docsPath, guid, md, files) {
        // path: path to md, relative to content. For example: /tutorials/cellular-connectivity/cellular-carriers.md
        // guid: the ID for the block to replace (typically a GUID)
        // md: The md file data to use as the replacement
        
        // {{!-- BEGIN do not edit content below, it is automatically generated 323fb696-76c4-11eb-9439-0242ac130002 --}}
        // {{!-- END do not edit content above, it is automatically generated 323fb696-76c4-11eb-9439-0242ac130002 --}}
        const replacePrefixBegin = '{{!-- BEGIN do not edit content below, it is automatically generated ';
        const replacePrefixEnd = '{{!-- END do not edit content above, it is automatically generated';

        const filePath = pathPrefix + docsPath;

        const docsData = fs.readFileSync(filePath, 'utf8');
        
        let blocks = [];
        let inGuid = false;
        let currentBlock = '';
        
        docsData.split("\n").forEach(function(line, index) {
            if (!inGuid) {
                currentBlock += line + '\n';

                if (line.startsWith(replacePrefixBegin + guid)) {
                    inGuid = true;
                    if (currentBlock.length) {
                        blocks.push(currentBlock);
                        blocks.push(null);
                    }
                    currentBlock = '';
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

        let newDocsData = '';

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
        
        if (docsData != newDocsData) {

            fs.writeFileSync(filePath, newDocsData);	    
            console.log('updated ' + docsPath);

            /*
            let contentOnly = '';
            let lineNum = 1;
            let inHeader = true;
            for(const line of newDocsData.split('\n')) {
                if (!inHeader) {
                    contentOnly += line + '\n';
                }
                if (line == '---' && lineNum > 1) {
                    inHeader = false;
                }
                lineNum++;
            }

            if '(files') {
                const key = docsPath.substr(1);
                console.log('key=' + key, files[key]);

                console.log('old', files[key].contents.toString());
                console.log('new', contentOnly);

                // Remove the leading slash for indexing into files
                files[key] = {
                    contents: Buffer.from(contentOnly, "utf-8"),
                    mode: '0644',
                    stats: fs.statSync(filePath)
                };
            }
            */
        }
    }

    //
    // Do the update
    // Called at the end of this file
    //
    updater.doUpdate = function(scriptsDir, files) {

        const pathPrefix = path.resolve(scriptsDir, '../src/content');

        updater.datastore.data = JSON.parse(fs.readFileSync(path.resolve(scriptsDir, '../src/assets/files/carriers.json'), 'utf8'));

        updater.docsToUpdate.forEach(function(fileObj) {
            // fileObj.path
            fileObj.updates.forEach(function(updatesObj) {
                // updatesObj.guid
                // updatesObj.generatorFn (generates Markdown)
                try {
                    updater.updateDocs(pathPrefix, fileObj.path, updatesObj.guid, updatesObj.generatorFn(), files);
                }
                catch(e) {
                    console.log('exception processing ' + updatesObj.guid, e);
                }
            });
        })

        // console.log('carriers-update complete');
    };

}(module.exports));
