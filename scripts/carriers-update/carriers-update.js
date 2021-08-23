const fs = require('fs');
const path = require('path');

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
            md += ' | Modem ';
        }
        md += '| Lifecycle | Replacement |\n';

        //
        md += '| :--- | | :--- | :--- ';
        if (!skuFamilyObj.wifi) {
            md += ' | :--- ';
        }
        md += '| :--- | :--- | :--- |\n';

        skus.forEach(function(skuObj) {
            md += '| ' + skuObj.name + ' | ' + skuObj.desc + ' | ' + updater.skuRegionReadable[skuObj.skuRegion];

            if (!skuFamilyObj.wifi) {
                md += ' | ' + skuObj.modem;
            }

            md += ' | ' + skuObj.lifecycle + ' | ' + (skuObj.replacement ? skuObj.replacement : '') + '|\n'; 
        });

        return md;
    }


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

        md += '| Country | Carrier | Gen 2 | Boron 2G/3G | B524/T524 | LTE M1 |\n';
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
                if (cmsObj && cmsObj.recommendation == 'YES') {
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
                if (cmsObj) {
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
                if (cmsObj && cmsObj.recommendation == 'YES') {
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
                }
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

            
            
        }


        
    ];

    updater.updateDocs = function(pathPrefix, docsPath, guid, md) {
        // path: path to md, relative to content. For example: /tutorials/cellular-connectivity/cellular-carriers.md
        // guid: the ID for the block to replace (typically a GUID)
        // md: The md file data to use as the replacement
        
        // {{!-- BEGIN do not edit content below, it is automatically generated 323fb696-76c4-11eb-9439-0242ac130002 --}}
        // {{!-- END do not edit content above, it is automatically generated 323fb696-76c4-11eb-9439-0242ac130002 --}}
        const replacePrefixBegin = '{{!-- BEGIN do not edit content below, it is automatically generated ';
        const replacePrefixEnd = '{{!-- END do not edit content above, it is automatically generated';

        
        const docsData = fs.readFileSync(pathPrefix + docsPath, 'utf8');
        
        let preData = '';
        let postData = '';
        let state = 0;
        
        docsData.split("\n").forEach(function(line, index) {
            switch(state) {
            case 0:
                if (line.startsWith(replacePrefixBegin + guid)) {
                    state = 1;
                }
                preData += line + '\n';
                break;
            case 1:
                // GUID is no longer required on the end marker, since you can't nest these
                if (line.startsWith(replacePrefixEnd)) {
                    postData += line + '\n';
                    state = 2;
                }
                break;
            case 2:
                postData += line + '\n';
                break;
            }
            
        });

        // Make postData end with exactly one \n, otherwise it keeps getting one added on each run
        let len = postData.length;
        while(len > 0 && postData.charAt(len - 1) == '\n') {
            len--;
        }
        if ((len + 1) < postData.length) {
            postData = postData.substr(0, len + 1);
        }

        
        if (preData != '' && postData != '') {
            var newDocsData = preData + '\n' + md + '\n\n' + postData;
            
            if (docsData != newDocsData) {
                fs.writeFileSync(pathPrefix + docsPath, newDocsData);	    
                console.log('updated ' + docsPath);
            }
        }
        else {
            console.log('marker ' + guid + ' missing from ' + docsPath);
        }
    }

    //
    // Do the update
    // Called at the end of this file
    //
    updater.doUpdate = function(scriptsDir) {

        const pathPrefix = path.resolve(scriptsDir, '../src/content');

        updater.datastore.data = JSON.parse(fs.readFileSync(path.resolve(scriptsDir, '../src/assets/files/carriers.json'), 'utf8'));

        updater.docsToUpdate.forEach(function(fileObj) {
            // fileObj.path
            fileObj.updates.forEach(function(updatesObj) {
                // updatesObj.guid
                // updatesObj.generatorFn (generates Markdown)
                try {
                    updater.updateDocs(pathPrefix, fileObj.path, updatesObj.guid, updatesObj.generatorFn());
                }
                catch(e) {
                    console.log('exception processing ' + updatesObj.guid, e);
                }
            });
        })

        // console.log('carriers-update complete');
    };

}(module.exports));
