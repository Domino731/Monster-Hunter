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
    private currentUser: UserData;
    private messages: any;
    private userConversation: Conversation | null;
    constructor(root: HTMLElement, currentUser: UserData, friend: SearchedUserData) {
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
        };
        this.userConversation = null;
        this.init();
    }

    async updateChatData(newData: Conversation) {
        await db.collection('chat')
            .doc(`${auth.currentUser.uid}`)
            .collection('conversations')
            .where('recipientId', '==', `${this.friend.id}`)
            .get()
            .then(response => {
                response.docs.forEach(doc => {
                    return db.collection('chat')
                        .doc(`${auth.currentUser.uid}`)
                        .collection('conversations')
                        .doc(doc.id)
                        .update(newData)
                        .then(() => {
                            // clean input text
                            this.dom.newMessageText.innerHTML = '';
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
            })
    }

    // listening for chat data updates in firestore
    async dataChangeListener() {
        // current user
        await db.collection('chat')
            .doc(`${auth.currentUser.uid}`)
            .collection('conversations')
            .where('recipientId', '==', `${this.friend.id}`)
            .onSnapshot((snapshot) => {
                snapshot.docChanges.forEach((change) => {
                    if (change.type === "modified") {
                        this.conversation.messages = change.doc.data().messages;
                        this.renderChat();

                    }
                });
            })
        // friend
        await db.collection('chat')
            .doc(`${this.friend.id}`)
            .collection('conversations')
            .where('recipientId', '==', `${auth.currentUser.uid}`)
            .onSnapshot((snapshot) => {
                snapshot.docChanges.forEach((change) => {
                    if (change.type === "modified") {
                        this.conversation.messages = change.doc.data().messages;
                        this.renderChat();
                    }
                    if (change.type === "removed") {
                        location.reload();
                    }
                });
            });
    }
    async getChatroomData() {
        let conversation: Conversation = {
            messages: [],
            createdAt: new Date(),
            participants: [],
            updatedAt: new Date(),
            recipientId: ''
        }
        const friendNick = this.friend.nick
        let userMessages : Conversation | null = null;
        let  friendMessages : MessageData [] | null = null;
        await db.collection('chat')
            .doc(`${auth.currentUser.uid}`)
            .collection('conversations')
            .where('recipientId', '==', `${this.friend.id}`)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(function (doc) {
                    userMessages = doc.data() as Conversation
                    userMessages.messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                    conversation.messages.push(...userMessages.messages);
                    conversation.createdAt = doc.data().createdAt;
                    conversation.updatedAt = doc.data().updatedAt;
                    conversation.participants =  doc.data().participants; 
                    
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
                    friendMessages = doc.data().messages as MessageData [];
                    friendMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                    conversation.messages.push(...friendMessages)
                });
            })
            .catch(err => console.log(err))

        // sort by date
        this.userConversation = userMessages;
        conversation.messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.conversation = conversation;
    }

    general() {

    }
    renderChat() {
        // sort by date
        this.conversation.messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        let html = '';
        this.conversation.messages.forEach(el => {
            html += getMessageCode(this.friend, this.currentUser, el)

        });
        this.dom.chatContainer.innerHTML = html;

        this.dom.chatContainer.scrollTop = this.dom.chatContainer.scrollHeight;
    }
    sendMessageEvent() {
        this.dom.sendMessageBtn.addEventListener('click', () => {

            const messageText: string = this.dom.newMessageText.innerHTML;
            if (messageText !== '') {
                const newMessage = () => {
                    const data: MessageData = {
                        content: [],
                        createdAt: new Date,
                        nick: this.currentUser.nick,
                        userId: auth.currentUser.uid
                    }
                    data.content.push(messageText)
                    this.dom.sendMessageBtn.classList.add('disabled');
                    this.userConversation.messages.push(data);
                }
                const currentTime: Date = new Date();
                const index: number =  this.userConversation.messages.length - 1;
                const allMessagesIndex: number = this.conversation.messages.length - 1;
                if (this.userConversation.messages[index] && this.conversation.messages[allMessagesIndex].nick === this.currentUser.nick) {
                    const lastUpdate: Date = this.conversation.messages[index].createdAt;
                    let diffInMilliSeconds: number = Math.abs(lastUpdate.getTime() - currentTime.getTime()) / 1000;
                    const minutes: number = Math.floor(diffInMilliSeconds / 60) % 60;
                    if (minutes <= 3) {
                        let oldContent: string[] = this.userConversation.messages[index].content;
                        this.dom.sendMessageBtn.classList.add('disabled');
                        oldContent.push(messageText);
                        this.updateChatData(this.userConversation);
                    }
                    else {
                        newMessage();
                        this.updateChatData(this.userConversation);
                    }
                }
                else {
                    newMessage();
                    this.updateChatData(this.userConversation);
                }

            }
        });
    }
    addEmoji() {
        this.dom.emojiList.forEach(el => el.addEventListener('click', () => {
            const emoji: HTMLImageElement = el as HTMLImageElement;
            let messageHTML: string = this.dom.newMessageText.innerHTML
            messageHTML += `<img src='${emoji.src}'/>`
            this.dom.newMessageText.innerHTML = messageHTML;
            console.log(this.dom.newMessageText.innerHTML)
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
    checkMessage() {
        const check = () => {
            if (this.dom.newMessageText.innerText.length !== 0) {
                this.dom.sendMessageBtn.classList.remove('disabled');
            }
            else {
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
        this.dataChangeListener();
         this.renderChat();
        this.toogleEmojiList();
        this.addEmoji();
        this.scrollToBottomMessage();
        this.sendMessageEvent();
        this.checkMessage();
        this.dataChangeListener();
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