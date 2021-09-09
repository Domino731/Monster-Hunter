import validator from 'validator';
import { auth } from '../firebase/index';
import { includeNumber, isUpper } from '../functions/other';
export class Account {

    private root: HTMLElement | null
    private data: {
        email: string,
        password: string,
        passwordRepeat: string
    }
    private dom: {
        updateFormInputs: NodeListOf<Element> | null,
        actionBtn: HTMLButtonElement | null,
        errorWrapper: HTMLElement | null,
        successEmailUpdate:HTMLElement | null,
        successPasswordUpdate:HTMLElement | null
    }
    constructor() {
        this.root = document.getElementById("game__view")
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
        this.init()
    }

    async render() {
        this.root.innerHTML = `<section class='account'>
          <div class='account__item'>
             <h2 class='account__nick'>NightNinja_890</h2>

             <div class='account__element'>
                <div class='account__elementIcon'>
                  <img  src='./images/account_date.png' alt='calendar'/>
                </div>
                <div class='account__elementContent'> 
                    12 November 2020
                </div>
             </div>

             <form id='account-update'>
              <div class='account__element'>
                <div class='account__elementIcon'>
                  <img  src='./images/account_email.png' alt='email'/>
                </div>           
                   <input type='text' name='email' value=${this.data.email} class='account__elementContent account__elementContent-email' placeholder='Leave blank to keep email same'>               
             </div>

             <div class='account__element account__element-password'>
             <div class='account__elementIcon'>
               <img  src='./images/account_password.png' alt='lock'/>
             </div>            
                <input type='password' name='password' class='account__elementContent account__elementContent-password' placeholder='New password'>            
             </div>

              <div class='account__element account__element-password'>
             <div class='account__elementIcon'>
               <img  src='./images/account_password.png' alt='lock'/>
             </div>            
                <input type='password'  class='account__elementContent account__elementContent-password' placeholder='Repeat new password' name='passwordRepeat' >            
             </div>
              
            
               <div class='account__msg account__msg-error' id='update_profile_error'> 
                 Password do not match!
               </div>


               <div class='account__msg account__msg-success' id='update_profile_email'> 
                 E-mail has been updated.
               </div>

               
               <div class='account__msg account__msg-success' id='update_profile_password'> 
                  Password has been updated.
               </div>
           
              <button class='account__btn' id='btn-update-profile'>Update your profile</button>
             </form>


          </div>
        </section>`;
    }

    // adding event for each input, which is responsible to changing data
    changeDataEvent() {
        this.dom.updateFormInputs.forEach(el => el.addEventListener("keyup", () => {
            el.addEventListener("keyup", () => {
                const { name, value } = el as HTMLInputElement
                this.data = {
                    email: this.data.email,
                    password: this.data.password,
                    passwordRepeat: this.data.passwordRepeat,
                    [name]: value
                }
                this.dom.errorWrapper.style.display = "none"
            });
        }));
    };

    // firebase auth methods - changing email or password
    updatePassword() {
        // checking requirements
        if (this.data.password.length >= 6 &&
            includeNumber(this.data.password) &&
            isUpper(this.data.password) &&
            this.data.password === this.data.passwordRepeat) {
                auth.currentUser.updatePassword(this.data.password)
                .then(()=>{
                    this.dom.successPasswordUpdate.style.display = "block"
                })
                .catch(err => console.error(err));
        }
        // searching for error
        else {
            if(this.data.password.length === 0){
                this.dom.errorWrapper.style.display = "none";
            }
            else if(this.data.password.length < 6){
                this.dom.errorWrapper.style.display = "block";
                this.dom.errorWrapper.innerText = 'Password must have min. 6 characters';
            }
            else if(!includeNumber(this.data.password)){
                this.dom.errorWrapper.style.display = "block";
                this.dom.errorWrapper.innerText = 'Password must have number';
            }
            else if (!isUpper(this.data.password)){
                this.dom.errorWrapper.style.display = "block";
                this.dom.errorWrapper.innerText = 'Password must have upper letter';
            }
            else if(this.data.password !== this.data.passwordRepeat){
                this.dom.errorWrapper.style.display = "block";
                this.dom.errorWrapper.innerText = 'Passwords do not match';
            }
        }
    }

    // updating user e-mail
    updateEmail(){
        // update only when user enter new
        if(auth.currentUser.email !== this.data.email && validator.isEmail(this.data.email)){
           auth.currentUser.updateEmail(this.data.email)
           .then(()=>{
               this.dom.successEmailUpdate.style.display = "block"
           })
           .catch(err => console.error(err))
        }
        if (!validator.isEmail(this.data.email)){
                this.dom.errorWrapper.style.display = "block";
                this.dom.errorWrapper.innerText = 'Invalid e-mail';
        }
    }

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

    // methods initizaliton
    init() {
        this.render();
        this.getDOMElements();
        this.initScripts();
    };
}

//<a href='https://www.freepik.com/vectors/light'>Light vector created by vectorpouch - www.freepik.com</a>