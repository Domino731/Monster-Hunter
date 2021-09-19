import { UserData, ShopItem } from '../types';
import { db, auth } from '../firebase/index'

export class View {
   protected userData: UserData | null
   protected root: HTMLElement
   protected userStats: {
      strength: number,
      damage: number,
      physicalEndurance: number,
      health: number,
      defence: number
      damageReduce: number,
      luck: number,
      critical: number
   }
   constructor() {
      this.userData = null
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
      this.init();
   }

   // function that will set statistics based on equipment
   setHeroStats(){
      this.userData.equipmentItems.map(el => {
                 
         if(el.properties.strength !== null){
            this.userStats.strength = Math.floor( this.userData.rawStats.strength + el.properties.strength);
            this.userStats.damage = Math.floor(this.userStats.strength * 0.7);
         }
         if(el.properties.luck !== null){
            this.userStats.luck =  Math.floor(this.userData.rawStats.luck + el.properties.luck);
            this.userStats.critical = Math.floor(this.userStats.luck * 0.7);
         }
         if(el.properties.physicalEndurance !== null){
            this.userStats.physicalEndurance =   Math.floor( this.userData.rawStats.physicalEndurance + el.properties.physicalEndurance);
            this.userStats.health =  Math.floor( this.userStats.physicalEndurance * 0.7);
         }
         if(el.properties.defence !== null){
            this.userStats.defence =  Math.floor( this.userData.rawStats.defence + el.properties.defence);
            this.userStats.damageReduce =  Math.floor( this.userStats.defence * 0.7);
         }
       
      }) 
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



     await db.collection("users").where("__name__", "==", userId)
         .onSnapshot((snapshot) => {
            snapshot.docChanges.forEach((change) => {
               if (change.type === "modified") {
                  console.log(12)
                  this.userData = change.doc.data() as UserData;
                  this.onDataChange();
                  this.setHeroStats();
               }
               if (change.type === "removed") {
                  this.userData = change.doc.data() as UserData;
                  this.onDataChange();
                  this.setHeroStats();
               }
            });
         });
   }


   // abstact method which is responsible for operations when data has changed
   onDataChange(){
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

   // initialization 
   init() {
      this.getUserData()
         .then(() => {
            this.render();
            this.getDOMElements();
            this.initScripts()
         });
   }
}