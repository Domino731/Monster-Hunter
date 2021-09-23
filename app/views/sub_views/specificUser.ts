import { getSpecificUserHTMLCode } from '../../viewsHTMLCode/specificUser';
import { UserData, SearchedUserData } from '../../types';
export class SearchedUser{
     root: HTMLElement 
     currentUser: UserData
     searchedUser: SearchedUserData
   /**
    * 
    * @param root - needed to inject html code
    * @param currentUser - data of current logged user, needed to add or remove a friend from current user data in firestore
    * @param searchedUser - data of searched user, based on this data view will be rendered, needed to know what user is to be added to friends
    */
    constructor(root: HTMLElement, currentUser: UserData, searchedUser: SearchedUserData){
      this.root = root;
      this.currentUser = currentUser;
      this.searchedUser = searchedUser;
      this.init();
    }

    render(){
        this.root.innerHTML = getSpecificUserHTMLCode(this.searchedUser);
    }
    initScripts(){
       
    }
    getDOMElements(){

    }
    init(){
        this.render();
        this.getDOMElements();
        this.initScripts();
    }
}