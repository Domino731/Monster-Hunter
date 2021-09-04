export class Pets {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='game__section pets'>
           <div class='pets__item'>
             <img class='pets__img' src='./images/pet_cat.png'/>
             <h2 class='pets__name pets__name-cat'>Cat</h2>
           </div>
           <div class='pets__item'>
             <img class='pets__img' src='./images/pet_scorpion.png'/>
             <h2 class='pets__name pets__name-scorpion'>Scorpio</h2>
           </div>
           <div class='pets__item'>
             <img class='pets__img' src='./images/pet_cheetah.png'/>
             <h2 class='pets__name pets__name-cheetah'>Cheetah</h2>
           </div>
           <div class='pets__item'>
             <img class='pets__img' src='./images/pet_dragon.png'/>
             <h2 class='pets__name pets__name-dragon'>Dragon</h2>
           </div>
        </section>`;
    }

    init() {
       this.render();
    }
}

// <a href='https://www.freepik.com/vectors/background'>Background vector created by upklyak - www.freepik.com</a>