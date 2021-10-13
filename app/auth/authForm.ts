import { auth } from '../firebase/index';
export abstract class AuthForm {

    protected inputs: NodeListOf<Element> | null;
    protected root: HTMLElement;
    protected btn: HTMLElement;
    protected loading: HTMLElement;
    protected invalidData: boolean;
    protected loginSwitch : HTMLElement;
    protected registerSwitch: HTMLElement;
    protected loginContainer: HTMLElement;
    protected registerContainer: HTMLElement
    protected data: {
        eMail: string;
        password: string;
        repeatPassword?: string;
        nickname?: string;
    };

    constructor(root: string) {
        this.root = document.querySelector(root);
        this.inputs = this.root.querySelectorAll('input');
        this.btn = this.root.querySelector('.auth__submitWrapper button');
        this.loading = this.root.querySelector('.auth__loading');
        this.registerSwitch = document.querySelector('#register-switch');
        this.loginSwitch = document.querySelector('#login-switch');
        this.loginContainer = document.querySelector('#auth-login');
        this.registerContainer = document.querySelector('#auth-register');
        this.data = {
            eMail: "",
            password: "",
            repeatPassword: "",
            nickname: ""
        };
        this.invalidData = true;
        this.init();
        this.toogleForm();
    };


    // abstract method - responsible for firebase authentication - create new user or sign in
    authAction() {
        console.error(
            "This method authAction() should be implemented in  inheriting class"
        );
    };

    // abstract method - responsible for catching errors in invalid data
    checkData() {
        console.error(
            "This method checkData() should be implemented in  inheriting class"
        );
    };

    // abstract method - responsible for setting errors in form
    setErrors() {
        console.error(
            "This method setErrors() should be implemented in  inheriting class"
        );
    };

    addInputEvents() {
        this.inputs.forEach(el => {
            el.addEventListener("keyup", () => {
                const { name, value } = el as HTMLInputElement
                this.data = {
                    eMail: this.data.eMail,
                    password: this.data.password,
                    repeatPassword: this.data.repeatPassword,
                    nickname: this.data.nickname,
                    [name]: value
                }
                this.checkData();
            });
        });
    };

    addButtonEvent() {
        this.btn.addEventListener("click", (e: Event) => {
            e.preventDefault();
            this.invalidData ? this.setErrors() : this.authAction()
        });
    }
    toogleForm(){
    
        this.registerSwitch.addEventListener('click', ()=> {
            this.loginContainer.style.display = 'block';
            this.registerContainer.style.display = 'none';
        });
        this.loginSwitch.addEventListener('click', ()=> {
            this.registerContainer.style.display = 'block';
            this.loginContainer.style.display = 'none';
        });
    }

    init() {
        this.addInputEvents();
        this.addButtonEvent();
    };
}