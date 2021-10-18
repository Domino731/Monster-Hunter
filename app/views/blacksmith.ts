import { AvailableMarketPicks, ShopItem } from '../types';
import { Component } from './view';
import { updateUserData } from '../firebase/operations';
import { getEquipmentIconSrc } from '../functions/getEquipmentIcon';
import { getBlacksmithHTMLCode, blacksmithMobileNavCode } from '../HTMLCode/blacksmith';
import { getBlacksmithItems } from '../functions/getBlacksmithItems';
import { getNeededExp } from '../functions/getNeededExp';
import { setCountdown } from '../functions/countdown';
import { getBlacksmithItemLabel } from '../functions/getBlacksmithItemLabel';
import { getBlacksmithEquipmentLabel } from '../functions/equipmentLabel';
import { getBlacksmithBackpackLabel } from '../functions/backpackLabel';

// Class responsible for blacksmith section by which user can purchase new items to his equipment or backpack
export class Blacksmith extends Component {
   private dom: {
      // when user hovers over or clicks on an item then a class is added that shows if the user has enough gold to buy the new item and
      //  when the blacksmith market section loses its fucus then this class is removed  - dragEventForMarketSlots() method
      market: HTMLElement | null;
      // blacksmith market slots with items which are available to buy, needed to apply functions that are responsible for purchasing new items - dragEventForMarketSlots() buyItemByLabel() and methods
      marketSlots: NodeListOf<Element> | null;
      // root of blacksmith item label, needed to inject html code of selected market item
      itemLabel: HTMLElement | null;
      // amount of user's gold, needed to add green text shadow styles when user has enough gold to buy new item, or red text shadow if he doesnt has
      goldAmount: HTMLElement | null;
      // bar with gold, needed to add red box shadow when user doesnt have enough gold to purchase new item
      goldBar: HTMLElement | null;
      // container with animation which displays an animation of how much gold was deducted from the user's account after purchasing an item
      goldSubstract: HTMLElement | null;
      // needed to set items in backpack - setUserBackpack() methodd
      backpackSlots: NodeListOf<Element> | null;
      // backpack container, needed to apply at him function which is responsible for buying item via grag & drop - dragEventForMarketSlots() method
      backpack: HTMLElement | null;
      // equipment slots, needed to apply at  them functions which are responsible for buying item via grag & drop - dragEventForMarketSlots() method
      equipmentSlots: NodeListOf<Element> | null;
      // needed to apply event at body in order to prevent multiple purchases of the same item - dragEventForMarketSlots() method
      body: HTMLElement | null;
      // Error which is displaying when user want to buy an item from a blacksmith market but there is no free space in his backpack
      error: HTMLElement | null;
      // needed to display time which is left to new blacksmith items - setNewShopCountdown() method
      countdown: HTMLElement | null;
      // root for equipment label, needed to inject html code on mouse hover on equipment slot - equipmentLabel() method
      equipmentLabelRoot: HTMLElement | null;
      // root for backpack label, needed to inject html code on mouse hover on equipment slot - backpackLabel() method
      backpackLabelRoot: HTMLElement | null;
      // needed to change level when data has changes - generalOnDataChange() method
      level: HTMLElement | null;
      // needed to change portrait when data has changed - generalOnDataChange() method
      portraitImg: HTMLImageElement | null;
      // containers needed to toogle content in section - backpack or profile only below (1024px) - toogleView() method
      profileContainer: HTMLElement | null;
      blacksmithContainer: HTMLElement | null;
      // buttons for switching between the backpack and the profile only below (1024px) - toogleView() method
      mobileNavFristSwitch: HTMLElement | null;
      mobileNavSecondSwitch: HTMLElement | null;
   }
   // array with blacksmith items that are available to buy
   private market: ShopItem[]
   // selected blacksmith item, when user clicks one of slot in market then this value is change, and when he presses the button on label, which is responsible for purchasing new item then new item with this data
   // will be added to user's backpack or equipment - buyItemByLabel() method
   private selectedMarketItem: ShopItem | null;
   // intarval which helps to set delay on blacksmith item label display
   private showBlacksmithLabel: ReturnType<typeof setInterval> | null;
   // when user hovers over an item in inventory, backpack0 or potion then a label is shown which describes this item,
   //  if  this label loses his focus then it does not disappear immediately but with a delay (0.8s). however
   //  when user hovers over a item in a backpack and quickly hovers over another one then clear this 
   //  interval which will help prevent duplicate labels and disappearance
   private hideLabelInterval: {
      potion: ReturnType<typeof setInterval> | null;
      equipment: ReturnType<typeof setInterval> | null;
      backpack: ReturnType<typeof setInterval> | null;
   }

