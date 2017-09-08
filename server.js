'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const ect = require('ect');
const fs = require('fs');
const http = require('http');
const path = require('path');

const aws = require('./aws');
// const opentok = require('./opentok');

let app = express();
let viewDir = path.resolve(__dirname, 'views');
let engine = ect({
	watch: true,
	root: viewDir,
	ext: '.html',
});

app.set('view engine', 'html');
app.set('views', viewDir);
app.engine('html', engine.render);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use('/lib', express.static(path.join(__dirname, 'node_modules')));

let helpers = {};

helpers.json = function(obj, defaultText) {
	return JSON.stringify(obj);//.replace(/<\/script>/g, '</scrip" + "t>');
};

app.use((req, res, next) => {
	res.locals._ = helpers;
	next();
});

// routes
app.get('/playback', (req, res, next) => res.render('playback'));

app.get('/videos/playback', aws.redirectToPreSignedUrl);

// https.createServer({
// 	key: fs.readFileSync('conf/key.pem'),
// 	cert: fs.readFileSync('conf/cert.pem'),
// }, app).listen(7000, () => console.log('Listening on port :2000'));
http.Server(app).listen(7000, () => console.log('Listening on port :7000'));
