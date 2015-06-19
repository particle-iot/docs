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

  Docs.buildTableOfContents = function() {

    var pathArray = window.location.pathname.split('/');
    var page = pathArray[pathArray.length - 2];

    // var $toc = $('.menubar');
    var $toc = $('.menubar a[href*="' + page + '"]');

    if ($toc.length < 1) {
      $toc = $('.menubar');
    }

    // create menu object
    var menu = [];

    $('.content').find('h1, h2, h3').each(function() {
      var $el = $(this);
      var level = +($el[0].tagName.substr(1));

      var obj = { section: $el.text(), items: [], level: level, id: $el.attr('id') };
      menu.push(obj);
    });


    // Add the TOC
    if (menu.length > 0) {
      menu.forEach(function(item) {
        var id = item.id;

        var $li = $('<li>')
          .attr('id', id + '-item')
          .addClass('level-' + item.level);

        if (item.section) {
          var $a = $('<a>')
            .html(item.section)
            .attr('id', id + '-link')
            .attr('href', '#' + id)
            .addClass('level-' + item.level);
            $li.append($a);
        }

        $toc.append($li);

      });
    }
  };

  // Ok, then let's do it!
  Docs.rememberDevices();
  Docs.transform();
  Docs.buildTableOfContents();
  prettyPrint();

})(jQuery);
