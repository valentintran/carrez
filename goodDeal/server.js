// server.js

var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var connect = require('connect');
var serveStatic = require('serve-static');


app.set('view engine','ejs');

app.get('/', function(req, res){
	res.render('index');
});

app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));

connect().use(serveStatic(__dirname)).listen(3000, function(){
    console.log('Server running on 3000...');
});