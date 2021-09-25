import { friendWindow } from './../views/sub_views/friendWindow';
import { FriendData } from '../types';
export const getFriendsHTMLCode = (friendsList: FriendData[]): string => {

    return `
    
    <section class="friends">

    <div class="friends__itemWrapper">
        <div class="friends__topBar">

            <div class="friends__searchWrapper">
                <img src="./images/friends_icon_search.png" alt="search" class="friends__searchIcon">
                <input type="text" class="friends__searchInput" name="friends_search_input">
            </div>

            <div class="friends__settingsWrapper">
                <img src="./images/close.png" alt="filter" title ='Close' class="friends__settingsIcon disabled" id="friends_close_btn">
                <img src="./images/friends_icon_sort.png" alt="sort" title='Sort friends list' class="friends__settingsIcon" id="friends_sort_btn">
                <img src="./images/friends_icon_filter.png" alt="filter" title ='Filter friends list' class="friends__settingsIcon" id="friends_filter_btn">
                

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
                        <input type="radio" name='friends-filter' value='none'>
                        <span></span>
                        <i class="fas fa-check" aria-hidden="true"></i>
                    </label>
                </div>
                </fieldset>
                </form>

            </div>
        </div>

        <div class="friends__list">

        





      









        </div>

</div>
    <div class="friends__itemWrapper disabled" id='friends_branch'> </div>
</section>
    `
}