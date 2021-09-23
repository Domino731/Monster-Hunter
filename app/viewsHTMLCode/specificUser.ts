import { getNeededExp } from '../functions/getNeededExp';
import { potionsData } from '../properties/shop/potions';
import { SearchedUserData, UserData, ShopItem } from '../types';
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


   `
}