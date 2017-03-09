/* StatusPage.io Widget */

$('.current-status-indicator').ready(function ($) {
  var colorCodes = {
    none: 'green',
    minor: 'blue',
    major: 'yellow',
    critical: 'red'
  };
  var sp = new StatusPage.page({ page : '8d849mp6fy12' });
  sp.status({
    success: function (data) {
      var description = data.status.description;
      var color = colorCodes[data.status.indicator];
      $("#current-status-description").text(description);
      $(".current-status-indicator").removeClass("empty").addClass(color);
    }
  });
});
