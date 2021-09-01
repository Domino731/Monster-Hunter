import { AuthForm } from "./authForm";
import { includeNumber, isUpper } from '../functions/other';
import validator from 'validator';

export class Register extends AuthForm{
     constructor(root){
         super(root)
     }

     authAction(){
         console.log("correct data");
     }
     setErrors(){
         console.log("invalid data")
     }
     checkData(){
         console.log(1231231231233333333333333333333)
        // checking email
        if(validator.isEmail(this.data.eMail)){
           this.invalidData = false;
           console.log("email true")
        }
        else {
           this.invalidData = true;
           console.log("email false")
        };
        
        // checking password
        if(this.data.password.length >= 6 && includeNumber(this.data.password) && isUpper(this.data.password)){
           this.invalidData = false;
           console.log("password true")
        }
        else {
           this.invalidData = true;
           console.log("password false")
        }

        //checking if the user has entered two identical passwords
         if(this.data.password === this.data.repeatPassword){
           this.invalidData = false;
           console.log("password2 true")
         }
         else {
           this.invalidData = true;
           console.log("password2 false")
         }
         
         // checking nickname
         if (!validator.isEmpty(this.data.nickname) && this.data.nickname.length >= 4){
            this.invalidData = false;
            console.log("nick correct")
        } 
        
        else if (!validator.matches(this.data.nickname, '^[a-zA-Z0-9_.-]*$') && this.data.nickname.length >= 4) {
            this.invalidData = false;
            console.log("nick correct")
        } else {
            this.invalidData = true;
            console.log("nick incorrect")
        }
    }

}