
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


datastore.bandGetTag = function(x) {
    const index = x.indexOf('-');
    if (index > 0) {
        return x.substr(0, index);
    }
    else {
        return '';
    }
};

datastore.bandGetBand = function(x) {
    const index = x.indexOf('-');
    if (index > 0) {
        return parseInt(x.substr(index + 1));
    }
    else {
        return 0;
    }
};

datastore.sortCompareTagBand = function(a, b) {
    const aTag = datastore.bandGetTag(a);
    const bTag = datastore.bandGetTag(b);

    const cmp = aTag.localeCompare(bTag);
    if (cmp != 0) {
        return cmp;
    } 

    const aBand = datastore.bandGetBand(a);
    const bBand = datastore.bandGetBand(b);

    return aBand - bBand;
};

datastore.sortCompareNumeric = function(a, b) {
    return parseInt(a) - parseInt(b);
};

datastore.dateParse = function(d) {
    let result = {
        s: d,
    };

    if (typeof d == 'number') {
        result.year = d;
    }
    else
    if (typeof d == 'string') {
        let m;

        m = d.match(/([0-9]+)-([0-9]+)-([0-9]+)/);
        if (m) {
            result.year = parseInt(m[1]);
            result.month = parseInt(m[2]);
            result.day = parseInt(m[3]);
        }
        else {
            m = d.match(/([0-9]+)-([0-9]+)/);
            if (m) {
                result.year = parseInt(m[1]);
                result.month = parseInt(m[2]);
            }
            else {
                m = d.match(/(^[0-9]+)$/);
                if (m) {
                    result.year = parseInt(m[1]);
                }        
            }
        }

    } 

    // console.log('dateParse ' + d, result);

    return result;
}

datastore.dateCompareKey = function(d1, d2, key) {
    if (typeof d1[key] != 'undefined' && typeof d2[key] != 'undefined') {
        return d1[key] - d2[key];
    }
    else
    if (typeof d1[key] != 'undefined') {
        return -1;
    }
    else
    if (typeof d2[key] != 'undefined') {
        return 1;
    }
    else {
        return 0;
    }
}


datastore.dateCompare = function(d1, d2) {
    const r1 = datastore.dateParse(d1);
    const r2 = datastore.dateParse(d2);
    
    let cmp;
    cmp = datastore.dateCompareKey(r1, t2, 'year');
    if (cmp == 0) {
        cmp = datastore.dateCompareKey(r1, t2, 'month');
        if (cmp == 0) {
            cmp = datastore.dateCompareKey(r1, t2, 'day');                                   
        }    
    }
    return cmp;
}
