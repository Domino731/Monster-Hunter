import validator from 'validator';
import { auth, db } from '../firebase/index';
import { includeNumber, isUpper } from '../functions/other';
import { View } from './view';
import { getAccountHTMLCode } from '../HTMLCode/account';
import uniqid from 'uniqid';
import { UserData } from '../types';

// class reponsible for account section, by which can change his password, email or delete his account :(
export class Account extends View {

    // object with data needed to execute firebase auth action, changing in changeDataEvent() method
    private data: {
        email: string;
        password: string;
        passwordRepeat: string;
        deleteCode: string;
    }

    private dom: {
        // inputs nedeed to get their values, based on this values authAction method will be invoke firebase auth action on this data - changeDataEvent() method
        formInputs: NodeListOf<Element> | null;
        // button on which firebase auth function is applied - updateEmail() and updatePassword() methods
        actionBtn: HTMLButtonElement | null;
        // error which displaying error when user provides incorrect data - changeDataEvent(),  updateEmail() and updatePassword() methods
        errorWrapper: HTMLElement | null;
        // notifications which are displaying on successful execute firebase auth function -  updateEmail() and updatePassword() methods
        successEmailUpdate: HTMLElement | null;
        successPasswordUpdate: HTMLElement | null;
        // icon needed to toggle between update account and delete account forms - toggleForm() method
        toogleIcon: HTMLImageElement | null;
        // containers needed to show or hide specific conteiner - toggleForm() method
        updateFormContainer: HTMLElement | null;
        deleteAccountFormContainer: HTMLElement | null;
        //  button on which firebase auth function is applied - changeDataEvent(), deleteAccountEvent() and toogleForms() methods
        deleteAccountBtn: HTMLButtonElement | null;
    }

    // special code which must be prescribe by the user to allow him to delete his account
    private deleteCode: string;
    constructor() {
        super()
        this.data = {
            email: auth.currentUser.email,
            password: '',
            passwordRepeat: '',
            deleteCode: ''
        }
        this.deleteCode = uniqid('', 'delete');
        this.dom = {
            updateFormContainer: document.querySelector('#update-account'),
            deleteAccountFormContainer: document.querySelector('#delete-account'),
            formInputs: document.querySelectorAll('.account__elementContent'),
            actionBtn: document.querySelector('#btn-update-account'),
            errorWrapper: document.querySelector('#update_profile_error'),
            successEmailUpdate: document.querySelector('#update_profile_email'),
            successPasswordUpdate: document.querySelector('#update_profile_password'),
            toogleIcon: document.querySelector('.account__deleteIcon img'),
            deleteAccountBtn: document.querySelector('#btn-delete-account')
        }

    }

