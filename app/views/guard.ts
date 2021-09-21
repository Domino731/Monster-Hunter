import { getGuardPaymentValue } from '../functions/getGuardPaymentValue';
import { View } from './view';
import { getGuardHTMLCode } from '../viewsHTMLCode/guard';
import { updateUserData } from '../firebase/operations';
import { textChangeRangeIsUnchanged } from 'typescript';

export class Guard extends View {

  private guardPayout: number
  private guardTime: number
  private countdownInterval: null | ReturnType<typeof setInterval>
  private dom: {
    sliderValue: HTMLElement | null
    inputSlider: HTMLElement | null
    guardPayment: HTMLElement | null
    acceptBtn: HTMLButtonElement | null
    menu: HTMLElement | null
    castleCity: HTMLElement | null
    cancelGuardBtn: HTMLElement | null
    summaryBtn: HTMLElement | null
    guardTimeLeft: HTMLElement | null
    countdownProgressBar: HTMLElement | null
    summary: HTMLElement | null
    countdownWrapper: HTMLElement | null
    summaryPayout: HTMLElement | null
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
      castleCity: document.querySelector('#guard_castleCity'),
      cancelGuardBtn: document.querySelector('.countdown__cancelBtn'),
      summaryBtn: document.querySelector('.guard__summaryBtn'),
      guardTimeLeft: document.querySelector('.countdown__time'),
      countdownProgressBar: document.querySelector('.countdown__bar'),
      summary: document.querySelector('.guard__summary'),
      summaryPayout: document.querySelector('.guard__summaryPayout')
      ,
      countdownWrapper: document.querySelector('#guard_countdown_elements')
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
      this.guardPayout = parseFloat((getGuardPaymentValue(this.userData.level) * (parseFloat(input.value) / 10)).toFixed())
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



  general() {
    // set default guardt payout (for 1h guard)
    this.guardPayout = parseFloat((getGuardPaymentValue(this.userData.level) * 0.1).toFixed());
    this.dom.guardPayment.innerHTML = `Reward: <strong>${this.guardPayout}</strong>`;
  }

  eventForGuardAcceptBtn() {
    this.dom.acceptBtn.addEventListener('click', () => {
      if (this.userData.status === 'free') {
        console.log(1)
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
      this.checkStatus();

    })
  }

  guardCountdown() {
    this.dom.summary.classList.add('disabled')
    const guardStart: any = new Date();
    const guardEnd: any = this.userData.guard.end;

    // milliseconds between start and end of guard
    const diffMs = (guardEnd - guardStart);

    const minutes = Math.floor((diffMs / 1000) / 60);

    // set the countdown date
    const target_date = new Date().getTime() + ((minutes * 60) * 1000);

    this.countdownInterval = setInterval(() => {

      let hours, minutes, seconds; // variables for time units

      // find the amount of "seconds" between now and target
      const current_date = new Date().getTime();
      let seconds_left: any = (target_date - current_date) / 1000;

      if (seconds_left >= 0) {
        this.dom.countdownWrapper.classList.remove('disabled')
        seconds_left = seconds_left % 86400;

        hours = parseInt((seconds_left / 3600).toString());
        seconds_left = seconds_left % 3600;

        minutes = parseInt((seconds_left / 60).toString());
        seconds = parseInt((seconds_left % 60).toString());

        // set time
        this.dom.guardTimeLeft.innerText = `${hours !== 0 ? hours + 'h : ' : ''} ${minutes}m : ${seconds}s`;

        // set progress bar
        const start: number = this.userData.guard.start.getTime();
        const end: number = this.userData.guard.end.getTime(); 
        const today: number = new Date().getTime();

        const total = end - start;
        const progress = today - start;

        const result: string = Math.round(progress / total * 100) + "%";
        this.dom.countdownProgressBar.style.width = result
      }
      else {
        this.dom.summaryPayout.innerText = `${this.userData.guard.payout}`
        // when countdown ends show summary and hide countdown elements
        this.dom.summary.classList.remove('disabled');
        this.dom.countdownWrapper.classList.add('disabled')
        // reset coundown time
        this.dom.guardTimeLeft.innerText = ``;
        // clear interval
        clearInterval(this.countdownInterval)
      }


    }, 1000)
  }

  // get gold for guard, and update user's data in firestore, also redirect user to guard menu
  getGuardPayout() {
    this.dom.summaryBtn.addEventListener('click', () => {
      if (this.userData.guard.payout !== null) {
        // set the gold amount
        this.userData.gold += this.userData.guard.payout;
        // clear guard
        this.userData.guard = {
          end: null,
          start: null,
          current: null,
          payout: null
        };
        // clear user status
        this.userData.status = 'free';
        // update user's data in firestore
        updateUserData(this.userData);
      }
    })
  }


  // cancel actual guard and clear guard status in user's data in firestore
  cancelGuardEvent() {
    this.dom.cancelGuardBtn.addEventListener('click', () => {
      this.userData.status = 'free';
      this.userData.guard = {
        start: null,
        current: null,
        payout: null,
        end: null
      }
      updateUserData(this.userData)
    })
  }
  checkStatus() {
    // show menu onlu when user doesnt have active guard
    if (this.userData.status === 'free') {
      this.dom.menu.className = 'guard__wrapper';
      this.dom.castleCity.className = 'guard__wrapper disabled';
      this.countdownInterval !== null && clearInterval(this.countdownInterval)
    }
    // if user have active guard show then guard panel with countdown
    else if (this.userData.status === 'guard') {
      this.countdownInterval !== null && clearInterval(this.countdownInterval)
      this.dom.menu.className = 'guard__wrapper disabled';
      this.dom.castleCity.className = 'guard__wrapper';
      this.guardCountdown();
    }
    // if user have active mission hide button which is responsible for starting new guard
    else if (this.userData.status === 'mission') {
      this.dom.menu.className = 'guard__wrapper';
      this.dom.castleCity.className = 'guard__wrapper disabled';
      this.dom.acceptBtn.parentElement.innerHTML = '';
    }
  }
  onDataChange() {
    this.checkStatus();
  }
  getDOMElements() {
    this.dom = {
      sliderValue: document.querySelector('#slider_value'),
      inputSlider: document.querySelector('#guard_input_slider'),
      guardPayment: document.querySelector('.guard__awardAmount'),
      acceptBtn: document.querySelector('.guard__acceptBtn'),
      menu: document.querySelector('#guard_menu'),
      castleCity: document.querySelector('#guard_castleCity'),
      cancelGuardBtn: document.querySelector('.countdown__cancelBtn'),
      summaryBtn: document.querySelector('.guard__summaryBtn'),
      guardTimeLeft: document.querySelector('.countdown__time'),
      countdownProgressBar: document.querySelector('.countdown__progressBar'),
      summary: document.querySelector('.guard__summary'),
      summaryPayout: document.querySelector('.guard__summaryPayout')
      ,
      countdownWrapper: document.querySelector('#guard_countdown_elements')
    }
  }

  initScripts() {
    this.general();
    this.checkStatus();
    this.guardSliderEvent();
    this.eventForGuardAcceptBtn();
    this.cancelGuardEvent();
    this.getGuardPayout();
  }
}

// menu
//<a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpocket - www.freepik.com</a>

// guard
// <a href='https://www.freepik.com/vectors/book'>Book vector created by upklyak - www.freepik.com</a>