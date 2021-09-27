import { getChatHTMLCode } from '../viewsHTMLCode/chat';
import { SearchedUserData } from '../types';
export class Chat {
    private root: HTMLElement
    private friend: SearchedUserData
    private dom: {
        emojiList: NodeListOf<Element> | null
        emojiBtn: HTMLImageElement | null
        emojiContainer: HTMLElement | null
        newMessageText: HTMLElement | null
    }
    constructor(root: HTMLElement, friend) {
        this.root = root;
        this.friend = friend;
        this.dom = {
            emojiList: document.querySelectorAll('.chat__emojiContainer img'),
            emojiBtn: document.querySelector('.chat__emojiIcon img'),
            emojiContainer: document.querySelector('.chat__emojiContainer'),
            newMessageText: document.querySelector('.chat__message')
        }
        this.init();
    }


    async getChatroomData() {

    }

    addEmoji() {
        this.dom.emojiList.forEach(el => el.addEventListener('click', () => {
            const emoji: HTMLImageElement = el as HTMLImageElement;
            let messageHTML: string = this.dom.newMessageText.innerHTML
            messageHTML += `<img src='${emoji.src}'/>`
            this.dom.newMessageText.innerHTML = messageHTML;
            console.log(emoji.src)
        }))
    }

    // scroll to bottom of message, in order when a user selects emoji, know where new emoji is
    scrollToBottomMessage(){
        const scrollToBottom = () => {
            this.dom.newMessageText.scrollTop =  this.dom.newMessageText.scrollHeight;
        }
        this.dom.newMessageText.addEventListener('mouseover', scrollToBottom);
        this.dom.newMessageText.addEventListener('mouseleave', scrollToBottom)
    } 
     
    toogleEmojiList() {
        this.dom.emojiBtn.addEventListener('click', () => {
            // boolean value, needed to toogle emoji list 
            const flag: boolean = this.dom.emojiContainer.classList.contains('disabled')
            if (flag) {
                this.dom.emojiContainer.classList.remove('disabled');
                this.dom.emojiBtn.src = './images/close.png';
            }
            else {
                this.dom.emojiContainer.classList.add('disabled');
                this.dom.emojiBtn.src = './images/chat_emoji_icon.png';
            }
        });
    }

    // method which is responsible for injecting html code into game root
    render() {
        this.root.innerHTML = getChatHTMLCode(this.friend);
    }

    // getting the dom elements of newly injected html code
    getDOMElements() {
        this.dom = {
            emojiList: document.querySelectorAll('.chat__emojiContainer img'),
            emojiBtn: document.querySelector('.chat__emojiIcon img'),
            emojiContainer: document.querySelector('.chat__emojiContainer'),
            newMessageText: document.querySelector('.chat__message')
        }
    }

    // initialization of scripts
    initScripts() {
        this.toogleEmojiList();
        this.addEmoji();
        this.scrollToBottomMessage();
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