import './sass/main.scss'
import { auth } from './firebase/index';
import {  initRouter } from './router/router';
import { General } from './general/general';
import { MobileNav } from './general/mobileNav';

window.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged((user: any) => {
        if(user){
            initRouter();
            const general = new General();
            const mobileNav = new MobileNav();
        }
        else {
            // redirect user to login page
            location.href = '/login.html';
        }
    })
})