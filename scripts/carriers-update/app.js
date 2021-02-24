const fs = require('fs');
const path = require('path');

// https://www.npmjs.com/package/yargs
const argv = require('yargs').argv;

let datastore = {};

datastore.data = JSON.parse(fs.readFileSync('../../src/assets/files/carriers.json', 'utf8'));

const docsToUpdate = [
    {
        path:'/datasheets/electron/electron-datasheet.md', 
        updates:[
            {
                guid:'ab31991a-76c5-11eb-9439-0242ac130002', 
                generatorFn:function() {
                    return generateFamilySkus('electron'); 
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
                    return generateFamilySkus('e series'); 
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
                    return generateFamilySkus('e series', {
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
                    return generateFamilySkus('boron'); 
                } 
            },
            {
                guid:'945c4c4c-76d1-11eb-9439-0242ac130002',
                generatorFn:function() {
                    return generateCountryList('boron'); 
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
                    return generateFamilySkus('b series', {
                        filterFn:function(skuObj) {
                            return skuObj.skuRegion != 'noram';
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
                    return generateFamilySkus('b series', {
                        filterFn:function(skuObj) {
                            return skuObj.skuRegion != 'emeaa';
                        }        
                    }); 
                } 
            }
        ]
    }

];





const skuRegionReadable = {
    global:'Global',
    emeaa:'EMEAA',
    noram:'NORAM',
    americas:'Americas',
};

//
// Do the update
// Called at the end of this file
//
function doUpdate() {

    docsToUpdate.forEach(function(fileObj) {
        // fileObj.path
        fileObj.updates.forEach(function(updatesObj) {
            // updatesObj.guid
            // updatesObj.generatorFn (generates Markdown)
            updateDocs(fileObj.path, updatesObj.guid, updatesObj.generatorFn());
        });
    })
};

function generateCountryList(skuFamily, options) {

    datastore.data.skuFamily.forEach(function(skuFamilyObj) {
        if (skuObj.family != skuFamily) {
            return;
        }
        // skuFamilyObj.name (human readable family name)

        skuFamilyObj.group.forEach(function(groupObj) {
            // name, region, lifecycle, sim, simPlan, modem
            if (groupObj.sim != 4) {
                return;
            }
            
        });
    });

};

function generateFamilySkus(skuFamily, options) {
    let skus = [];

    if (!options) {
        options = {};
    }

    // Filter
    datastore.data.skus.forEach(function(skuObj) {
        if (skuObj.family != skuFamily) {
            return;
        }

        if (skuObj.lifecycle == 'Discontinued' && skuObj.skuClass == 'kit') {
            // Hide discontinued kits
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
        const lifecycleA = datastore.findSkuLifecycle(a.lifecycle);
        const lifecycleB = datastore.findSkuLifecycle(b.lifecycle);

        let cmp = lifecycleA.sortOrder - lifecycleB.sortOrder;
        if (cmp) {
            return cmp;
        }

        return a.name.localeCompare(b.name);
    });

    // Render
    let md = '';

    md += '| SKU | Description | Region | Modem | Lifecycle | Replacement |\n';
    md += '| :--- | | :--- | :--- | :--- | :--- | :--- |\n';

    skus.forEach(function(skuObj) {
        md += '| ' + skuObj.name + ' | ' + skuObj.desc + ' | ' + skuRegionReadable[skuObj.skuRegion] + ' | ' + skuObj.modem + ' | ';
        
        md += skuObj.lifecycle + ' | ' + (skuObj.replacement ? skuObj.replacement : '') + '|\n'; 
    });

    return md;
}


function updateDocs(docsPath, guid, md) {
    // path: path to md, relative to content. For example: /tutorials/cellular-connectivity/cellular-carriers.md
    // guid: the ID for the block to replace (typically a GUID)
    // md: The md file data to use as the replacement
    
    const pathPrefix = __dirname + '/../../src/content';

	// {{!-- BEGIN do not edit content below, it is automatically generated 323fb696-76c4-11eb-9439-0242ac130002 --}}
	// {{!-- END do not edit content above, it is automatically generated 323fb696-76c4-11eb-9439-0242ac130002 --}}
    const replacePrefixBegin = '{{!-- BEGIN do not edit content below, it is automatically generated ';
    const replacePrefixEnd = '{{!-- END do not edit content above, it is automatically generated ';

	
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
			if (line.startsWith(replacePrefixEnd + guid)) {
				postData += line + '\n';
				state = 2;
			}
			break;
		case 2:
			postData += line + '\n';
			break;
		}
		
	});
	
    if (preData != '' && postData != '') {
        var newDocsData = preData + md + '\n' + postData;
	
        fs.writeFileSync(pathPrefix + docsPath, newDocsData);	    
    }
    else {
        console.log('marker ' + guid + 'missing from ' + docsPath);
    }
}


//
// Copied from ../../src/assets/js/datastore.js
// Should find a better way to do this!
//
datastore.countryInList = function(country, countryList) {
    let found = false;

    countryList.forEach(function(obj) {
        if (obj.name == country) {
            found = true;
        }
    });

    return found;
};

datastore.findModemByModel = function(model) {
    for(let ii = 0; ii < datastore.data.modems.length; ii++) {
        const obj = datastore.data.modems[ii];
        if (obj.model == model) {
            return obj;
        }
    }
    return null;
};

datastore.findRegionGroupById = function(id) {
    for(let ii = 0; ii < datastore.data.regionGroups.length; ii++) {
        const obj = datastore.data.regionGroups[ii];
        if (obj.id == id) {
            return obj;
        }
    }
    return null;
};

datastore.findSimById = function(id) {
    for(let ii = 0; ii < datastore.data.sims.length; ii++) {
        const obj = datastore.data.sims[ii];
        if (obj.id == id) {
            return obj;
        }
    }
    return null;
};

datastore.findSimPlanById = function(id) {
    for(let ii = 0; ii < datastore.data.simPlans.length; ii++) {
        const obj = datastore.data.simPlans[ii];
        if (obj.id == id) {
            return obj;
        }
    }
    return null;
};

datastore.findSkuByName = function(name, createIfNecessary) {
    for(let ii = 0; ii < datastore.data.skus.length; ii++) {
        const obj = datastore.data.skus[ii];
        if (obj.name == name) {
            return obj;
        }
    }

    if (createIfNecessary) {
        obj = {};
        obj.name = name;
        datastore.data.skus.push(obj);
        return obj;
    }
    else {
        return null;
    }
};

datastore.findSkuClassByName = function(name) {
    for(let ii = 0; ii < datastore.data.skuClass.length; ii++) {
        const obj = datastore.data.skuClass[ii];
        if (obj.name == name) {
            return obj;
        }
    }

    return null;
};

datastore.findSkusWithSameSimAndModem = function(name, lifecycles) {
    const lookFor = datastore.findSkuByName(name);
    if (!lookFor) {
        return null;
    }

    if (lifecycles != undefined && !Array.isArray(lifecycles)) {
        lifecycles = [lifecycles];
    }

    let results = [];
    for(let ii = 0; ii < datastore.data.skus.length; ii++) {
        const obj = datastore.data.skus[ii];
        if (obj.sim == lookFor.sim && obj.modem == lookFor.modem) {
            if (lifecycles == undefined || lifecycles.includes(obj.lifecycle)) {
                results.push(obj);
            }
        }
    }
    return results;
};

datastore.findSkuFamily = function(family) {
    for(let ii = 0; ii < datastore.data.skuFamily.length; ii++) {
        const obj = datastore.data.skuFamily[ii];
        if (obj.family == family) {
            return obj;
        }
    }

    return null;
};

datastore.findTechnologiesForModems = function(modemsOpt) {
    let results = [];
    if (!modemsOpt) {
        modemsOpt = datastore.data.modems;
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

datastore.findRecommendationByName = function(name) {
    for(let ii = 0; ii < datastore.data.recommendation.length; ii++) {
        const obj = datastore.data.recommendation[ii];
        if (obj.name == name) {
            return obj;
        }
    }

    return null;
};
datastore.pointInBox = function(point, box) {
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

datastore.findCountryByName = function(name) {
    let result = null;

    datastore.data.countries.forEach(function(obj) {
        if (obj.name == name) {
            result = obj;
        }
    });

    return result;
};

datastore.findCountryModemSim = function(country, modem, sim) {
    let result = null;

    datastore.data.countryModemSim.forEach(function(obj) {
        if (obj.country == country && obj.modem == modem && obj.sim == sim) {
            result = obj;
        }
    });

    return result;
};

datastore.findCountriesByPoint = function(point) {
    // point must have lat and lon members (float)
    let result = [];

    datastore.data.countries.forEach(function(obj) {
        if (obj.box) {
            if (datastore.pointInBox(point, obj.box)) {
                result.push(obj);
            }
        }

    });

    return result;
};

datastore.countryInRegionArray = function(countryName, regionArray) {
    let countryObj = datastore.findCountryByName(countryName);
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



datastore.findRecommendationByName = function(name) {
    for(let ii = 0; ii < datastore.data.recommendation.length; ii++) {
        const obj = datastore.data.recommendation[ii];
        if (obj.name == name) {
            return obj;
        }
    }

    return null;        
};
datastore.isInMapRegion = function(point, name) {
    let found = false;

    datastore.data.mapRegions.forEach(function(obj) {
        if (obj.name == name && obj.box) {
            if (datastore.pointInBox(point, obj.box)) {
                found = true;
            }
        }

    });
    return found;
};

datastore.findMapRegionsByPoint = function(point) {
    // point must have lat and lon members (float)
    let result = [];

    datastore.data.mapRegions.forEach(function(obj) {
        if (obj.box) {
            if (datastore.pointInBox(point, obj.box)) {
                result.push(obj);
            }
        }

    });

    return result;
};

datastore.findSkuLifecycle = function(name) {
    for(let ii = 0; ii < datastore.data.skuLifecycle.length; ii++) {
        const obj = datastore.data.skuLifecycle[ii];
        if (obj.name == name) {
            return obj;
        }
    }

    return null;        
};

doUpdate();
