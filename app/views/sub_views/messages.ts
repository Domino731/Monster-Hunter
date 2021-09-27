import { auth } from '../../firebase/index';
import { MessageData } from '../../types';
import { formatChatDate } from '../../functions/formatDate';
export const getMessageCode = (friend, currentUser, message: MessageData) : string => {
  if(message.userId !== auth.currentUser.uid){
     return `
    <div class='message'>
    <div class='message__portraitWrapper'>
       <div class='message__portrait'> 
         <img src='${friend.portrait}'/>
       </div>
    </div>

    <div class='message__content message__content-friend'> 
      <strong class='message__nick'>${friend.nick}</strong>
      ${
        message.content.map((el) => {
          return `<div class='message__cloud message__cloud-friend'>${el}</div>`
        }).join('')
        }
        <strong>${formatChatDate(message.createdAt)}</strong>
    </div>
  </div>
    `
  }
  else{
      return `
    <div class='message'>
   

    <div class='message__content message__content-user'> 
      <strong class='message__nick'>You</strong>
      ${
        message.content.map((el) => {
          return `
          <div class='message__cloud message__cloud-user'>${el}</div>
          
          `
        }).join('')
        }
        <strong>${formatChatDate(message.createdAt)}</strong>
    </div>

    <div class='message__portraitWrapper'>
       <div class='message__portrait'> 
         <img src='${currentUser.portrait}'/>
       </div>
    </div>

  </div>
    `
  } 
}

