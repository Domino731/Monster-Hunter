import { getWizardHTMLCode } from '../viewsHTMLCode/wizard';
import { View } from './view';
import { ShopItem } from '../types';
import { getBlacksmithItems } from '../functions/getBlacksmithItems';
import { potionsData } from '../properties/shop/potions';
import { getRandomShopItem } from '../functions/getRandomShopItem';
import { allBlacksmithMarketItems } from '../properties/shop/allMarketItems';
export class Wizard extends View {

    private dom: {
      spinningWheelItems: NodeListOf<Element> | null
      spinBtn: HTMLButtonElement | null
    }
    constructor() {
        super()
        this.dom = {
            spinningWheelItems: document.querySelectorAll('.spinningWheel__content div[data-spinningWheel]'),
            spinBtn: document.querySelector('.wizard__btn')
        }
        
    }

     render() {
        this.root.innerHTML = getWizardHTMLCode();
    }

    startSpinningEvent(){
        this.dom.spinBtn
    }
    setSpinningWheelItems(){
        // add blacksmith items
        const items : ShopItem[] = getBlacksmithItems(this.userData.rawStats);
        // aslo,  user can get gold
        const gold: ShopItem = {
            type: 'gold',
            name: 'Gold',
            rarity: 'legendary',
            src: './images/gold_chest.png',
            description: 'Always comforting',
            initialCost: 0,
            properties: {
                strength: null,
                physicalEndurance: null,
                luck: null,
                defence: null
            },
            id: ''
        }
        items.push(gold);

        // check if user have active potion
        if(this.userData.potions.first === null || this.userData.potions.second === null){
          items.push(getRandomShopItem(potionsData))
        }
        // if user have both potions slots occupied then add random blacksmith item
        else{
          items.push(getRandomShopItem(allBlacksmithMarketItems))  
        }
        
        items.forEach((el, num) => {
            this.dom.spinningWheelItems[num].innerHTML = `<img src='${el.src}' class='spinningWheel__itemImg'/>`
        })
    }


    onDataChange(){ }
    getDOMElements(){
        this.dom = {
            spinningWheelItems: document.querySelectorAll('.spinningWheel__content div[data-spinningWheel]'),
            spinBtn: document.querySelector('.wizard__btn')
        }
    }
    initScripts(){
        this.setSpinningWheelItems();
    }
}

// <a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpouch - www.freepik.com</a>