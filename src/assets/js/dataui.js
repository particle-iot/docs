let dataui = {};


dataui.populateRegionSelectors = function () {

    const html = '<option value="all" selected="selected">All</option>';
    $('.regionSel').html(html);

    datastore.data.regions.forEach(function(obj, index) {
        const html = '<option value="' + obj.name + '">' + obj.desc + '</option>';
        $('.regionSel').append(html);
    });
};


dataui.setupRegionSelector = function(name, handler) {
    const changeHandler = function() {
        const results = dataui.selectCountries(dataui.readRegionSelector(name));
        handler(name, results);
    };

    // Add on change handlers for the select and text input field
    $('#' + name + 'Sel').on('change', changeHandler);
    $('#' + name + 'Text').on('input', changeHandler);

    // Call once to initialize
    changeHandler();
};

dataui.defaultRegionSelector = function() { 
    let result = {};

    result.sel = 'all';
    result.text = '';

    return result;
};

dataui.readRegionSelector = function(name) {
    let result = dataui.defaultRegionSelector();

    result.sel = $('#' + name + 'Sel option:selected').attr('value');
    result.text = $('#' + name + 'Text').val();

    return result;
};

dataui.selectCountries = function(config) {
    let results = [];

    datastore.data.countries.forEach(function(obj) {
        if (config.sel != 'all') {
            // Filtering by region
            if (!obj.regions.includes(config.sel)) {
                return;
            }
        }
        if (config.text) {
            let found = false;
            
            // text is a comma-separated list
            config.text.split(',').forEach(function(part) {
                if (found) {
                    return;
                }

                part = part.trim();
                if (part) {
                    if (part.length != 2 || part.toUpperCase() != part) {
                        part = part.toLowerCase();
                    }
                    if (obj.plain.indexOf(part) >= 0) {
                        found = true;
                        return;
                    }
                    if (obj.name.toLowerCase().indexOf(part) >= 0) {
                        found = true;
                        return;
                    }
                    if (obj.aliases) {
                        obj.aliases.forEach(function(alias) {
                            if (alias.toLowerCase().indexOf(part) >= 0) {
                                found = true;
                                return;
                            }        
                        });
                    }
                    if (obj.isoCode.indexOf(part) >= 0) {
                        found = true;
                        return;
                    }
                }
            });

            if (!found) {
                return;
            }
        }
        results.push(obj);
    });

    return results;
}

