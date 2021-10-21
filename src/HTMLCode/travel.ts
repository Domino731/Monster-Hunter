import { UserData } from '../types';

/**
 * get html code for travel section
 * @param user - data about current logged user
 */
export const getTravelHTMLCode = (user: UserData) : string => {
    return `
    <section class='travel background' style='background-image: url(${user.currentMission.background.src})'>

           <h2 class='travel__title'>${user.currentMission.title}</h2>

           <div class='travel__countdownWrapper'>

              <div class='countdown__wrapper'>
                 <div class='countdown__progressBar'> </div>
                 <div class='countdown__time'></div>
              </div>

              <button class='countdown__cancelBtn'>Cancel</button>

           </div>

    </section>
    `;
}