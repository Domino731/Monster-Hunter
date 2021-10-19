import { getOnGuardTavernHTMLCode } from '../HTMLCode/onGuardTavern';

// class responsible for tavern section when user is on guard
export class OnGuardTavern {

    // need to inject html code - render() method 
    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view");
        this.init();
    }

    // inject html code into root element
    render() {
        this.root.innerHTML = getOnGuardTavernHTMLCode();
    }

    // set body background with freepik attribute
    setBodyBackground() {
        document.querySelector('#freepik-attribute').innerHTML = `<a href='https://www.freepik.com/vectors/restaurant'>Restaurant vector created by upklyak - www.freepik.com</a>`;
        document.querySelector('body').style.backgroundImage = '/images/background_missions.jpg';
    }

    // initialization of scripts
    init() {
        this.render();
        this.setBodyBackground();
    }
} 