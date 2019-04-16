const config = require('./config');
const admin = require('firebase-admin');
const firebase = require('firebase').initializeApp(config.hostConfig);
const serviceAccount = require('./me-arash-firebase-adminsdk.json');
const functions = require('firebase-functions');
const express = require('express');
const userApp = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const claims = {
  premiumAccount: true
};

// userApp.get('/user/create', (req, res) => {
//   admin.auth().createUser({
//     email: req.email,
//     disabled: req.disabled,
//     displayName: req.displayName,
//     emailVerified: req.emailVerified,
//     password: req.password,
//   }).then(createUserRes => {
//     res.send(createUserRes);
//   });
// })

userApp.post('/user/login', (req, res) => {
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(loginRes => {
    res.send(loginRes);
  }).catch(error => {
    res.send(error);
  })
})

userApp.post('/user/getToken', (req, res) => {
  admin.auth().createCustomToken(req.body.uid, claims)
  .then((customToken) => {
    res.send(customToken);
  }).catch((error) => {
    res.send(error);
  })
})

userApp.get('/user/test', (req, res) => {
  res.send({ 'Name': 'Arash' });
})

exports.userApp = functions.https.onRequest(userApp);
