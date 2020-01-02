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
    dbInit();
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
rpiApp.get('/rpi/getCatalogs', (req, res) => {
    dbInit();
    const db = admin.firestore();
    db.collection('db-catalogs')
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
rpiApp.post('/rpi/getHealthByDate', (req, res) => {
    dbInit();
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
    dbInit();
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
rpiApp.post('/rpi/saveSettings', (req, res) => {
    dbInit();
    const db = admin.firestore();
    try {
        db.collection('rpi-setting').doc('healthCheckPeriod').update(req.body.healthCheckPeriod);
        db.collection('rpi-setting').doc('moisturePeriod').update(req.body.moisturePeriod);
        db.collection('rpi-setting').doc('name').update(req.body.name);
        res.send({'success': true})
    } catch (e) {
        res.send({
            'success': false,
            'message': e.toString(),
        })
    }
});
rpiApp.post('/rpi/removeCollection', (req,res) => {
    dbInit();

});

function dbInit() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        }, 'rpi-app');
    }
}

exports.rpiApp = functions.https.onRequest(rpiApp);
