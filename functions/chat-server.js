// var hostConfig = {
//   apiKey: "AIzaSyDlib_eSWxnRwHnABW8YwxyUo-uHD3EMPg",
//   authDomain: "me-arash.firebaseapp.com",
//   databaseURL: "https://me-arash.firebaseio.com",
//   projectId: "me-arash",
//   storageBucket: "me-arash.appspot.com",
//   messagingSenderId: "305977168091"
// };

// const functions = require('firebase-functions');
// const express = require('express');
// const chatServer = express();
// const a = require('socket.io');

// chatServer.get('/chat/connect', (req, res) => {
  
//   createApp();
//   config();
//   createServer();
//   sockets();
//   listen();
//   res.send('CONNECTED');
// })

// wsServer = new WebSocketServer({
//   httpServer: server
// });

// function createApp() {
//   this.app = express();
// }

// function createServer() {
//   this.server = createServer(this.app);
// }

// function config() {
//   this.port = process.env.PORT || ChatServer.PORT;
// }

// function sockets() {
//   this.io = socketIo(this.server);
// }

// function listen() {
//   this.server.listen(this.port, () => {
//       console.log('Running server on port %s', this.port);
//   });

//   this.io.on('connect', (socket) => {
//       console.log('Connected client on port %s.', this.port);
//       socket.on('message', (m) => {
//           console.log('[server](message): %s', JSON.stringify(m));
//           this.io.emit('message', m);
//       });

//       socket.on('disconnect', () => {
//           console.log('Client disconnected');
//       });
//   });
// }

// function getApp() {
//   return this.app;
// }

// exports.chatServer = functions.https.onRequest(chatServer);
