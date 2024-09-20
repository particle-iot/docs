$(document).ready(function () {
    if ($('.apiHelper').length == 0) {
        return;
    }

    let apiGlobal = {
        kinds: [],
        partials: [],
    };

    $('.apiHelperDocs').each(function() {
        const thisPartial = $(this);

        let apiPartial = {
            kind: $(thisPartial).data('kind'),
            name: $(thisPartial).data('name'),
            elem: thisPartial,
        };
        $(thisPartial).data('obj', apiPartial);
        apiGlobal.partials.push(apiPartial);
        
        if (!apiGlobal.kinds.includes(apiPartial.kind)) {
            apiGlobal.kinds.push(apiPartial.kind);
        }

        console.log('apiHelperDocs ', apiPartial);
    });

    const loadPartial = function(thisPartial) {
        const apiJson = apiGlobal[thisPartial.kind];

        console.log('loadPartial', {thisPartial, apiJson});
    }

    const load = async function() {
        if (apiGlobal.kinds.length == 0) {
            return;
        }    

        console.log('kinds', apiGlobal.kinds);

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

        console.log('loaded', apiGlobal);

        for(const thisPartial of apiGlobal.partials) {
            loadPartial(thisPartial);
        }
    };

    load();
});
