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
                if (c.checkmark && d[c.key] === true ) {
                    line += '| &check; ';
                }
                else
                if (d[c.key]) {
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

        const platformInfoNew = updater.pinInfo.platforms.find(p => p.name == options.platformNew);
        if (!platformInfoNew) {
            return '';
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
                    
                    if (options.port && !oldPin[options.port] && !newPin[options.port]) {
                        // Neither device supports this port on this pin
                        continue;
                    }

                    let m = {
                        num: pinNum,
                        old: oldPin,
                        new: newPin,
                    };

                    if (oldPin.name == newPin.name) {
                        m.title = 'Module Pin ' + pinNum + ' (' + oldPin.name + ')\n';
                    }
                    else {
                        m.title = 'Module Pin ' + pinNum + '\n';
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
                
                tableData.push(rowData);
            }

            md += updater.generateTable(tableOptions, tableData);
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
                tableData.push(rowData);
            }

            md += updater.generateTable(tableOptions, tableData);

        }
        
        if (options.style == 'full-comparison') {

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
                'is5VTolerant',
                'jtag',
                'swd'      
            ];

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

                md += '#### ' + m.title + '\n';
                
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
                        tableData.push({
                            tag,
                            label: detailsForTag[tag].label,
                            oldFunction: getPinUsage(oldPin[tag]),
                            newFunction: getPinUsage(newPin[tag]),
                        });
        
                    }    

                    md += updater.generateTable(tableOptions, tableData);
                }
                else {
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
            tableOptions.columns.push({
                key: 'oldPinName',
                title: oldTitle + ' Pin Name'
            });    
            tableOptions.columns.push({
                key: 'oldPort',
                title: oldTitle + ' ' + options.label,
                checkmark: !!options.checkmark,
            });    
            tableOptions.columns.push({
                key: 'newPinName',
                title: newTitle + ' Pin Name'
            });    
            tableOptions.columns.push({
                key: 'newPort',
                title: newTitle + ' ' + options.label,
                checkmark: !!options.checkmark,
            });    

            let tableData = [];

            for(const m of mappedPins) {
                if ((m.new && m.new[options.port]) || (m.old && m.old[options.port])) {
                    let rowData = {
                        num: m.num
                    };
                    if (m.old) {
                        rowData.oldPinName = getPinNameWithAlt(m.old);
                        rowData.oldPort = portColumnValue(m.old[options.port]);
                    }
                    if (m.new) {
                        rowData.newPinName = getPinNameWithAlt(m.new);
                        rowData.newPort = portColumnValue(m.new[options.port]);
                    }
                    tableData.push(rowData);
                }
            }            



            md += updater.generateTable(tableOptions, tableData);
        }

        if (options.style == 'portPins') {
            // options.port
            const newPins = expandMorePins(platformInfoNew.pins);

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

            
            let tableData = [];

            
            for(const m of mappedPins) {
                if ((m.new && m.new[options.port]) || (m.old && m.old[options.port])) {
                    let rowData = {
                        num: m.num
                    };
                    if (m.old) {
                        rowData.oldPinName = getPinNameWithAlt(m.old);
                        rowData.oldPort = portColumnValue(m.old[options.port]);
                    }
                    if (m.new) {
                        rowData.newPinName = getPinNameWithAlt(m.new);
                        rowData.newPort = portColumnValue(m.new[options.port]);
                    }
                    tableData.push(rowData);
                }

            }
        

            md += updater.generateTable(tableOptions, tableData);
        }

        if (options.style == 'interfacePins') {
            // options.interface

            let pins = [];
            for(const pin of platformInfoNew.pins) {
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
            path:'/datasheets/electron/e404x-datasheet.md', 
            updates:[
                {
                    guid:'6591a5b8-3326-46c8-9133-de4d6dacbc77', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'modulePins',
                            platformNew: 'E404X'
                        }); 
                    } 
                },                
                {
                    guid:'7467d36c-a9d2-4629-be9f-2e76262f956e', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'portPins',
                            platformNew: 'E404X',
                            port: 'analogWritePWM',
                            label: 'PWM'
                        }); 
                    } 
                },                
                {
                    guid:'bdf550a7-6a65-4cb3-9650-ec612986b349', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'portPins',
                            platformNew: 'E404X',
                            port: 'i2c',
                            label: 'I2C',
                            useShortName: true
                        }); 
                    } 
                },                
                {
                    guid:'ec8e0cf4-a9be-4964-ab24-5e9d8cd3670f', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'portPins',
                            platformNew: 'E404X',
                            port: 'hardwareADC',
                            label: 'ADC',
                            useShortName: true
                        }); 
                    } 
                },                
                {
                    guid:'68c19adf-d373-4061-8f71-0ebc756b68c0', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'portPins',
                            platformNew: 'E404X',
                            port: 'serial',
                            label: 'UART',
                            useShortName: true
                        }); 
                    } 
                },                
                {
                    guid:'42be4ad3-031d-4718-bf69-fa9320d7eae5', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'portPins',
                            platformNew: 'E404X',
                            port: 'spi',
                            label: 'SPI',
                            useShortName: true
                        }); 
                    } 
                },                
                {
                    guid:'4ccb8904-6d00-446d-9aa6-5786c66435d4', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'portPins',
                            platformNew: 'E404X',
                            port: 'digitalRead',
                            label: 'GPIO'
                        }); 
                    } 
                },                
            ]
        },
        {
            path:'/datasheets/electron/e404x-migration-guide.md', 
            updates:[ 
                {
                    guid:'6c533551-bce6-4c2e-b248-c7274f4b1b22', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-removed',
                            platformOld: 'E Series',
                            platformNew: 'E404X'
                        }); 
                    } 
                },/*
                {
                    guid:'0f8940d5-5d0b-4f16-bfa2-1666616ba9ef', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-added',
                            platformOld: 'E Series',
                            platformNew: 'E404X'
                        }); 
                    } 
                },*/
                {
                    guid:'aa218eb3-5975-4ba6-b26d-2a5d43c5378e', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'full-comparison',
                            platformOld: 'E Series',
                            platformNew: 'E404X'
                        }); 
                    } 
                },
                {
                    guid:'0fc429e8-585e-4f36-9874-e3fa37a1136e', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformOld: 'E Series',
                            platformNew: 'E404X',
                            port: 'analogWritePWM',
                            label: 'PWM',
                        }); 
                    } 
                },
                {
                    guid:'a7091023-5382-4496-8bfc-727593f0d426', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformOld: 'E Series',
                            platformNew: 'E404X',
                            port: 'analogRead',
                            label: 'ADC'
                        }); 
                    }
                },
                {
                    guid:'c7f59d46-dca3-4376-b885-0b4ca924a28b', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformOld: 'E Series',
                            platformNew: 'E404X',
                            port: 'serial',
                            label: 'Serial',
                            useShortName: true
                        }); 
                    }
                },
                {
                    guid:'e6a3ce62-dfb5-4926-a1b4-5f2fd5048d05', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformOld: 'E Series',
                            platformNew: 'E404X',
                            port: 'i2c',
                            label: 'I2C',
                            useShortName: true
                        }); 
                    }
                },
                {
                    guid:'9327b9b9-21fd-46fd-a406-8c249ade9688', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformOld: 'E Series',
                            platformNew: 'E404X',
                            port: 'spi',
                            label: 'SPI',
                            useShortName: true
                        }); 
                    }
                },
                {
                    guid:'2ee8f339-68a5-4d9c-b6b9-0f359038d704', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformOld: 'E Series',
                            platformNew: 'E404X',
                            port: 'analogWriteDAC',
                            label: 'DAC'
                        }); 
                    }
                },
                {
                    guid:'aaf618d9-4053-490d-8b3b-2ef6118592d6', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformOld: 'E Series',
                            platformNew: 'E404X',
                            port: 'can',
                            label: 'CAN',
                            useShortName: true
                        }); 
                    }
                },
                {
                    guid:'2767a61d-eba6-4720-8c91-869be322880f', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformOld: 'E Series',
                            platformNew: 'E404X',
                            port: 'jtag',
                            label: 'JTAG',
                            useShortName: true
                        }); 
                    }
                },
                {
                    guid:'b90ca6ee-1877-4f05-a3bd-b073d768e54d', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformOld: 'E Series',
                            platformNew: 'E404X',
                            port: 'swd',
                            label: 'SWD',
                            useShortName: true
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
            path:'/datasheets/boron/b404x-b404-b402-datasheet.md', 
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
            path:'/datasheets/boron/b524-b523-datasheet.md', 
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
            path: '/datasheets/boron/b-series-boron-migration-guide.md',
            updates: [
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
                    },
                },
                {
                    guid:'945c4c4c-76d1-11eb-9439-0242ac130002',
                    generatorFn:function() {
                        return updater.generateCountryList('boron'); 
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
                },
                {
                    guid:'09a7da10-a5d0-11ec-b909-0242ac120002', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'full-comparison',
                            platformNew: 'B4xx SoM',
                            platformOld: 'Boron',
                            mapBy: 'name',
                            showPinNum: true,
                            platformNewTitle: 'B Series SoM',
                        }); 
                    } 
                },
                {
                    guid:'ce9644de-a5de-11ec-b909-0242ac120002', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'B4xx SoM',
                            platformOld: 'Boron',
                            port: 'analogWritePWM',
                            label: 'PWM',
                            noPinNumbers: true,
                            mapBy: 'name',
                            platformNewTitle: 'B Series SoM',
                        }); 
                    } 
                },
                {
                    guid:'db4246c4-a5de-11ec-b909-0242ac120002', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'B4xx SoM',
                            platformOld: 'Boron',
                            port: 'analogRead',
                            label: 'ADC',
                            noPinNumbers: true,
                            mapBy: 'name',
                            platformNewTitle: 'B Series SoM',
                        }); 
                    }
                },
                {
                    guid:'ef25dc00-a5de-11ec-b909-0242ac120002', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'B4xx SoM',
                            platformOld: 'Boron',
                            port: 'serial',
                            label: 'Serial',
                            useShortName: true,
                            noPinNumbers: true,
                            mapBy: 'name',
                            platformNewTitle: 'B Series SoM',
                        }); 
                    }
                },
                {
                    guid:'49b31eea-a5de-11ec-b909-0242ac120002', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'B4xx SoM',
                            platformOld: 'Boron',
                            port: 'spi',
                            label: 'SPI',
                            useShortName: true,
                            noPinNumbers: true,
                            mapBy: 'name',
                            platformNewTitle: 'B Series SoM',
                        }); 
                    }
                },
                {
                    guid:'09bea7c2-a382-11ec-b909-0242ac120002', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'B4xx SoM',
                            platformOld: 'Boron',
                            port: 'i2c',
                            label: 'I2C',
                            useShortName: true,
                            noPinNumbers: true,
                            mapBy: 'name',
                            platformNewTitle: 'B Series SoM',
                        }); 
                    }
                },

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
            path:'/datasheets/wi-fi/p2-datasheet.md', 
            updates:[
                {
                    guid:'a201cbf3-f21d-4b34-ac10-a713ef5a857e', 
                    generatorFn:function(){
                        return updater.generateFamilySkus('p series', {
                            filterFn:function(skuObj) {
                                return !skuObj.name.startsWith('P2');
                            }        
                        }); 
                    } 
                },
                {
                    guid: '8bd904e1-0088-488c-9fbb-e695d7643949',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'pinFunction',
                            platformNew: 'P2',
                        }); 
                    } 
                },
                {
                    guid:'5c5c78ef-c99c-49b7-80f4-19196b90ecfe', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'modulePins',
                            platformNew: 'P2',
                        }); 
                    } 
                },
                {
                    guid:'cd89fea9-4917-4af5-bfd0-4bdaa400545c',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'P2',
                            interface: 'serial'
                        }); 
                    }                     
                },
                {
                    guid:'c48b830e-f222-4a5d-a34f-14973ce84e22',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'P2',
                            interface: 'spi'
                        }); 
                    } 
                },
                {
                    guid:'5b55adb8-1e32-4518-b01e-eadf4e67a262',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'P2',
                            interface: 'i2c'
                        }); 
                    } 
                },
                {
                    guid:'ed5c8a8d-6f7f-4253-be72-a45e7316421e',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'P2',
                            interface: 'hardwareADC'
                        }); 
                    } 
                },
                {
                    guid:'d68a9c54-a380-11ec-b909-0242ac120002',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'P2',
                            interface: 'analogWritePWM',
                            noInterface: true,
                        }); 
                    } 
                },
                {
                    guid:'51e324e1-6f8a-43d5-aad2-f7cbbb699804',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'P2',
                            interface: 'isUSB',
                            noInterface: true,
                        }); 
                    } 
                },
                {
                    guid:'e5794e03-d007-4420-be1f-b62ca2788442',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'P2',
                            interface: 'isLED',
                            noInterface: true,
                        }); 
                    } 
                },
                {
                    guid:'a4b4a564-7178-4ba6-a98e-7b7ac5c8eeb9',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'P2',
                            interface: 'isControl',
                            noInterface: true,
                        }); 
                    } 
                },
                {
                    guid:'3b7b8712-9617-11ec-b909-0242ac120002',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'pinNameChange2022_02_25',
                            platformNew: 'P2'
                        }); 
                    } 
                },


                
            ]            
        },
        {
            path:'/datasheets/wi-fi/photon-2-datasheet.md', 
            updates:[
                {
                    guid:'a201cbf3-f21d-4b34-ac10-a713ef5a857e', 
                    generatorFn:function(){
                        return updater.generateFamilySkus('p series', {
                            filterFn:function(skuObj) {
                                return !skuObj.name.startsWith('P2');
                            }        
                        }); 
                    } 
                },
                {
                    guid: '8bd904e1-0088-488c-9fbb-e695d7643949',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'pinFunction',
                            platformNew: 'Photon 2',
                            noPinNumbers: true,
                        }); 
                    } 
                },
                {
                    guid:'5c5c78ef-c99c-49b7-80f4-19196b90ecfe', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'modulePins',
                            platformNew: 'Photon 2',
                            noPinNumbers: true,
                        }); 
                    } 
                },
                {
                    guid:'cd89fea9-4917-4af5-bfd0-4bdaa400545c',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'Photon 2',
                            interface: 'serial',
                            noPinNumbers: true,
                        }); 
                    }                     
                },
                {
                    guid:'c48b830e-f222-4a5d-a34f-14973ce84e22',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'Photon 2',
                            interface: 'spi',
                            noPinNumbers: true,
                        }); 
                    } 
                },
                {
                    guid:'5b55adb8-1e32-4518-b01e-eadf4e67a262',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'Photon 2',
                            interface: 'i2c',
                            noPinNumbers: true,
                        }); 
                    } 
                },
                {
                    guid:'ed5c8a8d-6f7f-4253-be72-a45e7316421e',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'Photon 2',
                            interface: 'hardwareADC',
                            noPinNumbers: true,
                        }); 
                    } 
                },
                {
                    guid:'7c78e07c-4e5a-43a6-8c61-d9a322871bd8',
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'old-new-comparison',
                            platformOld: 'Photon 2', // Left column
                            platformNew: 'P2', // Right column
                            pinNumberNew: true,
                            mapBy: 'hardwarePin',
                            hardwarePin: true,
                        }); 
                    } 
                },

                
            ]            
        },        
        {
            path:'/datasheets/wi-fi/p2-photon-migration-guide.md', 
            updates:[ 
                {
                    guid:'3729b0b4-4058-454e-aef8-0ca5c2526bd52', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-removed',
                            platformNew: 'P2',
                            platformOld: 'Photon',
                            mapBy: 'name',
                            noPinNumbers: true,
                        }); 
                    } 
                },
                {
                    guid:'1de5c9cc-077e-45d1-bc1e-d5892742d68e', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-added',
                            platformNew: 'P2',
                            platformOld: 'Photon',
                            mapBy: 'name',
                        }); 
                    } 
                },
                {
                    guid:'46220dbb-60cf-40f4-8fd0-30a968622977', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'full-comparison',
                            mapBy: 'name',
                            showPinNum: true,
                            platformNew: 'P2',
                            platformOld: 'Photon',
                        }); 
                    } 
                },
                {
                    guid:'2edd3413-e159-4396-9a02-db963b4c8999', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Photon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'spi',
                            label: 'SPI',
                            useShortName: true
                        }); 
                    }
                },
                {
                    guid:'15242326-04aa-4cc8-b2fd-8621301c7bdd', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Photon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'i2c',
                            label: 'I2C',
                            useShortName: true
                        }); 
                    }
                },            
                {
                    guid:'21bcd7d9-474c-4d45-81e1-0cb1753fdb87', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Photon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'serial',
                            label: 'Serial',
                            useShortName: true
                        }); 
                    }
                },            
                {
                    guid:'37d26734-83ca-42db-8dd6-701e3c411928', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Photon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'analogRead',
                            label: 'ADC',
                            useShortName: true,
                            checkmark: true,
                        }); 
                    }
                },            
                {
                    guid:'e27ab11e-d144-4fe0-bfcf-dc5a56809e22', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Photon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'analogWritePWM',
                            label: 'PWM',
                            useShortName: true,
                            checkmark: true,
                        }); 
                    }
                },            
                {
                    guid:'2ee8f339-68a5-4d9c-b6b9-0f359038d704', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Photon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'analogWriteDAC',
                            label: 'DAC',
                            useShortName: true,
                            checkmark: true,
                        }); 
                    }
                },            
                {
                    guid:'2cf91e3c-e8d7-40a4-a637-6a69a4d08e59', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Photon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'can',
                            label: 'CAN',
                            useShortName: true
                        }); 
                    }
                },            
                {
                    guid:'b2ddf109-3a53-449e-a940-a3c9736b15fc', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Photon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'i2s',
                            label: 'I2S',
                            useShortName: true
                        }); 
                    }
                },            
                {
                    guid:'84ab47ce-0497-437a-96cc-b56c854104b8', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'P2',
                            interface: 'swd',
                            otherNames: ['RST', 'GND'],
                        }); 
                    } 
                },    
                {
                    guid:'1e172c40-939f-4ff0-85b3-11bcb54a70b8', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'old-new-comparison',
                            platformOld: 'Photon', // Left column
                            platformNew: 'P2', // Right column
                            pinNumberNew: true,
                            hardwarePin: true,
                            mapping: {
                                'A2': 'S3', 
                                'A3': 'S2', 
                                'A4': 'S1', 
                                'A5': 'S0',
                                'A6': 'S5', 
                            },
                            onlyIO: true
                        }); 
                    }
                },  
                {
                    guid:'276c4cb4-5683-49ce-b9f6-e0bb74dc6735', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'old-new-comparison',
                            platformOld: 'Photon', // Left column
                            platformNew: 'P2', // Right column
                            pinNumberNew: true,
                            hardwarePin: true,
                            mapping: {
                                'A3': 'A2', 
                                'A5': 'A5',
                            },
                            onlyIO: true
                        }); 
                    }
                },  
                
            
            ]
        },
        {
            path:'/datasheets/wi-fi/p2-argon-migration-guide.md', 
            updates:[ 
                {
                    guid:'d524a654-8845-4d9c-b8c4-05b60dca363e2', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-removed',
                            platformNew: 'P2',
                            platformOld: 'Argon',
                            mapBy: 'name',
                            noPinNumbers: true,
                        }); 
                    } 
                },
                {
                    guid:'fa0065f1-ba10-43af-9b5c-78338c2d02b8', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-added',
                            platformNew: 'P2',
                            platformOld: 'Argon',
                            mapBy: 'name',
                        }); 
                    } 
                },
                {
                    guid:'ee790982-5af6-44e2-aabf-89cd1ff1f392', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'full-comparison',
                            mapBy: 'name',
                            showPinNum: true,
                            platformNew: 'P2',
                            platformOld: 'Argon',
                        }); 
                    } 
                },
                {
                    guid:'cf7eb295-1ecf-4d24-b2a1-dc8a654321362', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Argon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'spi',
                            label: 'SPI',
                            useShortName: true
                        }); 
                    }
                },
                {
                    guid:'748b912b-44bf-41a9-84dc-ba3efb637b24', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Argon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'i2c',
                            label: 'I2C',
                            useShortName: true
                        }); 
                    }
                },            
                {
                    guid:'ae9002de-ec14-49d1-a748-5ae16dd5b2d2', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Argon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'serial',
                            label: 'Serial',
                            useShortName: true
                        }); 
                    }
                },            
                {
                    guid:'5c24cf45-54bd-4636-b52f-1adb72b46b15', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Argon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'analogRead',
                            label: 'ADC',
                            useShortName: true,
                            checkmark: true,
                        }); 
                    }
                },            
                {
                    guid:'3cbcb367-cb90-4081-86d0-d7d0c07fc626', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'Argon',
                            mapBy: 'name',
                            noPinNumbers: true,
                            port: 'analogWritePWM',
                            label: 'PWM',
                            useShortName: true,
                            checkmark: true,
                        }); 
                    }
                },   
                {
                    guid:'84ab47ce-0497-437a-96cc-b56c854104b8', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'interfacePins',
                            platformNew: 'P2',
                            interface: 'swd',
                            otherNames: ['RST', 'GND'],
                        }); 
                    } 
                },                
                {
                    guid:'25914318-fc34-4f72-80f0-9ca6a3091e30', // General
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'old-new-comparison',
                            platformOld: 'Argon', // Left column
                            platformNew: 'P2', // Right column
                            pinNumberNew: true,
                            hardwarePin: true,
                            mapping: {
                                'A3':'S3',
                                'A4':'S4',
                                'SCK':'S2',
                                'MISO':'S1',
                                'MOSI':'S0',
                            },
                            onlyIO: true
                        }); 
                    }
                },              
                {
                    guid:'7c78e07c-4e5a-43a6-8c61-d9a322871bd8', // SPI1
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'old-new-comparison',
                            platformOld: 'Argon', // Left column
                            platformNew: 'P2', // Right column
                            pinNumberNew: true,
                            hardwarePin: true,
                            mapping: {
                                'A3':'S3',
                                'A4':'S4',
                                'SCK':'S2',
                                'MISO':'S1',
                                'MOSI':'S0',
                                'D2':'D4',
                                'D3':'D2',
                                'D4':'D3',
                            },
                            onlyIO: true
                        }); 
                    }
                },              
            ]
        },
        {
            path:'/datasheets/wi-fi/p2-p1-migration-guide.md', 
            updates:[ 
                {
                    guid:'6c533551-bce6-4c2e-b248-c7274f4b1b22', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-removed',
                            platformNew: 'P2',
                            platformOld: 'P1',
                        }); 
                    } 
                },
                {
                    guid:'0f8940d5-5d0b-4f16-bfa2-1666616ba9ef', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-added',
                            platformNew: 'P2',
                            platformOld: 'P1',
                        }); 
                    } 
                },
                {
                    guid:'aa218eb3-5975-4ba6-b26d-2a5d43c5378e', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'full-comparison',
                            platformNew: 'P2',
                            platformOld: 'P1',
                        }); 
                    } 
                },
                {
                    guid:'0fc429e8-585e-4f36-9874-e3fa37a1136e', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'P1',
                            port: 'analogWritePWM',
                            label: 'PWM',
                        }); 
                    } 
                },
                {
                    guid:'a7091023-5382-4496-8bfc-727593f0d426', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'P1',
                            port: 'analogRead',
                            label: 'ADC'
                        }); 
                    }
                },
                {
                    guid:'c7f59d46-dca3-4376-b885-0b4ca924a28b', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'P1',
                            port: 'serial',
                            label: 'Serial',
                            useShortName: true
                        }); 
                    }
                },
                {
                    guid:'9327b9b9-21fd-46fd-a406-8c249ade9688', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'P1',
                            port: 'spi',
                            label: 'SPI',
                            useShortName: true
                        }); 
                    }
                },
                {
                    guid:'09bea7c2-a382-11ec-b909-0242ac120002', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'P1',
                            port: 'i2c',
                            label: 'I2C',
                            useShortName: true
                        }); 
                    }
                },
                {
                    guid:'2ee8f339-68a5-4d9c-b6b9-0f359038d704', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'P1',
                            port: 'analogWriteDAC',
                            label: 'DAC'
                        }); 
                    }
                },
                {
                    guid:'aaf618d9-4053-490d-8b3b-2ef6118592d6', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'P1',
                            port: 'can',
                            label: 'CAN'
                        }); 
                    }
                },
                {
                    guid:'8d8e7a73-c60c-4b04-8039-c5f8a7072f39', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'P2',
                            platformOld: 'P1',
                            port: 'i2s',
                            label: 'I2S',
                            useShortName: true
                        }); 
                    }
                },
            ]
        },
        {
            path:'/datasheets/wi-fi/photon-2-argon-migration-guide.md', 
            updates:[ 
                {
                    guid:'6c533551-bce6-4c2e-b248-c7274f4b1b22', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-removed',
                            platformNew: 'Photon 2',
                            platformOld: 'Argon',
                        }); 
                    } 
                },
                {
                    guid:'0f8940d5-5d0b-4f16-bfa2-1666616ba9ef', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-added',
                            platformNew: 'Photon 2',
                            platformOld: 'Argon',
                        }); 
                    } 
                },
                {
                    guid:'aa218eb3-5975-4ba6-b26d-2a5d43c5378e', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'full-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Argon',
                            mapBy: 'argonPin',
                        }); 
                    } 
                },
                {
                    guid:'0fc429e8-585e-4f36-9874-e3fa37a1136e', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Argon',
                            port: 'analogWritePWM',
                            label: 'PWM',
                            noPinNumbers: true,
                            mapBy: 'argonPin',
                        }); 
                    } 
                },
                {
                    guid:'a7091023-5382-4496-8bfc-727593f0d426', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Argon',
                            port: 'analogRead',
                            label: 'ADC',
                            noPinNumbers: true,
                            mapBy: 'argonPin',
                        }); 
                    }
                },
                {
                    guid:'c7f59d46-dca3-4376-b885-0b4ca924a28b', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Argon',
                            port: 'serial',
                            label: 'Serial',
                            useShortName: true,
                            noPinNumbers: true,
                            mapBy: 'argonPin',
                        }); 
                    }
                },
                {
                    guid:'9327b9b9-21fd-46fd-a406-8c249ade9688', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Argon',
                            port: 'spi',
                            label: 'SPI',
                            useShortName: true,
                            noPinNumbers: true,
                            mapBy: 'argonPin',
                        }); 
                    }
                },
                {
                    guid:'2ee8f339-68a5-4d9c-b6b9-0f359038d704', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Argon',
                            port: 'analogWriteDAC',
                            label: 'DAC',
                            noPinNumbers: true,
                            mapBy: 'argonPin',
                        }); 
                    }
                },
                {
                    guid:'aaf618d9-4053-490d-8b3b-2ef6118592d6', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Argon',
                            port: 'can',
                            label: 'CAN',
                            noPinNumbers: true,
                            mapBy: 'argonPin',
                        }); 
                    }
                },
                {
                    guid:'8d8e7a73-c60c-4b04-8039-c5f8a7072f39', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Argon',
                            port: 'i2s',
                            label: 'I2S',
                            useShortName: true,
                            noPinNumbers: true,
                            mapBy: 'argonPin',
                        }); 
                    }
                }                
            ]
        },
        {
            path:'/datasheets/wi-fi/photon-2-photon-migration-guide.md', 
            updates:[ 
                {
                    guid:'6c533551-bce6-4c2e-b248-c7274f4b1b22', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-removed',
                            platformNew: 'Photon 2',
                            platformOld: 'Photon',
                        }); 
                    } 
                },
                {
                    guid:'0f8940d5-5d0b-4f16-bfa2-1666616ba9ef', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'migration-added',
                            platformNew: 'Photon 2',
                            platformOld: 'Photon',
                        }); 
                    } 
                },
                {
                    guid:'aa218eb3-5975-4ba6-b26d-2a5d43c5378e', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'full-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Photon',
                            mapBy: 'argonPin',
                        }); 
                    } 
                },
                {
                    guid:'0fc429e8-585e-4f36-9874-e3fa37a1136e', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Photon',
                            port: 'analogWritePWM',
                            label: 'PWM',
                            noPinNumbers: true,
                            mapBy: 'photonPin',
                        }); 
                    } 
                },
                {
                    guid:'a7091023-5382-4496-8bfc-727593f0d426', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Photon',
                            port: 'analogRead',
                            label: 'ADC',
                            noPinNumbers: true,
                            mapBy: 'photonPin',
                        }); 
                    }
                },
                {
                    guid:'c7f59d46-dca3-4376-b885-0b4ca924a28b', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Photon',
                            port: 'serial',
                            label: 'Serial',
                            useShortName: true,
                            noPinNumbers: true,
                            mapBy: 'photonPin',
                        }); 
                    }
                },
                {
                    guid:'9327b9b9-21fd-46fd-a406-8c249ade9688', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Photon',
                            port: 'spi',
                            label: 'SPI',
                            useShortName: true,
                            noPinNumbers: true,
                            mapBy: 'photonPin',
                        }); 
                    }
                },
                {
                    guid:'1b998d6c-a383-11ec-b909-0242ac120002', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Photon',
                            port: 'i2c',
                            label: 'I2C',
                            useShortName: true,
                            noPinNumbers: true,
                            mapBy: 'photonPin',
                        }); 
                    }
                },
                {
                    guid:'2ee8f339-68a5-4d9c-b6b9-0f359038d704', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Photon',
                            port: 'analogWriteDAC',
                            label: 'DAC',
                            noPinNumbers: true,
                            mapBy: 'photonPin',
                        }); 
                    }
                },
                {
                    guid:'aaf618d9-4053-490d-8b3b-2ef6118592d6', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Photon',
                            port: 'can',
                            label: 'CAN',
                            noPinNumbers: true,
                            mapBy: 'photonPin',
                        }); 
                    }
                },
                {
                    guid:'8d8e7a73-c60c-4b04-8039-c5f8a7072f39', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'port-comparison',
                            platformNew: 'Photon 2',
                            platformOld: 'Photon',
                            port: 'i2s',
                            label: 'I2S',
                            useShortName: true,
                            noPinNumbers: true,
                            mapBy: 'photonPin',
                        }); 
                    }
                },
                {
                    guid:'0339ca50-9a3e-11ec-b909-0242ac120002', 
                    generatorFn:function(){
                        return updater.generatePinInfo({
                            style: 'classic-adapter',
                            platformNew: 'Photon 2',
                            platformOld: 'Electron',
                            noPinNumbers: true,
                            mapBy: 'classicAdapter',
                        }); 
                    }
                },
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

        updater.pinInfo = JSON.parse(fs.readFileSync(path.resolve(scriptsDir, '../src/assets/files/pinInfo.json'), 'utf8'));

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
