'use strict';

var apidoc = require('apidoc');
var _ = require('lodash');
var fs = require('fs');

function trimParam(string) {
  if (!string) return string;
  if (string.indexOf('<p>') !== 0) return string;
  return string.trim().slice(3, -4);
}

function trimParameters(allParams) {
  if (!allParams) return;

  _.each(allParams, function (params, key) {
    params.forEach(function (param) {
      // remove unnecessary <p></p> tags from start and end
      param.type = trimParam(param.type);
      param.description = trimParam(param.description);
    });
  });
}

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

function breakOutAlternativeOperations(data) {
  for (var i=0; i < data.length; i++) {
    var route = data[i];
    if (!route.parameter) continue;

    var baseParams, baseSuccess;
    var examplesIndex = {};
    if (route.parameter) {
      examplesIndex = _.groupBy(route.parameter.examples, 'title');
    }

    _.each(route.parameter.fields, function(params, title) {
      if (title === 'Parameter') {
        baseParams = params;
        baseSuccess = route.success.fields['Success 200'] || [];
        return;
      }

      // create new clone route
      var groupKey = params[0].group;
      var newRoute = _.cloneDeep(route);
      newRoute.title = title;
      newRoute.description = null;
      newRoute.parameter.fields = {
        Parameter: baseParams.concat(params)
      };

      // grab op specific response fields too
      var responseFields = route.success.fields[title];
      if (responseFields) {
        newRoute.success.fields = {
          'Success 200': baseSuccess.concat(responseFields)
        };
        delete route.success.fields[title];
      }

      // copy over specific examples
      if (examplesIndex[groupKey] && examplesIndex[groupKey].length) {
        newRoute.parameter.examples = examplesIndex[groupKey];
        newRoute.parameter.examples.forEach(function (ex) {
          ex.title = ex.content;
        });
      } else {
        newRoute.parameter.examples = null;
      }

      // remove copied examples from base
      route.parameter.examples = _.difference(route.parameter.examples, newRoute.parameter.examples);

      // add to list of all routes
      i++;
      data.splice(i, 0, newRoute);
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

    //options.lineEnding = 'CR';
    var apiReturn = apidoc.createDoc(options);
    if (!apiReturn) {
      return done(new Error('Error'));
    }

    //console.log(apiReturn.data);
    var goodData = JSON.parse(apiReturn.data);
    breakOutAlternativeOperations(goodData);
    //console.log(goodData);

    goodData.forEach(function (route) {
      if (route.parameter) {
        trimParameters(route.parameter.fields);
      }

      if (route.success) {
        trimParameters(route.success.fields);
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
