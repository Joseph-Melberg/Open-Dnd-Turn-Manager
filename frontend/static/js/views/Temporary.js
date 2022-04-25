import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Queue");
    }

    async getHtml() {
        return `
        <p>Hello<\p> 
        
    <div>
        <form id="nameForm">
            <input
                id="nameInput"
                type="text"
                placeholder="Enter your name"
                required
                autocomplete="off"
            />
            <button id= test class="btn">Join</button>
        </form>
    </div>
        `;
    }
    
    disconnectDOM() {
        document.getElementById("test").remove();
    }
    
    connectDOM() {
        document.getElementById("test").addEventListener('click',e => {
            console.log("J");
        })
    }
}