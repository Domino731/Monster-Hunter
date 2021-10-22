import { getSpecificUserHTMLCode } from '../HTMLCode/specificUser';
import { UserData, SearchedUserData, ShopItem, Conversation} from '../types';
import { potionsData } from '../properties/shop/potions';
import { getPotionLabel } from '../functions/getPotionLabel';
import { updateUserData } from '../firebase/operations';
import { db, auth } from '../firebase/index';
import { getSearchedUserBackpackLabel } from '../functions/backpackLabel';

/** class responsbile for searched user section */ 
export class SearchedUser {

  // container where new created component will be injected
  private root: HTMLElement;
  // currend logged user data needed to add friend to his account (addOrRemoveFriend() method) and create chatroom with this friend by createChat() method 
  private currentUser: UserData;
  // search user data based on this data, the component will be rendered
  private searchedUser: SearchedUserData;
  // intervals responsible for hiding label with delay
  private hideLabelInterval: {
    potion: ReturnType<typeof setInterval> | null;
    equipment: ReturnType<typeof setInterval> | null;
  }
  private dom: {
    // potion label root needed to display label of this potion - labelForPotions() method
    potionLabel: HTMLElement | null;
    // button by which user switch between description and user general view - switchElements() method
    switch: HTMLImageElement | null;
     // container with description needed to toogle between description and general view - switchElements() method
    description: HTMLElement | null;
    // button by which user can add or remove friend - addOrRemoveFriend() method
    friendAction: HTMLImageElement | null;
    general: {
      // container with potions, pets and stats  needed to toogle between description and general view - switchElements() method
      wrapper: HTMLElement
      // wrappers of potion, needed to display potion label on mouse hover - labelForPotions() method
      potionImgFirst: HTMLElement | null;
      potionImgSecond: HTMLElement | null;
    }
    // root of equipment label, needed to display equipment label - equipmentLabel() method
    equipmentLabelRoot:  HTMLElement | null;
      
    
  }
  

  /**
   * @param root - needed to inject html code
   * @param currentUser - data of current logged user, needed to add or remove a friend from current user data in firestore
   * @param searchedUser - data of searched user, based on this data view will be rendered, needed to know what user is to be added to friends
   */
  constructor(root: HTMLElement, currentUser: UserData, searchedUser: SearchedUserData) {
    this.root = root;
    this.currentUser = currentUser;
    this.searchedUser = searchedUser;
     this.hideLabelInterval = {
      potion: null,
      equipment: null
    }
    this.dom = {
      switch: document.querySelector('#searched_user_switch'),
      friendAction: document.querySelector('#searched_user_friend_action'),
      description: document.querySelector('.profile__description'),
      potionLabel: document.querySelector('.profile__generalLabelWrapper'),
      equipmentLabelRoot: document.querySelector('#specificUser_equipment__item_label'),
      
      general: {
        wrapper: document.querySelector('#searched_user_general'),
        potionImgFirst: document.querySelector('#profile_general_potion_first .profile__generalImg'),
        potionImgSecond: document.querySelector('#profile_general_potion_second .profile__generalImg'),
      },
    }
   
    this.init();
  }

  /**
   * equipment label for specific item
   * @param item - item data on the basis new label will created 
   */
  equipmentLabel(item: ShopItem) {

    // prevent of label hiding 
    clearInterval(this.hideLabelInterval.equipment);

    // reset equipement label styles
    this.dom.equipmentLabelRoot.className = 'profile__itemSpecs disabled';

    // set new label
    this.dom.equipmentLabelRoot.classList.add(item.rarity === 'legendary' ? 'profile__itemSpecs-legendary' : 'profile__itemSpecs-common');
    this.dom.equipmentLabelRoot.classList.add(`profile__itemSpecs-${item.type}`);
    this.dom.equipmentLabelRoot.innerHTML = getSearchedUserBackpackLabel(item)
    this.dom.equipmentLabelRoot.classList.remove('disabled');

    // keep displaying label when user  focus is on label

    this.dom.equipmentLabelRoot.addEventListener('mouseover', () => clearInterval(this.hideLabelInterval.equipment));

    // hide when label loses his focus
    this.dom.equipmentLabelRoot.addEventListener('mouseleave', () => {
      this.dom.equipmentLabelRoot.innerHTML = '';
      this.dom.equipmentLabelRoot.classList.add('disabled');
    });
  }

  /** set equipment slots with ability to display label of specific item  */
  setEquipment() {
    this.searchedUser.equipmentItems.forEach(el => {

      // find slot in equipment in order to inject item graphic and add function reponsible for transfering item from equipment to backpack
      const equipmentSlot: HTMLElement = document.querySelector(`.profile__equipment div[data-slot-name = '${el.type}']`);

      // set slot graphic
      equipmentSlot.innerHTML = `  <img src='${el.src}' class="profile__equipmentIcon"/>`;

      // add event by which user can display label of this item
      equipmentSlot.addEventListener('mouseover', () => this.equipmentLabel(el))

      // hide label when equipment slot loses his focus
      equipmentSlot.addEventListener('mouseleave', (e) => {

        // hide after delay (0.8s)
        this.hideLabelInterval.equipment = setInterval(() => {
          this.dom.equipmentLabelRoot.innerHTML = '';
          this.dom.equipmentLabelRoot.classList.add('disabled');
        }, 800);
      });
    });
  }