   constructor() {
      super(),
         this.freepikAttribute = `<a href='https://www.freepik.com/vectors/frame'>Frame vector created by upklyak - www.freepik.com</a>`;
      this.bodyBackgroundSrc = '/images/pets_background.jpg';
      this.dom = {
         portraitImg: document.querySelector('.profile__portraitImg'),
         level: document.querySelector('.profile__level'),
         market: document.querySelector("#market_slots"),
         marketSlots: document.querySelectorAll("#market_slots .market__slotWrapper"),
         itemLabel: document.querySelector('#blacksmith_item_label'),
         equipmentSlots: document.querySelectorAll('#blacksmith_equipment_slots div[data-slot-name]'),
         goldAmount: document.querySelector('#blacksmith_gold_amount'),
         goldBar: document.querySelector('#blacksmith_gold_bar'),
         goldSubstract: document.querySelector('#blacksmith_gold_substract'),
         backpack: document.querySelector('#blacksmith_backpack_slots'),
         body: document.querySelector(`body`),
         error: document.querySelector('#blacksmith__error'),
         countdown: document.querySelector('#blacksmith_countdown_time'),
         backpackSlots: document.querySelectorAll('#blacksmith_backpack_slots .profile__backpackItem'),
         backpackLabelRoot: document.querySelector('#blacksmith_backpack_item_label'),
         equipmentLabelRoot: document.querySelector('#blacksmith_equipment__item_label'),
         blacksmithContainer: document.querySelector('.blacksmith__item:last-child'),
         profileContainer: document.querySelector('.blacksmith__item:first-child'),
         mobileNavFristSwitch: document.querySelector('.mobileNav__item:first-child'),
         mobileNavSecondSwitch: document.querySelector('.mobileNav__item:last-child'),
      }
      this.market = [];
      this.selectedMarketItem = null;
      this.showBlacksmithLabel = null;
      this.hideLabelInterval = {
         potion: null,
         equipment: null,
         backpack: null
      }
   }


   // set items which are availble to buy 
   setShop() {

      // set today's market in order to access to his data later -> when a user wants to buy a new item
      this.market = this.userData.shop.blacksmith;

      // rendering shop 
      this.dom.marketSlots.forEach((el, num) => {

         const slot = el as HTMLElement;
         const slotChild = slot.firstElementChild as HTMLElement

         // check if slot has available item
         const availablePicks: AvailableMarketPicks[] = this.getAvailbleMarketPicks();
         if (availablePicks[num].picks > 0) {
            slotChild.dataset.itemId = this.market[num].id;
            slotChild.innerHTML = `<img src='${this.market[num].src}'/>`;
            slotChild.dataset.slotName = this.market[num].type;
         }
         else {
            slotChild.removeAttribute('data-slot-name');
            slotChild.removeAttribute('data-item-id');
            slotChild.innerHTML = `<img src='./images/market_sold_out.png'/>`;
         }


         // when user hovers on specific slot then show label about particular item with capability to buy this item 
         slot.addEventListener('mouseover', () => {

            const slotElement = slot.firstElementChild as HTMLElement;

            // find specific item, in order to create label of this item
            const marketItem: ShopItem = this.market[this.market.findIndex(el => el.id === slotElement.dataset.itemId)];

            if (marketItem !== undefined) {

               // prevention of multiple label hiding 
               clearTimeout(this.showBlacksmithLabel);

               // show label with delay -> 1s
               this.showBlacksmithLabel = setTimeout(() => {

                  // find specific slot in equipment which is equal to current shop item type, needed to compare items
                  const equipmentSlot: HTMLElement = document.querySelector(`#blacksmith_equipment_slots div[data-slot-name = ${marketItem.type}] img`);
                  const currentItem: ShopItem = this.userData.equipmentItems[this.userData.equipmentItems.findIndex(el => el.id === equipmentSlot.dataset.currentItemId)];

                  // check if user has enough gold to buy new item and appropriate styles
                  this.dom.itemLabel.classList.remove('afford-yes', 'afford-no');
                  this.dom.goldAmount.classList.remove('profile__goldAmount-afford', 'profile__goldAmount-noAfford');
                  this.dom.itemLabel.classList.add(this.userData.gold >= marketItem.initialCost ? 'afford-yes' : 'afford-no');
                  this.dom.goldAmount.classList.add(this.userData.gold >= marketItem.initialCost ? 'profile__goldAmount-afford' : 'profile__goldAmount-noAfford');

                  // show slot in equipment by adding pulse animation
                  equipmentSlot.classList.add("profile__equipmentIcon-pulse");

                  // show the item label
                  this.dom.itemLabel.innerHTML = getBlacksmithItemLabel(marketItem, currentItem);
                  this.dom.itemLabel.classList.remove('disabled');

                  // add click event on label button by which user can buy this item
                  const buyBtn = this.dom.itemLabel.querySelector('.market__itemPriceWrapper');
                  buyBtn.addEventListener('click', () => this.buyItem(marketItem, slot));

               }, 1000);

            }


         })

         // removing hover effects
         slot.addEventListener('mouseleave', () => {
            const equipmentSlots = document.querySelectorAll(`#blacksmith_equipment_slots div[data-slot-name]`)
            equipmentSlots.forEach(el => {
               el.firstElementChild.classList.remove("profile__equipmentIcon-pulse")
            })
         })

      });

      // removing effects 
      this.dom.market.addEventListener('mouseleave', () => {
         this.dom.itemLabel.classList.add('disabled')
         this.dom.goldAmount.classList.remove('profile__goldAmount-afford', 'profile__goldAmount-noAfford')
         clearInterval(this.showBlacksmithLabel)
      });

   }

   // get available pick per slot in market, each slot has only 2 picks - user can buy items. 
   // Picks are reset in new day - dataOperations() method in Component class
   getAvailbleMarketPicks(): AvailableMarketPicks[] {
      const availablePicks: AvailableMarketPicks[] = []
      this.dom.marketSlots.forEach((el, num) => {
         availablePicks.push({
            picks: 2,
            index: num
         })
      });

      return availablePicks;
   }

