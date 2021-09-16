import { getGuardPaymentValue } from '../functions/getGuardPaymentValue';
import { View } from './view';
import { getGuardHTMLCode } from '../viewsHTMLCode/guard';
import { updateUserData } from '../firebase/operations';
import { textChangeRangeIsUnchanged } from 'typescript';

export class Guard extends View {

  private sliderValue: HTMLElement | null
  private inputSlider: HTMLElement | null
  private guardPayout: number
  private guardTime: number
  private dom: {
    sliderValue: HTMLElement,
    inputSlider: HTMLElement
    guardPayment: HTMLElement
    acceptBtn: HTMLButtonElement
    menu: HTMLElement,
    castleCity: HTMLElement
  }
  constructor() {
    super()
    this.guardPayout = 0
    this.guardTime = 1
    this.dom = {
      sliderValue: document.querySelector('#slider_value'),
      inputSlider: document.querySelector('#guard_input_slider'),
      guardPayment: document.querySelector('.guard__awardAmount'),
      acceptBtn: document.querySelector('.guard__acceptBtn'),
      menu: document.querySelector('#guard_menu'),
      castleCity: document.querySelector('#guard_castleCity')
    }
  }

  async render() {
    this.root.innerHTML = getGuardHTMLCode();


  }


  guardSliderEvent() {

    this.dom.inputSlider.oninput = (e) => {

      // set text inside span to notify user about selected guard time
      const input = e.target as HTMLInputElement
      // Show guard time
      this.dom.sliderValue.innerText = input.value + 'h'
      // set guard payout
       this.guardPayout = parseFloat((getGuardPaymentValue(this.userData.level) * (parseFloat(input.value) / 10) ).toFixed())
      this.dom.guardPayment.innerHTML = `Reward: <strong>${this.guardPayout}</strong>`; 
      // set guard time
      this.guardTime = parseFloat(input.value)
      
      // change style
      const styleLeft: number = parseInt(input.value) * 10;
      if (styleLeft < 50) {
        this.dom.sliderValue.style.left = styleLeft - 10 + '%'
      }
      else if (styleLeft > 50) {
        this.dom.sliderValue.style.left = styleLeft - 9 + '%'
      }
      else {
        this.dom.sliderValue.style.left = '40%'
      }

      // change progress bar
      this.dom.inputSlider.className = `field__progressBar-${input.value}`
    };
  }



  general(){
    // set default guardt payout (for 1h guard)
    this.guardPayout = parseFloat((getGuardPaymentValue(this.userData.level) * 0.1).toFixed());
    this.dom.guardPayment.innerHTML = `Reward: <strong>${this.guardPayout}</strong>`; 
  }

  eventForGuardAcceptBtn(){
    this.dom.acceptBtn.addEventListener('click', ()=> {
      if(this.userData.status === 'free'){
        // set user status to guard -> he will not be able to start new missions
        this.userData.status = 'guard';
        // set guard properties -> start, end date of guard, payout and current date 
        this.userData.guard.start = new Date();
        this.userData.guard.current = new Date();
        this.userData.guard.end = new Date();
        this.userData.guard.end.setHours(this.userData.guard.end.getHours() + this.guardTime);
        this.userData.guard.payout = this.guardPayout;
        updateUserData(this.userData);
      }
    })
  }
  checkStatus(){
    // show menu onlu when user doesnt have active guard
    if(this.userData.status === 'free'){
      this.dom.menu.className = 'guard__wrapper';
    }
    // if user have active guard show then guard panel with countdown
    else if(this.userData.status === 'guard'){
      this.dom.castleCity.className = 'guard__wrapper';
    }
    // if user have active mission hide button which is responsible for starting new guard
    else if(this.userData.status === 'mission'){
      this.dom.acceptBtn.parentElement.innerHTML = '';
    }
  }
  onDataChange(){
  }
  getDOMElements() {
    this.dom = {
      sliderValue: document.querySelector('#slider_value'),
      inputSlider: document.querySelector('#guard_input_slider'),
       guardPayment: document.querySelector('.guard__awardAmount'),
       acceptBtn: document.querySelector('.guard__acceptBtn'),
       menu: document.querySelector('#guard_menu'),
       castleCity: document.querySelector('#guard_castleCity')
    }
  }

  initScripts() {
    this.general();
    this.checkStatus();
    this.guardSliderEvent();
    this.eventForGuardAcceptBtn();
  }
}

// menu
//<a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpocket - www.freepik.com</a>

// guard
// <a href='https://www.freepik.com/vectors/book'>Book vector created by upklyak - www.freepik.com</a>