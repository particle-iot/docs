
let carriers2 = {};
let msomBands = {};

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
            html += '<optgroup label="' + obj.name + '">';

            obj.group.forEach(function(obj2, index2) {
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

            if (sunset2G.year) {
                html += '<td>' + sunset2G.s + '</td>';
            }    
            else {
                html += '<td>&nbsp;</td>';
            }
        }
        if (technologies.includes("3G")) {
            const sunset3G = datastore.dateParse(ccObj.sunset3G);

            if (sunset3G.year) {
                html += '<td>' + sunset3G.s + '</td>';
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
        console.log('familyMap.saveQuery', family);

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
        html += '<optgroup label="' + obj.name + '">';

        obj.group.forEach(function(obj2, index2) {
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
    html += '<span style="font-size: large;">' + recommendationObj.desc + '</span>\n';
    if (recommendation.reason) {
        let s = recommendation.reason;
        s = s.substr(0, 1).toUpperCase() + s.substr(1);
        html += '<p>' + s + '</p>\n';
        if (recommendation.roamingRestrictions) {
            html += '<p>There are permanent roaming restrictions in this country. See <a href="/tutorials/cellular-connectivity/introduction/#permanent-roaming">permanent roaming</a> for more information.</p>\n';
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
    }
    
    // Carrier band table
    const footnotesDivId = options.tableId + 'FootnotesDiv';

    html += '<table id="' + options.tableId + '">';
    html += '<thead></thead><tbody></tbody>';
    html += '</table>';
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
                        }
                    }
                    if (!exists) {
                        modemSimSimPlan.push({
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
// msomBands
//
msomBands.fromQuery = function(urlParams) {

    const region = urlParams.get('region');
    if (region) {
        $(msomBands.msomRegionSelectElem).val(region);
    }
    const country = urlParams.get('country');
    if (country && region == 'country') {
        $(msomBands.msomSpecificCountryElem).val(country);
    }
    msomBands.selectRegion();
};

msomBands.saveQuery = function() {

    const region = $(msomBands.msomRegionSelectElem).val();
    const specificCountry = (region == 'country') ? $(msomBands.msomSpecificCountryElem).val() : '';
    
    history.pushState(null, '', '?tab=Msom&region=' + encodeURIComponent(region) + '&country=' + encodeURIComponent(specificCountry));


};

msomBands.renderCountries = function(countries) {

    for(const country of countries) {
        const countryObj = datastore.data.countries.find(e => e.name == country);

        {
            const headerElem = document.createElement('h3');
            $(headerElem).text(country);
            $(msomBands.msomResultsElem).append(headerElem);    
        }

        let carriersInCountry = [];
            
        for(const ccObj of datastore.data.countryCarrier) {
            if (ccObj.country == country) {
                if (!ccObj.supersim) {
                    continue;
                }
                carriersInCountry.push(ccObj);
            }
        }

        for(const testObj of msomBands.tests) {
            const headerElem = document.createElement('h5');
            $(headerElem).text(country + ' - ' + testObj.title);
            $(msomBands.msomResultsElem).append(headerElem);

            let bands = [];
            let footnotes = [];
            let hasNon2G = false;

            for(const ccObj of carriersInCountry) {                    

                for(let b of ccObj.bands) {
                    b = b.replace('LTE', 'Cat1');

                    let hasTech = false;
                    for(const t of testObj.modemObj.technologies) {
                        if (b.startsWith(t)) {
                            hasTech = true;
                        }
                    }
                    if (!hasTech) {
                        continue;
                    }

                    if (!bands.includes(b)) {
                        bands.push(b);
                    }
                    if (!b.startsWith("2G")) {
                        hasNon2G = true;
                    }
                    
                }
            }
            bands.sort(datastore.sortCompareTagBand);

            if (bands.length == 0) {
                const divElem = document.createElement('div');
                $(divElem).text('\u274C There are no carriers in ' + country + ' compatible with the ' + testObj.title + ' cellular modem.');
                $(msomBands.msomResultsElem).append(divElem);
                continue;
            }

            const tableDiv = document.createElement('div');
            
            const tableElem = document.createElement('table');

            const theadElem = document.createElement('thead');
            {
                const trElem = document.createElement('tr');
                {
                    const thElem = document.createElement('th');
                    $(trElem).append(thElem);
                }
    
                

                for(const b of bands) {
                    const thElem = document.createElement('th');
                    $(thElem).css('text-align', 'center')

                    {
                        const textNode = document.createTextNode(datastore.bandGetTag(b));
                        $(thElem).append(textNode);
                    }
                    if (hasNon2G) {
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

                $(theadElem).append(trElem);
            }
            $(tableElem).append(theadElem);

            const tbodyElem = document.createElement('tbody');
            $(tableElem).append(tbodyElem);


            let roamingRestrictions = false;
            let showSunset2G;
            let showSunset3G;
            let hasGreenCheck = false;
            let hasRedX = false;

            for(const ccObj of carriersInCountry) {
                const trElem = document.createElement('tr');
                {
                    const tdElem = document.createElement('td');
                    $(tdElem).text(ccObj.carrier);
                    $(trElem).append(tdElem);
                }

                if (ccObj.supersim.roamingRestrictions) {
                    roamingRestrictions = true;
                }
                const sunset2G = datastore.dateParse(ccObj.sunset2G);
                const sunset3G = datastore.dateParse(ccObj.sunset3G);

                for(const b of bands) {
                    const modemSupportsBand = testObj.modemObj.bands.includes(b);
                    const carrierSupportsBand = ccObj.bands.find(b1 => b1.replace('LTE', 'Cat1') == b);

                    let value = '';
                    let footnote;

                    if (carrierSupportsBand) {
                        if (modemSupportsBand) {
                            value = '\u2705'; // green check
                            hasGreenCheck = true;

                            if (b.startsWith("2G")) {
                                if (sunset2G.year && !showSunset2G) {
                                    if (sunset2G.year < 2024) {
                                        footnotes.push('2G sunset originally planned for ' + sunset2G.s + ' but may not been delayed');
                                    }
                                    else {
                                        footnotes.push('2G sunset expected ' + sunset2G.s);
                                    }
                                    showSunset2G = footnotes.length;
                                }
                                if (showSunset2G) {
                                    footnote = showSunset2G.toString();
                                }
                            }
                            if (b.startsWith("3G")) {
                                if (sunset3G.year && !showSunset3G) {
                                    if (sunset3G.year < 2024) {
                                        footnotes.push('3G sunset originally planned for ' + sunset3G.s + ' but may have been delayed');
                                    }
                                    else {
                                        footnotes.push('3G sunset expected ' + sunset3G.s);
                                    }
                                    showSunset3G = footnotes.length;
                                }
                                if (showSunset3G) {
                                    footnote = showSunset3G.toString();
                                }
                            }                        
    
                        }
                        else {
                            value = '\u274C'; // red x
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

                $(tbodyElem).append(trElem);
            }               

            $(tableDiv).append(tableElem);
            
            $(msomBands.msomResultsElem).append(tableDiv);

            const ulElem = document.createElement('ul');

            if (roamingRestrictions) {
                const liElem = document.createElement('li');
                $(liElem).text('Permanent roaming restrictions may apply in this country.');
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

            if (hasGreenCheck) {
                const liElem = document.createElement('li');
                $(liElem).text('\u2705 Band is supported by carrier and the ' + testObj.title + ' cellular modem.');
                $(ulElem).append(liElem);
            }

            if (hasRedX) {
                const liElem = document.createElement('li');
                $(liElem).text('\u274C Band is used by the carrier but not supported by the ' + testObj.title + ' cellular modem.');
                $(ulElem).append(liElem);
            }


            $(msomBands.msomResultsElem).append(ulElem);

        }

    }


}

msomBands.selectRegion = function() {
    const region = $(msomBands.msomRegionSelectElem).val();
    if (region != `country`) {
        $(msomBands.msomSpecificCountryElem).val('');
    }

    const specificCountry = (region == 'country') ? $(msomBands.msomSpecificCountryElem).val() : null;

    msomBands.saveQuery();

    $(msomBands.msomResultsElem).empty();

    let countries = [];

    if (specificCountry) {
        countries.push(specificCountry);
        msomBands.renderCountries(countries);
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
        msomBands.renderCountries(countries);
    }
    else {
        let regions = [];

        if (region == 'byRegion') {
            regions = msomBands.regions;
        }
        else {
            regions = [msomBands.regions.find(e => e.name == region)];
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

                $(msomBands.msomResultsElem).append(headerElem);
            }


            msomBands.renderCountries(countries);
        }     
    }

    
}

msomBands.onCountrySelected = function() {
    $(msomBands.msomRegionSelectElem).val('country');
    msomBands.selectRegion();
    msomBands.saveQuery();
}

msomBands.init = function(callback) {

    $('#carrierTabMsom').show();

    // byRegion, alphabetical
    msomBands.msomRegionSelectElem = $('#msomRegionSelect');
    msomBands.msomResultsElem = $('#msomResults');
    msomBands.msomSpecificCountryElem = $('#msomSpecificCountry');

    msomBands.regions = datastore.data.regionGroups.find(e => e.id == 'region6').regions;
    for(const r of msomBands.regions) {
        const optionElem = document.createElement('option');
        $(optionElem).attr('value', r.name);
        $(optionElem).text('Only ' + r.name + ' region');

        $(msomBands.msomRegionSelectElem).append(optionElem);
    }
    $(msomBands.msomRegionSelectElem).on('change', msomBands.selectRegion);
    
    msomBands.tests = [
        {
            title: 'M404',
            modemObj: datastore.data.modems.find(e => e.model == 'BG95-M5'),
        },
        {
            title: 'M523',
            modemObj: datastore.data.modems.find(e => e.model == 'EG91-EX'),
        },
    ];
    msomBands.selectRegion();

    msomBands.countrySel = dataui.countrySelector({
        textFieldId:'msomSpecificCountry',
        popupClass: 'countryPopup',
        resultDiv:'msomSpecificCountryDiv',        
    }).init();
    msomBands.countrySel.onCountrySelected = msomBands.onCountrySelected;


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
    'Msom':msomBands,
};

function carrierSelectTab(which) {
    $('div.countryPopup').css('visibility', 'hidden');

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

}



$(document).ready(function() {
    Object.keys(carrierSelectTabs).forEach(function(tab) {
        $('#carrierTab' + tab).on('click', function() {
            carrierSelectTab(tab);
        });
    });

    const showMsom = true;

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
                            if (showMsom) {
                                msomBands.init(function() {
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
