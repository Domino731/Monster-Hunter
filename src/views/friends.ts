import { SearchedUserData } from './../types';
import { getFriendsHTMLCode } from '../HTMLCode/friends';
import { Component } from './view';
import { SearchedUser } from './specificUser';
import { db, auth } from '../firebase/index';
import { friendWindow } from '../HTMLCode/friends';
import { Chat } from './chat';
import { getNeededExp } from '../functions/getNeededExp';

// class responsbile for friends list, by which user can display friend profile or chat
export class Friends extends Component {

  private dom: {
    // buttons by which user can display sort or filter friends form - showFormsEvents() method
    sortBtn: HTMLElement | null;
    filterBtn: HTMLElement | null;
    // forms which are displaying after click on above buttons - showFormsEvents() method
    sortForm: HTMLElement | null;
    filterForm: HTMLElement | null;
    // container needed to insert to html code of friend profile or chat
    branch: HTMLElement | null;
    // container needed to render friends list inside him - createFriendWindow() and rerenderFriendsList() methods
    friendsList: HTMLElement | null;
    // needed to hide these wrappers while user is searching for friend by input searchFriendEvent() method
    friendsWrappers: NodeListOf<Element> | null;
    // form checkbox on the basis of which the list will be sorted - sortFriends() method, or filtered  filterFriends() method
    sortCheckboxes: NodeListOf<Element> | null;
    filterCheckboxes: NodeListOf<Element> | null;
    // button by which user can hide friend view - chat or profile (only above 1024px) -  closeViewEvent() method
    closeBtn: HTMLElement | null;
    // button by which user can hide friend view - chat or profile (only below 1024px) - hideBranchEvent() method
    mobileCloseBtn: HTMLElement | null;
    // input by which user can find friend by his nick - searchFriend() method
    searchFriendInput: HTMLInputElement | null;
    // nicks wrappers needed to find and display searched friend wrapper when user is searching friend by his nick - searchFriend() method
    nicks: NodeListOf<Element> | null;
    // container with friends list and top bar with input and forms, needed to hide - hideFriendsContainer() method or show him - showFriendsContainer() - only below 1024px
    friendsContainer: HTMLElement | null;
  }

  // array with data about friends, which is needed to sort (sortFriends() method) and filter (filterFriends() method) friends list  
  private friendsList: SearchedUserData[];
  // when user filter friends list by higher or lower level, then above array with data is filtered by selected filter and and removes other friends data
  // this friendsListBackup is an array containing all friends which is assigned back to the friendsList array when the user turns off filtering
  private friendsListBackup: SearchedUserData[];
  // value handling class reponsible for friend view or chat
  private secondView: SearchedUser | Chat | null;
  // nick of current selected friend, needed to mark this friend when user start chat with friend (showChat() method ) or display his profile (byshowFriendProfile() method)
  private friendNick: string | null

  constructor() {
    super();
    this.secondView = null;
    this.friendsList = [];
    this.friendsListBackup = [];
    this.friendNick = null;
    this.freepikAttribute = `<a href='https://www.freepik.com/vectors/building'>Building vector created by macrovector - www.freepik.com</a>`;
    this.bodyBackgroundSrc = '/images/background_friends.jpg';
    this.dom = {
      mobileCloseBtn: document.querySelector('.closeIcon'),
      friendsContainer: document.querySelector('#friends_container'),
      sortBtn: document.querySelector('#friends_sort_btn'),
      filterBtn: document.querySelector('#friends_filter_btn'),
      closeBtn: document.querySelector('#friends_close_btn'),
      sortForm: document.querySelector('#friends_sort_form'),
      filterForm: document.querySelector('#friends_filter_form'),
      branch: document.querySelector('#friends_branch'),
      friendsList: document.querySelector('.friends__list'),
      friendsWrappers: document.querySelectorAll('.friend'),
      sortCheckboxes: document.querySelectorAll('#friends_sort_form input'),
      filterCheckboxes: document.querySelectorAll('#friends_filter_form input'),
      searchFriendInput: document.querySelector('.searchFriend__input'),
      nicks: document.querySelectorAll('.friend__name')
    };
  }

