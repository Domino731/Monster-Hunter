import { View } from './view';
import { getTavernHTMLCode } from '../viewsHTMLCode/tavern';
export class Travel extends View{
   constructor(){
       super()
   }
   render(){
       this.root.innerHTML = getTavernHTMLCode();
   }
   onDataChange(){

   }
   getDOMElements(){
       
   }
   initScripts(){

   }
}