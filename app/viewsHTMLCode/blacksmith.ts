import { UserData } from '../types';
export const getBlacksmithHTMLCode = (data: UserData) => {
  return `<section class='blacksmith transparent'>
  <div class='blacksmith__item'>
       <div class='profile__equipment' id='equipment_slots'>

            <div class='profile__equipmentItem profile__equipmentItem-helmet' data-slot-name='helmet'> 
              <img src='/images/profile_equipment_helmet.png' class="profile__equipmentIcon"/>
            </div>
      

          <div class='profile__equipmentItem profile__equipmentItem-armor' data-slot-name='chestPlate'> 
             <img src='/images/profile_equipment_armor.png' class="profile__equipmentIcon"/>
          </div>


          <div class='profile__equipmentItem profile__equipmentItem-gloves' data-slot-name='gloves'> 
             <img src='/images/profile_equipment_gloves.png' class="profile__equipmentIcon"/>
          </div>


          <div class='profile__equipmentItem profile__equipmentItem-weapon' data-slot-name='weapon'> 
             <img src='/images/profile_equipment_weapon.png' class="profile__equipmentIcon"/>
          </div>


          <div class='profile__equipmentItem profile__equipmentItem-shield' data-slot-name='shield'> 
             <img src='/images/profile_equipment_shield.png' class="profile__equipmentIcon"/>
          </div>


          <div class='profile__equipmentItem profile__equipmentItem-special' data-slot-name='special'> 
             <img src='/images/profile_equipment_special.png' class="profile__equipmentIcon"/>
          </div>



          <div class='profile__portrait'> </div>
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




             <div class='profile__level'>  </div>
             <strong class='profile__nickname'>nickname</strong>
             <div class='profile__goldBar' id='blacksmith_gold_bar'> 
                <img class='profile__goldIcon' src='./images/coin.png' alt='coin'/>
                <strong class='profile__goldAmount' id='blacksmith_gold_amount'>${data.gold}</strong>
             </div>



             <div class='profile__goldSubstract disabled' id='blacksmith_gold_substract'></div>
          </div>
       </div>           
  



   <div>
   <div class='profile__itemSpecs disabled profile__itemSpecs-backpackSlot10' id='blacksmith_backpack_item_label'>

   <div id='blacksmith_backpack_label_wrapper'> 
   
   
        <h3 class='market__itemTitle itemTitle market__itemTitle-common'>asdddddddddd</h3>
                          <strong class='market__itemRarity itemRarity  market__itemRarity-common'>Legendary</strong>
                          <p class='market__itemDsc itemDsc'>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loere lorem lorem lorem lorem </p>

                          <table class='market__itemStats itemStats'>
                          <tbody>
             
                         <tr>
                              <td>Strength</td>
                              <td>123123</td>
                            </tr>
                           
                        
                          <tr>
                                <td>Physical endurance</td>
                                <td>12312</td>
                              </tr>
                           
                            <tr>
                                    <td>Defence</td>
                                    <td>12</td>
                                  </tr>
                              
                                                                                                                    
                            <tr>
                                    <td>Luck</td>
                                    <td>12333</td>
                                </tr>                                 
                          </tbody>
                        </table>



   </div> 
   
   <div class='profile__actionError' id='blacksmith_backpack_move_item_error'></div>
   <div class='profile__actionWrapper' id='blacksmith_backpack_move_item_btn'>
     <img src='./images/profile_icon_backpack.png' class='profile__equipmentItemSellIcon'/>
     <strong class='profile__actionName'>Move to backpack</strong>
   </div>
             
   <div class='profile__equipmentItemSellWrapper'> 
     <img src='./images/profile_sell_item_icon.png' class='profile__equipmentItemSellIcon'/>
     <strong class='profile__equipmentItemSellPrice' id='blacksmith_backpack_sell_item_value'></strong>
   </div>
  </div>





   </div>    
   <div class='profile__backpack' id='blacksmith_equipment_slots'>
       <div class='profile__backpackRow'>
          <div class='profile__backpackItem' data-backpack-slot='1'> </div>
          <div class='profile__backpackItem' data-backpack-slot='2'> </div>
          <div class='profile__backpackItem' data-backpack-slot='3'> </div>
          <div class='profile__backpackItem' data-backpack-slot='4'> </div>
          <div class='profile__backpackItem' data-backpack-slot='5'> </div>
       </div>
       <div class='profile__backpackRow'>
          <div class='profile__backpackItem' data-backpack-slot='6'> </div>
          <div class='profile__backpackItem' data-backpack-slot='7'> </div>
          <div class='profile__backpackItem' data-backpack-slot='8'> </div>
          <div class='profile__backpackItem' data-backpack-slot='9'> </div>
          <div class='profile__backpackItem' data-backpack-slot='10'> </div>
       </div>

  </div>




  
  </div>

     <div class='blacksmith__item market__shop'> 
      <div class='market__characterWrapper'>

        <div class='market__itemInfoWrapper disabled' id='blacksmith_item_label'></div> 
   
                            
        <img class='market__characterImg' src='./images/blacksmith.png' alt='blacksmith'/>   

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