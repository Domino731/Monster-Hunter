import { auth } from '../firebase/index';
export class General{
    private btn: {
        logout: HTMLElement   
    };
    constructor(){
        this.btn = {
            logout: document.querySelector('#btn-logout')
        }
        this.init();
    };

    // logout the use when he presses a button
   logoutEvent(){
       this.btn.logout.addEventListener("click", ()=>{
           return auth.signOut();
       })
   };

    init(){
        this.logoutEvent();
    };
};