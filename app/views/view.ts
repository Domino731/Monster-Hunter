import { UserData, ShopItem, PetProperties, FullUserStats, SearchedUserData } from '../types';
import { db, auth } from '../firebase/index'
import { potionsData } from '../properties/shop/potions';
import { getBlacksmithItems } from '../functions/getBlacksmithItems';
import { updateUserData } from '../firebase/operations';
import { getBlacksmithPicks } from '../functions/getBlacksmithPicks';
import { getRandomShopItem } from '../functions/getRandomShopItem';
import { allBlacksmithMarketItems } from '../properties/shop/allMarketItems';
import { getRandomMissions } from '../functions/missionGenerator';
import { monstersData } from '../properties/missions/monsters';

export class View {
   protected userData: UserData | null
   protected root: HTMLElement
   protected userStats: FullUserStats
   protected userFriends: SearchedUserData[]
   protected loadingContainer: HTMLElement
   protected loadingMonster: HTMLImageElement
   constructor() {
      this.userData = null
      this.userFriends = []
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
      this.root = document.getElementById("game__view")
      this.loadingContainer = document.querySelector('.loading')
      this.loadingMonster = document.querySelector('.loading__monster')
      this.init();
   }

   // check if pet rent time has ended or if potions ended
   checkPetAndPotions(){
      const today : Date = new Date;
       if(this.userData.pet !== null){
         if(this.userData.pet.rentEnd <= today){
            this.userData.pet = null;
         } 
       }
       if(this.userData.potions.first !== null){
          if(this.userData.potions.first.end <= today){
             this.userData.potions.first = null;
          }
       }
       if(this.userData.potions.second !== null){
         if(this.userData.potions.second.end <= today){
            this.userData.potions.second = null;
         }
      }
   }
   // function that will set statistics based on equipment, potions and pet
   setHeroStats() {
       this.checkPetAndPotions();
       // by basic stats

       // strenght
       this.userStats.strength = this.userData.rawStats.strength;
       this.userStats.damage = Math.floor(this.userStats.strength * 0.7);
       // luck
       this.userStats.luck = this.userData.rawStats.luck;
       this.userStats.critical = this.userStats.critical = Math.floor(this.userStats.luck * 0.3);
       // pe
       this.userStats.physicalEndurance = this.userData.rawStats.physicalEndurance;
       this.userStats.health =  Math.floor(this.userStats.physicalEndurance * 0.8);
       // defence
       this.userStats.defence = this.userData.rawStats.defence;
       this.userStats.damageReduce = Math.floor(this.userStats.defence * 0.5);

      // by equipment
      this.userData.equipmentItems.forEach(el => {
         if (el.properties.strength !== null) {
            this.userStats.strength = Math.floor(this.userData.rawStats.strength + el.properties.strength);
            this.userStats.damage = Math.floor(this.userStats.strength * 0.7);
         }
         if (el.properties.luck !== null) {
            this.userStats.luck = Math.floor(this.userData.rawStats.luck + el.properties.luck);
            this.userStats.critical = Math.floor(this.userStats.luck * 0.3);
         }
         if (el.properties.physicalEndurance !== null) {
            this.userStats.physicalEndurance = Math.floor(this.userData.rawStats.physicalEndurance + el.properties.physicalEndurance);
            this.userStats.health = Math.floor(this.userStats.physicalEndurance * 0.8);
         }
         if (el.properties.defence !== null) {
            this.userStats.defence = Math.floor(this.userData.rawStats.defence + el.properties.defence);
            this.userStats.damageReduce = Math.floor(this.userStats.defence * 0.5);
         }
      });

      // by pet
      if (this.userData.pet !== null) {
         const petProps: PetProperties = this.userData.pet.properties
         if (petProps.strength !== null) {
            this.userStats.strength = this.userStats.strength + Math.floor(this.userData.rawStats.strength * (petProps.strength / 100));
            this.userStats.damage = Math.floor(this.userStats.strength * 0.7);
         }
         if (petProps.luck !== null) {
            this.userStats.luck = this.userStats.luck + Math.floor(this.userData.rawStats.luck * (petProps.luck / 100));
            this.userStats.critical = Math.floor(this.userStats.luck * 0.3);
         }
         if (petProps.physicalEndurance !== null) {
            this.userStats.physicalEndurance = this.userStats.physicalEndurance + Math.floor(this.userData.rawStats.physicalEndurance * (petProps.physicalEndurance / 100));
            this.userStats.health = Math.floor(this.userStats.physicalEndurance * 0.8);
         }
         if (petProps.defence !== null) {
            this.userStats.defence = this.userStats.defence + Math.floor(this.userData.rawStats.defence * (petProps.defence / 100));
            this.userStats.damageReduce = Math.floor(this.userStats.defence * 0.5);
         }
      }
      // by potions       
      const firstPotion: ShopItem | undefined = potionsData[potionsData.findIndex(el => this.userData.potions.first)];
      const secondPotion: ShopItem | undefined = potionsData[potionsData.findIndex(el => this.userData.potions.second)];
      // first potion
      if (firstPotion !== undefined) {
         if (firstPotion.properties.strength !== null) {
            this.userStats.strength = this.userStats.strength + Math.floor(this.userData.rawStats.strength * (firstPotion.properties.strength / 100));
            this.userStats.damage = Math.floor(this.userStats.strength * 0.7);
         }
         if (firstPotion.properties.luck !== null) {
            this.userStats.luck = this.userStats.strength + Math.floor(this.userData.rawStats.luck * (firstPotion.properties.luck / 100));
            this.userStats.critical = Math.floor(this.userStats.luck * 0.3);
         }
         if (firstPotion.properties.physicalEndurance !== null) {
            this.userStats.physicalEndurance = this.userStats.strength + Math.floor(this.userData.rawStats.physicalEndurance * (firstPotion.properties.physicalEndurance / 100));
            this.userStats.health = Math.floor(this.userStats.physicalEndurance * 0.8);
         }
         if (firstPotion.properties.defence !== null) {
            this.userStats.defence = this.userStats.strength + Math.floor(this.userData.rawStats.defence * (firstPotion.properties.defence / 100));
            this.userStats.damageReduce = Math.floor(this.userStats.defence * 0.5);
         }
      }
      // second potion
      if (secondPotion !== undefined) {
         if (secondPotion.properties.strength !== null) {
            this.userStats.strength = this.userStats.strength + Math.floor(this.userData.rawStats.strength * (secondPotion.properties.strength / 100));
            this.userStats.damage = Math.floor(this.userStats.strength * 0.7);
         }
         if (secondPotion.properties.luck !== null) {
            this.userStats.luck = this.userStats.strength + Math.floor(this.userData.rawStats.luck * (secondPotion.properties.luck / 100));
            this.userStats.critical = Math.floor(this.userStats.luck * 0.3);
         }
         if (secondPotion.properties.physicalEndurance !== null) {
            this.userStats.physicalEndurance = this.userStats.strength + Math.floor(this.userData.rawStats.physicalEndurance * (secondPotion.properties.physicalEndurance / 100));
            this.userStats.health = Math.floor(this.userStats.physicalEndurance * 0.8);
         }
         if (secondPotion.properties.defence !== null) {
            this.userStats.defence = this.userStats.strength + Math.floor(this.userData.rawStats.defence * (secondPotion.properties.defence / 100));
            this.userStats.damageReduce = Math.floor(this.userStats.defence * 0.5);
         }

      }
   }

