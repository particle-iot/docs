

$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    const eventCategory = 'JSON Linter';

    apiHelper.jsonLinterGetValue = function(elem) {
        const index = parseInt($(elem).attr('data-index'));
        const codeMirror = apiHelper.jsonLinterCodeMirror[index];

        let result = codeMirror.getValue();

        try {
            const jsonObj = JSON.parse(result);
            result = JSON.stringify(jsonObj, null, 0);
        }  
        catch(e) {
        }
        return result;
    };

    apiHelper.jsonLinterSetValue = function(elem, data) {
        const index = parseInt($(elem).attr('data-index'));
        const codeMirror = apiHelper.jsonLinterCodeMirror[index];

        try {
            const jsonObj = JSON.parse(data);
            data = JSON.stringify(jsonObj, null, 2);
        }  
        catch(e) {
        }

        codeMirror.setValue(data);
    };

    apiHelper.jsonLinterEvent = function(elem, event) {
        apiHelper.jsonLinterSetValue(elem, event.data);
    };

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

                    const event = new CustomEvent('linted', { errors: errors });
                    $(parentElem)[0].dispatchEvent(event);

                    updateLinting(errors);
                },
                "async": true
            },
            mode: "application/json", 
            json: true
        });
        const height = $(parentElem).data('height');
        if (height) {
            if (height == 'full') {
                codeMirror.setSize(null, $('.content-inner').height() - 50);                
            }
            else {
                codeMirror.setSize(null, parseInt(height));
            }
        }

        apiHelper.jsonLinterCodeMirror[index] = codeMirror;
    });

    const hex4 = function(val) {
        let str = val.toString(16);
        if (str.length < 4) {
            str = '0000'.substr(0, 4 - str.length) + str;
        }
        return str;
    }

    const escapeUnicode = function(str, onlyUnicode) {
        let result = '';
        for(let ii = 0; ii < str.length; ii++) {
            let cp = str.charCodeAt(ii);

            let escape = false;
            if (onlyUnicode) {
                escape = (cp >= 127);
            }
            else {
                escape = (cp < 32 || cp >= 127 || cp == 34 || cp == 92);
            }

            if (escape) {
                switch(cp) {
                    case 8: // Backspace
                        result += '\\b';
                        break;

                    case 10: // Newline
                        result += '\\n';
                        break;

                    case 12: // Formfeeed
                        result += '\\f';
                        break;

                    case 13: // Carriage return
                        result += '\\r';
                        break;

                    case 34:
                        result += '\\"';
                        break;

                    case 92: 
                        result += '\\\\';
                        break;
                    
                    default:
                        result += '\\u' + hex4(cp);
                        break;
                }
            }
            else {
                result += String.fromCharCode(cp);
            }
        }
        return result;
    };


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
        analytics.track('Prettify', {category:eventCategory});
    });

    $('.apiHelperJsonLinterCompactButton').on('click', function() {
        let parentElem = $(this).closest('.apiHelperJsonLinter');
        formatJson(parentElem, 0);
        analytics.track('Compact', {category:eventCategory});
    });

    $('.apiHelperJsonLinterStringifyButton').on('click', function() {
        let parentElem = $(this).closest('.apiHelperJsonLinter');
        const index = parseInt($(parentElem).attr('data-index'));

        const codeMirror = apiHelper.jsonLinterCodeMirror[index];
        const jsonStr = codeMirror.getValue();

        try {
            const jsonObj = JSON.parse(jsonStr);
            const jsonCompact = JSON.stringify(jsonObj, null, 0);
            
            let str = escapeUnicode(jsonCompact, false);
            codeMirror.setValue('"' + str + '"');

            analytics.track('Stringify', {category:eventCategory});
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
            if (str.endsWith('"')) {
                str = str.substr(0, str.length - 1);
            }
        }
        str = str.replace(/[\\][\\]/g, '\\')
                 .replace(/[\\][\"]/g, '"');

        try {
            const jsonObj = JSON.parse(str);
            codeMirror.setValue(JSON.stringify(jsonObj, null, 2));

            analytics.track('Unstringify', {category:eventCategory});
        }  
        catch(e) {
        }

    });

    $('.apiHelperJsonLinterEscapeButton').on('click', function() {
        let parentElem = $(this).closest('.apiHelperJsonLinter');
        const index = parseInt($(parentElem).attr('data-index'));

        const codeMirror = apiHelper.jsonLinterCodeMirror[index];
        let str = codeMirror.getValue();
        codeMirror.setValue(escapeUnicode(str, true));
        analytics.track('Escape Unicode', {category:eventCategory});
    });

    $('.apiHelperJsonToCode').each(function() {
        const thisPartial = $(this);
        const linterElem = $('.apiHelperJsonLinter');
        const linterEditorElem = $('.apiHelperJsonLinterEditor');
        const outputElem = $(thisPartial).find('.apiHelperJsonToCodeOutput > textarea');

        const setStatus = function(s) {
            $(thisPartial).find('.apiHelperJsonToCodeStatus').text(s);
        }

        const escapeText = function(s) {
            let result = '';
            for(let ii = 0; ii < s.length; ii++) {
                const c = s.charAt(ii);
                switch(c) {
                    case '"':
                    case '\\':
                            result += '\\' + c;
                        break;

                    default:
                        {
                            const cc = s.charCodeAt(ii);
                            if (cc < 128) {
                                result += c;
                            }
                            else {
                                result += '\\u' + hex4(cc);
                            }
                        }
                        break;
                }
            }
            return result;
        }

        const convert = function(stringifierFn) {
            const index = parseInt($(linterElem).attr('data-index'));
            const codeMirror = apiHelper.jsonLinterCodeMirror[index];
            const jsonStr = codeMirror.getValue();
    
            try {
                setStatus('');

                const json = JSON.parse(jsonStr);

                const convertedText = stringifierFn(json);

                const lines = convertedText.split('\n');

                let output = '';

                if (lines.length == 1) {
                    // Single line (compact)
                    output = 'const char jsonStr[] = "' + escapeText(lines[0]) + '";\n';
                }
                else {
                    // Multiple lines
                    output = 'const char jsonStr[] = ';
                    for(const line of lines) {
                        const m = line.match(/([ \t]*)(.*)/)

                        output += '\n' + m[1] + '"' + escapeText(m[2]) + '"';
                    }
                    output += ';\n';
                }


                $(outputElem).val(output);
            }
            catch(e) {
                setStatus('Could not convert to code');
                console.log('convert exception', e);
            }
        }

        $(thisPartial).find('.apiHelperConvertToCodeReadableButton').on('click', function() {
            convert(function(json) {
                return JSON.stringify(json, null, 4);
            });
        });
        $(thisPartial).find('.apiHelperConvertToCodeCompactButton').on('click', function() {
            convert(function(json) {
                return JSON.stringify(json);
            });
        });

    });
});

