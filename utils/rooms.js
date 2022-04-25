const {randomUUID} = require('crypto');
const rooms = [];
class Room {
    constructor(id)
    {
        this.id = id;
        this.queue = new Array();
    }
}

function enqueue(name, room){
    const index = room.queue.indexOf(name);
    console.log(`enqueuing ${name}`);
    if(index > -1)
    {
        room.queue.splice(index,1); 
    }
    room.queue.push(name);
}
function dequeue(room) {
    if(room.queue.length == 0)
    {
        return null;
    }
    return room.queue.shift();
}

function describeRoom(room)
{
    console.log("-------");
    console.log(`- id = ${room.id}`);
    console.log("-------")
    console.log(room.queue);
    for (let index = 0; index < room.queue.length; index++) {
        console.log(room.queue[index]);
        
    }
}
function addRoom() {

    var id = randomUUID();
    //TEMPORARY FOR TESTING PURPOSES
    id = "an";
    const newRoom = new Room(id);
    rooms.push(newRoom);
    return id;
}
function getRoom(id) {
    return rooms.find(room => room.id == id);
}
function getRooms()
{
    return rooms;
}


module.exports = {

    addRoom,
    getRooms,
    enqueue,
    dequeue,
    describeRoom,
    getRoom,
    
}