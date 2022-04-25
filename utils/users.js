const { use } = require("express/lib/application");

const users = [];

class User {
    constructor(id, username, roomId){
        this.id = id;
        this.username = username;
        this.roomId = roomId;
    }
}

function userJoin(id, username, roomId) {

    const user = new User( id, username, roomId)

    console.log("Making a user");

    users.push(user);

    users.forEach(_ => 
        {
            console.log(_.id);
        })
    return user;
}


function getCurrentUser(id) {
    return users.find(user => user.id == id)
}

function userLeaves(id) {
    const index = users.findIndex(user => user.id == id);

    if(index !== -1) {
        return users.splice(index, 1);
    }
}


function getRoomUsers(roomId){
    return users.filter( user => user.roomId === roomId);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeaves,
    getRoomUsers,
    User
}