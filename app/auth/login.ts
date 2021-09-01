import { AuthForm } from './authForm';
import { auth } from "../firebase";

export class Login extends AuthForm {

    private invalid: HTMLElement;
    private input: {
        eMail: HTMLElement
        password: HTMLElement
    }

    constructor(root) {
        super(root)
        this.invalid = document.querySelector("#login__invalidData-password")
        this.input = {
            eMail: document.querySelector("#form__login input[name='eMail']"),
            password: document.querySelector("#form__login input[name='password']"),
        }
    }

    authAction() {
        console.log(this.data)
        // hide button and show loading
        this.btn.style.display = "none";
        this.loading.style.display = "block";

        auth.signInWithEmailAndPassword(this.data.eMail, this.data.password)
        .then(()=>{
            console.log("successful login")
        })
        .catch((error)=>{
            
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
         
            if(errorCode === "auth/wrong-password"){
               this.invalid.innerText = "Invalid password";
               this.input.password.style.borderBottomColor = "#e63946";
            }
            else if (errorCode === "auth/invalid-email"){
                this.invalid.innerText = "Invalid e-mail";
                this.input.eMail.style.borderBottomColor = "#e63946";
            }
            else {
                this.invalid.innerText = "Invalid e-mail or password";
                this.input.password.style.borderBottomColor = "#e63946";
                this.input.eMail.style.borderBottomColor = "#e63946";
            }
              
        })

        // show button and hide loading
        this.loading.style.display = "none";
        this.btn.style.display = "block";
    }

    // checking data
    checkData() {
        //there is no needed to checking data  entered by user, 
        // because authAction method will check that data by auth.signInWithEmailAndPassword
        this.invalidData = false;

        // remove error text
        this.invalid.innerText = "";

        // set input border color to default - yellow
        this.input.password.style.borderBottomColor = "#ffcd00";
        this.input.eMail.style.borderBottomColor = "#ffcd00";
    }

    setErrors() {

    }
}