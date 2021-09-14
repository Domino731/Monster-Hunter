import { AvailableMarketPicks, ShopItem, UserData } from '../types';
import { chestplatesData } from '../properties/shop/chestplates';
import { helmetsData } from '../properties/shop/helmets';
import { glovesData } from '../properties/shop/gloves';
import { weaponsData } from '../properties/shop/weapons';
import { shieldsData } from '../properties/shop/shields';
import { getRandomShopItem } from '../functions/getRandomShopItem';
import { getBlacksmithItemLabel } from './sub_views/getBlacksmithItemLabel';
import { allMarketItems } from '../properties/shop/allMarketItems';
import { View } from './view';
import { setItemStats } from '../functions/setItemStats';
import { updateUserData } from '../firebase/operations';
import { getEquipmentLabel } from './sub_views/getEquipmentLabel';
export class Blacksmith extends View {

   private dom: {
      market: HTMLElement | null,
      marketSlots: NodeListOf<Element> | null,
      itemLabel: HTMLElement | null,
      equipmentSlots: NodeListOf<Element> | null,
      goldAmount: HTMLElement | null,
      goldBar: HTMLElement | null,
      goldSubstract: HTMLElement | null
      equipmentLabel: {
         root: HTMLElement,
         sellBtn: HTMLElement
         labelWrapper: HTMLElement
      }
   }
   private market: ShopItem[]
   constructor() {
      super(),
         this.dom = {
            market: document.querySelector("#market_slots"),
            marketSlots: document.querySelectorAll("#market_slots .market__slotWrapper"),
            itemLabel: document.querySelector('#blacksmith_item_label'),
            equipmentSlots: document.querySelectorAll('#equipment_slots div[data-slot-name]'),
            goldAmount: document.querySelector('#blacksmith_gold_amount'),
            goldBar: document.querySelector('#blacksmith_gold_bar'),
            goldSubstract: document.querySelector('#blacksmith_gold_substract'),
            equipmentLabel: {
               root: document.querySelector('#blacksmith_equipment__item_label'),
               sellBtn: document.querySelector('#blacksmith_equipment__item_label .profile__equipmentItemSellWrapper'),
               labelWrapper: document.querySelector('#blacksmith_equipment_label_wrapper')
            }
         }
      this.market = []
   }

   render() {
      this.root.innerHTML = `<section class='blacksmith transparent'>
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

                      <div id='blacksmith_equipment_label_wrapper'> 
                      
                      </div>

                        <div class='profile__equipmentItemSellWrapper'> 
                          <img src='./images/profile_sell_item_icon.png' class='profile__equipmentItemSellIcon'/>
                          <strong class='profile__equipmentItemSellPrice'>50</strong>
                        </div>

                      </div>




                      <div class='profile__level'>  </div>
                      <strong class='profile__nickname'>nickname</strong>
                      <div class='profile__goldBar' id='blacksmith_gold_bar'> 
                         <img class='profile__goldIcon' src='./images/coin.png' alt='coin'/>
                         <strong class='profile__goldAmount' id='blacksmith_gold_amount'>${this.userData.gold}</strong>
                      </div>
                      <div class='profile__goldSubstract disabled' id='blacksmith_gold_substract'></div>
                   </div>
                </div>           
           
            <div class='profile__backpack'>
                <div class='profile__backpackRow'>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                </div>
                <div class='profile__backpackRow'>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
                   <div class='profile__backpackItem'> </div>
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
             

    
        </section>`;
   }







