/*!

Documentation middleware.
Created by Zach Supalla.
(c) 2014 Spark Labs, Inc. MIT licensed.

Derived from Flatdoc (http://ricostacruz.com/flatdoc)
(c) 2013 Rico Sta. Cruz. MIT licensed.

*/

(function($) {
  var exports = this;

  /**
   * Basic Docs module.
   */

  var Docs = exports.Docs = {};

  Docs.transform = function() {
    this.removeCodeColumn();
    this.tagImages();
    this.buttonize();
    this.prettifyCode();
  };

  /**
   * Remove 3rd column if certain tag is found
   */

  Docs.removeCodeColumn = function() {
    // $('.content').match(/<!--removeCodeColumn-->/g).each(function() {
    //   alert("matched");
    //   $('div.code-samples').hide();
    // });

    // $('.content').find('!--').each(function() {
    //   var $comment = $(this);

    //   var m = $comment.text().match(/<!--removeCodeColumn-->/g);
    //   if (m) {
    //     alert("matched");
    //     $('div.code-samples').hide();
    //   };
    // });

    var content = jQuery('body').html();
    //alert(content.match(/<!--.*?-->/g));
    // if (content.match(/<!--removeCodeColumn-->/g)) {
    //   //$('div.code-samples').css("width","30%");
    //   // Hide 'code-samples' div
    //   $('div.code-samples').hide();

    //   // Move images back to the left
    //   $('.content').find('img').each(function() {
    //     var $el = $(this);
    //     $el.css("left","-450px");
    //   });

    //   // Move images back to the left
    //   $('.content').find('pre').each(function() {
    //     var $el = $(this);
    //     $el.css("left","-450px");
    //   });
    // }
  
  };

  /**
   * Tags paragraphs that include images.
   */

  Docs.tagImages = function() {
    $('.content').find('p:has(img)').each(function() {
      var $el = $(this);
      $el.addClass('img');
    });
  };

  /**
   * Changes "button >" text to buttons.
   */

  Docs.buttonize = function() {
    $('.content').find('a').each(function() {
      var $a = $(this);

      var m = $a.text().match(/^(.*) >$/);
      if (m) $a.text(m[1]).addClass('button');
    });
  };

  /**
   * Make code prettier
   */

  Docs.prettifyCode = function() {
    $('.content').find('pre code').each(function() {
      $(this).addClass("prettyprint");
    });
  };


  Docs.rememberDevices = function() {
    if(typeof(Storage) !== "undefined") {
      var currentPath = window.location.pathname;
      if(currentPath.indexOf("photon") > -1) {
        localStorage.setItem("lastDevice", "photon");
      } else if (currentPath.indexOf("core") > -1) {
        localStorage.setItem("lastDevice", "core");
      }
    }
  };

  // Ok, then let's do it!
  Docs.rememberDevices();
  Docs.transform();
  prettyPrint();

})(jQuery);
