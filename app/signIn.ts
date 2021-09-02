import { Register } from './auth/register';
import { Login } from './auth/login';
import { PasswordReset } from './auth/passwordReset';
import { auth } from './firebase/index';

window.addEventListener('DOMContentLoaded', (event) => {
    auth.onAuthStateChanged(user => {
        if (user) {
            location.href = '/';
        }
        else {
            const register = new Register("#form__register");
            const login = new Login("#form__login");
            const passwordReset = new PasswordReset();
        }
    })

});