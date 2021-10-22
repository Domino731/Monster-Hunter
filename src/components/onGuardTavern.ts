import { getOnGuardTavernHTMLCode } from '../HTMLCode/onGuardTavern';
import { Component } from './component';

/**  class responsible for tavern section when user is on guard */
export class OnGuardTavern extends Component {

    constructor() {
        super();
        this.freepikAttribute = `<a href='https://www.freepik.com/vectors/restaurant'>Restaurant vector created by upklyak - www.freepik.com</a>`;
        this.bodyBackgroundSrc = `/images/background_missions.jpg`;
    }

    render() {
        this.root.innerHTML = getOnGuardTavernHTMLCode();
    }

    onDataChange(){
        return true;
    }
    initScripts(){
        return true;
    }
    getDOMElements(){
        return true;
    }
    
  
} 