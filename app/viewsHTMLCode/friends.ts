import { friendWindow } from './../views/sub_views/friendWindow';
import { FriendData } from '../types';
export const getFriendsHTMLCode = (friendsList: FriendData[]) : string => {

    return `
    
    <section class="friends">

    <div class="friends__itemWrapper">
        <div class="friends__topBar">

            <div class="friends__searchWrapper">
                <img src="./images/friends_icon_search.png" alt="search" class="friends__searchIcon">
                <input type="text" class="friends__searchInput" name="friends_search_input">
            </div>

            <div class="friends__settingsWrapper">
                <img src="./images/friends_icon_sort.png" alt="sort" class="friends__settingsIcon" id="friends_sort_btn">
                <img src="./images/friends_icon_filter.png" alt="filter" class="friends__settingsIcon" id="friends_filter_btn">


                <form class="friends__settingsForm" id="friends_sort_form">
                    <div class="friends__checkboxWrapper friends__checkboxWrapper-highestLevel">
                        <label>

                            From highest level
                            <input type="checkbox">
                            <span></span>
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </label>
                    </div>

                    <div class="friends__checkboxWrapper friends__checkboxWrapper-LowestLevel">
                        <label>
                            From lowest level
                            <input type="checkbox">
                            <span></span>
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </label>
                    </div>

                    <div class="friends__checkboxWrapper friends__checkboxWrapper-highestGold">
                        <label>
                            Highest amount of gold
                            <input type="checkbox">
                            <span></span>
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </label>
                    </div>

                    <div class="friends__checkboxWrapper friends__checkboxWrapper-LowestGold">
                        <label>
                            Lowest amount of gold
                            <input type="checkbox">
                            <span></span>
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </label>
                    </div>

                    <div class="friends__checkboxWrapper friends__checkboxWrapper-timePlayed">
                        <label>
                            Game time
                            <input type="checkbox">
                            <span></span>
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </label>
                    </div>
                </form>





                <form class="friends__settingsForm friends__settingsForm-filter" id="friends_filter_form">
                    <div class="friends__checkboxWrapper friends__checkboxWrapper-highestLevel">
                        <label>
                            Online friends
                            <input type="checkbox">
                            <span></span>
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </label>
                    </div>

                    <div class="friends__checkboxWrapper friends__checkboxWrapper-LowestLevel">
                        <label>
                            Ofline friends
                            <input type="checkbox">
                            <span></span>
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </label>
                    </div>

                    <div class="friends__checkboxWrapper friends__checkboxWrapper-highestGold">
                        <label>
                            With a higher level than yours

                            <input type="checkbox">
                            <span></span>
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </label>
                    </div>

                    <div class="friends__checkboxWrapper friends__checkboxWrapper-LowestGold">
                        <label>
                            With a lower level than yours
                            <input type="checkbox">
                            <span></span>
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </label>
                    </div>

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