  // click events applied on buttons (filterBtn and sortBtn) by which user can display filter or sort form 
  showFormsEvents() {

    // toogle filter form
    this.dom.filterBtn.addEventListener("click", () => {
    
      //hide sort form
      this.dom.sortForm.classList.add('disabled');

      // toogle filter form
      const flag: boolean = this.dom.filterForm.classList.contains('disabled');
      flag ? this.dom.filterForm.classList.remove('disabled') : this.dom.filterForm.classList.add('disabled');
    });


    // toogle sort form
    this.dom.sortBtn.addEventListener("click", () => {

      //hide filter form
      this.dom.filterForm.classList.add('disabled');

      // toogle sort form
      const flag: boolean = this.dom.sortForm.classList.contains('disabled');
      flag ? this.dom.sortForm.classList.remove('disabled') : this.dom.sortForm.classList.add('disabled');
    });

  }

  /**
   * Create friend profile view
   * @param friend - friend data needed to create SearchedUser class
   * @param nickWrapper - wrapper of friend nick which will be marked
   */
   showFriendProfile(friend: SearchedUserData, nickWrapper: HTMLElement) {

    // unmark previous friend nick
    this.unmarkFriends();

    // show close icon in order to give user ability to close friend profile component 
    this.dom.closeBtn.classList.remove('disabled');

    // create view of friend's profile
    this.secondView = new SearchedUser(this.dom.branch, this.userData, friend);
    this.shrinkFriendsList();

    // save selected friend nick in order to remove nick mark
    this.friendNick = friend.nick;

    // mark selected user
    nickWrapper.classList.add('friend__name-active');

    // on mobile show close btn
    if (window.innerWidth < 1024) {
      this.dom.mobileCloseBtn.className = 'closeIcon closeIcon__searchFriend';
    }
  };

  /**
 * Craete chat with friend
 * @param friend - friend data needed to create SearchedUser class
 * @param nickWrapper - wrapper of friend nick which will be marked
 */
  showChat(friend: SearchedUserData, nickWrapper: HTMLElement) {
    // unmark previous friend nick
    this.unmarkFriends();

    // show close icon in order to give user ability to close chat
    this.dom.closeBtn.classList.remove('disabled');

    // create chat
    this.shrinkFriendsList();
    this.secondView = new Chat(this.dom.branch, this.userData, friend);

    // save selected friend nick in order to remove nick mark
    this.friendNick = friend.nick;

    // mark selected user
    nickWrapper.classList.add('friend__name-active');

    // on mobile show close btn
    if (window.innerWidth < 1024) {
      this.dom.mobileCloseBtn.className = 'closeIcon closeIcon__chat';
    }

  }

 // create friend wrapper with click events applied on buttons with opportunity to create chat (showChat() method) or create profile view (showFriendProfile() method)
  createFriendWrapper(friend: SearchedUserData) {

    // create element
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'friends__item';
    wrapper.innerHTML = friendWindow(friend);

    // add events by which user can open chat or friend profile
    const chatBtn: HTMLElement = wrapper.querySelector('.friend__actionBtn-chat');
    const profileBtn: HTMLElement = wrapper.querySelector('.friend__actionBtn-profile');
    chatBtn.addEventListener('click', () => this.showChat(friend, chatBtn.parentElement.previousElementSibling as HTMLElement));
    profileBtn.addEventListener('click', () => this.showFriendProfile(friend, chatBtn.parentElement.previousElementSibling as HTMLElement));

    // add this element to the friends list
    this.dom.friendsList.appendChild(wrapper);

  }