    // method that is reponsible for deleting user's data from firestore
    deleteAccount() {
        // firebase auth function is sensitive, when user is logged in game for a long time then this request will be rejected,
        // if it fails, it's needed to back user's data in firestore, then show notification of fail action (by window alert) then
        // log the user out
        const backUpData: UserData = this.userData
        return auth.currentUser.delete()
            .then(() => {
                console.log('Your account has been deleted');
            })
            .catch((err) => {
                return db.collection('users')
                    .doc(auth.currentUser.uid)
                    .set(backUpData)
                    .then(() => {
                        console.log(err)
                        alert("This operation is sensitive and requires recent authentication. Log in again before retrying this request.")
                        return auth.signOut()
                            .then(() => {
                                console.log('Sign-out successful')
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    });

            });
    }

    // method that is reponsible for deleting user's account from firestore and firebase auth
    deleteAccountEvent() {
        this.dom.deleteAccountBtn.addEventListener('click', (e: Event) => {
            e.preventDefault();
            if (this.deleteCode === this.data.deleteCode) {
                const uid: string = auth.currentUser.uid
                return db.collection('users').doc(uid).delete()
                    .then(() => {
                        this.deleteAccount();
                    })
                    .catch(err => console.log(err))
            }

        })
    }

    // toggle between change data form and delete account
    toggleForm() {
        this.dom.toogleIcon.addEventListener('click', () => {
            const flag: boolean = this.dom.updateFormContainer.classList.contains('disabled');
            if (flag) {
                this.dom.updateFormContainer.classList.remove('disabled');
                this.dom.deleteAccountFormContainer.classList.add('disabled');
                this.dom.toogleIcon.src = './images/account_delete_icon.png';
                this.dom.toogleIcon.title = 'Delete your account';
            }
            else {
                this.dom.updateFormContainer.classList.add('disabled');
                this.dom.deleteAccountFormContainer.classList.remove('disabled');
                this.dom.toogleIcon.src = './images/account_back_icon.png';
                this.dom.toogleIcon.title = 'Back';
            }
        })
    }

    // adding event for each input, which is responsible to changing data
    changeDataEvent() {

        // changing data needed to execute to specific auth action
        const dataChange = (input: HTMLInputElement) => {

            // set data
            const { name, value } = input;
            this.data = {
                email: this.data.email,
                password: this.data.password,
                passwordRepeat: this.data.passwordRepeat,
                deleteCode: this.data.deleteCode,
                [name]: value
            }

            // remove error
            this.dom.errorWrapper.style.display = "none";

            // if user prescribe correct delete code then show button responsible for deleting account, otherwise hide this button
            if (this.data.deleteCode === this.deleteCode) {
                this.dom.deleteAccountBtn.classList.remove('disabled');
            }
            else {
                this.dom.deleteAccountBtn.classList.add('disabled');
            }
        }

        this.dom.formInputs.forEach(el => el.addEventListener("change", () => {
            const input: HTMLInputElement = el as HTMLInputElement;
            return dataChange(input);
        }));
        this.dom.formInputs.forEach(el => el.addEventListener("keyup", () => {
            const input: HTMLInputElement = el as HTMLInputElement;
            return dataChange(input);
        }));
    };

    // firebase auth methods - changing email or password
    updatePassword() {
        // checking requirements
        if (this.data.password.length >= 6 &&
            includeNumber(this.data.password) &&
            isUpper(this.data.password) &&
            this.data.password === this.data.passwordRepeat) {
            return auth.currentUser.updatePassword(this.data.password)
                .then(() => {
                    console.log('Password updated successfully');
                    this.dom.successPasswordUpdate.classList.remove('disabled');
                    this.dom.actionBtn.classList.add('disabled');
                })
                .catch((err) => {
                    console.log(err)
                    alert("This operation is sensitive and requires recent authentication. Log in again before retrying this request.")
                    return auth.signOut()
                        .then(() => {
                            console.log('Sign-out successful')
                        })
                        .catch(err => {
                            console.log(err)
                        });
                });
        }
        // searching for error
        else {
            if (this.data.password.length === 0) {
                this.dom.errorWrapper.classList.add('disabled');
            }
            else if (this.data.password.length < 6) {
                this.dom.errorWrapper.classList.remove('disabled');
                this.dom.errorWrapper.innerText = 'Password must have min. 6 characters';
            }
            else if (!includeNumber(this.data.password)) {
                this.dom.errorWrapper.classList.remove('disabled');
                this.dom.errorWrapper.innerText = 'Password must have number';
            }
            else if (!isUpper(this.data.password)) {
                this.dom.errorWrapper.classList.remove('disabled');
                this.dom.errorWrapper.innerText = 'Password must have upper letter';
            }
            else if (this.data.password !== this.data.passwordRepeat) {
                this.dom.errorWrapper.classList.remove('disabled');
                this.dom.errorWrapper.innerText = 'Passwords do not match';
            }
        }
    }

    // updating user e-mail
    updateEmail() {
        // update only when user enter new
        if (auth.currentUser.email !== this.data.email && validator.isEmail(this.data.email) && this.data.email.length !== 0) {
            return auth.currentUser.updateEmail(this.data.email)
                .then(() => {
                    console.log('Email updated successfully');
                    this.dom.successEmailUpdate.classList.remove('disabled');
                    this.dom.actionBtn.classList.add('disabled');
                })
                .catch((err) => {
                    console.log(err)
                    alert("This operation is sensitive and requires recent authentication. Log in again before retrying this request.");
                    return auth.signOut()
                        .then(() => {
                            console.log('Sign-out successful');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
        }
        if (!validator.isEmail(this.data.email) && this.data.email.length !== 0) {
            this.dom.errorWrapper.classList.remove('disabled');
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



    initScripts() {
        this.changeDataEvent();
        this.updateProfileEvent();
        this.toggleForm();
        this.deleteAccountEvent();
    }
    getDOMElements() {
        this.dom = {
            updateFormContainer: document.querySelector('#update-account'),
            deleteAccountFormContainer: document.querySelector('#delete-account'),
            formInputs: document.querySelectorAll('.account__elementContent'),
            actionBtn: document.querySelector('#btn-update-account'),
            errorWrapper: document.querySelector('#update_profile_error'),
            successEmailUpdate: document.querySelector('#update_profile_email'),
            successPasswordUpdate: document.querySelector('#update_profile_password'),
            toogleIcon: document.querySelector('.account__deleteIcon img'),
            deleteAccountBtn: document.querySelector('#btn-delete-account')
        }
    }
    onDataChange() {
        console.log('Data changed');
    }
    render() {
        this.root.innerHTML = getAccountHTMLCode(this.userData.nick, this.deleteCode);
    }
}

//<a href='https://www.freepik.com/vectors/light'>Light vector created by vectorpouch - www.freepik.com</a>