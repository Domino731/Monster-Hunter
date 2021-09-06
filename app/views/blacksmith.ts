export class Blacksmith {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='blacksmith transparent'>
           <div class='blacksmith__item'>
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
           
                 <div class='profile__backpack '>
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

           <div class='blacksmith__item'> 
               <div class='blacksmith__character'>
                                     
                </div>
    
                <div class='blacksmith__shop'>
                   <div class='blacksmith__shopRow'> 
                      <div class='blacksmith__shopItem'>
                         
                      </div>
                      <div class='blacksmith__shopItem'>
                         
                      </div>
                      <div class='blacksmith__shopItem'>
                         
                      </div>
                   </div>

                <div class='blacksmith__shopRow'> 
                   <div class='blacksmith__shopItem'>
                         
                   </div>
                   <div class='blacksmith__shopItem'>
                   
                   </div>
                   <div class='blacksmith__shopItem'>
                   
                   </div>
                </div>
                </div>
           
           </div>
             

    
        </section>`;
    }
    

    init() {
       this.render();
    }
}

// <a href='https://www.freepik.com/vectors/frame'>Frame vector created by upklyak - www.freepik.com</a>

