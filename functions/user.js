// const config = require('./config');
var hostConfig = {
  apiKey: "AIzaSyDlib_eSWxnRwHnABW8YwxyUo-uHD3EMPg",
  authDomain: "me-arash.firebaseapp.com",
  databaseURL: "https://me-arash.firebaseio.com",
  projectId: "me-arash",
  storageBucket: "me-arash.appspot.com",
  messagingSenderId: "305977168091"
};
const admin = require('firebase-admin');
const firebase = require('firebase').initializeApp(hostConfig);
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
