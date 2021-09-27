import { getSpecificUserHTMLCode } from '../../viewsHTMLCode/specificUser';
import { UserData, SearchedUserData, ShopItem, FullUserStats, Conversation, CurrentMission } from '../../types';
import { getEquipmentLabel } from './getEquipmentLabel';
import { potionsData } from '../../properties/shop/potions';
import { getPotionLabel } from './getPotionLabel';
import { updateUserData } from '../../firebase/operations';
import { db, auth } from '../../firebase/index';
export class SearchedUser {
  private root: HTMLElement
  private currentUser: UserData
  private searchedUser: SearchedUserData
  private dom: {
    potionLabel: HTMLElement
    general: {
      wrapper: HTMLElement
      potionImgFirst: HTMLElement | null
      potionImgSecond: HTMLElement | null
    }
    switch: HTMLImageElement
    friendAction: HTMLImageElement
    description: HTMLElement
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
      switch: document.querySelector('#searched_user_switch'),
      friendAction: document.querySelector('#searched_user_friend_action'),
      description: document.querySelector('.profile__description'),
      potionLabel: document.querySelector('.profile__generalLabelWrapper'),
      equipmentSlots: document.querySelectorAll('.profile__equipment div[data-slot-name]'),
      equipmentLabel: {
        root: document.querySelector('#specificUser_equipment__item_label'),
        labelWrapper: document.querySelector('#specificUser_equipment_label_wrapper')
      },
      general: {
        wrapper: document.querySelector('#searched_user_general'),
        potionImgFirst: document.querySelector('#profile_general_potion_first .profile__generalImg'),
        potionImgSecond: document.querySelector('#profile_general_potion_second .profile__generalImg'),
      },
    }
    this.init();
  }

  render() {
    this.root.innerHTML = getSpecificUserHTMLCode(this.currentUser.friends, this.searchedUser);
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

  async createChat() {
    const conversation: Conversation = {
      messages: [],
      createdAt: new Date,
      participants: [`${auth.currentUser.uid}`, `${this.searchedUser.id}`],
      updatedAt: new Date,
      recipientId: this.searchedUser.id
    }


    await db.collection('chat').doc(`${auth.currentUser.uid}`).collection('conversations').add(conversation)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  async deleteChat() {
     await db.collection('chat')
    .doc(`${auth.currentUser.uid}`)
    .collection('conversations')
    .where('recipientId', '==', `${this.searchedUser.id}`)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    })
    .catch(err => console.log(err))
  }


  // add or remove searched user to friends
  addOrRemoveFriendEvent() {
    this.dom.friendAction.addEventListener('click', () => {
     
      // index which is needed to check if user already has this searched user in friends
      const friendIndex: number = this.currentUser.friends.findIndex(el => el.id === this.searchedUser.id);
      if (friendIndex < 0) {
        const newFriend: { nick: string, id: string } = {
          nick: this.searchedUser.nick,
          id: this.searchedUser.id
        };
        this.currentUser.friends.push(newFriend);
        this.dom.friendAction.src = './images/active_friend.png';
        this.createChat();
        updateUserData(this.currentUser);


      }
      else {
        this.currentUser.friends.splice(friendIndex, 1);
        this.dom.friendAction.src = './images/add_friend.png';
        this.deleteChat();
        updateUserData(this.currentUser);
      }
    });
  }

  // changing friend icon on mouser hover and leave
  changeFriendIconEvents() {
    this.dom.friendAction.addEventListener('mouseover', () => {
      // index which is needed to check if user already has this searched user in friends
      const friendIndex: number = this.currentUser.friends.findIndex(el => el.id === this.searchedUser.id);
      if (friendIndex >= 0) {
        this.dom.friendAction.src = './images/remove_friend.png';
        this.dom.friendAction.title = 'Remove friend';
      }

    })
    this.dom.friendAction.addEventListener('mouseleave', () => {
      // index which is needed to check if user already has this searched user in friends
      const friendIndex: number = this.currentUser.friends.findIndex(el => el.id === this.searchedUser.id);
      if (friendIndex >= 0) {
        this.dom.friendAction.src = './images/active_friend.png';
        this.dom.friendAction.title = `${this.searchedUser.nick} is your friend`;
      }
    });
  }



  // event which makes it possible to switch between description and user general view
  switchElements() {
    this.dom.switch.addEventListener('click', () => {
      const flag: boolean = this.dom.general.wrapper.classList.contains('disabled');
      if (flag) {
        this.dom.general.wrapper.classList.remove('disabled');
        this.dom.description.classList.add('disabled');
      }
      else {
        this.dom.general.wrapper.classList.add('disabled');
        this.dom.description.classList.remove('disabled');
      }
    })
  }

  getDOMElements() {
    this.dom = {
      switch: document.querySelector('#searched_user_switch'),
      friendAction: document.querySelector('#searched_user_friend_action'),
      description: document.querySelector('.profile__description'),
      potionLabel: document.querySelector('.profile__generalLabelWrapper'),
      equipmentSlots: document.querySelectorAll('.profile__equipment div[data-slot-name]'),
      equipmentLabel: {
        root: document.querySelector('#specificUser_equipment__item_label'),
        labelWrapper: document.querySelector('#specificUser_equipment_label_wrapper')
      },
      general: {
        wrapper: document.querySelector('#searched_user_general'),
        potionImgFirst: document.querySelector('#profile_general_potion_first .profile__generalImg'),
        potionImgSecond: document.querySelector('#profile_general_potion_second .profile__generalImg'),
      },
    }
  }


  initScripts() {

    this.labelForEquipmentEvent();
    this.labelForPotions();
    this.switchElements();
    this.addOrRemoveFriendEvent();
    this.changeFriendIconEvents();
  }

  init() {
    this.render();
    this.getDOMElements();
    this.initScripts();
  }
}