   // method responsbile for fetching user data, and also this is real time data lisener
   async getUserData() {

      const userId: string = auth.currentUser.uid
      await db.collection("users").where("__name__", "==", userId)
         .get()
         .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               // doc.data() is never undefined for query doc snapshots
               this.userData = doc.data() as UserData
               this.setHeroStats();

            });
         })

         .catch((error) => {
            console.log("Error getting documents: ", error);
         });

      // listening for data updates
      await db.collection("users").where("__name__", "==", userId)
         .onSnapshot((snapshot) => {
            snapshot.docChanges.forEach((change) => {
               if (change.type === "modified") {
                  this.userData = change.doc.data() as UserData;
                  this.onDataChange();
                  this.setHeroStats();
               }
               if (change.type === "removed") {
                  // redirect user to login page
                 // location.href = '/login.html';
               }
            });
         });
   }

   setMagicWheel() {
      // add blacksmith items
      const items: ShopItem[] = getBlacksmithItems(this.userData.rawStats, this.userData.guardPayout);
      // aslo,  user can get gold
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

      // set won item
      this.userData.magicWheel = {
         items,
         wonItem: items[Math.floor(Math.random() * items.length)]
      }
   }

   dateOperations() {

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

   }
   // abstact method which is responsible for operations when data has changed
   onDataChange() {
      window.alert('This method (dataChange) should be implemented in  inheriting class')
   }
   // abstact method which is responsible for injecting html code into game root
   render() {
      window.alert('This method (render) should be implemented in  inheriting class')
   }

   // abstact method - getting the dom elements of newly injected html code
   getDOMElements() {
      window.alert('This method (getDOMElements) should be implemented in  inheriting class')
   }

   // abstract method - initialization of scripts
   initScripts() {
      window.alert('This method (initScripts) should be implemented in  inheriting class')
   }

   addLoading(){
      // set random monster
      this.loadingMonster.src = monstersData[Math.floor(Math.random() * monstersData.length)];
      this.loadingContainer.classList.remove('disabled');
   }
   removeLoading(){
      this.loadingContainer.classList.add('disabled');
   }
   // initialization 
   init() {
      console.log('widht', window.innerWidth)
      console.log('height', window.innerHeight)
      this.addLoading();
      this.getUserData()
         .then(() => {
            this.dateOperations()
            this.render()
            this.getDOMElements();
            this.initScripts();
         })
         .then(()=> {
            this.removeLoading();
         })
         .catch(err => console.log(err))

   }
}