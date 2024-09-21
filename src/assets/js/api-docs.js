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

        const theadElem = document.createElement('thead'); 

        {
            const trElem = document.createElement('tr'); 

            for(const colObj of tableOptions.columns) {
                const thElem = document.createElement('th');
                if (colObj.title) {
                    $(thElem).text(colObj.title);
                }
                $(trElem).append(thElem);
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
                if (typeof obj[colObj.key] != 'undefined') {
                    if (!isInner) {
                        if (!colObj.innerField || colObj.eitherField) {
                            $(tdElem).text(obj[colObj.key]);
                        }
                    }
                    else {
                        if (colObj.innerField || colObj.eitherField) {
                            $(tdElem).text(obj[colObj.key]);    
                        }
                    }    
                }
                else {
                    $(tdElem).html('&nbsp;');
                }
                $(trElem).append(tdElem);
            }

            $(theadElem).append(trElem);

        }

        console.log('data', tableOptions.data);

        for(const outerObj of tableOptions.data.fields) {
            appendRow(outerObj, false);

            if (typeof outerObj.fields != 'undefined') {
                // Inner fields
                for(const innerObj of outerObj.fields) {
                    appendRow(innerObj, true);
                }
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

        const keyTitles = {
            parameters: 'Parameters',
            properties: 'Properties',
            returns: 'Returns',
        };

        for(const key of ['parameters', 'properties', 'returns']) {
            if (typeof thisApiJson[key] == 'undefined') {
                continue;
            }
            appendHeader(apiPartial, 1, keyTitles[key]);

            const tableOptions = {
                data: thisApiJson[key],
                hasInnerObject: true,
                columns: [
                    {
                        title: 'Name',
                        key: 'name',
                        innerField: false, 
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        innerField: true, 
                    },
                    {
                        title: 'Type',
                        key: 'type',
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
            };
            appendParameterTable(apiPartial, tableOptions);
        }
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