dataui.countrySelector = function(options) {
    let countrySel = {};

    countrySel.options = options;

    // textFieldId:'country3Text',
    // popupDivId:'country3PopupDiv'


    countrySel.popupClickHandler = function(ev) {

        const elem = $('#' + countrySel.options.textFieldId);
        const text = elem.val();

        if (ev.target.tagName.toLowerCase() == 'td') {
            const clickText = ev.target.innerText;

            elem.focus();
            elem.val(clickText);
            elem[0].setSelectionRange(0, clickText.length);    
        }

        $('div.countryPopup').css('visibility', 'hidden');

        countrySel.updateHandler();
    };

    countrySel.updateHandler = function() {
        if ($('div.countryPopup').css('visibility') == 'visible') {
            // If the popup selector is visible don't refresh the contents as the
            // user may be scrolling through the options using the arrows
            return;
        }

        const text = $('#' + countrySel.options.textFieldId).val();
        const countryObj = datastore.findCountryByName(text);
        if (countryObj) {
            if (countrySel.onCountrySelected) {
                countrySel.onCountrySelected(countryObj.name);
            }
        }
    };

    countrySel.keyHandler = function(ev) {
        
        if ($('div.countryPopup').css('visibility') != 'visible') {

            // Don't submit 
            switch (ev.key) {
            case 'Enter':
                ev.preventDefault();
                break;
            }

            return;
        }

        let update = false;

        switch (ev.key) {
            case 'Down':
            case 'ArrowDown':
                // 
                if ((countrySel.curAutoCompleteIndex + 1) < countrySel.countries.possible.length) {
                    countrySel.curAutoCompleteIndex++;
                    update = true;
                }
                break;

            case 'Up':
            case 'ArrowUp':
                //
                if (countrySel.curAutoCompleteIndex > 0) {
                    countrySel.curAutoCompleteIndex--;
                    update = true;
                }
                break;

            case 'Enter':
            case 'Tab':
                if (countrySel.countries.possible.length == 1) {
                    countrySel.curAutoCompleteIndex = 0;
                    update = true;    
                }
                
                // Fall through to still hide the popup
            case 'Esc':
            case 'Escape':
                // Hide popup
                $('div.countryPopup').css('visibility', 'hidden');
                countrySel.updateHandler();
                break;

            case 'Home':
                countrySel.curAutoCompleteIndex = 0;
                update = true;
                break;

            case 'End':
                countrySel.curAutoCompleteIndex = countrySel.countries.possible.length - 1;
                update = true;
                break;


            default:
                return;
        }  

        if (update) {
            const autoCompleteText = countrySel.countries.possible[countrySel.curAutoCompleteIndex].name ;

            $('#' + countrySel.options.textFieldId).val(autoCompleteText);
            $('#' + countrySel.options.textFieldId)[0].setSelectionRange(0, autoCompleteText.length);

            countrySel.updateHandler();
        }

        ev.preventDefault();

    };


    countrySel.textHandler = function() {
        const text = $('#' + countrySel.options.textFieldId).val();

        countrySel.countries = dataui.filterCountries(text);

        let showPopup = false;

        $('#' + countrySel.options.popupDivId).html('');
        let html = '<table class="countryPopup"><tbody>';

        if (countrySel.countries.exact) {
            const selStart = $('#' + countrySel.options.textFieldId)[0].selectionStart;
            $('#' + countrySel.options.textFieldId).val(countrySel.countries.exact.name);
            $('#' + countrySel.options.textFieldId)[0].setSelectionRange(selStart, countrySel.countries.exact.name.length);
        }
        else {
            countrySel.countries.possible.forEach(function(obj) {
                html += '<tr><td class="countryPopup">' + obj.name + '</td></tr>';
                showPopup = true;
                countrySel.curAutoCompleteIndex = -1;
            });
        }

        html += '</tbody></table>';
        $('#' + countrySel.options.popupDivId).html(html);

        if (showPopup) {
            $('div.countryPopup').css('left', $('#' + countrySel.options.textFieldId).position().left + 'px');
            $('div.countryPopup').css('top', $('#' + countrySel.options.textFieldId).position().bottom + 'px');
            $('div.countryPopup').css('width', $('#' + countrySel.options.textFieldId).width() + 'px');
            $('div.countryPopup').css('visibility', 'visible');
        }
        else {
            $('div.countryPopup').css('visibility', 'hidden');
            countrySel.updateHandler();
        }

    };

    countrySel.init = function() {
        $('#' + countrySel.options.popupDivId).css('visibility', 'hidden');

        $('#' + countrySel.options.popupDivId).on('click', countrySel.popupClickHandler);

        $('#' + countrySel.options.textFieldId).on('keydown', countrySel.keyHandler);

        $('#' + countrySel.options.textFieldId).on('input', countrySel.textHandler);

        return countrySel;
    };

    return countrySel;
}

