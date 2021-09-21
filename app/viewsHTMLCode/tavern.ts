import { UserData } from '../types';

const text = "Lorem iporci p.it ante. Praeseida nec enim et consectetur. Pellentesque ornare pellentesque maximus. Donec ullamcorper eu massa eget aliquet. Vivamus mollis mi libero, id interdum massa congue non. Quisque non urna et lacus volutpat pulvinar. Lorem iporci p.it ante. Praeseida nec enim et consectetur. Pellentesque ornare pellentesque maximus. Donec ullamcorper eu massa eget aliquet. Vivamus mollis mi libero, id interdum massa congue non. Quisque non urna et lacus volutpat pulvinar"
export const getTavernHTMLCode = (user: UserData) : string => {
  console.log(user.availableMissions[0].papyrus)
    return `
    <section class='tavern'>
    <div class='tavern__characterWrapper'>
        <div class='tavern__willingnessBar'></div>
        <img class='mission__character' alt='character' src='./images/mission_character_1.png'>
        <span></span>
    </div>
    <div class='tavern__detailsWrapper'> 

         <div class='tavern__details'>
        <div class='mission__informations'>
            <div class='textRool'></div>

            <div class='mission__contentWrapper'>
                <div class='mission__content'>
                      <div class='mission__detailsWrapper'> 
                      
                      <div id='mission_content_wrapper'>   
                      <h2 class='mission__title'>Dark unicorn</h2>
                      <p class='mission__description'>
                          ${text}
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


                      </div>
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
<div id='mission_content_wrapper'>   
<h2 class='mission__title'>Dark unicorn</h2>
<p class='mission__description'>
    ${text}
</p>
<div class='mission__detailsWrapper'>
    <div class='mission__detail'>
        <img class='mission__detailImg' src='./images/coin.png' alt='coin' />
        <span class='mission__detailName'>Gold: </span>
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
</div>


<button class='mission__acceptBtn'>Accept this mission</button> */

/* 
    <section class='tavern'>
    <div class='tavern__characterWrapper'>
        <div class='tavern__willingnessBar'></div>
        <img class='mission__character' alt='character' src='./images/mission_character_1.png'>
        <span></span>
    </div>
    <div class='tavern__details'>
        <div class='mission__informations'>
            <div class='textRool'></div>

            <div class='mission__contentWrapper'>
                <div class='mission__content'>
                      <div class='mission__detailsWrapper'> 
                      
                      <div id='mission_content_wrapper'>   
                      <h2 class='mission__title'>Dark unicorn</h2>
                      <p class='mission__description'>
                          ${text}
                      </p>
                      <div class='mission__detailsWrapper'>
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
                      </div>

                      
                      <button class='mission__acceptBtn'>Accept this mission</button> 

                      </div>
                   
                </div>
                <div class='textRool textRool-bottom'></div>
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
*/