   getShopItems(): ShopItem[] {
      if (this.userData.shop.blacksmith !== null) {
         return this.userData.shop.blacksmith
      }
      else {
         // array with shop items, base on which shop will be created
         let shopItems: ShopItem[] = []

         // pushing random equipment items

         // random helmet
         shopItems.push(getRandomShopItem(helmetsData));
         // random chest plate
         shopItems.push(getRandomShopItem(chestplatesData));
         // random gloves
         shopItems.push(getRandomShopItem(glovesData));
         // random weapon
         shopItems.push(getRandomShopItem(weaponsData));
         // random shield
         shopItems.push(getRandomShopItem(shieldsData));

         // Blacksmith shop has 6 slots, shopItems array has only 5 items, so its need to get one more random item 
         const randomItems: ShopItem[] = [];

         // random helmet
         randomItems.push(getRandomShopItem(helmetsData));
         // random chest plate
         randomItems.push(getRandomShopItem(chestplatesData));
         // random gloves
         randomItems.push(getRandomShopItem(glovesData));
         // random weapon
         randomItems.push(getRandomShopItem(weaponsData));
         // random shield
         randomItems.push(getRandomShopItem(shieldsData));

         // push last item to shopItems array
         shopItems.push(getRandomShopItem(randomItems));

         // shuffle the shopItems array
         shopItems = shopItems.sort(() => Math.random() - .5);

         // set the item stats
         shopItems.forEach(el => {
            el.properties.strength = setItemStats(el.properties.strength, this.userData.rawStats.strength),
               el.properties.defence = setItemStats(el.properties.defence, this.userData.rawStats.defence),
               el.properties.physicalEndurance = setItemStats(el.properties.defence, this.userData.rawStats.defence),
               el.properties.luck = setItemStats(el.properties.luck, this.userData.rawStats.luck)
         });

         // update user data in firestore with this shop items
         this.userData.shop.blacksmith = shopItems;
         updateUserData(this.userData)


         return shopItems;
      }
   }






   setShop() {

      const availablePicks: AvailableMarketPicks[] = this.getAvailbleMarketPicks();

      const shopItems: ShopItem[] = this.getShopItems();

      // set today's market in oroder to access it later, in order to see if you can afford it (in dragEventForMarketSlots method).
      this.market = shopItems


      //////////////// rendering shop ////////////////////////////////

      this.dom.marketSlots.forEach((el, num) => {

         const slot = el as HTMLElement;
         const slotChild = slot.firstElementChild as HTMLElement

         if (availablePicks[num].picks > 0) {
            slotChild.dataset.itemId = shopItems[num].id;
            slotChild.innerHTML = `<img src='${shopItems[num].src}'/>`;
            slotChild.dataset.slotName = shopItems[num].type
         }
         else {
            slotChild.innerHTML = `<img src='./images/market_sold_out.png'/>`;
         }


         // hover actions
         slot.addEventListener('mouseover', () => {

            const currentItem = slot.firstElementChild as HTMLElement
            // find specific item, in order to create label of this item
            const marketItem: ShopItem = allMarketItems[allMarketItems.findIndex(el => el.id === currentItem.dataset.itemId)];

            // find specific slot in equipment which is equal to current shop item type, needed to compare items
            const equipmentSlot: HTMLElement = document.querySelector(`#equipment_slots div[data-slot-name = ${marketItem.type}]`)

            // check if user have enough gold to buy new item and class
            this.dom.itemLabel.classList.add(this.userData.gold >= marketItem.initialCost ? 'afford-yes' : 'afford-no');
            this.dom.goldAmount.classList.add(this.userData.gold >= marketItem.initialCost ? 'profile__goldAmount-afford' : 'profile__goldAmount-noAfford');

            // set the item label
            this.dom.itemLabel.innerHTML = getBlacksmithItemLabel(marketItem, equipmentSlot.firstElementChild as HTMLElement);

            // show slot in equipment by adding pulse animation
            equipmentSlot.firstElementChild.classList.add("profile__equipmentIcon-pulse");

            // show the item label
            this.dom.itemLabel.classList.remove('disabled');

         })

         // removing hover effects
         slot.addEventListener('mouseleave', () => {

            const currentItem = slot.firstElementChild as HTMLElement
            // find specific item, in order to remove pulse animation
            const marketItem: ShopItem = allMarketItems[allMarketItems.findIndex(el => el.id === currentItem.dataset.itemId)];

            // find specific slot in equipment which is equal to current shop item type, needed to remove pulse animation
            const equipmentSlot: HTMLElement = document.querySelector(`#equipment_slots div[data-slot-name = ${marketItem.type}]`)

            // remove pulse effect
            equipmentSlot.firstElementChild.classList.remove("profile__equipmentIcon-pulse");
         })

      });

      // removing effects 
      this.dom.market.addEventListener('mouseleave', () => {
         this.dom.itemLabel.classList.add('disabled')
         this.dom.goldAmount.classList.remove('profile__goldAmount-afford', 'profile__goldAmount-noAfford')
      
      })

   }






   getAvailbleMarketPicks(): AvailableMarketPicks[] {
      if (this.userData.shopPicks.blacksmith !== null) {
         return this.userData.shopPicks.blacksmith;
      }
      else {

         const availablePicks: AvailableMarketPicks[] = []

         this.dom.marketSlots.forEach((el, num) => {
            availablePicks.push({
               picks: 2,
               index: num
            })
         });

         return availablePicks;
      }
   }







