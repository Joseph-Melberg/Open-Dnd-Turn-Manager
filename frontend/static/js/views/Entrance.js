import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Entrance");
    }

    async getHtml() {
        return `
        <p>Entrance<\p> 
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