const { Console } = require("console");
const {addRoom, getRoom,enqueue,dequeue, describeRoom} = require('./utils/rooms');
const {userJoin, getCurrentUser, userLeaves,getRoomUsers} = require('./utils/users');
const express = require("express");
const http = require('http');
const path = require("path");
const socketio = require('socket.io');
const { createGunzip } = require("zlib");
const app = express();
app.use("/static", express.static(path.resolve(__dirname,"frontend","static")))

app.get("/*", (req, res) =>{
    res.sendFile(path.resolve(__dirname,"frontend","index.html"))
})



const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log('new socket connection');

    socket.on("message", message => {
        socket.broadcast.emit("message",message);
        io.in(socket)
        socket.emit("message","Bing");
    });

    socket.on("exit", () => {
        const user = getCurrentUser(socket.id);
        if(user == null)
        {
            console.log("Invalid user");
            return;
        }
        const room = getRoom(user.roomId);
        if(room == null)
        {
            console.log("Invalid room");

            return;
        }
        console.log(user.username);
        console.log(`Is it true that ${user.username} === ${"dm"}?`)
        if(user.username === "dm")
        {
            console.log("I am dm");
            console.log(`I would like to certify that ${user.username} is the exact same string as ${"dm"}, always ${user.username === "dm"}`)
            dequeue(room);
            sendStateUpdate(io, room);
        }
    });

    socket.on("join", playerName => {
        console.log(`${playerName} is joining`)
        room = getRoom("an");
        if(room == undefined)
        {
            console.log("Adding room");
            addRoom();
            room = getRoom("an");
        }

        
        if(getRoomUsers(room.id).map(_ => _.username).includes(playerName))
        {
            console.error(`Looks like someone is already ${playerName}`);
            return;
        }
        
        console.log(`This room has an id of ${room.id}`)
        socket.join(room.id);

        io.in(room.id).emit("message", "hi");
        describeRoom(room);
        console.log(`Creating a user ${socket.id}, ${playerName}, ${room.id}`)
        userJoin(socket.id,playerName,room.id);
        people = getRoomUsers(room.id);
        people.forEach(element => {
           console.log(element.usernam) 
        });

        sendStateUpdate(io, room);
    });
/*
    socket.on("leave", () => {
        socket.join("nullroom");
    })
    
    //When we create a game, we don't need their name because they are the GM
    /*socket.on("create", () => {
        console.log("creating room");

        id = addRoom();

        const user = userJoin(socket.id,"GM",id);

        socket.join(user.roomId);

        socket.emit("message",`roomid = ${user.roomId}`);

    })*/
    socket.on("setName", proposedPlayerName => {
        console.log(`checking if anyone else here has the name ${proposedPlayerName}`);
        describeRoom("A");
    })
    socket.on("disconnect", () => 
    {
        console.log("A");
    })
    socket.on("enqueue", () => {
        console.log("Enqueue");

        const user = getCurrentUser(socket.id);

        const room = getRoom(user.roomId);

        enqueue(user.id,room);
        describeRoom(room);
        sendStateUpdate(io,room);
    })

    socket.onAny((event, ...args) => {
        console.log(`got ${event} ${args}`);
    });
})
function buildState(room) {
    queue = [];
    console.log(room.queue.length);
    for (let index = 0; index < room.queue.length; index++) {

        given_user = (getCurrentUser(room.queue[index]).username);
        console.log(given_user);
        queue.push(given_user);
    }
    const state = 
    {
        queue: queue
    }
    return state;
}
function sendStateUpdate(io, room ){ 
    const state = buildState(room);
    console.log(`Sending state to ${room.id}`);
    io.to(room.id).emit("state",state); 
};

server.listen(process.env.PORT || 3000, () => console.log("Server listening"))