   dragEventForMarketSlots() {

      // available market picks needed to check if particular slot in market has available item to buy
      const availablePicks: AvailableMarketPicks[] = this.getAvailbleMarketPicks();

      // currently selected market slot
      let selectedMarketSlot: HTMLElement | null = null;

      // name of slot which is currently dragging
      let draggedSlotName: string | null = null;

      // currently dragged element
      let draggedElement: HTMLElement | null = null;

      // currently selected item data
      let selectedItem: ShopItem | null = null;

      // name of slot which is currently hovered
      let hoveredEquipmentSlotName: string | null = null;

      const marketSlots: NodeListOf<Element> = document.querySelectorAll("#market_slots .market__slotWrapper");
      const equipmentSlots: NodeListOf<Element> = document.querySelectorAll('#blacksmith_equipment_slots div[data-slot-name]');
      const backpack: HTMLElement = document.querySelector('#blacksmith_backpack_slots');
      // when user starts dragging new element from blacksmith market then create appropriate data
      marketSlots.forEach(el => el.addEventListener('dragstart', (e) => {

         const element: HTMLElement = el.firstElementChild as HTMLElement;

         // set currently seleted market slot
         selectedMarketSlot = el as HTMLElement;

         // set currently dragged element
         draggedElement = element;

         // adding class which is responsible to shrink dragging element
         el.classList.add('dragging');

         // set slot name
         draggedSlotName = element.dataset.slotName;

         // find data about selected item
         selectedItem = this.market[this.market.findIndex(el => el.id === element.dataset.itemId)];

      }));

      equipmentSlots.forEach(el => el.addEventListener('dragover', (e) => {
         e.preventDefault();
      }));

      // remove shrink effect from dragged element
      marketSlots.forEach(el => el.addEventListener('dragend', (e) => {
         e.preventDefault();
         el.classList.remove('dragging');
      }));

      // buying a new item by dragging him to a specific slot in equipment
      equipmentSlots.forEach(el => el.addEventListener('mouseover', () => {
         const element: HTMLElement = el as HTMLElement
         const elementImg: HTMLElement = el.firstElementChild as HTMLElement

         // set slot name
         hoveredEquipmentSlotName = element.dataset.slotName

         // check if the dragging item slot name is equal to hovered slot in equipment, if it is then trigger logic behind buying new item
         if (draggedSlotName === hoveredEquipmentSlotName && selectedItem !== null && selectedItem !== undefined) {

            // find current market item to check if the user has enough gold bo buy
            const marketItem: ShopItem = this.market[this.market.findIndex(el => el.id === selectedItem.id)];

            // prevent of item dupilcations
            // check if user has enough gold to buy, if he has enough then add this item to his equipment
            if (selectedItem.id !== elementImg.dataset.currentItemId && marketItem.initialCost <= this.userData.gold) {

               // each market slot has only 2 picks in day, when user buy new item, substract one pick
               const slotIndex: number = [...this.dom.marketSlots].indexOf(selectedMarketSlot);
               const picks: number = availablePicks[slotIndex].picks;

               // check if market slot  has available pick, if yes then add new item into this slot and update user equipment in firestore, else show sold out icon inside this slot
               if (picks > 0) {

                  // check if user has free slot in backpack (backpack has 10 slots)
                  if (this.userData.backpackItems.length < 10) {

                     // substract one pick
                     availablePicks[slotIndex].picks -= 1;

                     // find current item in equipment in order to add him into backpack
                     const currentEquipmentItem: ShopItem | undefined = this.userData.equipmentItems[this.userData.equipmentItems.findIndex(el => el.id === elementImg.dataset.currentItemId)];
                     currentEquipmentItem !== undefined && this.userData.backpackItems.push(currentEquipmentItem);


                     // find index of old item in order to replace him by new created one
                     const oldItemIndex = this.market.findIndex(el => el.id === selectedItem.id)

                     // set new item in this slot
                     const randomItems: ShopItem[] = getBlacksmithItems(this.userData.rawStats, this.userData.guardPayout);
                     const newMarketItem = randomItems[Math.floor(Math.random() * randomItems.length)]
                     this.market[oldItemIndex] = newMarketItem;

                     // substract gold and show animation
                     this.userData.gold -= selectedItem.initialCost;
                     this.dom.goldSubstract.innerText = `${selectedItem.initialCost}`;
                     this.dom.goldSubstract.classList.remove('disabled');
                  
                     // remove above animation after 1.3s
                     setTimeout(() => {
                        this.dom.goldSubstract.classList.add('disabled');
                        this.dom.goldSubstract.innerText = ``;
                     }, 1300);

                     // update user equipment
                     const equipmentItemIndex: number = this.userData.equipmentItems.findIndex(el => el.type === marketItem.type);

                     // hide label 
                     this.dom.itemLabel.innerHTML = '';
                     this.dom.itemLabel.classList.add('disabled');

                     // add new item to the equipment
                     if (equipmentItemIndex > -1) {
                        this.userData.backpackItems.push(this.userData.equipmentItems[equipmentItemIndex]);
                        this.userData.equipmentItems[equipmentItemIndex] = marketItem;
                     }
                     else {
                        this.userData.equipmentItems.push(marketItem);
                     }

                     // hide blacksmith container and show profile so the user knows he has bought a new item
                     if (window.innerWidth < 1024) {
                        this.dom.blacksmithContainer.classList.add('disabled');
                        this.dom.profileContainer.classList.remove('disabled');
                     }

                     // set new blacksmith market picks and save new data -> onDataChange() method will rerender component 
                     this.userData.shopPicks.blacksmith = availablePicks;
                     updateUserData(this.userData);

                  }

                  // if the backpack doesnt has free slot then show error 
                  else {
                     this.dom.error.innerText = 'Your backpack is full';
                     this.dom.error.classList.remove('disabled');

                     // remove error after 3.5s
                     setTimeout(() => {
                        this.dom.error.innerText = '';
                        this.dom.error.classList.add('disabled');
                     }, 3500);
                  }
               }


            }


            // user doesn't have enough gold to purchase item
            else if (selectedItem.id !== elementImg.dataset.currentItemId && marketItem.initialCost > this.userData.gold) {
               // set class responsible for gold bar animation, to notify user that he cant buy this item
               this.dom.goldBar.classList.add('profile__goldBar-noAfford')

               // and remove above animation after 1s
               setTimeout(() => {
                  this.dom.goldBar.classList.remove('profile__goldBar-noAfford')
               }, 1000)

            }


         }

      }));

      // buying a new item by gragging him to a backpack
      backpack.addEventListener('mouseover', () => {

         if (selectedItem !== null) {

            // check if user has free slot in backpack (backpack has 10 slots)
            if (this.userData.backpackItems.length < 10) {

               // each market slot has only 2 picks in day, when user buy new item, substract one pick
               const slotIndex: number = [...this.dom.marketSlots].indexOf(selectedMarketSlot);
               const picks: number = availablePicks[slotIndex].picks;

               // check if market slot  has available pick if yes then add new item into this slot and update user equipment in firestore, else show sold out icon. Also check if user has enough gold
               if (this.userData.gold >= selectedItem.initialCost && picks > 0) {

                  // update user data -> subtract the price of item from user's gold 
                  this.userData.gold -= selectedItem.initialCost;

                  // find index of old item in order to replace him by new created one
                  const oldItemIndex = this.market.findIndex(el => el.id === selectedItem.id);

                  // set new item in this slot
                  const randomItems: ShopItem[] = getBlacksmithItems(this.userData.rawStats, this.userData.guardPayout);
                  const newMarketItem = randomItems[Math.floor(Math.random() * randomItems.length)]
                  this.market[oldItemIndex] = newMarketItem;


                  // substract gold and show animation
                  this.dom.goldSubstract.innerText = `${selectedItem.initialCost}`
                  this.dom.goldSubstract.classList.remove('disabled');

                  // remove above animation after 1.3s
                  setTimeout(() => {
                     this.dom.goldSubstract.classList.add('disabled');
                     this.dom.goldSubstract.innerText = ``;
                  }, 1300);


                  // add new item
                  this.userData.backpackItems.push(selectedItem);

                  // substract one pick
                  availablePicks[slotIndex].picks -= 1;
                  this.userData.shopPicks.blacksmith = availablePicks;

                  // hide label 
                  this.dom.itemLabel.innerHTML = '';
                  this.dom.itemLabel.classList.add('disabled');

                  // hide blacksmith container and show profile so the user knows he has bought a new item
                  if (window.innerWidth < 1024) {
                     this.dom.blacksmithContainer.classList.add('disabled');
                     this.dom.profileContainer.classList.remove('disabled');
                  }

                  // update user's data - onDataChange() method will rerender component
                  updateUserData(this.userData);
               }

            }
            // if the backpack doesnt have free slot show error 
            else {
               this.dom.error.innerText = 'Your backpack is full';
               this.dom.error.classList.remove('disabled');

               // remove error after 3.5s
               setTimeout(() => {
                  this.dom.error.innerText = '';
                  this.dom.error.classList.add('disabled');
               }, 3500);
            }
         }

      });

      // prevention of multiple purchases of the same item 
      this.dom.body.addEventListener('mouseover', () => {
         selectedMarketSlot = null;
         draggedSlotName = null;
         draggedElement = null
         selectedItem = null;
         hoveredEquipmentSlotName = null;
      });
   }

