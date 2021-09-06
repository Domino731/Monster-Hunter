const text = "Lorem iporci p.it ante. Praeseida nec enim et consectetur. Pellentesque ornare pellentesque maximus. Donec ullamcorper eu massa eget aliquet. Vivamus mollis mi libero, id interdum massa congue non. Quisque non urna et lacus volutpat pulvinar."
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
                 <div class='mission__text'>
                   <h2 class='mission__title'>Dark unicorn</h2>
                   <p class='mission__description'>
                   ${text}
                   </p>
                   <div class='mission__detailsWrapper'>
                       <div class='mission__detail'>
                         <img class='mission__detailImg' src='./images/coin.png' alt='coin'/>
                         <span class='mission__detailName'>Coins: </span>
                         <strong class='mission__detailResult'>12044</strong>
                       </div>
                       <div class='mission__detail'>
                         <img class='mission__detailImg' src='./images/mission_detail_increase.png' alt='Level increase'/>
                         <span class='mission__detailName'>Experience: </span>
                         <strong class='mission__detailResult'>125</strong>
                       </div>
                       <div class='mission__detail'>
                         <img class='mission__detailImg' src='./images/mission_detail_hourglass.png' alt='hourglass'/>
                         <span class='mission__detailName'>Time: </span>
                         <strong class='mission__detailResult'>10m.</strong>
                       </div>
                   </div>
                   <button class='mission__acceptBtn'>Accept this mission</button>
                 </div>
                   <div class='textRool textRool-bottom' ></div>
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
