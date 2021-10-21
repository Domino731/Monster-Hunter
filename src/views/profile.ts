import { getProfileHTMLCode, profileMobileNavCode } from '../HTMLCode/profile';
import { Component } from './view';
import { updateUserData } from '../firebase/operations';
import { potionsData } from '../properties/shop/potions';
import { ShopItem } from '../types';
import { getEquipmentIconSrc } from '../functions/getEquipmentIcon';
import { portraitsData } from '../properties/portraits/portraits';
import { getNeededExp } from '../functions/getNeededExp';
import { getStatCost } from '../functions/getStatCost';
import { getPotionLabel } from '../functions/getPotionLabel';
import { getProfileBackpackLabel } from '../functions/backpackLabel';
import { getProfileEquipmentLabel } from '../functions/equipmentLabel';

// class responsible for profile view
export class Profile extends Component {

    private dom: {
        portrait: {
            // needed to change portrait when user change him - generalOnUpdate() method
            img: HTMLImageElement | null;
            // buttons with added click events reposnbile for changing hero portrait - changePortraitEvents() method
            prevBtn: HTMLElement | null;
            nextBtn: HTMLElement | null;
        }
        // elements needed to create logic behind increasing stats -  increaseStatisticEvents() method
        stats: {
            // amount of stat
            strength: HTMLElement | null;
            // amount of stat
            damage: HTMLElement | null;
            // cost of stat
            strengthCost: HTMLElement | null;
            // button with event added in increaseStatisticEvents() method by which user can increase 
            strengthBtn: HTMLElement | null;

            physicalEndurance: HTMLElement | null;
            health: HTMLElement
            physicalEnduranceCost: HTMLElement | null;
            physicalEnduranceBtn: HTMLElement | null;

            defence: HTMLElement | null;
            damageReduce: HTMLElement | null;
            defenceCost: HTMLElement | null;
            defenceBtn: HTMLElement | null;

            luck: HTMLElement | null;
            critical: HTMLElement | null;
            luckCost: HTMLElement | null;
            luckBtn: HTMLElement | null;
        }
        general: {
            // wrapper of gold, needed to change value inside this wrapper on data change - generalOnUpdate() method
            goldAmount: HTMLElement | null;
            // wrapper of pet image, needed to set graphic of current pet - setGeneral() method
            petImg: HTMLElement | null;
            // element which is dispalying how much time is left to pet rent end by setCountdown() method - setGeneral() method 
            petRentTime: HTMLElement | null;
            // wrappers of potions images, needed to set graphic of specific potion - setGeneral() method
            potionImgFirst: HTMLElement | null;
            potionImgSecond: HTMLElement | null;
            // elements which are dispalying how much time is left to pet rent end by setCountdown() method - setGeneral() method 
            potionTimeFirst: HTMLElement | null;
            potionTimeSecond: HTMLElement | null;
        }
        // slots in the equipment container  needed to remove the pulse animation 
        // (when user when hovering over an item in the backpack, an animation is added for the same type of item in the inventory) 
        equipmentSlots: NodeListOf<Element> | null;
        // slots in the backpack container needed to set backpack items with hover events resposnible for displaying backpack label -  setUserBackpack() method 
        backpackSlots: NodeListOf<Element> | null;
        // textarea, needed to save new description when this textarea loses his focus - changeUserDescription() method
        description: HTMLTextAreaElement | null;
        // root for equipment label, needed to inject html code on mouse hover on equipment slot - equipmentLabel() method
        equipmentLabelRoot: HTMLElement | null;
        // root for backpack label, needed to inject html code on mouse hover on equipment slot - backpackLabel() method
        backpackLabelRoot: HTMLElement | null;
        // wrapper of level, needed to set level on data change - generalOnUpdate() method 
        level: HTMLElement | null;
        // root for potion label, needed to inject html code on mouse hover on potion slot - labelForPotions() method
        potionLabel: HTMLElement | null;
        // containers needed to toogle content in section - backpack or profile only below (1024px) - toogleView() method
        profileContainer: HTMLElement | null;
        backpackContainer: HTMLElement | null;
        // buttons for switching between the backpack and the profile only below (1024px) - toogleView() method
        mobileNavFristSwitch: HTMLElement | null;
        mobileNavSecondSwitch: HTMLElement | null;
    }
    // when user hovers over an item in inventory, backpack or potion then a label is shown which describes this item
    // , if  this label loses his focus then it does not disappear immediately but with a delay (0.8s). however
    //  when user hovers over a item in a backpack and quickly hovers over another one then clear this 
    //  interval which will help prevent duplicate labels and disappearance
    private hideLabelInterval: {
        potion: ReturnType<typeof setInterval> | null;
        equipment: ReturnType<typeof setInterval> | null;
        backpack: ReturnType<typeof setInterval> | null;
    }
    // intervals needed to clear specific interval when potion or pet time will end
    private generalInterval: {
        pet: ReturnType<typeof setInterval> | null;
        potionFirst: ReturnType<typeof setInterval> | null;
        potionSecond: ReturnType<typeof setInterval> | null;
    }

