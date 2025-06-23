
let carriers2 = {};
let bandFit = {};

//
// By Device
//
carriers2.fromQuery = function(urlParams) {
    const device = urlParams.get('device');
    if (device) {
        const deviceVal = $('#' + carriers2.options.deviceList + ' option').filter(function () { return $(this).html() === device; }).prop('value');

        $('#' + carriers2.options.deviceList).val(deviceVal);
    }

    const region = urlParams.get('region');
    if (region) {
        const regionVal = $('#' + carriers2.options.regionList + ' option').filter(function () { return $(this).html() === region; }).prop('value');
        $('#' + carriers2.options.regionList).val(regionVal);
    }

    carriers2.selectMenu();
};

carriers2.saveQuery = function() {
    const deviceVal = $('#' + carriers2.options.deviceList).val();
    const device = $('#' + carriers2.options.deviceList + ' option').filter(function () { return $(this).prop('value') === deviceVal; }).html();

    const regionVal = $('#' + carriers2.options.regionList).val();
    const region = $('#' + carriers2.options.regionList + ' option').filter(function () { return $(this).prop('value') === regionVal; }).html();

    history.pushState(null, '', '?tab=ByDevice&device=' + encodeURIComponent(device) + '&region=' + encodeURIComponent(region));
};

carriers2.buildMenu = function() {

    {
        // Device Popup
        let html = '';
        datastore.data.skuFamily.forEach(function(obj, index1) {
            if (obj.wifi || obj.cellular === false || !obj.group) {
                return;
            }
            if (obj.showInternalUsers) {
                if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                    return;
                }            
            }
    
            html += '<optgroup label="' + obj.name + '">';

            obj.group.forEach(function(obj2, index2) {
                if (obj2.showInternalUsers) {
                    if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                        return;
                    }            
                }
                const value = index1 + ',' + index2;
                html += '<option value="' + value + '">' + obj2.name + '</option>';
            });

            html += '</optgroup>';
        }); 
        $('#' + carriers2.options.deviceList).html(html);
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

    const values = $('#' + carriers2.options.deviceList).val().split(',');
    const skuFamilyObj = datastore.data.skuFamily[parseInt(values[0])].group[parseInt(values[1])];

    const countryCarrierKey = datastore.findSimPlanById(skuFamilyObj.simPlan).countryCarrierKey;

    const technologies = datastore.findModemByModel(skuFamilyObj.modem).technologies;

    const regionGroup = datastore.findRegionGroupById(carriers2.options.regionGroup);
    let regions;
    const regionIndex = parseInt($('#' + carriers2.options.regionList).val());
    if (regionIndex >= 0) {
        regions = regionGroup.regions[regionIndex].regions;
    }

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

    datastore.data.countryCarrier.forEach(function(ccObj) {

        if (!ccObj[countryCarrierKey] || ccObj[countryCarrierKey].prohibited) {
            return;
        }
        const cmsObj = datastore.findCountryModemSim(ccObj.country, skuFamilyObj.modem, skuFamilyObj.sim);
        if (!cmsObj || cmsObj.recommendation == 'NR' || cmsObj.recommendation == 'POSS' ||  cmsObj.recommendation == 'NS') {
            return;
        }

        if (regions && !datastore.countryInRegionArray(ccObj.country, regions)) {
            return;
        }

        if (ccObj[countryCarrierKey].rank == 'Secondary' || ccObj[countryCarrierKey].rank == 'Backup') {
            countryHasSecondaryOrBackup[ccObj.country] = true;
        }

        if (ccObj.country == 'United States' && ccObj.carrier == 'Verizon') {
            // Skip on E404 and ELC404
            if (skuFamilyObj.short.includes('E404') || skuFamilyObj.short.includes('ELC404')) {
                return;
            }
        }

        countryCarrierFiltered.push(ccObj);
    });

    let warnRoaming = false;
    let warnVerizon = false;
    let warnSunset = false;

    countryCarrierFiltered.forEach(function(ccObj) {
        let html = '';

        html += '<tr><td>' + ccObj.country + '</td><td>' + ccObj.carrier;
        
        if (countryHasSecondaryOrBackup[ccObj.country]) {
            if (ccObj[countryCarrierKey].rank == 'Secondary') {
                html += '<sup>2</sup>';
            }
            else if (ccObj[countryCarrierKey].rank == 'Backup') {
                html += '<sup>3</sup>';
            }

        }
        
        html += '</td>';        

        let allow = false;
        technologies.forEach(function(tech) {
            let cell = '&nbsp;';

            if (ccObj[countryCarrierKey]['allow' + tech]) {
                allow = true;

                const allowValue = ccObj[countryCarrierKey]['allow' + tech];

                if (allowValue == 5) {
                    // T-Mobile  warning
                    cell = '<sup>' + allowValue + '</sup>'; 
                    warnTMobile = true;
                }
                else
                if (allowValue == 7) {
                    // Verizon warning
                    cell = '<sup>' + allowValue + '</sup>'; 
                    warnVerizon = true;
                }
                else
                if (!ccObj[countryCarrierKey].roamingRestrictions) {
                    cell = '&check;'; 
                }
                else {
                    cell = '<sup>6</sup>'; 
                    warnRoaming = true;
                }
            }
            html += '<td>' + cell + '</td>';
        });

        if (technologies.includes("2G")) {
            const sunset2G = datastore.dateParse(ccObj.sunset2G);

            if (sunset2G.year && ccObj[countryCarrierKey]['allow2G']) {
                html += '<td>' + sunset2G.s + '</td>';
                warnSunset = true;
            }    
            else {
                html += '<td>&nbsp;</td>';
            }
        }
        if (technologies.includes("3G")) {
            const sunset3G = datastore.dateParse(ccObj.sunset3G);

            if (sunset3G.year && ccObj[countryCarrierKey]['allow3G']) {
                html += '<td>' + sunset3G.s + '</td>';
                warnSunset = true;
            }    
            else {
                html += '<td>&nbsp;</td>';
            }
        }

        if (!allow) {
            return;
        }

        html += '</tr>';

        $('#' + carriers2.options.table + ' > tbody').append(html);

    });

    if (skuFamilyObj.short.includes('M404')) {
        $('#byDeviceM404Warning').show();
    }
    else {
        $('#byDeviceM404Warning').hide();
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

    $('#' + carriers2.options.deviceList).on('change', carriers2.selectMenu);
    $('#' + carriers2.options.regionList).on('change', carriers2.selectMenu);

    carriers2.selectMenu();

    callback();
};


