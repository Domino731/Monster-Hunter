import { getPetsHTMLCode } from '../viewsHTMLCode/pets';
import { View } from './view';
import { PetData } from '../types';
import { petsData } from '../properties/pets/petsData';
import { updateUserData } from '../firebase/operations';
export class Pets extends View {

  private countdownInterval: null | ReturnType<typeof setInterval>;
  private dom: {
    rentBtns: NodeListOf<Element>
    rent: {
      cat: HTMLButtonElement;
      scorpion: HTMLButtonElement;
      cheetah: HTMLButtonElement;
      dragon: HTMLElement;
    };
    goldAmount: HTMLElement | null;
    goldSubtract: HTMLElement | null;
    petsWrappers: NodeListOf<Element> | null;
    countdownWrappers: NodeListOf<Element> | null;
  }
  constructor() {
    super()
    this.countdownInterval = null
    this.dom = {
      rentBtns: document.querySelectorAll('.pets__buy button'),
      rent: {
        cat: document.querySelector(`.pets__buy button[data-pet-name='cat']`),
        scorpion:  document.querySelector(`.pets__buy button[data-pet-name='scorpion']`),
        cheetah:  document.querySelector(`.pets__buy button[data-pet-name='cheetah']`),
        dragon:  document.querySelector(`.pets__buy button[data-pet-name='dragon']`)
      },
      goldAmount: document.querySelector('.pets__userGoldAmount'),
      goldSubtract: document.querySelector('.pets__goldSubtract'),
      petsWrappers: document.querySelectorAll('.pets__item'),
      countdownWrappers: document.querySelectorAll('.pets__countdownWrapper')
    }
  }

  async render() {
    this.root.innerHTML = getPetsHTMLCode(this.userData);;
  }

  setCountdown() {

    // remove previous countdown
    clearInterval(this.countdownInterval);

    // hide all countdown wrappers
    this.dom.countdownWrappers.forEach(el => {
      const element: HTMLElement = el as HTMLElement;
      element.classList.add('disabled');
      element.innerText = '';
    })

    if (this.userData.pet !== null) {
      // find countdown wrapper for specific pet
      const countdownWrapper: HTMLElement = Array.from(this.dom.countdownWrappers).find(node => {
        const element: HTMLElement = node as HTMLElement;
        return element.dataset.petCountdownId === this.userData.pet.id;
      }) as HTMLElement;

      const start: any = new Date();
      const rentEnd: any = this.userData.pet.rentEnd;
      // milliseconds between start and end of guard
      const diffMs = (rentEnd - start);
      const minutes = Math.floor((diffMs / 1000) / 60);
      // set the countdown date
      const target_date = new Date().getTime() + ((minutes * 60) * 1000);

      // start a countdown 
      this.countdownInterval = setInterval(() => {
        // variables for time units
        let hours, minutes, seconds;
        // find the amount of "seconds" between now and target
        const current_date = new Date().getTime();
        let seconds_left: any = (target_date - current_date) / 1000;


        if (seconds_left >= 0) {
          seconds_left = seconds_left % 86400;
          hours = parseInt((seconds_left / 3600).toString());
          seconds_left = seconds_left % 3600;
          minutes = parseInt((seconds_left / 60).toString());
          seconds = parseInt((seconds_left % 60).toString());


          // differences between current and end rent date
          const diffDays = Math.ceil(Math.abs(rentEnd - start) / (1000 * 60 * 60 * 24));
          // set time
          if (diffDays !== 0) {
            diffDays % 2 === 0 ?
              countdownWrapper.innerText = `${diffDays} Day left`
              :
              countdownWrapper.innerText = `${diffDays} Days left`;
          }
          else {
            countdownWrapper.innerText = `${hours !== 0 ? hours + 'h : ' : ''} ${minutes}m : ${seconds}s left`;
          }

        }

        else {
          // remove pet
          this.userData.pet = null;
          clearInterval(this.countdownInterval);
          updateUserData(this.userData).then(()=> {
            location.reload();
          })
        }
        countdownWrapper.classList.remove('disabled');
      }, 1000)
      


    }
  }

