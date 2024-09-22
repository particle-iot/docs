$(document).ready(function () {
    let apiGlobal = {
        kinds: [],
        apiPartials: [],
        loaders: {
        },
    };

    $('.apiDocs').each(function() {
        const thisPartial = $(this);

        const templateParams = [
            {
                name: 'kind',
                type: 'string',
            },
            {
                name: 'name',
                type: 'string',
            },
            {
                name: 'level',
                type: 'int',
                emptyValue: 4,
            },
        ];

        let apiPartial = {
            elem: thisPartial,
        };
        $(thisPartial).data('obj', apiPartial);
        apiGlobal.apiPartials.push(apiPartial);
        
        for(const templateParam of templateParams) {
            let data;

            data = $(thisPartial).data(templateParam.name);
            if (data == '') {
                data = templateParam.emptyValue;
            }

            switch(templateParam.type) {
                case 'int':
                    apiPartial[templateParam.name] = (typeof data =='string') ? parseInt(data) : data;
                    break;

                default:
                    apiPartial[templateParam.name] = data;
                    break;
            }
        }


        if (!apiGlobal.kinds.includes(apiPartial.kind)) {
            apiGlobal.kinds.push(apiPartial.kind);
        }

        console.log('apiDocs ', apiPartial);
    });

    const appendHeader = function(apiPartial, addLevel, s) {
        const headerElem = document.createElement('h' + (apiPartial.level + addLevel));
        $(headerElem).text(s);
        $(apiPartial.elem).append(headerElem);
    }   
    
    const appendDivText = function(apiPartial, s) {
        const divElem = document.createElement('div');
        $(divElem).text(s);
        $(apiPartial.elem).append(divElem);
    }


    const appendParameterTable = function(apiPartial, tableOptions) {

        const divElem = document.createElement('div');

        const tableElem = document.createElement('table');
        $(tableElem).addClass('apiHelperTableNoMargin');

        const theadElem = document.createElement('thead'); 

        let numColumns = 0;
        {
            const trElem = document.createElement('tr'); 

            for(const colObj of tableOptions.columns) {
                const thElem = document.createElement('th');
                if (colObj.title) {
                    $(thElem).text(colObj.title);
                }
                $(trElem).append(thElem);
                numColumns++;
            }

            $(theadElem).append(trElem);
        }

        $(tableElem).append(theadElem);

        const tbodyElem = document.createElement('tbody');
        $(tableElem).append(tbodyElem);

        const appendRow = function(obj, isInner) {

            const trElem = document.createElement('tr'); 

            for(const colObj of tableOptions.columns) {
                const tdElem = document.createElement('td');

                if (colObj.width) {
                    $(tdElem).css('width', colObj.width);
                }

                let valueText = obj[colObj.key];
                let valueHtml;

                if (typeof valueText != 'undefined') {
                    if (!isInner) {
                        if (!colObj.innerField || colObj.eitherField) {
                        }
                        else {
                            valueText = null;
                        }
                    }
                    else {
                        if (colObj.innerField || colObj.eitherField) {
                        }
                        else {
                            valueText = null;
                        }
                    }    

                    if (colObj.check) {
                        $(tdElem).css('text-align', 'center');
                        if (valueText) {
                            valueHtml = '&check;';
                        }
                    }
                }
                else {
                    valueHtml = '&nbsp;';
                }

                if (valueHtml) {
                    $(tdElem).html(valueHtml);    
                }
                else
                if (valueText) {
                    $(tdElem).text(valueText);    
                }

                $(trElem).append(tdElem);
            }

            $(tbodyElem).append(trElem);

        }


        for(const sectionObj of tableOptions.sections) {

            if (typeof sectionObj.dataArray == 'undefined' && typeof sectionObj.dataObj == 'undefined') {
                continue;
            }
            {
                // Spacer row
                const trElem = document.createElement('tr'); 
                const tdElem = document.createElement('td');
                $(tdElem).attr('colspan', numColumns);
                $(tdElem).css('height', '10px;');
                $(trElem).append(tdElem);
                $(tbodyElem).append(trElem);
            }

            if (sectionObj.title) {
                const trElem = document.createElement('tr'); 

                const tdElem = document.createElement('td');
                $(tdElem).attr('colspan', numColumns);
                if (tableOptions.sectionHeaderCellClass) {
                    $(tdElem).addClass(tableOptions.sectionHeaderCellClass);
                }
                $(tdElem).text(sectionObj.title);

                $(trElem).append(tdElem);
                $(tbodyElem).append(trElem);
            }

            if (typeof sectionObj.dataArray != 'undefined') {
                for(const outerObj of sectionObj.dataArray.fields) {
                    appendRow(outerObj, false);
        
                    if (typeof outerObj.fields != 'undefined') {
                        // Inner fields
                        for(const innerObj of outerObj.fields) {
                            appendRow(innerObj, true);
                        }
                    }
                }    
            }
            else
            if (typeof sectionObj.dataObj != 'undefined') {
                appendRow(sectionObj.dataObj, false);
            }
    
        }


        $(divElem).append(tableElem);

        $(apiPartial.elem).append(divElem);

    }


    apiGlobal.loaders['jsDocs'] = function(apiPartial, apiJson) {
        console.log('apiDocs loadPartial jsDocs', {apiPartial, apiJson});

        const thisApiJson = apiJson.apis.find(e => e.name == apiPartial.name);
        if (!thisApiJson) {
            console.log('apiDocs ' + apiPartial.name + ' not found in apiJson ', apiJson)
        }

        appendHeader(apiPartial, 0, thisApiJson.name);

        appendDivText(apiPartial, thisApiJson.text)

        const tableOptions = {
            columns: [
                {
                    title: 'Name',
                    key: 'name',
                    width: '80px',
                    innerField: false, 
                },
                {
                    title: 'Name',
                    key: 'name',
                    width: '80px',
                    innerField: true, 
                },
                {
                    title: 'Type',
                    key: 'type',
                    width: '90px',
                    eitherField: true, 
                },
                {
                    title: 'Optional',
                    key: 'optional',
                    check: true,
                    eitherField: true, 
                },
                {
                    title: 'Description',
                    key: 'desc',
                    eitherField: true, 
                },
            ],
            sections: [
                {
                    title: 'Parameters',
                    hasInnerObject: true,
                    dataArray: thisApiJson['parameters'],
                },
                {
                    title: 'Properties',
                    hasInnerObject: true,
                    dataArray: thisApiJson['properties'],
                },
                {
                    title: 'Returns',
                    dataObj: thisApiJson['returns'],
                },
            ],
            sectionHeaderCellClass: 'apiDocsTableSectionCell',
        };
        appendParameterTable(apiPartial, tableOptions);
    }


    apiGlobal.loaders['api-service'] = function(apiPartial, apiJson) {
        console.log('apiDocs loadPartial api-service', {apiPartial, apiJson});
    }


    const loadPartial = function(apiPartial) {
        const apiJson = apiGlobal[apiPartial.kind];

        if (apiJson && apiGlobal.loaders[apiPartial.kind]) {
            apiGlobal.loaders[apiPartial.kind](apiPartial, apiJson);
        }
        else {
            console.log('missing loader for ' + kind);
        }

    }

    const load = async function() {
        if (apiGlobal.kinds.length == 0) {
            return;
        }    

        let promises = [];

        // kind with be jsDocs or api-service, corresponding to the JSON files in the generated directory (and assets/files)
        for(const kind of apiGlobal.kinds) {
            promises.push(
                new Promise((resolve, reject) => {
                    try {
                        fetch('/assets/files/' + kind + '.json')
                        .then(response => response.json())
                        .then(function(res) {
                            apiGlobal[kind] = res;
                            resolve();
                        });
                    }
                    catch(e) {
                        reject(e);
                    }
                })
            );
        }

        await Promise.all(promises);

        console.log('apiDocs loaded', apiGlobal);

        for(const apiPartial of apiGlobal.apiPartials) {
            loadPartial(apiPartial);
        }
    };

    load();
});
