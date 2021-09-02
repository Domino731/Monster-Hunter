import { auth } from './firebase/index';
import {  initRouter } from './router/router';

window.addEventListener('DOMContentLoaded', (event) => {
    auth.onAuthStateChanged(user => {
        if(user){
            initRouter();
        }
        else {
            // redirect user to main page
            location.href = '/login.html';
        }
    })
})