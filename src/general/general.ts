import { auth } from '../firebase/index';

/**
 * Class responsbile for general operations - logout and refreshing page on resize
 *  */ 
export class General {

    // button by which user can log out -  logoutEvent() method
    private logoutBtn: HTMLElement;
    // container with navigation, needed to avoid hiding navigation on window resize
    private nav: HTMLElement

    constructor() {
        this.logoutBtn = document.querySelector('#btn-logout');
        this.nav = document.querySelector('.nav');
        this.init();
    };

    // click event applied on button in order to logout the user when he presses a button
    logoutEvent() {
        this.logoutBtn.addEventListener("click", () => {
            return auth.signOut();
        });
    };

    // prevent of hiding navigation
    mobile() {
        const resize = () => {
            if (window.innerHeight <= 1000 && window.innerWidth >= 1024) {

                // check if navigation is hide
                if (this.nav.style.display === 'none') {
                    this.nav.style.display = 'block';
                }
            }
        }
        window.addEventListener('resize', resize);
    }

    // iniclalization of scripts
    init() {
        this.logoutEvent();
        this.mobile();
    };
};