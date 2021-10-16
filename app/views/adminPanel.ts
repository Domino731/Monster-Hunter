import { auth } from '../firebase/index';
import { getAdminPanelHTMLCode } from '../HTMLCode/adminPanel';

export class AdminPanel{
    private root: HTMLElement
    constructor(){
        this.root = document.getElementById('game__view')  
        this.init();
    }

    render(){
        this.root.innerHTML = getAdminPanelHTMLCode();
    }
    getDOMElements(){

    }
    initScripts(){

    }
    init(){
        this.render();
        this.getDOMElements();
        this.initScripts();
        console.log(auth.currentUser.getToken)
    }
}