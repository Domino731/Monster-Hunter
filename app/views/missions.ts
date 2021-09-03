export class Missions {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = `<button>${window.innerHeight}</button>`;
    }

    init() {
       this.render();
    }
}