(function($) {
  // only load on firmware.md
  if (window.location.href.indexOf('firmware') === -1) {
    return;
  }

  var delimiter1 = "#release-notes-wrapper";
  var delimiter2 = "#release-notes-wrapper-1";
  var id = "programming-and-debugging-notes";
  var fw_ver = getQueryString("fw_ver");
  var cli_ver = getQueryString("cli_ver");
  var electron_parts = getQueryString("electron_parts");

  hideDelimiters();

  if (!fw_ver || !cli_ver || !electron_parts) {
    hideReleaseNotes();
  } else {
    handleFWVersion(fw_ver);
    handleCLIVersion(cli_ver);
    handleElectronParts(electron_parts);
  }

  function hideDelimiters() {
    $(delimiter1).hide();
    $(delimiter2).hide();
  }

  function hideReleaseNotes() {
    $(getReleaseNotes()).hide();

    // On second thought let's keep the menu available to
    // prompt users to select the right versions.
    // $(getMenuItem()).hide();
  }

  function handleFWVersion(version) {
    //Hide all version parts that are not related to this one
    $(".content").children().each(function() {
      if (this.id.indexOf('-fw_ver-') !== -1 && this.id.indexOf('if-') !== -1 && this.id.indexOf('end') === -1) {
        var id = this.id.substr(8); // "-fw_ver-" == 8 chars

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
      if (this.id.indexOf('-fw_ver-') !== -1) {
        $(this).hide();
      }

      //Replace all of the occurances of @@@FW_VER@@@ with the version
      var replaced = $(this).html().replace(/\@FW_VER\@/g, version);

      $(this).html(replaced);
    });
  }

  function handleCLIVersion(version) {
    //Hide all version parts that are not related to this one
    $(".content").children().each(function() {
      if (this.id.indexOf('-cli_ver-') !== -1 && this.id.indexOf('if-') !== -1 && this.id.indexOf('end') === -1) {
        var id = this.id.substr(9); // "-cli_ver-" == 9 chars

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
      if (this.id.indexOf('-cli_ver-') !== -1) {
        $(this).hide();
      }

      //Replace all of the occurances of @@@CLI_VER@@@ with the version
      var replaced = $(this).html().replace(/\@CLI_VER\@/g, version);

      $(this).html(replaced);
    });
  }

  function handleElectronParts(value) {
    //Hide all 2 or 3 part electron bodies of text
    $(".content").children().each(function() {
      if (this.id.indexOf('-electron_parts-') !== -1 && this.id.indexOf('if-') !== -1 && this.id.indexOf('end') === -1) {
        var id = this.id.substr(16); // "-electron_parts-" == 16 chars

        //Get block number
        var blockNumber = id.substr(id.lastIndexOf('-')).substr(1); //1

        var elm1 = $("#" + this.id);
        var elm2 = $("#" + this.id.replace('if', 'endif'));

        var thisValue = id.substr(0, id.indexOf('if-')).replace(/-/g, '.');

        if (value !== thisValue) {
          elm1.nextUntil(elm2).hide();
        }
      }

      //Hide all delimitators
      if (this.id.indexOf('-electron_parts-') !== -1) {
        $(this).hide();
      }

      //Replace all of the occurances of @@@ELECTRON_PARTS@@@ with the value
      var replaced = $(this).html().replace(/\@ELECTRON_PARTS\@/g, value);

      $(this).html(replaced);
    });
  }

  function getMenuItem() {
    return $("a[href=#" + id + "][class!=header-permalinks]").parent("li");
  }

  function getReleaseNotes() {
    return $(delimiter1).nextUntil(delimiter2);
  }

  /**
   * Get the value of a querystring
   * @param  {String} field The field to get the value of
   * @param  {String} url   The URL to get the value from (optional)
   * @return {String}       The field value
   * source: https://gomakethings.com/how-to-get-the-value-of-a-querystring-with-native-javascript/
   */
  function getQueryString( field, url ) {
      var href = url ? url : window.location.href;
      var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
      var string = reg.exec(href);
      return string ? string[1] : null;
  }

})(jQuery);
