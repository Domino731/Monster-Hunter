import { isThisTypeNode } from 'typescript';
import { getProfileHTMLCode, profileMobileNavCode } from '../viewsHTMLCode/profile';
import { View } from './view';
import { updateUserData } from '../firebase/operations';
import { potionsData } from '../properties/shop/potions';
import { ShopItem } from '../types';
import { getEquipmentLabel } from './sub_views/getEquipmentLabel';
import { getEquipmentIconSrc } from '../functions/getEquipmentIcon';
import { getBlacksmithBackpackLabel } from './sub_views/getBlacksmithBackpackLabel';
import { portraitsData } from '../properties/portraits/portraits';
import { getNeededExp } from '../functions/getNeededExp';
import { getStatCost } from '../functions/getStatCost';
import { getPotionLabel } from './sub_views/getPotionLabel';
import { helmetsData } from '../properties/shop/helmets';
import { backgroundsData } from '../properties/missions/backgroundsData';
import { getProfileBackpackLabel } from './sub_views/backpackLabel';
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
        description: HTMLTextAreaElement
        equipmentLabel: {
            root: HTMLElement,
            labelWrapper: HTMLElement
            moveItem: HTMLElement
            moveItemError: HTMLElement
        }
        backpackLabel: {
            root: HTMLElement,
            labelWrapper: HTMLElement
            moveItem: HTMLElement
            moveItemError: HTMLElement
            replaceIcon: HTMLImageElement
        }
        portrait: {
            img: HTMLImageElement
            prevBtn: HTMLElement
            nextBtn: HTMLElement
        }
        stats: {
            strength: HTMLElement
            strengthCost: HTMLElement
            strengthBtn: HTMLElement
            damage: HTMLElement

            physicalEndurance: HTMLElement
            physicalEnduranceCost: HTMLElement
            physicalEnduranceBtn: HTMLElement
            health: HTMLElement

            defence: HTMLElement
            defenceCost: HTMLElement
            defenceBtn: HTMLElement
            damageReduce: HTMLElement

            luck: HTMLElement
            luckCost: HTMLElement
            luckBtn: HTMLElement
            critical: HTMLElement
        }
        level: HTMLElement
        potionLabel: HTMLElement
        profileContainer: HTMLElement;
        backpackContainer: HTMLElement;
        mobileNavFristSwitch: HTMLElement;
        mobileNavSecondSwitch: HTMLElement;
    }

    constructor() {
        super()
        this.petRentInterval = null
        this.potionFirstTimeInterval = null
        this.potionSecondTimeInterval = null
        this.dom = {
            mobileNavFristSwitch: document.querySelector('.mobileNav__item:first-child'),
            mobileNavSecondSwitch: document.querySelector('.mobileNav__item:last-child'),
            profileContainer: document.querySelector('.profile__item:first-child'),
            backpackContainer: document.querySelector('.profile__item:last-child'),
            potionLabel: document.querySelector('.profile__generalLabelWrapper'),
            stats: {
                strength: document.querySelector('#profile_strength_stat .profile__item--amount'),
                strengthCost: document.querySelector('#profile_strength_stat .profile__item--cost strong'),
                strengthBtn: document.querySelector('#profile_strength_stat .profile__item--buyBtn button'),
                damage: document.querySelector('#profile_damage_stat .profile__item--amount'),

                physicalEndurance: document.querySelector('#profile_PE_stat .profile__item--amount'),
                physicalEnduranceCost: document.querySelector('#profile_PE_stat .profile__item--cost strong'),
                physicalEnduranceBtn: document.querySelector('#profile_PE_stat .profile__item--buyBtn button'),
                health: document.querySelector('#profile_health_stat .profile__item--amount'),

                defence: document.querySelector('#profile_defence_stat .profile__item--amount'),
                defenceCost: document.querySelector('#profile_defence_stat .profile__item--cost strong'),
                defenceBtn: document.querySelector('#profile_defence_stat .profile__item--buyBtn button'),
                damageReduce: document.querySelector('#profile_damegeReduce_stat .profile__item--amount'),

                luck: document.querySelector('#profile_luck_stat .profile__item--amount'),
                luckCost: document.querySelector('#profile_luck_stat .profile__item--cost strong'),
                luckBtn: document.querySelector('#profile_luck_stat .profile__item--buyBtn button'),
                critical: document.querySelector('#profile_critical_stat .profile__item--amount'),
            },
            level: document.querySelector('.profile__level'),
            portrait: {
                img: document.querySelector('.profile__portraitImg'),
                prevBtn: document.querySelector('.profile__portraitBtn-left'),
                nextBtn: document.querySelector('.profile__portraitBtn-right'),
            },
            equipmentLabel: {
                root: document.querySelector('#profile_equipment__item_label'),
                labelWrapper: document.querySelector('#profile_equipment_label_wrapper'),
                moveItem: document.querySelector('#profile_equipment_move_item_btn'),
                moveItemError: document.querySelector('#profile_equipment_move_item_error')
            },
            backpackLabel: {
                root: document.querySelector('#profile_backpack_item_label'),
                labelWrapper: document.querySelector('#profile_backpack_label_wrapper'),
                moveItem: document.querySelector('#profile_backpack_move_item_btn'),
                moveItemError: document.querySelector('#profile_backpack_sell_item_value'),
                replaceIcon: document.querySelector('#profile_backpack_replace_item_icon')
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
            description: document.querySelector('.profile__description textarea')
        }



    }




    // events responsible for potion label
    labelForPotions() {

        // find potions
        const firstPotion: ShopItem | undefined = potionsData[potionsData.findIndex(el => this.userData.potions.first)];
        const secondPotion: ShopItem | undefined = potionsData[potionsData.findIndex(el => this.userData.potions.second)];
        // check if user have potion
        if (firstPotion !== undefined) {
            this.dom.general.potionImgFirst.addEventListener('mouseover', () => {
                this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled';
                this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled';
                this.dom.potionLabel.innerHTML = getPotionLabel(firstPotion, 1);
            });
            this.dom.general.potionImgFirst.addEventListener('mouseleave', () => {

                this.dom.potionLabel.innerHTML = '';
            })
        }
        if (secondPotion !== undefined) {
            this.dom.general.potionImgSecond.addEventListener('mouseover', () => {
                this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled';
                this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled';
                this.dom.potionLabel.innerHTML = getPotionLabel(secondPotion, 2);
            });
            this.dom.general.potionImgSecond.addEventListener('mouseleave', () => {
                this.dom.potionLabel.innerHTML = '';
            })
        }

    }
    increaseStatistic(statistic: 'strength' | 'physicalEndurance' | 'defence' | 'luck', statCost: HTMLElement) {
        console.log('after update stat:', this.userData.rawStats[statistic])
        // cost of specific statistic
        const cost: number = getStatCost(this.userData.rawStats[statistic], this.userData.guardPayout)
        // check if user has enough gold
        if (this.userData.gold >= cost) {
            // increase statistic
            this.userData.rawStats[statistic] += 1;
            this.userData.gold -= cost;
            // update in firestore
            updateUserData(this.userData)
        }
        // if user doesnt have enough gold then set animation with will make statistic color will be red
        else {
            statCost.classList.add('profile__item-notAfford')
            setTimeout(() => {
                statCost.classList.remove('profile__item-notAfford')
            }, 1000)
        }
    }
    // increase statistic
    increaseStatisticEvents() {
        this.dom.stats.strengthBtn.addEventListener('click', () => this.increaseStatistic('strength', this.dom.stats.strengthCost))
        this.dom.stats.luckBtn.addEventListener('click', () => this.increaseStatistic('luck', this.dom.stats.luckCost))
        this.dom.stats.physicalEnduranceBtn.addEventListener('click', () => this.increaseStatistic('physicalEndurance', this.dom.stats.physicalEnduranceCost))
        this.dom.stats.defenceBtn.addEventListener('click', () => this.increaseStatistic('defence', this.dom.stats.defenceCost))
    }
    // set the statistics table
    setTableStats() {
        // strength
        this.dom.stats.strength.innerText = `${this.userStats.strength}`;
        this.dom.stats.strengthCost.innerText = `${getStatCost(this.userData.rawStats.strength, this.userData.guardPayout)}`;
        this.dom.stats.damage.innerText = `${this.userStats.damage}`;
        // physical endurance
        this.dom.stats.physicalEndurance.innerText = `${this.userStats.physicalEndurance}`;
        this.dom.stats.physicalEnduranceCost.innerText = `${getStatCost(this.userData.rawStats.physicalEndurance, this.userData.guardPayout)}`
        this.dom.stats.health.innerText = `${this.userStats.health}`;
        // defence
        this.dom.stats.defence.innerText = `${this.userStats.defence}`;
        this.dom.stats.defenceCost.innerText = `${getStatCost(this.userData.rawStats.defence, this.userData.guardPayout)}`;
        this.dom.stats.damageReduce.innerText = `${this.userStats.damageReduce}`;
        // luck
        this.dom.stats.luck.innerText = `${this.userStats.luck}`;
        this.dom.stats.luckCost.innerText = `${getStatCost(this.userData.rawStats.luck, this.userData.guardPayout)}`;
        this.dom.stats.critical.innerText = `${this.userStats.critical}`;
    }
    // change hero portrait
    changePortraitEvents() {

        let portraitIndex: number = portraitsData.indexOf(this.userData.portrait)
        // switch to next portrait
        this.dom.portrait.nextBtn.addEventListener('click', () => {

            if (portraitIndex < portraitsData.length - 1) {
                portraitIndex++;
                this.userData.portrait = portraitsData[portraitIndex]
            }
            else {
                portraitIndex = 0
                this.userData.portrait = portraitsData[portraitIndex]
            }
            updateUserData(this.userData);
        });

        // switch to previous portrait
        this.dom.portrait.prevBtn.addEventListener('click', () => {
            if (portraitIndex === 0) {
                portraitIndex = portraitsData.length - 1
                this.userData.portrait = portraitsData[portraitIndex]
            }
            else {
                portraitIndex--;
                this.userData.portrait = portraitsData[portraitIndex]
            }
            updateUserData(this.userData);
        });
    }
    // update user description
    changeUserDescription() {
        this.dom.description.addEventListener('focusout', () => {
            this.userData.description = this.dom.description.value;
            updateUserData(this.userData)
        })
    }
    setUserDescription() {
        this.dom.description.value = this.userData.description;
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
            // hide backpack label
            this.dom.backpackLabel.root.classList.add('disabled');
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
                const equipmentSlot: HTMLElement = document.querySelector(`#profile_equipment_slots div[data-slot-name = '${currentItem.type}']`);
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
        this.userData.equipmentItems.forEach(el => {
            const equipmentSlot: HTMLElement = document.querySelector(`#profile_equipment_slots div[data-slot-name = '${el.type}']`);
            equipmentSlot.innerHTML = `  <img src='${el.src}' class="profile__equipmentIcon" data-current-item-id='${el.id}' draggable='true'/>`
        })
    }

    generalOnUpdate() {
        // set level
        this.dom.level.innerHTML = ` <div class='profile__levelProgress'
        style='width: ${Math.floor(this.userData.exp * 100 / getNeededExp(this.userData.level))}%'></div>
        ${this.userData.level}`;
        // set portrait
        this.dom.portrait.img.src = this.userData.portrait;
        // set gold
        this.dom.general.goldAmount.innerText = `${this.userData.gold}`;
    }


    labelForBackpackEvent() {
        let currentItem: ShopItem | null = null;
        let equipmentSlot: HTMLElement | null = null;
        let toogleLabel;

        this.dom.backpackSlots.forEach(el => {

            el.addEventListener('mouseover', () => {
                const slot: HTMLElement = el as HTMLElement;
                const element: HTMLElement = el.firstElementChild as HTMLElement;
                clearInterval(toogleLabel)
                this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled'
                if (element === null) {
                    this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled'
                }
                if (element !== null) {


                    //find specific item, in order to create label of this item
                    currentItem = this.userData.backpackItems[this.userData.backpackItems.findIndex(el => el.id === element.dataset.backpackItemId)];

                    const equipmentItem: ShopItem | null = this.userData.equipmentItems[this.userData.equipmentItems.findIndex(el => el.type === currentItem.type)];
                    // find specific slot in equipment which is equal to current shop item type, needed to compare items
                    equipmentSlot = document.querySelector(`#profile_equipment_slots div[data-slot-name = ${currentItem.type}]`)
                    // show slot in equipment by adding pulse animation
                    equipmentSlot.firstElementChild.classList.add("profile__equipmentIcon-pulse");
                    // remove error
                    // this.dom.backpackLabel.moveItemError.innerText = '';
                    this.dom.backpackLabel.root.className = 'profile__itemSpecs profile__itemSpecs-backpackSlot disabled'
                    this.dom.backpackLabel.root.classList.add(`profile__backpackLabel-${slot.dataset.backpackSlot}`)
                    this.dom.backpackLabel.replaceIcon.src = getEquipmentIconSrc(currentItem.type)
                    this.dom.backpackLabel.labelWrapper.innerHTML = getBlacksmithBackpackLabel(currentItem, equipmentItem);
                    this.dom.backpackLabel.root.classList.remove('disabled')
                }

            })

            // remove label with delay -> after 0.8s
            el.addEventListener('mouseleave', () => {
                // hide label
                toogleLabel = setInterval(() => {
                    this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled'
                }, 800);
                // remove pulse effect
                equipmentSlot !== null && equipmentSlot.firstElementChild.classList.remove("profile__equipmentIcon-pulse");
            });
        })

        // keep displaying label on mouse focus
        this.dom.backpackLabel.root.addEventListener('mouseover', () => {
            clearInterval(toogleLabel);
            this.dom.backpackLabel.root.classList.remove('disabled');
        });

        // remove label when focus was losed
        this.dom.backpackLabel.root.addEventListener('mouseleave', () => {
            this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled'
        });

       
        this.dom.backpackLabel.moveItem.addEventListener('click', () => {
            equipmentSlot.innerHTML = `<img src='${currentItem.src}' class='profile__equipmentIcon' data-current-item-id='${currentItem.id}'/>`

            const equipmentItemIndex: number = this.userData.equipmentItems.findIndex(el => el.type === currentItem.type)
            const backpackItemIndex: number = this.userData.backpackItems.findIndex(el => el.id === currentItem.id)

            if (equipmentItemIndex !== -1) {
                // remove item from backpack
                this.userData.backpackItems.splice(backpackItemIndex, 1);
                // add to backpack new equipment item (which is replaced by new) 
                this.userData.backpackItems.push(this.userData.equipmentItems[equipmentItemIndex])
                // add to equipment selected item
                this.userData.equipmentItems[equipmentItemIndex] = currentItem;
                // update user's data in firestore
                updateUserData(this.userData);
                this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled'
            }
            else {
                // remove item from backpack
                this.userData.backpackItems.splice(backpackItemIndex, 1);
                // add new item to equipment
                this.userData.equipmentItems.push(currentItem);
                updateUserData(this.userData);
                this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled'
            }
        })
    }

     // replace item in equipment
    replaceItemInEquipment(currentItem: ShopItem){
        const equipmentItemIndex: number = this.userData.equipmentItems.findIndex(el => el.type === currentItem.type)
        const backpackItemIndex: number = this.userData.backpackItems.findIndex(el => el.id === currentItem.id)
        if (equipmentItemIndex !== -1) {
            // remove item from backpack
            this.userData.backpackItems.splice(backpackItemIndex, 1);
            // add to backpack new equipment item (which is replaced by new) 
            this.userData.backpackItems.push(this.userData.equipmentItems[equipmentItemIndex])
            // add to equipment selected item
            this.userData.equipmentItems[equipmentItemIndex] = currentItem;
            // update user's data in firestore
            updateUserData(this.userData);
            this.dom.backpackLabel.root.classList.add('disabled');
        }
        else {
            // remove item from backpack
            this.userData.backpackItems.splice(backpackItemIndex, 1);
            // add new item to equipment
            this.userData.equipmentItems.push(currentItem);
            updateUserData(this.userData);
            this.dom.backpackLabel.root.classList.add('disabled');
        }
    }

    setUserBackpack() {
        // clear previous 
        this.dom.backpackSlots.forEach(el => {
            el.innerHTML = ''
        })

        this.userData.backpackItems.forEach((el, num) => {

          this.dom.backpackSlots[num].innerHTML = `<img src='${el.src}' data-backpack-item-id='${el.id}' data-slot-name='${el.type}'/>`

          this.dom.backpackSlots[num].addEventListener('mouseover', () => {
              this.dom.backpackLabel.root.innerHTML = '';
              const newLabel : HTMLElement = document.createElement('div');
              newLabel.className = `profile__itemSpecs profile__itemSpecs-backpackSlot profile__backpackLabel-${num + 1}`;
              newLabel.innerHTML = getProfileBackpackLabel(el, el);
             
              const replaceBtn: HTMLElement = newLabel.querySelector('#profile_backpack_move_item_btn');
              replaceBtn.addEventListener('click', ()=> this.replaceItemInEquipment(el))
              this.dom.backpackLabel.root.classList.remove('disabled');
              this.dom.backpackLabel.root.appendChild(newLabel);
          })

        })
    }











    onDataChange() {
        this.generalOnUpdate();
        this.setUserBackpack();
        this.setHeroStats();
        this.setTableStats();
    }
    render() {
        this.root.innerHTML = getProfileHTMLCode(this.userData);
        this.mobileNav.innerHTML = profileMobileNavCode;
    }
    getDOMElements() {
        this.dom = {
            mobileNavFristSwitch: document.querySelector('.mobileNav__item:first-child'),
            mobileNavSecondSwitch: document.querySelector('.mobileNav__item:last-child'),
            profileContainer: document.querySelector('.profile__item:first-child'),
            backpackContainer: document.querySelector('.profile__item:last-child'),
            potionLabel: document.querySelector('.profile__generalLabelWrapper'),
            stats: {
                strength: document.querySelector('#profile_strength_stat .profile__item--amount'),
                strengthCost: document.querySelector('#profile_strength_stat .profile__item--cost strong'),
                strengthBtn: document.querySelector('#profile_strength_stat .profile__item--buyBtn button'),
                damage: document.querySelector('#profile_damage_stat .profile__item--amount'),

                physicalEndurance: document.querySelector('#profile_PE_stat .profile__item--amount'),
                physicalEnduranceCost: document.querySelector('#profile_PE_stat .profile__item--cost strong'),
                physicalEnduranceBtn: document.querySelector('#profile_PE_stat .profile__item--buyBtn button'),
                health: document.querySelector('#profile_health_stat .profile__item--amount'),

                defence: document.querySelector('#profile_defence_stat .profile__item--amount'),
                defenceCost: document.querySelector('#profile_defence_stat .profile__item--cost strong'),
                defenceBtn: document.querySelector('#profile_defence_stat .profile__item--buyBtn button'),
                damageReduce: document.querySelector('#profile_damegeReduce_stat .profile__item--amount'),

                luck: document.querySelector('#profile_luck_stat .profile__item--amount'),
                luckCost: document.querySelector('#profile_luck_stat .profile__item--cost strong'),
                luckBtn: document.querySelector('#profile_luck_stat .profile__item--buyBtn button'),
                critical: document.querySelector('#profile_critical_stat .profile__item--amount'),
            },
            level: document.querySelector('.profile__level'),
            portrait: {
                img: document.querySelector('.profile__portraitImg'),
                prevBtn: document.querySelector('.profile__portraitBtn-left'),
                nextBtn: document.querySelector('.profile__portraitBtn-right'),
            },
            general: {
                goldAmount: document.querySelector('#profile_general_gold .profile__generalText'),
                petImg: document.querySelector('#profile_general_pet .profile__generalImg'),
                petRentTime: document.querySelector('#profile_general_pet .profile__generalText'),
                potionImgFirst: document.querySelector('#profile_general_potion_first .profile__generalImg'),
                potionTimeFirst: document.querySelector('#profile_general_potion_first .profile__generalText'),
                potionImgSecond: document.querySelector('#profile_general_potion_second .profile__generalImg'),
                potionTimeSecond: document.querySelector('#profile_general_potion_second .profile__generalText')
            },
            backpackLabel: {
                root: document.querySelector('.profile__backpackLabelWrapper'),
                labelWrapper: document.querySelector('#profile_backpack_label_wrapper'),
                moveItem: document.querySelector('#profile_backpack_move_item_btn'),
                moveItemError: document.querySelector('#profile_backpack_sell_item_value'),
                replaceIcon: document.querySelector('#profile_backpack_replace_item_icon')
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
            description: document.querySelector('.profile__description textarea')
        }
    }
    toogleView() {
        this.dom.mobileNavFristSwitch.addEventListener('click', () => {
            this.dom.backpackContainer.classList.add('disabled');
            this.dom.profileContainer.classList.remove('disabled');
        });
        this.dom.mobileNavSecondSwitch.addEventListener('click', () => {
            this.dom.backpackContainer.classList.remove('disabled');
            this.dom.profileContainer.classList.add('disabled');
        });
    }
    mobile() {
        if (window.innerWidth < 1024) {
            this.dom.profileContainer.classList.add('disabled');
            this.toogleView();
        }
    }


    // for rwd development
    rwd() {
        // equipment
         const currentItem = helmetsData[12]
        // this.dom.equipmentLabel.root.classList.add(currentItem.rarity === 'legendary' ? 'profile__itemSpecs-legendary' : 'profile__itemSpecs-common')
        // this.dom.equipmentLabel.root.classList.add(`profile__itemSpecs-chestPlate`)
        // this.dom.equipmentLabel.labelWrapper.innerHTML = getEquipmentLabel(currentItem);
        // this.dom.equipmentLabel.root.classList.remove('disabled')
        // backpack
        //   const equipmentItem = this.userData.equipmentItems[0]
        //   this.dom.backpackLabel.root.className = 'profile__itemSpecs profile__itemSpecs-backpackSlot disabled'
        //   this.dom.backpackLabel.root.classList.add(`profile__backpackLabel-${7}`)
        //   this.dom.backpackLabel.replaceIcon.src = getEquipmentIconSrc(currentItem.type)
        //   this.dom.backpackLabel.labelWrapper.innerHTML = getBlacksmithBackpackLabel(currentItem, equipmentItem);
        //   this.dom.backpackLabel.root.classList.remove('disabled')
        // potions
        // const firstPotion = potionsData[4];
        // this.dom.equipmentLabel.root.className = 'profile__itemSpecs disabled';
        // this.dom.backpackLabel.root.className = 'profile__itemSpecs disabled';
        // this.dom.potionLabel.innerHTML = getPotionLabel(firstPotion, 1);
    }
    initScripts() {
        this.mobile();
      //  this.labelForBackpackEvent();
        this.setUserEquipment();
        this.setGeneral();
        this.setUserBackpack();
        this.setUserDescription();
        this.changeUserDescription();
        this.labelForEquipmentEvent();
        this.changePortraitEvents();
        this.setTableStats();
        this.increaseStatisticEvents();
        this.labelForPotions();
        this.rwd();
    }
}