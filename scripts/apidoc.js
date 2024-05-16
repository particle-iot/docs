'use strict';

var apidoc = require('apidoc');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var apiScopes = [];

function assignOrder(data) {
  data.forEach(function (route) {
    var groupParts = route.group.split('.');
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
      apiOptions.config = metalsmith.path(apiOptions.config);
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

      const options = {
        ...apiOptions,
        src: [apiOptions.src]
      };
      var apiReturn = apidoc.createDoc(options);
      if (!apiReturn) {
        return new Error('Error');
      }
      // apidoc terminates lines with CR, which doesn't work well with GitHub diffs
      let dataArray = JSON.parse(apiReturn.data.replace(/\r/g, '\n'));

      // Filter filename to remove beginning of path
      for(let ii = 0; ii < dataArray.length; ii++) {
        let obj = dataArray[ii];
        if (obj.filename) {
          let index = obj.filename.indexOf('api-service');
          if (index > 0) {
            obj.filename = obj.filename.substr(index);
          }
        }
      }

      fs.writeFileSync(savePath, JSON.stringify(dataArray, null, 2));
      //console.log(apiReturn.data);
      return dataArray;
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

    apiData.forEach(function (route) {
      if (route.permission) {
        // permission: [ { name: 'devices.diagnostics.summary:get' } ],
        for(const obj of route.permission) {
          if (obj.name && !apiScopes.includes(obj.name)) {
            apiScopes.push(obj.name);
          }
        }
      }
    });

    var apiGroups = _.groupBy(_.sortBy(apiData, 'group'), 'group');
    _.each(apiGroups, function (routes, name) {
      apiGroups[name] = _.sortBy(routes, 'order');
    });

    var destFile = files[options.destFile];
    if (destFile) {
      destFile.apiGroups = apiGroups;

      destFile.scopeList = '<ul>';
      apiScopes.sort();

      const scopesFile = path.join(__dirname, '..', 'src', 'assets', 'files', 'userScopes.json');
      let updateFile;
      const newContents = JSON.stringify(apiScopes, null, 2);
      if (fs.existsSync(scopesFile)) {
        const oldContents = fs.readFileSync(scopesFile, 'utf8');
        updateFile = (newContents != oldContents);
      }
      else {
        updateFile = true;
      }
      if (updateFile) {
        fs.writeFileSync(scopesFile, newContents);
      }

      for(const name of apiScopes) {
        destFile.scopeList += '<li>' + name;
      }
      destFile.scopeList += '</ul>';
    }
    return done();
  };
};
