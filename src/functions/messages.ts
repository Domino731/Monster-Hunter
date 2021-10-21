import { UserData, SearchedUserData } from '../types';
import { auth } from '../firebase/index';
import { formatChatDate } from './formatDate';
import { MessageData } from '../types';

/** 
 *  function responsbile for adding class which is reponsbile for the border radius of message cloud - for friend message
 * @param num - number needed to check if the message is first
 * @param last - boolean value needed to check uf the message is last
 */
 const getFriendCloudClassName = (num: number, last: boolean) : string => {
  if (num === 0) {
    return 'message__cloud-friendFirst';
  }
  if (last) {
    return 'message__cloud-friendLast';
  }
}

/** 
 * function responsbile for adding class which is reponsbile for the border radius of message cloud - for user message
 * @param num - number needed to check if the message is first
 * @param last - boolean value needed to check uf the message is last
 */
 const getUserCloudClassName = (num: number, last: boolean) : string => {
  if (num === 0) {
    return 'message__cloud-userFirst';
  }
  if (last) {
    return 'message__cloud-userLast';
  }
}

/**
 * get html code for message
 * @param friend - data about friend, needed to create message with appropriate styles
 * @param currentUser - data about current user, needed to create message  with appropriate styles
 * @param message - data about message
 */
export const getMessageCode = (friend: SearchedUserData, currentUser : UserData, message: MessageData): string => {

  // check if message was sent by a friend in order to add appropriate styles
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
    `;
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
    `;
  }
}


