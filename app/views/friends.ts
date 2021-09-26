import { FriendData, SearchedUserData } from './../types';
import { getFriendsHTMLCode } from '../viewsHTMLCode/friends';
import { View } from './view';
import { SearchedUser } from './sub_views/specificUser';
import { db, auth } from '../firebase/index';
import { friendWindow } from './sub_views/friendWindow';
import { Chat } from './chat';
export class Friends extends View {

  private dom: {
    sortBtn: HTMLElement,
    filterBtn: HTMLElement,
    sortForm: HTMLElement,
    filterForm: HTMLElement
    branch: HTMLElement,
    profileBtns: NodeListOf<Element>,
    chatBtns: NodeListOf<Element>,
    friendsList: HTMLElement,
    friendsWindows: NodeListOf<Element>
    sortCheckboxes: NodeListOf<Element>
    filterCheckboxes: NodeListOf<Element>
    closeBtn: HTMLElement
  }
  private friendsList: SearchedUserData[]
  private friendsListBackup: SearchedUserData[]
  private secondView: SearchedUser | Chat | null
  constructor() {
    super();
    this.secondView = null;
    this.friendsList = [];
    this.friendsListBackup = [];
    this.dom = {
      sortBtn: document.querySelector('#friends_sort_btn'),
      filterBtn: document.querySelector('#friends_filter_btn'),
      closeBtn: document.querySelector('#friends_close_btn'),
      sortForm: document.querySelector('#friends_sort_form'),
      filterForm: document.querySelector('#friends_filter_form'),
      branch: document.querySelector('#friends_branch'),
      profileBtns: document.querySelectorAll('.friend__actionBtn-profile'),
      chatBtns: document.querySelectorAll('.friend__actionBtn-chat'),
      friendsList: document.querySelector('.friends__list'),
      friendsWindows: document.querySelectorAll('.friend'),
      sortCheckboxes: document.querySelectorAll('#friends_sort_form input'),
      filterCheckboxes: document.querySelectorAll('#friends_filter_form input')
    };
  }


  render() {
    this.root.innerHTML = getFriendsHTMLCode(this.userData.friends);
  }

  showFormsEvents() {
    // toogle filter form
    this.dom.filterBtn.addEventListener("click", () => {

      //hide sort form
      this.dom.sortForm.classList.add('disabled')

      // toogle filter form
      const flag: boolean = this.dom.filterForm.classList.contains('disabled');
      flag ? this.dom.filterForm.classList.remove('disabled') : this.dom.filterForm.classList.add('disabled')
    });


    // toogle sort form
    this.dom.sortBtn.addEventListener("click", () => {

      //hide filter form
      this.dom.filterForm.classList.add('disabled');

      // toogle sort form
      const flag: boolean = this.dom.sortForm.classList.contains('disabled');
      flag ? this.dom.sortForm.classList.remove('disabled') : this.dom.sortForm.classList.add('disabled')
    });
  }

  async getFriendsData() {
    this.friendsList = [];
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
          // array with friends, which is needed to return all friends when user remove filter
          this.friendsListBackup.push(data);
        }

      });
    }

    );
  }

  // events on checkboxes, responsbile for sorting list with friends 
  sortFriends() {
    this.dom.sortCheckboxes.forEach(el => el.addEventListener('change', () => {
      const input: HTMLInputElement = el as HTMLInputElement
      if (input.value === 'sort-by-highest-level') {
        this.friendsList = this.friendsList.sort((a, b) => b.level - a.level);
      }
      else {
        this.friendsList = this.friendsList.sort((a, b) => a.level - b.level);
      }
      // rerender view 
      this.renderFriendsList();
      this.getDOMElements();
      this.showFriendProfile();
      // remove form after animations ends
      setTimeout(() => {
        this.dom.sortForm.classList.add('disabled')
      }, 850)
    }));
  }


  // events on checkboxes, responsbile for filtering list with friends 
  filterFriends() {
    this.dom.filterCheckboxes.forEach(el => el.addEventListener('change', () => {
      const input: HTMLInputElement = el as HTMLInputElement
      if (input.value === 'lower-level') {
        this.friendsList = this.friendsList.filter(el => el.level < this.userData.level);
      }
      else if (input.value === 'higher-level') {
        this.friendsList = this.friendsList.filter(el => el.level > this.userData.level);
      }
      else {
        this.friendsList = this.friendsListBackup
      }
      // rerender view 
      this.renderFriendsList();
      this.getDOMElements();
      this.showFriendProfile();
      // remove form after animations ends
      setTimeout(() => {
        this.dom.filterForm.classList.add('disabled')
      }, 850)
    }));
  }

  closeViewEvent() {
    this.dom.closeBtn.addEventListener("click", () => this.hideFriendView())
    this.secondView = null;
  }
  renderFriendsList() {
    let html: string = '';
    this.friendsList.forEach(el => {
      html += friendWindow(el);
    })
    this.dom.friendsList.innerHTML = html;
  }
  showFriendProfile() {
    this.dom.profileBtns.forEach(el => el.addEventListener('click', () => {
      // show close icon in order to give user ability to close friend profile view
      this.dom.closeBtn.classList.remove('disabled');

      // find friend
      const element: HTMLElement = el as HTMLElement;
      const userId: string = element.parentElement.parentElement.dataset.userId;
      const friend: SearchedUserData = this.friendsList[this.friendsList.findIndex(el => el.id === userId)];

      // create view of friend's profile
      this.secondView = new SearchedUser(this.dom.branch, this.userData, friend);
      this.shrinkFriendsList();
    }))
  }

  shrinkFriendsList() {
    this.dom.branch.classList.remove('disabled');
    this.dom.friendsWindows.forEach(el => el.parentElement.classList.add('friends__item-active'));
  }

  hideFriendView() {
    // hide close btn
    this.dom.closeBtn.classList.add('disabled');
    // clear view 
    this.dom.branch.classList.add('disabled');
    this.dom.friendsWindows.forEach(el => el.parentElement.classList.remove('friends__item-active'));
  }
  onDataChange() {
    this.hideFriendView();
    this.initScripts();
  }
  initScripts() {
    this.getFriendsData()
      .then(() => {
        this.renderFriendsList();
        this.getDOMElements();
        this.showFriendProfile();
        this.showFormsEvents();
        this.sortFriends();
        this.filterFriends();
        this.closeViewEvent();
        this.shrinkFriendsList();
        this.secondView = new Chat(this.dom.branch, this.friendsList[0]);
      })

  }
  getDOMElements() {
    this.dom = {
      sortBtn: document.querySelector('#friends_sort_btn'),
      filterBtn: document.querySelector('#friends_filter_btn'),
      sortForm: document.querySelector('#friends_sort_form'),
      closeBtn: document.querySelector('#friends_close_btn'),
      filterForm: document.querySelector('#friends_filter_form'),
      branch: document.querySelector('#friends_branch'),
      profileBtns: document.querySelectorAll('.friend__actionBtn-profile'),
      chatBtns: document.querySelectorAll('.friend__actionBtn-chat'),
      friendsList: document.querySelector('.friends__list'),
      friendsWindows: document.querySelectorAll('.friend'),
      sortCheckboxes: document.querySelectorAll('#friends_sort_form input'),
      filterCheckboxes: document.querySelectorAll('#friends_filter_form input')
    }
  }
}


