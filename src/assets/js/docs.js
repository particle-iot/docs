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

  Docs.createH3Waypoints = function(h3s) {
      h3s.each(function() {
        var element = $(this)[0];
        setTimeout(function() {
          var waypoint = new Waypoint.Inview({
            element: element,
            exit: function(direction) {
              if(direction === 'down') {
                var elementId = this.element.id;
                var $correspondingNavElement = $('ul.in-page-toc li a[href="#' + elementId + '"]').parent();
                $('ul.in-page-toc li').removeClass('active');
                $correspondingNavElement.addClass('active');
              }
            },
            enter: function(direction) {
              if(direction === 'up') {
                var elementId = this.element.id;
                var $correspondingNavElement = $('ul.in-page-toc li a[href="#' + elementId + '"]').parent();
                $('ul.in-page-toc li').removeClass('active');
                $correspondingNavElement.addClass('active');
              }
            },
            context: $('.content-inner')[0]
          });
        }, 0);
     })
  };

  Docs.buildTableOfContents = function() {
    var $h2s = $('.content h2');

    $h2s.each(function() {
      var h3WaypointsCreated = false;
      var waypoint = new Waypoint.Inview({
        element: $(this)[0],
        exit: function(direction) {
          var $h2 = $(this.element);
          if(direction === 'down') {
            var elementId = this.element.id;
            var $correspondingNavElement = $('ul.in-page-toc li a[href="#' + elementId + '"]').parent();
            $('ul.in-page-toc li').removeClass('active');
            $correspondingNavElement.addClass('active');
            // Show the sub navigation
            $('ul.secondary-in-page-toc').hide();
            var $secondaryNav = $correspondingNavElement.next('.secondary-in-page-toc');
            if($secondaryNav.length > 0) {
              $secondaryNav.show();
            }
            var $nextH3s = $h2.nextUntil('h2', 'h3');
            if(!h3WaypointsCreated) {
              Docs.createH3Waypoints($nextH3s);
              h3WaypointsCreated = true;
            }
          }
        },
        enter: function(direction) {
          if(direction === 'up') {
            var elementId = this.element.id;
            var $correspondingNavElement = $('ul.in-page-toc li a[href="#' + elementId + '"]').parent();
            $('ul.in-page-toc li').removeClass('active');
            // Show the sub navigation
            $('ul.secondary-in-page-toc').hide();
            var $secondaryNav = $correspondingNavElement.prev('.secondary-in-page-toc');
            if($secondaryNav.length > 0) {
              $secondaryNav.find('li:last-of-type').addClass('active');
              $secondaryNav.show();
            } else {
              var $thisSecondaryNav = $correspondingNavElement.next('.secondary-in-page-toc');
              console.log($thisSecondaryNav);
              $thisSecondaryNav.length > 0 ? $correspondingNavElement.prev('li').addClass('active') : $correspondingNavElement.addClass('active');
            }
          }
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
