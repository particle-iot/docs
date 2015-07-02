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
    this.tagImages();
    this.buttonize();
    this.prettifyCode();
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

  Docs.addClass = function() {
  };

  Docs.buildTableOfContents = function() {
    var $h2s = $('.content h2');
    var $h3s = $('.content h3');

    $h2s.each(function() {
      var waypoint = new Waypoint.Inview({
        element: $(this)[0],
        enter: function() {
          var elementId = this.element.id;
          var $correspondingNavElement = $('ul.in-page-toc li a[href="#' + elementId + '"]');
          $('ul.in-page-toc li a').removeClass('active');
          $correspondingNavElement.addClass('active');
        },
        context: $('.content-inner')[0]
      });
    });
  };


  // Ok, then let's do it!
  Docs.rememberDevices();
  Docs.transform();
  Docs.buildTableOfContents();
  prettyPrint();

})(jQuery);
