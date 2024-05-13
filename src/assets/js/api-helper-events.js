
apiHelper.eventViewer = {};

apiHelper.eventViewer.events = [];

apiHelper.eventViewer.monitors = [];

apiHelper.eventViewer.addMonitor = function(fn) {
    apiHelper.eventViewer.monitors.push(fn);
}

apiHelper.eventViewer.addRow = function(eventViewerElem, event, eventsIndex) {
    const deviceFilter = $(eventViewerElem).find('.apiHelperEventViewerDeviceSelect').val();
    if (deviceFilter != 'all' && deviceFilter != event.coreid) {
        return;
    }
    const eventFilter = $(eventViewerElem).find('.apiHelperEventViewerFilter').val();
    if (eventFilter != '' && !event.name.startsWith(eventFilter)) {
        return;
    }

    let deviceName = apiHelper.deviceIdToName[event.coreid];
    if (!deviceName) {
        deviceName = event.coreid;
    }

    const time = event.published_at.replace('T', ' ');

    const trElem = document.createElement('tr');
    $(trElem).data('events-index', eventsIndex);

    const fields = [
        { cssClass: 'apiHelperEventViewerEvent', value: event.name},
        { cssClass: 'apiHelperEventViewerEvent', value: event.data},
        { cssClass: 'apiHelperEventViewerDevice', value: deviceName},
        { cssClass: 'apiHelperEventViewerTime', value: time},
    ];
    for(const field of fields) {
        const tdElem = document.createElement('td');
        $(tdElem).addClass(field.cssClass);
        $(tdElem).text(field.value);    
        $(trElem).append(tdElem);
    }

    $(eventViewerElem).find('.apiHelperEventViewerOutput > table > tbody').prepend(trElem);
};

apiHelper.eventViewer.event = function(event) {
    apiHelper.eventViewer.events.push(event);

    apiHelper.eventViewer.monitors.forEach(function(fn) {
        fn(event);
    });

    $('.apiHelperEventViewer').each(function(index) {
        if ($(this).find('.apiHelperEventViewerEnable').prop('checked')) {
            apiHelper.eventViewer.addRow($(this), event, apiHelper.eventViewer.events.length - 1);
        }
    });
};

apiHelper.eventViewer.updateFilter = function(elem) {
    const eventViewerElem = $(elem).closest('div.apiHelperEventViewer');

    if ($(eventViewerElem).find('.apiHelperEventViewerOutput > table').length > 0) {
        $(eventViewerElem).find('.apiHelperEventViewerOutput > table > tbody').html('');
        apiHelper.eventViewer.events.forEach(function(event, index) {
            apiHelper.eventViewer.addRow(eventViewerElem, event, index);
        });    
    }
};

apiHelper.eventViewer.clickRow = function(thisRowElem) {
    const thisPartial = $(thisRowElem).closest('div.apiHelperEventViewer');

    if ($(thisPartial).hasClass('apiHelperJsonLinter')) {
        const event = apiHelper.eventViewer.events[$(thisRowElem).attr('data-events-index')];
        apiHelper.jsonLinterEvent($(thisPartial), event);
    }
};

apiHelper.eventViewer.start = function(elem) {
    if (!apiHelper.eventViewer.stream && apiHelper.auth && apiHelper.auth.access_token) {
        apiHelper.particle.getEventStream({ deviceId: 'mine', auth: apiHelper.auth.access_token }).then(function(stream) {
            apiHelper.eventViewer.stream = stream;
            
            stream.on('event', function(data) {
                apiHelper.eventViewer.event(data);
            });
        });
    }
};