  setNewPet(petName : 'cat' | 'scorpion' | 'cheetah' | 'dragon'){
      const pet: PetData = petsData[petsData.findIndex(el => el.name === petName)]
      const cost: number = Math.floor(pet.initialCost * this.userData.guardPayout);


      const setNewPet = () => {
            // subtract gold
            this.userData.gold -= cost;
            // set user pet
            this.userData.pet = pet;
            this.userData.pet.rentEnd = new Date();
            this.userData.pet.rentEnd.setHours(this.userData.pet.rentEnd.getHours() + (7 * 24));
            updateUserData(this.userData);
            // add gold subtract animation
            this.dom.goldSubtract.innerText = `-${cost}`;
            this.dom.goldSubtract.classList.remove('disabled');
            // remove this animation after 1.5s
            setTimeout(() => {
              this.dom.goldSubtract.innerText = ``
              this.dom.goldSubtract.classList.add('disabled');
            }, 1500);
        };
      


        if (this.userData.gold >= cost) {
          if (this.userData.pet === null) {
            setNewPet();
          }
          else {
            // check if user already has a pet check if rent time is no exceed over 100 days
            // differences between current and end rent date
            const end: number = this.userData.pet.rentEnd.getTime();
            const start: number = new Date().getTime();
            const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
            console.log(diffDays)
            if (diffDays <= 100 && this.userData.pet.id === pet.id) {
              this.userData.gold -= cost;
              this.userData.pet.rentEnd.setHours(this.userData.pet.rentEnd.getHours() + (7 * 24));
              updateUserData(this.userData)
            }
            else if (diffDays <= 100 && this.userData.pet.id !== pet.id) {
              setNewPet();
            }
            else {
              window.alert('You have reached maxiumum rent time.')
            }
          }
        };
  }
  setPetRentEvents() {
     this.dom.rent.cat.addEventListener('click', () => this.setNewPet('cat'));
     this.dom.rent.scorpion.addEventListener('click', () => this.setNewPet('scorpion'));
     this.dom.rent.cheetah.addEventListener('click', () => this.setNewPet('cheetah'));
     this.dom.rent.dragon.addEventListener('click', () => this.setNewPet('dragon'));
  }

  setStyles() {

    this.dom.rentBtns.forEach(el => {
      const button : HTMLButtonElement = el as HTMLButtonElement
      const pet: PetData = petsData[petsData.findIndex(e => e.name === button.dataset.petName)];
      const cost: number = Math.floor(pet.initialCost * this.userData.guardPayout);
      // reset styles
      el.className = '';
      // add new style which is according to user has enough gold
      el.classList.add(this.userData.gold >= cost ? 'pets__buy-afford' : 'pets__buy-notAfford');
    })

    this.dom.petsWrappers.forEach((el) => {
      const element = el as HTMLElement;
      element.classList.remove('pets__current');
      if (this.userData.pet !== null) {
        this.userData.pet.name === element.dataset.petName && el.classList.add('pets__current');
      }
      else {

      }
    })

  }

  setGoldAmount() {
    this.dom.goldAmount.innerText = `${this.userData.gold}`
  }
  onDataChange() {
    this.setStyles();
    this.setCountdown();
    this.setGoldAmount();
  }

  getDOMElements() {
    this.dom = {
      rentBtns: document.querySelectorAll('.pets__buy button'),
      rent: {
        cat: document.querySelector(`.pets__buy button[data-pet-name='cat']`),
        scorpion:  document.querySelector(`.pets__buy button[data-pet-name='scorpion']`),
        cheetah:  document.querySelector(`.pets__buy button[data-pet-name='cheetah']`),
        dragon:  document.querySelector(`.pets__buy button[data-pet-name='dragon']`)
      },
      goldAmount: document.querySelector('.pets__userGoldAmount'),
      goldSubtract: document.querySelector('.pets__goldSubtract'),
      petsWrappers: document.querySelectorAll('.pets__item'),
      countdownWrappers: document.querySelectorAll('.pets__countdownWrapper')
    }
  }




  initScripts() {
    this.setCountdown();
    this.setStyles();
    this.setPetRentEvents();
  }
}
// setPetRentEvents() {
//   this.dom.rentBtns.forEach(el => {

//     const pet: PetData = petsData[petsData.findIndex(e => e.id === el.dataset.petId)]
//     const cost: number = Math.floor(pet.initialCost * this.userData.guardPayout);



    
//     el.addEventListener('click', () => {


//       const setNewPet = () => {
//           // subtract gold
//           this.userData.gold -= cost;
//           // set user pet
//           this.userData.pet = pet;
//           this.userData.pet.rentEnd = new Date();
//           this.userData.pet.rentEnd.setHours(this.userData.pet.rentEnd.getHours() + (7 * 24));
//           updateUserData(this.userData);
//           // add gold subtract animation
//           this.dom.goldSubtract.innerText = `-${cost}`;
//           this.dom.goldSubtract.classList.remove('disabled');
//           // remove this animation after 1.5s
//           setTimeout(() => {
//             this.dom.goldSubtract.innerText = ``
//             this.dom.goldSubtract.classList.add('disabled');
//           }, 1500);
//       };


//       if (this.userData.gold >= cost) {
//         if (this.userData.pet === null) {
//           setNewPet();
//         }
//         else {
//           // check if user already has a pet check if rent time is no exceed over 100 days
//           // differences between current and end rent date
//           const end: number = this.userData.pet.rentEnd.getTime();
//           const start: number = new Date().getTime();
//           const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
//           console.log(diffDays)
//           if (diffDays <= 100 && this.userData.pet.id === pet.id) {
//             this.userData.gold -= cost;
//             this.userData.pet.rentEnd.setHours(this.userData.pet.rentEnd.getHours() + (7 * 24));
//             updateUserData(this.userData)
//           }
//           else if (diffDays <= 100 && this.userData.pet.id !== pet.id) {
//             setNewPet();
//           }
//           else {
//             window.alert('You have reached maxiumum rent time.')
//           }
//         }
//       };
//     }

//     );
//   });
// }
// <a href='https://www.freepik.com/vectors/background'>Background vector created by upklyak - www.freepik.com</a>