   /** hover events applied on potion slots, which are responsible for potion label  */
  labelForPotions() {

    // check if user has active first potion 
    if (this.searchedUser.potions.first !== null) {

      // find this potion
      const potion: ShopItem = potionsData[potionsData.findIndex(el => el.id === this.searchedUser.potions.first.id)];

      // add event by which user can display potion label
      this.dom.general.potionImgFirst.addEventListener('mouseover', () => {
        this.dom.potionLabel.innerHTML = getPotionLabel(potion, 1);
      });
      this.dom.general.potionImgFirst.addEventListener('mouseleave', () => {
        this.dom.potionLabel.innerHTML = '';
      });

      // set styles
      this.dom.general.potionImgFirst.classList.add('profile__generalImg-item');
    }

     // check if user has active second potion 
    if (this.searchedUser.potions.second !== null) {

        // find this potion
      const secondPotion: ShopItem = potionsData[potionsData.findIndex(el => el.id === this.searchedUser.potions.second.id)];

       // add event by which user can display potion label
        this.dom.general.potionImgSecond.addEventListener('mouseover', () => {
          this.dom.potionLabel.innerHTML = getPotionLabel(secondPotion, 2);
        });
        this.dom.general.potionImgSecond.addEventListener('mouseleave', () => {
          this.dom.potionLabel.innerHTML = '';
        });

        // set styles
        this.dom.general.potionImgSecond.classList.add('profile__generalImg-item');
    }
  }

   /** create new chat data with friend (data structure is describe in docs)  */
  async createChat() {

    // set initial converstation data
    const conversation = {
       // @ts-ignore
      messages: [],
      createdAt: new Date,
      participants: [`${auth.currentUser.uid}`, `${this.searchedUser.id}`],
      updatedAt: new Date,
      recipientId: this.searchedUser.id,
      createdBy: auth.currentUser.uid
    }

   
    // check if the user has already created a conversation with this user
    let isFriend: boolean;
    await db.collection('chat').
    doc(auth.currentUser.uid)
    .collection('conversations')
    .where('recipientId', '==', this.searchedUser.id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(() => {
          isFriend = true;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    // add this converstation to user's data in firestore in order to read messages from this conversation
    !isFriend && await db.collection('chat').doc(auth.currentUser.uid).collection('conversations').add(conversation)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error: any) => {
        console.error("Error writing document: ", error);
      });
  }

   /** add or remove searched user from friends   */
  addOrRemoveFriendEvent() {
    this.dom.friendAction.addEventListener('click', () => {

      // index which is needed to check if user already has this searched user in friends
      const friendIndex: number = this.currentUser.friends.findIndex(el => el.id === this.searchedUser.id);

      // is not yet a friend, then add to friends
      if (friendIndex < 0) {

        // add friend so that in the friends section it will be possible to retrieve his data
        const newFriend: { nick: string, id: string } = {
          nick: this.searchedUser.nick,
          id: this.searchedUser.id
        };

        this.currentUser.friends.push(newFriend);
        this.dom.friendAction.src = './images/active_friend.png';

        this.createChat();
        updateUserData(this.currentUser);
      }

      // already a friend, then remove this friend
      else {
        this.currentUser.friends.splice(friendIndex, 1);
        this.dom.friendAction.src = './images/add_friend.png';
        this.dom.friendAction.title = 'Add to friends'
        updateUserData(this.currentUser);
      }
    });
  }

  /** changing friend icon on mouse hover and leave  */
  changeFriendIconEvents() {

    this.dom.friendAction.addEventListener('mouseover', () => {
      // index which is needed to check if user already has this searched user in friends
      const friendIndex: number = this.currentUser.friends.findIndex(el => el.id === this.searchedUser.id);
      if (friendIndex >= 0) {
        this.dom.friendAction.src = './images/remove_friend.png';
        this.dom.friendAction.title = 'Remove friend';
      }
    });

    this.dom.friendAction.addEventListener('mouseleave', () => {
      // index which is needed to check if user already has this searched user in friends
      const friendIndex: number = this.currentUser.friends.findIndex(el => el.id === this.searchedUser.id);
      if (friendIndex >= 0) {
        this.dom.friendAction.src = './images/active_friend.png';
        this.dom.friendAction.title = `${this.searchedUser.nick} is your friend`;
      }
    });
  }

   /** click event applied on switch button, which makes it possible to switch between description and user general view  */
  switchElements() {
    this.dom.switch.addEventListener('click', () => {
      const flag: boolean = this.dom.general.wrapper.classList.contains('disabled');

      // switch to general with pet, potions and stats
      if (flag) {
        this.dom.general.wrapper.classList.remove('disabled');
        this.dom.description.classList.add('disabled');
        this.dom.switch.title = 'Switch to description';
      }

      // switch to description
      else {
        this.dom.general.wrapper.classList.add('disabled');
        this.dom.description.classList.remove('disabled');
        this.dom.switch.title = 'Switch to stats';
      }
    });
  }


  
  render() {
    this.root.innerHTML = getSpecificUserHTMLCode(this.currentUser.friends, this.searchedUser);
  }
  getDOMElements() {
    this.dom = {
      switch: document.querySelector('#searched_user_switch'),
      friendAction: document.querySelector('#searched_user_friend_action'),
      description: document.querySelector('.profile__description'),
      potionLabel: document.querySelector('.profile__generalLabelWrapper'),
      equipmentLabelRoot: document.querySelector('#specificUser_equipment__item_label'),
      general: {
        wrapper: document.querySelector('#searched_user_general'),
        potionImgFirst: document.querySelector('#profile_general_potion_first .profile__generalImg'),
        potionImgSecond: document.querySelector('#profile_general_potion_second .profile__generalImg'),
      },
    }
  }
  initScripts() {
    this.setEquipment();
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