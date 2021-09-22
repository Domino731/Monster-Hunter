import { View } from './view';
import { getMonsterFightHTMLCode } from '../viewsHTMLCode/monsterFight';
export class MonsterFight extends View{
     constructor(){
         super()
     }
     render(){
         this.root.innerHTML = getMonsterFightHTMLCode(this.userStats, this.userData);
     }
     onDataChange(){}
     getDOMElements(){}
     initScripts(){}
}
// <a href='https://www.freepik.com/vectors/nature'>Nature vector created by brgfx - www.freepik.com</a>