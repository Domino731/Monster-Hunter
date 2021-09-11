import { ShopItem } from '../types';
import { chestplatesData } from '../properties/shop/chestplates';
import { helmetsData } from '../properties/shop/helmets';
import { glovesData } from '../properties/shop/gloves';
import { weaponsData } from '../properties/shop/weapons';
import { shieldsData } from '../properties/shop/shields';
import { getRandomShopItem } from '../functions/getRandomShopItem';
export class Blacksmith {

   private root: HTMLElement
   private dom: {
      marketSlots: NodeListOf<Element> | null
   }
   constructor() {
      this.root = document.getElementById("game__view")
      this.dom = {
         marketSlots: document.querySelectorAll("#market_slots .market__slot")
      }
      this.init();
   }

   async render() {
      this.root.innerHTML = `<section class='blacksmith transparent'>
           <div class='blacksmith__item'>
                <div class='profile__equipment'>
                   <div class='profile__equipmentItem profile__equipmentItem-helmet'> 
                      <img src='/images/profile_equipment_helmet.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-armor'> 
                      <img src='/images/profile_equipment_armor.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-gloves'> 
                      <img src='/images/profile_equipment_gloves.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-weapon'> 
                      <img src='/images/profile_equipment_weapon.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-shield'> 
                      <img src='/images/profile_equipment_shield.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-special'> 
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
                    <img class='market__characterImg' src='./images/blacksmith.png' alt='blacksmith'/>          
                </div>
    
                <div class='market__itemsList' id='market_slots'>
                   <div class='market__shopRow'> 
                      <div class='market__shopFrame blacksmith__frame'>
                        <div class='market__slot'>
                          <img src='./images/weapon_sword_diamond.png' alt='frer of monsters'/>
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

       console.log(this.dom.marketSlots)
       //////////////// rendering shop ////////////////////////////////
 
       this.dom.marketSlots.forEach(el => console.log(el))
       
   }

   getDOMElements() {
      this.dom = {
         marketSlots: document.querySelectorAll("#market_slots .market__slot")
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

