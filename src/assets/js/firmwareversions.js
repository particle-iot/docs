(function($) {

  var delimiter1 = "#firmware-release-wrapper";
  var delimiter2 = "#firmware-release-wrapper-1";
  var id = "firmware-release";
  var version = getVersion();

  hideDelimiters();

  if (!version) {
    hideReleaseNotes();
  } else {
    handleVersion(version);
  }

  function hideDelimiters() {
    $(delimiter1).hide();
    $(delimiter2).hide();
  }

  function hideReleaseNotes() {
    $(getReleaseNotes()).hide();
    $(getMenuItem()).hide();
  }

  function handleVersion(version) {
    //Hide all version parts that are not related to this one
    $(".content").children().each(function() {
      if (this.id.indexOf('-ver-') !== -1 && this.id.indexOf('if-') !== -1 && this.id.indexOf('end') === -1) {
        var id = this.id.substr(5);

        //Get block number
        var blockNumber = id.substr(id.lastIndexOf('-')).substr(1); //1

        var elm1 = $("#" + this.id);
        var elm2 = $("#" + this.id.replace('if', 'endif'));

        var thisVersion = id.substr(0, id.indexOf('if-')).replace(/-/g, '.');

        if (version !== thisVersion) {
          elm1.nextUntil(elm2).hide();
        }
      }

      //Hide all delimitators
      if (this.id.indexOf('-ver-') !== -1) {
        $(this).hide();
      }

      //Replace all of the occurances of @@@VER@@@ with the version
      var replaced = $(this).html().replace(/\@VER\@/g, version);

      $(this).html(replaced);
    });
  }

  function getMenuItem() {
    return $("a[href=#" + id + "][class!=header-permalinks]").parent("li");
  }

  function getReleaseNotes() {
    return $(delimiter1).nextUntil(delimiter2);
  }

  function getVersion() {

    var version = null;

    var queryParam = window.location.search;

    if (queryParam) {
      var params = queryParam.substr(1).split('=');

      if (params[0] == 'version' && params[1]) {
        version = params[1];
      }

    }

    return version;

  }
})(jQuery);
