/**
*
* Create verbose anchors in the Spark docs.
* Helps with links and navigation.
*
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

  var opts = page.data.verbose || params.assemble.options.verbose;

  // Load current page content.
  var $ = cheerio.load(content);

  // Code to make a slug from some content.
  function slugify(text) {
    return text.toLowerCase().match(/[a-z0-9]+/g).join('-');
  }

  // Slugify the H1s all regular-like.
  $('.content').find('h1').each(function() {
    var $el = $(this);
    var text = $el.text();
    var id = slugify(text);
    $el.attr('id', id);
  });

  // Append the H2 slugs to the H1 slugs.
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

  // And so on, and so forth.
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

  params.content = $.html();

  callback();
};

module.exports.options = options;
