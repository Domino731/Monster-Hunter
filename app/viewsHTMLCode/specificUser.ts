import { getNeededExp } from '../functions/getNeededExp';
import { SearchedUserData, UserData, ShopItem } from '../types';
import { SearchedUser } from '../views/sub_views/specificUser';

export const getSpecificUserHTMLCode = (searchedUser: SearchedUserData): string => {

    const specificEquipmentItemImg = (slot: 'helmet' | 'shield' | 'special' | 'weapon' | 'chestPlate' | 'gloves') => {
       const itemIndex : number = searchedUser.equipmentItems.findIndex(el => el.type === slot);
       const item: ShopItem | undefined =  searchedUser.equipmentItems[itemIndex];
       if(item !== undefined){
           return `<img src='${item.src}' class="profile__equipmentIcon" data-current-item-id='${item.id}' draggable='true'/>`
       }
       else{
           return `<img src='/images/profile_equipment_${slot}.png' class="profile__equipmentIcon">`
       }
    }
    console.log(specificEquipmentItemImg('helmet'))

    return `
   <div class='profile__equipment'>



   <div class='profile__equipmentItem profile__equipmentItem-helmet'>
       ${specificEquipmentItemImg('helmet')}
   </div>
   <div class='profile__equipmentItem profile__equipmentItem-armor'>
      ${specificEquipmentItemImg('chestPlate')}
   </div>
   <div class='profile__equipmentItem profile__equipmentItem-gloves'>
      ${specificEquipmentItemImg('gloves')}
   </div>
   <div class='profile__equipmentItem profile__equipmentItem-weapon'>
      ${specificEquipmentItemImg('weapon')}
   </div>
   <div class='profile__equipmentItem profile__equipmentItem-shield'>
      ${specificEquipmentItemImg('shield')}
   </div>
   <div class='profile__equipmentItem profile__equipmentItem-special'>
      ${specificEquipmentItemImg('special')}
   </div>
   <div class='profile__portrait'>
     <img class='profile__portraitImg' src='${searchedUser.portrait}'/>
   </div>
   <div class='profile__info'>
     <div class='profile__level'>
     <div class='profile__levelProgress' style='width: ${Math.floor(searchedUser.exp * 100 / getNeededExp(searchedUser.level))}%'></div>
      <i>${searchedUser.level}</i>
      </div>
       <strong class='profile__nickname'>nickname</strong>
   </div>
</div>
<div class='profile__description'>
 <p>${searchedUser.description}</p>
</div>
   `
}