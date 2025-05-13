$(document).ready(function() {
    const eventCategory = 'sunset-tool';

    let sunsetTool = {
        options: {},
        countryCarrier: [],
    };

    sunsetTool.dateParse = function(s) {
        let result = {
            year: 2023,
            month: 1,
        };

        let parts = s.split('-');
        if (parts.length >= 1) {
            result.year = parseInt(parts.shift());
        }
        if (parts.length >= 1) {
            result.month = parseInt(parts.shift());
        }
        if (parts.length >= 1) {
            result.day = parseInt(parts.shift());
        }

        result.toString = function() {
            if (result.month < 10) {
                return result.year + '-0' + result.month;
            }
            else {
                return result.year + '-' + result.month;
            }
        }
        result.dateAdd = function(monthIncrement) {
            result.month += monthIncrement;
            while(result.month > 12) {
                result.month -= 12;
                result.year++;
            }
        }
        result.clone = function() {
            return sunsetTool.dateParse(result.toString());
        }

        result.months = function() {
            return result.year * 12 + result.month;
        }
            
        return result;
    };

    sunsetTool.dateCompare = function(yearMonth1, yearMonth2) {
        const m1 = yearMonth1.months();
        const m2 = yearMonth2.months();
        
        if (m1 < m2) {
            return -1;
        }
        else
        if (m1 > m2) {
            return +1;
        }
        else {
            return 0;
        }
    }


    datastore.init({path:'/assets/files/carriers.json'}, function() {

        $('.sunsetList').each(function() {
            const thisPartial = $(this);

            const columns = [
                {
                    key: 'date',
                },
                {
                    key: 'country',
                },
                {
                    // carrier sunset
                    fn: function(sunsetObj, tdElem) {
                  
                    },
                },
                {
                    // remaining carriers
                    fn: function(sunsetObj, tdElem) {
                        
        
                        // $(tdElem).text(carrierNames.join(', '));
                    },
                },
            ];

            const sunsetList = {
                thisPartial, 
                options: {},               
            };
            $(thisPartial).data('sunsetList', sunsetList);

            for(const pair of $(thisPartial).data('options').split(',')) {
                const parts = pair.split('=', 2);
                if (parts.length >= 1) {
                    if (parts.length == 1) {
                        sunsetList.options[parts[0].trim()] = true;
                    }
                    else {
                        sunsetList.options[parts[0].trim()] = parts[1].trim();
                    }
                }
            }  
            


            sunsetList.updateTable = function(options = {}) {
                // options
                //  .includeCountries (array): array of countries to display

                const tableElem = $(thisPartial).find('.sunsetListTable');
                const tbodyElem = $(tableElem).find('tbody');
    
                $(tbodyElem).empty();
    
                let numAdded = 0;

                let columns = [];
                columns.push({
                    title: '',
                    special: 'marker',
                });

                // datastore.data.sunset is sorted by date descending
                let sunsetArray;
                if (options.byCountry) {
                    // Shallow copy array
                    sunsetArray = [];
                    for(const sunsetObj of datastore.data.sunset) {
                        sunsetArray.push(sunsetObj);
                    }
                    // Sort by country
                    sunsetArray.sort(function(a, b) {
                        let cmp = a.country.localeCompare(b.country);
                        if (cmp) {
                            return cmp;
                        }
                        cmp = a.date.localeCompare(b.date);
                        return -cmp;
                    });

                    columns.push({
                        title: 'Country',
                        key: 'country',
                    });
                    columns.push({
                        title: 'Date',
                        key: 'date',
                    });
                }
                else {
                    sunsetArray = datastore.data.sunset; 

                    columns.push({
                        title: 'Date',
                        key: 'date',
                    });
                    columns.push({
                        title: 'Country',
                        key: 'country',
                    });

                }

                columns.push({
                    title: 'Carrier Sunset',
                    special: 'sunset',
                });
                columns.push({
                    title: 'Remaining 2G/3G Carriers',
                    special: 'carriersLeft',
                });

                const headerRowElem = $(sunsetList.thisPartial).find('.sunsetListTable > table > thead > tr');
                $(headerRowElem).empty();
                for(const columnObj of columns) {
                    const thElem = document.createElement('th');
                    if (columnObj.title) {
                        $(thElem).text(columnObj.title);
                    }
                    $(headerRowElem).append(thElem);
                }


                for(const sunsetObj of sunsetArray) {
                    if (options.includeCountries) {
                        if (!options.includeCountries.includes(sunsetObj.country)) {
                            continue;
                        }
                    }

                    numAdded++;
                    const trElem = document.createElement('tr');
    
                    let markerElem;

                    for(const columnObj of columns) {
                        const tdElem = document.createElement('td');

                        if (columnObj.key) {
                            $(tdElem).text(sunsetObj[columnObj.key]);
                        }
                        else 
                        if (columnObj.special) {
                            if (columnObj.special == 'marker') {
                                markerElem = tdElem;
                                $(markerElem).css('width', '3px');
                            }
                            else
                            if (columnObj.special == 'sunset') {
                                // Sunset carriers
                                let carriers = {};
            
                                for(let ii = 0; ii < sunsetObj.items.length; ii++) {
                                    const itemObj = sunsetObj.items[ii];
                                    if (!carriers[itemObj.carrier]) {
                                        carriers[itemObj.carrier] = [];
                                    }
                                    carriers[itemObj.carrier].push(itemObj.rat);
                                }
                                const carrierNames = Object.keys(carriers);
            
                                for(let ii = 0; ii < carrierNames.length; ii++) {                            
                                    const rats = carriers[carrierNames[ii]];
                                    $(tdElem).append(document.createTextNode(carrierNames[ii]));
            
                                    const supElem = document.createElement('sup');
                                    let s = '';
                                    for(const r of rats) {
                                        s += r.substring(0, 1);
                                    }
                                    $(supElem).text(s);
                                    $(tdElem).append(supElem);
            
                                    if ((ii + 1) < sunsetObj.items.length) {
                                        $(tdElem).append(document.createTextNode(', '));
                                    }
                                }    
                            }
                            else
                            if (columnObj.special == 'carriersLeft') {
                                // Remaining carriers            
                                let carriers = {};
            
                                for(const rat of ['2G', '3G']) {
                                    for(const c of sunsetObj[rat]) {
                                        if (!carriers[c]) {
                                            carriers[c] = [];
                                        }
                                        carriers[c].push(rat);
                                    }
                                }
            
                                let carrierNames = Object.keys(carriers);
                                carrierNames.sort();
            
            
                                for(let ii = 0; ii < carrierNames.length; ii++) {
                                    const carrierName = carrierNames[ii];
            
                                    $(tdElem).append(document.createTextNode(carrierName));
            
                                    for(const rat of carriers[carrierName]) {
                                        const supElem = document.createElement('sup');
                                        $(supElem).text(rat.substring(0,1));
                                        $(tdElem).append(supElem);
                                    }
            
                                    if ((ii + 1) < carrierNames.length) {
                                        $(tdElem).append(document.createTextNode(', '));
                                    }
            
                                }
            
                                if (carrierNames.length == 0) {
                                    const iElem = document.createElement('i');
                                    $(iElem).text('None');
                                    $(tdElem).append(iElem);
                                    $(markerElem).css('background-color', '#FFE949'); // COLOR_State_Yellow_500
                                    // $(tdElem).css('background-color', '#FFADBD'); // COLOR_Watermelon_400
                                    // $(tdElem).css('background-color', '#FFBC80'); // COLOR_State_Orange_500
                                }
                            }
                        }

                        $(trElem).append(tdElem);                        
                    }
        
                
                    $(tbodyElem).append(trElem);
                }

                if (sunsetList.options.showNonEmpty && !options.isPageLoad) {
                    if (numAdded) {
                        $(thisPartial).show();
                    }
                    else {
                        $(thisPartial).hide();
                    }
                }

                if (!sunsetList.options.hidden) {
                    $(thisPartial).show();
                }
            }

            let updateTableOptions = {
                isPageLoad: true,
            };

            if (sunsetList.options.country) {
                updateTableOptions.includeCountries = [sunsetList.options.country];
            }
            if (sunsetList.options.byCountry) {
                updateTableOptions.byCountry = true;
            }

            sunsetList.updateTable(updateTableOptions);
        });

        $('.sunsetTool').each(function() {
            const thisPartial = $(this);
    
    
            for(const pair of $(thisPartial).data('options').split(',')) {
                const parts = pair.split('=', 2);
                if (parts.length >= 1) {
                    if (parts.length == 1) {
                        sunsetTool.options[parts[0].trim()] = true;
                    }
                    else {
                        sunsetTool.options[parts[0].trim()] = parts[1].trim();
                    }
                }
            }  
        
            sunsetTool.timelineStart = sunsetTool.dateParse('2016-06');
            sunsetTool.timelineEnd = sunsetTool.dateParse('2026-06');

            sunsetTool.sunsetTimelineDivElem = $(thisPartial).find('.sunsetTimelineDiv');
            sunsetTool.canvasElem = $(thisPartial).find('.sunsetTimelineDiv > canvas');
            //sunsetTool.Elem = $(thisPartial).find('.');
    
            sunsetTool.countryObj = datastore.findCountryByName(sunsetTool.options.country);
            if (!sunsetTool.countryObj) {
                console.log('unknown country', sunsetTool.options.country);
                return;
            }
            for(const ccObj of datastore.data.countryCarrier) {
                if (ccObj.country == sunsetTool.options.country) {
                    if (ccObj.timeline) {
                        sunsetTool.countryCarrier.push(ccObj);
                    }
                }
            }
                
    
            sunsetTool.drawTimeline = function() {
                let draw = {
                    width: $(sunsetTool.canvasElem).width(),
                    height: $(sunsetTool.canvasElem).height(),
                    barHeight: 15,
                    maxCarriers: 4,
                    rats: [
                        {
                            key: '2G', 
                            colors: [
                                '#FA6200', // COLOR_Tangerine_600
                                '#FF9F61', // COLOR_Tangerine_400
                            ],
                        },
                        {
                            key: '3G', 
                            colors: [
                                '#5FD898', // COLOR_Mint_700
                                '#B0E5C9', // COLOR_Mint_500
                            ],
                        },
                    ],
                    topMargin: 10,
                    bottomMargin: 10,
                    leftMargin: 15,
                    barsToLabels: 10,
                    graphX: 80,
                    numCarriers: sunsetTool.countryCarrier.length,
                    betweenRatMargin: 10,
                    lineToCarrierLabelX: 4,
                    bottomToCarrierLabelY: -2,
                    labelHeight: 60,
                    labelMonthIncrement: 6,
                    pixelsPerLabelX: 30, // This must be a multiple of labelMonthIncrement
                    labels: [],
                }

                draw.pixelsPerMonth = Math.floor(draw.pixelsPerLabelX / draw.labelMonthIncrement);

                draw.labelTop = draw.topMargin + draw.rats.length * ((draw.numCarriers * draw.barHeight) + draw.betweenRatMargin) + draw.barsToLabels;
                draw.totalHeight = draw.labelTop + draw.labelHeight + draw.bottomMargin;
                $(sunsetTool.canvasElem.prop('height', draw.totalHeight));
    

                const ctx = $(sunsetTool.canvasElem)[0].getContext("2d");
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, draw.width, draw.height);
                ctx.fillStyle = "#000000";
                ctx.font = '12px Arial';

                let top = draw.topMargin;
                for(let rat of draw.rats) {
                    rat.top = top;
                    rat.bottom = top + draw.numCarriers * draw.barHeight; 

                    // RAT color bar on left edge
                    {
                        ctx.save();

                        ctx.beginPath();
                        ctx.moveTo(draw.leftMargin, rat.top);
                        ctx.lineTo(draw.leftMargin, rat.bottom);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = rat.colors[0];
                        ctx.stroke();
    
                        ctx.restore();    
                    }

                    // RAT label
                    {
                        ctx.save();

                        ctx.fillStyle = rat.colors[0];;
                        ctx.translate(draw.leftMargin - 2, (rat.top + rat.bottom) / 2);
                        ctx.rotate(-Math.PI/2);
                        ctx.textAlign = 'center';
                        ctx.fillText(rat.key, 0, 0);
    
                        ctx.restore();    
                    }

                    // Carrier labels per RAT
                    rat.carriers = [];
                    for(let ii = 0; ii < sunsetTool.countryCarrier.length; ii++) {
                        let ccObj = sunsetTool.countryCarrier[ii];

                        let obj = {
                            ccObj,
                            top: rat.top + ii * draw.barHeight,
                            bottom: rat.top + (ii + 1) * draw.barHeight, 
                        }
                        ctx.save();
                        ctx.textAlign = 'left';
                        ctx.fillText(ccObj.carrier, draw.leftMargin + draw.lineToCarrierLabelX, obj.bottom + draw.bottomToCarrierLabelY);
                        ctx.restore();    


                        rat.carriers[ii] = obj;
                    }


                    top = rat.bottom + draw.betweenRatMargin;
                }


                // Bars are per-carrier and 15px high. Leave room for 4.
                // Two sets, one for 2G, one for 3G


                {
                    // Current width is 700px
                    // Current start and end are 10 years or 120 months
                    // Labels can be quarterly and fit reasonably

                    let labelX = draw.graphX;
                    let labelDate = sunsetTool.timelineStart.clone();

                    while(sunsetTool.dateCompare(labelDate, sunsetTool.timelineEnd) <= 0) {
                        let obj = {
                            left: labelX,
                            date: labelDate,
                        }
                        // https://stackoverflow.com/questions/3167928/drawing-rotated-text-on-a-html5-canvas

                        ctx.save();

                        ctx.translate(labelX - 4, draw.labelTop);
                        ctx.rotate(Math.PI/2);
                        ctx.textAlign = 'left';
                        ctx.fillText(labelDate.toString(), 0, 0);

                        ctx.restore();

                        draw.labels.push(obj);

                        labelDate.dateAdd(draw.labelMonthIncrement);
                        labelX += draw.pixelsPerLabelX;
                    }
                }

                // Draw graphs
                for(const rat of draw.rats) {
                    for(let ii = 0; ii < sunsetTool.countryCarrier.length; ii++) {
                        const ccObj = sunsetTool.countryCarrier[ii];
                        
                        if (typeof ccObj.timeline[rat.key] == 'undefined') {
                            continue;
                        }

                        let date = sunsetTool.timelineStart.clone();
                        for(const item of ccObj.timeline[rat.key]) {
                            let endDate;
                            if (item.end) {
                                endDate = sunsetTool.dateParse(item.end);
                            }
                            else {
                                endDate = sunsetTool.timelineEnd.clone();
                            }

                            let graph = {
                            };
                            graph.leftMonth = date.months() - sunsetTool.timelineStart.months();
                            graph.leftX = draw.graphX + graph.leftMonth * draw.pixelsPerMonth;

                            graph.rightMonth = endDate.months() - sunsetTool.timelineStart.months();
                            graph.rightX = draw.graphX + graph.rightMonth * draw.pixelsPerMonth;

                            let color;
                            switch(item.state) {
                                case 'diminished':
                                    color = rat.colors[1];
                                    break;

                                case 'active':
                                default:
                                    color = rat.colors[0];
                                    break;
                            }

                            if (graph.leftX < graph.rightX) {
                                ctx.save();

                                ctx.fillStyle = color;
                                ctx.fillRect(graph.leftX, rat.top + draw.barHeight * ii, graph.rightX - graph.leftX, draw.barHeight - 1);                                

                                ctx.restore();
                            }


                            date = endDate;
                        }
                    }
                }
                sunsetTool.draw = draw;
            };
            sunsetTool.drawTimeline();
    

            // Device list
            let showItems = [];

            for(const familyObj of datastore.data.skuFamily) {
                if (!familyObj.group) {
                    continue;
                }

                for(const groupItem of familyObj.group) {
                    const modemObj = datastore.findModemByModel(groupItem.modem);

                    let includeInList = true;
                    for(const tech of modemObj.technologies) {
                        if (tech != '2G' && tech != '3G') {
                            // Is M1 or Cat1
                            includeInList = false;
                        }
                    }
                    if (includeInList) {
                        let obj = Object.assign({}, groupItem);                        
                        obj.familyObj = familyObj;
                        obj.modemObj = modemObj;
                        obj.simPlanObj = datastore.findSimPlanById(groupItem.simPlan);
                        obj.countryCarrierKey = obj.simPlanObj.countryCarrierKey;

                        /*
                        obj.carriers = [];
                        for(const ccObj of sunsetTool.countryCarrier) {
                            if (ccObj[obj.countryCarrierKey]) {
                                obj.carriers.push(ccObj);
                            }
                        }
                        */
                        showItems.push(obj);                                            
                    }
                }
            }

            for(const ccObj of sunsetTool.countryCarrier) {
                const thElem = document.createElement('th');
                $(thElem).text(ccObj.carrier);
                $(thisPartial).find('.sunsetDeviceSupportTable > thead > tr').append(thElem);
            }

            for(const obj of showItems) {
                const trElem = document.createElement('tr');
                {
                    const tdElem = document.createElement('td');
                    $(tdElem).text(obj.name);
                    $(trElem).append(tdElem);
                }
                for(const ccObj of sunsetTool.countryCarrier) {
                    const tdElem = document.createElement('td');

                    if (ccObj[obj.countryCarrierKey]) {
                        // This carrier is supported on this device
                        let bands = [];
                        let techList = [];

                        for(const b of ccObj.bands) {
                            if (!obj.modemObj.bands.includes(b)) {
                                continue;
                            }
                            const tech = b.split('-', 1)[0];
                            if (!ccObj[obj.countryCarrierKey]['allow' + tech]) {
                                continue;
                            }
                            bands.push(b);
                            if (!techList.includes(tech)) {
                                techList.push(tech);
                            }
                        }
                        $(tdElem).attr('title', bands.join(', '));
                        $(tdElem).text(techList.join(', '));
                    }

                    $(trElem).append(tdElem);
                }

                $(thisPartial).find('.sunsetDeviceSupportTable > tbody').append(trElem);
            }
            
            // This is temporary to exclude these models for UK and AU/NZ. Make this generic in the future.
            let excludeModems = ['EG91-NAX', 'EG800Q-NA'];
            for(const modemObj of datastore.data.modems) {
                if (!modemObj.technologies.includes('4G')) {
                    excludeModems.push(modemObj.model);
                }
            }
            console.log('excludeModems', excludeModems);

            // 
            for(const skuObj of datastore.data.skus) {
                if (!skuObj.modem) {
                    continue;
                }
                if (excludeModems.includes(skuObj.modem)) {
                    continue;
                }
                if (skuObj.lifecycle == 'Hidden' || skuObj.lifecycle == 'Deprecated' || skuObj.lifecycle == 'End of life') {
                    continue;
                }

                const trElem = document.createElement('tr');

                {
                    const tdElem = document.createElement('td');
                    $(tdElem).text(skuObj.name);
                    $(trElem).append(tdElem);
                }
                {
                    const tdElem = document.createElement('td');
                    $(tdElem).css('max-width', '380px');
                    $(tdElem).text(skuObj.desc);
                    $(trElem).append(tdElem);
                }
                {
                    const tdElem = document.createElement('td');
                    $(tdElem).text(skuObj.lifecycle);
                    $(trElem).append(tdElem);
                }
                {
                    const tdElem = document.createElement('td');
                    if (skuObj.replacement) {
                        $(tdElem).text(skuObj.replacement);
                    }
                    $(trElem).append(tdElem);
                }

                $(thisPartial).find('.sunsetDeviceSkuTable > tbody').append(trElem);                
            }            

        });
    });


});
