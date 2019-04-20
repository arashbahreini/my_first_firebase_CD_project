var hostConfig = {
  apiKey: "AIzaSyDlib_eSWxnRwHnABW8YwxyUo-uHD3EMPg",
  authDomain: "me-arash.firebaseapp.com",
  databaseURL: "https://me-arash.firebaseio.com",
  projectId: "me-arash",
  storageBucket: "me-arash.appspot.com",
  messagingSenderId: "305977168091"
};

const firebase = require('firebase');
const functions = require('firebase-functions');
const express = require('express');
const logApp = express();
var request = require('request');

const http = require('http');

logApp.post('/log/add', (req, res) => {
  const myRef = firebase.database().ref('logs').push();
  req.body.id = myRef.key;
  myRef.set(req.body);
  res.send(req.body);
})

logApp.post('/log/getIpInformation', (req, res) => {
  request.get('http://api.ipstack.com/' + req.body.ip + '?access_key=9f79482ae6aca6a14914c07978b51b29')
  .on('data',(result) => {
    res.send(result);
  });
})

exports.logApp = functions.https.onRequest(logApp);