   dragEventForMarketSlots() {

      const availablePicks: AvailableMarketPicks[] = this.getAvailbleMarketPicks();

      // currently selected market slot
      let selectedMarketSlot: HTMLElement | null = null;
      // name of slot which is currently dragging
      let draggedSlotName: string | null = null;
      // currently dragged element
      let draggedElement: HTMLElement | null = null
      // currently selected item data
      let selectedItem: ShopItem | null = null;
      // name of slot which is currently hovered
      let hoveredEquipmentSlotName: string | null = null;

      this.dom.marketSlots.forEach(el => el.addEventListener('dragstart', () => {

         const element: HTMLElement = el.firstElementChild as HTMLElement;

         // set currently seleted market slot
         selectedMarketSlot = el as HTMLElement;
         // set currently dragged element
         draggedElement = element;

         // adding class which is responsible to shrink dragging element
         el.classList.add('dragging');

         // set slot name
         draggedSlotName = element.dataset.slotName;

         // find current item, in order to add him to equipment,
         // if user have enough gold and the hovered slot in equipment is the same as the dragging slot
         selectedItem = allMarketItems[allMarketItems.findIndex(el => el.id === element.dataset.itemId)];
      }))


      this.dom.marketSlots.forEach(el => el.addEventListener('dragend', () => {
         // remove item shrink
         el.classList.remove('dragging')

      }))

      this.dom.equipmentSlots.forEach(el => el.addEventListener('mouseover', () => {
         const element: HTMLElement = el as HTMLElement
         const elementImg: HTMLElement = el.firstElementChild as HTMLElement

         // set slot name
         hoveredEquipmentSlotName = element.dataset.slotName

         // check if the dragging item slot name is equal to hovered slot in equipment, if it is then add new item
         if (draggedSlotName === hoveredEquipmentSlotName && selectedItem !== null) {

            // find current market item to check if the user has enough gold bo buy
            const marketItem: ShopItem = allMarketItems[allMarketItems.findIndex(el => el.id === selectedItem.id)];

            // prevent of item dupilcations
            // check if user has enough gold to buy, if he has enough add this item to his equipment, and update his profile on firestore -> update gold and equipment
            if (selectedItem.id !== elementImg.dataset.currentItemId && marketItem.initialCost <= this.userData.gold) {

               // need to inject new item or display sold out icon depending on slot pick amount
               const parent: HTMLElement = draggedElement.parentElement;

               // set this item in user equipment
               element.innerHTML = `<img src='${selectedItem.src}' class="profile__equipmentIcon" data-current-item-id='${selectedItem.id}'>`;

               // update user data -> subtract the price of item from user's gold 
               this.userData.gold -= marketItem.initialCost;
               updateUserData(this.userData);

               // each market slot have only 2 picks in day, when user buy new item, substract one pick
               const slotIndex: number = [...this.dom.marketSlots].indexOf(selectedMarketSlot);
               availablePicks[slotIndex].picks -= 1;
               const picks: number = availablePicks[slotIndex].picks;



               // check if market slot  has available pick, if yes then add new item into this slot and update user equipment in firestore, else show sold out icon
               if (picks > 0) {
                  // find index of old item in order to replace him by new created one, and to update shop
                  const oldItemIndex = this.market.findIndex(el => el.id === selectedItem.id)

                  // set new item in this slot
                  const newMarketItem: ShopItem = allMarketItems[Math.floor(Math.random() * allMarketItems.length)];

                  // set item statistics
                  newMarketItem.properties.strength = setItemStats(newMarketItem.properties.strength, this.userData.rawStats.strength),
                     newMarketItem.properties.defence = setItemStats(newMarketItem.properties.defence, this.userData.rawStats.defence),
                     newMarketItem.properties.physicalEndurance = setItemStats(newMarketItem.properties.defence, this.userData.rawStats.defence),
                     newMarketItem.properties.luck = setItemStats(newMarketItem.properties.luck, this.userData.rawStats.luck)

                  this.market[oldItemIndex] = newMarketItem;


                  // inject new item into market slot
                  parent.innerHTML = `<div class='market__slot' draggable='true' data-item-id='${newMarketItem.id}' data-slot-name='${newMarketItem.type}'>
                  <img src='${newMarketItem.src}'/>
                  </div>`;

                  // substract gold and show animation
                  this.dom.goldSubstract.innerText = `${selectedItem.initialCost}`
                  this.dom.goldSubstract.classList.remove('disabled');

                  // remove above animation after 1.3s
                  setTimeout(() => {
                     this.dom.goldSubstract.classList.add('disabled');
                     this.dom.goldSubstract.innerText = ``;
                  }, 1300);


                  // update user equipment
                  const equipmentItemIndex: number = this.userData.equipmentItems.findIndex(el => el.type === marketItem.type);
                  if (equipmentItemIndex > -1) {
                     this.userData.equipmentItems[equipmentItemIndex] = marketItem;
                     updateUserData(this.userData);
                  }
                  else {
                     this.userData.equipmentItems.push(marketItem);
                     updateUserData(this.userData)
                  }
               }



               else if (picks <= 0) {
                  // inject sold out icon into market slot
                  parent.innerHTML = `<div class='market__slot'>
                     <img src='./images/market_sold_out.png'/>
                     </div>`;
               }

               // save picks into user data in firestore
               this.userData.shopPicks.blacksmith = availablePicks;
               updateUserData(this.userData);
            }


            // user doesn't have enough gold
            else if (selectedItem.id !== elementImg.dataset.currentItemId && marketItem.initialCost > this.userData.gold) {
               // set class responsible for gold bar animation, to notify user that he cant buy this item
               this.dom.goldBar.classList.add('profile__goldBar-noAfford')

               // and remove above animation after 1s
               setTimeout(() => {
                  this.dom.goldBar.classList.remove('profile__goldBar-noAfford')
               }, 1000)

            }
         }

      }))
   }



