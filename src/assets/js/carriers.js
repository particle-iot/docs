
let carriers2 = {};
let bandFit = {};

//
// By Device
//
carriers2.fromQuery = function(urlParams) {
    const device = urlParams.get('device');
    if (device) {
        $(carriers2.options.deviceList).val(device);
    }

    const region = urlParams.get('region');
    if (region) {
        const regionVal = $('#' + carriers2.options.regionList + ' option').filter(function () { return $(this).html() === region; }).prop('value');
        $('#' + carriers2.options.regionList).val(regionVal);
    }
    const showUnsupported = urlParams.get('showUnsupported');
    if (showUnsupported) {
        $('.byDeviceShowUnsupported').prop('checked', showUnsupported === 'true')
    }

    carriers2.selectMenu();
};

carriers2.saveQuery = function() {
    const deviceShortName = $(carriers2.options.deviceList).val();
    
    const skuFamilyInfo = datastore.findSkuFamilyInfoByShortName(deviceShortName); 

    const regionVal = $('#' + carriers2.options.regionList).val();
    const region = $('#' + carriers2.options.regionList + ' option').filter(function () { return $(this).prop('value') === regionVal; }).html();

    const values = {
        tab: 'ByDevice',
        device: deviceShortName,
        region,
    };
    if ($('.byDeviceShowUnsupported').prop('checked')) {
        values.showUnsupported = 'true';
    }
    if (skuFamilyInfo && skuFamilyInfo.modemObj && skuFamilyInfo.modemObj.technologies.includes('NTN') && $('.byDeviceShowNTN').prop('checked')) {
        values.showNTN = 'true';
    }

    let url = '?';
    for(const key in values) {
        if (url != '?') {
            url += '&';
        }
        url += key + '=' + encodeURIComponent(values[key]);
    }

    history.pushState(null, '', url);
};

carriers2.generateDeviceMenu = function(options) {
    // options
    //   .selectElem - The element to append the items to
    //   .addAllDevices 

    for(const skuFamilyObj of datastore.data.skuFamily) {
        if (skuFamilyObj.wifi || skuFamilyObj.cellular === false || !skuFamilyObj.group) {
            continue;
        }
        if (skuFamilyObj.showInternalUsers) {
            if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                continue;
            }            
        }

        const optGroupElem = document.createElement('optgroup');
        $(optGroupElem).attr('label', skuFamilyObj.name);

        for(const groupObj of skuFamilyObj.group) {
            if (groupObj.showInternalUsers) {
                if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                    continue;
                }            
            }
            if (!Array.isArray(groupObj.short) || groupObj.short.length == 0) {
                continue;
            }

            const optionElem = document.createElement('option');
            $(optionElem).attr('value', groupObj.short[0]);
            $(optionElem).text(groupObj.name);
            $(optGroupElem).append(optionElem);
        }

        $(options.selectElem).append(optGroupElem);
    }

    if (options.addAllDevices) {
        let optionElem = document.createElement('option');
        $(optionElem).attr('disabled', 'disabled');
        $(optionElem).html('&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;');
        $(options.selectElem).append(optionElem);

        optionElem = document.createElement('option');
        $(optionElem).attr('value', 'all');
        $(optionElem).html('Show All Devices');
        $(options.selectElem).append(optionElem);        
    }
}
    

carriers2.buildMenu = function() {

    {
        // Device Popup
        carriers2.generateDeviceMenu({
            selectElem: carriers2.options.deviceList,
            addAllDevices: false,
        });

        $(carriers2.options.deviceList).on('change', carriers2.selectMenu);
    }

    {
        // Region Popup
        let html = '<option value="-1">All</option>';

        const regionGroup = datastore.findRegionGroupById(carriers2.options.regionGroup);
        regionGroup.regions.forEach(function(obj1, index1) {
            html += '<option value="' + index1 + '">' + obj1.name + '</option>';
        });

        $('#' + carriers2.options.regionList).html(html);
    }

};

carriers2.selectMenu = function() {
    carriers2.saveQuery();

    const skuFamilyInfo = datastore.findSkuFamilyInfoByShortName($(carriers2.options.deviceList).val()); 

    // Update other tabs 
    const deviceVal = $(carriers2.options.deviceList).val();
    if (countryDetails.options && $(countryDetails.options.deviceList).val() != 'all' && skuFamilyInfo) {
        $(countryDetails.options.deviceList).val(deviceVal);
        countryDetails.update();
        
        const skuFamily = skuFamilyInfo.groupObj.family || skuFamilyInfo.skuFamilyObj.family;
        $('#familyMapSelect').val(skuFamily);
        if (carriers2.familyMap) {
            carriers2.familyMap.drawMap();
        }
    };

    carriers2.update();
};

