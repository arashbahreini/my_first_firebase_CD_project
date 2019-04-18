require('dotenv').config();
const functions = require('firebase-functions');

module.exports.getServiceAccount = function() {
  return {
    "type": process.env.type,
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key.replace(/\\n/g, '\n'),
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.client_x509_cert_url
  };
}

module.exports.getHostConfig = function() {
  return {
    apiKey: functions.config().api ? functions.config().api.key : process.env.type,
    authDomain: "me-arash.firebaseapp.com",
    databaseURL: "https://me-arash.firebaseio.com",
    projectId: "me-arash",
    storageBucket: "me-arash.appspot.com",
    messagingSenderId: "305977168091"
  };
}

module.exports.getPrivatekey = function() {
  functions.config().privatekey.private_key = functions.config().privatekey.private_key.replace(/\\n/g, '\n');
  return functions.config().privatekey;
}
