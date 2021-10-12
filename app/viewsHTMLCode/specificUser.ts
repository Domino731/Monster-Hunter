import { getNeededExp } from '../functions/getNeededExp';
import { potionsData } from '../properties/shop/potions';
import { SearchedUserData, UserData, ShopItem, FullUserStats, PetProperties } from '../types';
import { SearchedUser } from '../views/sub_views/specificUser';
import { setUserStats } from '../functions/setStats';
import { getFullUserStats } from '../functions/getFullUserStats';


export const getSpecificUserHTMLCode = (friendsArr: {id: string, nick: string}[], searchedUser: SearchedUserData): string => {

    const specificEquipmentItemImg = (slot: 'helmet' | 'shield' | 'special' | 'weapon' | 'chestPlate' | 'gloves') => {
        const itemIndex: number = searchedUser.equipmentItems.findIndex(el => el.type === slot);
        const item: ShopItem | undefined = searchedUser.equipmentItems[itemIndex];
        if (item !== undefined) {
            return `<img src='${item.src}' class="profile__equipmentIcon" data-current-item-id='${item.id}' draggable='true'/>`
        }
        else {
            return `<img src='/images/profile_equipment_${slot}.png' class="profile__equipmentIcon">`
        }
    }

    const firstPotionName = (): string => {
        // find specific potion
        const potion: ShopItem = potionsData[potionsData.findIndex(el => searchedUser.potions.first)];
        return potion.name
    }
    const secondPotionName = (): string => {
        const potion: ShopItem = potionsData[potionsData.findIndex(el => searchedUser.potions.second)];
        return potion.name
    }

    const petImgSrc = () : string => {
        if (searchedUser.pet !== null) {
            return `<img src=${searchedUser.pet.imgSmallSrc} alt=${searchedUser.pet.name} class='profile__generalImg-item'/>`
        }
        else {
            return ` <img src="/images/profile_pet_slot.png" title="Pet slot" />`
        }
    }


   let stats: FullUserStats = {
    strength: searchedUser.rawStats.strength,
    damage: 0,
    physicalEndurance: searchedUser.rawStats.physicalEndurance,
    health: 0,
    defence: searchedUser.rawStats.defence,
    damageReduce: 0,
    luck: searchedUser.rawStats.luck,
    critical: 0
 }

  stats = getFullUserStats(searchedUser)

  // function that will set statistics based on equipment, potions and pet
  
  
 // function that check if searched user is already your friend
 const checkFriend = () : string => {
     const friendIndex = friendsArr.findIndex(el => el.id === searchedUser.id);
     if(friendIndex < 0){
         return `./images/add_friend.png`
     }
     else {
         return `./images/active_friend.png`
     }
 }

 const firstPotionImg = () => {
    // find specific potion
    const potion: ShopItem = potionsData[potionsData.findIndex(el => searchedUser.potions.first)];
    if(potion !== undefined){
       return `<img src=${potion.src} class='profile__generalImg-item'/>`
    }
    else {
       return `<img src="/images/profile_elixir_slot.png" title="Elixir slot #1" />`
    }
 }
 const secondPotionImg = () => {
   // find specific potion
   const potion: ShopItem = potionsData[potionsData.findIndex(el => searchedUser.potions.second)];
   if(potion !== undefined){
      return `<img src=${potion.src} class='profile__generalImg-item'/>`
   }
   else {
      return `<img src="/images/profile_elixir_slot.png" title="Elixir slot #2" />`
   }
}


    return `
   <div class='profile__equipment  profile__equipment-specificUser'>



   <div class='profile__equipmentItem profile__equipmentItem-helmet' data-slot-name='helmet'>
       ${specificEquipmentItemImg('helmet')}
   </div>
   <div class='profile__equipmentItem profile__equipmentItem-armor' data-slot-name='chestPlate'>
      ${specificEquipmentItemImg('chestPlate')}
   </div>
   <div class='profile__equipmentItem profile__equipmentItem-gloves' data-slot-name='gloves'>
      ${specificEquipmentItemImg('gloves')}
   </div>
   <div class='profile__equipmentItem profile__equipmentItem-weapon' data-slot-name='weapon'>
      ${specificEquipmentItemImg('weapon')}
   </div>
   <div class='profile__equipmentItem profile__equipmentItem-shield' data-slot-name='shield'>
      ${specificEquipmentItemImg('shield')}
   </div>
   <div class='profile__equipmentItem profile__equipmentItem-special' data-slot-name='special'>
      ${specificEquipmentItemImg('special')}
   </div>
   <div class='profile__portrait'>
     <img class='profile__portraitImg' src='${searchedUser.portrait}'/>
   </div>






   <div class='profile__info'>



    <div class='profile__itemSpecs disabled' id='specificUser_equipment__item_label'>
               <div id='specificUser_equipment_label_wrapper'></div>         
    </div>

     <div class='profile__level' title='Level exp: ${searchedUser.exp}/${searchedUser.nextLevelAt}'>
     <div class='profile__levelProgress' style='width: ${Math.floor(searchedUser.exp * 100 / getNeededExp(searchedUser.level))}%'></div>
      <i>${searchedUser.level}</i>
      </div>
    <strong class='profile__nickname'>${searchedUser.nick}</strong>
    <div class='searchedUser__actionBar'> 
       <img src='./images/switch.png' class='searchedUser__actionIcon' id='searched_user_switch' title='Switch'/>
       <img src='${checkFriend()}' class='searchedUser__actionIcon' id='searched_user_friend_action' title='Add to friends'/>
    </div>


   </div>
</div>

<div class='profile__description ${searchedUser.description.length < 6 && 'disabled'}'>
 <p>${searchedUser.description}</p>
</div>


   <div id='searched_user_general'>


        <div class='profile__general profile__general-searchedUser'>
        <div class='profile__generalLabelWrapper'> </div>
            
       
    
            <div class='profile__generalItem' id='profile_general_pet'>
                <div class='profile__generalImg ${searchedUser.pet !== null && 'profile__generalImg-item'}'>${petImgSrc()}</div>
                <strong class='profile__generalText'>${searchedUser.pet !== null ? searchedUser.pet.name : 'No pet'}</strong>
            </div>
            <div class='profile__generalItem' id='profile_general_potion_first'>
                <div class='profile__generalImg ${searchedUser.pet !== null && 'profile__generalImg-item'}'> ${firstPotionImg()}
                </div>
                <strong class='profile__generalText'>${searchedUser.potions.first !== null ? firstPotionName() : 'No potion'}</strong>
              
                
            </div>
            <div class='profile__generalItem' id='profile_general_potion_second'>
                <div class='profile__generalImg ${searchedUser.pet !== null && 'profile__generalImg-item'}'> ${secondPotionImg()}
                </div>
                <strong class='profile__generalText'>${searchedUser.potions.second !== null ? secondPotionName() : 'No potion'}</strong>
            </div>
        </div>


        <div class='searchedUser__statsWrapper'> 
        
          <table class='searchedUser__statsTable'> 
              <tbody> 
                <tr>
                  <td>Strength:</td><td>${stats.strength}</td>
               </tr>
               <tr>
                  <td>Physical endurance:</td><td>${stats.physicalEndurance}</td>
               </tr>
               <tr>
                  <td>Defence:</td><td>${stats.defence}</td>
               </tr>
               <tr>
                  <td>Luck:</td><td>${stats.luck}</td>
               </tr>
              </tbody>
          </table>


          <table class='searchedUser__statsTable'> 
            <tbody> 
               <tr>
                  <td>Damage:</td><td>${stats.damage}</td>
               </tr>
               <tr>
                  <td>Health:</td><td>${stats.health}</td>
               </tr>
               <tr>
                  <td>Damage reduce:</td><td>${stats.damageReduce}</td>
               </tr>
               <tr>
                  <td>Chance for critical:</td><td>${stats.critical}</td>
               </tr>
            </tbody>
          </table>
        </div>

        </div>
   `
}