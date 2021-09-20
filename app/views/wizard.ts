import { getWizardHTMLCode } from '../viewsHTMLCode/wizard';
import { View } from './view';
import { ShopItem } from '../types';
import { getBlacksmithItems } from '../functions/getBlacksmithItems';
import { potionsData } from '../properties/shop/potions';
import { getRandomShopItem } from '../functions/getRandomShopItem';
import { allBlacksmithMarketItems } from '../properties/shop/allMarketItems';
import { getWonItemLabel } from './sub_views/getWonItemLabel';
import { setItemStats } from '../functions/setItemStats';
import { updateUserData } from '../firebase/operations';
import firebase from 'firebase/app';
export class Wizard extends View {

    private dom: {
        spinningWheelItems: NodeListOf<Element> | null
        spinBtn: HTMLButtonElement | null
        spinningWheel: HTMLElement | null
        spinningCircle: HTMLElement | null
        wonItemLabel: HTMLElement | null
        actionError: HTMLElement | null
    }
    private wonItem: ShopItem | null
    constructor() {
        super()
        this.dom = {
            spinningWheel: document.querySelector('.spinningWheel__content'),
            spinningWheelItems: document.querySelectorAll('.spinningWheel__content div[data-spinningWheel]'),
            spinBtn: document.querySelector('.wizard__btn'),
            spinningCircle: document.querySelector('.spinningWheel__content .circle'),
            wonItemLabel: document.querySelector('.wonItem__wrapper'),
            actionError: document.querySelector('.wizard__actionError')
        }
        this.wonItem = null
    }

    render() {
        this.root.innerHTML = getWizardHTMLCode();
    }

    startSpinningEvent() {
        this.dom.spinBtn.addEventListener('click', () => {

            // check if user's backpack has availble slots
            if (this.userData.backpackItems.length < 10) {
                this.dom.spinningWheel.classList.add('spinningWheel__content-animation');
                // spin the wheel
                setTimeout(() => {
                    this.dom.spinningCircle.classList.add('circle-animation');
                }, 7000);
                // remove spinning animation and show won item
                setTimeout(() => {
                    this.dom.spinningWheel.classList.remove('spinningWheel__content-animation');
                    this.dom.wonItemLabel.innerHTML = getWonItemLabel(this.wonItem);
                    this.dom.wonItemLabel.classList.remove('disabled');
                }, 10000);
            }
            else {
                this.dom.actionError.innerText = 'Your backpack is full';
                setTimeout(() => {
                    this.dom.actionError.innerText = '';
                }, 3000);
            }
            const x = this.userData.gold + Math.ceil(this.userData.guardPayout * 10);
            console.log(x)
            // add won item to user's data and update his profile in firestore
            if (this.wonItem.type === 'gold') {
                this.userData.gold += Math.ceil(this.userData.guardPayout * 10);
            }
            else if (this.wonItem.type === 'potion') {
                const start: Date = new Date();
                if (this.userData.potions.first === null) {
                    this.userData.potions.first.id = this.wonItem.id;
                    this.userData.potions.first.end.setHours(start.getHours() + (7 * 24));
                }
                else {
                    this.userData.potions.second.id = this.wonItem.id;
                    this.userData.potions.second.end.setHours(start.getHours() + (7 * 24));
                }
            }
            else {
                this.userData.backpackItems.push(this.wonItem);
            }
            updateUserData(this.userData)


        });
    }
    setSpinningWheelItems() {
        // add blacksmith items
        const items: ShopItem[] = getBlacksmithItems(this.userData.rawStats);
        // aslo,  user can get gold
        const gold: ShopItem = {
            type: 'gold',
            name: 'Gold',
            rarity: 'legendary',
            src: './images/gold_chest.png',
            description: `${this.userData.gold + Math.ceil(this.userData.guardPayout * 10)} gold will always comforting`,
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
        if (this.userData.potions.first === null || this.userData.potions.second === null) {
            items.push(getRandomShopItem(potionsData))
        }
        // if user have both potions slots occupied then add random blacksmith item
        else {
            items.push(getRandomShopItem(allBlacksmithMarketItems))
        }

        items.forEach((el, num) => {
            this.dom.spinningWheelItems[num].innerHTML = `<img src='${el.src}' class='spinningWheel__itemImg'/>`
        })

        // set won item
        this.wonItem = items[Math.floor(Math.random() * items.length)]

    }


    onDataChange() { }
    getDOMElements() {
        this.dom = {
            spinningWheel: document.querySelector('.spinningWheel__content'),
            spinningWheelItems: document.querySelectorAll('.spinningWheel__content div[data-spinningWheel]'),
            spinBtn: document.querySelector('.wizard__btn'),
            spinningCircle: document.querySelector('.spinningWheel__content .circle'),
            wonItemLabel: document.querySelector('#wonItem_wrapper'),
            actionError: document.querySelector('.wizard__actionError')
        }
    }
    initScripts() {
        this.setSpinningWheelItems();
        this.startSpinningEvent();
    }
}

// <a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpouch - www.freepik.com</a>