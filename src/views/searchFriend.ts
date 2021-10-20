
import { formatDate } from './../functions/formatDate';
import { SearchedUserData } from './../types';
import { getSearchFriendHTMLCode } from '../HTMLCode/searchFriend';
import { Component } from './view';
import { db, auth } from '../firebase/index';
import { getStatusImgSrc } from '../functions/getStatusImgSrc';
import { SearchedUser } from './specificUser';
import { getNeededExp } from '../functions/getNeededExp';

// all users list by which current user can find specific users
export class SearchFriend extends Component {

   // array with data about all users from firestore, based on this data getAllUsers() method will render list with all users
   private allUsersData: SearchedUserData[];
   // value handling class which created seached user view after click on specific user
   private searchedUser: SearchedUser | null
   private dom: {
      // containers which are needed to toogle view between searched user and all users list in toogleView() method (only below 1024px)
      usersContainer: HTMLElement | null;
      searchedUserContainer: HTMLElement | null;
      // list needed to render all user's in getAllUsers() method
      allUsersList: HTMLElement | null;
      // all user's rows in table, needed to hide them when user's is searching for a friend by input  searchFriend() method
      allUsersRow: NodeListOf<Element> | null;
      // container in which a friend view will be created (by SearchedUser class) when clicking on the specific user row in table
      userRoot: HTMLElement | null;
      // nicks wrappers needed to hide or show when user is searching friend  by nick - searchFriend() method,  and mark specific nick after click - showSearchedUser() method
      nicks: NodeListOf<Element> | null;
      //  input by which the user can search for friend by nick - searchFriend() method
      searchFriendInput: HTMLInputElement | null;
      // icon needed to hide searched friend view in  hideSearchedFrind() method (only below 1024px)
      closeViewIcon: HTMLElement;
   }
   constructor() {
      super();
      this.freepikAttribute = ` <a href='https://www.freepik.com/vectors/tree'>Tree vector created by upklyak - www.freepik.com</a>`;
      this.bodyBackgroundSrc = '/images/background_search_friend.jpg';
      this.allUsersData = [];
      this.searchedUser = null;
      this.dom = {
         closeViewIcon: document.querySelector('.closeIcon__searchFriend'),
         usersContainer: document.querySelector('.searchFriend__item-search'),
         searchedUserContainer: document.querySelector('#searched_user_root'),
         allUsersList: document.querySelector('#all_users'),
         allUsersRow: document.querySelectorAll('#all_users tr'),
         userRoot: document.querySelector('#searched_user_root'),
         nicks: document.querySelectorAll('#all_users .searchFriend__nick'),
         searchFriendInput: document.querySelector('.searchFriend__input'),
      }
   }

   // create and display profile of searched user
   showSearchedUserEvent(id: string) {
      // remove all previous nick marks 
      this.dom.nicks.forEach(el => el.parentElement.classList.remove('searchFriend__nick-selected'));

      // find user
      const userIndex: number = this.allUsersData.findIndex(el => el.id === id);
      const searchedUser: SearchedUserData = this.allUsersData[userIndex];

      // create view 
      this.searchedUser = new SearchedUser(this.dom.userRoot, this.userData, searchedUser);

      // on mobile devices hide all users list, user can hide this searched user view after clicking on icon  hideSearchedFrind() method
      if (window.innerWidth < 1024) {
         this.toogleView();
      }
   }

   /**
    * Create table element, with click event by user can display profile of specific user
    * @param data - data about user, needed to create new element with event which is responsible for displaying profile of specific user
    */
   createFriendTableElement(data: SearchedUserData) {

      // create new table row with this user
      const tableRow: HTMLTableRowElement = document.createElement('tr');

      // insert html
      tableRow.innerHTML = `
         <td><div class='searchFriend__status searchFriend__status-an'> <img src='${getStatusImgSrc(data.status)}'/><strong>${data.status}</strong></div></td>
         <td><div class='searchFriend__nick'><div class='searchFriend__level'>${data.level}</div><strong>${data.nick}</strong></div></td>
         <td><div class='searchFriend__lastVisit searchFriend__lastVisit-an'>${formatDate(data.lastVisit)} <img src='./images/computer.png'/></div></td>`;


      // event by which user can open view of specific user
      tableRow.addEventListener('click', () => {
         // create view of searched user
         this.showSearchedUserEvent(data.id);
         // mark selected user
         tableRow.children[1].firstElementChild.classList.add('searchFriend__nick-selected');
      });

      console.log(1)
      // add new created elemement to all users list
      this.dom.allUsersList.appendChild(tableRow);

   }