   /**
    * buy specifc item and add him into equipment or backpack (if equipment slot is occupied)
    * @param selectedItem - data about item that you want to buy
    * @param selectedMarketSlot - need to subtract pick amount from particalr slot (each slot has only 2 per day)
    */
   buyItem(selectedItem: ShopItem, selectedMarketSlot: HTMLElement) {

      // each market slot has only 2 picks in day, when user buy new item, substract one pick
      const availablePicks: AvailableMarketPicks[] = this.getAvailbleMarketPicks();
      const slotIndex: number = [...this.dom.marketSlots].indexOf(selectedMarketSlot);
      availablePicks[slotIndex].picks;

      // general operations when user has purchased  new item
      const general = () => {

         // check if slot has available pick, if he has then add new blacksmith item. 
         // If slot doesnt have available, then the graphic which informs about the empty slot will be displayed - setShop() method
         if (availablePicks[slotIndex].picks > 0) {

            // find index of old item in order to replace him by new created one, and to update shop
            const oldItemIndex = this.market.findIndex(el => el.id === selectedItem.id)

            // set new item in this slot
            const randomItems: ShopItem[] = getBlacksmithItems(this.userData.rawStats, this.userData.guardPayout);
            const newMarketItem = randomItems[Math.floor(Math.random() * randomItems.length)]
            this.market[oldItemIndex] = newMarketItem;

         }

         // substract one pick from this slot
         availablePicks[slotIndex].picks -= 1;

         // hide label 
         this.dom.itemLabel.innerHTML = '';
         this.dom.itemLabel.classList.add('disabled');

         // substract gold and show animation
         this.dom.goldSubstract.innerText = `${selectedItem.initialCost}`
         this.dom.goldSubstract.classList.remove('disabled');

         // remove above animation after 1.3s
         setTimeout(() => {
            this.dom.goldSubstract.classList.add('disabled');
            this.dom.goldSubstract.innerText = ``;
         }, 1300);

         // hide blacksmith container and show profile so the user knows he has bought a new item
         if (window.innerWidth < 1024) {
            this.dom.blacksmithContainer.classList.add('disabled');
            this.dom.profileContainer.classList.remove('disabled');
         }

      };

      const equipmentSlot: ShopItem | undefined = this.userData.equipmentItems[this.userData.equipmentItems.findIndex(el => el.type === selectedItem.type)];
      // check if equipment slot is empty
      if (equipmentSlot === undefined) {
         if (this.userData.gold >= selectedItem.initialCost && availablePicks[slotIndex].picks > 0) {
            this.userData.equipmentItems.push(selectedItem);
            this.userData.gold -= selectedItem.initialCost;

            // substract gold and show animation
            this.dom.goldSubstract.innerText = `${selectedItem.initialCost}`
            this.dom.goldSubstract.classList.remove('disabled');

            // remove above animation after 1.3s
            setTimeout(() => {
               this.dom.goldSubstract.classList.add('disabled');
               this.dom.goldSubstract.innerText = ``;
            }, 1300);
            general();
            updateUserData(this.userData);
         }
      }
      else if (this.userData.backpackItems.length <= 10) {
         if (availablePicks[slotIndex].picks > 0 && this.userData.gold >= selectedItem.initialCost) {
            this.userData.backpackItems.push(selectedItem);
            this.userData.gold -= selectedItem.initialCost;

            // substract gold and show animation
            this.dom.goldSubstract.innerText = `${selectedItem.initialCost}`
            this.dom.goldSubstract.classList.remove('disabled');

            // remove above animation after 1.3s
            setTimeout(() => {
               this.dom.goldSubstract.classList.add('disabled');
               this.dom.goldSubstract.innerText = ``;
            }, 1300);
            general();
            updateUserData(this.userData);
         }


      }


      else {
         this.dom.error.innerText = 'Your backpack is full';
         this.dom.error.classList.remove('disabled');

         // remove error after 3.5s
         setTimeout(() => {
            this.dom.error.innerText = '';
            this.dom.error.classList.add('disabled');
         }, 3500);
      }

   }

