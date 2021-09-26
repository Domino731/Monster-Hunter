import { getChatHTMLCode } from '../viewsHTMLCode/chat';
import { SearchedUserData } from '../types';
export class Chat {
    private root: HTMLElement
    private friend: SearchedUserData
    private dom: {
        textarea: HTMLTextAreaElement
    }
    constructor(root: HTMLElement, friend) {
        this.root = root;
        this.friend = friend;
        this.dom = {
            textarea: document.querySelector('.chat__textarea')
        }
        this.init();
    }


    async getChatroomData() {

    }
    // method which is responsible for injecting html code into game root
    render() {
        this.root.innerHTML = getChatHTMLCode(this.friend);
    }

    // getting the dom elements of newly injected html code
    getDOMElements() {
        this.dom = {
            textarea: document.querySelector('.chat__textarea')
        }
    }


    textareaAutosize() {
        this.dom.textarea.addEventListener('keydown', ()=> {      
                console.log(this.dom.textarea)
                 this.dom.textarea.style.cssText = 'height:auto; padding:0';
                // // for box-sizing other than "content-box" use:
                // // el.style.cssText = '-moz-box-sizing:content-box';
                 this.dom.textarea.style.cssText = 'height:' + this.dom.textarea.scrollHeight + 'px';
        });
    }

    // initialization of scripts
    initScripts() {
         this.textareaAutosize();
    }

    init() {
        this.getChatroomData()
            .then(() => {
                this.render();
                this.getDOMElements();
                this.initScripts();
            })
            .catch(err => console.log(err))
    }
}