carriers2.update = function() {
    const deviceShortName = $(carriers2.options.deviceList).val();
    
    const skuFamilyInfo = datastore.findSkuFamilyInfoByShortName(deviceShortName); 

    const simPlanObj = datastore.findSimPlanById(skuFamilyInfo.groupObj.simPlan);
    const countryCarrierKeys = simPlanObj.countryCarrierKeys || [simPlanObj.countryCarrierKey];

    const modemObj = skuFamilyInfo.modemObj;
    const technologies = modemObj.technologies;

    const regionGroup = datastore.findRegionGroupById(carriers2.options.regionGroup);
    let regions;
    const regionIndex = parseInt($('#' + carriers2.options.regionList).val());
    if (regionIndex >= 0) {
        regions = regionGroup.regions[regionIndex].regions;
    }

    const showUnsupported = $('.byDeviceShowUnsupported').prop('checked');

    const showNTN = modemObj.technologies.includes('NTN') && $('.byDeviceShowNTN').prop('checked'); // This is really only show NTN if true

    {
        let html = '<tr><th>Country</th><th>Carrier</th>';

        technologies.forEach(function(tech) {
            html += '<th>' + tech + '</th>';
        });
        if (technologies.includes("2G")) {
            html += "<th>2G sunset</th>";
        }
        if (technologies.includes("3G")) {
            html += "<th>3G sunset</th>";
        }
        html += '</tr>';

        $('#' + carriers2.options.table + ' > thead').html(html);
    }

    $('#' + carriers2.options.table + ' > tbody').html('');

    let countryHasSecondaryOrBackup = {};
    let countryCarrierFiltered = [];
    let hasUnsupported = false;

    for(const ccObj of datastore.data.countryCarrier) {

        for(const countryCarrierKey of countryCarrierKeys) {
            if (!ccObj[countryCarrierKey] || ccObj[countryCarrierKey].prohibited) {
                // console.log('no countryCarrierKey', {countryCarrierKey, ccObj});
                continue;
            }
            const cmsObj = datastore.findCountryModemSim(ccObj.country, skuFamilyInfo.groupObj.modem, skuFamilyInfo.groupObj.sim);
            if (!cmsObj || cmsObj.recommendation == 'NR') {
                // console.log('no recommendation or NR', {countryCarrierKey, cmsObj, ccObj});
                continue;
            }

            if (cmsObj.recommendation == 'NS' || cmsObj.recommendation == 'POSS') {
                hasUnsupported = true;

                if (!showUnsupported) {
                    // console.log('NS or POSS with not show unsupported', {countryCarrierKey, cmsObj, ccObj});
                    continue;
                }
            }

            if (showNTN) {
                // Only show NTN
                let carrierHasNTN = false;
                for(const b of ccObj.bands) {
                    if (b.startsWith('NTN-')) {
                        carrierHasNTN = true;
                    }
                }
                if (!carrierHasNTN) {
                    continue;
                }
            }

            if (regions && !datastore.countryInRegionArray(ccObj.country, regions)) {
                // console.log('no region', {countryCarrierKey, regions, ccObj});
                continue;
            }

            if (ccObj[countryCarrierKey].rank == 'Secondary' || ccObj[countryCarrierKey].rank == 'Backup') {
                countryHasSecondaryOrBackup[ccObj.country] = true;
            }

            if (ccObj.country == 'United States' && ccObj.carrier == 'Verizon') {
                // Skip on E404 and ELC404
                if (skuFamilyInfo.groupObj.short.includes('E404') || skuFamilyInfo.groupObj.short.includes('ELC404')) {
                    continue;
                }
            }

            countryCarrierFiltered.push(ccObj);
        }
    }
    // console.log('countryCarrierFiltered', countryCarrierFiltered);

    if (hasUnsupported) {
        $('.byDeviceShowUnsupportedRow').show();
    }
    else {
        $('.byDeviceShowUnsupportedRow').hide();
    }

    if (modemObj.technologies.includes('NTN')) {
        $('.byDeviceShowNTNRow').show();
    }
    else {
        $('.byDeviceShowNTNRow').hide();
    }

    let warnRoaming = false;
    let warnVerizon = false;
    let warnSunset = false;
    let byDeviceUnsupportedWarning = false;

    countryCarrierFiltered.forEach(function(ccObj) {
        let html = '';

        html += '<tr><td>' + ccObj.country + '</td><td>' + ccObj.carrier;
        
        if (countryHasSecondaryOrBackup[ccObj.country]) {
            for(const countryCarrierKey of countryCarrierKeys) {

                if (ccObj[countryCarrierKey].rank == 'Secondary') {
                    html += '<sup>2</sup>';
                }
                else if (ccObj[countryCarrierKey].rank == 'Backup') {
                    html += '<sup>3</sup>';
                }
            }
        }
        
        html += '</td>';        

        let allow = false;
        technologies.forEach(function(tech) {
            let cell = '&nbsp;';

            for(const countryCarrierKey of countryCarrierKeys) {
                if (!ccObj[countryCarrierKey]) {
                    continue;
                }
                
                if (ccObj[countryCarrierKey]['allow' + tech]) {

                    const cmsObj = datastore.findCountryModemSim(ccObj.country, skuFamilyInfo.groupObj.modem, skuFamilyInfo.groupObj.sim);
                    if (!cmsObj || !cmsObj.supported[ccObj.carrier]) {
                        // Not supported by modem, or sunset
                        continue;
                    }
                    let hasTech = false;
                    for(const band of cmsObj.supported[ccObj.carrier]) {
                        if (band.startsWith(tech)) {
                            hasTech = true;
                        }
                    }
                    if (!hasTech) {
                        continue;
                    }

                    allow = true;

                    const allowValue = ccObj[countryCarrierKey]['allow' + tech];


                    if (allowValue == 5) {
                        // T-Mobile  warning
                        cell = tech + '<sup>' + allowValue + '</sup>'; 
                        warnTMobile = true;
                    }
                    else
                    if (allowValue == 7) {
                        // Verizon warning
                        cell = tech + '<sup>' + allowValue + '</sup>'; 
                        warnVerizon = true;
                    }
                    else
                    if (!ccObj[countryCarrierKey].roamingRestrictions) {
                        if (cmsObj.recommendation == 'YES') {
                            cell = tech; 
                        }
                        else {
                            cell = tech + '<sup>?</sup>';
                            byDeviceUnsupportedWarning = true;
                        }
                    }
                    else {
                        cell = '<sup>6</sup>'; 
                        warnRoaming = true;
                    }
                }
            }
            html += '<td>' + cell + '</td>';
        });

        if (technologies.includes("2G")) {
            let cell = '&nbsp;';

            for(const countryCarrierKey of countryCarrierKeys) {
                if (!ccObj[countryCarrierKey]) {
                    continue;
                }
                const sunset2G = datastore.dateParse(ccObj.sunset2G);

                if (sunset2G.year && ccObj[countryCarrierKey]['allow2G']) {
                    cell = sunset2G.s;
                    warnSunset = true;
                }    
            }

            html += '<td>' + cell + '</td>';
        }
        if (technologies.includes("3G")) {
            let cell = '&nbsp;';

            for(const countryCarrierKey of countryCarrierKeys) {
                if (!ccObj[countryCarrierKey]) {
                    continue;
                }

                const sunset3G = datastore.dateParse(ccObj.sunset3G);

                if (sunset3G.year && ccObj[countryCarrierKey]['allow3G']) {
                    cell = sunset3G.s;
                    warnSunset = true;
                }    
            }

            html += '<td>' + cell + '</td>';
        }

        if (!allow) {
            return;
        }

        html += '</tr>';

        $('#' + carriers2.options.table + ' > tbody').append(html);

    });

    if (skuFamilyInfo.groupObj.short.includes('M404')) {
        $('#byDeviceM404Warning').show();
    }
    else {
        $('#byDeviceM404Warning').hide();
    }
    if (byDeviceUnsupportedWarning) {
        $('#byDeviceUnsupportedWarning').show();
    }    
    else {
        $('#byDeviceUnsupportedWarning').hide();
    }

    if (warnRoaming) {
        $('#byDeviceRoamingWarning').show();
    }
    else {
        $('#byDeviceRoamingWarning').hide();
    }

    if (warnVerizon) {
        $('#byDeviceVerizonWarning').show();
    }
    else {
        $('#byDeviceVerizonWarning').hide();        
    }

    if (warnSunset) {
        $('.byDeviceSunsetWarning').show();
    }
    else {
        $('.byDeviceSunsetWarning').hide();
    }

}


carriers2.init = function(options, callback) {
    // options: 
    // deviceList - ID for select for device list
    // regionList - ID for select for region list
    // regionGroup - regionGroup to display
    // table - ID for table
    carriers2.options = options;


    carriers2.buildMenu();

    $('#' + carriers2.options.regionList).on('change', carriers2.selectMenu);

    carriers2.selectMenu();

    callback();
};


//
// Family Map
//
 
let familyMaps = [];

