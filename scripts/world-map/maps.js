// Definitions of the static world maps generated at build time (see world-map-build.js).
//
// This is code instead of a configuration file so each map can compute its styles and
// countries from the carrier database. 
//
// module.exports is a function (data, worldMapGlobal) that returns an array of maps:
//  .file   destination path, relative to the site root (for example 'assets/images/maps/foo.svg')
//  .styles array of styles passed to generateWorldMapSvg (title, color, hatch)
//  .countries array of { isoCode, style } (usually from data.mapCountries())
// data is from carrier-data.js load().

// Same as the 'ntn' family map in carriers.js (familyMap.drawMapNTN)
function ntnMap(data) {
    const styles = [
        { title: '2G', color: 'State_Yellow_500' }, // 0
        { color: 'State_Yellow_500', hatch: 'backward' }, // 1
        { title: 'M1', color: 'Sky_700' }, // 2
        { color: 'Sky_700', hatch: 'backward' }, // 3
        { title: 'M1 & 2G', color: 'Mint_800' }, // 4
        { color: 'Mint_800', hatch: 'backward' }, // 5 (index + 1 = same with NTN)
        { title: 'NTN', hatch: 'backward' }, // 6
    ];
    const NTN_ONLY = 6;

    const countries = data.mapCountries(function(countryObj, info) {
        let foundValue = -1;

        for(const cmsObj of info.countryModemSim) {
            if (cmsObj.modem != 'BG95-S5' || cmsObj.sim != 4) {
                continue;
            }

            let has2G = cmsObj.technologies.includes('2G');
            let hasM1 = cmsObj.technologies.includes('M1');
            const hasNTN = cmsObj.technologies.includes('NTN');

            if (cmsObj.roamingRestrictions == 'hide' || cmsObj.roamingRestrictions == 'warn') {
                has2G = hasM1 = false;
            }

            if (hasM1 && has2G) {
                foundValue = 4;
            }
            else if (hasM1) {
                foundValue = 2;
            }
            else if (has2G) {
                foundValue = 0;
            }

            if (hasNTN) {
                foundValue = (foundValue >= 0) ? (foundValue + 1) : NTN_ONLY;
            }
        }
        return foundValue;
    });

    return { file: 'assets/images/maps/ntn.svg', styles, countries };
}

// Same as familyMap.drawMapCat1Expansion in carriers.js
function cat1ExpansionMap(data) {
    const styles = [
        { title: 'Original', color: 'Sky_600' },
        { title: 'Expanded', color: 'Sky_900' },
    ];

    const countries = data.mapCountries(function(countryObj, info) {
        for(const cmsObj of info.countryModemSim) {
            if (cmsObj.recommendation != 'YES' || !cmsObj.modem.startsWith('EG91-E') || cmsObj.sim != 4) {
                continue;
            }
            return cmsObj.expansion ? 1 : 0;
        }
    });

    return { file: 'assets/images/maps/cat1-expansion.svg', styles, countries };
}

// Same as familyMap.drawMap in carriers.js: one map per device family, colored by
// the mapColor and mapHatch of each group (model) in skuFamily.
function familyMap(data, worldMapGlobal, family) {
    const colors = ['#86E2D5', '#00AEEF'];

    // A country that only picks up a hatch is drawn as a hatch over the default fill
    const NO_COLOR_INDEX = colors.length;
    const { styles, getStyleIndex } = worldMapGlobal.createHatchStyles([...colors, undefined]);

    const models = data.getModels(family);

    const countries = data.mapCountries(function(countryObj, info) {
        let foundColorIndex;
        let foundHatch = '';

        for(const cmsObj of info.countryModemSim) {
            for(const modelObj of models) {
                if (modelObj.sim != cmsObj.sim || modelObj.modem != cmsObj.modem) {
                    continue;
                }

                // A model with mapShowPOSS treats NR and POSS the same as YES for map purposes
                let recommended = cmsObj.recommendation == 'YES';
                if (!recommended && modelObj.mapShowPOSS && (cmsObj.recommendation == 'NS' || cmsObj.recommendation == 'POSS')) {
                    // This matches carriers.js, where the condition is always true
                    recommended = true;
                }
                if (!recommended) {
                    continue;
                }

                if (typeof modelObj.mapColor != 'undefined') {
                    foundColorIndex = modelObj.mapColor;
                }
                if (modelObj.mapHatch) {
                    foundHatch = modelObj.mapHatch;
                }
            }
        }
        if (typeof foundColorIndex != 'undefined' || foundHatch) {
            const colorIndex = typeof foundColorIndex != 'undefined' ? foundColorIndex : NO_COLOR_INDEX;
            return getStyleIndex(colorIndex, foundHatch);
        }
    });

    const slug = family.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    return { file: 'assets/images/maps/family-' + slug + '.svg', styles, countries };
}

module.exports = function(data, worldMapGlobal) {
    const maps = [
        ntnMap(data),
        cat1ExpansionMap(data),
    ];

    for(const skuFamilyObj of data.data.skuFamily) {
        if (!skuFamilyObj.group || skuFamilyObj.wifi || skuFamilyObj.cellular === false) {
            continue;
        }
        const map = familyMap(data, worldMapGlobal, skuFamilyObj.family);
        if (map.countries.length) {
            maps.push(map);
        }
    }

    return maps;
};
