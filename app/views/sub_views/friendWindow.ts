import { SearchedUserData } from "../../types"
export const friendWindow = (friend: SearchedUserData): string => {
    return `
    <div class='friends__item'> 
            <div class='friend' data-user-id='${friend.id}'> 
              <div class='friend__portraitWrapper'>
                   <img src='${friend.portrait}' alt='portait' class='friend__portrait'/>
                 </div>
                 <h2 class='friend__name'>${friend.nick}</h2>
                 <div class='friend__actionBar'> 
                 <div class='friend__actionBtn friend__actionBtn-profile'> 
                   <img src='./images/menu_profile.png' class='friend__icon'/> Profile
                 </div>
                 <div class='friend__actionBtn friend__actionBtn-chat'> 
                 <img src='./images/friends_message_icon.png' class='friend__icon'/> Chat
               </div>
                 </div>
            </div>
        </div>
    `
}