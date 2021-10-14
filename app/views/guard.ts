import { getGuardPaymentValue } from '../functions/getGuardPaymentValue';
import { View } from './view';
import { getGuardHTMLCode } from '../viewsHTMLCode/guard';
import { updateUserData } from '../firebase/operations';


export class Guard extends View {

  // amount of gold which will be added to user's account after guard end, this value 
  // is changing by input range in guardSliderEvent() Method. When the user presses button reponsible for guard start, this value
  // will be added to his data in firestore, so after guard end user will be know amout of gold which he has erned
  private guardPayout: number;
  // time of guard, changing in  by input range in guardSliderEvent() Method
  private guardTime: number;
  // guard interval, needed to remove the interval at the end of the guard
  private countdownInterval: null | ReturnType<typeof setInterval>;
  private dom: {
    // input progress bar - guardSliderEvent()
    inputProgressBar: HTMLElement | null;
    // needed to show guard time - guardSliderEvent() method
    sliderValue: HTMLElement | null;
    // input with value needed to calculate guard time and payout - guardSliderEvent() method
    inputSlider: HTMLElement | null;
    // needed to show guard payout - guardSliderEvent() and general() methods
    guardPayout: HTMLElement | null;
    // button on which function responsible for starting the guard is applied, and when user has active guard then hide this btn - eventForGuardAcceptBtn() and checkStatus() methods
    acceptBtn: HTMLButtonElement | null;
    // container with guard menu, needed to show if user doesnt have active guard - checkStatus()
    menu: HTMLElement | null;
    // container with guard countdown section, needed to show if user have active guard - checkStatus()
    castleCity: HTMLElement | null;
    // button nn which function reponsible for canceling guard is applied - cancelGuardEvent() method
    cancelGuardBtn: HTMLElement | null;
    // button on which function reponsible for ending the guard and allocating the earned gold to the user's account - cancelGuardEvent()
    summaryBtn: HTMLElement | null;
    // element which displays guard time left - guardCountdown() method
    guardTimeLeft: HTMLElement | null;
    // progress bar reponsible for displaying countdown animation - guardCountdown() method
    countdownProgressBar: HTMLElement | null;
    // container with guard summary, needed to show hime when guard's is end - guardCountdown() method
    summary: HTMLElement | null;
    // container with countdown time and progress bar needed to hide him when guard's is end - guardCountdown() method
    countdownWrapper: HTMLElement | null;
    // wrapper wchich displays earned gold after guard end - guardCountdown() method
    summaryPayout: HTMLElement | null;
    // Icon above input, needed to set styles according to selected guard's time - guardSliderEvent() method
    rangeIcon: HTMLElement | null;
  }
  constructor() {
    super()
    this.guardPayout = 0;
    this.guardTime = 1;
    this.countdownInterval = null;
    this.dom = {
      inputProgressBar: document.querySelector('.progressBar'),
      sliderValue: document.querySelector('#slider_value'),
      inputSlider: document.querySelector('#guard_input_slider'),
      guardPayout: document.querySelector('.guard__awardAmount'),
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
      countdownWrapper: document.querySelector('#guard_countdown_elements'),
      rangeIcon: document.querySelector('.rangeIcon')
    }
  }

  // method that applied function on range input, reponsbile for changing guardPayout, guardTime values and setting of input progress bar styles
  guardSlider() {
    this.dom.inputSlider.oninput = (e) => {
      // set text inside span to notify user about selected guard time
      const input: HTMLInputElement = e.target as HTMLInputElement;
      // Show guard time
      this.dom.sliderValue.innerText = input.value + 'h';
      // set guard payout
      this.guardPayout = parseFloat((getGuardPaymentValue(this.userData.level) * (parseFloat(input.value) / 10)).toFixed());
      this.dom.guardPayout.innerHTML = `Reward: <strong>${this.guardPayout}</strong>`;
      // set guard time
      this.guardTime = parseFloat(input.value);

      // change style
      const styleLeft: number = parseInt(input.value) * 10;
      if (styleLeft < 50) {
        this.dom.sliderValue.style.left = styleLeft - 10 + '%';
      }
      else if (styleLeft > 50) {
        this.dom.sliderValue.style.left = styleLeft - 9 + '%';
      }
      else {
        this.dom.sliderValue.style.left = '40%';
      }

      // change style
      const styleLeft2: number = parseInt(input.value) * 10;
      if (styleLeft < 50) {
        this.dom.rangeIcon.style.left = styleLeft2 - 10 + '%';
      }
      else if (styleLeft > 50) {
        this.dom.rangeIcon.style.left = styleLeft2 - 9 + '%';
      }
      else {
        this.dom.rangeIcon.style.left = '40%';
      }

      // change progress bar
      this.dom.inputProgressBar.className = `progressBar progressBar-${input.value}`;
    };
  }

