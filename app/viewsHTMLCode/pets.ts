import { petsData } from './../properties/pets/petsData';
import { UserData } from '../types';
export const getPetsHTMLCode = (user: UserData): string => {
  return `
    <section class='pets'>

          <div class='pets__userGoldWrapper'>
              <div class='pets__userGold'>
                <img src='./images/coin.png' class='pets__userGoldIcon' alt='coin'/>
                <strong class='pets__userGoldAmount'>${user.gold}</strong>
              </div>
          </div>

          <div class='pets__wrapper'>
       


         ${petsData.map(el => `
               <div class='pets__item'>
             <img class='pets__img' src=${el.imgSrc} alt=${el.name}/>
             <h2 class='pets__name pets__name-${el.name}'>${el.name}</h2>
             <div class='pets__cost'>
               <img  src='./images/coin.png' alt='coin'/>
               <strong id='pet_dragon_cost'>${Math.floor(el.initialCost * user.guardPayout)}</strong>
             </div>
             <ul class='pets__benefits'>
              ${el.properties.travelTime !== null ? `<li class='pets__benefitsItem'>-${el.properties.travelTime}% of travel time </li>` : ''}
              ${el.properties.defense !== null ? `<li class='pets__benefitsItem'>+${el.properties.defense}% to Defence </li>` : ``}
              ${el.properties.physicalEndurance !== null ? `   <li class='pets__benefitsItem'>+${el.properties.physicalEndurance}% to Physical endurance </li>` : ``}
              ${el.properties.strenght !== null ? `<li class='pets__benefitsItem'>+${el.properties.strenght}% to Strength </li>` : ``} 
              ${el.properties.luck !== null ? `    <li class='pets__benefitsItem'>+${el.properties.luck}% to Luck </li>` : ``}
             </ul>
            <div class='pets__buy'><button>Rent for 7 days</button></div>
           </div>
         `)}
         </div>             
   </section>
    `
}