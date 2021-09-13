import { UserData } from '../types';
import { db, auth } from '../firebase/index'

export abstract class View{
     userData: UserData | null
     root: HTMLElement
    constructor(){
        this.userData = null
        this.root = document.getElementById("game__view")
        this.init();
    }

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
     }

     
    // abstact method which is responsible for injecting html code into game root
     render(){
        window.alert('This method (render) should be implemented in  inheriting class')
    }

    // abstact method - getting the dom elements of newly injected html code
    getDOMElements(){
        window.alert('This method (getDOMElements) should be implemented in  inheriting class')
    }

    // abstract method - initialization of scripts
    initScripts(){
        window.alert('This method (initScripts) should be implemented in  inheriting class')
    }

    // initialization 
    init(){
       this.render();
       this.getDOMElements();
       this.getUserData()
       .then(() => this.initScripts());
    }
}