// Returns a regionCountry selector object initialized to the set of HTML
// elements whose name begins with 'idBase' and follows the region country
// selector naming convention
dataui.setupRegionCountrySelector = function (regionSel, idBase, listChangeHandler) {

    regionSel.idBase = idBase;
    regionSel.datastore = datastore;
    regionSel.listChangeHandler = listChangeHandler;

    regionSel.fields = [];
    regionSel.curField = {};
    regionSel.countries = {};

    regionSel.focusRegion = function(ev) {
        $('#' + regionSel.idBase + 'RegionRadio').prop('checked', true);
    
        $('#' + regionSel.idBase + 'RegionSel').show();
        $('#' + regionSel.idBase + 'Text').hide();     
        
        regionSel.updateHandler();
    };
    
    regionSel.focusCountries = function(ev) {
        $('#' + regionSel.idBase + 'CountryRadio').prop('checked', true);
    
        $('#' + regionSel.idBase + 'RegionSel').hide();
        $('#' + regionSel.idBase + 'Text').show();
        $('#' + regionSel.idBase + 'Text').focus();

        regionSel.updateHandler();
    };
    
    regionSel.updateHandler = function() {

        if ($('div.countryPopup').css('visibility') == 'visible') {
            // If the popup selector is visible don't refresh the contents as the
            // user may be scrolling through the options using the arrows
            return;
        }

        let newCountryList = [];

        if ($('#' + regionSel.idBase + 'RegionRadio').prop('checked')) {
            // Region selected
            const region = $('#' + regionSel.idBase + 'RegionSel').val();
            
            regionSel.datastore.data.countries.forEach(function(obj) {
                if (obj.regions) {
                    if (obj.regions.includes(region)) {
                        newCountryList.push(obj);
                    }
                }
            });
        }
        else {
            // Countries selected
            const elem = $('#' + regionSel.idBase + 'Text');
            const text = elem.val();
    
            const fields = dataui.divideIntoFields(text);
                
            fields.forEach(function(obj, index) {
                const countryObj = datastore.findCountryByName(obj.text);
                if (countryObj) {
                    newCountryList.push(countryObj);
                }
            });    
        }

        let changed = false;

        if (!regionSel.countryList || regionSel.countryList.length != newCountryList.length) {
            changed = true;
        }
        else {
            // Have to compare them element by element
            changed = regionSel.countryList.some(function(obj1) {
                let found = newCountryList.some(function(obj2) {
                    return (obj1.name == obj2.name);
                }); 

                return !found;
            });
        }
        if (changed) {
            regionSel.countryList = newCountryList;    

            if (regionSel.listChangeHandler) {
                regionSel.listChangeHandler(regionSel);
            }

        }

    };

    regionSel.popupClickHandler = function(ev) {

        const elem = $('#' + regionSel.idBase + 'Text');
        const text = elem.val();

        const clickText = ev.target.innerText;

        elem.focus();
        elem.val(text.substr(0, regionSel.curField.start + regionSel.curField.padLeft) + clickText + text.substr(regionSel.curField.end));
        elem[0].setSelectionRange(regionSel.curField.start + regionSel.curField.padLeft, regionSel.curField.start + clickText.length);
        $('div.countryPopup').css('visibility', 'hidden');

        regionSel.updateHandler();
    };


    regionSel.setAutoCompleteText = function(autoCompleteText) {
        const elem = $('#' + regionSel.idBase + 'Text');
        const text = elem.val();

        elem.focus();
        elem.val(text.substr(0, regionSel.curField.start + regionSel.curField.padLeft) + autoCompleteText + text.substr(regionSel.curField.end));
        elem[0].setSelectionRange(regionSel.curField.start + regionSel.curField.padLeft, regionSel.curField.start + autoCompleteText.length);    

        // Fix up field list
        const delta = autoCompleteText.length - regionSel.curField.text.length;
        regionSel.curField.text = autoCompleteText;
        
        regionSel.fields.forEach(function(obj) {
            if (obj.start > regionSel.curField.start) {
                obj.start += delta;
            }
            if (obj.end >= regionSel.curField.end) {
                obj.end += delta;
            }
        });
        regionSel.updateHandler();

    };

    regionSel.keyHandler = function(ev) {
        // Hitting a comma when an entire field is selected should move the selection to the
        // end first, so the autocomplete will not be erased
        if (ev.key == ',' && regionSel.curField) {
            const elem = $('#' + regionSel.idBase + 'Text');

            if (elem[0].selectionStart == (regionSel.curField.start + regionSel.curField.padLeft) &&
                elem[0].selectionEnd == (regionSel.curField.start + regionSel.curField.padLeft + regionSel.curField.text.length)) {
                // Special case
                let text = elem.val();
                elem[0].setSelectionRange(text.length, text.length);

            }
        }

        if ($('div.countryPopup').css('visibility') != 'visible') {

            // Don't submit 
            switch (ev.key) {
            case 'Enter':
                ev.preventDefault();
                break;
            }

            return;
        }

        let update = false;

        switch (ev.key) {
            case 'Down':
            case 'ArrowDown':
                // 
                if ((regionSel.curAutoCompleteIndex + 1) < regionSel.countries.possible.length) {
                    regionSel.curAutoCompleteIndex++;
                    update = true;
                }
                break;

            case 'Up':
            case 'ArrowUp':
                //
                if (regionSel.curAutoCompleteIndex > 0) {
                    regionSel.curAutoCompleteIndex--;
                    update = true;
                }
                break;

            case 'Enter':
            case 'Tab':
                if (regionSel.countries.possible.length == 1) {
                    regionSel.curAutoCompleteIndex = 0;
                    update = true;    
                }
                
                // Fall through to still hide the popup
            case 'Esc':
            case 'Escape':
                // Hide popup
                $('div.countryPopup').css('visibility', 'hidden');
                regionSel.updateHandler();
                break;

            case 'Home':
                regionSel.curAutoCompleteIndex = 0;
                update = true;
                break;

            case 'End':
                regionSel.curAutoCompleteIndex = regionSel.countries.possible.length - 1;
                update = true;
                break;


            default:
                return;
        }  

        if (update) {
            
            const autoCompleteText = regionSel.countries.possible[regionSel.curAutoCompleteIndex].name ;

            regionSel.setAutoCompleteText(autoCompleteText);
        }

        ev.preventDefault();

    };


    regionSel.textHandler = function(ev) {
        const selectionStart = ev.target.selectionStart;

        const elem = $('#' + regionSel.idBase + 'Text');
        const text = elem.val();

        regionSel.fields = dataui.divideIntoFields(text);
        
        $('#country2CountryList > tbody').html('');
        let showPopup = false;

        regionSel.fields.forEach(function(obj, index) {
            if (selectionStart >= obj.start && selectionStart <= obj.end) {
                // We are in this object
                regionSel.curField = obj;

                regionSel.countries = dataui.filterCountries(obj.text);

                if (regionSel.countries.exact) {
                    regionSel.setAutoCompleteText(regionSel.countries.exact.name);
                }
                else {
                    regionSel.countries.possible.forEach(function(obj) {
                        let html = '<tr><td class="countryPopup">' + obj.name + '</td></tr>';
                        $('#country2CountryList > tbody').append(html);
                        showPopup = true;
                        regionSel.curAutoCompleteIndex = -1;
                    });
                }
            
            }
        });

        if (showPopup) {
            $('div.countryPopup').css('left', $('#' + regionSel.idBase + 'Text').position().left + 'px');
            $('div.countryPopup').css('width', $('#' + regionSel.idBase + 'Text').width() + 'px');
            $('div.countryPopup').css('visibility', 'visible');
        }
        else {
            $('div.countryPopup').css('visibility', 'hidden');
            regionSel.updateHandler();
        }

    };

    let html = '';

    $('div.countryPopup').css('visibility', 'hidden');

    datastore.data.regions.forEach(function(obj, index) {
        let sel = '';
        if (obj.name == 'CA-MX-US') {
            sel += ' selected="selected"'
        }

        html += '<option value="' + obj.name + '"' + sel + '>' + obj.desc + '</option>';
    });

    $('#' + regionSel.idBase + 'RegionSel').html(html);

    regionSel.focusRegion();

    $('#' + regionSel.idBase + 'RegionRadio').on('click', regionSel.focusRegion);

    $('#' + regionSel.idBase + 'CountryRadio').on('click', regionSel.focusCountries);

    $('#' + regionSel.idBase + 'Text').on('keydown', regionSel.keyHandler);

    $('#' + regionSel.idBase + 'Text').on('input', regionSel.textHandler);

    $('#' + regionSel.idBase + 'Text').on('blur', function(ev) {
        // Need to find another way to do this. blur happens before click when clicking
        // on the popup, so if you hide it here, there's no longer anything to click on
        //$("div.countryPopup").css('visibility', 'hidden');
    });

    $('#' + regionSel.idBase + 'CountryList').on('click', regionSel.popupClickHandler);

    $('#' + regionSel.idBase + 'RegionSel').on('change', regionSel.updateHandler);


    regionSel.updateHandler();
};