// 
// Find Device
//

let rec2 = {};

rec2.fromQuery = function(urlParams) {
    const showCarriers = urlParams.get('showCarriers') == 'true';
    $('#' + rec2.options.idBase+ 'ShowCarriers').prop('checked', showCarriers);

    const showNRND = urlParams.get('showNRND') == 'true';
    $('#' + rec2.options.idBase+ 'ShowNRND').prop('checked', showNRND);

    rec2.regionSel.fromQuery(urlParams);
};

rec2.saveQuery = function() {
    if (rec2.regionSel) {
        const showCarriers = $('#' + rec2.options.idBase+ 'ShowCarriers').prop('checked');

        const showNRND = $('#' + rec2.options.idBase+ 'ShowNRND').prop('checked');
        
        history.pushState(null, '', '?tab=FindDevice' +
            '&showCarriers=' + (showCarriers ? 'true' : 'false') + 
            '&showNRND=' + (showNRND ? 'true' : 'false') + 
            '&' + rec2.regionSel.getQuery()
        );
    }
};



rec2.selectMenu = function() {

    if (!rec2.regionSel) {
        return;
    }
    
    const showCarriers = $('#' + rec2.options.idBase+ 'ShowCarriers').prop('checked');

    const showNRND = $('#' + rec2.options.idBase+ 'ShowNRND').prop('checked');

    const etherSimId = 4;

    const etherSimObj = datastore.findSimById(etherSimId);

    rec2.saveQuery();

    $('#recDiv').html('');

    let recs = {};

    
    rec2.regionSel.countryList.forEach(function(countryObj) {
        datastore.data.countryModemSim.forEach(function(cmsObj) {

            if (cmsObj.country != countryObj.name) {
                return;
            }

            let recsGroup;

            if (cmsObj.sim == etherSimId) {
                // EtherSIM, keep track of all recommendation levels including POSS and NR for use later
                recsGroup = cmsObj.recommendation;
            }
            else {
                // Not EtherSIM
                switch(cmsObj.recommendation) {
                    case 'YES':
                    case 'NRND':
                        recsGroup = 'NRND';
                        break;

                    default: 
                        recsGroup = 'NR';
                        break;
                }
            }
            if (!recsGroup) {
                return;
            }

            if (!recs[recsGroup]) {
                recs[recsGroup] = {};
            }
            if (!recs[recsGroup].skuFamily) {
                recs[recsGroup].skuFamily = {};
            }

            datastore.data.skuFamily.forEach(function(skuFamilyObj) {
                // skuFamilyObj.family = 'tracker', 'b series', ...
                let skusForModemSimFamily = [];

                if (skuFamilyObj.wifi || skuFamilyObj.cellular === false) {
                    return;
                }
                if (skuFamilyObj.showInternalUsers) {
                    if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                        return;
                    }            
                }
    
                datastore.data.skus.forEach(function(skuObj) {
                    if (skuObj.family == skuFamilyObj.family && 
                        skuObj.modem == cmsObj.modem &&
                        skuObj.sim == cmsObj.sim &&
                        skuObj.lifecycle != 'Discontinued' &&
                        skuObj.lifecycle != 'Hidden') {
                        skusForModemSimFamily.push(skuObj);
                    }
                });

                if (skusForModemSimFamily.length == 0) {
                    return;
                }

                // Yes
                if (!recs[recsGroup].skuFamily[skuFamilyObj.family]) {
                    recs[recsGroup].skuFamily[skuFamilyObj.family] = [];
                }

                let modemSimObj;
                recs[recsGroup].skuFamily[skuFamilyObj.family].some(function(obj) {
                    if (obj.modem == cmsObj.modem && obj.sim == cmsObj.sim) {
                        modemSimObj = obj;
                        return true;
                    }
                    else {
                        return false;
                    }
                });

                if (!modemSimObj) {
                    modemSimObj = JSON.parse(JSON.stringify(cmsObj));
                    delete modemSimObj.country;
                    modemSimObj.countries = [];
                    recs[recsGroup].skuFamily[skuFamilyObj.family].push(modemSimObj);

                    modemSimObj.skus = skusForModemSimFamily;
                }

                modemSimObj.countries.push(countryObj.name);
            });
        

        });
    });


    let html = '';
    let carrierOptions = {};


    const generateCountryListReason = function(labelStr, modemSimObj) {

        html += '<p>' + labelStr + ': ' + modemSimObj.countries.join(', ') + '<br/>';

        if (modemSimObj.reason) {
            html += 'Reason: ' + modemSimObj.reason + '<br/>';
        }
        html += '</p>';
    };

    const generateCarrierTable = function(modemSimObj) {
        // Table: Country, Carrier, Technologies
        html += '<table>';

        const modemObj = datastore.findModemByModel(modemSimObj.modem);

        html += '<tr><th>Country</th><th>Carrier</th>';
        modemObj.technologies.forEach(function(tech) {
            html += '<th>' + tech + '</th>';
        });
        html += '</tr>';

        let lastCountry;
        let countryCount = 0;
        
        datastore.data.countryCarrier.forEach(function(ccObj) {
            if (!modemSimObj.countries.includes(ccObj.country)) {
                return;
            }
            if (!ccObj[etherSimObj.simPlanKey]) {
                return;
            }

            if (!modemObj.technologies.some(function(tech) {
                return !!ccObj[etherSimObj.simPlanKey]['allow' + tech];
            })) {
                return;
            }
    
            let rowClass = '';

            if (lastCountry != ccObj.country) {
                lastCountry = ccObj.country;
                countryCount++;
            }
            if ((countryCount % 2) == 0) {
                rowClass += 'bandListStripe ';
            }

            html += '<tr class="' + rowClass + '"><td>' + ccObj.country + '</td><td>' + ccObj.carrier + '</td>';

            modemObj.technologies.forEach(function(tech) {
                const allow = ccObj[etherSimObj.simPlanKey]['allow' + tech];
                html += '<td class="technologyCell">' + (!!allow ? '\u2705' : '&nbsp;');
                if (allow == 7) {
                    html += '<sup>7</sup>';
                    carrierOptions.showFootnote7 = true;
                }
                html += '</td>'; // Green Check
            });

                
            html += '</tr>';
        });

        html += '</table>';
    
    };

    const generateFootnotes = function() {
        if (carrierOptions.showFootnote7) {
            html += '<p style="font-size: small;"><sup>7</sup>Verizon in the United States is only supported on enterprise plans.</p>';             
        }

    };

    const generateSimpleSkuTables = function(labelStr, modemSimArray, showCarriers) {

        let op

        modemSimArray.forEach(function(modemSimObj, index) {
            generateCountryListReason(labelStr, modemSimObj);

            html += dataui.generateSkuTable(modemSimObj.skus, {});

            if (showCarriers) {
                generateCarrierTable(modemSimObj);

                generateFootnotes();
            }
        });


    }


    const generateSideBySideSkuTables = function(labelStr, modemSimArray, showCarriers, isRegion) {


        let countriesAdded = [];
        modemSimArray.forEach(function(modemSimObj, index) {
            countriesAdded = countriesAdded.concat(modemSimObj.countries);
        });
        let countriesMissing = [];
        rec2.regionSel.countryList.forEach(function(countryObj) {
            if (!countriesAdded.includes(countryObj.name)) {
                countriesMissing.push(countryObj.name);
            }
        });

        html += '<div class="sideBySide">';
        modemSimArray.forEach(function(modemSimObj, index) {
            html += '<div class="sideBySide' + index + '">';

            generateCountryListReason(labelStr, modemSimObj);

            html += '</div>'; // child flex container
        });
        if (modemSimArray.length == 1 && countriesMissing.length > 0 && !isRegion) {
            html += '<div class="sideBySide1"><p>Not recommended in: ' + countriesMissing.join(', ') + '</p></div>';
        }

        html += '</div>'; // flex container close

        //
        html += '<div class="sideBySide">';
        modemSimArray.forEach(function(modemSimObj, index) {
            html += '<div class="sideBySide' + index + '">';

            html += dataui.generateSkuTable(modemSimObj.skus, {});

            html += '</div>'; // child flex container
        });
        html += '</div>'; // flex container close

        //
        if (showCarriers) {
            html += '<div class="sideBySide">';
            modemSimArray.forEach(function(modemSimObj, index) {
                html += '<div class="sideBySide' + index + '">';
    
                generateCarrierTable(modemSimObj);
    
                html += '</div>'; // child flex container
            });
            html += '</div>'; // flex container close    
        }
        generateFootnotes();

        if (modemSimArray.length == 2 && countriesMissing.length > 0) {
            html += '<p>Not recommended in: ' + countriesMissing.join(', ') + '</p>';
        }
    };

    html += '<h2>Recommended Devices</h2>';


    datastore.data.skuFamily.forEach(function(skuFamilyObj) {
        if (skuFamilyObj.wifi || skuFamilyObj.cellular == false) {
            return;
        }
        if (skuFamilyObj.showInternalUsers) {
            if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                return;
            }            
        }

        if (!recs.YES || !recs.YES.skuFamily[skuFamilyObj.family]) {
            return;
        }
        html += '<h3>' + skuFamilyObj.name + '</h3>';

        const isRegion = $('#' + rec2.options.idBase+ 'RegionRadio').prop('checked');

        generateSideBySideSkuTables('For use in', recs.YES.skuFamily[skuFamilyObj.family], showCarriers, isRegion);

    });



    if (showNRND) {
        html += '<h2>Not recommended for new designs (NRND)</h2>';

        datastore.data.skuFamily.forEach(function(skuFamilyObj) {
            if (skuFamilyObj.wifi || skuFamilyObj.cellular == false) {
                return;
            }
            if (skuFamilyObj.showInternalUsers) {
                if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                    return;
                }            
            }
            if (!recs.NRND || !recs.NRND.skuFamily[skuFamilyObj.family]) {
                return;
            }
            html += '<h3>' + skuFamilyObj.name + ' (NRND SKUs)</h3>';
    
            generateSimpleSkuTables('NRND SKUs in', recs.NRND.skuFamily[skuFamilyObj.family]);
        });    
    }

    /*
    html += '<h2>Not recommended</h2>';

    datastore.data.skuFamily.forEach(function(skuFamilyObj) {
        if (skuFamilyObj.wifi || skuFamilyObj.cellular == false) {
            return;
        }
        if (!recs.NR || !recs.NR.skuFamily[skuFamilyObj.family]) {
            return;
        }
        if (skuFamilyObj.showInternalUsers) {
            if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                return;
            }            
        }

        html += '<h3>' + skuFamilyObj.name + ' (Not recommended SKUs)</h3>';

        generateSkuTables('Not recommended EtherSIM SKUs in', recs.NR.skuFamily[skuFamilyObj.family], false);

    });
    */

    $('#recDiv').html(html);

}

