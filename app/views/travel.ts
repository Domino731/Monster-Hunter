import { View } from './view';
import { getTravelHTMLCode } from '../viewsHTMLCode/travel';
export class Travel extends View{
   private dom: {
     startMissionBtn: HTMLButtonElement
   }
   constructor(){
       super()
       this.dom = {
           startMissionBtn: document.querySelector('mission__acceptBtn')
       }
   }
   render(){
       this.root.innerHTML = getTravelHTMLCode();
   }
   onDataChange(){
    
   }
   getDOMElements(){
       this.dom = this.dom;
   }
   startMission(){
      console.log(this.dom)
   }
   initScripts(){
       console.log(12)
      this.startMission();
   }
}