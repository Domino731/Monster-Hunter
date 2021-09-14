import { UserData } from '../types';
import { db, auth } from '../firebase/index'

export class View {
   protected userData: UserData | null
   protected root: HTMLElement
   constructor() {
      this.userData = null
      this.root = document.getElementById("game__view")
      this.init();
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
            });
         })

         .catch((error) => {
            console.log("Error getting documents: ", error);
         });

     await db.collection("users").where("__name__", "==", userId)
         .onSnapshot((snapshot) => {
            snapshot.docChanges.forEach((change) => {
               if (change.type === "modified") {
                  this.userData = change.doc.data() as UserData;
                  this.dataChange();
               }
               if (change.type === "removed") {
                  this.userData = change.doc.data() as UserData;
                  this.dataChange();
               }
            });
         });
   }


   // abstact method which is responsible for operations when data has changed
   dataChange(){
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