var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
  // list: path.join(__dirname, '../test/testdata/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  return fs.readFile(exports.paths.list, 'utf8', function(err, sites) {
    if (err) {
      throw err;
    } else {
      return callback(sites.split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback) {
  return fs.readFile(exports.paths.list, 'utf8', function(err, sites) {
    if (err) {
      throw err;
    } else {
      return callback(sites.split('\n').indexOf(url) > -1);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  return fs.appendFile(exports.paths.list, url, function (err) {
    if (err) throw err;
    return callback();
  });

};

exports.isUrlArchived = function(url, callback) {
  return fs.stat(exports.paths.archivedSites + url, function(err, stat){
    return callback(!err);
  });
};

exports.downloadUrls = function(urls) {
  // for each url call html fetcher on it
  urls.forEach(function(url){
    request('http://'+url, function (error, response, body) {
        // console.log('body: ', body.slice(0, 10));
        console.log('error: ', error);
        // console.log('response-status: ', response.status);

        var fixtureName = url; //pathname in req handler
        var fixturePath = exports.paths.archivedSites + "/" + fixtureName;
        // Create or clear the file.
        var fd = fs.openSync(fixturePath, "w");
        fs.writeSync(fd, body);
        // console.log('body: ', body);
        fs.closeSync(fd);

        // Write data to the file.
        fs.writeFileSync(fixturePath, url);
    });
  });

  // Reset the sites.txt file to empty
  fs.writeFile(exports.paths.list, '');

// 
};
