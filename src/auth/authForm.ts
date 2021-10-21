// abstract class responsbile for firebase authentication action
export abstract class AuthForm {

    // inputs nedeed to get their values, based on this values authAction method will be invoke firebase auth action on this data
    protected inputs: NodeListOf<Element> | null;
    // root of form, needed to get input in specific form 
    protected root: HTMLElement;
    // button whose click will invoke authAction method
    protected btn: HTMLElement;
    // loading element, will be displayed while authAction will be invoke
    protected loading: HTMLElement;
   
    // buttons by which user can toogle form (only below 1024px)
    protected loginSwitch: HTMLElement;
    protected registerSwitch: HTMLElement;
    // containers which are needed to hide or show specific form r (only below 1024px)
    protected loginContainer: HTMLElement;
    protected registerContainer: HTMLElement

    // data passed by user in inputs, changing by changeData() method
    protected data: {
        eMail: string;
        password: string;
        repeatPassword?: string;
        nickname?: string;
    };
    // boolean value which will block the invoke of authAction method when data passed by user is incorrect
    protected invalidData: boolean;
    
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
        this.toggleForm();
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

    // adding events for inputs in order to get their values on change and pass this value into data, so authAction() method
    //  will be have data to invoke specific auth action
    changeData() {
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
            el.addEventListener('change', () => {
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

    // click evebt with function applied on form button. If user passed correct data then trigger authAction() method otherwise set errors
    addButtonEvent() {
        this.btn.addEventListener("click", (e: Event) => {
            e.preventDefault();
            this.invalidData ? this.setErrors() : this.authAction()
        });
    }

    // toggle between form and login form (only below 1024px)
    toggleForm() {
        this.registerSwitch.addEventListener('click', () => {
            this.loginContainer.style.display = 'block';
            this.registerContainer.style.display = 'none';
        });
        this.loginSwitch.addEventListener('click', () => {
            this.registerContainer.style.display = 'block';
            this.loginContainer.style.display = 'none';
        });
    }

    // initialization of scripts 
    init() {
        this.changeData();
        this.addButtonEvent();
    };
}