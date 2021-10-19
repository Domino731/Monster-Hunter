import { getWizardHTMLCode } from '../HTMLCode/wizard';
import { Component } from './view';
import { updateUserData } from '../firebase/operations';
import { setCountdown } from '../functions/countdown';
import { getWonItemLabel } from '../functions/getWonItemLabel';

// Class responsible for spinning wheel by which user can earn free equipment item, potion or gold
export class Wizard extends Component {

    private dom: {
        // array with items wrappers need to set available items (setSpinningWheelItems() method) to win in magic wheel
        spinningWheelItems: NodeListOf<Element> | null;
        // button on which function responsible for start spinning wheel is applied -  startSpinningEvent() method
        spinBtn: HTMLButtonElement | null;
        // container with wheel needed to add to him spinning animation - startSpinningEvent() method
        spinningWheel: HTMLElement | null;
        // gray circle in the middle of the spinning wheel, needed to add to him spinning animation - startSpinningEvent() method
        spinningCircle: HTMLElement | null;
        // item label which is displaying after spinning wheel end spinning, contains info about won item - startSpinningEvent() method
        wonItemLabel: HTMLElement | null;
        // wrapper which is displaying error when user's backpack is full - startSpinningEvent() method
        actionError: HTMLElement | null;
        // wrapper which is  containing button responsible for start spinning wheel, when user click on this button, html in this actionBar
        // is cleaned so user cant spin the wheel , and the countdown is started - startSpinningEvent() method
        actionBar: HTMLElement | null;
        // wrapper which is displaying countdown to next magic wheel spin - addWonItem() method
        countdown: HTMLElement | null;
    }
    constructor() {
        super()
        this.freepikAttribute = `<a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpouch - www.freepik.com</a>`;
        this.bodyBackgroundSrc = '/images/background_wizard.jpg';
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

    // add won item to user's data
    addWonItem() {
        // remove spin from user account, next spin will be available at next day
        this.userData.wizardWheelSpin = false;

        // show coundown
        this.dom.countdown.parentElement.classList.remove('disabled');
        setCountdown(this.dom.countdown);
        this.dom.actionBar.innerHTML = '';

        // check what type of the won ite is and add this item to user's data and update his profile in firestore
        // user can win: gold, potion, equipment item
        if (this.userData.magicWheel.wonItem.type === 'gold') {
            this.userData.gold += Math.ceil(this.userData.guardPayout * 10);
        }
        else if (this.userData.magicWheel.wonItem.type === 'potion') {
            // set potion properties -> id and end date
            const end: Date = new Date();
            end.setHours(end.getHours() + (7 * 24));
            const newPotion: { id: string, end: Date } = {
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
        updateUserData(this.userData);
    }

    // event applied on spinBtn by which user can spin the wheel
    startSpinningEvent() {
        this.dom.spinBtn.addEventListener('click', () => {
            // check if user's backpack has available slots
            if (this.userData.backpackItems.length < 10) {
                // add animation
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

                // scroll to spinning wheel (mainly for mobile devices)
                const wheel: HTMLElement = this.dom.spinningWheel.parentElement.parentElement;
                wheel.scrollTop = wheel.scrollHeight;

                // add won item to user's account
                this.addWonItem();
            }
            else {
                this.dom.actionError.innerText = 'Your backpack is full';

                // remove this error after 3s
                setTimeout(() => {
                    this.dom.actionError.innerText = '';
                }, 3000);
            }
        });
    }

    // set graphics of available items to win
    setSpinningWheelItems() {
        this.userData.magicWheel.items.forEach((el, num) => {
            this.dom.spinningWheelItems[num].innerHTML = `<img src='${el.src}' class='spinningWheel__itemImg'/>`;
        });
    }



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
    render() {
        this.root.innerHTML = getWizardHTMLCode(this.userData);
    }
    initScripts() {
        this.setSpinningWheelItems();
        // check if user has available spin
        if (this.userData.wizardWheelSpin) {
            this.startSpinningEvent();
        }
        else {
            setCountdown(this.dom.countdown);
        }

    }
    onDataChange() {
        console.log('Data changed');
    }
}