const familyMapCreate = function() {

    let familyMap = {};

    familyMap.fromQuery = function(urlParams) {
        const family = urlParams.get('family');
        if (family) {
            $(familyMap.options.familySelect).val(family);
        }
    };

    familyMap.saveQuery = function() {
        const family = $(familyMap.options.familySelect).val();

        history.pushState(null, '', '?tab=ModelMap&family=' + encodeURIComponent(family));
    };

    familyMap.removeFill = function() {
        if (familyMap.worldMapFill) {
            const svgElem = $('.familyMapDiv > svg ');
            for(const className of familyMap.worldMapFill) {
                $(svgElem).find('.' + className).css('fill', '#E2E4EB'); // gray 200
            }
        }
        familyMap.worldMapFill = [];
    }

    familyMap.selectTab = function() {
        familyMap.drawMap();        
    }

    familyMap.selectChange = function() {
        familyMap.saveQuery();

        // Update other tabs
        let family;

        if (familyMap.options.familySelect) {
            family = $(familyMap.options.familySelect).val();
        }
        else {
            family = familyMap.options.family;
        }
        let deviceVal;

        const skuFamilyObj = datastore.findSkuFamily(family);
        if (skuFamilyObj && skuFamilyObj.group && skuFamilyObj.group.length >= 1) {
            const groupObj = skuFamilyObj.group[0];

            if (groupObj && groupObj.short && groupObj.short.length >= 1) {
                deviceVal = groupObj.short[0];
            }
        }
        else {
            if (family == 'ntn') {
                deviceVal = 'M635E';
            }
        }

        if (deviceVal) {
            $(carriers2.options.deviceList).val(deviceVal);
            carriers2.update();

            if (countryDetails && countryDetails.options) {
                $(countryDetails.options.deviceList).val(deviceVal);
                countryDetails.update();
            }
        }

        familyMap.drawMap();
    }

    familyMap.drawMap = async function() {
        let family;

        $('.familyMapDiv').empty();

        if (familyMap.options.family == 'cat1expansion') {
            await familyMap.drawMapCat1Expansion();
            return;
        }
        else
        if (familyMap.options.familySelect) {
            family = $(familyMap.options.familySelect).val();
        }
        else {
            family = familyMap.options.family;
        }

        if (family == 'ntn') {
            await familyMap.drawMapNTN();
            return;
        }

        // This is causing the family map to always get selected
        /*
        if (!familyMap.options.noHistory) {
            familyMap.saveQuery();
        }
        */

        const colors = ['#86E2D5', '#00AEEF'];

        const worldMapInstance = await initWorldMap({
            styles: [
                { // 0
                    color: colors[0],
                },
                {
                    color: colors[1],
                }
            ],
            containerElem: $('.familyMapDiv'),
        });
        

        const skuFamilyObj = datastore.findSkuFamily(family);

        console.log('skuFamilyObj', skuFamilyObj);

        let models = [];
        skuFamilyObj.group.forEach(function(obj) {
            if (obj.lifecycle == 'GA' || obj.lifecycle == 'In development' || obj.lifecycle == 'Sampling') {
                models.push(obj);
            }
        });

        datastore.data.countries.forEach(function(countryObj) {

            let foundModel;

            datastore.data.countryModemSim.forEach(function(cmsObj) {
                if (countryObj.name != cmsObj.country || cmsObj.recommendation != 'YES') {
                    return;
                }

                models.forEach(function(modelObj, modelIndex) {
                    if (modelObj.sim == cmsObj.sim && modelObj.modem == cmsObj.modem) {
                        if (typeof modelObj['mapColor'] != 'undefined') {
                            foundModel = modelObj.mapColor;
                        }
                        else {
                            // foundModel = modelIndex;
                        }
                    }
                });
            });    
            if (typeof foundModel != 'undefined') {
                worldMapInstance.setCountryColor(countryObj.isoCode, foundModel);
            }
        });


        // 
        {
            let html = '<div><table><thead><tr><th></th><th>SKU</th><th>Description</th><th>Lifecycle</th></tr></thead><tbody>';

            models.forEach(function(skuFamilyObj, modelIndex) {
                let mapColor = modelIndex;
                if (typeof skuFamilyObj['mapColor'] != 'undefined') {
                    mapColor = skuFamilyObj.mapColor;
                }
                const style = 'background-color:' + colors[mapColor];
                if (!colors[mapColor]) {
                    return;
                }

                datastore.data.skus.forEach(function(skuObj) {
                    if (skuObj.sim != skuFamilyObj.sim || skuObj.modem != skuFamilyObj.modem || skuObj.family != family) {
                        return;
                    }
                    
                    html += '<tr><td style="' + style + '">&nbsp;&nbsp;</td><td>' + skuObj.name + '</td><td>' + skuObj.desc + '</td><td>' + skuObj.lifecycle + '</td></tr>';
                });
            });
            html += '</tbody></table></div>';

            $(familyMap.options.skusDiv).html(html);
        }

    }

    familyMap.drawMapNTN = async function() {
        const worldMapInstance = await initWorldMap({
            styles: [
                { // 0
                    title: '2G',
                    color: 'State_Yellow_500', // Yellow
                },
                {
                    color: 'State_Yellow_500', // Yellow
                    hatch: 'backward',
                },
                { // 2
                    title: 'M1',
                    color: 'Sky_700', // Blue
                },
                {
                    color: 'Sky_700', // Blue
                    hatch: 'backward',
                },
                { // 4
                    title: 'M1 & 2G',
                    color: 'Mint_800', // Green
                },
                {
                    color: 'Mint_800', // Green
                    hatch: 'backward',
                },
                { // 5
                    title: 'NTN',
                    hatch: 'backward'
                },
            ],
            containerElem: $('.familyMapDiv'),
        });
        
        for(const countryObj of datastore.data.countries) {
            let foundValue = -1;

            for(const cmsObj of datastore.data.countryModemSim) {
                if (countryObj.name != cmsObj.country) {
                    continue;
                }
                if (cmsObj.modem != 'BG95-S5' || cmsObj.sim != 4) {
                    continue;
                }


                let has2G = cmsObj.technologies.includes('2G');
                let hasM1 = cmsObj.technologies.includes('M1');
                let hasNTN = cmsObj.technologies.includes('NTN');

                if (cmsObj.roamingRestrictions == 'hide' || cmsObj.roamingRestrictions == 'warn') {
                    // Possibly illustrate warn differently here
                    has2G = hasM1 = false;    
                }


                if (hasM1 & has2G) {
                    foundValue = 4;
                }
                else
                if (hasM1) {
                    foundValue = 2;
                }
                else
                if (has2G) {
                    foundValue = 0;
                }

                if (hasNTN) {
                    if (foundValue >= 0) {
                        foundValue++;
                    }
                    else {
                        foundValue = 5;
                    }
                }
            }

            if (foundValue >= 0) {
                worldMapInstance.setCountryColor(countryObj.isoCode, foundValue);
            }
        }        

    }


    familyMap.drawMapCat1Expansion = async function() {
        const worldMapInstance = await initWorldMap({
            styles: [
                {
                    title: 'Original',
                    color: 'Sky_600',
                },
                {
                    title: 'Expanded',
                    color: 'Sky_900',
                },
            ],
            containerElem: $('.familyMapDiv'),
        });
        
        for(const countryObj of datastore.data.countries) {
            let foundValue = -1;

            for(const cmsObj of datastore.data.countryModemSim) {
                if (countryObj.name != cmsObj.country || cmsObj.recommendation != 'YES') {
                    continue;
                }
                if (!cmsObj.modem.startsWith('EG91-E') || cmsObj.sim != 4) {
                    continue;
                }

                if (cmsObj.expansion) {
                    foundValue = 1;
                    break;
                }
                else {
                    foundValue = 0;
                    break;
                }
            }
            if (foundValue >= 0) {
                worldMapInstance.setCountryColor(countryObj.isoCode, foundValue);
            }
        }        
    }


    familyMap.init = function(options, callback) {
        // options: 
        // mapDiv - map div element
        // familySelect - family select element
        // family - the device family if familySelect is not present
        // noHistory - don't update page history
        familyMap.options = options;

        const run = async function() {
            await familyMap.drawMap();
            
            if (familyMap.options.familySelect) {
                $(familyMap.options.familySelect).on('change', familyMap.selectChange);
            }
            familyMaps.push(familyMap);

            callback();
        }

        run();
    };

    return familyMap;
};



