import { getGuardPaymentValue } from '../functions/getGuardPaymentValue';
import { View } from './view';
import { getGuardHTMLCode } from '../viewsHTMLCode/guard';
export class Guard extends View {

  private sliderValue: HTMLElement | null
  private inputSlider: HTMLElement | null
  private guardPayment: string | number
  private dom: {
    sliderValue: HTMLElement,
    inputSlider: HTMLElement
    guardPayment: HTMLElement
  }
  constructor() {
    super()
    this.guardPayment = 0
    this.dom = {
      sliderValue: document.querySelector('#slider_value'),
      inputSlider: document.querySelector('#guard_input_slider'),
      guardPayment: document.querySelector('.guard__awardAmount')
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
      // set guard payment
       this.guardPayment = (getGuardPaymentValue(this.userData.level) * (parseFloat(input.value) / 10) ).toFixed()
      this.dom.guardPayment.innerHTML = `Reward: <strong>${this.guardPayment}</strong>`; 
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
      this.dom.inputSlider.className = `field__progressBar-${input.value}`


      console.log(input.value)
    };
  }



  general(){
    // set default guard payment (for 1h guard)
    this.guardPayment = (getGuardPaymentValue(this.userData.level) * 0.1).toFixed();
    this.dom.guardPayment.innerHTML = `Reward: <strong>${this.guardPayment}</strong>`; 
  }
  onDataChange(){
  }
  getDOMElements() {
    this.dom = {
      sliderValue: document.querySelector('#slider_value'),
      inputSlider: document.querySelector('#guard_input_slider'),
       guardPayment: document.querySelector('.guard__awardAmount')
    }
  }

  initScripts() {
    this.general();
    this.guardSliderEvent();
  }
}

//<a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpocket - www.freepik.com</a>