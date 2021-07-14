let carriers2 = {};

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
            if (obj.wifi) {
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

        countryCarrierFiltered.push(ccObj);
    });


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
                cell = '&check;'; 
            }
            html += '<td>' + cell + '</td>';
        });
        if (!allow) {
            return;
        }

        html += '</tr>';

        $('#' + carriers2.options.table + ' > tbody').append(html);
    });
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

                if (skuFamilyObj.wifi) {
                    return;
                }

                datastore.data.skus.forEach(function(skuObj) {
                    if (skuObj.family == skuFamilyObj.family && 
                        skuObj.modem == cmsObj.modem &&
                        skuObj.sim == cmsObj.sim &&
                        skuObj.lifecycle != 'Discontinued') {
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
                const allow = !!ccObj[etherSimObj.simPlanKey]['allow' + tech];
                html += '<td class="technologyCell">' + (allow ? '\u2705' : '&nbsp;') + '</td>'; // Green Check
            });

                
            html += '</tr>';
        });

        html += '</table>';
    
    };

    const generateSimpleSkuTables = function(labelStr, modemSimArray, showCarriers) {

        modemSimArray.forEach(function(modemSimObj, index) {
            generateCountryListReason(labelStr, modemSimObj);

            html += dataui.generateSkuTable(modemSimObj, {});

            if (showCarriers) {
                generateCarrierTable(modemSimObj);
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

            html += dataui.generateSkuTable(modemSimObj, {});

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

        if (modemSimArray.length == 2 && countriesMissing.length > 0) {
            html += '<p>Not recommended in: ' + countriesMissing.join(', ') + '</p>';
        }
    };

    html += '<h2>Recommended Devices</h2>';


    datastore.data.skuFamily.forEach(function(skuFamilyObj) {
        if (skuFamilyObj.wifi) {
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
            if (skuFamilyObj.wifi) {
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
        if (skuFamilyObj.wifi) {
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

let familyMap = {};

familyMap.fromQuery = function(urlParams) {
    const family = urlParams.get('family');
    if (family) {
        $('#' + familyMap.options.familySelect).val(family);
    }
};

familyMap.saveQuery = function() {
    const family = $('#' + familyMap.options.familySelect).val();

    history.pushState(null, '', '?tab=ModelMap&family=' + encodeURIComponent(family));
};

familyMap.drawMap = function() {
    const family = $('#' + familyMap.options.familySelect).val();

    familyMap.saveQuery();

    const skuFamilyObj = datastore.findSkuFamily(family);

    let models = [];
    skuFamilyObj.group.forEach(function(obj) {
        if (obj.lifecycle == 'GA') {
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
                    foundModel = modelIndex;
                }
            });
        });    
        if (foundModel != undefined) {
            countryModelArray.push([countryObj.isoCode, foundModel]);
        }
    });

    var data = google.visualization.arrayToDataTable(countryModelArray);

    var options = {
        colorAxis: {colors: ['86E2D5', '00AEEF']}, // teal to cyan
        legend: 'none',
        tooltip: {trigger: 'none'}
    };

    var chart = new google.visualization.GeoChart(document.getElementById(familyMap.options.mapDiv));

    chart.draw(data, options);

    // 
    {
        let html = '<div><table><thead><tr><th></th><th>SKU</th><th>Description</th></tr></thead><tbody>';

        models.forEach(function(skuFamilyObj, modelIndex) {
            const style = 'background-color:#' + options.colorAxis.colors[modelIndex];

            datastore.data.skus.forEach(function(skuObj) {
                if (skuObj.sim != skuFamilyObj.sim || skuObj.modem != skuFamilyObj.modem || skuObj.family != family) {
                    return;
                }
                
                html += '<tr><td style="' + style + '">&nbsp;&nbsp;</td><td>' + skuObj.name + '</td><td>' + skuObj.desc + '</td></tr>';
            });
        });
        html += '</tbody></table></div>';

        $('#' + familyMap.options.skusDiv).html(html);
    }

}

familyMap.init = function(options, callback) {
    // options: 
    // mapDiv - ID for map div
    // familySelect - ID for family select element
    familyMap.options = options;

    google.charts.load('current', {
        'packages':['geochart'],
        'mapsApiKey': mapsApiKey
    });
    google.charts.setOnLoadCallback(familyMap.drawMap);
    

    $('#' + familyMap.options.familySelect).on('change', familyMap.drawMap);

    callback();
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
        if (obj.wifi) {
            return;
        }
        html += '<optgroup label="' + obj.name + '">';

        obj.group.forEach(function(obj2, index2) {
            const value = index1 + ',' + index2;

            html += '<option value="' + value + '">' + obj2.name + '</option>';
        });

        html += '</optgroup>';
    }); 
    $('#' + countryDetails.options.deviceList).html(html);
};

countryDetails.getSkuFamilyDevice = function() {
    const valueArray = $('#' + countryDetails.options.deviceList).val().split(',');
    if (valueArray.length != 2) {
        return null;
    }

    return datastore.data.skuFamily[valueArray[0]].group[valueArray[1]];
};

countryDetails.onCountrySelected = function(country) {
    //$('#' + countryDetails.options.resultDiv).text('selected: ' + country);
    countryDetails.country = country;

    countryDetails.saveQuery();

    const countryObj = datastore.findCountryByName(country);

    $('#' + countryDetails.options.resultDiv).html('');

    const skuFamilyDevice = countryDetails.getSkuFamilyDevice();
    if (!skuFamilyDevice) {
        return;
    }
    // region, lifecycle, sim, simPlan, modem

    let recommendation;
    datastore.data.countryModemSim.forEach(function(obj) {
        // country, modem, sim, recommendation, reason
        if (obj.country == country && obj.modem == skuFamilyDevice.modem && obj.sim == skuFamilyDevice.sim) {
            recommendation = obj;
        }
    });
    if (!recommendation) {
        recommendation = {recommendation:'NR', reason:'Information not available'};
        console.log('information not available country=' + country, skuFamilyDevice);
    }
    const recommendationObj = datastore.findRecommendationByName(recommendation.recommendation);

    const simPlanObj = datastore.findSimPlanById(skuFamilyDevice.simPlan);

    const modemObj = datastore.findModemByModel(skuFamilyDevice.modem);

    let html = '';

    // Recommendation
    html += '<span style="font-size: large;">' + recommendationObj.desc + '</span>\n';
    if (recommendation.reason) {
        let s = recommendation.reason;
        s = s.substr(0, 1).toUpperCase() + s.substr(1);
        html += '<p>' + s + '</p>\n';
    }

    // Carrier band table

    const tableId = 'carrierDetailTable';

    html += '<table id="' + tableId + '">';
    html += '<thead></thead><tbody></tbody>';
    html += '</table>';


    // Modem information
    $('#' + countryDetails.options.resultDiv).html(html);

    // Update band information after adding table
    const bandUseChangeOptions = {
        footnotes: {
            noBand:'1',
            noPlan:'2',
            noBandNoPlan:'3',
            warnM1:'4'
        },
        footnotesDiv: countryDetails.options.footnotesDiv,
        showAllTechnologies: true
    }
    dataui.bandUseChangeHandler(tableId, [countryObj], simPlanObj.countryCarrierKey, modemObj, bandUseChangeOptions);

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
// Initialization
//
const carrierSelectTabs = {
    'ByDevice':carriers2, 
    'FindDevice':rec2, 
    'ModelMap':familyMap, 
    'CountryDetails':countryDetails
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

    // Remember the search parameters before they are replaced
    const urlParams = new URLSearchParams(window.location.search);

    datastore.init({path:'/assets/files/carriers.json'}, function() {
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
                familyMap.init({
                    mapDiv:'familyMapDiv',
                    familySelect:'familyMapSelect',
                    skusDiv:'familyMapSkusDiv'
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
                        carrierLoadQuery(urlParams);
                    });
                });   
    
            });   

        });   
    });
});