dataui.isWordFragment = function(fragment, compareTo) {
    const index = compareTo.toLowerCase().indexOf(fragment.toLowerCase());
    if (index >= 0) {
        // Possible
        if (index == 0) {
            // Yes, at start
            return 'start';
        }
        // Is it at a word boundary?
        const c = compareTo.charAt(index - 1);
        if (c == ' ' || c == ',' || c == '(' || c == ')') {
            return 'startOfWord';
        }

        // Middle of a word
        return 'middle';
    }
    else {
        // No match
        return null;
    }
};

dataui.divideIntoFields = function(str) {
    let results = [];
    
    let start = 0;
    str.split(',').forEach(function(part) {
        let obj = {};
        obj.start = start;
        obj.end = start + part.length;
        start = obj.end + 1;

        obj.text = part.trim();
        if (obj.text) {
            obj.padLeft = part.indexOf(obj.text);

            results.push(obj);
        }
    });

    return results;
};

dataui.ignoreFragments = ['and', 'of', 'democratic', 'republic'];

dataui.filterCountries = function(fragment) {
    if (dataui.ignoreFragments.includes(fragment.toLowerCase())) {
        return;
    }

    let result = {};

    // Pass 1: Exact match for an iso2 code (entered in uppercase)
    // We don't automatically do this for iso3 because of the ambiguity of
    // 2-character "CA" which would also match part of 3-character "CAF".
    const isIso2Code = (fragment.length == 2 && fragment.toUpperCase() == fragment);
    if (isIso2Code) {
        datastore.data.countries.forEach(function(obj) {
            if (obj.isoCode == fragment) {
                result.exact = obj;
                result.startSel = 0;
            }
        });
        if (result.exact) {   
            // Exact match and no other possibilities
            return result;
        }
    }

    // Pass 2: Likely match. Also checks iso2 and iso3 not entered in uppercase.
    result.possible = [];

    datastore.data.countries.forEach(function(obj) {
        let match = dataui.isWordFragment(fragment, obj.plain);
        if (match && match != 'middle') {
            result.possible.push(obj);
            return;
        }
        match = dataui.isWordFragment(fragment, obj.name);
        if (match && match != 'middle') {
            result.possible.push(obj);
            return;
        }
        if (obj.aliases) {
            obj.aliases.forEach(function(alias) {
                match = dataui.isWordFragment(fragment, alias);
                if (match && match != 'middle') {
                    result.possible.push(obj);
                    return;
                }        
            });
        }
        if (obj.isoCode && fragment.length == 2 && obj.isoCode == fragment.toUpperCase()) {
            // Fragment matches iso code
            result.possible.push(obj);
            return;
        }
        if (obj.iso3 && (fragment.length == 2 || fragment.length == 3) && (obj.iso3.substr(0, fragment.length) == fragment.toUpperCase())) {
            // Fragment matches iso3 code
            result.possible.push(obj);
            return;
        }
    });

    if (result.possible.length == 1 && fragment.toLowerCase() == result.possible[0].name.toLowerCase().substr(0, fragment.length)) {
        // There is only one result, and it matches the fragment exactly. Autocomplete the result.
        result.exact = result.possible[0];
        result.startSel = fragment.length;
        delete result.possible;
        return result;
    }

    // Maybe also try a possible match on the iso codes?
    // Or maybe match not in a word?

    return result;
};

