import { UserData, ShopItem, FullUserStats} from '../types';
import { db, auth } from '../firebase/index'
import { potionsData } from '../properties/shop/potions';
import { getBlacksmithItems } from '../functions/getBlacksmithItems';
import { updateUserData } from '../firebase/operations';
import { getBlacksmithPicks } from '../functions/getBlacksmithPicks';
import { getRandomShopItem } from '../functions/getRandomShopItem';
import { allBlacksmithMarketItems } from '../properties/shop/allMarketItems';
import { getRandomMissions } from '../functions/missionGenerator';
import { getFullUserStats } from '../functions/getFullUserStats';

// Component class which is extended by other classes from the game
export class Component {

   // user's data from firestore, this data is used by inherited classes
   protected userData: UserData | null;
   // root element where html code will be injected
   protected root: HTMLElement;
   // user statistics created by all items in the equipment, by pet and potions.
   // Needed to create missions based on this stats and items in blacksmith market 
   protected userStats: FullUserStats;
   // container with loading animation, needed to remove this container when class initialize methods (scripts and others)
   protected loadingContainer: HTMLElement;
   // Bottom navigation bar (for mobile devies under 1024px), blacksmith section and profile have the ability to toggle between content inside these sections
   // for example in profile section user can toogle between profile and backpack. When the user moves to another section 
   // (for example - pets section which doesnt have the  ability to toggle between content), you have to clear this bar -  clearMobileNav() method
   protected mobileNav: HTMLElement;
   // wrapper of freepik attribute, each class which is using graphic from this site have to add author of this graphic
   protected freepikAttributeWrapper: HTMLElement;
   // freepik author attribute which will be displayed in above wrapper - setBodyBackground() method
   protected freepikAttribute: string;
   //  source of graphic needed to set body background image in order to create frosted glass effect - setBodyBackground() method
   protected bodyBackgroundSrc: string;

   constructor() {
      this.mobileNav = document.querySelector('.mobileNav__content');
      this.freepikAttributeWrapper = document.querySelector('#freepik-attribute');
      this.userData = null;
      this.userStats = {
         strength: 0,
         damage: 0,
         physicalEndurance: 0,
         health: 0,
         defence: 0,
         damageReduce: 0,
         luck: 0,
         critical: 0
      }
      this.root = document.getElementById("game__view");
      this.loadingContainer = document.querySelector('.loading');
      this.freepikAttribute = '';
      this.bodyBackgroundSrc = '';
      this.init();
   }
 
   /** check if pet rent time has ended or if potions expired */
   checkPetAndPotions() {

      const today: Date = new Date;

      // check pet
      if (this.userData.pet !== null) {
         if (this.userData.pet.rentEnd.getTime() <= today.getTime()) {
            this.userData.pet = null;
            updateUserData(this.userData);
         }
      }

      // check first potion
      if (this.userData.potions.first !== null) {
         if (this.userData.potions.first.end.getTime() <= today.getTime()) {
            this.userData.potions.first = null;
            updateUserData(this.userData);
         }
      }

      // check second potion
      if (this.userData.potions.second !== null) {
         if (this.userData.potions.second.end.getTime() <= today.getTime()) {
            this.userData.potions.second = null;
            updateUserData(this.userData);
         }
      }

   }

   /** Set the statistics based on equipment, potions and pet  */
   setHeroStats() {
      this.userStats = getFullUserStats(this.userData)
   }

