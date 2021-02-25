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
            },
            {
                guid:'0ca3e34e-76e2-11eb-9439-0242ac130002',
                generatorFn:function() {
                    return generateCountryList('electron'); 
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
            },
            {
                guid:'2445e222-76e2-11eb-9439-0242ac130002',
                generatorFn:function() {
                    return generateCountryList('e series'); 
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
            },
            {
                guid:'c9241a2c-76e0-11eb-9439-0242ac130002',
                generatorFn:function() {
                    return generateCountryList('b series', {
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
                    return generateFamilySkus('b series', {
                        filterFn:function(skuObj) {
                            return skuObj.skuRegion != 'emeaa';
                        }        
                    }); 
                } 
            },
            {
                guid:'99975710-76e0-11eb-9439-0242ac130002',
                generatorFn:function() {
                    return generateCountryList('b series', {
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
                    return generateFamilySkus('tracker', {
                        filterFn:function(skuObj) {
                            return !skuObj.name.startsWith('ONE');
                        }        
                    }); 
                } 
            },
            {
                guid:'2f3d1a14-76de-11eb-9439-0242ac130002',
                generatorFn:function() {
                    return generateCountryList('tracker', {
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
                    return generateFamilySkus('tracker', {
                        filterFn:function(skuObj) {
                            return !skuObj.name.startsWith('T') || skuObj.skuClass == 'eval';
                        }        
                    }); 
                } 
            },
            {
                guid:'8e7b0446-76de-11eb-9439-0242ac130002',
                generatorFn:function() {
                    return generateCountryList('tracker', {
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
                    return generateFamilySkus('tracker', {
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
                    return generateFamilySkus('argon'); 
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
                    return generateFamilySkus('p series', {
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
                    return generateFamilySkus('photon'); 
                } 
            }
        ]
    },
    {
        path:'/datasheets/certifications/antenna.md', 
        updates:[
            {
                guid:'95bdb290-775f-11eb-9439-0242ac130002', 
                generatorFn:generateAntCell
            },
            {
                guid:'04ed49fe-7766-11eb-9439-0242ac130002', 
                generatorFn:generateAntWiFi
            },
            {
                guid:'54f1ecbe-7768-11eb-9439-0242ac130002', 
                generatorFn:generateAntBle
            },
            {
                guid:'2b1c34c8-776b-11eb-9439-0242ac130002', 
                generatorFn:generateAntNfc
            },
            {
                guid:'dd897350-776b-11eb-9439-0242ac130002', 
                generatorFn:generateAntGnss
            },
            {
                guid:'57d69268-776d-11eb-9439-0242ac130002', 
                generatorFn:function() {
                    return generateNotCompatible({
                        filterFn:function(skuObj) {
                            return !!skuObj.cellAnt;
                        }        
                    });
                }
            },
            {
                guid:'cee24faa-776d-11eb-9439-0242ac130002', 
                generatorFn:function() {
                    return generateNotCompatible({
                        filterFn:function(skuObj) {
                            return !!skuObj.wifiAntInt || !!skuObj.wifiAntExt;
                        }        
                    });
                }
            },
            {
                guid:'2cf3e112-776e-11eb-9439-0242ac130002', 
                generatorFn:function() {
                    return generateNotCompatible({
                        filterFn:function(skuObj) {
                            return !!skuObj.bleAntInt || !!skuObj.bleAntExt;
                        }        
                    });
                }
            },
            {
                guid:'6b9301fa-776e-11eb-9439-0242ac130002', 
                generatorFn:function() {
                    return generateNotCompatible({
                        filterFn:function(skuObj) {
                            return !!skuObj.nfcAntExt;
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
    if (!options) {
        options = {};
    }

    let modems = [];
    let shortModelForModem = {};

    datastore.data.skuFamily.forEach(function(skuFamilyObj) {
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

    datastore.data.countryModemSim.forEach(function(cmsObj) {
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

        const modemObj = datastore.findModemByModel(cmsObj.modem);

        datastore.data.countryCarrier.forEach(function(ccObj) {
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


        showTechnologies.sort();


        md += '| ' + cmsObj.country + ' | ' + shortModelForModem[cmsObj.modem] + ' | ' + showTechnologies.join(', ');
        md += ' | ' + carriers.join(', ') + ' |\n';

    });

    return md;

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

    const skuFamilyObj = datastore.findSkuFamily(skuFamily);

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
        md += '| ' + skuObj.name + ' | ' + skuObj.desc + ' | ' + skuRegionReadable[skuObj.skuRegion];

        if (!skuFamilyObj.wifi) {
            md += ' | ' + skuObj.modem;
        }

        md += ' | ' + skuObj.lifecycle + ' | ' + (skuObj.replacement ? skuObj.replacement : '') + '|\n'; 
    });

    return md;
}


function generateAntCell(options) {
    let skus = [];

    if (!options) {
        options = {};
    }

    // Filter
    datastore.data.skus.forEach(function(skuObj) {
        if (!skuObj.cellAnt) {
            return;
        }
        if (skuObj.lifecycle == 'Discontinued') {
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

    md += '| Device | SKU  | Included | Antenna | Alternate |\n';
    md += '| :----- | :--- | :--------: | :------: | :--------: |\n'; 
    

    skus.forEach(function(skuObj) {
        md += '| ' + skuObj.desc + ' | ' + skuObj.name;
        
        md += ' | ' + (skuObj.cellAntInc ? '&check;' : '&nbsp;');

        md += ' | ' + skuObj.cellAnt;
        md += ' | ' + (skuObj.cellAntAlt ? skuObj.cellAntAlt + '<sup>2</sup>' : '&nbsp;');

        md += '|\n';
        
    });

    return md;    
};



function generateAntWiFi(options) {
    let skus = [];

    if (!options) {
        options = {};
    }

    // Filter
    datastore.data.skus.forEach(function(skuObj) {
        if (!skuObj.wifiAntInt && !skuObj.wifiAntExt) {
            return;
        }
        if (skuObj.lifecycle == 'Discontinued') {
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

    md += '| Device | SKU  | Built-In Antenna | External Compatible | External Included |\n';
    md += '| :----- | :--- | :--------: | :------: | :------: |\n';


    skus.forEach(function(skuObj) {
        md += '| ' + skuObj.desc + ' | ' + skuObj.name;
        
        md += ' | ' + (skuObj.wifiAntInt ? skuObj.wifiAntInt : '&nbsp;');
        md += ' | ' + (skuObj.wifiAntExt ? skuObj.wifiAntExt : '&nbsp;');
        md += ' | ' + (skuObj.wifiAntExtInc ? '&check;' : '&nbsp;');

        md += '|\n';
        
    });

    return md;    
};



function generateAntBle(options) {
    let skus = [];

    if (!options) {
        options = {};
    }

    // Filter
    datastore.data.skus.forEach(function(skuObj) {
        if (!skuObj.bleAntInt && !skuObj.bleAntExt) {
            return;
        }
        if (skuObj.lifecycle == 'Discontinued') {
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

    md += '| Device | SKU  | Built-In Antenna | External Compatible | External Included |\n';
    md += '| :----- | :--- | :--------: | :------: | :------: |\n';


    skus.forEach(function(skuObj) {
        md += '| ' + skuObj.desc + ' | ' + skuObj.name;
        
        md += ' | ' + (skuObj.bleAntInt ? '&check;' : '&nbsp;');
        md += ' | ' + (skuObj.bleAntExt ? skuObj.bleAntExt : '&nbsp;');
        md += ' | ' + (skuObj.bleAntExtInc ? '&check;' : '&nbsp;');

        md += '|\n';
        
    });

    return md;    
};


function generateAntNfc(options) {
    let skus = [];

    if (!options) {
        options = {};
    }

    // Filter
    datastore.data.skus.forEach(function(skuObj) {
        if (!skuObj.nfcAntExt) {
            return;
        }
        if (skuObj.lifecycle == 'Discontinued') {
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



    md += '| Device | SKU  | Compatible | Included |\n';
    md += '| :----- | :--- | :--------: | :------: |\n';


    skus.forEach(function(skuObj) {
        md += '| ' + skuObj.desc + ' | ' + skuObj.name;
        
        md += ' | ' + (skuObj.nfcAntExt ? '&check;': '&nbsp;');
        md += ' | ' + (skuObj.nfcAntExtInc ? '&check;' : '&nbsp;');

        md += '|\n';
        
    });

    return md;    
};



function generateAntGnss(options) {
    let skus = [];

    if (!options) {
        options = {};
    }

    // Filter
    datastore.data.skus.forEach(function(skuObj) {
        if (!skuObj.gnssAntInt && !skuObj.gnssAntExt) {
            return;
        }
        if (skuObj.lifecycle == 'Discontinued') {
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



    md += '| Device | SKU  | Compatible | Included |\n';
    md += '| :----- | :--- | :--------: | :------: |\n';


    skus.forEach(function(skuObj) {
        md += '| ' + skuObj.desc + ' | ' + skuObj.name;
        
        md += ' | ' + ((skuObj.gnssAntInt || skuObj.gnssAntExt)  ? '&check;' : '&nbsp;');
        md += ' | ' + ((skuObj.gnssAntIntInc || skuObj.gnssAntExtInc)  ? '&check;' : '&nbsp;');

        md += '|\n';
        
    });

    return md;    
};



function generateNotCompatible(options) {
    let skus = [];

    if (!options) {
        options = {};
    }

    // Filter
    datastore.data.skus.forEach(function(skuObj) {
        if (skuObj.lifecycle == 'Discontinued') {
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

    datastore.data.skuFamily.forEach(function(skuFamilyObj) {
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

    // Make postData end with exactly one \n, otherwise it keeps getting one added on each run
    let len = postData.length;
    while(len > 0 && postData.charAt(len - 1) == '\n') {
        len--;
    }
    if ((len + 1) < postData.length) {
        postData = postData.substr(0, len + 1);
    }

	
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
