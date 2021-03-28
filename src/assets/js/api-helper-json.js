

$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    apiHelper.jsonLinterCodeMirror = [];

    $('.apiHelperJsonLinter').each(function(index) {
        const parentElem = $(this);
        $(parentElem).attr('data-index', index);
        
        let codeMirror = CodeMirror.fromTextArea($(parentElem).find('textarea')[0], {
            gutters: ["CodeMirror-lint-markers"],
            lineNumbers: true,
            lint: {
                "getAnnotations": function(cm, updateLinting, options) {
                    const errors = CodeMirror.lint.json(cm);

                    if (errors.length == 0) {
                        $(parentElem).find('.apiHelperJsonLinterValidOnlyButton').removeAttr('disabled');
                    }
                    else {
                        $(parentElem).find('.apiHelperJsonLinterValidOnlyButton').attr('disabled', 'disabled');
                    }

                    updateLinting(errors);
                },
                "async": true
            },
            mode: "application/json", 
            json: true
        });

        apiHelper.jsonLinterCodeMirror[index] = codeMirror;
    });

    const formatJson = function(parentElem, indent) {
        const index = parseInt($(parentElem).attr('data-index'));
        const codeMirror = apiHelper.jsonLinterCodeMirror[index];
        const jsonStr = codeMirror.getValue();

        try {
            const jsonObj = JSON.parse(jsonStr);
            codeMirror.setValue(JSON.stringify(jsonObj, null, indent));
        }  
        catch(e) {
        }
    }

    $('.apiHelperJsonLinterPrettifyButton').on('click', function() {
        let parentElem = $(this).closest('.apiHelperJsonLinter');
        formatJson(parentElem, 2);
    });

    $('.apiHelperJsonLinterCompactButton').on('click', function() {
        let parentElem = $(this).closest('.apiHelperJsonLinter');
        formatJson(parentElem, 0);
    });

    $('.apiHelperJsonLinterStringifyButton').on('click', function() {
        let parentElem = $(this).closest('.apiHelperJsonLinter');
        const index = parseInt($(parentElem).attr('data-index'));

        const codeMirror = apiHelper.jsonLinterCodeMirror[index];
        const jsonStr = codeMirror.getValue();

        try {
            const jsonObj = JSON.parse(jsonStr);
            const jsonCompact = JSON.stringify(jsonObj, null, 0);
            
            let str = jsonCompact
                .replace(/[\\]/g, '\\\\')
                .replace(/[\"]/g, '\\\"');
            codeMirror.setValue('"' + str + '"');
        }  
        catch(e) {
        }
    });

    $('.apiHelperJsonLinterUnstringifyButton').on('click', function() {
        let parentElem = $(this).closest('.apiHelperJsonLinter');
        const index = parseInt($(parentElem).attr('data-index'));

        const codeMirror = apiHelper.jsonLinterCodeMirror[index];
        let str = codeMirror.getValue();
        if (str.startsWith('"')) {
            str = str.substr(1);
        }
        if (str.endsWith('"')) {
            str = str.substr(0, str.length - 1);
        }
        str = str.replace(/[\\][\\]/g, '\\')
                 .replace(/[\\][\"]/g, '"');

        try {
            const jsonObj = JSON.parse(str);
            codeMirror.setValue(JSON.stringify(jsonObj, null, 2));
        }  
        catch(e) {
        }

    });

});