   // add click event on each market in order to create capability to buy new blacksmith item via button which is placed in label
   buyItemByLabel() {
      this.dom.marketSlots.forEach(el => el.addEventListener('click', () => {

         // prevention of multiple label hiding 
         clearInterval(this.showBlacksmithLabel);

         // find data about particular item, when a user buys a new item, he will buy with this data
         const element: HTMLElement = el.firstElementChild as HTMLElement;
         this.selectedMarketItem = this.market[this.market.findIndex(el => el.id === element.dataset.itemId)];

         // set currently seleted market slot
         const selectedMarketSlot: HTMLElement | undefined = el as HTMLElement;

         if (this.selectedMarketItem !== undefined && selectedMarketSlot !== undefined) {

            // find specific slot in equipment which is equal to current shop item type, needed to compare items
            const equipmentSlot: HTMLElement = document.querySelector(`#blacksmith_equipment_slots div[data-slot-name = ${this.selectedMarketItem.type}] img`);
            const currentItem: ShopItem = this.userData.equipmentItems[this.userData.equipmentItems.findIndex(el => el.id === equipmentSlot.dataset.currentItemId)];

            // check if user has enough gold to buy new item and add appropriate styles
            this.dom.itemLabel.classList.remove('afford-yes', 'afford-no');
            this.dom.goldAmount.classList.remove('profile__goldAmount-afford', 'profile__goldAmount-noAfford');
            this.dom.itemLabel.classList.add(this.userData.gold >= this.selectedMarketItem.initialCost ? 'afford-yes' : 'afford-no');
            this.dom.goldAmount.classList.add(this.userData.gold >= this.selectedMarketItem.initialCost ? 'profile__goldAmount-afford' : 'profile__goldAmount-noAfford');

            // set the item label
            this.dom.itemLabel.innerHTML = getBlacksmithItemLabel(this.selectedMarketItem, currentItem);

            // show slot in equipment by adding pulse animation
            equipmentSlot.classList.add("profile__equipmentIcon-pulse");

            // show the item label
            this.dom.itemLabel.classList.remove('disabled');

            // add click event on button with function responsible for buying new item
            const buyBtn = this.dom.itemLabel.querySelector('.market__itemPriceWrapper');
            buyBtn.addEventListener('click', () => this.buyItem(this.selectedMarketItem, selectedMarketSlot));

         }
      }));
   }

   /////////////////////////////////// backpack ///////////////////////////////////////////

   /**
    * sell specific item from backpack
    * @param item - item that you want to sell
    */
   sellBackpackItem(item: ShopItem) {

      // add gold to user's account
      this.userData.gold += Math.ceil(item.initialCost * 0.4)

      //remove this item from user backpack
      const itemIndex: number = this.userData.backpackItems.findIndex(el => el.id === item.id);
      this.userData.backpackItems.splice(itemIndex, 1);

      // update user data -> backpack will be rerendered by onDataChange() method
      updateUserData(this.userData);

      // remove label
      this.dom.backpackLabelRoot.innerHTML = '';
      this.dom.backpackLabelRoot.className = 'profile__itemSpecs disabled';

   }

