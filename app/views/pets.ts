import { getPetsHTMLCode } from '../viewsHTMLCode/pets';
import { View } from './view';
import { PetData } from '../types';
import { petsData } from '../properties/pets/petsData';
import { updateUserData } from '../firebase/operations';
export class Pets extends View {


  private dom: {
    rentBtns: NodeListOf<HTMLButtonElement> | null
    goldAmount: HTMLElement | null
    goldSubtract: HTMLElement | null
    petsWrappers: NodeListOf<HTMLButtonElement> | null
  }
  constructor() {
    super()
    this.dom = {
      rentBtns: document.querySelectorAll('.pets__buy button'),
      goldAmount: document.querySelector('.pets__userGoldAmount'),
      goldSubtract: document.querySelector('.pets__goldSubtract'),
      petsWrappers: document.querySelectorAll('.pets__item')
    }
  }

  async render() {
    this.root.innerHTML = getPetsHTMLCode(this.userData);;
  }


  setPetRentEvents() {
    this.dom.rentBtns.forEach(el => {

      const pet: PetData = petsData[petsData.findIndex(e => e.id === el.dataset.petId)]
      const cost: number = Math.floor(pet.initialCost * this.userData.guardPayout);
      console.log(el.name, cost)
      el.addEventListener('click', () => {

        if (this.userData.gold >= cost) {
          // subtract gold
          this.userData.gold -= cost;
          // set user pet
          this.userData.pet = pet
          updateUserData(this.userData);
          // add gold subtract animation
          this.dom.goldSubtract.innerText = `-${cost}`
          this.dom.goldSubtract.classList.remove('disabled')
          // remove this animation after 1.5s
          setTimeout(() => {
            this.dom.goldSubtract.innerText = ``
            this.dom.goldSubtract.classList.add('disabled')
          }, 1500)
        }



      }

      )
    })
    console.log(this.userData.gold)
  }

  setStyles() {

    this.dom.rentBtns.forEach(el => {
      const pet: PetData = petsData[petsData.findIndex(e => e.id === el.dataset.petId)]
      const cost: number = Math.floor(pet.initialCost * this.userData.guardPayout);
      // reset styles
      el.className = ''
      // add new style which is according to user has enough gold
      el.classList.add(this.userData.gold >= cost ? 'pets__buy-afford' : 'pets__buy-notAfford')
    })

    this.dom.petsWrappers.forEach(el => {
      el.classList.remove('pets__current')
      if(this.userData.pet !== null){
          this.userData.pet.name === el.dataset.petName && el.classList.add('pets__current')
      }
      else{
        
      }
    })

  }


  setGoldAmount() {
    this.dom.goldAmount.innerText = `${this.userData.gold}`
  }
  onDataChange() {
    this.setStyles();
    this.setGoldAmount();
  }
  getDOMElements() {
    this.dom = {
      rentBtns: document.querySelectorAll('.pets__buy button'),
      goldAmount: document.querySelector('.pets__userGoldAmount'),
      goldSubtract: document.querySelector('.pets__goldSubtract'),
      petsWrappers: document.querySelectorAll('.pets__item')
    }
  }

  initScripts() {
    this.setStyles();
    this.setPetRentEvents();
  }
}

// <a href='https://www.freepik.com/vectors/background'>Background vector created by upklyak - www.freepik.com</a>