$(document).ready(function() {

    let pinInfo;

    const pinInfoPromise = new Promise((resolve,reject) => {
        fetch('/assets/files/pinInfo.json')
            .then(response => response.json())
            .then(function(data) {
                pinInfo = data;
                resolve();
            });
    });

    const columnStyles = {
        hat: [
            {
                title: 'Pin',
                mapping: 'num',
            },
            {
                title: 'Hat Description',
                mapping: 'name',
            },
            {
                title: 'Pi Pin Name',
                pinInfo: 'rpi',
            },
            {
                title: 'Particle Pin Name',
                pinInfo: 'name',
            },
        ],
    };
    // | Symbol | Raspberry Pi Pin | Muon Pin | Description |


    const run = async function(pinsPartialObj) {
        await pinInfoPromise;

        pinsPartialObj.pinInfo = pinInfo.platforms.find(e => e.name == pinsPartialObj.platform);


        const mappingsStr = $(pinsPartialObj.elem).data('mappings');
        for(const pinDef of mappingsStr.split(',')) {
            const equalIndex = pinDef.indexOf('=');
            if (equalIndex > 0) {
                const key = pinDef.substring(0, equalIndex).trim();
                const value = pinDef.substring(equalIndex + 1).trim();

                const m1 = key.match(/^([0-9]+)$/);
                if (m1) {
                    pinsPartialObj.mappings.push({
                        num: parseInt(m1[1]),
                        name: value,
                    });    
                }

                const m2 = key.match(/^GPIO([0-9]+)$/);
                if (m2) {
                    const gpioNum = parseInt(m2[1]);

                    const tempPinInfo = pinsPartialObj.pinInfo.pins.find(e => e.rpiGPIO == gpioNum);

                    pinsPartialObj.mappings.push({
                        num: tempPinInfo.num,
                        name: value,
                    });    
                }

            }
        }

        const styleStr = $(pinsPartialObj.elem).data('style');
        for(const styleDef of styleStr.split(',')) {
            const equalIndex = styleDef.indexOf('=');
            if (equalIndex > 0) {
                const key = styleDef.substring(0, equalIndex).trim();
                const value = styleDef.substring(equalIndex + 1).trim();

                pinsPartialObj.style[key] = value;
            }
        }

        for(const mappingObj of pinsPartialObj.mappings) {
            mappingObj.pinInfo = pinsPartialObj.pinInfo.pins.find(e => e.num == mappingObj.num);
        }

        pinsPartialObj.mappings.sort((a, b) => a.num - b.num);

        pinsPartialObj.columnStyle = columnStyles[pinsPartialObj.style.columns];

        console.log('pins run', pinsPartialObj);

        const tableElem = document.createElement('table');

        const theadElem = document.createElement('thead');
        {
            const trElem = document.createElement('tr');
            
            for(const colObj of pinsPartialObj.columnStyle) {
                const thElem = document.createElement('th');
                $(thElem).text(colObj.title);
                $(trElem).append(thElem);
            }

            $(theadElem).append(trElem);
        }

        $(tableElem).append(theadElem);

        const tbodyElem = document.createElement('tbody');
        for(const mappingObj of pinsPartialObj.mappings) {
            const trElem = document.createElement('tr');


            for(const colObj of pinsPartialObj.columnStyle) {
                const tdElem = document.createElement('td');

                console.log('mapping', {mappingObj, colObj});

                let text = '';

                if (typeof colObj.mapping != 'undefined') {
                    text = mappingObj[colObj.mapping];
                }
                else 
                if (typeof colObj.pinInfo != 'undefined') {
                    text = mappingObj.pinInfo[colObj.pinInfo];
                }


                $(tdElem).text(text);
                $(trElem).append(tdElem);
            }
            

            $(tbodyElem).append(trElem);
        }

        $(tableElem).append(tbodyElem);

        $(pinsPartialObj.elem).html(tableElem);
    }

    $('.apiHelperPins').each(function() {
        const thisPartial = $(this);

        let pinsPartialObj = {
            elem: thisPartial,
            mappings: [],
            style: {},
        };
        
        pinsPartialObj.platform = $(thisPartial).data('platform');

        run(pinsPartialObj);
    });

});

