import { getWizardHTMLCode } from '../viewsHTMLCode/wizard';
import { View } from './view';
import { ShopItem } from '../types';
import { getBlacksmithItems } from '../functions/getBlacksmithItems';
import { potionsData } from '../properties/shop/potions';
import { getRandomShopItem } from '../functions/getRandomShopItem';
import { allBlacksmithMarketItems } from '../properties/shop/allMarketItems';
import { getWonItemLabel } from './sub_views/getWonItemLabel';
export class Wizard extends View {

    private dom: {
      spinningWheelItems: NodeListOf<Element> | null
      spinBtn: HTMLButtonElement | null
      spinningWheel: HTMLElement | null
      spinningCircle: HTMLElement | null
      wonItemLabel: HTMLElement | null
    }
    private wonItem: ShopItem | null
    constructor() {
        super()
        this.dom = {
            spinningWheel: document.querySelector('.spinningWheel__content'),
            spinningWheelItems: document.querySelectorAll('.spinningWheel__content div[data-spinningWheel]'),
            spinBtn: document.querySelector('.wizard__btn'),
            spinningCircle: document.querySelector('.spinningWheel__content .circle'),
            wonItemLabel: document.querySelector('.wonItem__wrapper')
        }
        this.wonItem = null
    }

     render() {
        this.root.innerHTML = getWizardHTMLCode();
    }

    startSpinningEvent(){
        this.dom.spinBtn.addEventListener('click', ()=> {
           this.dom.spinningWheel.classList.add('spinningWheel__content-animation')
           setTimeout(()=> {
                this.dom.spinningCircle.classList.add('circle-animation')
           }, 7000)
           setTimeout(()=> {
            this.dom.spinningWheel.classList.remove('spinningWheel__content-animation')
            // set won item label
            this.dom.wonItemLabel.innerHTML = getWonItemLabel(this.wonItem);
            this.dom.wonItemLabel.classList.remove('disabled')
           }, 10000)
        })
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

        // set won item
        this.wonItem = items[Math.floor(Math.random() * items.length)]
        console.log(items)
    }


    onDataChange(){ }
    getDOMElements(){
        this.dom = {
            spinningWheel: document.querySelector('.spinningWheel__content'),
            spinningWheelItems: document.querySelectorAll('.spinningWheel__content div[data-spinningWheel]'),
            spinBtn: document.querySelector('.wizard__btn'),
            spinningCircle: document.querySelector('.spinningWheel__content .circle'),
            wonItemLabel: document.querySelector('#wonItem_wrapper')
        }
    }
    initScripts(){
        this.setSpinningWheelItems();
        this.startSpinningEvent();
    }
}

// <a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpouch - www.freepik.com</a>