'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const ect = require('ect');
const fs = require('fs');
const http = require('http');
const path = require('path');

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

// routes
app.get('/playback', (req, res, next) => res.render('playback'));

http.Server(app).listen(7000, () => console.log('Listening on port :7000'));
