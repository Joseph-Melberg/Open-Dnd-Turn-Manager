import Room from "./views/Room.js";
import Entrance from "./views/Entrance.js";
const enterQueueButton = document.getElementById("enterQueue");
const exitQueueButton = document.getElementById("exitQueue");
const exitRoom = document.getElementById("exitRoom");
const roomForm = document.getElementById("roomForm");
const socket = io();
//I am very interested in seeing if event listeners pile up. This can be tested by having the scripts that create them be 
//run twice (going forth and then back).  

//assuming they do stick around, we could create them and put them into a list and then iterate through the list
//after navigate

const routes = [
    { path: "/", view: Entrance},
    { path: "/join", view: Room}
]

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}
  
const router = async () => {

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

    if(!match){
        match = {
            route: routes[0], //this might be a way to make rooms eventually
            isMatch: true
        }
    }

    const view = new match.route.view();
    document.querySelector("#app").innerHTML = await view.getHtml();
    console.log(match.route.path);

}

enterQueueButton.addEventListener('click' , e => {
    console.log("Send Button Pressed");
    socket.emit("hello");
    socket.emit("message","howdy");
});

exitQueueButton.addEventListener('click', e => {
    console.log("Joining");
    socket.emit("join","test");
});

exitRoom.addEventListener('click',e => {
    console.log("Connect button pressed");
});

roomForm.addEventListener("submit", e => {
    e.preventDefault();

    let roomId = e.target.elements.roomInput.value;

    console.log(`Attempting to join room ${roomId}`);

    socket.emit('join',roomId);
})


socket.on("state", state => {
    console.log("Received state");
})

socket.on("message", message => {
    console.log(message);
})


window.addEventListener("popstate", router);


document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})