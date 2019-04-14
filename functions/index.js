const firebase = require('firebase');

var config = {
  apiKey: 'AIzaSyDlib_eSWxnRwHnABW8YwxyUo-uHD3EMPg',
  authDomain: 'me-arash.firebaseapp.com',
  databaseURL: 'https://me-arash.firebaseio.com',
  projectId: 'me-arash',
  storageBucket: 'me-arash.appspot.com',
  messagingSenderId: '305977168091'
};

firebase.initializeApp(config);
// firebase.database().ref('test/').push({
//   name: 'arash',
//   family: 'bahreini'
// })

// firebase.database().ref('test').remove();

// firebase.database().ref('users').push({
//   id: 1,
//   email: 'vbhost',
//   passwordHash: Buffer.from('arash'),
//   passwordSalt: Buffer.from('salt'),
// });

// firebase.database().ref('users').once('value').then((data) => {
//   console.log(data);
// });



let userImportRecords = [
  {
    uid: 'uid1',
    email: 'user1@example.com',
    passwordHash: Buffer.from('passwordHash1'),
    passwordSalt: Buffer.from('salt1')
  },
  {
    uid: 'uid2',
    email: 'user2@example.com',
    passwordHash: Buffer.from('passwordHash2'),
    passwordSalt: Buffer.from('salt2')
  },
];
const admin = require('firebase-admin');

const functions = require('firebase-functions');
const express = require('express');
const serviceAccount = require('./me-arash-firebase-adminsdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = 'ACA0EDA3-9ED5-42EE-A849-11B14D376F87';
const claims = {
  premiumAccount: true
};


const app = express();
app.get('/login', (req, res) => {
  admin.auth().createCustomToken(uid, claims)
    .then((customToken) => {
      res.send(customToken);
    }).catch((error) => {
      res.send('Its error' + error);
    })
})

app.post('/user/login', (req, res) => {
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(loginRes => {
    res.send(loginRes.user.uid);
  }).catch(error => {
    res.send(error);
  })
})

exports.app = functions.https.onRequest(app);



