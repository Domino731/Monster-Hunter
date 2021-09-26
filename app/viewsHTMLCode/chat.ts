import { getFriendMessage, getUserMessage } from './../views/sub_views/messages';
import { SearchedUserData } from '../types';
const foo = `licabo ipsam, debitis dolores, `
export const getChatHTMLCode = (friend: SearchedUserData): string => {

    return `
    <section class='chat'> 
       <div class='chat__topBar'>
         <div class=' chat__portrait chat__portrait-small'>
            <img src='${friend.portrait}'/>
            <h3 class='chat__friendNick'>${friend.nick}</h3>
         </div>
       </div>





       <div class='chat__content'> 
       
          ${getFriendMessage(friend)}
          ${getUserMessage(friend)}
          ${getFriendMessage(friend)}
          ${getUserMessage(friend)}
          ${getFriendMessage(friend)}
          ${getUserMessage(friend)}
          <div class='message__time'> Yesterday, 12:45</div>
          ${getFriendMessage(friend)}
          ${getUserMessage(friend)}
          ${getFriendMessage(friend)}
          ${getUserMessage(friend)}
          ${getFriendMessage(friend)}
          ${getUserMessage(friend)}
          ${getFriendMessage(friend)}
          ${getUserMessage(friend)}
          ${getFriendMessage(friend)}
          ${getUserMessage(friend)}
          ${getFriendMessage(friend)}
          ${getUserMessage(friend)}
          ${getFriendMessage(friend)}
          ${getUserMessage(friend)}
          ${getFriendMessage(friend)}
          ${getUserMessage(friend)}
          
       </div>





















       <div class='chat__botBar'> 

          <div class='chat__emojiList'>
          
          </div>

          <div class='chat__emojiIcon'> 
             <img src='./images/chat_emoji_icon.png'/>
          </div>
          <form class='chat__form'>
             <img src='./images/chat_text_icon.png' class='chat__textIcon'/>
             <div class='chat__textareaWrapper'> 
             asdasd
            <textarea class='chat__textarea'> </textarea> 
               
             
             </div>
             <button class='chat__btn'>SEND</button>
          </form>
       </div>
    </section>
    `
}