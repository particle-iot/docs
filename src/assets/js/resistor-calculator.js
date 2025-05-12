let calculator = {};

$(document).ready(function () {
    // auth not required
    $('.resistorCalculator').each(function() {
        const thisPartial = $(this);

        calculator.partial = thisPartial;

        calculator.decimalStringTruncate = function(value, decimalPlaces) {
            let s = value.toString();

            let dotIndex = s.indexOf('.');
            if (dotIndex > 0) {
                if (decimalPlaces > 0) {
                    s = s.substring(0, dotIndex + decimalPlaces + 1);
                }
                else {
                    s = s.substring(0, dotIndex);
                }
            }

            return s;
        }

        calculator.resistorWithUnits = function(value, options = {}) {
            let unit = '';

            if (value < 1000) {
            }
            else
            if (value < 1000000) {
                value /= 1000;
                unit = 'K';
            }
            else {
                value /= 1000000;
                unit = 'M';
            }
            
            let valueStr = '';

            if (typeof options.truncate != 'undefined') {
                valueStr = calculator.decimalStringTruncate(value, options.truncate);
            }
            else {
                valueStr = value.toString();
            }

            return valueStr + unit + '&ohm;';
        }

        // Common resistor values for 10% and 5%
        calculator.tenPct = [];
        {
            const values = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
            let done = false;
            for(let multiplier = 1; !done; multiplier *= 10) {
                for(const value of values) {
                    const r = value * multiplier;
                    if (r > 1000000) {
                        // 1M
                        done = true;
                        break;
                    }
                    calculator.tenPct.push(r);  
                } 
            }
            // 61 10% resistor values
        }
        calculator.fivePct = [];
        {
            const values = [10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91];
            let done = false;
            for(let multiplier = 1; !done; multiplier *= 10) {
                for(const value of values) {
                    const r = value * multiplier;
                    if (r > 22000000) {
                        // 22M
                        done = true;
                        break;
                    }
                    calculator.fivePct.push(r);  
                } 
            }
            // 153 5% resistor values
        }
        calculator.twoPct = [];
        {
            const values = [
                10.0, 10.5, 11.0, 11.5, 12.1, 12.7, 13.3, 14.0, 14.7, 15.4, 16.2, 16.9, 17.8, 18.7, 19.6, 
                20.5, 21.5, 22.6, 23.7, 24.9, 26.1, 27.4, 28.7, 30.1, 31.6, 33.2, 34.8, 36.5, 38.3, 
                40.2, 42.2, 44.2, 46.4, 48.7, 51.1, 53.6, 56.2, 59.0, 61.9, 64.9, 68.1, 71.5, 75.0, 78.7, 82.5, 86.6, 90.9, 95.3
            ];
            let done = false;
            for(let multiplier = 1; !done; multiplier *= 10) {
                for(const value of values) {
                    const r = value * multiplier;
                    if (r > 1000000) {
                        // 1M
                        done = true;
                        break;
                    }
                    calculator.twoPct.push(r);  
                } 
            }
            // 240 2% resistor values
        }

        calculator.onePct = [];
        {
            const values = [
                10.0, 10.2, 10.5, 10.7, 11.0, 11.3, 11.5, 11.8, 12.1, 12.4, 12.7, 13.0, 13.3, 13.7, 14.0, 14.3, 14.7, 
                15.0, 15.4, 15.8, 16.2, 16.5, 16.9, 17.4, 17.8, 18.2, 18.7, 19.1, 19.6, 20.0, 20.5, 
                21.0, 21.5, 22.1, 22.6, 23.2, 23.7, 24.3, 24.9, 25.5, 26.1, 26.7, 27.4, 28.0, 28.7, 29.4, 
                30.1, 30.9, 31.6, 32.4, 33.2, 34.0, 34.8, 35.7, 36.5, 37.4, 38.3, 39.2, 
                40.2, 41.2, 42.2, 43.2, 44.2, 45.3, 46.4, 47.5, 48.7, 49.9, 51.1, 52.3, 53.6, 54.9, 56.2, 57.6, 59.0, 
                60.4, 61.9, 63.4, 64.9, 66.5, 68.1, 69.8, 71.5, 73.2, 75.0, 76.8, 78.7, 80.6, 82.5, 84.5, 86.6, 88.7, 90.9, 93.1, 95.3, 97.6
            ];
            let done = false;
            for(let multiplier = 1; !done; multiplier *= 10) {
                for(const value of values) {
                    const r = value * multiplier;
                    if (r > 1000000) {
                        // 1M
                        done = true;
                        break;
                    }
                    calculator.onePct.push(r);  
                } 
            }
            // Additional M ohm 1% resistors above 1M.
            for(const r of [1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2]) {
                calculator.onePct.push(r * 1000000);  
            }
            // 489 1% resistor values!
        }
        calculator.parameters = {};


        $(thisPartial).find('[data-group]').each(function() {
            const groupName = $(this).data('group');

            calculator.parameters[groupName] = {
                inputElem: $(this).find('input[type="text"]'),
                unitElem: $(this).find('.resistorUnit'),
                groupName,
            };
        });

        calculator.solve = function() {
            const p = {};

            // Hide rows
            p.solveFor = $(thisPartial).find('input[type="radio"][name="solveFor"]:checked').val();
            p.style = $(thisPartial).find('input[name="style"]:checked').val();
            if (p.style == 'auto') {
                $(thisPartial).find('.autoRow').show();
                $(thisPartial).find('.manualRow').hide();
                
                if (p.solveFor == 'r1' || p.solveFor == 'r2') {
                    $(thisPartial).find('input[type="radio"][name="solveFor"][value="vout"]').prop('checked', true);
                }
            }
            else {
                $(thisPartial).find('.autoRow').hide();
                $(thisPartial).find('.manualRow').show();
            }
            p.solveFor = $(thisPartial).find('input[type="radio"][name="solveFor"]:checked').val();
            p.solveForElem = calculator.parameters[p.solveFor].inputElem;

            for(const groupName in calculator.parameters) {
                p[groupName] = parseFloat($(calculator.parameters[groupName].inputElem).val());
                if (calculator.parameters[groupName].unitElem.length) {
                    const multiplier = parseFloat($(calculator.parameters[groupName].unitElem).val());
                    p[groupName] *= multiplier;
                }
            }

            if (p.style == 'auto') {
                // Auto
                p.useKey = $(thisPartial).find('input[name="use"]:checked').val();
                p.rmin *= 1000; 
                p.rmax *= 1000;

                // nearest, above, below
                p.show = $(thisPartial).find('input[name="show"]:checked').val();

                p.resToTry = [];
                for(const r of calculator[p.useKey]) {
                    if (r >= p.rmin && r <= p.rmax) {
                        p.resToTry.push(r);
                    }
                }

                $(thisPartial).find('.autoResults > tbody').empty();


                p.results = [];

                for(const r1 of p.resToTry) {
                    const resultR1 = {
                        r1,
                    };

                    for(const r2 of p.resToTry) {
                        let result;
                        let delta;

                        switch(p.solveFor) {
                            case 'vin':
                                result = (p.vout * (r1 + r2)) / r2;
                                delta = result - p.vin;
                                break;
                
                            case 'vout': 
                                result = (p.vin * r2) / (r1 + r2);
                                delta = result - p.vout;
                                break;
                        }

                        switch(p.show) {
                            case 'above':
                                if (delta >= 0) {
                                    if (typeof resultR1.delta == 'undefined' || delta < resultR1.delta) {
                                        resultR1.r2 = r2;
                                        resultR1.result = result;
                                        resultR1.delta = delta;
                                    }
                                }
                                break;

                            case 'below':
                                if (delta <= 0) {
                                    if (typeof resultR1.delta == 'undefined' || -delta < -resultR1.delta) {
                                        resultR1.r2 = r2;
                                        resultR1.result = result;
                                        resultR1.delta = delta;
                                    }                                    
                                }
                                break;

                            case 'nearest':
                                if (typeof resultR1.delta == 'undefined' || Math.abs(delta) < Math.abs(resultR1.delta)) {
                                    resultR1.r2 = r2;
                                    resultR1.result = result;
                                    resultR1.delta = delta;
                                }
                                break;        
                        }
                    }
                    if (typeof resultR1.delta != 'undefined') {
                        switch(p.solveFor) {
                            case 'vin':
                                resultR1.deltaPct = resultR1.delta * 100 / p.vin;
                                break;
                
                            case 'vout': 
                                resultR1.deltaPct = resultR1.delta * 100 / p.vout;                                
                                break;
                        }
                        // V = IR 
                        // I = V/R
                        resultR1.ir1 = (p.vin - p.vout) / p.r1;
                        resultR1.wr1 = (p.vin - p.vout) * resultR1.ir1;

                        resultR1.ir2 = p.vout / p.r2;
                        resultR1.wr2 = p.vout * resultR1.ir2;

                        if (Math.abs(resultR1.deltaPct) < 10) {
                            p.results.push(resultR1);
                        }
                    }                    
                }
                p.results.sort(function(a, b) {
                    // Sort by ascending abs(delta)
                    let cmp = Math.abs(a.delta) - Math.abs(b.delta);
                    if (cmp != 0) {
                        return cmp;
                    }
                    // Then ascending R1
                    cmp = a.r1 - b.r1;

                    return cmp;
                });


                switch(p.solveFor) {
                    case 'vin':
                        $(thisPartial).find('th.autoV').html('V<sub>in</sub>');
                        break;
        
                    case 'vout': 
                        $(thisPartial).find('th.autoV').html('V<sub>out</sub>');
                        break;
                }

                for(const result of p.results) {
                    const trElem = document.createElement('tr');

                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).html(calculator.resistorWithUnits(result.r1, {truncate:1}));
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).html(calculator.resistorWithUnits(result.r2, {truncate:1}));
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text(calculator.decimalStringTruncate(result.result, 3) + 'V');
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text(calculator.decimalStringTruncate(result.delta, 3) + 'V');
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text(calculator.decimalStringTruncate(result.deltaPct, 2) + ' %');
                        $(trElem).append(tdElem);
                    }
                    /*
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text(calculator.decimalStringTruncate(result.ir1, 3) + 'A (' + calculator.decimalStringTruncate(result.wr1, 3) + 'W)');
                        $(trElem).append(tdElem);
                    }
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).text(calculator.decimalStringTruncate(result.ir2, 3) + 'A (' + calculator.decimalStringTruncate(result.wr2, 3) + 'W)');
                        $(trElem).append(tdElem);
                    }
                    */

                    $(thisPartial).find('.autoResults > tbody').append(trElem);
                }


                $(thisPartial).find('.autoResults').show();
            }
            else {
                // Manual
                let result;
                let decimalPlaces = 0;

                switch(p.solveFor) {
                    case 'vin':
                        result = (p.vout * (p.r1 + p.r2)) / p.r2;
                        decimalPlaces = 3;
                        break;

                    case 'r1':
                        result = p.r2 * ((p.vin / p.vout) - 1);
                        decimalPlaces = 1;
                        break;

                    case 'r2':
                        result = p.r1 * 1 / ((p.vin / p.vout) - 1);
                        decimalPlaces = 1;
                        break;

                    case 'vout': 
                        result = (p.vin * p.r2) / (p.r1 + p.r2);
                        decimalPlaces = 3;
                        break;
                }
                result = calculator.decimalStringTruncate(result, decimalPlaces);

                $(p.solveForElem).val(result);

                $(thisPartial).find('.autoResults').hide();
            }

            // console.log('solve', p);
        };

        $(thisPartial).find('input[name="style"]').on('click', calculator.solve);
        $(thisPartial).find('input[name="use"]').on('click', calculator.solve);
        $(thisPartial).find('input[name="show"]').on('click', calculator.solve);


        $(thisPartial).find('.inputText').on('input blur', calculator.solve);

        $(thisPartial).find('input[name="solveFor"]').on('click', calculator.solve);

        $(thisPartial).find('.resistorUnit').each(function() {
            const units = [
                {
                    title: 'ohm',
                    value: "1",
                },
                {
                    title: 'K ohm',
                    value: "1000",
                },
                {
                    title: 'M ohm',
                    value: "1000000",
                },
            ]; 
            for(const unitObj of units) {
                const optionElem = document.createElement('option');

                $(optionElem).text(unitObj.title);
                $(optionElem).attr('value', unitObj.value);

                $(this).append(optionElem);
            }
            $(this).val("1");
            $(this).on('change', calculator.solve);
        });
        calculator.solve();

        // console.log('calculator', calculator);
    });
});