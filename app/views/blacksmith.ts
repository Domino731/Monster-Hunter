import { ShopItem } from '../types';
import { chestplatesData } from '../properties/shop/chestplates';
import { helmetsData } from '../properties/shop/helmets';
import { glovesData } from '../properties/shop/gloves';
import { weaponsData } from '../properties/shop/weapons';
import { shieldsData } from '../properties/shop/shields';
import { getRandomShopItem } from '../functions/getRandomShopItem';
import { getBlacksmithItemLabel } from './sub_views/getBlacksmithItemLabel';
import { allMarketItems } from '../properties/shop/allMarketItems';
import { setItemStats } from '../functions/setItemStats';
export class Blacksmith {

   private root: HTMLElement
   private test: any
   private dom: {
      market: HTMLElement | null,
      marketSlots: NodeListOf<Element> | null,
      itemLabel: HTMLElement | null
   }
   constructor() {
      this.root = document.getElementById("game__view"),
         this.test = true
      this.dom = {
         market: document.querySelector("#market_slots"),
         marketSlots: document.querySelectorAll("#market_slots .market__slot"),
         itemLabel: document.querySelector('#blacksmith_item_label')
      }
      this.init();
   }

   async render() {
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

                 <div class='market__itemInfoWrapper disabled' id='blacksmith_item_label'>asdasd</div> 
            
                                     
                 <img class='market__characterImg' src='./images/blacksmith.png' alt='blacksmith'/>   
         
                </div>
    
                <div class='market__itemsList' id='market_slots'>
                   <div class='market__shopRow'> 
                      <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                            <img src='./images/shop/weapons/dire_steel_crusader.png'/> 
                        </div>  
                      </div>
                      <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                       
                        </div> 
                      </div>
                      <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                        
                        </div> 
                      </div>
                   </div>

                <div class='market__shopRow'> 
                   <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                          
                        </div> 
                   </div>
                   <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                     
                        </div> 
                   </div>
                   <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                   
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


      //////////////// rendering shop ////////////////////////////////

      this.dom.market.addEventListener('mouseleave', () => {
         this.dom.itemLabel.classList.add('disabled')
      })

      setItemStats()

      this.dom.marketSlots.forEach((el, num) => {
         const slot = el as HTMLElement;
         slot.dataset.itemId = shopItems[num].id;
         slot.innerHTML = `<img src='${shopItems[num].src}'/>`;

         // find specific item, in order to create label of this item
         const marketItem: ShopItem = allMarketItems[allMarketItems.findIndex(el => el.id === slot.dataset.itemId)];

         // specific item slot in equipment, needed to add pulse animation and compare items
         const itemSlot: HTMLElement = document.querySelector(`#equipment_slots div[data-slot-name = "${marketItem.type}"]`);

         // hover actions
         slot.addEventListener('mouseover', () => {

            // set the item label
            this.dom.itemLabel.innerHTML = getBlacksmithItemLabel(marketItem, itemSlot.firstElementChild as HTMLElement);

            // show slot in equipment by adding pulse animation
            itemSlot.firstElementChild.classList.add("profile__equipmentIcon-pulse");

            // show item label
            this.dom.itemLabel.classList.remove('disabled');

         })

         // removing hover effects
         slot.addEventListener('mouseleave', () => {

            // remove pulse effect
            itemSlot.firstElementChild.classList.remove("profile__equipmentIcon-pulse");
         })

      });

   }








   getDOMElements() {
      this.dom = {
         market: document.querySelector("#market_slots"),
         marketSlots: document.querySelectorAll("#market_slots .market__slot"),
         itemLabel: document.querySelector('#blacksmith_item_label')
      }
   }
   initScripts() {
      this.setShop();
   }
   init() {
      this.render();
      this.getDOMElements();
      this.initScripts();
   }
}

// <a href='https://www.freepik.com/vectors/frame'>Frame vector created by upklyak - www.freepik.com</a>

