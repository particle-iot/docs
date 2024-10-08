

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




    $('.apiHelperJsonToCbor').each(function() {
        const thisPartial = $(this);
        const linterElem = $('.apiHelperJsonLinter');
        const outputElem = $(thisPartial).find('.apiHelperJsonToCborOutput > textarea');
        const cborStatsDivElem = $(thisPartial).find('.cborStatsDiv');
        const cborStatsTableBodyElem = $(thisPartial).find('.cborStatsDiv > table > tbody');
        const convertFromCborButtonElem = $(thisPartial).find('.apiHelperConvertFromCborButton');

        const setStatus = function(s) {
            $(thisPartial).find('.apiHelperJsonToCborStatus').text(s);
        }


        const convertFromCborInfo = function() {
            let info = {
                text: $(outputElem).val(),
                isHex: false,
                isBase64: false,
            };
            
            if (!!info.text.match(/^[a-f0-9]+$/i)) {
                try {
                    info.cborArray = new Uint8Array(info.text.match(/[a-f0-9]{2}/gi).map(h => {
                        return parseInt(h, 16)
                    }));
                    info.isHex = true;
                }
                catch(e) {                    
                }
            }
            else
            if (info.text.length > 0) {
                try {
                    const binaryString = window.atob(info.text);
                    info.cborArray = new Uint8Array(binaryString.length);
                    for (let ii = 0; ii < binaryString.length; ii++) {
                        info.cborArray[ii] = binaryString.charCodeAt(ii);
                    }
                    info.isBase64 = true;
                }
                catch(e) {
                }        
            }

            if (info.cborArray) {
                try {
                    info.json = CBOR.decode(info.cborArray.buffer);
                }
                catch(e) {
                    console.log('exception converting from cbor', e);
                }
            }
            
            console.log('convertFromCborInfo', info);
            
            return info;
        }

        const convertToCborInfo = function() {
            let info = {};
            const index = parseInt($(linterElem).attr('data-index'));
            
            info.codeMirror = apiHelper.jsonLinterCodeMirror[index];
            info.jsonStr = info.codeMirror.getValue();

            try {
                info.json = JSON.parse(info.jsonStr);
                    
                info.cbor = CBOR.encode(info.json);

                info.compactLength = JSON.stringify(info.json).length;
                if (info.compactLength != 0) {
                    info.pctSaved = Math.floor(info.cbor.byteLength * 100 / info.compactLength);
                }
                else {
                    info.pctSaved = 0;
                }

            }
            catch(e) {
            }

            console.log('convertToCborInfo', info);
            

            return info;
        }

        const convertFromCborInfoEnableButton = function() {
            const info = convertFromCborInfo();
            console.log('convertFromCborInfoEnableButton convertFromCborInfo', info);

            if (info.json) {
                $(convertFromCborButtonElem).prop('disabled', false);
            }
            else {
                $(convertFromCborButtonElem).prop('disabled', true);
            }
        }
        const updateStats = function(info) {
            $(cborStatsTableBodyElem).find('.tableValue').text('');

            $(cborStatsDivElem).show();
            $(cborStatsTableBodyElem).find('.tableStringIn').text(info.jsonStr.length);
            $(cborStatsTableBodyElem).find('.tableStringInCompact').text(info.compactLength);        
            if (info.cbor) {
                $(cborStatsTableBodyElem).find('.tableCborOut').text(info.cbor.byteLength);
                if (info.compactLength != 0) {
                    $(cborStatsTableBodyElem).find('.tableCborPct').text(info.pctSaved);
                }
            }
        }

        const convertToCbor = function(options) {    
            try {
                $(cborStatsDivElem).hide();
                setStatus('');
            
                let output = '';

                const info = convertToCborInfo();                
                updateStats(info);

                if (options.toHex) {
                    output = Array.prototype.map.call(new Uint8Array(info.cbor), x => ('00' + x.toString(16)).slice(-2)).join('');
                }
                else
                if (options.toBase64) {
                    const uint8cbor = new Uint8Array(info.cbor);
                    
                    let binaryString = '';
                    for (let ii = 0; ii < uint8cbor.byteLength; ii++) {
                        binaryString += String.fromCharCode(uint8cbor[ii]);
                    }
                    output = window.btoa(binaryString);
                }

                $(outputElem).val(output);

                convertFromCborInfoEnableButton();
            }
            catch(e) {
                setStatus('Could not convert to CBOR');
                console.log('convert exception', e);
            }
        }


        $(outputElem).on('input', function() {
            $(cborStatsDivElem).hide();
            $(cborStatsTableBodyElem).find('.tableValue').text('');
            convertFromCborInfoEnableButton();
        });

        $(thisPartial).find('.apiHelperConvertToCborHexButton').on('click', function() {
            convertToCbor({toHex:true});
        });
        $(thisPartial).find('.apiHelperConvertToCborBase64Button').on('click', function() {
            convertToCbor({toBase64:true});
        });
        $(convertFromCborButtonElem).on('click', function() {
            const index = parseInt($(linterElem).attr('data-index'));
            const codeMirror = apiHelper.jsonLinterCodeMirror[index];
    
            try {
                $(cborStatsDivElem).hide();
                setStatus('');

                const info = convertFromCborInfo();
                if (info.json) {
                    codeMirror.setValue(JSON.stringify(info.json, null, 4));

                    const info2 = convertToCborInfo();
                    updateStats(info2);    
                }                
            }
            catch(e) {
                setStatus('Could not convert from CBOR');
                console.log('convert exception', e);
            }
        });
    });

    $('.apiHelperJsonToVariant').each(function() {
        const thisPartial = $(this);
        const linterElem = $('.apiHelperJsonLinter');
        const outputElem = $(thisPartial).find('.apiHelperJsonToCodeOutput > textarea');
        const convertButtonElem = $(thisPartial).find('.apiHelperCodeGeneratorButton');

        const setStatus = function(s) {
            $(thisPartial).find('.apiHelperJsonToCodeStatus').text(s);
        }

        $(convertButtonElem).on('click', function() {
            const index = parseInt($(linterElem).attr('data-index'));
            const codeMirror = apiHelper.jsonLinterCodeMirror[index];

            try {
                let info = {
                    codeMirror,
                };

                setStatus('');

                info.jsonStr = info.codeMirror.getValue();

                info.json = JSON.parse(info.jsonStr);
                

                const variantValue = function(value, indent, output) {
                    // TODO": Add boolean, null
                    if (typeof value == 'number') {
                        return 'Variant(' + value + ')';
                    }
                    else
                    if (typeof value == 'string') {
                        // TODO: escape string
                        return 'Variant(\"' + value + '\")';
                    }
                    else 
                    if (typeof value == 'object') {
                        if (Array.isArray(value)) {
                            // Array
                        }
                        else {
                            // Map
                        }
                    }

                }

                const processObject = function(obj, indent, output) {
                    // output += 
                    for(const key in obj) {
                    }
                }
                info.output = '';
                processObject(info.json, 0, info.output);

                console.log('info', info);
                                
            }
            catch(e) {
                setStatus('Could not generate code');
                console.log('convert exception', e);
            }
        });
    });

    const binaryToReadable = function(array) {
        let result = '';

        const bytesPerLine = 32;

        for(let lineStart = 0; lineStart < array.length; lineStart += bytesPerLine) {

        }

        return result;
    }

    $('.apiHelperEventDecoder').each(function() {
        const thisPartial = $(this);

        const decoderInputElem = $(thisPartial).find('.decoderInput');
        const decoderOutputElem = $(thisPartial).find('.decoderOutput');

        const setStatus = function(s) {
            $(thisPartial).find('.apiHelperEventDecoderStatus').text(s);
        }

        $(decoderInputElem).on('input', function() {
            const eventData = $(decoderInputElem).val();
            console.log('eventData', eventData);

            $(decoderOutputElem).val('');

            try {
                // TODO: Make this more tolerant!
                if (eventData.startsWith('data:application/octet-stream;base64')) {
                    const commaIndex = eventData.indexOf(',');
                    const base64 = eventData.substring(commaIndex + 1);

                    const binaryString = window.atob(base64);
                    binaryArray = new Uint8Array(binaryString.length);
                    for (let ii = 0; ii < binaryString.length; ii++) {
                        binaryArray[ii] = binaryString.charCodeAt(ii);
                    }
                }
            }  
            catch(e) {
                console.log('decode exception', e);
            }
        });
    });

});