    constructor() {
        super()
        this.freepikAttribute = `   <a href='https://www.freepik.com/vectors/background' target="_black">Background vector created by upklyak -
        www.freepik.com</a>`;
        this.bodyBackgroundSrc = '/images/background_profile.jpg';
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
            equipmentLabelRoot: document.querySelector('#profile_equipment__item_label'),
            backpackLabelRoot: document.querySelector('#profile_backpack_item_label'),
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
            description: document.querySelector('.profile__description textarea'),

        }
        this.hideLabelInterval = {
            potion: null,
            equipment: null,
            backpack: null
        }
        this.generalInterval = {
            pet: null,
            potionFirst: null,
            potionSecond: null
        }
    }

    // events responsible for potion label
    labelForPotions() {

        // check if user has active first potion
        if (this.userData.potions.first !== null) {

            // find this potion
            const potion: ShopItem = potionsData[potionsData.findIndex(el => el.id === this.userData.potions.first.id)];

            // add event reponsible for first potion label
            this.dom.general.potionImgFirst.addEventListener('mouseover', () => {
                this.dom.equipmentLabelRoot.classList.add('disabled');
                this.dom.backpackLabelRoot.classList.add('disabled');
                this.dom.potionLabel.innerHTML = getPotionLabel(potion, 1);
            });

            // when potion loses his focus then hide this label
            this.dom.general.potionImgFirst.addEventListener('mouseleave', () => {
                this.dom.potionLabel.innerHTML = '';
            })

        }

        // check if user has active second potion
        if (this.userData.potions.second !== null) {

            // find this potion
            const secondPotion: ShopItem = potionsData[potionsData.findIndex(el => el.id === this.userData.potions.second.id)];

            // add event reponsible for second potion label
            this.dom.general.potionImgSecond.addEventListener('mouseover', () => {
                this.dom.equipmentLabelRoot.classList.add('disabled');
                this.dom.backpackLabelRoot.classList.add('disabled');
                this.dom.potionLabel.innerHTML = getPotionLabel(secondPotion, 2);
            });

            // when potion loses his focus then hide this label
            this.dom.general.potionImgSecond.addEventListener('mouseleave', () => {
                this.dom.potionLabel.innerHTML = '';
            });

        }
    }

    /**
     * increase specific hero statistic
     * @param statistic - statistic that you want to increase
     * @param statCostWrapper - wrapper of stat cost, needed to add styles when user doesn't have enough gold to increase
     */
    increaseStatistic(statistic: 'strength' | 'physicalEndurance' | 'defence' | 'luck', statCostWrapper: HTMLElement) {

        // get cost of specific statistic
        const cost: number = getStatCost(this.userData.rawStats[statistic], this.userData.guardPayout);

        // check if user has enough gold
        if (this.userData.gold >= cost) {

            // increase statistic
            this.userData.rawStats[statistic] += 1;
            this.userData.gold -= cost;

            // update in firestore
            updateUserData(this.userData);

        }

        // if user doesnt have enough gold then set animation with will make statistic color will be red
        else {
            statCostWrapper.classList.add('profile__item-notAfford');

            // remove this styles after 1s
            setTimeout(() => {
                statCostWrapper.classList.remove('profile__item-notAfford')
            }, 1000);

        }
    }

    // increase statistic
    increaseStatisticEvents() {

        // strength
        this.dom.stats.strengthBtn.addEventListener('click', () => this.increaseStatistic('strength', this.dom.stats.strengthCost));
        // luck
        this.dom.stats.luckBtn.addEventListener('click', () => this.increaseStatistic('luck', this.dom.stats.luckCost));
        // physical endurance
        this.dom.stats.physicalEnduranceBtn.addEventListener('click', () => this.increaseStatistic('physicalEndurance', this.dom.stats.physicalEnduranceCost));
        // defence
        this.dom.stats.defenceBtn.addEventListener('click', () => this.increaseStatistic('defence', this.dom.stats.defenceCost));

    }

    // set the statistics table this method is also invoking when data has changed in onDataChange() method
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

    // adding events on buttons which are to change hero portrait
    changePortrait() {

        // value which is user to change portrait
        let portraitIndex: number = portraitsData.indexOf(this.userData.portrait);

        // switch to next portrait
        this.dom.portrait.nextBtn.addEventListener('click', () => {
            if (portraitIndex < portraitsData.length - 1) {
                portraitIndex++;
                this.userData.portrait = portraitsData[portraitIndex];
            }
            else {
                portraitIndex = 0
                this.userData.portrait = portraitsData[portraitIndex];
            }
            updateUserData(this.userData);
        });

        // switch to previous portrait
        this.dom.portrait.prevBtn.addEventListener('click', () => {
            if (portraitIndex === 0) {
                portraitIndex = portraitsData.length - 1;
                this.userData.portrait = portraitsData[portraitIndex];
            }
            else {
                portraitIndex--;
                this.userData.portrait = portraitsData[portraitIndex];
            }
            updateUserData(this.userData);
        });

    }

    // update user description when textarea loses his focus
    changeUserDescription() {
        this.dom.description.addEventListener('focusout', () => {
            this.userData.description = this.dom.description.value;
            updateUserData(this.userData);
        })
    }

    /**
        * Countdown which displays the remaining time
        * @param end - item expiry date
        * @param counterWrapper - wrapper when where the remaining time is to be shown
        * @param item - the name of the item needed to delete its graphics after countdown ends
        */
    setCountdown(end: Date, counterWrapper: HTMLElement, item: 'potion1' | 'potion2' | 'pet'): ReturnType<typeof setInterval> {

        const start: number = new Date().getTime();

        // milliseconds between start and end of guard
        const diffMs: number = (end.getTime() - start);
        const minutes: number = ((diffMs / 1000) / 60);

        // set the countdown date
        const target_date: number = new Date().getTime() + ((minutes * 60) * 1000);

        // start a countdown 
        return setInterval(() => {

            // variables for time units
            let hours, minutes, seconds;

            // find the amount of "seconds" between now and target
            const current_date: number = new Date().getTime();
            let seconds_left: number = (target_date - current_date) / 1000;


            if (seconds_left >= 0) {

                seconds_left = seconds_left % 86400;
                hours = parseInt((seconds_left / 3600).toString());
                seconds_left = seconds_left % 3600;
                minutes = parseInt((seconds_left / 60).toString());
                seconds = parseInt((seconds_left % 60).toString());

                // differences between current and end rent date
                const diffDays = Math.floor(Math.abs(end.getTime() - start) / (1000 * 60 * 60 * 24));

                // set time
                if (diffDays !== 0) {
                    diffDays === 1 ?
                        counterWrapper.innerText = `${diffDays} Day left`
                        :
                        counterWrapper.innerText = `${diffDays} Days left`
                }
                else {
                    counterWrapper.innerText = `${hours !== 0 ? hours + 'h : ' : ''} ${minutes}m : ${seconds}s`;
                }

            }

            else {
                // remove specifc item grapgic and from user's account after countdown ends
                if (item === 'pet') {
                    this.dom.general.petRentTime.innerText = 'No pet';
                    this.dom.general.petImg.innerHTML = `<img src="/images/profile_pet_slot.png" title="Pet slot" />`;
                    this.dom.general.petImg.classList.remove('profile__generalImg-item');
                    clearInterval(this.generalInterval.pet);
                }
                else if (item === 'potion1') {
                    this.dom.general.potionTimeFirst.innerText = 'No potion';
                    this.dom.general.potionImgFirst.innerHTML = '<img src="/images/profile_elixir_slot.png" title="Elixir slot #2" />';
                    this.dom.general.potionImgFirst.classList.remove('profile__generalImg-item');
                    clearInterval(this.generalInterval.potionFirst);
                }
                else if (item === 'potion2') {
                    this.dom.general.potionTimeSecond.innerText = 'No potion';
                    this.dom.general.potionImgSecond.innerHTML = '<img src="/images/profile_elixir_slot.png" title="Elixir slot #2" />';
                    this.dom.general.potionImgSecond.classList.remove('profile__generalImg-item');
                    clearInterval(this.generalInterval.potionSecond);
                }

                updateUserData(this.userData);
            }
        }, 1000);

    }

    // set general elements - potions, pet and description
    setGeneral() {

        // set pet 
        if (this.userData.pet !== null) {

            // set graphic
            this.dom.general.petImg.innerHTML = `<img src=${this.userData.pet.imgSmallSrc} title='Pet slot' />`;
            this.dom.general.petImg.classList.add('profile__generalImg-item');

            // start countdown which is displaying the remaining time
            this.generalInterval.pet = this.setCountdown(
                this.userData.pet.rentEnd,
                this.dom.general.petRentTime,
                'pet'
            );

        }
        else {
            this.dom.general.petRentTime.innerText = 'No pet';
        }

        // set first potion
        if (this.userData.potions.first !== null) {

            // find potion
            const potion: ShopItem = potionsData[potionsData.findIndex(el => el.id === this.userData.potions.first.id)];

            // set graphic
            this.dom.general.potionImgFirst.innerHTML = `<img src=${potion.src} title='Elixir slot #1'/>`;
            this.dom.general.potionImgFirst.classList.add('profile__generalImg-item');

            // start countdown which is displaying the remaining time
            this.generalInterval.potionFirst = this.setCountdown(
                this.userData.potions.first.end,
                this.dom.general.potionTimeFirst,
                'potion1'
            );

        }
        else {
            this.dom.general.potionTimeFirst.innerText = 'No potion';
        }


        // set second potion
        if (this.userData.potions.second !== null) {

            // find potion
            const potion: ShopItem = potionsData[potionsData.findIndex(el => el.id === this.userData.potions.second.id)];

            // set graphic
            this.dom.general.potionImgSecond.innerHTML = `<img src=${potion.src} title='Elixir slot #1'/>`;
            this.dom.general.potionImgSecond.classList.add('profile__generalImg-item');

            // start countdown which is displaying the remaining time
            this.generalInterval.potionSecond = this.setCountdown(
                this.userData.potions.second.end,
                this.dom.general.potionTimeSecond,
                'potion2'
            );
        }
        else {
            this.dom.general.potionTimeSecond.innerText = 'No potion';
        }

        // set description
        this.dom.description.value = this.userData.description;

    }

    // general actions when data has changed
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

    /**
     * moving item from backpack to equipment
     * @param currentItem - current item in backpack, needed to find what item will be replaced
     */
    moveItemToEquipment(currentItem: ShopItem) {

        // indexes of items that are needed for moving items
        const equipmentItemIndex: number = this.userData.equipmentItems.findIndex(el => el.type === currentItem.type);
        const backpackItemIndex: number = this.userData.backpackItems.findIndex(el => el.id === currentItem.id);

        // check if equipment slot in empy 
        if (equipmentItemIndex !== -1) {
            // remove item from backpack
            this.userData.backpackItems.splice(backpackItemIndex, 1);

            // add to backpack new equipment item (which is replaced by new) 
            this.userData.backpackItems.push(this.userData.equipmentItems[equipmentItemIndex]);

            // add to equipment selected item
            this.userData.equipmentItems[equipmentItemIndex] = currentItem;

            // hide backpack label
            this.dom.backpackLabelRoot.classList.add('disabled');

            // update user's data in firestore -> onDataChange() method will rerender equipment
            updateUserData(this.userData);
        }
        else {
            // remove item from backpack
            this.userData.backpackItems.splice(backpackItemIndex, 1);

            // add new item to equipment
            this.userData.equipmentItems.push(currentItem);

            // hide backpack label
            this.dom.backpackLabelRoot.classList.add('disabled');

            // update user's data in firestore -> onDataChange() method will rerender equipment
            updateUserData(this.userData);
        }
    }

    /**
     * moving item from equipement to backpack
     * @param item - item which will be moved to backpack
     * @param errorWrapper - wrapper where an error message will be displayed if item moved fails
     */
    moveItemToBackpack(item: ShopItem, errorWrapper: HTMLElement) {

        // check if user have free slot in backpack (backpack have 10 slots)
        if (this.userData.backpackItems.length < this.dom.backpackSlots.length) {

            // remove this item from user equipment
            const itemIndex = this.userData.equipmentItems.findIndex(e => e.id === item.id);
            if (itemIndex > -1) {
                this.userData.equipmentItems.splice(itemIndex, 1);
            }

            // add current item to user's backpack
            this.userData.backpackItems.push(item);
            updateUserData(this.userData);

            // hide label
            this.dom.equipmentLabelRoot.className = 'profile__itemSpecs disabled';
        }

        // notify user about no available in backpack
        else {
            errorWrapper.innerText = 'Your backpack is full';
        }

    }

    /**
        * add backpack label for specific item, with ability to move this item to equipment
        * @param item - item data basis of which the new item label will be created
        * @param number - slot number in the backpack to add the appropriate class for the label to be displayed
        */
    backpackLabel(item: ShopItem, number: number) {

        // remove pulse from previous equipment slot
        this.dom.equipmentSlots.forEach(el => el.firstElementChild.classList.remove('profile__equipmentIcon-pulse'));

        // remove equipment label
        this.dom.equipmentLabelRoot.innerHTML = '';
        this.dom.equipmentLabelRoot.classList.add('disabled');

        // prevent of label hide
        clearInterval(this.hideLabelInterval.backpack);

        // find specific slot in equipment which is equal to current shop item type, needed to compare items
        const equipmentSlot = document.querySelector(`#profile_equipment_slots div[data-slot-name = ${item.type}]`);

        // show slot in equipment by adding pulse animation
        equipmentSlot.firstElementChild.classList.add("profile__equipmentIcon-pulse");

        // create new label
        this.dom.backpackLabelRoot.innerHTML = '';
        const currentItemInEq: ShopItem | undefined = this.userData.equipmentItems[this.userData.equipmentItems.findIndex(e => e.type === item.type)];
        const newLabel: HTMLElement = document.createElement('div');
        newLabel.className = `profile__itemSpecs profile__itemSpecs-backpackSlot profile__backpackLabel-${number + 1}`;
        newLabel.innerHTML = getProfileBackpackLabel(item, currentItemInEq);

        // add a event which is responsible for moving item  the backpack to equipment
        const replaceBtn: HTMLElement = newLabel.querySelector('#profile_backpack_move_item_btn');
        replaceBtn.addEventListener('click', () => this.moveItemToEquipment(item));

        // when the label has his focus keep displaying pulse effect on specifc equipment slot and clear interval which is reponsible for hidding this label
        newLabel.addEventListener('mouseover', () => {
            equipmentSlot.firstElementChild.classList.add("profile__equipmentIcon-pulse");
            return clearInterval(this.hideLabelInterval.backpack);
        });

        // when label loses his focus then hide this label and remove pulse effect from specific equipment slot
        newLabel.addEventListener('mouseleave', () => {
            this.dom.backpackLabelRoot.innerHTML = '';
            equipmentSlot.firstElementChild.classList.remove("profile__equipmentIcon-pulse");
        });

        // show this label
        this.dom.backpackLabelRoot.classList.remove('disabled');
        this.dom.backpackLabelRoot.appendChild(newLabel);
    }

    /**
   * add equipment label for specific item,  with ability to move this item to backpack
   * @param item - item data basis of which the new item label will be created
   */
    equipmentLabel(item: ShopItem) {

        // hide backpack label
        this.dom.backpackLabelRoot.innerHTML = '';
        this.dom.backpackLabelRoot.classList.add('disabled');

        // prevent of label hiding 
        clearInterval(this.hideLabelInterval.equipment);

        // hide backpack label
        this.dom.backpackLabelRoot.classList.add('disabled');

        // reset equipement label styles
        this.dom.equipmentLabelRoot.className = 'profile__itemSpecs disabled';

        // show label
        this.dom.equipmentLabelRoot.classList.add(item.rarity === 'legendary' ? 'profile__itemSpecs-legendary' : 'profile__itemSpecs-common');
        this.dom.equipmentLabelRoot.classList.add(`profile__itemSpecs-${item.type}`);
        this.dom.equipmentLabelRoot.innerHTML = getProfileEquipmentLabel(item);
        this.dom.equipmentLabelRoot.classList.remove('disabled');

        // keep displaying label when user  focus is on label
        this.dom.equipmentLabelRoot.addEventListener('mouseover', () => clearInterval(this.hideLabelInterval.equipment));

        // hide when equipment slot loses his focus
        this.dom.equipmentLabelRoot.addEventListener('mouseleave', () => {
            this.dom.equipmentLabelRoot.innerHTML = '';
            this.dom.equipmentLabelRoot.classList.add('disabled');
        });

        // get elements which are needed for moving item from equipment to backpack
        const replaceBtn: HTMLElement = this.dom.equipmentLabelRoot.querySelector('#profile_equipment_move_item_btn');
        const error: HTMLElement = this.dom.equipmentLabelRoot.querySelector('#profile_equipment_move_item_error');

        // add a event which is responsible for moving item  the equipment to backpack
        replaceBtn.addEventListener('click', () => this.moveItemToBackpack(item, error));

    }

    // set bacpack items with hover events by which user can display label of specific item and move this item into equipment
    setUserBackpack() {

        // clear previous 
        this.dom.backpackSlots.forEach(el => {
            el.innerHTML = '';
        });

        // add graphic and events
        this.userData.backpackItems.forEach((el, num) => {

            // set graphic
            this.dom.backpackSlots[num].innerHTML = `<img src='${el.src}' data-backpack-item-id='${el.id}' data-slot-name='${el.type}'/>`

            // add hover event by which user can display item label
            this.dom.backpackSlots[num].addEventListener('mouseover', () => this.backpackLabel(el, num));

            // remove label with delay -> after 0.8s
            this.dom.backpackSlots[num].addEventListener('mouseleave', () => {

                //  hide label when backpack slot loses his focus with delay -> after 0.8s
                this.hideLabelInterval.backpack = setTimeout(() => {
                    this.dom.backpackLabelRoot.innerHTML = ''
                }, 800);

                // remove pulse effect from equipment slot
                this.dom.equipmentSlots.forEach(el => el.firstElementChild.classList.remove('profile__equipmentIcon-pulse'));
            });
        });

    }

    // set equipment items with hover events by which user can display label of specific item and move this item into backpack
    setUserEquipment() {

        // this method is also triggered when the data has changed, so you have to delete the graphics of the previous objects 
        this.clearEquipmentSlots();

        // add graphic and events
        this.userData.equipmentItems.forEach(el => {

            // find slot in equipment in order to inject item graphic and add function reponsible for transfering item from equipment to backpack
            const equipmentSlot: HTMLElement = document.querySelector(`#profile_equipment_slots div[data-slot-name = '${el.type}']`);

            // set slot graphic 
            equipmentSlot.innerHTML = `  <img src='${el.src}' class="profile__equipmentIcon"/>`;

            // create equipment label with button responsible for transfering item
            equipmentSlot.addEventListener('mouseover', () => this.equipmentLabel(el))

            // hide label when equipment slot loses his focus with delay -> after 0.8s
            equipmentSlot.addEventListener('mouseleave', (e) => {
                this.hideLabelInterval.equipment = setTimeout(() => {
                    this.dom.equipmentLabelRoot.innerHTML = '';
                    this.dom.equipmentLabelRoot.classList.add('disabled');
                }, 800);

            });

        })
    }

    // clear equipment slots -> remove items graphics 
    clearEquipmentSlots() {
        this.dom.equipmentSlots.forEach(el => {
            const element: HTMLElement = el as HTMLElement;
            el.innerHTML = `<img src='${getEquipmentIconSrc(element.dataset.slotName)}' class='profile__equipmentIcon'/>`
        });
    }

    // when data has changed then onDataChange() method will rerender component so its need to get dom elements 
    removeEvents() {

        // equipment
        const equipment: HTMLElement = document.querySelector('.profile__equipment');
        equipment.replaceWith(equipment.cloneNode(true));
        this.dom.equipmentLabelRoot = document.querySelector('#profile_equipment__item_label');
        this.dom.equipmentSlots = document.querySelectorAll('#profile_equipment_slots div[data-slot-name]');

        // backpack
        const backpack: HTMLElement = document.querySelector('#profile_backpack_slots');
        backpack.replaceWith(backpack.cloneNode(true));
        this.dom.backpackLabelRoot = document.querySelector('.profile__backpackLabelWrapper');
        this.dom.backpackSlots = document.querySelectorAll('#profile_backpack_slots .profile__backpackItem');

        // general 
        const generalContainer = document.querySelector('.profile__general');
        generalContainer.replaceWith(generalContainer.cloneNode(true));
        this.dom.potionLabel = document.querySelector('.profile__generalLabelWrapper');
        this.dom.general = {
            goldAmount: document.querySelector('#profile_general_gold .profile__generalText'),
            petImg: document.querySelector('#profile_general_pet .profile__generalImg'),
            petRentTime: document.querySelector('#profile_general_pet .profile__generalText'),
            potionImgFirst: document.querySelector('#profile_general_potion_first .profile__generalImg'),
            potionTimeFirst: document.querySelector('#profile_general_potion_first .profile__generalText'),
            potionImgSecond: document.querySelector('#profile_general_potion_second .profile__generalImg'),
            potionTimeSecond: document.querySelector('#profile_general_potion_second .profile__generalText')
        }

        // portrait
        this.dom.portrait = {
            img: document.querySelector('.profile__portraitImg'),
            prevBtn: document.querySelector('.profile__portraitBtn-left'),
            nextBtn: document.querySelector('.profile__portraitBtn-right'),
        }
    }


    // click events applied on mobile nav buttons by which the user can switch between profile and backpack
    toogleView() {

        const hideNavContainer = () => {

            // hide nav container
            const navContainer: HTMLElement = document.querySelector('.nav');
            navContainer.style.display = 'none';

            // change nav icon 
            const navIcon: HTMLImageElement = document.querySelector('.mobileNav__icon');
            navIcon.src = './images/menu.png';
        }

        // show backpack container 
        this.dom.mobileNavFristSwitch.addEventListener('click', () => {
            hideNavContainer();
            this.dom.backpackContainer.classList.add('disabled');
            this.dom.profileContainer.classList.remove('disabled');
        });

        // show profile container 
        this.dom.mobileNavSecondSwitch.addEventListener('click', () => {
            hideNavContainer();
            this.dom.backpackContainer.classList.remove('disabled');
            this.dom.profileContainer.classList.add('disabled');
        });

    }

    // hide backpack content container on mobile devices, user can switch to backpack by the bottom nav bar
    mobile() {
        if (window.innerWidth < 1024) {
            this.dom.backpackContainer.classList.add('disabled');
            this.toogleView();
        }

        window.addEventListener('resize', ()=> {
            if (window.innerWidth < 1024) {
                this.dom.backpackContainer.classList.add('disabled');
                !this.dom.backpackContainer.classList.contains('disabled') && this.toogleView();
            }
            else if(window.innerWidth >= 1024){
                this.dom.backpackContainer.classList.remove('disabled');
                this.dom.profileContainer.classList.remove('disabled');
            }
        });
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
            backpackLabelRoot: document.querySelector('#profile_backpack_item_label'),
            equipmentLabelRoot: document.querySelector('#profile_equipment__item_label'),
            equipmentSlots: document.querySelectorAll('#profile_equipment_slots div[data-slot-name]'),
            backpackSlots: document.querySelectorAll('#profile_backpack_slots .profile__backpackItem'),
            description: document.querySelector('.profile__description textarea')
        }
    }
    initScripts() {
        this.mobile();
        this.setUserEquipment();
        this.setGeneral();
        this.setUserBackpack();
        this.changeUserDescription();
        this.changePortrait();
        this.setTableStats();
        this.increaseStatisticEvents();
        this.labelForPotions();
    }
    onDataChange() {
        this.setHeroStats();
        this.setTableStats();
        this.removeEvents();
        this.generalOnUpdate();
        this.setUserBackpack();
        this.setUserEquipment();
        this.setGeneral();
        this.labelForPotions();
        this.changePortrait();
    }
    render() {
        this.root.innerHTML = getProfileHTMLCode(this.userData);
        this.mobileNav.innerHTML = profileMobileNavCode;
    }
}
