export const getFriendMessage = (friend) : string => {
    return `
    <div class='message'>
    <div class='message__portraitWrapper'>
       <div class='message__portrait'> 
         <img src='${friend.portrait}'/>
       </div>
    </div>

    <div class='message__content message__content-friend'> 
      <strong class='message__nick'>${friend.nick}</strong>
      <p class='message__cloud message__cloud-friend'> 123123123123</p>
    </div>
  </div>
    `
}

export const getUserMessage = (user) : string => {
    return `
    <div class='message'>
   

    <div class='message__content message__content-user'> 
      <strong class='message__nick'>${user.nick}</strong>
      <p class='message__cloud message__cloud-user'> 123123123123</p>
    </div>

    <div class='message__portraitWrapper'>
       <div class='message__portrait'> 
         <img src='${user.portrait}'/>
       </div>
    </div>


  </div>
    `
}