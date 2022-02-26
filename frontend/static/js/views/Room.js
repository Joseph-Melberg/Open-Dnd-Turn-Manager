import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Room");
    }

    async getHtml() {
        return `
        <p>Hello<\p> 
        `;
    }
}