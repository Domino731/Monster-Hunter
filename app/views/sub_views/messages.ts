import { auth } from '../../firebase/index';
import { MessageData } from '../../types';
import { formatChatDate } from '../../functions/formatDate';
export const getMessageCode = (friend, currentUser, message: MessageData): string => {
  if (message.userId !== auth.currentUser.uid) {
    return `
    <div class='message__portraitWrapper'>
       <div class='message__portrait'> 
         <img src='${friend.portrait}'/>
       </div>
    </div>

    <div class='message__content message__content-friend'> 
      <strong class='message__nick'>${friend.nick}</strong>
      ${message.content.map((el, num) => {
      return `<div class='message__cloud message__cloud-friend ${getFriendCloudClassName(num, num === message.content.length - 1)}'>
          ${el}
          </div>`
    }).join('')
      }
        <strong>${formatChatDate(message.createdAt)}</strong>
    </div>
    `
  }
  else {
    return `
 
   

    <div class='message__content message__content-user'> 
      <strong class='message__nick'>You</strong>
      ${message.content.map((el, num) => {
      return `
          <div class='message__cloud message__cloud-user ${getUserCloudClassName(num, num === message.content.length - 1)}'>${el}</div>
          
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

    `
  }
}

const getFriendCloudClassName = (num: number, last: boolean) => {
  if (num === 0) {
    return 'message__cloud-friendFirst'
  }
  if (last) {
    return 'message__cloud-friendLast'
  }
}
 const getUserCloudClassName = (num: number, last: boolean) => {
  if (num === 0) {
    return 'message__cloud-userFirst'
  }
  if (last) {
    return 'message__cloud-userLast'
  }
}