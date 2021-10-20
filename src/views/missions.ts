import { Tavern } from './tavern';
import { Component } from './view';
import { OnGuardTavern } from './onGuardTavern';
import { Travel } from './travel';
import { MonsterFight } from './monsterFight';

// class which checks the user status and redirects him to the appropriate game section  
export class Missions extends Component{

    constructor() {
      super(); 
    }

    // check status and create appropriate section
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
        console.log('script initialization');
    }
    onDataChange(){
      return true;
    }
    getDOMElements(){
        console.log('DOM loaded');
    }

    
}
