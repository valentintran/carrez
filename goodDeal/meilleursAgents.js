var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('', function(req, res) {
    // Let's scrape Anchorman 2
    url = 'https://www.meilleursagents.com/prix-immobilier/l-isle-adam-95290/';

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var priceHouseLow, priceFlatLow, priceHouseMed, priceFlatMed, priceHouseUp, priceFlatUp;
            var json = {
                priceHouseLow: "",
                priceFlatLow: "",
                priceHouseMed: "",
                priceFlatMed: "",
                priceHouseUp: "",
                priceFlatUp: "",
            };

            var link_priceHouseLow = "#synthese > div > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.medium-offset-0.columns.prices-summary__cell--muted";
            var link_priceFlatLow = "#synthese > div > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.medium-offset-0.columns.prices-summary__cell--muted";
            var link_priceHouseMed = "#synthese > div > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.columns.prices-summary__cell--median";
            var link_priceFlatMed = "#synthese > div > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median";
            var link_priceHouseUp = "#synthese > div > div.prices-summary__values > div:nth-child(3) > div:nth-child(4)";
            var link_priceFlatUp = "#synthese > div > div.prices-summary__values > div:nth-child(2) > div:nth-child(4)";

            $(link_priceHouseLow).each(function() {
                var link = $(this);
                var text = link.text().trim();
                json.priceHouseLow = text;
            });
            $(link_priceHouseMed).each(function() {
                var link = $(this);
                var text = link.text().trim();
                json.priceHouseMed = text;
            });
            $(link_priceHouseUp).each(function() {
                var link = $(this);
                var text = link.text().trim();
                json.priceHouseUp = text;
            });
            $(link_priceFlatLow).each(function() {
                var link = $(this);
                var text = link.text().trim();
                json.priceFlatLow = text;
            });
            $(link_priceFlatMed).each(function() {
                var link = $(this);
                var text = link.text().trim();
                json.priceFlatMed = text;
            });
            $(link_priceFlatUp).each(function() {
                var link = $(this);
                var text = link.text().trim();
                json.priceFlatUp = text;
            });
        }

        fs.writeFile('outputMA.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
    })
})


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;