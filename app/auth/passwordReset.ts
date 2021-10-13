import { auth } from "../firebase";
export class PasswordReset {
    private forms: {
        login: HTMLElement
        register: HTMLElement
        resetPassword: HTMLElement
    }
    private buttons: {
        show: HTMLElement
        hide: HTMLElement
        action: HTMLElement
    }
    private input: HTMLInputElement
    private notifications: {
        invalid: HTMLElement
        correct: HTMLElement
    }
    constructor() {
        this.forms = {
            login: document.getElementById("auth-login"),
            register: document.getElementById("auth-register"),
            resetPassword: document.getElementById("auth-resetPassword")
        }
        this.buttons = {
            show: document.querySelector("#auth-forgotPassword"),
            hide: document.querySelector("#auth-backToForms"),
            action: document.querySelector("#btn__resetPassword")
        }
        this.input = document.querySelector("#resetPassword-input")
        this.notifications = {
            invalid: document.querySelector("#passwordReset-invalidData"),
            correct: document.querySelector("#passwordReset-correctData")
        }

        this.init()
    }

    // when user click on btn show reset form and hide login and register forms
    hideAuthFormsEvent() {
        this.buttons.show.addEventListener("click", () => {
            this.forms.resetPassword.style.display = "block";
            this.forms.login.style.display = "none";
            this.forms.register.style.display = "none"
        });
    }

    // when user click on btn hide reset form and show login and register forms
    showFormsEvent() {
        this.buttons.hide.addEventListener("click", () => {
            if (window.innerWidth < 1024) {
                this.forms.resetPassword.style.display = "none";
                this.forms.login.style.display = "block";
                this.forms.register.style.display = "none";
            }
            else {
                this.forms.resetPassword.style.display = "none";
                this.forms.login.style.display = "block";
                this.forms.register.style.display = "block";
            }

        });
    }

    removeErrorsEvent() {
        this.input.addEventListener("keyup", () => {
            this.notifications.invalid.innerText = "";
            this.input.style.borderBottomColor = "#ffcd00";
        })
    }

    authAction() {
        this.buttons.action.addEventListener("click", (e: Event) => {
            e.preventDefault();
            auth.sendPasswordResetEmail(this.input.value)
                .then(() => {
                    this.notifications.correct.innerText = "Check your inbox for further instructions"
                })
                .catch((err) => {
                    console.error(err)
                    this.notifications.invalid.innerText = "Invalid e-mail"
                    this.input.style.borderBottomColor = "#e63946"
                })
        })
    }
    init() {
        this.removeErrorsEvent();
        this.hideAuthFormsEvent();
        this.showFormsEvent();
        this.authAction();
    }

}