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

    const appendHeader = function(apiPartial, s) {
        const headerElem = document.createElement('h' + apiPartial.level);
        $(headerElem).text(s);
        $(apiPartial.elem).append(headerElem);
    }


    apiGlobal.loaders['jsDocs'] = function(apiPartial, apiJson) {
        console.log('apiDocs loadPartial jsDocs', {apiPartial, apiJson});

        const thisApiJson = apiJson.apis.find(e => e.name == apiPartial.name);
        if (!thisApiJson) {
            console.log('apiDocs ' + apiPartial.name + ' not found in apiJson ', apiJson)
        }

        appendHeader(apiPartial, apiPartial.name);
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
