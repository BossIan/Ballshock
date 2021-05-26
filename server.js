var express = require('express');
var app = express();
var socket = require('socket.io');
var server = require("http").createServer();
server.listen(8081, '192.168.193.222')
const io = require("socket.io")(server)
var players = {}
var noofplayers = 0;
app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
  noofplayers += 1;
  console.log(noofplayers +' user connected.');
    if (noofplayers == 1) {
      io.emit('isPlayer1');
    }
    if (noofplayers == 2) {
      io.emit('isPlayer2')
    }
    if (noofplayers == 3) {
      io.emit('isPlayer3')
    }
    if (noofplayers == 4) {
      io.emit('isPlayer4')
    }
    players[socket.id] = {
      rotation: 0,
      x: 0,
      y: 0,
      health: 100,
      bulletx: 0,
      bullety: 0,
      playerId: socket.id,
      playernumber: noofplayers,
      curanim: '',
      flipped: false,
      gunrotation: 0,
      bulletactive: false,
      playeralive: true,
    };
socket.emit('currentPlayers', players);
socket.broadcast.emit('newPlayer', players[socket.id]);
socket.on('bullethit', function () {
  players[socket.id].bulletactive = false;
  socket.broadcast.emit('bullethitted', players[socket.id]);
});
socket.on('bulletshot', function () {
  players[socket.id].bulletactive = true;
  socket.broadcast.emit('bulletshotted', players[socket.id]);
});
socket.on('alive', function () {
  players[socket.id].playeralive = true;
  socket.broadcast.emit('alived', players[socket.id]);
});
socket.on('dead', function () {
  players[socket.id].playeralive = false;
  socket.broadcast.emit('deaded', players[socket.id]);
});
socket.on('playerMovement', function (movementData) {
  players[socket.id].x = movementData.x;
  players[socket.id].y = movementData.y;
  socket.broadcast.emit('playerMoved', players[socket.id]);
});

socket.on('bulletMovement', function (bulletmovementData) {
  players[socket.id].bulletx = bulletmovementData.bulletx;
  players[socket.id].bullety = bulletmovementData.bullety;
  socket.broadcast.emit('bulletMovemented', players[socket.id]);
});
socket.on('gunRotatement', function (rotationData) {
  players[socket.id].gunrotation = rotationData.gunrotation;
  socket.broadcast.emit('gunRotated', players[socket.id]);
});
socket.on('playeranim', function (animData) {
  players[socket.id].curanim = animData.curanim;
  socket.broadcast.emit('playeranimed', players[socket.id]);
});
socket.on('playerflip', function (flipData) {
  players[socket.id].flipped = flipData.flipped;
  socket.broadcast.emit('playerfliped', players[socket.id]);
});
socket.on('disconnect', function () {
  noofplayers -= 1;
  console.log('user disconnected');
  io.emit('disconnected', players[socket.id]);
  delete players[socket.id];
  });
});
server.listen(8081, '192.168.193.222', function () {
  console.log(`Listening on ${server.address().port}`);
});
