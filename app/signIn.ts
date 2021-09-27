import { Register } from './auth/register';
import { Login } from './auth/login';
import { PasswordReset } from './auth/passwordReset';

window.addEventListener('DOMContentLoaded', () => {
            const register = new Register("#form__register");
            const login = new Login("#form__login");
            const passwordReset = new PasswordReset();
});