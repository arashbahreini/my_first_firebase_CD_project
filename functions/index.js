const functions = require('firebase-functions');
const express = require('express');
const app = express();
const user = require('./user');
const log = require('./log');
// const chatServer = require('./chat-server');

app.get('/test', (req, res) => {
  res.send({ 'Name': 'Arash' });
})

exports.app = functions.https.onRequest(app);
exports.userApp = functions.https.onRequest(user.userApp);
exports.logApp = functions.https.onRequest(log.logApp);
// exports.chatServer = functions.https.onRequest(chatServer.chatServer)