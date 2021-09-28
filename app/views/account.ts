import validator from 'validator';
import { auth } from '../firebase/index';
import { includeNumber, isUpper } from '../functions/other';
import { View } from './view';
import { getAccountHTMLCode } from '../viewsHTMLCode/account';
export class Account extends View{

    private data: {
        email: string;
        password: string;
        passwordRepeat: string;
    }
    private dom: {
        updateFormInputs: NodeListOf<Element> | null;
        actionBtn: HTMLButtonElement | null;
        errorWrapper: HTMLElement | null;
        successEmailUpdate:HTMLElement | null;
        successPasswordUpdate:HTMLElement | null;
    }
    constructor() {
        super()
        this.data = {
            email: auth.currentUser.email,
            password: "",
            passwordRepeat: ""
        }
        this.dom = {
            updateFormInputs: document.querySelectorAll('#account-update input'),
            actionBtn: document.querySelector('#btn-update-profile'),
            errorWrapper: document.querySelector('#update_profile_error'),
            successEmailUpdate: document.querySelector('#update_profile_email'),
            successPasswordUpdate: document.querySelector('#update_profile_password')
        }
    }

    render() {
        this.root.innerHTML = getAccountHTMLCode(this.userData.nick);;
    }

    // adding event for each input, which is responsible to changing data
    changeDataEvent() {
        this.dom.updateFormInputs.forEach(el => el.addEventListener("change", () => {
                const { name, value } = el as HTMLInputElement
                this.data = {
                    email: this.data.email,
                    password: this.data.password,
                    passwordRepeat: this.data.passwordRepeat,
                    [name]: value
                }
                this.dom.errorWrapper.style.display = "none"
        }));
    };

    // firebase auth methods - changing email or password
    updatePassword() {
        // checking requirements
        if (this.data.password.length >= 6 &&
            includeNumber(this.data.password) &&
            isUpper(this.data.password) &&
            this.data.password === this.data.passwordRepeat) {
               return  auth.currentUser.updatePassword(this.data.password)
                .then(()=>{
                    console.log('Password updated successfully');
                    this.dom.successPasswordUpdate.classList.remove('disabled');
                    this.dom.actionBtn.classList.add('disabled');
                })
                .catch((err) => {
                    console.log(err)
                    alert("This operation is sensitive and requires recent authentication. Log in again before retrying this request.")
                    return auth.signOut()
                    .then( () =>  {
                         console.log('Sign-out successful')
                      })
                      .catch(err =>  {
                        console.log(err)
                      });
                   });
        }
        // searching for error
        else {
            if(this.data.password.length === 0){
                this.dom.errorWrapper.classList.add('disabled');
            }
            else if(this.data.password.length < 6){
                this.dom.errorWrapper.classList.remove('disabled');
                this.dom.errorWrapper.innerText = 'Password must have min. 6 characters';
            }
            else if(!includeNumber(this.data.password)){
                this.dom.errorWrapper.classList.remove('disabled');
                this.dom.errorWrapper.innerText = 'Password must have number';
            }
            else if (!isUpper(this.data.password)){
                this.dom.errorWrapper.classList.remove('disabled');
                this.dom.errorWrapper.innerText = 'Password must have upper letter';
            }
            else if(this.data.password !== this.data.passwordRepeat){
                this.dom.errorWrapper.classList.remove('disabled');
                this.dom.errorWrapper.innerText = 'Passwords do not match';
            }
        }
    }

    // updating user e-mail
    updateEmail(){
        // update only when user enter new
        if(auth.currentUser.email !== this.data.email && validator.isEmail(this.data.email) && this.data.email.length !== 0){
           return auth.currentUser.updateEmail(this.data.email)
           .then(()=>{
               console.log('Email updated successfully');
               this.dom.successEmailUpdate.classList.remove('disabled');
               this.dom.actionBtn.classList.add('disabled');
           })
           .catch((err) => {
            console.log(err)
            alert("This operation is sensitive and requires recent authentication. Log in again before retrying this request.")
            return auth.signOut()
            .then( () =>  {
                 console.log('Sign-out successful')
              })
              .catch(err =>  {
                console.log(err)
              });
           });
        }
        if (!validator.isEmail(this.data.email) && this.data.email.length !== 0){
                this.dom.errorWrapper.classList.remove('disabled');
                this.dom.errorWrapper.innerText = 'Invalid e-mail';
        }
    }
    onDataChange(){}
    // firebase auth action on button, responsible for update user's profile
    updateProfileEvent() {
        this.dom.actionBtn.addEventListener("click", (e: Event) => {
            e.preventDefault();
            this.updatePassword();
            this.updateEmail();
            
        });
    }

    // script initzialition
    initScripts() {
        this.changeDataEvent();
        this.updateProfileEvent();
    };

    // getting dom elements
    getDOMElements() {
        this.dom = {
            updateFormInputs: document.querySelectorAll('#account-update input'),
            actionBtn: document.querySelector('#btn-update-profile'),
            errorWrapper: document.querySelector('#update_profile_error'),
            successEmailUpdate: document.querySelector('#update_profile_email'),
            successPasswordUpdate: document.querySelector('#update_profile_password')
        }
    };
   
}

//<a href='https://www.freepik.com/vectors/light'>Light vector created by vectorpouch - www.freepik.com</a>