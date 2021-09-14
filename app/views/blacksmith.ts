import { ShopItem, UserData } from '../types';
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
export class Blacksmith extends View {

   private dom: {
      market: HTMLElement | null,
      marketSlots: NodeListOf<Element> | null,
      itemLabel: HTMLElement | null,
      equipmentSlots: NodeListOf<Element> | null,
      goldAmount: HTMLElement | null,
      goldBar: HTMLElement | null
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
            goldBar: document.querySelector('#blacksmith_gold_bar')
         }
      this.market = []
   }

   render() {
      this.root.innerHTML = `<section class='blacksmith transparent'>
           <div class='blacksmith__item'>
                <div class='profile__equipment' id='equipment_slots'>

                     <div class='profile__equipmentItem profile__equipmentItem-helmet' data-slot-name='helmet'> 
                       <img src='${helmetsData[5].src}' class="profile__equipmentIcon" data-current-item-id='${helmetsData[5].id}'>
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



                   <div class='profile__portrait'> </div>
                   <div class='profile__info'>
                      <div class='profile__level'>  </div>
                      <strong class='profile__nickname'>nickname</strong>
                      <div class='profile__goldBar' id='blacksmith_gold_bar'> 
                         <img class='profile__goldIcon' src='./images/coin.png' alt='coin'/>
                         <strong class='profile__goldAmount' id='blacksmith_gold_amount'>${this.userData.gold}</strong>
                      </div>
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


   setShop() {

      /////////////////// creating shop items array /////////////////////////

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
      shopItems.push(getRandomShopItem(randomItems))

      // shuffle the shopItems array
      shopItems = shopItems.sort(() => Math.random() - .5)

      // set the item stats
      shopItems.forEach(el => {
         el.properties.strength = setItemStats(el.properties.strength, this.userData.rawStats.strength),
            el.properties.defence = setItemStats(el.properties.defence, this.userData.rawStats.defence),
            el.properties.physicalEndurance = setItemStats(el.properties.defence, this.userData.rawStats.defence),
            el.properties.luck = setItemStats(el.properties.luck, this.userData.rawStats.luck)
      })

      // set today's market in oroder to access it later, in order to see if you can afford it (in dragEventForMarketSlots method).
      this.market = shopItems

      //////////////// rendering shop ////////////////////////////////

      console.log(document.querySelectorAll('.market__slotWrapper'))


      this.dom.marketSlots.forEach((el, num) => {

         const slot = el as HTMLElement;
         const slotChild = slot.firstElementChild as HTMLElement

         slotChild.dataset.itemId = shopItems[num].id;
         slotChild.innerHTML = `<img src='${shopItems[num].src}'/>`;
         slotChild.dataset.slotName = shopItems[num].type

         // hover actions
         slot.addEventListener('mouseover', () => {

            const currentItem = slot.firstElementChild as HTMLElement
            // find specific item, in order to create label of this item
            const marketItem: ShopItem = allMarketItems[allMarketItems.findIndex(el => el.id === currentItem.dataset.itemId)];

            console.log(marketItem)

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

            // find specific slot in equipment which is equal to current shop item type, needed to remove pulse animation
            const equipmentSlot: HTMLElement = document.querySelector(`#equipment_slots div[data-slot-name = ${shopItems[num].type}]`)

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

   dragEventForMarketSlots() {

      // name of slot which is currently dragging
      let draggedSlotName: string | null = null;
      // actual dragged element
      let draggedElement: HTMLElement | null = null
      // actual selected item data
      let selectedItem: ShopItem | null = null;
      // name of slot which is currently hovered
      let hoveredEquipmentSlotName: string | null = null;

      this.dom.marketSlots.forEach(el => el.addEventListener('dragstart', () => {
         
         const element: HTMLElement = el.firstElementChild as HTMLElement
         console.log(element)
         // set actual dragged element
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

               // set this item in user equipment
               element.innerHTML = `<img src='${selectedItem.src}' class="profile__equipmentIcon" data-current-item-id='${selectedItem.id}'>`;

               // set new item in this slot
               const newMarketItem: ShopItem = allMarketItems[Math.floor(Math.random() * allMarketItems.length)];
               const parent: HTMLElement = draggedElement.parentElement
               console.log(parent)
               parent.innerHTML = `<div class='market__slot' draggable='true' data-item-id='${newMarketItem.id}' data-slot-name='${newMarketItem.type}'>
                  <img src='${newMarketItem.src}'/>
               </div>`

            }
            // user doesn't have enough gold
            else if (selectedItem.id !== elementImg.dataset.currentItemId && marketItem.initialCost > this.userData.gold) {
               // set class responsible for gold bar animation, to notify user that he cant buy this item
               this.dom.goldBar.classList.add('profile__goldBar-noAfford')

               // and remove above animation after 1s
               this.dom.goldBar.classList.remove('profile__goldBar-noAfford')
            }
         }

      }))
   }



   getDOMElements() {
      this.dom = {
         market: document.querySelector("#market_slots"),
         marketSlots: document.querySelectorAll("#market_slots .market__slotWrapper"),
         itemLabel: document.querySelector('#blacksmith_item_label'),
         equipmentSlots: document.querySelectorAll('#equipment_slots div[data-slot-name]'),
         goldAmount: document.querySelector('#blacksmith_gold_amount'),
         goldBar: document.querySelector('#blacksmith_gold_bar')
      }
   }



   initScripts() {
      this.setShop();
      this.dragEventForMarketSlots();
   }
}

// <a href='https://www.freepik.com/vectors/frame'>Frame vector created by upklyak - www.freepik.com</a>

