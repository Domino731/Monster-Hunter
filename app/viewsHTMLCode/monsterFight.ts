import { FullUserStats, UserData } from '../types';
export const getMonsterFightHTMLCode = (userStats: FullUserStats, userData: UserData) :string => {
  const weapon = userData.equipmentItems[userData.equipmentItems.findIndex(el => el.type === 'weapon')];

    return `
     <section class='fight'> 

     <div class='fight__container'>   


           <div class='fight__weaponWrapper'> 
              <img src='./images/explosion.png' class='fight__explosion'/>
              ${weapon !== undefined ? 
              `<img src='${weapon.src}' class='fight__sword'/>`
              :
              `<img src='./images/fist.png' class='fight__sword'/>`
              }
           </div>

         <div class='fight__characterWrapper fight__characterWrapper-user'> 
           <img class='fight__characterImg' src='${userData.portrait}'/>
           <div class='fight__healthBar'>
             <div class='fight__healthPoints'>1440 / ${userStats.health}</div>
             <div class='fight__health'></div>
           </div>

           <table class='fight__statsTable'>
              <tbody>
                <tr> 
                  <td>Strength</td>
                  <td>${userStats.strength}</td>
                </tr>
                <tr> 
                  <td>Physical endurance</td>
                  <td>${userStats.physicalEndurance}</td>
                </tr>
                <tr> 
                  <td>Defence</td>
                  <td>${userStats.defence}</td>
                </tr>
                <tr> 
                  <td>luck</td>
                  <td>${userStats.luck}</td>
                </tr>
              </tbody>
           </table>
         </div>



         <div class='fight__characterWrapper fight__characterWrapper-monster'> 


           <div class='monster__explosionWrapper'> 
              <img src='./images/explosion.png'  class='monster__explosionImg'/>
           </div>


            <img class='fight__characterImg' src='${userData.currentMission.monster.src}'/>
           <div class='fight__healthBar'>
              <div class='fight__healthPoints'>1440 / ${userData.currentMission.monster.health}</div>
             <div class='fight__health'></div>
           </div>

           <table class='fight__statsTable'>
               <tbody>
                <tr> 
                  <td>Strength</td>
                  <td>${userStats.strength}</td>
                </tr>
                <tr> 
                  <td>Physical endurance</td>
                  <td>${userStats.physicalEndurance}</td>
                </tr>
                <tr> 
                  <td>Defence</td>
                  <td>${userStats.defence}</td>
                </tr>
                <tr> 
                  <td>luck</td>
                  <td>${userStats.luck}</td>
                </tr>
              </tbody>
           </table>
         </div>

         </div>
     </section>
    `
}

// for rwd - sword attack
/* 
     <section class='fight'> 

     <div class='fight__container'>   


           <div class='fight__weaponWrapper'> 
              <img src='./images/explosion.png' class='fight__explosion'/>
              ${weapon !== undefined ? 
              `<img src='${weapon.src}' class='fight__sword'/>`
              :
              `<img src='./images/fist.png' class='fight__sword'/>`
              }
           </div>

         <div class='fight__characterWrapper fight__characterWrapper-user'> 
           <img class='fight__characterImg' src='${userData.portrait}'/>
           <div class='fight__healthBar'>
             <div class='fight__healthPoints'>1440 / ${userStats.health}</div>
             <div class='fight__health'></div>
           </div>

           <table class='fight__statsTable'>
              <tbody>
                <tr> 
                  <td>Strength</td>
                  <td>${userStats.strength}</td>
                </tr>
                <tr> 
                  <td>Physical endurance</td>
                  <td>${userStats.physicalEndurance}</td>
                </tr>
                <tr> 
                  <td>Defence</td>
                  <td>${userStats.defence}</td>
                </tr>
                <tr> 
                  <td>luck</td>
                  <td>${userStats.luck}</td>
                </tr>
              </tbody>
           </table>
         </div>



         <div class='fight__characterWrapper'> 

            <img class='fight__characterImg' src='${userData.currentMission.monster.src}'/>
           <div class='fight__healthBar'>
              <div class='fight__healthPoints'>1440 / ${userData.currentMission.monster.health}</div>
             <div class='fight__health'></div>
           </div>

           <table class='fight__statsTable'>
               <tbody>
                <tr> 
                  <td>Strength</td>
                  <td>${userStats.strength}</td>
                </tr>
                <tr> 
                  <td>Physical endurance</td>
                  <td>${userStats.physicalEndurance}</td>
                </tr>
                <tr> 
                  <td>Defence</td>
                  <td>${userStats.defence}</td>
                </tr>
                <tr> 
                  <td>luck</td>
                  <td>${userStats.luck}</td>
                </tr>
              </tbody>
           </table>
         </div>

         </div>
     </section>
*/