//
//
//
let countryDetails = {};

countryDetails.fromQuery = function(urlParams) {
    const device = urlParams.get('device');
    if (device) {
        $(countryDetails.options.deviceList).val($(countryDetails.options.deviceList).val());
    }
    const country = urlParams.get('country');
    if (country) {
        $('#' + countryDetails.options.countryField).val(country);   
        countryDetails.onCountrySelected();
    }
};

countryDetails.saveQuery = function() {
    if (countryDetails.country) {
        const deviceVal = $(countryDetails.options.deviceList).val();
    
        const values = {
            tab: 'CountryDetails',
            country: countryDetails.country,
            device: deviceVal,
        };

        let url = '?';
        for(const key in values) {
            if (url != '?') {
                url += '&';
            }
            url += key + '=' + encodeURIComponent(values[key]);
        }

        history.pushState(null, '', url);    
    }
};


countryDetails.buildMenu = function() {
    // Device Popup
    carriers2.generateDeviceMenu({
        selectElem: countryDetails.options.deviceList,
        addAllDevices: true,
    });

    $(countryDetails.options.deviceList).on('change', function() {
        countryDetails.onCountrySelected();
    });
};

countryDetails.getSkuFamilyDevice = function() {
    const valueArray = $('#' + countryDetails.options.deviceList).val().split(',');

    if (valueArray.length != 2) {
        return null;
    }

    return datastore.data.skuFamily[valueArray[0]].group[valueArray[1]];
};

countryDetails.generateTable = function(options) {
    // options.country
    // options.modem
    // options.sim
    // options.simPlan
    // options.tableId
    // options.resultDiv
    // options.showSkus
    const countryObj = datastore.findCountryByName(options.country);

    let recommendation;
    datastore.data.countryModemSim.forEach(function(obj) {
        // country, modem, sim, recommendation, reason
        if (obj.country == options.country && obj.modem == options.modem && obj.sim == options.sim) {
            recommendation = obj;
        }
    });
    if (!recommendation) {
        recommendation = {recommendation:'NR', reason:'Information not available'};
    }
    const recommendationObj = datastore.findRecommendationByName(recommendation.recommendation);

    const simPlanObj = datastore.findSimPlanById(options.simPlan);

    const modemObj = datastore.findModemByModel(options.modem);

    const isNTN = modemObj.technologies.includes('NTN');

    let html = '';

    if (options.showSeparator) {
        html += '<div style="border-top-style: solid; border-width: 2px;"></div>';
    }

    if (options.titles) {
        html += '<h3 style="line-height: 30px;">' + options.titles.join('<br/>') + '</h3>\n';
    }

    if (options.showSkus) {
        let skusArray = [];
        for(let skuObj of datastore.data.skus) {
            if (options.modem == skuObj.modem && options.sim == skuObj.sim && skuObj.simPlans.includes(options.simPlan)) {
                skusArray.push(skuObj);
            }
        }
        if (skusArray.length == 0) {
            // No SKUs for this modem and SIM, do not display
            return;
        }
        html += dataui.generateSkuTable(skusArray, {});
    }
    else
    if (options.showSkuFamily) {
        let skusArray = [];
        for(let skuObj of datastore.data.skus) {
            for(const prefix of options.showSkuFamily) {
                if (skuObj.name.startsWith(prefix) && !skuObj.name.startsWith(prefix + 'X')) {
                    skusArray.push(skuObj);
                    break;
                }
            }
        }
        html += dataui.generateSkuTable(skusArray, {});
    }

    // Recommendation
    // html += '<span style="font-size: large;">' + recommendationObj.desc + '</span>\n';
    html += '<strong>' + recommendationObj.desc + '</strong>\n';
    if (recommendation.reason) {
        let s = recommendation.reason;
        s = s.substr(0, 1).toUpperCase() + s.substr(1);
        html += '<p>' + s + '</p>\n';
        if (recommendation.roamingRestrictions) {
            html += '<p>There are permanent roaming restrictions in this country. See <a href="/getting-started/hardware/cellular-overview/#permanent-roaming">permanent roaming</a> for more information.</p>\n';
        }
    }
    if (isNTN) {
        let hasNTN = false;
        for(const ccObj of datastore.data.countryCarrier) {
            if (ccObj.country == options.country) {
                if (typeof ccObj.skylo != 'undefined') {
                    hasNTN = true;
                }
            }
        }
        if (!hasNTN) {
            html += '<p><strong>NTN (satellite) is not supported in ' + options.country + ' at this time</strong></p>\n';
        }
    }

    $(options.resultDiv).append(html);
    html = '';

    // Sunset warnings
    // Check for 2G/3G only
    let isOnly2G3G = true;
    for(const tech of modemObj.technologies) {
        if (tech != '2G' && tech != '3G') {
            isOnly2G3G = false;
        }
    }
    if (isOnly2G3G) {
        const divElem = document.createElement('div');
        $(divElem).attr('style', 'padding-top: 10px; padding-bottom: 10px;');

        if (countryObj.sunsetWarning) {        
            const aElem = document.createElement('a');
            $(aElem).attr('href', countryObj.sunsetWarning);
            $(aElem).text('See the 2G/3G sunset page for specific recommendations for this country');
            $(divElem).append(aElem);    
        }
        else {
            $(divElem).text('In some locations, 2G and/or 3G services are being shut down. Check with your local carrier to find when this device will no longer be able to be used in your area.');
        }
            
        $(options.resultDiv).append(divElem);

        // Sunset information
        const sunsetList = $('.sunsetList').data('sunsetList');
        if (sunsetList) {
            sunsetList.updateTable({
                includeCountries: [options.country],
            });
        }
    }
    else {
        $('.sunsetList').hide();
    }
    
    // Carrier band table
    const footnotesDivId = options.tableId + 'FootnotesDiv';

    html += '<div style="overflow: auto;">';
    html += '<table id="' + options.tableId + '">';
    html += '<thead></thead><tbody></tbody>';
    html += '</table></div>';
    html += '<div id="' + footnotesDivId + '"></div>';

    $(options.resultDiv).append(html);

    // Update band information after adding table
    const bandUseChangeOptions = {
        footnotes: {
            noBand:'1',
            noPlan:'2',
            noBandNoPlan:'3',
            warnM1:'4',
            warnVerizon: '7',
        },
        footnotesDiv: footnotesDivId, // countryDetails.options.footnotesDiv,
        showAllTechnologies: true,
        showM1: modemObj.technologies.includes('M1'),
    }
    const countryCarrierKeys = simPlanObj.countryCarrierKeys || [simPlanObj.countryCarrierKey];


    dataui.bandUseChangeHandler(options.tableId, [countryObj], countryCarrierKeys, modemObj, bandUseChangeOptions);
}

