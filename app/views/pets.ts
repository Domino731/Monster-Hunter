import { getPetsHTMLCode } from '../viewsHTMLCode/pets';
import { View } from './view';
export class Pets  extends View {

 
    private dom: {
       catCost: HTMLElement,
       scorpionCost: HTMLElement
       cheetahCost: HTMLElement
       dragonCost: HTMLElement
    }
    constructor() {
       super()
       this.dom = {
           catCost: document.querySelector('#pet_cat_cost'),
           scorpionCost: document.querySelector('#pet_scorpion_cost'),
           cheetahCost: document.querySelector('#pet_cheetah_cost'),
           dragonCost: document.querySelector('#pet_dragon_cost')
       }
    }

    async render() {
        this.root.innerHTML = getPetsHTMLCode(this.userData);;
    }
 

    setPetsCost(){
   
    }
    onDataChange(){}
    getDOMElements(){
       
    }

    initScripts(){
        this.setPetsCost();
    }
}

// <a href='https://www.freepik.com/vectors/background'>Background vector created by upklyak - www.freepik.com</a>