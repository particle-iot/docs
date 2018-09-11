/* StatusPage.io Widget */

$('.current-status-indicator').ready(function ($) {
  var colorCodes = {
    none: 'green',
    minor: 'yellow',
    major: 'red',
    critical: 'red',
    maintenance: 'blue',
  };
  var sp = new StatusPage.page({ page : '8d849mp6fy12' });
  sp.summary({
    success: function (data) {
      var description = data.status.description;
      var color = colorCodes[data.status.indicator];
      var ongoingIncident = false;
      data.incidents.forEach(function (i) {
        if (i.status === "identified" || i.status === "investigating") {
          ongoingIncident = true;
        }
      });
      var scheduledMaintenance = false;
      data.scheduled_maintenances.forEach(function (m) {
        if (m.status === "in_progress") {
          scheduledMaintenance = true;
        }
      });
      if (color === 'green') {
        if (ongoingIncident) {
          color = 'yellow';
          description = 'Ongoing Incident';
        } else if (scheduledMaintenance) {
          color = 'blue';
          description = 'Scheduled maintenance';
        }
      }
      $('.current-status-description').text(description);
      $('.current-status-indicator').removeClass('empty').addClass(color);
      if (color !== 'green') {
        $(".current-status-incidents")
          .removeClass('empty')
          .addClass(color);
      }
    }
  });
});
