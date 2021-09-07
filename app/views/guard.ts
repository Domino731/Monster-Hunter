export class Guard {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='guard'>
           <div class='guard__item'>
             <div class='guard__kingWrapper'>
                <img src='./images/guard_king.png' alt='King' class='guard__king'/>
             </div>
             <div class='guard__infoWrapper'>
              <h2 class='guard__title'>King guard</h2>
              <p class='guard__text'>As you know, there are lots of monsters around my castle. 
              I can't even do my job. I have heard that you are a brave knight who is not afraid of monsters,
               and they hide in their hiding places when they see you. 
               Protect this castle from monsters and I will reward you.
               </p>
               <input type="range">
             </div>
           </div>
        </section>`;
    }

    init() {
       this.render();
    }
}

//<a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpocket - www.freepik.com</a>