export class Profile {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = "<h1>asdasd<h1>asd"
    }

    init() {
       this.render();
    }
}