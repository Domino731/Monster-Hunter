import { Register } from './auth/register';
import { Login } from './auth/login';
window.addEventListener('DOMContentLoaded', (event) => {
    const register = new Register("#form__register")
    const login = new Login("#form__login")
});