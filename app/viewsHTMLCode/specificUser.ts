import { getNeededExp } from '../functions/getNeededExp';
import { potionsData } from '../properties/shop/potions';
import { SearchedUserData, UserData, ShopItem, FullUserStats, PetProperties } from '../types';
import { SearchedUser } from '../views/sub_views/specificUser';

export const getSpecificUserHTMLCode = (searchedUser: SearchedUserData): string => {

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
            return ` <img src="/images/profile_pet_slot.png" alt="Pet slot" />`
        }
    }


   const stats: FullUserStats = {
    strength: 0,
    damage: 0,
    physicalEndurance: 0,
    health: 0,
    defence: 0,
    damageReduce: 0,
    luck: 0,
    critical: 0
 }


  // function that will set statistics based on equipment, potions and pet
  const setStats = () => {

    // by equipment
    searchedUser.equipmentItems.forEach(el => {
       if (el.properties.strength !== null) {
          stats.strength = Math.floor(searchedUser.rawStats.strength + el.properties.strength);
          stats.damage = Math.floor(stats.strength * 0.7);
       }
       if (el.properties.luck !== null) {
          stats.luck = Math.floor(searchedUser.rawStats.luck + el.properties.luck);
          stats.critical = Math.floor(stats.luck * 0.3);
       }
       if (el.properties.physicalEndurance !== null) {
          stats.physicalEndurance = Math.floor(searchedUser.rawStats.physicalEndurance + el.properties.physicalEndurance);
          stats.health = Math.floor(stats.physicalEndurance * 0.8);
       }
       if (el.properties.defence !== null) {
          stats.defence = Math.floor(searchedUser.rawStats.defence + el.properties.defence);
          stats.damageReduce = Math.floor(stats.defence * 0.5);
       }
    });

    // by pet
    if (searchedUser.pet !== null) {
       const petProps: PetProperties = searchedUser.pet.properties
       if (petProps.strength !== null) {
          stats.strength = stats.strength + Math.floor(searchedUser.rawStats.strength * (petProps.strength / 100));
          stats.damage = Math.floor(stats.strength * 0.7);
       }
       if (petProps.luck !== null) {
          stats.luck = stats.luck + Math.floor(searchedUser.rawStats.luck * (petProps.luck / 100));
          stats.critical = Math.floor(stats.luck * 0.3);
       }
       if (petProps.physicalEndurance !== null) {
          stats.physicalEndurance = stats.physicalEndurance + Math.floor(searchedUser.rawStats.physicalEndurance * (petProps.physicalEndurance / 100));
          stats.health = Math.floor(stats.physicalEndurance * 0.8);
       }
       if (petProps.defence !== null) {
          stats.defence = stats.defence + Math.floor(searchedUser.rawStats.defence * (petProps.defence / 100));
          stats.damageReduce = Math.floor(stats.defence * 0.5);
       }
    }
    // by potions       
    const firstPotion: ShopItem | undefined = potionsData[potionsData.findIndex(el => searchedUser.potions.first)];
    const secondPotion: ShopItem | undefined = potionsData[potionsData.findIndex(el => searchedUser.potions.second)];
    // first potion
    if (firstPotion !== undefined) {
       if (firstPotion.properties.strength !== null) {
          stats.strength = stats.strength + Math.floor(searchedUser.rawStats.strength * (firstPotion.properties.strength / 100));
          stats.damage = Math.floor(stats.strength * 0.7);
       }
       if (firstPotion.properties.luck !== null) {
          stats.luck = stats.strength + Math.floor(searchedUser.rawStats.luck * (firstPotion.properties.luck / 100));
          stats.critical = Math.floor(stats.luck * 0.3);
       }
       if (firstPotion.properties.physicalEndurance !== null) {
          stats.physicalEndurance = stats.strength + Math.floor(searchedUser.rawStats.physicalEndurance * (firstPotion.properties.physicalEndurance / 100));
          stats.health = Math.floor(stats.physicalEndurance * 0.8);
       }
       if (firstPotion.properties.defence !== null) {
          stats.defence = stats.strength + Math.floor(searchedUser.rawStats.defence * (firstPotion.properties.defence / 100));
          stats.damageReduce = Math.floor(stats.defence * 0.5);
       }
    }
    // second potion
    if (secondPotion !== undefined) {
       if (secondPotion.properties.strength !== null) {
          stats.strength = stats.strength + Math.floor(searchedUser.rawStats.strength * (secondPotion.properties.strength / 100));
          stats.damage = Math.floor(stats.strength * 0.7);
       }
       if (secondPotion.properties.luck !== null) {
          stats.luck = stats.strength + Math.floor(searchedUser.rawStats.luck * (secondPotion.properties.luck / 100));
          stats.critical = Math.floor(stats.luck * 0.3);
       }
       if (secondPotion.properties.physicalEndurance !== null) {
          stats.physicalEndurance = stats.strength + Math.floor(searchedUser.rawStats.physicalEndurance * (secondPotion.properties.physicalEndurance / 100));
          stats.health = Math.floor(stats.physicalEndurance * 0.8);
       }
       if (secondPotion.properties.defence !== null) {
          stats.defence = stats.strength + Math.floor(searchedUser.rawStats.defence * (secondPotion.properties.defence / 100));
          stats.damageReduce = Math.floor(stats.defence * 0.5);
       }

    }
 }

 setStats();
 console.log(stats)
 



    return `
   <div class='profile__equipment'>



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

     <div class='profile__level'>
     <div class='profile__levelProgress' style='width: ${Math.floor(searchedUser.exp * 100 / getNeededExp(searchedUser.level))}%'></div>
      <i>${searchedUser.level}</i>
      </div>
    <strong class='profile__nickname'>nickname</strong>



   </div>
</div>

<div class='profile__description ${searchedUser.description.length < 10 && 'disabled'}'>
 <p>${searchedUser.description}</p>
</div>




        <div class='profile__general profile__general-searchedUser'>
        <div class='profile__generalLabelWrapper'> </div>
            
       
    
            <div class='profile__generalItem' id='profile_general_pet'>
                <div class='profile__generalImg ${searchedUser.pet !== null && 'profile__generalImg-item'}'>${petImgSrc()}</div>
                <strong class='profile__generalText'>${searchedUser.pet !== null ? searchedUser.pet.name : 'No pet'}</strong>
            </div>
            <div class='profile__generalItem' id='profile_general_potion_first'>
                <div class='profile__generalImg'> <img src="/images/profile_elixir_slot.png" alt="Elixir slot #1" />
                </div>
                <strong class='profile__generalText'>${searchedUser.potions.first !== null ? firstPotionName() : 'No potion'}</strong>
              
                
            </div>
            <div class='profile__generalItem' id='profile_general_potion_second'>
                <div class='profile__generalImg'> <img src="/images/profile_elixir_slot.png" alt="Elixir slot #2" />
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

   `
}