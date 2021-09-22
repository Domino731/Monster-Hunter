import { View } from './view';
export class MonsterFight extends View{
     constructor(){
         super()
     }
     render(){
         this.root.innerHTML = '<h1>Monster fight </h1>'
     }
     onDataChange(){}
     getDOMElements(){}
     initScripts(){}
}