   // fetch all user's data from firestore, in order to create list of this users (by createFriendTableElement() method), and find specific user later
   async getAllUsers() {

      // get data 
      await db.collection('users').get().then((querySnapshot: any) => {
         querySnapshot.forEach((doc: any) => {
            // doc.data() is never undefined for query doc snapshots
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
               confirmedFriend: friends.indexOf(auth.currentUser.uid) >= 0,
               nextLevelAt: getNeededExp(doc.data().level)
            }

            // check if fetching data is not data about current user
            if (data.id !== auth.currentUser.uid) {
               this.allUsersData.push(data);
               this.createFriendTableElement(data)
            }

         });

         // elements needed later in searchFriend() method -> table rows and nicks are needed to hide them while user is searching for a specific user by input
         this.dom.allUsersRow = document.querySelectorAll('#all_users tr');
         this.dom.nicks = document.querySelectorAll('#all_users .searchFriend__nick strong')
      }
      );
   }

   // hide the searched user container below 1024px, then the list of all users will be full width and the searched user container also
   // will be full width. When user click on a specific user, the list will be hidden and this specific user will be shown - toogleView() method
   mobile() {
      if (window.innerWidth < 1024) {
         this.dom.searchedUserContainer.classList.add('disabled');
      }
   }

   // search for specific user by his nick
   searchFriend() {

      /**
       * Function that is showing and marking searched user row in table (all users list )
       * @param nick - user nick needed to find row in table
       */
      const search = async (nick: string) => {

         // searching for specific user by nick
         if (nick.length > 0) {
            const elements: HTMLElement[] = [];
            // search this row and push into elements array in order to show this row after
            this.dom.nicks.forEach((el) => {
               if (el.innerHTML === nick) {
                  elements.push(el.parentElement.parentElement.parentElement);
               }
            });

            // show results
            this.dom.allUsersRow.forEach(el => el.classList.add('disabled'))
            elements.forEach(el => el.classList.remove('disabled'))
         }

         // if user clear input then show all users
         else {
            this.dom.allUsersRow.forEach(el => el.classList.remove('disabled'))
         }
      }

      this.dom.searchFriendInput.addEventListener('change', () => search(this.dom.searchFriendInput.value));
      this.dom.searchFriendInput.addEventListener('keyup', () => search(this.dom.searchFriendInput.value));
   }

   // toogle between all user's list and searched user view (mainly for devices below 1024px)
   toogleView() {
      const flag: boolean = this.dom.usersContainer.classList.contains('disabled');
      if (flag) {
         this.dom.searchedUserContainer.classList.add('disabled');
         this.dom.usersContainer.classList.remove('disabled');
         this.dom.closeViewIcon.classList.add('disabled');
      }
      else {
         this.dom.searchedUserContainer.classList.remove('disabled');
         this.dom.usersContainer.classList.add('disabled');
         this.dom.closeViewIcon.classList.remove('disabled');
      }
   }

   // hide searched user view (only below 1024px)
   hideSearchedFriend() {
      this.dom.closeViewIcon.addEventListener('click', () => {
         this.dom.searchedUserContainer.classList.add('disabled');
         this.dom.usersContainer.classList.remove('disabled');
         this.dom.closeViewIcon.classList.add('disabled');
      })
   }



   initScripts() {
      this.getAllUsers()
         .then(() => {
            this.hideSearchedFriend();
            this.mobile();
            this.searchFriend();
         })
   }
   onDataChange() {
      return true;
   }
   getDOMElements() {
      this.dom = {
         closeViewIcon: document.querySelector('.closeIcon__searchFriend'),
         allUsersList: document.querySelector('#all_users'),
         allUsersRow: document.querySelectorAll('#all_users tr'),
         userRoot: document.querySelector('#searched_user_root'),
         nicks: document.querySelectorAll('#all_users .searchFriend__nick strong'),
         searchFriendInput: document.querySelector('.searchFriend__input'),
         usersContainer: document.querySelector('.searchFriend__item-search'),
         searchedUserContainer: document.querySelector('#searched_user_root'),
      }
   }
   render() {
      this.root.innerHTML = getSearchFriendHTMLCode();
   }
}