countryDetails.onCountrySelected = function() {
    const skuFamilyInfo = datastore.findSkuFamilyInfoByShortName($(countryDetails.options.deviceList).val()); 

    // Update other tabs 
    const deviceVal = $(countryDetails.options.deviceList).val();
    if (carriers2.options.deviceList && deviceVal != 'all' && skuFamilyInfo) {
        $(carriers2.options.deviceList).val(deviceVal);
        carriers2.update();

        const skuFamily = skuFamilyInfo.groupObj.family || skuFamilyInfo.skuFamilyObj.family;
        $('#familyMapSelect').val(skuFamily);
        if (carriers2.familyMap) {
            carriers2.familyMap.drawMap();
        }
    };


    if (skuFamilyInfo && skuFamilyInfo.groupObj) {
        // skuFamilyInfo.groupObj: region, lifecycle, sim, simPlan, modem
        const country = $('#' + countryDetails.options.countryField).val();
        if (country != '') {

            countryDetails.country = country;

            countryDetails.saveQuery();
        }
    }

    countryDetails.update();
};

countryDetails.update = function() {
    const skuFamilyInfo = datastore.findSkuFamilyInfoByShortName($(countryDetails.options.deviceList).val()); 

    const country = $('#' + countryDetails.options.countryField).val();
    if (country == '') {
        return;
    }

    const resultDiv = $('#' + countryDetails.options.resultDiv);
    $(resultDiv).html('');

    const countryObj = datastore.findCountryByName(country);

    if (skuFamilyInfo && skuFamilyInfo.groupObj) {
        // skuFamilyInfo.groupObj: region, lifecycle, sim, simPlan, modem

        countryDetails.generateTable({
            country,
            modem: skuFamilyInfo.groupObj.modem,
            sim: skuFamilyInfo.groupObj.sim,
            simPlan: skuFamilyInfo.groupObj.simPlan,
            tableId: 'carrierDetailTable',
            resultDiv,
            showSkuFamily: skuFamilyInfo.groupObj.short,
        });
        
    
    }
    else {
        let modemSimSimPlan = [];
        
        for(const skuFamilyObj of datastore.data.skuFamily) {
            if (skuFamilyObj.group) {
                for(const skuFamilyGroupObj of skuFamilyObj.group) {
                    let exists = false;
                    for(const mspObj of modemSimSimPlan) {
                        if (mspObj.modem == skuFamilyGroupObj.modem && 
                            mspObj.sim == skuFamilyGroupObj.sim &&
                            mspObj.simPlan == skuFamilyGroupObj.simPlan) {
                            exists = true;
                            mspObj.titles.push(skuFamilyGroupObj.name)
                        }
                    }
                    if (!exists) {
                        modemSimSimPlan.push({
                            titles: [skuFamilyGroupObj.name],
                            modem: skuFamilyGroupObj.modem,
                            sim: skuFamilyGroupObj.sim,
                            simPlan: skuFamilyGroupObj.simPlan,
                            tableId: ('carrierDetailTable' + modemSimSimPlan.length)
                        });
                    }
                }
            }
        }

        for(const mspObj of modemSimSimPlan) {
            countryDetails.generateTable({
                country,
                titles: mspObj.titles,
                modem: mspObj.modem,
                sim: mspObj.sim,
                simPlan: mspObj.simPlan,
                tableId: mspObj.tableId,
                resultDiv,
                showSeparator: true,
                showSkus: true
            });
        }
    }


};     


countryDetails.init = function(options, callback) {
    countryDetails.options = options;

    // countryField:'countryDetailText',
    // resultDiv:'countryDetailsResultsDiv'

    countryDetails.buildMenu(options);

    countryDetails.countrySel = dataui.countrySelector({
        textFieldId:countryDetails.options.countryField,
        popupClass:countryDetails.options.popupClass
    }).init();

    countryDetails.countrySel.onCountrySelected = countryDetails.onCountrySelected;


    callback();
};

//
// bandFit
//


bandFit.fromQuery = function(urlParams) {

    let test = urlParams.get('test');
    if (test) {
        if (test == 'b504') {
            test = 'b-series';
        }
        $(bandFit.bandFitTestSelectElem).val(test);
    } 
    const region = urlParams.get('region');
    if (region) {
        $(bandFit.bandFitRegionSelectElem).val(region);
    }
    const country = urlParams.get('country');
    if (country && region == 'country') {
        $(bandFit.bandFitSpecificCountryElem).val(country);
    }
    bandFit.selectRegion();
};

bandFit.saveQuery = function() {
    if (!$('#carrierTabBandFit').hasClass('active')) {
        return;
    }

    const test = $(bandFit.bandFitTestSelectElem).val();
    const region = $(bandFit.bandFitRegionSelectElem).val();
    const specificCountry = (region == 'country') ? $(bandFit.bandFitSpecificCountryElem).val() : '';
    
    history.pushState(null, '', '?tab=BandFit&test='+ test +'&region=' + encodeURIComponent(region) + '&country=' + encodeURIComponent(specificCountry));


};

