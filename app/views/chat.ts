import { getChatHTMLCode } from '../viewsHTMLCode/chat';
import { SearchedUserData } from '../types';
export class Chat {
    private root: HTMLElement
    private friend: SearchedUserData
    private dom: {
        emojiBtn: HTMLImageElement
        emojiList: HTMLElement
    }
    constructor(root: HTMLElement, friend) {
        this.root = root;
        this.friend = friend;
        this.dom = {
           emojiBtn: document.querySelector('.chat__emojiIcon img'),
           emojiList: document.querySelector('.chat__emojiList')
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
            emojiBtn: document.querySelector('.chat__emojiIcon img'),
            emojiList: document.querySelector('.chat__emojiList')
        }
    }



    toogleEmojiList(){
       this.dom.emojiBtn.addEventListener('click', ()=> {
          // boolean value, needed to toogle emoji list 
          const flag: boolean = this.dom.emojiList.classList.contains('disabled')
          if(flag){
              this.dom.emojiList.classList.remove('disabled');
              this.dom.emojiBtn.src = './images/close.png';
          }
          else{
            this.dom.emojiList.classList.add('disabled');
            this.dom.emojiBtn.src = './images/chat_emoji_icon.png';
          }
       });
    }


    // initialization of scripts
    initScripts() {
         this.toogleEmojiList();
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