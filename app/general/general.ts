import { auth } from '../firebase/index';
export class General {
    private btn: {
        logout: HTMLElement
    };
    private timeout: null |  ReturnType<typeof setTimeout>
    constructor() {
        this.btn = {
            logout: document.querySelector('#btn-logout')
        }
        this.timeout = null;
        this.init();
    };

    // logout the use when he presses a button
    logoutEvent() {
        this.btn.logout.addEventListener("click", () => {
            return auth.signOut();
        })
    };

    mobile() {
        const resize = () => {
             "use strict";
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
        
            this.timeout = setTimeout(function () {
              if (window.innerHeight >= 1000 || window.innerWidth < 1024) {
                location.reload()
            }
            }, 500);
        }
        window.addEventListener('resize', resize);
           

           
        

    }
    init() {
        this.logoutEvent();
      // this.mobile();
    };
};