  // fetch friends data and create friends list 
  async getFriendsData() {
    this.friendsList = [];
    await db.collection('users').get().then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        // doc.data() is never undefined for query doc snapshots
        if (this.userData.friends.findIndex(el => el.id === doc.id) !== -1) {

          const friends: string[] = doc.data().friends.map((el: any) => el.id);
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
            pet: doc.data().pet,
            confirmedFriend: friends.indexOf(auth.currentUser.uid) !== -1,
            nextLevelAt: getNeededExp(doc.data().level)
          }
          this.friendsList.push(data);

          // array with friends, which is needed to return all friends when user remove filter
          this.friendsListBackup.push(data);

          // create friend wrapper with opportunities to create chat or create profile view
          this.createFriendWrapper(data);
        }

      });
    }

    );
  }

  // events on checkboxes, responsbile for sorting list with friends 
  sortFriends() {
    this.dom.sortCheckboxes.forEach(el => el.addEventListener('change', () => {

      // implement sort option
      const input: HTMLInputElement = el as HTMLInputElement;
      if (input.value === 'sort-by-highest-level') {
        this.friendsList = this.friendsList.sort((a, b) => b.level - a.level);
      }
      else {
        this.friendsList = this.friendsList.sort((a, b) => a.level - b.level);
      }

      // rerender view 
      this.rerenderFriendsList();
      this.getDOMElements();
      this.markFriend();

      // remove form after animations ends
      setTimeout(() => {
        this.dom.sortForm.classList.add('disabled');
      }, 850);

    }));
  }

  // events on checkboxes, responsbile for filtering list with friends 
  filterFriends() {
    this.dom.filterCheckboxes.forEach(el => el.addEventListener('change', () => {

      // implement filter
      const input: HTMLInputElement = el as HTMLInputElement;
      if (input.value === 'lower-level') {
        this.friendsList = this.friendsList.filter(el => el.level < this.userData.level);
      }
      else if (input.value === 'higher-level') {
        this.friendsList = this.friendsList.filter(el => el.level > this.userData.level);
      }
      else {
        this.friendsList = this.friendsListBackup;
      }

      // rerender view 
      this.rerenderFriendsList();
      this.getDOMElements();
      this.markFriend();

      // remove form after animations ends
      setTimeout(() => {
        this.dom.filterForm.classList.add('disabled');
      }, 850);
    }));
  }

  // add click event at closeBtn in order to give user hide opportunity to hide friend profile or chat
  closeViewEvent() {

    // for devices above 1024px
    this.dom.closeBtn.addEventListener("click", () => this.hideFriendView());
  
    // for devices below 1024px
    this.dom.mobileCloseBtn.addEventListener('click', () => {
      this.dom.branch.classList.add('disabled');
      this.dom.friendsContainer.classList.remove('disabled');
      this.dom.mobileCloseBtn.className = 'closeIcon disabled';
      this.dom.branch.innerHTML = '';
      this.secondView = null;
      this.dom.closeBtn.classList.add('disabled');
      this.unmarkFriends();
      this.growFriendList();
    })
  }

  // rerender list with friends 
  rerenderFriendsList() {
    // clear previous list
    this.dom.friendsList.innerHTML = '';
    // create friends wrappers
    this.friendsList.forEach(el => this.createFriendWrapper(el));
    if (this.secondView !== null) {
      this.shrinkFriendsList();
    }
  }

  // unmark all friends nicks
  unmarkFriends() {
    const nicks: NodeListOf<Element> = document.querySelectorAll('.friend__name-active');
    nicks.forEach(el => el.classList.remove('friend__name-active'));
  }

  // mark selected friend nick
  markFriend() {
    const nicks: NodeListOf<Element> = document.querySelectorAll('.friend__name');
    nicks.forEach(el => el.innerHTML === this.friendNick && el.classList.add('friend__name-active'))
  }


  // shrink friends wrappers
  shrinkFriendsList() {
    this.dom.branch.classList.remove('disabled');
    const friends: NodeListOf<Element> = document.querySelectorAll('.friend')
    friends.forEach(el => el.parentElement.classList.add('friends__item-active'));

    if (window.innerWidth < 1024) {
      this.hideFriendsContainer();
    }
  }

  // grow friends wrappers
  growFriendList() {
    const friends: NodeListOf<Element> = document.querySelectorAll('.friend')
    friends.forEach(el => el.parentElement.classList.remove('friends__item-active'));
  }


  // hide friend chat or profile
  hideFriendView() {
    this.dom.closeBtn.classList.add('disabled');
    this.dom.branch.classList.add('disabled');
    this.showFriendsContainer();
    this.unmarkFriends();
    this.growFriendList();
    this.secondView = null;
  }

  // search friend by nick
  searchFriend() {

    // search and show results
    const search = async (nick: string) => {
      if (nick.length > 0) {
        const elements : HTMLElement[] = [];

        // search by nick
        this.dom.nicks.forEach((el) => {
          if (el.innerHTML === nick) {
            elements.push(el.parentElement.parentElement);
          }
        });

        // hide all friends wrapper and show results
        this.dom.friendsWrappers.forEach(el => el.parentElement.classList.add('disabled'));
        elements.forEach(el => el.classList.remove('disabled'))
      }

      // if user clear the input then show all friends wrappers
      else {
        this.dom.friendsWrappers.forEach(el => el.parentElement.classList.remove('disabled'));
      }
    }

    // add events on input
    this.dom.searchFriendInput.addEventListener('change', () => search(this.dom.searchFriendInput.value));
    this.dom.searchFriendInput.addEventListener('keyup', () => search(this.dom.searchFriendInput.value));
  }

  // hide friends container
  hideFriendsContainer() {
    this.dom.friendsContainer.classList.add('disabled');
  }

  // show firends container and mobile close button
  showFriendsContainer() {
    this.dom.friendsContainer.classList.remove('disabled');
    this.dom.mobileCloseBtn.classList.add('disabled');
  }

  // creating appropriate styles for the component on window resize
  mobile(){
     if(window.innerWidth < 1024){
       this.dom.branch.classList.add('disabled');
     }

     window.addEventListener('resize', ()=> {
       if(window.innerWidth < 1024){
         this.dom.branch.classList.add('disabled');
         this.unmarkFriends();
         this.showFriendsContainer();
       }
       else if (window.innerWidth >= 1024){
         this.unmarkFriends();
         this.dom.branch.classList.add('disabled');
         this.growFriendList();
       }
     });
  }

  onDataChange() {
    this.hideFriendView();
    this.initScripts();
    this.rerenderFriendsList();
  }
  initScripts() {
    this.getFriendsData()
      .then(() => {
        this.getDOMElements();
        this.showFormsEvents();
        this.sortFriends();
        this.filterFriends();
        this.closeViewEvent();
        this.searchFriend();
        this.mobile();
      })
  }
  render() {
    this.root.innerHTML = getFriendsHTMLCode();
  }
  getDOMElements() {
    this.dom = {
      mobileCloseBtn: document.querySelector('.closeIcon'),
      friendsContainer: document.querySelector('#friends_container'),
      sortBtn: document.querySelector('#friends_sort_btn'),
      filterBtn: document.querySelector('#friends_filter_btn'),
      sortForm: document.querySelector('#friends_sort_form'),
      closeBtn: document.querySelector('#friends_close_btn'),
      filterForm: document.querySelector('#friends_filter_form'),
      branch: document.querySelector('#friends_branch'),
      friendsList: document.querySelector('.friends__list'),
      friendsWrappers: document.querySelectorAll('.friend'),
      sortCheckboxes: document.querySelectorAll('#friends_sort_form input'),
      filterCheckboxes: document.querySelectorAll('#friends_filter_form input'),
      searchFriendInput: document.querySelector('.searchFriend__input'),
      nicks: document.querySelectorAll('.friend__name')
    }
  }
}


