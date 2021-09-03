export class Inbox {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = "<h1>Inbox<h1>";
    }

    init() {
       this.render();
    }
}