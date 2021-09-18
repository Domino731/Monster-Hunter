import { isThisTypeNode } from 'typescript';
import { getProfileHTMLCode } from '../viewsHTMLCode/profile';
import { View } from './view';
import { updateUserData } from '../firebase/operations';
import { potionsData } from '../properties/shop/potions';
import { ShopItem } from '../types';
import { getEquipmentLabel } from './sub_views/getEquipmentLabel';
import { getEquipmentIconSrc } from '../functions/getEquipmentIcon';
export class Profile extends View {

    private petRentInterval: null | ReturnType<typeof setInterval>
    private potionFirstTimeInterval: null | ReturnType<typeof setInterval>
    private potionSecondTimeInterval: null | ReturnType<typeof setInterval>
    private dom: {
        general: {
            goldAmount: HTMLElement | null
            petImg: HTMLElement | null
            petRentTime: HTMLElement | null
            potionImgFirst: HTMLElement | null
            potionTimeFirst: HTMLElement | null
            potionImgSecond: HTMLElement | null
            potionTimeSecond: HTMLElement | null
        }
        equipmentSlots: NodeListOf<Element>
        backpackSlots: NodeListOf<Element>
        error: HTMLElement
        equipmentLabel: {
            root: HTMLElement,
            labelWrapper: HTMLElement
            moveItem: HTMLElement
            moveItemError: HTMLElement
        }

    }

    constructor() {
        super()
        this.petRentInterval = null
        this.potionFirstTimeInterval = null
        this.potionSecondTimeInterval = null
        this.dom = {
            equipmentLabel: {
                root: document.querySelector('#profile_equipment__item_label'),
                labelWrapper: document.querySelector('#profile_equipment_label_wrapper'),
                moveItem: document.querySelector('#profile_equipment_move_item_btn'),
                moveItemError: document.querySelector('#profile_equipment_move_item_error')
            },
            general: {
                goldAmount: document.querySelector('#profile_general_gold .profile__generalText'),
                petImg: document.querySelector('#profile_general_pet .profile__generalImg'),
                petRentTime: document.querySelector('#profile_general_pet .profile__generalText'),
                potionImgFirst: document.querySelector('#profile_general_potion_first .profile__generalImg'),
                potionTimeFirst: document.querySelector('#profile_general_potion_first .profile__generalText'),
                potionImgSecond: document.querySelector('#profile_general_potion_second .profile__generalImg'),
                potionTimeSecond: document.querySelector('#profile_general_potion_second .profile__generalText'),

            },
            equipmentSlots: document.querySelectorAll('#profile_equipment_slots div[data-slot-name]'),
            backpackSlots: document.querySelectorAll('#profile_backpack_slots .profile__backpackItem'),
            error: document.querySelector('#profile__error'),
        }



    }
    labelForEquipmentEvent() {

        let toogleLabel;
        let currentItem: ShopItem | null = null;

        // show label on mouse hover event 
        this.dom.equipmentSlots.forEach(el => el.addEventListener('mouseover', () => {
            // prevent of label hiding 
            clearInterval(toogleLabel)
            const element: HTMLElement = el.firstElementChild as HTMLElement;
            // remove error
            this.dom.equipmentLabel.moveItemError.innerText = '';
            // reset equipement label styles
            this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled';

            //find specific item, in order to create label of this item
            currentItem = this.userData.equipmentItems[this.userData.equipmentItems.findIndex(el => el.id === element.dataset.currentItemId)];

            // if equipement slot has no item inside then hide label
            if (element.dataset.currentItemId === undefined) {
                this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
            }
            // set the label
            if (currentItem !== undefined && element.dataset.currentItemId !== undefined) {
                this.dom.equipmentLabel.root.classList.add(currentItem.rarity === 'legendary' ? 'profile__itemSpecs-legendary' : 'profile__itemSpecs-common')
                this.dom.equipmentLabel.root.classList.add(`profile__itemSpecs-${currentItem.type}`)
                this.dom.equipmentLabel.labelWrapper.innerHTML = getEquipmentLabel(currentItem);
                this.dom.equipmentLabel.root.classList.remove('disabled')
            }


        }))

        // on mouse leave remove label with delay -> after 1s
        this.dom.equipmentSlots.forEach(el => el.addEventListener('mouseleave', () => {
            toogleLabel = setInterval(() => {
                this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
            }, 1000);
        }));

        // keep displaying label when user  focus is on label
        this.dom.equipmentLabel.root.addEventListener('mouseover', () => {
            clearInterval(toogleLabel);
        });

        // hide label when focus loss
        this.dom.equipmentLabel.root.addEventListener('mouseleave', () => {
            this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled';
        });

        // moving item into user's backpack
        this.dom.equipmentLabel.moveItem.addEventListener('click', () => {

            // check if user have free slot in backpack (backpack have 10 slots)
            if (this.userData.backpackItems.length < this.dom.backpackSlots.length) {
                // find the specific  equipment slot which is needed to inject new html code later -> set default icon
                const equipmentSlot: HTMLElement = document.querySelector(`#equipment_slots div[data-slot-name = '${currentItem.type}']`);
                // remove item graphic and set default icon
                equipmentSlot.innerHTML = `<img src='${getEquipmentIconSrc(currentItem.type)}' class="profile__equipmentIcon"/>`

                // remove this item from user equipment
                const itemIndex = this.userData.equipmentItems.findIndex(el => el.id === currentItem.id);
                if (itemIndex > -1) {
                    this.userData.equipmentItems.splice(itemIndex, 1);
                }

                // add current item to user's backpack
                this.userData.backpackItems.push(currentItem);
                updateUserData(this.userData);

                // hide label
                this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
            }

            // notify user about no available in backpack
            else {
                this.dom.equipmentLabel.moveItemError.innerText = 'Your backpack is full'
            }
        });

    }