   /**
      * moving item from backpack to equipment
      * @param currentItem - current item in backpack, needed to find what item will be replaced
      */
   moveItemToEquipment(currentItem: ShopItem) {

      // indexes of items that are needed for moving items
      const equipmentItemIndex: number = this.userData.equipmentItems.findIndex(el => el.type === currentItem.type);
      const backpackItemIndex: number = this.userData.backpackItems.findIndex(el => el.id === currentItem.id);

      // check if equipment slot in empy 
      if (equipmentItemIndex !== -1) {

         // remove item from backpack
         this.userData.backpackItems.splice(backpackItemIndex, 1);

         // add to backpack new equipment item (which is replaced by new) 
         this.userData.backpackItems.push(this.userData.equipmentItems[equipmentItemIndex]);

         // add to equipment selected item
         this.userData.equipmentItems[equipmentItemIndex] = currentItem;

         // hide backpack label
         this.dom.backpackLabelRoot.classList.add('disabled');

         // update user data -> backpack will be rerendered by onDataChange() method
         updateUserData(this.userData);

      }
      else {

         // remove item from backpack
         this.userData.backpackItems.splice(backpackItemIndex, 1);

         // add new item to equipment
         this.userData.equipmentItems.push(currentItem);

         // hide backpack label
         this.dom.backpackLabelRoot.classList.add('disabled');

         // update user's data in firestore -> onDataChange() method will rerender equipment
         updateUserData(this.userData);

      }
   }

   /**
     * add backpack label for the specific item, with ability to move this item to equipment
     * @param item - item data basis of which the new item label will be created
     * @param number - slot number in the backpack to add the appropriate class for the label to be displayed
     */
   backpackLabel(item: ShopItem, number: number) {

      // remove pulse from previous equipment slot
      this.dom.equipmentSlots.forEach(el => el.firstElementChild.classList.remove('profile__equipmentIcon-pulse'));

      // remove equipment label
      this.dom.equipmentLabelRoot.innerHTML = '';
      this.dom.equipmentLabelRoot.classList.add('disabled');

      // prevent of label hide
      clearInterval(this.hideLabelInterval.backpack);

      // find specific slot in equipment which is equal to current shop item type, needed to compare items
      const equipmentSlot = document.querySelector(`#blacksmith_equipment_slots div[data-slot-name = ${item.type}]`);

      // show slot in equipment by adding pulse animation
      equipmentSlot.firstElementChild.classList.add("profile__equipmentIcon-pulse");

      // create new label
      this.dom.backpackLabelRoot.innerHTML = '';
      const currentItemInEq: ShopItem | undefined = this.userData.equipmentItems[this.userData.equipmentItems.findIndex(e => e.type === item.type)];
      const newLabel: HTMLElement = document.createElement('div');
      newLabel.innerHTML = getBlacksmithBackpackLabel(item, currentItemInEq);

      // set styles
      this.dom.backpackLabelRoot.className = 'profile__itemSpecs disabled';
      this.dom.backpackLabelRoot.classList.add(`profile__itemSpecs-backpackSlot${number + 1}`);
      this.dom.backpackLabelRoot.classList.remove('disabled');

      // set item price that user can sell the item for
      const itemPrice: HTMLElement = newLabel.querySelector('#blacksmith_backpack_sell_item_price');
      itemPrice.innerText = `${Math.ceil((item.initialCost * 0.4))}`;

      // add click event which is responsible for selling backpack item
      const sellBtn: HTMLElement = newLabel.querySelector('#blacksmith_backpack_sell_item_btn');
      sellBtn.addEventListener('click', () => this.sellBackpackItem(item));

      // set icon which is displaying item type
      const replaceIcon: HTMLImageElement = newLabel.querySelector('#blacksmith_backpack_replace_item_icon');
      replaceIcon.src = getEquipmentIconSrc(item.type);

      // add click event which is responsible for moving item from backpack to equipment    
      const replaceBtn: HTMLElement = newLabel.querySelector('#blacksmith_backpack_move_item_btn');
      replaceBtn.addEventListener('click', () => this.moveItemToEquipment(item));

      // when the label has his focus keep displaying pulse effect on specifc equipment slot and clear interval which is reponsible for hidding this label
      newLabel.addEventListener('mouseover', () => {
         equipmentSlot.firstElementChild.classList.add("profile__equipmentIcon-pulse");
         return clearInterval(this.hideLabelInterval.backpack);
      });

      // when label loses his focus then hide this label and remove pulse effect from specific equipment slot
      newLabel.addEventListener('mouseleave', () => {
         this.dom.backpackLabelRoot.innerHTML = '';
         equipmentSlot.firstElementChild.classList.remove("profile__equipmentIcon-pulse");
      });

      // show this label
      this.dom.backpackLabelRoot.classList.remove('disabled');
      this.dom.backpackLabelRoot.appendChild(newLabel);
   }

   // set user backpack where each item can be sold (sellBackpackItem() method) or moved (moveItemToEquipment() method) to the inventory
   setUserBackpack() {

      // clear previous backpack 
      this.dom.backpackSlots.forEach(el => {
         el.innerHTML = '';
      });

      // add graphic and event reponsible for item label
      this.userData.backpackItems.forEach((el, num) => {

         // set graphic
         this.dom.backpackSlots[num].innerHTML = `<img src='${el.src}'/>`

         // add hover event by which user can display item label
         this.dom.backpackSlots[num].addEventListener('mouseover', () => this.backpackLabel(el, num));

         // remove label with delay -> after 0.8s
         this.dom.backpackSlots[num].addEventListener('mouseleave', () => {

            // hide label when backpack slot loses his focus with delay -> after 0.8s
            this.hideLabelInterval.backpack = setTimeout(() => {
               this.dom.backpackLabelRoot.innerHTML = '';
               this.dom.backpackLabelRoot.classList.add('disabled');
            }, 800);

            // remove pulse effect from an equipment slot
            this.dom.equipmentSlots.forEach(el => el.firstElementChild.classList.remove('profile__equipmentIcon-pulse'));

         });
      });

   }

