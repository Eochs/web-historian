var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var initialize = require('./initialize');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if(req.method === 'GET') {
    //handle base route, send back index.html
    if(req.url === '/') {
      fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, html) {
        if (err) {
          console.log(html);
          throw err;
        } else {
          res.writeHeader(200, {"Content-Type": 'text/html'});
          res.write(html);
          res.end();
        }
      });
    } else { // '/www.google.com'
    //if (req.method === '/'archive.archivedSites) {
      // localhost3000/www.google.com
      // var site = req.url.split('/').slice(-1);
      // //initialize()
      // fs.re
      // get url path request
      var pathname = url.parse(req.url).pathname.slice(1); //everything after the slash

      // check if in archive
        // send down the file in response
      // else not in archive
        // send robots txt about not having file      
          
        

    }

  } else if (req.method === 'POST') {
      var tempurl = '';
      request.on('data', function(data){
        tempurl += data.toString();
      });

      req.on('end', function(){
        archive.isUrlArchived(pathname, function(isIn) {
        if (isIn) {
          // serve it up by reading file and sending it in response
          fs.readFile(pathname, 'utf8', function(err, html){
            if (err) {
              console.log('errored on isUrlArchived');
              throw err;
            } else {
              res.writeHeader(200, {"Content-Type": 'text/html'});
              res.write(html);
              res.end();
            }
            });
          } else {
            // add to list of sites for helper to get
            archive.addUrlToList(pathname, function(){});
            // res.write that robot is worrking on it
          }
        });
      });

  } else if (req.method === 'OPTIONS') {

  }


  //res.end(archive.paths.list);
};
