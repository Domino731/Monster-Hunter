import { View } from './view';
import { getTavernHTMLCode } from '../viewsHTMLCode/tavern';
export class Tavern extends View{
    constructor(){
        super()
    }
    render(){
        this.root.innerHTML = getTavernHTMLCode();
    }
    onDataChange(){}
    initScripts(){}
    getDOMElements(){}
}