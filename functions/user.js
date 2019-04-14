
const config = require('./config');
const admin = require('firebase-admin');
const firebase = require('firebase').initializeApp(config.hostConfig);
const serviceAccount = require('./me-arash-firebase-adminsdk.json');
const express = require('express');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const app = express();

app.get('/user/create', (req, res) => {
  admin.auth().createUser({
    email: req.email,
    disabled: req.disabled,
    displayName: req.displayName,
    emailVerified: req.emailVerified,
    password: req.password,
  }).then(createUserRes => {
    res.send(createUserRes);
  });
})

app.post('/user/login', (req, res) => {
  firebase.auth().signInWithEmailAndPassword(req.email, req.password).then(loginRes => {
    res.send(loginRes.user.uid);
  }).catch(error => {
    res.send(error);
  })
})


const claims = {
  premiumAccount: true
};


app.get('/user/createCustomToken', (req, res) => {
  admin.auth().createCustomToken(req.uid, claims)
    .then((customToken) => {
      res.send(customToken);
    }).catch((error) => {
      res.send(error);
    })
})

