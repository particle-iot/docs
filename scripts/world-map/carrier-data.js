// Helpers for building static maps from the carrier database (src/assets/files/carriers.json),
// the node.js equivalent of the datastore.data loops in src/assets/js/carriers.js.
//
// const data = require('./carrier-data').load();
//
// data.forEachCountry((countryObj, info) => { ... })
//    Calls the function for every country in the carrier list. 
//    countryObj is the entry from carriers.json countries (.name, .isoCode, ...)
//    info.countryModemSim is the array of countryModemSim entries for the country
//    info.countryCarrier is the array of countryCarrier entries for the country
//
// data.mapCountries((countryObj, info) => styleIndex)
//    Same iteration, but returns the array of { isoCode, style } needed by generateWorldMapSvg().
//    The function returns an index into the styles array, or undefined/null/-1 to leave the 
//    country with the default fill. 
//
// data.findSkuFamily(family), data.getModels(family) mirror datastore.findSkuFamily and the 
// model filter in familyMap.drawMap.

const fs = require('fs');
const path = require('path');

const defaultCarriersPath = path.join(__dirname, '..', '..', 'src', 'assets', 'files', 'carriers.json');

function load(carriersPath = defaultCarriersPath) {
    const data = JSON.parse(fs.readFileSync(carriersPath, 'utf8'));

    const byCountry = function(array) {
        const map = new Map();
        for(const obj of array) {
            if (!map.has(obj.country)) {
                map.set(obj.country, []);
            }
            map.get(obj.country).push(obj);
        }
        return map;
    };
    const countryModemSim = byCountry(data.countryModemSim);
    const countryCarrier = byCountry(data.countryCarrier);

    const result = { data };

    result.forEachCountry = function(fn) {
        for(const countryObj of data.countries) {
            fn(countryObj, {
                countryModemSim: countryModemSim.get(countryObj.name) || [],
                countryCarrier: countryCarrier.get(countryObj.name) || [],
            });
        }
    };

    result.mapCountries = function(fn) {
        const countries = [];
        result.forEachCountry(function(countryObj, info) {
            const style = fn(countryObj, info);
            if (typeof style == 'number' && style >= 0) {
                countries.push({ isoCode: countryObj.isoCode, style });
            }
        });
        return countries;
    };

    result.findSkuFamily = function(family) {
        return data.skuFamily.find(e => e.family == family) || null;
    };

    // The groups of a family that are shown on maps (same lifecycle filter as the browser maps)
    result.getModels = function(family) {
        const skuFamilyObj = result.findSkuFamily(family);
        if (!skuFamilyObj || !skuFamilyObj.group) {
            return [];
        }
        return skuFamilyObj.group.filter(obj => ['GA', 'In development', 'Sampling'].includes(obj.lifecycle));
    };

    return result;
}

module.exports = { load };
