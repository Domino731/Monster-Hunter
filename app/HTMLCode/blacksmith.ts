import { getNeededExp } from '../functions/getNeededExp';
import { UserData } from '../types';
export const getBlacksmithHTMLCode = (user: UserData) => {
  return `<section class='blacksmith transparent background'>
  <div class='blacksmith__item'>
   <div class='game__errorWrapper disabled' id='blacksmith__error'>Your backpack is full</div>
   
       <div class='profile__equipment profile__equipment-currentUser' id='equipment_slots'>

            <div class='profile__equipmentItem profile__equipmentItem-helmet' data-slot-name='helmet' title='Helmet'> 
              <img src='/images/profile_equipment_helmet.png' class="profile__equipmentIcon"/>
            </div>
      

          <div class='profile__equipmentItem profile__equipmentItem-armor' data-slot-name='chestPlate' title='Chest plate'> 
             <img src='/images/profile_equipment_armor.png' class="profile__equipmentIcon"/>
          </div>


          <div class='profile__equipmentItem profile__equipmentItem-gloves' data-slot-name='gloves' title='Gloves'> 
             <img src='/images/profile_equipment_gloves.png' class="profile__equipmentIcon"/>
          </div>


          <div class='profile__equipmentItem profile__equipmentItem-weapon' data-slot-name='weapon' title='Weapon'> 
             <img src='/images/profile_equipment_weapon.png' class="profile__equipmentIcon"/>
          </div>


          <div class='profile__equipmentItem profile__equipmentItem-shield' data-slot-name='shield' title='Shield'> 
             <img src='/images/profile_equipment_shield.png' class="profile__equipmentIcon"/>
          </div>


          <div class='profile__equipmentItem profile__equipmentItem-special' data-slot-name='special' title='Special'> 
             <img src='/images/profile_equipment_special.png' class="profile__equipmentIcon"/>
          </div>



          <div class='profile__portrait'> 
          <img class='profile__portraitImg' src='${user.portrait}'/>
          </div>


          <div class='profile__info'>




             <div class='profile__itemSpecs disabled' id='blacksmith_equipment__item_label'>

               <div id='blacksmith_equipment_label_wrapper'> </div> 
                
               <div class='profile__actionError' id='blacksmith_equipment_move_item_error'></div>
               <div class='profile__actionWrapper' id='blacksmith_equipment_move_item_btn'>
                 <img src='./images/profile_icon_backpack.png' class='profile__equipmentItemSellIcon'/>
                 <strong class='profile__actionName'>Move to backpack</strong>
               </div>
                          
               <div class='profile__equipmentItemSellWrapper'> 
                 <img src='./images/profile_sell_item_icon.png' class='profile__equipmentItemSellIcon'/>
                 <strong class='profile__equipmentItemSellPrice' id='blacksmith_sell_item_value'></strong>
               </div>

             </div>




             <div class='profile__level'  title='Level exp: ${user.exp}/${user.nextLevelAt}'> 
                   <div class='profile__levelProgress' style='width: ${Math.floor(user.exp * 100 / getNeededExp(user.level))}%'></div>
                   ${user.level}
             </div>

             
             <strong class='profile__nickname'>${user.nick}</strong>
             <div class='profile__goldBar' id='blacksmith_gold_bar'> 
                <img class='profile__goldIcon' src='./images/coin.png' alt='coin'/>
                <strong class='profile__goldAmount' id='blacksmith_gold_amount'>${user.gold}</strong>
             </div>



             <div class='profile__goldSubstract disabled' id='blacksmith_gold_substract'></div>
          </div>
       </div>           
  



   <div>








   </div>    
   <div class='profile__backpack' id='blacksmith_backpack_slots'>
      <div>
       <div class='profile__backpackRow'>
          <div class='profile__backpackItem' data-backpack-slot='1'> </div>
          <div class='profile__backpackItem' data-backpack-slot='2'> </div>
          <div class='profile__backpackItem' data-backpack-slot='3'> </div>
          <div class='profile__backpackItem' data-backpack-slot='4'> </div>
          <div class='profile__backpackItem' data-backpack-slot='5'> </div>
       </div>
       <div class='profile__backpackLabelWrapper profile__backpackLabelWrapper-blacksmith'> 
       <div class='profile__itemSpecs  profile__itemSpecs-backpackSlot disabled' id='blacksmith_backpack_item_label'>
       <div id='blacksmith_backpack_label_wrapper'></div> 
       
       <div class='profile__actionError' id='blacksmith_backpack_move_item_error'></div>
       <div class='profile__actionWrapper' id='blacksmith_backpack_move_item_btn'>
         <img src='./images/profile_icon_backpack.png' class='profile__equipmentItemSellIcon' id='blacksmith_backpack_replace_item_icon'/>
         <strong class='profile__actionName'>Equip</strong>
       </div>
                 
       <div class='profile__equipmentItemSellWrapper'> 
         <img src='./images/profile_sell_item_icon.png' class='profile__equipmentItemSellIcon'/>
         <strong class='profile__equipmentItemSellPrice' id='blacksmith_backpack_sell_item_value'></strong>
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
    <img src='./images/profile_treasure_chest.png' class='profile__mobileTreasureChest'/>
  </div>
   



  
  </div>

     <div class='blacksmith__item market__shop' id='blacksmith_shop_wrapper'> 

     <div class='market__deliveryWrapper market__deliveryWrapper-blacksmith'> 
        <div class='market__deliveryTitle'>Next delivery in</div>
        <div class='market__deliveryTime' id='blacksmith_countdown_time'></div>
     </div>

      <div class='market__characterWrapper'>

        <div class='market__itemInfoWrapper disabled' id='blacksmith_item_label'></div> 
   
                            
        <img class='market__characterImg' src='./images/blacksmith.png' alt='blacksmith'/>   
        <img  class='blacksmith__mobileTable' src='./images/blacksmith_table.png'/>
       </div>

       <div class='market__itemsList' id='market_slots'>
          <div class='market__shopRow'> 

             <div class='market__shopFrame blacksmith__frame'>
               <div class='market__slotWrapper'>  
                 <div class='market__slot' draggable='true'>
                 
                 </div>  
               </div>  
             </div>

              <div class='market__shopFrame blacksmith__frame'>
               <div class='market__slotWrapper'>  
                 <div class='market__slot' draggable='true'>
                 
                 </div>  
               </div>  
             </div>


              <div class='market__shopFrame blacksmith__frame'>
               <div class='market__slotWrapper'>  
                 <div class='market__slot' draggable='true'>
                 
                 </div>  
               </div>  
             </div>


          </div>

       <div class='market__shopRow'> 
            <div class='market__shopFrame blacksmith__frame'>
               <div class='market__slotWrapper'>  
                 <div class='market__slot' draggable='true'>
                 
                 </div>  
               </div>  
             </div>


            <div class='market__shopFrame blacksmith__frame'>
               <div class='market__slotWrapper'>  
                 <div class='market__slot' draggable='true'>
                 
                 </div>  
               </div>  
             </div>

            <div class='market__shopFrame blacksmith__frame'>
               <div class='market__slotWrapper'>  
                 <div class='market__slot' draggable='true'>
                 
                 </div>  
               </div>  
             </div>

       </div>
       </div>
  
  </div>
    


</section>`
}
export const blacksmithMobileNavCode = `
        <div class='mobileNav__item'>
           <div class='mobileNav__itemIcon'> 
              <img src='./images/mobileNav_blacksmith_anvil.png' />
           </div>
           <div class='mobileNav__itemName'> 
              Blacksmith
           </div>
         </div>

         <div class='mobileNav__item'>
         <div class='mobileNav__itemIcon'> 
            <img src='./images/mobileNav_blacksmith_knight.png' />
         </div>
         <div class='mobileNav__itemName'> 
            Profile
         </div>
       </div>
`