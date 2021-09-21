import { Tavern } from './tavern';
import { View } from './view';
import { OnGuardTavern } from './onGuardTavern';
import { Travel } from './travel';
import { getRandomMissions } from '../functions/missionGenerator';
import { getNeededExp } from '../functions/getNeededExp';
import { updateUserData } from '../firebase/operations';
export class Missions extends View{

    constructor() {
      super() 
    }

    
    render() {
        let render;

        if(this.userData.status === 'free'){
             render = new Tavern();
        }
        else if (this.userData.status === 'guard'){
             render = new OnGuardTavern();
        }
        else if (this.userData.status === 'mission'){
            render = new Travel();
        }
    }
    initScripts(){
        this.userData.availableMissions = getRandomMissions(getNeededExp(this.userData.level), 100);
    }
    onDataChange(){
      
    }
    getDOMElements(){}

    
}

// <a href='https://www.freepik.com/vectors/restaurant'>Restaurant vector created by upklyak - www.freepik.com</a>
