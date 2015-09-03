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
    var successExamplesIndex = {};
    if (route.examples) {
      examplesIndex = _.groupBy(route.examples, 'title');
    }
    if (route.success) {
      successExamplesIndex = _.groupBy(route.success.examples, 'title');
    }

    _.each(route.parameter.fields, function(params, title) {
      if (title === 'Parameter') {
        baseParams = params;
        baseSuccess = (route.success.fields || {})['Success 200'] || [];
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
        newRoute.examples = examplesIndex[groupKey];
        newRoute.examples.forEach(function (ex) {
          ex.title = ex.content;
        });
      } else {
        newRoute.examples = null;
      }
      // remove copied examples from base
      route.examples = _.difference(route.examples, newRoute.examples);

      if (successExamplesIndex[groupKey] && successExamplesIndex[groupKey].length) {
        newRoute.success.examples = successExamplesIndex[groupKey];
        newRoute.success.examples.forEach(function (ex) {
          ex.title = ex.content;
        });
      } else {
        newRoute.success.examples = null;
      }
      route.success.examples = _.difference(route.success.examples, newRoute.success.examples);

      // add to list of all routes
      i++;
      data.splice(i, 0, newRoute);
    });
  }
}

function assignOrder(data) {
  data.forEach(function (route) {
    var groupParts = route.group.split('_');
    route.group = groupParts[0];
    route.order = +groupParts[1] || 99;
  });
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

    var apiReturn = apidoc.createDoc(options);
    if (!apiReturn) {
      return done(new Error('Error'));
    }

    //console.log(apiReturn.data);
    var goodData = JSON.parse(apiReturn.data);
    assignOrder(goodData);
    breakOutAlternativeOperations(goodData);

    goodData.forEach(function (route) {
      if (route.parameter) {
        trimParameters(route.parameter.fields);
      }

      if (route.success) {
        trimParameters(route.success.fields);
        nestParameters(route.success.fields);
      }
    });
    goodData = _.sortBy(goodData, 'group');
    apiReturn.data = _.groupBy(goodData, 'group');
    _.each(apiReturn.data, function (routes, name) {
      apiReturn.data[name] = _.sortBy(routes, 'order');
    });

    var destFile = files[options.destFile];
    if (destFile) {
      destFile.apiGroups = apiReturn.data;
    }
    return done();
  };
};
