const { Console } = require("console");
const express = require("express");
const http = require('http');
const path = require("path");
const socketio = require('socket.io');
const app = express();

app.use("/static", express.static(path.resolve(__dirname,"frontend","static")))

app.get("/*", (req, res) =>{
    res.sendFile(path.resolve(__dirname,"frontend","index.html"))
})



const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log('new socket connection');
    socket.onAny((event, ...args) => {
        console.log(`got ${event} ${args}`);

    });

    socket.on("message", message => {
        socket.broadcast.emit("message",message);
        io.in(socket)
        socket.emit("message","Bing");
    });

    socket.on("join", roomId => {
        console.log(`joining ${roomId}`)
        socket.join(roomId);
    })
})


server.listen(process.env.PORT || 3000, () => console.log("Server listening"))