    setGeneral() {

        // set gold amount
        this.dom.general.goldAmount.innerText = `${this.userData.gold}`
        // set pet 
        if (this.userData.pet !== null) {
            this.dom.general.petImg.innerHTML = `<img src=${this.userData.pet.imgSmallSrc} alt=${this.userData.pet.name}/>`;
            this.dom.general.petImg.classList.add('profile__generalImg-item');
            this.setCountdown(this.petRentInterval,
                this.userData.pet.rentEnd,
                this.dom.general.petRentTime,
                this.resetPet
            )
        }
        else {
            this.dom.general.petRentTime.innerText = 'No pet'
        }
        // set first potion
        if (this.userData.potions.first !== null) {
            const potion: ShopItem = potionsData[potionsData.findIndex(el => el.id === this.userData.potions.first.id)]
            this.dom.general.potionImgFirst.innerHTML = `<img src=${potion.src} alt=${potion.name}/>`;
            this.dom.general.potionImgFirst.classList.add('profile__generalImg-item');
            this.setCountdown(this.potionFirstTimeInterval,
                this.userData.potions.first.end,
                this.dom.general.potionTimeFirst,
                this.resetFirstPotion
            )
        }
        else {
            this.dom.general.potionTimeFirst.innerText = 'No potion'
        }

        // set second potion
        if (this.userData.potions.second !== null) {
            const potion: ShopItem = potionsData[potionsData.findIndex(el => el.id === this.userData.potions.second.id)]
            this.dom.general.potionImgSecond.innerHTML = `<img src=${potion.src} alt=${potion.name}/>`;
            this.dom.general.potionImgSecond.classList.add('profile__generalImg-item');
            this.setCountdown(this.potionSecondTimeInterval,
                this.userData.potions.second.end,
                this.dom.general.potionTimeSecond,
                this.resetSecondPotion
            )
        }
        else {
            this.dom.general.potionTimeSecond.innerText = 'No potion'
        }

    }
    resetFirstPotion() {
        this.userData.potions.first = null
    }
    resetSecondPotion() {
        this.userData.potions.second = null
    }
    resetPet() {
        this.userData.pet = null
    }
    setCountdown(interval: null | ReturnType<typeof setInterval>, end, counterWrapper: HTMLElement, callback: () => void) {
        const start: any = new Date();
        // milliseconds between start and end of guard
        const diffMs = (end - start);
        const minutes = Math.floor((diffMs / 1000) / 60);
        // set the countdown date
        const target_date = new Date().getTime() + ((minutes * 60) * 1000);

        // start a countdown 
        interval = setInterval(() => {
            // variables for time units
            let hours, minutes, seconds;
            // find the amount of "seconds" between now and target
            const current_date = new Date().getTime();
            let seconds_left: any = (target_date - current_date) / 1000;


            if (seconds_left >= 0) {
                seconds_left = seconds_left % 86400;
                hours = parseInt((seconds_left / 3600).toString());
                seconds_left = seconds_left % 3600;
                minutes = parseInt((seconds_left / 60).toString());
                seconds = parseInt((seconds_left % 60).toString());


                // differences between current and end rent date
                const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
                // set time
                if (diffDays !== 0) {
                    diffDays % 2 === 0 ?
                        counterWrapper.innerText = `${diffDays} Day left`
                        :
                        counterWrapper.innerText = `${diffDays} Days left`;
                }
                else {
                    counterWrapper.innerText = `${hours !== 0 ? hours + 'h : ' : ''} ${minutes}m : ${seconds}s left`;
                }

            }

            else {
                // remove pet
                callback();
                clearInterval(interval);
                updateUserData(this.userData)
            }
        }, 1000);
    }
    setUserEquipment() {
        console.log(this.dom.general)
        this.userData.equipmentItems.forEach(el => {
            const equipmentSlot: HTMLElement = document.querySelector(`#profile_equipment_slots div[data-slot-name = '${el.type}']`);
            equipmentSlot.innerHTML = `  <img src='${el.src}' class="profile__equipmentIcon" data-current-item-id='${el.id}' draggable='true'/>`
        })
    }
    setUserBackpack() {
        // clear previous 
        this.dom.backpackSlots.forEach(el => {
            el.innerHTML = ''
        })

        this.userData.backpackItems.forEach((el, num) => {
            this.dom.backpackSlots[num].innerHTML = `<img src='${el.src}' data-backpack-item-id='${el.id}' data-slot-name='${el.type}'/>`
        })
    }
    onDataChange() {
        this.setUserBackpack();
    }
    render() {
        this.root.innerHTML = getProfileHTMLCode();
    }
    getDOMElements() {
        this.dom = {
            general: {
                goldAmount: document.querySelector('#profile_general_gold .profile__generalText'),
                petImg: document.querySelector('#profile_general_pet .profile__generalImg'),
                petRentTime: document.querySelector('#profile_general_pet .profile__generalText'),
                potionImgFirst: document.querySelector('#profile_general_potion_first .profile__generalImg'),
                potionTimeFirst: document.querySelector('#profile_general_potion_first .profile__generalText'),
                potionImgSecond: document.querySelector('#profile_general_potion_second .profile__generalImg'),
                potionTimeSecond: document.querySelector('#profile_general_potion_second .profile__generalText')
            },
            equipmentLabel: {
                root: document.querySelector('#profile_equipment__item_label'),
                labelWrapper: document.querySelector('#profile_equipment_label_wrapper'),
                moveItem: document.querySelector('#profile_equipment_move_item_btn'),
                moveItemError: document.querySelector('#profile_equipment_move_item_error')
            },
            equipmentSlots: document.querySelectorAll('#profile_equipment_slots div[data-slot-name]'),
            backpackSlots: document.querySelectorAll('#profile_backpack_slots .profile__backpackItem'),
            error: document.querySelector('#profile__error'),
        }
    }
    initScripts() {
        this.setUserEquipment();
        this.setGeneral();
        this.setUserBackpack();
        this.labelForEquipmentEvent();
    }
}