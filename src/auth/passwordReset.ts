import { auth } from "../firebase/index";
// class responsible for recovering user's password
export class PasswordRecover {

    // login and register form, which are needed to switch between them and the recover password form
    private forms: {
        login: HTMLElement;
        register: HTMLElement;
        recoverPassword: HTMLElement;
    }
    private buttons: {
        // button to show recover form 
        show: HTMLElement;
        // button to hide revoer form
        hide: HTMLElement;
        // button on which function responsible for recovering password will be applied in authAction() method
        action: HTMLElement;
    }
    // input which is needed to get email on which email will next steps about password recover will be sent
    private input: HTMLInputElement;
    // elements which will be displayed after the execution of the password recover function
    private notifications: {
        invalid: HTMLElement;
        correct: HTMLElement;
    }

    constructor() {
        this.forms = {
            login: document.getElementById("auth-login"),
            register: document.getElementById("auth-register"),
            recoverPassword: document.getElementById("auth-resetPassword")
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
            this.forms.recoverPassword.style.display = "block";
            this.forms.login.style.display = "none";
            this.forms.register.style.display = "none";
        });
    }

    // when user click on btn hide reset form and show login and register forms, or show only login form (only below 1024px)
    showFormsEvent() {
        this.buttons.hide.addEventListener("click", () => {
            if (window.innerWidth < 1024) {
                this.forms.recoverPassword.style.display = "none";
                this.forms.login.style.display = "block";
                this.forms.register.style.display = "none";
            }
            else {
                this.forms.recoverPassword.style.display = "none";
                this.forms.login.style.display = "block";
                this.forms.register.style.display = "block";
            }
        });
    }

    // when user type new data remove error
    removeErrorsEvent() {
        const removeError = () => {
            this.notifications.invalid.innerText = "";
            this.input.style.borderBottomColor = "#ffcd00";
        }
        this.input.addEventListener("keyup", () => removeError);
        this.input.addEventListener("change", removeError);
    }

    // recovering user's password
    authAction() {
        this.buttons.action.addEventListener("click", (e: Event) => {
            e.preventDefault();
            auth.sendPasswordResetEmail(this.input.value)
                .then(() => {
                    // notify user's about successful email send
                    this.notifications.correct.innerText = "Check your inbox for further instructions";
                })
                .catch((err: any) => {
                    console.log(err);
                    // set errors
                    this.notifications.invalid.innerText = "Invalid e-mail";
                    this.input.style.borderBottomColor = "#e63946";
                })
        })
    }

    // script initialization
    init() {
        this.removeErrorsEvent();
        this.hideAuthFormsEvent();
        this.showFormsEvent();
        this.authAction();
    }

}