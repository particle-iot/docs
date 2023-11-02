$(document).ready(function() {
    const eventCategory = 'sunset-tool';


    datastore.init({path:'/assets/files/carriers.json'}, function() {

        $('.sunsetTool').each(function() {
            const thisPartial = $(this);
    
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
            
            let excludeModems = [];
            for(const modemObj of datastore.data.modems) {
                if (!modemObj.technologies.includes('Cat1')) {
                    excludeModems.push(modemObj.model);
                }
            }

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
