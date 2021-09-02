import { AuthForm } from "./authForm";
import { includeNumber, isUpper } from '../functions/other';
import validator from 'validator';
import {auth, db} from "../firebase";

export class Register extends AuthForm {

    private invalid: {
        eMail: HTMLElement
        password: HTMLElement
        repeatPassword: HTMLElement
        nickname: HTMLElement
    }
    private input: {
        eMail: HTMLElement
        password: HTMLElement
        repeatPassword: HTMLElement
        nickname: HTMLElement
    }
    constructor(root) {
        super(root)
        this.invalid = {
            eMail: document.getElementById("register__invalidData-email"),
            password: document.getElementById("register__invalidData-password"),
            repeatPassword: document.getElementById("register__invalidData-repeatPassword"),
            nickname: document.getElementById("register__invalidData-nickname")
        }
        this.input = {
            eMail: document.querySelector("#form__register input[name='eMail']"),
            password: document.querySelector("#form__register input[name='password']"),
            repeatPassword:  document.querySelector("#form__register input[name='repeatPassword']"),
            nickname: document.querySelector("#form__register input[name='nickname']"),
        }
    }

    // creating new user with his own data in firestore
    authAction() {
        // hide button and show loading
        this.btn.style.display = "none";
        this.loading.style.display = "block";

        // create new user in firebase
        auth.createUserWithEmailAndPassword(this.data.eMail, this.data.password)
        .then((cred) => {
            console.log(cred)
            return db.collection("users")
            .doc(cred.uid)
            .set({
                nick: this.data.nickname,
                level: 1
            });

             // redirect user to main page
             location.href = '/';
             
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage)
            if(errorCode === "auth/email-already-in-use"){
                this.invalid.eMail.innerText = "This e-mail is already in use.";
                this.input.eMail.style.borderBottomColor = "#e63946";
            }
          });

          // show button and hide loading
          this.loading.style.display = "none";
          this.btn.style.display = "block";
    }
    setErrors() {
        // checking email
        if (!validator.isEmail(this.data.eMail)) {
            this.invalid.eMail.innerText = "Invalid e-mail.";
            this.input.eMail.style.borderBottomColor = "#e63946";
        }
        
        // checking password
        if (this.data.password.length <= 6 && !includeNumber(this.data.password) && !isUpper(this.data.password)) {
            this.invalid.password.style.color = "#e63946";
            this.input.password.style.borderBottomColor = "#e63946";
        }

        //checking if the user has entered two identical passwords
        if (this.data.password !== this.data.repeatPassword) {
            this.invalid.repeatPassword.innerText = "Passwords should be the same.";
            this.input.repeatPassword.style.borderBottomColor = "#e63946";
        }

        if (this.data.nickname.length < 4) {
            this.invalid.nickname.style.color = "#e63946";
            this.input.nickname.style.borderBottomColor = "#e63946";
        }
    }

    removeErrors(){
     // for email
     if (validator.isEmail(this.data.eMail)) {
        this.invalid.eMail.innerText = "";
        this.input.eMail.style.borderBottomColor = "#ffcd00";
    }
    
    // for password
    if (this.data.password.length >= 6 && includeNumber(this.data.password) && isUpper(this.data.password)) {
        this.invalid.password.style.color = "#03071e";
        this.input.password.style.borderBottomColor = "#ffcd00";
    }

    // for  repeated password
    if (this.data.password === this.data.repeatPassword) {
        this.invalid.repeatPassword.innerText = "";
        this.input.repeatPassword.style.borderBottomColor = "#ffcd00";
    }

    // for nickname
    if (this.data.nickname.length >= 4) {
        this.invalid.nickname.style.color = "#03071e";
        this.input.nickname.style.borderBottomColor = "#ffcd00";
    }



    }
    checkData() {

        this.removeErrors();

        // checking requirements
        if (!validator.isEmail(this.data.eMail)
            || this.data.password.length <= 6
            || !includeNumber(this.data.password)
            || !isUpper(this.data.password)
            || this.data.password !== this.data.repeatPassword
            || validator.isEmpty(this.data.nickname)
            || !validator.matches(this.data.nickname, '^[a-zA-Z0-9_.-]*$')
            || this.data.nickname.length <= 4

        ) {
            this.invalidData = true;
        }
        else {
            this.invalidData = false;
        }
    }

}