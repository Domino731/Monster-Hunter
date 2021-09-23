export const getSearchFriendHTMLCode = ( ) : string => {

  return `
  <section class='searchFriend'>
    <div class='searchFriend__item searchFriend__item-search'>
        <div class='searchFriend__list'>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Nickname</th>
                        <th>Last visit</th>
                    </tr>
                </thead>
                <tbody id='all_users'>
                </tbody>
            </table>
        </div>
        <div class='searchFriend__searchBar'>
            <div class='searchFriend__searchIcon'>
                <img src='./images/friends_icon_search.png' alt='search' />
            </div>
            <input type='text' name='search_friends_input' class='searchFriend__input'>
        </div>
    </div>

    <div class='searchFriend__item' id='searched_user_root'>
      
    </div>
    </div>
</section>
  `
}

// freepik
//      <a href='https://www.freepik.com/vectors/tree'>Tree vector created by upklyak - www.freepik.com</a>