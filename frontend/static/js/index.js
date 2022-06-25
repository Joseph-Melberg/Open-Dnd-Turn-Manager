import Room from "./views/Room.js";
import Entrance from "./views/Entrance.js";
import Temporary from "./views/Temporary.js";
const enterQueueButton = document.getElementById("enterQueue");
const exitQueueButton = document.getElementById("exitQueue");
const nameForm = document.getElementById("nameForm");
const intiativeForm = document.getElementById("initiativeForm");
const intiativeButton = document.getElementById("initiativeButton");
const exitCombat = document.getElementById("initiativeClearButton");

const tableSpot = document.getElementById("tableSpot");
const combatTableSpot = document.getElementById("combatTableSpot");
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
exitCombat.addEventListener('click', e => {
    console.log("Sent exit combat");
    socket.emit('exitcombat');
})

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

intiativeForm.addEventListener("submit", e => {
    e.preventDefault();

    let initiative = e.target.elements.initiativeInput.value;

    console.log(`The initiative was ${initiative}`);

    socket.emit('initiative',initiative);
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
    state.queue.forEach( _ => 
        {
            table = table + "<tr><td>" + _ + "</td>" + "</tr>";
            
        }) 
    table = table + "</tbody></table>"

    tableSpot.innerHTML = table
    state.initiative.forEach(element => {
        console.log(element);
    });

    const combatTableHead = "<table><thead><tr><th>name</th><th>initiative</th></tr></thead>";
    var combatTable = combatTableHead + "<tbody>"
    state.initiative.forEach(element => 
    {
        console.log(element.initiative);
        combatTable = combatTable + "<tr><td>" + element.name + "</td>" + "<td>" + element.initiative + "</td>" + "</tr>";
    }) 
    combatTable = combatTable + "</tbody></table>";
    combatTableSpot.innerHTML = combatTable;
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