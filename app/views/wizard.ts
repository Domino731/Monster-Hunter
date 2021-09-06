export class Wizard {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='wizard transparent'>
           <div class='wizard__item wizard__shopWrapper'>
                <div class='market__characterWrapper'>
                    <img class='market__characterImg' src='./images/wizard.png' alt='wizard'/>          
                </div>
              
                <div class='market__itemsList'> 
                 <div class='market__shopRow'> 
                      <div class='market__shopFrame wizard__frame'>
                          <img src='./images/weapon_sword_diamond.png' alt='frer of monsters' class='market__weapon market__weapon-wizard'/>
                      </div>
                      <div class='market__shopFrame wizard__frame'>
                         
                      </div>
                      <div class='market__shopFrame wizard__frame'>
                         
                      </div>
                 </div>
                    <div class='market__shopRow'> 
                      <div class='market__shopFrame wizard__frame'>
                          <img src='./images/weapon_sword_diamond.png' alt='frer of monsters' class='market__weapon market__weapon-wizard'/>
                      </div>
                      <div class='market__shopFrame wizard__frame'>
                         
                      </div>
                      <div class='market__shopFrame wizard__frame'>
                         
                      </div>
                    </div>
                </div>
          </div>

          <div class='wizard__item'>
             
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

          <div class='profile__backpack'>
          <div class='profile__backpackRow'>
             <div class='profile__backpackItem'> </div>
             <div class='profile__backpackItem'> </div>
             <div class='profile__backpackItem'> </div>
             <div class='profile__backpackItem'> </div>
             <div class='profile__backpackItem'> </div>
          </div>
          <div class='profile__backpackRow'>
             <div class='profile__backpackItem'> </div>
             <div class='profile__backpackItem'> </div>
             <div class='profile__backpackItem'> </div>
             <div class='profile__backpackItem'> </div>
             <div class='profile__backpackItem'> </div>
          </div> 
     </div>


          </div>
        </section>`;
    }

    init() {
       this.render();
    }
}

// <a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpouch - www.freepik.com</a>