dataui.setupSkuSelector = function(name, handler) {
    const changeHandler = function() {
        const results = dataui.selectSkus(dataui.readSkuSelector(name));
        handler(name, results);
    };

    const changeElements = ['Gen3', 'Gen2', 
        'Prototyping', 'Production', 'Kit', 'Eval', 
        'All', 'EMEAA', 'NORAM', 'Americas', 
        'MvnoV2', 'Sim4FF', 'LTE',
        'NRND', 'Discontinued', 'Beta', 
        'Multi'];

    // Add on change handlers for the select and text input field
    changeElements.forEach(function(suffix) {
        $('#' + name + suffix).on('change', changeHandler);
    });

    $('#' + name + 'Text').on('input', changeHandler);

    // Call once to initialize
    changeHandler();
};

dataui.defaultSkuSelector = function() {
    let result = {};

    result.gen2 = result.gen3 = true;

    result.prototyping = result.production = result.kit = result.eval = true;

    result.region = 'all';

    result.mvnoV2 = result.sim4FF = result.lte = false;

    result.nrnd = result.discontinued = result.beta = false;

    result.multi = false;

    result.text = '';

    return result;
};

dataui.readSkuSelector = function(name) {
    let result = dataui.defaultSkuSelector();

    result.gen2 = $('#' + name + 'Gen2').prop('checked');
    result.gen3 = $('#' + name + 'Gen3').prop('checked');

    result.prototyping = $('#' + name + 'Prototyping').prop('checked');
    result.production = $('#' + name + 'Production').prop('checked');
    result.kit = $('#' + name + 'Kit').prop('checked');
    result.eval = $('#' + name + 'ProdEvaluction').prop('checked');
    
    result.region = $('input[name=' + name + 'Region]:checked').val();

    result.mvnoV2 = $('#' + name + 'MvnoV2').prop('checked');
    result.sim4FF = $('#' + name + 'Sim4FF').prop('checked');
    result.lte = $('#' + name + 'LTE').prop('checked');

    result.nrnd = $('#' + name + 'NRND').prop('checked');
    result.discontinued = $('#' + name + 'Discontinued').prop('checked');
    result.beta = $('#' + name + 'Beta').prop('checked') ;

    result.multi = $('#' + name + 'Multi').prop('checked');

    result.text = $('#' + name + 'Text').val();

    return result;
};

