import { getChatHTMLCode } from '../HTMLCode/chat';
import { SearchedUserData, Conversation, MessageData, UserData } from '../types';
import { auth, db } from '../firebase/index';
import { getMessageCode } from '../functions/messages';

// class responsible for chat section
export class Chat {

    // Container where new created component will be injected.
    private root: HTMLElement;
    // friend data needed to get his chat messages and display his nick
    private friend: SearchedUserData;
    // current user data needed to get his chat messages and to send text messages, 
    private currentUser: UserData;
    // object with conversation data, contains all messages and user and friend messages. These data is splited to avoid duplicates in conversations and reduce data size.
    private conversation: {
        // user and friend messages, based on this data chat will rendered 
        general: Conversation | null;
        // user messages
        user: Conversation | null;
        // friend messages
        friend: Conversation | null;
    }
    private dom: {
        // list with emoji. When the user clicks on an emoji it will be added to the message -  addEmoji() method
        emojiList: NodeListOf<Element> | null;
        // button by which user can toogle list with emoji - toggleEmojiList() method
        emojiBtn: HTMLImageElement | null;
        // container with emoji is shown when the user presses the above button- toggleEmojiList() method
        emojiContainer: HTMLElement | null;
        // div that serves as an input for creating a new message, it has to be div because you can't put emoticons in the input - sendMessage() and addEmoji() methods
        newMessageText: HTMLElement | null
        // button by which user can send new message - sendMessage() method
        sendMessageBtn: HTMLElement | null
        // chat container needed to insert messages inside him - renderChat() method
        chatContainer: HTMLElement | null
    }

    constructor(root: HTMLElement, currentUser: UserData, friend: SearchedUserData) {
        this.root = root;
        this.friend = friend;
        this.currentUser = currentUser;
        this.conversation = {
            general: null,
            user: null,
            friend: null
        };
        this.dom = {
            emojiList: document.querySelectorAll('.chat__emojiContainer img'),
            emojiBtn: document.querySelector('.chat__emojiIcon img'),
            emojiContainer: document.querySelector('.chat__emojiContainer'),
            newMessageText: document.querySelector('.chat__message'),
            sendMessageBtn: document.querySelector('.chat__btn'),
            chatContainer: document.querySelector('.chat__content')
        };
        this.init();
    }


    /**
     update user's messages data with friend in firestore, used in sendMessage() method
     update data will trigger chatRender() method and conversation will be rerendered 
     */
    async updateChatData(newData: Conversation) {
        await db.collection('chat')
            .doc(`${auth.currentUser.uid}`)
            .collection('conversations')
            .where('recipientId', '==', `${this.friend.id}`)
            .get()
            .then((response: any) => {
                response.docs.forEach((doc: any) => {
                    return db.collection('chat')
                        .doc(`${auth.currentUser.uid}`)
                        .collection('conversations')
                        .doc(doc.id)
                        .update(newData)
                        .then(() => {
                            // clean input text
                            this.dom.newMessageText.innerHTML = '';
                        })
                        .catch((err: any) => {
                            console.log(err);
                        })
                });
            });
    }

    /**
     * listening for chat data updates in firestore, when the date changes then renderChat() method will rerender chat
     */
    async dataChangeListener() {

        // current user
        await db.collection('chat')
            .doc(`${auth.currentUser.uid}`)
            .collection('conversations')
            .where('recipientId', '==', `${this.friend.id}`)
            .onSnapshot((snapshot: any) => {
                snapshot.docChanges.forEach((change: any) => {
                    if (change.type === "modified") {
                        this.conversation.user = change.doc.data() as Conversation;
                        this.conversation.general.messages = change.doc.data().messages;
                        this.conversation.friend !== null && this.conversation.general.messages.push(...this.conversation.friend.messages);
                        this.renderChat();
                    }
                    if (change.type === "removed") {
                        location.reload();
                    }
                });
            })

        // friend
        await db.collection('chat')
            .doc(`${this.friend.id}`)
            .collection('conversations')
            .where('recipientId', '==', `${auth.currentUser.uid}`)
            .onSnapshot((snapshot: any) => {
                snapshot.docChanges.forEach((change: any) => {
                    if (change.type === "modified") {
                        this.conversation.friend = change.doc.data() as Conversation;
                        this.conversation.general.messages = change.doc.data().messages;
                        this.conversation.user !== null && this.conversation.general.messages.push(...this.conversation.user.messages);
                        this.renderChat();
                    }
                    if (change.type === "removed") {
                        location.reload();
                    }
                });
            });
    }
 
    /**
     * get chat data in order to display chat basis on this data
     */
    async getChatroomData() {

        // create new converstation data object
        let conversation: Conversation = {
            messages: [],
            createdAt: new Date(),
            participants: [],
            updatedAt: new Date(),
            recipientId: '',
            createdBy: auth.currentUser.uid
        }

        // split user and friend messages to prevent duplicates
        let userMessages: Conversation | null = null;
        let friendMessages: Conversation | null = null;

        // current user chat data
        await db.collection('chat')
            .doc(`${auth.currentUser.uid}`)
            .collection('conversations')
            .where('recipientId', '==', `${this.friend.id}`)
            .get()
            .then((querySnapshot: any) => {
                querySnapshot.forEach(function (doc: any) {
                    userMessages = doc.data() as Conversation
                    userMessages.messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                    conversation.messages.push(...userMessages.messages);
                    conversation.createdAt = doc.data().createdAt;
                    conversation.updatedAt = doc.data().updatedAt;
                    conversation.participants = doc.data().participants;
                });

            })
            .catch((err: any) => console.log(err))

        // friend chat data    
        await db.collection('chat')
            .doc(`${this.friend.id}`)
            .collection('conversations')
            .where('recipientId', '==', `${auth.currentUser.uid}`)
            .get()
            .then(function (querySnapshot: any) {
                querySnapshot.forEach(function (doc: any) {
                    friendMessages = doc.data() as Conversation
                    friendMessages.messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                    conversation.messages.push(...friendMessages.messages)
                });
            })
            .catch((err: any) => console.log(err))

        // set converstation
        this.conversation.user = userMessages;
        this.conversation.friend = friendMessages;
        this.conversation.general = conversation;
    }
 
