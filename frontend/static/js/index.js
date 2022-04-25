import Room from "./views/Room.js";
import Entrance from "./views/Entrance.js";
import Temporary from "./views/Temporary.js";
const enterQueueButton = document.getElementById("enterQueue");
const exitQueueButton = document.getElementById("exitQueue");
const nameForm = document.getElementById("nameForm");
const tableSpot = document.getElementById("tableSpot");
const socket = io();

const routes = [
    { path: "/", view: Entrance},
    { path: "/join", view: Room},
    { path: "/temp", view: Temporary}
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
    view.connectDOM();
    console.log(match.route.path);

}

enterQueueButton.addEventListener('click' , e => {
    console.log("Send Button Pressed");
    socket.emit("enqueue");
});

exitQueueButton.addEventListener('click', e => {
    console.log("exiting");
    socket.emit("exit");
});


nameForm.addEventListener("submit", e => {
    e.preventDefault();

    let playerName = e.target.elements.nameInput.value;

    console.log(`Attempting to set name ${playerName}`);

    socket.emit('join',playerName);
})

// newRoomButton.addEventListener('click', e => {
//     console.log("making a new room");
//     socket.emit("create");
// })


socket.on("state", state => {
    console.log("Received state");
    state.queue.forEach(element => {
       console.log(element); 
    });
    const tableHead = "<table><thead><tr><th>name</th></tr></thead>"
    var table = tableHead + "<tbody>"
    console.log(table);
    state.queue.forEach( _ => 
        {
            table = table + "<tr><td>" + _ + "</td>" + "</tr>";
            
    console.log(table);
        }) 
    table = table + "</tbody></table>"
    console.log(table);

    tableSpot.innerHTML = table
})

socket.on("message", message => {
    console.log(message);
})

/*
window.addEventListener("popstate", router);
/*

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})
*/