bandFit.renderCountries = function(countries) {
    let test = $(bandFit.bandFitTestSelectElem).val();
    if (!test) {
        test = 'msom';
        $(bandFit.bandFitTestSelectElem).val(test);
    }

    for(const country of countries) {
        const countryObj = datastore.data.countries.find(e => e.name == country);

        let carriersInCountry = [];

        const simObj = datastore.data.sims.find(e => e.id == bandFit.tests[test].sim);

        for(const ccObj of datastore.data.countryCarrier) {
            if (ccObj.country != country) {
                continue;
            }

            if (!ccObj[simObj.simPlanKey]) {
                continue;
            }
            if (ccObj.bands.length == 0) {
                // Ignore carriers with no bands listed
                continue;
            }

            carriersInCountry.push(ccObj);
        }

        if (carriersInCountry.length == 0) {
            continue;
        }

        {
            const headerElem = document.createElement('h3');
            $(headerElem).text(country);
            $(bandFit.bandFitResultsElem).append(headerElem);    
        }
           
        for(const testObj of bandFit.tests[test].tests) {
            testObj.bands = [];
            testObj.counts = {
                greenCheck: 0,
                redX: 0,
            }

            for(const ccObj of carriersInCountry) {

                for(let b of ccObj.bands) {
                    let hasTech = false;
                    for(const t of testObj.modemObj.technologies) {
                        if (b.startsWith(t)) {
                            hasTech = true;
                        }
                    }
                    if (!hasTech) {
                        continue;
                    }

                    if (!testObj.bands.includes(b)) {
                        testObj.bands.push(b);
                    }
                    
                }

            }
            testObj.bands.sort(datastore.sortCompareTagBand);
        }

        let footnotes = [];

        const addFootnote = function(msg) {
            let footnoteIndex = footnotes.findIndex(e => e == msg);
            if (footnoteIndex < 0) {
                footnoteIndex = footnotes.length;
                footnotes.push(msg);
            }
            return (footnoteIndex + 1).toString();            
        }

        const tableDiv = document.createElement('div');
        $(tableDiv).attr('style', 'overflow: auto;');
        
        const tableElem = document.createElement('table');

        const theadElem = document.createElement('thead');
        {
            {
                const trElem = document.createElement('tr');
                {
                    const thElem = document.createElement('th');
                    $(thElem).attr('rowspan', '2');
                    $(thElem).text('Carrier');
                    $(trElem).append(thElem);
                }
    
    
                for(const testObj of bandFit.tests[test].tests) {
                    const thElem = document.createElement('th');
                    $(thElem).attr('style', 'border-bottom: 0px !important; text-align:center; color:' + bandFit.headerTextColor + '; background-color:' + testObj.backgroundColor + ';');
                    $(thElem).attr('colspan', (testObj.bands.length + 1));
                    $(thElem).text(testObj.title);
                    $(trElem).append(thElem);
                }
                const thElem = document.createElement('th');
                $(thElem).attr('rowspan', '2');
                $(trElem).append(thElem);
    
                $(theadElem).append(trElem);
            }
            {
                const trElem = document.createElement('tr');

                for(const testObj of bandFit.tests[test].tests) {

                    for(const b of testObj.bands) {
                        const thElem = document.createElement('th');
                        $(thElem).attr('style', 'text-align:center;');
        
                        {
                            const textNode = document.createTextNode(datastore.bandGetTag(b));
                            $(thElem).append(textNode);
                        }
                        $(thElem).append(document.createElement('br'));
                        {
                            let textNode;
                            const bandNum = datastore.bandGetBand(b);
                            if (bandNum < 600) {
                                textNode = document.createTextNode('B' + bandNum.toString());
                            }
                            else {
                                textNode = document.createTextNode('');
                            }
                            $(thElem).append(textNode);
                        }    
                    
                        $(thElem).append(document.createElement('br'));
                        {
                            let textNode;
                            const bandNum = datastore.bandGetBand(b);
                            if (bandNum < 600) {
                                textNode = document.createTextNode(dataui.bandToFrequency(bandNum).toString());
                            }
                            else {
                                textNode = document.createTextNode(bandNum.toString());
                            }
                            $(thElem).append(textNode);
                        }
        
                        $(trElem).append(thElem);
                    }

                    {
                        const thElem = document.createElement('th');
                        if (testObj.borderRight) {
                            $(thElem).attr('style', 'border-right: 1px solid ' + testObj.backgroundColor + '; width: 1px;');
                        }
                        else {
                            $(thElem).attr('style', 'width: 1px;');
                        }
                        $(trElem).append(thElem);
                    }
                }

                $(theadElem).append(trElem);
            }
        }
        $(tableElem).append(theadElem);

        const tbodyElem = document.createElement('tbody');

        let roamingRestrictions = false;
        let hasGreenCheck = false;
        let hasRedX = false;
        let hasRedQuestion = false;


        for(const ccObj of carriersInCountry) {
            const trElem = document.createElement('tr');
            {
                const tdElem = document.createElement('td');
                $(tdElem).text(ccObj.carrier);
                $(trElem).append(tdElem);
            }

            const sunset2G = datastore.dateParse(ccObj.sunset2G);
            const sunset3G = datastore.dateParse(ccObj.sunset3G);

            for(const testObj of bandFit.tests[test].tests) {
                if (ccObj[simObj.simPlanKey].roamingRestrictions) {
                    roamingRestrictions = true;
                }
    
                for(const b of testObj.bands) {
                    const modemSupportsBand = testObj.modemObj.bands.includes(b);
                    const carrierSupportsBand = ccObj.bands.find(b1 => b1 == b);
                    const bandEnabled = !testObj.modemObj.bandsEnabled || testObj.modemObj.bandsEnabled.includes(b);

                    let value = '';
                    let footnote;
        
                    if (carrierSupportsBand) {
                        if (modemSupportsBand) {
                            if (!bandEnabled) {
                                value = '\u2753';
                                hasRedQuestion = true;

                                const msg = 'Cellular modem supports band but it is disabled in software';   
                                footnote = addFootnote(msg); 
                            }                    
                            else {
                                value = '\u2705'; // green check
                                hasGreenCheck = true;
                                testObj.counts.greenCheck++;
    
                                if (b.startsWith("2G") && sunset2G.year) {
                                    let msg;
                                    if (sunset2G.year < 2024) {
                                        msg = '2G sunset originally planned for ' + sunset2G.s + ' but may not been delayed';
                                    }
                                    else {
                                        msg = '2G sunset expected ' + sunset2G.s;
                                    }
                                    footnote = addFootnote(msg); 
                                }
                                if (b.startsWith("3G") && sunset3G.year) {
                                    let msg;
                                    if (sunset3G.year < 2024) {
                                        msg = '3G sunset originally planned for ' + sunset3G.s + ' but may not been delayed';
                                    }
                                    else {
                                        msg = '3G sunset expected ' + sunset3G.s;
                                    }
                                    footnote = addFootnote(msg); 
                                }    
                            }

                        }
                        else {
                            value = '\u274C'; // red x
                            testObj.counts.redX++;
                            hasRedX = true;
                        }
                    }

                    const tdElem = document.createElement('td');
                    $(tdElem).css('text-align', 'center')
                    $(tdElem).text(value);

                    if (footnote) {
                        const supElem = document.createElement('sup');
                        $(supElem).text(footnote);
                        $(tdElem).append(supElem);
                    }
                    $(trElem).append(tdElem);
                }

                {
                    const thElem = document.createElement('td');
                    if (testObj.borderRight) {
                        $(thElem).attr('style', 'border-right: 1px solid ' + testObj.backgroundColor + '; width: 1px;');
                    }
                    else {
                        $(thElem).attr('style', 'width: 1px;');
                    }
                    $(trElem).append(thElem);
                }
            }

            $(tbodyElem).append(trElem);
        }               


        $(tableElem).append(tbodyElem);

        $(tableDiv).append(tableElem);
        $(bandFit.bandFitResultsElem).append(tableDiv);


        const ulElem = document.createElement('ul');

        if (hasGreenCheck) {
            const liElem = document.createElement('li');
            $(liElem).text('\u2705 Band is supported by carrier and cellular modem.');
            $(ulElem).append(liElem);
        }

        if (hasRedX) {
            const liElem = document.createElement('li');
            $(liElem).text('\u274C Band is used by the carrier but not supported by the cellular modem.');
            $(ulElem).append(liElem);
        }
        if (hasRedQuestion) {
            const liElem = document.createElement('li');
            $(liElem).text('\u2753 Cannot be used at this time, see footnote.');
            $(ulElem).append(liElem);
        }

        if (footnotes) {
            for(let ii = 0; ii < footnotes.length; ii++) {
                const liElem = document.createElement('li');

                const supElem = document.createElement('sup');
                $(supElem).text((ii + 1).toString());
                $(liElem).append(supElem);

                const textElem = document.createTextNode(footnotes[ii]);
                $(liElem).append(textElem);

                $(ulElem).append(liElem);
            }
        }
        if (roamingRestrictions) {
            const liElem = document.createElement('li');
            $(liElem).text('Permanent roaming restrictions may apply in this country.');
            $(ulElem).append(liElem);
        }
        if ($(tableElem).width() > 900) {
            const liElem = document.createElement('li');
            $(liElem).text('Scroll horizontally to see all columns');
            $(ulElem).append(liElem);
        }

        $(bandFit.bandFitResultsElem).append(ulElem);

        // Summary table
        {
            const tableElem = document.createElement('table');
            $(tableElem).addClass('apiHelperTableNoMargin')

            const tbodyElem = document.createElement('tbody');

            for(const testObj of bandFit.tests[test].tests) {
                const cmsObj = datastore.data.countryModemSim.find(e => e.country == country && e.modem == testObj.modemObj.model && e.sim == bandFit.tests[test].sim);
    
                const trElem = document.createElement('tr');

                let tdElem = document.createElement('td');
                
                const divElem = document.createElement('div');
                $(divElem).attr('style', 'display:inline; color:' + bandFit.headerTextColor + '; background-color:' + testObj.backgroundColor + '; padding-left: 3px; padding-right: 3px; margin-right:5px;');
                $(divElem).text(testObj.title);
                $(tdElem).append(divElem);
    
                if (testObj.moreTitles) {
                    for(const title of testObj.moreTitles) {
                        const divElem = document.createElement('div');
                        $(divElem).attr('style', 'display:inline; color:' + bandFit.headerTextColor + '; background-color:' + testObj.backgroundColor + '; padding-left: 3px; padding-right: 3px; margin-right:5px;');
                        $(divElem).text(title);
                        $(tdElem).append(divElem);        
                    }
                }
                $(trElem).append(tdElem);
                
                let icon = '';
                let text = '';
                if (cmsObj && cmsObj.recommendation == 'YES') {
                    icon = '\u2705';
                    text += 'Recommended and supported in ' + country;
                }
                else {
                    let total = testObj.counts.greenCheck + testObj.counts.redX;
                    if (total > 0) {
                        let pct = Math.floor(testObj.counts.greenCheck * 100 / total);
                        if (pct > 70) {
                            // text += 'Beta test countries to be determined. Not officially supported at this time, but likely to work.';
                            text += 'Not officially supported at this time, but likely to work.';
                        }
                        else
                        if (pct > 30) {
                            text += 'Not officially supported, but may work in some locations.';
                        }
                        else
                        if (pct > 0) {
                            icon = '\u274C';
                            text += 'Unlikely to work reliably; poor band fit.';
                        }
                        else {
                            icon = '\u274C';
                            text += 'Will not work, no available bands.';
                        }
                    }
                    else {
                        icon = '\u274C';
                        text += 'Will not work, no available bands.';
                    }
                }

                tdElem = document.createElement('td');
                $(tdElem).css('font-size', '14px');
                $(tdElem).text(icon);
                $(trElem).append(tdElem);

                tdElem = document.createElement('td');
                $(tdElem).css('font-size', '14px');
                $(tdElem).text(text);
                $(trElem).append(tdElem);

                $(tbodyElem).append(trElem);
            }
    
    

            $(tableElem).append(tbodyElem);
            $(bandFit.bandFitResultsElem).append(tableElem);
        }

    }


}

