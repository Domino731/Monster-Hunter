import  validator  from 'validator';
import { AuthForm } from "./authForm";
import { includeNumber, isUpper } from '../functions/other';
import { auth, db } from "../firebase/index";
import { InitialUserProfile } from "../properties/initialUserProfile/initialUserProfile";

// Class for creating new user account in firebase
export class Register extends AuthForm {

    // DOM elements that will display errors if the user provides incorrect data
    private invalid: {
        eMail: HTMLElement;
        password: HTMLElement;
        repeatPassword: HTMLElement;
        nickname: HTMLElement;
    }
    // inputs nedeed to get thei values, based on this values authAction method will be invoke firebase auth action on this data
    private input: {
        eMail: HTMLElement;
        password: HTMLElement;
        repeatPassword: HTMLElement;
        nickname: HTMLElement;
    }

    constructor(root: string) {
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
            repeatPassword: document.querySelector("#form__register input[name='repeatPassword']"),
            nickname: document.querySelector("#form__register input[name='nickname']"),
        }
    }

    /** creating new user with initial data (InitialUserProfile) in firestore */ 
    authAction() {

        // hide button and show loading
        this.btn.style.display = "none";
        this.loading.style.display = "block";

        // create new user in firebase
        const unlisten = async () => {
            await auth.createUserWithEmailAndPassword(this.data.eMail, this.data.password)
                .then((cred: any) => {
                    InitialUserProfile.nick = this.data.nickname;
                    const createData = async () => {
                        await db.collection("users")
                            .doc(cred.uid)
                            .set(InitialUserProfile)
                            .then(async () => {
                                await db.collection('chat')
                                    .doc(`${cred.uid}`)
                                    .collection('conversations').add({ initial: true });
                            })
                            .then(() => {
                                // redirect user to main game page
                                location.href = '/'
                            })
                    }
                    createData();
                })

                .catch((error) => {

                    // set errors and notify user about them
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    if (errorCode === "auth/email-already-in-use") {
                        this.invalid.eMail.innerText = "This e-mail is already in use.";
                        this.input.eMail.style.borderBottomColor = "#e63946";
                    }

                    // show button and hide loading
                    this.loading.style.display = "none";
                    this.btn.style.display = "block";
                });
        }
        
        // check if nickname lenght is no bigget than 10 characters
        if (this.data.nickname.length <= 10) {
            return unlisten();
        }
        else {
            window.alert('Nickname should have a maximum of 10 characters')
        }

    }

    /** display errors in form, this method is invoked in addButtonEvent() method only when isCorrect value is true */ 
    setErrors() {

        // checking email
        if (!validator.isEmail(this.data.eMail)) {
            this.invalid.eMail.innerText = "Invalid e-mail.";
            this.input.eMail.style.borderBottomColor = "#e63946";
        }

        // checking password
        if (this.data.password.length <= 6 || !includeNumber(this.data.password) || !isUpper(this.data.password)) {
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
            this.invalid.nickname.innerText = 'Invalid nick';
            this.input.nickname.style.borderBottomColor = "#e63946";
        }
    }

    /** remove all errors in form */
    removeErrors() {

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
            this.invalid.nickname.innerText = '*Nickname should be at least 4 characters long';     
        }
    }

    /** check if user's data is correct, if data is incorrect then authAction() wont be triggred and the setErrors() method will be invoke. 
    These methods are apllied in addButtonEvent() method. */
    checkData() {

        // when user's provides new data remove all errors
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