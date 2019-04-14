const functions = require('firebase-functions');
const express = require('express');

const app = express();
app.get('/arash', (req,res) => {
  res.send('From Me website');
})

exports.app = functions.https.onRequest(app);
