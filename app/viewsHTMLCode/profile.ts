import { potionsData } from './../properties/shop/potions';
import { getPotionLabel } from './../views/sub_views/getPotionLabel';
import { UserData } from './../types';
import { ShopItem } from '../types';
import { weaponsData } from '../properties/shop/weapons';
import { getNeededExp } from '../functions/getNeededExp';
export const getProfileHTMLCode = (user: UserData): string => {
    return `
    <section class='game__section profile background'>

    <div class='profile__item'>
       <div class='game__errorWrapper disabled' id='profile__error'></div>

        <div class='profile__equipment profile__equipment-currentUser' id='profile_equipment_slots'>
            <div class='profile__equipmentItem profile__equipmentItem-helmet' data-slot-name='helmet'>
                <img src='/images/profile_equipment_helmet.png' class="profile__equipmentIcon">
            </div>
            <div class='profile__equipmentItem profile__equipmentItem-armor' data-slot-name='chestPlate'>
                <img src='/images/profile_equipment_armor.png' class="profile__equipmentIcon">
            </div>
            <div class='profile__equipmentItem profile__equipmentItem-gloves' data-slot-name='gloves'>
                <img src='/images/profile_equipment_gloves.png' class="profile__equipmentIcon">
            </div>
            <div class='profile__equipmentItem profile__equipmentItem-weapon' data-slot-name='weapon'>
                <img src='/images/profile_equipment_weapon.png' class="profile__equipmentIcon">
            </div>
            <div class='profile__equipmentItem profile__equipmentItem-shield' data-slot-name='shield'>
                <img src='/images/profile_equipment_shield.png' class="profile__equipmentIcon">
            </div>
            <div class='profile__equipmentItem profile__equipmentItem-special' data-slot-name='special'>
                <img src='/images/profile_equipment_special.png' class="profile__equipmentIcon">
            </div>




         
            <div class='profile__portrait'> 
            <img class='profile__portraitImg' src='${user.portrait}'/>
            <div class='profile__portraitActionBar'> 
               <div class='profile__portraitBtn profile__portraitBtn-left'></div>
                  <img src='./images/change_portrait_icon.png' class='profile__portraitActionIcon'/>
               <div class='profile__portraitBtn profile__portraitBtn-right'></div>
            </div>
            
            </div>






            <div class='profile__info'>


            <div class='profile__itemSpecs disabled' id='profile_equipment__item_label'>

               <div id='profile_equipment_label_wrapper'> </div> 
                
               <div class='profile__actionError' id='profile_equipment_move_item_error'></div>
               <div class='profile__actionWrapper' id='profile_equipment_move_item_btn'>
                 <img src='./images/profile_icon_backpack.png' class='profile__equipmentItemSellIcon'/>
                 <strong class='profile__actionName'>Move to backpack</strong>
               </div>
                    
             </div>

                <div class='profile__level' title='Level exp: ${user.exp}/${user.nextLevelAt}'>
                <div class='profile__levelProgress' style='width: ${Math.floor(user.exp * 100 / getNeededExp(user.level))}%'></div>
                   <i>${user.level}</i>
                </div>
                <strong class='profile__nickname'>${user.nick}</strong>



            </div>
        </div>
        <div class='profile__description'>
            <textarea type="textarea" name="user-description" value='${user.description}' placeholder='Your description' maxLength="440"></textarea>
        </div>
        <a href='https://www.freepik.com/vectors/background' target="_black">Background vector created by upklyak -
            www.freepik.com</a>

    </div>

    <div class='profile__item'>
        <div class='profile__backpack' id='profile_backpack_slots'>
            <div class='profile__backpackRow'>
                <div class='profile__backpackItem' data-backpack-slot='1'> </div>
                <div class='profile__backpackItem' data-backpack-slot='2'> </div>
                <div class='profile__backpackItem' data-backpack-slot='3'> </div>
                <div class='profile__backpackItem' data-backpack-slot='4'> </div>
                <div class='profile__backpackItem' data-backpack-slot='5'> </div>
            </div>



            <div class='profile__backpackLabelWrapper'>   
               <div class='profile__itemSpecs profile__itemSpecs-backpackSlot disabled' id='profile_backpack_item_label'> 
                     <div id='profile_backpack_label_wrapper'> </div> 
                     <div class='profile__actionError' id='profile_backpack_move_item_error'></div>
                     <div class='profile__actionWrapper' id='profile_backpack_move_item_btn'>
                       <img src='./images/profile_icon_backpack.png' class='profile__equipmentItemSellIcon' id='profile_backpack_replace_item_icon'/>
                       <strong class='profile__actionName'>Equip</strong>
                    </div>
               </div>
            </div>

            <div class='profile__backpackRow'>
                <div class='profile__backpackItem' data-backpack-slot='6'> </div>
                <div class='profile__backpackItem' data-backpack-slot='7'> </div>
                <div class='profile__backpackItem' data-backpack-slot='8'> </div>
                <div class='profile__backpackItem' data-backpack-slot='9'> </div>
                <div class='profile__backpackItem' data-backpack-slot='10'> </div>
            </div>
        </div>


        <div class='profile__general'>
        <div class='profile__generalLabelWrapper'></div>
            
        
            <div class='profile__generalItem' id='profile_general_gold'>
                <div class='profile__generalImg'> <img src="/images/profile_coins.png" alt="Your coins" /></div>
                <strong class='profile__generalText'></strong>
            </div>
            <div class='profile__generalItem' id='profile_general_pet'>
                <div class='profile__generalImg'> <img src="/images/profile_pet_slot.png" alt="Pet slot" /></div>
                <strong class='profile__generalText'></strong>
            </div>
            <div class='profile__generalItem' id='profile_general_potion_first'>
                <div class='profile__generalImg'> <img src="/images/profile_elixir_slot.png" alt="Elixir slot #1" />
                </div>
                <strong class='profile__generalText'></strong>
            </div>
            <div class='profile__generalItem' id='profile_general_potion_second'>
                <div class='profile__generalImg'> <img src="/images/profile_elixir_slot.png" alt="Elixir slot #2" />
                </div>
                <strong class='profile__generalText'></strong>
            </div>
        </div>

        <div class='profile__stats'>
            <table>
                <tbody>
                    <tr id='profile_strength_stat'>
                        <td class='profile__item--name'> <img src="/images/stats_strength.png" alt="strength" />
                            <strong>Strength</strong></td>
                        <td class='profile__item--amount'>123123</td>
                        <td class='profile__item--cost'>
                            <img src="/images/coin.png" alt="coin" />
                            <strong></strong>
                        </td>
                        <td class='profile__item--buyBtn'>
                            <button>+</button>
                        </td>
                    </tr>
                    <tr id='profile_damage_stat'>
                        <td class='profile__item--name profile__item--nameBlue'><strong>Damage</strong></td>
                        <td class='profile__item--amount profile__item--nameBlue'></td>
                    </tr>


                    <tr id='profile_PE_stat'>
                        <td class='profile__item--name'> <img src="/images/stats_runner.png" alt="physical endurance" />
                            <strong>physical endurance</strong></td>
                        <td class='profile__item--amount'>123123</td>
                        <td class='profile__item--cost'>
                            <img src="/images/coin.png" alt="coin" />
                            <strong></strong>
                        </td>
                        <td class='profile__item--buyBtn'>
                        <button>+</button>
                        </td>
                    </tr>
                    <tr id='profile_health_stat'>
                        <td class='profile__item--name profile__item--nameBlue'><strong>Health</strong></td>
                        <td class='profile__item--amount profile__item--nameBlue'>11000</td>
                    </tr>

                    <tr id='profile_defence_stat'>
                        <td class='profile__item--name'> <img src="/images/stats_defence.png" alt="Defence" />
                            <strong>Defence</strong></td>
                        <td class='profile__item--amount'>123123</td>
                        <td class='profile__item--cost'>
                            <img src="/images/coin.png" alt="coin" />
                            <strong></strong>
                        </td>
                        <td class='profile__item--buyBtn'>
                        <button>+</button>
                        </td>
                    </tr>
                    <tr id='profile_damegeReduce_stat'>
                        <td class='profile__item--name profile__item--nameBlue'><strong>Damage reduce</strong></td>
                        <td class='profile__item--amount profile__item--nameBlue'>11000</td>
                    </tr>

                    <tr id='profile_luck_stat'>
                        <td class='profile__item--name'> <img src="/images/stats_clover.png" alt="Luck" />
                            <strong>Luck</strong></td>
                        <td class='profile__item--amount'>123123</td>
                        <td class='profile__item--cost'>
                            <img src="/images/coin.png" alt="coin" />
                            <strong>123</strong>
                        </td>
                        <td class='profile__item--buyBtn'>
                        <button>+</button>
                        </td>
                    </tr>
                    <tr id='profile_critical_stat'>
                        <td class='profile__item--name profile__item--nameBlue'><strong>Chance for critical</strong>
                        </td>
                        <td class='profile__item--amount profile__item--nameBlue'>11000</td>
                    </tr>


                </tbody>
            </table>
        </div>
    </div>


</section>
    `
}
export const profileMobileNavCode = `
<div class='mobileNav__item'>
<div class='mobileNav__itemIcon'> 
 <img src='./images/mobileNav_blacksmith_knight.png' />
</div>
<div class='mobileNav__itemName'> 
 Profile
</div>
</div>

<div class='mobileNav__item'>
<div class='mobileNav__itemIcon'> 
   <img src='./images/mobileNav_profile_chest.png' />
</div>
<div class='mobileNav__itemName'> 
   Backpack
</div>
</div>


`