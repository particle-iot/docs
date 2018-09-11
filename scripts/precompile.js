/* Outputs a JavaScript file with precompiled Handlebar templates that can be used
 * in the front-end JavaScript code.
 *
 * For template search.hbs, use it like this:
 *     var html = Handlebars.templates.search({results: niceResults});
 */

var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

module.exports = function(options) {
  return function(mfiles, metalsmith, done) {
    fs.readdir(metalsmith.path(options.directory), function (err, files) {
      if (err) throw err;
      var combo = 'Handlebars.templates={};\n';
      files.forEach(function(file) {
        var name = path.basename(file,'.hbs');
        var filepath = metalsmith.path(options.directory, file);
        var fileContents = fs.readFileSync(filepath, {encoding: 'utf8'});
        var precompiled = handlebars.precompile(fileContents, {srcName: file, knownHelpers: options.knownHelpers});
        var template = 'Handlebars.templates.' + name + ' = Handlebars.template(' + precompiled.code + ');\n';
        combo += template;
      });
      mfiles[options.dest] = { contents: combo };
    })
    done();
  };
};
