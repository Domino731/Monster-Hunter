export class Pets {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='game__section pets'>
           <div class='pets__item'>
             <img class='pets__img' src='./images/pet_cat.png' alt='cat'/>
             <h2 class='pets__name pets__name-cat'>Cat</h2>
             <div class='pets__cost'>
               <img  src='./images/coin.png' alt='coin'/>
               <strong>50</strong>
             </div>
             <ul class='pets__benefits'>
                <li class='pets__benefitsItem'>-10% of travel time </li>
             </ul>
             <div class='pets__buy'><button class='pets__buy-afford'>Prolong by 7 days</button></div>
           </div>
           <div class='pets__item'>
             <img class='pets__img' src='./images/pet_scorpion.png' alt='scorpion'/>
             <h2 class='pets__name pets__name-scorpion'>Scorpio</h2>
             <div class='pets__cost'>
               <img  src='./images/coin.png' alt='coin'/>
               <strong>200</strong>
             </div>
             <ul class='pets__benefits'>
                <li class='pets__benefitsItem'>-25% of travel time </li>
                <li class='pets__benefitsItem'>+5% to defence </li>
             </ul>
             <div class='pets__buy'><button>Rent for 7 days</button></div>
           </div>
           <div class='pets__item'>
             <img class='pets__img' src='./images/pet_cheetah.png' alt='cheetah'/>
             <h2 class='pets__name pets__name-cheetah'>Cheetah</h2>
             <div class='pets__cost'>
               <img  src='./images/coin.png' alt='coin'/>
               <strong>400</strong>
             </div>
             <ul class='pets__benefits'>
               <li class='pets__benefitsItem'>-50% of travel time </li>
               <li class='pets__benefitsItem'>+10% to defence </li>
               <li class='pets__benefitsItem'>+10% to physical endurance </li>
             </ul>
             <div class='pets__buy'><button>Rent for 7 days</button></div>
           </div>
           <div class='pets__item'>
             <img class='pets__img' src='./images/pet_dragon.png' alt='dragon'/>
             <h2 class='pets__name pets__name-dragon'>Dragon</h2>
             <div class='pets__cost'>
               <img  src='./images/coin.png' alt='coin'/>
               <strong>1000</strong>
             </div>
             <ul class='pets__benefits'>
               <li class='pets__benefitsItem'>-50% of travel time </li>
               <li class='pets__benefitsItem'>+10% to defence </li>
               <li class='pets__benefitsItem'>+10% to physical endurance </li>
               <li class='pets__benefitsItem'>+10% to Strength </li>
             </ul>
            <div class='pets__buy'><button>Rent for 7 days</button></div>
           </div>
        </section>`;
    }

    init() {
       this.render();
    }
}

// <a href='https://www.freepik.com/vectors/background'>Background vector created by upklyak - www.freepik.com</a>