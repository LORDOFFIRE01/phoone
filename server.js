const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// This tells the server to load your index.html file
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected to the matchmaker!');

    // When someone joins the room
    socket.on('join', (room) => {
        socket.join(room);
        socket.to(room).emit('ready');
    });

    // Pass the connection data back and forth
    socket.on('offer', (offer, room) => socket.to(room).emit('offer', offer));
    socket.on('answer', (answer, room) => socket.to(room).emit('answer', answer));
    socket.on('candidate', (candidate, room) => socket.to(room).emit('candidate', candidate));
});

// Start the server
http.listen(3000, () => {
    console.log('Matchmaker server is running at http://localhost:3000');
});