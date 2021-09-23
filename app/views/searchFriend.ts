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
      allUsersList: HTMLElement,
      allUsersRow: NodeListOf<Element>,
      userRoot: HTMLElement
   }
   constructor() {
      super();
      this.allUsersData = [];
      this.dom = {
         allUsersList: document.querySelector('#all_users'),
         allUsersRow: document.querySelectorAll('#all_users tr'),
         userRoot: document.querySelector('#searched_user_root')
      }
   }

   render() {
      this.root.innerHTML = getSearchFriendHTMLCode();
   }
   // fetch all user's data from firestore, in order to create list of this user's, and find specific user later
   async getAllUsers(){
     await db.collection('users').get().then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             const data : SearchedUserData = {
                description: doc.data().description,
               equipmentItems: doc.data().equipmentItems,
               exp: doc.data().exp,
               level: doc.data().level,
               rawStats:doc.data().rawStats,
               portrait: doc.data().portrait,
               potions:  doc.data().potions,
               status: doc.data().status,
               nick: doc.data().nick,
               lastVisit: doc.data().lastVisit,
               id: doc.id
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
            <td><div class='searchFriend__status'> <img src='${getStatusImgSrc(el.status)}'/><strong>${el.status}</strong></div></td>
            <td><div class='searchFriend__nick'><div class='searchFriend__level'>${el.level}</div><strong>${el.nick}</strong></div></td>
            <td><div class='searchFriend__lastVisit'>${formatDate(el.lastVisit)} <img src='./images/computer.png'/></div></td>
            </tr>
            `
            html += newElement;
         });

         this.dom.allUsersList.innerHTML = html;
         this.dom.allUsersRow = document.querySelectorAll('#all_users tr');
     }
     
     );
   }

   // show general view of specific user
   showSpecificUserEvent(){
    this.dom.allUsersRow.forEach(el => el.addEventListener('click', ()=> {
       const element: HTMLElement = el as HTMLElement;
       // find user
       const userIndex: number = this.allUsersData.findIndex(el => el.id === element.dataset.userId)
       const searchedUser : SearchedUserData = this.allUsersData[userIndex]
       // create view 
       const specificUserView = new SearchedUser(this.dom.userRoot, this.userData, searchedUser);

    }));
   }

   initScripts() {
        this.getAllUsers()
        .then(()=> {
          this.showSpecificUserEvent();
        })
   }
   onDataChange() {

   }
   getDOMElements() {
      this.dom = {
         allUsersList: document.querySelector('#all_users'),
         allUsersRow: document.querySelectorAll('#all_users tr'),
         userRoot: document.querySelector('#searched_user_root')
      }
   }

}