dataui.selectSkus = function(config) {
    let results = [];

    datastore.data.skus.forEach(function(obj, index) {
        if (!config.gen2 && obj.gen == 2) {
            return;
        }
        if (!config.gen3 && obj.gen == 3) {
            return;
        }
        if (!config.prototyping && obj.skuClass == 'prototyping') {
            return;
        }
        if (!config.production && obj.skuClass == 'production') {
            return;
        }

        if (config.region === 'emeaa') {
            if (obj.skuRegion == 'noram' || obj.skuRegion == 'noram') {
                return;
            }
        }
        else
        if (config.region === 'noram') {
            if (obj.skuRegion == 'emeaa') {
                return;
            }            
        }
        else
        if (config.region === 'americas') {
            if (obj.skuRegion == 'emeaa' || obj.skuRegion == 'noram') {
                return;
            }                        
        }

        if (config.mvnoV2) {
            if (obj.sim != 4) {
                return;
            }            
        }
        if (config.sim4FF) {
            if (!obj.sim4ff) {
                return;
            }            
        }
        if (config.lte) {
            // Only LTE and LTE-M1 devices
            const modem = datastore.findModemByModel(obj.modem);
            if (modem) {
                if (!modem.bandsM1 && !modem.bandsCat1) {
                    return;
                }
            }
        }

        if (!config.kit && obj.skuClass == 'kit') {
            return;
        }
        if (!config.eval && obj.skuClass == 'eval') {
            return;
        }
        if (!config.nrnd && obj.lifecycle.startsWith('NRND')) {
            return;
        }
        if (!config.discontinued && obj.lifecycle == 'Discontinued') {
            return;
        }
        if (!config.beta && obj.lifecycle == 'Beta') {
            return;
        }

        if (!config.multi && obj.multiple) {
            return;
        }

        if (config.text) {
            // Filter on SKU or Desc (case-insensitive)
            const text = config.text.toLowerCase().trim();
            if (obj.name.toLowerCase().indexOf(text) < 0 && obj.desc.toLowerCase().indexOf(text) < 0) {
                return;
            }
        }

        results.push(obj);
    });

    return results;
};

dataui.generateSkuTable = function(modemSimObj, options) {

    if (options == undefined) {
        options = {};
    }

    let html = '';

    html += '<table><thead>';
    html += '<tr><td>SKU</td><td>Description</td><td>Lifecycle</td></tr>'
    html += '</thead><tbody>';
    modemSimObj.skus.forEach(function(obj) {
        let notes = '';
        if (obj.replacement) {
            notes = 'Sub ' + obj.replacement;
        }

        html += '<tr><td>' + obj.name + '</td><td>' + obj.desc + '</td><td>' + obj.lifecycle + '</td></tr>';
    });
    html += '</tbody></table>';

    return html;
};

dataui.populateSimModemFamily = function(selectId, options) {
    if (options == undefined) {
        options = {};
    }

    let lastGroup;

    datastore.data.simModemFamily.forEach(function(obj, index) {
        const simPlanObj = datastore.findSimPlanById(obj.simPlan);
    
        if (options.hideBeta) {
            if (obj.lifecycle == 'Beta') {
                return;
            }
        }
        if (options.hideNRND) {
            if (obj.lifecycle.startWith('NRND')) {
                return;
            }
        }
        if (options.hideDiscontinued) {
            if (obj.lifecycle == 'Discontinued') {
                return;
            }
        }

        if (!options.noGroups && lastGroup != obj.lifecycle) {
            if (lastGroup) {
                $('#' + selectId).append('</optgroup>'); 
            }
            lastGroup = obj.lifecycle
            $('#' + selectId).append('<optgroup label="' + obj.lifecycle + '">'); 
        }

        let label = obj.desc;

        if (obj.lifecycle != 'GA') {
            label += ' (' + obj.lifecycle + ')';
        }

        let html = '';
        html += '<option value="' + index + '">' + label + '</option>\n';
        $('#' + selectId).append(html); 
    });

    if (!options.noGroups && lastGroup) {
        $('#' + selectId).append('</optgroup>'); 
    }
};

