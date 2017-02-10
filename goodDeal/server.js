var scrapeLbc = require('./scrapeLbc.js')
var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.use(express.static('www'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/www/index.html" );
})

app.get('/process_get', function (req, res) {
   url = req.query.url;
   scrapeLbc(url);

   //var myTown = json.town.replace(/\s+/g, '-').toLowerCase();
   //var url2 = "https://www.meilleursagents.com/prix-immobilier/"+myTown;
   //scrapeMA(url2);
   res.sendFile( __dirname + "/www/index.html" );
})

var server = app.listen(3000, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://localhost:%s", port);
})
