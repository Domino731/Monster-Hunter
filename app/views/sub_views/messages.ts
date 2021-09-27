import { auth } from '../../firebase/index';
import { MessageData } from '../../types';
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
          return `<p class='message__cloud message__cloud-friend'>${el}</p>`
        }).join('')
        }
      
    </div>
  </div>
    `
  }
  else{
      return `
    <div class='message'>
   

    <div class='message__content message__content-user'> 
      <strong class='message__nick'>${currentUser.nick}</strong>
      ${
        message.content.map((el) => {
          return `<p class='message__cloud message__cloud-friend'>${el}</p>`
        }).join('')
        }
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

//<div class='message__time'> Yesterday, 12:45</div>