   // method responsible for fetching user data, and also for data listener
   async getUserData() {

      const userId: string = auth.currentUser.uid;
      await db.collection("users").where("__name__", "==", userId)
         .get()
         .then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
               this.userData = doc.data() as UserData;
               this.setHeroStats();
            });
         })
         .catch((error: any) => {
            console.log("Error getting documents: ", error);
         });

      // listening for data updates
      await db.collection("users").where("__name__", "==", userId)
         .onSnapshot((snapshot: any) => {
            snapshot.docChanges.forEach((change: any) => {
               if (change.type === "modified") {
                  this.userData = change.doc.data() as UserData;
                  this.onDataChange();
                  this.setHeroStats();
               }
            });
         });
   }

   /** set magic wheel items which are available to win in the wizard section */
   setMagicWheel() {

      // add blacksmith items
      const items: ShopItem[] = getBlacksmithItems(this.userData.rawStats, this.userData.guardPayout);

      //  user can also win gold
      const gold: ShopItem = {
         type: 'gold',
         name: 'Gold',
         rarity: 'legendary',
         src: './images/gold_chest.png',
         description: `${this.userData.gold + Math.ceil(this.userData.guardPayout * 10)} gold will always comforting`,
         initialCost: 0,
         properties: {
            strength: null,
            physicalEndurance: null,
            luck: null,
            defence: null
         },
         id: ''
      }
      items.push(gold);

      // check if user have active potion
      if (this.userData.potions.first === null || this.userData.potions.second === null) {
         items.push(getRandomShopItem(potionsData))
      }

      // if user have both potions slots occupied then add random blacksmith item
      else {
         items.push(getRandomShopItem(allBlacksmithMarketItems))
      }

      // set items available to win, and add this won one
      this.userData.magicWheel = {
         items,
         wonItem: items[Math.floor(Math.random() * items.length)]
      }

   }

   /**
   operations which are tiggered on new day ->
   blacksmith market reset
   new wizard magic wheel items
   new available missions in tavern 
   willingness reset  for mission
    */
   dateOperations() {

      // check pet and potions wont expired
      this.checkPetAndPotions();

      // 
      const today: Date = new Date();
      if (this.userData.lastVisit.getDay() !== today.getDay()) {

         // set new shop
         this.userData.shop.blacksmith = getBlacksmithItems(this.userData.rawStats, this.userData.guardPayout);
         this.userData.shopPicks.blacksmith = getBlacksmithPicks();

         // set new wizard magic wheel spin, and new spinning wheel items
         this.userData.wizardWheelSpin = true;
         this.setMagicWheel();

         // set new missions
         this.userData.availableMissions = getRandomMissions(this.userData.nextLevelAt, this.userData.guardPayout, this.userStats, this.userData.pet);

         // set last visit date
         this.userData.lastVisit = today;

         // reset mission willingness
         this.userData.missionWillingness = 100;

         updateUserData(this.userData);
      }

      // set last visit
      this.userData.lastVisit = today;
      updateUserData(this.userData);

   }
 
   /** remove loading screen */
   removeLoading() {
      this.loadingContainer.classList.add('disabled');
   }
 
   /** clear mobile navigation bottom bar (profile and blacksmith have ability to toggle content in section) */
   clearMobileNav() {
      this.mobileNav.innerHTML = '';
   }

   /** set body background in order to create frosted glass effect, and set freepik author attribute */
   setBodyBackground() {

      // body background
      const body: HTMLElement = document.querySelector('body');
      body.style.backgroundImage = `url(${this.bodyBackgroundSrc})`;

      // author
      this.freepikAttributeWrapper.innerHTML = this.freepikAttribute;

   }

   /** abstact method which is responsible for operations when data has changed */
   onDataChange() {
      window.alert('dataChange method should be implemented in inheriting class');
   }
   /** abstact method which is responsible for injecting html code into game root */
   render() {
      window.alert('render method hould be implemented in inheriting class');
   }
   /** abstact method - getting the dom elements of newly injected html code */
   getDOMElements() {
      window.alert('getDOMElements method  should be implemented in inheriting class');
   }

   /** abstract method - initialization of methods */
   initScripts() {
      window.alert('initScripts method  should be implemented in inheriting class');
   }
   
   /** initialization */
   init() {
      this.clearMobileNav();
      this.getUserData()
         .then(() => {
            this.setBodyBackground();
            this.dateOperations()
            this.render()
            this.getDOMElements();
            this.initScripts();
         })
         .then(() => {
            this.removeLoading();
         })
         .catch(err => console.error(err))
   }
}