   /////////////////////////////////// equipment ///////////////////////////////////////////



   /**
     * sell specific item from equipment
     * @param item - item that you want to sell
     */
   sellEquipmentItem(item: ShopItem) {

      // add gold to user's account
      this.userData.gold += Math.ceil(item.initialCost * 0.4)

      //remove this item from user backpack
      const itemIndex: number = this.userData.equipmentItems.findIndex(el => el.id === item.id);
      this.userData.equipmentItems.splice(itemIndex, 1);

      // update user data -> backpack  and equipment will be rerendered by onDataChange() method
      updateUserData(this.userData);

      // remove label
      this.dom.equipmentLabelRoot.innerHTML = '';
      this.dom.equipmentLabelRoot.className = 'profile__itemSpecs disabled';

   }

   /**
 * add equipment label for specific item
 * @param item - item data basis of which the new item label will be created
 */
   equipmentLabel(item: ShopItem) {

      // hide backpack label
      this.dom.backpackLabelRoot.innerHTML = '';
      this.dom.backpackLabelRoot.classList.add('disabled');

      // prevent of label hiding 
      clearInterval(this.hideLabelInterval.equipment);

      // hide backpack label
      this.dom.backpackLabelRoot.classList.add('disabled');

      // reset equipement label styles
      this.dom.equipmentLabelRoot.className = 'profile__itemSpecs disabled';

      // add appropriate styles
      this.dom.equipmentLabelRoot.classList.add(item.rarity === 'legendary' ? 'profile__itemSpecs-legendary' : 'profile__itemSpecs-common');
      this.dom.equipmentLabelRoot.classList.add(`profile__itemSpecs-${item.type}`);

      // show label
      this.dom.equipmentLabelRoot.innerHTML = getBlacksmithEquipmentLabel(item);
      this.dom.equipmentLabelRoot.classList.remove('disabled');

      // keep displaying label when user  focus is on label
      this.dom.equipmentLabelRoot.addEventListener('mouseover', () => clearInterval(this.hideLabelInterval.equipment));

      // hide when equipment slot loses his focus
      this.dom.equipmentLabelRoot.addEventListener('mouseleave', () => {
         this.dom.equipmentLabelRoot.innerHTML = '';
         this.dom.equipmentLabelRoot.classList.add('disabled');
      });

      // get elements which are needed for moving item from equipment to backpack
      const replaceBtn: HTMLElement = this.dom.equipmentLabelRoot.querySelector('#profile_equipment_move_item_btn');
      const errorWrapper: HTMLElement = this.dom.equipmentLabelRoot.querySelector('#blacksmith_equipment_move_item_error');

      // add a event which is responsible for moving item  the equipment to backpack
      replaceBtn.addEventListener('click', () => this.moveItemToBackpack(item, errorWrapper));

   }

   // clear equipment slots -> remove items graphics 
   clearEquipmentSlots() {
      this.dom.equipmentSlots.forEach(el => {
         const element: HTMLElement = el as HTMLElement;
         el.innerHTML = `<img src='${getEquipmentIconSrc(element.dataset.slotName)}' class='profile__equipmentIcon'/>`
      });
   }


   /**
     * moving item from equipement to backpack
     * @param item - item which will be moved to backpack
     * @param errorWrapper - wrapper where an error message will be displayed if item moved fails
     */
   moveItemToBackpack(item: ShopItem, errorWrapper: HTMLElement) {

      // check if user have free slot in backpack (backpack have 10 slots)
      if (this.userData.backpackItems.length < this.dom.backpackSlots.length) {

         // remove this item from user equipment
         const itemIndex = this.userData.equipmentItems.findIndex(e => e.id === item.id);
         this.userData.equipmentItems.splice(itemIndex, 1);

         // add current item to user's backpack
         this.userData.backpackItems.push(item);

         // update user data -> equipment and backpack will be rerendered by onDataChange() method
         updateUserData(this.userData);

         // hide label
         this.dom.equipmentLabelRoot.className = 'profile__itemSpecs disabled';

      }

      // notify user about no available slot in backpack
      else {
         errorWrapper.innerText = 'Your backpack is full';
      }

   }

   // set user backpack where each item can be sold (sellEquipmentItem() method) or moved (moveItemToBackpack() method) to the backpack
   setUserEquipment() {

      // this method is also triggered when the data has changed, so you have to delete the graphics of the previous objects 
      this.clearEquipmentSlots();

      // add graphic and events
      this.userData.equipmentItems.forEach(el => {

         // find slot in equipment in order to inject item graphic and add function reponsible for transfering item from equipment to backpack
         const equipmentSlot: HTMLElement = document.querySelector(`#blacksmith_equipment_slots div[data-slot-name = '${el.type}']`);

         // set slot graphic 
         equipmentSlot.innerHTML = `  <img src='${el.src}' class="profile__equipmentIcon"/>`;

         // create equipment label with button responsible for transfering item
         equipmentSlot.addEventListener('mouseover', () => this.equipmentLabel(el))

         // hide label when equipment slot loses his focus with delay -> after 0.8s
         equipmentSlot.addEventListener('mouseleave', (e) => {
            this.hideLabelInterval.equipment = setTimeout(() => {
               this.dom.equipmentLabelRoot.innerHTML = '';
               this.dom.equipmentLabelRoot.classList.add('disabled');
            }, 800);

         });

      })
   }

