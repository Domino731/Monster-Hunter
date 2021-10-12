import { getSpecificUserHTMLCode } from '../../viewsHTMLCode/specificUser';
import { UserData, SearchedUserData, ShopItem, FullUserStats, Conversation, CurrentMission } from '../../types';
import { getEquipmentLabel } from './getEquipmentLabel';
import { potionsData } from '../../properties/shop/potions';
import { getPotionLabel } from './getPotionLabel';
import { updateUserData } from '../../firebase/operations';
import { db, auth } from '../../firebase/index';
import { getProfileEquipmentLabel } from './profileEquipment';
import { getSearchedUserBackpackLabel } from './backpackLabel';
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
  hideLabelInterval: {
    potion: ReturnType<typeof setInterval> | null;
    equipment: ReturnType<typeof setInterval> | null;
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
    this.hideLabelInterval = {
      potion: null,
      equipment: null
    }
    this.init();
  }

  render() {
    this.root.innerHTML = getSpecificUserHTMLCode(this.currentUser.friends, this.searchedUser);
  }
  equipmentLabel(item: ShopItem) {
    // prevent of label hiding 
    clearInterval(this.hideLabelInterval.equipment)
    // reset equipement label styles
    this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled';

    this.dom.equipmentLabel.root.classList.add(item.rarity === 'legendary' ? 'profile__itemSpecs-legendary' : 'profile__itemSpecs-common');
    this.dom.equipmentLabel.root.classList.add(`profile__itemSpecs-${item.type}`);
    this.dom.equipmentLabel.root.innerHTML = getSearchedUserBackpackLabel(item)
    this.dom.equipmentLabel.root.classList.remove('disabled');

    // keep displaying label when user  focus is on label
    this.dom.equipmentLabel.root.addEventListener('mouseover', () => clearInterval(this.hideLabelInterval.equipment));
    // hide 
    this.dom.equipmentLabel.root.addEventListener('mouseleave', () => {
        this.dom.equipmentLabel.root.innerHTML = '';
        this.dom.equipmentLabel.root.classList.add('disabled');
    });
}
  setEquipment() {

    this.searchedUser.equipmentItems.forEach(el => {

      // find slot in equipment in order to inject item graphic and add function reponsible for transfering item from equipment to backpack
      const equipmentSlot: HTMLElement = document.querySelector(`.profile__equipment div[data-slot-name = '${el.type}']`);
      // set slot
      equipmentSlot.innerHTML = `  <img src='${el.src}' class="profile__equipmentIcon"/>`;

      // create equipment label with button responsible for transfering item
      equipmentSlot.addEventListener('mouseover', () => this.equipmentLabel(el))

      // hide label when equipment slot loses his focus
      equipmentSlot.addEventListener('mouseleave', (e) => {
          //   equipmentSlot.removeEventListener('mouseover',  this.equipmentLabel)
          this.hideLabelInterval.equipment = setInterval(() => {
              this.dom.equipmentLabel.root.innerHTML = '';
              this.dom.equipmentLabel.root.classList.add('disabled');

          }, 800);
      });
      
  })
 
  }


  
  // events responsible for potion label
  labelForPotions() {
    // find potions
    if (this.searchedUser.potions.first !== null) {
        const potion: ShopItem | undefined = potionsData[potionsData.findIndex(el => el.id === this.searchedUser.potions.first.id)];
        this.dom.general.potionImgFirst.addEventListener('mouseover', () => {
            this.dom.potionLabel.innerHTML = getPotionLabel(potion, 1);
        });
        this.dom.general.potionImgFirst.addEventListener('mouseleave', () => {
            this.dom.potionLabel.innerHTML = '';
        });
        this.dom.general.potionImgFirst.classList.add('profile__generalImg-item');
    }
    if (this.searchedUser.potions.second !== null) {
        const secondPotion: ShopItem | undefined = potionsData[potionsData.findIndex(el => el.id ===this.searchedUser.potions.second.id)];
        // check if user have potion
        if (secondPotion !== undefined) {
            this.dom.general.potionImgSecond.addEventListener('mouseover', () => {
                this.dom.potionLabel.innerHTML = getPotionLabel(secondPotion, 2);
            });
            this.dom.general.potionImgSecond.addEventListener('mouseleave', () => {
                this.dom.potionLabel.innerHTML = '';
            });
            this.dom.general.potionImgSecond.classList.add('profile__generalImg-item');
        }
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
        this.dom.friendAction.title = 'Add to friends'
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
        this.dom.switch.title = 'Switch to description'
      }
      else {
        this.dom.general.wrapper.classList.add('disabled');
        this.dom.description.classList.remove('disabled');
        this.dom.switch.title = 'Switch to stats'
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

  // for rwd works
  rwd() {
    // equipment
    const currentItem = this.searchedUser.equipmentItems[0]
    // this.dom.equipmentLabel.root.classList.add(currentItem.rarity === 'legendary' ? 'profile__itemSpecs-legendary' : 'profile__itemSpecs-common')
    // this.dom.equipmentLabel.root.classList.add(`profile__itemSpecs-special`)
    // this.dom.equipmentLabel.labelWrapper.innerHTML = getEquipmentLabel(currentItem);
    // this.dom.equipmentLabel.root.classList.remove('disabled')
    // backpack
    //   const equipmentItem = this.userData.equipmentItems[0]
    //   this.dom.backpackLabel.root.className = 'profile__itemSpecs profile__itemSpecs-backpackSlot disabled'
    //   this.dom.backpackLabel.root.classList.add(`profile__backpackLabel-${5}`)
    //   this.dom.backpackLabel.replaceIcon.src = getEquipmentIconSrc(currentItem.type)
    //   this.dom.backpackLabel.labelWrapper.innerHTML = getBlacksmithBackpackLabel(currentItem, equipmentItem);
    //   this.dom.backpackLabel.root.classList.remove('disabled')
    // potions
        // const firstPotion = potionsData[0]
        // this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled';
        // this.dom.potionLabel.innerHTML = getPotionLabel(firstPotion, 2);
}
  initScripts() {

    this.setEquipment();
    this.labelForPotions();
    this.switchElements();
    this.addOrRemoveFriendEvent();
    this.changeFriendIconEvents();
    this.rwd();
  }

  init() {
    this.render();
    this.getDOMElements();
    this.initScripts();
  }
}