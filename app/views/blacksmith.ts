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
import { getEquipmentIconSrc } from '../functions/getEquipmentIcon';
import { getBlacksmithHTMLCode } from '../viewsHTMLCode/blacksmith';
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
         sellBtnPrice: HTMLElement
         moveItem: HTMLElement
         moveItemError: HTMLElement
      }
      backpackLabel: {
         root: HTMLElement,
         sellBtn: HTMLElement
         labelWrapper: HTMLElement
         sellBtnPrice: HTMLElement
         moveItem: HTMLElement
         moveItemError: HTMLElement
         replaceIcon: HTMLImageElement
      }
      backpackSlots: NodeListOf<Element>
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
               labelWrapper: document.querySelector('#blacksmith_equipment_label_wrapper'),
               sellBtnPrice: document.querySelector('.profile__equipmentItemSellPrice'),
               moveItem: document.querySelector('#blacksmith_equipment_move_item_btn'),
               moveItemError: document.querySelector('#blacksmith_equipment_move_item_error')
            },
            backpackLabel: {
               root: document.querySelector('#blacksmith_backpack_item_label'),
               sellBtn: document.querySelector('#blacksmith_backpack_item_label .profile__equipmentItemSellWrapper'),
               labelWrapper: document.querySelector('#blacksmith_backpack_label_wrapper'),
               sellBtnPrice: document.querySelector('#blacksmith_backpack_item_label .profile__equipmentItemSellPrice'),
               moveItem: document.querySelector('#blacksmith_backpack_move_item_btn'),
               moveItemError: document.querySelector('#blacksmith_backpack_sell_item_value'),
               replaceIcon: document.querySelector('#blacksmith_backpack_replace_item_icon')
            },
            backpackSlots: document.querySelectorAll('#blacksmith_equipment_slots .profile__backpackItem')
         }
      this.market = []
   }

   render() {
      this.root.innerHTML = getBlacksmithHTMLCode(this.userData);
   }


   labelForBackpackEvent() {

      let currentItem: ShopItem | null = null;
      let equipmentSlot: HTMLElement | null = null;
      let toogleLabel;
      this.dom.backpackSlots.forEach(el => {

         el.addEventListener('mouseover', () => {
            const slot: HTMLElement = el as HTMLElement;
            const element: HTMLElement = el.firstElementChild as HTMLElement;
            clearInterval(toogleLabel)
            this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
            if (element === null) {
               this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled'
            }
            if (element !== null) {

               //find specific item, in order to create label of this item
               currentItem = this.userData.backpackItems[this.userData.backpackItems.findIndex(el => el.id === element.dataset.backpackItemId)];
               // find specific slot in equipment which is equal to current shop item type, needed to compare items
               equipmentSlot = document.querySelector(`#equipment_slots div[data-slot-name = ${currentItem.type}]`)
               // show slot in equipment by adding pulse animation
               equipmentSlot.firstElementChild.classList.add("profile__equipmentIcon-pulse");
               // remove error
               this.dom.backpackLabel.moveItemError.innerText = '';
               this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled'
               this.dom.backpackLabel.root.classList.add(`profile__itemSpecs-backpackSlot${slot.dataset.backpackSlot}`)

               this.dom.backpackLabel.replaceIcon.src = getEquipmentIconSrc(currentItem.type)
               // this.dom.backpackLabel.root.classList.add('')
               this.dom.backpackLabel.root.classList.remove('disabled')

            }

         })

         // remove label with delay -> after 0.8s
         el.addEventListener('mouseleave', () => {
            // hide label
            toogleLabel = setInterval(() => {
               this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled'
            }, 800);
            // remove pulse effect
            equipmentSlot !== null && equipmentSlot.firstElementChild.classList.remove("profile__equipmentIcon-pulse");
         });
      })


      // keep displaying label on focus
      this.dom.backpackLabel.root.addEventListener('mouseover', () => {
         clearInterval(toogleLabel)
         this.dom.backpackLabel.root.classList.remove('disabled')
      });
      // remove leave when focus was losed
      this.dom.backpackLabel.root.addEventListener('mouseleave', () => {
         this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled'
      });
      // replace item in equipment
      this.dom.backpackLabel.moveItem.addEventListener('click', () => {
         equipmentSlot.innerHTML = `<img src='${currentItem.src}' class='profile__equipmentIcon' data-current-item-id='${currentItem.id}'/>`

         const equipmentItemIndex: number = this.userData.equipmentItems.findIndex(el => el.type === currentItem.type)
         const backpackItemIndex: number = this.userData.backpackItems.findIndex(el => el.id === currentItem.id)
         console.log(equipmentItemIndex)
         if (equipmentItemIndex !== -1) {
            // remove item from backpack
            this.userData.backpackItems.splice(backpackItemIndex, 1);
            // add to backpack new equipment item (which is replaced by new) 
            this.userData.backpackItems.push(this.userData.equipmentItems[equipmentItemIndex])
            // add to equipment selected item
            this.userData.equipmentItems[equipmentItemIndex] = currentItem;
            // update user's data in firestore
            updateUserData(this.userData);
            this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled'
         }
         else {
             // remove item from backpack
            this.userData.backpackItems.splice(backpackItemIndex, 1);
            // add new item to equipment
            this.userData.equipmentItems.push(currentItem);
            updateUserData(this.userData);
            this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled'
         }




      })
   }

   labelForEquipmentEvent() {

      let toogleLabel;

      //  add label
      let currentItem: ShopItem | null = null;
      this.dom.equipmentSlots.forEach(el => el.addEventListener('mouseover', () => {

         const element: HTMLElement = el.firstElementChild as HTMLElement;
         // hide backpack label
         this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled';

         // remove error
         this.dom.equipmentLabel.moveItemError.innerText = ''
         //find specific item, in order to create label of this item
         currentItem = this.userData.equipmentItems[this.userData.equipmentItems.findIndex(el => el.id === element.dataset.currentItemId)];
         clearInterval(toogleLabel)

         if (element.dataset.currentItemId === undefined) {
            this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
         }
         if (currentItem !== undefined && element.dataset.currentItemId !== undefined) {

            this.dom.equipmentLabel.root.classList.add(currentItem.rarity === 'legendary' ? 'profile__itemSpecs-legendary' : 'profile__itemSpecs-common')
            this.dom.equipmentLabel.root.classList.add(`profile__itemSpecs-${currentItem.type}`)
            this.dom.equipmentLabel.labelWrapper.innerHTML = getEquipmentLabel(currentItem);
            this.dom.equipmentLabel.sellBtnPrice.innerText = `${(currentItem.initialCost * 0.4).toFixed()}`;
            this.dom.equipmentLabel.root.classList.remove('disabled')
         }
      }))

      // remove label with delay -> after 1s
      this.dom.equipmentSlots.forEach(el => el.addEventListener('mouseleave', () => {

         toogleLabel = setInterval(() => {
            this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
         }, 1000);
      }))

      // keep displaying label when user  focus is on label
      this.dom.equipmentLabel.root.addEventListener('mouseover', () => {
         clearInterval(toogleLabel)
      })

      // else hide label
      this.dom.equipmentLabel.root.addEventListener('mouseleave', () => {
         this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
      })
      //<img src='/images/profile_equipment_shield.png' class="profile__equipmentIcon"/>
      // event on item sell btn
      this.dom.equipmentLabel.sellBtn.addEventListener('click', () => {

         // find the specific  equipment slot which is needed to inject new html code later -> set default icon
         const equipmentSlot: HTMLElement = document.querySelector(`#equipment_slots div[data-slot-name = '${currentItem.type}']`)

         // add gold from item sell to user account
         this.userData.gold += parseInt((currentItem.initialCost * 0.4).toFixed())
         updateUserData(this.userData)

         // remove this item from user equipment
         const itemIndex = this.userData.equipmentItems.findIndex(el => el.id === currentItem.id)
         if (itemIndex > -1) {
            this.userData.equipmentItems.splice(itemIndex, 1);
         }

         //upadte user profile
         updateUserData(this.userData);

         // remove item graphic and set default icon
         equipmentSlot.innerHTML = `<img src='${getEquipmentIconSrc(currentItem.type)}' class="profile__equipmentIcon"/>`

         // remove label
         this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
      })


      // moving item into user's backpack
      this.dom.equipmentLabel.moveItem.addEventListener('click', () => {

         // check if user have free slot in backpack (backpack have 10 slots)
         if (this.userData.backpackItems.length < this.dom.backpackSlots.length) {
            // find the specific  equipment slot which is needed to inject new html code later -> set default icon
            const equipmentSlot: HTMLElement = document.querySelector(`#equipment_slots div[data-slot-name = '${currentItem.type}']`);
            // remove item graphic and set default icon
            equipmentSlot.innerHTML = `<img src='${getEquipmentIconSrc(currentItem.type)}' class="profile__equipmentIcon"/>`

            // remove this item from user equipment
            const itemIndex = this.userData.equipmentItems.findIndex(el => el.id === currentItem.id);
            if (itemIndex > -1) {
               this.userData.equipmentItems.splice(itemIndex, 1);
            }

            // add current item to user's backpack
            this.userData.backpackItems.push(currentItem);
            updateUserData(this.userData);

            // hide label
            this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
         }

         // notify user about no available in backpack
         else {
            this.dom.equipmentLabel.moveItemError.innerText = 'Your backpack is full'
         }
      });
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

   setUserBackpack() {
      console.log(12)
      this.userData.backpackItems.forEach((el, num) => {
         this.dom.backpackSlots[num].innerHTML = `<img src='${el.src}' data-backpack-item-id='${el.id}' data-slot-name='${el.type}'/>`
      })
   }

   setUserEquipment() {
      this.userData.equipmentItems.forEach(el => {
         const equipmentSlot: HTMLElement = document.querySelector(`#equipment_slots div[data-slot-name = '${el.type}']`);
         equipmentSlot.innerHTML = `  <img src='${el.src}' class="profile__equipmentIcon" data-current-item-id='${el.id}' draggable='true'/>`
      })
   }

   setGoldAmount() {
      this.dom.goldAmount.innerText = `${this.userData.gold}`
   }

   onDataChange() {
      this.setGoldAmount();
      this.setUserBackpack();
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
            labelWrapper: document.querySelector('#blacksmith_equipment_label_wrapper'),
            sellBtnPrice: document.querySelector('.profile__equipmentItemSellPrice'),
            moveItem: document.querySelector('#blacksmith_equipment_move_item_btn'),
            moveItemError: document.querySelector('#blacksmith_equipment_move_item_error')
         },
         backpackLabel: {
            root: document.querySelector('#blacksmith_backpack_item_label'),
            sellBtn: document.querySelector('#blacksmith_backpack_item_label .profile__equipmentItemSellWrapper'),
            labelWrapper: document.querySelector('#blacksmith_backpack_label_wrapper'),
            sellBtnPrice: document.querySelector('#blacksmith_backpack_item_label .profile__equipmentItemSellPrice'),
            moveItem: document.querySelector('#blacksmith_backpack_move_item_btn'),
            moveItemError: document.querySelector('#blacksmith_backpack_sell_item_value'),
            replaceIcon: document.querySelector('#blacksmith_backpack_replace_item_icon')
         },
         backpackSlots: document.querySelectorAll('#blacksmith_equipment_slots .profile__backpackItem')
      }
   }

   initScripts() {
      this.setUserBackpack();
      this.setUserEquipment();
      this.setShop();
      this.dragEventForMarketSlots();
      this.labelForEquipmentEvent();
      this.labelForBackpackEvent();
   }
}

// <a href='https://www.freepik.com/vectors/frame'>Frame vector created by upklyak - www.freepik.com</a>

