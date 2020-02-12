'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 8080;
const INDEX = '/index.html';

let clients = []

const server = express()
.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {

    clients.push(socket.client)

    socket.on('disconnect', () => {
      clients = clients.filter(client => client.id != socket.client.id)
    });
  });

  setInterval(() => {
    io.emit('connectionUpdate', clients.length)
  });