dataui.bandGetTag = function(x) {
    const index = x.indexOf('-');
    if (index > 0) {
        return x.substr(0, index);
    }
    else {
        return '';
    }
};

dataui.bandGetBand = function(x) {
    const index = x.indexOf('-');
    if (index > 0) {
        return parseInt(x.substr(index + 1));
    }
    else {
        return 0;
    }
};

dataui.sortCompareTagBand = function(a, b) {
    const aTag = dataui.bandGetTag(a);
    const bTag = dataui.bandGetTag(b);

    const cmp = aTag.localeCompare(bTag);
    if (cmp != 0) {
        return cmp;
    } 

    const aBand = dataui.bandGetBand(a);
    const bBand = dataui.bandGetBand(b);

    return aBand - bBand;
};

dataui.sortCompareNumeric = function(a, b) {
    return parseInt(a) - parseInt(b);
};

dataui.collectModemBands = function(countryCarrierList, technologies) {
    let bandsUsed = {};

    bandsUsed.bands2G = [];
    bandsUsed.bands3G = [];
    bandsUsed.bandsCat1 = [];
    bandsUsed.bandsM1 = [];
    bandsUsed.bandsAll = [];

    if (!technologies) {
        return bandsUsed;
    }

    // Collect all bands used
    countryCarrierList.forEach(function(obj) {
        obj.bands.forEach(function(tagBand) {
            const tag = dataui.bandGetTag(tagBand);
            const band = dataui.bandGetBand(tagBand);

            if (tag == '2G' && technologies.includes(tag)) {
                if (!bandsUsed.bands2G.includes(band)) {
                    bandsUsed.bands2G.push(band);
                    bandsUsed.bandsAll.push(tagBand);
                }
            }
            if (tag == '3G' && technologies.includes(tag)) {
                if (!bandsUsed.bands3G.includes(band)) {
                    bandsUsed.bands3G.push(band);
                    bandsUsed.bandsAll.push(tagBand);                
                }
            }
            if (tag == 'LTE') {
                if (technologies.includes('Cat1')) {
                    if (!bandsUsed.bandsCat1.includes(band)) {
                        bandsUsed.bandsCat1.push(band);
                        bandsUsed.bandsAll.push(tagBand.replace('LTE', 'Cat1'));                
                    }                        
                }
                if (technologies.includes('M1')) {
                    if (!bandsUsed.bandsM1.includes(band)) {
                        bandsUsed.bandsM1.push(band);
                        bandsUsed.bandsAll.push(tagBand.replace('LTE', 'M1'));                
                    }                                            
                }

            }
        });
    });

    // Sort band lists
    bandsUsed.bands2G.sort(dataui.sortCompareNumeric);
    bandsUsed.bands3G.sort(dataui.sortCompareNumeric);
    bandsUsed.bandsCat1.sort(dataui.sortCompareNumeric);
    bandsUsed.bandsM1.sort(dataui.sortCompareNumeric);
    bandsUsed.bandsAll.sort(dataui.sortCompareTagBand);

    return bandsUsed;
};

dataui.bandToFrequency = function(band) {
    let bandNum = 0;
    let freq = 0;

    if (typeof band == 'string') {
        if (band.startsWith("B")) {
            bandNum = parseInt(band.substr(1));
        }
        else {
            bandNum = parseInt(band);
        }
    }
    else 
    if (typeof band == 'number') {
        bandNum = band;
    }

    datastore.data.bands.forEach(function(obj) {
        if (obj.band == bandNum) {
            freq = obj.freq;
        }
    });

    return freq;
};



