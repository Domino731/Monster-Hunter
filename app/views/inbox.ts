export class Inbox {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='inbox'>

           <div class='inbox__item'>
             <div class='inbox__header'>
                <img src='./images/inbox_icon_message.png' alt='_message' class='inbox__messageIcon'/>
                <strong class='inbox__messageAmount'>100</strong>
             </div>

             <ul class='inbox__list'>
               <li class='inbox__listItem'>
                 <h2 class='inbox__listTitle'>Welcome in MONSTER HUNTER</h2>
                 <strong class='inbox__listSubTitle'>Your big journey bigins here</strong>
                 <div class='inbox__listDate'>Yesterday </br> 12:30<div>
               </li>
               <li class='inbox__listItem'>
               <h2 class='inbox__listTitle'>Friend request</h2>
               <strong class='inbox__listSubTitle'>From darthVader89</strong>
               <div class='inbox__listDate'>09.09.2021<div>
             </li>
             </ul>
           </div>


           <div class='inbox__item'>
             <div class='mail'>
                <div class='mail__friendHeaderWrapper'> 
                   
                  <img src='./images/hero_portraits/human_1.png' alt='portait' class='mail__friendPortait'/>
                  <div class='mail__friendCircle'></div>
                </div>

                <h2 class='mail__friendTitle'> <span>DarthVader</span> sends you a friend request</h2>
                <div class='mail__FriendActionBar'>
                  <button class='mail__friendBtn mail__friendBtn-accept'>Accept</button>
                  <button class='mail__friendBtn mail__friendBtn-reject'>Reject</button>
                </div>

                <div class='mail__friendBottomWrapper'> 
                    <span></span>
                <img src='./images/mail_background_friend_request.jpg'/>
              
                </div>
             </div>
           </div>
        </section>`;
    }

    init() {
       this.render();
    }
}

//dragon
//<a href='https://www.freepik.com/vectors/character'>Character vector created by macrovector - www.freepik.com</a>

// blue bg
//<a href='https://www.freepik.com/vectors/abstract'>Abstract vector created by upklyak - www.freepik.com</a>