   /////////////////////////////////////////////////////////////////////////////////////////////////

   // when data has changed then onDataChange() method will rerender component so its need to get dom elements 
   removeEvents() {

      // backpack
      const backpack: HTMLElement = document.querySelector('#blacksmith_backpack_slots');
      backpack.replaceWith(backpack.cloneNode(true));
      this.dom.backpackLabelRoot = document.querySelector('#blacksmith_backpack_item_label');
      this.dom.backpackSlots = document.querySelectorAll('#blacksmith_backpack_slots .profile__backpackItem');

      // equipment
      const equipment: HTMLElement = document.querySelector('.profile__equipment');
      equipment.replaceWith(equipment.cloneNode(true));
      this.dom.equipmentLabelRoot = document.querySelector('#blacksmith_equipment__item_label');
      this.dom.equipmentSlots = document.querySelectorAll('#blacksmith_equipment_slots div[data-slot-name]');
      this.dom.goldSubstract = document.querySelector('#blacksmith_gold_substract');
      this.dom.error = document.querySelector('#blacksmith__error');
      this.dom.level = document.querySelector('.profile__level');
      this.dom.portraitImg = document.querySelector('.profile__portraitImg');
      this.dom.goldAmount = document.querySelector('#blacksmith_gold_amount');
   }

   // set countdown which is displaying time remaining to new market items
   setNewShopCountdown() {
      return setCountdown(this.dom.countdown);
   }

   generalOnDataChange() {

      // set gold
      this.dom.goldAmount.innerText = `${this.userData.gold}`

      // set level and progress bar
      this.dom.level.innerHTML = `<div class='profile__levelProgress' 
         style='width: ${Math.floor(this.userData.exp * 100 / getNeededExp(this.userData.level))}%'></div>
         ${this.userData.level}`;

      // set portrait
      this.dom.portraitImg.src = this.userData.portrait
   }

   // events applied on mobile nav buttons by which the user can switch between blacksmith market and profile
   toogleView() {

      const hideNavContainer = () => {

         // hide nav container
         const navContainer: HTMLElement = document.querySelector('.nav');
         navContainer.style.display = 'none';

         // change nav icon 
         const navIcon: HTMLImageElement = document.querySelector('.mobileNav__icon');
         navIcon.src = './images/menu.png';
      }

      // show blacksmith market container
      this.dom.mobileNavFristSwitch.addEventListener('click', () => {
         hideNavContainer();
         this.dom.blacksmithContainer.classList.remove('disabled');
         this.dom.profileContainer.classList.add('disabled');
      });

      // show profile container
      this.dom.mobileNavSecondSwitch.addEventListener('click', () => {
         hideNavContainer();
         this.dom.blacksmithContainer.classList.add('disabled');
         this.dom.profileContainer.classList.remove('disabled');
      });

   }

   // hide profile content container on mobile devices, user can switch to profile content by the bottom nav bar
   mobile() {
      if (window.innerWidth < 1024) {
         this.dom.profileContainer.classList.add('disabled');
         this.toogleView();
      }
   }



   onDataChange() {
      this.removeEvents();
      this.setShop();
      this.setUserBackpack();
      this.setUserEquipment();
      this.generalOnDataChange();
      this.dragEventForMarketSlots();

   }
   getDOMElements() {
      this.dom = {
         blacksmithContainer: document.querySelector('.blacksmith__item:last-child'),
         profileContainer: document.querySelector('.blacksmith__item:first-child'),
         mobileNavFristSwitch: document.querySelector('.mobileNav__item:first-child'),
         mobileNavSecondSwitch: document.querySelector('.mobileNav__item:last-child'),
         level: document.querySelector('.profile__level'),
         portraitImg: document.querySelector('.profile__portraitImg'),
         market: document.querySelector("#market_slots"),
         marketSlots: document.querySelectorAll("#market_slots .market__slotWrapper"),
         itemLabel: document.querySelector('#blacksmith_item_label'),
         equipmentSlots: document.querySelectorAll('#blacksmith_equipment_slots div[data-slot-name]'),
         goldAmount: document.querySelector('#blacksmith_gold_amount'),
         goldBar: document.querySelector('#blacksmith_gold_bar'),
         goldSubstract: document.querySelector('#blacksmith_gold_substract'),
         backpack: document.querySelector('#blacksmith_backpack_slots'),
         body: document.querySelector(`body`),
         error: document.querySelector('#blacksmith__error'),
         countdown: document.querySelector('#blacksmith_countdown_time'),
         backpackLabelRoot: document.querySelector('#blacksmith_backpack_item_label'),
         equipmentLabelRoot: document.querySelector('#blacksmith_equipment__item_label'),
         backpackSlots: document.querySelectorAll('#blacksmith_backpack_slots .profile__backpackItem')
      }
   }
   render() {
      this.root.innerHTML = getBlacksmithHTMLCode(this.userData);
      this.mobileNav.innerHTML = blacksmithMobileNavCode;
   }
   initScripts() {
      this.mobile();
      this.setNewShopCountdown();
      this.setUserBackpack();
      this.setUserEquipment();
      this.setShop();
      this.buyItemByLabel();
      this.dragEventForMarketSlots();
      console.log(this.userData.shopPicks.blacksmith)
   }
}
