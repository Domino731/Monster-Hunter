export class Missions {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='missions'>
            <div class='missions__characterWrapper'>
              <img class='mission__character' alt='character' src='./images/mission_character_1.png'>
            </div>
            <div class='missions__details'>
               <div class='mission__informations'>
                 <div class='textRool'></div>


                 <div class='mission__textWrapper'>
                   <div class='mission__text'> </div>
                  <div class='textRool textRool-bottom'></div>
                 </div>
               </div>
              
            </div>
            <div class='missions__list'>
               <h2 class='missions__title'>Available missions</h2>
               <div class='missions__listWrapper'>
               <img src='./images/papyrus_1.png' alt='papyrus' class='missions__papyrus'/>
               <img src='./images/papyrus_2.png' alt='papyrus' class='missions__papyrus'/>
               <img src='./images/papyrus_3.png' alt='papyrus' class='missions__papyrus'/>
               </div>
               
            </div>
        </section>`;
    }

    init() {
       this.render();
    }
}

// <a href='https://www.freepik.com/vectors/restaurant'>Restaurant vector created by upklyak - www.freepik.com</a>