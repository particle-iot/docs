define([
  "jquery",
  "core/progress"
], function($, progress) {
  var preparePage = function() {
    var $docs = $('#docs');
    var $summary = $('.menubar');
    var currentPath = window.location.pathname;
    var $currentLink = $summary.find('li[data-level] a[href*="'+ currentPath +'"]');

    // Add an active class to the currently active link
    $currentLink.parent().addClass('active');
  };
  return {
    init: preparePage
  }
});
