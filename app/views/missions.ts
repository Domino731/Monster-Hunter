import { Tavern } from './tavern';
import { Component } from './view';
import { OnGuardTavern } from './onGuardTavern';
import { Travel } from './travel';
import { MonsterFight } from './monsterFight';

// class which checks the status of the user and moves it to the appropriate section  
export class Missions extends Component{

    constructor() {
      super(); 
    }

    // check status and create section
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
      console.log('Data changed');
    }
    getDOMElements(){
        console.log('DOM loaded');
    }

    
}

// <a href='https://www.freepik.com/vectors/restaurant'>Restaurant vector created by upklyak - www.freepik.com</a>
