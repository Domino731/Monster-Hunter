import { UserData } from '../types';

export const getTavernHTMLCode = (user: UserData) : string => {

    return `
    <section class='tavern'>
    <div class='tavern__characterWrapper'>
        <div class='tavern__willingnessBar'></div>
        <img class='mission__character disabled' alt='character'>
        <span></span>
    </div>
    <div class='tavern__detailsWrapper'>

        <div class='tavern__details'>
            <div class='mission__informations disabled'>
                <div class='textRool'></div>

                <div class='mission__contentWrapper'>
                    <div class='mission__content'>
                        <div class='mission__detailsWrapper'>

                            <div id='mission_content_wrapper'>                                
                            </div>


                            <button class='mission__acceptBtn'>Accept this mission</button>

                        </div>

                    </div>
                    <div class='textRool textRool-bottom'></div>
                </div>

            </div>

        </div>

    </div>

    <div class='tavern__list'>
        <h2 class='tavern__title'>Available tavern</h2>
        <div class='tavern__listWrapper'>
            ${user.availableMissions.map(el => `<img src='${el.papyrus}' alt='papyrus' data-mission-id='${el.id}'
                class='tavern__papyrus' />`)}

        </div>
    </div>
</section>
    `
}


// for rwd
/*
 <h2 class='mission__title'>Dark unicorn</h2>
   <p class='mission__description'>
       ${`asdddasddddddddddddddddddddddddd`}
   </p>
   <div class='mission__general'>

       <div>
           <div class='mission__detail'>
               <img class='mission__detailImg' src='./images/coin.png' alt='coin' />
               <span class='mission__detailName'>Coins: </span>
               <strong class='mission__detailResult'>12044</strong>
           </div>
           <div class='mission__detail'>
               <img class='mission__detailImg' src='./images/mission_detail_increase.png'
                   alt='Level increase' />
               <span class='mission__detailName'>Experience: </span>
               <strong class='mission__detailResult'>125</strong>
           </div>
           <div class='mission__detail'>
               <img class='mission__detailImg' src='./images/mission_detail_hourglass.png'
                   alt='hourglass' />
               <span class='mission__detailName'>Time: </span>
               <strong class='mission__detailResult'>10m.</strong>
           </div>
       </div>

       <img src='./images/coin.png' class='mission__monsterWrapper'> </img>


   </div>*/

