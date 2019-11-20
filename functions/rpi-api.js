const functions = require('firebase-functions');
const express = require('express');
const rpiApp = express();
const admin = require('firebase-admin');

rpiApp.get('/rpi/getCurrentHealth', (req, res) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        }, 'rpi-app');
    }
    const db = admin.firestore();
    db.collection('RPI-health')
        .orderBy('time', 'desc')
        .limit(1)
        .get()
        .then(snapshot => {
            let result = {};
            snapshot.forEach((doc) => {
                result = doc.data();
            });
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});
rpiApp.get('/rpi/getAllHealthData', (req, res) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        }, 'rpi-app');
    }
    const db = admin.firestore();
    db.collection('RPI-health')
        .get()
        .then(snapshot => {
            let result = [];
            snapshot.forEach((doc) => {
                result.push(...doc.id, doc.data());
            });
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});
rpiApp.post('/rpi/getHealthByDate', (req, res) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        }, 'rpi-app');
    }
    const db = admin.firestore();
    db.collection('RPI-health')
        .where('time', '>=', req.startDate)
        .where('time', '<=', req.endDate)
        .get()
        .then(snapshot => {
            let result = [];
            snapshot.forEach((doc) => {
                result.push(doc.data());
            });
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});
rpiApp.get('/rpi/getSettings', (req, res) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        }, 'rpi-app');
    }
    const db = admin.firestore();
    db.collection('rpi-setting')
        .get()
        .then(snapshot => {
            let result = {};
            snapshot.forEach((doc) => {
                result[doc.id] = doc.data();
            });
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

exports.rpiApp = functions.https.onRequest(rpiApp);
