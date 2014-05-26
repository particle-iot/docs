/**
*
* Table of Contents generator.
*
* Based on:
* Assemble Contrib Plugin: TOC
* https://github.com/assemble/assemble-contrib-toc
*
* Copyright (c) 2013 Brian Woodward
* @author: https://github.com/doowb
*
* @param {[type]} params [description]
* @param {Function} callback [description]
* @return {[type]} [description]
*/

var options = {
  stage: 'render:post:page'
};

var cheerio = require('cheerio');

module.exports = function(params, callback) {
  'use strict';

  var grunt = params.grunt;
  var page = params.page;
  var content = params.content;

  var opts = page.data.toc || params.assemble.options.toc;

  // id to use to append TOC
  var id = '#' + (opts.id || 'toc');
  var modifier = opts.modifier || '';
  var li = opts.li ? (' class="' + opts.li + '"') : '';

  // load current page content
  var $ = cheerio.load(content);
  var $toc = $(id);

  // create menu object
  var menu = [];

  $('.content').find('h1, h2, h3').each(function() {
    var $el = $(this);
    var level = +($el[0].name.substr(1));

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
          .attr('href', '#')
          .addClass('level-' + item.level);
          $li.append($a);
      }

      $toc.append($li);


    });
  }

  params.content = $.html();

  callback();
};

module.exports.options = options;