  // method that applied function on acceptBtn which is reponsible to start new guard, update user data in firestore and show countdown section
  startGuard() {
    this.dom.acceptBtn.addEventListener('click', () => {
      // avoiding situation when user has mission and guard at the same time
      if (this.userData.status === 'free') {
        // set user status to guard -> he will not be able to start new missions
        this.userData.status = 'guard';
        // set guard properties -> start, end date of guard, payout and current date 
        this.userData.guard.start = new Date();
        this.userData.guard.current = new Date();
        this.userData.guard.end = new Date();
        this.userData.guard.end.setHours(this.userData.guard.end.getHours() + this.guardTime);
        this.userData.guard.payout = this.guardPayout;
        // save selected guard data into user's data in firestore -> function in onDataChange() method will show countdown section
        updateUserData(this.userData);
      }
    })
  }

  // setting up an interval
  guardCountdown() {
    // remove summary
    this.dom.summary.classList.add('disabled');
    const guardStart: number = new Date().getTime();
    const guardEnd: number = this.userData.guard.end.getTime();

    // milliseconds between start and end of guard
    const diffMs: number = (guardEnd - guardStart);
    const minutes: number = (diffMs / 1000) / 60;

    // set the countdown date
    const target_date = new Date().getTime() + ((minutes * 60) * 1000);

    // set the interval in order to remove him after guard is end
    this.countdownInterval = setInterval(() => {
      // variables for time units
      let hours, minutes, seconds;

      // find the amount of "seconds" between now and target
      const current_date = new Date().getTime();
      let seconds_left: number = (target_date - current_date) / 1000;

      if (seconds_left >= 0) {
        this.dom.countdownWrapper.classList.remove('disabled');

        // calculate time 
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
        this.dom.countdownProgressBar.style.width = result;

      }
      else {
        // display earned gold
        this.dom.summaryPayout.innerText = `${this.userData.guard.payout}`;
        // when countdown ends show summary and hide countdown elements
        this.dom.summary.classList.remove('disabled');
        this.dom.countdownWrapper.classList.add('disabled');
        // reset coundown time
        this.dom.guardTimeLeft.innerText = ``;
        // clear interval
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  // get gold for guard, and update user's data in firestore, also redirect user to guard menu
  getGuardPayout() {
    this.dom.summaryBtn.addEventListener('click', () => {
      if (this.userData.guard.payout !== null && this.userData.guard.end.getTime() <= new Date().getTime()) {
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
        // update user's data in firestore - function in onDataChange() method will show guard menu section
        updateUserData(this.userData);
      }
    })
  }

  // cancel actual guard and clear guard status in user's data in firestore
  cancelGuardEvent() {
    this.dom.cancelGuardBtn.addEventListener('click', () => {
      // clear user status
      this.userData.status = 'free';
      // reset coundown time
      this.dom.guardTimeLeft.innerText = ``;
      // clear interval
      clearInterval(this.countdownInterval);
      // clear guard data 
      this.userData.guard = {
        start: null,
        current: null,
        payout: null,
        end: null
      }
      // update user's data in firestore - function in onDataChange() method will show guard menu section
      updateUserData(this.userData);
    })
  }

  // method that checks user's status, if he has active mission then hide button reposnible for starting new guard,
  // else if he has active guard then show countdown section
  // else if he has no actiov mission or guard then show guard menu
  checkStatus() {
    // show menu onlu when user doesnt have active guard
    if (this.userData.status === 'free') {
      this.dom.menu.className = 'guard__wrapper';
      this.dom.castleCity.className = 'guard__wrapper disabled';
      this.countdownInterval !== null && clearInterval(this.countdownInterval);
    }
    // if user have active guard show then guard panel with countdown
    else if (this.userData.status === 'guard') {
      this.countdownInterval !== null && clearInterval(this.countdownInterval);
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

  // general actions
  general() {
    // set default guardt payout (for 1h guard)
    this.guardPayout = parseFloat((getGuardPaymentValue(this.userData.level) * 0.1).toFixed());
    this.dom.guardPayout.innerHTML = `Reward: <strong>${this.guardPayout}</strong>`;
  }



  render() {
    this.root.innerHTML = getGuardHTMLCode();
  }
  onDataChange() {
    this.checkStatus();
  }
  getDOMElements() {
    this.dom = {
      inputProgressBar: document.querySelector('.progressBar'),
      sliderValue: document.querySelector('#slider_value'),
      inputSlider: document.querySelector('#guard_input_slider'),
      guardPayout: document.querySelector('.guard__awardAmount'),
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
      countdownWrapper: document.querySelector('#guard_countdown_elements'),
      rangeIcon: document.querySelector('.rangeIcon')
    }
  }
  initScripts() {
    this.checkStatus();
    this.general();
    this.guardSlider();
    this.startGuard();
    this.cancelGuardEvent();
    this.getGuardPayout();
  }
}

// menu
//<a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpocket - www.freepik.com</a>

// guard
// <a href='https://www.freepik.com/vectors/book'>Book vector created by upklyak - www.freepik.com</a>