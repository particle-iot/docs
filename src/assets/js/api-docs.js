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

    const removeParagraphTags = function(s) {
        return s.replaceAll(/<[\/]*p>/gi, '');
    }

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

    const appendDivHtml = function(apiPartial, s) {
        const divElem = document.createElement('div');
        $(divElem).html(s);
        $(apiPartial.elem).append(divElem);
    }

    const appendHandlers = {
        appendParameterTable: function(apiPartial, tableOptions) {

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
                    if (colObj.optional || colObj.check) {
                        $(thElem).css('text-align', 'center');
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

                        if (colObj.optional) {
                            $(tdElem).css('text-align', 'center');
                            if (valueText) {
                                valueText = 'optional';
                            }
                        }
                        else
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

                    if (colObj.html) {
                        valueHtml = valueText;
                        valueText = null;

                        if (colObj.removeParagraphTags) {
                            valueHtml = removeParagraphTags(valueHtml);
                        }
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

            if (typeof tableOptions.dataArray != 'undefined') {
                for(const outerObj of tableOptions.dataArray) {
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
            if (typeof tableOptions.dataObj != 'undefined') {
                appendRow(tableOptions.dataObj, false);
            }
            

            $(divElem).append(tableElem);

            $(apiPartial.elem).append(divElem);

        },
        appendExamples: function(apiPartial, tableOptions) {
            if (!tableOptions.dataArray) {
                return;
            }

            for(const exampleObj of tableOptions.dataArray) {
                const divElem = document.createElement('div');
                $(divElem).css('margin-top', '10px');
                $(divElem).text('Example: ' + exampleObj.title);
                $(apiPartial.elem).append(divElem);

                const preElem = document.createElement('pre');
                const codeElem = document.createElement('code');
                $(codeElem).addClass('prettyprint');
                if (exampleObj.lang) {
                    $(codeElem).addClass('lang-' + exampleObj.lang);
                }
                $(codeElem).text(exampleObj.content);
                $(preElem).append(codeElem);

                $(apiPartial.elem).append(preElem);
            }
        },
        appendRequestDefinition: function(apiPartial, tableOptions) {
            const divElem = document.createElement('div');
            $(divElem).css('margin-top', '10px');
            $(apiPartial.elem).append(divElem);

            const preElem = document.createElement('pre');
            const codeElem = document.createElement('code');
            $(codeElem).addClass('prettyprint');
            $(codeElem).text(tableOptions.thisApiJson.type.toUpperCase() + ' ' + tableOptions.thisApiJson.url);
            $(preElem).append(codeElem);

            $(apiPartial.elem).append(preElem);
        }
    };

    apiGlobal.loaders['jsDocs'] = function(apiPartial, apiJson) {
        console.log('apiDocs loadPartial jsDocs', {apiPartial, apiJson});

        const thisApiJson = apiJson.apis.find(e => e.name == apiPartial.name);
        if (!thisApiJson) {
            console.log('apiDocs ' + apiPartial.name + ' not found in apiJson ', apiJson)
        }

        appendHeader(apiPartial, 0, thisApiJson.name);

        appendDivText(apiPartial, thisApiJson.text)

        const sections = [
            {
                title: 'Parameters',
                hasInnerObject: true,
                dataArray: typeof thisApiJson['parameters'] != 'undefined' ? thisApiJson['parameters'].fields : undefined,
                dataType: 'appendParameterTable',
            },
            {
                title: 'Properties',
                hasInnerObject: true,
                dataArray: typeof thisApiJson['properties'] != 'undefined' ? thisApiJson['properties'].fields : undefined,
                dataType: 'appendParameterTable',
            },
            {
                title: 'Returns',
                dataObj: thisApiJson['returns'],
                isReturns: true,
                dataType: 'appendParameterTable',
            },
        ];

        for(const sectionObj of sections) {
            if (typeof sectionObj.dataArray == 'undefined' && typeof sectionObj.dataObj == 'undefined') {
                continue;
            }

            appendHeader(apiPartial, 1, sectionObj.title + ' - ' + thisApiJson.name);

            const tableOptions = {
                dataArray: sectionObj.dataArray,
                dataObj: sectionObj.dataObj,
                columns: [
                    {
                        title: sectionObj.isReturns ? '' : 'Name',
                        key: 'name',
                        width: '80px',
                        innerField: false, 
                    },
                    {
                        title: sectionObj.isReturns ? '' : 'Field',
                        key: 'name',
                        width: '80px',
                        innerField: true, 
                    },
                    {
                        title: 'Type',
                        key: 'type',
                        width: '60px',
                        eitherField: true, 
                    },
                    {
                        title: sectionObj.isReturns ? '' : 'Array',
                        key: 'isArray',
                        check: true,
                        width: '50px',
                        eitherField: true, 
                    },
                    {
                        title: sectionObj.isReturns ? '' : 'Optional',
                        key: 'optional',
                        optional: true,
                        width: '60px',
                        eitherField: true, 
                    },
                    {
                        title: 'Description',
                        key: 'desc',
                        eitherField: true, 
                    },
                ],
            };
            appendHandlers[sectionObj.dataType](apiPartial, tableOptions); 
        }
    }


    apiGlobal.loaders['api-service'] = function(apiPartial, apiJson) {
        console.log('apiDocs loadPartial api-service', {apiPartial, apiJson});
        const thisApiJson = apiJson.find(e => e.name == apiPartial.name);
        if (!thisApiJson) {
            console.log('apiDocs ' + apiPartial.name + ' not found in apiJson ', apiJson)
        }

        const sections = [
            {
                title: 'Request Definition',
                dataType: 'appendRequestDefinition',
            },
            {
                title: 'Request URL parameters',
                dataArray: thisApiJson.parameter.fields.Parameter,
                dataType: 'appendParameterTable',
            },
            {
                title: 'Query parameters',
                dataArray: thisApiJson.query,
                dataType: 'appendParameterTable',
            },
            {
                title: 'Examples',
                dataArray: thisApiJson.examples,
                dataType: 'appendExamples',
            },
            {
                title: 'Response',
                dataArray: thisApiJson.success.fields['Success 200'],
                dataType: 'appendParameterTable',
            },
            {
                title: 'Example Response',
                dataArray: thisApiJson.success.examples,
                dataType: 'appendExamples',
            },
            
        ];

        appendHeader(apiPartial, 0, thisApiJson.title);

        appendDivHtml(apiPartial, thisApiJson.description)

        

        for(const sectionObj of sections) {
            appendHeader(apiPartial, 1, sectionObj.title + ' - ' + thisApiJson.name);

            const tableOptions = {
                dataArray: sectionObj.dataArray,
                dataObj: sectionObj.dataObj,
                columns: [
                    {
                        title: 'Field',
                        key: 'field',
                        width: '80px',
                    },
                    {
                        title: 'Type',
                        key: 'type',
                        width: '60px',
                    },
                    {
                        title: 'Array',
                        key: 'isArray',
                        check: true,
                        width: '50px',
                    },
                    {
                        title: 'Optional',
                        key: 'optional',
                        optional: true,
                        width: '60px',
                    },
                    {
                        title: 'Description',
                        key: 'description',
                        html: true,
                        removeParagraphTags: true,
                    },
                ],
                thisApiJson,
                sectionObj,                
            };
            appendHandlers[sectionObj.dataType](apiPartial, tableOptions); 
        }
        

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
