var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var initialize = require('./initialize');
var httpHelpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if(req.method === 'GET') {
    //handle base route, send back index.html
    if(req.url === '/') {
      fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, html) {
        if (err) {
          throw err;
        } else {
          res.writeHeader(200, {"Content-Type": 'text/html'});
          res.write(html);
          res.end();
        }
      });
    } else { 

      var pathname = url.parse(req.url).pathname.slice(1); //everything after the slash

      fs.readFile(archive.paths.archivedSites + '/' + pathname, 'utf8', function(err, html) {
        if (err) {
          res.writeHeader(404);
          res.end();
        } else {
          res.writeHeader(200, {"Content-Type": 'text/html'});
          res.write(html);
          res.end();
        }
      });
          
    }

  } else if (req.method === 'POST') {
      // console.log('POST');
      var tempura = '';
      req.on('data', function(data){
        tempura += data.toString();
        console.log(data.toString());
        console.log(tempura);
      });
      
      // remove 'url=' from beginning of tempura

      req.on('end', function(){
        
        tempura = tempura.slice(4); 
        console.log(tempura);
        // console.log(tempura);

        // firsst check if in archive
        archive.isUrlArchived(tempura, function(isArchived) {
          console.log('url is archived: ', isArchived);

          if (isArchived) {
            // reroute to html page
            res.writeHead(200, httpHelpers.headers);
            res.end();
          } else if (!isArchived) {
            console.log('got to is url archived');
            // check if in list
            archive.isUrlInList(tempura, function(isInList){
              if (!isInList) {
                archive.addUrlToList(tempura + '\n', function(){
                  res.writeHead(302, httpHelpers.headers);
                  res.end();
                });
                //************************** DELETE
                // archive.downloadUrls(); // move all names in sites.txt to sites folder
                //***************************
              } else { // if its alread there don't do anything
                res.writeHead(302, httpHelpers.headers);
                res.end();
              }
            });

          }
        });
      });

  } else if (req.method === 'OPTIONS') {

  }


  //res.end(archive.paths.list);
};
