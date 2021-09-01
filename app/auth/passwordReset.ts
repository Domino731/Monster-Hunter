import { Register } from './register';
export class PasswordReset {
    private root: HTMLElement
    private toClone: {
        login: HTMLElement
        register: HTMLElement
        resetPassword: HTMLElement
    }
    private forms: {
        login: Node
        register: Node
        resetPassword: Node
    }
    private buttons: {
        show: HTMLElement
    }
    constructor() {
        this.root = document.querySelector(".auth__container")
        this.toClone = {
            login: document.getElementById("auth-login"),
            register: document.getElementById("auth-register"),
            resetPassword: document.getElementById("auth-resetPassword")
        }
        this.forms = {
            login: this.toClone.login.cloneNode(true),
            register: this.toClone.register.cloneNode(true),
            resetPassword: this.toClone.resetPassword.cloneNode(true)
        }
        this.buttons = {
            show: document.querySelector("#auth-forgotPassword")
        }
        this.init()
    }

    // hide reset password form
    hideResetPasswordForm(){
        this.root.removeChild(this.root.lastElementChild)
    }

    // when user click on btn show reset form and hide login and register forms
    hideForms() {
        this.buttons.show.addEventListener("click", ()=>{
            this.root.innerHTML = ""
            this.root.appendChild(this.forms.resetPassword) 
    
        })
    }
    init() {
        this.hideResetPasswordForm();
        this.hideForms();
        console.log(this.buttons.show);
    }

}