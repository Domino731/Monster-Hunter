import { getSpecificUserHTMLCode } from '../../viewsHTMLCode/specificUser';
import { UserData, SearchedUserData, ShopItem } from '../../types';
import { getEquipmentLabel } from './getEquipmentLabel';
import { potionsData } from '../../properties/shop/potions';
import { getPotionLabel } from './getPotionLabel';
export class SearchedUser {
  private root: HTMLElement
  private currentUser: UserData
  private searchedUser: SearchedUserData
  private dom: {
    potionLabel: HTMLElement
    general: {
      potionImgFirst: HTMLElement | null
      potionImgSecond: HTMLElement | null
    }
    equipmentSlots: NodeListOf<Element>
    equipmentLabel: {
      root: HTMLElement | null
      labelWrapper: HTMLElement | null
    }

  }

  /**
   * 
   * @param root - needed to inject html code
   * @param currentUser - data of current logged user, needed to add or remove a friend from current user data in firestore
   * @param searchedUser - data of searched user, based on this data view will be rendered, needed to know what user is to be added to friends
   */
  constructor(root: HTMLElement, currentUser: UserData, searchedUser: SearchedUserData) {
    this.root = root;
    this.currentUser = currentUser;
    this.searchedUser = searchedUser;
    this.dom = {
      potionLabel: document.querySelector('.profile__generalLabelWrapper'),
      equipmentSlots: document.querySelectorAll('.profile__equipment div[data-slot-name]'),
      equipmentLabel: {
        root: document.querySelector('#specificUser_equipment__item_label'),
        labelWrapper: document.querySelector('#specificUser_equipment_label_wrapper')
      },
      general: {
        potionImgFirst: document.querySelector('#profile_general_potion_first .profile__generalImg'),
        potionImgSecond: document.querySelector('#profile_general_potion_second .profile__generalImg'),
      },
    }
    this.init();
  }

  render() {
    this.root.innerHTML = getSpecificUserHTMLCode(this.searchedUser);
  }

  labelForEquipmentEvent() {

    let toogleLabel;
    let currentItem: ShopItem | null = null;

    // show label on mouse hover event 
    this.dom.equipmentSlots.forEach(el => el.addEventListener('mouseover', () => {
      // prevent of label hiding 
      clearInterval(toogleLabel)
      const element: HTMLElement = el.firstElementChild as HTMLElement;
      // hide backpack label
      //   this.dom.backpackLabel.root.classList.add('disabled');
      // reset equipement label styles
      this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled';

      //find specific item, in order to create label of this item
      currentItem = this.searchedUser.equipmentItems[this.searchedUser.equipmentItems.findIndex(el => el.id === element.dataset.currentItemId)];

      // if equipement slot has no item inside then hide label
      if (element.dataset.currentItemId === undefined) {
        this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
      }
      // set the label
      if (currentItem !== undefined && element.dataset.currentItemId !== undefined) {
        this.dom.equipmentLabel.root.classList.add(currentItem.rarity === 'legendary' ? 'profile__itemSpecs-legendary' : 'profile__itemSpecs-common')
        this.dom.equipmentLabel.root.classList.add(`profile__itemSpecs-${currentItem.type}`)
        this.dom.equipmentLabel.labelWrapper.innerHTML = getEquipmentLabel(currentItem);
        this.dom.equipmentLabel.root.classList.remove('disabled')
      }


    }))

    // on mouse leave remove label with delay -> after 1s
    this.dom.equipmentSlots.forEach(el => el.addEventListener('mouseleave', () => {
      toogleLabel = setInterval(() => {
        this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
      }, 1000);
    }));

    // keep displaying label when user  focus is on label
    this.dom.equipmentLabel.root.addEventListener('mouseover', () => {
      clearInterval(toogleLabel);
    });

    // hide label when focus loss
    this.dom.equipmentLabel.root.addEventListener('mouseleave', () => {
      this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled';
    });

  }


  // events responsible for potion label
  labelForPotions() {

    // find potions
    const firstPotion: ShopItem | undefined = potionsData[potionsData.findIndex(el => this.searchedUser.potions.first)];
    const secondPotion: ShopItem | undefined = potionsData[potionsData.findIndex(el => this.searchedUser.potions.second)];
    // check if user have potion
    if (firstPotion !== undefined) {
      this.dom.general.potionImgFirst.addEventListener('mouseover', () => {
        this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled';
        this.dom.potionLabel.innerHTML = getPotionLabel(firstPotion, 1);
      });
      this.dom.general.potionImgFirst.addEventListener('mouseleave', () => {

        this.dom.potionLabel.innerHTML = '';
      })
    }
    if (secondPotion !== undefined) {
      this.dom.general.potionImgSecond.addEventListener('mouseover', () => {
        this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled';
        this.dom.potionLabel.innerHTML = getPotionLabel(secondPotion, 2);
      });
      this.dom.general.potionImgSecond.addEventListener('mouseleave', () => {
        this.dom.potionLabel.innerHTML = '';
      })
    }
  }











  getDOMElements() {
    this.dom = {
      potionLabel: document.querySelector('.profile__generalLabelWrapper'),
      equipmentSlots: document.querySelectorAll('.profile__equipment div[data-slot-name]'),
      equipmentLabel: {
        root: document.querySelector('#specificUser_equipment__item_label'),
        labelWrapper: document.querySelector('#specificUser_equipment_label_wrapper')
      },
      general: {
        potionImgFirst: document.querySelector('#profile_general_potion_first .profile__generalImg'),
        potionImgSecond: document.querySelector('#profile_general_potion_second .profile__generalImg'),
      },
    }
  }


  initScripts() {
    this.labelForEquipmentEvent();
    this.labelForPotions();
  }

  init() {
    this.render();
    this.getDOMElements();
    this.initScripts();
  }
}