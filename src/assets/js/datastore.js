
let datastore = {};

datastore.data = {};

datastore.init = function(options, callback) {
    datastore.options = options;
    
    $.getJSON(datastore.options.path, function(data) {
        datastore.data = data;

        if (callback) {
            callback();
        }
    });
};

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
        if (obj.country == country && obj.sim == sim) {
            if (Array.isArray(modem)) {
                if (modem.includes(obj.modem)) {
                    result = obj;
                }
            }
            else 
            if (obj.modem == modem) {
                result = obj;
            }
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