import { auth } from './firebase/index';
import {  initRouter } from './router/router';
import { General } from './general/general';

window.addEventListener('DOMContentLoaded', (event) => {
    auth.onAuthStateChanged(user => {
        if(user){
            initRouter();
            const general = new General();
        }
        else {
            // redirect user to main page
            location.href = '/login.html';
        }
    })
})