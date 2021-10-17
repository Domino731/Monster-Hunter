import { auth } from '../firebase/index';

// Class responsbile for general actions - logout and refreshing page
export class General {

    // button by which user can log out -  logoutEvent() method
    private logoutBtn: HTMLElement;

    // timeout needed to set delay (1s) on window resize - mobile() method
    private timeout: null | ReturnType<typeof setTimeout>;

    constructor() {
        this.logoutBtn = document.querySelector('#btn-logout');
        this.timeout = null;
        this.init();
    };

    // logout the user when he presses a button
    logoutEvent() {
        this.logoutBtn.addEventListener("click", () => {
            return auth.signOut();
        });
    };

    // refresh page on windown resize in order to create  content  which is appropriate for the current browser window size (for ipad and below 1024px)
    mobile() {
        const resize = () => {
            // prevent of page multiple refreshing
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            // this.timeout = setTimeout(function () {
            //     if (window.innerHeight >= 1000 || window.innerWidth < 1024) {
            //         location.reload();
            //     }
            // }, 1000);
        }
        window.addEventListener('resize', resize);
    }

    // iniclalization of scripts
    init() {
        this.logoutEvent();
        this.mobile();
    };
};