export class SearchFriend {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='searchFriend'>
           <div class='searchFriend__item searchFriend__item-search'>

              <div  class='searchFriend__list'>
                <table>
                   <thead>
                     <tr>
                       <th>Status</th>
                       <th>Nickname</th>
                       <th>Level</th>
                     </tr>  
                    </thead>
                  <tbody>



                   <tr>
                   <td><span class='status status-online'>Online</span></td>
                   <td><span class='nick'>OlimpicGod739</span></td>
                   <td><span class='level'>13</span></td>
                   </tr>
                   <tr>
                   <td><span class='status status-offline'>Offline</span></td>
                   <td><span class='nick'>OlimpicGod739</span></td>
                   <td><span class='level'>13</span></td>
                   </tr>
             
                    
                  </tbody>               
                </table>
                 </div>
                <div class='searchFriend__searchBar'>
                <div class='searchFriend__searchIcon'> 
                  <img src='./images/friends_icon_search.png' alt='search'/>
                </div>
                <input type='text' name='search_friends_input' class='searchFriend__input'>
                </div>
           </div>

           <div class='searchFriend__item searchFriend__item-result'>
           <div class='profile__equipment'>
                   <div class='profile__equipmentItem profile__equipmentItem-helmet'> 
                      <img src='/images/profile_equipment_helmet.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-armor'> 
                      <img src='/images/profile_equipment_armor.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-gloves'> 
                      <img src='/images/profile_equipment_gloves.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-weapon'> 
                      <img src='/images/profile_equipment_weapon.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-shield'> 
                      <img src='/images/profile_equipment_shield.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__equipmentItem profile__equipmentItem-special'> 
                      <img src='/images/profile_equipment_special.png' class="profile__equipmentIcon">
                   </div>
                   <div class='profile__portrait'> </div>
                   <div class='profile__info'>
                      <div class='profile__level'>  </div>
                      <strong class='profile__nickname'>nickname</strong>
                   </div>
                </div>
                <div class='profile__description'> 
                   <p></p>
                </div>
               <a href='https://www.freepik.com/vectors/tree'>Tree vector created by upklyak - www.freepik.com</a>

             </div>
           </div>
        </section>`;
    }

    init() {
       this.render();
    }
}


