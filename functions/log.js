const firebase = require('firebase');
const functions = require('firebase-functions');
const express = require('express');
const logApp = express();
const request = require('request');
const setting = require('./setting');

logApp.post('/log/add', (req, res) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(setting.getHostConfig());
  }
  const myRef = firebase.database().ref('logs').push();
  req.body.id = myRef.key;
  myRef.set(req.body)
  res.send(req.body);
});
logApp.post('/log/getIpInformation', (req, res) => {
  request.get('http://api.ipstack.com/' + req.body.ip + '?access_key=9f79482ae6aca6a14914c07978b51b29')
  .on('data',(result) => {
    res.send(result);
  });
});

exports.logApp = functions.https.onRequest(logApp);