rec2.init = function(options, callback) {
    // options: 
    // idBase 
    // regionGroup - regionGroup to display
    // resultDiv - ID for results div
    rec2.options = options;

    dataui.populateRegionSelectors();

    rec2.regionSel = {};
    dataui.setupRegionCountrySelector(rec2.regionSel, rec2.options.idBase, rec2.selectMenu);

    $('#' + rec2.options.idBase + 'ShowCarriers').on('change', rec2.selectMenu);
    $('#' + rec2.options.idBase + 'ShowNRND').on('change', rec2.selectMenu);

    callback();
};





//
// Family Map
//
const mapsApiKey = 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY';
 
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

    familyMap.drawMap = function() {
        let family;

        if (familyMap.options.familySelect) {
            family = $(familyMap.options.familySelect).val();
        }
        else {
            family = familyMap.options.family;
        }

        // This is causing the family map to always get selected
        /*
        if (!familyMap.options.noHistory) {
            familyMap.saveQuery();
        }
        */

        const skuFamilyObj = datastore.findSkuFamily(family);

        let models = [];
        skuFamilyObj.group.forEach(function(obj) {
            if (obj.lifecycle == 'GA' || obj.lifecycle == 'In development' || obj.lifecycle == 'Sampling') {
                models.push(obj);
            }
        });

        let countryModelArray = [['Country', 'Model']];

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
                            foundModel = modelIndex;
                        }
                    }
                });
            });    
            if (foundModel != undefined) {
                countryModelArray.push([countryObj.isoCode, foundModel]);
            }
        });

        var data = google.visualization.arrayToDataTable(countryModelArray);

        // Light fuscia 'FF8CE1' replaces teal (86E2D5)
        // Light pink 'FFB8D3' replaces cyan (00AEEF)
        var options = {
            colorAxis: {colors: ['86E2D5', '00AEEF']}, // teal to cyan
            legend: 'none',
            tooltip: {trigger: 'none'}
        };


        var chart = new google.visualization.GeoChart(familyMap.options.mapDiv[0]);

        chart.draw(data, options);

        // 
        {
            let html = '<div><table><thead><tr><th></th><th>SKU</th><th>Description</th><th>Lifecycle</th></tr></thead><tbody>';

            models.forEach(function(skuFamilyObj, modelIndex) {
                let mapColor = modelIndex;
                if (typeof skuFamilyObj['mapColor'] != 'undefined') {
                    mapColor = skuFamilyObj.mapColor;
                }
                const style = 'background-color:#' + options.colorAxis.colors[mapColor];
                if (!options.colorAxis.colors[mapColor]) {
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

    familyMap.drawMapCat1Expansion = function() {
        let countryDataArray = [['Country', 'Coverage']];

        const labelValues = ['Original Coverage', 'Expanded Coverage'];

        datastore.data.countries.forEach(function(countryObj) {

            let foundValue = 0;

            datastore.data.countryModemSim.forEach(function(cmsObj) {
                if (countryObj.name != cmsObj.country || cmsObj.recommendation != 'YES') {
                    return;
                }
                if (!cmsObj.modem.startsWith('EG91-E') || cmsObj.sim != 4) {
                    return;
                }

                if (cmsObj.expansion) {
                    foundValue = 2;
                }
                else {
                    if (foundValue == 0) {
                        foundValue = 1;
                    }
                }
            });    

            if (foundValue) {
                countryDataArray.push([countryObj.isoCode, foundValue]);
            }
        });

        var data = google.visualization.arrayToDataTable(countryDataArray);

        var options = {
            colorAxis: {colors: ['AFE4EE', '2BB1CA']}, // Sky 600 to Sky 900
            legend: 'none',
            tooltip: {trigger: 'none'}
        };


        var chart = new google.visualization.GeoChart(familyMap.options.mapDiv[0]);

        chart.draw(data, options);

        // 
        {
            let html = '<div><table><tbody>';

            for(let ii = 0; ii < labelValues.length; ii++) {
                const style = 'background-color:#' + options.colorAxis.colors[ii];

                html += '<tr><td style="' + style + '">&nbsp;&nbsp;</td><td>' + labelValues[ii] + '</td></tr>';
            }

            html += '</tbody></table></div>';

            $(familyMap.options.skusDiv).html(html);
        }
    }
    
    familyMap.initMap = function() {
        familyMap.initMapStarted = true;

        google.charts.load('current', {
            'packages':['geochart'],
            'mapsApiKey': mapsApiKey
        });
        google.charts.setOnLoadCallback(familyMap.drawMap);    
    }

    familyMap.clickToShow = function() {

        if (!familyMap.initMapStarted) {
            $(familyMap.options.mapDiv).find('.clickToShow').hide();
            $(familyMap.options.mapDiv).off('click');
            
            familyMap.initMap();    
        }
    };

    familyMap.init = function(options, callback) {
        // options: 
        // mapDiv - map div element
        // familySelect - family select element
        // family - the device family if familySelect is not present
        // noHistory - don't update page history
        familyMap.options = options;

        if (familyMap.options.family == 'cat1expansion') {
            // Not really a family
            familyMap.options.clickToShow = false;
            familyMap.drawMap = familyMap.drawMapCat1Expansion;
        }


        if (familyMap.options.clickToShow) {
            $(familyMap.options.mapDiv).find('.clickToShow').show();

            $(familyMap.options.mapDiv).on('click', function() {
                for(const m of familyMaps) {
                    m.clickToShow();
                }
            });
        }
        else {
            familyMap.initMap();
        }

        if (familyMap.options.familySelect) {
            $(familyMap.options.familySelect).on('change', familyMap.drawMap);
        }

        familyMaps.push(familyMap);

        callback();
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
        const deviceVal = $('#' + countryDetails.options.deviceList + ' option').filter(function () { return $(this).html() === device; }).prop('value');

        $('#' + countryDetails.options.deviceList).val(deviceVal);
    }
    const country = urlParams.get('country');
    if (country) {
        $('#' + countryDetails.options.countryField).val(country);   
        countryDetails.onCountrySelected(country);
    }
};

countryDetails.saveQuery = function() {
    if (countryDetails.country) {
        const deviceVal = $('#' + countryDetails.options.deviceList).val();
        const device = $('#' + countryDetails.options.deviceList + ' option').filter(function () { return $(this).prop('value') === deviceVal; }).html();
    
        history.pushState(null, '', '?tab=CountryDetails&country=' + encodeURIComponent(countryDetails.country) + '&device=' + encodeURIComponent(device));    
    }
};


countryDetails.buildMenu = function() {
    // Device Popup
    let html = '';
    datastore.data.skuFamily.forEach(function(obj, index1) {
        if (obj.wifi || obj.cellular === false) {
            return;
        }
        if (obj.showInternalUsers) {
            if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                return;
            }            
        }

        html += '<optgroup label="' + obj.name + '">';

        obj.group.forEach(function(obj2, index2) {
            if (obj2.showInternalUsers) {
                if (typeof apiHelperAuth == 'undefined' || !apiHelperAuth.isInternal) {
                    return;
                }            
            }

            const value = index1 + ',' + index2;

            html += '<option value="' + value + '">' + obj2.name + '</option>';
        });

        html += '</optgroup>';
    }); 
    html += '<option disabled>&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;</option><option value="all">Show All Devices</option>';

    $('#' + countryDetails.options.deviceList).html(html);
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
            for(const prefix of options.showSkuFamily.short) {
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
        showM1: modemObj.technologies.includes('M1')
    }
    dataui.bandUseChangeHandler(options.tableId, [countryObj], simPlanObj.countryCarrierKey, modemObj, bandUseChangeOptions);
}

countryDetails.onCountrySelected = function(country) {

    const resultDiv = $('#' + countryDetails.options.resultDiv);
    $(resultDiv).html('');

    const countryObj = datastore.findCountryByName(country);

    const skuFamilyDevice = countryDetails.getSkuFamilyDevice();
    if (skuFamilyDevice) {
        // skuFamilyDevice: region, lifecycle, sim, simPlan, modem

        countryDetails.country = country;

        countryDetails.saveQuery();

        countryDetails.generateTable({
            country,
            modem: skuFamilyDevice.modem,
            sim: skuFamilyDevice.sim,
            simPlan: skuFamilyDevice.simPlan,
            tableId: 'carrierDetailTable',
            resultDiv,
            showSkuFamily: skuFamilyDevice,
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

    $('#' + countryDetails.options.deviceList).change(countryDetails.countrySel.updateHandler);

    callback();
};

//
// bandFit
//


bandFit.fromQuery = function(urlParams) {

    const test = urlParams.get('test');
    if (test) {
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
            title: 'M-Series (M404/M635 vs. M524)',
            sim: 4, // EtherSIM
            tests: [
                {
                    title: 'M404',
                    moreTitles: ['M635'],
                    modemObj: datastore.data.modems.find(e => e.model == 'BG95-M5'),
                    borderRight: true,
                    backgroundColor: '#AFE4EE', // COLOR_Sky_600        
                },
                {
                    title: 'M524',
                    modemObj: datastore.data.modems.find(e => e.model == 'EG91-EX'),
                    borderRight: false,
                    backgroundColor: '#89E2B3', // COLOR_Mint_600
                },
            ],
        },
        'b-series': {
            title: 'B-Series (B404X vs. B524)',
            sim: 4, // EtherSIM
            tests: [
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
        'b504': {
            title: 'B504 comparison (B504 vs. B404X vs. B524)',
            showInternalUsers: true,
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
    'FindDevice':rec2, 
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



$(document).ready(function() {
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

    datastore.init({path:'/assets/files/carriers.json'}, function() {

        if ($('#carrierTabs').length) {
            // Full carriers page
            dataui.populateRegionSelectors();

            carriers2.init({
                deviceList:'deviceList',
                regionList:'regionList',
                regionGroup:'region6',
                table:'countryCarrierTable'
            },
            function() {    
                rec2.init({
                    idBase:'country2',
                    resultDiv:'recDiv'
                },
                function() {
                    carrierSelectTabs.ModelMap.init({
                        mapDiv:$('#familyMapDiv'),
                        familySelect:$('#familyMapSelect'),
                        skusDiv:$('#familyMapSkusDiv')
                    },
                    function() {
                        countryDetails.init({
                            deviceList:'countryDetailDeviceList',
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
    
            });   
    
        }
        else {
            // For now, the only special case is family map
            $('.carrierFamilyMap').each(function() {
                const thisElem = $(this);

                familyMapCreate().init({
                    mapDiv:$(thisElem).find('.familyMapDiv'),
                    skusDiv:$(thisElem).find('.familyMapSkusDiv'),
                    family:$(thisElem).data('family'),
                    noHistory: true,
                    clickToShow: true
                }, function() {
    
                });    
            });
        }
    });
});
