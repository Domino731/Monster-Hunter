import { View } from './view';
import { getTavernHTMLCode } from '../viewsHTMLCode/tavern';
import { getRandomMissions } from '../functions/missionGenerator';
export class Tavern extends View{
    private dom: {
        startMissionBtn: HTMLButtonElement | null
      }
      constructor(){
          super()
          this.dom = {
              startMissionBtn: document.querySelector('.mission__acceptBtn')
          }
      }
      render(){
          console.log(this.userData.availableMissions)
          this.root.innerHTML = getTavernHTMLCode(this.userData);
      }
      onDataChange(){
       
      }
      getDOMElements(){
          this.dom = {
            startMissionBtn: document.querySelector('.mission__acceptBtn')
          }
      }
      startMission(){
         this.dom.startMissionBtn.addEventListener('click', ()=> {
             this.userData.availableMissions = getRandomMissions(this.userData.nextLevelAt, this.userData.guardPayout, this.userStats)
             console.log(this.userData.availableMissions)
         })
      }
      initScripts(){

         this.startMission();
      }
}