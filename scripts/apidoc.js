'use strict';

var apidoc = require('apidoc');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

function trimParam(string) {
  if (!string) {
    return string;
  }
  var pCount = (string.match(/<p>/g) || []).length;
  if (pCount !== 1) {
    return string;
  }
  if (string.indexOf('<p>') !== 0 || string.indexOf('</p>') !== string.length - 4) {
    return string;
  }
  return string.trim().slice(3, -4);
}

function trimParameters(allParams) {
  if (!allParams) return;

  _.each(allParams, function (params, key) {
    params.forEach(function (param) {
      // remove unnecessary <p></p> tags from start and end
      param.type = trimParam(param.type);
      param.description = param.description;
    });
  });
}

function nestParameters(allParams) {
  if (allParams) {
    _.each(allParams, function (params, key) {
      var indexedParameters = _.keyBy(allParams[key], 'field');
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

    var baseParams, baseSuccess, baseError;
    var examplesIndex = {};
    var successExamplesIndex = {};
    var errorExamplesIndex = {};
    if (route.examples) {
      examplesIndex = _.groupBy(route.examples, 'title');
    } else {
      route.examples = {};
    }

    if (route.success) {
      successExamplesIndex = _.groupBy(route.success.examples, 'title');
    } else {
      route.success = {};
    }

    if (route.error) {
      errorExamplesIndex = _.groupBy(route.error.examples, 'title');
    } else {
      route.error = {};
    }

    _.each(route.parameter.fields, function(params, title) {
      if (title === 'Parameter') {
        baseParams = params;
        baseSuccess = (route.success.fields || {})['Success 200'] || [];
        baseError = (route.error.fields || {})['Error 4xx'] || [];
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
      var responseFields = (route.success.fields || {})[title];
      if (responseFields) {
        newRoute.success.fields = {
          'Success 200': baseSuccess.concat(responseFields)
        };
        delete route.success.fields[title];
      }
      var errorFields = (route.error.fields || {})[title];
      if (errorFields) {
        newRoute.error.fields = {
          'Error 4xx': baseError.concat(errorFields)
        };
        delete route.error.fields[title];
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

      if (errorExamplesIndex[groupKey] && errorExamplesIndex[groupKey].length) {
        newRoute.error.examples = errorExamplesIndex[groupKey];
        newRoute.error.examples.forEach(function (ex) {
          ex.title = ex.content;
        });
      } else {
        newRoute.error.examples = null;
      }
      route.error.examples = _.difference(route.error.examples, newRoute.error.examples);

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
    var apiData = options.apis.map(function processApi(apiOptions) {
      const savePath = path.join(__dirname, '..', 'generated', path.basename(apiOptions.src) + '.json');
      apiOptions.parse = true;
      apiOptions.src = metalsmith.path(apiOptions.src);
      if (!fs.existsSync(apiOptions.src)) {
        if (fs.existsSync(savePath)) {
          return JSON.parse(fs.readFileSync(savePath, 'utf8'));
        }
        
        return null;
      }
      var dirFiles = fs.readdirSync(apiOptions.src);
      if (!dirFiles.length) {
        return null;
      }

      var apiReturn = apidoc.createDoc(apiOptions);
      if (!apiReturn) {
        return new Error('Error');
      }
      fs.writeFileSync(savePath, apiReturn.data);
      //console.log(apiReturn.data);
      return JSON.parse(apiReturn.data);
    }).reduce(function collectApiData(data, thisData) {
      return thisData ? data.concat(thisData) : data;
    }, []);

    // Don't continue if directory is missing
    if (apiData.length === 0) {
      return done();
    }

    // Don't continue if error
    var err;
    if (err = _.find(apiData, _.isError)) {
      return done(err);
    }

    assignOrder(apiData);
    breakOutAlternativeOperations(apiData);

    apiData.forEach(function (route) {
      if (route.parameter) {
        trimParameters(route.parameter.fields);
      }

      if (route.success) {
        trimParameters(route.success.fields);
        nestParameters(route.success.fields);
      }

      if (route.error) {
        trimParameters(route.error.fields);
        nestParameters(route.error.fields);
      }
    });

    var apiGroups = _.groupBy(_.sortBy(apiData, 'group'), 'group');
    _.each(apiGroups, function (routes, name) {
      apiGroups[name] = _.sortBy(routes, 'order');
    });

    var destFile = files[options.destFile];
    if (destFile) {
      destFile.apiGroups = apiGroups;
    }
    return done();
  };
};
