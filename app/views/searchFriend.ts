import { formatDate } from './../functions/formatDate';
import { SearchedUserData } from './../types';
import { getSearchFriendHTMLCode } from '../viewsHTMLCode/searchFriend';
import { View } from './view';
import { db, auth } from '../firebase/index';
import { getStatusImgSrc } from '../functions/getStatusImgSrc';
import { SearchedUser } from './sub_views/specificUser';
export class SearchFriend extends View {

   private allUsersData: SearchedUserData[]
   private dom: {
      allUsersList: HTMLElement;
      allUsersRow: NodeListOf<Element>;
      userRoot: HTMLElement;
      input: HTMLInputElement;
      nicks: NodeListOf<Element>;
      searchFriendInput: HTMLInputElement;
   }
   constructor() {
      super();
      this.allUsersData = [];
      this.dom = {
         allUsersList: document.querySelector('#all_users'),
         allUsersRow: document.querySelectorAll('#all_users tr'),
         userRoot: document.querySelector('#searched_user_root'),
         input: document.querySelector('.searchFriend__input'),
         nicks: document.querySelectorAll('#all_users .searchFriend__nick'),
         searchFriendInput: document.querySelector('.searchFriend__input'),
      }
   }

   render() {
      this.root.innerHTML = getSearchFriendHTMLCode();
   }
   // fetch all user's data from firestore, in order to create list of this user's, and find specific user later
   async getAllUsers() {
      await db.collection('users').get().then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const friends: string[] = doc.data().friends.map(el => el.id);
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
               confirmedFriend: friends.indexOf(auth.currentUser.uid) >= 0
            }
            this.allUsersData.push(data);
         });

         // remove actual user from this list
         const userIndex: number = this.allUsersData.findIndex(el => el.id === auth.currentUser.uid)
         this.allUsersData.splice(userIndex, 1);

         let html: string = '';
         // create list of user's
         this.allUsersData.forEach(el => {
            const newElement = `
            <tr data-user-id='${el.id}'>
            <td><div class='searchFriend__status searchFriend__status-an'> <img src='${getStatusImgSrc(el.status)}'/><strong>${el.status}</strong></div></td>
            <td><div class='searchFriend__nick'><div class='searchFriend__level'>${el.level}</div><strong>${el.nick}</strong></div></td>
            <td><div class='searchFriend__lastVisit searchFriend__lastVisit-an'>${formatDate(el.lastVisit)} <img src='./images/computer.png'/></div></td>
            </tr>
            `
            html += newElement;
         });

         this.dom.allUsersList.innerHTML = html;
         this.dom.allUsersRow = document.querySelectorAll('#all_users tr');
         this.dom.nicks = document.querySelectorAll('#all_users .searchFriend__nick strong')
      }

      );
   }

   // show general view of specific user
   showSpecificUserEvent() {
      this.dom.allUsersRow.forEach(el => el.addEventListener('click', () => {
        // remove all previous nick marks 
        this.dom.nicks.forEach(el => el.classList.remove('searchFriend__nick-selected'));

         const element: HTMLElement = el as HTMLElement;
         // find user
         const userIndex: number = this.allUsersData.findIndex(el => el.id === element.dataset.userId)
         const searchedUser: SearchedUserData = this.allUsersData[userIndex]
         // create view 
          const specificUserView = new SearchedUser(this.dom.userRoot, this.userData, searchedUser);
         // mark this row
         const nick = element.querySelector('.searchFriend__nick');
         nick.classList.add('searchFriend__nick-selected');
      }));
   }

   findFriend() {
      
      const scrollToFriend = (target: HTMLInputElement) => {
          // remove all previous nick marks 
         this.dom.nicks.forEach(el => el.classList.remove('searchFriend__nick-selected'));

         // find searched friend in order to scroll to his postion in table
         const friend = this.allUsersData[this.allUsersData.findIndex(el => el.nick === target.value)];
         if (friend !== undefined) {
             // create view 
             const specificUserView = new SearchedUser(this.dom.userRoot, this.userData, friend);
             // scroll
            const tableRow: HTMLElement = document.querySelector(`#all_users tr[data-user-id = '${friend.id}']`);
            tableRow.scrollIntoView({ behavior: "smooth" });
            // mark  table row
            const nick : HTMLElement = tableRow.querySelector('.searchFriend__nick');
            nick.classList.add('searchFriend__nick-selected');
         }

      }
      this.dom.input.addEventListener('keyup', (e: Event) => {
         const target = e.target as HTMLInputElement;
         scrollToFriend(target);
      })
      this.dom.input.addEventListener('change', (e: Event) => {
         const target = e.target as HTMLInputElement;
         scrollToFriend(target);
      })

   }


   searchFriendEvent() {
      const search = async (nick: string) => {
        if (nick.length > 0) {
          const elements = []
          console.log(this.dom.nicks)
          this.dom.nicks.forEach((el) => {
            if (el.innerHTML === nick) {
              elements.push(el.parentElement.parentElement.parentElement)
            }
          })
          console.log(elements)
          this.dom.allUsersRow.forEach(el => el.classList.add('disabled'))
          elements.forEach(el => el.classList.remove('disabled'))
        }
        else {
          this.dom.allUsersRow.forEach(el => el.classList.remove('disabled'))
        }
      }
      this.dom.searchFriendInput.addEventListener('change', () => search(this.dom.searchFriendInput.value));
      this.dom.searchFriendInput.addEventListener('keyup', () => search(this.dom.searchFriendInput.value));
    }


   initScripts() {
      this.getAllUsers()
         .then(() => {
            this.showSpecificUserEvent();
            this.findFriend();
            this.searchFriendEvent();
         })
   }
   onDataChange() {

   }
   getDOMElements() {
      this.dom = {
         allUsersList: document.querySelector('#all_users'),
         allUsersRow: document.querySelectorAll('#all_users tr'),
         userRoot: document.querySelector('#searched_user_root'),
         input: document.querySelector('.searchFriend__input'),
         nicks: document.querySelectorAll('#all_users .searchFriend__nick strong' ),
         searchFriendInput: document.querySelector('.searchFriend__input'),
      }
   }

}