    /**
     * render messages between user and friend in chatContainer
     */
    renderChat() {

        // sort messages by date
        this.conversation.general.messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        // create new code
        let html = '';
        this.conversation.general.messages.forEach(el => {
            html += ` <div class='message'>${getMessageCode(this.friend, this.currentUser, el)}</div>`;

        });
        this.dom.chatContainer.innerHTML = html;

        // scroll to the bottom of conversation
        this.dom.chatContainer.scrollTop = this.dom.chatContainer.scrollHeight;

    }

    /**
     * send new createad message into user's data in firestore
     */
    sendMessage() {
        this.dom.sendMessageBtn.addEventListener('click', () => {

            // new message text
            const messageText: string = this.dom.newMessageText.innerHTML;

            // check if message has 1 character at least
            if (messageText !== '') {

                // create new message
                const newMessage = () => {
                    const data: MessageData = {
                        content: [],
                        createdAt: new Date,
                        nick: this.currentUser.nick,
                        userId: auth.currentUser.uid
                    }

                    // add message text into all messages array
                    data.content.push(messageText);

                    // hide button reponsible for sending new message
                    this.dom.sendMessageBtn.classList.add('disabled');

                    // push new message data into user's conversation data
                    this.conversation.user.messages.push(data);
                }

                // index needed for search last message and check if new message will passed into old message content - 
                // if gap between the last message and the new message is less than 3 minutes
                const currentTime: Date = new Date();
                const index: number = this.conversation.user.messages.length - 1;
                const allMessagesIndex: number = this.conversation.general.messages.length - 1;


                // check if the chat is empty, you need to check it because below it is checked if the 
                // gap between the last message and the new message is less than 3 minut
                if (this.conversation.user.messages[index]) {

                    // numbers needed to check this gap
                    const lastUpdate: Date = this.conversation.general.messages[allMessagesIndex].createdAt;
                    const diffInMilliSeconds: number = Math.abs(lastUpdate.getTime() - currentTime.getTime()) / 1000;
                    const minutes: number = Math.floor(diffInMilliSeconds / 60) % 60;

                    // check if gap between the last message and the new message is less than 3 minutes, 
                    //if yes then add new message into this last message content, otherwise create new
                    if (minutes <= 3 && this.conversation.general.messages[allMessagesIndex].nick === this.currentUser.nick) {
                        const oldMessage: MessageData = this.conversation.user.messages[index];
                        this.dom.sendMessageBtn.classList.add('disabled');
                        oldMessage.content.push(messageText);
                        oldMessage.createdAt = new Date();
                        this.updateChatData(this.conversation.user);
                    }
                    else {
                        newMessage();
                        this.updateChatData(this.conversation.user);
                    }
                }
                else {
                    newMessage();
                    this.updateChatData(this.conversation.user);
                }

            }
        });
    }

    /**
     * click event added on each emoji which when clicked, they appear in the message
     */
    addEmoji() {
        this.dom.emojiList.forEach(el => el.addEventListener('click', () => {
            const emoji: HTMLImageElement = el as HTMLImageElement;
            let messageHTML: string = this.dom.newMessageText.innerHTML;
            messageHTML += `<img src='${emoji.src}'/>`
            this.dom.newMessageText.innerHTML = messageHTML;
        }));
    }

    /**
     * scroll to bottom of new message, in order when a user selects emoji to know where new emoji is
     */
    scrollToBottomMessage() {

        const scrollToBottom = () => {
            this.dom.newMessageText.scrollTop = this.dom.newMessageText.scrollHeight;
        }
        this.dom.newMessageText.addEventListener('mouseover', scrollToBottom);
        this.dom.newMessageText.addEventListener('mouseleave', scrollToBottom);

    }

    /**
     * click event applied on emojiBtn by which user can toggle emoji list 
     */
    toggleEmojiList() {
        this.dom.emojiBtn.addEventListener('click', () => {

            // boolean value, needed to toogle emoji list 
            const flag: boolean = this.dom.emojiContainer.classList.contains('disabled');

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

    /**
     * check if message text has more than 0 characters, if yes then show button reponsible for sending new message - sendMessageBtn. This method is triggered when user type new message in order to avoid empty messages
     */
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
 
    /**
     * general action
     */
    general() {
        // scroll to the latest message
        this.dom.chatContainer.scrollTop = this.dom.chatContainer.scrollHeight;
    }
 
    /**
     * method which is responsible for injecting html code into game root
     */
    render() {
        this.root.innerHTML = getChatHTMLCode(this.friend);
    }
 
    /**
     * getting the dom elements of newly injected html code
     */
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
 
    /**
     * initialization of methods
     */
    initScripts() {
        this.dataChangeListener();
        this.renderChat();
        this.toggleEmojiList();
        this.addEmoji();
        this.scrollToBottomMessage();
        this.sendMessage();
        this.checkMessage();
        this.dataChangeListener();
    }

    init() {
        this.getChatroomData()
            .then(() => {
                this.render();
                this.getDOMElements();
                this.initScripts();
                this.general();
            })
            .catch(err => console.log(err))
    }
}
