import { SearchedUserData } from '../types';


/**
 *  get html code for friends section
 */
export const getFriendsHTMLCode = (): string => {

    return `
    <section class="friends background">

    <div class='closeIcon closeIcon__chat disabled'>
        <img src='./images/close.png' />
    </div>

    <div class="friends__itemWrapper" id='friends_container'>

        <div class="friends__topBar">

            <div class="friends__searchWrapper">
                <div class='searchFriend__searchIcon'>
                    <img src='./images/friends_icon_search.png' alt='search' />
                </div>
                <input type='text' name='search_friends_input' class='searchFriend__input'>
            </div>

            <div class="friends__settingsWrapper">

                <img src="./images/close.png" alt="filter" title='Close' class="friends__settingsIcon disabled"
                    id="friends_close_btn">
                <img src="./images/friends_icon_sort.png" alt="sort" title='Sort friends list'
                    class="friends__settingsIcon" id="friends_sort_btn">
                <img src="./images/friends_icon_filter.png" alt="filter" title='Filter friends list'
                    class="friends__settingsIcon" id="friends_filter_btn">


                <form class="friends__settingsForm disabled" id="friends_sort_form">

                    <h3 class='friends__settingsTitle'>Sort</h3>
                    <fieldset>

                        <div class="friends__checkboxWrapper friends__checkboxWrapper-highestLevel">
                            <label>
                                From highest level
                                <input type="radio" name='friends-sort' value='sort-by-highest-level'>
                                <span></span>
                                <i class="fas fa-check" aria-hidden="true"></i>
                            </label>
                        </div>

                        <div class="friends__checkboxWrapper friends__checkboxWrapper-LowestLevel">
                            <label>
                                From lowest level
                                <input type="radio" name='friends-sort' value='sort-by-lowest-level'>
                                <span></span>
                                <i class="fas fa-check" aria-hidden="true"></i>
                            </label>
                        </div>

                    </fieldset>
                </form>





                <form class="friends__settingsForm friends__settingsForm-filter disabled" id="friends_filter_form">

                    <h3 class='friends__settingsTitle'>Filter</h3>


                    <fieldset>

                        <div class="friends__checkboxWrapper friends__checkboxWrapper-highestGold">
                            <label>
                                With a higher level than yours
                                <input type="radio" name='friends-filter' value='higher-level'>
                                <span></span>
                                <i class="fas fa-check" aria-hidden="true"></i>
                            </label>
                        </div>

                        <div class="friends__checkboxWrapper friends__checkboxWrapper-LowestGold">
                            <label>
                                With a lower level than yours
                                <input type="radio" name='friends-filter' value='lower-level'>
                                <span></span>
                                <i class="fas fa-check" aria-hidden="true"></i>
                            </label>
                        </div>

                        <div class="friends__checkboxWrapper friends__checkboxWrapper-LowestGold">
                            <label>
                                None
                                <input type="radio" name='friends-filter' value='none' checked>
                                <span></span>
                                <i class="fas fa-check" aria-hidden="true"></i>
                            </label>
                        </div>

                    </fieldset>

                </form>

            </div>
        </div>

        <div class="friends__list"></div>

    </div>

    <div class="friends__itemWrapper disabled" id='friends_branch'> </div>

</section>
    `;
}

/**
 * get html code for friend window
 * @param friend - data about friend (portrait, nick)
 */
export const friendWindow = (friend: SearchedUserData): string => {
    return `
    <div class='friend glass'>

    <div class='friend__portraitWrapper'>
        <img src='${friend.portrait}' alt='portait' class='friend__portrait' />
    </div>

    <h2 class='friend__name'>${friend.nick}</h2>
    <div class='friend__actionBar'>
        <div class='friend__actionBtn friend__actionBtn-profile'>
            <img src='./images/menu_profile.png' class='friend__icon' /> Profile
        </div>
        <div class='friend__actionBtn friend__actionBtn-chat'>
            <img src='./images/friends_message_icon.png' class='friend__icon' /> Chat
        </div>
    </div>
    
</div>
    `;
}