bandFit.selectRegion = function() {
    const region = $(bandFit.bandFitRegionSelectElem).val();
    if (region != `country`) {
        $(bandFit.bandFitSpecificCountryElem).val('');
    }

    const specificCountry = (region == 'country') ? $(bandFit.bandFitSpecificCountryElem).val() : null;

    bandFit.saveQuery();

    $(bandFit.bandFitResultsElem).empty();

    let countries = [];

    if (specificCountry) {
        countries.push(specificCountry);
        bandFit.renderCountries(countries);
    }
    else
    if (region == 'alphabetical') {
        for(const ccObj of datastore.data.countryCarrier) {
            if (!ccObj.supersim) {
                continue;
            }

            if (!countries.includes(ccObj.country)) {
                countries.push(ccObj.country);
            }
        }
        bandFit.renderCountries(countries);
    }
    else {
        let regions = [];

        if (region == 'byRegion') {
            regions = bandFit.regions;
        }
        else {
            regions = [bandFit.regions.find(e => e.name == region)];
        }

        for(const regionObj of regions) {
            countries = [];

            for(const ccObj of datastore.data.countryCarrier) {
                const countryObj = datastore.data.countries.find(e => e.name == ccObj.country);
                
                let inRegion = false;
                for(const r1 of countryObj.regions) {
                    if (regionObj.regions.includes(r1)) {
                        inRegion = true;
                        break;
                    }
                }
                if (!inRegion) {
                    continue;
                }
                if (!ccObj.supersim) {
                    continue;
                }
    
                if (!countries.includes(ccObj.country)) {
                    countries.push(ccObj.country);
                }
            }   

            {
                const headerElem = document.createElement('h2');
                $(headerElem).text(regionObj.name);

                $(bandFit.bandFitResultsElem).append(headerElem);
            }


            bandFit.renderCountries(countries);
        }     
    }

    
}

bandFit.onCountrySelected = function() {
    $(bandFit.bandFitRegionSelectElem).val('country');
    bandFit.selectRegion();
    bandFit.saveQuery();
}

bandFit.updateTestMenu = function() {
    for(const testKey in bandFit.tests) {
        const testObj = bandFit.tests[testKey];
        
        if (testObj.showInternalUsers) {
            if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                continue;
            }            
        }

        const optionElem = document.createElement('option');
        $(optionElem).text(testObj.title);
        $(optionElem).attr('value', testKey);
        $(bandFit.bandFitTestSelectElem).append(optionElem);
    }

}