dataui.bandUseChangeHandler = function(tableId, countryList, planKey, modem) {
                
    // Make a map of all of the countries in the countryList by name
    let countryInCountryList = {};
    countryList.forEach(function(obj2) {
        countryInCountryList[obj2.name] = true;
    });

    // Generate a copy of countryCarrier that's filtered by countryInCountryList
    // and also supports our desired plan
    let countryCarrierFiltered = [];
    datastore.data.countryCarrier.forEach(function(obj) {
        if (countryInCountryList[obj.country] && obj[planKey]) {
            countryCarrierFiltered.push(obj);
        }
    });

    // Collect all of the bands used so filtered tables don't have a ridiculous number of columns
    const bandsUsed = dataui.collectModemBands(countryCarrierFiltered, modem.technologies);

    // Generate the HTML
    {
        // Table head
        let html1 = '<tr><th rowspan="3">Country</th><th rowspan="3">Carrier</th>';
        let html2 = '<tr>';
        let html3 = '<tr>';

        bandsUsed.bandsAll.forEach(function(tagBand) {
            const tag = dataui.bandGetTag(tagBand);
            const band = dataui.bandGetBand(tagBand);
            
            if (tag == '2G') {
                html1 += '<th>' + band.toString() + '</th>';
                html3 += '<th>' + band.toString() + '</th>';
            }
            else {
                html1 += '<th>B' + band.toString() + '</th>';
                html3 += '<th>' + dataui.bandToFrequency(band).toString() + '</th>';
            }
            html2 += '<th>' + tag + '</th>';
        });

        html1 += '</tr>\n';
        html2 += '</tr>\n';
        html3 += '</tr>\n';

        $('#' + tableId + ' > thead').html(html1 + html2 + html3);
    }

    {
        // Table body

        let lastCountry = '';
        let evenOdd = false;

        $('#' + tableId + ' > tbody').html('');
        countryCarrierFiltered.forEach(function(obj) {
            let html = '';
            
            if (lastCountry != obj.country) {
                lastCountry = obj.country;
                evenOdd = !evenOdd;
            }

            let trAttr = 'class="' + (evenOdd ? 'bandListStripe ' : '') + '" ';

            html += '<tr ' + trAttr + '><td>' + obj.country + '</td><td>' + obj.carrier + '</td>';

            bandsUsed.bandsAll.forEach(function(tagBand) {
                const tag = dataui.bandGetTag(tagBand);
                const band = dataui.bandGetBand(tagBand);

                let lteTagBand = tagBand.replace('Cat1', 'LTE').replace('M1', 'LTE');

                let cellContents = '&nbsp;';
                let tooltip = '';

                if ((tag == '2G' && obj[planKey].allow2G) ||
                    (tag == '3G' && obj[planKey].allow3G) ||
                    (tag == 'Cat1' && obj[planKey].allowCat1) ||
                    (tag == 'M1' && obj[planKey].allowM1)) {
                    // Allowed by plan

                    if (obj.bands.includes(lteTagBand)) {
                        // This carrier uses the tag (2G, 3G, LTE) and band, and is allowed by plan

                        if (modem.bands.includes(tagBand)) {
                            cellContents = '\u2705'; // Green Check
                        }
                        else {
                            cellContents = '\u274C'; // Red X
                            tooltip = 'band not supported by modem';
                        }
                    }
                    else {
                        // Carrier does not use this band, leave cell blank
                    }

                }
                else {
                    // Not allowed by plan
                    if (obj.bands.includes(lteTagBand)) {
                        // This carrier uses the tag (2G, 3G, LTE) and band, show red X
                        if (modem.bands.includes(tagBand)) {
                            cellContents = '\u274C'; // Red X
                            tooltip = 'band not supported by modem or carrier plan';
                        }
                        else {
                            cellContents = '\u274C'; // Red X
                            tooltip = 'not available on carrier plan';
                        }
                    }
                    else {
                        // Carrier does not use this band, leave cell blank
                        
                    }
                }

                tdExtra = '';
                if (tooltip) {
                    tdExtra += 'title="' + tooltip + '" ';
                }

                html += '<td class="bandListCell" ' + tdExtra + '>' + cellContents + '</td>';
            });    

            html += '</tr>\n';

            $('#' + tableId + ' > tbody').append(html);

        });

        if (countryCarrierFiltered.length == 0) {
            let html = '<tr><td>No coverage</td></tr>\n';
            $('#' + tableId + ' > tbody').append(html);
        }
    }


};

