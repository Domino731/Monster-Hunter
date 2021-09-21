import { Tavern } from './tavern';
import { View } from './view';
import { OnGuardTavern } from './onGuardTavern';
import { Travel } from './travel';
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
    initScripts(){}
    onDataChange(){
        this.render();
    }
    getDOMElements(){}

    
}

// <a href='https://www.freepik.com/vectors/restaurant'>Restaurant vector created by upklyak - www.freepik.com</a>
