var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('', function(req, res) {
    // Let's scrape Anchorman 2
    url = 'https://www.leboncoin.fr/ventes_immobilieres/1076257949.htm?ca=12_s';

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var title, price, town, type, surface;
            var json = {
                price: "",
                town: "",
                type: "",
                surface: ""
            };

            var link_price = "#adview > section > section > section.properties.lineNegative > div:nth-child(5) > h2 > span.value";
            var link_town = "#adview > section > section > section.properties.lineNegative > div.line.line_city > h2 > span.value";
            var link_type = "#adview > section > section > section.properties.lineNegative > div:nth-child(7) > h2 > span.value";
            var link_surface = "#adview > section > section > section.properties.lineNegative > div:nth-child(9) > h2 > span.value";

            $(link_price).each(function() {
                var link = $(this);
                var text = link.text().trim();
                json.price = text;
            });
            $(link_town).each(function() {
                var link = $(this);
                var text = link.text().trim();
                json.town = text;
            });
            $(link_type).each(function() {
                var link = $(this);
                var text = link.text().trim();
                json.type = text;
            });

            $(link_surface).each(function() {
                var link = $(this);
                var text = link.text().trim();
                json.surface = text;
            });
        }

        fs.writeFile('outputLBC.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
    })
})


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;