$(document).ready(function() {

    if ($('.event-viewer').length) {
        let eventViewer = {};

        // Download the module version to semver mapping table
        fetch('/assets/files/versionInfo.json')
            .then(response => response.json())
            .then(function(res) {
                eventViewer.versionInfo = res;

                $('.event-viewer').each(async function() {
    
                    const rows = [
                        {
                            key: 'name',
                            title: 'Event name',
                        },
                        {
                            key: 'data',
                            title: 'Event data',
                        },
                        {
                            key: 'published_at',
                            title: 'Published at',
                        },
                        {
                            key: 'coreid',
                            title: 'Device ID',
                        },
                        {
                            key: 'userid',
                            title: 'User ID',
                            omitIfEmpty: true,
                        },
                        {
                            key: 'productID',
                            title: 'Product ID',
                        },
                        {
                            key: 'version',
                            title: 'Firmware version',                            
                        },
                    ];
            
                    const createSafeModeTable = function(describeObj) {
                        const tableElem = document.createElement('table');
                        $(tableElem).addClass('apiHelperEventViewerTable');
            
                        const tbodyElem = document.createElement('tbody');
            
                        {
                            const trElem = document.createElement('tr');
                            {
                                const tdElem = document.createElement('td');
                                $(tdElem).attr('colspan', '2');
                                $(tdElem).text('Safe Mode Event');
                                $(trElem).append(tdElem);
                            }
                            $(tbodyElem).append(trElem);    
                        }
            
            
                        const displayParts = [
                            {
                                id: 'u',
                                title: 'User firmware'
                            },
                            {
                                id: 's',
                                title: 'Device OS'
                            },
                            {
                                id: 'b',
                                title: 'Bootloader'
                            },
                            {
                                id: 'a',
                                title: 'Softdevice'
                            },
                            {
                                id: 'c',
                                title: 'NCP'
                            }
                        ];
            
                        const systemVersionToSemVer = function(sysVer) {
                            for(let obj of eventViewer.versionInfo.versions) {
                                if (obj.sys == sysVer) {
                                    return obj.semVer;
                                }
                            }
                            return null;
                        };
            
                        const versionText = function(f, v) {
                            let text = v.toString();
            
                            // Takes a module array (m) element or a dependency array element
                            if (f == 's') {
                                const semVer = systemVersionToSemVer(v);
                                if (semVer) {
                                    text += ' (' + semVer + ')';
                                }
                            }
                            return text;
                        }
            
                        // Module version information (m)
                        for(const moduleObj of describeObj.m) {
                            const trElem = document.createElement('tr');
            
                            console.log('moduleObj', moduleObj);
            
                            let title = displayParts.find(e => e.id == moduleObj.f).title;
                            
                            {
                                const tdElem = document.createElement('td');
                                $(tdElem).text(title);
                                $(trElem).append(tdElem);
                            }
                            {
                                const tdElem = document.createElement('td');
            
                                let text = '';
                                
                                if (moduleObj.f != 'u') {
                                    text += 'version ' + moduleObj.v + ', ';
                                }
            
                                if (moduleObj.vc != moduleObj.vv) {
                                    text += 'required dependencies are missing: ';
                                    for(const depObj of moduleObj.d) {
                                        const depModuleObj = describeObj.m.find(e => e.f == depObj.f && e.n == depObj.n);
                                        if (depModuleObj) {
                                            const depModuleTitle = displayParts.find(e => e.id == depObj.f).title;   
                                            text += depModuleTitle + ' is currently version ' + versionText(depModuleObj.f, depModuleObj.v) +
                                                    ' must be ' + versionText(depObj.f, depObj.v);
                                        }
                                    }
                                }
                                else {
                                    text += 'dependencies are valid';
                                }
            
                                $(tdElem).text(text);
                                $(trElem).append(tdElem);
                            }
                            $(tbodyElem).append(trElem);
                        }
            
                        // Other parameters
                        for(const key in describeObj) {
                            const trElem = document.createElement('tr');
            
                            if (key == 'm') {
                                continue;
                            }
            
                            {
                                const tdElem = document.createElement('td');
                                $(tdElem).addClass('apiHelperEventViewerTableLeftColumn');
                                $(tdElem).text(key);
                                $(trElem).append(tdElem);
                            }
                            {
                                const tdElem = document.createElement('td');
                                $(tdElem).text(describeObj[key]);
                                $(trElem).append(tdElem);
                            }
            
                            $(tbodyElem).append(trElem);
                        }
            
            
                        $(tableElem).append(tbodyElem);
            
                        return tableElem;
                    }
            
                    // event-viewer is a <code> element, which is in a <pre>
                    const eventData = $(this).text();
                    const preEvent = $(this).parent();
            
                    const outerDivElem = document.createElement('div');
            
                    for(let line of eventData.split('\n')) {
                        line = line.trim();
                        if (line == '') {
                            continue;
                        }
                        let eventJson;
                        try {
                            eventJson = JSON.parse(line);
                        }
                        catch(e) {
                            continue;
                        }
            
                        const tableElem = document.createElement('table');
                        $(tableElem).addClass('apiHelperEventViewerTable');
            
                        const tbodyElem = document.createElement('tbody');
            
                        for(const rowObj of rows) {
                            if (typeof eventJson[rowObj.key] == 'undefined') {
                                continue;
                            }
                            if (eventJson[rowObj.key] == '' && rowObj.omitIfEmpty) {
                                continue;
                            }
                            
                            const trElem = document.createElement('tr');
            
                            {
                                const tdElem = document.createElement('td');
                                $(tdElem).addClass('apiHelperEventViewerTableLeftColumn');
                                $(tdElem).text(rowObj.key);
                                $(tdElem).attr('title', rowObj.title);
                                $(trElem).append(tdElem);
                            }
                            {
                                const tdElem = document.createElement('td');
                                $(tdElem).text(eventJson[rowObj.key]);
                                $(trElem).append(tdElem);
                            }
            
                            $(tbodyElem).append(trElem);
                        }
            
                        $(tableElem).append(tbodyElem);
                        $(outerDivElem).append(tableElem);    
            
            
                        if (eventJson.name == 'spark/status/safe-mode') {
                            // Decode safe mode events in a new table
                            try {
                                $(outerDivElem).append(createSafeModeTable(JSON.parse(eventJson.data)));    
                            }
                            catch(e) {
            
                            }
                        }
                    }
            
                    $(preEvent).replaceWith(outerDivElem);
            
                });
            

            });

    }

    if ($('.apiHelper').length == 0) {
        return;
    }

    if (!apiHelper.auth) {
        $('.apiHelperEventViewerStatus').text('Log in to view events');
        $('.apiHelperEventViewerControls').hide();
        return;
    }

    $('.apiHelperEventViewer').each(function() {
        const thisPartial = $(this);
        const eventCategory = 'Particle Event Viewer';

        let monitor;

        $(thisPartial).find('.apiHelperEventViewerControls').show();

        apiHelper.deviceList($(thisPartial).find('.apiHelperEventViewerDeviceSelect'), {
            getTitle: function(dev) {
                return dev.name + (dev.online ? '' : ' (offline)');
            },
            hasAllDevices: true,
            hasRefresh: true,
            onChange: function(elem) {
                const newVal = $(elem).val();
            }
        });    

        $(thisPartial).find('.apiHelperEventViewerEnable').each(function(index) {
            const parentSpan =  $(this).closest('span');
            const id = 'apiHelperEventViewerEnableCheckbox' + index;
            $(this).attr('id', id);
            $(parentSpan).find('label').attr('for', id);
        });
        
        $(thisPartial).find('.apiHelperEventViewerEnable').change(function() {
            if (this.checked) {
                apiHelper.eventViewer.start(this);
                monitor = apiHelper.monitorUsage({ eventCategory, actionPrefix: 'Event Monitor Usage '});
            }
            else {
                monitor.done();
            }
        });

        $(thisPartial).find('.apiHelperEventViewerDeviceSelect').change(function() {
            apiHelper.eventViewer.updateFilter(this);
        });

        $(thisPartial).find('.apiHelperEventViewerFilter').on('input', function() {
            apiHelper.eventViewer.updateFilter(this);
        });

        if ($(thisPartial).find('.apiHelperEventViewerOutput > table').length > 0) {
            $(thisPartial).find('.apiHelperEventViewerOutput > table > tbody').on('click', function(ev) {
                const thisTable = $(ev.target).closest('table');
                $(thisTable).find('tr').removeClass('apiHelperSelectedRow');

                const thisRow = $(ev.target).closest('tr');
                $(thisRow).addClass('apiHelperSelectedRow');

                apiHelper.eventViewer.clickRow(thisRow);
            });
        }    
    });



});