bandFit.init = function(callback) {

    $('#carrierTabBandFit').show();

    // byRegion, alphabetical
    bandFit.bandFitTestSelectElem = $('#bandFitTestSelect');
    bandFit.bandFitTestSelectElem.on('change', bandFit.selectRegion);

    bandFit.bandFitRegionSelectElem = $('#bandFitRegionSelect');
    bandFit.bandFitResultsElem = $('#bandFitResults');
    bandFit.bandFitSpecificCountryElem = $('#bandFitSpecificCountry');


    bandFit.tests = {
        'msom': {
            title: 'M-Series (M404 vs. M524 vs. M635e)',
            sim: 4, // EtherSIM
            tests: [
                {
                    title: 'M404',
                    modemObj: datastore.data.modems.find(e => e.model == 'BG95-M5'),
                    borderRight: true,
                    backgroundColor: '#AFE4EE', // COLOR_Sky_600        
                },
                {
                    title: 'M524',
                    modemObj: datastore.data.modems.find(e => e.model == 'EG91-EX'),
                    borderRight: true,
                    backgroundColor: '#89E2B3', // COLOR_Mint_600
                },
                {
                    title: 'M635e',
                    modemObj: datastore.data.modems.find(e => e.model == 'BG95-S5'),
                    borderRight: true,
                    backgroundColor: '#FF9F61', // @COLOR_Tangerine_400
                },
            ],
        },
        'b-series': {
            title: 'B-Series (B504 vs. B404X vs. B524)',
            sim: 4, // EtherSIM
            tests: [
                {
                    title: 'B504',
                    modemObj: datastore.data.modems.find(e => e.model == 'EG91-NAX'),
                    borderRight: true,
                    backgroundColor: '#FF9F61', // @COLOR_Tangerine_400
                },
                {
                    title: 'B404X',
                    modemObj: datastore.data.modems.find(e => e.model == 'R510'),
                    borderRight: true,
                    backgroundColor: '#AFE4EE', // COLOR_Sky_600        
                },
                {
                    title: 'B524',
                    modemObj: datastore.data.modems.find(e => e.model == 'EG91-E'),
                    borderRight: false,
                    backgroundColor: '#89E2B3', // COLOR_Mint_600
                },
            ],
        },
        /*
        'electron-2': {
            title: 'Electron 2 (ELC504EM vs. ELC524EM)',
            showInternalUsers: true,
            sim: 4, // EtherSIM
            tests: [
                {
                    title: 'ELC504EM',
                    modemObj: datastore.data.modems.find(e => e.model == 'EG800Q-NA'),
                    borderRight: true,
                    backgroundColor: '#AFE4EE', // COLOR_Sky_600        
                },
                {
                    title: 'ELC524EM',
                    modemObj: datastore.data.modems.find(e => e.model == 'EG800Q-EU'),
                    borderRight: false,
                    backgroundColor: '#89E2B3', // COLOR_Mint_600
                },
            ],
        },
        'electron-2-b524': {
            title: 'Electron 2 (ELC524EM) vs. B-SoM (B524)',
            showInternalUsers: true,
            sim: 4, // EtherSIM
            tests: [
                {
                    title: 'ELC524EM',
                    modemObj: datastore.data.modems.find(e => e.model == 'EG800Q-EU'),
                    borderRight: true,
                    backgroundColor: '#AFE4EE', // COLOR_Sky_600        
                },
                {
                    title: 'B524',
                    modemObj: datastore.data.modems.find(e => e.model == 'EG91-E'),
                    borderRight: false,
                    backgroundColor: '#89E2B3', // COLOR_Mint_600
                },
            ],
        },
        */
        'tracker': {
            title: 'Tracker One, Monitor One, Tracker SoM (ONE404 vs. ONE524)',
            sim: 4, // EtherSIM
            tests: [
                {
                    title: 'ONE404',
                    moreTitles: ['MON404', 'T404'],
                    modemObj: datastore.data.modems.find(e => e.model == 'BG96-MC'),
                    borderRight: true,
                    backgroundColor: '#AFE4EE', // COLOR_Sky_600        
                },
                {
                    title: 'ONE524',
                    moreTitles: ['MON524', 'T524'],
                    modemObj: datastore.data.modems.find(e => e.model == 'EG91-EX'),
                    borderRight: false,
                    backgroundColor: '#89E2B3', // COLOR_Mint_600
                },
            ],
        },       
        'tachyon': {
            title: 'Tachyon (TACH8NA vs. TACH8ROW)',
            sim: 5, // KDDI
            tests: [
                {
                    title: 'TACH8NA',
                    modemObj: datastore.data.modems.find(e => e.model == 'SG560D-NA'),
                    borderRight: true,
                    backgroundColor: '#AFE4EE', // COLOR_Sky_600        
                },
                {
                    title: 'TACH8ROW',
                    modemObj: datastore.data.modems.find(e => e.model == 'SG560D-EM'),
                    borderRight: false,
                    backgroundColor: '#89E2B3', // COLOR_Mint_600
                },
            ],        
        } 
    };

    bandFit.updateTestMenu();


    bandFit.regions = datastore.data.regionGroups.find(e => e.id == 'region6').regions;
    for(const r of bandFit.regions) {
        const optionElem = document.createElement('option');
        $(optionElem).attr('value', r.name);
        $(optionElem).text('Only ' + r.name + ' region');

        $(bandFit.bandFitRegionSelectElem).append(optionElem);
    }
    $(bandFit.bandFitRegionSelectElem).on('change', bandFit.selectRegion);
    
    bandFit.headerTextColor = '#01466C'; // COLOR_Midnight_400

    bandFit.selectRegion();

    bandFit.countrySel = dataui.countrySelector({
        textFieldId:'bandFitSpecificCountry',
        popupClass: 'countryPopup',
        resultDiv:'bandFitSpecificCountryDiv',        
    }).init();
    bandFit.countrySel.onCountrySelected = bandFit.onCountrySelected;


    callback();
}

//
// Initialization
//
const carrierSelectTabs = {
    'ByDevice':carriers2, 
    'ModelMap':familyMapCreate(), 
    'CountryDetails':countryDetails,
    'BandFit':bandFit,
};

function carrierSelectTab(which) {
    $('div.countryPopup').css('visibility', 'hidden');

    if (which == 'Msom') {
        // Backward compatibility
        which = 'BandFit';
    }

    Object.keys(carrierSelectTabs).forEach(function(tab) {
        if (which == tab) {
            $('#carrierTab' + tab).addClass('active');
            $('#carrier' + tab + 'Div').show();
        }
        else {
            $('#carrierTab' + tab).removeClass('active');
            $('#carrier' + tab + 'Div').hide();
        }
    });
    if (typeof carrierSelectTabs[which].selectTab == 'function') {
        carrierSelectTabs[which].selectTab();
    }
    carrierSelectTabs[which].saveQuery();
}

function carrierLoadQuery(urlParams) {

    const tab = urlParams.get('tab');
    if (tab) {
        carrierSelectTab(tab);
        
        carrierSelectTabs[tab].fromQuery(urlParams);
    }
    else {
        carrierSelectTab('ByDevice');
    }

}



$(document).ready(async function() {
    Object.keys(carrierSelectTabs).forEach(function(tab) {
        $('#carrierTab' + tab).on('click touchend', function(ev) {
            carrierSelectTab(tab);
            ev.stopPropagation();
            ev.preventDefault();
        });
    });

    const countryPopupElem = document.createElement('div');
    $(countryPopupElem).addClass('countryPopup');
    $('body').append(countryPopupElem);

    const showBandFit = true;

    // Remember the search parameters before they are replaced
    const urlParams = new URLSearchParams(window.location.search);

    await datastore.init();

    if ($('#carrierTabs').length) {
        // Full carriers page
        dataui.populateRegionSelectors();

        carriers2.init({
            deviceList: $('#deviceList'),
            regionList:'regionList',
            regionGroup:'region6',
            table:'countryCarrierTable'
        },
        function() {    
            $('.byDeviceShowUnsupported,.byDeviceShowNTN').on('click', function() {
                carriers2.saveQuery();
                carriers2.update();
            });

            carrierSelectTabs.ModelMap.init({
                mapDiv:$('.familyMapDiv'),
                familySelect:$('#familyMapSelect'),
                skusDiv:$('#familyMapSkusDiv')
            },
            function() {
                countryDetails.init({
                    deviceList: $('#countryDetailDeviceList'),
                    countryField:'countryDetailText',
                    popupClass:'countryPopup',
                    resultDiv:'countryDetailsResultsDiv',
                    footnotesDiv:'countryDetailsFootnotesDiv'
                },
                function() {                            
                    if (showBandFit) {
                        bandFit.init(function() {
                            carrierLoadQuery(urlParams);
                        });    
                    }
                    else {
                        carrierLoadQuery(urlParams);
                    }
                });
            });   

    
        });   

    }
    else {
        // For now, the only special case is family map
        $('.carrierFamilyMap').each(function() {
            const thisElem = $(this);

            carriers2.familyMap = familyMapCreate();

            carriers2.familyMap.init({
                mapDiv:$(thisElem).find('.familyMapDiv'),
                skusDiv:$(thisElem).find('.familyMapSkusDiv'),
                family:$(thisElem).data('family'),
                noHistory: true,
            }, function() {

            });    
        });
    }
});
