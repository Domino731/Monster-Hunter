import { getMessageCode } from './../views/sub_views/messages';
import { emojiData } from './../properties/emoji/emoji';
import { SearchedUserData, MessageData } from '../types';
import { auth } from '../firebase/index';

export const getChatHTMLCode = (friend: SearchedUserData, currentUser, messeges: MessageData[]): string => {
   console.log(auth.currentUser.uid)
    return `
    <section class='chat'> 
       <div class='chat__topBar'>
         <div class=' chat__portrait chat__portrait-small'>
            <img src='${friend.portrait}'/>
            <h3 class='chat__friendNick'>
            ${friend.nick}
            ${friend.confirmedFriend ? '' : '<strong>(Not accepted yet)</strong>'}
            </h3>
            
         </div>
       </div>

       <div class='chat__content'> 
                 ${messeges.map((el) => `
                 <div class='message'>
                 ${getMessageCode(friend, currentUser, el)}
                 </div>
                 `
                  
                  ).join('')}
       </div>

       <div class='chat__botBar'> 

         <div class='chat__emojiContainer disabled'>
          ${
            emojiData.map((el) => {
              return `<img src='${el}'/>`
            }).join('')
            }
          </div> 

          <div class='chat__emojiIcon'> 
             <img src='./images/chat_emoji_icon.png'/>
          </div>
          <div class='chat__form'>
             <img src='./images/chat_text_icon.png' class='chat__textIcon'/>
             <div class='chat__messageWrapper' style='border: none; outline: none;'> 
           
            <div class='chat__message' contenteditable='true'>
               
            </div> 

            
             
             </div>
             <button class='chat__btn disabled'>SEND</button>
          </div>
       </div>
    </section>
    `
}