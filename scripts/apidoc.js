'use strict';

var apidoc = require('apidoc');
var _ = require('lodash');
var fs = require('fs');

function nestParameters(allParams) {
  if (allParams) {
    _.each(allParams, function (params, key) {
      var indexedParameters = _.indexBy(allParams[key], 'field');
      var nestedParams = [];
      params.forEach(function (param) {
        var nameParts = param.field.split('.');
        if (nameParts.length > 1) {
          var parent = indexedParameters[nameParts[0]];
          if (parent) {
            if (!parent.nestedParams) {
              parent.nestedParams = [];
            }
            param.field = nameParts.slice(1).join('.');
            parent.nestedParams.push(param);
            nestedParams.push(param);
          }
        }
      });
      allParams[key] = _.difference(allParams[key], nestedParams);
    });
  }
}

module.exports = function(options) {
  return function(files, metalsmith, done) {
    options.parse = true;
    options.src = metalsmith.path(options.src);
    if (!fs.existsSync(options.src)) {
      return done();
    }
    var dirFiles = fs.readdirSync(options.src);
    if (!dirFiles.length) {
      return done();
    }

    options.lineEnding = 'LF';
    var apiReturn = apidoc.createDoc(options);
    if (!apiReturn) {
      return done(new Error('Error'));
    }

    var goodData = JSON.parse(apiReturn.data);
    goodData.forEach(function (route) {
      if (route.success) {
        nestParameters(route.success.fields);
      }
    });
    apiReturn.data = _.groupBy(goodData, 'group');

    var destFile = files[options.destFile];
    if (destFile) {
      destFile.apiGroups = apiReturn.data;
    }
    return done();
  };
};
