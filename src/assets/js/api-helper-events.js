
apiHelper.eventViewer = {};

apiHelper.eventViewer.events = [];

apiHelper.eventViewer.addRow = function(eventViewerElem, event) {
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

    let html = '<tr>';
    html += '<td class="apiHelperEventViewerEvent">' + event.name + '</td>';
    html += '<td class="apiHelperEventViewerData">' + event.data + '</td>';
    html += '<td class="apiHelperEventViewerDevice">' + deviceName + '</td>';
    html += '<td class="apiHelperEventViewerTime">' + time + '</td>';
    html += '</tr>';

    $(eventViewerElem).find('.apiHelperEventViewerOutput > table > tbody').prepend(html);
};

apiHelper.eventViewer.event = function(event) {
    apiHelper.eventViewer.events.push(event);

    $('.apiHelperEventViewer').each(function(index) {
        if ($(this).find('.apiHelperEventViewerEnable').prop('checked')) {
            apiHelper.eventViewer.addRow($(this), event);
        }
    });
};

apiHelper.eventViewer.updateFilter = function(elem) {
    const eventViewerElem = $(elem).closest('div.apiHelperEventViewer');

    $(eventViewerElem).find('.apiHelperEventViewerOutput > table > tbody').html('');
    apiHelper.eventViewer.events.forEach(function(event) {
        apiHelper.eventViewer.addRow(eventViewerElem, event);
    });
};

apiHelper.eventViewer.start = function(elem) {
    if (!apiHelper.eventViewer.stream) {
        apiHelper.particle.getEventStream({ deviceId: 'mine', auth: apiHelper.auth.access_token }).then(function(stream) {
            apiHelper.eventViewer.stream = stream;
            
            stream.on('event', function(data) {
                apiHelper.eventViewer.event(data);
            });
        });
    }
};


$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    if ($('.apiHelperEventViewer').length > 0) {
        if (!apiHelper.auth) {
            $('.apiHelperEventViewerStatus').text('Log in to view events');
            $('.apiHelperEventViewerControls').hide();
            return;
        }

        $('.apiHelperEventViewerControls').show();

        apiHelper.deviceList($('.apiHelperEventViewerDeviceSelect'), {
            getTitle: function(dev) {
                return dev.name + (dev.online ? '' : ' (offline)');
            },
            hasAllDevices: true,
            hasRefresh: true,
            onChange: function(elem) {
                const newVal = $(elem).val();
            }
        });    

        $('.apiHelperEventViewerEnable').each(function(index) {
            const parentSpan =  $(this).closest('span');
            const id = 'apiHelperEventViewerEnableCheckbox' + index;
            $(this).attr('id', id);
            $(parentSpan).find('label').attr('for', id);
        });
        
        $('.apiHelperEventViewerEnable').change(function() {
            if (this.checked) {
                apiHelper.eventViewer.start(this);
            }
        });

        $('.apiHelperEventViewerDeviceSelect').change(function() {
            apiHelper.eventViewer.updateFilter(this);
        });

        $('.apiHelperEventViewerFilter').on('input', function() {
            apiHelper.eventViewer.updateFilter(this);
        });

    }

});
