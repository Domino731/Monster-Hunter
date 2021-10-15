
import { View } from './view';
import { getMonsterFightHTMLCode } from '../viewsHTMLCode/monsterFight';
import { getRandomMission } from '../functions/missionGenerator';
import { getNeededExp } from '../functions/getNeededExp';
import { Tavern } from './tavern';
import { updateUserData } from '../firebase/operations';
import { UserStats } from '../types';
import { getGuardPaymentValue } from '../functions/getGuardPaymentValue';

export class MonsterFight extends View {
    private fightInterval: null | ReturnType<typeof setInterval>
    private dom: {
        fightContainer: HTMLElement | null
        successSummary: HTMLElement | null
        failedSummary: HTMLElement | null
        summaryBtns: NodeListOf<Element>
        monster: {
            wrapper: HTMLElement | null
            explosion: HTMLElement | null
            HP: HTMLElement | null
            HPBar: HTMLElement | null
        }
        user: {
            weaponWrapper: HTMLElement | null
            sword: HTMLElement | null
            explosion: HTMLElement | null
            HP: HTMLElement | null
            HPBar: HTMLElement | null
        }
    }
    private monsterHP: number;
    private userHP: number
    constructor() {
        super()
        this.fightInterval = null
        this.dom = {
            fightContainer: document.querySelector('#fight_container'),
            successSummary: document.querySelector('#successful_fight_summary'),
            failedSummary: document.querySelector('#failed_fight_summary'),
            summaryBtns: document.querySelectorAll('.fight__summaryBtn'),
            monster: {
                wrapper: document.querySelector('.fight__characterWrapper-monster'),
                explosion: document.querySelector('.monster__explosionImg'),
                HP: document.querySelector('#monster_HP'),
                HPBar: document.querySelector('#monster_HPBar')
            },
            user: {
                weaponWrapper: document.querySelector('.fight__weaponWrapper'),
                sword: document.querySelector('.fight__sword'),
                explosion: document.querySelector('.fight__explosion'),
                HP: document.querySelector('#user_HP'),
                HPBar: document.querySelector('#user_HPBar')
            }
        }

    }
    render() {
        this.root.innerHTML = getMonsterFightHTMLCode(this.userStats, this.userData);
    }

    // calculate damage for monster from user
    userDamage() {
        const monsterDefence: number = 100 - (this.userData.currentMission.monster.defence * 100 / this.userStats.defence);
        let luck: number = 100 - (this.userData.currentMission.monster.luck * 100 / this.userStats.luck);
        luck = (Math.floor(Math.random() * luck)) + 1;
        const damage: number = (this.userStats.damage * monsterDefence / 100 + (this.userStats.damage * luck / 100)) / 2;
        this.monsterHP -= Math.ceil(damage);
    }
    monsterDamage() {
        const monsterDefence: number = 100 - (this.userData.currentMission.monster.defence * 100 / this.userStats.defence);
        let luck: number = 100 - (this.userData.currentMission.monster.luck * 100 / this.userStats.luck);
        luck = (Math.floor(Math.random() * luck)) + 1;
        const userDamage: number = (this.userStats.damage * monsterDefence / 100 + (this.userStats.damage * luck / 100)) / 2;

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
          }