   labelForEquipmentEvent() {
  
      //  add label
      this.dom.equipmentSlots.forEach(el => el.addEventListener("mouseover", () => {

         
         const element: HTMLElement = el.firstElementChild as HTMLElement;

   
         //find specific item, in order to create label of this item
         const itemData: ShopItem = this.userData.equipmentItems[this.userData.equipmentItems.findIndex(el => el.id === element.dataset.currentItemId)];
         this.dom.equipmentLabel.root.classList.add(itemData.rarity === 'legendary' ? 'profile__itemSpecs-legendary' : 'profile__itemSpecs-common')
         this.dom.equipmentLabel.root.classList.add(`profile__itemSpecs-${itemData.type}`)
         this.dom.equipmentLabel.labelWrapper.innerHTML = getEquipmentLabel(itemData);
         this.dom.equipmentLabel.root.classList.remove('disabled')
      }))

      // remove label
      this.dom.equipmentSlots.forEach(el => el.addEventListener("mouseleave", () => {
         this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
         
      }))
   }

















   setUserEquipment() {
      console.log(this.dom.goldSubstract)
      this.userData.equipmentItems.forEach(el => {
         const equipmentSlot: HTMLElement = document.querySelector(`#equipment_slots div[data-slot-name = '${el.type}']`);
         equipmentSlot.innerHTML = `  <img src='${el.src}' class="profile__equipmentIcon" data-current-item-id='${el.id}'/>`
      })
   }
   setGoldAmount() {
      this.dom.goldAmount.innerText = `${this.userData.gold}`
   }
   onDataChange() {
      this.setGoldAmount();
   }
   getDOMElements() {
      this.dom = {
         market: document.querySelector("#market_slots"),
         marketSlots: document.querySelectorAll("#market_slots .market__slotWrapper"),
         itemLabel: document.querySelector('#blacksmith_item_label'),
         equipmentSlots: document.querySelectorAll('#equipment_slots div[data-slot-name]'),
         goldAmount: document.querySelector('#blacksmith_gold_amount'),
         goldBar: document.querySelector('#blacksmith_gold_bar'),
         goldSubstract: document.querySelector('#blacksmith_gold_substract'),
         equipmentLabel: {
            root: document.querySelector('#blacksmith_equipment__item_label'),
            sellBtn: document.querySelector('#blacksmith_equipment__item_label .profile__equipmentItemSellWrapper'),
            labelWrapper: document.querySelector('#blacksmith_equipment_label_wrapper')
         }
      }
   }
   initScripts() {
      this.setUserEquipment();
      this.setShop();
      this.dragEventForMarketSlots();
      this.labelForEquipmentEvent();
   }
}

// <a href='https://www.freepik.com/vectors/frame'>Frame vector created by upklyak - www.freepik.com</a>

