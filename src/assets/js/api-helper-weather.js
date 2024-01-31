
$(document).ready(function () {
    // auth not required

    let queryParams = {};
    let responseTemplate;

    const localStorageKey = 'weatherApiDemo';
    let settings;
    try {
        settings = JSON.parse(sessionStorage.getItem(localStorageKey));
        if (!settings) {
            settings = {};
        }
        if (apiHelper.auth.access_token != settings.userToken) {
            sessionStorage.removeItem(localStorageKey);
            settings = {};
        }
    }
    catch (e) {
        settings = {};
    }

    const loadSettings = function () {
        if (settings.apiKey) {
            $('.apiHelperWeatherApiKeyInput').val(settings.apiKey);
        }
        if (settings.apiVersion) {
            $('.weatherApiVersion').val(settings.apiVersion);            
        }
        else {
            settings.apiVersion = $('.weatherApiVersion').val();                        
        }
        if (settings.latLon) {
            $('.apiHelperWeatherLatLonInput').val(settings.latLon);
        }
        
    };
    loadSettings();

    const saveSettings = function () {
        settings.userToken = apiHelper.auth.access_token;

        sessionStorage.setItem(localStorageKey, JSON.stringify(settings));
    };

    
    $($('.apiHelper')[0]).on('ssoLogout', function() {
        sessionStorage.removeItem(localStorageKey);
    });

    const setCodeBox = function (parentElem, text) {
        const thisCodeElem = $(parentElem).find('.codebox');
        $(thisCodeElem).text(text);
        $(thisCodeElem).removeClass('prettyprinted');
        if (prettyPrint) {
            prettyPrint();
        }
    };

    const objectToFormUrl = function(obj) {
        let result = '';
        
        const keys = Object.keys(obj);
        for (let ii = 0; ii < keys.length; ii++) {
            result += keys[ii] + '=' + encodeURIComponent(obj[keys[ii]]);
            if ((ii + 1) < keys.length) {
                result += '&';
            }
        }
        return result;
    }


    const setRequest = function (parentElem, request) {
        let requestStr = request.method + ' ' + request.url + '\n';
        if (request.headers) {
            for (const header in request.headers) {
                requestStr += header + ': ' + request.headers[header] + '\n';
            }
        }
        if (request.contentType) {
            requestStr += 'Content-Type: ' + request.contentType + '\n';
        }

        if (request.data) {
            requestStr += '\n' + request.data;
        }

        $(parentElem).find('.apiHelperApiRequest > pre').text(requestStr);
        $(parentElem).find('.apiHelperApiRequest').show();
    };

    $('.apiHelperWeatherApiKey').each(function() {
        const thisElem = $(this);

        const setStatus = function(str) {
            $(thisElem).find('.apiHelperStatus').text(str);
        };

        $(thisElem).find('.weatherApiVersion').on('change', function() {
            settings.apiVersion = $(this).val();
            saveSettings();
        });

        $(thisElem).find('.apiHelperWeatherApiKeyInput').on('input change', function() {
            const apiKey = $(this).val().trim();

            let valid = false;
            
            if (apiKey.length == 32) {
                valid = true;
                for(var ii = 0; ii < apiKey.length; ii++) {
                    if (!'0123456789ABCDEFabcdef'.includes(apiKey.charAt(ii))) {
                        valid = false;
                    }
                }
            }

            settings.apiKey = apiKey;
            saveSettings();

            if (valid) {
                setStatus('');    
            }
            else {
                setStatus('The OpenWeather API Key is 32 hexadecimal digits.');    
            }

        });

    });

    $('.apiHelperWeatherLatLon').each(function() {
        const thisElem = $(this);

        const setStatus = function(str) {
            $(thisElem).find('.apiHelperStatus').text(str);
        };

        $(thisElem).find('.apiHelperWeatherLatLonInput').on('input change', function() {
            const latLon = $(this).val();
            
            let valid = false;

            const parts = latLon.split(',');
            if (parts.length == 2) {
                if (!isNaN(parseFloat(parts[0])) && !isNaN(parseFloat(parts[1]))) {
                    valid = true;
                }
            }
            if (valid) {
                settings.latLon = latLon;
                saveSettings();
                setStatus('');    
            }
            else {
                setStatus('Latitude and longitude must be specified in decimal format, separated by a comma.');    
            }
        });

    });


    const updateWebhook = function() {
        $('.apiHelperWeatherWebhook').each(function() {
            const thisElem = $(this);

            const setStatus = function(str) {
                $(thisElem).find('.apiHelperStatus').text(str);
            }
            setStatus('');

            const actionButtonElem = $(thisElem).find('.apiHelperActionButton');
            const eventNameInputElem = $(thisElem).find('.apiHelperEventNameInput');
            const webhookOutputElem = $(thisElem).find('.apiHelperCloudApiOutputJson');

            if (!responseTemplate || responseTemplate.length < 3) {
                setStatus('Select fields to return to the device before generating a webhook.');
                $(actionButtonElem).prop('disabled', true);
                return;
            }
            if (!$(eventNameInputElem).val()) {
                setStatus('Event name must not be empty.');
                $(actionButtonElem).prop('disabled', true);
                return;
            }

            $(actionButtonElem).prop('disabled', false);

            const eventName = $(eventNameInputElem).val();

            let webhookConfigObj = {
                url: 'https://api.openweathermap.org/data/' + settings.apiVersion + '/onecall',
                noDefaults: true,
                rejectUnauthorized: true,
                event: eventName,
                requestType: 'GET',
                responseTopic: '{{PARTICLE_DEVICE_ID}}/{{PARTICLE_EVENT_NAME}}',
                query: queryParams,
                responseTemplate
            }

            //    auth: apiHelper.auth.access_token


            setCodeBox(webhookOutputElem, JSON.stringify(webhookConfigObj, null, 2));
            $(webhookOutputElem).show();

            $(actionButtonElem).off('click');
            $(actionButtonElem).on('click', async function() {

                try {
                    // List all webhooks
                    const listResp = await apiHelper.particle.listWebhooks({ auth: apiHelper.auth.access_token });

                    // listResp.body = array
                    // object in array has id and event
                    let found = [];
                    for(const obj of listResp.body) {
                        if (obj.event === eventName) {
                            found.push(obj);
                        }
                    }

                    if (found.length > 0) {
                        // Remove existing webhook
                        for(const obj of found) {
                            await apiHelper.particle.deleteWebhook({ hookId: obj.id, auth: apiHelper.auth.access_token });
                        }
                    }
                    
                    // Create new one
                    webhookConfigObj.integration_type = 'Webhook';

                    let request = {
                        contentType: 'application/json',
                        data: JSON.stringify(webhookConfigObj),
                        dataType: 'json',
                        error: function (jqXHR) {
        
                            setStatus('Error creating webhook');
                        },
                        headers: {
                            'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                            'Accept': 'application/json'
                        },
                        method: 'POST',
                        success: function (resp, textStatus, jqXHR) {
                            setStatus('Webhook ' + (found.length ? 'updated' : 'created') + '!');
                            analytics.track('Success', {category:'Update Webhook'});
                        },
                        url: 'https://api.particle.io/v1/integrations'
                    }
                
                    $.ajax(request);

                }
                catch(e) {
                    setStatus('An error occurred updating the webhook');
                    console.log('exception', e);
                }
            });
        });
        
    };

    const updateFieldSelector = function(weatherData) {
        $('.apiHelperWeatherFieldSelector').each(function() {
            const thisElem = $(this);
            
            const setStatus = function(str) {
                $(thisElem).find('.apiHelperStatus').text(str);
            }
            setStatus('');

            const fieldDescriptions = {
                dt: 'Timestamp (Unix time at UTC)',
                sunrise: 'Time of sunrise (Unix time at UTC)',
                sunset: 'Time of sunrise (Unix time at UTC)',
                temp: 'Temperature (units vary)',
                feels_like: 'Feels-like temperature (units vary)',
                pressure: 'Atmospheric pressure at sea level, hPa',
                humidity: 'Relative humidity, %',
                dew_point: 'Dew point temperture (units vary)',
                clouds: 'Cloudiness, %',
                uvi: 'UV index',
                visibility: 'Average visibility, meters',
                wind_speed: 'Wind speed (units vary)',
                wind_gust: 'Wind gust speed (units vary)',
                wind_deg: 'Wind direction, degrees',
                '1h': 'Rain or snow for the last hour, millimeters',
                'weather.0.id': 'Weather condition ID',
                'weather.0.main': 'Group of weather parameters (Rain, Snow, Extreme etc.)',
                'weather.0.description': 'Weather condition description, localized text',
                'weather.0.icon': 'Weather icon name',
                precipitation: 'Precipitation volume, mm',
                moonrise: 'The time of when the moon rises for this day, Unix, UTC',
                moonset: 'The time of when the moon sets for this day, Unix, UTC',
                moon_phase: 'Phase of the moon',
                'temp.morn': 'Morning temperature (units vary)',  
                'temp.day': 'Day temperature (units vary)',  
                'temp.eve': 'Evening temperature (units vary)',  
                'temp.night': 'Night temperature (units vary)',  
                'temp.min': 'Minimum temperature (units vary)',  
                'temp.max': 'Maximum temperature (units vary)',  
                'feels_like.morn': 'Morning feels-like temperature (units vary)',  
                'feels_like.day': 'Day feels-like temperature (units vary)',  
                'feels_like.eve': 'Evening feels-like temperature (units vary)',  
                'feels_like.night': 'Night feels-like temperature (units vary)',  
                'feels_like.min': 'Minimum feels-like temperature (units vary)',  
                'feels_like.max': 'Maximum feels-like temperature (units vary)',  
                pop: 'Probability of precipitation',
                rain: 'Precipitation volume, millimeters',
                snow: 'Precipitation volume, millimeters',
                lat: 'Location latitude',
                lon: 'Location longitude',
                timezone: 'Timezone name',
                timezone_offset: 'Timezone offset from UTC in seconds'
            };

            const outputKeys = {
                'timezone': 'tz',
                'timezone_offset': 'tzo',
                'feels_like': 'ftemp',
                'pressure': 'pres',
                'humidity': 'hum',
                'dew_point': 'dp',
                'visibility': 'vis',
                'wind_speed': 'ws',
                'wind_deg': 'wd',
                'wind_gust': 'wg',
                'weather.0.id': 'id',
                'weather.0.main': 'main',
                'weather.0.description': 'desc',
                'weather.0.icon': 'icon',
                'moon_phase': 'moon',
                'sunrise': 'srise',
                'sunset': 'sset',
                'moonrise': 'mrise',
                'moonset': 'mset',
                'temp.day': 'day',
                'temp.min': 'min',
                'temp.max': 'max',
                'temp.night': 'night',
                'temp.eve': 'eve',
                'temp.morn': 'morn',
                'feels_like.day': 'fday',
                'feels_like.night': 'fnight',
                'feels_like.eve': 'feve',
                'feels_like.morn': 'morn',
                'rain.1h': 'rain1h'
            };

            let templateInclude = {};

            const updateTemplate = function() {
                // console.log('updateTemplate', templateInclude);

                let templateComponents = [];


                if (templateInclude.top) {
                    Object.keys(templateInclude.top).forEach(function(key) {
                        templateComponents.push({
                            inputKey: templateInclude.top[key].name,
                            outputKey: templateInclude.top[key].outputKey,
                            isString: templateInclude.top[key].isString
                        });
                    });    
                }

                if (templateInclude.current) {
                    Object.keys(templateInclude.current).forEach(function(key) {
                        templateComponents.push({
                            inputKey:'current.' + templateInclude.current[key].name,
                            outputKey: templateInclude.current[key].outputKey,
                            isString: templateInclude.current[key].isString
                        });
                    });    
                }

                ['minutely', 'hourly', 'daily'].forEach(function(group) {
                    if (!templateInclude[group]) {
                        return;
                    }

                    const groupElem = $(thisElem).find('.weather_' + group);
                    const selectElem = $(groupElem).find('select');
                    
                    let count = $(selectElem).val();

                    templateComponents.push({outputKey:group, arrayStart:true});

                    for(let ii = 0; ii < count; ii++) {                        
                        templateComponents.push({objectStart:true});
                        Object.keys(templateInclude[group]).forEach(function(key) {

                            templateComponents.push({
                                inputKey: group + '.' + ii + '.' + templateInclude[group][key].name,
                                outputKey: templateInclude[group][key].outputKey,
                                isString: templateInclude[group][key].isString
                            });
                        });
                        templateComponents[templateComponents.length - 1].isLast = true;
                        templateComponents.push({objectEnd:true});
                    }
                    templateComponents[templateComponents.length - 1].isLast = true;

                    templateComponents.push({arrayEnd:true});
                });
                templateComponents[templateComponents.length - 1].isLast = true;

                //console.log('templateComponents', templateComponents);

                responseTemplate = '{';
                templateComponents.forEach(function(obj) {
                    if (obj.arrayStart) {
                        responseTemplate += '"' + obj.outputKey + '":[';
                    }
                    else
                    if (obj.objectStart) {
                        responseTemplate += '{'
                    }
                    else 
                    if (obj.objectEnd) {
                        responseTemplate += ' }'
                    }
                    else
                    if (obj.arrayEnd) {
                        responseTemplate += ']';
                    }
                    else {
                        responseTemplate += '"' + obj.outputKey + '":';
                        if (obj.isString) {
                            responseTemplate += '"{{{' + obj.inputKey + '}}}"';
                        }
                        else {
                            responseTemplate += '{{' + obj.inputKey + '}}';
                        }
                    }

                    if (!obj.arrayStart && !obj.objectStart && !obj.isLast) {
                        responseTemplate += ',';
                    }
                });
                responseTemplate += ' }';
                
                // console.log('responseTemplate', responseTemplate);
                const responseTemplateElem = $(thisElem).find('.responseTemplate');
                $(responseTemplateElem).show();
                $(responseTemplateElem).find('pre').text(responseTemplate);

                // Expand responseTemplate
                const compiledTemplate = Hogan.compile(responseTemplate);
    
                const renderedTemplateStr = compiledTemplate.render(weatherData);

                let msg = renderedTemplateStr.length.toString() + ' bytes';
                if (renderedTemplateStr.length > 512) {
                    msg += ' (' + Math.ceil(renderedTemplateStr.length / 512) + ' data operations)';
                }
                $(thisElem).find('.renderedTemplateSize').text(msg);
                
                let renderedTemplateObj;
                try {
                    renderedTemplateObj = JSON.parse(renderedTemplateStr);

                    $(thisElem).find('.templateExpanded').show();
                    setCodeBox(thisElem, JSON.stringify(renderedTemplateObj, null, 2));
                }
                catch(e) {
                    setStatus('An error occurred rendering the template');
                }

                // Generate code
                const sampleCodeElem = $(thisElem).find('.sampleCode');
                $(sampleCodeElem).show();

                // Update webhook
                updateWebhook();

                let code = '';


                code += 'void subscriptionHandler(const char *event, const char *data) {\n';
                code += '    JSONValue outerObj = JSONValue::parseCopy(data);\n';
                code += '    JSONObjectIterator iter(outerObj);\n';
                code += '    while(iter.next()) {\n';

                const codeForObject = function(indent, iterName, obj) {
                    Object.keys(obj).forEach(function(key) {
                        code += indent + '    if (' + iterName + '.name() == "' + obj[key].outputKey + '") {\n';
                        // code += indent + '        // ' + obj[key].name + '\n';
                        
                        let fmt;
                        let acc = iterName + '.value()';
                        if (obj[key].isString) {
                            acc += '.toString().data()';
                            fmt = '%s';
                        }
                        else {
                            acc += '.toDouble()';
                            fmt = '%lf';
                        }
                        code += indent + '        Log.info("' + obj[key].name + '=' + fmt + '", ' + acc + ');\n';
                        
                        code += indent + '    }\n';    
                    });
                };

                if (templateInclude.top) {
                    codeForObject('    ', 'iter', templateInclude.top);
                }

                if (templateInclude.current) {
                    codeForObject('    ', 'iter', templateInclude.current);
                }

                ['minutely', 'hourly', 'daily'].forEach(function(group) {
                    if (!templateInclude[group]) {
                        return;
                    }
                    code += '        if (iter.name() == "' + group + '") {\n';
                    code += '            JSONArrayIterator iter2(iter.value());\n';
                    code += '            for(size_t ii = 0; iter2.next(); ii++) {\n';
                    code += '                Log.info("' + group + ' array index %u", ii);\n';
                    code += '                JSONObjectIterator iter3(iter2.value());\n';
                    code += '                while(iter3.next()) {\n';
                    codeForObject('                ', 'iter3', templateInclude[group]);
                    code += '                }\n';
                    code += '            }\n';
                    code += '        }\n';
                });

                code += '    }\n';
                code += '}\n';
                
                setCodeBox(sampleCodeElem, code);
                
            };
                        

            ['top', 'current', 'minutely', 'hourly', 'daily'].forEach(function(group) {
                const groupElem = $(thisElem).find('.weather_' + group);
                
                const groupWeatherData = (group != 'top') ? weatherData[group] : weatherData;

                if (groupWeatherData) {
                    let groupData;
                    if (group == 'current' || group == 'top') {
                        groupData = groupWeatherData;
                    }
                    else {
                        groupData = groupWeatherData[0];

                        const selectElem = $(groupElem).find('select');
                        $(selectElem).html('');
                        for(let ii = 0; ii < groupWeatherData.length; ii++) {
                            const oneBasedString = (ii + 1).toString();

                            let optionElem = document.createElement('option');
                            $(optionElem).prop('value', oneBasedString);
                            $(optionElem).text(oneBasedString);
                            $(selectElem).append(optionElem);
                        }
                        $(selectElem).on('change', function() {
                            updateTemplate();
                        });
                    }
                    const tbodyElem = $(groupElem).find('table > tbody');
                    
                    $(tbodyElem).html('');

                    let fields = [];

                    Object.keys(groupData).forEach(function(key) {
                        if (Array.isArray(groupData[key])) {
                            if (group != 'top') {
                                Object.keys(groupData[key][0]).forEach(function(keyInner) {
                                    fields.push({name:key + '.0.' + keyInner, value:groupData[key][0][keyInner]});
                                });
                            }
                        }
                        else
                        if (typeof groupData[key] === 'object') {
                            if (group != 'top') {
                                Object.keys(groupData[key]).forEach(function(keyInner) {
                                    fields.push({name:key + '.' + keyInner, value:groupData[key][keyInner]});
                                });    
                            }
                        }
                        else {
                            fields.push({name:key, value:groupData[key]});
                        }
                    });

                    fields.forEach(function(obj) {
                        let trElem = document.createElement('tr');

                        const outputKey = outputKeys[obj.name] ? outputKeys[obj.name] : obj.name;

                        {
                            let tdElem = document.createElement('td');
                            let inputElem = document.createElement('input');
                            $(inputElem).prop('type', 'checkbox');                            
                            $(tdElem).append(inputElem);
                            $(trElem).append(tdElem);    

                            $(inputElem).on('click', function() {
                                const checked = $(this).prop('checked');

                                if (!templateInclude[group]) {
                                    templateInclude[group] = {};                                    
                                }
                                if (checked) {
                                    let templateObj = {
                                        name: obj.name,
                                        group,
                                        outputKey,
                                        isString: typeof(obj.value) == 'string'
                                    };
                                    
                                    templateInclude[group][obj.name] = templateObj;
                                }
                                else {
                                    delete templateInclude[group][obj.name];
                                }

                                updateTemplate();
                            });
                        }

                        {
                            let tdElem = document.createElement('td');
                            $(tdElem).text(obj.name);
                            $(trElem).append(tdElem);    
                        }

                        {
                            let tdElem = document.createElement('td');
                            $(tdElem).text(obj.value);
                            $(trElem).append(tdElem);    
                        }
                        {
                            let tdElem = document.createElement('td');
                            $(tdElem).text(outputKey);
                            $(trElem).append(tdElem);    
                        }
                        {
                            let tdElem = document.createElement('td');
                        
                            const desc = fieldDescriptions[obj.name];
                            if (desc) {
                                $(tdElem).text(desc);
                            }
                            else {
                                $(tdElem).html('&nbsp;');
                            }
                            $(trElem).append(tdElem);    
                        }


                        $(tbodyElem).append(trElem);
                    });

                    $(groupElem).show();
                }
                else {
                    $(groupElem).hide();
                }
            });
        });    
    };


    $('.apiHelperWeatherOneCall').each(function() {
        const thisElem = $(this);

        const requestElem = $(thisElem).find('.apiHelperApiRequest');
        const respElem = $(thisElem).find('.apiHelperApiResponse');
        const outputJsonElem = $(thisElem).find('.apiHelperCloudApiOutputJson');

        const gaCategory = 'WeatherOneCall';

        const setStatus = function(str) {
            $(thisElem).find('.apiHelperStatus').text(str);
        };

       
        $(thisElem).find('.apiHelperActionButton').on('click', function () {
            if (!settings.apiKey) {
                console.log('Set your API key, above, before getting the weather.');
                return;
            }
            if (!settings.latLon) {
                console.log('Set your latitude and longitude, above, before getting the weather.');
                return;
            }


            setStatus('Requesting weather...');

            let request = {
                dataType: 'json',
                error: function (jqXHR) {
                    analytics.track('Error', {category:gaCategory, label:(jqXHR.responseJSON ? jqXHR.responseJSON.error : '')});

                    setStatus('Error getting weather');

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders() + '\n' + jqXHR.responseText);
                    $(respElem).show();
                },
                headers: {
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    setStatus('');
                    analytics.track('Success', {category:gaCategory});

                    $(outputJsonElem).show();
                    
                    updateFieldSelector(resp);
                    setCodeBox(thisElem, JSON.stringify(resp, null, 2));

                    $(respElem).find('pre').text(jqXHR.status + ' ' + jqXHR.statusText + '\n' + jqXHR.getAllResponseHeaders());
                    $(respElem).show();
                },
                url: 'https://api.openweathermap.org/data/' + settings.apiVersion + '/onecall'
            }
                      
            const latLonParts = settings.latLon.split(',');
            queryParams.lat = latLonParts[0].trim();
            queryParams.lon = latLonParts[1].trim();

            let exclude = [];
            ['current','minutely','hourly','daily','alerts'].forEach(function(ex) {
                if ($('#weatherOneCall_' + ex).prop('checked')) {
                    exclude.push(ex);
                }
            });
            if (exclude.length) {
                queryParams.exclude = exclude.join(',');
            }
            queryParams.units = $(thisElem).find('.weatherUnitsSelect').val();

            const lang = $(thisElem).find('.apiHelperWeatherLangInput').val();
            if (lang) {
                queryParams.lang = lang;
            }

            queryParams.appid = settings.apiKey;
            
            request.url += '?' + objectToFormUrl(queryParams);

            setRequest(thisElem, request);

            $(respElem).find('pre').text('');

            $(outputJsonElem).hide();

            $.ajax(request);

        });
    });


});