        const minMonsterDamage = Math.floor(userDamage * 0.7) + 1;  
        const monsterDamage = getRandomInt(minMonsterDamage, userDamage)
        this.userHP -= Math.ceil(monsterDamage);
    }
    // if user defeated the monster, then show summary panel, create new mission, and update user's data in firestore with new exp, gold, mission
    successfulMission() {
        // hide fight container and show successful mission summary panel
        setTimeout(() => {
            this.dom.fightContainer.classList.add('disabled');
            // show summary
            this.dom.successSummary.classList.remove('disabled');
        }, 2000)

        // find index of current mission, in order to replace her by new
        const index: number = this.userData.availableMissions.findIndex(el => el.id === this.userData.currentMission.id)
        // set new mission
        this.userData.availableMissions[index] = getRandomMission(this.userData.nextLevelAt, this.userData.guardPayout, this.userStats, this.userData.pet);
        // add exp
        this.userData.exp += this.userData.currentMission.exp;
        // add gold
        this.userData.gold += this.userData.currentMission.gold;
        // check if user has enough exp to level up
        if (this.userData.exp >= this.userData.nextLevelAt) {
            this.userData.level++;
            this.userData.nextLevelAt = getNeededExp(this.userData.level);
            this.userData.exp = 0;
            this.userData.guardPayout = getGuardPaymentValue(this.userData.level);
        }
        // set status
        this.userData.status = 'free';
        this.userData.currentMission = null;
         this.userData.currentMission = null;
        updateUserData(this.userData);
    }

    // if user defeated the monster, then show summary panel, create new mission, and update user's data in firestore
    failedMission() {
        // hide fight container and show failed mission summary panel
        setTimeout(() => {
            this.dom.fightContainer.classList.add('disabled');
            // show summary
            this.dom.failedSummary.classList.remove('disabled');
        }, 2000)

        // find index of current mission, in order to replace her by new
        const index: number = this.userData.availableMissions.findIndex(el => el.id === this.userData.currentMission.id)
        // set new mission
        this.userData.availableMissions[index] = getRandomMission(this.userData.nextLevelAt, this.userData.guardPayout, this.userStats, this.userData.pet);
        // set status
        this.userData.status = 'free';
        this.userData.currentMission = null;
        updateUserData(this.userData);

    }







    // when user click on button on summary panel, he will be redirected to the tavern
    summaryBtnsEvents() {
        console.log( this.dom.summaryBtns)
        this.dom.summaryBtns.forEach(el => el.addEventListener('click', () => {
            if (this.userData.currentMission === null) {
                const tavern = new Tavern();
            }
        }))
    }

    // check if user he defeated the monster, and set monster's hp
    checkMonsterHP() {
        
        const HP = Math.floor((this.monsterHP / this.userData.currentMission.monster.health) * 100);
        if (HP > 0) {
            this.dom.monster.HP.innerText = `${this.monsterHP}`;
            this.dom.monster.HPBar.style.width = `${HP}%`;
        }
        else {
            this.dom.monster.HP.innerText = `0`;
            this.dom.monster.HPBar.style.width = `0%`;
            this.successfulMission();
        }

    }
    // check if monster defeated user, and set user's hp
    checkUserHP() {
        const HP = Math.floor((this.userHP / this.userStats.health) * 100);
        if (HP > 0) {
            this.dom.user.HP.innerText = `${this.userHP}`;
            this.dom.user.HPBar.style.width = `${HP}%`;
        }
        else {
            this.dom.user.HP.innerText = `0`;
            this.dom.user.HPBar.style.width = `0%`;
            this.failedMission();
        }
    }



    attackAnimation() {
        this.dom.user.explosion.classList.add('fight__explosion-an');
        this.dom.user.sword.classList.add('fight__sword-an');
        this.dom.user.weaponWrapper.classList.add('fight__weaponWrapper-an')

        this.dom.monster.explosion.classList.remove('monster__explosionImg-an');
        this.dom.monster.wrapper.classList.remove('monster-an');
        this.userDamage();
        // set monster health bar
        setTimeout(() => {
            this.checkMonsterHP();
        }, 1500)

        setTimeout(() => {
            if (this.monsterHP > 0) {
                this.dom.user.explosion.classList.remove('fight__explosion-an');
                this.dom.user.sword.classList.remove('fight__sword-an');
                this.dom.user.weaponWrapper.classList.remove('fight__weaponWrapper-an')

                this.dom.monster.explosion.classList.add('monster__explosionImg-an');
                this.dom.monster.wrapper.classList.add('monster-an');
                this.monsterDamage();

                // set user's health bar
                setTimeout(() => {
                    this.checkUserHP();
                }, 1700);
            }


        }, 2000);

    }


    fightAnimations() {
      
        this.attackAnimation();
        this.fightInterval = setInterval(() => {
            if (this.userHP > 0 && this.monsterHP > 0) {
                this.attackAnimation();
            }
            else {
                clearInterval(this.fightInterval);
            }
        }, 4000)
    }

    general() {
        this.monsterHP = this.userData.currentMission.monster.health;
        this.userHP = this.userStats.health;
    }
    onDataChange() { }
    getDOMElements() {
        this.dom = {
            fightContainer: document.querySelector('#fight_container'),
            successSummary: document.querySelector('#successful_fight_summary'),
            failedSummary: document.querySelector('#failed_fight_summary'),
            summaryBtns: document.querySelectorAll('.fight__summaryBtn'),
            monster: {
                wrapper: document.querySelector('.fight__characterWrapper-monster'),
                explosion: document.querySelector('.monster__explosionImg'),
                HP: document.querySelector('#monster_HP'),
                HPBar: document.querySelector('#monster_HPBar')
            },
            user: {
                weaponWrapper: document.querySelector('.fight__weaponWrapper'),
                sword: document.querySelector('.fight__sword'),
                explosion: document.querySelector('.fight__explosion'),
                HP: document.querySelector('#user_HP'),
                HPBar: document.querySelector('#user_HPBar')
            }
        }
    }
    initScripts() {
        this.general()
        this.fightAnimations();
        this.summaryBtnsEvents();
    }
}
// <a href='https://www.freepik.com/vectors/nature'>Nature vector created by brgfx - www.freepik.com</a>
