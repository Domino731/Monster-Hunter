import { Tavern } from './tavern';
import { View } from './view';
import { OnGuardTavern } from './onGuardTavern';
import { Travel } from './travel';
import { MonsterFight } from './monsterFight';
export class Missions extends View{

    constructor() {
      super() 
    }

    
    render() {
        let render;
        const currentTime = new Date().getTime();
        if(this.userData.status === 'free'){
             render = new Tavern();
        }
        else if (this.userData.status === 'guard'){
             render = new OnGuardTavern();
        }
        else if (this.userData.status === 'mission'){
            if(this.userData.currentMission.end.getTime() > currentTime){
                   render = new Travel();  
            }
            else if(this.userData.currentMission.end.getTime() <= currentTime){
                    render = new MonsterFight();
            }
        }
    }
    initScripts(){
        
    }
    onDataChange(){
      
    }
    getDOMElements(){}

    
}

// <a href='https://www.freepik.com/vectors/restaurant'>Restaurant vector created by upklyak - www.freepik.com</a>
