export class Account {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = "<h1>Account<h1>"
    }

    init() {
        console.log(this.root)
       this.render();
    }
}