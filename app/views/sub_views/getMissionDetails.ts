import { MissionData } from '../../types';
export const getMissionDetails = (mission: MissionData) : string => {
   return `
   
   <h2 class='mission__title'>${mission.title}</h2>
   <p class='mission__description'>
       ${mission.dsc}
   </p>
   <div class='mission__general'>

       <div>
           <div class='mission__detail'>
               <img class='mission__detailImg' src='./images/coin.png' alt='coin' />
               <span class='mission__detailName'>Gold: </span>
               <strong class='mission__detailResult'>${mission.gold}</strong>
           </div>
           <div class='mission__detail'>
               <img class='mission__detailImg' src='./images/mission_detail_increase.png'
                   alt='Level increase' />
               <span class='mission__detailName'>Experience: </span>
               <strong class='mission__detailResult'>${mission.exp}</strong>
           </div>
           <div class='mission__detail'>
               <img class='mission__detailImg' src='./images/mission_detail_hourglass.png'
                   alt='hourglass' />
               <span class='mission__detailName'>Time: </span>
               <strong class='mission__detailResult'>${mission.time}</strong>
           </div>
       </div>

       <img src='${mission.monster.src}' class='mission__monsterWrapper'> </img>


   </div>
   `
}