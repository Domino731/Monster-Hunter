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
import { setCountdown } from '../functions/countdown';
import { helmetsData } from '../properties/shop/helmets';
export class Wizard extends View {

    private dom: {
        spinningWheelItems: NodeListOf<Element> | null
        spinBtn: HTMLButtonElement | null
        spinningWheel: HTMLElement | null
        spinningCircle: HTMLElement | null
        wonItemLabel: HTMLElement | null
        actionError: HTMLElement | null
        actionBar: HTMLElement | null
        countdown: HTMLElement | null
    }
    constructor() {
        super()
        this.dom = {
            spinningWheel: document.querySelector('.spinningWheel__content'),
            spinningWheelItems: document.querySelectorAll('.spinningWheel__content div[data-spinningWheel]'),
            spinBtn: document.querySelector('.wizard__btn'),
            spinningCircle: document.querySelector('.spinningWheel__content .circle'),
            wonItemLabel: document.querySelector('.wonItem__wrapper'),
            actionError: document.querySelector('.wizard__actionError'),
            actionBar: document.querySelector('.wizard__actionBar'),
            countdown: document.querySelector('.wizard__countdown')
        }
    }

    render() {
        this.root.innerHTML = getWizardHTMLCode(this.userData);
    }

    // add won item to user's data
    addWonItem() {
        // remove spin from user account, next spin will be availble at next day
        this.userData.wizardWheelSpin = false;
        // show coundown
        this.dom.countdown.parentElement.classList.remove('disabled');
        setCountdown(this.dom.countdown);
        this.dom.actionBar.innerHTML = '';
        // add won item to user's data and update his profile in firestore
        if (this.userData.magicWheel.wonItem.type === 'gold') {
            this.userData.gold += Math.ceil(this.userData.guardPayout * 10);
        }
        else if (this.userData.magicWheel.wonItem.type === 'potion') {
            const end: Date = new Date();
            end.setHours(end.getHours() + (7 * 24));
            const newPotion : {id: string, end: Date}= {
                 id: this.userData.magicWheel.wonItem.id,
                 end: end
            }
            if (this.userData.potions.first === null) {
                this.userData.potions.first = newPotion;
            }
            else {
                this.userData.potions.second = newPotion;
            }
        }
        else {
            this.userData.backpackItems.push(this.userData.magicWheel.wonItem);
        }
        updateUserData(this.userData)
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
                    this.dom.wonItemLabel.innerHTML = getWonItemLabel(this.userData.magicWheel.wonItem);
                    this.dom.wonItemLabel.classList.remove('disabled');
                }, 10000);
                this.addWonItem();
            }
            else {
                this.dom.actionError.innerText = 'Your backpack is full';
                setTimeout(() => {
                    this.dom.actionError.innerText = '';
                }, 3000);
            }
        });
    }
    setSpinningWheelItems() {
        this.userData.magicWheel.items.forEach((el, num) => {
            this.dom.spinningWheelItems[num].innerHTML = `<img src='${el.src}' class='spinningWheel__itemImg'/>`
        });
    }

    rwd(){
        const foo = helmetsData[12]
        this.dom.spinningWheel.classList.add('spinningWheel__content-animation');
        // spin the wheel
        setTimeout(() => {
            this.dom.spinningCircle.classList.add('circle-animation');
        }, 7000);
        // remove spinning animation and show won item
        setTimeout(() => {
            this.dom.spinningWheel.classList.remove('spinningWheel__content-animation');
            this.dom.wonItemLabel.innerHTML = getWonItemLabel(foo);
            this.dom.wonItemLabel.classList.remove('disabled');
        }, 10000);
    }
    onDataChange() { }
    getDOMElements() {
        this.dom = {
            spinningWheel: document.querySelector('.spinningWheel__content'),
            spinningWheelItems: document.querySelectorAll('.spinningWheel__content div[data-spinningWheel]'),
            spinBtn: document.querySelector('.wizard__btn'),
            spinningCircle: document.querySelector('.spinningWheel__content .circle'),
            wonItemLabel: document.querySelector('#wonItem_wrapper'),
            actionError: document.querySelector('.wizard__actionError'),
            actionBar: document.querySelector('.wizard__actionBar'),
            countdown: document.querySelector('.wizard__countdown')
        }
    }

    initScripts() {
        this.rwd();
        this.setSpinningWheelItems();
        if (this.userData.wizardWheelSpin) {
            this.startSpinningEvent();
        }
        else {
            setCountdown(this.dom.countdown);
        }

    }


}

// <a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpouch - www.freepik.com</a>