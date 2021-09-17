import { getProfileHTMLCode } from '../viewsHTMLCode/profile';
import { View } from './view';
export class Profile extends View {

    private root: HTMLElement
    constructor() {
       super()
    }

    render() {
        this.root.innerHTML = getProfileHTMLCode();
    }





    setUserEquipment(){
      this.userData.equipmentItems.forEach(el => {
         const equipmentSlot: HTMLElement = document.querySelector(`#profile_equipment_slots div[data-slot-name = '${el.type}']`);
         equipmentSlot.innerHTML = `  <img src='${el.src}' class="profile__equipmentIcon" data-current-item-id='${el.id}' draggable='true'/>`
      })
    }
    onDataChange(){}
    getDOMElements(){}
    initScripts() {
        this.setUserEquipment();
    }
}