const functions = require('firebase-functions');
const express = require('express');
const app = express();
const user = require('./user');
const log = require('./log');
const rpi = require('./rpi-api');

app.get('/test', (req, res) => {
    res.send({'Name': 'Arash'});
})

exports.app = functions.https.onRequest(app);
exports.userApp = functions.https.onRequest(user.userApp);
exports.rpiApp = functions.https.onRequest(rpi.rpiApp);
exports.logApp = functions.https.onRequest(log.logApp);

