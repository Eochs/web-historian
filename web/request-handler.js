var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var initialize = require('./initialize');
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
    } else {//if (req.method === '/'archive.archivedSites) {
      // var site = req.url.split('/').slice(-1);
      // //initialize()
      // fs.re
      // 
      // check if in archive

        // if not
          // add to list of sites for helper to get
          // res.write that robot is worrking on it
        // if is
          // serve it up by reading file and sending it in response


    }

  } else if (req.method === 'POST') {

  } else if (req.method === 'OPTIONS') {

  }


  //res.end(archive.paths.list);
};
