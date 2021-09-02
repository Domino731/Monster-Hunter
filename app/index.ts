import { auth } from './firebase/index';
window.addEventListener('DOMContentLoaded', (event) => {
    auth.onAuthStateChanged(user => {
        if(user){
            console.log(true)
        }
        else {
            // redirect user to main page
            location.href = '/login.html';
        }
    })
})