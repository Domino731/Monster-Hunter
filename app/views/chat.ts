import { SearchedUser } from './sub_views/specificUser';
import { getChatHTMLCode } from '../viewsHTMLCode/chat';
import { SearchedUserData, Conversation, MessageData, UserData } from '../types';
import { auth, db } from '../firebase/index';
import { User } from 'firebase';
import { getMessageCode } from './sub_views/messages';
export class Chat {
    private root: HTMLElement
    private friend: SearchedUserData
    private conversation: Conversation | null
    private dom: {
        emojiList: NodeListOf<Element> | null
        emojiBtn: HTMLImageElement | null
        emojiContainer: HTMLElement | null
        newMessageText: HTMLElement | null
        sendMessageBtn: HTMLElement | null
        chatContainer: HTMLElement | null
    }
    private currentUser: UserData
    constructor(root: HTMLElement, friend: SearchedUserData, currentUser: UserData) {
        this.root = root;
        this.friend = friend;
        this.currentUser = currentUser;
        this.conversation = null;
        this.dom = {
            emojiList: document.querySelectorAll('.chat__emojiContainer img'),
            emojiBtn: document.querySelector('.chat__emojiIcon img'),
            emojiContainer: document.querySelector('.chat__emojiContainer'),
            newMessageText: document.querySelector('.chat__message'),
            sendMessageBtn: document.querySelector('.chat__btn'),
            chatContainer: document.querySelector('.chat__content')
        }
        this.init();
    }


    async getChatroomData() {
        let conversation: Conversation | null = null;

        await db.collection('chat')
            .doc(`${auth.currentUser.uid}`)
            .collection('conversations')
            .where('recipientId', '==', `${this.friend.id}`)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    conversation = doc.data() as Conversation;
                });
            })
            .catch(err => console.log(err))

        await db.collection('chat')
            .doc(`${this.friend.id}`)
            .collection('conversations')
            .where('recipientId', '==', `${auth.currentUser.uid}`)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    conversation.messages.push(...doc.data().messages)
                });
            })
            .catch(err => console.log(err))

        // sort by date
        conversation.messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        this.conversation = conversation;
    }

    renderChat() {
        let html = '';
        this.conversation.messages.forEach(el => {
            html += getMessageCode(this.friend, this.currentUser, el)
        });
        this.dom.chatContainer.innerHTML = html;
    }
    sendMessageEvent() {      
        this.dom.sendMessageBtn.addEventListener('click', () => {
            const messageText: string = this.dom.newMessageText.innerHTML;
          
                const newMessage = () => {
                    const data: MessageData = {
                        content: [],
                        createdAt: new Date,
                        nick: this.currentUser.nick,
                        userId: auth.currentUser.uid
                    }
                    data.content.push(messageText)
                    this.conversation.messages.push(data);
                }
                const currentTime: Date = new Date();
                const index: number = this.conversation.messages.length - 1;

                if (this.conversation.messages[index]) {
                    const lastUpdate: Date = this.conversation.messages[index].createdAt;
                    let diffInMilliSeconds: number = Math.abs(lastUpdate.getTime() - currentTime.getTime()) / 1000;
                    const minutes: number = Math.floor(diffInMilliSeconds / 60) % 60;
                    if (minutes <= 3) {
                        let oldContent: string[] = this.conversation.messages[index].content;
                        oldContent.push(messageText);
                    }
                    else {
                        newMessage();
                    }
                }
                else {
                    newMessage();
                }
            

        });
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
    scrollToBottomMessage() {

        const scrollToBottom = () => {
            this.dom.newMessageText.scrollTop = this.dom.newMessageText.scrollHeight;
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

    // check if message text has more than 0 letter
    checkMessage(){
        const check = () => {
          if(this.dom.newMessageText.innerText.length !== 0){
              this.dom.sendMessageBtn.classList.remove('disabled');
          }
          else{
            this.dom.sendMessageBtn.classList.add('disabled');
          }
        }
         this.dom.newMessageText.addEventListener('keyup', check);
         this.dom.newMessageText.addEventListener('change', check);
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
            newMessageText: document.querySelector('.chat__message'),
            sendMessageBtn: document.querySelector('.chat__btn'),
            chatContainer: document.querySelector('.chat__content')
        }
    }

    // initialization of scripts
    initScripts() {
        this.toogleEmojiList();
        this.addEmoji();
        this.scrollToBottomMessage();
        this.sendMessageEvent();
        this.checkMessage();
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