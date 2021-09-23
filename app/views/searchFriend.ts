import { formatDate } from './../functions/formatDate';
import { SpecificUserData } from './../types';
import { getSearchFriendHTMLCode } from '../viewsHTMLCode/searchFriend';
import { View } from './view';
import { db} from '../firebase/index'
import { getStatusImgSrc } from '../functions/getStatusImgSrc';
export class SearchFriend extends View {

   private allUsersData: SpecificUserData[]
   private dom: {
      allUsersList: HTMLElement,
      allUsersRow: NodeListOf<Element>
   }
   constructor() {
      super();
      this.allUsersData = [];
      this.dom = {
         allUsersList: document.querySelector('#all_users'),
         allUsersRow: document.querySelectorAll('#all_users tr')
      }
   }

   render() {
      this.root.innerHTML = getSearchFriendHTMLCode();
   }
   // fetch all user's data from firestore, in order to create list of this user's, and find specific user later
   async getAllUsers(){
      db.collection('users').get().then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             const data : SpecificUserData = {
                description: doc.data().description,
               equipmentItems: doc.data().equipmentItems,
               exp: doc.data().exp,
               level: doc.data().level,
               rawStats:doc.data().rawStats,
               portrait: doc.data().portrait,
               potions:  doc.data().potions,
               status: doc.data().status,
               nick: doc.data().nick,
               lastVisit: doc.data().lastVisit
             }
             this.allUsersData.push(data);
         });
         let html: string = '';
         // create list of user's
         this.allUsersData.forEach(el => {
            const newElement = `
            <tr>
            <td><div class='searchFriend__status'> <img src='${getStatusImgSrc(el.status)}'/><strong>${el.status}</strong></div></td>
            <td><div class='searchFriend__nick'><div class='searchFriend__level'>${el.level}</div><strong>${el.nick}</strong></div></td>
            <td><div class='searchFriend__lastVisit'>${formatDate(el.lastVisit)} <img src='./images/computer.png'/></div></td>
            </tr>
            `
            html += newElement;
         });

         this.dom.allUsersList.innerHTML = html;
         this.dom.allUsersRow = document.querySelectorAll('#all_users tr');
         console.log(this.dom.allUsersRow)

     }
     
     );
   }
   initScripts() {
        this.getAllUsers()
        .then(()=> {

        })
   }
   onDataChange() {

   }
   getDOMElements() {
      this.dom.allUsersList = document.querySelector('#all_users')
   }

}


