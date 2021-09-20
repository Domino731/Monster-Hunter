import { getWizardHTMLCode } from '../viewsHTMLCode/wizard';
import { View } from './view';
export class Wizard extends View {


    constructor() {
        super()
    }

     render() {
        this.root.innerHTML = getWizardHTMLCode();
    }

    onDataChange(){

    }
    getDOMElements(){

    }
    initScripts(){

    }
}

// <a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpouch - www.freepik.com</a>