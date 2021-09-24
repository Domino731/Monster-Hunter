import { FriendData, SearchedUserData } from './../types';
import { getFriendsHTMLCode } from '../viewsHTMLCode/friends';
import { View } from './view';
import { SearchedUser } from './sub_views/specificUser';
import { db, auth } from '../firebase/index';
import { friendWindow } from './sub_views/friendWindow';
export class Friends extends View {

  private dom: {
    sortBtn: HTMLElement,
    filterBtn: HTMLElement,
    sortForm: HTMLElement,
    filterForm: HTMLElement
    branch: HTMLElement,
    profileBtns: NodeListOf<Element>,
    chatBtns: NodeListOf<Element>,
    friendsList: HTMLElement
  }
  private friendsList: SearchedUserData[]
  constructor() {
    super();
    this.friendsList = [];
    this.dom = {
      sortBtn: document.querySelector('#friends_sort_btn'),
      filterBtn: document.querySelector('#friends_filter_btn'),
      sortForm: document.querySelector('#friends_sort_form'),
      filterForm: document.querySelector('#friends_filter_form'),
      branch: document.querySelector('#friends_branch'),
      profileBtns: document.querySelectorAll('.friend__actionBtn-profile'),
      chatBtns: document.querySelectorAll('.friend__actionBtn-chat'),
      friendsList: document.querySelector('.friends__list')
    };
  }


  render() {
    this.root.innerHTML = getFriendsHTMLCode(this.userData.friends);
  }

  showFormsEvents() {
    // toogle filter form
    this.dom.filterBtn.addEventListener("click", () => {

      //hide sort form
      this.dom.sortForm.style.display = 'none';

      // toogle filter form
      const flag: boolean = this.dom.filterForm.style.display === "block";
      flag ? this.dom.filterForm.style.display = "none" : this.dom.filterForm.style.display = "block"
    });


    // toogle sort form
    this.dom.sortBtn.addEventListener("click", () => {

      //hide filter form
      this.dom.filterForm.style.display = 'none';

      // toogle sort form
      const flag: boolean = this.dom.sortForm.style.display === "block";
      flag ? this.dom.sortForm.style.display = "none" : this.dom.sortForm.style.display = "block"
    });
  }

  async getFriendsData() {
    await db.collection('users').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (this.userData.friends.findIndex(el => el.id === doc.id) !== -1) {
         
          const data: SearchedUserData = {
            description: doc.data().description,
            equipmentItems: doc.data().equipmentItems,
            exp: doc.data().exp,
            level: doc.data().level,
            rawStats: doc.data().rawStats,
            portrait: doc.data().portrait,
            potions: doc.data().potions,
            status: doc.data().status,
            nick: doc.data().nick,
            lastVisit: doc.data().lastVisit,
            id: doc.id,
            pet: doc.data().pet
          }
          this.friendsList.push(data);
        }

      });
    }

    );
  }

  renderFriendsList() {
    let html : string = '';
    this.friendsList.forEach(el => {
       html+= friendWindow(el);
    })
    this.dom.friendsList.innerHTML = html;
  }
  onDataChange() { }


  initScripts() {
    this.getFriendsData()
      .then(() => {
        this.renderFriendsList();
        this.getDOMElements();
        this.showFormsEvents();
      })

  }
  getDOMElements() {
    this.dom = {
      sortBtn: document.querySelector('#friends_sort_btn'),
      filterBtn: document.querySelector('#friends_filter_btn'),
      sortForm: document.querySelector('#friends_sort_form'),
      filterForm: document.querySelector('#friends_filter_form'),
      branch: document.querySelector('#friends_branch'),
      profileBtns: document.querySelectorAll('.friend__actionBtn-profile'),
      chatBtns: document.querySelectorAll('.friend__actionBtn-chat'),
      friendsList: document.querySelector('.friends__list')
    }
  }
}


