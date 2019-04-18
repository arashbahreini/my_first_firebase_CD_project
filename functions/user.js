const functions = require('firebase-functions');
console.log('my config is '+ JSON.stringify(functions.config()));

var hostConfig = {
  apiKey:functions.config().api ? functions.config().api.key : process.env.type,
  authDomain: "me-arash.firebaseapp.com",
  databaseURL: "https://me-arash.firebaseio.com",
  projectId: "me-arash",
  storageBucket: "me-arash.appspot.com",
  messagingSenderId: "305977168091"
};

const admin = require('firebase-admin');
const firebase = require('firebase');
firebase.initializeApp(hostConfig);

require('dotenv').config();

const serviceAccount = {
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key,
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.client_x509_cert_url
};

const express = require('express');
const userApp = express();

admin.initializeApp({
  credential: admin.credential.cert(
    functions.config().privatekey ?
    functions.config().privatekey :
    serviceAccount),
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
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(loginRes => {
      res.send(loginRes);
      return loginRes;
    }).catch(error => {
      res.send(error);
      return error;
    })
})

userApp.get('/user/getUsers', (req, res) => {
  // res.send(JSON.stringify(functions.config()))
  admin.auth().listUsers().then((listResult) => {
    res.send(listResult.users);
    return listResult.users;
  }).catch(error => {
    res.send(error);
    return error;
  });
})



userApp.post('/user/getToken', (req, res) => {
  admin.auth().createCustomToken(req.body.uid, claims)
    .then((customToken) => {
      res.send(customToken);
      return customToken;
    }).catch((error) => {
      res.send(error);
      return error;
    })
})

exports.userApp = functions.https.onRequest(userApp);
