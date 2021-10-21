import { UserData } from '../types';

/**
 * get html code for tavern section
 * @param user - data about current logged user 
 */
export const getTavernHTMLCode = (user: UserData) : string => {
    return `
    <section class='tavern '>

    <div class='tavern__item'>

        <div class='tavern__characterWrapper'>

            <div class='tavern__willingnessBarWrapper' title='Mission willingness: ${user.missionWillingness}/100'>
                <div class='tavern__willingnessBar tavern__willingnessBar-green'
                    style='height: ${user.missionWillingness}%;'> </div>
                <div class='tavern__willingnessBar tavern__willingnessBar-red'
                    style='height: ${user.missionWillingness}%;'> </div>
            </div>

            <img class='mission__character disabled' alt='character'>
            <span></span>

            <div class='tavern__countdownWrapper ${user.missionWillingness > 100 && ' disabled'}'>Missions wiligness
                reset in <span> </span></div>
                
        </div>

        <div class='tavern__detailsWrapper'>

            <div class='tavern__details'>

                <div class='mission__informations disabled'>

                    <div class='textRool'></div>

                    <div class='mission__contentWrapper'>

                        <div class='mission__content'>
                            <div class='mission__detailsWrapper'>
                                <div id='mission_content_wrapper'> </div>
                                <div class='tavern__missionError'></div>
                                <button class='mission__acceptBtn'>Accept this mission</button>
                            </div>
                        </div>

                        <div class='textRool textRool-bottom'></div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <div class='tavern__item'>

        <div class='tavern__list'>
            <h2 class='tavern__title'>Available missions</h2>
            <div class='tavern__listWrapper'> </div>
        </div>

    </div>

</section>
    `;
}


