const setting = require('./setting');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');

const express = require('express');
const userApp = express();

admin.initializeApp({
    credential: admin.credential.cert(
        functions.config().privatekey ?
            setting.getPrivatekey() :
            setting.getServiceAccount()),
});

const claims = {
    premiumAccount: true
};

userApp.post('/user/login', (req, res) => {
    if (!firebase.apps.length) {
        firebase.initializeApp(setting.getHostConfig());
    }
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
