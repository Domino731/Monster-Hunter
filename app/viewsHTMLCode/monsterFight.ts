import { FullUserStats, UserData } from '../types';
export const getMonsterFightHTMLCode = (userStats: FullUserStats, userData: UserData) :string => {
    return `
     <section class='fight'> 
         <div class='fight__characterWrapper'> 

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

     </section>
    `
}