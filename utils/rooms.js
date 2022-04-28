const {randomUUID} = require('crypto');
const rooms = [];
class Room {
    constructor(id)
    {
        this.id = id;
        this.queue = new Array();
    }
}

function enqueue(userid, room){
    console.log(`enqueuing ${userid}`);
    room.queue = room.queue.filter( _ => _ != userid);
    room.queue.push(userid);
}
function dequeue(room) {
    if(room.queue.length == 0)
    {
        return null;
    }
    return room.queue.shift();
}

function leaveQueue(userid,room){
    console.log(`current length ${room.queue.length}`)
    room.queue = room.queue.filter( _ => _ != userid);
    console.log(`current length ${room.queue.length}`)
}

function describeRoom(room)
{
    console.log("-------");
    console.log(`- id = ${room.id}`);
    console.log("-------")
    console.log(room.queue);
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
    leaveQueue
    
}