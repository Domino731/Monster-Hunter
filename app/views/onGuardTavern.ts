import { getOnGuardTavernHTMLCode } from '../HTMLCode/onGuardTavern';
export class OnGuardTavern{

    private root: HTMLElement
    constructor(){
        this.root = document.getElementById("game__view");
        this.init()
    }

    render(){
        this.root.innerHTML = getOnGuardTavernHTMLCode();
    }

    init(){
        this.render();
    }

} 