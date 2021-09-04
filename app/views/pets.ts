export class Pets {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='game__section pets'>
           
        </section>`;
    }

    init() {
       this.render();
    }
}

// <a href='https://www.freepik.com/vectors/background'>Background vector created by upklyak - www.freepik.com</a>