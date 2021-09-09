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
                 <strong class='inbox__listSubTitle'>From: admin</strong>
                 <div class='inbox__listDate'>Yesterday </br> 12:30<div>
               </li>
               <li class='inbox__listItem'>
               <h2 class='inbox__listTitle'>Friend request</h2>
               <strong class='inbox__listSubTitle'>From: darthVader89</strong>
               <div class='inbox__listDate'>09.09.2021<div>
             </li>
             </ul>
           </div>


           <div class='inbox__item'>

            <div class='mail'>
               <div class='mail__header'>
                  <span></span>
                  <img src='./images/inbox/introduce.jpg'/>  
               </div>
               <h2 class='mail__title'>Welcome in MONSTER HUNTER</h2>
               <div class='mail__content'>
                   <p>
                    Welcome in Monster Hunter game. 
                    When I was creating this game I inspired by the popular game <a href='https://www.sfgame.pl/?cid=sfplplgoaw1604&gclid=Cj0KCQjw4eaJBhDMARIsANhrQADuLkuKG0YLRh-qbLEu67m2WDZEe-nyvd-qRFAhKF2hyFs34AWd8x8aAuBjEALw_wcB' target='_blank'> Shakes & Fidget.</a>
                    I hope you have fun and enjoy your time here.
                 
                   </p>
                     <div>
                      <h3>Contact</h3>
                      <ul>
                       <li><a href='https://discord.com/channels/873119072613707776/873119072613707778' target='_blank'><i class="fab fa-discord"></i> My discord server  </a></li>
                       <li><a href='https://www.facebook.com/dominik.orzechowski.1088' target='_blank'><i class="fab fa-facebook"></i> Contact with me directly by facebook </a></li>
                       <li><a href='https://www.linkedin.com/in/dominik-orzechowski-2aa553212/' target='_blank'><i class="fab fa-linkedin"></i> Linkedin profile </a></li>
                      </ul>
                    </div>
                    <p>
                     <strong>Enjoy your game :)</strong>
                    </p>
                 
                    
               </div>
            </div>
           





           <!--
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
             </div> -->




           </div>
        </section>`;
    }

    init() {
       this.render();
    }
}

//dragon background
//<a href='https://www.freepik.com/vectors/character'>Character vector created by macrovector - www.freepik.com</a>

// friend img
//<a href='https://www.freepik.com/vectors/abstract'>Abstract vector created by upklyak - www.freepik.com</a>

// introduce img
// <a href='https://www.freepik.com/vectors/building'>Building vector created by macrovector - www.freepik.com</a>