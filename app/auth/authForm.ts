export abstract class AuthForm {

    inputs: NodeListOf<Element> | null;
    root: HTMLElement;
    btn: HTMLElement;
    invalidData: boolean;
    data: {
        eMail: string
        password: string
        repeatPassword?: string
        nickname?: string
    };

    constructor(root: string) {
        this.root = document.querySelector(root)
        this.inputs = this.root.querySelectorAll("input")
        this.btn = this.root.querySelector(".auth__submitWrapper button")
        this.data = {
            eMail: "",
            password: "",
            repeatPassword: "",
            nickname: ""
        }
        this.invalidData = true
        this.init();
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
            el.addEventListener("keyup", (e: Event) => {
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
            this.invalidData ? this.authAction() : this.setErrors()
        });
    }
    init() {
        this.addInputEvents();
        this.addButtonEvent();
    };
}