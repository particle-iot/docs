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
    this.addIDs();
    // this.addAnchors();
    this.generateTOC();
    this.tagImages();
    this.buttonize();
  };

  /**
   * Adds IDs to headings.
   */

  Docs.addIDs = function() {
    $('.content').find('h1').each(function() {
      var $el = $(this);
      var text = $el.text();
      var id = slugify(text);
      $el.attr('id', id);
    });

    $('.content').find('h2').each(function() {
      var $el = $(this);
      var text = $el.text();
      var id = slugify(text);
      var $parent = $el.prevAll('h1').first();
      if ($parent.is('h1')) {
        var parent_id = slugify($parent.text());
        $el.attr('id', parent_id + '-' + id);
      } else {
        $el.attr('id', id);
      }
    });

    $('.content').find('h3').each(function() {
      var $el = $(this);
      var text = $el.text();
      var id = slugify(text);
      var $parent = $el.prevAll('h2').first();
      if ($parent.is('h2')) {
        var parent_id = slugify($parent.text());
        $el.attr('id', parent_id + '-' + id);
      } else {
        $el.attr('id', id);
      }
    });
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
   * Returns menu data for a given HTML.
   */

  Docs.getMenu = function() {
    var menu = [];

    $('.content').find('h1, h2, h3').each(function() {
      var $el = $(this);
      var level = +(this.nodeName.substr(1));

      var obj = { section: $el.text(), items: [], level: level, id: $el.attr('id') };
      menu.push(obj);
    });

    return menu;
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
   * Creates the Table of Contents.
   */

  Docs.generateTOC = function() {

    // TODO: Find the right ul
    var $el = $(".active");

    var menu = this.getMenu();

    if (menu.length > 0) {
      menu.forEach(function(item) {
        var id = item.id;

        var $li = $('<li>')
          .attr('id', id + '-item')
          .addClass('level-' + item.level)
          .appendTo($el);

        if (item.section) {
          var $a = $('<a>')
            .html(item.section)
            .attr('id', id + '-link')
            .attr('href', '#/' + Docs.section + '/' + id)
            .addClass('level-' + item.level)
            .appendTo($li);
        }
      });
    }
  };

  function slugify(text) {
    return text.toLowerCase().match(/[a-z0-9]+/g).join('-');
  }
})(jQuery);
